import Config from "../../../common/scripts/lib/config";
import { Chapter } from "../../../common/scripts/lib/convert";
import { User } from "../../../common/scripts/lib/profile";
import { Util } from "../../../common/scripts/util";
import ChapterIcon from "../../../common/scripts/chapterIcon";

const { ccclass, property } = cc._decorator;

const RADIUS = 54
const WIDTH = 4

@ccclass
export default class ChapterMenuButton extends cc.Component {

    @property(cc.Label)
    label: cc.Label

    @property(cc.Button)
    button: cc.Button

    @property(cc.Graphics)
    graphics: cc.Graphics = null

    @property(cc.Prefab)
    chapterIconPrefab: cc.Prefab

    chapter: Chapter
    content: cc.Node
    loading: cc.Node
    open: boolean = true

    onLoad() {
        if (this.chapter != null) {
            const config = Config.i
            const chapterIcon = cc.instantiate(this.chapterIconPrefab)
            const chapterIconComp = chapterIcon.getComponent(ChapterIcon)
            chapterIconComp.chapter = this.chapter
            chapterIconComp.open = this.open
            this.button.node.insertChild(chapterIcon, 0)

            this.label.string = this.chapter.name
            this.button.node.on('click', () => {
                config.chapter = this.chapter
                config.pushScene('menu/start/scenes/chapterLessons', 'menu')
            })
            this.button.interactable = this.open
            const completedLessons = this.chapter.lessons.filter((les) => {
                const lessonProgress = User.getCurrentUser().lessonProgressMap.get(les.id)
                if(lessonProgress && lessonProgress.score >= 0) return true
            }).length
            const totalLessons = this.chapter.lessons.length
            const endAngle = completedLessons / totalLessons * Math.PI * 2
            // this.graphics.circle(0, 0, RADIUS + WIDTH)
            // this.graphics.fill()
            this.graphics.arc(0, 0, RADIUS + WIDTH / 2, Math.PI * 1 / 2, -endAngle + Math.PI * 1 / 2)
            this.graphics.stroke()
        }
    }
}
