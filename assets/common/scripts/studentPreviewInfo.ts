import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import {User} from "./lib/profile";

export const TEACHER_ADD_STUDENT_SELECTED = 'TEACHER_ADD_STUDENT_SELECTED';
@ccclass
export default class StudentPreviewInfo extends cc.Component {
    @property(cc.Node)
    picNode: cc.Node = null;

    @property(cc.Node)
    usernameNode: cc.Node = null;

    private _user: User = null;

    private _parent: cc.Node = null;

    protected onLoad() {

    }

    renderStudent() {
        let picNode = this.picNode;
        if (!!this._user.imgPath) {
            cc.loader.load(this._user.imgPath, function (err, texture) {
                if (!err) {
                    let temp = new cc.SpriteFrame(texture)
                    picNode.getComponent(cc.Sprite).spriteFrame = temp;
                }
            });
        } else if (!!this._user.avatarImage) {
            cc.resources.load(`avatars/${this._user.avatarImage}`, (err, sp) => {
                // @ts-ignore
                this.picNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(sp);
            });
        }
        this.usernameNode.getComponent(cc.Label).string = this._user.name || '';
    }

    setUser(_user: User) {
        this._user = _user;
    }

    onStudentClicked(event) {
        this._parent.children.forEach(
            c => {
                const pic: cc.Node = c.getChildByName("pic");
                if (pic) {
                    const select: cc.Node = pic.getChildByName("select");
                    select.active = false;
                }
            }
        )

        this.generateEvent();
    }

    generateEvent() {
        const selectNode: cc.Node = this.picNode.getChildByName("select");
        selectNode.active = true;

        const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(TEACHER_ADD_STUDENT_SELECTED, true);
        customEvent.setUserData({
            selectedStudent: this._user.id,
            studentName: this._user.name || ''
        });
        this.node.dispatchEvent(customEvent);

    }

    setParent(_parent: cc.Node) {
        this._parent = _parent;
    }
}