package org.chimple.bahama;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.widget.Toast;

import com.google.android.youtube.player.YouTubeBaseActivity;
import com.google.android.youtube.player.YouTubeInitializationResult;
import com.google.android.youtube.player.YouTubePlayer;
import com.google.android.youtube.player.YouTubePlayerView;

import static org.chimple.bahama.AppActivity.YOUTUBE_CODE;

public class YoutubeActivity extends YouTubeBaseActivity implements YouTubePlayer.OnInitializedListener {

    private static final int RECOVERY_REQUEST = 1;
    public static final String YOUTUBE_API_KEY = "AIzaSyCG25IwSEZcJuF5Te7kko9XawkHaEJ48Ws";
    private YouTubePlayerView youTubeView;
    private MyPlayerStateChangeListener playerStateChangeListener;
    private MyPlaybackEventListener playbackEventListener;
    private YouTubePlayer player;
    private String videoId = null;
    public static String TAG = YoutubeActivity.class.getSimpleName();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.youtube_screen);

        youTubeView = (YouTubePlayerView) findViewById(R.id.youtube_view);
        youTubeView.initialize(YOUTUBE_API_KEY, this);

        playerStateChangeListener = new MyPlayerStateChangeListener();
        playbackEventListener = new MyPlaybackEventListener();
    }

    @Override
    public void onInitializationSuccess(YouTubePlayer.Provider provider, YouTubePlayer player, boolean wasRestored) {
        this.player = player;
        this.player.setPlayerStateChangeListener(playerStateChangeListener);
        this.player.setPlaybackEventListener(playbackEventListener);
        Intent intent = getIntent();
        this.videoId = intent.getStringExtra("videoId");
        if (!wasRestored) {
            this.player.loadVideo(this.videoId);
        }
    }

    @Override
    public void onInitializationFailure(YouTubePlayer.Provider provider, YouTubeInitializationResult errorReason) {
        Log.d(TAG, "YoutubeActivity 4444");
        if (errorReason.isUserRecoverableError()) {
            errorReason.getErrorDialog(this, RECOVERY_REQUEST).show();
        } else {
            String error = String.format(getString(R.string.player_error), errorReason.toString());
            Toast.makeText(this, error, Toast.LENGTH_LONG).show();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == RECOVERY_REQUEST) {
            // Retry initialization if user performed a recovery action
            getYouTubePlayerProvider().initialize(YOUTUBE_API_KEY, this);
        }
    }

    protected YouTubePlayer.Provider getYouTubePlayerProvider() {
        return youTubeView;
    }


    private final class MyPlaybackEventListener implements YouTubePlayer.PlaybackEventListener {

        @Override
        public void onPlaying() {
            // Called when playback starts, either due to user action or call to play().
        }

        @Override
        public void onPaused() {
            // Called when playback is paused, either due to user action or call to pause().
        }

        @Override
        public void onStopped() {
            // Called when playback stops for a reason other than being paused.
        }

        @Override
        public void onBuffering(boolean b) {
            // Called when buffering starts or ends.
        }

        @Override
        public void onSeekTo(int i) {
            // Called when a jump in playback position occurs, either
            // due to user scrubbing or call to seekRelativeMillis() or seekToMillis()
        }
    }

    private final class MyPlayerStateChangeListener implements YouTubePlayer.PlayerStateChangeListener {

        @Override
        public void onLoading() {
            // Called when the player is loading a video
            // At this point, it's not ready to accept commands affecting playback such as play() or pause()
        }

        @Override
        public void onLoaded(String s) {
            // Called when a video is done loading.
            // Playback methods such as play(), pause() or seekToMillis(int) may be called after this callback.
        }

        @Override
        public void onAdStarted() {
            // Called when playback of an advertisement starts.
        }

        @Override
        public void onVideoStarted() {
            // Called when playback of the video starts.
        }

        @Override
        public void onVideoEnded() {
            // Called when the video reaches its end.
            Intent i = new Intent();
            i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            setResult(YOUTUBE_CODE, i);
            finish();
            return;
        }

        @Override
        public void onError(YouTubePlayer.ErrorReason errorReason) {
            // Called when an error occurs.
        }
    }
}