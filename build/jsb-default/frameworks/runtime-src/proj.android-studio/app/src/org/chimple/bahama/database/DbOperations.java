package org.chimple.bahama.database;

import android.util.Log;

import androidx.annotation.NonNull;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.firestore.DocumentReference;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import org.chimple.bahama.model.School;
import org.chimple.bahama.model.Section;
import org.chimple.bahama.model.Student;

import java.util.HashMap;
import java.util.List;

import static org.chimple.bahama.database.Helper.SCHOOL_COLLECTION;
import static org.chimple.bahama.database.Helper.SECTION_COLLECTION;
import static org.chimple.bahama.database.Helper.STUDENT_COLLECTION;

public class DbOperations {
    private static final Object LOCK = new Object();

    private DbOperations(AppDatabase db) {
        this.db = db;
    }

    private static final String TAG = DbOperations.class.getSimpleName();
    private static DbOperations sInstance;
    private static AppDatabase db;

    public static DbOperations getInstance(AppDatabase db) {
        if (sInstance == null) {
            synchronized (LOCK) {
                Log.d(TAG, "Creating new database instance");
                sInstance = new DbOperations(db);
            }
        }
        return sInstance;
    }

    public void upsertSchool(final School school) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                db.schoolDao().insertSchool(school);
                Log.d(TAG, "Upsert school: " + school);
            }
        });
    }

    public void upsertSection(final Section section) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                db.sectionDao().insertSection(section);
                Section Section1 = db.sectionDao().loadSectionById(section.getFirebaseId());
                Log.d(TAG, "Upsert Section: " + Section1);
            }
        });
    }

    public void upsertStudent(final Student student) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                db.studentDao().insertStudent(student);
                Student s1 = db.studentDao().loadStudentById(student.getFirebaseId());
                Log.d(TAG, "Upsert Student: " + s1);
            }
        });
    }

    public void deleteSchool(final School school) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                db.schoolDao().delete(school);
                Log.d(TAG, "Delete School: " + school);
            }
        });
    }

    public void deleteSectionById(final String firebaseId) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                db.sectionDao().deleteById(firebaseId);
                Log.d(TAG, "Deleted Section: " + firebaseId);
                db.studentDao().deleteBySectionId(firebaseId);
                Log.d(TAG, "Deleted All students by section Id: " + firebaseId);
            }
        });
    }

    public void deleteStudentById(final String firebaseId) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                db.studentDao().deleteById(firebaseId);
                Log.d(TAG, "Delete Student: " + firebaseId);
            }
        });
    }

    public void deleteStudent(final Student student) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                db.studentDao().delete(student);
                Log.d(TAG, "Delete Student: " + student);
            }
        });
    }

    public void deleteSection(final Section section) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                db.sectionDao().delete(section);
                Log.d(TAG, "Delete Section: " + section);
            }
        });
    }

    public void deleteSchoolById(final String firebaseId) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                db.schoolDao().deleteById(firebaseId);
                Log.d(TAG, "Delete School: " + firebaseId);
            }
        });
    }

    public void convertSchoolToJson(final String firebaseId) {
        final School[] school = new School[1];
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                school[0] = db.schoolDao().loadSchoolById(firebaseId);
                Log.d(TAG, "School loaded" + school[0]);
                if (school != null) {
                    Gson gson = new GsonBuilder().create();
                    String jsonSchool = gson.toJson(school);
                    FirebaseOperations.getInitializedInstance().dbOperationResult(jsonSchool);
                }
            }
        });
    }

    public void convertSectionsToJson(final String schoolId) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                List<Section> sections = db.sectionDao().loadAllSectionsBySchoolId(schoolId);
                if (sections != null) {
                    Gson gson = new GsonBuilder().create();
                    String jsonSections = gson.toJson(sections);
                    FirebaseOperations.getInitializedInstance().dbOperationResult(jsonSections);
                }
            }
        });
    }

    public void convertStudentsForSchoolToJson(final String schoolId) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                List<Student> students;
                students = db.studentDao().loadAllStudentsBySchoolId(schoolId);
                if (students != null) {
                    Gson gson = new GsonBuilder().create();
                    String jsonSections = gson.toJson(students);
                    FirebaseOperations.getInitializedInstance().dbOperationResult(jsonSections);
                }
            }
        });
    }

    public void convertStudentsForSchoolAndSectionToJson(final String schoolId, final String sectionId) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                List<Student> students = db.studentDao().loadAllStudentsBySchoolIdAndSectionId(schoolId, sectionId);
                if (students != null) {
                    Gson gson = new GsonBuilder().create();
                    String jsonSections = gson.toJson(students);
                    FirebaseOperations.getInitializedInstance().dbOperationResult(jsonSections);
                }
            }
        });
    }

    public void loadStudentById(final String firebaseId) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                Student s = db.studentDao().loadStudentById(firebaseId);
                Log.d(TAG, "Student loaded" + s);
            }
        });
    }

    public void loadSectionById(final String firebaseId) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                Section s = db.sectionDao().loadSectionById(firebaseId);
                Log.d(TAG, "Section loaded" + s);
            }
        });
    }

    public void loadAllSchools(final String firebaseId) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                List<School> schools = db.schoolDao().loadAllSchools(firebaseId);
                for (School s : schools) {
                    Log.d(TAG, "School found:" + s);
                }
            }
        });
    }

    public void loadAllSectionsWithStudents(final String schoolId) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                List<Section> s = db.sectionDao().loadAllSectionsBySchoolId(schoolId);
                for (Section s1 : s) {
                    Log.d(TAG, "Section found:" + s1);
                    loadAllStudents(schoolId, s1.getFirebaseId());
                }
            }
        });
    }

    public void loadAllStudents(final String schoolId, final String sectionId) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                List<Student> s = db.studentDao().loadAllStudentsBySchoolIdAndSectionId(schoolId, sectionId);
                for (Student s1 : s) {
                    Log.d(TAG, "Student found:" + s1);
                }
            }
        });
    }

    public void updateSync(final String firebaseId, final boolean sync) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                db.studentDao().updateSync(firebaseId, sync);
            }
        });
    }

    public void updateAllNonSyncedProfiles(final String schoolId) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                List<Student> unSyncProfiles = db.studentDao().findAllNonSyncedProfiles(schoolId);
                for (final Student s : unSyncProfiles) {
                    DocumentReference student = FirebaseOperations.getInitializedInstance().getDb().collection(SCHOOL_COLLECTION + "/" + schoolId + "/" + SECTION_COLLECTION + "/" + s.getSectionId() + "/" + STUDENT_COLLECTION).document(s.getFirebaseId());
                    HashMap updatedProfileMap = new Gson().fromJson(s.getProfileInfo(), HashMap.class);
                    student.update("profile", updatedProfileMap)
                            .addOnSuccessListener(new OnSuccessListener<Void>() {
                                @Override
                                public void onSuccess(Void aVoid) {
                                    updateSync(s.getFirebaseId(), true);
                                    Log.d(TAG, "DocumentSnapshot successfully updated! Sync Completed for:" + s.getFirebaseId());
                                }
                            })
                            .addOnFailureListener(new OnFailureListener() {
                                @Override
                                public void onFailure(@NonNull Exception e) {
                                    Log.w(TAG, "Error updating document Sync Failed for :" + s.getFirebaseId(), e);
                                    updateSync(s.getFirebaseId(), false);
                                }
                            });
                }
            }
        });
    }

    public void updateStudentProfile(final String profile, final String firebaseId) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                db.studentDao().updateStudentProfile(profile, firebaseId, false);
                Log.d(TAG, "Updated student Profile:" + profile + " for:" + firebaseId);
            }
        });
    }


    public void initFirebaseSyncForAllCachedStudents(final String schoolId) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                List<Section> s = db.sectionDao().loadAllSectionsBySchoolId(schoolId);
                for (Section s1 : s) {
                    FirebaseOperations.getInitializedInstance().addStudentListener(
                            schoolId, s1.getFirebaseId()
                    );
                }
            }
        });
    }
}
