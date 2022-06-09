import Config from "../../../../common/scripts/lib/config";
import Profile, { CURRENTMODE, MAX_USERS, User } from "../../../../common/scripts/lib/profile";
import ChildGuard, { ChildGuardMode } from "./childGuard";
import WelcomePage from "./welcomePage";
import Start from "../../../../menu/start/scripts/start";
import { Util } from "../../../../common/scripts/util";
import UtilLogger from "../../../../common/scripts/util-logger";
import { Mode, Student } from "../../../../common/scripts/lib/constants";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Buttons extends cc.Component {

  userNumber: number;
  // LIFE-CYCLE CALLBACKS:

  addButtonCallback() {
    if (WelcomePage.userArr.length < MAX_USERS) {
      Config.loadScene('private/home/loginnew/scenes/homeLoginScene', "private", null);
    } else {
      cc.log(">>" + "max reached");
    }
  }

  userButtonCallback() {
    User.getUsers().forEach((user) => {
      if (this.node.name == user.id) {
        let mode = parseInt(Profile.getValue(CURRENTMODE));
        if (mode === 5 || user.studentId != null) {
          const studentJson: string = UtilLogger.fetchStudentById(user.studentId)
          let student: Student;
          let studentMap;
          if (!!studentJson) {
            student = JSON.parse(studentJson)
            if (!!student?.profileInfo) {
              studentMap = JSON.parse(student?.profileInfo)
            }
          }
          cc.log("studentJson1", studentJson)
          const isConnected = user.isConnected;
          if (!!student && !!studentMap?.courseProgressMap) {
            user = User.fromJson(student.profileInfo);
            cc.log('studentJson1 user json ', user?.id,
              user?.name,
              user?.age,
              user?.gender,
              user?.imgPath,
              user?.avatarImage,
              user?.isTeacher,
              user?.inventory,
              user?.currentBg,
              user?.currentCharacter,
              user?.courseProgressMap,
              user?.lessonProgressMap,
              user?.unlockedInventory,
              user?.unlockedRewards,
              user?.debug,
              user?.serverId,
              user?.schoolId,
              user?.sectionId,
              user?.studentId,
              user?.schoolName,
              user?.sectionName,
              user?.currentReward,
              user?.last5Lessons
            )
          }
          user.isConnected = isConnected;
          User.setCurrentUser(user);
          User.syncProfile();
          Util.preloadStartScene(this.node, cc.director.getScene().getChildByName("Canvas").getChildByName('loading'))
        }
        else {
          cc.log("userButtonCallback in normal");
          User.setCurrentUser(user);
          Util.preloadStartScene(this.node, cc.director.getScene().getChildByName("Canvas").getChildByName('loading'))
        }
      }
    });
  }

  showChildGuardDialog(mode: ChildGuardMode, userName: string) {
    var guardDialog = cc.director.getScene().getChildByName("Canvas").getChildByName("childGuard");
    guardDialog.getComponent(ChildGuard).mode = mode;
    guardDialog.getComponent(ChildGuard).userName = userName;
    guardDialog.active = true;
  }

  onClickParentButton() {
    this.showChildGuardDialog(ChildGuardMode.ADULT, null);
  }
}
