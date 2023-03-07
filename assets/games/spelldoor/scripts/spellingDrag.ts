import Drag from "../../../common/scripts/drag";
import { Util } from "../../../common/scripts/util";
import LessonController from "../../../common/scripts/lessonController";
import Config from "../../../common/scripts/lib/config";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SpellingDrag extends Drag {
    private _soundClip: cc.AudioClip = null;

    onLoad() {
        super.onLoad()
        const config = Config.getInstance();
        const [level, worksheet, problem, word, missingPos, totalConsonants, totalVowels, image, sound, isLetterVoice] = config.data[0];
        this.label.string = Config.wide ? ' ' + this.node.name + ' ' : this.node.name

        if (isLetterVoice === 'true' || isLetterVoice === 'True') {
            Util.loadsLetter(this.node.name.toLowerCase(), (clip) => {
                this._soundClip = clip
            })
        } else {
            Util.loadsPhonicsOrLetter(this.node.name.toLowerCase(), (clip) => {
                this._soundClip = clip
            })
        }
    }

    start() {
        this.label.node.width = this.label.node.width * 2
    }

    onTouchStart(touch: cc.Touch) {
        super.onTouchStart(touch)
        if (this._soundClip != null) {
            try {
                LessonController.getFriend().speak(this._soundClip)
            } catch (error) {
                console.log('Failed playing sound')
            }
        }
    }

    onTouchEnd(touch: cc.Touch) {
        const allowDrag = this.allowDrag
        super.onTouchEnd(touch)
        if(allowDrag && this.isMoved) {
            if (this.match) {
                this.node.emit('spellingMatch', this)
            } else {
                this.node.emit('spellingNoMatch')
            }    
        }
    }
}
