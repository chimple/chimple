package org.chimple.bahama.logger;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.media.RingtoneManager;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;


import org.chimple.bahama.AppActivity;
import org.chimple.bahama.R;

import java.util.Map;

public class ChimpleFirebaseMessagingService extends FirebaseMessagingService {
    private static final String TAG = "AlarmReceiver";

    @Override
    public void onNewToken(String s) {
        super.onNewToken(s);
        Log.i(TAG, "onNewToken:" + s);
    }

    public ChimpleFirebaseMessagingService() {
    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        if (remoteMessage != null && remoteMessage.getNotification() != null) {
            String title = remoteMessage.getNotification().getTitle();
            String body = remoteMessage.getNotification().getBody();
            Log.d(TAG, "message received title:" + title);
            Log.d(TAG, "message received body:" + body);
            NotificationManager notificationManager =
                    (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            int notificationId = 0;
            String channelId = "channel-" + notificationId;
            String channelName = "FireBase notification";
            int importance = NotificationManager.IMPORTANCE_HIGH;
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                NotificationChannel mChannel = new NotificationChannel(
                        channelId, channelName, importance);
                Log.d(TAG, "diff FF creating notification channel:" + channelId + " name:" + channelName);
                notificationManager.createNotificationChannel(mChannel);
            }

            NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this, channelId)
                    .setContentTitle(remoteMessage.getNotification().getTitle())
                    .setContentText(remoteMessage.getNotification().getBody())
                    .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                    .setStyle(new NotificationCompat.BigTextStyle())
                    .setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION))
                    .setSmallIcon(R.mipmap.small)
                    .setChannelId(channelId)
                    .setLargeIcon(BitmapFactory.decodeResource(this.getResources(), R.mipmap.small))
                    .setContentIntent(PendingIntent.getActivity(this, 0, new Intent(this, AppActivity.class), 0))
                    .setAutoCancel(true);


            Log.i(TAG, "diff onMessageReceived title:" + remoteMessage.getNotification().getTitle());
            Log.i(TAG, "diff onMessageReceived body:" + remoteMessage.getNotification().getBody());
            notificationManager.notify(notificationId, notificationBuilder.build());

            if (remoteMessage != null && remoteMessage.getData() != null) {
                String chapter = null;
                String lesson = null;
                String subject = null;
                String assignmentId = null;

                for (Map.Entry<String, String> message : remoteMessage.getData().entrySet()) {
                    Log.d(TAG, "message received:" + message.getKey() + " = " + message.getValue());
                    String key = message.getKey();
                    if (key.equalsIgnoreCase("chapter")) {
                        chapter = (String) message.getValue();
                    } else if (key.equalsIgnoreCase("lesson")) {
                        lesson = (String) message.getValue();
                    } else if (key.equalsIgnoreCase("assignmentId")) {
                        assignmentId = (String) message.getValue();
                    } else if (key.equalsIgnoreCase("subject")) {
                        subject = (String) message.getValue();
                    }
                }
//                AppActivity.assignmentMicroLink(chapter, lesson, subject, assignmentId);
            }
        }
    }
}