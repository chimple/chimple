import { Util } from "../../../common/scripts/util";
import Config from "../../../common/scripts/lib/config";
import { Lesson, Chapter, Course } from "../../../common/scripts/lib/convert";
import { User } from "../../../common/scripts/lib/profile";
import LessonController from "../../../common/scripts/lessonController";
import ChapterContent from "./chapterContent";
import NewChapterContent from "./newChapterContent";

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

    @property(cc.Prefab)
    chapterContentPrefab: cc.Prefab = null

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
                // const chapterContents = cc.instantiate(this.chapterContentPrefab)
                // chapterContents.width = cc.winSize.width
                // const chapterContentsComp = chapterContents.getComponent(NewChapterContent)
                // // chapterContentsComp.label.string = this.chapter.name
                // chapterContentsComp.loading = this.loading
                // chapterContentsComp.content = this.content
                config.chapter = this.chapter
                // this.content.removeAllChildren()
                // this.content.addChild(chapterContents)
                config.pushScene('menu/start/scenes/chapterLessons', 'menu')
            })
            const completedLessons = this.chapter.lessons.filter((les) => {
                return User.getCurrentUser().lessonProgressMap.has(les.id)
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
