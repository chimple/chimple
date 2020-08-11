import Config from "../../../common/scripts/lib/config";
import LessonButton from "./lessonButton";
import Profile from "../../../common/scripts/lib/profile";
import { Util } from "../../../common/scripts/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Start extends cc.Component {
    @property(cc.Prefab)
    lessonButtonPrefab: cc.Prefab = null

    @property(cc.Node)
    layout: cc.Node = null

    onLoad() {
        const config = Config.i
        const courseProgress = Profile.getCurrentUser().courseProgress
        for (let [name, course] of Object.entries(config.courses)) {
            const currentLessonId = courseProgress[name].currentLesson
            let currentLesson = course['lessons'].find(lesson => lesson.id == currentLessonId)
            if(currentLesson == null) {
                currentLesson = course['lessons'][0]
            }

            const lessonButton = cc.instantiate(this.lessonButtonPrefab)
            const lessonButtonComp = lessonButton.getComponent(LessonButton)
            lessonButtonComp.label.string = currentLesson.name
            Util.load(name + '/' + currentLessonId + '/' + currentLesson.image, (err, texture) => {
                if (!err) {
                    lessonButtonComp.sprite.spriteFrame = new cc.SpriteFrame(texture);
                }
            })
            lessonButtonComp.button.node.on('click', () => {
                config.lesson = currentLessonId
                config.pushScene('common/scenes/lesson')
            })
            this.layout.addChild(lessonButton)
        }
    }

    onLibraryClick() {
        Config.i.pushScene('menu/start/scenes/library', 'menu')
    }
}
