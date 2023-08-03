package org.chimple.bahama.logger;

import android.app.Activity;
import android.app.ActivityManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.CountDownTimer;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import java.util.List;

public class LockScreenReceiver extends BroadcastReceiver {
    private Context context;
    private static final String TAG = LockScreenReceiver.class.getSimpleName();
    private CountDownTimer appLifecycleObserverTimer = null;
    private static final int APP_LIFECYCLE_TIMER = 1 * 60 * 1000; // 5 min
    private Activity activity = null;

    public LockScreenReceiver() {
        
    }

    public LockScreenReceiver(Activity activity) {
        this.activity = activity;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        this.context = context;
        Log.d("LockScreenReceiver", "broadcast received");

        String action = intent.getAction();

        if (action.equals(Intent.ACTION_SCREEN_OFF)) {
            // start timer
            Log.d("LockScreenReceiver", "Start Kill Timer");
            createLauncherLifeCycleTimer();
        } else if (action.equals(Intent.ACTION_SCREEN_ON)) {
            Log.d("LockScreenReceiver", "Stop Kill Timer");
            stopAppLifecycleObserverTimer();

        }
    }

    private void forceClose() {
        ActivityManager am = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningAppProcessInfo> pids = am.getRunningAppProcesses();
        int processid = 0;
        for (int i = 0; i < pids.size(); i++) {
            ActivityManager.RunningAppProcessInfo info = pids.get(i);
            Log.d(TAG, "pid name:" + info.pid);
            Log.d(TAG, "process name:" + info.processName);
            Log.d(TAG, "uid" + info.uid);
            if (info.processName.equalsIgnoreCase("org.chimple.bahama")) {
                processid = info.pid;
            }
        }
        if (processid > 0) {
            Log.d(TAG, "killing process:" + processid);
            this.activity.finishAffinity();
            //android.os.Process.killProcess(processid);
        }
    }

    private void createLauncherLifeCycleTimer() {
        try {
            synchronized (LockScreenReceiver.class) {
                new Handler(Looper.getMainLooper()).post(new Runnable() {
                    @Override
                    public void run() {
                        if (appLifecycleObserverTimer == null) {
                            appLifecycleObserverTimer = new CountDownTimer(APP_LIFECYCLE_TIMER, 10000) {
                                public void onTick(long millisUntilFinished) {
                                    Log.d(TAG, "APP_LIFECYCLE_TIMER ...");
                                }

                                public void onFinish() {
                                    Log.d(TAG, "force closing LauncherApplication");
                                    forceClose();
                                }
                            }.start();
                        }
                    }
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    private void stopAppLifecycleObserverTimer() {
        if (appLifecycleObserverTimer
                != null) {
            Log.d(TAG, "stopAppLifecycleObserverTimer");
            appLifecycleObserverTimer.cancel();
            appLifecycleObserverTimer = null;
        }
    }
}