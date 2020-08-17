import Config from "./lib/config";

const { ccclass, property } = cc._decorator;

const currentStarScale: number = 22;

@ccclass
export default class ProgressMonitor extends cc.Component {

    @property(cc.SpriteFrame)
    complete: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    current: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    incomplete: cc.SpriteFrame = null;

    totalStars: number = 0;
    stopStar: boolean = false

    onLoad() {
        const config = Config.getInstance();
        this.totalStars = config.totalProblems;
        for (let index = 1; index <= this.totalStars; index++) {
            const node = new cc.Node();
            node.name = index.toString();
            const spriteNode = new cc.Node();
            spriteNode.name = 'sprite';
            node.addChild(spriteNode);
            const sprite = spriteNode.addComponent(cc.Sprite);
            if (index < config.problem) {
                sprite.spriteFrame = this.complete;
                spriteNode.scale = currentStarScale;
            } else if (index == config.problem) {
                sprite.spriteFrame = this.current;
            } else {
                sprite.spriteFrame = this.incomplete;
            }
            node.width = spriteNode.width;
            node.height = spriteNode.height;
            console.log(index);
            this.node.addChild(node);
        }
    }

    updateProgress(current: number, callback: Function) {
        const newNode = new cc.Node();
        const sprite = newNode.addComponent(cc.Sprite);
        sprite.spriteFrame = this.complete;
        newNode.name = current.toString();
        newNode.scale = 1 / currentStarScale;
        const currentPos = cc.v2(cc.winSize.width * Math.random() - cc.winSize.width / 2, -cc.winSize.height - 100)
        newNode.setPosition(currentPos);
        const currentNode = this.node.getChildByName(current.toString());
        if (currentNode != null) {
            const currentSpriteNode = currentNode.getChildByName('sprite');
            if (currentSpriteNode != null) {
                currentNode.addChild(newNode);
                const newPos = cc.v2(cc.winSize.width / 2 * Math.random() - cc.winSize.width / 4, -cc.winSize.height / 2)
                newNode.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.5, 1),
                    cc.bezierTo(0.5, [
                        cc.v2(currentPos.add(newPos).mul(0.33).add(cc.v2(200, 0))),
                        cc.v2(currentPos.add(newPos).mul(0.33).add(cc.v2(100, 0))),
                        newPos
                    ])),
                    cc.rotateBy(0.5, 360),
                    cc.spawn(
                        cc.moveTo(0.5, currentSpriteNode.position),
                        cc.scaleTo(0.5, 1 / currentStarScale)
                    ),
                    cc.callFunc(() => {
                        currentSpriteNode.removeFromParent();
                        if (current < this.totalStars) {
                            const nowNode = this.node.getChildByName((current + 1).toString());
                            const nowSpriteNode = nowNode.getChildByName('sprite');
                            nowSpriteNode.getComponent(cc.Sprite).spriteFrame = this.current;
                        }
                        callback()
                    })
                ))
            }
        }
    }
}
