import CollectUserInfo from './collectUserInfo';
import Config, { Lang, LANG_CONFIGS } from '../../../../common/scripts/lib/config';
import Profile, { LANGUAGE } from '../../../../common/scripts/lib/profile';
import { Util } from "../../../../common/scripts/util";
import ChimpleLabel from "../../../../common/scripts/chimple-label";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LanguageSelect extends cc.Component {

    @property(cc.Node)
    languageNode: cc.Node = null;

    @property(cc.Button)
    nextButton: cc.Button = null;

    @property(cc.Prefab)
    indieLangPrefab: cc.Prefab = null;

    lastSelectedlang: number = -1;
    normalSprite: cc.SpriteFrame = null;

    @property(cc.Node)
    languageContainerNode: cc.Node = null;

    @property(cc.Node)
    questionNode: cc.Node = null;


    onLoad() {
        Profile.setValue(LANGUAGE, 'en')
        Util.loadi18NMapping(() => {
        });
        LANG_CONFIGS.forEach((ele, i) => {
            let languagePrefab = cc.instantiate(this.indieLangPrefab);
            let clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = "languageSelect";
            clickEventHandler.handler = "onLanguageClick";
            clickEventHandler.customEventData = `${i}`;

            let button1 = languagePrefab.children[0].getComponent(cc.Button);
            button1.clickEvents.push(clickEventHandler);
            languagePrefab.children[0].name = `${i}`
            languagePrefab.name = `languageprefabnew${i}`
            var bgColor = cc.Color.BLACK;
            languagePrefab.children[0].getChildByName("Background").color = bgColor.fromHEX(`${ele.colorCode}`);
            languagePrefab.getChildByName("namesymbol").getComponent(cc.Label).string = ele.symbol;
            languagePrefab.getChildByName("namelabel").getComponent(cc.Label).string = ele.displayName;
            if (i === 'en') {
                languagePrefab.getChildByName("ticksprite").active = true
            }
            this.languageContainerNode.addChild(languagePrefab);
        });
        this.node.getChildByName("horiscrollview").getComponent(cc.ScrollView).scrollToLeft();
    }

    onLanguageClick(event, customEventData) {
        for (let i = 0; i < this.languageContainerNode.childrenCount; i++) {
            this.languageContainerNode.children[i].getChildByName("ticksprite").active = false
        }
        event.target.getParent().getChildByName("ticksprite").active = true
        this.lastSelectedlang = parseInt(event.currentTarget.name)
        if (Profile.lang != customEventData) {
            Profile.setValue(LANGUAGE, customEventData);
            Util.removeAlli18NMapping();
            Util.loadi18NMapping(() => {
                const chimpleLabelComponent = this.questionNode.getComponent(ChimpleLabel);
                if (chimpleLabelComponent) {
                    chimpleLabelComponent.string = Util.i18NText(chimpleLabelComponent.key);
                }
            });

        }

        // give data to parent 
        // this.node.getParent().getParent().getComponent(CollectUserInfo).userlanguage = customData
        this.nextButton.getComponent(cc.Button).interactable = true
    }

    onNextButtonClicked(event) {
        // direct to add user scene
        const node=event.target;
        const button=node.getComponent(cc.Button)
        if(button) button.interactable=false;
        Config.loadScene('private/home/loginnew/scenes/homeLoginScene', "private", null);
    }
}
