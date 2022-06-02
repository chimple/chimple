import Config from "../../../../common/scripts/lib/config";
import { SCHOOL_REGISTRATION_SCENE, SELECT_SECTIONS_SCENE } from "../../../school/scripts/landing";
import { ParseNetwork } from "../../../../common/scripts/services/ParseNetwork";
import { ParseApi } from "../../../../common/scripts/services/parseApi";
import { ParseConnection } from "../../../../common/scripts/domain/parseConnection";
import { ParseUser } from "../../../../common/scripts/domain/parseUser";
import Profile, { IN_LOGIN_FLOW } from "../../../../common/scripts/lib/profile";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SchoolButton extends cc.Component {

    public async onSchoolButtonClicked(event) {
        Profile.setItem(IN_LOGIN_FLOW, 0)
        await this.navigateToSchool();
    }

    public async navigateToSchool() {
        const loggedInUser: ParseUser = ParseApi.getInstance().getLoggedInUser();
        const connections: ParseConnection[] = await ParseApi.getInstance().connections();
        if (!!loggedInUser && !ParseNetwork.getInstance().isEmpty(loggedInUser) &&
            !ParseNetwork.getInstance().isEmpty(connections)) {
            Config.i.pushScene(SELECT_SECTIONS_SCENE, 'private', null, true);
        } else {
            Config.i.pushScene(SCHOOL_REGISTRATION_SCENE, 'private', null);
        }
    }
}
