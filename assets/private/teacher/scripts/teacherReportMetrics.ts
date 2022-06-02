import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import { ParseNetwork } from "../../../common/scripts/services/ParseNetwork";
import { CHAPTER_ID, CHAPTER_NAME, SELECTED_SUBJECT, SUBJECT_ID } from "./teacherReportCard";
import { ParseApi, ProgressReport, StudentInfo, StudentLessonInfo } from "../../../common/scripts/services/parseApi";
import Config from "../../../common/scripts/lib/config";
import ChimpleLabel from "../../../common/scripts/chimple-label";
import { Chapter, Lesson } from "../../../common/scripts/lib/convert";
import { User } from "../../../common/scripts/lib/profile";

const MAX_ELEMENT_IN_ROW = 6;

@ccclass
export class TeacherReportMetrics extends cc.Component {
    @property(cc.Prefab)
    labelPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    checkPrefab: cc.Prefab = null;

    private chapterId: string;
    private subjectId: string;
    private chapterName: string;
    private studentLessonInfos: StudentLessonInfo[];
    private lessonNames: string[] = [];
    private studentNames: string[] = [];
    private tableData: cc.Node[][] = [];
    private callBackReceived: boolean = false;
    private pageView: cc.Node = null;
    private view: cc.Node = null;
    private content: cc.Node = null;
    private page: cc.Node = null;
    private studentNodes: cc.Node[] = [];

    protected onLoad() {
        Config.i.loadCourseJsons(User.getCurrentUser(), this.node, async () => {
            if (!this.callBackReceived) {
                this.callBackReceived = true;
                const subject: string = ParseNetwork.getInstance().getStringFromCache(SELECTED_SUBJECT);
                const chapterId: string = ParseNetwork.getInstance().getStringFromCache(CHAPTER_ID);
                const chapters: Chapter[] = Config.i.curriculum.get(subject).chapters;
                const lessons: Lesson[][] = chapters.filter(c => c.id === chapterId).map(ch => ch.lessons);
                lessons.forEach(
                    (l: Lesson[]) => {
                        l.forEach((l1: Lesson) => {
                            this.lessonNames.push(l1.name);
                        });
                    }
                );

                this.chapterId = ParseNetwork.getInstance().getStringFromCache(CHAPTER_ID);
                this.subjectId = ParseNetwork.getInstance().getStringFromCache(SUBJECT_ID);
                this.chapterName = ParseNetwork.getInstance().getStringFromCache(CHAPTER_NAME);
                cc.log('this.lessonNames', this.lessonNames);
                await this.fetchLessonProgressData();
                this.pageView = this.node.getChildByName('pageView');
                if (this.pageView) {
                    this.view = this.pageView.getChildByName('view');
                    this.content = this.view.getChildByName('content');
                    this.page = this.content.getChildByName('page');
                }
                await this.renderUI();
            }
        });
    }

    private async fetchLessonProgressData() {
        const studentInfos: StudentInfo[] = await ParseApi.getInstance().getStudentsForTeacher();
        let studentIds = studentInfos.map(info => info.objectId);

        const query: ProgressReport = {
            chapterId   : this.chapterId,
            subjectId   : this.subjectId,
            studentInfos: studentIds

        };

        this.studentLessonInfos = await ParseApi.getInstance().getProgressForChapter(query);
        this.studentNames = this.studentLessonInfos.map(s => s.studentName);
        cc.log('this.studentLessonInfos', this.studentLessonInfos);
    }

    private async renderUI() {
        if (this.labelPrefab) {
            await this.addHeader();
            await this.addRows();
            cc.log('tableData', this.tableData);
            this.content.height += 100;
            this.tableData.forEach(
                t => {
                    t.forEach(
                        e => {
                            this.page.addChild(e);
                            if (this.studentNodes.includes(e)) {
                                cc.log(e.width, e.height);
                                this.content.width += e.width;
                                this.content.height += e.height + 50;
                            }
                        }
                    );
                }
            );
            const layout = this.page.getComponent(cc.Layout);
            layout.updateLayout();
            this.page.width = this.content.width;
            this.pageView.width = this.content.width;
            this.page.height = this.content.height;
            this.pageView.height = this.content.height;
            cc.log('111', this.content.width, this.content.height);
        }
    }

    private async addHeader() {
        const lessonsToRender: string[] = [''].concat(this.lessonNames);
        const header: cc.Node[] = [];
        lessonsToRender.forEach(
            l => {
                if (this.labelPrefab) {
                    const label: cc.Node = this.createLabel(l);
                    header.push(label);
                }
            }
        );
        this.tableData.push(header);
    }

    async addRows() {
        new Set(this.studentNames).forEach(
            s => {
                const rows: cc.Node[] = [];
                if (this.labelPrefab) {
                    const label: cc.Node = this.createLabel(s);
                    rows.push(label);
                    this.studentNodes.push(label);
                }
                this.lessonNames.forEach(
                    l => {
                        const lessonInfos: StudentLessonInfo[] = this.studentLessonInfos.filter(sl => sl.studentName === s
                            && sl.lesson === l);
                        if (lessonInfos.length === 0) {
                            const check: cc.Node = cc.instantiate(this.checkPrefab);
                            check.opacity = 10;
                            rows.push(check);
                        }
                        lessonInfos.forEach(
                            li => {
                                const check: cc.Node = cc.instantiate(this.checkPrefab);
                                rows.push(check);
                            }
                        );
                    }
                );

                this.tableData.push(rows);
            }
        );
    }

    private createLabel(l: string) {
        const label: cc.Node = cc.instantiate(this.labelPrefab);
        const chimpleLabel = label.getComponent(ChimpleLabel);
        chimpleLabel.string = l;
        return label;
    }
}