import Config from "../../../common/scripts/lib/config";
import {Section, Student} from "../../../common/scripts/lib/constants";
import {ParseImageDownloader} from "../../../common/scripts/services/ParseImageDownloader";
import UtilLogger from "../../../common/scripts/util-logger";
import {ItemButton} from "./itemButton";
import {Util} from "../../../common/scripts/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StudentList extends cc.Component {
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

    onLoad() {
        this.createLoading()
        this.showStudents()
    }

    showStudents() {
        this.showLoading()
        this.sectionlayout.removeAllChildren()
        this.title.string = StudentList.title
        let students: Student[] = [];
        const studentJson: string = UtilLogger.fetchStudents(StudentList.schoolFirebaseId, StudentList.section.firebaseId)
        if (!!studentJson) {
            students = JSON.parse(studentJson) || []
        }
        students.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0))
        this.loadUi(students)
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

    loadUi(studentList: any) {
        this.hideLoading()
        for (const data of studentList) {
            const studentInfo: Student = data
            const sectionButton = cc.instantiate(this.StudentItemPrefab)
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
        this.sectionlayout.width = cc.winSize.width
        this.sectionlayout.parent.width = cc.winSize.width
        this.sectionlayout.parent.parent.width = cc.winSize.width
        this.sectionlayout.getComponent(cc.Layout).updateLayout()
        this.sectionlayout.parent.height = this.sectionlayout.height
    }

    onBackButtonClicked() {
        Config.loadScene('private/school/scenes/sectionList', 'private', null);
    }


    // update (dt) {}
}
