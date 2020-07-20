import ccclass = cc._decorator.ccclass;


const DROP_GROUP = 'drop';

@ccclass
export default class TracingNode extends cc.Component {
    private _collisionCount: number = 0;
    public counter: number = 0;
    public currentPath: string = null;

    protected onEnable(): void {
        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        // collisionManager.enabledDebugDraw = true;
        // collisionManager.enabledDrawBoundingBox = true;
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        switch (other.node.group) {
            case DROP_GROUP:
                this.collisionEnter(other, self);
                break;
        }
    }

    collisionEnter(other: cc.Collider, self: cc.Collider) {
        this._collisionCount++;
    }

    onCollisionExit(other: cc.Collider, self: cc.Collider) {
        switch (other.node.group) {
            case DROP_GROUP:
                this.collisionExit(other, self);
                break;
        }
    }

    collisionExit(other: cc.Collider, self: cc.Collider) {
        this._collisionCount--;
    }


    // onCollisionStay(other: cc.Collider, self: cc.Collider) {
    //     cc.log('self onCollisionStay', self.node.name);
    //     cc.log('other onCollisionStay', other.node.name);
    //
    // }

    get collisionCount() {
        return this._collisionCount;
    }

    set collisionCount(scale) {
        this._collisionCount = scale;
    }

}



