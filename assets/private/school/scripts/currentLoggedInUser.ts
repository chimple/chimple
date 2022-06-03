import Config from "../../../common/scripts/lib/config";
import { Section, Student, REMEMBERED_USER } from "../../../common/scripts/lib/constants";
import { ParseImageDownloader } from "../../../common/scripts/services/ParseImageDownloader";
import UtilLogger from "../../../common/scripts/util-logger";
import { ItemButton } from "./itemButton";
import { Util } from "../../../common/scripts/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CurrentLoggedInUser extends cc.Component {
    @property(cc.Prefab)
    StudentItemPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    loadingPrefab: cc.Prefab = null;

    @property(cc.Node)
    sectionlayout: cc.Node = null

    @property(cc.Label)
    title: cc.Label = null

    static title: string;
    static schoolFirebaseId: string;
    static section: Section;
    private loading: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:
    // StudentList.title = this.section.name
    // StudentList.schoolFirebaseId = this.schoolFirebaseId
    // StudentList.section = this.section
    onLoad() {
        this.createLoading()
        this.showStudent()
    }

    showStudent() {
        this.showLoading()
        this.sectionlayout.removeAllChildren()
        // this.title.string = CurrentLoggedInUser.title
        let student: Student = null;
        // GET ITEM FROM SHARED PREFERENCES;
        const currentLoggedInUser: string = cc.sys.localStorage.getItem(REMEMBERED_USER)
        const studentJson: string = UtilLogger.fetchStudentById(currentLoggedInUser)
        if (!!studentJson) {
            student = JSON.parse(studentJson) || null
        }
        if (student != null)
            this.loadUi(student)
    }

    private createLoading() {
        this.loading = cc.instantiate(this.loadingPrefab);
        this.loading.zIndex = 3;
        this.node.addChild(this.loading);
        this.loading.active = false;
    }

    private showLoading() {
        this.loading.active = true;
    }

    private hideLoading() {
        this.loading.active = false;
    }

    loadUi(currentLoggedInUser: any) {
        this.hideLoading()
        // for (const data of currentLoggedInUser) {
        const studentInfo: Student = currentLoggedInUser
        const sectionButton = cc.instantiate(this.StudentItemPrefab)
        sectionButton.x = 0;
        sectionButton.y = 0
        // sectionButton.getChildByName('photo').getComponentInChildren(cc.Label).string = studentInfo.name;
        const labelComponent = sectionButton.getChildByName('photo').getComponentInChildren(cc.Label);
        labelComponent.string = studentInfo.name;
        const sectionButtonItem = sectionButton.getComponent(ItemButton)
        if (studentInfo.image != null) {
            Util.loadImage(sectionButton, studentInfo.image, studentInfo.firebaseId)
        }
        sectionButtonItem.studentData = studentInfo
        this.sectionlayout.addChild(sectionButton)
    }

    onBackButtonClicked() {
        // loggout user first
        // UtilLogger.logout();
        Config.i.pushScene('private/school/scenes/schoolRegistration', 'private', null);
    }


    // update (dt) {}
}
