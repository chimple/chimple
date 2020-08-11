const { ccclass, property } = cc._decorator;

@ccclass
export default class ChapterContents extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Node)
    layout: cc.Node = null;

}
