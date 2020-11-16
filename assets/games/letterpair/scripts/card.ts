import { Util } from "../../../common/scripts/util";
import LetterPair from "./letterpair";
import ChimpleLabel from "../../../common/scripts/chimple-label";
import CountingLayout from "../../../common/scripts/countingLayout";
import LessonController from "../../../common/scripts/lessonController";
import Config from "../../../common/scripts/lib/config";

const { ccclass, property } = cc._decorator;

const FRUITS = [
    'items/fruit/peach',
    'items/fruit/xigua',
    'items/fruit/avacado',
    'items/fruit/pineapple',
    'items/fruit/mango',
    'items/fruit/dragonfruit',
    'items/fruit/nuts',
    'items/fruit/watermelon',
    'items/fruit/cherry',
    'items/fruit/orange',
    'items/fruit/grapes',
    'items/fruit/apple',
    'items/fruit/lemon',
    'items/fruit/banana',
    'items/fruit/acorn',
    'items/fruit/strawberry',
    'items/fruit/guava',
    'items/fruit/kiwi',
    'items/vegetable/potato',
    'items/vegetable/corn',
    'items/vegetable/capsicum',
    'items/vegetable/carrot',
    'items/vegetable/onion',
    'items/vegetable/tomato',
    'items/vegetable/chilly',
    'items/vegetable/garlic',
    'items/vegetable/peas',
    'items/vegetable/brinjal',
    'items/vegetable/spinach',
    'items/vegetable/cabbage',
    'items/vegetable/pumpkin',
    'items/vegetable/radish',
    'items/vegetable/broccoli'
]

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
    audio: string = null;
    color: cc.Color = null
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
        const giftBox = Config.i.course.type == 'maths' ? cc.instantiate(this.rectangle) : cc.instantiate(this.square)
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
        } else if (this.cardType == 'dice') {
            cc.resources.load('items/'+this.cardContent, cc.SpriteFrame, (err, spriteFrame) => {
                if (!err) {
                    const spriteNode = new cc.Node('frontSprite');
                    const sprite = spriteNode.addComponent(cc.Sprite);
                    // @ts-ignore
                    sprite.spriteFrame = spriteFrame
                    spriteNode.scale = 0.9;
                    this.node.addChild(spriteNode);

                }
            });
        } else if (this.cardType == 'number' || this.cardType == 'stick') {
            const image = this.cardType == 'number' ? FRUITS[Math.floor(Math.random() * FRUITS.length)] : 'items/shake/stick'
            cc.resources.load(image, cc.SpriteFrame, (err, spriteFrame) => {
                if (!err) {
                    const clNode = cc.instantiate(this.countingLayout);
                    const cl = clNode.getComponent(CountingLayout);
                    cl.fullCount = parseInt(this.cardContent);
                    cl.scale = 0.4
                    // @ts-ignore
                    cl.fullTexture = spriteFrame
                    // if (this.cardType == 'stick') {
                    //     const layout = cl.getComponent(cc.Layout)
                    //     layout.paddingLeft = 50
                    //     layout.paddingRight = 50
                    // }
                    this.node.addChild(clNode)
                }
            })
            if (this.audio.length == 0) {
                Util.loadNumericSound(this.cardContent, (clip) => {
                    if (clip) {
                        this.wordAudio = clip
                        this.pairCard.wordAudio = clip
                    }
                })
            }
        } else {
            const labelNode = new cc.Node('label');
            labelNode.height = this.node.height * 0.5
            labelNode.width = this.node.width * 0.8
            const label = labelNode.addComponent(ChimpleLabel);
            label.string = this.cardContent;
            label.font = this.textFont;
            label.horizontalAlign = cc.Label.HorizontalAlign.CENTER
            label.overflow = cc.Label.Overflow.SHRINK
            label.enableWrapText = false
            labelNode.color = this.color;
            label.fontSize = 128;
            label.lineHeight = 128;
            labelNode.position = new cc.Vec3(0, 128 * 0.1); // to align text with middle since in bigger font size it aligns down
            this.node.addChild(labelNode);
            if (this.audio.length == 0) {
                if (isNaN(parseInt(this.cardContent))) {
                    Util.loadsLetter(this.cardContent.toLowerCase(), (clip) => {
                        this.wordAudio = clip
                    })
                } else {
                    Util.loadNumericSound(this.cardContent, (clip) => {
                        this.wordAudio = clip
                    })
                }
            }
        }
        if (Config.i.course.type == 'maths' && this.cardType == 'image') {
            bgFront.color = this.color
        } else {
            bgBack.color = this.color
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
                new cc.Tween().target(LessonController.getFriend().node)
                    .to(0.25, { y: 0 }, { progress: null, easing: 'sineOut' })
                    .call(() => {
                        this.node.parent.parent.emit('correct');
                    })
                    .delay(1)
                    .to(0.25, { y: -600 }, { progress: null, easing: 'sineOut' })
                    .start()
                this.unregisterTouch()
                this.unSparkle();
                new cc.Tween().target(this.node)
                    .to(0.25, { position: this.pairCard.node.position, scale: 1 }, { progress: null, easing: 'elasticOut' })
                    .delay(0.5)
                    .call(() => {
                        if (this.wordAudio != null) {
                            LessonController.getFriend().speak(this.wordAudio);
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
                new cc.Tween().target(LessonController.getFriend().node)
                    .to(0.25, { y: 0 }, { progress: null, easing: 'sineOut' })
                    .call(() => {
                        this.node.parent.parent.emit('wrong');
                    })
                    .delay(1)
                    .to(0.25, { y: -600 }, { progress: null, easing: 'sineOut' })
                    .start()
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
