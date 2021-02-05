import {
    ACCEPT_TEACHER_REQUEST_LINKED_USED,
    RECEIVED_TEACHER_REQUEST,
    TEACHER_ADD_STUDENT_ID,
    TEACHER_ID_KEY,
    TEACHER_NAME_KEY,
    TEACHER_SECTION_ID,
    MICROLINK
} from "../../../chimple";
import Friend from "../../../common/scripts/friend";
import Config, { StartAction } from "../../../common/scripts/lib/config";
import { EXAM, MIN_PASS } from "../../../common/scripts/lib/constants";
import { Chapter, Course, Lesson } from "../../../common/scripts/lib/convert";
import { User } from "../../../common/scripts/lib/profile";
import Loading from "../../../common/scripts/loading";
import { ServiceConfig } from "../../../common/scripts/services/ServiceConfig";
import TeacherAddedDialog, { TEACHER_ADD_DIALOG_CLOSED } from "../../../common/scripts/teacherAddedDialog";
import {
    INVENTORY_ANIMATIONS,
    INVENTORY_ICONS,
    INVENTORY_SAVE_CONSTANTS,
    REWARD_TYPES,
    Util
} from "../../../common/scripts/util";
import Inventory from "../../inventory/scripts/inventory";
import LessonButton from "./lessonButton";
import ChapterLessons, { ChapterLessonType } from "./chapterLessons";

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

    @property(cc.AudioClip)
    bgMusic: cc.AudioClip = null;

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

    @property(cc.Label)
    library: cc.Label = null

    @property(cc.Sprite)
    librarySprite: cc.Sprite

    @property(cc.Button)
    assignmentButton: cc.Button = null

    @property(cc.Button)
    featuredButton: cc.Button = null

    friend: cc.Node

    async onLoad() {
        const user = User.getCurrentUser()
        this.bgHolder.removeAllChildren();
        Util.playSfx(this.bgMusic, true, true);
        if (!!user && !!user.currentBg) {
            this.setBackground(user.currentBg);
        } else {
            this.setBackground("camp");
        }
        const loadingComp = this.loading.getComponent(Loading)
        loadingComp.allowCancel = false

        this.homeButton.on('touchend', () => {
            this.drawer.active = true
        })
        const config = Config.i
        if (!config.course) {
            config.course = config.curriculum.values().next().value
        }
        this.library.string = config.course.name
        Util.load(config.course.id + '/course/res/icons/' + config.course.id + '.png', (err: Error, texture) => {
            this.librarySprite.spriteFrame = err ? null : new cc.SpriteFrame(texture);
        })

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
        ChapterLessons.showType = ChapterLessonType.Library
        const assignments = await ServiceConfig.getI().handle.listAssignments(user.id);
        config.assignments = assignments.filter((ass) => {
            const lessonProgress = User.getCurrentUser().lessonProgressMap.get(ass.lessonId)
            return !(lessonProgress && lessonProgress.date < ass.createAt)
        })
        if (config.assignments.length > 0) {
            this.assignmentButton.interactable = true
        }
        // call API to get featured stories
        // store in config.featuredLessons
        config.featuredLessons = ['en0003']
        if (config.featuredLessons.length > 0) {
            this.featuredButton.interactable = true
        }
    }

    private initPage() {
        const user = User.getCurrentUser()
        const config = Config.i
        const courseProgressMap = user.courseProgressMap.get(config.course.id)
        if (courseProgressMap.lessonPlan
            && courseProgressMap.lessonPlan.length > 0
            && courseProgressMap.lessonPlanIndex <= courseProgressMap.lessonPlan.length) {
            this.displayLessonPlan()
        } else {
            this.createLessonPlan(config.course.id)
            this.displayLessonPlan()
        }
        this.loading.active = false;
        this.loadLesson()
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
        });
    }

    private loadLesson(){
        if(Config.isMicroLink){
            const dataStr: string = cc.sys.localStorage.getItem(MICROLINK);
            let data: any[] = JSON.parse(dataStr)|| '[]';
            if (data && data.length > 0) {
                const courseDetails = data.splice(0, 1)[0];
                Util.loadDirectLessonWithLink(courseDetails['courseid'],courseDetails['chapterid'],courseDetails['lessonid'],this.node)
            }
            Config.isMicroLink=false;
        }
    }
    private showTeacherDialog() {
        try {
            const messageStr: string = cc.sys.localStorage.getItem(RECEIVED_TEACHER_REQUEST) || '[]';
            let messages: any[] = JSON.parse(messageStr);
            cc.log("showTeacherDialog", messageStr);
            if (messages && messages.length > 0) {
                const curMessage = messages.splice(0, 1)[0];
                const name: string = curMessage[TEACHER_NAME_KEY];
                const id = curMessage[TEACHER_ID_KEY];
                const sectionId = curMessage[TEACHER_SECTION_ID];
                const addStudentId = curMessage[TEACHER_ADD_STUDENT_ID];
                cc.sys.localStorage.setItem(RECEIVED_TEACHER_REQUEST, JSON.stringify(messages));

                const tKey = ACCEPT_TEACHER_REQUEST_LINKED_USED + id;
                const teacherRequestsAccepted = JSON.parse(cc.sys.localStorage.getItem(tKey) || '[]');
                const buildLink = id + '|' + sectionId + '|' + addStudentId;
                const linkUsed: boolean = teacherRequestsAccepted.includes(buildLink);
                cc.log(`checking if received teacher request link ${buildLink}  is used ${linkUsed}`);
                if (!!id && !!name && !!sectionId && !!addStudentId
                    && !linkUsed) {
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

    onAssignmentsClick() {
        ChapterLessons.showType = ChapterLessonType.Assignments
        Config.i.pushScene('menu/start/scenes/chapterLessons', 'menu')
    }

    onFeaturedClick() {
        ChapterLessons.showType = ChapterLessonType.Featured
        Config.i.pushScene('menu/start/scenes/chapterLessons', 'menu')
    }

    onLibraryClick() {
        Config.i.pushScene('menu/start/scenes/courseChapters', 'menu')
    }

    createLessonPlan(courseId: string): Lesson[] {
        const user = User.getCurrentUser()
        const courseProgress = user.courseProgressMap.get(courseId)
        const course = Config.i.curriculum.get(courseId)
        const currentChapter = course.chapters.find((chapter: Chapter) => chapter.id == courseProgress.currentChapterId)
        if (!courseProgress.currentLessonId) {
            courseProgress.currentLessonId = currentChapter.lessons[0].id
        }
        let foundCurrentChapter = false
        let foundChallenge = false
        const lessons = currentChapter.lessons.filter((lesson: Lesson) => {
            if (!foundCurrentChapter && lesson.id == courseProgress.currentLessonId) {
                foundCurrentChapter = true
            }
            if (foundCurrentChapter && !foundChallenge) {
                if (!foundChallenge && lesson.type == EXAM) {
                    foundChallenge = true
                }
                return true
            }
            return false
        })
        courseProgress.lessonPlan = lessons.map((l) => l.id)
        courseProgress.lessonPlanIndex = 0
        courseProgress.lessonPlanDate = new Date()
        user.storeUser()
        return lessons
    }

    displayLessonPlan() {
        const user = User.getCurrentUser()
        const planWidth = cc.winSize.width - 128
        const x1 = -planWidth / 2
        const y1 = -172
        const x2 = planWidth / 4
        const y2 = -172
        const x3 = -planWidth / 4
        const y3 = 172
        const x4 = planWidth / 2
        const y4 = 172

        this.content.removeAllChildren()
        this.ctx.moveTo(x1, y1)
        this.ctx.bezierCurveTo(x2, y2, x3, y3, x4, y4)
        this.ctx.stroke()
        const courseProgressMap = user.courseProgressMap.get(Config.i.course.id);
        courseProgressMap.lessonPlan.forEach((lessonId, index, lessons) => {
            const node: cc.Node = Start.createLessonButton(
                lessonId.endsWith('_PreQuiz')
                    ? Start.preQuizLesson(Config.i.curriculum.get(lessonId.split('_')[0]))
                    : Config.i.allLessons.get(lessonId),
                this.lessonButtonPrefab,
                this.loading,
                index <= courseProgressMap.lessonPlanIndex)

            const t = index / lessons.length
            node.x = Math.pow(1 - t, 3) * x1 + 3 * Math.pow(1 - t, 2) * t * x2 + 3 * (1 - t) * Math.pow(t, 2) * x3 + Math.pow(t, 3) * x4
            node.y = Math.pow(1 - t, 3) * y1 + 3 * Math.pow(1 - t, 2) * t * y2 + 3 * (1 - t) * Math.pow(t, 2) * y3 + Math.pow(t, 3) * y4
            node.scale = 0.4
            this.content.addChild(node)
            if (index == courseProgressMap.lessonPlanIndex) {
                const currentLessonNode = new cc.Node()
                const clSprite = currentLessonNode.addComponent(cc.Sprite)
                clSprite.spriteFrame = this.currentLesson
                currentLessonNode.y = 300
                currentLessonNode.scale = 2
                const lessonButton = node.getComponent(LessonButton)
                if (lessonButton) {
                    const clButton = currentLessonNode.addComponent(cc.Button)
                    clButton.transition = cc.Button.Transition.SCALE
                    currentLessonNode.on('touchend', (event: cc.Event) => {
                        if (lessonButton.button.interactable) {
                            lessonButton.onClick()
                        }
                    })
                }
                node.addChild(currentLessonNode)
                if (Config.i.startAction == StartAction.MoveLessonPlan && index > 0) {
                    const prevNode = this.content.children[index - 1]
                    const currentPos = currentLessonNode.position.clone()
                    currentLessonNode.position = node.convertToNodeSpaceAR(prevNode.convertToWorldSpaceAR(cc.v3(0, 300, 0)))
                    currentLessonNode.runAction(cc.bezierTo(1, [
                        cc.v2(currentLessonNode.position.x, currentPos.y + 200),
                        cc.v2(currentPos.x, currentPos.y + 100),
                        cc.v2(currentPos)
                    ]))
                }
            }
        })
        const gift = cc.instantiate(this.giftBoxPrefab)
        gift.x = Math.pow(1 - 1, 3) * x1 + 3 * Math.pow(1 - 1, 2) * 1 * x2 + 3 * (1 - 1) * Math.pow(1, 2) * x3 + Math.pow(1, 3) * x4
        gift.y = Math.pow(1 - 1, 3) * y1 + 3 * Math.pow(1 - 1, 2) * 1 * y2 + 3 * (1 - 1) * Math.pow(1, 2) * y3 + Math.pow(1, 3) * y4
        this.content.addChild(gift)
        if (courseProgressMap.lessonPlanIndex == courseProgressMap.lessonPlan.length) {
            this.giveReward(gift, user)
        }
        Config.i.startAction = StartAction.Default
    }

    private giveReward(node: cc.Node, user: User) {
        new cc.Tween().target(node)
            .to(0.5, { position: cc.Vec3.ZERO }, null)
            .call(() => {
                const anim = node.getComponent(cc.Animation);
                anim.play();
            })
            .delay(2)
            .call(() => {
                const rewardItem = Util.unlockNextReward();
                // user.pushNewLessonPlaceholder();
                if (rewardItem) {
                    const splitItems = rewardItem.split('-');
                    if (splitItems[0] == REWARD_TYPES[0]) {
                        user.currentCharacter = splitItems[1];
                    }
                    else if (splitItems[0] == REWARD_TYPES[1]) {
                        user.currentBg = splitItems[1];
                    }
                    else if (splitItems[0] == REWARD_TYPES[2]) {
                    }
                    else if (splitItems[0] == REWARD_TYPES[3]) {
                        user.updateInventory(`${splitItems[1]}-${splitItems[2]}`, splitItems[3]);
                    }
                    const courseProgress = user.courseProgressMap.get(Config.i.course.id)
                    if (courseProgress) {
                        courseProgress.lessonPlan = null
                        courseProgress.lessonPlanDate = null
                        courseProgress.lessonPlanIndex = 0
                    }
                    var rewardSpriteFrame = '';
                    if (splitItems[0] == REWARD_TYPES[0]) {
                        rewardSpriteFrame = 'char_icons/' + splitItems[1] + '_icon';
                    }
                    else if (splitItems[0] == REWARD_TYPES[1]) {
                        rewardSpriteFrame = 'backgrounds/textures/bg_icons/background-' + splitItems[1];
                    }
                    else if (splitItems[0] == REWARD_TYPES[2]) {
                    }
                    else if (splitItems[0] == REWARD_TYPES[3]) {
                        rewardSpriteFrame = INVENTORY_ICONS[splitItems[2]] + splitItems[3];
                    }
                    cc.resources.load(rewardSpriteFrame, cc.SpriteFrame, (err, spriteFrame) => {
                        const rewardIcon = new cc.Node();
                        rewardIcon.y = 100;
                        rewardIcon.scale = 0;
                        const sprite = rewardIcon.addComponent(cc.Sprite);
                        // @ts-ignore
                        sprite.spriteFrame = spriteFrame;
                        node.addChild(rewardIcon);
                        new cc.Tween().target(rewardIcon)
                            .to(0.5, { scale: 1, y: 200 }, null)
                            .delay(2)
                            .to(0.5, { scale: 0.1, position: node.parent.convertToNodeSpaceAR(cc.v3(cc.winSize.width - 64, cc.winSize.height - 32)) }, null)
                            .delay(0.5)
                            .call(() => {
                                if (splitItems[0] == REWARD_TYPES[3]) {
                                    const animIndex = INVENTORY_SAVE_CONSTANTS.indexOf(splitItems[2]);
                                    Inventory.updateCharacter(this.friend.getComponent(Friend).db, INVENTORY_ANIMATIONS[animIndex], splitItems[3], splitItems[2]);
                                }
                                rewardIcon.opacity = 0;
                            })
                            .delay(1)
                            .call(() => {
                                this.createLessonPlan(Config.i.course.id)
                                this.displayLessonPlan();
                            })
                            .start();
                    });
                }
                else {
                    this.scheduleOnce(() => {
                        this.createLessonPlan(Config.i.course.id)
                        this.displayLessonPlan();
                    }, 4);
                }
            })
            .start()
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
