import { Util } from "../../../common/scripts/util";
import UserInput from "./userInput";

const { ccclass, property } = cc._decorator;

 @ccclass
export default class CameraButton extends cc.Component {

  @property(cc.Sprite)
  userImg: cc.Sprite = null;

  cameraButtonCallback(event) {
    Util.takePictureFromCamera((value) => {
      if (value != null) {
        cc.loader.load(value, (err, texture) => {
          console.log("Got back ", texture);
          if (!err) {
            let temp = new cc.SpriteFrame(texture)
            this.userImg.spriteFrame = temp;
            UserInput.imgPath = value;
          }
        });
      }
    });
  }
}
