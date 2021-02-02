import ccclass = cc._decorator.ccclass;
import {BaseLevel} from "./base-level";
import {Platformer} from "./platformer";
import Assemble from "./assemble";

@ccclass
export class Level extends BaseLevel {
    protected onLoad(): void {
        super.onLoad();
    }

    protected start(): void {
        super.start();
    }

    protected setQuizOptions() {
        const platform: cc.Node = this.node.parent.parent;
        if (platform !== null) {
            const assemble = platform.getComponent(Assemble);
            this.correctAnswers = assemble.pickLetters;
            this.inCorrectAnswers = assemble.showLetters;
        } else {
            this.correctAnswers = []
            this.inCorrectAnswers = []
        }
    }
}
