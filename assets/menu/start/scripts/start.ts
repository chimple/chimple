import Config from "../../../common/scripts/lib/config";
import LessonButton from "./lessonButton";
import Profile, { User } from "../../../common/scripts/lib/profile";
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
        const courseProgress = User.getCurrentUser().courseProgress
        for (let [name, course] of Object.entries(config.courses)) {
            const currentLessonId = courseProgress[name].currentLesson
            let currentLesson = null
            let currentChapter = null
            course['chapters'].some((chapter) => {
                currentLesson = chapter.lessons.find(lesson => lesson.id == currentLessonId)
                if(currentLesson != null) {
                    currentChapter = chapter.id
                    return true
                }
            })
            if(currentLesson == null) {
                currentLesson = course['chapters'][0]['lessons'][0]
            }

            const lessonButton = cc.instantiate(this.lessonButtonPrefab)
            const lessonButtonComp = lessonButton.getComponent(LessonButton)
            lessonButtonComp.label.string = currentLesson.name
            Util.load(name + '/' + currentLesson.id + '/res/' + currentLesson.image, (err, texture) => {
                if (!err) {
                    lessonButtonComp.sprite.spriteFrame = new cc.SpriteFrame(texture);
                }
            })
            lessonButtonComp.button.node.on('click', () => {
                config.lesson = currentLesson.id
                config.chapter = currentChapter
                config.pushScene('common/scenes/lesson')
            })
            this.layout.addChild(lessonButton)
        }
    }

    onLibraryClick() {
        Config.i.pushScene('menu/start/scenes/library', 'menu')
    }
}
