package org.chimple.firebasesync.workers;

import android.content.Context;
import android.util.Log;

import androidx.work.Constraints;
import androidx.work.NetworkType;
import androidx.work.OneTimeWorkRequest;
import androidx.work.PeriodicWorkRequest;
import androidx.work.WorkManager;

import java.util.concurrent.TimeUnit;

public class SyncOperationManager {
    private static final String TAG = SyncOperationManager.class.getName();
    private static SyncOperationManager sInstance = null;
    private static final Object LOCK = new Object();
    private final Context context;
    private WorkManager workManager;

    private SyncOperationManager(Context context) {
        this.context = context;
    }

    public static SyncOperationManager getInstance(Context context) {
        if (sInstance == null) {
            synchronized (LOCK) {
                Log.d(TAG, "Init Sync Operation Manager");
                sInstance = new SyncOperationManager(context);
                sInstance.workManager = WorkManager.getInstance(context);
                sInstance.scheduleStartSync();
            }
        }

        return sInstance;
    }

    public void scheduleStartSync() {
        Log.d(TAG, "scheduleStartSync - build job");
        this.workManager.cancelAllWork();
        this.workManager
                .beginWith(this.buildSyncTask())
                .enqueue();

        this.workManager.enqueue(this.buildSyncPeriodTask());
    }

    private OneTimeWorkRequest buildSyncTask() {
        OneTimeWorkRequest oneTimeWorkRequest =
                new OneTimeWorkRequest.Builder(StartSyncWorker.class)
                        .setInitialDelay(30, TimeUnit.SECONDS)
                        .setConstraints(this.buildConstraint())
                        .build();
        return oneTimeWorkRequest;
    }

    private PeriodicWorkRequest buildSyncPeriodTask() {
        PeriodicWorkRequest periodicWorkRequest =
                new PeriodicWorkRequest.Builder(StartSyncWorker.class, 5, TimeUnit.MINUTES)
                        .setConstraints(this.buildConstraint())
                        .build();
        return periodicWorkRequest;
    }

    private Constraints buildConstraint() {
        Constraints constraints = new Constraints.Builder()
//                .setRequiresCharging(true)
                .setRequiredNetworkType(NetworkType.CONNECTED)
                .build();
        return constraints;
    }

    public static SyncOperationManager getsInstance() {
        return sInstance;
    }
}
