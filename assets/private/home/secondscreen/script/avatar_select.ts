import { User } from "../../../../common/scripts/lib/profile";
import { AVATARS } from "../../loginnew/scripts/cameraScene";
import EditProfile from "./editprofile";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AvatarSelect extends cc.Component {

    lastSelectedAvatar: number = -1;
    normalSprite: cc.SpriteFrame = null;

    @property(cc.Node)
    buttonContainerNode: cc.Node = null;

    @property(cc.Prefab)
    pageviewLayoutNode: cc.Prefab = null;

    @property(cc.Prefab)
    avatarPrefab: cc.Prefab = null;

    @property(cc.Button)
    rightButton: cc.Button = null;

    @property(cc.Button)
    leftButton: cc.Button = null;

    user: User;
    currentPage: number = 0;
    avatarsInSinglePage: number = 12;

    onLoad() {
        let counter = 0;
        let layoutContainer;
        let currentChildren = 0;
        for (let i = 0; i < AVATARS.length / this.avatarsInSinglePage; i++) {
            layoutContainer = cc.instantiate(this.pageviewLayoutNode)
            this.buttonContainerNode.addChild(layoutContainer)
        }
        AVATARS.forEach((ele, i) => {
            cc.resources.load(`avatars/${ele}`, (err, sp) => {
                if (counter === this.avatarsInSinglePage) {
                    counter = 0;
                    currentChildren++;
                }

                if (counter === 0) {
                    layoutContainer = this.buttonContainerNode.children[currentChildren]
                }
                let avatarPrefab = cc.instantiate(this.avatarPrefab);
                avatarPrefab.name = `${i}`
                let clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = "avatar_select";
                clickEventHandler.handler = "onAvatarButtonClick";
                clickEventHandler.customEventData = `${ele}`;

                let button1 = avatarPrefab.getComponent(cc.Button);
                button1.clickEvents.push(clickEventHandler);
                layoutContainer.addChild(avatarPrefab)
                // @ts-ignore
                avatarPrefab.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
                counter++;
                if (AVATARS[i] === this.user.avatarImage) {
                    layoutContainer.getChildByName(i.toString()).getChildByName("tick").active = true;
                }
            });
        })
    }

    onAvatarButtonClick(event, customEventData) {
        // // reset last selected first
        for (let i = 0; i < this.buttonContainerNode.childrenCount; i++) {
            for (let j = 0; j < this.buttonContainerNode.children[i].childrenCount; j++) {
                let currentNode = this.buttonContainerNode.children[i].children[j]
                currentNode.getChildByName("tick").active = false;
            }
        }
        event.currentTarget.getChildByName("tick").active = true

        let avatarImage = customEventData;
        this.node.active = false;
        this.node.parent.getChildByName("main_screen").active = true;
        this.user.avatarImage = avatarImage;
        cc.log('selected Avatar ', this.user.avatarImage);
        this.node.parent.getComponent(EditProfile).loadUserImageOrAvatar(this.user);
    }

    onRightScroll(event) {
        this.currentPage++;
        this.node.getChildByName("New PageView").getComponent(cc.PageView).setCurrentPageIndex(this.currentPage)
        if (this.currentPage === this.node.getChildByName("New PageView").getComponent(cc.PageView).getPages().length - 1) {
            this.rightButton.node.active = false;
        }
        if (this.currentPage === 1) {
            this.leftButton.node.active = true
        }
    }

    onLeftScroll(event) {
        this.currentPage--;
        this.node.getChildByName("New PageView").getComponent(cc.PageView).setCurrentPageIndex(this.currentPage)
        if (this.currentPage === 0) {
            this.leftButton.node.active = false
        }

        if (this.currentPage === this.node.getChildByName("New PageView").getComponent(cc.PageView).getPages().length - 2) {
            this.rightButton.node.active = true
        }

    }
}
