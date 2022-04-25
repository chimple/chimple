declare module sdkbox {     module YoutubeListener {        export function onPlayEnds(played_ok : boolean) : void;
    }     module PluginYoutube {        /**        * Set GDPR        *        * **NOTE**: please call before 'init' function        */        export function setGDPR(enabled : boolean) : void;
        /*!        * initialize the plugin instance.        */        export function init() : void;
        /*!        * set provided listener.        */        export function setListener(listener : object) : void;
        /*!        * get provided listener.        */        export function getListener() : object;
        /*!        * remove listeners.        */        export function removeListener() : void;
        /*!        * Play youtube video with video id        * you can find video id as the last part of the youtube video's url        */        export function playVideo(video_id : string , startMillis : number , autoplay : boolean , lightbox : boolean) : void;
        /*!        * Play a youtube playlist        */        export function playPlayList(playlist_id : string , playListStartIndex : number , startMillis : number , autoplay : boolean , lightbox : boolean) : void;
        /*!        * Play a group of youtube videos        */        export function playVideoList(video_ids : object , playListStartIndex : number , startMillis : number , autoplay : boolean , lightbox : boolean) : void;
        /*!        * Close youtube player        */        export function close() : void;
    }}