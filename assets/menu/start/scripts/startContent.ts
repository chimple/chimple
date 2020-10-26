import Config from "../../../common/scripts/lib/config";
import { Chapter, Course, Lesson } from "../../../common/scripts/lib/convert";
import { User, CourseProgress } from "../../../common/scripts/lib/profile";
import LessonButton from "./lessonButton";
import { Util } from "../../../common/scripts/util";
import { EXAM, MIN_PASS } from "../../../common/scripts/lib/constants";
import { ParseApi } from "../../../common/scripts/services/parseApi";
import {ServiceConfig} from "../../../common/scripts/services/ServiceConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StartContent extends cc.Component {
    @property(cc.Prefab)
    startLessonButtonPrefab: cc.Prefab = null

    @property(cc.PageView)
    pageView: cc.PageView = null;

    loading: cc.Node

    async onLoad() {
        const user = User.getCurrentUser()
        const buttons: Array<cc.Node> = []
        user.courseProgressMap.forEach((courseProgress: CourseProgress, name: string) => {
            const course = Config.i.curriculum.get(name)
            if (courseProgress.currentChapterId) {
                course.chapters.forEach((chapter: Chapter, index: number) => {
                    if (chapter.id == courseProgress.currentChapterId) {
                        // get reco lesson in current chapter
                        buttons.push(this.createButton(this.recommendedLessonInChapter(chapter)))

                        const last3Chapters: Chapter[] = Util.shuffleByMapSortMap(course.chapters.slice(Math.max(0, index - 3), index))
                        if (last3Chapters.length > 0) {
                            // get reco lesson in random past 3 chapters
                            buttons.push(this.createButton(this.recommendedLessonInChapter(last3Chapters[0])))
                        } else if (index + 1 < course.chapters.length) {
                            // or if in first chapter, get reco lesson from next chapter
                            buttons.push(this.createButton(this.recommendedLessonInChapter(course.chapters[index + 1])))
                        }
                    }
                })
            } else {
                buttons.push(StartContent.createPreQuizButton(course, this.startLessonButtonPrefab, this.loading))
            }
        })
        Util.shuffle(buttons)
        const STARTY = 256
        buttons.forEach((node: cc.Node, index: number, array: cc.Node[]) => {
            // this.node.children[0].getComponent(cc.PageView).addPage(node)
            node.x = - cc.winSize.width / 2 + cc.winSize.width / array.length * index
            node.y = - cc.winSize.height / 2 + STARTY + (cc.winSize.height - STARTY) / array.length * index
            this.node.addChild(node)
        })
        const assignments = await ServiceConfig.getI().handle.listAssignments('0bb66d84-2767-4a03-ac7d-a6101a7830d5');
        assignments.forEach((ass) => {
            const course: Course = Config.i.curriculum.get(ass.courseCode);
            if (course) {
                const chapter: Chapter = course.chapters.find(c => c.id == ass.chapterId)
                let lesson = null;
                if (chapter) {
                    lesson = chapter.lessons.find(l => l.id == ass.lessonId)
                    if (lesson)
                        this.node.children[0].getComponent(cc.PageView).insertPage(this.createButton(lesson), 0)
                }
            }
        })

    }

    private recommendedLessonInChapter(chapter: Chapter): Lesson {
        const user = User.getCurrentUser()

        // get last open lesson
        const firstClosedIndex = chapter.lessons.findIndex((lesson, index) => {
            return !(index == 0
                || lesson.open
                || user.lessonProgressMap.has(lesson.id));
        });
        const lastOpenLesson = chapter.lessons[firstClosedIndex == -1 ? 0 : firstClosedIndex - 1];
        if (lastOpenLesson.type == EXAM
            && user.lessonProgressMap.has(lastOpenLesson.id)
            && user.lessonProgressMap.get(lastOpenLesson.id).score < MIN_PASS) {
            // if exam and not yet passed, review one of exam's lessons
            var foundThisExam = false;
            var foundPrevExam = false;
            const lessonsToRevise = [...chapter.lessons].reverse()
                // get all lessons belonging to this exam
                .filter((l) => {
                    if (foundThisExam) {
                        if (!foundPrevExam) {
                            if (l.type == EXAM) {
                                foundPrevExam = true;
                                return false;
                            } else {
                                return true;
                            }
                        }
                    } else {
                        if (l.id == lastOpenLesson.id) {
                            foundThisExam = true;
                        }
                        return false;
                    }
                })
                // sort in number of attempts
                .sort((a, b) => {
                    const aProgress = user.lessonProgressMap.get(a.id)
                    const bProgress = user.lessonProgressMap.get(b.id)
                    const aAttempts = aProgress ? aProgress.attempts : 0
                    const bAttempts = bProgress ? bProgress.attempts : 0
                    return aAttempts - bAttempts
                });
            if (lessonsToRevise.length == 0) {
                // if exam has no prior lessons, lets do exam again - error condition
                return lastOpenLesson;
            } else if (lessonsToRevise.length == 1) {
                // if only one lesson in exam
                // return either exam or lesson based on how recently we completed it
                const firstProgress = user.lessonProgressMap.get(lessonsToRevise[0].id);
                const examProgress = user.lessonProgressMap.get(lastOpenLesson.id);
                const firstDate = firstProgress ? firstProgress.date : new Date();
                const examDate = examProgress ? examProgress.date : new Date();
                if (firstDate < examDate) {
                    return lessonsToRevise[0]
                } else {
                    return lastOpenLesson
                }
            } else {
                const firstProgress = user.lessonProgressMap.get(lessonsToRevise[0].id);
                const secondProgress = user.lessonProgressMap.get(lessonsToRevise[1].id);
                const firstAttempts = firstProgress ? firstProgress.attempts : 0;
                const secondAttempts = secondProgress ? secondProgress.attempts : 0;
                const examProgress = user.lessonProgressMap.get(lastOpenLesson.id);
                const examAttempts = examProgress ? examProgress.attempts : 0;
                if (firstAttempts < secondAttempts || firstAttempts <= examAttempts) {
                    // return lesson with least attempts
                    return lessonsToRevise[0]
                } else {
                    // return exam if we have completed one review of all lessons
                    return lastOpenLesson
                }
            }
        } else {
            return lastOpenLesson
        }
    }

    private createButton(lesson: Lesson): cc.Node {
        return StartContent.createLessonButton(lesson, this.startLessonButtonPrefab, this.loading)
    }

    public static createPreQuizButton(course: Course, lessonButtonPrefab: cc.Prefab, loading: cc.Node): cc.Node {
        const lesson = {
            id: course.id + 'PreQuiz',
            image: '',
            name: Util.i18NText('Begin Quiz'),
            open: true,
            chapter: {
                id: course.id + 'PreQuizChapter',
                lessons: [],
                name: course.name,
                image: '',
                course: course
            }
        }
        return StartContent.createLessonButton(lesson, lessonButtonPrefab, loading)
    }

    public static createLessonButton(lesson: Lesson, lessonButtonPrefab: cc.Prefab, loading: cc.Node): cc.Node {
        const lessonButton = cc.instantiate(lessonButtonPrefab);
        const lessonButtonComp = lessonButton.getComponent(LessonButton);
        lessonButtonComp.lesson = lesson;
        lessonButtonComp.loading = loading;
        lessonButtonComp.open = true
        return lessonButton
    }
}
