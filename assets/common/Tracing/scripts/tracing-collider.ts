import ccclass = cc._decorator.ccclass;

@ccclass
export default class TracingCollider extends cc.Component {
    _polygonCollider: cc.PolygonCollider;
    _isTouchInside: boolean = false;


    protected onLoad(): void {
        this._polygonCollider = this.node.getComponent(cc.PolygonCollider);
        this._isTouchInside = false;
    }

    public checkIfTouchInsideCollider(point: cc.Vec2) {
        const checkPoint = new cc.Vec2(point.x / this.node.scale, point.y / this.node.scale)
        return !!this._polygonCollider ?
            cc.Intersection.pointInPolygon(checkPoint, this._polygonCollider.points) ?
                true : false : false;
    }
}
