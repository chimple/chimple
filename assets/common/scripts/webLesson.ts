import LessonController from "./lessonController";

import Loading from "./loading";

import { Util } from "./util";
import Config, { Lang } from "./lib/config";
import Profile, { LANGUAGE } from "./lib/profile";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WebLesson extends cc.Component {
    onLoad () {
        const params = new URLSearchParams(window.location.search)
        Config.isMicroLink = true
        Profile.setValue(LANGUAGE, Lang.ENGLISH);
        Util.loadDirectLessonWithLink(params.get('courseid'),params.get('chapterid'),params.get('lessonid'),this.node);
    }
}
