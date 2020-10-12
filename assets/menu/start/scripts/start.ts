import { RECEIVED_TEACHER_REQUEST, TEACHER_ADDED, TEACHER_ID_KEY, TEACHER_NAME_KEY } from "../../../chimple";
import Header from "../../../common/scripts/header";
import Config from "../../../common/scripts/lib/config";
import { User } from "../../../common/scripts/lib/profile";
import Loading from "../../../common/scripts/loading";
import TeacherAddedDialog, { TEACHER_ADD_DIALOG_CLOSED } from "../../../common/scripts/teacherAddedDialog";
import CourseContent from "./courseContent";
import StartContent from "./startContent";
import { Util } from "../../../common/scripts/util";

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
    profilePrefab: cc.Prefab = null

    @property(cc.Prefab)
    headerPrefab: cc.Prefab = null

    @property(cc.Node)
    loading: cc.Node = null;

    @property(cc.Prefab)
    teacherDialogPrefab: cc.Prefab = null;

    @property(cc.Node)
    bgHolder: cc.Node = null;

    onLoad() {
        this.bgHolder.removeAllChildren();
        if (!!User.getCurrentUser().currentBg) {
            this.setBackground(User.getCurrentUser().currentBg);
        } else {
            this.setBackground("forest");
        }
        const loadingComp = this.loading.getComponent(Loading)
        loadingComp.allowCancel = false
        loadingComp.delay = 0

        const config = Config.i
        User.getCurrentUser().curriculumLoaded
            ? this.initPage()
            : config.loadCourseJsons(User.getCurrentUser(), this.node, this.initPage.bind(this))
    }

    private initPage() {
        const headerNode = cc.instantiate(this.headerPrefab);
        const headerComp = headerNode.getComponent(Header);
        headerComp.onCourseClick = this.onCourseClick.bind(this);
        headerComp.onHomeClick = this.onHomeClick.bind(this);
        headerComp.onRightClick = this.onProfileClick.bind(this);
        headerComp.rightPos.addChild(cc.instantiate(this.profilePrefab));
        headerComp.user = User.getCurrentUser();
        this.header.addChild(headerNode);
        if (Header.homeSelected) {
            this.onHomeClick();
        }
        else {
            this.onCourseClick();
        }
        this.loading.active = false;
        this.registerTeacherDialogCloseEvent();
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
            const messageStr: string = cc.sys.localStorage.getItem(RECEIVED_TEACHER_REQUEST) || '[]';
            let messages: any[] = JSON.parse(messageStr);
            messages = messages.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
            if (messages && messages.length > 0) {
                const curMessage = messages.splice(0, 1)[0];
                const name: string = curMessage[TEACHER_NAME_KEY];
                const id = curMessage[TEACHER_ID_KEY];
                cc.sys.localStorage.setItem(RECEIVED_TEACHER_REQUEST, JSON.stringify(messages));

                const studentAdded = JSON.parse(cc.sys.localStorage.getItem(TEACHER_ADDED + id) || '[]');
                let users = User.getUsers() || [];
                users = users.filter(u => !studentAdded.includes(u.id))
                cc.log('remaining users', users);

                if (!!id && !!name && users && users.length > 0) {
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
        this.showTeacherDialog();
    }

    private onCourseClick() {
        this.content.removeAllChildren();
        const courseContent = cc.instantiate(this.courseContentPrefab);
        const courseContentComp = courseContent.getComponent(CourseContent);
        courseContentComp.loading = this.loading;
        courseContentComp.content = this.content;
        this.content.addChild(courseContent);
    }

    private onHomeClick() {
        this.content.removeAllChildren()
        const startContent = cc.instantiate(this.startContentPrefab)
        const startContentComp = startContent.getComponent(StartContent)
        startContentComp.loading = this.loading
        this.content.addChild(startContent)
    }

    onProfileClick() {
        Config.i.pushScene('menu/rewards/scenes/rewards', 'menu')
    }

}
