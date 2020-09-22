package org.chimple.bahama.logger;

import android.app.Notification;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.util.Log;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import static org.chimple.bahama.logger.ChimpleLogger.EN_LANG;
import static org.chimple.bahama.logger.ChimpleLogger.HI_LANG;
import static org.chimple.bahama.logger.ChimpleLogger.MESSAGE_CONTENT;
import static org.chimple.bahama.logger.ChimpleLogger.MESSAGE_TITLE;
import static org.chimple.bahama.logger.ChimpleLogger.UNIQUE_REPEAT_NOTIFICATION_ID_5_PM;
import static org.chimple.bahama.logger.ChimpleLogger.UNIQUE_REPEAT_NOTIFICATION_ID_9_AM;
import static org.chimple.bahama.logger.ChimpleLogger.mm;


public class AlarmReceiver extends BroadcastReceiver {
    private static final String TAG = AlarmReceiver.class.getSimpleName();
    public static String NOTIFICATION_ID = "notification-id";
    public static String NOTIFICATIONS = "notification";
    public static boolean isTesting = false;

    public void onReceive(Context context, Intent intent) {
        if (intent != null && intent.getAction().equals("SCHEDULED_ACTION")) {
            NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
            int id = intent.getIntExtra(NOTIFICATION_ID, -1);
            List<Notification> parcelledNotifications = intent.getParcelableExtra(NOTIFICATIONS);
            List<Notification> notifications = parcelledNotifications != null && parcelledNotifications.size() > 0 ?
                    parcelledNotifications : decideNotification(context, id);
            Log.d(TAG, "Current Time" + new Date());
            Log.d(TAG, "total notifications to be sent:" + notifications.size());
            Iterator<Notification> iterator = notifications.iterator();

            while (iterator.hasNext()) {
                Notification n = iterator.next();
                if (n != null) {
                    int i = getRandomNumberInRange(1, 10000000);
                    Log.d(TAG, "Notification Sent for id:" + id + " and notif id:" + (id + i));
                    notificationManager.notify(id + i, n);
                }
            }
        }
    }

    private static int getRandomNumberInRange(int min, int max) {

        if (min >= max) {
            throw new IllegalArgumentException("max must be greater than min");
        }

        Random r = new Random();
        return r.nextInt((max - min) + 1) + min;
    }

    private static Notification showGreeting(Context context, String key) {
        Notification notification = null;
        long appInstalledTimeInMillis = Long.parseLong(ChimpleLogger.getStringFromSharedPreference(context, ChimpleLogger.APP_INSTALLED_TIME));
        long currentTimeInMillis = new Date().getTime();
        long diff = currentTimeInMillis - appInstalledTimeInMillis;
        long counter = (long) (diff / (60 * 1000) / 60);
        Log.d(TAG, "diff appInstalledTimeInMillis in greetings : " + appInstalledTimeInMillis + " and counter" + counter);
        long diffTime = isTesting ? counter * 60 + diff / (60 * 1000) % 60 : diff / (24 * 60 * 60 * 1000);
        Log.d(TAG, "diff diffTime in greetings : " + diffTime);
        if (diffTime >= 7 * ChimpleLogger.UNIT_OF_MEASUREMENT) {
            Log.d(TAG, "Stop Showing Greetings");
            return null;
        }
        HashMap<String, String> item = getNotifItem(context, key);
        Log.d(TAG, "diff time in greeting:" + diffTime + " and type:" + key);
        if (item != null) {
            notification = ChimpleLogger.getNotification(
                    context,
                    item.get(MESSAGE_TITLE),
                    item.get(ChimpleLogger.MESSAGE_CONTENT),
                    key.equals(mm) ? UNIQUE_REPEAT_NOTIFICATION_ID_9_AM : UNIQUE_REPEAT_NOTIFICATION_ID_5_PM,
                    AlarmReceiver.isTesting ? Color.MAGENTA : -1
            );
        }
        return notification;
    }

    public static HashMap<String, String> getNotifItem(Context context, String key) {
        Calendar cal = Calendar.getInstance();
        int dayOfMonth = cal.get(Calendar.DAY_OF_MONTH);
        String lang = dayOfMonth % 2 == 0    ? EN_LANG : HI_LANG;
        key = lang + "_" + key;
        Log.d(TAG, "diff getNotifItem key" + key);
        HashMap<String, String> item = null;
        if (item == null) {
            long length = ChimpleLogger.getLongFromSharedPreference(context, key + "-length");
            int rNum = ((int) (Math.random() * (length - 1))) + 1;
            String titleKey = key + MESSAGE_TITLE + rNum;
            String contentKey = key + MESSAGE_CONTENT + rNum;
            Log.d(TAG, "diff reading items from shared preferences for titlekey:" + titleKey + " and content key:" + contentKey + " and length:" + length);
            String title = ChimpleLogger.getStringFromSharedPreference(context, titleKey);
            String content = ChimpleLogger.getStringFromSharedPreference(context, contentKey);
            if (title != null || content != null) {
                item = new HashMap<String, String>();
                item.put(MESSAGE_TITLE, title);
                item.put(MESSAGE_CONTENT, content);
                Log.d(TAG, "diff reading items from shared preferences for title:" + title + " and content:" + content);
            }
        }
        return item;
    }

    private static Notification showReminder(Context context) {
        Notification notification = null;
        long appStopTimeInMillis = -1;

        long currentTimeInMillis = new Date().getTime();
        Log.d(TAG, "diff time current time:" + currentTimeInMillis);

        String lastPlayedTime = ChimpleLogger.getStringFromSharedPreference(context, ChimpleLogger.APP_LAST_PLAYED_TIME);
        if (lastPlayedTime == null || Long.parseLong(lastPlayedTime) == -1) {
            return null;
        }
        else {
            appStopTimeInMillis = Long.parseLong(lastPlayedTime);
        }
        Log.d(TAG, "diff lastPlayedTime:" + appStopTimeInMillis);
        long diff = currentTimeInMillis - appStopTimeInMillis;
        long diffTime = isTesting ? diff / (60 * 1000) % 60 : diff / (24 * 60 * 60 * 1000);

        Log.d(TAG, "diff time in reminder:" + diffTime);

        boolean Hour24Condition = diffTime >= (1 * ChimpleLogger.UNIT_OF_MEASUREMENT) && diffTime < (7 * ChimpleLogger.UNIT_OF_MEASUREMENT);

        boolean once3DaysCondition = diffTime >= (7 * ChimpleLogger.UNIT_OF_MEASUREMENT) && diffTime < (14 * ChimpleLogger.UNIT_OF_MEASUREMENT);

        boolean weeklyCondition = diffTime >= (14 * ChimpleLogger.UNIT_OF_MEASUREMENT);

        Log.d(TAG, "diff Hour24Condition:" + Hour24Condition);
        Log.d(TAG, "diff Once3DaysCondition:" + once3DaysCondition);
        Log.d(TAG, "diff weeklyCondition:" + weeklyCondition);

        if (Hour24Condition) {
            HashMap<String, String> item = getNotifItem(context, ChimpleLogger.d);
            Log.d(TAG, "diff 24 hour reminder showed at:" + new Date());
            Log.d(TAG, "diff 24 hour reminder showed item:" + (item == null));
            ChimpleLogger.storeInSharedPreference(context, ChimpleLogger.DAILY_REMINDER_SHOWED_TIME, new Date().getTime());
            if (item != null) {
                notification = ChimpleLogger.getNotification(
                        context,
                        item.get(MESSAGE_TITLE),
                        item.get(ChimpleLogger.MESSAGE_CONTENT),
                        UNIQUE_REPEAT_NOTIFICATION_ID_9_AM,
                        AlarmReceiver.isTesting ? Color.RED : -1
                );
            }
        }
        else if (once3DaysCondition) {
            long threeDayReminderTime = ChimpleLogger.getLongFromSharedPreference(context, ChimpleLogger.THREE_DAY_REMINDER_SHOWED_TIME);
            Log.d(TAG, "diff threeDayReminderTime:" + threeDayReminderTime);
            long diffThreeDay = new Date().getTime() - threeDayReminderTime;
            long diffThreeDayTime = isTesting ? diffThreeDay / (60 * 1000) % 60 : diffThreeDay / (24 * 60 * 60 * 1000);
            Log.d(TAG, "diff ThreeDayTime:" + diffThreeDayTime);
            if (diffThreeDayTime >= (3 * ChimpleLogger.UNIT_OF_MEASUREMENT)) {
                Log.d(TAG, "diff showing 3day notification");
                Log.d(TAG, "diff 3day reminder showed at:" + new Date());
                ChimpleLogger.storeInSharedPreference(context, ChimpleLogger.THREE_DAY_REMINDER_SHOWED_TIME, new Date().getTime());
                notification = setNotif(context, ChimpleLogger.t,
                        AlarmReceiver.isTesting ? Color.GREEN : -1);
            }
        }
        else if (weeklyCondition) {
            long WeeklyReminderTime = ChimpleLogger.getLongFromSharedPreference(context, ChimpleLogger.WEEKLY_REMINDER_SHOWED_TIME);
            Log.d(TAG, "diff WeeklyReminderTime:" + WeeklyReminderTime);
            long weekly = new Date().getTime() - WeeklyReminderTime;
            long diffWeeklyTime = isTesting ? weekly / (60 * 1000) % 60 : weekly / (24 * 60 * 60 * 1000);
            Log.d(TAG, "diff diffWeeklyTime:" + diffWeeklyTime);
            if (diffWeeklyTime >= (7 * ChimpleLogger.UNIT_OF_MEASUREMENT)) {
                Log.d(TAG, "diff showing weekly notification");
                Log.d(TAG, "diff weekly reminder showed at:" + new Date());
                ChimpleLogger.storeInSharedPreference(context, ChimpleLogger.WEEKLY_REMINDER_SHOWED_TIME, new Date().getTime());
                notification = setNotif(context, ChimpleLogger.w,
                        AlarmReceiver.isTesting ? Color.BLUE : -1);
            }
        }
        return notification;
    }

    private static Notification setNotif(Context context, String key, int color) {
        Notification notification = null;
        HashMap<String, String> item = getNotifItem(context, key);
        if (item != null) {
            notification = ChimpleLogger.getNotification(
                    context,
                    item.get(MESSAGE_TITLE),
                    item.get(ChimpleLogger.MESSAGE_CONTENT),
                    UNIQUE_REPEAT_NOTIFICATION_ID_9_AM,
                    color
            );
        }

        return notification;
    }

    private List<Notification> decideNotification(Context context, int id) {
        List<Notification> notifications = new ArrayList<Notification>();

        if (id == UNIQUE_REPEAT_NOTIFICATION_ID_9_AM) {
            Notification morningGreetingNotification = showGreeting(context, ChimpleLogger.mm);

            if (morningGreetingNotification != null) {
                notifications.add(morningGreetingNotification);
            }
            Notification reminderNotification = showReminder(context);
            if (reminderNotification != null) {
                notifications.add(reminderNotification);
            }
        }
        if (id == ChimpleLogger.UNIQUE_REPEAT_NOTIFICATION_ID_5_PM) {
            Notification eveningGreetingNotification = showGreeting(
                    context, ChimpleLogger.em
            );

            if (eveningGreetingNotification != null) {
                notifications.add(eveningGreetingNotification);
            }
        }
        return notifications;
    }
}