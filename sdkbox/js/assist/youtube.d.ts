declare module sdkbox {     module YoutubeListener {        export function onPlayEnds(played_ok : boolean) : object;
    }     module PluginYoutube {        /**        * Set GDPR        *        * **NOTE**: please call before 'init' function        */        export function setGDPR(enabled : boolean) : object;
        /*!        * initialize the plugin instance.        */        export function init() : object;
        /*!        * set provided listener.        */        export function setListener(listener : object) : object;
        /*!        * get provided listener.        */        export function getListener() : object;
        /*!        * remove listeners.        */        export function removeListener() : object;
        /*!        * Play youtube video with video id        * you can find video id as the last part of the youtube video's url        */        export function playVideo(video_id : string , startMillis : number , autoplay : boolean , lightbox : boolean) : object;
        /*!        * Play a youtube playlist        */        export function playPlayList(playlist_id : string , playListStartIndex : number , startMillis : number , autoplay : boolean , lightbox : boolean) : object;
        /*!        * Play a group of youtube videos        */        export function playVideoList(video_ids : object , playListStartIndex : number , startMillis : number , autoplay : boolean , lightbox : boolean) : object;
        /*!        * Close youtube player        */        export function close() : object;
    }}