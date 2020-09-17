import Config from "../../../common/scripts/lib/config";
import Drag from "../../../common/scripts/drag";
import SpellingDrag from "./spellingDrag";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";
import { AlphabetUtil, LetterType } from "../../../common/scripts/Utility";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SpellDoor extends cc.Component {
    @property(cc.Node)
    dropLayout: cc.Node = null

    @property(cc.Node)
    choiceLayout: cc.Node = null

    @property(cc.Sprite)
    sprite: cc.Sprite = null

    @property(cc.Prefab)
    spellingDrag: cc.Prefab = null

    @property(cc.Prefab)
    spellingDrop: cc.Prefab = null

    @property(cc.Animation)
    anim: cc.Animation = null

    @property(cc.Node)
    friendPos: cc.Node = null

    friend: dragonBones.ArmatureDisplay = null
    choices: Array<cc.Node> = []
    clip: cc.AudioClip = null
    empty = 0

    @catchError()
    onLoad() {
        const config = Config.getInstance();
        cc.director.getCollisionManager().enabled = true
        Drag.letDrag = false
        Util.loadFriend((friendNode: cc.Node) => {
            this.friend = friendNode.getComponent(dragonBones.ArmatureDisplay)
            this.friendPos.addChild(friendNode)
            this.friend.playAnimation('sad', 1)
        })
        const [level, worksheet, problem, word, missingPos, totalConsonants, totalVowels, image, sound] = config.data[0]
        // const positions = missingPos.split('')
        var firstDrag: cc.Node = null
        var firstDrop: cc.Node = null
        //@ts-ignore
        var splitter = new GraphemeSplitter()
        const positions = splitter.splitGraphemes(missingPos)
        var numConsonants = parseInt(totalConsonants)
        var numVowels = parseInt(totalVowels)
        splitter.splitGraphemes(word).forEach((val, index, arr) => {
            if (AlphabetUtil.isConsonantOrVowel(val) == LetterType.Consonant) {
                numConsonants--
            } else {
                numVowels--
            }
            const drop = cc.instantiate(this.spellingDrop)
            drop.name = val
            this.dropLayout.addChild(drop)
            const drag = this.createDrag(val);
            drop.addChild(drag)
            if (positions[index] == '*' || (this.empty == 0 && index == arr.length - 1)) {
                this.empty++
                this.choices.push(drag)
                if (firstDrag == null) {
                    firstDrag = drag
                    firstDrop = drop
                }
                new cc.Tween().target(drag)
                    .delay(3)
                    .to(0.5, { y: -cc.winSize.height }, null)
                    .start()
            } else {
                drag.getComponent(SpellingDrag).allowDrag = false
            }
        })
        while (numConsonants-- > 0) {
            this.choices.push(this.createDrag(AlphabetUtil.getRandomConsonant().toLowerCase()))
        }
        while (numVowels-- > 0) {
            this.choices.push(this.createDrag(AlphabetUtil.getRandomVowel().toLowerCase()))
        }
        Util.loadTexture(image, (texture) => {
            this.anim.once('finished', () => {
                this.scheduleOnce(() => {
                    this.sprite.spriteFrame = new cc.SpriteFrame(texture)
                    Util.loadGameSound(sound, (clip) => {
                        if (clip != null) {
                            this.clip = clip
                            Util.play(clip, false)
                        }
                    })
                    const animState = this.anim.play()
                    animState.wrapMode = cc.WrapMode.Reverse
                }, 1)
            })
            this.scheduleOnce(() => {
                this.anim.play()
            }, 1)
        })
        const choiceY = this.choiceLayout.y
        new cc.Tween().target(this.choiceLayout)
            .set({ y: -cc.winSize.height })
            .delay(5)
            .call(() => {
                Util.shuffle(this.choices)
                this.choices.forEach((drag) => {
                    if (drag.parent != null) {
                        drag.removeFromParent()
                        drag.position = cc.Vec2.ZERO
                    }
                    const temp = new cc.Node()
                    temp.width = drag.width
                    temp.addChild(drag)
                    this.choiceLayout.addChild(temp)
                })
            })
            .to(0.5, { y: choiceY }, null)
            .call(() => {
                Util.showHelp(firstDrag, firstDrop)
                Drag.letDrag = true
            })
            .start()
    }

    private createDrag(val: string) {
        const drag = cc.instantiate(this.spellingDrag);
        drag.name = val;
        drag.on('spellingMatch', this.onMatch.bind(this))
        drag.on('spellingNoMatch', () => {
            this.node.emit('wrong')
        })
        return drag;
    }

    onMatch() {
        this.node.emit('correct')
        if (--this.empty <= 0) {
            Drag.letDrag = false
            if (this.clip != null) {
                this.scheduleOnce(() => Util.play(this.clip, false), 0.5)
            }
            this.endAnimate()
        }
    }

    private endAnimate() {
        this.scheduleOnce(() => {
            this.anim.once('finished', () => {
                new cc.Tween().target(this.friendPos)
                    .delay(0.5)
                    .call(() => {
                        if(this.friend != null) this.friend.playAnimation('jumping', 1);
                    })
                    .to(1, { x: 0 }, null)
                    .delay(1)
                    .call(() => {
                        this.node.emit('nextProblem');
                    })
                    .start();
            });
            const animState = this.anim.play();
            animState.wrapMode = cc.WrapMode.Normal;
        }, 1)
    }
}
