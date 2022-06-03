import Config from "../../../common/scripts/lib/config";
import UtilLogger from "../../../common/scripts/util-logger";
import { ItemButton } from "./itemButton";
import { School, Section } from "../../../common/scripts/lib/constants";
import { ParseImageDownloader } from "../../../common/scripts/services/ParseImageDownloader";
import { Util } from "../../../common/scripts/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SectionList extends cc.Component {

    @property(cc.Prefab)
    sectionItemPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    loadingPrefab: cc.Prefab = null;

    @property(cc.Node)
    sectionlayout: cc.Node = null

    @property(cc.Label)
    title: cc.Label = null

    // LIFE-CYCLE CALLBACKS:
    private loading: cc.Node = null;

    private sections: [] = [];

    onLoad() {
        this.createLoading()
        this.showSections()
    }

    onLogoutButtonClicked() {
        // UtilLogger.logout();
        Config.i.pushScene('private/school/scenes/schoolRegistration', 'private', null);
    }

    private showSections() {
        this.showLoading()
        this.sectionlayout.destroyAllChildren()
        const schoolJson: string = UtilLogger.findSchool(cc.sys.localStorage.getItem('SCHOOL_USER'));
        if (schoolJson != null) {
            const schoolInfo: School = JSON.parse(schoolJson);
            if (!!schoolInfo) {
                this.title.string = schoolInfo.name;
                this.loadSectionsIfEmpty(schoolInfo);
            }
        } else {

        }
    }

    private getSections(schoolInfo: School) {
        const sectionJson = UtilLogger.fetchSections(schoolInfo.firebaseId);
        if (sectionJson != null) {
            this.sections = JSON.parse(sectionJson) || [];
        }
    }

    private loadSectionsIfEmpty(schoolInfo: School) {
        this.getSections(schoolInfo);
        const that = this;
        let timeId = null;
        if (that.sections.length === 0) {
            timeId = setTimeout(() => {
                timeId != null ? clearTimeout(timeId) : '';
                that.loadSectionsIfEmpty(schoolInfo);
            }, 200);
        } else {
            timeId != null ? clearTimeout(timeId) : '';
            this.loadUi(this.sections, schoolInfo.firebaseId);
        }
    }

    private createLoading() {
        this.loading = cc.instantiate(this.loadingPrefab);
        this.loading.zIndex = 3;
        this.node.addChild(this.loading);
        this.loading.active = false;
    }

    private showLoading() {
        this.loading.active = true;
    }

    private hideLoading() {
        this.loading.active = false;
    }

    loadUi(sectionList: any, schoolFirebaseId: string) {
        this.hideLoading()
        for (const data of sectionList) {
            const sectionInfo: Section = data
            const sectionButton = cc.instantiate(this.sectionItemPrefab)
            sectionButton.getChildByName('photo').getComponentInChildren(cc.Label).string = sectionInfo.name
            if (sectionInfo.image != null) {
                Util.loadImage(sectionButton, sectionInfo.image, sectionInfo.name);
            }
            const sectionButtonItem = sectionButton.getComponent(ItemButton)
            sectionButtonItem.section = sectionInfo
            sectionButtonItem.schoolFirebaseId = schoolFirebaseId

            this.sectionlayout.addChild(sectionButton)
        }
    }

    onBackButtonClicked() {
        Config.loadScene('private/home/loginnew/scenes/welcomePage', 'private', null);
    }

    start() {

    }

    // update (dt) {}
}
