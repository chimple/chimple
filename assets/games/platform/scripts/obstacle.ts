const {ccclass, property} = cc._decorator;

@ccclass
export default class Obstacle extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    onClick(event: cc.Event, customEventData: string) {
        const node:cc.Node = event.target;
        const parent = node.parent;
        const anim = parent.getComponent(cc.Animation);
        anim.stop();
        anim.play('waterfall_end');
        anim.on('finished', ()=>{
            parent.removeComponent(cc.RigidBody);
            node.removeFromParent(false);
        }, this);
    }

}
