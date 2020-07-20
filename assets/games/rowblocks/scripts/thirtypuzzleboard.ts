import Config from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ThirtyPuzzleBoard extends cc.Component {

    @property(cc.SpriteFrame)
    back: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    front: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    shadow: cc.SpriteFrame = null

    @property(cc.Node)
    left: cc.Node = null

    @property(cc.Node)
    right: cc.Node = null

    @property(cc.Node)
    match: cc.Node = null

    @property(cc.Node)
    truck: cc.Node = null

    @property(cc.Node)
    choice: cc.Node = null

    isMoving: boolean = false

    cards: Array<cc.Node> = null
    choiceY: number = null

    @catchError()
    onLoad() {
        this.choiceY = this.choice.y
        this.choice.y = -cc.winSize.height
        const truckX = this.truck.x
        new cc.Tween().target(this.truck)
            .set({x: cc.winSize.width})
            .to(3, {x: truckX}, {progress: null, easing: 'quadOut'})
            .call(() => {
                const anim = this.truck.getComponent(cc.Animation)
                anim.stop()
                this.onIteration()
            })
            .start()
        this.node.on('nextIteration', () => {
            this.onIteration()
        })
    }

    @catchError()
    private onIteration() {
        const prefix = Config.dir + 'games/findthematch/images/';
        const [level, worksheet, problem, choices, choice0, choice1, choice2, choice3] = Config.getInstance().data[0];
        const choiceArray = [choice0, choice1, choice2, choice3];
        this.cards = [];
        Util.load(prefix + choice0, (err, texture) => {
            const spriteNode = new cc.Node();
            const sprite = spriteNode.addComponent(cc.Sprite);
            sprite.spriteFrame = new cc.SpriteFrame(texture);
            this.left.addChild(spriteNode);
        });
        for (let index = 0; index < parseInt(choices); index++) {
            this.cards.push(this.makeChoiceCard(prefix + choiceArray[index], index));
        }
        Util.shuffle(this.cards);
        this.cards.forEach(element => {
            this.choice.addChild(element);
        });
        new cc.Tween().target(this.choice)
            .to(0.25, {y: this.choiceY}, {progress: null, easing: 'quadOut'})
            .start()
    }

    @catchError()
    private makeChoiceCard(textureName: string, index: number): cc.Node {
        const cardNode = new cc.Node(index.toString());
        const cardSprite = cardNode.addComponent(cc.Sprite);
        cardSprite.spriteFrame = this.front;
        const spriteNode = new cc.Node();
        const sprite = spriteNode.addComponent(cc.Sprite);
        Util.load(textureName, (err, texture) => {
            sprite.spriteFrame = new cc.SpriteFrame(texture)
        })
        cardNode.addChild(spriteNode);
        cardNode.on('touchstart', () => {
            if (!this.isMoving) {
                this.isMoving = true
                new cc.Tween().target(cardNode)
                    .to(0.5, {position: cardNode.convertToNodeSpaceAR(this.right.convertToWorldSpaceAR(cc.Vec2.ZERO))}, null)
                    .call(() => {
                        if (index == 0) {
                            this.node.emit('correct')
                        } else {
                            this.node.emit('wrong')
                        }
                    })
                    .call(() => {
                        if (index == 0) {
                            this.scheduleOnce(() => {
                                this.choice.removeAllChildren()
                                this.left.removeAllChildren()
                                this.isMoving = false
                                this.choice.y = -cc.winSize.height
                                this.node.emit('nextProblem', false)
                            }, 2)
                        } else {
                            new cc.Tween().target(cardNode)
                                .to(0.25, {position: cc.Vec2.ZERO}, {progress: null, easing: 'quadOut'})
                                .call(() => {
                                    this.isMoving = false
                                })
                                .start()
                        }
                    })
                    .start()
            }
        }, this)
        const tempNode = new cc.Node()
        tempNode.width = 168
        tempNode.height = 200
        tempNode.addChild(cardNode)
        return tempNode
    }
}
