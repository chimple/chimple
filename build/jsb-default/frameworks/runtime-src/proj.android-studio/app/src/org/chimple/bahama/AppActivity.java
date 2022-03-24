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
import com.google.firebase.FirebaseException;
import com.google.firebase.analytics.FirebaseAnalytics;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException;
import com.google.firebase.auth.PhoneAuthCredential;
import com.google.firebase.auth.PhoneAuthProvider;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;

import org.chimple.bahama.logger.ChimpleLogger;
import org.chimple.bahama.logger.LockScreenReceiver;
import org.chimple.bahama.logger.NotificationData;
import org.chimple.firebasesync.auth.AuthCallBack;
import org.chimple.firebasesync.database.Helper;
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
import java.util.concurrent.TimeUnit;

import static org.chimple.bahama.logger.ChimpleLogger.ADVERTISING_ID;
import static org.chimple.bahama.logger.ChimpleLogger.APP_INSTALLED_TIME;
import static org.chimple.bahama.logger.ChimpleLogger.APP_LAST_PLAYED_TIME;
import static org.chimple.bahama.logger.ChimpleLogger.FIREBASE_MESSAGES_SYNC;
import static org.chimple.bahama.logger.ChimpleLogger.FIREBASE_MESSAGE_TOKEN;
import static org.chimple.firebasesync.database.Helper.EMAIL;
import static org.chimple.firebasesync.database.Helper.PASSWORD;

public class AppActivity extends com.sdkbox.plugin.SDKBoxActivity {
    private static final int STORAGE_PERMISSION_CODE = 101;
    protected ChimpleLogger logger;
    protected LockScreenReceiver lockScreenReceiver;
    private static final String TAG = AppActivity.class.getSimpleName();
    private static FirebaseAnalytics firebaseAnalytics = null;
    StringBuilder stringBuilder;
    private final String PREFERENCE_FILE_KEY = "bahamaPreferences";
    private final String KEY_REFERRER_EXISTS = "referrer_exists";
    private final Executor backgroundExecutor = Executors.newSingleThreadExecutor();
    private final Executor advertisingApiBackgroundExecutor = Executors.newSingleThreadExecutor();
    public static FirebaseFirestore mDatabase = FirebaseFirestore.getInstance();
    private static final int CAMERA_CODE = 31;
    public static final int YOUTUBE_CODE = 32;
    public static final int SEND_CODE = 33;
    private static String cameraResult = null;
    public static AppActivity app = null;
    private CountDownTimer repeatHandShakeTimer = null;
    private static final int REPEAT_HANDSHAKE_TIMER = 1 * 30 * 1000; // 30 second
    private static final int IMMEDIATE_HANDSHAKE_TIMER = 1 * 1000; // 5 second

    private FirebaseAuth mAuth = null;
    private PhoneAuthProvider.OnVerificationStateChangedCallbacks mCallbacks = null;
    private String mVerificationId;
    private PhoneAuthProvider.ForceResendingToken mResendToken;
    private Helper helper = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        firebaseAnalytics = FirebaseAnalytics.getInstance(this);
        mAuth = FirebaseAuth.getInstance();
        logger = ChimpleLogger.getInstance(this, firebaseAnalytics);
        app = this;
        helper = Helper.getInstance(this, new AuthCallBack() {
            @Override
            public void loginSucceed(final String schoolInfo, final boolean shouldCallBack) {
               
            }

            @Override
            public void loginFailed(final String reason) {
                
            }
        });
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


        String installedTime = ChimpleLogger.getStringFromSharedPreference(this, ChimpleLogger.APP_INSTALLED_TIME);
        if (installedTime == null) {
            Log.d(TAG, "diff setting installed time:" + new Date().getTime());
            ChimpleLogger.storeInSharedPreference(this, ChimpleLogger.APP_INSTALLED_TIME, String.valueOf(new Date().getTime()));
        }
        ChimpleLogger.storeInSharedPreference(this, APP_LAST_PLAYED_TIME, "-1");
        ChimpleLogger.storeInSharedPreference(this, ChimpleLogger.DAILY_REMINDER_SHOWED_TIME, null);
        ChimpleLogger.storeInSharedPreference(this, ChimpleLogger.THREE_DAY_REMINDER_SHOWED_TIME, null);
        ChimpleLogger.storeInSharedPreference(this, ChimpleLogger.WEEKLY_REMINDER_SHOWED_TIME, null);
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

        this.processDeepLink();
    }

    public void processDeepLink() {
        //Deep Links
        Intent intent = getIntent();
        Log.d(TAG, "intent:" + intent);
        if (intent != null) {
            String chapter = null;
            String lesson = null;
            String assignmentId = null;
            String subject = null;
            Bundle extra = intent.getExtras();
            if (extra != null) {
                for (String key : extra.keySet()) {
                    if (key.equalsIgnoreCase("chapter")) {
                        chapter = (String) extra.get(key);
                    } else if (key.equalsIgnoreCase("lesson")) {
                        lesson = (String) extra.get(key);
                    } else if (key.equalsIgnoreCase("assignmentId")) {
                        assignmentId = (String) extra.get(key);
                    } else if (key.equalsIgnoreCase("subject")) {
                        subject = (String) extra.get(key);
                    }
                }
            }

            if (chapter != null && lesson != null && subject != null && assignmentId != null) {
                this.assignmentMicroLink(chapter, lesson, subject, assignmentId);
            } else {
                String action = intent.getAction();
                Uri uri = intent.getData();
                Log.d(TAG, "deep link action:" + action);
                Log.d(TAG, "deep link uri:" + uri);
                if (uri != null && action != null && action.equalsIgnoreCase("android.intent.action.VIEW")) {
                    this.processDeepLinkAction(uri.toString());
                }
            }
        }
    }

    public void assignmentMicroLink(String chapter, String lesson,
                                    String subject, String assignmentId) {
        if (chapter != null && lesson != null && subject != null && assignmentId != null) {
            Log.d(TAG, "received data for chapter:" + chapter + " lesson:" + lesson + " assignmentId: " + assignmentId + " subject: " + subject);
            String uri = "http://chimple.github.io/microlink?courseid=" + subject + "&chapterid=" + chapter + "&lessonid=" + lesson + "&assignmentid=" + assignmentId;
            Log.d(TAG, "assignment deep link uri:" + uri);
            if (uri != null) {
                this.processDeepLinkAction(uri.toString());
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
                List<ResolveInfo> resInfo = getContext().getPackageManager().queryIntentActivities(sendIntent, 0);
                for (ResolveInfo resolveInfo : resInfo) {
                    String packageName = resolveInfo.activityInfo.packageName;
                    Intent targetedShareIntent = new Intent(android.content.Intent.ACTION_SEND);
                    targetedShareIntent.setType("text/plain");
                    targetedShareIntent.putExtra(android.content.Intent.EXTRA_TEXT, text);
                    targetedShareIntent.setPackage(packageName);
                    if (packageName.equals("com.whatsapp")) {
                        targetedShareIntents.add(1, targetedShareIntent);
                    } else {
                        targetedShareIntents.add(targetedShareIntent);
                    }
                }
                Intent shareIntent = Intent.createChooser(targetedShareIntents.remove(0), "Share Chimple Learning App");
                shareIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, targetedShareIntents.toArray(new Parcelable[]{}));
                app.startActivityForResult(shareIntent, SEND_CODE);
            }
        });
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
        if (helper != null) {
            helper.cleanup();
        }
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
            app.runOnGLThread(new Runnable() {
                @Override
                public void run() {
                    Cocos2dxJavascriptJavaBridge.evalString("cc.nextYoutube()");
                }
            });
        }
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
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


    /*
     */

    private void processDeepLinkAction(final String url) {
        try {
            synchronized (this) {
                new Handler(Looper.getMainLooper()).post(new Runnable() {
                    @Override
                    public void run() {
                        if (app != null) {
                            new CountDownTimer(IMMEDIATE_HANDSHAKE_TIMER, 1) {
                                public void onTick(long millisUntilFinished) {
                                    Log.d(TAG, "processDeepLinkAction ticking ...");
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

    public PhoneAuthProvider.OnVerificationStateChangedCallbacks refmCallbacks() {
        return this.mCallbacks;
    }

    public void requestOtp(final String phoneNumber) {
        PhoneAuthProvider.getInstance().verifyPhoneNumber(
                phoneNumber,                 // Phone number to verify
                1,                          // Timeout duration
                TimeUnit.MINUTES,           // Unit of timeout
                AppActivity.this,          // Activity (for callback binding)
                mCallbacks);
    }

    public void resendToken(final String phoneNumber) {
        PhoneAuthProvider.getInstance().verifyPhoneNumber(
                phoneNumber,        // Phone number to verify
                1,               // Timeout duration
                TimeUnit.MINUTES,   // Unit of timeout
                this,       // Activity (for callback binding)
                mCallbacks,         // OnVerificationStateChangedCallbacks
                mResendToken);
    }

    public void verifyOtp(final String otp) {
        PhoneAuthCredential credential = PhoneAuthProvider.getCredential(this.mVerificationId, otp);
        mAuth.signInWithCredential(credential)
                .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            //      Toast.makeText(AppActivity.this, "Verification Success", Toast.LENGTH_SHORT).show();
                            app.runOnGLThread(new Runnable() {
                                @Override
                                public void run() {
                                    String javaScriptVariable = "cc.phoneVerificationSucceeded($p1, $p2)";
                                    javaScriptVariable = javaScriptVariable.replace("$p1", "'" + app.mVerificationId + "'");
                                    javaScriptVariable = javaScriptVariable.replace("$p2", "'" + otp + "'");
                                    Log.d(TAG, "calling dphoneVerificationSucceeded with: " + javaScriptVariable);
                                    Cocos2dxJavascriptJavaBridge.evalString(javaScriptVariable);
                                }
                            });
                        } else {
                            if (task.getException() instanceof FirebaseAuthInvalidCredentialsException) {
                                //      Toast.makeText(AppActivity.this, "Verification Failed, Invalid credentials", Toast.LENGTH_SHORT).show();
                                app.runOnGLThread(new Runnable() {
                                    @Override
                                    public void run() {
                                        Cocos2dxJavascriptJavaBridge.evalString("cc.phoneVerificationFailed()");
                                    }
                                });
                            }
                        }
                    }
                });
    }


    public static void login(String email, String password) {
        if (!AppActivity.app.helper.isFirebaseUserLoggedIn()
                && email != null && !email.isEmpty()
                && password != null && !password.isEmpty()
        ) {
            Log.d(TAG, "Login request for email:" + email + " password:" + password);
            app.helper.getSharedPreferences().edit().putString(EMAIL, email).apply();
            app.helper.getSharedPreferences().edit().putString(PASSWORD, password).apply();
            app.helper.auth(true);
        }
    }
}
