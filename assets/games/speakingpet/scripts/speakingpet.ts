import Config from "../../../common/scripts/lib/config";
import DropCow from "./dropCow";
import DragHay from "./dragHay";
import Drag from "../../../common/scripts/drag";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";
import Game from "../../../common/scripts/game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SpeakingPet extends Game {
    @property(cc.Node)
    hay1: cc.Node = null;

    @property(cc.Node)
    hay2: cc.Node = null;

    @property(cc.Node)
    hay3: cc.Node = null;

    @property(cc.Node)
    hay4: cc.Node = null;

    @property(cc.Node)
    cow1: cc.Node = null;

    @property(cc.Node)
    cow2: cc.Node = null;

    private _numHays: number = 4;

    @catchError()
    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        Drag.letDrag = false
        const cow1Pos = this.cow1.getPosition()
        const cow2Pos = this.cow2.getPosition()
        this.cow1.position = cc.v2(cow1Pos.x - 1000, cow1Pos.y)
        this.cow2.position = cc.v2(cow2Pos.x + 1000, cow2Pos.y)

        const row = Config.getInstance().data[0];
        const [level, worksheet, problem, soundA, soundB, hay1Word, hay1Sound, hay1Phonic, hay1PhonicPlace, hay2Word, hay2Sound, hay2Phonic, hay2PhonicPlace, hay3Word, hay3Sound, hay3Phonic, hay3PhonicPlace, hay4Word, hay4Sound, hay4Phonic, hay4PhonicPlace] = row;

        const dropCow1 = this.cow1.getComponent(DropCow);
        dropCow1.soundName = soundA;
        this.cow1.name = 'A';

        const dropCow2 = this.cow2.getComponent(DropCow);
        dropCow2.soundName = soundB;
        this.cow2.name = 'B';

        const hays = [this.hay1, this.hay2, this.hay3, this.hay4]
        Util.shuffle(hays)
        this._makeHay(hays[0], hay1Word, hay1Sound, hay1Phonic, hay1PhonicPlace);
        this._makeHay(hays[1], hay2Word, hay2Sound, hay2Phonic, hay2PhonicPlace);
        this._makeHay(hays[2], hay3Word, hay3Sound, hay3Phonic, hay3PhonicPlace);
        this._makeHay(hays[3], hay4Word, hay4Sound, hay4Phonic, hay4PhonicPlace);

        this._moveCows(true)
    }

    private _moveCows(moveIn: boolean) {
        const cow1Pos = this.cow1.getPosition()
        const cow2Pos = this.cow2.getPosition()
        if (moveIn) {
            cow1Pos.x += 1000
            cow2Pos.x -= 1000
        } else {
            cow1Pos.x -= 1000
            cow2Pos.x += 1000
        }

        new cc.Tween().target(this.cow1)
            .to(0.5, { position: cow1Pos }, null)
            .call(() => {
                if (moveIn) {
                    this.cow1.getComponent(DropCow).playSound()
                }
            })
            .delay(1)
            .call(() => {
                new cc.Tween().target(this.cow2)
                    .to(0.5, { position: cow2Pos }, null)
                    .call(() => {
                        if (moveIn) {
                            this.cow2.getComponent(DropCow).playSound()
                            this.scheduleOnce(() => {
                                Drag.letDrag = true
                                Util.showHelp(this.hay1, this.cow1.name == this.hay1.name ? this.cow1 : this.cow2)
                            }, 0.5)
                        }
                    })
                    .start()
            })
            .start()
    }

    private _makeHay(hayNode: cc.Node, text: string, soundName: string, phonic: string, phonicPlace: string) {
        const dragHay = hayNode.getComponent(DragHay);
        dragHay.soundName = soundName;
        hayNode.name = phonic;
        hayNode.on('dragHayDone', this._dragDone, this);
        hayNode.on('dragHayWrong', () => {
            this.node.emit('wrong')
        })
        const places = phonicPlace.split(',');
        const phonicBegin = parseInt(places[0]); //1 based, not 0 based
        const phonicEnd = parseInt(places[places.length - 1]); //1 based, not 0 based
        //@ts-ignore
        var splitter = new GraphemeSplitter()
        const graphemes = splitter.splitGraphemes(text)
        const begin = graphemes.slice(0, phonicBegin - 1).join('')
        const end = graphemes.slice(phonicEnd).join('')
        const mid = graphemes.slice(phonicBegin - 1, phonicEnd).join('')

        // const begin = text.substring(0, phonicBegin - 1);
        // const end = text.substring(phonicEnd);
        // const mid = text.substring(phonicBegin - 1, phonicEnd);
        dragHay.text = begin + '<color=#DCC994>' + mid + '</color>' + end;

    }

    @catchError()
    private _dragDone() {
        this.node.emit('correct')
        if (--this._numHays <= 0) {
            this.cow1.getComponent(DropCow).beHappy()
            this.cow2.getComponent(DropCow).beHappy()
            this.scheduleOnce(() => {
                this._moveCows(false)
            }, 2)
            this.scheduleOnce(() => {
                this.node.emit('nextProblem');
            }, 4)
        }
    }

}
