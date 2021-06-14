import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Config, {Lang, LANG_CONFIGS} from "../../../common/scripts/lib/config";
import {SHOW_CHILD_IMAGE, TRACING_FINISHED} from "../../../common/scripts/helper";
import TracingContainer from "../../../common/Tracing/scripts/tracing-container";

interface AlphabetConfig {
    level: string;
    workSheet: string;
    problemNo: string;
    problem: string;
}


@ccclass
export class AlphabetRecorder extends cc.Component {

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

    _letter: string = null;
    _tracePath: string = null;

    private _currentConfig: AlphabetConfig = null;

    protected onLoad(): void {
        const fontToLoad = LANG_CONFIGS.get(Lang.KANNADA).font;
        Config.i.loadFontDynamically(fontToLoad, () => {
            Config.getInstance().currentFontName
            this._recordingContainer = cc.instantiate(this.recordContainerPrefab);
            this._tracingContainer = cc.instantiate(this.tracingContainerPrefab);

            this._currentConfig = this.processConfiguration(Config.getInstance().data[0]);
            if (this._currentConfig !== null) {
                this._letter = this._currentConfig.problem;
                this.setAlphabetToDisplay(this._letter);
            }
            // this.node.parent.addChild(cc.instantiate(this.progressMonitorPrefab));
            this.node.dispatchEvent(new cc.Event.EventCustom(TRACING_FINISHED, true));

            this.node.on(TRACING_FINISHED, (event) => {
                event.stopPropagation();
                this.nextProblem();
            });
        });
    }

    protected nextProblem() {
        this.node.emit('nextProblem');
        // Config.getInstance().nextProblem();
    }

    protected loadTracePath(letter: string): any {
        if (this._tracePath == null) {
            Config.getInstance().loadPathJSON(letter, (data: string) => {
                if (!!data && data.length > 0) {
                    this._tracePath = data;
                }
            });
        }
    }

    private setAlphabetToDisplay(letter: string): void {
        this._recordingContainerComponent = this._recordingContainer.getComponent(TracingContainer);
        this._recordingContainerComponent.tracingLetter = letter;
        this._tracingContainerComponent = this._tracingContainer.getComponent(TracingContainer);
        this._tracingContainerComponent.tracingLetter = letter;
        this._tracingContainerComponent.traceGenerationMode = false;
        this.node.addChild(this._recordingContainer);
        this.node.addChild(this._tracingContainer);
        this._recordingContainer.setPosition(new cc.Vec2(-512, -384));
        this._tracingContainer.setPosition(new cc.Vec2(0, -384));
        this._recordingContainerComponent.traceGraphics.emit('enabledGraphics');
        this._tracingContainerComponent.traceGraphics.emit('enabledGraphics');

        if (this._letter !== null && this._tracePath == null) {
            this.loadTracePath(this._letter);
        }
    }

    private processConfiguration(data: any[] = []): AlphabetConfig | null {
        const configurations: any[] = [].concat(...data);
        if (configurations.length === 4) {
            let [level, workSheet, problemNo, problem] = configurations;
            return {
                level,
                workSheet,
                problemNo,
                problem
            };
        }
        return null;
    }

    protected update(dt: number): void {
        if (this._letter !== null && this._tracePath == null) {
            this.loadTracePath(this._letter);
        }

        if (this._tracingContainerVisible === false
            && this._tracePath !== null) {
            this._tracingContainer.active = true;
            this._tracingContainerVisible = true;
            this._tracingContainerComponent._traceGraphicsComponent.loadTracePath(this._letter);
        }
    }
}
