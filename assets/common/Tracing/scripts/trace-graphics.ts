import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Color = cc.Color;
import TracingContainer, { TracePoint } from "./tracing-container";
import TracingNode from "./tracing-node";
import IndicatorNode from "./indicator-node";
import ArrowNode from "./arrow-node";
import Config from "../../scripts/lib/config";
import catchError from "../../scripts/lib/error-handler";
import { Util, TouchEvents } from "../../scripts/util";
import {
    TRACING_CORRECT,
    SHOW_CHILD_IMAGE,
    TRACING_FINISHED,
    RESET_TRACING_ALLOWED,
    RESET_TRACING_NOT_ALLOWED
} from "../../scripts/helper";
import Vec2 = cc.Vec2;

const BOUNDARY_CHECK_LIMIT = 20;

interface TraceH {
    oIndex: number;
    node: cc.Node;
}

@ccclass
export default class TraceGraphics extends cc.Component {
    @property(cc.Color)
    strokeColor: cc.Color;

    @property()
    lineWidth: number = 0;

    @property({
        type: cc.AudioClip
    })
    traceAudio: cc.AudioClip = null;

    @property(cc.SpriteFrame)
    star: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    staringImage: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    arrowImage: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    endingImage: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    indicator: cc.SpriteFrame = null;

    @property(cc.Prefab)
    tracingNode: cc.Prefab = null;

    @property(cc.Prefab)
    arrowNode: cc.Prefab = null;

    @property(cc.Prefab)
    imageNode: cc.Prefab = null;

    @property(cc.Prefab)
    tracingImageNode: cc.Prefab = null;

    @property(cc.Prefab)
    indicatorNode: cc.Prefab = null;

    tracingContainerComponent: TracingContainer = null;

    _traceAudioId: number = null;
    _traceSoundOn: boolean = false;
    _graphics: cc.Graphics = null;
    _prevPoint: cc.Vec2 = null;
    _currPoint: cc.Vec2 = null;
    _recordPoint: cc.Vec2 = null;
    _firstTouchInCurrentPath: boolean = false;

    _traceObject: cc.Node;
    _isTouchNotReleased: boolean = false;
    _traceGenerationMode: boolean = false;
    _shouldUpdateStartIndicator: boolean = true;

    _starNodesInPath: cc.Node[] = [];

    _matchingRects: cc.Rect[] = [];
    _animationPoints: TracePoint[] = [];
    _hand: cc.Node = null;
    _showHelp: boolean = false;
    _image: cc.Node;

    _currentMatchingRect: cc.Rect = null;

    _currentPathIndex: number = 0;
    _path: number = 0;
    _allTracePoints: TracePoint[][] = [];
    _validationOfCurrentPathCompleted: boolean = false;

    _touchEnabled: boolean = false;

    _tracingContainer: TracingContainer = null;
    _adjustedScale: number = 1;

    _isValid: boolean = false;
    _isTouchStartValid: boolean = false;
    _finishCounter: number = 0;
    _lastValidPointIndexInCurrentPath: number = 0;
    _lastStarNodeInCurrentPath: cc.Node = null;
    _startIndicator: cc.Node = null;
    _endIndicator: cc.Node = null;
    _mTrigger: boolean = false;

    _totalValidationCheckPoints: number = 0;
    _tracingFinished: boolean = false;
    _indicatorNodeComponent: IndicatorNode = null;
    _lastCounterValue: number = 0;
    _activeStarsTillIndex: number = -1;

    public currentArrowValue: number = 0;
    public nextArrowValue: number = 0;
    public arrowPos: cc.Vec2 = null;
    public arrowStarCounter: number = 0;
    private _displayNodes: cc.Node[] = [];
    private _displayScheduler = null;
    private _isResetGraphicsAllowed: boolean = false;

    @catchError()
    protected onLoad(): void {
        cc.log('onLoad trace graphics');
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;
        this.node.opacity = 0;
        this.node.width = cc.winSize.width + cc.winSize.width / 4;
        this.node.height = cc.winSize.height;
        this.node.setPosition(new Vec2(this.node.x - cc.winSize.width / 4, this.node.y));
        this._graphics = this.getComponent(cc.Graphics);
        this._graphics.node.opacity = 0;
        this._graphics.lineJoin = cc.Graphics.LineJoin.ROUND;
        this._graphics.lineCap = cc.Graphics.LineCap.ROUND;
        this._graphics.strokeColor = this.strokeColor;
        this._graphics.lineWidth = this.lineWidth;
        this._tracingContainer = this.node.parent.getComponent(TracingContainer);
        if (this._hand != null || this._hand != undefined) {
            this._hand.active = false;
        }

        this.node.on('enabledGraphics', () => {
            let isString: boolean = true;
            try {
                isString = isNaN(parseInt(this._traceObject.name));
            } catch (e) {
            }

            this.loadTracePath(this._traceObject.name, isString ? false : true);
        });
        cc.log('onLoad trace graphics completed');
    }

    @catchError()
    protected start(): void {
        cc.log("start called -> trace graphics");
        this.strokeColor = cc.Color.WHITE;
    }

    @catchError()
    public loadTracePath(letter: string, isNumber: boolean = false): any {
        Config.getInstance().loadPathJSON(letter, (data: string) => {
            if (!!data && data.length > 0) {
                this._allTracePoints = JSON.parse(data) || [];
            }
            this.postLoadPath();
        }, isNumber);
    }

    private postLoadPath() {
        this.findHand();
        this.postLoad();
        this.enableTouchHandlers();
        this.node.opacity = 255;
    }

    private findHand() {
        if (!this.traceGenerationMode) {
            this._showHelp = true;
            this._hand = this.node.parent.getChildByName("hand");
            this.scheduleHelpAnimation();
        }
    }

    @catchError()
    protected enableTouchHandlers() {
        this.node.on(TouchEvents.TOUCH_START, this.onTouchStart, this);
        this.node.on(TouchEvents.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(TouchEvents.TOUCH_END, this.onTouchEnd, this);
        this.node.on(TouchEvents.TOUCH_CANCEL, this.onTouchEnd, this);
        this._touchEnabled = true;
    }

    @catchError()
    protected disableTouchHandlers() {
        this.node.off(TouchEvents.TOUCH_START, this.onTouchStart, this);
        this.node.off(TouchEvents.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(TouchEvents.TOUCH_END, this.onTouchEnd, this);
        this._touchEnabled = false;
    }

    @catchError()
    protected postLoad() {
        this.renderStar(this._path);
        this.configureCurrentValidationPath(this._path);
    }

    @catchError()
    protected showIndicators() {
        this._touchEnabled = true;
        this.drawStartPointInCurrentPath();
        this.drawEndPointInCurrentPath();
        this._mTrigger = false;
    }

    @catchError()
    isTouchValid(point: cc.Vec2): boolean {
        if (this.traceGenerationMode) return true;

        if (!!this._indicatorNodeComponent && this._lastCounterValue <= 0) {
            this._lastCounterValue = this._indicatorNodeComponent.counterValue;
        }

        const isStartValid = !!this._indicatorNodeComponent && this._indicatorNodeComponent.collisionCount > 0;

        if (isStartValid && this._startIndicator.getBoundingBox().contains(point)) {
            this._touchEnabled = true;
            this._isValid = true;
            this._lastCounterValue = !!this._indicatorNodeComponent && this._indicatorNodeComponent.counterValue > this._lastCounterValue ?
                this._indicatorNodeComponent.counterValue : this._lastCounterValue;
        } else {
            this._isValid = false;
        }

        return this._isValid;
    }

    @catchError()
    private setUpGraphics() {
        this._graphics.lineJoin = cc.Graphics.LineJoin.ROUND;
        this._graphics.lineCap = cc.Graphics.LineCap.ROUND;
        this._graphics.strokeColor = this.strokeColor;
        this._graphics.lineWidth = this.lineWidth;
    }

    @catchError()
    onTouchStart(touch: cc.Touch) {
        cc.log('onTouchStart');
        if (this._touchEnabled) {
            if (!!this._hand) this._hand.opacity = 0;
            this._currPoint = this._prevPoint = this._recordPoint
                = this._traceObject.parent.convertToNodeSpaceAR(touch.getLocation());
            if (this.traceGenerationMode) {
                this.setUpGraphics();
                this._graphics.moveTo(this._prevPoint.x, this._prevPoint.y);
                this._graphics.strokeColor = Color.GRAY;
                this._tracingContainer.resetCurrentTracingPart();
                this.recordPoint(false);
            } else {
                this._isTouchStartValid = this.isTouchValid(this._currPoint);
            }

            this._isTouchNotReleased = true;

            if (this._isValid) {
                cc.log('onTouchStart valid');
                // this.playTracingSound();
                this._startIndicator.opacity = 255;
                this._endIndicator.opacity = 255;
            } else {
                this.stopTracingSound();
            }
        }
    }

    @catchError()
    highLightStarNodes(point: cc.Vec2, arrowStarCounter: number) {
        if (this._mTrigger) return;
        let matchingNodes: TraceH[] = [];
        matchingNodes: this._starNodesInPath.map((n, i) => {
            if (n.active === false && n.getBoundingBox().contains(point)) {
                if (i <= arrowStarCounter) {
                    this._activeStarsTillIndex = i;
                    return {
                        oIndex: i,
                        node  : n
                    };
                }
            }
        });

        matchingNodes = matchingNodes.filter(function (element) {
            return element !== undefined;
        });

        matchingNodes = matchingNodes.slice(0, matchingNodes.length);

        if (!!matchingNodes && matchingNodes.length > 0) {
            const tP = matchingNodes[matchingNodes.length - 1];
            let currentPointInIndex = tP.oIndex;

            if (this._lastValidPointIndexInCurrentPath <= currentPointInIndex) {
                this._shouldUpdateStartIndicator = true;
            } else {
                // this._shouldUpdateStartIndicator = false;
            }
            this._lastValidPointIndexInCurrentPath = this._starNodesInPath.indexOf(tP.node);
            this._lastStarNodeInCurrentPath = tP.node;

            matchingNodes.forEach(
                (m) => {
                    m.node.opacity = 255;
                    m.node.active = true;
                    if (this._starNodesInPath[m.oIndex] !== null) {
                        this._starNodesInPath[m.oIndex].active = true;
                    }
                }
            );
        } else {
            // this._shouldUpdateStartIndicator = false;
        }
    }

    @catchError()
    onTouchMove(touch: cc.Touch) {
        this._isValid = this._isTouchStartValid && !!this._indicatorNodeComponent && this._indicatorNodeComponent.collisionCount > 0;
        if (this._touchEnabled && (this._isValid || this.traceGenerationMode)) {
            this._lastCounterValue = this._indicatorNodeComponent.counterValue > this._lastCounterValue ?
                this._indicatorNodeComponent.counterValue : this._lastCounterValue;
            if (!!this._hand) this._hand.opacity = 0;
            let touchLocation = this._traceObject.parent.convertToNodeSpaceAR(touch.getLocation());
            let delta = new cc.Vec2(1 / this.adjustedScale * touch.getDelta().x, 1 / this.adjustedScale * touch.getDelta().y);
            touchLocation = touchLocation.add(delta);
            this._currPoint = touchLocation;
            if (this.traceGenerationMode) {
                this._graphics.lineTo(this._currPoint.x, this._currPoint.y);
                this._graphics.stroke();
                this._prevPoint = this._currPoint;
                this._graphics.moveTo(this._prevPoint.x, this._prevPoint.y);
                this.doAdditionalCheckToRecordPointsOnMove();
            } else {
                if (this.arrowPos !== null) {
                    cc.log('onTouchMove valid', this._isValid);
                    this.highLightStarNodes(this.arrowPos, this.arrowStarCounter);
                    this._starNodesInPath.forEach(
                        (n, i) => {
                            if (i < this._activeStarsTillIndex && n.active === false) {
                                n.active = true;
                                this._lastStarNodeInCurrentPath = this._starNodesInPath[i];
                            }
                        }
                    );
                    if (this._isValid) {
                        this._startIndicator.setPosition(this._currPoint);
                        if (!this._isResetGraphicsAllowed) {
                            this._isResetGraphicsAllowed = true;
                            this.node.dispatchEvent(new cc.Event.EventCustom(RESET_TRACING_ALLOWED, true));
                        }
                    }
                }
            }
            this._isTouchNotReleased = true;

            // this.playTracingSound();
        } else {
            this.stopTracingSound();
        }
    }

    @catchError()
    loadImage(pos: cc.Vec2) {
        const image = cc.instantiate(this.imageNode);
        image.scale = 1.5;
        image.getComponent(cc.Sprite).spriteFrame = this.star;
        image.setPosition(pos);
        this._tracingContainer.node.addChild(image);
        image.zIndex = 99;
    }

    @catchError()
    loadIndicator(cpIndex: number, pos: cc.Vec2, counter: number) {
        const image = cc.instantiate(this.tracingNode);
        image.name = 'tracingNode';
        image.getComponent(cc.Sprite).spriteFrame = this.indicator;
        image.setPosition(pos);
        image.scale = 0.75;
        const tracingNode = image.getComponent(TracingNode);
        tracingNode.counter = counter;
        tracingNode.currentPath = 'c' + cpIndex;
        this._tracingContainer.node.addChild(image);
        image.zIndex = 99;
        image.opacity = 0;
    }

    @catchError()
    loadArrow(cpIndex: number, pos: cc.Vec2, counter: number, starCounter: number) {
        const image = cc.instantiate(this.arrowNode);
        image.name = 'arrowNode';
        image.getComponent(cc.Sprite).spriteFrame = this.arrowImage;
        image.setPosition(pos);
        image.scale = 0.5;
        const arrowC = image.getComponent(ArrowNode);
        arrowC.currentPath = 'c' + cpIndex;
        // cc.log('created with counter', counter, ' and star counter', starCounter);
        arrowC.arrowValue = counter;
        arrowC.starCounter = starCounter;
        this._tracingContainer.node.addChild(image);
        image.zIndex = 99;
        image.opacity = 0;
    }

    @catchError()
    loadDisplay(pos: cc.Vec2) {
        const image = cc.instantiate(this.tracingImageNode);
        image.name = 'displayNode';
        // image.getComponent(cc.Sprite).spriteFrame = this.indicator;
        image.setPosition(pos);
        image.opacity = 0;
        // image.scale = 0.25
        this._displayNodes.push(image);
        this._tracingContainer.node.addChild(image);
    }

    @catchError()
    createStarAtPos(starNodes: cc.Node[], pos: cc.Vec2) {
        const image = cc.instantiate(this.imageNode);
        image.name = 'starNode';
        image.scale = 1.5;
        image.getComponent(cc.Sprite).spriteFrame = this.star;
        image.setPosition(pos);
        this._tracingContainer.node.addChild(image);
        image.zIndex = 99;
        image.active = false;
        starNodes.push(image);
    }

    @catchError()
    playTracingSound() {
        if (!this._traceSoundOn && !this.traceGenerationMode) {
            this._traceSoundOn = true;
            try {
                if (!!this.traceAudio)
                    this._traceAudioId = Util.playSfx(this.traceAudio, true, true);
            } catch (e) {

            }
        }
    }

    @catchError()
    private doAdditionalCheckToRecordPointsOnMove(): void {
        if (this.traceGenerationMode) {
            const diff: cc.Vec2 = this._currPoint.sub(this._recordPoint);
            const needToLog = diff.magSqr() >= 10;
            if (needToLog) {
                this._recordPoint = this._currPoint;
                this.recordPoint(false);
            }
        }
    }

    // private doDrawOnMove(cPoint: cc.Vec2): void {
    //     if (!this.traceGenerationMode && this._isValid) {
    //         this.loadImage(cPoint);
    //     } else {
    //         this.stopTracingSound();
    //         this.removeLastInvalidSprites(3);
    //     }
    // }

    @catchError()
    onTouchEnd(touch: cc.Touch) {
        this.stopTracingSound();
        this._endIndicator.opacity = 0;
        this._startIndicator.opacity = 0;
        if (this.traceGenerationMode) {
            this.recordPoint(true);
            return;
        }

        if (this._isValid && this._touchEnabled) {
            this._lastCounterValue = this._indicatorNodeComponent.counterValue > this._lastCounterValue ?
                this._indicatorNodeComponent.counterValue : this._lastCounterValue;
            if (this._shouldUpdateStartIndicator && !!this._lastStarNodeInCurrentPath) {
                this._startIndicator.setPosition(this._lastStarNodeInCurrentPath.getPosition());
            }
        }
        this.checkIfAllValidateTraceCompleted();

        if (!this._tracingFinished) {
            this._startIndicator.opacity = 255;
        }

        this.stopTracingSound();
    }

    @catchError()
    private scheduleHelpAnimation() {
        this.scheduleOnce(() => {
            this._showHelp = true;
            this._hand.active = true;
            this.animate();
        }, 5);
    }

    @catchError()
    private stopTracingSound() {
        if (!this.traceGenerationMode && !!this._traceAudioId && this._traceSoundOn) {
            cc.audioEngine.stop(this._traceAudioId);
            this._traceSoundOn = false;
        }
    }

    @catchError()
    private recordPoint(ended: boolean): void {
        if (this.traceGenerationMode) {
            this._graphics.lineTo(this._currPoint.x, this._currPoint.y);
            this._graphics.stroke();
            this._tracingContainer.recordTouchPoint(this._currPoint, ended);
        }
    }

    @catchError()
    getTouchLocation(): cc.Vec2 | null {
        return this._isTouchNotReleased ? this._currPoint : null;
    }

    @catchError()
    private checkIfAllValidateTraceCompleted() {
        // cc.log(this._totalValidationCheckPoints, this.currentArrowValue);
        const completed = this.currentArrowValue >= this._totalValidationCheckPoints;
        if (completed) {
            this._validationOfCurrentPathCompleted = true;
            this.node.dispatchEvent(new cc.Event.EventCustom(TRACING_CORRECT, true));
            this.moveToNextPath();
        }
    }

    @catchError()
    private rectAroundPoint(point: TracePoint) {
        const rect: cc.Rect = cc.Rect.fromMinMax(
            new cc.Vec2(point.x - BOUNDARY_CHECK_LIMIT, point.y - BOUNDARY_CHECK_LIMIT),
            new cc.Vec2(point.x + BOUNDARY_CHECK_LIMIT, point.y + BOUNDARY_CHECK_LIMIT)
        );
        return rect;
    }

    @catchError()
    private setUpDebugDrawGraphics() {
        this._graphics.strokeColor = cc.Color.BLUE;
        this._graphics.lineWidth = 1;

        this._matchingRects.forEach(
            rect => {
                this._graphics.rect(rect.x, rect.y, rect.width, rect.height);
                this._graphics.stroke();
            }
        );
    }

    // create star-nodes for current index/path
    @catchError()
    private renderStar(index: number) {
        this._starNodesInPath = [];
        if (this._allTracePoints.length > index) {
            const tracePaths: TracePoint[] = this._allTracePoints[index];
            tracePaths.forEach(
                (p: TracePoint) => {
                    this.createStarAtPos(this._starNodesInPath, new cc.Vec2(p.x, p.y));
                }
            );
        }
    }

    @catchError()
    private drawStartPointInCurrentPath() {
        this.scheduleOnce(
            () => {
                this.createStartIndicator();
                if (this._starNodesInPath.length > 0) {
                    this._startIndicator.setPosition(this._starNodesInPath[0].getPosition());
                    this._startIndicator.active = true;
                    this._startIndicator.zIndex = 100;
                    this._tracingContainer.node.children
                        .filter(c => c.name === 'displayNode')
                        .forEach(
                            (c: cc.Node) => {
                                c.opacity = 255;
                                c.active = true;
                            }
                        );
                    this.animateDisplayNodes(this._displayNodes);
                }
            }
        );
    }

    @catchError()
    private drawEndPointInCurrentPath() {
        this.scheduleOnce(
            () => {
                this.createEndIndicator();
                if (this._starNodesInPath.length > 0) {
                    this._endIndicator.setPosition(this._starNodesInPath[this._starNodesInPath.length - 1].getPosition());
                    this._endIndicator.active = true;
                    this._endIndicator.zIndex = 100;
                }
            }
        );
    }

    @catchError()
    private createStartIndicator() {
        if (!!this._startIndicator) {
            this._startIndicator.removeFromParent(true);
        }
        this._startIndicator = cc.instantiate(this.indicatorNode);
        this._indicatorNodeComponent = this._startIndicator.getComponent(IndicatorNode);
        this._indicatorNodeComponent.traceGraphics = this;
        this._indicatorNodeComponent.currentPath = 'c' + this._path;
        const circleCollider = this._startIndicator.getComponent(cc.CircleCollider);
        circleCollider.radius = 18;
        this._startIndicator.name = 'startImage';
        this._startIndicator.name = 'startImage';
        this._startIndicator.zIndex = 100;
        this._startIndicator.scale = 2.5;
        this._startIndicator.opacity = 255;
        this._startIndicator.getComponent(cc.Sprite).spriteFrame = this.staringImage;
        this.node.parent.addChild(this._startIndicator);

        return this._startIndicator;
    }

    @catchError()
    private createEndIndicator() {
        if (!this._endIndicator) {
            this._endIndicator = cc.instantiate(this.imageNode);
            this._endIndicator.name = 'endImage';
            this._endIndicator.zIndex = 100;
            this._endIndicator.scale = 2.5;
            this._endIndicator.opacity = 255;
            this._endIndicator.getComponent(cc.Sprite).spriteFrame = this.endingImage;
            this.node.parent.addChild(this._endIndicator);
        }

        return this._endIndicator;
    }

    @catchError()
    private distanceBetweenPoints(t1, t2) {
        return Math.sqrt((t1.x - t2.x) * (t1.x - t2.x) + (t1.y - t2.y) * (t1.y - t2.y));
    }

    @catchError()
    private computeDistance(tracePaths: TracePoint[]) {
        for (let i = 0; i < tracePaths.length; i++) {
            for (let j = i; j < tracePaths.length; j++) {
                let t1: TracePoint = tracePaths[i];
                let t2: TracePoint = tracePaths[j];
                let distance = this.distanceBetweenPoints(t1, t2);
                if (distance >= 45) {
                    i = j;
                    this.loadDisplay(new cc.Vec2(t1.x, t1.y));
                }
            }
        }
        if (this._starNodesInPath.length > 10) {
            this.loadDisplay(this._starNodesInPath[this._starNodesInPath.length - 10].getPosition());
        }
    }

    @catchError()
    private configureCurrentValidationPath(index: number) {
        this._matchingRects = [];
        this._animationPoints = [];
        this._validationOfCurrentPathCompleted = false;
        let ac = 0;
        let j = 0;
        if (this._allTracePoints.length > index) {
            let tracePaths: TracePoint[] = this._allTracePoints[index];
            this.computeDistance(tracePaths);
            this._finishCounter = tracePaths.length - 1;
            ac = 0;
            j = 0;
            tracePaths.forEach(
                (t, i) => {
                    j = i;
                    if (i === 0) {
                        this.loadIndicator(index, new cc.Vec2(t.x, t.y), (i + 1));
                        ac++;
                        this.loadArrow(index, new cc.Vec2(t.x, t.y), ac, (i + 1));
                    } else if (i % 5 === 0) {
                        this.loadIndicator(index, new cc.Vec2(t.x, t.y), (i + 1));
                        if (i % 15 === 0) {
                            ac++;
                            this.loadArrow(index, new cc.Vec2(t.x, t.y), ac, (i + 1));
                        }
                    } else if (i === tracePaths.length - 1) {
                        ac++;
                        this.loadIndicator(index, new cc.Vec2(t.x, t.y), (i + 1));
                        this.loadArrow(index, new cc.Vec2(t.x, t.y), ac, (i + 1));
                    }
                    const rect = this.rectAroundPoint(t);
                    this._matchingRects.push(rect);
                    this._animationPoints.push({x: rect.x + rect.width / 2, y: rect.y + rect.height / 2});
                }
            );
        }
        ac++;
        if (!!this._starNodesInPath[this._starNodesInPath.length - 1]) {
            this.loadArrow(index, this._starNodesInPath[this._starNodesInPath.length - 1].getPosition(), ac, (j + 1));
        }
        this._totalValidationCheckPoints = ac;
        this.showIndicators();
        this.scheduleOnce(() => {
            if (this._displayScheduler !== null) {
                this.unschedule(this._displayScheduler);
            }
            this._displayScheduler = () => {
                this.animateDisplayNodes(this._displayNodes);
            };
            this.schedule(this._displayScheduler, 3);
        });
    }

    @catchError()
    private animateDisplayNodes(nodes: cc.Node[]) {
        const iterator = this.displayIterator(nodes, 0, nodes.length)[Symbol.iterator]();
        this.getNextFromIterator(iterator);
    }

    private getNextFromIterator(iterator) {
        let result = iterator.next();
        if (!result.done && !!result.value) {
            this.glowDisplay(result.value, () => {
                this.getNextFromIterator(iterator);
            });
        } else {
            iterator = null;
        }
    }

    private displayIterator = (array: cc.Node[], from, to = Infinity, step = 1) => ({
        [Symbol.iterator]: function () {
            let done = false;
            let value = 0;
            return {
                next() {
                    value = from;
                    done = from >= to;
                    from = !done ? from + step : value;
                    return {done: done, value: array[value]};
                }
            };
        }
    });

    private glowDisplay(n: cc.Node, callBack: Function) {
        const anim = n.getComponent(cc.Animation);
        if (anim !== null) {
            anim.stop();
            anim.on('finished', () => {
                callBack();
            }, this);
            anim.play('glowing_dot');
        }
    }

    private drawDebugPath(shouldDebugDraw: boolean) {
        if (shouldDebugDraw && this._currentPathIndex > 0) {
            this.setUpDebugDrawGraphics();
        }
    }

    @catchError()
    private moveToNextPath() {
        this._isResetGraphicsAllowed = false;
        this.node.dispatchEvent(new cc.Event.EventCustom(RESET_TRACING_NOT_ALLOWED, true));
        this._lastStarNodeInCurrentPath = null;
        this.currentArrowValue = 0;
        this.nextArrowValue = 0;
        this.arrowPos = null;
        this._activeStarsTillIndex = -1;
        this._endIndicator.active = false;
        this._startIndicator.active = false;
        this._lastCounterValue = 0;
        this._firstTouchInCurrentPath = false;
        this._lastValidPointIndexInCurrentPath = -1;
        this.stopTracingSound();
        this._displayNodes.forEach(
            (n: cc.Node) => {
                n.active = false;
                n.removeFromParent(false);
            }
        );

        this._starNodesInPath.filter((n, i) => (n.active === false || n.opacity === 0))
            .forEach(n => {
                n.active = true;
                n.opacity = 255;
            });

        this._displayNodes = [];
        this._tracingContainer.node.children
            .filter(c => c.name === 'displayNode')
            .forEach(
                (c: cc.Node) => {
                    c.removeFromParent(false);
                    c.active = false;
                }
            );
        if (this._currentPathIndex >= this._allTracePoints.length - 1) {
            this._showHelp = false;
            this._touchEnabled = false;
            if (!this._tracingFinished) {
                this._tracingFinished = true;
                this.disableTouchHandlers();
                this.tracingContainerComponent.node.emit(SHOW_CHILD_IMAGE);
                this.scheduleOnce(() => {
                    // this._graphics.clear(true);
                    this.node.dispatchEvent(new cc.Event.EventCustom(TRACING_FINISHED, true));
                    this.scheduleOnce(() => {
                        this._hand.opacity = 0;
                    }, 1);
                }, 1);
            }
        } else {
            this._mTrigger = true;
            this._isValid = false;
            this._touchEnabled = false;
            this._currentPathIndex = this._currentPathIndex + 1;
            this.renderStar(this._currentPathIndex);
            this._path = this._path + 1;
            this._animationPoints = [];
            this._starNodesInPath.forEach(
                n => {
                    n.active = false;
                    // n.removeFromParent();
                }
            );
            this._showHelp = true;
            this.configureCurrentValidationPath(this._path);
        }
    }

    resetGraphics() {
        if (this._isResetGraphicsAllowed) {
            this._isResetGraphicsAllowed = false;
            this.node.dispatchEvent(new cc.Event.EventCustom(RESET_TRACING_NOT_ALLOWED, true));
            this._lastStarNodeInCurrentPath = null;
            this.currentArrowValue = 0;
            this.nextArrowValue = 0;
            this._activeStarsTillIndex = -1;
            this._lastCounterValue = 0;
            this._firstTouchInCurrentPath = false;
            this._lastValidPointIndexInCurrentPath = -1;
            this.stopTracingSound();

            this._starNodesInPath.forEach(
                n => {
                    n.active = false;
                }
            );

            if (this._startIndicator !== null) {
                this._startIndicator.setPosition(this._starNodesInPath[0].getPosition());
            }

            if (this._endIndicator !== null) {
                this._endIndicator.setPosition(this._starNodesInPath[this._starNodesInPath.length - 1].getPosition());
            }
        }
    }

    private moveBackToCurrentPath() {
        this._mTrigger = true;
        this._isValid = false;
        this._touchEnabled = false;
        this._lastCounterValue = 0;
        this._currentPathIndex = this._currentPathIndex;
        this._starNodesInPath.forEach(
            n => {
                n.active = false;
                // n.removeFromParent();
            }
        );
        // this.renderStar(this._currentPathIndex);
        this._path = this._path;
        this._animationPoints = [];
        this._showHelp = true;
        this.showIndicators();
        // this.configureCurrentValidationPath(this._path);
    }

    @catchError()
    animate() {
        if (!this._validationOfCurrentPathCompleted
            && !this.traceGenerationMode
            && this._showHelp) {
            try {
                this._hand.opacity = 255;
                this._hand.active = true;
                const moves = [];
                for (let i = 0; i < this._animationPoints.length; i++) {
                    const p1 = this._animationPoints[i];
                    moves.push(cc.moveTo(0.02, new cc.Vec2(p1.x, p1.y)));
                }
                if (moves != null && moves.length > 0) {
                    moves.push(cc.callFunc(() => {
                        this._hand.active = false;
                        this.scheduleHelpAnimation();
                    }, this));
                }

                if (moves != null && moves.length > 0
                    && (this._hand !== null || this._hand !== undefined) && this._hand.active) {
                    this._hand.runAction(cc.sequence(moves));
                }
            } catch (e) {

            }
        }
        // else {
        //     if (!this.traceGenerationMode
        //         && this._currentPathIndex < this._allTracePoints.length) {
        //         this.scheduleHelpAnimation();
        //     }
        // }
    }

    @catchError()
    public drawCircleInTracingMode(storageKey: string) {

        this._graphics.strokeColor = Color.BLUE;
        try {
            const points: TracePoint[][] = JSON.parse(cc.sys.localStorage.getItem(storageKey));
            points.forEach(
                (p) => {
                    const point: TracePoint = p.shift();
                    this._graphics.moveTo(point.x, point.y);
                    p.forEach(
                        (t, i) => {
                            if (i % 5 === 0) {
                                this._graphics.circle(t.x, t.y, 5);
                                this._graphics.stroke();
                            }
                        }
                    );
                }
            );
        } catch (e) {

        }
    }

    get traceObject() {
        return this._traceObject;
    }

    set traceObject(n) {
        this._traceObject = n;
    }

    get traceGenerationMode() {
        return this._traceGenerationMode;
    }

    set traceGenerationMode(n) {
        this._traceGenerationMode = n;
    }

    clear() {
        this._graphics.clear(true);
        this.stopTracingSound();
    }

    protected onDestroy(): void {
        this._isValid = false;
        if (!!this._startIndicator) {
            this._startIndicator.active = false;
            this._startIndicator.removeFromParent(true);
        }
        this.stopTracingSound();
    }

    get adjustedScale() {
        return this._adjustedScale;
    }

    set adjustedScale(scale) {
        this._adjustedScale = scale;
    }

    @catchError()
    disableTouchAsNoCollision(b) {
        try {
            this._touchEnabled = b;
            if (!this._tracingFinished) {
                this.scheduleOnce(
                    () => {
                        cc.log('exit');
                        if (!this._validationOfCurrentPathCompleted && !!this._lastStarNodeInCurrentPath) {
                            this._startIndicator.setPosition(this._lastStarNodeInCurrentPath.getPosition());
                        }
                        this.checkIfAllValidateTraceCompleted();
                        this._touchEnabled = true;
                    }, 0.1
                );
            }
            // this.moveBackToCurrentPath();
        } catch (e) {

        }
    }
}
