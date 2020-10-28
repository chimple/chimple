import CommonBlock from "./CommonBlock";
import {
    FONT_SIZE,
    MATRIX_CONTAINER_SCALE,
    PLACEHOLDER_PAIR,
    RenderParams,
    SCALE,
    TouchEvents,
    Grid,
} from "./grid";
import WordBlock from "./wordblock";
import QuestionBlock from "./questionblock";
import {Util} from "../../../common/scripts/util";
import Config, {Direction} from "../../../common/scripts/lib/config";
import Vec2 = cc.Vec2;
import catchError from "../../../common/scripts/lib/error-handler";

const {ccclass, property} = cc._decorator;

const MIN_MATCH = 40;

@ccclass
export default class AnswerBlock extends CommonBlock {
    private originalPosition: Vec2 = new Vec2(0, 0);
    private finishPosition: Vec2 = new Vec2(0, 0);
    private matchRect: cc.Rect = null;
    private pairingPlaceHolderBlock: WordBlock;
    private match: boolean = false;
    private grid: Grid;
    private moved: boolean = false;
    protected _sound: any = null;
    protected _soundID: number;
    protected _explode: cc.Node = null;
    protected _startPos: cc.Vec2 = null;
    _isRTL: boolean = false;
    private shouldStopMovementX: boolean = false;
    private shouldStopMovementY: boolean = false;

    @property({
        type: cc.AudioClip,
    })
    wrongMoveAudio: cc.AudioClip = null;

    @property({
        type: cc.AudioClip,
    })
    rightMoveAudio: cc.AudioClip = null;

    @property({
        type: cc.AudioClip,
    })
    problemClear: cc.AudioClip = null;

    @property(cc.Prefab)
    explodeParticle: cc.Prefab = null;

    questionBlocksMap: Map<string, string[]> = new Map<string, string[]>();

    @catchError()
    protected onLoad(): void {
        this.node.on(TouchEvents.TOUCH_START, this.onTouchStart, this);
        this.node.on(TouchEvents.TOUCH_END, this.onTouchEnd, this);
        this.node.on(TouchEvents.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(TouchEvents.TOUCH_CANCEL, this.onTouchEnd, this);
        this.fontColor = "#654321";
        const label: cc.Node = this.createLabelNode(
            this.textFont,
            this.contentText,
            this.fontSize,
            this.fontColor
        );
        this._isRTL = Config.i.direction == Direction.RTL;
        if (this._isRTL) {
            this.node.scaleX *= -SCALE;
            this.node.scaleY *= SCALE;
        } else {
            this.node.scale *= SCALE;
        }
        this.node.addChild(label);
        this.node.width = Grid._maxNodeWidth;
        this.node.height = Grid._maxNodeHeight;
        this.highlightNode = cc.instantiate(this.slotSelectedPrefab);

        // inital load from game sound
        Util.loadGameSound(this.contentText, (clip) => {
            this._sound = clip;
        });
    }

    @catchError()
    protected start(): void {
        const matchedPlaceHolderName = this.contentText + PLACEHOLDER_PAIR;
        const ground: cc.Node = this.node.parent.getChildByName("ground");
        this.pairingPlaceHolderBlock = ground
            .getChildByName(matchedPlaceHolderName)
            .getComponent(WordBlock);
        const pairingPlaceHolderBlockBox = this.pairingPlaceHolderBlock.node.getBoundingBox();
        this.matchRect = cc.Rect.fromMinMax(
            cc.v2(
                pairingPlaceHolderBlockBox.x + MIN_MATCH,
                pairingPlaceHolderBlockBox.y + MIN_MATCH
            ),
            cc.v2(
                pairingPlaceHolderBlockBox.x +
                pairingPlaceHolderBlockBox.width -
                MIN_MATCH,
                pairingPlaceHolderBlockBox.y +
                pairingPlaceHolderBlockBox.height -
                MIN_MATCH
            )
        );
        // this.matchRect = pairingPlaceHolderBlockBox;
        this.finishPosition = this.pairingPlaceHolderBlock.node.position;
        const action = cc.moveTo(0.3, this.originalPosition);
        this.node.runAction(action);
    }

    @catchError()
    checkRTLAndScale(value: number) {
        return this._isRTL ? -value * SCALE : value * SCALE;
    }

    @catchError()
    public renderAnswerHolder(renderParams: RenderParams): void {
        renderParams.yPositionAdj = 25;
        this.render(renderParams);
        if (!!renderParams.combinedQAndA) {
            const mapKey = renderParams.content;
            const questionBlocks: string[] = [];
            renderParams.combinedQAndA.split("-").map((s: string) => {
                questionBlocks.push(s);
            });
            this.questionBlocksMap.set(mapKey, questionBlocks);
        }
    }

    @catchError()
    render(renderParams: RenderParams): void {
        const x = renderParams.xPositions[renderParams.index];
        this.originalPosition = new Vec2(x, -375);
        this.originalPosition.y += (renderParams.yPositionAdj ? renderParams.yPositionAdj : 0)
        this.grid = renderParams.wordMatrix;
        this.fontSize = FONT_SIZE;
        this.contentText = renderParams.content;
        this.node.setPosition(this.originalPosition.x, this.originalPosition.y);
        renderParams.parentNode.addChild(this.node);
    }

    @catchError()
    onTouchStart(touch: cc.Touch) {
        this.shouldStopMovementX = false;
        this.shouldStopMovementY = false;

        const nPos: Vec2 = this.node
            .getParent()
            .convertToNodeSpaceAR(touch.getLocation());
        this._startPos = nPos;
        if (!this.match) {
            this.moved = false;
            new cc.Tween()
                .target(this.node)
                .to(
                    0.1,
                    {scaleX: this.checkRTLAndScale(1.1), scaleY: 1.1 * SCALE},
                    {progress: null, easing: "sineOut"}
                )
                .call(() => {
                    this.speak();
                })

                .start();
        } else {
            new cc.Tween()
                .target(this.node)
                .to(
                    0.1,
                    {scaleX: this.checkRTLAndScale(1.1), scaleY: 1.1 * SCALE},
                    {progress: null, easing: "sineOut"}
                )
                .call(() => {
                    this.speak();
                })
                .start();
        }
    }

    @catchError()
    speak() {
        try {
            if (!!this._sound) {
                this._soundID = Util.play(this._sound, false);
                if (this._soundID === -1) {
                    Util.speakGameAudioOrPhonics(this.contentText, () => {
                    });
                }
            } else {
                Util.speakGameAudioOrPhonics(this.contentText, () => {
                });
            }
        } catch (e) {
        }
    }

    @catchError()
    onTouchMove(touch: cc.Touch) {
        this.moved = true;
        const delta = new cc.Vec2(
            (1 / MATRIX_CONTAINER_SCALE) * touch.getDelta().x,
            (1 / MATRIX_CONTAINER_SCALE) * touch.getDelta().y
        );

        this.node.setPosition(
            this.node.position.add(
                cc.v2(this._isRTL ? delta.neg().x : delta.x, delta.y)
            )
        );


        // this.node.setPosition(this.node.getParent().convertToNodeSpaceAR(touch.getLocation()));
        if (this.node.getBoundingBox().intersects(this.matchRect)) {
            this.match = true;
            this.pairingPlaceHolderBlock.removeHighLightedNode();
            this.pairingPlaceHolderBlock.addHighLightedNode();

            const questions: string[] = this.questionBlocksMap.get(this.contentText);

            questions.forEach((q: string) => {
                const ground = this.node.parent.getChildByName("ground");
                const questionBlock: QuestionBlock = ground
                    .getChildByName(q)
                    .getComponent(QuestionBlock);
                questionBlock.addHighLightedNode();
            });
        } else {
            this.match = false;
            this.pairingPlaceHolderBlock.removeHighLightedNode();
            const questions: string[] = this.questionBlocksMap.get(this.contentText);
            questions.forEach((q: string) => {
                const ground = this.node.parent.getChildByName("ground");
                const questionBlock: QuestionBlock = ground
                    .getChildByName(q)
                    .getComponent(QuestionBlock);
                questionBlock.removeHighLightedNode();
            });
        }

        new cc.Tween()
            .target(this.node)
            .call(() => {
                cc.audioEngine.stopEffect(this._sound);
            })
            .to(
                0.15,
                {scaleX: this.checkRTLAndScale(1), scaleY: SCALE},
                {progress: null, easing: "sineOut"}
            )
            .start();
    }

    private shouldConsiderAsInvalidMove() {
        if (this.node.position.x > cc.winSize.width / 2 - 50) {
            this.node.position.x = cc.winSize.width / 2 - 50;
            this.shouldStopMovementX = true;
        } else if (this.node.position.x < -cc.winSize.width / 2 + 50) {
            this.node.position.x = -cc.winSize.width / 2 + 50;
            this.shouldStopMovementX = true
        }

        if (this.node.position.y > cc.winSize.height / 2 - 50) {
            this.node.position.y = cc.winSize.height / 2 - 50;
            this.shouldStopMovementY = true;
        } else if (this.node.position.y < -cc.winSize.height / 2) {
            this.node.position.y = -cc.winSize.height / 2 + 50;
            this.shouldStopMovementY = true;
        }
    }

    @catchError()
    onTouchEnd(touch: cc.Touch) {
        const ePos: Vec2 = this.node
            .getParent()
            .convertToNodeSpaceAR(touch.getLocation());
        const diff: cc.Vec2 = ePos.sub(this._startPos);
        new cc.Tween()
            .target(this.node)
            .to(
                0.15,
                {scaleX: this.checkRTLAndScale(1), scaleY: SCALE},
                {progress: null, easing: "sineOut"}
            )
            .start();
        const needToLog = diff.magSqr() >= 50;
        if (this.match) {
            this.matchFound();
        } else {
            this.match = false;
            this.matchNotFound(needToLog);
        }
    }

    @catchError()
    private matchFound() {
        // disable all touches
        this.match = true;
        this.node.off(TouchEvents.TOUCH_MOVE);
        this.node.off(TouchEvents.TOUCH_END);
        this.node.parent.emit("correct");
        this.moveToPos(this.finishPosition)
            .call(() => {
                this.removeHighLightedNode();
                this.sparkle();
                if (!!this.rightMoveAudio) Util.playSfx(this.rightMoveAudio);
                this.grid.scheduleOnce(() => {
                    this.unSparkle();
                    this.grid.wordMatched(this.contentText);
                }, 0.5);
                const questions: string[] = this.questionBlocksMap.get(
                    this.contentText
                );
                questions.forEach((q: string) => {
                    const ground = this.node.parent.getChildByName("ground");
                    const questionBlock: QuestionBlock = ground
                        .getChildByName(q)
                        .getComponent(QuestionBlock);
                    questionBlock.removeHighLightedNode();
                });
                this.moved = false;
            })
            .start();
    }

    @catchError()
    private matchNotFound(needToLog: boolean) {
        this.moveToPos(this.originalPosition)
            .call(() => {
                if (this.moved && needToLog) {
                    if (!!this.wrongMoveAudio) Util.playSfx(this.wrongMoveAudio);
                    this.node.parent.emit("wrong");
                    this.moved = false;
                }
            })
            .start();
    }

    @catchError()
    private moveToPos(pos: Vec2): cc.Tween {
        return new cc.Tween().target(this.node).to(
            0.15,
            {
                position: pos,
                scaleX: this.checkRTLAndScale(1),
                scaleY: SCALE,
            },
            {progress: null, easing: "quadOut"}
        );
    }

    protected onDestroy(): void {
        cc.audioEngine.stopAllEffects();
    }

    @catchError()
    sparkle() {
        this._explode = cc.instantiate(this.explodeParticle);
        this._explode.position = this.node.position;
        this.node.parent.addChild(this._explode);
    }

    @catchError()
    unSparkle() {
        if (this._explode != null) {
            this.node.removeChild(this._explode);
            this._explode = null;
        }
    }

    protected update(dt: number) {
        this.shouldConsiderAsInvalidMove();
        if (this.shouldStopMovementX || this.shouldStopMovementY) {
            this.matchNotFound(false);
        }
    }
}
