import { User } from "../../../../common/scripts/lib/profile";

import Config from "../../../../common/scripts/lib/config";
import Usage from "./usage";
import StudentProgressScene from "./studentProgressScene";
import ChimpleLabel from "../../../../common/scripts/chimple-label";
import {Util} from "../../../../common/scripts/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UserComponent extends cc.Component {
    @property(cc.Prefab)
    usagePrefab: cc.Prefab = null

    @property(cc.Node)
    usage: cc.Node = null

    @property(cc.Node)
    report: cc.Node = null

    user: User;

    onLoad() {
        this.addUsage();
        this.report.on('touchend', () => {
            StudentProgressScene.user = this.user
            Config.i.pushScene('private/home/secondscreen/scenes/studentProgressScene', 'private')
        })
        this.node.getChildByName("Label").getComponent(cc.Label).string = this.user.name;
        this.node.getChildByName("Edit").on('touchend', () => this.onClickEdit(), this);
        this.node.width = cc.winSize.width
    }

    protected onEnable() {
        cc.log('enable');
        const label: cc.Node = this.report.getChildByName('Label');
        if(label) {
            const chimpleLabel = label.getComponent(ChimpleLabel);
            chimpleLabel.string = Util.i18NText("report");
        }

    }

    private addUsage() {
        const usageNode = cc.instantiate(this.usagePrefab);
        const lessons: number[] = [0, 0, 0, 0, 0, 0, 0];
        const now = Date.now();
        this.user.lessonProgressMap.forEach((lp) => {
            if (lp.score >= 0 && lp.date && (now - lp.date.getTime()) < 86400000 * 7) {
                lessons[Math.floor(Math.abs((now - lp.date.getTime()) / 86400000))]++;
            }
        });
        usageNode.getComponent(Usage).lessons = lessons;
        this.usage.addChild(usageNode);
    }

    onClickEdit() {
        cc.sys.localStorage.setItem("userToEdit", this.user.id);
        Config.getInstance().pushScene('editProfile');
    }
}
