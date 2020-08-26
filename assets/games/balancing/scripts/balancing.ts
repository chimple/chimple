import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Config from "../../../common/scripts/lib/config";
import BalancingButton from "./balancing-button";
import { catchError } from "../../../common/scripts/lib/error-handler";
import { Util } from "../../../common/scripts/util";

export const EQUAL_BTN = 'equalBtn';
export const LEFT_BTN = 'leftBtn';
export const RIGHT_BTN = 'rightBtn';
export const BACK_GROUND = 'Background';
export const BALANCE_BTN_CLICKED = 'BalanceBtnClicked';

export interface BalancingConfig {
    level: string;
    worksheet: string;
    problem: string;
    leftProperty: string;
    left1Count: string;
    leftOperator: string;
    left2Count: string;
    rightProperty: string;
    right1Count: string;
    rightOperator: string;
    right2Count: string;
}

const BALANCING_MACHINE_NODE = 'balancingmachine_node';
const RIGHT_BUCKET = 'right_bucket';
const LEFT_BUCKET = 'left_bucket';
const LEFT_NODE = 'left_node';
const RIGHT_NODE = 'right_node';

const LEFT = 'left';
const RIGHT = 'right';

@ccclass
export default class Balancing extends cc.Component {

    private _currentConfig: BalancingConfig = null;
    private _images = ['apple', 'guava', 'orange', 'peach'];

    @property(cc.SpriteFrame)
    apple: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    guava: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    orange: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    peach: cc.SpriteFrame = null;

    @property(cc.Prefab)
    numberLabelPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    imageNodePrefab: cc.Prefab = null;

    @property(cc.AudioClip)
    loadingAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    correctAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    inCorrectAudio: cc.AudioClip = null;

    @property(cc.Node)
    friendPos: cc.Node = null;
    friend: dragonBones.ArmatureDisplay = null;

    private _leftCount: number = null;
    private _rightCount: number = null;
    private _leftBucket: cc.Node = null;
    private _rightBucket: cc.Node = null;

    private _leftBtn: cc.Node = null;
    private _rightBtn: cc.Node = null;
    private _equalBtn: cc.Node = null;
    private _correctAnswered: boolean = false;

    @catchError()
    protected onLoad(): void {
        this._currentConfig = this.processConfiguration(Config.getInstance().data[0]);
        this.buildUI();
        Util.loadFriend((friendNode: cc.Node) => this.onFriendLoaded(friendNode));

        this.node.on(BALANCE_BTN_CLICKED, (event) => {
            event.stopPropagation();
            const data = event.getUserData();
            this.checkResult(data.type);
        });
    }

    @catchError()
    onFriendLoaded(friendNode: cc.Node) {
        this.friend = friendNode.getComponent(dragonBones.ArmatureDisplay);
        this.friendPos.addChild(friendNode);
        this.playDogAnimation('face_touch');
    }

    checkResult(sign: string) {
        switch (sign) {
            case LEFT_BTN:
                this._leftCount > this._rightCount ? this.playCorrectAnimation() : this.playWrongAnimation();
                break;

            case RIGHT_BTN:
                this._leftCount < this._rightCount ? this.playCorrectAnimation() : this.playWrongAnimation();
                break;

            case EQUAL_BTN:
                this._leftCount === this._rightCount ? this.playCorrectAnimation() : this.playWrongAnimation();
                break;
        }
    }

    @catchError()
    foodFeedingAnim(isLeft: boolean) {
        const xMove = isLeft ? 340 : -350;
        const node = isLeft ? this._leftBucket : this._rightBucket;
        return new cc.Tween()
            .target(node)
            .call(() => {
                this.playDogAnimation('face_eating');
            })
            .parallel(
                new cc.Tween().to(0.75, {x: node.x + xMove}, {progress: null, easing: 'quadOut'}),
                //@ts-ignore
                new cc.Tween().to(0.75, {y: node.y - 10}, {progress: null, easing: 'backOut'}),
                //@ts-ignore
                new cc.Tween().to(0.75, {scale: 0.5}, {progress: null, easing: 'backOut'})
            )
            .to(0.75, {scale: 0}, {progress: null, easing: 'backOut'});
    }

    @catchError()
    playFeedDog() {
        if (this._leftCount > this._rightCount) {
            return this.foodFeedingAnim(true);

        } else if (this._leftCount < this._rightCount) {
            return this.foodFeedingAnim(false);

        } else {
            return this.foodFeedingAnim(true)
                .call(() => {
                    this.foodFeedingAnim(false).start();
                });
        }
    }

    @catchError()
    playCorrectAnimation() {
        try {
            this._leftBtn.getComponent(BalancingButton).makeInteractable(false);
            this._rightBtn.getComponent(BalancingButton).makeInteractable(false);
            this._equalBtn.getComponent(BalancingButton).makeInteractable(false);

            if (!this._correctAnswered) {
                this._correctAnswered = true;
                this.playFeedDog()
                    .call(() => {
                        this.node.emit('correct');
                        this.scheduleOnce(
                            () => {
                                this.node.emit('nextProblem');
                            }, 1
                        );
                    }).start();
            }
        } catch (e) {

        }
    }

    @catchError()
    playDogAnimation(animationName: string, loop = 1) {
        if (this.friend != null) {
            this.friend.playAnimation(animationName, loop);
        }
    }

    @catchError()
    playWrongAnimation() {
        try {
            if (!this._correctAnswered) {
                this.playDogAnimation('face_wrong');
                this.node.emit('wrong');
                this.scheduleOnce(() => {
                    this._leftBtn.getComponent(BalancingButton).clicked = false;
                    this._rightBtn.getComponent(BalancingButton).clicked = false;
                    this._equalBtn.getComponent(BalancingButton).clicked = false;
                }, 0.5);
            }
        } catch (e) {

        }
    }

    @catchError()
    createImage(index: number, selectedImage) {
        const image = cc.instantiate(this.imageNodePrefab);
        image.getComponent(cc.Sprite).spriteFrame = this[selectedImage];
        return image;
    }

    @catchError()
    private buildUI() {
        this._leftBucket = this.node.getChildByName(BALANCING_MACHINE_NODE)
            .getChildByName(LEFT_BUCKET)
            .getChildByName(LEFT_NODE);
        this.setUpBucket(this._leftBucket, LEFT);

        this._rightBucket = this.node.getChildByName(BALANCING_MACHINE_NODE)
            .getChildByName(RIGHT_BUCKET)
            .getChildByName(RIGHT_NODE);
        this.setUpBucket(this._rightBucket, RIGHT);

        this._leftBtn = this.node.getChildByName(LEFT_BTN);
        this._rightBtn = this.node.getChildByName(RIGHT_BTN);
        this._equalBtn = this.node.getChildByName(EQUAL_BTN);
        this.loadingAnimation();
    }

    @catchError()
    playLoadingSound(loop: number, time: number) {
        if (loop > 0) {
            loop--;
            this.scheduleOnce(
                () => {
                    try {
                        if (!!this.loadingAudio) {
                            Util.playSfx(this.loadingAudio);
                            this.playLoadingSound(loop, time / 2);
                        }
                    } catch (e) {

                    }
                }, time
            );
        }
    }

    @catchError()
    private loadingAnimation() {
        let anim: cc.Animation = this.node.getComponent(cc.Animation);
        this.playLoadingSound(2, 0.5);
        anim.play('introduction_balance');

        this.scheduleOnce(() => {
            if (this._leftCount > this._rightCount) {
                Util.showHelp(this._leftBtn, this._leftBtn);
            } else if (this._leftCount < this._rightCount) {
                Util.showHelp(this._rightBtn, this._rightBtn);
            } else {
                Util.showHelp(this._equalBtn, this._equalBtn);
            }
        }, 1);
    }

    @catchError()
    private setUpBucket(node: cc.Node, bucketType: string) {
        switch (this._currentConfig[`${bucketType}Property`]) {
            case 'image':
                this[`_${bucketType}Count`] = Number(this._currentConfig[`${bucketType}1Count`]);
                console.log('count for ' + bucketType + this._currentConfig[`${bucketType}1Count`]);
                console.log('counter property', this[`_${bucketType}Count`]);
                this.buildStack(bucketType, node, this._currentConfig[`${bucketType}1Count`]);
                break;
            case 'number':
                if (!!this._currentConfig[`${bucketType}1Count`]
                    && !!this._currentConfig[`${bucketType}2Count`]
                    && !!this._currentConfig[`${bucketType}Operator`]) {
                    switch (this._currentConfig[`${bucketType}Operator`]) {
                        case '+':
                            this[`_${bucketType}Count`] = Number(this._currentConfig[`${bucketType}1Count`])
                                + Number(this._currentConfig[`${bucketType}2Count`]);
                            break;
                        case '-':
                            this[`_${bucketType}Count`] = Number(this._currentConfig[`${bucketType}1Count`])
                                - Number(this._currentConfig[`${bucketType}2Count`]);
                            break;

                    }
                    this.equation(node, this._currentConfig[`${bucketType}1Count`],
                        this._currentConfig[`${bucketType}Operator`],
                        this._currentConfig[`${bucketType}2Count`]);
                } else {
                    this[`_${bucketType}Count`] = Number(this._currentConfig[`${bucketType}1Count`]);
                    this.showNumber(node, this._currentConfig[`${bucketType}1Count`]);
                }
                break;
        }
    }

    @catchError()
    private equation(bucketNode: cc.Node, c1: string, op: string, c2: string) {
        this.showNumber(bucketNode, c1 + op + c2);
    }

    @catchError()
    private showNumber(bucketNode: cc.Node, c1: string) {
        const numberNode = cc.instantiate(this.numberLabelPrefab);
        const label: cc.Node = numberNode.getChildByName('label');
        if (label !== null) {
            const labelComponent = label.getComponent(cc.Label);
            labelComponent.string = String(c1);
            labelComponent.fontSize = 120;
            bucketNode.addChild(numberNode);
            const outLine = label.addComponent(cc.LabelOutline);
            outLine.width = 2;
            numberNode.position = new cc.Vec2(0, 0);
        }
    }

    @catchError()
    private buildStack(bucketType: string, node: cc.Node, c1: number) {
        let maxElementInRow = 0;
        const trayWidth = node.getParent().width;
        const selectedImage = Util.randomElements(this._images, 1)[0];
        for (let i = 0; i < c1; i++) {
            const imageSprite = this.createImage(bucketType === LEFT ? 0 : 1, selectedImage);
            node.addChild(imageSprite);
            maxElementInRow = 3;
            imageSprite.position = new cc.Vec2((i % maxElementInRow === 0 ? 0 : i % maxElementInRow === 1 ? -1 : 1) * imageSprite.width, Math.floor(i / maxElementInRow) * imageSprite.height);
        }
    }

    private processConfiguration(data: any[] = []): BalancingConfig | null {
        let configurations: any[] = [].concat(...data);

        let [level, worksheet, problem, leftProperty, left1Count,
            leftOperator, left2Count, rightProperty, right1Count,
            rightOperator, right2Count] = configurations;
        return {
            level, worksheet, problem, leftProperty, left1Count,
            leftOperator, left2Count, rightProperty, right1Count,
            rightOperator, right2Count
        };
    }
}
