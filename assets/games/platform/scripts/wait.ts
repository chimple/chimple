const {ccclass, property} = cc._decorator;

@ccclass
export default class Wait extends cc.Component {
    onBeginContact(contact, selfCollider, otherCollider) {
        this.node.emit('waitStart');
    }

}
