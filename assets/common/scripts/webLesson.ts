import LessonController from "./lessonController";

import Loading from "./loading";

import {Util} from "./util";
import Config, {Lang} from "./lib/config";
import Profile, {LANGUAGE} from "./lib/profile";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WebLesson extends cc.Component {
    onLoad() {
        const params = new URLSearchParams(window.location.search)
        Config.isMicroLink = true
        Profile.setValue(LANGUAGE, Lang.ENGLISH);

        const input = {
            courseid: params.get('courseid'),
            chapterid: params.get('chapterid'),
            lessonid: params.get('lessonid')
        }
        Util.loadDirectLessonWithLink(input, this.node);
    }
}
