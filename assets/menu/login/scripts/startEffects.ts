const { ccclass, property } = cc._decorator;

@ccclass
export default class StartEffects extends cc.Component {
  onLoad() {
    this.onStartEffects();
  }
  onStartEffects() {
    //title movement
    let titleAction = cc.moveTo(1, cc.v2(0, cc.winSize.width / 6));
    let titleRef = this.node
      .getChildByName("Main Camera")
      .getChildByName("chimple logo");
    titleRef.runAction(titleAction);
    //char movement
  }
}
