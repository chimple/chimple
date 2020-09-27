import { ADD_TEACHER, TEACHER_ID_KEY, TEACHER_NAME_KEY } from "../../../chimple";
import Config from "../../../common/scripts/lib/config";
import { Course } from "../../../common/scripts/lib/convert";
import { User } from "../../../common/scripts/lib/profile";
import Loading from "../../../common/scripts/loading";
import TeacherAddedDialog, { TEACHER_ADD_DIALOG_CLOSED } from "../../../common/scripts/teacherAddedDialog";
import { Util } from "../../../common/scripts/util";
import CourseContent from "./courseContent";
import HeaderButton from "./headerButton";
import StartContent from "./startContent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Start extends cc.Component {
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

    @property(cc.Prefab)
    teacherDialogPrefab: cc.Prefab = null;

    @property(cc.Node)
    bgHolder: cc.Node = null;

    selectedHeaderButton: HeaderButton
    static homeSelected: boolean = true

    onLoad() {
        this.bgHolder.removeAllChildren();
        if (!!User.getCurrentUser().currentBg) {
            this.setBackground(User.getCurrentUser().currentBg);
        } else {
            this.setBackground("forest");
        }

        this.loading.getComponent(Loading).allowCancel = false
        const config = Config.i
        let index = 0

        User.getCurrentUser().courseProgressMap.forEach(() => {
            const headerButton = cc.instantiate(this.headerButtonPrefab)
            const headerButtonComp = headerButton.getComponent(HeaderButton)
            headerButtonComp.label.string = ''
            headerButtonComp.sprite.spriteFrame = null
            headerButtonComp.selected.node.active = false
            this.header.insertChild(headerButton, ++index)
        })
        this.selectedHeaderButton = this.homeButton.getComponent(HeaderButton)
        this.selectedHeaderButton.button.node.on('click', () => {
            this.onHomeClick()
        })
        this.selectedHeaderButton.label.string = Util.i18NText('Home')
        this.header.width = cc.winSize.width
        this.header.getComponent(cc.Layout).spacingX = Math.max(0, cc.winSize.width / (index + 2) - this.homeButton.width)
        index = 0
        config.loadCourseJsons(this.node, () => {
            config.curriculum.forEach((course: Course, name: string) => {
                const headerButton = this.header.children[++index]
                const headerButtonComp = headerButton.getComponent(HeaderButton)
                headerButtonComp.label.string = name
                Util.load(name + '/course/res/icons/' + name + '.png', (err: Error, texture) => {
                    if (!err) {
                        headerButtonComp.sprite.spriteFrame = new cc.SpriteFrame(texture);
                    } else {
                        this.loading.getComponent(Loading).addMessage(err.message, false)
                    }
                })
                headerButtonComp.button.node.on('click', () => {
                    this.selectHeaderButton(headerButtonComp);
                    config.course = course;
                    this.content.removeAllChildren();
                    this.onCourseClick();
                })
                if (!Start.homeSelected && config.course && config.course.id == course.id) {
                    this.selectHeaderButton(headerButtonComp);
                }
            })
            if (Start.homeSelected) {
                this.onHomeClick()
            } else {
                this.onCourseClick()
            }
            this.loading.active = false;
        })
    }

    protected start() {
        this.setUpTeacherDialog();
    }

    private registerTeacherDialogCloseEvent() {
        this.node.on(TEACHER_ADD_DIALOG_CLOSED, async (event) => {
            event.stopPropagation();
            this.scheduleOnce(() => {
                this.showTeacherDialog();
            }, 1)
        });
    }

    private setBackground(bgprefabName: string) {
        cc.resources.load(`backgrounds/prefabs/${bgprefabName}`, (err, sp) => {
            let bgPrefabInstance = cc.instantiate(sp);
            // @ts-ignore
            bgPrefabInstance.y = 0
            // @ts-ignore
            bgPrefabInstance.x = 0
            // @ts-ignore
            this.bgHolder.addChild(bgPrefabInstance);
            // userButtonRef.getChildByName("Background").getChildByName("avatar").getChildByName("icon").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
        });
    }


    private showTeacherDialog() {
        try {
            const messageStr: string = cc.sys.localStorage.getItem(ADD_TEACHER) || '[]';
            const messages: any[] = JSON.parse(messageStr);
            if (messages && messages.length > 0) {
                const curMessage = messages.splice(0, 1)[0];
                const name: string = curMessage[TEACHER_NAME_KEY];
                const id = curMessage[TEACHER_ID_KEY];
                cc.sys.localStorage.setItem(ADD_TEACHER, JSON.stringify(messages));
                if (!!id && !!name) {
                    const teacherDialog: cc.Node = cc.instantiate(this.teacherDialogPrefab);
                    const script: TeacherAddedDialog = teacherDialog.getComponent(TeacherAddedDialog);
                    script.TeacherName = name;
                    script.TeacherId = id;
                    this.node.addChild(teacherDialog);
                }
            }
        } catch (e) {

        }
    }

    private setUpTeacherDialog() {
        this.registerTeacherDialogCloseEvent();
        this.showTeacherDialog();
    }

    private onCourseClick() {
        Start.homeSelected = false
        const courseContent = cc.instantiate(this.courseContentPrefab);
        const courseContentComp = courseContent.getComponent(CourseContent);
        courseContentComp.loading = this.loading;
        courseContentComp.content = this.content;
        this.content.addChild(courseContent);
    }

    onHomeClick() {
        Start.homeSelected = true
        const config = Config.i
        config.course = null
        config.chapter = null
        config.lesson = null
        this.selectHeaderButton(this.homeButton.getComponent(HeaderButton))
        this.content.removeAllChildren()
        const startContent = cc.instantiate(this.startContentPrefab)
        const startContentComp = startContent.getComponent(StartContent)
        startContentComp.loading = this.loading
        this.content.addChild(startContent)
    }

    onProfileClick() {
        Config.i.pushScene('menu/rewards/scenes/rewards', 'menu')
    }

    selectHeaderButton(newButton: HeaderButton) {
        if (this.selectedHeaderButton != null) this.selectedHeaderButton.selected.node.active = false
        newButton.selected.node.active = true
        this.selectedHeaderButton = newButton
    }
}
