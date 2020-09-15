import ccclass = cc._decorator.ccclass;
import Config from "../../../common/scripts/lib/config";
import property = cc._decorator.property;
import catchError from "../../../common/scripts/lib/error-handler";

export enum ConfigType {
    Story,
    Quiz
}

@ccclass
export class Selector extends cc.Component {

    @property(cc.Prefab)
    storyPage: cc.Prefab = null;

    @property(cc.Prefab)
    quizPage: cc.Prefab = null;

    @property(cc.Prefab)
    draw: cc.Prefab = null;

    @catchError()
    protected onLoad(): void {
        const config = Config.getInstance();
        const type: ConfigType = this.processConfiguration(config.data[0]);
        const graphicsNode: cc.Node = cc.instantiate(this.draw);
        graphicsNode.zIndex = 2;
        this.node.addChild(graphicsNode);
        if (type === ConfigType.Story) {
            const story = cc.instantiate(this.storyPage);
            story.zIndex = 1;
            this.node.addChild(story);
        } else if (type === ConfigType.Quiz) {
            const quiz = cc.instantiate(this.quizPage);
            quiz.zIndex = 1;
            this.node.addChild(quiz);
        }

    }

    private processConfiguration(data: any[] = []): ConfigType {
        const configurations: any[] = [].concat(...data);
        let [name, level, description, type, ...params] = configurations;
        return type === 'S' ? ConfigType.Story : ConfigType.Quiz;
    }
}
