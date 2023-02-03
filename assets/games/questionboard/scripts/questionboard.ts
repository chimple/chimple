import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Vec2 = cc.Vec2;
import CountingLayout from "../../../common/scripts/countingLayout";
import Game from "../../../common/scripts/game";
import Config, { Lang } from "../../../common/scripts/lib/config";
import { catchError } from "../../../common/scripts/lib/error-handler";
import { Util } from "../../../common/scripts/util";
import OptionScript from "./option-script";
import Profile, { LANGUAGE } from "../../../common/scripts/lib/profile";
import { ASSET_URL } from "../../../common/scripts/lib/constants";
import ChimpleRichText from "../../../common/scripts/chimple-richtext";
import { HELP_DIR, QUESTION_BOARD } from "../../../common/scripts/helper";

export const CORRECT_ANSWER = 'CORRECT_ANSWER';
export const WRONG_ANSWER = 'WRONG_ANSWER';
export const ENABLE_BUTTONS = 'ENABLE_BUTTONS';
export const DISABLE_BUTTONS = 'DISABLE_BUTTONS';

export const SEQUENCE_TYPE_NONE = "0";
export const SEQUENCE_TYPE_ADDITION = "1";
export const SEQUENCE_TYPE_SUBTRACTION = "2";
export const SEQUENCE_TYPE_MULTIPLY = "3";
export const SEQUENCE_TYPE_COMPARISION = "4";
export const SEQUENCE_TYPE_INCLUSION = "5";
export const SEQUENCE_TYPE_EQUATION = "6";

class EquationFormula {
    operand1: string;
    operand1Bold: boolean;
    operand2: string;
    operand2Bold: boolean;
    operator: string;
    sign: string;
    result: string;
    resultBold: boolean;
}

export interface QuestionBoardConfig {
    level: string;
    workSheet: string;
    problemNo: string;
    sequenceType: string;
    voiceSource: string;

    problemSentence: string;
    exampleNumber1: string;
    exampleNumber2: string;
    exampleNumber3: string;
    exampleNumber4: string;

    exampleWord1: string;
    exampleWord2: string;
    exampleWord3: string;
    exampleWord4: string;
    rightFormula: string;

    rightAnswer: string;
    objectValueA: string;
    objectValueB: string;
    objectValueC: string;
    objectValueD: string;

    equationValueA: string;
    equationValueB: string;
    equationSign: string;
    equationUnknown: string;
}

@ccclass
export default class QuestionBoard extends Game {
    private _currentConfig: QuestionBoardConfig = null;

    @property(cc.Prefab)
    questionLayoutPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    answerLayoutPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    whiteCardPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    yellowCardPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    greenCardPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    plusSignPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    minusSignPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    questionSignPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    countingLayout: cc.Prefab = null;

    @property(cc.Prefab)
    equalSignPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    answerEquationLayoutPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    hLayoutPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    shadowLayoutPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    optionsLayoutPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    equationTextPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    optionPrefab: cc.Prefab = null;

    @property(cc.AudioClip)
    takeClip: cc.AudioClip = null;

    @property(cc.AudioClip)
    putClip: cc.AudioClip = null;

    @property(cc.SpriteFrame)
    fruit1Texture: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    fruit2Texture: cc.SpriteFrame = null;

    private _equations: cc.Node = null;
    private _options: cc.Node = null;
    private _question: cc.Node = null;
    private _answer: cc.Node = null;

    private _fruitTextures: any[] = [];
    private _optionNodes: cc.Node[] = [];
    private _correctAnswer: string = null;
    private _equationFormula: EquationFormula = null;
    private _textures = [];
    private _wasAnsweredCorrectly: boolean = false;
    private _fruitNodes = [];
    private _registeredForReAsk: boolean = false;

    private _fruits = ['acorn', 'apple', 'cherry'];

    private _helpMode: boolean = false;
    private _helpNode: cc.Node = null;
    private _correctAnswered: boolean = false;

    @catchError()
    protected onLoad(): void {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;
        this._currentConfig = this.processConfiguration(Config.getInstance().data[0]);
        this._equationFormula = this.createFormula();
        this._fruitTextures.push(this.fruit1Texture, this.fruit2Texture);
        this._options = cc.instantiate(this.optionsLayoutPrefab);
        this._question = cc.instantiate(this.questionLayoutPrefab);
        this._answer = cc.instantiate(this.answerLayoutPrefab);
        this._equations = cc.instantiate(this.answerEquationLayoutPrefab);
        this.node.addChild(this._answer);
        this.createQuestion(this._currentConfig.problemSentence);
        this.node.addChild(this._question);
        this.node.addChild(this._equations);
        this._answer.opacity = 0;
        this._answer.setPosition(new cc.Vec2(0, 120));
        this._question.setPosition(new cc.Vec2(0, 110));
        this._options.setPosition(new cc.Vec2(0, -235));
        this.node.addChild(this._options);
        this.friendPos.removeFromParent()
        this.node.addChild(this.friendPos)
        this.subscribeToEvents();
        this._helpMode = true;
        this.createOptions();
        this.configureSound();
        this.enableButtons();
    }

    @catchError()
    private createFormula(): EquationFormula {
        const equationFormula = new EquationFormula();
        const signIndex = this._currentConfig.rightFormula.indexOf('=');
        const plusIndex = this._currentConfig.rightFormula.indexOf('+');
        const minusIndex = this._currentConfig.rightFormula.indexOf('-');
        const multiplyIndex = this._currentConfig.rightFormula.indexOf('X');
        const signBeforeOp = signIndex < plusIndex || signIndex < minusIndex || signIndex < multiplyIndex;
        const plus = this._currentConfig.rightFormula.lastIndexOf('+') !== -1;
        const minus = this._currentConfig.rightFormula.lastIndexOf('-') !== -1;
        const multiply = this._currentConfig.rightFormula.lastIndexOf('X') !== -1;
        const formula: string[] = this._currentConfig.rightFormula.split(/\+ | - | X | =/) || [];
        if (formula !== null && formula.length === 3) {
            equationFormula.sign = '=';
            if (signBeforeOp) {
                equationFormula.resultBold = formula[0].trim().startsWith('<');
                equationFormula.result = formula[0].trim().replace('<', '').replace('>', '');
                equationFormula.operand1Bold = formula[1].trim().startsWith('<');
                equationFormula.operator = plus ? '+' : minus ? '-' : multiply ? 'X' : '';
                equationFormula.operand1 = formula[1].trim().replace('<', '').replace('>', '');
                equationFormula.operand2Bold = formula[2].trim().startsWith('<');
                equationFormula.operand2 = formula[2].trim().replace('<', '').replace('>', '');
            } else {
                equationFormula.operand1Bold = formula[0].trim().startsWith('<');
                equationFormula.operand1 = formula[0].trim().replace('<', '').replace('>', '');
                equationFormula.operand2Bold = formula[1].trim().startsWith('<');
                equationFormula.operator = plus ? '+' : minus ? '-' : multiply ? 'X' : '';
                equationFormula.operand2 = formula[1].trim().replace('<', '').replace('>', '');
                equationFormula.resultBold = formula[2].trim().startsWith('<');
                equationFormula.result = formula[2].trim().replace('<', '').replace('>', '');
            }
        }
        return equationFormula;
    }

    @catchError()
    private configureSound() {
        const lang = Profile.lang || Lang.ENGLISH
        Util.loadGameSound(HELP_DIR + lang + '-help/' + QUESTION_BOARD + this._currentConfig.voiceSource, (clip) => {
            if (clip != null) {
                this.friend.extraClip = clip
            }
        });

        // cc.assetManager.loadRemote(`${ASSET_URL}/${lang}-help-remote/questionboard/${this._currentConfig.voiceSource}`, (err, clip) => {
        //     if (clip && !err) {
        //         //@ts-ignore
        //         this.friend.extraClip = clip
        //     }
        // })
    }

    @catchError()
    private createOptions() {
        for (let i = 1; i <= 4; i++) {
            if (this._currentConfig.rightAnswer === String(i)) {
                this._correctAnswer = this._currentConfig[`exampleNumber${i}`];
            }
            this.createOption(this._currentConfig[`exampleNumber${i}`], this._currentConfig[`exampleWord${i}`], this._currentConfig.rightAnswer === String(i));
        }
    }

    @catchError()
    private createQuestion(text: string) {
        const qTextNode: cc.Node = this._question.getChildByName('questionText');
        const qLabel: cc.Label = qTextNode.getComponent(cc.Label);
        qLabel.enableWrapText = true;
        qLabel.string = text;
    }

    @catchError()
    private subscribeToEvents() {
        this.node.on(CORRECT_ANSWER, (event) => {
            if (!this._correctAnswered) {
                event.stopPropagation();
                this._wasAnsweredCorrectly = true;
                this.node.emit('correct');
                this._options.opacity = 0;
                this._equations.opacity = 255;
                this.showBox(false);
                this.showEquationFormula();
                this._correctAnswered = true;
            }
        });

        this.node.on(WRONG_ANSWER, (event) => {
            event.stopPropagation();
            if (!this._correctAnswered) {
                const data = event.getUserData();
                const wrongNode = data.node;
                this._wasAnsweredCorrectly = false;
                this._equations.opacity = 0;
                this._options.opacity = 255;
                this.disableButtons();
                this.node.emit('wrong');
                this.showBox(false);
                this.showEquationFormula();
            }
        });

        this.node.on(ENABLE_BUTTONS, (event) => {
            event.stopPropagation();
            this.enableButtons();
        });

        this.node.on(DISABLE_BUTTONS, (event) => {
            event.stopPropagation();
            this.disableButtons();
        });

    }

    @catchError()
    createCountingLayout(node: cc.Node, count: string) {
        const clNode = cc.instantiate(this.countingLayout);
        clNode.width = clNode.height = 125;
        clNode.setAnchorPoint(new Vec2(0.5, 0.5));
        const cl = clNode.getComponent(CountingLayout);
        const layout = cl.getComponent(cc.Layout);
        const totalCount = this._equationFormula.operator === '-' ? this._equationFormula.operand1 :
            this._equationFormula.result;
        layout.cellSize = new cc.Size(125 / 4, 125 / 4);
        layout.resizeMode = cc.Layout.ResizeMode.CHILDREN;
        cl.fullCount = parseInt(count);
        cl.scale = 0.8;
        cl.fullTexture = this._fruitTextures[0];
        node.addChild(clNode);
        return clNode;
    }

    @catchError()
    private showEquation() {
        const layout = this.createLayout(960);
        layout.paddingTop = 75;
        layout.paddingBottom = 75;
        layout.cellSize = new cc.Size(150, 150);

        //operand  1
        const operand1 = cc.instantiate(this.whiteCardPrefab);
        operand1.name = 'operand1';
        this.createCountingLayout(operand1, this._equationFormula.operand1);
        this.addEquationToLayout(layout, operand1);

        const operator = cc.instantiate(this.greenCardPrefab);
        const signNode: cc.Node = this._equationFormula.operator === '-' ? cc.instantiate(this.minusSignPrefab)
            : this._equationFormula.operator === '+' ? cc.instantiate(this.plusSignPrefab) : null;
        operator.addChild(signNode);
        this.addEquationToLayout(layout, operator);

        const questionNode = cc.instantiate(this.yellowCardPrefab);
        const qSign: cc.Node = cc.instantiate(this.questionSignPrefab);
        questionNode.addChild(qSign);
        const op2Node: cc.Node = this.createCountingLayout(questionNode, this._equationFormula.operand2);
        op2Node.active = false;
        this.addEquationToLayout(layout, questionNode);

        const equalSign = cc.instantiate(this.greenCardPrefab);
        equalSign.addChild(cc.instantiate(this.equalSignPrefab));
        this.addEquationToLayout(layout, equalSign);

        const resultCard = cc.instantiate(this.whiteCardPrefab);
        this.createCountingLayout(resultCard, this._equationFormula.result);
        this.addEquationToLayout(layout, resultCard);

        this.showFruits(this._fruitNodes, false, () => {
            this.scheduleOnce(
                () => {
                    qSign.active = false;
                    op2Node.active = true;
                }, 0.25
            );
        });
        this.registerForReAskCall();
    }

    @catchError()
    addEquationToLayout(layout, node) {
        layout.node.addChild(node);
        this._fruitNodes.push(node);
        node.active = false;
    }

    @catchError()
    private showSubtraction() {
        const layout = this.createLayout(960);
        this.createFruits(layout.node, Number(this._equationFormula.operand1), 0, true);
        this.showFruits(this._fruitNodes, false, () => {
            this.removeFruits(layout.node, Number(this._equationFormula.operand2));
        }, 3);

        this.registerForReAskSubstractionCall();
    }

    @catchError()
    private removeFruits(parent: cc.Node, op2: number) {
        let j = 0;
        this.schedule(() => {
            const node: cc.Node = this._fruitNodes[this._fruitNodes.length - 1 - j];
            if (!!node) {
                try {
                    if (!!this.takeClip)
                        Util.play(this.takeClip, false);
                } catch (e) {

                }
                j++;
                node.getChildByName('top').active = false;
                if (!!node.getChildByName('shadow')) node.getChildByName('shadow').active = true;
                if (j === op2) {
                    this.scheduleOnce(
                        () => {
                            this.node.emit('REMOVE_FRUITS_COMPLETED');
                        }, 1
                    );

                }
            }
        }, 1, op2 - 1);
    }

    @catchError()
    private createLayout(changeWidth: number = 0, changeHeight: number = 0) {
        const hLayout = cc.instantiate(this.hLayoutPrefab);
        this._answer.addChild(hLayout);
        if (changeWidth > 0) {
            hLayout.width = changeWidth;
        }

        if (changeHeight > 0) {
            hLayout.height = changeHeight;
        }
        return hLayout.getComponent(cc.Layout);
    }

    @catchError()
    private showAddition() {
        const layout = this.createLayout(960);
        this.createFruits(layout.node, Number(this._equationFormula.operand1), Number(this._equationFormula.operand2));
        this.showFruits();
        this.registerForReAskCall();
    }

    @catchError()
    registerForReAskCall() {
        if (!this._registeredForReAsk) {
            this._registeredForReAsk = true;
            this.node.on('SHOW_FRUIT_COMPLETED', () => {
                this.reAsk();
            });
        }
    }

    @catchError()
    registerForReAskSubstractionCall() {
        if (!this._registeredForReAsk) {
            this._registeredForReAsk = true;
            this.node.on('REMOVE_FRUITS_COMPLETED', () => {
                this.reAsk();
            }, 3);
        }
    }

    @catchError()
    private showInclusion() {
        const layout = this.createLayout(960);
        this.createFruits(layout.node, Number(this._equationFormula.operand1), Number(this._equationFormula.operand2), true);
        this.showFruits(this._fruitNodes, true);
        this.registerForReAskCall();
    }

    @catchError()
    private createFruits(parent: cc.Node, op1: number, op2: number = 0, shouldCreateShadow: boolean = false) {
        for (let i = 0; i < op1; i++) {
            this._fruitNodes.push(this.createFruit(parent, 0, shouldCreateShadow));
        }

        for (let i = 0; i < op2; i++) {
            this._fruitNodes.push(this.createFruit(parent, 1, shouldCreateShadow));
        }
    }

    @catchError()
    private createFruitsForMultiplication(parent: cc.Node, op1: number, op2: number = 0, shouldCreateShadow: boolean = false) {
        for (let i = 0; i < op1; i++) {
            for (let i = 0; i < op2; i++) {
                this._fruitNodes.push(this.createFruit(parent, 0, shouldCreateShadow));
            }
        }
    }

    @catchError()
    private showFruits(array = this._fruitNodes, shadowOnTopOnLoad: boolean = false, callBack: Function = null,
        timeDelay: number = 2) {
        if (shadowOnTopOnLoad) {
            array.forEach(
                n => {
                    const shadowNode: cc.Node = n.getChildByName('shadow');
                    if (shadowOnTopOnLoad && shadowNode != null) {
                        n.getChildByName('shadow').zIndex = shadowOnTopOnLoad ? 2 : 1;
                        n.getChildByName('top').zIndex = shadowOnTopOnLoad ? 1 : 2;
                        n.active = true;
                    }
                }
            );
        }

        // this.iterateAndShowNodes(array, shadowOnTopOnLoad);
        this.iterateAndShowNodesWithScheduler(array, shadowOnTopOnLoad, callBack, timeDelay);
    }

    @catchError()
    iterateAndShowNodesWithScheduler(array, shadowOnTopOnLoad, callBack: Function, timeDelay: number = 2) {
        let j = 0;
        this.unscheduleAllCallbacks();
        this.schedule(() => {
            const node: cc.Node = array[j];
            if (!!node) {
                try {
                    if (!!this.putClip)
                        Util.play(this.putClip, false);
                } catch (e) {

                }
                j++;
                node.active = true;
                const shadowNode: cc.Node = node.getChildByName('shadow');
                if (shadowOnTopOnLoad && shadowNode != null) {
                    shadowNode.active = false;
                }
            }

            if (array.length === j) {
                if (!!callBack) {
                    callBack.apply(this);
                }
                if (timeDelay !== -1) {
                    this.scheduleOnce(
                        () => {
                            this.node.emit('SHOW_FRUIT_COMPLETED');
                        }, timeDelay
                    );
                }
            }
        }, 1, array.length - 1);
    }

    iterateAndShowNodes(array, shadowOnTopOnLoad, timeDelay = 2) {
        array.forEach(
            (node, index) => {
                new cc.Tween()
                    .target(node)
                    .to(1 + index * 0.25, { opacity: 255 }, { progress: null, easing: 'quadOut' })
                    .call(() => {
                        try {
                            node.active = true;
                            const shadowNode: cc.Node = node.getChildByName('shadow');
                            if (shadowOnTopOnLoad && shadowNode != null) {
                                shadowNode.active = false;
                            }

                            try {
                                if (!!this.putClip)
                                    Util.play(this.putClip, false);
                            } catch (e) {

                            }

                        } catch (e) {

                        }
                        console.log('index', index, 'array.length - 1', array.length - 1);
                        if (array.length - 1 === index) {
                            this.scheduleOnce(
                                () => {
                                    this.node.emit('SHOW_FRUIT_COMPLETED');
                                }, timeDelay
                            );

                        }
                    })
                    .start();
            }
        );
    }

    @catchError()
    private clear() {
        this._answer.removeAllChildren(true);
        this._fruitNodes.forEach((n: cc.Node) => n.removeFromParent(true));
        this._equations.removeAllChildren(true);
        // this._options.removeAllChildren(true);
        this._fruitNodes = [];
    }

    @catchError()
    private reAsk() {
        this.clear();
        if (this._wasAnsweredCorrectly) {
            this.node.emit('nextProblem');
        } else {
            this.showBox(true);
            this.enableButtons();
        }
    }

    @catchError()
    private createFruit(parent: cc.Node, index: number, shouldCreateShadow: boolean = false) {
        const common = new cc.Node();
        const node = new cc.Node();
        node.name = 'top';
        let spriteComponent = node.addComponent(cc.Sprite);
        spriteComponent.spriteFrame = this._fruitTextures[index];
        node.scale = 0.75;
        if (shouldCreateShadow) {
            const shadow = cc.instantiate(this.shadowLayoutPrefab);
            shadow.name = 'shadow';
            const shadowSprite = shadow.getComponent(cc.Sprite);
            shadow.scale = 0.75;
            shadowSprite.spriteFrame = this._fruitTextures[index];
            common.addChild(shadow);
        }
        common.addChild(node);
        common.width = node.width;
        common.height = node.height;
        common.active = false;
        parent.addChild(common);
        return common;
    }

    @catchError()
    private showEquationFormula() {
        this.buildEquation(this._equationFormula.operand1, this._equationFormula.operand1Bold);
        this.buildEquation(this._equationFormula.operator);
        this.buildEquation(this._equationFormula.operand2, this._equationFormula.operand2Bold);
        this.buildEquation(this._equationFormula.sign);
        this.buildEquation(this._equationFormula.result, this._equationFormula.resultBold);

        switch (this._equationFormula.operator) {
            case '+':
                if (this._currentConfig.sequenceType === SEQUENCE_TYPE_ADDITION)
                    this.showAddition();
                else if (this._currentConfig.sequenceType === SEQUENCE_TYPE_INCLUSION)
                    this.showInclusion();
                else if (this._currentConfig.sequenceType === SEQUENCE_TYPE_COMPARISION)
                    this.showComparision();
                else if (this._currentConfig.sequenceType === SEQUENCE_TYPE_EQUATION)
                    this.showEquation();
                break;
            case '-':
                if (this._currentConfig.sequenceType === SEQUENCE_TYPE_SUBTRACTION)
                    this.showSubtraction();
                else if (this._currentConfig.sequenceType === SEQUENCE_TYPE_COMPARISION)
                    this.showComparision();
                else if (this._currentConfig.sequenceType === SEQUENCE_TYPE_EQUATION)
                    this.showEquation();
                break;
            case 'X':
                if (this._currentConfig.sequenceType === SEQUENCE_TYPE_MULTIPLY)
                    this.showMultiplication();
                break;
        }
    }

    @catchError()
    private showComparision() {
        const layout1 = this.createLayout(960, 150);
        const layout2 = this.createLayout(960, 150);
        layout1.node.setPosition(new cc.Vec2(layout1.node.x, layout1.node.y + this._answer.height / 4));
        layout2.node.setPosition(new cc.Vec2(layout2.node.x, layout2.node.y - this._answer.height / 4));
        const op1Count = Number(this._equationFormula.operand1);
        const op2Count = Number(this._equationFormula.operand2);
        this.createFruits(layout1.node, op1Count, 0);
        this.createFruits(layout2.node, 0, op2Count);
        const group1: cc.Node[] = [];
        for (let i = 0; i < op1Count; i++) {
            group1.push(this._fruitNodes[i]);
        }
        const group2: cc.Node[] = [];
        for (let i = op1Count; i < op1Count + op2Count; i++) {
            group2.push(this._fruitNodes[i]);
        }

        this.showFruits(group1, false, () => {
            this.showFruits(group2, false, () => {
                this.registerForReAskCall();
            });
        }, -1);
    }

    @catchError()
    private showMultiplication() {
        const layout = this.createLayout(96 * (1 + Number(this._equationFormula.operand2)));
        this.createFruitsForMultiplication(layout.node, Number(this._equationFormula.operand1), Number(this._equationFormula.operand2), false);
        this.showFruitsForMultiplication(Number(this._equationFormula.operand2));
        this.registerForReAskCall();
    }

    @catchError()
    private showFruitsForMultiplication(groupSize: number, timeDelay: number = 2) {
        let j = 0;
        const inputElements = [...this._fruitNodes];
        this.schedule(() => {
            const nodes = [];
            for (let i = 0; i < groupSize; i++) {
                nodes.push(inputElements.pop());
            }
            if (!!nodes && nodes.length > 0) {
                try {
                    if (!!this.putClip)
                        Util.play(this.putClip, false);
                } catch (e) {

                }

                nodes.forEach(
                    n => {
                        if (!!n) n.active = true;
                    }
                );

                j += groupSize;
            }

            if (this._fruitNodes.length === j) {
                this.scheduleOnce(
                    () => {
                        this.node.emit('SHOW_FRUIT_COMPLETED');
                    }, timeDelay
                );
            }
        }, 1, (this._fruitNodes.length / groupSize) - 1);
    }

    @catchError()
    private buildEquation(text, isBold: boolean = false) {
        const equationText = cc.instantiate(this.equationTextPrefab);
        equationText.setPosition(new cc.Vec2(equationText.x, equationText.y + 30));
        const richText = equationText.getComponent(ChimpleRichText);
        richText.string = isBold ? `<color=#FFFFFFF><bold>${text}</bold></color>` : `<color=#FFFFFFF>${text}</color>`;
        richText.fontSize = 80;
        const layout = this._equations.getComponent(cc.Layout);
        layout.node.addChild(richText.node);
    }

    @catchError()
    private showBox(showQuestion: boolean) {
        new cc.Tween().target(showQuestion ? this._answer : this._question)
            .to(0.25, { opacity: 255 }, { progress: null, easing: 'quadOut' })
            .to(0.15, { scaleX: 0 }, { progress: null, easing: 'quadOut' })
            .call(() => {
                new cc.Tween().target(showQuestion ? this._question : this._answer)
                    .to(0.25, { opacity: 255 }, { progress: null, easing: 'quadOut' })
                    .to(0.15, { scaleX: 1 }, { progress: null, easing: 'quadOut' })
                    .start();
            })
            .start();
    }

    // private changeTexture(texture, node: cc.Node = null) {
    //     this._optionNodes.forEach(
    //         n => {
    //             if (node !== null) {
    //                 if (n.name === node.name) {
    //                     const optionSprite = n.getComponent(cc.Button);
    //                     optionSprite.enabled = true;
    //                 } else {
    //                     const optionSprite = n.getComponent(cc.Button);
    //                     optionSprite.enabled = false;
    //                 }
    //             } else {
    //                 const optionSprite = n.getComponent(cc.Button);
    //                 optionSprite.enabled = true;
    //             }
    //         }
    //     )
    // }

    @catchError()
    private enableButtons() {
        this._optionNodes.forEach(
            n => {
                const optionSprite = n.getComponent(cc.Button);
                optionSprite.interactable = true;
            }
        );
        this.scheduleOnce(
            () => {
                this._helpMode = false;
                Util.showHelp(this._helpNode, this._helpNode);
            }, 0.5
        );

    }

    @catchError()
    private disableButtons() {
        this._optionNodes.forEach(
            n => {
                const optionSprite = n.getComponent(cc.Button);
                optionSprite.interactable = false;
            }
        );
    }

    @catchError()
    private createOption(value: string, text: string, isCorrect = false) {
        const option = cc.instantiate(this.optionPrefab);
        const backGround = option.getChildByName('Background');
        const optionComponent = option.getComponent(OptionScript);
        optionComponent.correctAnswer = this._correctAnswer;
        const optionBtn = option.getComponent(cc.Button);
        optionBtn.interactable = false;
        const eNumber = backGround.getChildByName("exampleNumber");
        const eWord = backGround.getChildByName("exampleWord");
        const labelNumber: cc.Label = eNumber.getComponent(cc.Label);
        labelNumber.string = value;
        optionComponent.text = value;
        option.name = `${value}`;
        const labelWord: cc.Label = eWord.getComponent(cc.Label);
        labelWord.string = text;
        this._options.addChild(option);
        this._optionNodes.push(option);

        if (this._helpMode && isCorrect) {
            this._helpNode = option;
        }
    }

    private processConfiguration(data: any[] = []): QuestionBoardConfig | null {
        const configurations: any[] = [].concat(...data);
        let [level, workSheet, problemNo, sequenceType, voiceSource,
            problemSentence, exampleNumber1, exampleNumber2, exampleNumber3, exampleNumber4,
            exampleWord1, exampleWord2, exampleWord3, exampleWord4, rightFormula,
            rightAnswer, objectValueA, objectValueB, objectValueC, objectValueD,
            equationValueA, equationValueB, equationSign, equationUnknown] = configurations;
        return {
            level, workSheet, problemNo, sequenceType, voiceSource,
            problemSentence, exampleNumber1, exampleNumber2, exampleNumber3, exampleNumber4,
            exampleWord1, exampleWord2, exampleWord3, exampleWord4, rightFormula,
            rightAnswer, objectValueA, objectValueB, objectValueC, objectValueD,
            equationValueA, equationValueB, equationSign, equationUnknown
        };
    }

    protected onDestroy(): void {
        cc.audioEngine.stopAllEffects();
    }
}
