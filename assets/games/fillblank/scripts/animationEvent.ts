import Game from "../../../common/scripts/game";
import catchError from "../../../common/scripts/lib/error-handler";
const { ccclass, property } = cc._decorator;

@ccclass
export default class AnimationEvents extends cc.Component {
    @catchError()
    onRightAns(event) {
        cc.log("sdfsdhf awejsf ahgdsfvhdsGASDJS");
        const fillBlank = this.node.getParent()
        const game = fillBlank.getComponent(Game)
        game.friend.speakExtra(() => {
            var questionFadeOut = cc.moveTo(2, 0, 540)
            var nd = this.node.getParent().getChildByName("board_question_wordkicker")
            //this.node.getParent().getParent().getChildByName("board_question_wordkicker")
            nd.runAction(cc.sequence([questionFadeOut, cc.callFunc(this.nextQuestion, this)]))

            var buttonFadeOut = cc.moveTo(2, 0, -443)
            nd.getParent().getChildByName("buttons").runAction(buttonFadeOut)
        })

    }
    @catchError()
    nextQuestion() {
        this.node.getParent().emit('nextProblem');
    }

    // update (dt) {}
}
