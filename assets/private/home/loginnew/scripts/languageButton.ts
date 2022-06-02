// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ChimpleLabel from "../../../../common/scripts/chimple-label";
import Config, { Lang, LANG_CONFIGS } from "../../../../common/scripts/lib/config";
import { LANG } from "../../../../common/scripts/lib/constants";
import Profile, { LANGUAGE } from "../../../../common/scripts/lib/profile";
import { Util } from "../../../../common/scripts/util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LanguageButton extends cc.Component {

    parentNode : cc.Node = null
    language : Lang
    languageLable : cc.Label
    languageDropDownNode : cc.Node = null
    schoolNode : cc.Node
    onlanguageButtonClicked(){
        this.languageDropDownNode.active=false
        const fontToLoad = LANG_CONFIGS.get(this.language).font;
        this.languageLable.string=LANG_CONFIGS.get(this.language).displayName
        Config.i.loadFontDynamically(fontToLoad, () => {
            Profile.setValue(LANGUAGE, this.language);
            Util.removeAlli18NMapping();
            Util.loadi18NMapping(() => this.i18n());  //todo-update this node also in callback
        });
    }
    i18n() {
        if(this.parentNode != null){
            this.parentNode.getChildByName("Background").getChildByName("Label").getComponent(ChimpleLabel).string = Util.i18NText("Parent")
        }
       if(this.schoolNode != null){
        this.schoolNode.getChildByName("photo").getChildByName("name").getComponent(ChimpleLabel).string = Util.i18NText("School")
       }
    }

    // update (dt) {}
}
