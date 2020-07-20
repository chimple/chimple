import ccclass = cc._decorator.ccclass;
import TracingNode from "./tracing-node";
import TraceGraphics from "./trace-graphics";
import ArrowNode from "./arrow-node";

const CHOICE_GROUP = 'choice';

@ccclass
export default class IndicatorNode extends cc.Component {
    private _collisionCount: number = 0;
    private _counterValue: number = 0;
    private _arrowValue: number = 0;
    public traceGraphics: TraceGraphics = null;
    public currentPath: string = null;

    protected onEnable(): void {
        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        // collisionManager.enabledDebugDraw = true;
        // collisionManager.enabledDrawBoundingBox = true;
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        switch (other.node.group) {
            case CHOICE_GROUP:
                this.collisionEnter(other, self);
                break;
        }
    }

    collisionEnter(other: cc.Collider, self: cc.Collider) {
        if (other.node.name === 'tracingNode') {
            const tracingNodeComponent = other.node.getComponent(TracingNode);
            if (tracingNodeComponent !== null) {
                let currentPathInOtherNode = tracingNodeComponent.currentPath;
                if (this.currentPath === currentPathInOtherNode) {
                    this._collisionCount++;
                    this._counterValue = tracingNodeComponent.counter;
                }
            }

        } else if (other.node.name === 'arrowNode') {
            const arrowNodeComponent = other.node.getComponent(ArrowNode);
            cc.log('checking contact with arrow Node', arrowNodeComponent.arrowValue, 'with path', arrowNodeComponent.currentPath,
                ' and current value', this.traceGraphics.currentArrowValue);
            if (arrowNodeComponent !== null) {
                let currentPathInOtherNode = arrowNodeComponent.currentPath;
                if (this.currentPath === currentPathInOtherNode) {
                    this._arrowValue = arrowNodeComponent.arrowValue;
                    if (this.traceGraphics.currentArrowValue + 1 === arrowNodeComponent.arrowValue) {
                        this.traceGraphics.currentArrowValue = arrowNodeComponent.arrowValue;
                        this.traceGraphics.nextArrowValue = this.traceGraphics.currentArrowValue + 1;
                        this.traceGraphics.arrowPos = other.node.getPosition();
                        this.traceGraphics.arrowStarCounter = arrowNodeComponent.starCounter;
                        cc.log('contact with arrow Node', arrowNodeComponent.arrowValue);
                    }
                }
            }
        }
    }

    onCollisionExit(other: cc.Collider, self: cc.Collider) {
        switch (other.node.group) {
            case CHOICE_GROUP:
                this.collisionExit(other, self);
                break;
        }
    }

    collisionExit(other: cc.Collider, self: cc.Collider) {

        if (other.node.name === 'tracingNode') {
            const tracingNodeComponent = other.node.getComponent(TracingNode);
            if (tracingNodeComponent !== null) {
                let currentPathInOtherNode = tracingNodeComponent.currentPath;
                if (this.currentPath === currentPathInOtherNode) {
                    this._collisionCount--;
                    if (this._collisionCount <= 0) {
                        this.traceGraphics.disableTouchAsNoCollision(false);
                    }
                }
            }
        } else if (other.node.name === 'arrowNode') {
            const arrowNodeComponent = other.node.getComponent(ArrowNode);
            if (arrowNodeComponent !== null) {
                let currentPathInOtherNode = arrowNodeComponent.currentPath;
                if (this.currentPath === currentPathInOtherNode) {
                    cc.log('contact lost with arrow Node', arrowNodeComponent.arrowValue);
                }
            }
        }

    }

    // onCollisionStay(other: cc.Collider, self: cc.Collider) {
    //     cc.log('self onCollisionStay', self.node.name);
    //     cc.log('other onCollisionStay', other.node.name);
    //
    // }

    get collisionCount() {
        return this._collisionCount;
    }

    set collisionCount(scale) {
        this._collisionCount = scale;
    }

    get counterValue() {
        return this._counterValue;
    }
}



