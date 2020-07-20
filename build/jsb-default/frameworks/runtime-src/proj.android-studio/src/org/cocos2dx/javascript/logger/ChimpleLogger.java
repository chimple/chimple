package org.cocos2dx.javascript.logger;

import android.annotation.SuppressLint;
import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.media.RingtoneManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import com.crashlytics.android.Crashlytics;
import com.google.android.gms.ads.identifier.AdvertisingIdClient;
import com.google.android.gms.common.GooglePlayServicesNotAvailableException;
import com.google.android.gms.common.GooglePlayServicesRepairableException;
import com.google.firebase.analytics.FirebaseAnalytics;

import org.apache.commons.io.FilenameUtils;
import org.cocos2dx.javascript.AppActivity;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ProtocolException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

import static android.app.PendingIntent.FLAG_UPDATE_CURRENT;

public class ChimpleLogger {

    private static final String TAG = "ChimpleLogger";
    private static String appName = TAG;
    private static String serialNumber;
    private static Context context;
    private static String deviceId = null;
    private static boolean connected = false;
    public static boolean bootCallRecived = false;
    public static final String DOWNLOAD_NOT_YET_STARTED = "DOWNLOAD_NOT_YET_STARTED";
    public static final String DOWNLOAD_STARTED = "DOWNLOAED_STARTED";
    public static final String DOWNLOAD_SUCCESS = "DOWNLOAD_SUCCESS";
    public static final String DOWNLOAD_FAILED = "DOWNLOAD_FAILED";

    public static String REPEAT_MORNING_HOUR = "9";
    public static String REPEAT_MORNING_MIN = "0";

    public static String REPEAT_EVENING_HOUR = "17";
    public static String REPEAT_EVENING_MIN = "0";

    public static String FIREBASE_MESSAGES_SYNC = "FIREBASE_MESSAGES_SYNC";

    public static String mm = "mm";
    public static String em = "em";
    public static String d = "d";
    public static String w = "w";
    public static String t = "t";

    public static String[] MESSAGE_KEYS = new String[]{mm, em, d, t, w};
    public static String MESSAGE_TITLE = "t";
    public static String MESSAGE_CONTENT = "c";

    public static String EN_LANG = "en";
    public static String HI_LANG = "hi";

    public static String SHARED_ALARM_KEYS = "SHARED_ALARM_KEYS";
    public static String APP_LAST_PLAYED_TIME = "APP_LAST_PLAYED_TIME";
    public static String DAILY_REMINDER_SHOWED_TIME = "DAILY_REMINDER_SHOWED_TIME";
    public static String THREE_DAY_REMINDER_SHOWED_TIME = "THREE_DAY_REMINDER_SHOWED_TIME";
    public static String WEEKLY_REMINDER_SHOWED_TIME = "WEEKLY_REMINDER_SHOWED_TIME";
    public static String APP_INSTALLED_TIME = "APP_INSTALLED_TIME";
    public static String FIREBASE_MESSAGE_TOKEN = "FIREBASE_MESSAGE_TOKEN";
    public static String ADVERTISING_ID = "ADVERTISING_ID";
    public static int UNIT_OF_MEASUREMENT = 1;

    public static int UNIQUE_REPEAT_NOTIFICATION_ID_9_AM = 1;
    public static int UNIQUE_REPEAT_NOTIFICATION_ID_5_PM = 2;
    public static int UNIQUE_ONE_TIME_NOTIFICATION_ID = 3;

    private static ConcurrentHashMap downloadStatus = new ConcurrentHashMap<String, String>();

    private static ChimpleLogger chimpleLoggerInstance = null;
    private static FirebaseAnalytics firebaseAnalytics = null;

    public static ChimpleLogger getInstance(Context context, FirebaseAnalytics firebaseAnalytics) {
        if (chimpleLoggerInstance == null) {
            chimpleLoggerInstance = new ChimpleLogger(context);
        }

        chimpleLoggerInstance.firebaseAnalytics = firebaseAnalytics;
        return chimpleLoggerInstance;
    }


    private ChimpleLogger(Context context) {
        serialNumber = Build.SERIAL;
        this.context = context;
    }

    private static File createDirIfNotExists(String path) {
        File basePath = new File(path);
        if (!basePath.exists()) {
            basePath.mkdirs();
        }
        Log.d(TAG, "exposed base path" + basePath.getAbsolutePath());
        return basePath;
    }

    private static File createDirIfNotExistsInSD(String path) {
        File basePath = new File(Environment.getExternalStorageDirectory() + File.separator + path);
        if (!basePath.exists()) {
            basePath.mkdirs();
        }
        Log.d(TAG, "exposed base path" + basePath.getAbsolutePath());
        return basePath;
    }


    private static String intToLei(int n) {
        if (n == 0) {
            return "A";
        }
        return (n < 0 ? "-" : "") + Character.toString((char) ('B' + (int) Math.log10(Math.abs(n)))) + String.valueOf(n);
    }

    private static int leiToInt(String lei) {
        int mul = 1;
        int p = 0;

        if (lei.startsWith("-")) {
            mul = -Math.abs(mul);
            p = 1;
        }
        if ("A".equals(lei.substring(p))) {
            return mul * 0;
        }

        p += 1;
        return Integer.valueOf(lei.substring(p)).intValue();
    }

    private static String normAppName() {
        return appName.replace('.', '_');
    }

    private static byte[] readAllBytes(File f) {
        byte[] b = new byte[(int) f.length()];
        try {
            FileInputStream fis = new FileInputStream(f);
            fis.read(b);
        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
            Crashlytics.logException(e);
        }
        return b;
    }

    public static boolean isNetworkAvailable() {
        try {
            ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo networkInfo = cm.getActiveNetworkInfo();
            ChimpleLogger.connected = networkInfo != null && networkInfo.isAvailable() &&
                    networkInfo.isConnected();

        } catch (Exception e) {
            e.printStackTrace();
        }
        Log.i("isNetworkAvailable() ->", ChimpleLogger.connected + "");

        if (ChimpleLogger.connected) {
            Iterator it = downloadStatus.entrySet().iterator();
            while (it.hasNext()) {
                Map.Entry pair = (Map.Entry) it.next();
                if (pair.getValue().equals(DOWNLOAD_FAILED)) {
                    Log.i(TAG, "networked in now connected:" + connected + " removing item:" + pair.getKey() + ":" + pair.getValue());
                    it.remove(); // avoids a ConcurrentModificationException

                }
            }
        }
        return ChimpleLogger.connected;
    }


    public static String currentStudentId() {
        String curStudentId = null;
        String srcDirectory = File.separator + "aruba" + File.separator + "current_profile";
        List<String> activeFiles = findFiles(srcDirectory, "json");
        if (activeFiles != null) {
            Iterator<String> iFiles = activeFiles.iterator();
            if (iFiles.hasNext()) {
                curStudentId = (String) iFiles.next();
                curStudentId = curStudentId.replace(".json", "");
                Log.d(TAG, " Student Id:" + curStudentId);
            }
        }
        return curStudentId;
    }

    private static List<String> findFiles(String directory, String ext) {
        List<String> filePaths = new ArrayList<String>();
        try {
            File fileFolder = new File(Environment.getExternalStorageDirectory() + File.separator + directory);
            boolean isAvailable = fileFolder.exists();

            if (isAvailable) {
                File[] listOfFiles = fileFolder.listFiles(new ProfilesFilter(ext));
                if (listOfFiles != null) {
                    for (int i = 0; i < listOfFiles.length; i++) {
                        if (listOfFiles[i].isFile()) {
                            filePaths.add(listOfFiles[i].getName());
                        }
                    }
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            Crashlytics.logException(ex);
        }

        return filePaths;
    }

    private static String lastLogPathName() {
        if (currentStudentId() != null) {
            return normAppName() + "." + serialNumber + "." + currentStudentId() + "." + "lastlog" + ".txt";
        } else {
            return normAppName() + "." + serialNumber + "." + "lastlog" + ".txt";
        }
    }

    public static void createCurrentProfile() {
        ChimpleLogger.createCurrentProfileDirIfNotExists();

    }

    private static void createCurrentProfileDirIfNotExists() {
        File basePath = new File(ChimpleLogger.getStorageDirectory() + "/aruba" + "/" + "current_profile");

        if (!basePath.exists()) {
            basePath.mkdirs();
        }
        File logPath = new File(basePath + "/" + "student-current-profile.json");
        if (!logPath.exists()) {
            try {
                logPath.createNewFile();
            } catch (Exception e) {
                e.printStackTrace();
                Crashlytics.logException(e);
            }
        }
    }

    public static void logProfile(String profileInfo, String profileFile) {
        String dirPath = "aruba/current_profile";
        File basePath = ChimpleLogger.createDirIfNotExistsInSD(dirPath);
        File logPath = new File(basePath + File.separator + profileFile);
        Log.d(TAG, "creating profile directory:" + logPath.getAbsolutePath());
        if (!logPath.exists()) {
            try {
                logPath.createNewFile();
            } catch (Exception e) {
                Crashlytics.logException(e);
                e.printStackTrace();
            }
        }

        try {
            FileWriter fw = new FileWriter(logPath.getAbsoluteFile(), false);
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(profileInfo + "\n");
            Log.d(TAG, "writing profile info" + profileInfo + " to file:" + logPath.getAbsoluteFile());
            bw.close();
        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
            Crashlytics.logException(e);
        }
    }

    public static String getDeviceId() {
        if (deviceId != null) {
            return deviceId;
        }

        try {
            AdvertisingIdClient.Info adInfo = null;
            try {
                adInfo = AdvertisingIdClient.getAdvertisingIdInfo(ChimpleLogger.context);

            } catch (IOException e) {
                // Unrecoverable error connecting to Google Play services (e.g.,
                // the old version of the service doesn't support getting AdvertisingId).
                Crashlytics.logException(e);
            } catch (GooglePlayServicesNotAvailableException e) {
                Crashlytics.logException(e);
            } catch (GooglePlayServicesRepairableException e) {
                Crashlytics.logException(e);
            }
            deviceId = adInfo.getId();
            Log.d(TAG, "deviceId" + deviceId);
            return deviceId;
        } catch (Exception e) {
            Crashlytics.logException(e);
        }
        return deviceId;
    }

    public static void logEvent(String eventString) {
        String logDirPath = "Documents" + File.separator + "logs";
        File basePath = ChimpleLogger.createDirIfNotExistsInSD(logDirPath);
        File logPath = new File(basePath + "/" + lastLogPathName());
        Log.d(TAG, "will create directory:" + logPath.getAbsolutePath());
        if (!logPath.exists()) {
            try {
                logPath.createNewFile();
            } catch (Exception e) {
                e.printStackTrace();
                Crashlytics.logException(e);
            }
        }

        try {
            FileWriter fw = new FileWriter(logPath.getAbsoluteFile(), true);
            BufferedWriter bw = new BufferedWriter(fw);
            Log.d(TAG, "writing log info" + eventString + " to file:" + logPath.getAbsoluteFile());
            bw.write(eventString + "\n");
            bw.close();
        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
            Crashlytics.logException(e);
        }

//        Log.d(TAG, "forcing crash.....");
//        Crashlytics.getInstance().crash();


        long logSize = logPath.length();
        if (logSize < 400 * 1024) {
            return;
        }

        File[] files = basePath.listFiles();

        String header = normAppName() + "." + serialNumber + ".";
        String zipFooter = ".log.zip";
        String txtFooter = ".log.txt";
        int lastNum = -1;

        if (files != null) {
            for (int i = 0; i < files.length; i++) {
                String filename = files[i].getName();
                if (!filename.startsWith(header)) {
                    continue;
                }
                if (!filename.endsWith(zipFooter)) {
                    continue;
                }

                int num = leiToInt(filename.split("\\.")[2]);
                if (num > lastNum) {
                    lastNum = num;
                }
            }
        }

        try {
            int zipNum = lastNum + 1;
            File zipPath = new File(basePath + "/" + (header + intToLei(zipNum) + zipFooter));
            ZipOutputStream zipOS = new ZipOutputStream(new FileOutputStream(zipPath));
            {
                ZipEntry e = new ZipEntry(header + intToLei(zipNum) + txtFooter);
                zipOS.putNextEntry(e);
                byte[] bytes = readAllBytes(logPath);
                zipOS.write(bytes, 0, bytes.length);
                zipOS.closeEntry();
            }
            zipOS.close();
        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
            Crashlytics.logException(e);
        }

        logPath.delete();
    }

    private static boolean shouldDownloadFile(String fileName) {
        String status = (String) downloadStatus.get(fileName);
        Log.d(TAG, "shouldDownloadFile -> Download fileName:" + fileName + "status:" + status);
        if (status == null || status.equals(DOWNLOAD_FAILED)) {
            return true;
        } else if (status.equals(DOWNLOAD_SUCCESS) || status.equals(DOWNLOAD_STARTED)) {
            return false;
        }
        return true;
    }

    public static String checkIfUrlDownloaded(String downloadUrl, String directory) {
        String isDownloaded = DOWNLOAD_NOT_YET_STARTED;
        String saveAsBaseFileName = FilenameUtils.getName(downloadUrl);
        String saveAsFileName = directory + "/" + saveAsBaseFileName;
        String status = (String) downloadStatus.get(saveAsFileName);
        if (status != null && status.equals(DOWNLOAD_FAILED)) {
            isDownloaded = DOWNLOAD_FAILED;
        } else if (status != null && (status.equals(DOWNLOAD_SUCCESS) || status.equals(DOWNLOAD_STARTED))) {
            isDownloaded = status;
        }

        if (isDownloaded != null) {
            Log.i(TAG, "checkIfUrlDownloaded -> Download fileName:" + saveAsFileName + "status:" + isDownloaded);
            ChimpleLogger.logEventToFireBase("check_if_file_downloaded", saveAsBaseFileName, isDownloaded + "");
        }
        return isDownloaded;
    }

    private static void downloadFileWithResume(String downloadUrl, String directory, boolean isNetWorkEnable) {
        String saveAsFileName = null;
        String baseName = null;
        try {
            // create directory if not exists
            String saveAsBaseFileName = FilenameUtils.getName(downloadUrl);
            saveAsFileName = directory + "/" + saveAsBaseFileName;
            baseName = FilenameUtils.getBaseName(downloadUrl);
            boolean shouldDownload = ChimpleLogger.shouldDownloadFile(saveAsFileName);
            Log.i(TAG, "shouldDownloadFile -> Download fileName:" + saveAsFileName + " status:" + shouldDownload);
            if (isNetWorkEnable && shouldDownload) {
                downloadStatus.put(saveAsFileName, DOWNLOAD_STARTED);
                ChimpleLogger.logEventToFireBase("download_status", saveAsFileName, DOWNLOAD_STARTED);
                String dirPath = context.getApplicationInfo().dataDir + File.separator + "files" + File.separator + "subpackages" + File.separator + directory;
                File basePath = ChimpleLogger.createDirIfNotExists(dirPath);
                File outputFile = new File(basePath + File.separator + saveAsBaseFileName);
                Log.i(TAG, "deleting zip:" + outputFile.getAbsolutePath());
                outputFile.delete();

                if (!outputFile.exists()) {
                    outputFile.createNewFile();
                }
                URLConnection downloadFileConnection = addFileResumeFunctionality(downloadUrl, outputFile);
                long bytes = transferDataAndGetBytesDownloaded(downloadFileConnection, outputFile);
                if (bytes > 0) {
                    unzip(basePath, baseName, saveAsFileName, outputFile, basePath);
                    outputFile.delete();
                }
            } else if (!isNetWorkEnable && shouldDownload) {
                ChimpleLogger.logEventToFireBase("download_status_no_network", saveAsFileName, DOWNLOAD_FAILED);
                downloadStatus.put(saveAsFileName, DOWNLOAD_FAILED);
            }

        } catch (Exception e) {
            e.printStackTrace();
            if (saveAsFileName != null) {
                Log.d(TAG, "failed -> on downloading file" + saveAsFileName);
                ChimpleLogger.logEventToFireBase("download_status", saveAsFileName, DOWNLOAD_FAILED);
                downloadStatus.put(saveAsFileName, DOWNLOAD_FAILED);
            }
            Crashlytics.logException(e);
        }
    }

    private static void unzip(File basePath, String folderName, String saveAsFileName, File zipFile, File targetDirectory) {
        ZipInputStream zis = null;
        try {
            zis = new ZipInputStream(
                    new BufferedInputStream(new FileInputStream(zipFile)));

            ZipEntry ze;
            int count;
            byte[] buffer = new byte[8192];
            while ((ze = zis.getNextEntry()) != null) {
                File file = new File(targetDirectory, ze.getName());
                File dir = ze.isDirectory() ? file : file.getParentFile();
                if (!dir.isDirectory() && !dir.mkdirs())
                    throw new FileNotFoundException("Failed to ensure directory: " +
                            dir.getAbsolutePath());
                if (ze.isDirectory())
                    continue;
                FileOutputStream fout = new FileOutputStream(file);
                try {
                    while ((count = zis.read(buffer)) != -1)
                        fout.write(buffer, 0, count);

                    Log.d(TAG, "unzip file ->" + saveAsFileName);
                } finally {
                    fout.close();
                }
            }
            downloadStatus.put(saveAsFileName, DOWNLOAD_SUCCESS);
            String status = (String) downloadStatus.get(saveAsFileName);
            Log.d(TAG, "file ->" + saveAsFileName + "downloaded successfully!!");
            ChimpleLogger.logEventToFireBase("download_status", saveAsFileName, DOWNLOAD_SUCCESS);
        } catch (Exception e) {
            downloadStatus.put(saveAsFileName, DOWNLOAD_FAILED);
            ChimpleLogger.logEventToFireBase("download_status", saveAsFileName, DOWNLOAD_FAILED);
            Log.d(TAG, "file ->" + saveAsFileName + " downloaded failed!!");
            File baseDir = new File(basePath + File.separator + folderName);
            deleteDirOnFail(baseDir);
            e.printStackTrace();
            Crashlytics.logException(e);
        } finally {
            try {
                if (zis != null) zis.close();
            } catch (Exception e) {
                e.printStackTrace();
                Crashlytics.logException(e);
            }
        }
    }

    private static void deleteDirOnFail(File element) {
        if (element.isDirectory()) {
            for (File sub : element.listFiles()) {
                deleteDirOnFail(sub);
            }
        }
        element.delete();
    }


    private static File newFile(File destinationDir, ZipEntry zipEntry) throws IOException {
        File destFile = new File(destinationDir, zipEntry.getName());

        String destDirPath = destinationDir.getCanonicalPath();
        String destFilePath = destFile.getCanonicalPath();

        if (!destFilePath.startsWith(destDirPath + File.separator)) {
            throw new IOException("Entry is outside of the target dir: " + zipEntry.getName());
        }

        return destFile;
    }

    @SuppressLint("NewApi")
    public static void downloadFile(final String downloadUrl, final String directory) {
        final boolean isNetWorkEnable = ChimpleLogger.isNetworkAvailable();
        AsyncTask.execute(new Runnable() {
            @Override
            public void run() {
                ChimpleLogger.downloadFileWithResume(downloadUrl, directory, isNetWorkEnable);
            }
        });
    }

    public static boolean isFileExists(final String path) {
        File basePath = new File(ChimpleLogger.getStorageDirectory() + File.separator + "bahama" + File.separator + path);
        if (basePath.exists()) {
            return true;
        }
        return false;
    }

    public static String getStorageDirectory() {
        File path = context.getExternalFilesDir(null);
        if (null == path) {
            path = context.getFilesDir();
        }

        return path.getAbsolutePath();
    }


    private static long transferDataAndGetBytesDownloaded(URLConnection downloadFileConnection, File outputFile) throws IOException {

        long bytesDownloaded = 0;
        try (InputStream is = downloadFileConnection.getInputStream(); OutputStream os =
                new FileOutputStream(outputFile, true)) {

            byte[] buffer = new byte[1024];

            int bytesCount;
            while ((bytesCount = is.read(buffer)) > 0) {
                os.write(buffer, 0, bytesCount);
                bytesDownloaded += bytesCount;
            }
        }
        return bytesDownloaded;
    }


    private static URLConnection addFileResumeFunctionality(String downloadUrl, File outputFile)
            throws IOException, URISyntaxException, ProtocolException, ProtocolException {
        long existingFileSize = 0L;
        URLConnection downloadFileConnection = new URI(downloadUrl).toURL().openConnection();
        return downloadFileConnection;
    }

    public static class ProfilesFilter implements FilenameFilter {

        private String ext;

        public ProfilesFilter(String ext) {
            this.ext = ext.toLowerCase();
        }

        @Override
        public boolean accept(File dir, String name) {
            return name.toLowerCase().endsWith(ext);
        }
    }


    public static void logEventToFireBase(final String name, final String key, final String data) {
        AsyncTask.execute(new Runnable() {
            @Override
            public void run() {
                Bundle bundle = new Bundle();
                bundle.putString("key", key);
                bundle.putString("value", data);
                String deviceId = getDeviceId();
                bundle.putString("advertising_id", deviceId);
                Log.i(TAG, "firebase logging event in Logger " + " name:" + name + " bundle: " + bundle.toString());
                firebaseAnalytics.logEvent(name, bundle);

            }
        });
    }

    public static void storeInSharedPreference(Context context, String key, String value) {
        Log.d(TAG, "diff Stored key:" + key + " value:" + value);
        SharedPreferences preference = context.getSharedPreferences(SHARED_ALARM_KEYS, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = preference.edit();
        editor.putString(key, value);
        editor.apply();
        editor.commit();
    }

    public static void storeInSharedPreference(Context context, String key, boolean value) {
        SharedPreferences preference = context.getSharedPreferences(SHARED_ALARM_KEYS, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = preference.edit();
        editor.putBoolean(key, value);
        editor.apply();
        editor.commit();
    }

    public static void storeInSharedPreference(Context context, String key, long value) {
        SharedPreferences preference = context.getSharedPreferences(SHARED_ALARM_KEYS, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = preference.edit();
        editor.putLong(key, value);
        Log.d(TAG, "diff storeInSharedPreference key:" + key + " and value:" + value);
        editor.apply();
        editor.commit();
    }

    public static String getStringFromSharedPreference(Context context, String key) {
        SharedPreferences preferences = context.getSharedPreferences(SHARED_ALARM_KEYS, Context.MODE_PRIVATE);
        String value = preferences.getString(key, null);
        Log.d(TAG, "diff getStringFromSharedPreference for key:" + key + " got value:" + value);
        return value;
    }

    public static long getLongFromSharedPreference(Context context, String key) {
        SharedPreferences preferences = context.getSharedPreferences(SHARED_ALARM_KEYS, Context.MODE_PRIVATE);
        return preferences.getLong(key, 0);
    }


    public static boolean getBooleanFromSharedPreference(Context context, String key) {
        SharedPreferences preferences = context.getSharedPreferences(SHARED_ALARM_KEYS, Context.MODE_PRIVATE);
        return preferences.getBoolean(key, false);
    }


    public static void configureChimpleReminderNotifications(Context context, String titleKey, String contentKey, String title, String content, boolean override) {
        if (override || ChimpleLogger.getStringFromSharedPreference(context, titleKey) == null) {
            ChimpleLogger.storeInSharedPreference(context, titleKey, title);
            ChimpleLogger.storeInSharedPreference(context, contentKey, content);
        }
    }

    public static Notification getNotification(Context context, String title, String content, int id, int color) {
        if (title != null && content != null) {
            NotificationManager notificationManager =
                    (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
            String channelId = "channel-" + id;
            String channelName = "notification-channel-" + id;
            int importance = NotificationManager.IMPORTANCE_HIGH;
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                Log.d(TAG, "diff creating notification channel:" + channelId + " name:" + channelName);
                NotificationChannel mChannel = new NotificationChannel(
                        channelId, channelName, importance);
                notificationManager.createNotificationChannel(mChannel);
            }

            NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(context, channelId)
                    .setContentTitle(title)
                    .setContentText(content)
                    .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                    .setStyle(new NotificationCompat.BigTextStyle())
                    .setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION))
//                    .setSmallIcon(R.mipmap.small)
                    .setChannelId(channelId)
//                    .setLargeIcon(BitmapFactory.decodeResource(context.getResources(), R.mipmap.ic_launcher))
                    .setContentIntent(PendingIntent.getActivity(context, 0, new Intent(context, AppActivity.class), 0))
                    .setAutoCancel(true);

            if (color != -1) {
                notificationBuilder.setColor(color);
            }

            Log.d(TAG, "diff Notification configured for title:" + title + " and content:" + content + "");
            return notificationBuilder.build();
        }
        return null;
    }

    public static PendingIntent getIntent(Context context, int id) {
        Intent notificationIntent = new Intent(context, AlarmReceiver.class);
        notificationIntent.setAction("SCHEDULED_ACTION");
        notificationIntent.putExtra(AlarmReceiver.NOTIFICATION_ID, id);
        PendingIntent repeatingPendingIntent = PendingIntent.getBroadcast(context, id, notificationIntent, FLAG_UPDATE_CURRENT);
        return repeatingPendingIntent;
    }

    public static void scheduleRepeatingAlarm(Context context, String hour, String min, int id) {
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        PendingIntent repeatingPendingIntent = ChimpleLogger.getIntent(context, id);
        // cancel alarm
        Log.d(TAG, "diff cancelling repeat notification for Id:" + id + " hour:" + hour + " min:" + min);
        alarmManager.cancel(repeatingPendingIntent);

        Log.d(TAG, "diff  Scheduling repeat notification for Id:" + id + " hour:" + hour + " min:" + min);
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(System.currentTimeMillis());
        if (!AlarmReceiver.isTesting) {
            calendar.set(Calendar.HOUR_OF_DAY, Integer.parseInt(hour));
            calendar.set(Calendar.MINUTE, Integer.parseInt(min));
        } else {
            calendar.add(Calendar.MINUTE, 1 * ChimpleLogger.UNIT_OF_MEASUREMENT);
        }
        calendar.set(Calendar.SECOND, 0);
        long nextTick = 0;
        if (!AlarmReceiver.isTesting) {
            if (calendar.getTimeInMillis() < System.currentTimeMillis()) {
                calendar.add(Calendar.DAY_OF_MONTH, 1);
            }
            nextTick = TimeUnit.MILLISECONDS.convert(1, TimeUnit.DAYS);
        } else {
            nextTick = 1000 * 60 * 1 * ChimpleLogger.UNIT_OF_MEASUREMENT;
        }

        alarmManager.setRepeating(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(),
                nextTick, repeatingPendingIntent);

    }

    public static void scheduleOneTimeAlarm(Context context, String hour, String min, String title, String content) {
//        Log.d(TAG, "Scheduling onetime notification start at hour:" + hour + " min:" + min + " title:" + title + " content:" + content);

        Intent notificationIntent = new Intent(context, AlarmReceiver.class);
        notificationIntent.setAction("SCHEDULED_ACTION");
        notificationIntent.putExtra(AlarmReceiver.NOTIFICATION_ID, UNIQUE_ONE_TIME_NOTIFICATION_ID);

        List<Notification> notifications = new ArrayList<Notification>();
        notificationIntent.putExtra(AlarmReceiver.NOTIFICATIONS, notifications.add(getNotification(
                context, title, content, UNIQUE_ONE_TIME_NOTIFICATION_ID,
                AlarmReceiver.isTesting ? Color.CYAN : -1
        )));

        PendingIntent oneTimePendingIntent = PendingIntent.getBroadcast(context, UNIQUE_ONE_TIME_NOTIFICATION_ID, notificationIntent, 0);
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(System.currentTimeMillis());
        calendar.set(Calendar.SECOND, 30);
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        alarmManager.setExact(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(),
                oneTimePendingIntent);
    }

    public static void configureAlarms(Context context, boolean isReboot) {
        if (isReboot) {
            ChimpleLogger.bootCallRecived = true;
            ChimpleLogger.scheduleRepeatingAlarm(context, REPEAT_MORNING_HOUR, REPEAT_MORNING_MIN, ChimpleLogger.UNIQUE_REPEAT_NOTIFICATION_ID_9_AM);
            ChimpleLogger.scheduleRepeatingAlarm(context, REPEAT_EVENING_HOUR, REPEAT_EVENING_MIN, ChimpleLogger.UNIQUE_REPEAT_NOTIFICATION_ID_5_PM);
        }

        if (!ChimpleLogger.bootCallRecived) {
            ChimpleLogger.scheduleRepeatingAlarm(context, REPEAT_MORNING_HOUR, REPEAT_MORNING_MIN, ChimpleLogger.UNIQUE_REPEAT_NOTIFICATION_ID_9_AM);
            ChimpleLogger.scheduleRepeatingAlarm(context, REPEAT_EVENING_HOUR, REPEAT_EVENING_MIN, ChimpleLogger.UNIQUE_REPEAT_NOTIFICATION_ID_5_PM);
        }
    }

    public static void messages(Context context, JSONObject obj, String key, String lang) {
        try {
            JSONArray jsonArray = obj.getJSONArray(key);
            HashMap<String, String> data;
            key = lang + "_" + key;
            ChimpleLogger.storeInSharedPreference(context, key + "-length", jsonArray.length());
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject item = jsonArray.getJSONObject(i);
                String title = item.getString(MESSAGE_TITLE);
                String content = item.getString(MESSAGE_CONTENT);
                data = new HashMap<String, String>();
                data.put(MESSAGE_TITLE, title != null ? title : "");
                data.put(MESSAGE_CONTENT, content != null ? content : "");
                ChimpleLogger.storeInSharedPreference(context, key + MESSAGE_TITLE + (i + 1), title);
                ChimpleLogger.storeInSharedPreference(context, key + MESSAGE_CONTENT + (i + 1), content);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public static void loadJSON(Context context, String jsonMessage, String lang) {
        try {
//            Log.d(TAG, "diff loaded JSON:" + jsonMessage + " with lang:" + lang);
            JSONObject obj = new JSONObject(jsonMessage);
            for (int i = 0; i < MESSAGE_KEYS.length; i++) {
                String key = MESSAGE_KEYS[i];
                ChimpleLogger.messages(context, obj, key, lang);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

}