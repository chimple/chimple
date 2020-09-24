package org.chimple.bahama.logger;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;


public class ChimpleBootReceiver extends BroadcastReceiver {
    private static String TAG = ChimpleBootReceiver.class.getSimpleName();

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d(TAG, "diff Received ACTION_BOOT_COMPLETED and status bootCallReceived:" + ChimpleLogger.bootCallRecived);
        if (!ChimpleLogger.bootCallRecived &&
                (
                        intent.getAction().equals(Intent.ACTION_REBOOT) ||
                                intent.getAction().equals(Intent.ACTION_BOOT_COMPLETED) ||
                                intent.getAction().equals(Intent.ACTION_LOCKED_BOOT_COMPLETED)
                )
        ) {
            Log.d(TAG, "diff configureAlarms using ACTION_BOOT_COMPLETED");
            ChimpleLogger.configureAlarms(context, true);
        }
    }
}