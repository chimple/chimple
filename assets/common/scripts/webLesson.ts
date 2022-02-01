import { Util } from "./util";
import Config, { Lang } from "./lib/config";
import Profile, { LANGUAGE } from "./lib/profile";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WebLesson extends cc.Component {
    onLoad() {
        const params = new URLSearchParams(window.location.search)
        Config.isMicroLink = true
        const lang = params.get('lang')
        if (lang == Lang.HINDI)
            Profile.setValue(LANGUAGE, Lang.HINDI);
        else if (lang == Lang.KANNADA)
            Profile.setValue(LANGUAGE, Lang.HINDI);
        else
            Profile.setValue(LANGUAGE, Lang.ENGLISH);

        const input = {
            courseid: params.get('courseid'),
            chapterid: params.get('chapterid'),
            lessonid: params.get('lessonid'),
            assignmentid: params.get('assignmentid'),
            webclass: params.get('webclass'),
            mlpartnerid: params.get('mlPartnerId'),
            mlclassid: params.get('mlClassId'),
            mlstudentid: params.get('mlStudentId'),
            end: params.get('end')
        }
        Util.loadDirectLessonWithLink(input, this.node);
    }
}
