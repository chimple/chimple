import LessonController from "./lessonController";

import Loading from "./loading";

import { Util } from "./util";
import Config from "./lib/config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WebLesson extends cc.Component {
    onLoad () {
        const params = new URLSearchParams(window.location.search)
        Config.isMicroLink = true
        Util.loadDirectLessonWithLink(params.get('courseid'),params.get('chapterid'),params.get('lessonid'),this.node);
    }
}
