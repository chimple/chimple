import Friend from "./friend";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    @property(cc.Node)
    friendPos: cc.Node = null
    friend: Friend = null
}
