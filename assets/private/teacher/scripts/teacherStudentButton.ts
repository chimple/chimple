import {Lesson} from "../../../common/scripts/lib/convert";
import Config from "../../../common/scripts/lib/config";
import {Util} from "../../../common/scripts/util";
import {ParseStudent} from "../../../common/scripts/domain/parseStudent";
import {ParseImageDownloader} from "../../../common/scripts/services/ParseImageDownloader";
import {ASSIGN_HW_TO_STUDENT} from "./teacherStudentProgress";
import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;

@ccclass
export default class TeacherStudentButton extends cc.Component {

    @property(cc.Label)
    label: cc.Label

    @property(cc.Button)
    button: cc.Button

    @property(cc.Sprite)
    sprite: cc.Sprite

    @property(cc.Sprite)
    completedSprite: cc.Sprite

    @property(cc.Material)
    grayMaterial: cc.Material

    @property(cc.Sprite)
    star1: cc.Sprite

    @property(cc.Sprite)
    star2: cc.Sprite

    @property(cc.Sprite)
    star3: cc.Sprite

    @property(cc.SpriteFrame)
    grayStar: cc.SpriteFrame

    @property(cc.SpriteFrame)
    goldStar: cc.SpriteFrame

    lesson: Lesson;
    student: ParseStudent;
    loading: cc.Node
    assessment: number = 0;
    isAssignmentPresent: boolean = false;

    async onLoad() {
        const config = Config.i
        this.label.string = this.lesson.name;
        this.node.getChildByName("checkmark").active = this.isAssignmentPresent;
        if (this.student != null) {
            this.star1.spriteFrame = this.assessment > 25 ? this.goldStar : this.grayStar;
            this.star2.spriteFrame = this.assessment > 50 ? this.goldStar : this.grayStar;
            this.star3.spriteFrame = this.assessment > 75 ? this.goldStar : this.grayStar;

            this.label.string = this.student.name
            if (this.student && this.student.image && this.student.image.url) {
                if (this.student.image.url.startsWith("http")) {
                    ParseImageDownloader.loadImage(this.student.image.url, (texture) => {
                        if (!!texture) {
                            this.sprite.spriteFrame = new cc.SpriteFrame(texture);
                        }
                    });
                } else {
                    Util.load(this.student.image.url, (err, texture) => {
                        if (!err && !!texture) {
                            this.sprite.spriteFrame = new cc.SpriteFrame(texture);
                        }
                    })
                }
            }
            this.button.node.on('touchend', () => {
                const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(ASSIGN_HW_TO_STUDENT, true);
                customEvent.setUserData({
                    studentId: this.student ? this.student.objectId : null,
                    name: this.student ? this.student.name : ''
                });
                this.node.dispatchEvent(customEvent);
            })
        }
    }
}
