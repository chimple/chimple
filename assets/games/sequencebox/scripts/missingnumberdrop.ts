import Drop from "../../../common/scripts/drop";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MissingNumberDrop extends Drop {

    @property(cc.Label)
    label: cc.Label = null

    onLoad () {

    }

}
