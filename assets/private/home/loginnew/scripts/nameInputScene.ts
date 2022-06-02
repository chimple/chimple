import CollectUserInfo from './collectUserInfo';
const { ccclass, property } = cc._decorator;

@ccclass
export default class NameInputScene extends cc.Component {

    @property(cc.Label)
    nameTextLabel: cc.Label = null;

    onLoad() {
        const editNode = this.node.getChildByName('usernameeditBox');
        this.node.getParent().getParent().getComponent(CollectUserInfo).disableButton();
        if (editNode != null) {
            editNode.on('text-changed', this.textChanged, this);
        }
    }

    private textChanged(editBox: cc.EditBox) {
        editBox.string == '' ?  this.node.getParent().getParent().getComponent(CollectUserInfo).disableButton():
                                this.node.getParent().getParent().getComponent(CollectUserInfo).enableButton();
            // set data in parent
            this.node.getParent().getParent().getComponent(CollectUserInfo).userName = editBox.string
    }

    onResetClick(event) {
        this.node.getChildByName("usernameeditBox").getComponent(cc.EditBox).string = ""
    }
}
