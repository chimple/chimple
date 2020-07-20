import Config from "../../../common/scripts/lib/config";
import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import catchError from "../../../common/scripts/lib/error-handler";
import { TRACING_FINISHED, TRACING_CORRECT, TRACING_WRONG } from "../../../common/scripts/helper";
import TracingContainer from "../../../common/Tracing/scripts/tracing-container";

export const LETTER_TRACING_TEXTURE = "games/lettertracing/textures/";
export const GAME_VOICE = "games/lettertracing/sounds";

interface DrawShapeConfig {
    level: string;
    workSheet: string;
    problemNo: string;
    image: string;
}


@ccclass
export class DrawShape extends cc.Component {

    @property(cc.Prefab)
    progressMonitorPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    tracingContainerPrefab: cc.Prefab;

    _tracingContainer: cc.Node;
    _tracingContainerComponent: TracingContainer = null;

    _imageName: string = null;
    _currentConfig: DrawShapeConfig = null;
    _imageTracingContainer: cc.Node = null;

    @catchError()
    protected onLoad(): void {
        let manager = cc.director.getCollisionManager();
        manager.enabled = false;
        this._currentConfig = this.processConfiguration(Config.getInstance().data[0]);

        if (this._currentConfig !== null) {
            this._imageTracingContainer = this.node;
            this._imageTracingContainer.scale *= 1;
            this.node.width = cc.winSize.width;
            this.node.height = cc.winSize.height;
            // this.node.setPosition(new cc.Vec2(-cc.winSize.width / 2, -cc.winSize.height / 2));
            this._tracingContainer = cc.instantiate(this.tracingContainerPrefab);
            this.setImageToDisplay(this._currentConfig.image);
            this.subScribeToTracingEvents();
        }
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
    }


    // protected start(): void {
    //     new cc.Tween().target(this.node)
    //         .delay(0.2)
    //         .repeat(1,
    //             new cc.Tween()
    //                 .set({opacity: 0, scale: 10, x: 0, rotation: 0})
    //                 .parallel(
    //                     new cc.Tween().to(1, {opacity: 255, scale: 1}, {progress: null, easing: 'quintInOut'}),
    //                     //@ts-ignore
    //                     new cc.Tween().to(1.5, {x: this.node.x}, {progress: null, easing: 'backOut'})
    //                 )
    //                 .call(() => {
    //                     this.pronounce();
    //                 })
    //         )
    //         .start();
    // }

    @catchError()
    protected tracingFinished() {
        this.scheduleOnce(
            () => {
                // Config.getInstance().nextProblem();
                this.node.emit('nextProblem');
            }
            , 1)
    }

    @catchError()
    private setImageToDisplay(image: string): void {
        this._tracingContainerComponent = this._tracingContainer.getComponent(TracingContainer);
        this._tracingContainerComponent.tracingImage = image;
        this._tracingContainerComponent.lineWidth = 25;
        this._tracingContainerComponent.traceGenerationMode = false;
        this.node.addChild(this._tracingContainer);
        this._tracingContainer.setPosition(new cc.Vec2(0, 100));
        this._tracingContainerComponent.traceGraphics.emit('enabledGraphics');
    }

    @catchError()
    private processConfiguration(data: any[] = []): DrawShapeConfig | null {
        const configurations: any[] = [].concat(...data);
        let [level, workSheet, problemNo, image] = configurations;
        return {
            level,
            workSheet,
            problemNo,
            image
        };
        return null;
    }

    protected onDestroy(): void {
        cc.resources.release(this._imageName, cc.SpriteFrame);
        cc.audioEngine.stopAllEffects();
    }
}
