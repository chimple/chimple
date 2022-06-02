import ccclass = cc._decorator.ccclass;
import { ParseItemSelectType } from "./selectionScene";
import { SelectionMode } from "../../../common/scripts/services/parseApi";
import Config from "../../../common/scripts/lib/config";
import StudentList from "./studentList";
import {
    FIREBASE_SCHOOL_ID,
    FIREBASE_SECTION_ID,
    FIREBASE_STUDENT_ID,
    Mode,
    Section,
    Student,
    IS_REMEMBER_TOGGLE_ON,
    REMEMBERED_USER
} from "../../../common/scripts/lib/constants";
import Profile, { CURRENTMODE, Gender, User } from "../../../common/scripts/lib/profile";
import UtilLogger from "../../../common/scripts/util-logger";
import { Util } from "../../../common/scripts/util";

let clickEnabled: boolean = true;

export const PARSE_ITEM_SELECTED_EVENT = 'parseItemSelectedEvent';

export interface ItemData {
    data: ParseItemSelectType;
    type: SelectionMode;
}

@ccclass
export class ItemButton extends cc.Component {

    private _item: ParseItemSelectType = null;
    private _type: SelectionMode;
    studentData: Student;
    section: Section;
    schoolFirebaseId: string;

    constructor() {
        super();
    }

    protected onLoad() {
        clickEnabled = true;
    }

    async onItemClicked() {
        StudentList.title = this.section.name
        StudentList.schoolFirebaseId = this.schoolFirebaseId
        StudentList.section = this.section
        // @ts-ignore
        Config.loadScene('private/school/scenes/studentList', 'private', null);
    }

    async initializeStudent(student: Student) {
        Profile.setItem(CURRENTMODE, Mode.School);
        const profileExists = !!student.profileInfo;
        let user: User = null;
        if (!profileExists) {
            cc.log("Student Profile doesn't exists");
            const studentGender: Gender = student.gender === 'male' ? Gender.BOY : student.gender === 'female' ? Gender.GIRL : Gender.UNKNOWN;
            user = User.createUser(student.name, student.image, student.age, studentGender, null, null);
            user.schoolId = student.schoolId
            user.sectionId = student.sectionId;
            user.studentId = student.firebaseId;
            cc.log("creating new user:" + user);
        } else {
            cc.log("Student Profile exists:" + student.profileInfo);
            user = User.fromJson(student.profileInfo);
            user.schoolId = student.schoolId;
            user.sectionId = student.sectionId;
            user.studentId = student.firebaseId;
            user.imgPath = student.image;
            cc.log("getting user from profile json:" + user);
        }
        // UtilLogger.subscribeToTopic(`assignment-${user.schoolId}-${user.sectionId}`)
        User.setCurrentUser(user);
        User.syncProfile();
        Util.preloadStartScene(this.node, cc.director.getScene().getChildByName('Canvas').getChildByName('loading'))
    }

    async onStudentButtonClicked() {
        if (Profile.getValue(IS_REMEMBER_TOGGLE_ON) === "true") {
            cc.sys.localStorage.setItem(REMEMBERED_USER, this.studentData.firebaseId)
        }
        cc.sys.localStorage.setItem(FIREBASE_SCHOOL_ID, this.studentData.schoolId)
        cc.sys.localStorage.setItem(FIREBASE_SECTION_ID, this.studentData.sectionId)
        cc.sys.localStorage.setItem(FIREBASE_STUDENT_ID, this.studentData.firebaseId)
        await this.initializeStudent(this.studentData);
    }

    private itemSelectedEvent(): void {
        const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(PARSE_ITEM_SELECTED_EVENT, true);
        const selectedData: ItemData = {
            data: this._item,
            type: this._type
        };
        customEvent.setUserData(selectedData);
        this.node.dispatchEvent(customEvent);
    }

    set item(newVal: ParseItemSelectType) {
        this._item = newVal;
    }

    set type(newVal: SelectionMode) {
        this._type = newVal;
    }
}
