import {
    RECEIVED_TEACHER_REQUEST,
    TEACHER_ADDED,
    TEACHER_ADD_STUDENT_ID,
    TEACHER_ID_KEY,
    TEACHER_NAME_KEY,
    TEACHER_SECTION_ID,
    ACCEPT_TEACHER_REQUEST
} from "../../../chimple";
import Friend from "../../../common/scripts/friend";
import Config, { StartAction } from "../../../common/scripts/lib/config";
import { EXAM, MIN_PASS } from "../../../common/scripts/lib/constants";
import { Chapter, Course, Lesson } from "../../../common/scripts/lib/convert";
import { User } from "../../../common/scripts/lib/profile";
import Loading from "../../../common/scripts/loading";
import { ServiceConfig } from "../../../common/scripts/services/ServiceConfig";
import TeacherAddedDialog, { TEACHER_ADD_DIALOG_CLOSED } from "../../../common/scripts/teacherAddedDialog";
import { INVENTORY_ANIMATIONS, INVENTORY_SAVE_CONSTANTS, REWARD_TYPES, Util, INVENTORY_ICONS } from "../../../common/scripts/util";
import Inventory from "../../inventory/scripts/inventory";
import LessonButton from "./lessonButton";

const COMPLETE_AUDIOS = [
    'congratulations',
    'excellent',
    'try_again',
    'very_good',
    'you_are_getting_better',
    'i_enjoyed_eating'
]

const DEFAULT_AUDIOS = [
    'i_am_hungry',
    'let_us_start_our_learning_journey',
    'may_i_help_you',
    'my_name_is_chimple'
]

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

    @property(cc.Prefab)
    giftBoxPrefab: cc.Prefab = null

    @property(cc.Graphics)
    ctx: cc.Graphics = null

    friend: cc.Node

    async onLoad() {
        const user = User.getCurrentUser()
        this.bgHolder.removeAllChildren();
        if (!!user && !!user.currentBg) {
            this.setBackground(user.currentBg);
        } else {
            this.setBackground("camp");
        }
        const loadingComp = this.loading.getComponent(Loading)
        loadingComp.allowCancel = false
        loadingComp.delay = 0

        this.homeButton.on('touchend', () => {
            this.drawer.active = true
        })
        const config = Config.i
        const startAction = config.startAction
        user.curriculumLoaded
            ? this.initPage()
            : config.loadCourseJsons(user, this.node, this.initPage.bind(this))

        Util.loadFriend((node: cc.Node) => {
            this.friend = node
            node.scale = 0.8
            this.node.addChild(this.friend)
            node.y = -cc.winSize.height / 2 + 16
            node.x = cc.winSize.width / 3.25
            Util.loadAccessoriesAndEquipAcc(node.children[1], node)
            const friendComp = this.friend.getComponent(Friend)
            switch (startAction) {
                case StartAction.Start:
                    friendComp.helpFile = 'start'
                    break;
                case StartAction.MoveLessonPlan:
                    friendComp.helpFile = COMPLETE_AUDIOS[Math.floor(Math.random() * COMPLETE_AUDIOS.length)]

                    break;
                case StartAction.LessonComplete:
                    friendComp.helpFile = COMPLETE_AUDIOS[Math.floor(Math.random() * COMPLETE_AUDIOS.length)]
                    break;
                case StartAction.Default:
                    friendComp.helpFile = DEFAULT_AUDIOS[Math.floor(Math.random() * DEFAULT_AUDIOS.length)]
                    break;
            }
            friendComp.speakHelp(true)
        })
        const assignments: [] = await ServiceConfig.getI().handle.listAssignments(user.id);
        console.log(assignments)
        // user.lessonPlan = user.lessonPlan
        //     .concat(assignments
        //         .map((val) => val.lessonId)
        //         .filter((lId, index, self) => user.lessonPlan.indexOf(lId) == -1
        //             && !user.lessonProgressMap.has(lId)
        //             && self.indexOf(lId) === index
        //         ))

    }

    private initPage() {
        // const drawerComp = this.drawer.getComponent(Drawer);
        // drawerComp.onCourseClick = this.onCourseClick.bind(this);
        const user = User.getCurrentUser()
        const now = new Date()
        const currentLessonInPlan = user.lessonPlan[Math.floor(user.lessonPlan.length / 2)]
        if (currentLessonInPlan.length > 1
            && user.lessonPlanDate
            && user.lessonPlanDate.getDate() == now.getDate()
            && user.lessonPlanDate.getMonth() == now.getMonth()
            && user.lessonPlanDate.getFullYear() == now.getFullYear()
        ) {
            this.displayLessonPlan()
        } else {
            const courses = Array.from(user.courseProgressMap.keys())
                .sort((a, b) =>
                    user.courseProgressMap.get(a).date.getTime() - user.courseProgressMap.get(b).date.getTime()
                )
            const courseId = courses[0]
            const lessons = this.createLessonPlan(courseId)
            user.lessonPlanCourseId = courseId
            const start = currentLessonInPlan == 'r' ? 1 : 0
            user.lessonPlan[Math.floor(user.lessonPlan.length / 2) + start] = lessons[0].id
            user.lessonPlan[Math.floor(user.lessonPlan.length / 2) + start + 1] = lessons[1].id
            user.lessonPlanDate = now
            this.displayLessonPlan()
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
            // @ts-ignore
            const audioSource = bgPrefabInstance.getComponent(cc.AudioSource);
            if (audioSource) {
                let audioClip = audioSource.clip;
                try {
                    if (audioClip) {
                        Util.playSfx(audioClip, true);
                    }
                } catch (e) {
                    cc.log(e);
                }
            }
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
                const addStudentId = curMessage[TEACHER_ADD_STUDENT_ID];
                cc.sys.localStorage.setItem(RECEIVED_TEACHER_REQUEST, JSON.stringify(messages));

                const tKey = ACCEPT_TEACHER_REQUEST + id;
                const studentAdded = JSON.parse(cc.sys.localStorage.getItem(tKey) || '[]');
                const alreadyAddedStudent: boolean = studentAdded.includes(addStudentId);

                let users = User.getUsers() || [];

                const teachersAdded = JSON.parse(cc.sys.localStorage.getItem(TEACHER_ADDED + id) || '[]');
                users = users.filter(u => !alreadyAddedStudent && !teachersAdded.includes(u.id))
                cc.log('remaining users', users, 'alreadyAddedStudent', alreadyAddedStudent);


                if (!!id && !!name && !!sectionId && !!addStudentId
                    && users && users.length > 0) {
                    const teacherDialog: cc.Node = cc.instantiate(this.teacherDialogPrefab);
                    const script: TeacherAddedDialog = teacherDialog.getComponent(TeacherAddedDialog);
                    script.TeacherName = name;
                    script.TeacherId = id;
                    script.SelectedSectionId = sectionId;
                    script.SelectedAddStudentId = addStudentId;
                    this.node.addChild(teacherDialog);
                }
            }
        } catch (e) {

        }
    }

    private setUpTeacherDialog() {
        this.showTeacherDialog();
    }

    onProfileClick() {
        Config.i.pushScene('menu/rewards/scenes/rewards', 'menu')
    }

    createLessonPlan(courseId: string): Lesson[] {
        const user = User.getCurrentUser()
        const lessons: Array<Lesson> = []
        const courseProgress = user.courseProgressMap.get(courseId)
        const course = Config.i.curriculum.get(courseId)
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
            lessons.push(course.chapters[1].lessons[0])
        }
        return lessons
    }

    displayLessonPlan() {
        const user = User.getCurrentUser()
        const x1 = -cc.winSize.width / 2
        const y1 = -254
        const x2 = cc.winSize.width / 4
        const y2 = -254
        const x3 = -cc.winSize.width / 4
        const y3 = 254
        const x4 = cc.winSize.width / 2
        const y4 = 254

        this.content.removeAllChildren()
        this.ctx.moveTo(x1, y1)
        this.ctx.bezierCurveTo(x2, y2, x3, y3, x4, y4)
        this.ctx.stroke()
        const midIndex = Math.floor(user.lessonPlan.length / 2)
        var posIndex = 0
        user.lessonPlan.forEach((lessonId, index, lessons) => {
            const node: cc.Node = lessonId == ''
                ? new cc.Node()
                : lessonId == 'r'
                    ? cc.instantiate(this.giftBoxPrefab)
                    : lessonId.length == 1
                        ? cc.instantiate(this.giftBoxPrefab)
                        : Start.createLessonButton(
                            lessonId.endsWith('_PreQuiz')
                                ? Start.preQuizLesson(Config.i.curriculum.get(lessonId.split('_')[0]))
                                : Config.i.allLessons.get(lessonId),
                            this.lessonButtonPrefab,
                            this.loading,
                            index == midIndex)

            if (index == midIndex) {
                posIndex += 2
            }
            const t = -0.2 + posIndex / (lessons.length + 4 - 1) * 1.4
            if (index == midIndex) {
                posIndex += 2
            } else {
                node.scale = 0.4
            }
            posIndex++
            node.x = Math.pow(1 - t, 3) * x1 + 3 * Math.pow(1 - t, 2) * t * x2 + 3 * (1 - t) * Math.pow(t, 2) * x3 + Math.pow(t, 3) * x4
            node.y = Math.pow(1 - t, 3) * y1 + 3 * Math.pow(1 - t, 2) * t * y2 + 3 * (1 - t) * Math.pow(t, 2) * y3 + Math.pow(t, 3) * y4
            this.content.addChild(node)
            if (index == midIndex && lessonId == 'r') {
                this.scheduleOnce(() => {
                    const anim = node.getComponent(cc.Animation)
                    anim.play()
                }, 2)
                const rewardItem = Util.unlockNextReward()
                user.pushNewLessonPlaceholder()
                if (rewardItem) {
                    const splitItems = rewardItem.split('-')
                    var rewardSpriteFrame = ''
                    if (splitItems[0] == REWARD_TYPES[0]) {
                        rewardSpriteFrame = 'char_icons/' + splitItems[1] + '_icon'
                    } else if (splitItems[0] == REWARD_TYPES[1]) {
                        rewardSpriteFrame = 'backgrounds/textures/bg_icons/background-' + splitItems[1]
                    } else if (splitItems[0] == REWARD_TYPES[2]) {

                    } else if (splitItems[0] == REWARD_TYPES[3]) {
                        rewardSpriteFrame = INVENTORY_ICONS[splitItems[2]] + splitItems[3]
                    }
                    cc.resources.load(rewardSpriteFrame, cc.SpriteFrame, (err, spriteFrame) => {
                        const rewardIcon = new cc.Node()
                        rewardIcon.y = 100
                        rewardIcon.scale = 0
                        const sprite = rewardIcon.addComponent(cc.Sprite)
                        // @ts-ignore
                        sprite.spriteFrame = spriteFrame
                        node.addChild(rewardIcon)
                        new cc.Tween().target(rewardIcon)
                            .delay(4)
                            .to(0.5, { scale: 1, y: 200 }, null)
                            .delay(2)
                            .to(0.5,
                                { scale: 0.1, position: node.parent.convertToNodeSpaceAR(cc.v3(cc.winSize.width - 64, cc.winSize.height - 32)) },
                                null)
                            .delay(0.5)
                            .call(() => {
                                if (splitItems[0] == REWARD_TYPES[0]) {
                                    user.currentCharacter = splitItems[1]
                                } else if (splitItems[0] == REWARD_TYPES[1]) {
                                    user.currentBg = splitItems[1]
                                } else if (splitItems[0] == REWARD_TYPES[2]) {

                                } else if (splitItems[0] == REWARD_TYPES[3]) {
                                    const animIndex = INVENTORY_SAVE_CONSTANTS.indexOf(splitItems[2])
                                    user.updateInventory(`${splitItems[1]}-${splitItems[2]}`, splitItems[3]);
                                    Inventory.updateCharacter(this.friend.getComponent(Friend).db, INVENTORY_ANIMATIONS[animIndex], splitItems[3], splitItems[2])
                                }
                                rewardIcon.opacity = 0
                            })
                            .delay(1)
                            .call(() => {
                                this.displayLessonPlan()
                            })
                            .start()
                    })
                } else {
                    this.scheduleOnce(() => {
                        this.displayLessonPlan()
                    }, 4)
                }
            }
        })
        if (Config.i.startAction == StartAction.MoveLessonPlan) {
            this.content.children.forEach((node: cc.Node, index: number, children: cc.Node[]) => {
                if (index + 1 < children.length && index > 0) {
                    const pos = node.position.clone()
                    node.position = children[index + 1].position.clone()
                    if (index == Math.floor(user.lessonPlan.length / 2)) {
                        node.scale = 0.4
                        new cc.Tween().target(node)
                            .to(0.5, { position: pos, scale: 1 }, null)
                            .start()
                    } else if (index == Math.floor(user.lessonPlan.length / 2) - 1) {
                        node.scale = 1
                        new cc.Tween().target(node)
                            .to(0.5, { position: pos, scale: 0.4 }, null)
                            .start()
                    } else {
                        new cc.Tween().target(node)
                            .to(0.5, { position: pos }, null)
                            .start()
                    }
                }
            })
        }
        if (user.lessonPlan[midIndex] == 'r') {
        }
        Config.i.startAction = StartAction.Default

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

    onDisable() {
        const friendComp = this.friend.getComponent(Friend)
        friendComp.stopAudio()
    }

    onDestroy() {
        cc.audioEngine.stopMusic();
    }
}
