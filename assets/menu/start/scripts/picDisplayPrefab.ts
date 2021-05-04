import { User } from "../../../common/scripts/lib/profile";
import { ParseImageDownloader } from "../../../common/scripts/services/ParseImageDownloader";
import {Util} from "../../../common/scripts/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PicDisplayPrefab extends cc.Component {

    @property(cc.Node)
    picNode: cc.Node = null;

    @property(cc.Node)
    usernameNode: cc.Node = null;

    onLoad() {
        this.loadUserImageOrAvatar();
    }

    loadUserImageOrAvatar() {
        let currentUser = User.getCurrentUser();
        let picNode = this.picNode;
        if (currentUser && currentUser.studentId && currentUser.studentId != '' && currentUser.studentId.length > 0 && currentUser.avatarImage == null) {
            ParseImageDownloader.loadImageForSchool(currentUser.imgPath, currentUser.studentId, (texture) => {
                if (!!texture && picNode) {
                    let spriteFrame: cc.SpriteFrame = new cc.SpriteFrame(texture);
                    const maskNode: cc.Node = picNode.getChildByName('mask');
                    if (maskNode) {
                        const image: cc.Node = maskNode.getChildByName('image');
                        image.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    }
                }
            });
        }
        else {
            if(currentUser && currentUser.avatarImage && currentUser.avatarImage.length > 0) {
                cc.resources.load(`avatars/${currentUser.avatarImage}`, (err, sp) => {
                    // @ts-ignore
                    this.picNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
                });
            }
        }
        currentUser.name.length > 14? this.usernameNode.getComponent(cc.Label).string = currentUser.name.substring(0,14)+'...' : this.usernameNode.getComponent(cc.Label).string = currentUser.name;
    }
}
