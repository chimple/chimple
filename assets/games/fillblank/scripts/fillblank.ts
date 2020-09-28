import Config from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";
import Game from "../../../common/scripts/game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FillBlank extends Game {
  @property(cc.Label)
  label: cc.Label = null;

  @property
  question: string = "";

  @property
  ans_button: Number = 0;

  @property(cc.SpriteFrame)
  rightSprite: cc.SpriteFrame = null;

  @property(cc.SpriteFrame)
  wrongSprite: cc.SpriteFrame = null;

  soundFile: string = null

  disableCorrectButton: boolean = false;

  // @catchError()
  onLoad() {
    new cc.Tween().target(this.friend.node)
      .set({ x: -cc.winSize.width })
      .to(1, { x: 0 }, null)
      .start()

    var answerNode: cc.Node = null
    Config.getInstance().data.forEach(row => {
      this.question = row[3];
      var startIndex = this.question.indexOf("[");
      var endIndex = this.question.indexOf("]");
      var ansString = this.question.substring(startIndex + 1, endIndex);
      this.question = this.question.replace(
        this.question.substring(startIndex, endIndex + 1),
        "______"
      );
      this.soundFile = row[4]
      Util.loadGameSound(this.soundFile, (clip) => {
        if (clip != null) {
          this.friend.extraClip = clip
        }
        this.scheduleOnce(() => {
          Util.showHelp(answerNode, answerNode, () => {
            answerNode = this.enableButtons(node, answerNode, arr, true);
          })
        }, 2)
      })

      var node = this.node;
      node
        .getChildByName("board_question_wordkicker")
        .getChildByName("question")
        .getComponent(cc.Label).string = this.question;

      /// button data  5,6,7[options]
      var arr = [ansString, row[5], row[6], row[7]];
      arr = this.shuffle(arr);

      this.ans_button = arr.indexOf(ansString) + 1;

      answerNode = this.enableButtons(node, answerNode, arr, false);
    });
  }


  @catchError()
  private enableButtons(node: cc.Node, answerNode: cc.Node, arr: string[], enable: boolean) {
    for (var i = 0; i < 4; i++) {
      var str = "button_";
      var temp = str + (i + 1);
      var tempNode = node.getChildByName("buttons").getChildByName(temp);
      if (i + 1 == this.ans_button) {
        answerNode = tempNode;
      }
      tempNode
        .getChildByName("Background")
        .getChildByName("Label")
        .getComponent(cc.Label).string = arr[i];
      if (enable) {
        tempNode.on("click", this.callback.bind(this), this);
      }
      else {
        tempNode.off("click", this.callback.bind(this), this);
      }
    }
    return answerNode;
  }

  @catchError()
  callback(event) {
    cc.log(" y i m getting called" + event.node.name);

    if (!this.disableCorrectButton) {
      if (event.node.name === "button_" + this.ans_button) {
        cc.log("this is right answer");
        this.node.emit('correct')
        this.disableCorrectButton = true
        //make all wrong buttons disabled
        for (var i = 1; i < 5; i++) {
          var tempButton = "button_"
          if (event.node.name != (tempButton + i)) {
            var makeButtonDisabled = this.node.getChildByName("buttons").getChildByName(tempButton + i).getComponent(cc.Button)
            makeButtonDisabled.interactable = false
          }
        }

        // set correct ans string
        var fullAnsString = this.question.replace("______", this.node.getChildByName("buttons").getChildByName(event.node.name).getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string);
        this.node.getChildByName("board_question_wordkicker").getChildByName("question").getComponent(cc.Label).string = fullAnsString
        // set right sprite
        this.node.getChildByName("buttons").getChildByName(event.node.name).getChildByName("Background").getComponent(cc.Sprite).spriteFrame = this.rightSprite;
        // get animation root node
        var rightAnimationNode = this.node.getChildByName("flower_anim")
        rightAnimationNode.x = 0
        // play right animation
        var playRightAnimation = rightAnimationNode.getComponent(cc.Animation)
        playRightAnimation.play()
      } else {
        this.node.emit('wrong');
        this.node.getChildByName("buttons").getChildByName(event.node.name).getChildByName("Background").getComponent(cc.Sprite).spriteFrame = this.wrongSprite;
        var wrongAnimationNode = this.node.getChildByName("flower_wrong")
        wrongAnimationNode.x = 140
        var playRightAnimation = wrongAnimationNode.getComponent(cc.Animation)
        playRightAnimation.play()
      }
    }
  }

  @catchError()
  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  @catchError()
  start() {
    var questionAction = cc.moveTo(1, 0, 278)
    this.node.getChildByName("board_question_wordkicker").runAction(questionAction);//runAction(questionAction)

    var buttonAction = cc.moveTo(1, 0, 0)
    this.node.getChildByName("buttons").runAction(buttonAction)
  }

}
