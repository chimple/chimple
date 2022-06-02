package org.chimple.firebasesync.database;

import android.content.Context;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.util.Log;

import androidx.annotation.NonNull;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import org.chimple.firebasesync.auth.AuthCallBack;
import org.chimple.firebasesync.auth.FirebaseAuthWithGoogle;
import org.chimple.firebasesync.model.School;
import org.chimple.firebasesync.model.Section;
import org.chimple.firebasesync.model.Student;
import org.chimple.firebasesync.workers.SyncOperationManager;

import java.util.List;

public class Helper {
    private static final String TAG = Helper.class.getName();
    private SharedPreferences sharedPreferences = null;

    public static String SHARED_PREF = "org.chimple.bahama";
    public static String EMAIL = "EMAIL";
    public static String SCHOOL_ID = "SCHOOL_ID";
    public static String PASSWORD = "FB_PASSWORD";
    public static String SCHOOL_COLLECTION = "School";
    public static String SECTION_COLLECTION = "Section";
    public static String STUDENT_COLLECTION = "Student";
    public static String FB_SELECTED_SCHOOL = "FB_SELECTED_SCHOOL";
    public static String HISTORICAL_PROGRESS_COLLECTION = "historical_progress";
    public static String LEADERBOARD_COLLECTION = "Leaderboard";

    private Context context = null;
    private static Helper sInstance = null;
    private static final Object LOCK = new Object();

    private AppDatabase mDb = null;
    private FirebaseOperations firebaseOperations = null;
    private boolean isFirebaseUserLoggedIn = false;
    private FirebaseAuth mAuth;

    private SyncOperationManager syncOperationManager;
    private AuthCallBack callBack = null;

    public Helper(Context context, SharedPreferences sharedPreferences, AuthCallBack callBack) {
        this.sharedPreferences = sharedPreferences;
        this.context = context;
        mAuth = FirebaseAuth.getInstance();
        this.callBack = callBack;
    }

    public static Helper getInstance(Context context, AuthCallBack callBack) {
        if (sInstance == null) {
            synchronized (LOCK) {
                sInstance = new Helper(context, context.getSharedPreferences(SHARED_PREF, Context.MODE_PRIVATE), callBack);
                sInstance.initDB(context);
            }
        }
        return sInstance;
    }

    public static Helper ref() {
        return sInstance;
    }

    public SharedPreferences getSharedPreferences() {
        return sharedPreferences;
    }

    private void initDB(Context context) {
        try {
            Log.d(TAG, "Initializing AppDatabase");
            mDb = AppDatabase.getInstance(context);
            Log.d(TAG, "Initializing FirebaseOperations");
            firebaseOperations = FirebaseOperations.getInstance(context, DbOperations.getInstance(mDb), callBack);
            this.syncOperationManager = SyncOperationManager.getInstance(context);
        } catch (Exception e) {
            Log.d(TAG, "initDB failed:" + e);
            e.printStackTrace();
        }
    }

    public AppDatabase getmDb() {
        return mDb;
    }

    public FirebaseOperations getFirebaseOperations() {
        return firebaseOperations;
    }

    public boolean isFirebaseUserLoggedIn() {
        return isFirebaseUserLoggedIn;
    }

    public void setFirebaseUserLoggedIn(boolean firebaseUserLoggedIn) {
        isFirebaseUserLoggedIn = firebaseUserLoggedIn;
    }

    public void enableSync(boolean shouldCallBack) {
        Log.d(TAG, "enableSyncWithFirebase");
        sInstance.setFirebaseUserLoggedIn(true);
        sInstance.getFirebaseOperations().enableSyncWithFirebase(shouldCallBack);
    }

    public void scheduleStartSync() {
//        firebaseOperations.unRegisterListeners();
        sInstance.syncOperationManager.scheduleStartSync();
    }

    public static boolean isNetworkAvailable() {
        boolean connected = false;
        try {
            ConnectivityManager cm = (ConnectivityManager) sInstance.context.getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo networkInfo = cm.getActiveNetworkInfo();
            connected = networkInfo != null && networkInfo.isAvailable() &&
                    networkInfo.isConnected();

        } catch (Exception e) {
            e.printStackTrace();
        }
        Log.i("isNetworkAvailable() ->", connected + "");
        return connected;
    }


    public void auth(boolean shouldCallBack) {
        if (isNetworkAvailable()) {
            Log.d(TAG, "in Auth network is available");
            FirebaseUser currentUser = mAuth.getCurrentUser();
            if (currentUser != null) {
                Log.d(TAG, "Reload as current User");
                reload(shouldCallBack);
            } else {
                Log.d(TAG, "SignIn With Firebase");
                signIn(shouldCallBack);
            }
        } else {
            // if not internet and if current user present then enable offline sync
            FirebaseUser currentUser = mAuth.getCurrentUser();
            if (currentUser != null) {
                enableSync(shouldCallBack);
            } else {
                // currentUser is null and no internet??
                Log.d(TAG, "current user in not available and no internet");
            }
        }
    }

    private void reload(boolean shouldCallBack) {
        mAuth.getCurrentUser().reload().addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> task) {
                FirebaseUser user = task.isSuccessful() ?
                        mAuth.getCurrentUser() : null;

                Log.d(TAG, "Firebase user:" + user);

                if (user != null) {
                    Log.d(TAG, "calling enableSync");
                    enableSync(shouldCallBack);
                } else {
                    Log.d(TAG, "reload failed, SignIn()");
                    signIn(shouldCallBack);
                }
            }
        });
    }

    private void signIn(boolean shouldCallBack) {
        String email = this.getSharedPreferences().getString(EMAIL, "");
        String password = this.getSharedPreferences().getString(PASSWORD, "");
        Log.d(TAG, "signIn with email" + email + " and password:" + password);
        if (email != null && !email.isEmpty() && password != null && !password.isEmpty()) {
            mAuth.signInWithEmailAndPassword(email, password)
                    .addOnCompleteListener(new FirebaseAuthWithGoogle(), new OnCompleteListener<AuthResult>() {
                        @Override
                        public void onComplete(@NonNull Task<AuthResult> task) {
                            FirebaseUser user = task.isSuccessful() ?
                                    mAuth.getCurrentUser() : null;
                            if (user != null) {
                                Log.d(TAG, "SignIn Successful user:" + user.getUid());
                                enableSync(shouldCallBack);
                            } else {
                                Log.d(TAG, "SignIn Failed");
                                callBack.loginFailed("Email/Password is not correct");
                            }
                        }
                    });
        }
    }

    public static String findSchool(String email) {
        String json = null;
        try {
            FirebaseOperations instance = FirebaseOperations.getInitializedInstance();
            Log.d(TAG, "FirebaseOperations instance:" + instance);
            if (instance != null) {
                School school = instance.getOperations().findSchoolById(email);
                if (school != null) {
                    Gson gson = new GsonBuilder().create();
                    json = gson.toJson(school);
                }
            }
        } catch (Exception e) {

        }
        Log.d(TAG, "got school json:" + json);
        return json;
    }

    public static String fetchSectionsForSchool(String schoolId) {
        String json = null;
        try {
            FirebaseOperations instance = FirebaseOperations.getInitializedInstance();
            if (instance != null) {
                List<Section> sections = instance.getOperations().findSectionsBySchool(schoolId);
                Log.d(TAG, "fetchSectionsForSchool got sections:" + sections.size());
                if (sections != null && sections.size() > 0) {
                    Gson gson = new GsonBuilder().create();
                    json = gson.toJson(sections.toArray());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        Log.d(TAG, "got section json:" + json);
        return json;
    }

    public static String fetchStudentsForSchoolAndSection(String schoolId, String sectionId) {
        String json = null;
        try {
            FirebaseOperations instance = FirebaseOperations.getInitializedInstance();
            if (instance != null) {
                List<Student> students = instance.getOperations().loadAllStudentsForSchoolAndSection(schoolId, sectionId);
                Log.d(TAG, "fetchStudentsForSchoolAndSection got students:" + students.size());
                if (students != null && students.size() > 0) {
                    Gson gson = new GsonBuilder().create();
                    json = gson.toJson(students.toArray());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        Log.d(TAG, "got student json:" + json);
        return json;
    }

    public static void syncProfile(String schoolId, String sectionId, String studentId, String profileData, String progressId) {
        FirebaseOperations instance = FirebaseOperations.getInitializedInstance();
        Log.d(TAG, "Sync profile school:" + schoolId + " section:" + sectionId + " student:" + studentId);
        if (instance != null) {
            instance.syncProfile(schoolId, sectionId, studentId, profileData, progressId);
        }
    }

    public void cleanup() {
        if (getmDb() != null) {
            if (getmDb().isOpen()) {
                getmDb().close();
            }
        }
//        if (getFirebaseOperations() != null) {
//            getFirebaseOperations().unRegisterListeners();
//        }
    }
}
