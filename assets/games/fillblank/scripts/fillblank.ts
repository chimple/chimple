import Config from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FillBlank extends cc.Component {
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

  @property(cc.Node)
  friendPos: cc.Node = null

  soundFile: string = null
  soundClip: cc.AudioClip = null

  disableCorrectButton: boolean = false;
  friend: dragonBones.ArmatureDisplay = null

  @property
  timeout;

  @catchError()
  onLoad() {
    Util.loadFriend((friendNode: cc.Node) => {
      this.friend = friendNode.getComponent(dragonBones.ArmatureDisplay)
      this.friendPos.addChild(friendNode)
      if (this.friend != null) this.friend.playAnimation('jumping', 1)
      new cc.Tween().target(friendNode)
        .set({ x: -cc.winSize.width })
        .to(1, { x: 0 }, null)
        .start()
    })

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
          this.soundClip = clip
          this.timeout = setTimeout(() => this.playsound(false, () => {
            Util.showHelp(answerNode, answerNode, () => {
              answerNode = this.enableButtons(node, answerNode, arr, true);
            })
          }), 2000)
        } else {
          this.scheduleOnce(() => {
            Util.showHelp(answerNode, answerNode, () => {
              answerNode = this.enableButtons(node, answerNode, arr, true);
            })
          }, 2)
        }
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
    const board = this.node.getChildByName("board_question_wordkicker")
    if (board != null) {
      const speaker = board.getChildByName("speaker")
      if (speaker != null) {
        if (this.soundFile != '') {
          speaker.on("click", () => {
            this.playsound(false, null)
          })
        } else {
          speaker.active = false
        }
      }
    }
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
  playsound(emit: boolean, callback: Function) {
    cc.log(this.node.name)
    let audioPlayButton = this.node.getChildByName("board_question_wordkicker").getChildByName("speaker").getComponent(cc.Button)
    audioPlayButton.interactable = false;
    var audioID = -1
    if (this.soundClip != null) {
      audioID = cc.audioEngine.play(this.soundClip, false, 1)
    }
    if (audioID >= 0) {
      if (emit) {
        if (this.friend != null) this.friend.playAnimation('dance', 1)
      }
      // if (callback != null) {
      cc.audioEngine.setFinishCallback(audioID, () => {
        audioPlayButton.getComponent(cc.Button).interactable = true
        if (callback != null)
          callback()
      });
      // }
    } else {
      if (emit) {
        if (this.friend != null) this.friend.playAnimation('dance', 1)
      }
      audioPlayButton.getComponent(cc.Button).interactable = true
      if (callback != null) {
        callback()
      }
    }
  }

  @catchError()
  callback(event) {
    cc.log(" y i m getting called" + event.node.name);

    if (!this.disableCorrectButton) {
      if (event.node.name === "button_" + this.ans_button) {
        cc.log("this is right answer");
        this.playsound(true, () => {
          this.node.emit('correct')
        })
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
        this.friend.playAnimation('sad', 1)
        this.node.getChildByName("buttons").getChildByName(event.node.name).getChildByName("Background").getComponent(cc.Sprite).spriteFrame = this.wrongSprite;
        // var makeButtonDisabled = this.node.getChildByName("buttons").getChildByName(event.node.name).getComponent(cc.Button)
        // makeButtonDisabled.interactable = false
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
  // update(dt) {  }

  @catchError()
  onDestroy() {
    clearTimeout(this.timeout);
  }
}
