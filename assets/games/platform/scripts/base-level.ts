import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Vec2 = cc.Vec2;
import { FONT_SIZE, QUIZ_GROUP } from "../../../common/scripts/helper";
import { Util } from "../../../common/scripts/util";
import Assemble from "./assemble";
import { QuizCollect } from "./quiz-collect";
import { Reward } from "./reward";

interface Quiz {
    position: cc.Vec2;
    text?: string;
}

@ccclass
export abstract class BaseLevel extends cc.Component {
    // rewards
    protected _allRewardItems: cc.Node[] = [];
    // quiz
    protected _quizItems: cc.Node[] = [];

    // letters options
    _correctAnswers: string[];
    _incorrectAnswers: string[];

    private _shouldShowReward: boolean = false;
    private _generator: any;
    private _correctNumber: number;
    @property(cc.Prefab)
    rewardPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    quizPrefab: cc.Prefab = null;

    @property({
        type: cc.Font
    })
    textFont: cc.Font = null;

    protected onLoad(): void {
    }

    protected start(): void {
        this.scheduleOnce(
            () => {
                this.initQuizPrefabs();

                if (this._shouldShowReward) {
                    this.buildRewards(true);
                }
                this.buildRewards(false);
            }, 0.5
        );
    }

    get inCorrectAnswers(): string[] {
        return this._incorrectAnswers;
    }

    set inCorrectAnswers(newVal) {
        this._incorrectAnswers = newVal;
    }

    get correctAnswers(): string[] {
        return this._correctAnswers;
    }

    set correctAnswers(newVal) {
        this._correctAnswers = newVal;
    }

    private randomRewards() {
        this._correctNumber = this.randomFruit();
        const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const index = numbers.indexOf(this._correctNumber);
        if (index !== -1) {
            numbers.splice(index, 1);
        }
        if (!this._generator) {
            this._generator = Util.shuffleGenerator(numbers);
        }

        cc.log('correct fruit to pick', this._correctNumber, ' and others', JSON.stringify(numbers));
    }

    private buildRewards(isReward: boolean): void {
        this._allRewardItems = [];
        const rewardsNodesInUI: Quiz[] = this.findRewardsOrObstacles(isReward);

        if (isReward) {
            this.randomRewards();
        }

        for (let i in rewardsNodesInUI) {
            const quiz: Quiz = rewardsNodesInUI[i];
            if (!!quiz) {
                const rewardNode = cc.instantiate(this.rewardPrefab);
                const reward = rewardNode.getComponent(Reward);
                reward.correctAnswer = this._correctNumber;
                let min = this._generator.next().value;
                isReward ? Math.random() < 0.5 ? reward.loadImage(this._correctNumber) : reward.loadImage(min) : reward.loadObstacle();
                // @ts-ignore
                rewardNode.position = new cc.Vec2(quiz.position.x, quiz.position.y + 50);
                this._allRewardItems.push(rewardNode);
            }
        }

        this.showRewards();
    }

    private randomFruit(): number {
        const platform: cc.Node = this.node.parent.parent;
        if(platform != null) {
            const assemble = platform.getComponent(Assemble);
            return assemble.randomFruitNumber;
        }
        return 0;
    }

    private buildQuizzes() {
        this._quizItems = [];
        const quizNodesInUI: Quiz[] = this.findQuizLocations();
        for (let i in quizNodesInUI) {
            const quiz: Quiz = quizNodesInUI[i];
            if (!!quiz) {
                const parent = cc.instantiate(this.quizPrefab);
                const quizCollect = parent.getComponent(QuizCollect);
                quizCollect.correctAnswers = this.correctAnswers;
                quizCollect.text = quiz.text;
                Util.initText(parent, this.textFont, quiz.text, FONT_SIZE, null, true, new Vec2(-5.5, 10));
                // @ts-ignore
                parent.position = new cc.Vec2(quiz.position.x, quiz.position.y + 50);
                this._quizItems.push(parent);
            }
        }
        this._shouldShowReward = this._quizItems.length === 0;
        this.showQuizzes();
    }

    private findRewardsOrObstacles(isReward: boolean) {
        const group = isReward ? "quizcollect" : "obstacle";
        return this.node.children
            .filter(c => c.name.startsWith("collect"))
            .map((c, index) => {
                cc.log('node', c, ' group', c.group);
                if (c.name.startsWith("collect") && c.group === group) {
                    const quiz: Quiz = {
                        position: c.getPosition()
                    };
                    return quiz;
                }
            });
    }

    private findQuizLocations(): Quiz[] {
        const length = this.node.children.filter(c => c.group === QUIZ_GROUP
            && c.name.startsWith("collect")).length || 0;
        const correctCount = this._correctAnswers.length;
        const incorrectCount = length - correctCount;

        const texts: string[] = Util.randomElements(this.correctAnswers, correctCount)
            .concat(Util.randomElements(this.inCorrectAnswers, incorrectCount));

        return !!texts && texts.length > 0 ? this.node.children
            .filter(c => c.name.startsWith("collect"))
            .map((c, index) => {
                if (c.group === QUIZ_GROUP && c.name.startsWith("collect")) {
                    const quiz: Quiz = {
                        position: c.getPosition(),
                        text    : texts[index]
                    };
                    return quiz;
                }
            }) : [];
    }

    protected showRewards(): void {
        for (let i in this._allRewardItems) {
            const r: cc.Node = this._allRewardItems[i];
            this.node.addChild(r);
        }
    }

    private showQuizzes(): void {
        for (let i in this._quizItems) {
            const r: cc.Node = this._quizItems[i];
            this.node.addChild(r);
        }
    }

    private initQuizPrefabs() {
        this.setQuizOptions();
        this.buildQuizzes();
    }

    protected abstract setQuizOptions();
}
