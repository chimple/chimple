package org.chimple.firebasesync.database;

import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentChange;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.EventListener;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.FirebaseFirestoreException;
import com.google.firebase.firestore.FirebaseFirestoreSettings;
import com.google.firebase.firestore.ListenerRegistration;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;
import com.google.gson.Gson;


import org.chimple.firebasesync.auth.AuthCallBack;
import org.chimple.firebasesync.model.School;
import org.chimple.firebasesync.model.Section;
import org.chimple.firebasesync.model.Student;

import java.util.HashMap;
import java.util.Map;

import static org.chimple.firebasesync.database.Helper.EMAIL;
import static org.chimple.firebasesync.database.Helper.FB_SELECTED_SCHOOL;
import static org.chimple.firebasesync.database.Helper.SCHOOL_ID;


public class FirebaseOperations {
    private static final String TAG = FirebaseOperations.class.getSimpleName();
    private FirebaseFirestore db = null;
    private DocumentReference schoolRef = null;
    private CollectionReference sectionCollectionRef = null;
    private CollectionReference studentCollectionRef = null;
    private static FirebaseOperations sInstance;
    private static final long DEFAULT_CACHE_SIZE_BYTES = 100 * 1024 * 1024; // 100 MB
    private static final Object LOCK = new Object();
    private static final String CACHE = "CACHE";
    private static final String SERVER = "SERVER";
    private static FirebaseOperations ref = null;
    private DbOperations operations;
    private ListenerRegistration schoolListener;
    private ListenerRegistration sectionListener;
    private Map<String, ListenerRegistration> studentListeners = new HashMap<String, ListenerRegistration>();
    private FirebaseUser user = null;
    private Context context = null;
    private AuthCallBack callback = null;

    private FirebaseOperations(Context context, DbOperations operations, AuthCallBack callback) {
        Log.d(TAG, "FirebaseOperations constructor...");
        this.ref = this;
        this.context = context;
        this.callback = callback;
        this.operations = operations;
        this.setup();
    }


    private void setup() {
        Log.d(TAG, "Setting up FireStore Configuration");
        this.db = FirebaseFirestore.getInstance();
        FirebaseFirestoreSettings settings = new FirebaseFirestoreSettings.Builder()
                .setPersistenceEnabled(true)
                .setCacheSizeBytes(DEFAULT_CACHE_SIZE_BYTES)
                .build();
        db.setFirestoreSettings(settings);
    }

    // Need to call after auth
    public void enableSyncWithFirebase(boolean shouldCallBack) {
        final Context context = this.context;
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        Log.d(TAG, "in enableSyncWithFirebase with User:" + user);
        if (user != null) {
            Log.d(TAG, "in enableSyncWithFirebase with User ID:" + user.getUid());
            db.collection("Connection")
                    .whereArrayContains("roles", user.getUid())
                    .get()
                    .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                        @Override
                        public void onComplete(@NonNull Task<QuerySnapshot> task) {
                            if (task.isSuccessful()) {
                                String docId = null;
                                for (QueryDocumentSnapshot document : task.getResult()) {
                                    Log.d(TAG, "got connection Id: " + document.getId());
                                    int fromST = document.getId().indexOf("ST_");
                                    int fromSU = document.getId().indexOf("SU_");
                                    if (docId == null) {
                                        docId = fromST != -1 ? document.getId().replace("ST_", "") : null;
                                    }
                                    if (docId == null) {
                                        docId = fromSU != -1 ? document.getId().replace("SU_", "") : null;
                                    }
                                    Log.d(TAG, "got school Id from connection: " + docId);
                                    if (docId != null) {
                                        break;
                                    }
                                }
                                if (docId != null) {
                                    Helper.ref().getSharedPreferences().edit().putString(SCHOOL_ID, docId).apply();
                                    if (Helper.isNetworkAvailable()) {
                                        FirebaseOperations.getInitializedInstance().syncUpdatedProfiles();
                                        FirebaseOperations.getInitializedInstance().registerSyncListeners(shouldCallBack);
                                    } else {
                                        FirebaseOperations.getInitializedInstance().registerSyncListenersOffline();
                                    }
                                } else {
                                    FirebaseOperations.ref.callback.loginFailed("Email/Password not correct - connection not found");
                                }

                            } else {
                                Log.d(TAG, "Querying Connection was failed...");
                                FirebaseOperations.ref.callback.loginFailed("Email/Password not correct");
                            }
                        }
                    });
        } else {
            FirebaseOperations.ref.callback.loginFailed("Email/Password not correct");
        }
    }

    private void syncUpdatedProfiles() {
        if (Helper.isNetworkAvailable()) {
            final String id = Helper.ref().getSharedPreferences().getString(SCHOOL_ID, "");
            db.collection("School")
                    .document(id)
                    .get()
                    .addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
                        @Override
                        public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                            if (task.isSuccessful()) {
                                Log.d(TAG, "syncUpdatedProfiles:" + id);
                                DocumentSnapshot document = task.getResult();
                                Helper.ref().getSharedPreferences().edit().putString(FB_SELECTED_SCHOOL, document.getId()).apply();
                                String schoolId = Helper.ref().getSharedPreferences().getString(FB_SELECTED_SCHOOL, "");
                                Log.d(TAG, "updateAllNonSyncedProfiles" + schoolId);
                                FirebaseOperations.ref.operations.updateAllNonSyncedProfiles(schoolId);
                            } else {
                                Log.d(TAG, "Error getting documents: ", task.getException());
                            }
                        }
                    });
        }
    }

    private void registerSyncListenersOffline() {
        final String id = Helper.ref().getSharedPreferences().getString(SCHOOL_ID, "");
        School school = sInstance.getOperations().findSchoolById(id);
        if (school != null) {
            Log.d(TAG, "init listeners for school:" + school.getFirebaseId());
            FirebaseOperations.ref.initListeners(school.getFirebaseId());
        }
    }

    private void registerSyncListeners(final boolean shouldCallBack) {
        // find school by email id
        Log.d(TAG, "registerSyncListeners");
        final String id = Helper.ref().getSharedPreferences().getString(SCHOOL_ID, "");
        if (id != null) {
            db.collection("School")
                    .document(id)
                    .get()
                    .addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
                        @Override
                        public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                            if (task.isSuccessful()) {
                                DocumentSnapshot document = task.getResult();
                                Log.d(TAG, "Query firebase school collection with id:" + id);
                                Helper.ref().getSharedPreferences().edit().putString(FB_SELECTED_SCHOOL, document.getId()).apply();
                                String schoolId = Helper.ref().getSharedPreferences().getString(FB_SELECTED_SCHOOL, "");

                                School school = document.toObject(School.class);
                                school.setFirebaseId(document.getId());
                                Log.d(TAG, "creating school" + school.getName());
                                operations.upsertSchool(school);

                                String schoolJsonString = Helper.findSchool(id);
                                Log.d(TAG, "init listeners for school:" + schoolId);
                                FirebaseOperations.ref.initListeners(schoolId);
                                FirebaseOperations.ref.callback.loginSucceed(schoolJsonString, shouldCallBack);
                            } else {
                                Log.d(TAG, "Error getting documents: ", task.getException());
                                FirebaseOperations.ref.callback.loginFailed("School Not Found");
                            }
                        }
                    });
        }
    }

    public void unRegisterListeners() {
        Log.d(TAG, "unRegisterListeners");
        if (this.schoolListener != null) {
            this.schoolListener.remove();
            this.schoolListener = null;
        }

        if (this.sectionListener != null) {
            this.sectionListener.remove();
            this.sectionListener = null;
        }

        if (this.studentListeners != null) {
            for (Map.Entry<String, ListenerRegistration> entry : this.studentListeners.entrySet()) {
                ListenerRegistration t = (ListenerRegistration) entry.getValue();
                if (t != null) {
                    t.remove();
                }
            }
            this.studentListeners.clear();
        }
    }

    public static FirebaseOperations getInitializedInstance() {
        return sInstance;
    }

    public static FirebaseOperations getInstance(Context context, DbOperations operations, AuthCallBack callBack) {
        if (sInstance == null) {
            synchronized (LOCK) {
                Log.d(TAG, "Creating new database instance");
                sInstance = new FirebaseOperations(context, operations, callBack);
                sInstance.context = context;
            }
        }
        return sInstance;
    }

    private void initListeners(final String schoolId) {

        if (FirebaseOperations.ref.sectionListener == null) {
            FirebaseOperations.ref.sectionListener = FirebaseOperations.ref.initSectionSync(schoolId);
        }

        operations.initFirebaseSyncForAllCachedStudents(schoolId);

        this.schoolRef = db.collection(Helper.SCHOOL_COLLECTION)
                .document(schoolId);

        FirebaseOperations.ref.schoolListener = this.schoolRef.addSnapshotListener(
                new EventListener<DocumentSnapshot>() {
                    @Override
                    public void onEvent(@Nullable DocumentSnapshot documentSnapshot,
                                        @Nullable FirebaseFirestoreException e) {

                        if (e != null) {
                            Log.w(TAG, "Listen failed.", e);
                            return;
                        }

                        String source = documentSnapshot.getMetadata().isFromCache() ?
                                CACHE : SERVER;

                        if (source.equalsIgnoreCase(SERVER)) {
                            if (documentSnapshot != null && documentSnapshot.exists()) {
                                Log.d(TAG, source + " Current data: " + documentSnapshot.getData());
                                School school = documentSnapshot.toObject(School.class);
                                school.setFirebaseId(documentSnapshot.getId());
                                Log.d(TAG, "school" + school.getName());

                                if (source.equalsIgnoreCase(SERVER)) {
                                    operations.upsertSchool(school);
                                }

                                if (FirebaseOperations.ref.sectionListener == null) {
                                    FirebaseOperations.ref.sectionListener = FirebaseOperations.ref.initSectionSync(schoolId);
                                }

                            } else {
                                Log.d(TAG, source + " Current data: null");
                                if (FirebaseOperations.ref.sectionListener != null) {
                                    FirebaseOperations.ref.sectionListener.remove();
                                    FirebaseOperations.ref.sectionListener = null;
                                }
                                if (source.equalsIgnoreCase(SERVER)) {
                                    String schoolId = Helper.ref().getSharedPreferences().getString(FB_SELECTED_SCHOOL, "");
                                    operations.deleteSchoolById(schoolId);
                                }
                            }
                        }
                    }
                }
        );
    }

    private ListenerRegistration initSectionSync(final String schoolId) {
        this.sectionCollectionRef = db.collection(Helper.SCHOOL_COLLECTION + "/" + schoolId + "/" + Helper.SECTION_COLLECTION);

        ListenerRegistration sectionListener = this.sectionCollectionRef.addSnapshotListener(
                new EventListener<QuerySnapshot>() {
                    @Override
                    public void onEvent(@javax.annotation.Nullable QuerySnapshot queryDocumentSnapshots, @javax.annotation.Nullable FirebaseFirestoreException e) {
                        if (e != null) {
                            Log.w(TAG, "Listen failed in sectionListener.", e);
                            return;
                        }
                        if (queryDocumentSnapshots != null) {
                        for (DocumentChange dc : queryDocumentSnapshots.getDocumentChanges()) {
                            switch (dc.getType()) {
                                case ADDED:
                                    Log.d(TAG, "New Section: " + dc.getDocument().getData());
                                    FirebaseOperations.ref.createSection(schoolId, dc.getDocument());
                                    break;
                                case MODIFIED:
                                    Log.d(TAG, "Modified Section: " + dc.getDocument().getData());
                                    FirebaseOperations.ref.createSection(schoolId, dc.getDocument());
                                    break;
                                case REMOVED:
                                    Log.d(TAG, "Removed Section: " + dc.getDocument().getData());
                                    FirebaseOperations.ref.removeSection(schoolId, dc.getDocument());
                                    break;
                            }
                        }

                            for (QueryDocumentSnapshot snapshots : queryDocumentSnapshots) {
                                String source = snapshots.getMetadata().isFromCache() ?
                                        CACHE : SERVER;
                                Log.d(TAG, "Received Sections using :" + source);
                            }
                        }
                    }
                }
        );
        return sectionListener;
    }

    private void removeSection(String schoolId, QueryDocumentSnapshot snapshot) {
        Section section = snapshot.toObject(Section.class);
        section.setFirebaseId(snapshot.getId());
        FirebaseOperations.ref.removeStudentListener(schoolId, section.getFirebaseId());
        FirebaseOperations.ref.operations.deleteSectionById(section.getFirebaseId());
    }

    private Section createSection(String schoolId, QueryDocumentSnapshot snapshot) {
        Section section = snapshot.toObject(Section.class);
        section.setFirebaseId(snapshot.getId());
        section.setSchoolId(schoolId);
        FirebaseOperations.ref.addStudentListener(schoolId, section.getFirebaseId());
        FirebaseOperations.ref.operations.upsertSection(section);
        Log.d(TAG, "created/updated section:" + section.getFirebaseId());
        return section;
    }

    public void addStudentListener(String schoolId, String sectionId) {
        final String sKey = schoolId + "/" + sectionId;
        ListenerRegistration listenerRegistration = FirebaseOperations.ref.studentListeners.get(sKey);
        if (listenerRegistration == null) {
            Log.d(TAG, "Adding Student Listener for: " + schoolId + " " + sectionId);
            ListenerRegistration s = FirebaseOperations.ref.initStudentSync(schoolId, sectionId);
            FirebaseOperations.ref.studentListeners.put(sKey, s);
        }
    }

    public void removeStudentListener(String schoolId, String sectionId) {
        final String sKey = schoolId + "/" + sectionId;
        ListenerRegistration listenerRegistration = FirebaseOperations.ref.studentListeners.get(sKey);
        if (listenerRegistration != null) {
            Log.d(TAG, "Remove Student Listener for: " + schoolId + " " + sectionId);
            FirebaseOperations.ref.studentListeners.remove(sKey);
        }
    }

    public ListenerRegistration initStudentSync(final String schoolId, final String sectionId) {
        this.studentCollectionRef = db.collection(Helper.SCHOOL_COLLECTION + "/" + schoolId + "/" + Helper.SECTION_COLLECTION + "/" + sectionId + "/" + Helper.STUDENT_COLLECTION);

        ListenerRegistration studentListener = this.studentCollectionRef.addSnapshotListener(
                new EventListener<QuerySnapshot>() {
                    @Override
                    public void onEvent(@javax.annotation.Nullable QuerySnapshot queryDocumentSnapshots, @javax.annotation.Nullable FirebaseFirestoreException e) {
                        if (e != null) {
                            Log.w(TAG, "Listen failed in studentListener.", e);
                            return;
                        }
                        if (queryDocumentSnapshots != null) {
                        for (DocumentChange dc : queryDocumentSnapshots.getDocumentChanges()) {
                            switch (dc.getType()) {
                                case ADDED:
                                    Log.d(TAG, "New Student: " + dc.getDocument().getData());
                                    FirebaseOperations.ref.createStudent(schoolId, sectionId, dc.getDocument(), true);
                                    break;
                                case MODIFIED:
                                    Log.d(TAG, "Modified Student: " + dc.getDocument().getData());
                                    FirebaseOperations.ref.createStudent(schoolId, sectionId, dc.getDocument(), false);
                                    break;
                                case REMOVED:
                                    FirebaseOperations.ref.operations.deleteStudentById(dc.getDocument().getId());
                                    Log.d(TAG, "Removed Student: " + dc.getDocument().getData());
                                    break;
                            }
                        }


                            for (QueryDocumentSnapshot snapshots : queryDocumentSnapshots) {
                                String source = snapshots.getMetadata().isFromCache() ?
                                        CACHE : SERVER;
                                Log.d(TAG, "Received student using :" + source);
                            }
                        }
                    }
                }
        );
        return studentListener;
    }

    private Student createStudent(String schoolId, String sectionId, QueryDocumentSnapshot s, boolean isNew) {
        Student student = new Student();
        if(s.getData().get("countryCode")!=null){
            student.setCountryCode(s.getData().get("countryCode").toString());
        }
        if(s.getData().get("gender")!=null){
            student.setGender(s.getData().get("gender").toString());
        }
        if(s.getData().get("image")!=null){
            student.setImage(s.getData().get("image").toString());
        }
        if(s.getData().get("link")!=null){
            student.setLink((Boolean)s.getData().get("link"));
        }
       if(s.getData().get("name")!=null){
           student.setName(s.getData().get("name").toString());
       }
        if(s.getData().get("password")!=null){
            student.setPassword(s.getData().get("password").toString());
        }
        if(s.getData().get("phoneNumber")!=null){
            student.setPhoneNumber(s.getData().get("phoneNumber").toString());
        }
        if(s.getData().get("progressId")!=null){
            student.setProgressId(s.getData().get("progressId").toString());
        }
        if(s.getData().get("age") == null){
            student.setAge(0);
        }
        else {
            Log.d(TAG, "created student: " +s.getData().get("age") );
            student.setAge(Integer.parseInt(s.getData().get("age").toString()));
        }
        HashMap profile = (HashMap) s.get("profile");
        if (profile != null && !profile.isEmpty()) {
            String profileInfo = new Gson().toJson(profile);
            student.setProfileInfo(profileInfo);
        }

        student.setSynced(true);
        student.setFirebaseId(s.getId());
        student.setSchoolId(schoolId);
        student.setSectionId(sectionId);
        FirebaseOperations.ref.operations.upsertStudent(student);
        Log.d(TAG, "created student: " + student.getFirebaseId());
        return student;
    }

    public static void syncProfile(String schoolId, String sectionId, String studentId, String profileData, String progressId) {
        // First update to Local DB
        FirebaseOperations.ref.operations.updateStudentProfileToLocalDB(schoolId, sectionId, studentId, profileData, progressId);
    }

    public static void historyProgress(String chapterId,
                                       String chapterName,
                                       String lessonId,
                                       String lessonName,
                                       String progressId,
                                       String school,
                                       String section,
                                       String subjectCode,
                                       Integer score,
                                       String assignmentId,
                                       String name,
                                       Integer timeSpent
                                       ) {
        // First update to Local DB
        FirebaseOperations.ref.operations.createHistoricalProgress(chapterId, chapterName, lessonId, lessonName, progressId,
                school, section, subjectCode, score, assignmentId,name,timeSpent);
    }


    public FirebaseFirestore getDb() {
        return db;
    }

    public DbOperations getOperations() {
        return operations;
    }
}
