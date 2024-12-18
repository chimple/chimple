import Config, { ASSIGNMENT_COURSE_ID } from "../../../common/scripts/lib/config";
import { courseSortIndex, Mode } from "../../../common/scripts/lib/constants";
import Profile, { User, CourseProgress, CURRENTMODE } from "../../../common/scripts/lib/profile";
import { Util } from "../../../common/scripts/util";
import StartHeaderButton from "./startHeaderButton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StartHeader extends cc.Component {
    @property(cc.Node)
    courseLayout: cc.Node = null;

    @property(cc.Prefab)
    headerButtonPrefab: cc.Prefab = null

    @property(cc.Node)
    rightPos: cc.Node = null

    @property(cc.SpriteFrame)
    assignmentSprite: cc.SpriteFrame = null

    onCourseClick: Function
    onHomeClick: Function
    onRightClick: Function
    user: User
    private selectedHeaderButton: StartHeaderButton
    static homeSelected: boolean = true
    firstSelected: boolean = true

    onLoad() {
        const config = Config.i
        // const assignmentPresent = config.assignments != null && config.assignments.length > 0
        // this.addButton(ASSIGNMENT_COURSE_ID, assignmentPresent)
        const cpm = this.user.courseProgressMap;
        const ar = Array.from(cpm.keys());
        const mode = parseInt(Profile.getValue(CURRENTMODE))
        try {
            ar.sort((a, b) => courseSortIndex[a] - courseSortIndex[b]);
        } catch (error) {
            cc.log(error)
        }
        ar.forEach((courseId: string) => {
            if (courseId == ASSIGNMENT_COURSE_ID && !User.getCurrentUser().isConnected) {
                return;
            }
            if (courseId == ASSIGNMENT_COURSE_ID && mode === Mode.School) return;
            this.addButton(courseId, courseId == config.course.id)
        })
        this.node.width = cc.winSize.width
        const spacing = Math.max(0, (this.courseLayout.width - (this.courseLayout.childrenCount * this.courseLayout.children[0].width)) / (this.courseLayout.childrenCount + 1))
        this.courseLayout.getComponent(cc.Layout).spacingX = spacing
        this.courseLayout.getComponent(cc.Layout).paddingLeft = spacing
        this.courseLayout.getComponent(cc.Layout).paddingRight = spacing
    }

    private addButton(courseId: string, selected: boolean) {
        const config = Config.i
        const headerButton = cc.instantiate(this.headerButtonPrefab);
        const headerButtonComp = headerButton.getComponent(StartHeaderButton);
        headerButtonComp.selected.node.active = false;
        this.courseLayout.addChild(headerButton);
        // if(this.firstSelected)
        // {
        //     this.selectHeaderButton(headerButtonComp)
        //     this.firstSelected=false
        // }
        if (selected) {
            this.selectHeaderButton(headerButtonComp);
        }
        Util.load(courseId + '/course/res/icons/' + courseId + '.png', (err: Error, texture) => {
            if (!!headerButtonComp.sprite)
                headerButtonComp.sprite.spriteFrame = err ? null : new cc.SpriteFrame(texture);
        });
        const course = config.curriculum.get(courseId);
        headerButtonComp.label.string = Util.i18NText(course.name);
        headerButtonComp.button.node.on('touchend', (event: cc.Event) => {
            if (event.target.getComponent(cc.Button).enabled) {
                StartHeader.homeSelected = false;
                this.selectHeaderButton(headerButtonComp);
                config.course = course;
                config.startCourse = course
                if (this.onCourseClick)
                    this.onCourseClick(courseId);
            }
        });
        // if (!StartHeader.homeSelected && config.course && config.course.id == course.id) {
        //     this.selectHeaderButton(headerButtonComp);
        // }

        const user = User.getCurrentUser()
        const courseProgressMap = user.courseProgressMap.get(ASSIGNMENT_COURSE_ID);
        if (courseId == ASSIGNMENT_COURSE_ID && courseProgressMap.lessonPlan.length > 0) {
            headerButton.getChildByName('tick').active = true;
        }
    }

    selectHeaderButton(newButton: StartHeaderButton) {
        if (this.selectedHeaderButton != null) {
            this.selectedHeaderButton.selected.node.active = false
            this.selectedHeaderButton.button.enabled = true
            this.selectedHeaderButton.moreButton.node.active = false
        }
        newButton.selected.node.active = true
        newButton.button.enabled = false
        newButton.moreButton.node.active = true
        this.selectedHeaderButton = newButton
    }
}
