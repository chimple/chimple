import ccclass = cc._decorator.ccclass;
import {PlatformPlayer} from "./platform-player";

@ccclass
export class OneSidePlatform extends cc.Component {

    _pointVelPlatform: cc.Vec2;
    _pointVelOther: cc.Vec2;
    _relativeVel: cc.Vec2;
    _relativePoint: cc.Vec2;
    _player: cc.Node = null;

    protected onLoad(): void {
        this._pointVelPlatform = cc.v2();
        this._pointVelOther = cc.v2();
        this._relativeVel = cc.v2();
        this._relativePoint = cc.v2();
        this._player = cc.find("Player");
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        let otherBody = otherCollider.body;
        let platformBody = selfCollider.body;

        let worldManifold = contact.getWorldManifold();
        let points = worldManifold.points;

        let pointVelPlatform = this._pointVelPlatform;
        let pointVelOther = this._pointVelOther;
        let relativeVel = this._relativeVel;
        let relativePoint = this._relativePoint;
        const playerComponent = this._player.getComponent(PlatformPlayer);
        console.log('_player linear velocity', playerComponent.linearVelocity())

        if (!!playerComponent.linearVelocity() && playerComponent.linearVelocity().y > 0) {
            console.log('contact.disabled as player jumping up');
            contact.disabled = true;
            return;
        }

        //check if contact points are moving into platform
        for (let i = 0; i < points.length; i++) {
            platformBody.getLinearVelocityFromWorldPoint(points[i], pointVelPlatform);
            otherBody.getLinearVelocityFromWorldPoint(points[i], pointVelOther);
            platformBody.getLocalVector(pointVelOther.subSelf(pointVelPlatform), relativeVel);
            let platformFaceX = selfCollider.getAABB().width / 2;
            if (relativeVel.y < -32 && platformFaceX - 1 * 32 >= selfCollider.getAABB().width / 2) //if moving down faster than 32 pixel/s (1m/s), handle as before
            {
                let platformFaceX = selfCollider.getAABB().width / 2;
                console.log('contact.enabled 111');
                return;
            } else if (relativeVel.y < 32) { //if moving slower than 32 pixel/s (1m/s)
                //borderline case, moving only slightly out of platform
                platformBody.getLocalPoint(points[i], relativePoint);
                let platformFaceY = selfCollider.getAABB().height / 2;  //front of platform, should only used on a box collider
                if (relativePoint.y > platformFaceY - 0.1 * 32) {
                    console.log('contact.enabled 222', relativeVel.x, relativeVel.y);
                    return;
                }
            } else {
                //moving up faster than 1 m/s
            }
        }

        // store disabled state to contact
        console.log('contact.disabled');
        contact.disabled = true;
    }
}
