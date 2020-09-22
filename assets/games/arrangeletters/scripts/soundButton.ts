// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ArrangeLetters from './arrangeLetters'
import { Util } from './../../../common/scripts/util'
const { ccclass, property } = cc._decorator;

@ccclass
export default class SoundClass extends cc.Component {
    isSoundPlaying: boolean = false;
    onClickButton() {
        if (!this.isSoundPlaying) {
            this.isSoundPlaying = true
            let audio =this.node.parent.parent.getComponent(ArrangeLetters).wordAudioFileName
            Util.speakPhonicsOrGameAudio(audio,
                () => { this.isSoundPlaying = false })
        }
    }
}
