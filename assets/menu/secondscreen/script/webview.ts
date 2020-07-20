import Config from "../../../common/scripts/lib/config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WebView extends cc.Component {


    start () {

    }

    onClickBackButton(){
        console.log("Button click")
        Config.getInstance().popScene();
    }
    // update (dt) {}
}
