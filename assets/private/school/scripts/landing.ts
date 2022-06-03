import ccclass = cc._decorator.ccclass;
import { Mode, MODE } from "../../../common/scripts/lib/constants";
import {
    CHIMPLE_MODE
} from "../../../chimple";
import Config from "../../../common/scripts/lib/config";
import { ParseUser } from "../../../common/scripts/domain/parseUser";
import { ParseApi } from "../../../common/scripts/services/parseApi";
import { ParseNetwork } from "../../../common/scripts/services/ParseNetwork";
import Profile, { CURRENTMODE } from "../../../common/scripts/lib/profile";
import { ParseConnection } from "../../../common/scripts/domain/parseConnection";

export const STUDENT_LIST = 'private/school/scenes/studentList';
export const SECTION_LIST = 'private/school/scenes/sectionList';
export const SELECT_SECTIONS_SCENE = 'private/school/scenes/selectSections';
export const SCHOOL_REGISTRATION_SCENE = 'private/school/scenes/schoolRegistration';
export const TEACHER_REGISTRATION_SCENE = 'private/teacher/scenes/teacherRegistration';
export const TEACHER_CHAPTER_LESSONS = 'private/teacher/scenes/teacherChapterLessons';
export const TEACHER_REPORT_CARD_SCENE = 'private/teacher/scenes/teacherReportCard';
export const TEACHER_REPORT_METRICS_SCENE = 'private/teacher/scenes/teacherReportMetrics';
export const REGISTER_SCENE = 'private/register/scenes/register';
export const HOME_SCENE = 'menu/home/scenes/home';
export const TEACHER_HOME = 'private/teacher/scenes/teacherHome';
export const STUDENT_PROGRESS_FOR_LESSON = 'private/teacher/scenes/teacherStudentProgress';
export const TEACHER_STUDENT_PROGRESS = 'private/teacher/scenes/teacherStudentProgressScene';

@ccclass
export class Landing extends cc.Component {
    protected async onLoad() {
        ParseNetwork.init();
        const selectedMode: number = Number(cc.sys.localStorage.getItem(CURRENTMODE)) || MODE;
        switch (selectedMode) {
            case Mode.HomeConnect:
            case Mode.Home:
                this.navigateToHome();
                break;
            case Mode.School:
                await this.navigateToSchool();
                break;
            case Mode.Teacher:
                await this.navigateToTeacher();
                break;
            default: // Mode.NONE
                Config.i.pushScene(REGISTER_SCENE, 'private', null, true);
                break;
        }
    }

    public navigateToHome() {
        Config.i.pushScene('private/home/loginnew/scenes/welcomePage', 'private', null, true);
    }

    public async navigateToSchool() {
        const loggedInUser: ParseUser = ParseApi.getInstance().getLoggedInUser();
        const connections: ParseConnection[] = await ParseApi.getInstance().connections();
        if (!!loggedInUser && !ParseNetwork.getInstance().isEmpty(loggedInUser)
            && !ParseNetwork.getInstance().isEmpty(connections)) {
            Config.i.pushScene(SELECT_SECTIONS_SCENE, 'private', null, true);
        } else {
            Config.i.pushScene(SCHOOL_REGISTRATION_SCENE, 'private', null, true);
        }
    }

    public async navigateToTeacher() {
        const teacherUser: ParseUser = ParseApi.getInstance().getLoggedInUser();
        if (!!teacherUser && !ParseNetwork.getInstance().isEmpty(teacherUser)) {
            await Profile.teacherPostLoginActivity(teacherUser.objectId);
            Config.i.pushScene(TEACHER_REPORT_CARD_SCENE, 'private', null, true);
        } else {
            Config.i.pushScene(TEACHER_REGISTRATION_SCENE, 'private', null, true);
        }
    }
}