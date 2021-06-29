import { PictureMeaningType, PictureMeaningData } from "./picturemeaning";
import { Util } from "../../../common/scripts/util";

const { ccclass, property } = cc._decorator;

var handleClick: boolean = true

@ccclass
export default class WhatIsThisChoice extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null

    @property(cc.Sprite)
    image: cc.Sprite = null

    data: PictureMeaningData = null
    answerNode: cc.Node = null
    soundClip: cc.AudioClip = null

    onLoad() {
        handleClick = true
        if (this.data.type == PictureMeaningType.Sentence) {
            this.label.string = this.data.text
        } else {
            Util.loadTexture(this.data.pic, (texture) => {
                if (texture != null) {
                    this.image.spriteFrame = new cc.SpriteFrame(texture)
                    Util.resizeSprite(this.image, 260, 206)
                }
            })
        }
        Util.loadGameSound(this.data.sound, (clip) => {
            this.soundClip = clip
        })

    }

    makeInteractable(interactable: boolean) {
        this.node.parent.children.forEach((but) => {
            const butComp = but.getComponent(cc.Button)
            butComp.interactable = interactable
        })
    }
    onClick() {
        if (handleClick) {
            handleClick = false
            this.makeInteractable(false)
            if (this.soundClip != null) {
                this.scheduleOnce(() => {
                    Util.play(this.soundClip, false)

                }, 0.5)
            }
            if (this.data.index == 0) {
                this.node.emit('whatisthisCorrect')
            } else {
                this.node.emit('whatisthisWrong')
                const y = this.answerNode.y
                new cc.Tween().target(this.answerNode)
                    .to(0.5, { y: 0 }, { progress: null, easing: 'quadOut' })
                    .delay(3)
                    .to(0.5, { y: y }, { progress: null, easing: 'quadOut' })
                    .call(() => {
                        handleClick = true
                        this.makeInteractable(true)
                    })
                    .start()
            }
        }
    }
}
