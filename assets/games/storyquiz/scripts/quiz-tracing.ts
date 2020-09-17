import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import { QuizConfig } from "./quiz";
import catchError from "../../../common/scripts/lib/error-handler";
import { SingleLetterTracing } from "../../../common/Tracing/scripts/singlelettertracing";
import { Util } from "../../../common/scripts/util";
import { CONFIG_LOADED, GO_TO_NEXT_PROBLEM, Helper, MOVE_TO_NEXT_LETTER_EVENT } from "../../../common/scripts/helper";

@ccclass
export default class QuizTracing extends cc.Component {

    currentConfig: QuizConfig;
    quizDir: string;

    @property(cc.Node)
    words: cc.Node = null;

    @property(cc.Prefab)
    singleLetterPrefab: cc.Prefab = null;

    private characters: string[] = [];
    private _currentLetterIndex: number = 0;

    @catchError()
    protected onLoad(): void {
        if (this.currentConfig.choices.length === 1) {
            const word = this.currentConfig.choices[0].toUpperCase();
            this.characters = word.split('');
            const wordLayout = this.words.getComponent(cc.Layout);
            Helper.subScribeToTracingEvents(
                this.node, this.node, this.tracingFinished.bind(this)
            );
            this.words.setPosition(new cc.Vec2(cc.winSize.width, this.words.getPosition().y));
            Helper.buildLetters(this.node, this.words, this.characters, this.singleLetterPrefab, cc.winSize.width - 100, cc.winSize.height);
            this.node.emit(CONFIG_LOADED);
            this.emitLetterEnabledEvent(
                wordLayout.node.getChildByName('L0'), 0
            );

            // register
            this.node.on(MOVE_TO_NEXT_LETTER_EVENT, (event) => {
                event.stopPropagation();
                const data = event.getUserData();
                this.moveToNextLetter(data);
            });
        }
    }

    @catchError()
    private tracingFinished() {
        const wordLayout = this.words.getComponent(cc.Layout);
        const letterNode: cc.Node =
            wordLayout.node.getChildByName('L' + this._currentLetterIndex);
        letterNode.getComponent(SingleLetterTracing).pronounce();

        // this.pronounce();
        const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(MOVE_TO_NEXT_LETTER_EVENT, true);
        this._currentLetterIndex++;
        customEvent.setUserData({
            elementIndex: this._currentLetterIndex
        });
        this.node.dispatchEvent(customEvent);
    }

    @catchError()
    private emitLetterEnabledEvent(fNode: cc.Node, index: number) {
        fNode.emit('letterEnabledEvent', index);
    }

    @catchError()
    private moveToNextLetter(data) {
        const index = data.elementIndex;
        const wordLayout = this.words.getComponent(cc.Layout);
        if (index <= this.characters.length - 1) {
            const child = wordLayout.node.getChildByName('L' + index);
            this.minScrollToLeft(index, child);
            this.scrollToLeft(index, child);
        } else {
            const pronounce = this.quizDir + this.currentConfig.choicesSound + '.mp3';
            this.scheduleOnce(
                () => {
                    Util.speak(pronounce, () => {
                        this.node.dispatchEvent(new cc.Event.EventCustom(GO_TO_NEXT_PROBLEM, true));
                    });

                }, 1
            );
        }
    }

    @catchError()
    private minScrollToLeft(index: number, child: cc.Node) {
        const scrollToLeft = cc.winSize.width / 6;
        const wordLayout = this.words.getComponent(cc.Layout);
        const newPos = new cc.Vec2(wordLayout.node.position.x - scrollToLeft, wordLayout.node.position.y);
        this.tweenMove(wordLayout, newPos, index);
    }

    @catchError()
    private tweenMove(wordLayout: cc.Layout, newPos: cc.Vec2, index: number) {
        new cc.Tween().target(wordLayout.node)
            .to(0.5, {position: newPos}, {progress: null, easing: 'sineOut'})
            .call(() => {
                this.emitLetterEnabledEvent(
                    wordLayout.node.getChildByName('L' + index), index
                );
            })
            .start();
    }

    @catchError()
    private scrollToLeft(index: number, child: cc.Node) {
        const wordLayout = this.words.getComponent(cc.Layout);
        if (child.position.x - Math.abs(wordLayout.node.position.x / 2) + child.width * 1.0 > cc.winSize.width * 3 / 4) {
            const scrollToLeft = child.width * 1.1;
            const newPos = new cc.Vec2(wordLayout.node.position.x - scrollToLeft, wordLayout.node.position.y);
            this.tweenMove(wordLayout, newPos, index);
        } else {
            this.minScrollToLeft(index, child);
        }
    }
}
