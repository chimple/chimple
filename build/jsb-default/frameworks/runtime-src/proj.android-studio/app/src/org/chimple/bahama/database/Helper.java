package org.chimple.bahama.database;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import androidx.annotation.NonNull;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

import org.chimple.bahama.AuthCallBack;
import org.chimple.bahama.auth.FirebaseAuthWithGoogle;
import org.chimple.bahama.logger.ChimpleLogger;
import org.chimple.bahama.workers.SyncOperationManager;

public class Helper {
    private static final String TAG = Helper.class.getName();
    private SharedPreferences sharedPreferences = null;

    public static String SHARED_PREF = "org.chimple.bahama";
    public static String EMAIL = "FB_EMAIL";
    public static String PASSWORD = "FB_PASSWORD";
    public static String SCHOOL_COLLECTION = "School";
    public static String SECTION_COLLECTION = "Section";
    public static String STUDENT_COLLECTION = "Student";
    public static String FB_SELECTED_SCHOOL = "FB_SELECTED_SCHOOL";

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
            Log.d(TAG, "AppActivity calling AppDatabase");
            mDb = AppDatabase.getInstance(context);
            Log.d(TAG, "AppActivity calling FirebaseOperations");
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

    public void enableSync() {
        Log.d(TAG, "enableSyncWithFirebase");
        sInstance.setFirebaseUserLoggedIn(true);
        sInstance.getFirebaseOperations().enableSyncWithFirebase();
    }

    public void scheduleStartSync() {
//        firebaseOperations.unRegisterListeners();
        sInstance.syncOperationManager.scheduleStartSync();
    }

    public void auth() {
        if (ChimpleLogger.isNetworkAvailable()) {
            Log.d(TAG, "in Auth network is available");
            FirebaseUser currentUser = mAuth.getCurrentUser();
            if (currentUser != null) {
                Log.d(TAG, "Reload as current User");
                reload();
            } else {
                Log.d(TAG, "SignIn With Firebase");
                signIn();
            }
        } else {
            // if not internet and if current user present then enable offline sync
            FirebaseUser currentUser = mAuth.getCurrentUser();
            if (currentUser != null) {
                enableSync();
            } else {
                // currentUser is null and no internet??
                Log.d(TAG, "current user in not available and no internet");
            }
        }
    }

    private void reload() {
        mAuth.getCurrentUser().reload().addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> task) {
                FirebaseUser user = task.isSuccessful() ?
                        mAuth.getCurrentUser() : null;

                Log.d(TAG, "Firebase user:" + user);

                if (user != null) {
                    Log.d(TAG, "calling enableSync");
                    enableSync();
                } else {
                    Log.d(TAG, "reload failed, SignIn()");
                    signIn();
                }
            }
        });
    }

    private void signIn() {
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
                                Log.d(TAG, "SignIn Successful user:" + user);
                                enableSync();
                            } else {
                                Log.d(TAG, "SignIn Failed");
                                callBack.loginFailed("Email/Password is not correct");
                            }
                        }
                    });
        }
    }
}
