/****************************************************************************
 Copyright (c) 2015-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
package org.chimple.bahama;


import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.os.Handler;
import android.os.Looper;
import android.os.Parcelable;
import android.os.RemoteException;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.android.installreferrer.api.InstallReferrerClient;
import com.android.installreferrer.api.InstallReferrerStateListener;
import com.android.installreferrer.api.ReferrerDetails;
import com.google.android.gms.ads.identifier.AdvertisingIdClient;
import com.google.android.gms.common.GooglePlayServicesNotAvailableException;
import com.google.android.gms.common.GooglePlayServicesRepairableException;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.analytics.FirebaseAnalytics;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;

import org.chimple.bahama.logger.ChimpleLogger;
import org.chimple.bahama.logger.LockScreenReceiver;
import org.chimple.bahama.logger.NotificationData;
import org.cocos2dx.javascript.SDKWrapper;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import static org.chimple.bahama.logger.ChimpleLogger.ADVERTISING_ID;
import static org.chimple.bahama.logger.ChimpleLogger.APP_INSTALLED_TIME;
import static org.chimple.bahama.logger.ChimpleLogger.APP_LAST_PLAYED_TIME;
import static org.chimple.bahama.logger.ChimpleLogger.FIREBASE_MESSAGES_SYNC;
import static org.chimple.bahama.logger.ChimpleLogger.FIREBASE_MESSAGE_TOKEN;

public class AppActivity extends com.sdkbox.plugin.SDKBoxActivity {
    private static final int STORAGE_PERMISSION_CODE = 101;
    protected ChimpleLogger logger;
    protected LockScreenReceiver lockScreenReceiver;
    private static final String TAG = AppActivity.class.getSimpleName();
    StringBuilder stringBuilder;
    private FirebaseAnalytics firebaseAnalytics = null;
    private final String PREFERENCE_FILE_KEY = "bahamaPreferences";
    private final String KEY_REFERRER_EXISTS = "referrer_exists";
    private final Executor backgroundExecutor = Executors.newSingleThreadExecutor();
    private final Executor advertisingApiBackgroundExecutor = Executors.newSingleThreadExecutor();
    private FirebaseFirestore mDatabase = FirebaseFirestore.getInstance();
    private static final int CAMERA_CODE = 31;
    public static final int YOUTUBE_CODE = 32;
    public static final int SEND_CODE = 33;
    private static String cameraResult = null;
    public static AppActivity app = null;
    private CountDownTimer repeatHandShakeTimer = null;
    private static final int REPEAT_HANDSHAKE_TIMER = 1 * 30 * 1000; // 30 second


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        firebaseAnalytics = FirebaseAnalytics.getInstance(this);
        logger = ChimpleLogger.getInstance(this, firebaseAnalytics);
        app = this;

        // Workaround in
        // https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            // Android launched another instance of the root activity into an existing task
            // so just quietly finish and go away, dropping the user back into the activity
            // at the top of the stack (ie: the last state of this task)
            // Don't need to finish it again since it's finished in super.onCreate .
            return;
        }
        // DO OTHER INITIALIZATION BELOW
        SDKWrapper.getInstance().init(this);
        checkPermission(Manifest.permission.CAMERA, CAMERA_CODE);

        //Start listening for the Screen On, Screen Off, and Boot completed actions
        IntentFilter filter = new IntentFilter(Intent.ACTION_SCREEN_ON);
        filter.addAction(Intent.ACTION_SCREEN_OFF);

        //Set up a receiver to listen for the Intents in this Service
        lockScreenReceiver = new LockScreenReceiver(this);
        registerReceiver(lockScreenReceiver, filter);


        stringBuilder = new StringBuilder();
        this.checkInstallReferrer(this);


        String installedTime = ChimpleLogger.getStringFromSharedPreference(this, ChimpleLogger.APP_INSTALLED_TIME);
        if (installedTime == null) {
            Log.d(TAG, "diff setting installed time:" + new Date().getTime());
            ChimpleLogger.storeInSharedPreference(this, ChimpleLogger.APP_INSTALLED_TIME, String.valueOf(new Date().getTime()));
        }
        ChimpleLogger.storeInSharedPreference(this, APP_LAST_PLAYED_TIME, "-1");
        ChimpleLogger.storeInSharedPreference(this, ChimpleLogger.DAILY_REMINDER_SHOWED_TIME, null);
        ChimpleLogger.storeInSharedPreference(this, ChimpleLogger.THREE_DAY_REMINDER_SHOWED_TIME, null);
        ChimpleLogger.storeInSharedPreference(this, ChimpleLogger.WEEKLY_REMINDER_SHOWED_TIME, null);
        initFirebaseMessageClient();
        ChimpleLogger.configureAlarms(this, false);

        ChimpleLogger.loadJSON(this, NotificationData.messages_en, ChimpleLogger.EN_LANG);
        ChimpleLogger.loadJSON(this, NotificationData.messages_hi, ChimpleLogger.HI_LANG);

        this.createRepeatHandShakeTimer();
        new CountDownTimer(5000, 1000) {
            @Override
            public void onTick(long millisUntilFinished) {
            }

            @Override
            public void onFinish() {
                Log.d(TAG, "start repeatHandShakeTimer");
                System.out.println("start repeatHandShakeTimer");
                if (app.repeatHandShakeTimer != null) {
                    app.repeatHandShakeTimer.cancel();
                    app.repeatHandShakeTimer.start();
                }
            }
        }.start();

        //Deep Links
        this.processDeepLink();        
    }

    public void processDeepLink() {
        //Deep Links
        Intent intent = getIntent();
        Log.d(TAG, "intent:" + intent);
        if (intent != null) {
            String action = intent.getAction();
            Uri uri = intent.getData();
            Log.d(TAG, "deep link action:" + action);
            Log.d(TAG, "deep link uri:" + uri);
            if (uri != null && action != null && action.equalsIgnoreCase("android.intent.action.VIEW")) {
                this.createOneTimeHandShakeTimer(uri.toString());
            }
        }
    }
    
    public static void shareText(final String text) {
        app.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Intent sendIntent = new Intent(android.content.Intent.ACTION_SEND);  // instead of Intent.ACTION_SEND
	            sendIntent.setType("text/plain");

                List<Intent> targetedShareIntents = new ArrayList<Intent>();
                List<ResolveInfo> resInfo = getPackageManager().queryIntentActivities(intent, 0);
                for (ResolveInfo resolveInfo : resInfo) {
                    String packageName = resolveInfo.activityInfo.packageName;
                    Intent targetedShareIntent = new Intent(android.content.Intent.ACTION_SEND);
                    targetedShareIntent.setType("text/plain");
                    targetedShareIntent.putExtra(android.content.Intent.EXTRA_TEXT, text);
                    targetedShareIntent.setPackage(packageName);
                    if(packageName.equals("com.whatsapp")){
                        targetedShareIntents.add(1,targetedShareIntent);
                    }
                    else{
                        targetedShareIntents.add(targetedShareIntent);
                    }
                }
                Intent shareIntent = Intent.createChooser(targetedShareIntents.remove(0), "Share Chimple Learning App");
                shareIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, targetedShareIntents.toArray(new Parcelable[]{}));
                app.startActivityForResult(shareIntent,SEND_CODE);
            }
        });
    }

    public void initFirebaseMessageClient() {
        advertisingApiBackgroundExecutor.execute(new Runnable() {
            @Override
            public void run() {
                AdvertisingIdClient.Info adInfo = null;
                String advertisingId = null;

                try {
                    adInfo = AdvertisingIdClient.getAdvertisingIdInfo(AppActivity.this.getApplicationContext());
                    if (adInfo != null) {
                        advertisingId = adInfo.getId();
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                    Log.i(TAG, e.getLocalizedMessage());
                } catch (GooglePlayServicesNotAvailableException e) {
                    e.printStackTrace();
                    Log.i(TAG, e.getLocalizedMessage());
                } catch (GooglePlayServicesRepairableException e) {
                    e.printStackTrace();
                    Log.i(TAG, e.getLocalizedMessage());
                }
                final String aId = advertisingId;
                ChimpleLogger.storeInSharedPreference(AppActivity.this, ADVERTISING_ID, advertisingId);
                FirebaseInstanceId.getInstance().getInstanceId()
                        .addOnCompleteListener(new OnCompleteListener<InstanceIdResult>() {
                            @SuppressLint("InvalidAnalyticsName")
                            @Override
                            public void onComplete(@NonNull Task<InstanceIdResult> task) {
                                if (!task.isSuccessful()) {
                                    return;
                                }

                                String token = task.getResult().getToken();
                                ChimpleLogger.storeInSharedPreference(AppActivity.this, FIREBASE_MESSAGE_TOKEN, token);
                                Log.i(TAG, "Firebase Message Token:" + token);
                                AppActivity.this.syncFcm();
                            }
                        });
            }
        });
    }

    void checkInstallReferrer(Context context) {
        if (getPreferences(MODE_PRIVATE).getBoolean(KEY_REFERRER_EXISTS, false)) {
            Log.i(TAG, "referrer url already referred");
            return;
        }

        final InstallReferrerClient referrerClient = InstallReferrerClient.newBuilder(this).build();
        backgroundExecutor.execute(new Runnable() {
            @Override
            public void run() {
                getInstallReferrerFromClient(referrerClient);
            }
        });

        getInstallReferrerUsingReceiver(context);
    }

    void getInstallReferrerUsingReceiver(final Context context) {
        advertisingApiBackgroundExecutor.execute(new Runnable() {
            @Override
            public void run() {
                AdvertisingIdClient.Info adInfo = null;
                String advertisingId = "";

                try {
                    adInfo = AdvertisingIdClient.getAdvertisingIdInfo(AppActivity.this.getApplicationContext());
                    if (adInfo != null) {
                        advertisingId = adInfo.getId();
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                    Log.i(TAG, e.getLocalizedMessage());
                } catch (GooglePlayServicesNotAvailableException e) {
                    e.printStackTrace();
                    Log.i(TAG, e.getLocalizedMessage());
                } catch (GooglePlayServicesRepairableException e) {
                    e.printStackTrace();
                    Log.i(TAG, e.getLocalizedMessage());
                }

                Map utmParams = new HashMap<String, String>();
                utmParams.put("utm_source", getUtmValues(context, "utm_source"));
                utmParams.put("utm_medium", getUtmValues(context, "utm_medium"));
                utmParams.put("utm_campaign", getUtmValues(context, "utm_campaign"));

                String referrerUrl = toUrlEncode(utmParams);

                Log.i(TAG, "referrerUrl:" + referrerUrl);
                Log.i(TAG, "advertisingId:" + advertisingId);
                Bundle bundle = new Bundle();
                bundle.putString("referrer_url", referrerUrl);
                bundle.putString("advertising_id", advertisingId);
                Log.i(TAG, "bundle" + bundle.toString());
                firebaseAnalytics.logEvent("referral_info", bundle);
            }
        });
    }

    public String getUtmValues(Context context, String key) {
        String val = null;
        try {
            SharedPreferences preferences = context.getSharedPreferences("utm_campaign", Context.MODE_PRIVATE);
            val = preferences.getString(key, "null");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return val;
    }

    public String toUrlEncode(Map<String, String> params) {
        StringBuilder queryString = new StringBuilder();
        try {
            // Convert the params map into a query string.
            for (Map.Entry<String, String> entry : params.entrySet()) {
                if (queryString.length() != 0)
                    queryString.append('&');

                String encodedKey = URLEncoder.encode(entry.getKey(), "UTF-8");
                String encodedValue = URLEncoder.encode(entry.getValue(), "UTF-8");

                queryString.append(encodedKey);
                queryString.append('=');
                queryString.append(encodedValue);
            }
        } catch (Exception e) {

        }
        return queryString.toString();
    }

    private void unRegisterReceivers() {
        if (lockScreenReceiver != null) {
            unregisterReceiver(lockScreenReceiver);
        }
    }


    @Override
    public Cocos2dxGLSurfaceView onCreateView() {
        Cocos2dxGLSurfaceView glSurfaceView = new Cocos2dxGLSurfaceView(this);
        // TestCpp should create stencil buffer
        glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);
        SDKWrapper.getInstance().setGLSurfaceView(glSurfaceView, this);

        return glSurfaceView;
    }

    @Override
    protected void onResume() {
        super.onResume();
        SDKWrapper.getInstance().onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        SDKWrapper.getInstance().onPause();

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "updating STOP_TIME:" + new Date().getTime());
        unRegisterReceivers();
        SDKWrapper.getInstance().onDestroy();
    }

    private static void openCamera() {
        // we must use runOnUiThread here
        app.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Intent cameraIntent = new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
                app.startActivityForResult(cameraIntent, CAMERA_CODE);
            }
        });
    }

    private static String checkCameraResult() {
        return cameraResult;
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        SDKWrapper.getInstance().onActivityResult(requestCode, resultCode, data);
        if (requestCode == CAMERA_CODE) {
            Bitmap original = (Bitmap) data.getExtras().get("data");
            final File basePath = new File(getContext().getFilesDir(), UUID.randomUUID().toString() + ".png");
            if (!basePath.exists()) {
                try {
                    basePath.createNewFile();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            try {
                FileOutputStream stream = new FileOutputStream(basePath);
                original.compress(Bitmap.CompressFormat.PNG, 50, stream);
                original.recycle(); // ensure the image is freed;
                stream.close();
                cameraResult = basePath.getAbsolutePath();
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (requestCode == YOUTUBE_CODE) {
            finishActivity(requestCode);
            Log.d(TAG, "calling next in youtube...");
            app.runOnGLThread(new Runnable() {
                @Override
                public void run() {
                    Log.d(TAG, "calling next in youtube 1111...");
                    Cocos2dxJavascriptJavaBridge.evalString("cc.nextYoutube()");
                }
            });
        }
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        SDKWrapper.getInstance().onNewIntent(intent);
        this.processDeepLink();
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        SDKWrapper.getInstance().onRestart();
    }

    @Override
    protected void onStop() {
        Log.d(TAG, "updating STOP_TIME:" + new Date().getTime());
        ChimpleLogger.storeInSharedPreference(this, APP_LAST_PLAYED_TIME, String.valueOf(new Date().getTime()));
        this.syncFcm();
        if (app.repeatHandShakeTimer != null) {
            app.repeatHandShakeTimer.cancel();
        }

        super.onStop();
        SDKWrapper.getInstance().onStop();
    }

    @Override
    public void onBackPressed() {
        SDKWrapper.getInstance().onBackPressed();
        super.onBackPressed();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        SDKWrapper.getInstance().onConfigurationChanged(newConfig);
        super.onConfigurationChanged(newConfig);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        SDKWrapper.getInstance().onRestoreInstanceState(savedInstanceState);
        super.onRestoreInstanceState(savedInstanceState);
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        SDKWrapper.getInstance().onSaveInstanceState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onStart() {
        SDKWrapper.getInstance().onStart();
        ChimpleLogger.storeInSharedPreference(this, APP_LAST_PLAYED_TIME, "-1");
        ChimpleLogger.storeInSharedPreference(this, ChimpleLogger.DAILY_REMINDER_SHOWED_TIME, null);
        ChimpleLogger.storeInSharedPreference(this, ChimpleLogger.THREE_DAY_REMINDER_SHOWED_TIME, null);
        ChimpleLogger.storeInSharedPreference(this, ChimpleLogger.WEEKLY_REMINDER_SHOWED_TIME, null);
        this.syncFcm();
        if (app.repeatHandShakeTimer != null) {
            app.repeatHandShakeTimer.cancel();
            app.repeatHandShakeTimer.start();
        }

        super.onStart();
    }

    public void checkPermission(String permission, int requestCode) {

        // Checking if permission is not granted
        if (ContextCompat.checkSelfPermission(
                AppActivity.this,
                permission)
                == PackageManager.PERMISSION_DENIED) {
            ActivityCompat
                    .requestPermissions(
                            AppActivity.this,
                            new String[]{permission},
                            requestCode);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode,
                permissions,
                grantResults);

        if (requestCode == STORAGE_PERMISSION_CODE) {
            if (grantResults.length > 0
                    && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Log.d(TAG, "STORAGE PERMISSION GRANTED");
            } else {
                Log.d(TAG, "STORAGE PERMISSION DENIED");
            }
        }
    }


    void getInstallReferrerFromClient(final InstallReferrerClient referrerClient) {

        referrerClient.startConnection(new InstallReferrerStateListener() {
            @Override
            public void onInstallReferrerSetupFinished(int responseCode) {
                switch (responseCode) {
                    case InstallReferrerClient.InstallReferrerResponse.OK:
                        ReferrerDetails response = null;
                        try {
                            response = referrerClient.getInstallReferrer();
                            referrerClient.endConnection();
                        } catch (RemoteException e) {
                            e.printStackTrace();
                            Log.i(TAG, e.getLocalizedMessage());
                            referrerClient.endConnection();
                            return;
                        }
                        final String referrerUrl = response.getInstallReferrer();

                        advertisingApiBackgroundExecutor.execute(new Runnable() {
                            @Override
                            public void run() {
                                AdvertisingIdClient.Info adInfo = null;
                                String advertisingId = "";

                                try {
                                    adInfo = AdvertisingIdClient.getAdvertisingIdInfo(AppActivity.this.getApplicationContext());
                                    if (adInfo != null) {
                                        advertisingId = adInfo.getId();
                                    }
                                } catch (IOException e) {
                                    e.printStackTrace();
                                    Log.i(TAG, e.getLocalizedMessage());
                                } catch (GooglePlayServicesNotAvailableException e) {
                                    e.printStackTrace();
                                    Log.i(TAG, e.getLocalizedMessage());
                                } catch (GooglePlayServicesRepairableException e) {
                                    e.printStackTrace();
                                    Log.i(TAG, e.getLocalizedMessage());
                                }

                                if (advertisingId != null) {
                                    Log.i(TAG, "referrerUrl:" + referrerUrl);
                                    Log.i(TAG, "advertisingId:" + advertisingId);
                                    Bundle bundle = new Bundle();
                                    bundle.putString("referrer_url", referrerUrl);
                                    bundle.putString("advertising_id", advertisingId);
                                    Log.i(TAG, "bundle" + bundle.toString());
                                    firebaseAnalytics.logEvent("referral_info", bundle);
                                    getPreferences(MODE_PRIVATE).edit().putBoolean(KEY_REFERRER_EXISTS, true).commit();
                                }
                            }
                        });

                        break;
                    case InstallReferrerClient.InstallReferrerResponse.FEATURE_NOT_SUPPORTED:
                        // API not available on the current Play Store app.
                        break;
                    case InstallReferrerClient.InstallReferrerResponse.SERVICE_UNAVAILABLE:
                        // Connection couldn't be established.
                        break;
                }

            }

            @Override
            public void onInstallReferrerServiceDisconnected() {
                // Try to restart the connection on the next request to
                // Google Play by calling the startConnection() method.
                stringBuilder.append("\nonInstallReferrerServiceDisconnected.");
                stringBuilder.append("\nisReady == " + referrerClient.isReady());

                stringBuilder.append("\nonInstallReferrerServiceDisconnected. endConnection");
                stringBuilder.append("\nisReady == " + referrerClient.isReady());
                referrerClient.endConnection();
                stringBuilder.append("\nendConnection");
                stringBuilder.append("\nisReady == " + referrerClient.isReady());
                Log.i(TAG, stringBuilder.toString());
            }
        });
    }

    private void syncFcm() {
        String fmcToken = ChimpleLogger.getStringFromSharedPreference(this, FIREBASE_MESSAGE_TOKEN);
        String advertisingId = ChimpleLogger.getStringFromSharedPreference(this, ADVERTISING_ID);
        if (fmcToken != null && advertisingId != null) {
            String lastPlayedTime = ChimpleLogger.getStringFromSharedPreference(this, ChimpleLogger.APP_LAST_PLAYED_TIME);
            Log.i(TAG, "Sync fmcToken:" + fmcToken + " adId:" + advertisingId);
            final Map<String, Object> fmcMap = new HashMap<String, Object>();
            fmcMap.put(FIREBASE_MESSAGE_TOKEN.toLowerCase(), fmcToken);
            fmcMap.put(ADVERTISING_ID.toLowerCase(), advertisingId);
            fmcMap.put(APP_LAST_PLAYED_TIME.toLowerCase(), Long.parseLong(lastPlayedTime));
            Date currentDate = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
            String strDate = formatter.format(currentDate);
            fmcMap.put("current_date", strDate);

            String installedTime = ChimpleLogger.getStringFromSharedPreference(this, ChimpleLogger.APP_INSTALLED_TIME);
            fmcMap.put(APP_INSTALLED_TIME.toLowerCase(), Long.parseLong(installedTime));

            mDatabase.collection(FIREBASE_MESSAGES_SYNC.toLowerCase())
                    .document(advertisingId).set(fmcMap)
                    .addOnSuccessListener(new OnSuccessListener<Void>() {
                        @Override
                        public void onSuccess(Void aVoid) {
                            Log.i(TAG, "Successfully updated cms:" + fmcMap);
                        }
                    })
                    .addOnFailureListener(new OnFailureListener() {
                        @Override
                        public void onFailure(@NonNull Exception e) {
                            Log.d(TAG, "Failed to update fmcs:" + e.toString());
                        }
                    });
        }
    }

    /*

     */

    private void createOneTimeHandShakeTimer(final String url) {
        try {
            synchronized (this) {
                new Handler(Looper.getMainLooper()).post(new Runnable() {
                    @Override
                    public void run() {
                        if (app != null) {
                            new CountDownTimer(REPEAT_HANDSHAKE_TIMER, 10000) {
                                public void onTick(long millisUntilFinished) {
                                    Log.d(TAG, "createOneTimeHandShakeTimer ticking ...");
                                }

                                public void onFinish() {
                                    app.runOnGLThread(new Runnable() {
                                        @Override
                                        public void run() {
                                            String javaScriptVariable = "cc.deep_link($url)";
                                            javaScriptVariable = javaScriptVariable.replace("$url", "'" + url + "'");
                                            Log.d(TAG, "calling deep link with: " + javaScriptVariable);
                                            Cocos2dxJavascriptJavaBridge.evalString(javaScriptVariable);
                                        }
                                    });
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

    private void createRepeatHandShakeTimer() {
        try {
            synchronized (this) {
                new Handler(Looper.getMainLooper()).post(new Runnable() {
                    @Override
                    public void run() {
                        if (app != null) {
                            app.repeatHandShakeTimer = new CountDownTimer(REPEAT_HANDSHAKE_TIMER, 10000) {
                                public void onTick(long millisUntilFinished) {
                                    Log.d(TAG, "repeatHandShakeTimer ticking ...");
                                }

                                public void onFinish() {
                                    app.runOnGLThread(new Runnable() {
                                        @Override
                                        public void run() {
                                            if (ChimpleLogger.isNetworkAvailable()) {
                                                System.out.println("calling process Queue...");
                                                Cocos2dxJavascriptJavaBridge.evalString("cc.processQueue()");
                                            }
                                        }
                                    });

                                    app.repeatHandShakeTimer.start();
                                }
                            };
                        }
                    }
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
