import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import { Util } from "../../../common/scripts/util";
import Config from "../../../common/scripts/lib/config";
import catchError from "../../../common/scripts/lib/error-handler";
import { CONFIG_LOADED, PHONIC_VOICE, LETTER_VOICE } from "../../../common/scripts/helper";
import TracingContainer from "../../../common/Tracing/scripts/tracing-container";
import LessonController from "../../../common/scripts/lessonController";

export const LETTER_SCALE = 0.95;
export const TRACE_NODE_POS_X = -256;
export const TRACE_NODE_POS_Y = -384;

@ccclass
export class SingleNumberTracing extends cc.Component {

    @property(cc.Prefab)
    tracingContainerPrefab: cc.Prefab;

    private _tracingContainer: cc.Node;
    private _tracingContainerComponent: TracingContainer = null;
    private _traceGraphics: cc.Node = null;
    private _letter: string = null;
    private _wordTracingContainer: cc.Node = null;
    private _order: number;
    private _tracingScale: number = null;

    private _sound: any = null;
    private _soundID: number;

    @catchError()
    protected onLoad(): void {
        let manager = cc.director.getCollisionManager();
        manager.enabled = false;
        this._tracingContainer = cc.instantiate(this.tracingContainerPrefab);
        this._tracingContainer.scale = 0.75;
        this._wordTracingContainer.on(CONFIG_LOADED, () => {
            this.setAlphabetToDisplay(this._letter);
            this.loadSounds(this._letter);
        });
    }

    loadSounds(text: string) {
        const isString = isNaN(Number(text));
        if (isString) {
            this.preloadSound(text.toLowerCase(), Config.dir + PHONIC_VOICE);
            if (this._sound === null) {
                this.preloadSound(text.toLowerCase(), Config.dir + LETTER_VOICE);
            }
            if (this._sound === null) {
                //@ts-ignore @todo
                this.preloadSound(text.toLowerCase(), Config.dir + WORD_TRACING_SOUNDS);
            }
        } else {
            Util.loadNumericSound(text, (clip) => {
                this._sound = clip;
            });
        }
    }

    preloadSound(content: string, loadFrom: string) {
        const soundFile: string = loadFrom + content;
        cc.resources.load(soundFile, cc.AudioClip, (err, clip) => {
            if (!err && clip !== null) {
                this._sound = clip;
            }
        });
    }

    pronounce() {
        LessonController.getFriend().speak(this._sound)
        // if (!!this._sound)
        //     this._soundID = Util.play(this._sound, false);
    }

    @catchError()
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
