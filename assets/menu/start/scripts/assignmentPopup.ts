import ChimpleLabel from "../../../common/scripts/chimple-label";
import { Util } from "../../../common/scripts/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AssignmentPopup extends cc.Component {

    @property(cc.Node)
    text: cc.Node = null;

    @property(cc.Node)
    yesButton: cc.Node = null;

    @property(cc.Node)
    block: cc.Node = null;

    @property(cc.Node)
    dialog: cc.Node = null;
    
    onLoad(){
        const chimpleLabel = this.text.getComponent(ChimpleLabel);
        chimpleLabel.string = Util.i18NText("You Received New Assignments");
    }

    onEnable(){
        this.dialog.active = true;
        this.block.active = true;
    }

    onDestroy(){
        this.node.destroy();

    }

    onClickOk(){
        this.dialog.active = false;
        this.block.active = false;
    }
}
