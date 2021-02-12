import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import {CONFIG_LOADED} from "../../../common/scripts/helper";
import {Util} from "../../../common/scripts/util";
import TracingContainer from "../../../common/Tracing/scripts/tracing-container";
import WriteWord from "./writeword";


export const LETTER_SCALE = 0.95;
export const TRACE_NODE_POS_X = -256;
export const TRACE_NODE_POS_Y = -300;

@ccclass
export class SingleLetterTracing extends cc.Component {

    @property(cc.Prefab)
    tracingContainerPrefab: cc.Prefab;

    private _tracingContainer: cc.Node;
    private _tracingContainerComponent: TracingContainer = null;
    private _traceGraphics: cc.Node = null;
    private _letter: string = null;
    private _wordTracingContainer: cc.Node = null;
    private _wordTracingComponent: WriteWord = null;
    private _order: number;
    private _tracingScale: number = null;

    private _sound: any = null;
    private _soundID: number;

    protected onLoad(): void {
        let manager = cc.director.getCollisionManager();
        manager.enabled = false;
        this._wordTracingComponent = this._wordTracingContainer.getComponent(WriteWord);
        this._tracingContainer = cc.instantiate(this.tracingContainerPrefab);
        this._tracingContainer.scale = 0.75;
        this._wordTracingContainer.on(CONFIG_LOADED, () => {
            this.setAlphabetToDisplay(this._letter);
            this.loadSounds(this._letter);
        });
    }

    loadSounds(text: string) {
        try {
            const isString = isNaN(Number(text));
            if (isString) {
                Util.loadsPhonicsOrLetter(text.toLowerCase(), (clip) => {
                    this._sound = clip;
                });
            } else {
                Util.loadNumericSound(text, (clip) => {
                    this._sound = clip;
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    preloadSound(content: string, loadFrom: string) {
        // @ts-ignore
        const soundFile: string = loadFrom + content;
        Util.load(soundFile, (err, clip) => {
            if (!err && clip !== null) {
                this._sound = clip;
            }
        });
    }

    pronounce() {
        Util.speakPhonicsOrLetter(this._letter, () => {

        });
    }

    private setAlphabetToDisplay(letter: string): void {
        this._tracingContainerComponent = this._tracingContainer.getComponent(TracingContainer);
        this._tracingContainerComponent.tracingLetter = letter;
        this._tracingContainerComponent.traceGenerationMode = false;
        this.node.addChild(this._tracingContainer);
        if (this._tracingScale !== null) {
            this._tracingContainerComponent._traceGraphicsComponent.adjustedScale = this._tracingScale;
        } else {
            this._tracingContainerComponent._traceGraphicsComponent.adjustedScale = LETTER_SCALE;
        }
        this._traceGraphics = this._tracingContainerComponent.traceGraphics;
        this._tracingContainer.setPosition(new cc.Vec2(TRACE_NODE_POS_X, TRACE_NODE_POS_Y));
        this.node.on('letterEnabledEvent', (index, timeToEnable = 0) => {
            if (this._order === index) {
                this.scheduleOnce(() => {
                    this._traceGraphics.emit('enabledGraphics');
                }, timeToEnable);

            }
        });
        this.node.width = this._tracingContainer.width;

    }

    protected onDestroy(): void {
        cc.audioEngine.stopAllEffects();
    }

    set letter(l) {
        this._letter = l;
    }

    set wordTracingContainer(c) {
        this._wordTracingContainer = c;
    }

    get order() {
        return this._order;
    }

    set order(o) {
        this._order = o;
    }

    set tracingScale(n) {
        this._tracingScale = n;
    }

    get tracingScale() {
        return this._tracingScale;
    }

}
