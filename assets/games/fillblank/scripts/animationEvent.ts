import Config from "../../../common/scripts/lib/config";
import catchError from "../../../common/scripts/lib/error-handler";
const { ccclass, property } = cc._decorator;

@ccclass
export default class AnimationEvents extends cc.Component {
    start() {

    }
    @catchError()
    onRightAns(event) {
        cc.log("sdfsdhf awejsf ahgdsfvhdsGASDJS");
        var questionFadeOut = cc.moveTo(2, 0, 540)
        var nd = this.node.getParent().getChildByName("board_question_wordkicker")
        //this.node.getParent().getParent().getChildByName("board_question_wordkicker")
        nd.runAction(cc.sequence([questionFadeOut, cc.callFunc(this.nextQuestion, this)]))

        var buttonFadeOut = cc.moveTo(2, 0, -443)
        nd.getParent().getChildByName("buttons").runAction(buttonFadeOut)
    }
    @catchError()
    nextQuestion() {
        this.node.getParent().emit('nextProblem');
    }

    // update (dt) {}
}
