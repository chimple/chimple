package org.chimple.firebasesync.database;

import android.util.Log;

import androidx.annotation.NonNull;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FieldValue;
import com.google.firebase.firestore.SetOptions;

import com.google.gson.Gson;

import org.chimple.firebasesync.model.School;
import org.chimple.firebasesync.model.Section;
import org.chimple.firebasesync.model.Student;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Future;

import static org.chimple.firebasesync.database.Helper.HISTORICAL_PROGRESS_COLLECTION;
import static org.chimple.firebasesync.database.Helper.SCHOOL_COLLECTION;
import static org.chimple.firebasesync.database.Helper.SECTION_COLLECTION;
import static org.chimple.firebasesync.database.Helper.STUDENT_COLLECTION;
import static org.chimple.firebasesync.database.Helper.LEADERBOARD_COLLECTION;;

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
                School s = db.schoolDao().findSchoolById(school.getFirebaseId());
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

    // public void convertSectionsToJson(final String schoolId) {
    // AppExecutors.getInstance().diskIO().execute(new Runnable() {
    // @Override
    // public void run() {
    // List<Section> sections = db.sectionDao().loadAllSectionsBySchoolId(schoolId);
    // if (sections != null) {
    // Gson gson = new GsonBuilder().create();
    // String jsonSections = gson.toJson(sections);
    // FirebaseOperations.getInitializedInstance().dbOperationResult(jsonSections);
    // }
    // }
    // });
    // }
    //
    // public void convertStudentsForSchoolToJson(final String schoolId) {
    // AppExecutors.getInstance().diskIO().execute(new Runnable() {
    // @Override
    // public void run() {
    // List<Student> students;
    // students = db.studentDao().loadAllStudentsBySchoolId(schoolId);
    // if (students != null) {
    // Gson gson = new GsonBuilder().create();
    // String jsonSections = gson.toJson(students);
    // FirebaseOperations.getInitializedInstance().dbOperationResult(jsonSections);
    // }
    // }
    // });
    // }
    //
    // public void convertStudentsForSchoolAndSectionToJson(final String schoolId,
    // final String sectionId) {
    // AppExecutors.getInstance().diskIO().execute(new Runnable() {
    // @Override
    // public void run() {
    // List<Student> students =
    // db.studentDao().loadAllStudentsBySchoolIdAndSectionId(schoolId, sectionId);
    // List<Student> students =
    // db.studentDao().loadAllStudentsBySchoolIdAndSectionId(schoolId, sectionId);
    // if (students != null) {
    // Gson gson = new GsonBuilder().create();
    // String jsonSections = gson.toJson(students);
    // FirebaseOperations.getInitializedInstance().dbOperationResult(jsonSections);
    // }
    // }
    // });
    // }

    public Student loadStudentById(final String firebaseId) {
        try {
            final Student[] mutable = new Student[1];
            Future<Student[]> result = AppExecutors.getInstance().diskIO().submit(new Runnable() {
                @Override
                public void run() {
                    mutable[0] = db.studentDao().loadStudentById(firebaseId);
                }
            }, mutable);

            Student[] student = result.get();
            return student[0];
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
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

    public void updateSync(final Student s, final boolean sync) {
        if (s != null) {
            AppExecutors.getInstance().diskIO().execute(new Runnable() {
                @Override
                public void run() {
                    db.studentDao().updateSync(s.getFirebaseId(), sync);
                    Student p = db.studentDao().findSyncedProfileForStudent(s.getSchoolId(), s.getSectionId(),
                            s.getFirebaseId());
                    if (p != null) {
                        Log.d(TAG, "Profile Synced:" + p.isSynced());
                    }
                }
            });
        }
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

    public void updateStudentProfileToLocalDB(final String schoolId, final String sectionId, final String firebaseId,
            final String profile, String progressId) {
        AppExecutors.getInstance().diskIO().execute(new Runnable() {
            @Override
            public void run() {
                db.studentDao().updateStudentProfile(schoolId, sectionId, profile, firebaseId, progressId, false);
                Log.d(TAG, "Updated student Profile:" + profile + " for:" + firebaseId);
                updateProfileForStudentToFirebase(schoolId, sectionId, firebaseId);
            }
        });
    }

    private void updateStudentDoc(final Student s) {
        if (s != null) {
            DocumentReference student = FirebaseOperations
                    .getInitializedInstance().getDb().collection(SCHOOL_COLLECTION + "/" + s.getSchoolId() + "/"
                            + SECTION_COLLECTION + "/" + s.getSectionId() + "/" + STUDENT_COLLECTION)
                    .document(s.getFirebaseId());
            HashMap updatedProfileMap = new Gson().fromJson(s.getProfileInfo(), HashMap.class);
            student.update("profile", updatedProfileMap,
                    "link", true,
                    "progressId", s.getProgressId())
                    .addOnSuccessListener(new OnSuccessListener<Void>() {
                        @Override
                        public void onSuccess(Void aVoid) {
                            updateSync(s, true);
                            Log.d(TAG, s.getName() + ": " + "DocumentSnapshot successfully updated! Sync Completed for:"
                                    + s.getFirebaseId());
                        }
                    })
                    .addOnFailureListener(new OnFailureListener() {
                        @Override
                        public void onFailure(@NonNull Exception e) {
                            Log.w(TAG, "Error updating document Sync Failed for :" + s.getFirebaseId(), e);
                            updateSync(s, false);
                        }
                    });
        }
    }

    private void updateProfileForStudentToFirebase(final String schoolId, final String sectionId,
            final String firebaseId) {
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
                            schoolId, s1.getFirebaseId());
                }
            }
        });
    }

    public School findSchoolById(final String id) {
        try {
            final School[] mutable = new School[1];
            Future<School[]> result = AppExecutors.getInstance().diskIO().submit(new Runnable() {
                @Override
                public void run() {
                    mutable[0] = db.schoolDao().findSchoolById(id);
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

    public void createHistoricalProgress(final String chapterId,
            final String chapterName,
            final String lessonId,
            final String lessonName,
            final String progressId,
            final String school,
            final String section,
            final String subjectCode,
            final Integer score,
            final String assignmentId,
            final String name,
            final Integer timeSpent) {
        Map<String, Object> historicalData = new HashMap<>();
        DocumentReference schoolSection = null;
        if (school != null && section != null) {
            schoolSection = FirebaseOperations.getInitializedInstance().getDb()
                    .collection(SCHOOL_COLLECTION + "/" + school + "/" + SECTION_COLLECTION).document(section);
        }
        historicalData.put("chapterId", chapterId);
        historicalData.put("chapterName", chapterName);
        historicalData.put("lessonId", lessonId);
        historicalData.put("lessonName", lessonName);
        historicalData.put("progressId", progressId);
        historicalData.put("section", schoolSection);
        historicalData.put("subjectCode", subjectCode);
        historicalData.put("score", score);
        historicalData.put("assignmentId", assignmentId);
        historicalData.put("date", FieldValue.serverTimestamp());

        Log.d(TAG, "Calling history progress Collection to insert record");

        CollectionReference collection = FirebaseOperations.getInitializedInstance().getDb()
                .collection(HISTORICAL_PROGRESS_COLLECTION);
        collection
                .add(historicalData)
                .addOnSuccessListener(new OnSuccessListener<DocumentReference>() {
                    @Override
                    public void onSuccess(DocumentReference documentReference) {
                        Log.d(TAG,
                                "DocumentSnapshot written with ID to history progress: " + documentReference.getId());
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Log.w(TAG, "Error adding document to history progress", e);
                    }
                });
        Map<String, Object> leaderBoardData = new HashMap<>();
        Map<String, Object> allData = new HashMap<>();
        Map<String,Object> progressData = new HashMap<>();
        Map<String,Object> weeklyData = new HashMap<>();
        FieldValue totalScore = FieldValue.increment(score);
        FieldValue lessonsPlayed = FieldValue.increment(1);
        FieldValue totalTimeSpent = FieldValue.increment(timeSpent);
        Map<String,Object> allTimeData = new HashMap<>();
        weeklyData.put("s",totalScore);
        weeklyData.put("l",lessonsPlayed);
        weeklyData.put("t",totalTimeSpent);
        allTimeData.put("s",totalScore);
        allTimeData.put("l",lessonsPlayed);
        allTimeData.put("t",totalTimeSpent);
        allData.put("w",weeklyData);
        allData.put("a",allTimeData);
        allData.put("n",name);
        progressData.put(progressId,allData);
        leaderBoardData.put("d",progressData);
        leaderBoardData.put("u", FieldValue.serverTimestamp());
        DocumentReference leaderboardDocRef = FirebaseOperations.getInitializedInstance().getDb()
                .collection(LEADERBOARD_COLLECTION).document(school + "-" + section);
        leaderboardDocRef
                .set(leaderBoardData, SetOptions.merge())
                .addOnSuccessListener(new OnSuccessListener<Void>() {
                    @Override
                    public void onSuccess(Void aVoid) {
                        Log.d(TAG,
                                "DocumentSnapshot written with ID to leaderboard: " + school + "-" + section);
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Log.w(TAG, "Error adding document to leaderboard", e);
                    }
                });
    }
}
