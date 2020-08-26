import ccclass = cc._decorator.ccclass;
import Config from "../../../common/scripts/lib/config";
import property = cc._decorator.property;
import TracingContainer from "../../../common/Tracing/scripts/tracing-container";
import { TRACING_FINISHED, RECORDING_FINISHED, BACK_FINISHED } from "../../../common/scripts/helper";

interface ImageConfig {
    level: string;
    workSheet: string;
    problemNo: string;
    image: string;
}

@ccclass
export class ImageRecorder extends cc.Component {

    @property(cc.Prefab)
    progressMonitorPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    recordContainerPrefab: cc.Prefab;

    @property(cc.Prefab)
    tracingContainerPrefab: cc.Prefab;

    _recordingContainer: cc.Node;
    _tracingContainer: cc.Node;
    _tracingContainerVisible: boolean = false;
    _recordingContainerComponent: TracingContainer = null;
    _tracingContainerComponent: TracingContainer = null;

    _imageName: string = null;
    _tracePath: string = null;
    _jsonLoadingStatus: boolean = true;

    private _currentConfig: ImageConfig = null;

    protected onLoad(): void {
        this._recordingContainer = cc.instantiate(this.recordContainerPrefab);
        this._tracingContainer = cc.instantiate(this.tracingContainerPrefab);

        this._currentConfig = this.processConfiguration(Config.getInstance().data[0]);
        if (this._currentConfig !== null) {
            this._imageName = this._currentConfig.image;
            this.setImageToDisplay(this._imageName);
        }
        // this.node.parent.addChild(cc.instantiate(this.progressMonitorPrefab));
        this.node.dispatchEvent(new cc.Event.EventCustom(TRACING_FINISHED, true));

        this.node.on(RECORDING_FINISHED, (event) => {
            event.stopPropagation();
            this.scheduleOnce(
                () => {
                    this._tracingContainer.active = true;
                    this._recordingContainer.active = false;
                }, 3
            );
        });

        this.node.on(BACK_FINISHED, (event) => {
            event.stopPropagation();
            this._tracingContainer.active = false;
            this._recordingContainer.active = true;
        });

        this.node.on(TRACING_FINISHED, (event) => {
            event.stopPropagation();
            this.nextProblem();
        });
    }

    protected nextProblem() {
        this.node.emit('nextProblem');
        // Sri commented due to chapter restructuring
        // Config.getInstance().nextProblem();
    }

    protected loadTracePath(letter: string): any {
        try {
            if (this._tracePath == null) {
                Config.getInstance().loadPathJSON(letter, (data: string) => {
                    if (!!data && data.length > 0) {
                        this._jsonLoadingStatus = true;
                        this._tracePath = data;
                    } else {
                        this._jsonLoadingStatus = false;
                        this._tracePath = null;
                    }
                });
            }
        } catch (e) {
            this._jsonLoadingStatus = false;
        }

    }

    private setImageToDisplay(image: string): void {
        this._recordingContainerComponent = this._recordingContainer.getComponent(TracingContainer);
        this._recordingContainerComponent.tracingImage = image;
        this._tracingContainerComponent = this._tracingContainer.getComponent(TracingContainer);
        this._tracingContainerComponent.tracingImage = this._imageName;
        this._tracingContainerComponent.lineWidth = 25;
        this._recordingContainerComponent.lineWidth = 25;
        this._tracingContainerComponent.traceGenerationMode = true;
        this.node.addChild(this._recordingContainer);
        this.node.addChild(this._tracingContainer);
        this.node.setPosition(new cc.Vec2(-cc.winSize.width / 2, -cc.winSize.height / 2));
        this._tracingContainer.active = false;
        this._recordingContainer.setPosition(new cc.Vec2(0, 0));
        this._tracingContainer.setPosition(new cc.Vec2(0, 0));
        this._recordingContainerComponent.traceGraphics.emit('enabledGraphics');
        this._tracingContainerComponent.traceGraphics.emit('enabledGraphics');

        if (this._imageName !== null && this._tracePath == null) {
            this.loadTracePath(this._imageName);
        }
    }

    private processConfiguration(data: any[] = []): ImageConfig | null {
        const configurations: any[] = [].concat(...data);
        if (configurations.length === 4) {
            let [level, workSheet, problemNo, image] = configurations;
            return {
                level,
                workSheet,
                problemNo,
                image
            };
        }
        return null;
    }

    protected update(dt: number): void {
        if (this._imageName !== null && this._tracePath == null && this._jsonLoadingStatus) {
            this.loadTracePath(this._imageName);
        }

        if (this._tracingContainerVisible === false
            && this._tracePath !== null) {
            this._tracingContainer.active = true;
            this._tracingContainerVisible = true;
            this._tracingContainerComponent._traceGraphicsComponent.loadTracePath(this._imageName);
        }
    }
}
