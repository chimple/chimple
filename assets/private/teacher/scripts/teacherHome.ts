import ccclass = cc._decorator.ccclass;

import property = cc._decorator.property;
import Loading from "../../../common/scripts/loading";
import Config from "../../../common/scripts/lib/config";
import {User} from "../../../common/scripts/lib/profile";
import TeacherHeaderButton from "./teacherHeaderButton";
import {Course} from "../../../common/scripts/lib/convert";
import {Util} from "../../../common/scripts/util";
import TeacherCourseContent from "./teacherCourseContent";
import TeacherStartContent from "./teacherStartContent";
import {ParseApi} from "../../../common/scripts/services/parseApi";
import {CURRENT_SCHOOL_ID, CURRENT_SECTION_ID} from "../../../common/scripts/lib/constants";
import {ParseSubject} from "../../../common/scripts/domain/parseSubject";
import {
    RECEIVED_TEACHER_REQUEST,
    ASSIGN_HOMEWORK,
    ASSIGNMENT_ID_KEY_FOR_ASSIGN_HW, TEACHER_ID_KEY,
    TEACHER_ID_KEY_FOR_ASSIGN_HW
} from "../../../chimple";
import {ParseUser} from "../../../common/scripts/domain/parseUser";

@ccclass
export default class TeacherHome extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null

    @property(cc.Prefab)
    startContentPrefab: cc.Node = null

    @property(cc.Prefab)
    courseContentPrefab: cc.Node = null

    @property(cc.Node)
    header: cc.Node = null

    @property(cc.Prefab)
    headerButtonPrefab: cc.Prefab = null

    @property(cc.Node)
    homeButton: cc.Node = null

    @property(cc.Node)
    loading: cc.Node = null;

    private index = 0;
    private selectedHeaderButton: TeacherHeaderButton;
    static homeSelected: boolean = true;

    protected async onLoad() {
        this.loading.getComponent(Loading).allowCancel = false
        const config = Config.i;
        User.getCurrentUser().courseProgressMap.forEach(() => {
            const headerButton = cc.instantiate(this.headerButtonPrefab);
            const headerButtonComp = headerButton.getComponent(TeacherHeaderButton);
            headerButtonComp.label.string = ''
            headerButtonComp.sprite.spriteFrame = null
            headerButtonComp.selected.node.active = false
            this.header.insertChild(headerButton, ++this.index)
        });

        this.selectedHeaderButton = this.homeButton.getComponent(TeacherHeaderButton);
        this.selectedHeaderButton.button.node.on('touchend', () => {
            this.onHomeClick();
        })
        this.selectedHeaderButton.label.string = Util.i18NText('Home')
        this.header.width = cc.winSize.width
        this.header.getComponent(cc.Layout).spacingX = Math.max(0, cc.winSize.width / (this.index + 2) - this.homeButton.width)
        this.index = 0;

        config.loadCourseJsons(User.getCurrentUser(), this.node, async () => {
            config.curriculum.forEach((course: Course, name: string) => {
                const headerButton = this.header.children[++this.index]
                const headerButtonComp = headerButton.getComponent(TeacherHeaderButton);
                headerButtonComp.label.string = name
                Util.load(name + '/course/res/icons/' + name + '.png', (err: Error, texture) => {
                    if (!err) {
                        headerButtonComp.sprite.spriteFrame = new cc.SpriteFrame(texture);
                    } else {
                        this.loading.getComponent(Loading).addMessage(err.message, false)
                    }
                });

                headerButtonComp.button.node.on('touchend', () => {
                    this.selectHeaderButton(headerButtonComp);
                    config.course = course;
                    this.content.removeAllChildren();
                    this.onCourseClick();
                });
                if (!TeacherHome.homeSelected && config.course && config.course.id == course.id) {
                    this.selectHeaderButton(headerButtonComp);
                }
            });

            if (TeacherHome.homeSelected) {
                this.onHomeClick()
            } else {
                this.onCourseClick()
            }

            await this.loadChapterAssignments();
            this.loading.active = false;
        });
    }

    async loadChapterAssignments() {
        const schoolId: string = cc.sys.localStorage.getItem(CURRENT_SCHOOL_ID);
        const sectionId: string = cc.sys.localStorage.getItem(CURRENT_SECTION_ID);

        const subjects: ParseSubject[] = await ParseApi.getInstance().getAllSubjects();

        const promises = subjects.map(
            (s) => {
                return ParseApi.getInstance().getChapterAssignment(
                    schoolId, sectionId, s.objectId
                );
            }
        )

        return await Promise.all(promises);
    }

    onAddNewStudentClick() {
        const user: ParseUser = ParseApi.getInstance().getLoggedInUser();
        const schoolId: string = cc.sys.localStorage.getItem(CURRENT_SCHOOL_ID);
        const sectionId: string = cc.sys.localStorage.getItem(CURRENT_SECTION_ID);
        const addTeacherReq = `http://chimple.github.io/${RECEIVED_TEACHER_REQUEST}/${TEACHER_ID_KEY}/${schoolId}/name/${user.fullName}/sectionId/${sectionId}`;
        Util.shareText(addTeacherReq);
        cc.log('teacher request', addTeacherReq)
    }

    onHomeClick() {
        TeacherHome.homeSelected = true;
        const config = Config.i;
        config.course = null;
        config.chapter = null;
        config.lesson = null;
        this.selectHeaderButton(this.homeButton.getComponent(TeacherHeaderButton));
        this.content.removeAllChildren();
        const startContent = cc.instantiate(this.startContentPrefab);
        const startContentComp = startContent.getComponent(TeacherStartContent);
        startContentComp.loading = this.loading;
        this.content.addChild(startContent);
    }

    private onCourseClick() {
        TeacherHome.homeSelected = false
        const courseContent = cc.instantiate(this.courseContentPrefab);
        const courseContentComp = courseContent.getComponent(TeacherCourseContent);
        courseContentComp.loading = this.loading;
        courseContentComp.content = this.content;
        this.content.addChild(courseContent);
    }

    selectHeaderButton(newButton: TeacherHeaderButton) {
        if (this.selectedHeaderButton != null) this.selectedHeaderButton.selected.node.active = false
        newButton.selected.node.active = true
        this.selectedHeaderButton = newButton
    }

}
