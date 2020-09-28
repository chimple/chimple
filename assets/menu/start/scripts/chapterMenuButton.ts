import Config from "../../../common/scripts/lib/config";
import { Chapter } from "../../../common/scripts/lib/convert";
import { User } from "../../../common/scripts/lib/profile";
import { Util } from "../../../common/scripts/util";

const { ccclass, property } = cc._decorator;

const RADIUS = 64
const WIDTH = 11

@ccclass
export default class ChapterMenuButton extends cc.Component {

    @property(cc.Label)
    label: cc.Label

    @property(cc.Button)
    button: cc.Button

    @property(cc.Sprite)
    sprite: cc.Sprite

    @property(cc.Graphics)
    graphics: cc.Graphics = null

    chapter: Chapter
    content: cc.Node
    loading: cc.Node

    onLoad() {
        if (this.chapter != null) {
            const config = Config.i
            this.label.string = this.chapter.name
            Util.load(config.course.id + '/course/res/icons/' + this.chapter.image, (err, texture) => {
                if (!err) {
                    this.sprite.spriteFrame = new cc.SpriteFrame(texture);
                }
            })
            this.button.node.on('click', () => {
                config.chapter = this.chapter
                config.pushScene('menu/start/scenes/chapterLessons', 'menu')
            })
            const completedLessons = this.chapter.lessons.filter((les) => {
                const lessonProgress = User.getCurrentUser().lessonProgressMap.get(les.id)
                if(lessonProgress && lessonProgress.score >= 0) return true
            }).length
            const totalLessons = this.chapter.lessons.length
            const endAngle = completedLessons / totalLessons * Math.PI * 2
            this.graphics.circle(0, 0, RADIUS + WIDTH)
            this.graphics.fill()
            this.graphics.arc(0, 0, RADIUS + WIDTH / 2, Math.PI * 1 / 2, -endAngle + Math.PI * 1 / 2)
            this.graphics.stroke()
        }
    }
}
