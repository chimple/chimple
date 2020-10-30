import { RECEIVED_TEACHER_REQUEST, TEACHER_ADDED, TEACHER_ID_KEY, TEACHER_NAME_KEY, TEACHER_SECTION_ID } from "../../../chimple";
import HeaderButton from "../../../common/scripts/headerButton";
import Config from "../../../common/scripts/lib/config";
import { EXAM, MIN_PASS } from "../../../common/scripts/lib/constants";
import { Chapter, Course, Lesson } from "../../../common/scripts/lib/convert";
import { CourseProgress, User } from "../../../common/scripts/lib/profile";
import Loading from "../../../common/scripts/loading";
import { ServiceConfig } from "../../../common/scripts/services/ServiceConfig";
import TeacherAddedDialog, { TEACHER_ADD_DIALOG_CLOSED } from "../../../common/scripts/teacherAddedDialog";
import { Util } from "../../../common/scripts/util";
import LessonButton from "./lessonButton";
import StartContent from "./startContent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Start extends cc.Component {
    @property(cc.Prefab)
    profilePrefab: cc.Prefab = null

    @property(cc.Node)
    loading: cc.Node = null;

    @property(cc.Prefab)
    teacherDialogPrefab: cc.Prefab = null;

    @property(cc.Node)
    bgHolder: cc.Node = null;

    @property(cc.Node)
    drawer: cc.Node = null

    @property(cc.Node)
    homeButton: cc.Node = null

    @property(cc.Prefab)
    lessonButtonPrefab: cc.Prefab = null

    @property(cc.Node)
    content: cc.Node = null

    @property(cc.SpriteFrame)
    currentLesson: cc.SpriteFrame = null

    async onLoad() {
        const user = User.getCurrentUser()
        this.bgHolder.removeAllChildren();
        if (!!user && !!user.currentBg) {
            this.setBackground(user.currentBg);
        } else {
            this.setBackground("forest");
        }
        const loadingComp = this.loading.getComponent(Loading)
        loadingComp.allowCancel = false
        loadingComp.delay = 0

        this.homeButton.on('touchend', () => {
            this.drawer.active = true
        })
        const config = Config.i
        user.curriculumLoaded
            ? this.initPage()
            : config.loadCourseJsons(user, this.node, this.initPage.bind(this))
        const assignments: [] = await ServiceConfig.getI().handle.listAssignments(user.id);
        console.log(assignments)
        user.lessonPlan = user.lessonPlan
            .concat(assignments
                .map((val) => val.lessonId)
                .filter((lId, index, self) => user.lessonPlan.indexOf(lId) == -1
                    && !user.lessonProgressMap.has(lId)
                    && self.indexOf(lId) === index
                ))

    }

    private initPage() {
        // const drawerComp = this.drawer.getComponent(Drawer);
        // drawerComp.onCourseClick = this.onCourseClick.bind(this);
        const user = User.getCurrentUser()
        const lessonPlan = user.lessonPlan
        const now = new Date()
        if (lessonPlan && lessonPlan.length > 0
            && user.lessonPlanIndex < lessonPlan.length
            && user.lessonPlanDate
            && user.lessonPlanDate.getDate() == now.getDate()
            && user.lessonPlanDate.getMonth() == now.getMonth()
            && user.lessonPlanDate.getFullYear() == now.getFullYear()
        ) {
            this.displayLessonPlan(lessonPlan.map((val) =>
                val.endsWith('_PreQuiz')
                    ? Start.preQuizLesson(Config.i.curriculum.get(val.split('_')[0]))
                    : Config.i.allLessons.get(val)
            ))
        } else {
            const lessons = this.createLessonPlan()
            user.lessonPlan = lessons.map((l) => l.id)
            user.lessonPlanDate = now
            user.lessonPlanIndex = 0
            this.displayLessonPlan(lessons)
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
                const sectionId = curMessage[TEACHER_SECTION_ID];
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
                    script.SelectedSectionId = sectionId;
                    this.node.addChild(teacherDialog);
                }
            }
        } catch (e) {

        }
    }

    private setUpTeacherDialog() {
        this.showTeacherDialog();
    }

    // private onCourseClick() {
    //     this.content.removeAllChildren();
    //     const courseContent = cc.instantiate(this.courseContentPrefab);
    //     const courseContentComp = courseContent.getComponent(CourseContent);
    //     courseContentComp.loading = this.loading;
    //     courseContentComp.content = this.content;
    //     this.content.addChild(courseContent);
    // }

    // private onHomeClick() {
    //     this.content.removeAllChildren()
    //     const startContent = cc.instantiate(this.startContentPrefab)
    //     const startContentComp = startContent.getComponent(StartContent)
    //     startContentComp.loading = this.loading
    //     this.content.addChild(startContent)
    //     this.setHomeIcon()
    // }

    // private setHomeIcon() {
    //     if(Header.homeSelected) {
    //         this.homeButton.label.string = 'Home'
    //         this.homeButton.sprite.spriteFrame = this.homeButton.homeSprite
    //     } else {
    //         const course = Config.i.course
    //         this.homeButton.label.string = course.name
    //         Util.load(course.id + '/course/res/icons/' + course.id + '.png', (err: Error, texture) => {
    //             this.homeButton.sprite.spriteFrame = err ? null : new cc.SpriteFrame(texture);
    //         })    
    //     }
    // }

    onProfileClick() {
        Config.i.pushScene('menu/rewards/scenes/rewards', 'menu')
    }

    createLessonPlan(): Lesson[] {
        const user = User.getCurrentUser()
        const lessons: Array<Lesson> = []
        user.courseProgressMap.forEach((courseProgress: CourseProgress, name: string) => {
            const course = Config.i.curriculum.get(name)
            if (courseProgress.currentChapterId) {
                course.chapters.forEach((chapter: Chapter, index: number) => {
                    if (chapter.id == courseProgress.currentChapterId) {
                        // get reco lesson in current chapter
                        lessons.push(this.recommendedLessonInChapter(chapter))

                        const last3Chapters: Chapter[] = Util.shuffleByMapSortMap(course.chapters.slice(Math.max(0, index - 3), index))
                        if (last3Chapters.length > 0) {
                            // get reco lesson in random past 3 chapters
                            lessons.push(this.recommendedLessonInChapter(last3Chapters[0]))
                        } else if (index + 1 < course.chapters.length) {
                            // or if in first chapter, get reco lesson from next chapter
                            lessons.push(this.recommendedLessonInChapter(course.chapters[index + 1]))
                        }
                    }
                })
            } else {
                lessons.push(Start.preQuizLesson(course))
            }
        })
        return lessons
    }

    displayLessonPlan(lessons: Lesson[]) {
        const user = User.getCurrentUser()
        const STARTX = 196
        var dir = 1
        const lesPerRow = Math.max(2, Math.floor(lessons.length / 3) + 1)
        var currentX = -cc.winSize.width / 2 + STARTX
        const ctx = this.content.addComponent(cc.Graphics)
        ctx.lineWidth = 24
        ctx.strokeColor = cc.Color.WHITE
        lessons.forEach((lesson: Lesson, index: number, array: Lesson[]) => {
            const node = Start.createLessonButton(lesson, this.lessonButtonPrefab, this.loading, index <= user.lessonPlanIndex)
            node.x = currentX
            node.y = cc.winSize.height / 3.5 * (Math.floor(index / lesPerRow) - 1)
            dir *= (index + 1) % lesPerRow == 0 ? -1 : 1
            currentX += ((index + 1) % lesPerRow == 0 ? 0 : dir) * (cc.winSize.width - STARTX) / lesPerRow
            node.scale = 0.5
            this.content.addChild(node)
            if (index == 0) {
                ctx.moveTo(node.x, node.y)
            } else {
                ctx.lineTo(node.x, node.y)
                ctx.stroke()
            }
            if (index == user.lessonPlanIndex) {
                const spriteNode = new cc.Node()
                spriteNode.anchorY = 0
                spriteNode.y = node.height / 2
                const sprite = spriteNode.addComponent(cc.Sprite)
                sprite.spriteFrame = this.currentLesson
                const button = sprite.addComponent(cc.Button)
                button.transition = cc.Button.Transition.SCALE
                spriteNode.on('touchend', node.getComponent(LessonButton).onClick.bind(node.getComponent(LessonButton)))
                new cc.Tween().target(spriteNode)
                    .to(0.5, { scale: 1.1 })
                    .to(0.5, { scale: 1 })
                    .delay(1)
                    .union()
                    .repeatForever()
                    .start()
                node.addChild(spriteNode)
                if (Config.i.lessonPlanIncr && index > 0) {
                    Config.i.lessonPlanIncr = false
                    const prevNode = this.content.children[user.lessonPlanIndex - 1]
                    const prevPos = prevNode.convertToWorldSpaceAR(cc.v3(0, prevNode.height / 2))
                    const diffPos = node.convertToNodeSpaceAR(prevPos)
                    const newPos = cc.v3(0, node.height / 2)
                    spriteNode.position = diffPos
                    spriteNode.runAction(cc.bezierTo(
                        0.5, [
                            cc.v2(diffPos.add(newPos).mul(0.33).add(cc.v3(0, 200))),
                            cc.v2(diffPos.add(newPos).mul(0.33).add(cc.v3(0, 100))),
                            cc.v2(newPos)
                        ]
                    ))
                }
            }
        })
    }

    // async addAssignmentsToLessonPlan() {
    //     const assignments = await ParseApi.getInstance().listAssignments(User.getCurrentUser().serverId)
    //     assignments.forEach((ass) => {
    //         const course: Course = Config.i.curriculum.get(ass.courseCode);
    //         if (course) {
    //             const chapter: Chapter = course.chapters.find(c => c.id == ass.chapterId)
    //             let lesson = null;
    //             if (chapter) {
    //                 lesson = chapter.lessons.find(l => l.id == ass.lessonId)
    //                 if (lesson)
    //                     this.node.children[0].getComponent(cc.PageView).insertPage(this.createButton(lesson), 0)
    //             }
    //         }
    //     })
    // }

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

    public static createPreQuizButton(course: Course, lessonButtonPrefab: cc.Prefab, loading: cc.Node, open: boolean): cc.Node {
        const lesson = {
            id: course.id + '_PreQuiz',
            image: '',
            name: course.name,
            open: open,
            chapter: {
                id: course.id + '_PreQuizChapter',
                lessons: [],
                name: course.name,
                image: '',
                course: course
            }
        }
        return Start.createLessonButton(lesson, lessonButtonPrefab, loading, open)
    }

    public static preQuizLesson(course: Course): Lesson {
        return {
            id: course.id + '_PreQuiz',
            image: '',
            name: course.name,
            open: true,
            chapter: {
                id: course.id + '_PreQuizChapter',
                lessons: [],
                name: course.name,
                image: '',
                course: course
            }
        }
    }

    public static createLessonButton(lesson: Lesson, lessonButtonPrefab: cc.Prefab, loading: cc.Node, open: boolean): cc.Node {
        const lessonButton = cc.instantiate(lessonButtonPrefab);
        const lessonButtonComp = lessonButton.getComponent(LessonButton);
        lessonButtonComp.lesson = lesson;
        lessonButtonComp.loading = loading;
        lessonButtonComp.open = open
        return lessonButton
    }
}
