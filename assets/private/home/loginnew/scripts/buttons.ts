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
          if (!!student && !!studentMap?.courseProgressMap && isConnected) {
            const tempUser = User.fromJson(student.profileInfo);
            cc.log('studentJson1 user json ', tempUser?.id,
              tempUser?.name,
              tempUser?.age,
              tempUser?.gender,
              tempUser?.imgPath,
              tempUser?.avatarImage,
              tempUser?.isTeacher,
              tempUser?.inventory,
              tempUser?.currentBg,
              tempUser?.currentCharacter,
              tempUser?.courseProgressMap,
              tempUser?.lessonProgressMap,
              tempUser?.unlockedInventory,
              tempUser?.unlockedRewards,
              tempUser?.debug,
              tempUser?.serverId,
              tempUser?.schoolId,
              tempUser?.sectionId,
              tempUser?.studentId,
              tempUser?.schoolName,
              tempUser?.sectionName,
              tempUser?.currentReward,
              tempUser?.last5Lessons
            )
            if (tempUser.isConnected) {
              user = tempUser;
            } else {
              user.isConnected = false
            }
          }
          // user.isConnected = isConnected;
          if (!studentMap) {
            user.isConnected = false;
          }
          User.setCurrentUser(user);
          User.storeUser(user);
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
