import Config from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MatchingCard extends cc.Component {

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
    friendPos: cc.Node = null

    @property(cc.Node)
    choice: cc.Node = null

    @property(cc.AudioClip)
    trainClip:cc.AudioClip = null;

    isMoving: boolean = false
    friend: dragonBones.ArmatureDisplay = null

    cards: Array<cc.Node> = null
    choiceY: number = null

    @catchError()
    onLoad() {
        Util.loadFriend((friendNode: cc.Node) => {
            this.friend = friendNode.getComponent(dragonBones.ArmatureDisplay)
            this.friendPos.addChild(friendNode)
            this.friend.playAnimation('laugh', 1)
        })
        this.choiceY = this.choice.y
        this.choice.y = -cc.winSize.height
        const truckX = this.truck.x
        new cc.Tween().target(this.truck)
            .set({ x: cc.winSize.width })
            .call(()=>{Util.playSfx(this.trainClip)})
            .to(3, { x: truckX }, { progress: null, easing: 'quadOut' })
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

    private onIteration() {
        this.left.removeAllChildren()
        this.right.removeAllChildren()
        this.isMoving = false
        this.choice.y = -cc.winSize.height
        //@ts-ignore
        const [level, worksheet, problem, choices, choice0, choice1, choice2, choice3] = Config.getInstance().data[0];
        const choiceArray = [choice0, choice1, choice2, choice3];
        this.cards = [];
        Util.loadTexture(choice0, (texture) => {
            const spriteNode = new cc.Node();
            const sprite = spriteNode.addComponent(cc.Sprite);
            sprite.spriteFrame = new cc.SpriteFrame(texture);
            this.left.addChild(spriteNode);
        });
        var correctChoice: cc.Node = null
        for (let index = 0; index < parseInt(choices); index++) {
            const thisChoice = this.makeChoiceCard(choiceArray[index], index)
            this.cards.push(thisChoice);
            if(index == 0) {
                correctChoice = thisChoice
            }
        }
        Util.shuffle(this.cards);
        this.cards.forEach(element => {
            this.choice.addChild(element);
        });
        new cc.Tween().target(this.choice)
            .to(0.25, { y: this.choiceY }, { progress: null, easing: 'quadOut' })
            .call(() => {
                Util.showHelp(correctChoice, correctChoice)
            })
            .start()
    }

    private makeChoiceCard(textureName: string, index: number): cc.Node {
        const cardNode = new cc.Node(index.toString());
        const cardSprite = cardNode.addComponent(cc.Sprite);
        cardSprite.spriteFrame = this.front;
        const spriteNode = new cc.Node();
        const sprite = spriteNode.addComponent(cc.Sprite);
        Util.loadTexture(textureName, (texture) => {
            sprite.spriteFrame = new cc.SpriteFrame(texture)
        })
        cardNode.addChild(spriteNode);
        cardNode.on('touchstart', () => {
            if (!this.isMoving) {
                this.isMoving = true
                new cc.Tween().target(cardNode)
                    .to(0.5, { position: cardNode.convertToNodeSpaceAR(this.right.convertToWorldSpaceAR(cc.Vec2.ZERO)) }, null)
                    .call(() => {
                        if (index == 0) {
                            this.node.emit('correct')
                            if(this.friend != null) this.friend.playAnimation('happy', 1)
                            this.scheduleOnce(() => {
                                cardNode.removeFromParent(false);
                                cardNode.position = cc.Vec2.ZERO
                                this.right.addChild(cardNode)
                                this.choice.removeAllChildren()
                                const config = Config.getInstance()
                                if (config.problem == config.totalProblems) {
                                    const anim = this.truck.getComponent(cc.Animation)
                                    anim.play()
                                    new cc.Tween().target(this.truck)
                                        .delay(1)
                                        .call(()=>{Util.playSfx(this.trainClip)})
                                        .to(2, { x: -cc.winSize.width * 1.5 }, { progress: null, easing: 'quadOut' })
                                        .call(() => {
                                            this.node.emit('nextProblem', true)
                                        })
                                        .start()
                                } else {
                                    this.node.emit('nextProblem', false) 
                                }

                            }, 1)
                        } else {
                            this.node.emit('wrong')
                            if(this.friend != null) this.friend.playAnimation('sad', 1)
                            new cc.Tween().target(cardNode)
                                .to(0.25, { position: cc.Vec2.ZERO }, { progress: null, easing: 'quadOut' })
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
