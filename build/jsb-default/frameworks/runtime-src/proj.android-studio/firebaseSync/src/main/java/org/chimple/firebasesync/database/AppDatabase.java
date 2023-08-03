package org.chimple.firebasesync.database;

import android.content.Context;
import android.util.Log;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;

import org.chimple.firebasesync.model.School;
import org.chimple.firebasesync.model.Section;
import org.chimple.firebasesync.model.Student;


@Database(entities = {School.class, Section.class, Student.class}, version = 1, exportSchema = false)
public abstract class AppDatabase extends RoomDatabase {

    private static final String TAG = AppDatabase.class.getSimpleName();
    private static final Object LOCK = new Object();
    private static final String DATABASE_NAME = "db";
    private static AppDatabase sInstance;

    public static AppDatabase getInstance(Context context) {
        if (sInstance == null) {
            synchronized (LOCK) {
                Log.d(TAG, "Creating new database instance db");
                sInstance = Room.databaseBuilder(context.getApplicationContext(),
                        AppDatabase.class, AppDatabase.DATABASE_NAME)
                        .build();
            }
        }
        Log.d(TAG, "Getting the database instance db");
        return sInstance;
    }

    public abstract SchoolDao schoolDao();

    public abstract SectionDao sectionDao();

    public abstract StudentDao studentDao();

}
