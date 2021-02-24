import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Vec2 = cc.Vec2;
import HorizontalAlign = cc.Label.HorizontalAlign;
import VerticalAlign = cc.Label.VerticalAlign;
import {COLLECT_REWARD_EVENT} from "../../platform/scripts/platformer";
import Config, {Flow} from "../../../common/scripts/lib/config";
import {Util} from "../../../common/scripts/util";

export const ALL_REWARDS_COLLECTED = 'ALL_REWARDS_COLLECTED';

@ccclass
export default class RewardsMonitor extends cc.Component {
    @property(cc.SpriteFrame)
    incomplete: cc.SpriteFrame = null;

    @property(cc.Prefab)
    rewardImageNode: cc.Prefab = null;
    alphabetCollectMode: Boolean = false;

    shadowImage: cc.SpriteFrame = null;
    alphabetToCollect: string = '';
    totalItems: number = 0;

    onLoad() {
        const flow = Config.getInstance().flow;
        this.totalItems = flow === Flow.Open ? 1 : 3;
        this.node.on(COLLECT_REWARD_EVENT, (collectedItem: cc.Node, isAnsweredCorrectly: boolean) => {
            if (isAnsweredCorrectly) {
                this.collectItem(collectedItem);
            } else {
                this.removeItem(collectedItem);
            }
        });

        for (let index = 1; index <= this.totalItems; index++) {
            const node = new cc.Node();
            if (this.alphabetCollectMode) {
                this.createRewardLabel(node, index);
            } else {
                this.createRewardStar(node, index);
            }
            this.node.addChild(node);
        }
    }

    private createRewardStar(node: cc.Node, index: number) {
        node.name = index.toString();
        const spriteNode = cc.instantiate(this.rewardImageNode);
        spriteNode.scale = 0.5;
        spriteNode.name = 'sprite';
        spriteNode.group = 'gameCamera';
        node.addChild(spriteNode);
        const sprite = spriteNode.getComponent(cc.Sprite);
        sprite.spriteFrame = !!this.shadowImage ? this.shadowImage : this.incomplete;
        node.width = spriteNode.width;
        node.height = spriteNode.height;
    }

    private createRewardLabel(node: cc.Node, index: number) {
        node.name = index.toString();
        const labelNode = Util.initText(node, null, this.alphabetToCollect, '40', null, true, new Vec2(-5.5, 10),
            HorizontalAlign.CENTER, VerticalAlign.CENTER, new cc.Vec2(0.5, 0.5), true, 2);
        labelNode.group = 'gameCamera';
        node.width = 50;
        node.height = labelNode.height;
    }

    removeItem(item: cc.Node) {
        let rewardsItems = [].concat(this.node.children.filter(c => c.children.length === 2)).length;
        item.removeFromParent(false);
        if (rewardsItems === 0) {
            return;
        }
        const currentNode = this.node.getChildByName(rewardsItems.toString());
        currentNode.removeAllChildren(false);
        if (this.alphabetCollectMode) {
            this.createRewardLabel(currentNode, rewardsItems);
        } else {
            this.createRewardStar(currentNode, rewardsItems);
        }
        rewardsItems--;
    }

    collectLabel(item: cc.Node) {
        let labelItems = [].concat(this.node.children.filter(c => c.children.length === 2)).length;
        labelItems++;
        const currentNode = this.node.getChildByName(labelItems.toString());
        if (currentNode !== null) {
            const worldPos = item.convertToWorldSpaceAR(new cc.Vec2(0, 0));
            const itemPos = currentNode.convertToNodeSpaceAR(worldPos);
            item.removeFromParent();
            currentNode.addChild(item);
            item.setPosition(itemPos);
            this.smoothLabel(item, labelItems);
        }
    }

    collectReward(item: cc.Node) {
        let rewardsItems = [].concat(this.node.children.filter(c => c.children.length === 2)).length;
        rewardsItems++;
        const currentNode = this.node.getChildByName(rewardsItems.toString());
        if (currentNode != null) {
            item.children.forEach(
                c => c.group = 'gameCamera'
            );
            const currentSpriteNode = currentNode.getChildByName('sprite');
            item.width = currentSpriteNode.width;
            item.height = currentSpriteNode.height;
            item.scale = 0.5;
            item.opacity = 255;
            item.group = 'gameCamera';
            const worldPos = item.convertToWorldSpaceAR(new cc.Vec2(0, 0));
            const itemPos = currentNode.convertToNodeSpaceAR(worldPos);
            item.removeFromParent();
            currentNode.addChild(item);
            item.setPosition(itemPos);
            this.smoothPath(item, currentNode);

        } else {
            item.opacity = 0;
            item.removeFromParent(false);
        }
    }

    collectItem(item: cc.Node) {
        if (this.alphabetCollectMode) {
            this.collectLabel(item);
        } else {
            this.collectReward(item);
        }
    }

    smoothLabel(item, labelItemIndex) {
        item.runAction(
            cc.sequence([
                cc.bezierTo(1, [
                    cc.v2(item.x + 200, item.y - 200),
                    cc.v2(item.x + 400, item.y - 400),
                    new cc.Vec2(0, 0)
                ]),
                cc.callFunc(() => {
                    item.active = 0;
                    item.opacity = 0;
                    const childIndex = labelItemIndex;
                    const currentNode = this.node.getChildByName(childIndex.toString());
                    if (currentNode != null) {
                        const labelNode = currentNode.getChildByName(this.alphabetToCollect);
                        if (!!labelNode) {
                            labelNode.color = cc.Color.BLUE;
                        }
                    }
                    let labelsCollected = [].concat(this.node.children.filter(c => c.children.length === 2)).length;
                    if (labelsCollected === this.totalItems) {
                        this.node.emit(ALL_REWARDS_COLLECTED);
                    }
                })
            ])
        );
    }

    smoothPath(item, parent: cc.Node) {
        item.runAction(
            cc.sequence([
                cc.bezierTo(1, [
                    cc.v2(item.x - 200, item.y - 200),
                    cc.v2(item.x + 200, item.y - 200),
                    new cc.Vec2(0, 0)
                ]),
                cc.callFunc(() => {
                    item.x = 0;
                    item.y = 16;
                    let rewardsCollected = [].concat(this.node.children.filter(c => c.children.length === 2)).length;
                    if (rewardsCollected === this.totalItems) {
                        this.node.emit(ALL_REWARDS_COLLECTED);
                    }
                })
            ])
        );
    }
}
