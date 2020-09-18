/****************************************************************************

 Copyright (c) 2014-2020 SDKBOX Inc

 ****************************************************************************/
#ifndef _PLUGIN_YOUTUBE_H_
#define _PLUGIN_YOUTUBE_H_

#include <vector>
#include <map>
#include <string>

namespace sdkbox
{

    class YoutubeListener
    {
    public:
        virtual void onPlayEnds( bool played_ok ) = 0;
    };

    class PluginYoutube
    {

    public:
        /**
         * Set GDPR
         *
         * **NOTE**: please call before 'init' function
         */
        static void setGDPR(bool enabled);

        /*!
         * initialize the plugin instance.
         */
        static void init();

        /*!
         * set provided listener.
         */
        static void setListener(YoutubeListener* listener);

        /*!
         * get provided listener.
         */
        static YoutubeListener* getListener();

        /*!
         * remove listeners.
         */
        static void removeListener();

        /*!
         * Play youtube video with video id
         * you can find video id as the last part of the youtube video's url
         */
        static void playVideo( const std::string& video_id, int startMillis, bool autoplay, bool lightbox );

        /*!
         * Play a youtube playlist
         */
        static void playPlayList( const std::string& playlist_id, int playListStartIndex, int startMillis, bool autoplay, bool lightbox );

        /*!
         * Play a group of youtube videos
         */
        static void playVideoList( const std::vector<std::string>& video_ids, int playListStartIndex, int startMillis, bool autoplay, bool lightbox );

        /*!
         * Close youtube player
         */
        static void close();
    };
}

#endif
