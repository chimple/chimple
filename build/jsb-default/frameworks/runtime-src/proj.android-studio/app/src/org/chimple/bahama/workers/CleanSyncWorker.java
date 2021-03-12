package org.chimple.bahama.workers;

import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

import org.chimple.bahama.database.FirebaseOperations;
import org.chimple.bahama.database.Helper;

public class CleanSyncWorker extends Worker {

    private static final String TAG = CleanSyncWorker.class.getName();
    private Context context;

    public CleanSyncWorker(@NonNull Context context, @NonNull WorkerParameters workerParams) {
        super(context, workerParams);
        this.context = context;
    }

    @NonNull
    @Override
    public Result doWork() {
        Log.d(TAG, "Clean Sync Operation");
        if (Helper.getInstance(this.context) != null) {
            Helper.getInstance(this.context).scheduleStartSync();
        }
        return Result.success();
    }
}
