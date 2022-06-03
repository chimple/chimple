import Config from "../../../../common/scripts/lib/config";
import { User } from "../../../../common/scripts/lib/profile";
import { NUMBER_NAME, Util } from "../../../../common/scripts/util";

export enum ChildGuardMode {
    CHILD,
    ADULT
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChildGuard extends cc.Component {

    @property(cc.Node)
    inputEventBlocker: cc.Node = null;

    @property(cc.Node)
    keyboard: cc.Node = null;

    @property(cc.Node)
    headerNode: cc.Node = null;

    @property(cc.Sprite)
    userImg: cc.Sprite = null;

    @property(cc.Label)
    title: cc.Label = null;

    normalColor: cc.Color = new cc.Color().fromHEX('#3AA4F7');
    pressedColor: cc.Color = new cc.Color().fromHEX('#20CE7A');
    wrongColor: cc.Color = new cc.Color().fromHEX('#FF6E6E');
    userInput: string = "";
    passCode: string = "";
    mode: ChildGuardMode = ChildGuardMode.ADULT;
    userName: string = "";
    user: User;

    onEnable() {
        this.clearKeyboard();
        User.getUsers().forEach((e) => {
            if (this.userName == e.id) {
                this.user = e;
            }
        });

        if (this.mode == ChildGuardMode.CHILD) {
            this.loadUserImageOrAvatar(this.user);
            this.title.string = this.user.name
        }
        else {
            let code = Util.randomBetween(1, 10);
            let count = Util.randomBetween(1, 5);
            let str = Util.i18NText(`Click x1 times on number x2!`).replace(`x1`, Util.i18NText(NUMBER_NAME[count])).replace(`x2`, Util.i18NText(NUMBER_NAME[code]));
            this.title.string = str;
            let i = 0;
            while (i++ < count) {
                this.passCode += code.toString();
            }
        }
    }

    clearKeyboard() {
        this.keyboard.children.forEach((e, i) => {
            e.color = this.normalColor;
            e.getChildByName('label').color = this.normalColor;
        });
    }

    loadUserImageOrAvatar(currentUser) {
        if (currentUser.imgPath != '') {
            cc.loader.load(currentUser.imgPath, function (err, texture) {
                if (!err) {
                    let temp = new cc.SpriteFrame(texture)
                    this.userImg.spriteFrame = temp;
                }
            });
        }
        else {
            cc.resources.load(`avatars/${currentUser.avatarImage}`, (err, sp) => {
                // @ts-ignore
                this.userImg.spriteFrame = new cc.SpriteFrame(sp);
            });
        }
    }

    onWrongInput() {
        this.keyboard.children.forEach((e, i) => {
            let label = e.getChildByName('label').getComponent(cc.Label).string;
            if (this.userInput.includes(label)) {
                this.wrongAnimate(e);
            }
            e.getChildByName('label').color = this.normalColor;
        });
        this.userInput = "";
    }

    wrongAnimate(target: cc.Node) {
        let x = target.x;
        new cc.Tween()
            .target(target)
            .call(() => { target.color = this.wrongColor; target.getComponent(cc.Button).interactable = false; })
            .to(0.2, { x: x + 7 }, { progress: null, easing: t => t })
            .to(0.2, { x: x - 7 }, { progress: null, easing: t => t })
            .to(0.2, { x: x }, { progress: null, easing: t => t })
            .call(() => { target.color = this.normalColor; target.getComponent(cc.Button).interactable = true; })
            .start();
    }

    keyboardButton(event, data) {
        this.userInput = this.userInput.concat(data);
        this.unscheduleAllCallbacks();
        if (this.userInput == this.passCode) {
            this.navigate();
        }
        else {
            this.scheduleOnce(() => this.onWrongInput(), 1.7);
        }
        if (this.mode == ChildGuardMode.CHILD) {
            var node = event.target;
            node.color = this.pressedColor;
            node.getChildByName('label').color = this.pressedColor;
        }
    }

    onClickCancel() {
        this.node.active = false;
        this.title.string = "";
        this.userImg.spriteFrame = null;
        this.userInput = "";
        this.passCode = "";
    }

    navigate() {
        this.navigateToParentPage();
    }

    navigateToMenu() {
        //     User.setCurrentUser(this.user);
        //     /// unlock rewards
        //     this.unlockDebugRewards();
        //     Config.i.pushScene('menu/start/scenes/start', 'menu', null);
    }

    navigateToParentPage() {
        Config.getInstance().pushScene("private/home/secondscreen/scenes/profilePage", "private");
    }
}
