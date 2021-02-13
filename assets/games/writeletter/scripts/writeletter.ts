import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Config from "../../../common/scripts/lib/config";
import {Util} from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";
import {
    TRACING_FINISHED,
    TRACING_CORRECT,
    TRACING_WRONG,
    SOUND_LOADED_EVENT,
    RESET_TRACING
} from "../../../common/scripts/helper";
import TracingContainer from "../../../common/Tracing/scripts/tracing-container";
import Game from "../../../common/scripts/game";
import TraceGraphics from "../../../common/Tracing/scripts/trace-graphics";

interface WriteLetterConfig {
    level: string;
    workSheet: string;
    problemNo: string;
    traceText: string;
}

export const LETTER_TRACING_SCALE = 0.85;

@ccclass
export class WriteLetter extends Game {

    @property(cc.Prefab)
    tracingContainerPrefab: cc.Prefab;

    @property(cc.Prefab)
    imageNode: cc.Prefab = null;

    _tracingContainer: cc.Node;
    _tracingContainerComponent: TracingContainer = null;

    _letter: string = null;
    _currentConfig: WriteLetterConfig = null;
    _letterTracingContainer: cc.Node = null;

    _sound: any = null;
    _soundID: number;
    _imageName: string = null;
    _image: cc.Node;

    @catchError()
    protected onLoad(): void {
        let manager = cc.director.getCollisionManager();
        manager.enabled = false;
        this._currentConfig = this.processConfiguration(Config.getInstance().data[0]);
        if (this._currentConfig !== null) {
            this._image = cc.instantiate(this.imageNode);
            this._letterTracingContainer = this.node;
            this._letterTracingContainer.scale *= 1;
            this.node.width = cc.winSize.width;
            this.node.height = cc.winSize.height;
            this.initTracingContainer();
            this.subScribeToTracingEvents();
            this.loadSounds(this._currentConfig.traceText);
            this.node.opacity = 255;
        }
        Util.showHelp(null, null)
    }

    private initTracingContainer() {
        this._tracingContainer = cc.instantiate(this.tracingContainerPrefab);
        this.setAlphabetToDisplay(this._currentConfig.traceText);
    }

    @catchError()
    private subScribeToTracingEvents() {
        this.node.on(TRACING_FINISHED, (event) => {
            event.stopPropagation();
            this.tracingFinished();
        });

        this.node.on(TRACING_CORRECT, (event) => {
            event.stopPropagation();
            this.node.emit('correct');
        });

        this.node.on(TRACING_WRONG, (event) => {
            event.stopPropagation();
            this.node.emit('wrong');
        });

        this.node.on(RESET_TRACING, (event) => {
            event.stopPropagation();
            console.log("RESET_TRACING.....")
            this._tracingContainer.removeFromParent(true);
            this.initTracingContainer();
        });
    }

    loadSounds(text: string) {
        Util.loadsLetter(text.toLowerCase(), (clip) => {
            this._sound = clip;
            this.node.emit(SOUND_LOADED_EVENT);
        });
    }

    @catchError()
    protected tracingFinished() {
        this.pronounce();
        this.scheduleOnce(
            () => {
                // Config.getInstance().nextProblem();
                this.node.emit('nextProblem');
            }
            , 1);
    }

    @catchError()
    protected pronounce() {
        this.friend.speak(this._sound)
        // try {
        //     if (!!this._sound)
        //         this._soundID = Util.play(this._sound, false);
        // } catch (e) {

        // }
    }

    @catchError()
    private setAlphabetToDisplay(letter: string): void {
        this._tracingContainerComponent = this._tracingContainer.getComponent(TracingContainer);
        this._tracingContainerComponent.tracingLetter = letter;
        this._tracingContainerComponent.traceGenerationMode = false;
        this.node.addChild(this._tracingContainer);
        this._tracingContainerComponent.traceGraphics.emit('enabledGraphics');
        if (Config.dir === 'en/') {
            this._tracingContainer.setPosition(new cc.Vec2(-256, -350));
        } else if (Config.dir === 'hi/') {
            this._tracingContainer.setPosition(new cc.Vec2(-256, -450));
        }

        this.node.scale = LETTER_TRACING_SCALE;
    }

    private processConfiguration(data: any[] = []): WriteLetterConfig | null {
        const configurations: any[] = [].concat(...data);

        let [level, workSheet, problemNo, traceText] = configurations;
        return {
            level,
            workSheet,
            problemNo,
            traceText
        };
    }

    protected onDestroy(): void {
        cc.audioEngine.stopAllEffects();
    }
}
