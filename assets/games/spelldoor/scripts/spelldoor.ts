import Config from "../../../common/scripts/lib/config";
import Drag from "../../../common/scripts/drag";
import SpellingDrag from "./spellingDrag";
import {Util} from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";
import {AlphabetUtil, LetterType} from "../../../common/scripts/Utility";
import Game from "../../../common/scripts/game";
import {SpellingDrop} from "./spellingDrop";
import Drop from "../../../common/scripts/drop";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SpellDoor extends Game {
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

    choices: Array<cc.Node> = []
    empty = 0

    @catchError()
    onLoad() {
        const config = Config.getInstance();
        cc.director.getCollisionManager().enabled = true
        Drag.letDrag = false
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
            const dropC: Drop = drop.getComponent(Drop);
            if(dropC) {
                dropC.allowDrop = false;
            }
            drop.name = val
            this.dropLayout.addChild(drop)
            const drag = this.createDrag(val);
            drop.addChild(drag)
            if (positions[index] == '*' || (this.empty == 0 && index == arr.length - 1)) {
                this.empty++
                const dropComponent: Drop = drag.parent.getComponent(Drop);
                if (dropComponent !== null) {
                    dropComponent.allowDrop = dropComponent.node.name === drag.name ? true : false;
                }
                this.choices.push(drag)
                if (firstDrag == null) {
                    firstDrag = drag
                    firstDrop = drop
                }
                new cc.Tween().target(drag)
                    .delay(3)
                    .to(0.5, {y: -cc.winSize.height}, null)
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
                    Util.resizeSprite(this.sprite, 370, 273)
                    Util.loadGameSound(sound, (clip) => {
                        if (clip != null) {
                            this.friend.extraClip = clip
                            this.friend.speakExtra()
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
            .set({y: -cc.winSize.height})
            .delay(5)
            .call(() => {
                Util.shuffle(this.choices)
                this.choices.forEach((drag) => {
                    if (drag.parent != null) {
                        drag.removeFromParent()

                        // @ts-ignore
                        drag.position = cc.Vec2.ZERO
                    }
                    const temp = new cc.Node()
                    temp.width = drag.width
                    temp.addChild(drag)
                    this.choiceLayout.addChild(temp)
                })
            })
            .to(0.5, {y: choiceY}, null)
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
            this.node.pauseSystemEvents(true);
            this.scheduleOnce(() => this.friend.speakExtra(this.endAnimate.bind(this)), 0.5)
        }
    }


    private endAnimate() {
        this.scheduleOnce(() => {
            this.anim.once('finished', () => {
                new cc.Tween().target(this.friendPos)
                    .delay(0.5)
                    .call(() => {
                        if (this.friend != null) this.friend.playAnimation('jumping', 1);
                    })
                    .to(1, {x: 0}, null)
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
