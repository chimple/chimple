import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import HorizontalAlign = cc.Label.HorizontalAlign;
import VerticalAlign = cc.Label.VerticalAlign;
import TraceGraphics from "./trace-graphics";
import { TracingPart } from "./tracing-part";
import catchError from "../../scripts/lib/error-handler";
import Config from "../../scripts/lib/config";
import { SHOW_CHILD_IMAGE, RECORDING_FINISHED, BACK_FINISHED } from "../../scripts/helper";
import { Util } from "../../scripts/util";

export interface TracePoint {
    x: number;
    y: number;
}

const DEFAULT_RECORDING_FONT_SIZE = '512';
const DEFAULT_FONT_COLOR = '#FFFFFF';

@ccclass
export default class TracingContainer extends cc.Component {

    @property()
    tracingImage: string = '';

    @property(cc.Prefab)
    imageNode: cc.Prefab = null;

    _imageLoadedTexture: any = null;
    _childImageLoadedTexture: any = null;

    private _lineWidth: number = 0;

    @property()
    tracingLetter: string = '';

    textFont: cc.Font = null;

    @property(cc.Prefab)
    traceGraphicsPrefab: cc.Prefab = null;

    @property()
    width: number = 0;

    @property()
    height: number = 0;

    @property()
    traceGenerationMode: boolean = false;

    private _traceGraphics: cc.Node = null;
    private _traceObject: cc.Node = null;
    _traceGraphicsComponent: TraceGraphics = null;

    private _currentTracingPart: TracingPart = null;
    private _tracingPaths: any[] = null;

    private _childImage: cc.Node = null;
    private _image: cc.Node = null;

    @catchError()
    protected onLoad(): void {
        this.node.width = this.width;
        this.node.height = this.height;
        cc.log('required font', Config.getInstance().currentFontName);
        this.textFont = Config.getInstance().getTextFont(Config.getInstance().currentFontName);

        this.node.on(SHOW_CHILD_IMAGE, () => {
            if (!!this._childImage && !!this._childImageLoadedTexture) {
                this.clearStarNodes();
                this._image.opacity = 255;
                this._childImage.opacity = 255;
            }

        });

        this.init();
    }

    @catchError()
    clearStarNodes() {
        this.node.children.filter(
            c => c.name === 'starNode'
        ).forEach(
            (n, i) => {
                n.opacity = 0;
            }
        );
    }

    @catchError()
    resetCurrentTracingPart() {
        this._currentTracingPart = null;
    }

    @catchError()
    private createText(parent: cc.Node,
                       text: string,
                       fontSize: string = DEFAULT_RECORDING_FONT_SIZE,
                       fontColor: string = DEFAULT_FONT_COLOR): cc.Node {
        return Util.initText(parent, this.textFont, text, fontSize, fontColor,
            true,
            new cc.Vec2(this.node.width / 2, this.node.height / (3.0 * 0.625)),
            HorizontalAlign.CENTER,
            VerticalAlign.CENTER,
            new cc.Vec2(0.5, 0.5),
            true,
            2
        );
    }

    @catchError()
    private createTracingImage(parent: cc.Node) {
        this._image = cc.instantiate(this.imageNode);

        const iName = this.tracingImage.indexOf("/") !== -1 ?
            this.tracingImage.substr(this.tracingImage.lastIndexOf('/') + 1).replace('.png', '') : this.tracingImage;
        const imageName = this.tracingImage;
        if (imageName && !this._imageLoadedTexture) {
            Util.loadTexture(imageName, (texture) => {
                if (!!texture) {
                    this._imageLoadedTexture = texture;
                    this._image.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this._imageLoadedTexture); //TODO: check if this
                    // refactoring was correct
                }
            });
        } else {
            this._image.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this._imageLoadedTexture);
        }
        this._image.setAnchorPoint(new cc.Vec2(0.5, 0.5));
        this._image.setPosition(new cc.Vec2(512, cc.winSize.height / 2));
        this._image.scale = 1;
        this._image.name = iName;
        this._image.children.forEach(c => c.opacity = 0);

        this._childImage = this._image.getChildByName('childImageNode');
        this._childImage.opacity = 0;
        let childImageName = imageName.replace("-tutorial", "");
        if (childImageName && !this._childImageLoadedTexture) {
            Util.loadTexture(childImageName, (texture) => {
                if (!!texture) {
                    this._childImageLoadedTexture = texture;
                    this._childImage.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this._childImageLoadedTexture);
                }
            });
        } else {
            this._childImage.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this._childImageLoadedTexture);
        }
        parent.addChild(this._image);
        return this._image;
    }

    @catchError()
    private init(): void {
        if (this._tracingPaths === null) {
            this._tracingPaths = [];
        }
        if (this._currentTracingPart === null) {
            this._currentTracingPart = new TracingPart();
        }

        const colors = [].concat.apply([], Util.pickRandomElements(
            ['#9900cc', '#f25949', '#00cfff', '#e556f4'], 1
        ));

        const colorSelected = colors.shift();
        this.node.opacity = 255;

        if (!!this.tracingLetter) {
            this._traceObject = this.createText(this.node, this.tracingLetter, DEFAULT_RECORDING_FONT_SIZE, colorSelected);
            this._traceObject.scale = 1.25;
        } else if (!!this.tracingImage) {
            this._traceObject = this.createTracingImage(this.node);
            this._traceObject.setPosition(new cc.Vec2(this._traceObject.x, this._traceObject.y - 100));
            this._traceObject.scale = 0.75;
        }

        this._traceGraphics = cc.instantiate(this.traceGraphicsPrefab);
        this._traceGraphicsComponent = this._traceGraphics.getComponent(TraceGraphics);
        this._traceGraphicsComponent.tracingContainerComponent = this;
        if (this._lineWidth !== 0) {
            this._traceGraphicsComponent.lineWidth = this._lineWidth;
        }
        this._traceGraphicsComponent.traceObject = this._traceObject;
        this._traceGraphicsComponent.traceGenerationMode = this.traceGenerationMode;

        // add graphics as child
        this.node.addChild(this._traceGraphics);

        // set width, height to real font or image (trace object)
        // this.node.width = this._traceObject.width;
        // this.node.height = this._traceObject.height;

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;

        this.initHandAndIndicator();
        this.node.width = this._traceObject.width;

        if (this.traceGenerationMode) {
            const finish = this.node.getChildByName("finish");
            if (finish) {
                finish.zIndex = 100;
                finish.active = true;
            }
            const reset = this.node.getChildByName("reset");
            if (reset) {
                reset.zIndex = 100;
                reset.active = true;
            }
            const back = this.node.getChildByName("back");
            if (back) {
                back.zIndex = 100;
                back.active = true;
            }
        } else {
            const finish = this.node.getChildByName("finish");
            finish.active = false;
            const reset = this.node.getChildByName("reset");
            reset.active = false;
            if (Config.getInstance().game === 'imagerecorder') {
                const back = this.node.getChildByName("back");
                back.zIndex = 100;
                back.active = true;
            } else {
                const back = this.node.getChildByName("back");
                back.active = false;
            }
        }

        if (!this.traceGenerationMode) {
            // this.loadTracePath(this.tracingLetter);
        }
    }

    @catchError()
    private initHandAndIndicator() {
        const hand: cc.Node = this.node.getChildByName("hand");
        if (hand) {
            hand.active = false; // default inactive
            hand.scale = 1;
            hand.zIndex = 999;
        }

        const indicator: cc.Node = this.node.getChildByName("indicator");
        if (indicator) {
            indicator.active = true; // default inactive
            indicator.scale = 1;
            indicator.zIndex = 999;
        }
    }

    onFinishedButtonClick(event, customEventData) {
        console.log('onFinishedButtonClick');
        const key: string = !!this.tracingLetter ? this.tracingLetter : this.tracingImage;

        this.writeToLocalStorage(key, JSON.stringify(this._tracingPaths));
        this._traceGraphicsComponent.drawCircleInTracingMode(key);
        this.node.dispatchEvent(new cc.Event.EventCustom(RECORDING_FINISHED, true));
    }

    onBackButtonClick(event, customEventData) {
        console.log('onBackButtonClick');
        this.node.dispatchEvent(new cc.Event.EventCustom(BACK_FINISHED, true));
    }

    @catchError()
    recordTouchPoint(point: cc.Vec2, ended: boolean = false) {
        if (this._tracingPaths === null) {
            this._tracingPaths = [];
        }
        if (this._currentTracingPart === null) {
            this._currentTracingPart = new TracingPart();
        }

        this._currentTracingPart.addPoint(point);

        if (ended) {
            this._tracingPaths.push(this._currentTracingPart.getAllTracingPoints());
            this._currentTracingPart = null;
        }
    }

    @catchError()
    removeFromLocalStorage() {
        const key: string = !!this.tracingLetter ? this.tracingLetter : this.tracingImage;
        cc.sys.localStorage.removeItem(key);
        this._currentTracingPart = null;
        this._tracingPaths = null;
        this._traceGraphicsComponent.clear();
    }

    @catchError()
    writeToLocalStorage(letter, data) {
        cc.sys.localStorage.setItem(letter, data);
        this.showGeneratedPath();
        console.log('key:', letter, 'json:', cc.sys.localStorage.getItem(letter));
    }

    @catchError()
    showGeneratedPath() {
        const key: string = !!this.tracingLetter ? this.tracingLetter : this.tracingImage;
        this._traceGraphicsComponent.drawCircleInTracingMode(key);
    }

    onResetButtonClick(event, customEventData) {
        console.log('onResetButtonClick');
        this.removeFromLocalStorage();
    }

    get traceObject() {
        return this._traceObject;
    }

    set traceObject(n) {
        this._traceObject = n;
    }

    get traceGraphics() {
        return this._traceGraphics;
    }

    set traceGraphics(n) {
        this._traceGraphics = n;
    }

    set lineWidth(m) {
        this._lineWidth = m;
    }
}
