package org.chimple.bahama.database;

import android.util.Log;

import androidx.annotation.NonNull;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.firestore.DocumentReference;
import com.google.gson.Gson;

import org.chimple.bahama.model.School;
import org.chimple.bahama.model.Section;
import org.chimple.bahama.model.Student;

import java.util.HashMap;
import java.util.List;
import java.util.concurrent.Future;

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
                Log.d(TAG, "Upsert school: " + school);
                db.schoolDao().insertSchool(school);
                School s = db.schoolDao().findSchoolBySchoolCode(school.getSchoolCode());
                Log.d(TAG, "Found school: " + s);
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
                Log.d(TAG, "Upsert Student: " + student);
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


//    public void convertSectionsToJson(final String schoolId) {
//        AppExecutors.getInstance().diskIO().execute(new Runnable() {
//            @Override
//            public void run() {
//                List<Section> sections = db.sectionDao().loadAllSectionsBySchoolId(schoolId);
//                if (sections != null) {
//                    Gson gson = new GsonBuilder().create();
//                    String jsonSections = gson.toJson(sections);
//                    FirebaseOperations.getInitializedInstance().dbOperationResult(jsonSections);
//                }
//            }
//        });
//    }
//
//    public void convertStudentsForSchoolToJson(final String schoolId) {
//        AppExecutors.getInstance().diskIO().execute(new Runnable() {
//            @Override
//            public void run() {
//                List<Student> students;
//                students = db.studentDao().loadAllStudentsBySchoolId(schoolId);
//                if (students != null) {
//                    Gson gson = new GsonBuilder().create();
//                    String jsonSections = gson.toJson(students);
//                    FirebaseOperations.getInitializedInstance().dbOperationResult(jsonSections);
//                }
//            }
//        });
//    }
//
//    public void convertStudentsForSchoolAndSectionToJson(final String schoolId, final String sectionId) {
//        AppExecutors.getInstance().diskIO().execute(new Runnable() {
//            @Override
//            public void run() {
//                List<Student> students = db.studentDao().loadAllStudentsBySchoolIdAndSectionId(schoolId, sectionId);
//                List<Student> students = db.studentDao().loadAllStudentsBySchoolIdAndSectionId(schoolId, sectionId);
//                if (students != null) {
//                    Gson gson = new GsonBuilder().create();
//                    String jsonSections = gson.toJson(students);
//                    FirebaseOperations.getInitializedInstance().dbOperationResult(jsonSections);
//                }
//            }
//        });
//    }

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
                Log.d(TAG, "Profiles to Sync, count:" + unSyncProfiles.size());
                for (final Student s : unSyncProfiles) {
                    updateStudentDoc(s);
                }
            }
        });
    }

    public void updateStudentProfileToLocalDB(final String schoolId, final String sectionId, final String firebaseId, final String profile) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                db.studentDao().updateStudentProfile(schoolId, sectionId, profile, firebaseId, false);
                Log.d(TAG, "Updated student Profile:" + profile + " for:" + firebaseId);
                updateProfileForStudentToFirebase(schoolId, sectionId, firebaseId);
            }
        });
    }

    private void updateStudentDoc(final Student s) {
        DocumentReference student = FirebaseOperations.getInitializedInstance().getDb().collection(SCHOOL_COLLECTION + "/" + s.getSchoolId() + "/" + SECTION_COLLECTION + "/" + s.getSectionId() + "/" + STUDENT_COLLECTION).document(s.getFirebaseId());
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

    private void updateProfileForStudentToFirebase(final String schoolId, final String sectionId, final String firebaseId) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                Student unSyncProfile = db.studentDao().findNonSyncedProfileForStudent(schoolId, sectionId, firebaseId);
                Log.d(TAG, "Profiles to Sync for student:" + unSyncProfile);
                updateStudentDoc(unSyncProfile);
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

    public School findSchoolByEmail(final String email) {
        try {
            final School[] mutable = new School[1];
            Future<School[]> result = AppExecutors.getInstance().diskIO().submit(new Runnable() {
                @Override
                public void run() {
                    mutable[0] = db.schoolDao().findSchoolBySchoolCode(email);
                    Log.d(TAG, "found school:" + mutable[0]);
                }
            }, mutable);
            School[] schools = result.get();
            return schools[0];
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Section> findSectionsBySchool(final String schoolId) {
        try {
            final List[] mutable = new List[1];
            Future<List[]> result = AppExecutors.getInstance().diskIO().submit(new Runnable() {
                @Override
                public void run() {
                    List sections = db.sectionDao().loadAllSectionsBySchoolId(schoolId);
                    Log.d(TAG, "found sections:" + sections.size());
                    mutable[0] = sections;
                }
            }, mutable);
            List[] t = result.get();
            Log.d(TAG, "found t.size:" + t.length);
            return (List<Section>) t[0];
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public List loadAllStudentsForSchoolAndSection(final String schoolId, final String sectionId) {
        try {
            final List[] mutable = new List[1];
            Future<List[]> result = AppExecutors.getInstance().diskIO().submit(new Runnable() {
                @Override
                public void run() {
                    List students = db.studentDao().loadAllStudentsBySchoolIdAndSectionId(schoolId, sectionId);
                    mutable[0] = students;
                    Log.d(TAG, "found students:" + students.size());
                }
            }, mutable);
            List[] t = result.get();
            return (List) t[0];
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
