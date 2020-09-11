import { Util } from "../../../common/scripts/util";
import LetterPair from "./letterpair";
import ChimpleLabel from "../../../common/scripts/chimple-label";
import CountingLayout from "../../../common/scripts/countingLayout";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Card extends cc.Component {
    @property(cc.Prefab)
    cardParticle: cc.Prefab = null;

    @property(cc.Prefab)
    explodeParticle: cc.Prefab = null;

    @property(cc.Prefab)
    countingLayout: cc.Prefab = null;

    @property({
        type: cc.AudioClip
    })
    pickupAudio: cc.AudioClip = null;

    @property({
        type: cc.AudioClip
    })
    correctAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    wordAudio: cc.AudioClip = null

    @property({
        type: cc.Font
    })
    textFont: cc.Font = null;

    @property(cc.Prefab)
    square: cc.Prefab = null

    @property(cc.Prefab)
    rectangle: cc.Prefab = null

    @property(cc.Prefab)
    block: cc.Prefab = null

    pairCard: Card = null;
    particleNode: cc.Node = null;
    cardType: string = null;
    cardContent: string = null;
    cardText: string = null;
    cardFontSize: string = null;
    cardFontColor: string = null;
    cardBgType: string = null;
    cardBgColor: string = null;
    audio: string = null;
    isInteracting: boolean = false;

    static letDrag: boolean = true


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchcancel', this.onTouchEnd, this);
        this.node.on('touchmove', this.onTouchMove, this);

        var bgBack: cc.Node = null
        var bgFront: cc.Node = null
        const giftBox = this.cardBgType == 'rectangle' ? cc.instantiate(this.rectangle) : cc.instantiate(this.square)
        bgBack = giftBox.getChildByName('giftbox')
        bgFront = giftBox.getChildByName('giftboxwhite')
        this.node.addChild(giftBox)
        if (this.cardType == 'image' || this.cardType == 'rotate') {
            Util.loadTexture(this.cardContent, (texture) => {
                const spriteNode = new cc.Node('frontSprite');
                const sprite = spriteNode.addComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame(texture);
                if (this.cardType == 'rotate') {
                    spriteNode.angle = 90;
                }
                spriteNode.scale = 0.9;
                this.node.addChild(spriteNode);
            });
        } else if (this.cardType == 'number' || this.cardType == 'stick') {
            Util.loadTexture(this.cardContent, (texture) => {
                const clNode = cc.instantiate(this.countingLayout);
                const cl = clNode.getComponent(CountingLayout);
                cl.fullCount = parseInt(this.cardText);
                cl.scale = 0.4
                cl.fullTexture = new cc.SpriteFrame(texture)
                if (this.cardType == 'stick') {
                    const layout = cl.getComponent(cc.Layout)
                    layout.paddingLeft = 50
                    layout.paddingRight = 50
                }
                this.node.addChild(clNode)
            })
            if (this.audio.length == 0) {
                Util.loadNumericSound(this.cardText, (clip) => {
                    this.wordAudio = clip
                })
            }
        } else {
            const labelNode = new cc.Node('label');
            const label = labelNode.addComponent(ChimpleLabel);
            label.string = this.cardText;
            label.font = this.textFont;
            const fontColor = cc.Color.BLACK;
            if (this.cardFontColor != '') {
                fontColor.fromHEX(this.cardFontColor);
            }
            labelNode.color = fontColor;
            if (this.cardFontSize != '') {
                const fontSize = parseInt(this.cardFontSize);
                label.fontSize = fontSize;
                label.lineHeight = fontSize;
                labelNode.position = new cc.Vec2(0, fontSize * 0.1); // to align text with middle since in bigger font size it aligns down
            }
            this.node.addChild(labelNode);
            if (this.audio.length == 0) {
                if(isNaN(parseInt(this.cardText))) {
                    Util.loadsLetter(this.cardText, (clip) => {
                        this.wordAudio = clip
                    })    
                } else {
                    Util.loadNumericSound(this.cardText, (clip) => {
                        this.wordAudio = clip
                    })    
                }
            }
        }
        if (this.cardBgColor != '') {
            const bgColor = new cc.Color();
            bgColor.fromHEX(this.cardBgColor);
            if (this.cardBgType == 'rectangle' && this.cardType == 'image') {
                bgFront.color = bgColor
            } else {
                bgBack.color = bgColor
            }
        }
        if (this.audio.length > 0) {
            Util.loadGameSound(this.audio, (clip) => {
                this.wordAudio = clip
            })
        }
    }

    start() {
        const lastChar = this.node.name.charAt(this.node.name.length - 1);
        const toMatchName = this.node.name.substr(0, this.node.name.length - 1) + (lastChar == '1' ? '2' : '1');
        this.pairCard = this.node.parent.getChildByName(toMatchName).getComponent(Card);
    }

    onDestroy() {
        this.unregisterTouch()
    }

    unregisterTouch() {
        this.node.off('touchstart', this.onTouchStart, this);
        this.node.off('touchend', this.onTouchEnd, this);
        this.node.off('touchcancel', this.onTouchEnd, this);
        this.node.off('touchmove', this.onTouchMove, this);
    }

    onTouchStart(touch: cc.Touch) {
        const match = this.node.parent.parent.getComponent(LetterPair);
        if (Card.letDrag) {
            Card.letDrag = false
            this.isInteracting = true;
            this.node.zIndex = 3
            Util.playSfx(this.pickupAudio);
            this.node.setSiblingIndex(this.node.parent.childrenCount - 1);
            new cc.Tween().target(this.node).to(0.25, { scale: 1.1 }, { progress: null, easing: 'sineOut' }).start();
        }
    }

    onTouchMove(touch: cc.Touch) {
        if (this.isInteracting) {
            this.node.setPosition(this.node.position.add(touch.getDelta()));
            if (this.node.getBoundingBoxToWorld().intersects(this.pairCard.node.getBoundingBoxToWorld())) {
                this.sparkle();
                if (this.particleNode != null) {
                    this.pairCard.node.setSiblingIndex(this.node.parent.childrenCount - 2);
                    new cc.Tween().target(this.pairCard.node).to(0.25, { scale: 1.1 }, { progress: null, easing: 'elasticOut' }).start();
                    this.pairCard.node.zIndex = 2
                    this.pairCard.sparkle();
                }
            } else {
                this.unSparkle();
                new cc.Tween().target(this.pairCard.node).to(0.25, { scale: 1 }, { progress: null, easing: 'elasticOut' }).start();
                this.pairCard.node.zIndex = 0
                this.pairCard.unSparkle();
            }
        }
    }

    onTouchEnd(touch: cc.Touch) {
        if (this.isInteracting) {
            if (this.particleNode != null) {
                const blockNode = cc.instantiate(this.block)
                const blockWidget = blockNode.getComponent(cc.Widget)
                if (blockWidget != null) {
                    blockWidget.target = cc.director.getScene()
                }
                this.node.parent.addChild(blockNode)
                blockNode.opacity = 224
                blockNode.zIndex = 1
                this.node.parent.parent.emit('correct');
                this.unregisterTouch()
                this.unSparkle();
                new cc.Tween().target(this.node)
                    .to(0.25, { position: this.pairCard.node.position, scale: 1 }, { progress: null, easing: 'elasticOut' })
                    .delay(0.5)
                    .call(() => {
                        if (this.wordAudio != null) {
                            Util.play(this.wordAudio, false);
                        }
                    })
                    .to(0.5, { position: cc.v2(-this.node.width / 2 - 20, 0) }, null)
                    .delay(0.5)
                    .call(() => {
                        const explode = cc.instantiate(this.explodeParticle);
                        explode.position = this.node.position;
                        this.node.parent.addChild(explode);
                        const match = this.node.parent.parent.getComponent(LetterPair);
                        match.scheduleOnce(() => {
                            blockNode.destroy()
                            Card.letDrag = true
                            this.isInteracting = false
                            match.drop(true);
                            this.pairCard.node.destroy()
                            this.node.destroy()
                        }, 0.25);
                        match.scheduleOnce(() => {
                            explode.destroy();
                        }, 0.5);
                    })
                    .start();
                this.pairCard.unSparkle();
                new cc.Tween().target(this.pairCard.node)
                    .to(0.25, { scale: 1 }, { progress: null, easing: 'elasticOut' })
                    .delay(0.5)
                    .to(0.5, { position: cc.v2(this.node.width / 2 + 20, 0) }, null)
                    .delay(0.5)
                    .call(() => {
                        const explode = cc.instantiate(this.explodeParticle);
                        explode.position = this.pairCard.node.position;
                        this.node.parent.addChild(explode);
                        this.node.parent.parent.getComponent(LetterPair).scheduleOnce(() => {
                            explode.destroy();
                        }, 0.5);
                    })
                    .start();
            } else {
                this.node.parent.parent.emit('wrong');
                new cc.Tween().target(this.node)
                    .to(0.25, {
                        scale: 1, position: this.node.position.clampf(
                            new cc.Vec2(this.node.width - cc.winSize.width, this.node.height - cc.winSize.height).mul(0.5),
                            new cc.Vec2(cc.winSize.width - this.node.width, cc.winSize.height - this.node.height).mul(0.5)
                        )
                    }, { progress: null, easing: 'sineOut' })
                    .call(() => {
                        const match = this.node.parent.parent.getComponent(LetterPair);
                        Card.letDrag = true
                        this.isInteracting = false
                        this.node.zIndex = 0
                        this.pairCard.node.zIndex = 0
                        match.drop(false);
                    })
                    .start();
                this.node.parent.children.forEach((element: cc.Node) => {
                    if (element != this.node && element.getBoundingBox().intersects(this.node.getBoundingBox())) {
                        let inter = new cc.Rect();
                        element.getBoundingBox().intersection(inter, this.node.getBoundingBox());
                        const mag = new cc.Vec2(inter.width / element.getBoundingBox().width, inter.height / element.getBoundingBox().height);
                        const pos = element.position.add(element.position.sub(this.node.position).scale(mag).mul(2)).clampf(
                            new cc.Vec2(element.getBoundingBox().width - cc.winSize.width, element.getBoundingBox().height - cc.winSize.height).mul(0.5),
                            new cc.Vec2(cc.winSize.width - element.getBoundingBox().width, cc.winSize.height - element.getBoundingBox().height).mul(0.5)
                        );
                        new cc.Tween().target(element).to(0.5, { position: pos }, { progress: null, easing: 'quadOut' }).start();
                    }
                });
            }
        }
    }

    sparkle() {
        if (this.particleNode == null) {
            this.particleNode = cc.instantiate(this.cardParticle);
            this.node.addChild(this.particleNode, 1, 'particle');
        }
    }

    unSparkle() {
        if (this.particleNode != null) {
            this.node.removeChild(this.particleNode);
            this.particleNode = null;
        }
    }
}
