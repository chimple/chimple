import { User } from "../../../common/scripts/lib/profile";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PicDisplayPrefab extends cc.Component {

    @property(cc.Node)
    picNode: cc.Node = null;

    onLoad() {
        this.loadUserImageOrAvatar();
    }

    loadUserImageOrAvatar() {
        let currentUser = User.getCurrentUser();
        if (currentUser.imgPath != '') {
            cc.loader.load(currentUser.imgPath, function (err, texture) {
                if (!err) {
                    let temp = new cc.SpriteFrame(texture)
                    this.node.getComponent(cc.Sprite).spriteFrame = temp;
                }
            });
        }
        else {
            cc.resources.load(`avatars/${currentUser.avatarImage}`, (err, sp) => {
                // @ts-ignore
                this.picNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
            });
        }
    }
}
