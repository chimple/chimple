package org.chimple.bahama.database;

import android.content.Context;
import android.content.SharedPreferences;

public class Helper {
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

    public Helper(SharedPreferences sharedPreferences, Context context) {
        this.sharedPreferences = sharedPreferences;
        this.context = context;
    }

    public static Helper getInstance(Context context, SharedPreferences sharedPreferences) {
        if (sInstance == null) {
            synchronized (LOCK) {
                sInstance = new Helper(sharedPreferences, context);
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
}
