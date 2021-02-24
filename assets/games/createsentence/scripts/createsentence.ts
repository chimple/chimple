import Drag from "../../../common/scripts/drag";
import Game from "../../../common/scripts/game";
import Config, { Direction } from "../../../common/scripts/lib/config";
import catchError from "../../../common/scripts/lib/error-handler";
import { Util } from "../../../common/scripts/util";
import SentencemakerDrag from "./sentencemakerDrag";
const { ccclass, property } = cc._decorator;

@ccclass
export default class CreateSentence extends Game {
  @property(cc.Node)
  truck: cc.Node = null

  @property(cc.Sprite)
  picture: cc.Sprite = null

  @property(cc.Node)
  answer: cc.Node = null

  @property(cc.Node)
  choices: cc.Node = null

  @property(cc.Prefab)
  dropPrefab: cc.Prefab = null

  @property(cc.Prefab)
  dragPrefab: cc.Prefab = null

  // @property(cc.Node)
  // friendPos: cc.Node = null

  // friend: dragonBones.ArmatureDisplay = null
  // friend: Friend
  soundClip: cc.AudioClip = null
  numAnswers: number = 0
  onFinishTruckMoveTo: number
  isRTL: boolean = false

  @catchError()
  onLoad() {
    this.isRTL = Config.i.direction == Direction.RTL
    cc.director.getCollisionManager().enabled = true
    Drag.letDrag = false
    // Util.loadFriend((friendNode: cc.Node) => {
    //   this.friend = friendNode.getComponent(dragonBones.ArmatureDisplay)
    //   this.friendPos.addChild(friendNode)
    //   this.friend.playAnimation('face_eating', 1)
    // })
    // this.friend = LessonController.getFriend()
    // this.friendPos.addChild(this.friend.node)

    const [level, worksheet, problem, solution, wrong, image, sound] = Config.getInstance().data[0]

    Util.loadGameSound(sound, (clip) => {
      if (clip != null) {
        this.friend.extraClip = clip
      }
    })
    const picWidth = this.picture.node.width
    const picHeight = this.picture.node.height

    Util.loadTexture(image, (texture) => {
      this.picture.spriteFrame = new cc.SpriteFrame(texture)
      const size = this.picture.spriteFrame.getOriginalSize()
      const xScale = picWidth / size.width
      const yScale = picHeight / size.height
      const scale = Math.min(xScale, yScale)
      this.picture.node.width = scale * size.width
      this.picture.node.height = scale * size.height
    })
    this.onFinishTruckMoveTo = -cc.winSize.width
    const solutions = solution.split('/')
    if (this.isRTL) {
      solutions.reverse()
      this.onFinishTruckMoveTo = 2 * cc.winSize.width
      this.truck.scaleX = -1
    }
    this.numAnswers = solutions.length
    solutions.forEach((val) => {
      const drop = cc.instantiate(this.dropPrefab)
      drop.name = val
      this.answer.addChild(drop)
    })
    if (wrong.length > 0) {
      solutions.push(wrong)
    }
    Util.shuffle(solutions)
    var delay = 0
    solutions.forEach((val) => {
      const drag = cc.instantiate(this.dragPrefab)
      drag.name = val
      if (this.isRTL) {
        let newNode = new cc.Node()
        newNode.name = 'shouldFlip'
        drag.addChild(newNode)
      }
      drag.on('sentencemakerMatch', this.onMatch.bind(this))
      drag.on('sentencemakerNoMatch', () => {
        this.node.emit('wrong')
        // if (this.friend != null) this.friend.playAnimation('face_wrong', 1)
      })
      const dragComp = drag.getComponent(SentencemakerDrag)
      drag.getComponent(SentencemakerDrag).allowDrag = false;
      if (dragComp != null) {
        dragComp.label.string = val
      }
      const tempNode = new cc.Node()
      tempNode.name = val
      tempNode.addChild(drag)
      this.choices.addChild(tempNode)

      delay += 0.5
      new cc.Tween().target(drag)
        .set({ y: -300 })
        .delay(delay)
        .to(0.5, { y: 0 }, { progress: null, easing: 'cubicIn' })
        .start()

    })

    const truckX = this.truck.x
    new cc.Tween().target(this.truck)
      .set({ x: cc.winSize.width * (this.isRTL ? -1 : 1) })
      .to(3, { x: truckX + (this.isRTL ? 1000 : 0) }, { progress: null, easing: 'quadOut' })
      .call(() => {
        const anim = this.truck.getComponent(cc.Animation)
        anim.stop()
        Drag.letDrag = true
        const firstDrop = this.answer.children[0]
        const firstDrag = this.choices.getChildByName(firstDrop.name)
        if (firstDrag != null && firstDrag.childrenCount > 0) {
          Util.showHelp(firstDrag.children[0], firstDrop)
        }
        this.choices.children.forEach(child => {
          child.children[0].getComponent(SentencemakerDrag).allowDrag = true;
        })
      })
      .start()
  }

  onMatch() {
    this.node.emit('correct')
    // if (this.friend != null) this.friend.playAnimation('face_happy', 1)
    if (--this.numAnswers <= 0) {
      this.node.pauseSystemEvents(true);
      Drag.letDrag = false
      this.scheduleOnce(() => {
        this.friend.speakExtra(() => {
          const anim = this.truck.getComponent(cc.Animation)
          anim.play()
          new cc.Tween().target(this.truck)
            .to(3, { x: this.onFinishTruckMoveTo }, { progress: null, easing: 'quadOut' })
            .call(() => {
              this.node.emit('nextProblem')
            })
            .start()
        })
      }, 2)
    }
  }
}