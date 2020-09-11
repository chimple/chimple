import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Config from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";
import CountingAnswer, { VALIDATE_RESULT } from "../../../common/scripts/counting-answer";
import CountingItem from "./counting-item";
import { HELP_BTN } from "../../../common/scripts/answer-grid";


export interface TotalConfig {
    level: string;
    workSheet: string;
    problem: string;
    stoneCount: string;
    tallyCount: string;
    numberpads: string[];
}

@ccclass
export default class Total extends cc.Component {

    @property(cc.Prefab)
    layoutPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    countingAnswerPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    countingQuestionPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    stone1Prefab: cc.Prefab = null;

    @property(cc.Prefab)
    stone2Prefab: cc.Prefab = null;

    @property(cc.Prefab)
    stone3Prefab: cc.Prefab = null;

    @property(cc.Prefab)
    stone4Prefab: cc.Prefab = null;

    @property(cc.Prefab)
    stone5Prefab: cc.Prefab = null;

    @property(cc.Prefab)
    branch1Prefab: cc.Prefab = null;

    @property(cc.Prefab)
    branchesPrefab: cc.Prefab = null;

    private _layout: cc.Node = null;
    private _countingQuestion: cc.Node = null;
    private _countingAnswer: cc.Node = null;
    private _currentConfig: TotalConfig = null;


    private _stoneTypes: string[] = ['stone1', 'stone2', 'stone3', 'stone4', 'stone5'];

    private _randomPositions = [];
    private _currentCount: number = 0;
    private _totalCount: string = null;
    private _answeredCorrectly: boolean = false;
    private _recountInProgress: boolean = false;

    @catchError()
    protected onLoad(): void {
        this._currentConfig = this.processConfiguration(Config.getInstance().data[0]);
        this._layout = cc.instantiate(this.layoutPrefab);

        this._totalCount = !!this._currentConfig.stoneCount &&
        this._currentConfig.stoneCount !== this._currentConfig.numberpads[0] ?
            this._currentConfig.stoneCount
            : !!this._currentConfig.tallyCount &&
            this._currentConfig.tallyCount !== this._currentConfig.numberpads[0] ? this._currentConfig.tallyCount : null;

        this.setUpLayout();
        this.node.addChild(this._layout);


        this.node.on(VALIDATE_RESULT, (event) => {
            event.stopPropagation();
            const data = event.getUserData();
            const matchCount = this._totalCount;

            if (!this._answeredCorrectly &&
                !!data.result && data.result === matchCount) {
                this._answeredCorrectly = true;
                this._countingAnswer.getComponent(CountingAnswer).isValidResult = true;
                this.correctAnimations();
            } else {
                if (!this._answeredCorrectly) {
                    this._countingAnswer.getComponent(CountingAnswer).isValidResult = false;
                    this.wrongAnimations();
                }
            }
        });

        this.node.on(HELP_BTN, (event) => {
            event.stopPropagation();
            const data = event.getUserData();
            this.showHelp(this.helpIterator(data.helpNodes))
        })
    }

    @catchError()
    private helpIterator(helpNodes: cc.Node[]) {
        return helpNodes[Symbol.iterator]();
    }

    @catchError()
    showHelp(helpIterator) {
        let nextItem = helpIterator.next();
        if(!nextItem.done) {
            Util.showHelp(nextItem.value, nextItem.value, () => {
                this.showHelp(helpIterator);
            });
        }
        
    }

    @catchError()
    correctAnimations() {
        setTimeout(() => {
            this.node.emit('correct');    
        }, 2000);
              try {
            Util.speakEquation([String(this._totalCount)], (index) => {
                this.node.emit('nextProblem');
            });
        } catch (e) {
            this.node.emit('nextProblem');
        }
    }

    @catchError()
    wrongAnimations() {
        this.node.emit('wrong');
        this._countingAnswer.getComponent(CountingAnswer).clearDigits(false);
        this.scheduleOnce(() => {
            this.reCount();
        }, 0.25);
    }

    @catchError()
    hideItems() {
        this._countingQuestion.children.forEach(
            (n, i) => {
                const itemComponent = n.getComponent(CountingItem);
                itemComponent.hideLabel();
            });
    }

    @catchError()
    reCount() {
        if (!this._recountInProgress) {
            this.hideItems();
            this._recountInProgress = true;
            this.currentCount = 0;
            this._countingQuestion.children.forEach(
                (n, i) => {
                    new cc.Tween().target(n)
                        .to(0.5 + 0.2 * i, {opacity: 255}, null)
                        .call(() => {
                            const itemComponent = n.getComponent(CountingItem);
                            itemComponent.reCount();
                        })
                        .call(() => {
                            if (this._countingQuestion.children.length - 1 === i) {
                                this._recountInProgress = false;
                            }
                        })
                        .start();
                }
            )
        }
    }

    @catchError()
    setUpLayout() {
        this._countingQuestion = cc.instantiate(this.countingQuestionPrefab);
        this._countingQuestion.height = cc.winSize.height;
        this._layout.addChild(this._countingQuestion);
        this.addStonesOrBranches();
        this._countingAnswer = cc.instantiate(this.countingAnswerPrefab);
        const countingAnswerComponent = this._countingAnswer.getComponent(CountingAnswer);
        countingAnswerComponent.numberpads = this._currentConfig.numberpads;
        countingAnswerComponent.result = this._totalCount;
        this._layout.addChild(this._countingAnswer);
    }

    @catchError()
    private addStonesOrBranches() {
        if (!!this._currentConfig.stoneCount &&
            this._currentConfig.stoneCount !== this._currentConfig.numberpads[0]
            && this._currentConfig.stoneCount.length > 0) {
            this._randomPositions =
                Util.generatePositionsArray(this._countingQuestion.width,
                    this._countingQuestion.height - 20, 100, 30);
            this.createStones(Number(this._currentConfig.stoneCount));
            this.animate(Number(this._currentConfig.stoneCount));
        } else if (!!this._currentConfig.tallyCount && this._currentConfig.tallyCount.length > 0) {
            const fives = Math.floor(Number(this._currentConfig.tallyCount) / 5);
            const singles = Number(this._currentConfig.tallyCount) % 5;

            this._randomPositions =
                Util.generatePositionsArray(this._countingQuestion.width - 40,
                    this._countingQuestion.height - 40, 150, 50);

            this.createBranches(fives, singles);
            this.animate(fives + singles);
        }
    }

    @catchError()
    createStones(count: number) {
        for (let i = 0; i < count; i++) {
            const stoneType = this._stoneTypes[(i % 5)];
            const stoneNode = cc.instantiate(this[`${stoneType}Prefab`]);
            stoneNode.name = 'stone' + i;
            this._countingQuestion.addChild(stoneNode);
            stoneNode.getComponent(CountingItem).countingComponent = this;
            stoneNode.setPosition(
                new cc.Vec2(this._randomPositions[i].x, cc.winSize.height + 100));
        }
    }

    @catchError()
    animate(count: number) {
        this._countingQuestion.children.forEach(
            (n, i) => {
                new cc.Tween().target(n)
                    .to(0.5 + 0.2 * i / 4,
                        {position: new cc.Vec2(this._randomPositions[i].x, this._randomPositions[i].y)}, null)
                    .call(() => {
                        n.getComponent(CountingItem).playLoadingSound();
                    })
                    .start();
            }
        )
    }

    @catchError()
    createBranches(countBranches: number, countSingle: number) {
        for (let i = 0; i < countBranches; i++) {
            const stoneNode = cc.instantiate(this.branchesPrefab);
            stoneNode.name = 'branches' + i;
            this._countingQuestion.addChild(stoneNode);
            const itemComponent = stoneNode.getComponent(CountingItem);
            itemComponent.countingComponent = this;
            itemComponent.isBranches = true;
            stoneNode.setPosition(
                new cc.Vec2(this._randomPositions[i].x, cc.winSize.height + 100));
        }
        for (let i = countBranches; i < countBranches + countSingle; i++) {
            const stoneNode = cc.instantiate(this.branch1Prefab);
            stoneNode.name = 'branch' + i;
            this._countingQuestion.addChild(stoneNode);
            stoneNode.getComponent(CountingItem).countingComponent = this;
            stoneNode.setPosition(
                new cc.Vec2(this._randomPositions[i].x, cc.winSize.height + 100));
        }
    }

    private processConfiguration(data: any[] = []): TotalConfig | null {
        const configurations: any[] = [].concat(...data);
        let [level, workSheet, problem, stoneCount, tallyCount, numberpads] = configurations;
        numberpads = numberpads.split(',');
        return {
            level, workSheet, problem, stoneCount, tallyCount, numberpads
        };
    }

    get currentCount() {
        return this._currentCount;
    }

    set currentCount(n) {
        this._currentCount = n;
    }


    updateCount(times: number = 1) {
        for (let i = 0; i < times; i++) {
            this._currentCount++;
        }
        return this.currentCount;
    }

    get currentConfig() {
        return this._currentConfig;
    }
}


