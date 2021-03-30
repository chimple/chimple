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
        Log.d(TAG, "Start Sync Operation - StartSyncWorker");
        Helper helper = Helper.getInstance(this.context, new AuthCallBack() {
            @Override
            public void loginSucceed(String schoolInfo, boolean shouldCallBack) {
                Log.d(TAG, "Login Succeed - StartSyncWorker");
            }

            @Override
            public void loginFailed(String reason) {
                Log.d(TAG, "Login Failed - StartSyncWorker");
            }
        });
        if (helper != null) {
            if (!helper.isFirebaseUserLoggedIn()) {
                Log.d(TAG, "Start Sync Operation Auth - StartSyncWorker");
                helper.auth(false);
            } else {
                Log.d(TAG, "Start Sync Operation Enable Sync - StartSyncWorker");
                helper.enableSync(false);
            }
        }
        return Result.success();
    }
}
