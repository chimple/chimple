import Config from "../../../common/scripts/lib/config";
import { User } from "../../../common/scripts/lib/profile";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UserComponent extends cc.Component {

    user: User;

    onLoad() {
        this.node.getChildByName("Label").getComponent(cc.Label).string = this.user.name;
        this.node.getChildByName("Edit").on('touchend', () => this.onClickEdit(), this);
    }

    onClickEdit() {
        cc.sys.localStorage.setItem("userToEdit", this.user.id);
        Config.getInstance().pushScene('editProfile');
    }
}
