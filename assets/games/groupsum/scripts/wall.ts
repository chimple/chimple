import { catchError } from "../../../common/scripts/lib/error-handler";
const { ccclass, property } = cc._decorator;

const GROUND = 180;

@ccclass
export default class Wall extends cc.Component {
  @property
  text: string;

  // LIFE-CYCLE CALLBACKS:

  @catchError()
  onLoad() {
    cc.director.getPhysicsManager().enabled = true;
    switch (this.text) {
      case "ground": {
        this.node.getComponent(cc.PhysicsBoxCollider).size.width =
          cc.winSize.width;
        this.node.getComponent(cc.PhysicsBoxCollider).offset.y =
          -cc.winSize.height / 2 - 250 + GROUND;
        break;
      }
      case "left": {
        this.node.getComponent(cc.PhysicsBoxCollider).size.height =
          cc.winSize.height;
        this.node.getComponent(cc.PhysicsBoxCollider).offset.x =
          -cc.winSize.width / 2 - 100;
        break;
      }
      case "right": {
        this.node.getComponent(cc.PhysicsBoxCollider).size.height =
          cc.winSize.height;
        this.node.getComponent(cc.PhysicsBoxCollider).offset.x =
          cc.winSize.width / 2 + 100;
      }
    }
  }
}
