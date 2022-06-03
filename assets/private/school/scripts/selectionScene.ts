import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import {ParseApi, SelectionMode} from "../../../common/scripts/services/parseApi";
import {ParseConnection} from "../../../common/scripts/domain/parseConnection";
import {ParseSchool, ParseSubjectByTeacher} from "../../../common/scripts/domain/parseSchool";
import {ParseSection} from "../../../common/scripts/domain/parseSection";
import catchError from "../../../common/scripts/lib/error-handler";
import ChimpleLabel from "../../../common/scripts/chimple-label";
import {ParseImageDownloader} from "../../../common/scripts/services/ParseImageDownloader";
import {ParseSchoolStudent, ParseStudent} from "../../../common/scripts/domain/parseStudent";
import {ItemButton, ItemData, PARSE_ITEM_SELECTED_EVENT} from "./itemButton";
import Config from "../../../common/scripts/lib/config";
import {HOME_SCENE, START_SCENE} from "../../../chimple";
import {Util} from "../../../common/scripts/util";
import {ParseClass} from "../../../common/scripts/domain/parseClass";
import {ParseNetwork} from "../../../common/scripts/services/ParseNetwork";
import {SELECT_SECTIONS_SCENE, TEACHER_HOME} from "./landing";
import {CURRENT_SCHOOL_ID, CURRENT_SECTION_ID, CURRENT_STUDENT_ID} from "../../../common/scripts/lib/constants";
import {LOGIN_TYPE, LoginType} from "../../../common/scripts/domain/parseConstants";
import {User} from "../../../common/scripts/lib/profile";
import {AddSectionButton} from "./addSectionButton";
import {ParseUser} from "../../../common/scripts/domain/parseUser";

interface SectionPhotoInfo {
    photoNode: cc.Node;
    photoUrl: string;
}

interface PhotoInfo {
    item: cc.Node;
    photoChildName: string;
    labelChildName?: string;
    photoUrl: string;
    label?: string;
    scale?: number;
}

const PHOTO = 'photo';
const NAME = 'name';

export type ParseSelectType = ParseSection | ParseStudent;
export type ParseItemSelectType = ParseSelectType | ParseSubjectByTeacher;
export let nextSelectMode: SelectionMode = SelectionMode.Section;

@ccclass
export class SelectionScene extends cc.Component {
    @property(cc.Prefab)
    sectionItemPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    sectionStackedItemPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    loadingPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    addSectionButtonPrefab: cc.Prefab = null;


    private _sectionData: ParseItemSelectType[] = [];
    private school: ParseSchool = null;
    private photoInfos: SectionPhotoInfo[] = [];

    private loading: cc.Node = null;
    private viewPort: cc.Node = null;
    private content: cc.Node = null;
    private schoolLabel: cc.Node = null;
    private displayLabel: cc.Node = null;
    private backButton: cc.Node = null;
    private addSectionButton: cc.Node = null;
    private loginType: LoginType = null;
    private isLoading: boolean = false;

    constructor() {
        super();
    }

    protected async onLoad() {
        this.initUI();
        await this.determineSelectionScene();
        await this.renderUI();
        this.isLoading = true;
        if (this.loginType === LoginType.Teacher) {
            this.addSectionButton = cc.instantiate(this.addSectionButtonPrefab);
            const addSectionButtonComponent = this.addSectionButton.getComponent(AddSectionButton);
            addSectionButtonComponent.parent = this.node;
            this.addSectionButton.active = true;
            this.addSectionButton.setPosition(cc.v2(cc.winSize.width / 4, 0));
            this.node.addChild(this.addSectionButton);
        }
    }


    private async determineSelectionScene() {
        this.showLoading();
        await this.loadSelectedSchool();
        if (!ParseNetwork.getInstance().isEmpty(this.school)) {
            switch (nextSelectMode) {
                case SelectionMode.Section:
                    await this.loadSectionsForSchool();
                    this.hideLoading();
                    break;
                case SelectionMode.TeacherHome:
                    if (this.loginType === LoginType.Teacher) {
                        this.hideLoading();
                        Config.i.pushScene(TEACHER_HOME, 'private', null, true);
                    }
                    break;
                case SelectionMode.Student:
                    const sectionId: string = ParseNetwork.getInstance().getStringFromCache(CURRENT_SECTION_ID);
                    await this.loadStudentForSection(this.school.objectId, sectionId);
                    this.hideLoading();
                    this.showBackButton();
                    break;
                case SelectionMode.Subject:
                    await this.loadSubjectAndTeacherForSchool(this.school.objectId);
                    if (this._sectionData && this._sectionData.length > 0) {
                        this.hideLoading();
                        this.showBackButton();
                    } else {
                        Config.i.pushScene(HOME_SCENE, 'menu', null, true);
                    }
                    break;
                default:
                    break;
            }
        }
    }

    private async loadSelectedSchool() {
        const loginType: number = Number(ParseNetwork.getInstance().getStringFromCache(LOGIN_TYPE));
        switch (loginType) {
            case LoginType.School:
                this.loginType = LoginType.School;
                const connections: ParseConnection[] = await ParseApi.getInstance().connections();
                await ParseApi.getInstance().asyncForEach(connections, async (connection) => {
                    this.school = connection.school;
                    cc.log('got school', this.school.name + " " + this.school.objectId);
                    ParseNetwork.getInstance().storeIntoCache(CURRENT_SCHOOL_ID, this.school.objectId);
                });
                break;
            case LoginType.Teacher:
                this.loginType = LoginType.Teacher;
                this.school = await ParseApi.getInstance().schoolForTeacher();
                cc.log('got school', this.school.name + " " + this.school.objectId);
                ParseNetwork.getInstance().storeIntoCache(CURRENT_SCHOOL_ID, this.school.objectId);
                break;
        }
    }

    private async loadSectionsForSchool(): Promise<void> {
        this._sectionData = await ParseApi.getInstance().getSectionsForSchool(this.school.objectId);
    }

    private async loadSubjectAndTeacherForSchool(schoolId: string) {
        const classes: ParseClass[] = await ParseApi.getInstance().selectedClasses(schoolId);
        this._sectionData = classes.map(c => {
            return {
                subject: ParseApi.getInstance().getSubjectByClass(c.objectId),
                teacher: ParseApi.getInstance().getTeacherByClass(c.objectId),
                classId: c.objectId
            };
        });
    }

    private async loadStudentForSection(schoolId: string, sectionId: string): Promise<void> {
        const loginType: number = Number(ParseNetwork.getInstance().getStringFromCache(LOGIN_TYPE));
        switch (loginType) {
            case LoginType.School:
                this._sectionData = await ParseApi.getInstance().getStudentsForSection(this.school.objectId, sectionId);
                await ParseApi.getInstance().getActiveClassesForSchoolAndSection(this.school.objectId, sectionId);
                break;
            case LoginType.Teacher:
                this._sectionData = await ParseApi.getInstance().getStudentsForSection(this.school.objectId, sectionId);
                break;
        }
    }

    private async renderUI() {
        await this.registerItemSelectedEvent();
        await this.renderScrollContents();
        await this.renderSchoolLabel();
        this.loadImages();
    }

    private async renderSchoolLabel() {
        let label: string = '';
        let displayLabel: string = '';
        let sections: ParseSection[] = [];
        switch (nextSelectMode) {
            case SelectionMode.Section:
                switch (this.loginType) {
                    case LoginType.School:
                        displayLabel = Util.i18NText('Choose Your Section');
                        label = this.school.name;
                        break;
                    case LoginType.Teacher:
                        displayLabel = Util.i18NText('Choose Your Class');
                        const loggedInUser: ParseUser = ParseApi.getInstance().getLoggedInUser();
                        label = loggedInUser ? loggedInUser.fullName : ''
                        break;
                }
                break;
            case SelectionMode.Student:
                sections = await ParseApi.getInstance().selectedSection(this.school.objectId);
                label = sections && sections.length > 0 ? sections[0].name : '';
                displayLabel = Util.i18NText('Choose Student');
                break;

            case SelectionMode.Subject:
                sections = await ParseApi.getInstance().selectedSection(this.school.objectId);
                label = sections && sections.length > 0 ? sections[0].name : '';
                displayLabel = Util.i18NText('Choose Subject');
                break;
        }
        const chimpleLabelComponent: ChimpleLabel = this.schoolLabel.getComponent(ChimpleLabel);
        if (!!this.school) {
            chimpleLabelComponent.string = label;
        }

        const chimpleDisplayLabelComponent: ChimpleLabel = this.displayLabel.getComponent(ChimpleLabel);
        chimpleDisplayLabelComponent.string = displayLabel;
    }

    private initUI() {
        this.backButton = this.node.getChildByName('backButton');
        this.viewPort = this.node.getChildByName('viewport');
        this.content = this.viewPort.getChildByName('content');
        this.schoolLabel = this.node.getChildByName('schoolLabel');
        this.displayLabel = this.node.getChildByName('displayLabel');
        this.createLoading();
    }

    @catchError()
    private renderScrollContents() {
        this.photoInfos = [];
        this._sectionData.forEach(
            (s: ParseItemSelectType) => {
                const sectionNode: cc.Node = this.createFrame(s);
                this.content.addChild(sectionNode);
                this.content.height += sectionNode.height;
            }
        );
    }

    private createLoading() {
        this.loading = cc.instantiate(this.loadingPrefab);
        this.loading.zIndex = 3;
        this.node.addChild(this.loading);
        this.loading.active = false;
    }

    private showLoading() {
        this.loading.active = true;
        this.viewPort.active = false;
        this.schoolLabel.active = false;
        this.displayLabel.active = false;
        this.backButton.active = false;
    }

    private hideLoading() {
        this.loading.active = false;
        this.viewPort.active = true;
        this.schoolLabel.active = true;
        this.displayLabel.active = true;
    }

    private showBackButton() {
        this.backButton.active = true;
    }

    private async registerItemSelectedEvent() {
        this.node.on(PARSE_ITEM_SELECTED_EVENT, async (event) => {
            event.stopPropagation();
            const selectedItem: ItemData = event.getUserData() as ItemData;
            switch (selectedItem.type) {
                case SelectionMode.Section:
                    nextSelectMode = this.loginType === LoginType.School ? SelectionMode.Student :
                        SelectionMode.TeacherHome;
                    const selectedSection: ParseSection = selectedItem.data as ParseSection;
                    ParseNetwork.getInstance().storeIntoCache(CURRENT_SECTION_ID, selectedSection.objectId);
                    if (this.loginType === LoginType.Teacher) {
                        Config.i.pushScene(TEACHER_HOME, 'private', null);
                    } else {
                        Config.i.pushScene(SELECT_SECTIONS_SCENE, 'private', null);
                    }
                    break;
                case SelectionMode.Student:
                    nextSelectMode = SelectionMode.Subject;
                    const selectedStudent: ParseStudent = selectedItem.data as ParseStudent;
                    ParseNetwork.getInstance().storeIntoCache(CURRENT_STUDENT_ID, selectedStudent.objectId);
                    Config.loadScene(SELECT_SECTIONS_SCENE, 'private', null);
                    break;
                case SelectionMode.Subject:
                    nextSelectMode = SelectionMode.Home;
                    const pst: ParseSubjectByTeacher = selectedItem.data as ParseSubjectByTeacher;
                    const currentStudentId = ParseNetwork.getInstance().getStringFromCache(CURRENT_STUDENT_ID);
                    let students: ParseStudent[] = await ParseApi.getInstance().getStudentsForSection(this.school.objectId, ParseNetwork.getInstance().getStringFromCache(CURRENT_SECTION_ID))
                    students = students.filter((s: ParseStudent) => s.objectId === currentStudentId)

                    if (students && students.length > 0) {
                        const student: ParseStudent = students[0];
                        await ParseApi.getInstance().buildAndLoginUser(student);
                        await ParseApi.getInstance().findOrCreateMonitor(this.school.objectId, student.objectId, pst.classId, pst.subject.name, pst.subject.objectId);

                        Config.i.loadCourseJsons(User.getCurrentUser(), this.node, () => {
                            Config.loadScene(START_SCENE, 'menu', null);
                        });
                    }
                    break;
            }
        });
    }

    private isParseSectionOrStudent(item: ParseSelectType | ParseSubjectByTeacher): item is ParseSelectType {
        return (item as ParseSelectType).name !== undefined;
    }

    private createFrame(s: ParseItemSelectType): cc.Node {
        let item: cc.Node = null;
        if (this.isParseSectionOrStudent(s)) {
            item = cc.instantiate(this.sectionItemPrefab);
            this.renderPhoto({
                item,
                photoChildName: PHOTO,
                photoUrl: s && s.image && s.image.url ? s.image.url : null,
                labelChildName: NAME,
                label: s.name
            });

        } else {
            item = cc.instantiate(this.sectionStackedItemPrefab);
            let subjectPhoto: cc.Node = item.getChildByName(PHOTO);

            this.renderPhoto({
                item,
                photoChildName: PHOTO,
                photoUrl: s && s.subject && s.subject.image && s.subject.image.url ? s.subject.image.url : null,
                labelChildName: NAME,
                label: s.subject.name
            });

            this.renderPhoto({
                item: subjectPhoto,
                photoChildName: PHOTO,
                photoUrl: s && s.teacher && s.teacher.image && s.teacher.image.url ? s.teacher.image.url : null,
                scale: 0.5
            });

        }
        const itemButtonComponent: ItemButton = item.getComponent(ItemButton);
        itemButtonComponent.item = s;
        itemButtonComponent.type = nextSelectMode;
        return item;
    }

    private renderPhoto(photoInfo: PhotoInfo) {
        try {
            const photo: cc.Node = photoInfo.item.getChildByName(photoInfo.photoChildName);
            photo.scale = !!photoInfo.scale ? photoInfo.scale : 1;
            if (photoInfo.labelChildName != null) {
                const name: cc.Node = photo.getChildByName(photoInfo.labelChildName);
                const nameLabel: ChimpleLabel = name.getComponent(ChimpleLabel);
                nameLabel.string = photoInfo.label;
            }
            if (!!photoInfo.photoUrl && photoInfo.photoUrl.length > 0) {
                this.photoInfos.push({
                    photoNode: photo,
                    photoUrl: photoInfo.photoUrl
                });
            }
        } catch (e) {
            cc.log(e);
        }
    }

    private loadImages() {
        this.photoInfos.forEach(
            (p: SectionPhotoInfo) => {
                cc.log('section image', p.photoUrl);
                ParseImageDownloader.loadImage(p.photoUrl, (texture) => {
                    if (!!texture && p.photoNode) {
                        let spriteFrame: cc.SpriteFrame = new cc.SpriteFrame(texture);
                        const maskNode: cc.Node = p.photoNode.getChildByName('mask');
                        if (maskNode) {
                            const image: cc.Node = maskNode.getChildByName('image');
                            image.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        }
                    }
                });
            }
        );

    }

    updateSectionData(d: ParseItemSelectType[]) {
        this._sectionData = d;
        this.content.removeAllChildren();
        this.renderScrollContents();
        const layout: cc.Layout = this.content.getComponent(cc.Layout);
        layout.updateLayout();
    }
}