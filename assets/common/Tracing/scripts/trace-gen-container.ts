import ccclass = cc._decorator.ccclass;
import TracingContainer from "./tracing-container";

@ccclass
export default class TraceGenContainer extends cc.Component {
    _fileName: string = null;
    _recordContainer: cc.Node;
    _tracingContainer: cc.Node;
    _tracingContainerVisible: boolean = false;

    protected onLoad(): void {
        this._recordContainer = this.node.getChildByName('recordContainer');
        this._recordContainer.getComponent(TracingContainer).traceGenerationMode = true;
        this._tracingContainer = this.node.getChildByName('tracingConainer');
        this._tracingContainer.getComponent(TracingContainer).traceGenerationMode = false;
        this._tracingContainer.active = false;
    }

    protected start(): void {
        const recordTracingContainerComponent: TracingContainer = this._recordContainer.getComponent(TracingContainer);
        recordTracingContainerComponent.traceGenerationMode = true;
        this._fileName = recordTracingContainerComponent.traceObject.name;
        if (cc.sys.localStorage.getItem(this._fileName) !== null) {
            this._tracingContainer.active = true;
            this._tracingContainerVisible = true;
            this._recordContainer.getComponent(TracingContainer).showGeneratedPath();
        }
    }

    protected update(dt: number): void {
        // if (this._tracingContainerVisible === false && cc.sys.localStorage.getItem(this._fileName) !== null) {
        //     this._tracingContainer.active = true;
        //     this._tracingContainerVisible = true;
        // } else if (cc.sys.localStorage.getItem(this._fileName) === null) {
        //     this._tracingContainer.active = false;
        //     this._tracingContainerVisible = false;
        //
        // }
    }
}
