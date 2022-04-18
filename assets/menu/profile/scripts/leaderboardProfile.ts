import Config from "../../../common/scripts/lib/config";
import { User } from "../../../common/scripts/lib/profile";
import { LeaderboardInfo, StudentLeaderboardInfo } from "../../../common/scripts/services/ServiceApi";
import { ServiceConfig } from "../../../common/scripts/services/ServiceConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LeaderboardProfile extends cc.Component {

    @property(cc.Prefab)
    maleUserPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    femaleUserPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    selfUserPrefab: cc.Prefab = null;

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


    onLoad() {
        this.createLoading()
        this.showLeaderoard()
    }

    async showLeaderoard() {
        this.showLoading()
        const user = User.getCurrentUser();
        this.loadUserImageOrAvatar(user, this.userNode);
        if (user.isConnected) {
            this.connectButton.interactable = false;
            this.connectButton.getComponentInChildren(cc.Label).string = "Connected"
        }
        if (user.schoolName) {
            this.schoolName.getComponent(cc.Label).string = "School: " + user.schoolName
        }
        if (user.sectionName) {
            this.className.getComponent(cc.Label).string = "Class: " + user.sectionName
        }
        this.userNode.getComponentInChildren(cc.Label).string = user.name;
        this.leaderboardJson = await ServiceConfig.getI().handle.getLeaderboard(user.id, user.sectionId, user.schoolId,);
        this.weeklyIndex = this.leaderboardJson.weekly.map((v: StudentLeaderboardInfo) => v.userId).indexOf(user.id);
        this.allTimeIndex = this.leaderboardJson.allTime.map((v: StudentLeaderboardInfo) => v.userId).indexOf(user.id);
        if (this.weeklyIndex >= 0) {
            this.weeklyRank.getComponent(cc.Label).string = "This week rank: " + (this.weeklyIndex + 1).toString();
        }
        if (this.allTimeIndex >= 0) {
            this.allTimeRank.getComponent(cc.Label).string = "All time rank: " + (this.allTimeIndex + 1).toString();
        }
        console.log("this leaderboard", this.leaderboardJson)
        this.loadUi(true)
    }

    loadUi(thisweek: boolean) {
        this.hideLoading()
        this.leaderboardlayout.removeAllChildren();
        const studentList: StudentLeaderboardInfo[] = thisweek ? this.leaderboardJson.weekly : this.leaderboardJson.allTime
        for (let i = 0; i < studentList.length; i++) {
            const isCurrentUser = thisweek ? (this.weeklyIndex === i) : (this.allTimeIndex === i);
            const name = isCurrentUser ? (studentList[i].name + " (You)") : studentList[i].name;
            if (i === 0) {
                this.firstStudent.getChildByName('name').getComponent(cc.Label).string = name
            }
            else if (i === 1) {
                this.secondStudent.getChildByName('name').getComponent(cc.Label).string = name
            }
            else if (i === 2) {
                this.thirdStudent.getChildByName('name').getComponent(cc.Label).string = name
            }
            else {
                const student = cc.instantiate(isCurrentUser ? this.selfUserPrefab : (Math.random() < 0.5 ? this.maleUserPrefab : this.femaleUserPrefab))
                const labelComponent = student.getChildByName('user').getComponentInChildren(cc.Label);
                let maskedName = studentList[i].name;

                if (!isCurrentUser ) {
                    const mask = maskedName.substring(1, maskedName.length - 1).replace(/./gi, "*") || "*";
                    maskedName = maskedName[0] + mask.substring(0, 4) + maskedName[maskedName.length - 1]
                }
                if (maskedName.length > 6) {    
                    maskedName = maskedName.substring(0, 5) + '..'
                }
                student.getChildByName('name').getComponent(cc.Label).string = maskedName;
                labelComponent.string = (i + 1).toString();
                this.leaderboardlayout.addChild(student)
            }
        }
        const availableWidth = cc.winSize.width - this.weeklyRank.parent.width;
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
    }

    private hideLoading() {
        this.loading.active = false;
    }

    private onHomeClick() {
        this.node.getChildByName('homebutton').getComponent(cc.Button).interactable = false;
        Config.i.pushScene('menu/start/scenes/start', 'menu');
    }

    private onSignoutClick() {
        this.node.getChildByName('signout').getComponent(cc.Button).interactable = false;
        Config.loadScene('private/home/loginnew/scenes/welcomePage', 'private', null);
    }
    private onConnectClick() {
        this.otpDialog.active = true;
    }

    loadUserImageOrAvatar(user: User, userNode: cc.Node) {
        if (user.imgPath && user.imgPath != '') {
            cc.loader.load(user.imgPath, function (err, texture) {
                if (!err) {
                    let temp = new cc.SpriteFrame(texture)
                    userNode.getComponent(cc.Sprite).spriteFrame = temp;
                }
            });
        } else {
            cc.resources.load(`avatars/${user.avatarImage}`, (err, sp) => {
                // @ts-ignore
                userNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
            });
        }
    }
}