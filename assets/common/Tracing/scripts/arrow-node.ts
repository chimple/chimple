import ccclass = cc._decorator.ccclass;

const DROP_GROUP = 'drop';

@ccclass
export default class ArrowNode extends cc.Component {
    public currentPath: string = null;
    public arrowValue: number = 0;
    public starCounter: number = 0;
    public location: cc.Vec2 = null;

    protected onEnable(): void {
        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        // collisionManager.enabledDebugDraw = true;
        // collisionManager.enabledDrawBoundingBox = true;
    }
}



