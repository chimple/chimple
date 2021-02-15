import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import {LETTER_TRACING_CARD_EVENT, LETTER_TRACING_CARD_SCALE, WriteCard} from "./writecard";
import {Util} from "../../../common/scripts/util";
import {
    CONFIG_LOADED,
    TRACING_FINISHED,
    TRACING_CORRECT,
    TRACING_WRONG,
    RESET_TRACING
} from "../../../common/scripts/helper";
import TracingContainer from "../../../common/Tracing/scripts/tracing-container";
import LessonController from "../../../common/scripts/lessonController";
import TraceGraphics from "../../../common/Tracing/scripts/trace-graphics";

@ccclass
export class LetterTracingFrontCard extends cc.Component {
    @property(cc.Prefab)
    tracingContainerPrefab: cc.Prefab;

    private _optionIndex: number;
    private _tracingContainer: cc.Node = null;
    private _tracingContainerComponent: TracingContainer;
    private _traceGraphics: cc.Node = null;
    private _WriteCard: WriteCard;
    private _sound: any = null;

    protected onLoad(): void {
        this._WriteCard = this.node.parent.getComponent(WriteCard);
        this._tracingContainer = cc.instantiate(this.tracingContainerPrefab);
        this.node.parent.on(CONFIG_LOADED, () => {
            this.setAlphabetToDisplay(this._WriteCard.currentConfig.traceText);
            this.loadSounds(this._WriteCard.currentConfig.traceText);
            this.subScribeToTracingEvents();
        });
    }

    private subScribeToTracingEvents() {
        this.node.on(TRACING_FINISHED, (event) => {
            event.stopPropagation();
            this.tracingFinished();
        });

        this.node.on(TRACING_CORRECT, (event) => {
            event.stopPropagation();
            this.node.parent.emit('correct');
        });

        this.node.on(TRACING_WRONG, (event) => {
            event.stopPropagation();
            this.node.parent.emit('wrong');
        });
    }

    public resetTracing() {
        const traceGraphics: TraceGraphics = this._traceGraphics.getComponent(TraceGraphics);
        traceGraphics.resetGraphics();
    }

    private setAlphabetToDisplay(letter: string): void {
        this._tracingContainerComponent = this._tracingContainer.getComponent(TracingContainer);
        this._tracingContainerComponent.tracingLetter = letter;
        this._tracingContainerComponent.traceGenerationMode = false;
        this.node.addChild(this._tracingContainer);
        this._tracingContainer.setPosition(new cc.Vec2(-256, -350));
        this._tracingContainer.zIndex = 100;
        this._traceGraphics = this._tracingContainerComponent.traceGraphics;
        this._tracingContainerComponent._traceGraphicsComponent.adjustedScale = LETTER_TRACING_CARD_SCALE;

        this.node.on('cardEnabled', (index) => {
            if (this._optionIndex === index) {
                this._traceGraphics.emit('enabledGraphics');
            }
        });

    }

    loadSounds(text: string) {
        Util.loadsLetter(
            text.toLowerCase(), (clip) => {
                this._sound = clip;
                this.node.emit('soundLoaded');
            }
        );
    }

    protected pronounce() {
        LessonController.getFriend().speak(this._sound)
        // try {
        //     if (!!this._sound)
        //         this._soundID = Util.play(this._sound, false);
        // } catch (e) {

        // }
    }

    protected tracingFinished() {
        this.pronounce();
        this.clearGraphics();
        this.scheduleOnce(
            () => {
                const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(LETTER_TRACING_CARD_EVENT, true);
                customEvent.setUserData({
                    elementIndex: this.optionIndex
                });
                this.node.dispatchEvent(customEvent);
            }, 1
        );
    }

    clearGraphics() {
        this._tracingContainerComponent._traceGraphicsComponent.clear();
    }

    protected onDestroy(): void {
        cc.audioEngine.stopAllEffects();
    }

    get optionIndex() {
        return this._optionIndex;
    }

    set optionIndex(index) {
        this._optionIndex = index;
    }
}
