import Config from "../../../common/scripts/lib/config";
import { CURRENT_STUDENT_ID, IS_REMEMBER_TOGGLE_ON, LOGGED_IN_USER, Mode } from "../../../common/scripts/lib/constants";
import Profile, { CURRENTMODE, User } from "../../../common/scripts/lib/profile";
import { ParseImageDownloader } from "../../../common/scripts/services/ParseImageDownloader";
import { LeaderboardInfo, StudentLeaderboardInfo } from "../../../common/scripts/services/ServiceApi";
import { ServiceConfig } from "../../../common/scripts/services/ServiceConfig";
import { Util } from "../../../common/scripts/util";
import { AVATARS } from "../../../private/home/loginnew/scripts/cameraScene";
import { SECTION_LIST } from "../../../private/school/scripts/landing";


const { ccclass, property } = cc._decorator;

@ccclass
export default class LeaderboardProfile extends cc.Component {

    @property(cc.Prefab)
    userPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    loadingPrefab: cc.Prefab = null;

    @property(cc.Node)
    leaderboardlayout: cc.Node = null;

    @property(cc.Node)
    firstStudent: cc.Node = null;

    @property(cc.Node)
    secondStudent: cc.Node = null;

    @property(cc.Node)
    thirdStudent: cc.Node = null;

    @property(cc.Node)
    userNode: cc.Node = null;

    @property(cc.Node)
    weeklyRank: cc.Node = null;

    @property(cc.Node)
    schoolName: cc.Node = null;

    @property(cc.Node)
    className: cc.Node = null;


    @property(cc.Node)
    allTimeRank: cc.Node = null;

    @property(cc.Node)
    otpDialog: cc.Node = null;

    @property(cc.Button)
    connectButton: cc.Button = null;

    private loading: cc.Node = null;
    private leaderboardJson: LeaderboardInfo = null;
    private weeklyIndex: number;
    private allTimeIndex: number;
    private user: User;


    onLoad() {
        this.createLoading()
        this.showLeaderoard()
    }

    async showLeaderoard() {
        this.showLoading()
        this.user = User.getCurrentUser();
        this.loadUserImageOrAvatar(this.user, this.userNode);
        // console.log(AVATARS)
        const mode = parseInt(Profile.getValue(CURRENTMODE))
        if (this.user.isConnected && mode != Mode.Home) {
            this.connectButton.interactable = false;
            this.connectButton.getComponentInChildren(cc.Label).string = "Connected";
            this.connectButton.node.color = new cc.Color(240, 88, 34);
        }
        if (Profile.getValue(CURRENTMODE) == Mode.School) {
            this.connectButton.node.active = false
        }
        if (this.user.schoolName) {
            this.schoolName.getComponent(cc.Label).string = Util.i18NText("School") + " : " + this.user.schoolName
        }
        if (this.user.sectionName) {
            this.className.getComponent(cc.Label).string = Util.i18NText("Class  :") + " " + this.user.sectionName
        }
        this.userNode.getComponentInChildren(cc.Label).string = this.user.name;
        this.leaderboardJson = await ServiceConfig.getI().handle.getLeaderboard(this.user.id, this.user.sectionId, this.user.schoolId,);
        this.weeklyIndex = this.leaderboardJson?.weekly?.map((v: StudentLeaderboardInfo) => v.userId)?.indexOf(this.user.id) ?? 0;
        this.allTimeIndex = this.leaderboardJson?.allTime?.map((v: StudentLeaderboardInfo) => v.userId)?.indexOf(this.user.id) ?? 0;
        if (this.weeklyIndex >= 0) {
            this.weeklyRank.getComponent(cc.Label).string = Util?.i18NText("This week rank") + " : " + (this.weeklyIndex + 1).toString() + " ";
        }
        if (this.allTimeIndex >= 0) {
            this.allTimeRank.getComponent(cc.Label).string = Util.i18NText("All time rank") + " : " + (this.allTimeIndex + 1).toString() + " ";
        }
        console.log("this leaderboard", this.leaderboardJson)
        this.loadUi(true)
        if ((mode == Mode.HomeConnect && !this.user.isConnected && !!this.user.schoolId) || (mode == Mode.Home && this.user.isConnected)) {
            this.otpDialog.active = true;
        }
    }

    loadUi(thisweek: boolean) {
        this.hideLoading()
        this.leaderboardlayout.removeAllChildren();
        const studentList: StudentLeaderboardInfo[] = thisweek ? this.leaderboardJson?.weekly : this.leaderboardJson?.allTime;
        const currentUserColor = new cc.Color(255, 85, 0);
        const availableWidth = cc.winSize.width - this.weeklyRank.parent.width;
        const student = cc.instantiate(this.userPrefab)
        const noOfColums: number = (((student.width * 3) <= availableWidth) ? 3 : (((student.width * 2) <= availableWidth) ? 2 : 1));
        const studentWidth = (availableWidth / noOfColums) - 10;
        for (let i = 0; i < studentList?.length; i++) {
            const isCurrentUser = thisweek ? (this.weeklyIndex === i) : (this.allTimeIndex === i);
            const totalScore = studentList[i].lessonsPlayed.toString();
            // const totalScore = studentList[i].total?.toFixed(0)?.toString();
            let maskedName = studentList[i].name?.trim() ?? "";
            if (!isCurrentUser) {
                try {
                    const regexExp = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
                    if (regexExp.test(maskedName)) {
                        maskedName = "****";
                    } else {
                        const mask = '*'.repeat(maskedName.length) || "***";
                        maskedName = maskedName[0] + mask.substring(0, 4) + maskedName[maskedName.length - 1];
                    }
                } catch (error) {
                    maskedName = "****";
                }
            } else {
                this.userNode.getChildByName('starscore').getComponentInChildren(cc.Label).string = totalScore;
                if (!!this.user?.name) {
                    maskedName = this.user.name;
                }
            }
            if (maskedName.length > 6) {
                maskedName = maskedName.substring(0, 5) + '..'
            }
            if (!maskedName) {
                maskedName = "*****"
            }
            if (i === 0) {
                this.firstStudent.getChildByName('name').getComponent(cc.Label).string = maskedName
                if (isCurrentUser) {
                    this.firstStudent.getChildByName('name').color = currentUserColor;
                }
                this.firstStudent.getChildByName('starscore').getComponentInChildren(cc.Label).string = totalScore;
            }
            else if (i === 1) {
                this.secondStudent.getChildByName('name').getComponent(cc.Label).string = maskedName
                if (isCurrentUser) {
                    this.secondStudent.getChildByName('name').color = currentUserColor;
                }
                this.secondStudent.getChildByName('starscore').getComponentInChildren(cc.Label).string = totalScore;

            }
            else if (i === 2) {
                this.thirdStudent.getChildByName('name').getComponent(cc.Label).string = maskedName
                if (isCurrentUser) {
                    this.thirdStudent.getChildByName('name').color = currentUserColor;
                }
                this.thirdStudent.getChildByName('starscore').getComponentInChildren(cc.Label).string = totalScore;

            }
            else {
                const student = cc.instantiate(this.userPrefab)
                const labelComponent = student.getChildByName('user').getComponentInChildren(cc.Label);
                student.getChildByName('name').getComponent(cc.Label).string = maskedName;
                if (isCurrentUser) {
                    student.getChildByName('name').color = currentUserColor;
                    student.getChildByName('bg').active = true;
                }
                student.width = studentWidth;
                this.loadRandomAvatar(student.getChildByName('user'), isCurrentUser);
                student.getChildByName('starscore').getComponentInChildren(cc.Label).string = totalScore;
                labelComponent.string = (i + 1).toString();
                this.leaderboardlayout.addChild(student)
            }
        }
        this.leaderboardlayout.width = availableWidth
        this.leaderboardlayout.parent.width = availableWidth
        this.leaderboardlayout.parent.parent.width = availableWidth
        this.leaderboardlayout.getComponent(cc.Layout).updateLayout()
        this.leaderboardlayout.parent.height = this.leaderboardlayout.height
    }

    // onTabClick(event)
    tabNavigator(event, value: string) {
        event.target.parent.children.forEach(e => e.getChildByName("Active Tab").active = false);
        event.target.getChildByName("Active Tab").active = true;
        this.loadUi(value === "weekly");
    }


    private createLoading() {
        this.loading = cc.instantiate(this.loadingPrefab);
        this.loading.zIndex = 3;
        this.node.addChild(this.loading);
        this.loading.active = false;
    }

    private showLoading() {
        this.loading.active = true;
        this.node.getChildByName('block').active = true;
    }

    private hideLoading() {
        this.loading.active = false;
        this.node.getChildByName('block').active = false;
    }

    private onHomeClick() {
        this.node.getChildByName('homebutton').getComponent(cc.Button).interactable = false;
        Config.i.pushScene('menu/start/scenes/start', 'menu');
    }

    private onLogoutButtonClick() {
        this.node.getChildByName('signout').getComponent(cc.Button).interactable = false;
        User.setCurrentUser(null);
        Config.i.popAllScenes();
        if (Profile.getValue(CURRENTMODE) == Mode.School) {
            if (cc.sys.localStorage.getItem(IS_REMEMBER_TOGGLE_ON) == null || cc.sys.localStorage.getItem(IS_REMEMBER_TOGGLE_ON) === "false") {
                Config.i.pushScene(SECTION_LIST, 'private', null);
            }
            else {
                Config.i.pushScene('private/school/scenes/currentLoggedUser', 'private', null);
            }
        }
        else {
            cc.director.loadScene("welcomePage")
        }
    }

    private onConnectClick() {
        this.otpDialog.active = true;
    }
    loadRandomAvatar(student: cc.Node, isCurrentUser = false) {
        if (isCurrentUser) {
            this.loadUserImageOrAvatar(User.getCurrentUser(), student);
            return;
        }
        let randomInt = Math.floor(Math.random() * ((AVATARS.length - 1) - 0 + 1) + 0)
        cc.resources.load(`avatars/${AVATARS[randomInt]}`, (err, sp) => {
            // @ts-ignore
            student.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
        });
    }

    loadUserImageOrAvatar(user: User, userNode: cc.Node) {
        if (user && user.studentId && user.studentId != '' && user.studentId.length > 0 && user.avatarImage == null) {
            ParseImageDownloader.loadImageForSchool(user.imgPath, user.studentId, (texture) => {
                if (!!texture && userNode) {
                    let spriteFrame: cc.SpriteFrame = new cc.SpriteFrame(texture);
                    const maskNode: cc.Node = userNode.getChildByName('mask');
                    if (maskNode) {
                        const image: cc.Node = maskNode.getChildByName('image');
                        image.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    }
                }
            });
        }
        else if (user && user.avatarImage && user.avatarImage.length > 0) {
            cc.resources.load(`avatars/${user.avatarImage}`, (err, sp) => {
                if (!err) {
                    // @ts-ignore
                    userNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
                }
            });
        }
    }
}