import Profile, { CONTACT, DIALING_CODE } from "../../../../common/scripts/lib/profile";
import { COUNTRY_CODES } from "../../../../common/scripts/lib/constants";

const { ccclass, property } = cc._decorator;

const ITEM_HEIGHT = 45;
const INITIAL_LOAD_COUNT = 16;

@ccclass
export default class CountryCodesView extends cc.Component {

    @property(cc.Node)
    layoutNode: cc.Node = null;

    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;

    @property(cc.Label)
    labelNode: cc.Label = null;


    @property(cc.Label)
    contactLabel: cc.Label = null;

    loadCount: number = 0;

    onLoad() {
        this.lazyLoadItems(INITIAL_LOAD_COUNT);
        cc.director.getScene().getChildByName("Canvas").on('touchend', this.closeView, this);
        cc.director.getScene().getChildByName("Canvas").on('closeCountryCodeView', this.closeView, this);
    }


    lazyLoadItems(count: number) {
        count = +count + INITIAL_LOAD_COUNT;
        for (let i = this.loadCount; i < Math.min(count, COUNTRY_CODES.length); i++) {
            let e = COUNTRY_CODES[i];
            let node = cc.instantiate(this.itemPrefab);
            node.getChildByName("label").getComponent(cc.Label).string = e["name"] + "\t\t\t\t" + e["dial_code"];
            let clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = "countryCodesView";
            clickEventHandler.handler = "onClickItem";
            clickEventHandler.customEventData = e["dial_code"];
            node.getComponent(cc.Button).clickEvents.push(clickEventHandler);
            this.layoutNode.getComponent(cc.Layout).node.insertChild(node, i);
            this.loadCount++;
        }
    }

    onScroll(e, data) {
        let offset = e.node.getComponent(cc.ScrollView).getScrollOffset().y;
        this.lazyLoadItems(offset / ITEM_HEIGHT);
    }

    closeView() {
        if (this.node && this.node.active) {
            this.onClickView();
        }
    }

    onClickView() {
        this.node.active = !this.node.active;
        if (!this.node.active) {
            this.layoutNode.removeAllChildren();
            this.loadCount = 0;
            this.lazyLoadItems(INITIAL_LOAD_COUNT);
        }
    }

    onClickItem(e, data) {
        this.node.active = false;
        this.labelNode.string = data;
        Profile.setValue(DIALING_CODE, data);
        if (this.contactLabel.string.length > 3) {
            Profile.setValue(CONTACT, data + this.contactLabel.string);
        }
    }
}
