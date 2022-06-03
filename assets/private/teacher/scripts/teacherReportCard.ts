import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import { ParseApi } from "../../../common/scripts/services/parseApi";
import { ParseSubject } from "../../../common/scripts/domain/parseSubject";
import { ParseImageDownloader } from "../../../common/scripts/services/ParseImageDownloader";
import ChimpleLabel from "../../../common/scripts/chimple-label";
import { SUBJECT_ITEM_SELECTED_EVENT, SubjectButton, SubjectData } from "./subjectButton";
import Config from "../../../common/scripts/lib/config";
import { CHAPTER_ITEM_SELECTED_EVENT, ChapterButton, ChapterData } from "./chapterButton";
import { ParseNetwork } from "../../../common/scripts/services/ParseNetwork";
import { Chapter } from "../../../common/scripts/lib/convert";
import {TEACHER_REPORT_METRICS_SCENE} from "../../school/scripts/landing";
import { User } from "../../../common/scripts/lib/profile";

export const CHAPTER_ID = 'chapterId';
export const SUBJECT_ID = 'subjectId';
export const CHAPTER_NAME = 'chapterName';
export const SELECTED_SUBJECT = 'selectedSubject';

interface PhotoInfo {
    item: cc.Node;
    photoChildName: string;
    labelChildName?: string;
    photoUrl: string;
    label?: string;
    scale?: number;
}

interface SubjectPhotoInfo {
    photoNode: cc.Node;
    photoUrl: string;
}

@ccclass
export class TeacherReportCard extends cc.Component {
    @property(cc.Prefab)
    subjectItemPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    chapterPrefab: cc.Prefab = null;

    private subjects: ParseSubject[];
    private photoInfos: SubjectPhotoInfo[] = [];

    private body: cc.Node = null;
    private view: cc.Node = null;
    private content: cc.Node = null;
    private bodyLayout: cc.Node = null;

    protected async onLoad() {
        Config.i.loadCourseJsons(User.getCurrentUser(), this.node, async () => {
            await this.renderUI();
            await this.registerSubjectSelectedEvent();
            await this.registerChapterSelectedEvent();
        });
    }

    async renderUI() {
        this.body = this.node.getChildByName('body');
        this.view = this.body.getChildByName('view');
        this.content = this.view.getChildByName('content');
        this.bodyLayout = this.content.getChildByName('bodyLayout');

        await this.renderSubjects();
        this.loadImages();
    }

    private async registerSubjectSelectedEvent() {
        this.node.on(SUBJECT_ITEM_SELECTED_EVENT, async (event) => {
            event.stopPropagation();
            this.bodyLayout.removeAllChildren(true);
            const selectedItem: SubjectData = event.getUserData() as SubjectData;
            // cc.log(selectedItem.subject, selectedItem.id);
            // cc.log('courses', Config.i.courses);
            const selectedCourse = Config.i.curriculum.get(selectedItem.subject);
            if (selectedCourse && Array.isArray(selectedCourse.chapters) && selectedCourse.chapters.length > 0) {
                const chapters = selectedCourse.chapters;
                this.renderChapters(selectedItem, chapters);
            }
        });
    }

    private async registerChapterSelectedEvent() {
        this.node.on(CHAPTER_ITEM_SELECTED_EVENT, async (event) => {
            event.stopPropagation();
            const selectedItem: ChapterData = event.getUserData() as ChapterData;
            ParseNetwork.getInstance().storeIntoCache(CHAPTER_ID, selectedItem.chapterId);
            ParseNetwork.getInstance().storeIntoCache(SUBJECT_ID, selectedItem.subjectId);
            ParseNetwork.getInstance().storeIntoCache(CHAPTER_NAME, selectedItem.chapterName);
            ParseNetwork.getInstance().storeIntoCache(SELECTED_SUBJECT, selectedItem.subject);
            Config.loadScene(TEACHER_REPORT_METRICS_SCENE, 'private', null);
        });
    }

    async renderSubjects() {
        this.subjects = await ParseApi.getInstance().allSubjects();
        this.subjects.forEach(
            s => {
                this.renderSubject(s);
            }
        );
    }

    renderChapters(data: SubjectData, chapters: Chapter[]) {
        chapters.forEach(
            ch => {
                const chapter: cc.Node = cc.instantiate(this.chapterPrefab);
                const cb: ChapterButton = chapter.getComponent(ChapterButton);
                cb.subjectId = data.id;
                cb.subject = data.subject;
                cb.chapterId = ch.id;
                cb.chapterName = ch.name;
                const label: cc.Node = chapter.getChildByName("label");
                const chimpleLabelComponent = label.getComponent(ChimpleLabel);
                chimpleLabelComponent.string = ch.name;
                this.bodyLayout.addChild(chapter);
                this.content.height += chapter.height;
            }
        );

        const layout = this.bodyLayout.getComponent(cc.Layout);
        layout.updateLayout();

        this.view.height = this.content.height;
        this.body.height = this.content.height;
        SubjectButton.clickedEnabled(true);
    }

    renderSubject(s: ParseSubject) {
        const parent: cc.Node = this.node.getChildByName('subjects');
        const item: cc.Node = cc.instantiate(this.subjectItemPrefab);
        const subjectButton: SubjectButton = item.getComponent(SubjectButton);
        subjectButton.id = s.objectId;
        subjectButton.subject = s.courseCode;
        this.renderPhoto({
            item,
            photoChildName: 'photo',
            photoUrl      : s.image.url,
            labelChildName: 'name',
            label         : s.name
        });
        parent.addChild(item);
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
            if (photoInfo.photoUrl) {
                this.photoInfos.push({
                    photoNode: photo,
                    photoUrl : photoInfo.photoUrl
                });
            }
        } catch (e) {
            cc.log(e);
        }
    }

    private loadImages() {
        this.photoInfos.forEach(
            (p: SubjectPhotoInfo) => {
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
}
