import {
    ACCEPT_TEACHER_REQUEST_LINKED_USED,
    RECEIVED_TEACHER_REQUEST,
    TEACHER_ADD_STUDENT_ID,
    TEACHER_ID_KEY,
    TEACHER_NAME_KEY,
    TEACHER_SECTION_ID,
    MICROLINK, RECEIVED_TEACHER_REQUESTS
} from "../../../chimple";
import Friend from "../../../common/scripts/friend";
import Config, { ASSIGNMENT_COURSE_ID, COURSES_LANG_ID, StartAction } from "../../../common/scripts/lib/config";
import { EXAM, IS_REMEMBER_TOGGLE_ON, MIN_PASS, MODE, Mode } from "../../../common/scripts/lib/constants";
import { Chapter, Course, Lesson } from "../../../common/scripts/lib/convert";
import Profile, { User, CourseProgress, IS_OTP_VERIFIED, LessonProgress, CURRENTMODE } from "../../../common/scripts/lib/profile";
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
import UtilLogger from "../../../common/scripts/util-logger";
import AssignmentPopup from "./assignmentPopup";
import ChimpleLabel from "../../../common/scripts/chimple-label";
import PreTestDialog from "./preTestDialog";
import StartHeader from "./startHeader";
import { SECTION_LIST } from "../../../private/school/scripts/landing";
import ReConnectPopup from "./reConnectPopup";


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
    homeButton: cc.Node = null

    @property(cc.Prefab)
    lessonButtonPrefab: cc.Prefab = null

    @property(cc.Node)
    content: cc.Node = null

    @property(cc.SpriteFrame)
    currentLesson: cc.SpriteFrame = null

    @property(cc.Prefab)
    giftBoxPrefab: cc.Prefab = null

    @property(cc.Prefab)
    currentLessonButton: cc.Prefab = null

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

    @property(cc.Node)
    assignmentCount: cc.Node = null;

    @property(cc.Prefab)
    preTestPopup: cc.Prefab = null

    @property(cc.Prefab)
    headerPrefab: cc.Prefab = null

    @property(cc.Node)
    header: cc.Node = null

    @property(cc.Node)
    rewardBg: cc.Node = null

    beginQuiz: cc.Node
    friend: cc.Node
    timer: number = 0;
    flag: boolean = true;
    assignments: any;
    previousHash: number;
    assignPopupActive: boolean = true;
    gift: cc.Node
    disableGiftBoxNodeFlag: boolean = false;

    async start() {
        const config = Config.i
        const mode = parseInt(Profile.getValue(CURRENTMODE))
        const user = User.getCurrentUser()
        if (mode != Mode.School) {
            this.loading.active = true;
            if (this.isAssignmentsExistsInLessonPlan() || !user.isConnected) {
                this.getAssigments();
            }
            else {
                await this.getAssigments();
            }
        }
            // call API to get featured stories
            // store in config.featuredLessons
            // config.featuredLessons = [
            //     {
            //         "id": "drawshape0010",
            //         "image": "puzzle0010.png",
            //         "name": "Watermelon",
            //         "color": "#D48FF9",
            //         "course": "puzzle"
            //     },
            //     {
            //         "id": "hi1902",
            //         "image": "hi1902.png",
            //         "name": "पढ़ने के सुधार",
            //         "color": "#B8D855",
            //         "course": "hi"
            //     },
            //     {
            //         "id": "entest",
            //         "image": "en0805.png",
            //         "name": "New Story",
            //         "color": "#D48FF9",
            //         "course": "en"
            //     }
            // ]
            // const featuredLessonsUrl = 'https://raw.githubusercontent.com/chimple/chimple/master/featured_lessons.json'
            // cc.assetManager.loadRemote(featuredLessonsUrl, (err, jsonAsset) => {
            //     // @ts-ignore
            //     if (!err && jsonAsset && jsonAsset.json) {
            //         // @ts-ignore
            //         config.featuredLessons = jsonAsset.json
            //         if (config.featuredLessons.length > 0 && this.featuredButton) {
            //             this.featuredButton.interactable = true
            //         }
            //     }
            // })
            if (!config.course) {
                config.course = this.getNextCourse()
                config.startCourse = config.course
            } else {
                config.unsetRewardChapter()
                config.course = config.startCourse
            }
            this.createAndDisplayLessonPlan();
            this.displayCurrentReward();
            const headerNode = cc.instantiate(this.headerPrefab)
            const headerComp = headerNode.getComponent(StartHeader)
            headerComp.user = user
            headerComp.onCourseClick = this.onCourseClick.bind(this)
            this.header.addChild(headerNode)
            this.loading.active = false;
        if (mode == Mode.HomeConnect && !user.isConnected && !!user.schoolId) {
            this.showReConnectPopup("You are disconnected or class code is expired");
        }
        else if (mode == Mode.Home && user.isConnected) {
            this.showReConnectPopup("Re-Connect to your class using Student ID");
        }
    }

    async onLoad() {
        const user = User.getCurrentUser()
        this.bgHolder.removeAllChildren();

        cc.audioEngine.pauseMusic()
        if (!!user && !!user.currentBg) {
            Util.setBackground(user.currentBg, this.bgHolder);
        } else {
            Util.setBackground("camp", this.bgHolder);
        }
        const loadingComp = this.loading.getComponent(Loading)
        loadingComp.allowCancel = false

        const config = Config.i
        // this.library.string = config.course.name
        // Util.load(config.course.id + '/course/res/icons/' + config.course.id + '.png', (err: Error, texture) => {
        //     this.librarySprite.spriteFrame = err ? null : new cc.SpriteFrame(texture);
        // })

        const startAction = config.startAction
        this.gift = cc.instantiate(this.giftBoxPrefab)
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
        ChapterLessons.showType = ChapterLessonType.Library;
        UtilLogger.syncFmcTokenForUsers();

        // Sample Code for offline sync
        // const school = UtilLogger.findSchool("prakash@sutara.org");
        // cc.log("school:", school)
        //
        // const sections = UtilLogger.fetchSections("mYLtsjfVuFD6NGLLIVHG");
        // cc.log("sections:", sections);
        //
        // const students = UtilLogger.fetchStudents("mYLtsjfVuFD6NGLLIVHG", "D7qVA373VEKXtPeg7BEc");
        // cc.log("students:", students);
        // user.schoolId = "mYLtsjfVuFD6NGLLIVHG";
        // user.sectionId = "D7qVA373VEKXtPeg7BEc";
        // user.studentId = "61oKRmXrCWSGkjN2KuCv";

    }

    private showReConnectPopup(msg: string, title: string = "Do you want to connect now?") {
        const reConnectPopupNode = this.node.getChildByName("reconnect_popup");
        if (reConnectPopupNode.active == false) {
            reConnectPopupNode.getComponent(ReConnectPopup).msg.getComponent(ChimpleLabel).string = Util.i18NText(msg);
            reConnectPopupNode.getComponent(ReConnectPopup).text.getComponent(ChimpleLabel).string = Util.i18NText(title);
            reConnectPopupNode.active = true;
        }
    }

    private initPage() {
        const user = User.getCurrentUser()
        const config = Config.i
        // this.createAndDisplayLessonPlan();
        if (user.currentReward == null || user.currentReward.length == 0) {
            user.currentReward = this.getNextReward()
        }
        // this.displayCurrentReward()
        if (!Config.isMicroLink) {
            this.loading.active = false;
        }
        this.registerTeacherDialogCloseEvent();
        // const headerNode = cc.instantiate(this.headerPrefab)
        // const headerComp = headerNode.getComponent(StartHeader)
        // headerComp.user = user
        // headerComp.onCourseClick = this.onCourseClick.bind(this)
        // this.header.addChild(headerNode)
    }

    private createAndDisplayLessonPlan() {
        const user = User.getCurrentUser()
        const config = Config.i
        const courseProgressMap = user.courseProgressMap.get(config.course.id);
        if (courseProgressMap.lessonPlan
            && courseProgressMap.lessonPlan.length > 0
            && courseProgressMap.lessonPlanIndex <= courseProgressMap.lessonPlan.length) {
            this.displayLessonPlan();
        } else {
            this.createLessonPlan(config.course.id);
            this.displayLessonPlan();
        }
    }

    private getNextCourse() {
        const cpm = User.getCurrentUser().courseProgressMap
        const ar = Array.from(cpm.keys())
        try {
            ar.sort((a, b) => cpm.get(a).date.getTime() - cpm.get(b).date.getTime())
        } catch (error) {
            cc.log(error)
        }
        const mode = parseInt(Profile.getValue(CURRENTMODE))
        if (User.getCurrentUser().isConnected && mode != Mode.School) {
            if (this.isAssignmentsExistsInLessonPlan() || (!!Config.i.getAssignmentLessonsTodo() && Config.i.getAssignmentLessonsTodo().length > 0)) {
                return Config.i.curriculum.get(ASSIGNMENT_COURSE_ID);
            }
            return Config.i.curriculum.get(ar[0] === ASSIGNMENT_COURSE_ID ? ar[1] : ar[0]);
        } else {
            return Config.i.curriculum.get(ar[1] === ASSIGNMENT_COURSE_ID ? ar[0] : ar[1]);
        }
    }

    private registerTeacherDialogCloseEvent() {
        this.node.on(TEACHER_ADD_DIALOG_CLOSED, async (event) => {
            event.stopPropagation();
            this.scheduleOnce(() => {
                this.showTeacherDialog();
            }, 1)
        });
    }

    private loadLesson(data) {
        if (Config.isMicroLink && data && data.length > 0) {
            const user = User.getCurrentUser()
            const courseDetails = data.splice(data.length - 1, data.length)[0];
            if (cc.sys.isNative) {
                if (COURSES_LANG_ID.includes(courseDetails['courseid'])) {
                    const courseProgress = user.courseProgressMap.get(courseDetails['courseid']);
                    // if (courseProgress.currentChapterId == null) {
                    //     try {
                    //         this.loading.active = false;
                    //         const dialog = cc.instantiate(this.preTestPopup);
                    //         const script: PreTestDialog = dialog.getComponent(PreTestDialog)
                    //         script.courseId = courseDetails['courseid'];
                    //         this.node.addChild(dialog);
                    //     } catch (e) { }
                    // } else {
                    this.openDirectLesson(courseDetails);
                    // }
                } else {
                    this.openDirectLesson(courseDetails);
                }
            } else {
                this.openDirectLesson(courseDetails);
            }
        }
    }

    openDirectLesson(courseDetails: any) {
        this.loading.active = true;
        const input = {
            courseid: courseDetails['courseid'],
            chapterid: courseDetails['chapterid'],
            lessonid: courseDetails['lessonid'],
            assignmentid: courseDetails['assignmentid'] || null,
        }
        Util.loadDirectLessonWithLink(input, this.node)

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
                    if (script.validate().length > 0) {
                        this.node.addChild(teacherDialog);
                    }
                }
            }
        } catch (e) {

        }
    }

    private setUpTeacherDialog() {
        this.showTeacherDialog();
    }

    onProfileClick(event, customEventData) {
        const node = event.target
        const button = node.getComponent(cc.Button)
        if (button) button.interactable = false
        Config.i.pushScene('menu/rewards/scenes/rewards', 'menu')
    }

    onDairyRewardClick(event, customEventData) {
        const node = event.target
        const button = node.getComponent(cc.Button)
        if (button) button.interactable = false
        Config.i.pushScene('menu/rewards/scenes/dairyrewards', 'menu')
    }

    onAssignmentsClick() {
        // ChapterLessons.showType = ChapterLessonType.Assignments
        // Config.i.pushScene('menu/start/scenes/chapterLessons', 'menu')

        Config.i.pushScene('menu/Profile/scene/leaderboardProfile', 'menu')
    }

    onFeaturedClick() {
        ChapterLessons.showType = ChapterLessonType.Featured
        Config.i.pushScene('menu/start/scenes/chapterLessons', 'menu')
    }

    onLibraryClick() {
        this.node.getChildByName('library_button').getComponent(cc.Button).interactable = false
        Config.i.pushScene('menu/start/scenes/courseChapters', 'menu')
    }

    onCourseClick() {
        this.ctx.clear(true)
        this.createAndDisplayLessonPlan()
    }

    private createLessonPlan(courseId: string) {
        const user = User.getCurrentUser()
        const courseProgress = user.courseProgressMap.get(courseId)
        const course = Config.i.curriculum.get(courseId)
        if (courseId == ASSIGNMENT_COURSE_ID) {
            const lessonPlan = Config.i.getAssignmentLessonsTodo()
            if (lessonPlan != null && lessonPlan.length > 0) {
                courseProgress.lessonPlan = lessonPlan.slice(0, Math.min(5, lessonPlan.length)).map((les) => les.id)
                courseProgress.lessonPlanIndex = 0
                courseProgress.lessonPlanDate = new Date()
                user.storeUser()
            }
        } else {
            const currentChapter = course.chapters.find((chapter: Chapter) => chapter.id == courseProgress.currentChapterId)
            if (currentChapter &&
                (!courseProgress.currentLessonId
                    || !currentChapter.lessons.find(l => l.id == courseProgress.currentLessonId))) {
                courseProgress.currentLessonId = currentChapter.lessons[0].id
            }
            var lessons: Lesson[]
            if (course.id == 'puzzle') {
                lessons = []
                course.chapters.forEach((ch) => {
                    const puzLes = ch.lessons.find((l, i, ls) =>
                        !user.lessonProgressMap.has(l.id) || (i + 1 == ls.length)
                    )
                    if (puzLes) lessons.push(puzLes)
                })
            } else {
                if (!courseProgress.currentChapterId) {
                    lessons = [Start.preQuizLesson(course)]
                } else {
                    lessons = this.getLessonsForPlan(currentChapter, courseProgress.currentLessonId);
                    if (!lessons || lessons.length == 0) {
                        courseProgress.currentLessonId = currentChapter.lessons[0].id
                        lessons = this.getLessonsForPlan(currentChapter, courseProgress.currentLessonId);
                    }
                }
            }
            courseProgress.lessonPlan = lessons.map((l) => l.id)
            courseProgress.lessonPlanIndex = 0
            courseProgress.lessonPlanDate = new Date()
            user.storeUser()
        }
    }

    private getLessonsForPlan(currentChapter: Chapter, currentLessonId: string) {
        var lessons: Lesson[]
        let foundCurrentChapter = false;
        let foundChallenge = false;
        lessons = currentChapter.lessons.filter((lesson: Lesson) => {
            if (!foundCurrentChapter && lesson.id == currentLessonId) {
                foundCurrentChapter = true;
            }
            if (foundCurrentChapter && !foundChallenge) {
                if (!foundChallenge && lesson.type == EXAM) {
                    foundChallenge = true;
                }
                return true;
            }
            return false;
        });
        return lessons;
    }

    checkPendingAssignments() {
        let count: number = 0;
        for (let assign of Config.i.assignments) {
            const lesson = Config.i.allLessons.get(assign.lessonId)
            if (!!lesson) {
                const lessonProgress: LessonProgress = User.getCurrentUser().lessonProgressMap.get(assign.lessonId)
                if (!lessonProgress) {
                    count++;
                    // if (this.assignPopupActive) {
                    //     this.showAssignmentPopup(true);
                    //     this.assignPopupActive = false;
                    // }
                } else if (!!lessonProgress && ![].concat(lessonProgress.assignmentIds).includes(assign.assignmentId)) {
                    lesson.assignmentId = assign.assignmentId;
                    count++;
                    // if (this.assignPopupActive) {
                    //     this.showAssignmentPopup(true);
                    //     this.assignPopupActive = false;
                    // }
                }
            }
        }
        this.assignmentCount.getChildByName("count").getComponent(cc.Label).string = count.toString();
    }

    displayLessonPlan() {
        const user = User.getCurrentUser()
        const courseProgressMap = user.courseProgressMap.get(Config.i.course.id);
        this.content.removeAllChildren()
        if (courseProgressMap.lessonPlan != null && courseProgressMap.lessonPlan.length > 0) {

            //if courseId != ASSIGNMENT_COURSE_ID Enabling giftBox and rewardBg 
            this.node.getChildByName('rewardBg').active = true
            this.node.getChildByName('giftBox').active = true

            const planWidth = cc.winSize.width - 128
            const x1 = -planWidth / 2
            const y1 = -172
            const x2 = planWidth / 4
            const y2 = -172
            const x3 = -planWidth / 4
            const y3 = 172
            const x4 = planWidth / 2
            const y4 = 172

            this.ctx.moveTo(x1, y1)
            this.ctx.bezierCurveTo(x2, y2, x3, y3, x4, y4)
            this.ctx.stroke()

            courseProgressMap.lessonPlan.forEach((lessonId, index, lessons) => {
                const node: cc.Node = Start.createLessonButton(
                    lessonId.endsWith('_PreQuiz')
                        ? Start.preQuizLesson(Config.i.curriculum.get(lessonId.split('_')[0]))
                        : Config.i.allLessons.get(lessonId),
                    this.lessonButtonPrefab,
                    this.loading,
                    index <= courseProgressMap.lessonPlanIndex)
                // if (lessonId.endsWith('_PreQuiz')) {
                //     this.beginQuiz = node
                //     this.node.getChildByName('beginQuizPopup').active = true
                // }
                const t = index / lessons.length
                node.x = Math.pow(1 - t, 3) * x1 + 3 * Math.pow(1 - t, 2) * t * x2 + 3 * (1 - t) * Math.pow(t, 2) * x3 + Math.pow(t, 3) * x4
                node.y = Math.pow(1 - t, 3) * y1 + 3 * Math.pow(1 - t, 2) * t * y2 + 3 * (1 - t) * Math.pow(t, 2) * y3 + Math.pow(t, 3) * y4
                node.scale = 0.75
                this.content.addChild(node)
                if (index == courseProgressMap.lessonPlanIndex) {
                    const currentLessonNode = cc.instantiate(this.currentLessonButton)
                    var animationCmp = currentLessonNode.getComponent(cc.Animation);
                    animationCmp.play("level_play_button").repeatCount = 20

                    currentLessonNode.y = 80
                    currentLessonNode.scale = 1
                    const lessonButton = node.getComponent(LessonButton)
                    if (lessonButton) {
                        const clsprite = currentLessonNode.getChildByName('play button')
                        const clButton = clsprite.addComponent(cc.Button)
                        clButton.transition = cc.Button.Transition.SCALE
                        clButton.node.on('touchend', (event: cc.Event) => {
                            if (lessonButton.button.interactable) {
                                animationCmp.stop("level_play_button")
                                this.node.getChildByName('beginQuizPopup').active = false
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
            this.gift = cc.instantiate(this.giftBoxPrefab)
            this.gift.x = Math.pow(1 - 1, 3) * x1 + 3 * Math.pow(1 - 1, 2) * 1 * x2 + 3 * (1 - 1) * Math.pow(1, 2) * x3 + Math.pow(1, 3) * x4
            this.gift.y = Math.pow(1 - 1, 3) * y1 + 3 * Math.pow(1 - 1, 2) * 1 * y2 + 3 * (1 - 1) * Math.pow(1, 2) * y3 + Math.pow(1, 3) * y4
            // this.node.getChildByName('giftBox').addChild(this.gift)
            if (this.node.getChildByName('giftBox').getChildByName(this.gift.name) == undefined) {
                this.node.getChildByName('giftBox').addChild(this.gift)
                // this.displayCurrentReward();
            }
            if (courseProgressMap.lessonPlanIndex == courseProgressMap.lessonPlan.length) {
                this.giveReward(user)
            }
            Config.i.startAction = StartAction.Default
        } else {
            //if courseId == ASSIGNMENT_COURSE_ID Disabling giftBox and rewardBg 
            this.node.getChildByName('rewardBg').active = false
            if (this.disableGiftBoxNodeFlag) this.node.getChildByName('giftBox').active = false
            const label = new cc.Node()
            const chimpleLabel = label.addComponent(ChimpleLabel)
            chimpleLabel.string = 'No lessons found. Try another subject'
            this.content.addChild(label)
        }
    }

    onBeginQuizCancelClick() {
        this.node.getChildByName('beginQuizPopup').active = false
    }

    onBeginQuizButtonClicked() {
        const lessonButton = this.beginQuiz.getComponent(LessonButton)
        lessonButton.onClick()
        this.loading.active = true;
    }
    private giveReward(user: User) {
        console.log('giveReward node', this.node.getChildByName('giftBox').children[0])
        let node: cc.Node = this.node.getChildByName('giftBox').children[0];
        console.log('giveReward node', node)
        var seq = cc.repeat(
            cc.sequence(
                cc.scaleTo(0.3, 1.2, 1.2),
                cc.scaleTo(0.3, 1, 1)
            ), 100);
        node.runAction(seq);
        this.node.getChildByName('beginQuizPopup').active = false
        this.node.getChildByName('block').active = true
        new cc.Tween().target(node)
            .to(0.5, { position: cc.Vec3.ZERO }, null).start()
        this.node.getChildByName('giftBox').once('touchend', () => {
            new cc.Tween().target(node).call(() => {
                const anim = node.getComponent(cc.Animation);
                anim.play();
            }).delay(2).call(() => {
                this.unlockCurrentReward()
            })
                .start()
        })
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

    async showAssignmentPopup(pendingAssignment: boolean) {
        if (this.flag && !Config.isMicroLink) {
            this.flag = false;
            const user = User.getCurrentUser();
            this.assignments = await ServiceConfig.getI().handle.listAssignments(user.id);
            this.assignments = this.assignments.reverse();
            if (this.assignments.length > 0 && !pendingAssignment) {
                const currentHash = Util.getHash(this.assignments[0].assignmentId);
                Config.i.assignments = this.assignments;
                if (this.previousHash != currentHash) {
                    this.previousHash = currentHash;
                    const assignmentPopupNode = this.node.getChildByName("assignment_popup");
                    if (assignmentPopupNode.active == false) {
                        assignmentPopupNode.getComponent(AssignmentPopup).msg.getComponent(ChimpleLabel).string = "New assignment has been assigned to you";
                        assignmentPopupNode.active = true;
                    }
                }
            }

            if (pendingAssignment) {
                try {
                    const assignmentPopupNode = this.node.getChildByName("assignment_popup");
                    if (assignmentPopupNode.active == false) {
                        assignmentPopupNode.getComponent(AssignmentPopup).msg.getComponent(ChimpleLabel).string = "You have pending assignments";
                        assignmentPopupNode.active = true;
                    }
                } catch (e) { }
            }
            this.flag = true;
        }
    }

    private getNextReward(): string[] {
        //TODO Make this more general for other rewards also
        const course = Config.i.curriculum.get('reward')
        for (const chapter of course.chapters) {
            for (const lesson of chapter.lessons) {
                if (!User.getCurrentUser().unlockedRewards[`${REWARD_TYPES[4]}-${chapter.id}-${lesson.id}`])
                    return [REWARD_TYPES[4], chapter.id, lesson.id]
                for (const single of lesson.skills) {
                    if (!User.getCurrentUser().unlockedRewards[`${REWARD_TYPES[4]}-${chapter.id}-${lesson.id}-${single}`])
                        return [REWARD_TYPES[4], chapter.id, lesson.id, single]
                }
            }
        }
        return []
    }

    private displayCurrentReward() {
        if (this.gift) {
            const currentReward = User.getCurrentUser().currentReward;
            switch (currentReward[0]) {
                case REWARD_TYPES[0]: //character
                    cc.resources.load(`char_icons/${currentReward[1]}_icon`, (err, sp) => {
                        const image = new cc.Node()
                        const imageComp = image.addComponent(cc.Sprite)
                        // @ts-ignore
                        imageComp.spriteFrame = new cc.SpriteFrame(sp)
                        // this.gift.addChild(image)
                        Util.resizeSprite(imageComp, 64, 64)
                        this.toAddGiftBoxNode(image, sp)
                    })
                    break;
                case REWARD_TYPES[1]: //background
                    cc.resources.load(`backgrounds/textures/bg_icons/background-${currentReward[1]}`, (err, sp) => {
                        const image = new cc.Node()
                        const imageComp = image.addComponent(cc.Sprite)
                        // @ts-ignore
                        imageComp.spriteFrame = new cc.SpriteFrame(sp)
                        // this.gift.addChild(image)
                        Util.resizeSprite(imageComp, 64, 64)
                        this.toAddGiftBoxNode(image, sp)
                    })
                    break;
                case REWARD_TYPES[2]: //achievement
                    // NA
                    break;
                case REWARD_TYPES[3]: //inventory
                    cc.resources.load(INVENTORY_ICONS[currentReward[2]] + currentReward[3], (err, sp) => {
                        if (err) {
                            cc.log(JSON.stringify(err))
                        } else {
                            const image = new cc.Node()
                            const imageComp = image.addComponent(cc.Sprite)
                            // @ts-ignore
                            imageComp.spriteFrame = new cc.SpriteFrame(sp)
                            // this.gift.addChild(image)
                            Util.resizeSprite(imageComp, 64, 64)
                            this.toAddGiftBoxNode(image, sp)
                        }
                    })

                    break;
                case REWARD_TYPES[4]: //lesson
                    if (currentReward[1] == 'sticker') {
                        Config.loadBundle(currentReward[2], (bundle) => {
                            bundle.load(`res/${currentReward[1]}-${currentReward[2]}`, cc.Texture2D, (err, asset) => {
                                if (err) {
                                    cc.log(JSON.stringify(err))
                                } else {
                                    const image = new cc.Node()
                                    const imageComp = image.addComponent(cc.Sprite)
                                    imageComp.spriteFrame = new cc.SpriteFrame(asset)
                                    this.rewardBg.addChild(image)
                                }
                            })
                            bundle.load(`res/${currentReward[3]}`, cc.Texture2D, (err, asset) => {
                                if (err) {
                                    cc.log(JSON.stringify(err))
                                } else {
                                    const image = new cc.Node()
                                    const imageComp = image.addComponent(cc.Sprite)
                                    imageComp.spriteFrame = new cc.SpriteFrame(asset)
                                    // this.gift.addChild(image)
                                    Util.resizeSprite(imageComp, 64, 64)
                                    this.toAddGiftBoxNode(image, asset)
                                }
                            })
                        },
                            (err) => {
                                if (err) cc.log(JSON.stringify(err))
                            })
                    } else {
                        const image = new cc.Node()
                        const imageComp = image.addComponent(cc.Sprite)
                        imageComp.spriteFrame = new cc.SpriteFrame();
                        const lesson = Config.i.allLessons.get(currentReward[2])
                        Util.load('reward/course/res/icons/' + lesson.image, (err, texture) => {
                            if (!err) {
                                imageComp.spriteFrame = new cc.SpriteFrame(texture);
                                // this.gift.addChild(image)
                                Util.resizeSprite(imageComp, 64, 64)
                                this.toAddGiftBoxNode(image, texture)
                            }
                        })
                    }
                    break;
                default:
                    break;
            }
        }
        //TODO just for testing
        // this.gift.once('touchend', () => this.unlockCurrentReward())
    }

    toAddGiftBoxNode(image: cc.Node, type) {
        this.gift.addChild(image);

        const imageComp = new cc.Node().addComponent(cc.Sprite)
        imageComp.spriteFrame = new cc.SpriteFrame(type);

        let sprite: cc.SpriteFrame = new cc.SpriteFrame(type), width: number = 64, height: number = 64, max: number = 1
        const { scale, size } = Util.minScale(imageComp, width, height, max);
        console.log('const size = sprite.getOriginalSize();', imageComp.spriteFrame.getOriginalSize(), size, 'scale', scale)
        console.log('scale * size.width, scale * size.height', scale * size.width, scale * size.height)

        if (this.node.getChildByName('giftBox').getChildByName(this.gift.name) == undefined) {
            this.node.getChildByName('giftBox').addChild(this.gift)
            const planWidth = cc.winSize.width - 128
            const x1 = -planWidth / 2
            const y1 = -172
            const x2 = planWidth / 4
            const y2 = -172
            const x3 = -planWidth / 4
            const y3 = 172
            const x4 = planWidth / 2
            const y4 = 172
            this.gift.x = Math.pow(1 - 1, 3) * x1 + 3 * Math.pow(1 - 1, 2) * 1 * x2 + 3 * (1 - 1) * Math.pow(1, 2) * x3 + Math.pow(1, 3) * x4
            this.gift.y = Math.pow(1 - 1, 3) * y1 + 3 * Math.pow(1 - 1, 2) * 1 * y2 + 3 * (1 - 1) * Math.pow(1, 2) * y3 + Math.pow(1, 3) * y4
            this.node.getChildByName('giftBox').children[0].getChildByName(image.name).width = scale * size.width;
            this.node.getChildByName('giftBox').children[0].getChildByName(image.name).height = scale * size.height;
        } else {

            if (this.node.getChildByName('giftBox').children[0].getChildByName(image.name) != undefined) {
                // @ts-ignore
                this.node.getChildByName('giftBox').children[0].getChildByName(image.name).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(type)
                this.node.getChildByName('giftBox').children[0].getChildByName(image.name).width = scale * size.width;
                this.node.getChildByName('giftBox').children[0].getChildByName(image.name).height = scale * size.height;
            }
        }

        console.log('addGiftBox called', Config.i.course.id)
        const user = User.getCurrentUser()
        const courseProgressMap = user.courseProgressMap.get(Config.i.course.id);

        if (!this.disableGiftBoxNodeFlag && user.isConnected && Config.i.course.id == ASSIGNMENT_COURSE_ID
            && (courseProgressMap.lessonPlan == null || courseProgressMap.lessonPlan.length <= 0)) {
            console.log('if called')
            this.node.getChildByName('giftBox').active = false
            this.disableGiftBoxNodeFlag = true
        } else if (User.getCurrentUser().isConnected && Config.i.course.id != ASSIGNMENT_COURSE_ID) {
            console.log('if called')
            this.disableGiftBoxNodeFlag = true
        }

    }

    private unlockCurrentReward() {
        const currentReward = User.getCurrentUser().currentReward;
        User.getCurrentUser().unlockRewardsForItem(currentReward.join('-'), 1)
        const cpm = User.getCurrentUser().courseProgressMap.get(Config.i.course.id)
        cpm.lessonPlan = []
        cpm.lessonPlanIndex = 0
        User.getCurrentUser().currentReward = null

        switch (currentReward[0]) {
            case REWARD_TYPES[0]: //character
                Config.i.pushScene('menu/rewards/scenes/rewards', 'menu')
                break;
            case REWARD_TYPES[1]: //background
                Config.i.pushScene('menu/rewards/scenes/rewards', 'menu')
                break;
            case REWARD_TYPES[2]: //achievement
                // NA
                break;
            case REWARD_TYPES[3]: //inventory
                Config.getInstance().pushScene("menu/inventory/scenes/inventory", "menu");
                break;
            case REWARD_TYPES[4]: //lesson
                Config.i.setRewardChapter(currentReward[1])
                Util.loadLesson(Config.i.allLessons.get(currentReward[2]), this.loading, this.node)
                break;
            default:
                break;
        }

    }

    private isAssignmentsExistsInLessonPlan(): boolean {
        const user = User.getCurrentUser()
        const courseProgressMap = user.courseProgressMap.get(ASSIGNMENT_COURSE_ID);
        return (courseProgressMap.lessonPlan
            && courseProgressMap.lessonPlan.length > 0
            && courseProgressMap.lessonPlanIndex <= courseProgressMap.lessonPlan.length)
    }

    private async getAssigments() {
        const config = Config.i
        const mode = parseInt(Profile.getValue(CURRENTMODE))
        const user = User.getCurrentUser()
        this.assignments = await ServiceConfig.getI().handle.listAssignments(user.id)
        config.assignments = this.assignments;
        if (config.assignments.length > 0 || !user.isConnected) {
            if (config.assignments.length > 0 && !user.isConnected && mode != Mode.HomeConnect) {
                user.isConnected = true
                user.storeUser()
            }
            if (!!this.assignmentButton) {
                this.assignmentButton.interactable = true
            }
        }


        if (user.isConnected && config.assignments.length > 0) {
            this.previousHash = Util.getHash(this.assignments[0].assignmentId);
            try {
                this.assignmentCount.active = true;
                this.checkPendingAssignments();
            } catch (e) { }
        }
    }

    // protected update(dt: number) {
    //     if (RECEIVED_TEACHER_REQUESTS) {
    //         // @ts-ignore
    //         RECEIVED_TEACHER_REQUESTS = false;
    //         this.setUpTeacherDialog();
    //     } else if (Config.isMicroLink) {
    //         const dataStr: string = cc.sys.localStorage.getItem(MICROLINK);
    //         cc.sys.localStorage.removeItem(MICROLINK);
    //         if (!!dataStr && dataStr.length > 0) {
    //             let data: any[] = JSON.parse(dataStr) || [];
    //             if (data && data.length > 0) {
    //                 this.loadLesson(data);
    //             }
    //         }
    //     }
    //     // if(this.node.active && User.getCurrentUser().isConnected){
    //     //     this.timer += Math.floor(dt * 100);
    //     //     if(this.timer > 300){
    //     //         this.timer = 0;
    //     //         this.showAssignmentPopup(false);
    //     //     }
    //     // }
    // }
}


