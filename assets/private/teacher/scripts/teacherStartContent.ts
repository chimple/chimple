import Config from "../../../common/scripts/lib/config";
import { Chapter, Lesson } from "../../../common/scripts/lib/convert";
import { Util } from "../../../common/scripts/util";
import {LearningSummaryForStudent, ParseApi} from "../../../common/scripts/services/parseApi";
import { ParseAssignment, Result, StudentAssessment } from "../../../common/scripts/domain/parseAssignment";
import ChimpleLabel from "../../../common/scripts/chimple-label";
import { CURRENT_SCHOOL_ID, CURRENT_SECTION_ID } from "../../../common/scripts/lib/constants";
import RowButton from "./rowButton";
import LessonIcon from "../../../common/scripts/lessonIcon";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TeacherStartContent extends cc.Component {

    @property(cc.Prefab)
    rowPrefab: cc.Prefab = null

    @property(cc.Node)
    layout: cc.Node = null;

    @property(cc.Node)
    scrollView: cc.Node = null;

    @property(cc.Prefab)
    lessonPrefab: cc.Prefab = null

    @property(cc.Prefab)
    lessonIconPrefab: cc.Prefab = null

    @property(cc.Prefab)
    assignmentCompletedPrefab: cc.Prefab = null

    @property(cc.Prefab)
    assignmentCompletedMidScorePrefab: cc.Prefab = null

    @property(cc.Prefab)
    assignmentCompletedLowScorePrefab: cc.Prefab = null

    @property(cc.Prefab)
    assignmentNotCompletedPrefab: cc.Prefab = null

    loading: cc.Node;
    private assignment: ParseAssignment;

    private lessonsInRow = [];
    private totalLessons: number = 0;
    private learningSummary: LearningSummaryForStudent[] = [];

    async onLoad() {
        cc.log('curriculum', Config.i.curriculum);

        const schoolId: string = cc.sys.localStorage.getItem(CURRENT_SCHOOL_ID);
        const sectionId: string = cc.sys.localStorage.getItem(CURRENT_SECTION_ID);

        this.assignment = await ParseApi.getInstance().getAssignments(schoolId, sectionId)
        this.learningSummary = await ParseApi.getInstance().getLearningSummary(this.assignment.students.map(s => s.studentId))
        cc.log('learningSummary', this.learningSummary);
        if (this.assignment && this.assignment.assignments && this.assignment.assignments.length > 0) {
            this.renderHeader();
            this.renderRow();
        }
    }


    private renderHeader() {
        const row: cc.Node = cc.instantiate(this.rowPrefab);
        const h1 = row.getChildByName("h1");
        const header1 = h1.getChildByName("header1");
        const label: ChimpleLabel = header1.getComponent(ChimpleLabel);
        label.string = "Section 1";

        const lessonObjs = this.getLessons(this.assignment.assignments);
        this.totalLessons = lessonObjs.length;
        lessonObjs.forEach(
            a => {
                row.addChild(this.renderLessonIcon(a));
            }
        )
        this.layout.addChild(row);
        const layoutComponent: cc.Layout = this.layout.getComponent(cc.Layout);
        layoutComponent.updateLayout();
    }

    private renderRow() {
        this.assignment.students.forEach(
            student => {
                const row: cc.Node = cc.instantiate(this.rowPrefab);
                const rowButtonComponent: RowButton = row.getComponent(RowButton);
                this.layout.addChild(row);
                row.height = 100;
                const h1 = row.getChildByName("h1");
                const header1 = h1.getChildByName("header1");
                const label: ChimpleLabel = header1.getComponent(ChimpleLabel);
                label.string = student.name ? student.name.substring(0, 9) : 'default';
                rowButtonComponent.studentId = student.studentId;
                const h2 = row.getChildByName("h2");
                const header2 = h2.getChildByName("header2");
                const label2: ChimpleLabel = header2.getComponent(ChimpleLabel);
                const summary = this.learningSummary.find(ls => ls.studentId === student.studentId);
                label2.string = !!summary  && summary.totalTime ? summary.totalTime + " s" : "0 s";

                this.lessonsInRow.forEach(
                    l => {
                        this.assignment.assignments.forEach(
                            (assn: Result) => {
                                if (assn.chapter + '#' + assn.lesson === l) {
                                    const matched = assn.studentAssessments.filter((s: StudentAssessment) => s.studentId === student.studentId);
                                    if (matched && matched.length > 0) {
                                        matched.forEach(
                                            m => {
                                                if (m.assessment < 50) {
                                                    const completed: cc.Node = cc.instantiate(this.assignmentCompletedLowScorePrefab)
                                                    row.addChild(completed);

                                                } else if (m.assessment > 50 && m.assessment < 75) {
                                                    const completed: cc.Node = cc.instantiate(this.assignmentCompletedMidScorePrefab)
                                                    row.addChild(completed);
                                                } else {
                                                    const completed: cc.Node = cc.instantiate(this.assignmentCompletedPrefab)
                                                    row.addChild(completed);
                                                }
                                            }
                                        )
                                    } else {
                                        const notCompleted: cc.Node = cc.instantiate(this.assignmentNotCompletedPrefab)
                                        row.addChild(notCompleted);
                                    }
                                }
                            }
                        )

                    }
                )
            }
        );
        const layoutComponent: cc.Layout = this.layout.getComponent(cc.Layout);
        layoutComponent.updateLayout();
        this.layout.parent.height = this.layout.height;
        const scrollViewComponent = this.scrollView.getComponent(cc.ScrollView);
        scrollViewComponent.scrollToTop(0.25);
    }

    private getLessons(assignments: Result[]): Lesson[] {
        let allChapterLessons = assignments.map(a => {
            return {
                subject: a.subject,
                lesson: a.lesson,
                chapter: a.chapter
            }
        });

        let allLessons = Array.from(new Set(allChapterLessons.map((item: any) => item.subject + '#' + item.chapter + '#' + item.lesson)))
        const allImagesToLoad = allLessons.map(
            (e, index) => {
                let lessonObj = null;
                let [subject, chapter, lesson] = e.split('#');
                this.lessonsInRow.push(chapter + '#' + lesson);
                const course = Config.i.curriculum.get(subject)
                if (course) {
                    const chapters: Chapter[] = course.chapters.filter(c => c.id === chapter);
                    if (chapters && chapters.length === 1) {
                        const lessons = chapters[0].lessons.filter(l => l.id === lesson);
                        if (lessons && lessons.length === 1) {
                            lessonObj = lessons[0];
                        }
                        return lessonObj
                    }
                }
            }
        );
        return allImagesToLoad;
    }

    // renderLesson(lessonImage: string) {
    //     const lesson: cc.Node = cc.instantiate(this.lessonPrefab);
    //     const n1: cc.Node = lesson.getChildByName("n1");
    //     const mask: cc.Node = n1.getChildByName("mask");
    //     const spriteNode = mask.getChildByName("sprite");
    //     if (lessonImage !== null) {
    //         cc.log("loading image", lessonImage);
    //         Util.load(lessonImage, (err: Error, texture) => {
    //             if (!err) {
    //                 const sprite = spriteNode.getComponent(cc.Sprite);
    //                 sprite.spriteFrame = new cc.SpriteFrame(texture);
    //             }
    //         });
    //     }

    //     return lesson;
    // }

    renderLessonIcon(lesson: Lesson) {
        const lessonBg: cc.Node = cc.instantiate(this.lessonPrefab);
        const lessonIcon: cc.Node = cc.instantiate(this.lessonIconPrefab);
        const lessonIconComp = lessonIcon.getComponent(LessonIcon)
        lessonIconComp.lesson = lesson
        lessonIconComp.open = true
        lessonIcon.scale = 0.5
        lessonBg.addChild(lessonIcon)
        return lessonBg
    }

}
