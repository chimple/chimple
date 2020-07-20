import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Config from "./lib/config";
import catchError from "./lib/error-handler";

export const QUIZ_ANSWERED = 'QUIZ_ANSWERED';

@ccclass
export default class QuizMonitor extends cc.Component {
    @property(cc.SpriteFrame)
    correctImage: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    wrongImage: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    emptyImage: cc.SpriteFrame = null;

    @property(cc.Prefab)
    imageNode: cc.Prefab = null;

    totalItems: number = 0;
    stopStar: boolean = false;

    @catchError()
    onLoad() {
        this.totalItems = Config.getInstance().totalProblems;
        for (let index = 1; index <= this.totalItems; index++) {
            const node = new cc.Node();
            this.createRewardStar(node, index);
            this.node.addChild(node);
        }
    }

    @catchError()
    private createRewardStar(node: cc.Node, index: number) {
        node.name = index.toString();
        const spriteNode = cc.instantiate(this.imageNode);
        spriteNode.name = 'sprite';
        spriteNode.group = 'gameCamera';
        node.addChild(spriteNode);
        const sprite = spriteNode.getComponent(cc.Sprite);
        sprite.spriteFrame = this.emptyImage;
        node.width = spriteNode.width;
        node.height = spriteNode.height;
    }

    @catchError()
    updateProgress(current: number, callback: Function) {
        const newNode = new cc.Node();
        const sprite = newNode.addComponent(cc.Sprite);
        sprite.spriteFrame = this.stopStar ? this.correctImage : this.wrongImage;
        newNode.name = current.toString();
        const currentNode = this.node.getChildByName(current.toString());
        if (currentNode != null) {
            const currentSpriteNode = currentNode.getChildByName('sprite');
            if (currentSpriteNode != null) {
                currentSpriteNode.removeFromParent();
                currentNode.addChild(newNode);
                callback();
            }
        }
    }
}
