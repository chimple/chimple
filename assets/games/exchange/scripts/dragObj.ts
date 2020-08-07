import Drag from "../../../common/scripts/drag";
import DropObj from "./dropObj";
import { Util } from "../../../common/scripts/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DragObj extends Drag {
    @property(cc.AudioClip)
    correctClip: cc.AudioClip = null;

    @property(cc.RichText)
    richTextNode: cc.RichText = null;

    private _text: string = null;
    private _soundName: string = null;
    private _soundClip: cc.AudioClip = null;

    get text(): string {
        return this._text;
    }

    set text(newVal) {
        this._text = newVal;
        this.richTextNode.string = newVal;
    }

    get soundName(): string {
        return this._soundName;
    }

    set soundName(newVal) {
        this._soundName = newVal;
        Util.loadGameSound(this._soundName, (clip) => {
            this._soundClip = clip;
        })
    }


    onTouchStart(touch: cc.Touch) {
        super.onTouchStart(touch);
        if(this._soundClip != null) {
            Util.play(this._soundClip, false);
        }
    }
    onTouchMove(touch: cc.Touch) {
        super.onTouchMove(touch);
        // console.log(this.node.position.x) //starts at 0,0 at center
        // console.log(touch.getLocationInView().x-cc.winSize.width/2) //positive value wrt canvas i.e starts at lower left vertex
         this.node.setPosition(this.node.position.x, touch.getDelta().y)
          if(this._soundClip != null) {
            Util.play(this._soundClip, false);
        }
    }

    onTouchEnd(touch: cc.Touch) {
        super.onTouchEnd(touch);
        if(this.match) {
            if(this._soundClip != null) {
                Util.play(this._soundClip, false);
            }
        } else {
            this.node.emit('dragHayWrong')
        }
    }


}
