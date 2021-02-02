import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import { BG_NAME } from "../../../common/scripts/lib/config";

const PLAYER_Z_INDEX = 100;
const PLATFORM_ZINDEX = -5;
const BG_LAST_ZINDEX = -4;
const BG_ZINDEX = -3;
const FG_ZINDEX = -2;
const LAST_HORIZONTAL_PARALLAX_RATIO = 0.1;
const BG_HORIZONTAL_PARALLAX_RATIO = 0.2;
const FG_HORIZONTAL_PARALLAX_RATIO = 0.5;
export const COLLECT_REWARD_EVENT = 'collect_reward_event';

interface Quiz {
    position: cc.Vec2;
    text: string;
}

@ccclass
export class Platformer extends cc.Component {

    @property(cc.Prefab)
    bgLast: cc.Prefab = null;

    @property(cc.Prefab)
    bgLayer: cc.Prefab = null;

    @property(cc.Prefab)
    fgLayer: cc.Prefab = null;

    _bgNode: cc.Node = null;

    protected onLoad(): void {
        this._bgNode = cc.director.getScene().getChildByName(BG_NAME);
        if (this._bgNode == null) {
            this.arrangeScene();
        }
    }

    protected onEnable(): void {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        // physicsManager.debugDrawFlags =
        //     cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit
        // ;

        let collisionManager = cc.director.getCollisionManager();
        // collisionManager.enabledDebugDraw = true;
        // collisionManager.enabledDrawBoundingBox = true;
    }

    private createLayer(prefab: cc.Prefab, zIndex: number, index: number) {
        const layer = cc.instantiate(prefab);
        layer.setAnchorPoint(0, 0);
        layer.setPosition(layer.width * index, 0);
        layer.zIndex = zIndex;
        this._bgNode.addChild(layer);
        return layer;
    }

    private arrangeScene() {
        this._bgNode = new cc.Node();
        this._bgNode.name = BG_NAME;
        this._bgNode.zIndex = PLATFORM_ZINDEX;
        cc.director.getScene().addChild(this._bgNode);
        cc.game.addPersistRootNode(this._bgNode);
        this.createLayer(this.bgLast, BG_LAST_ZINDEX, 0);
        this.createLayer(this.bgLast, BG_LAST_ZINDEX, 1);
        this.createLayer(this.fgLayer, FG_ZINDEX, 0);
        this.createLayer(this.fgLayer, FG_ZINDEX, 1);
        this.createLayer(this.bgLayer, BG_ZINDEX, 0);
        this.createLayer(this.bgLayer, BG_ZINDEX, 1);
    }

    private moveLayers(layerNode1: cc.Node, layerNode2: cc.Node, adjustment: number, delta: number) {
        layerNode1.x += adjustment * delta;
        layerNode2.x += adjustment * delta;
        if (layerNode1.x + layerNode1.width < 0) {
            layerNode1.x = layerNode2.x + layerNode2.width;
        }
        if (layerNode2.x + layerNode2.width < 0) {
            layerNode2.x = layerNode1.x + layerNode1.width;
        }
    }

    scrollLayersInParallax(dt: number) {
        if (this._bgNode.childrenCount >= 6) {
            this.moveLayers(this._bgNode.children[0], this._bgNode.children[1], LAST_HORIZONTAL_PARALLAX_RATIO, dt);
            this.moveLayers(this._bgNode.children[2], this._bgNode.children[3], BG_HORIZONTAL_PARALLAX_RATIO, dt);
            this.moveLayers(this._bgNode.children[4], this._bgNode.children[5], FG_HORIZONTAL_PARALLAX_RATIO, dt);
        }
    }
}
