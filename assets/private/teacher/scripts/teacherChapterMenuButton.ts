import ChapterIcon from "../../../common/scripts/chapterIcon";
import Config from "../../../common/scripts/lib/config";
import { Chapter } from "../../../common/scripts/lib/convert";
import { TEACHER_CHAPTER_LESSONS } from "../../school/scripts/landing";

const {ccclass, property} = cc._decorator;

const RADIUS = 54
const WIDTH = 4

@ccclass
export default class TeacherChapterMenuButton extends cc.Component {

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
    completedLessons: number = 0;
    totalLessons: number = 100;

    async onLoad() {
        if (this.chapter != null) {
            const config = Config.i
            this.label.string = this.chapter.name
            const chapterIcon = cc.instantiate(this.chapterIconPrefab)
            const chapterIconComp = chapterIcon.getComponent(ChapterIcon)
            chapterIconComp.chapter = this.chapter
            this.node.insertChild(chapterIcon, 0)

            this.button.node.on('touchend', () => {
                config.chapter = this.chapter
                config.pushScene(TEACHER_CHAPTER_LESSONS, 'private')
            })

            const endAngle = this.completedLessons / this.totalLessons * Math.PI * 2
            // this.graphics.circle(0, 0, RADIUS + WIDTH)
            // this.graphics.fill()
            this.graphics.arc(0, 0, RADIUS + WIDTH / 2, Math.PI * 1 / 2, -endAngle + Math.PI * 1 / 2)
            this.graphics.stroke()
        }
    }
}
