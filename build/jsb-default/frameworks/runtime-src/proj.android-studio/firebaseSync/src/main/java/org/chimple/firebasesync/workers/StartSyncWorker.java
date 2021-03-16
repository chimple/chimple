package org.chimple.firebasesync.workers;

import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

import org.chimple.firebasesync.auth.AuthCallBack;
import org.chimple.firebasesync.database.Helper;

public class StartSyncWorker extends Worker {

    private static final String TAG = StartSyncWorker.class.getName();
    private Context context;

    public StartSyncWorker(@NonNull Context context, @NonNull WorkerParameters workerParams) {
        super(context, workerParams);
        this.context = context;
    }

    @NonNull
    @Override
    public Result doWork() {
        Log.d(TAG, "Start Sync Operation");
        Helper helper = Helper.getInstance(this.context, new AuthCallBack() {
            @Override
            public void loginSucceed(String schoolInfo) {
                Log.d(TAG, "Login Succeed");
            }

            @Override
            public void loginFailed(String reason) {
                Log.d(TAG, "Login Failed");
            }
        });
        if (helper != null) {
            if (!helper.isFirebaseUserLoggedIn()) {
                Log.d(TAG, "Start Sync Operation Auth");
                helper.auth();
            } else {
                Log.d(TAG, "Start Sync Operation Enable Sync");
                helper.enableSync();
            }
        }
        return Result.success();
    }
}
