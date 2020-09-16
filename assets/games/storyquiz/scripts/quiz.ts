import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import PageSound from "./page-sound";

import QuizTracing from "./quiz-tracing";
import FillBlanksDrag from "./fill-blanks-drag";
import FillBlanksDrop from "./fill-blanks-drop";

import QuizButton from "./quiz-button";
import Choice from "./choice";
import Config from "../../../common/scripts/lib/config";
import catchError from "../../../common/scripts/lib/error-handler";
import { Util } from "../../../common/scripts/util";
import ChimpleLabel from "../../../common/scripts/chimple-label";
import Drag from "../../../common/scripts/drag";
import { GO_TO_NEXT_PROBLEM } from "../../../common/scripts/helper";

const ADJUST_FILL_IN_BLANKS = 'ADJUST_FILL_IN_BLANKS';
export const FILL_IN_BLANKS_MATCH = 'fillInBlanksMatch';
export const FILL_IN_BLANKS_NO_MATCH = 'fillInBlanksNoMatch';

export const MULTI_CHOICE_CORRECT = 'multiChoiceCorrect';
export const MULTI_CHOICE_WRONG = 'multiChoiceWrong';
export const LINE_MATCH_CHOICE_CORRECT = 'lineMatchChoiceCorrect';
export const LINE_MATCH_CHOICE_WRONG = 'lineMatchChoiceWrong';

export interface QuizConfig {
    pageNo: string;
    type: string;
    title?: string;
    soundFile?: string;
    image?: string;
    question?: string;
    sentences?: string[];
    choices?: string[];
    choicesSound?: string[];
    correctAnswers?: string[];
}

export enum QuizBtnType {
    Sentence,
    Picture
}

export class BtnData {
    correct: boolean;
    type: QuizBtnType;
    text: string;
    pic: string;

    constructor(correct: boolean, type: QuizBtnType, text: string, pic: string) {
        this.correct = correct;
        this.type = type;
        this.text = text;
        this.pic = pic;
    }
}

export class ChoiceData {
    matchName: string;
    type: QuizBtnType;
    text: string;
    pic: string;

    constructor(matchName: string, type: QuizBtnType, text: string, pic: string) {
        this.matchName = matchName;
        this.type = type;
        this.text = text;
        this.pic = pic;
    }
}

@ccclass
export default class Quiz extends cc.Component {
    private _currentConfig: QuizConfig;
    private _soundClip: cc.AudioClip = null;
    private _page: cc.Node = null;
    private _quizDir: string = null;
    private _soundDir: string = null;
    @property(cc.Prefab)
    titleSection: cc.Prefab = null;

    @property(cc.Prefab)
    middleSection: cc.Prefab = null;

    @property(cc.Prefab)
    imageSection: cc.Prefab = null;

    @property(cc.Prefab)
    bottomSection: cc.Prefab = null;

    @property(cc.Prefab)
    bottomSectionLayout: cc.Prefab = null;

    // tracing
    @property(cc.Prefab)
    quizTracing: cc.Prefab = null;

    // fill blanks

    @property(cc.Prefab)
    fillBlankDrag: cc.Prefab = null;

    @property(cc.Prefab)
    fillBlankDrop: cc.Prefab = null;

    @property(cc.Prefab)
    textsLayout: cc.Prefab = null;

    @property(cc.Prefab)
    quizLabel: cc.Prefab = null;

    // title section
    private _titleSection: cc.Node = null;

    _fillInBlanksMap = new Map<number, string[]>();
    _maxAnswerLengthF = 0;
    _fillInBlanksDropTokens: cc.Node[] = [];
    _fillInBlanksCount = 0;

    // Multi Choices
    _imagesAsChoicesInMC: boolean = false;

    // middle section
    private _middleSectionNode: cc.Node = null;

    @property(cc.Prefab)
    textChoiceButtonPrefab: cc.Prefab;

    @property(cc.Prefab)
    imageChoiceButtonPrefab: cc.Prefab;

    @property(cc.Prefab)
    choicePrefab: cc.Prefab;

    _lineMatchingCount = 0;

    @catchError()
    protected onEnable(): void {
        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        // collisionManager.enabledDebugDraw = true;
        // collisionManager.enabledDrawBoundingBox = true;
    }

    @catchError()
    protected onLoad(): void {
        const config = Config.getInstance();
        this.registerNotifications();
        this._currentConfig = this.processConfiguration(Config.getInstance().data[0]);
        this._quizDir = Config.dir + `${config.lessonId}/res/`;
        this._soundDir = Config.dir + `${config.lessonId}/res/`;
        this._page = this.node;
        this._currentConfig = this.processConfiguration(Config.getInstance().data[0]);
        console.log("quiz", JSON.stringify(this._currentConfig));

        this.renderTitle(this._currentConfig.title);
        this.loadTitleSound();
        this.renderMiddleSection();
        this.renderBottomSection();
    }

    @catchError()
    private registerNotifications() {
        this.node.on(ADJUST_FILL_IN_BLANKS, () => {
            this.adjustFillInBlanks();
        });

        this.node.on(GO_TO_NEXT_PROBLEM, (event) => {
            event.stopPropagation();
            this.scheduleOnce(() => {
                this.node.parent.emit('nextProblem');
            }, 1);
        });

        this.node.on(MULTI_CHOICE_WRONG, (event) => {
            event.stopPropagation();
            this.node.parent.emit('wrong');
        });

        this.node.on(MULTI_CHOICE_CORRECT, (event) => {
            event.stopPropagation();
            this.node.parent.emit('correct');
            this.scheduleOnce(() => {
                this.node.parent.emit('nextProblem');
            }, 1);
        });

        this.node.on(LINE_MATCH_CHOICE_WRONG, (event) => {
            event.stopPropagation();
            this.node.parent.emit('wrong');
        });

        this.node.on(LINE_MATCH_CHOICE_CORRECT, (event) => {
            event.stopPropagation();
            this.node.parent.emit('correct');
            this._lineMatchingCount--;
            if (this._lineMatchingCount <= 0) {
                this.scheduleOnce(() => {
                    this.node.parent.emit('nextProblem');
                }, 1);
            }
        });
    }

    @catchError()
    private adjustFillInBlanks() {
        this._fillInBlanksDropTokens.forEach(
            t => {
                const dropComponent = t.getComponent(FillBlanksDrop);
                const boxCollider = t.getComponent(cc.BoxCollider);
                const label: cc.Node = t.getChildByName('dropLabel');
                t.width = dropComponent.allowDrop ? t.width : label.width;
                t.height = label.height;
                boxCollider.size = dropComponent.allowDrop ? new cc.Size(t.width, t.height) :
                    new cc.Size(0, 0);
            }
        );
    }

    @catchError()
    private loadImage(middleSectionNode: cc.Node, imageName: string) {
        // @ts-ignore
        const imageNode = cc.instantiate(this.imageSection);
        imageNode.active = false;
        middleSectionNode.addChild(imageNode);

        const picWidth = imageNode.width;
        const picHeight = imageNode.height;

        Util.loadTexture(this._quizDir + imageName,
            (texture, err) => {
                if (texture && !err) {
                    imageNode.active = true;
                    imageNode.setPosition(new cc.Vec2(0, 0));
                    const sprite = imageNode.getComponent(cc.Sprite);
                    sprite.spriteFrame = new cc.SpriteFrame(texture);
                    const size = sprite.spriteFrame.getOriginalSize();
                    const xScale = picWidth / size.width;
                    const yScale = picHeight / size.height;
                    const scale = Math.min(xScale, yScale);
                    imageNode.width = scale * size.width;
                    imageNode.height = scale * size.height;
                }
            });
    }

    @catchError()
    private loadTitleSound() {
        const soundButton: cc.Node = this._titleSection.getChildByName('soundButton');
        if (!!this._currentConfig.soundFile) {
            Util.loadGameSound(this._quizDir + this._currentConfig.soundFile + '.mp3', (clip) => {
                this._soundClip = clip;
                if (!!soundButton) {
                    const pageSound = soundButton.getComponent(PageSound);
                    pageSound.soundClip = this._soundClip;
                    soundButton.active = !!this._currentConfig.soundFile ? true : false;
                }
            });
        } else {
            if (!!soundButton) {
                soundButton.active = false;
            }
        }
    }

    @catchError()
    private renderMiddleSection() {
        switch (this._currentConfig.type) {
            case "T":
                this._middleSectionNode = cc.instantiate(this.middleSection);
                this._page.addChild(this._middleSectionNode);
                this.loadImage(this._middleSectionNode, this._currentConfig.image);
                this._middleSectionNode.setPosition(new cc.Vec2(0, 100));
                break;
            case  "F":
                this._middleSectionNode = cc.instantiate(this.middleSection);
                this._page.addChild(this._middleSectionNode);

                this.loadImage(this._middleSectionNode, this._currentConfig.image);
                this.loadSentences(this._middleSectionNode);
                this._middleSectionNode.setPosition(new cc.Vec2(0, -50));
                break;
            case "MC":
                if (this._currentConfig.question) {
                    this._middleSectionNode = cc.instantiate(this.middleSection);
                    this._page.addChild(this._middleSectionNode);
                    this.loadQuestion(this._middleSectionNode);
                    this.loadChoices();
                }
                break;
        }
    }

    @catchError()
    private loadChoices(): cc.Node[] {
        const type = this._imagesAsChoicesInMC ? QuizBtnType.Picture : QuizBtnType.Sentence;
        const answerText = this._currentConfig.correctAnswers && this._currentConfig.correctAnswers.length === 1
            ? this._currentConfig.correctAnswers[0].trim() : null;
        let choiceNodes: cc.Node[] = [];
        choiceNodes = this._currentConfig.choices.map(
            choice => {
                const choiceData =
                    new BtnData(answerText === choice.trim(), type, choice, choice);
                return this.createChoice(choiceData);
            }
        );
        return choiceNodes;
    }

    @catchError()
    private createChoice(data: BtnData | ChoiceData, isButton: boolean = true): cc.Node {
        const choiceNode =
            isButton ? cc.instantiate(data.type == QuizBtnType.Sentence ? this.textChoiceButtonPrefab : this.imageChoiceButtonPrefab)
                : cc.instantiate(this.choicePrefab);
        choiceNode.name = data.type == QuizBtnType.Sentence ? data.text : data.pic;
        const choiceComp = isButton ? choiceNode.getComponent(QuizButton) : choiceNode.getComponent(Choice);
        if (choiceComp != null) {
            choiceComp.quizDir = this._quizDir;
            choiceComp.data = data;
            choiceComp.quizNode = this.node;
        }
        return choiceNode;
    }

    @catchError()
    private getLabel(text: string) {
        const questionNode: cc.Node = cc.instantiate(this.quizLabel);
        const questionLabel = questionNode.getComponent(cc.Label);
        questionLabel.string = text;
        return questionNode;
    }

    @catchError()
    private loadQuestion(middleSectionNode: cc.Node) {
        const questionNode: cc.Node = this.getLabel(this._currentConfig.question);
        middleSectionNode.addChild(questionNode);
        middleSectionNode.height = 150;
        middleSectionNode.setPosition(new cc.Vec2(0, 100));
    }

    @catchError()
    private loadSentences(middleSectionNode) {
        const sentencesLayoutNode: cc.Node = cc.instantiate(this.textsLayout);
        middleSectionNode.addChild(sentencesLayoutNode);
        sentencesLayoutNode.setPosition(new cc.Vec2(0, -75));
        this._currentConfig.sentences.forEach((s, sentenceIndex) => {
            const tokens = s.split(/[\s.,]+/);
            const labels: string[] = this._fillInBlanksMap.get(sentenceIndex) || [];
            let labelCount = 0;
            tokens.forEach(
                (val, index: number) => {
                    const drop: cc.Node = cc.instantiate(this.fillBlankDrop);
                    const label: cc.Node = drop.getChildByName('dropLabel');
                    const chimpleLabel = label.getComponent(cc.Label);
                    const dropComponent = drop.getComponent(FillBlanksDrop);
                    if (val === '#') {
                        const nVal = labels.length > labelCount ? labels[labelCount] : '';
                        labelCount++;
                        drop.name = nVal;
                        chimpleLabel.string = '     ';
                        dropComponent.allowDrop = true;
                        drop.width = this._maxAnswerLengthF * 30;
                        this._fillInBlanksCount++;
                    } else {
                        const spriteLine: cc.Sprite = drop.getComponent(cc.Sprite);
                        drop.removeComponent(spriteLine);
                        chimpleLabel.string = val;
                        dropComponent.allowDrop = false;
                        drop.width = 0;
                        drop.name = val;
                    }
                    this._fillInBlanksDropTokens.push(drop);
                    sentencesLayoutNode.addChild(drop);
                }
            );
            this.node.emit(ADJUST_FILL_IN_BLANKS);
        });
    }

    @catchError()
    private renderBottomSection() {
        switch (this._currentConfig.type) {
            case "T":
                const bottomSectionNode: cc.Node = cc.instantiate(this.bottomSection);
                bottomSectionNode.width = cc.winSize.width - 100;
                bottomSectionNode.height = cc.winSize.height / 2;
                const quizTracing = cc.instantiate(this.quizTracing);
                const quizTracingComponent = quizTracing.getComponent(QuizTracing);
                quizTracingComponent.quizDir = this._quizDir;
                quizTracingComponent.currentConfig = this._currentConfig;
                quizTracing.setPosition(new cc.Vec2(0, 0));
                bottomSectionNode.addChild(quizTracing);
                bottomSectionNode.setPosition(0, -225);
                this._page.addChild(bottomSectionNode);
                break;

            case "F":
                // render options
                const bottomSectionLayoutNode: cc.Node = cc.instantiate(this.bottomSectionLayout);
                bottomSectionLayoutNode.width = cc.winSize.width - 100;
                bottomSectionLayoutNode.height = cc.winSize.height / 4;

                this._currentConfig.choices.forEach((val) => {
                    const drag = cc.instantiate(this.fillBlankDrag);
                    drag.name = val;
                    drag.on(FILL_IN_BLANKS_MATCH, this.onMatch.bind(this));
                    drag.on(FILL_IN_BLANKS_NO_MATCH, () => {
                        this.node.parent.emit('wrong');
                    });
                    const dragComp = drag.getComponent(FillBlanksDrag);
                    if (dragComp != null) {
                        dragComp.label.string = val;
                    }
                    const tempNode = new cc.Node();
                    tempNode.name = val;
                    tempNode.addChild(drag);
                    bottomSectionLayoutNode.addChild(tempNode);
                });

                bottomSectionLayoutNode.setPosition(0, -300);
                this._page.addChild(bottomSectionLayoutNode);
                break;

            case "MC":
                const container: cc.Node = cc.instantiate(this.bottomSectionLayout);
                container.width = cc.winSize.width;
                container.height = 300;
                if (this._imagesAsChoicesInMC) {
                    this.loadChoices().forEach(
                        c => {
                            container.addChild(c);
                        }
                    );
                } else {
                    const textsLayoutNode: cc.Node = this.getVerticalLayout();
                    this.loadImage(container, this._currentConfig.image);
                    this.loadChoices().forEach(
                        c => {
                            textsLayoutNode.addChild(c);
                        }
                    );
                    container.addChild(textsLayoutNode);
                }
                this._middleSectionNode ? container.setPosition(0, -cc.winSize.height / 4) :
                    container.setPosition(0, 0);
                this._page.addChild(container);
                break;
            case "M":
                const lineMatchingContainer: cc.Node = cc.instantiate(this.bottomSectionLayout);
                lineMatchingContainer.width = cc.winSize.width;
                const textsLayoutNodeLeft: cc.Node = this.getVerticalLayout(cc.Layout.ResizeMode.CHILDREN);

                let choiceTokens = this._currentConfig.choices && this._currentConfig.choices.length === 1
                    && this._currentConfig.choices[0].split(',') || [];

                let sentenceTokens = this._currentConfig.sentences && this._currentConfig.sentences.length === 1
                    && this._currentConfig.sentences[0].split(',') || [];

                sentenceTokens.forEach(
                    (s, i) => {
                        const choiceData =
                            new ChoiceData(s, QuizBtnType.Sentence, s, s);
                        const labelNode = this.createChoice(choiceData, false);
                        labelNode.height = 100;
                        labelNode.width = 350;
                        labelNode.children.forEach(
                            c => {
                                c.height = c.width = 100;
                                c.width = 350;
                            });
                        textsLayoutNodeLeft.addChild(labelNode);
                    });

                const textsLayoutNodeRight: cc.Node = this.getVerticalLayout(cc.Layout.ResizeMode.CHILDREN);
                let minHeight = 0;
                let maxImageHeight = 150;
                this._lineMatchingCount = choiceTokens.length;
                let imageNodes = choiceTokens.map(
                    (t, i) => {
                        const choiceData =
                            new ChoiceData(sentenceTokens[i], QuizBtnType.Picture, t, t);
                        const imageNode = this.createChoice(choiceData, false);
                        imageNode.height = Math.min((cc.winSize.height - 100) / this._lineMatchingCount, maxImageHeight);
                        imageNode.width = imageNode.height = 150;
                        imageNode.children.forEach(
                            c => {
                                c.height = c.width = 150;
                            }
                        );
                        minHeight += imageNode.height;
                        return imageNode;

                    }
                );
                imageNodes = Util.randomElements(imageNodes, imageNodes.length);

                imageNodes.forEach(c => textsLayoutNodeRight.addChild(c));
                textsLayoutNodeLeft.height = textsLayoutNodeRight.height = minHeight + 100;
                lineMatchingContainer.addChild(textsLayoutNodeLeft);
                lineMatchingContainer.addChild(textsLayoutNodeRight);
                this._middleSectionNode ? lineMatchingContainer.setPosition(0, -cc.winSize.height / 4) :
                    lineMatchingContainer.setPosition(0, -cc.winSize.height / 8);
                this._page.addChild(lineMatchingContainer);
        }
    }

    @catchError()
    private renderTitle(titleText: string) {
        this._titleSection = cc.instantiate(this.titleSection);
        this._titleSection.setPosition(new cc.Vec2(0, 275));
        this._page.addChild(this._titleSection);

        const titleTextNode: cc.Node = this._titleSection.getChildByName('titleText');
        if (!!titleTextNode) {
            const label = titleTextNode.getComponent(ChimpleLabel);
            label.string = titleText;
        }
    }

    @catchError()
    private getVerticalLayout(resizeMode = cc.Layout.ResizeMode.CONTAINER): cc.Node {
        const textsLayoutNode: cc.Node = cc.instantiate(this.textsLayout);
        const layout = textsLayoutNode.getComponent(cc.Layout);
        layout.type = cc.Layout.Type.VERTICAL;
        layout.resizeMode = resizeMode;
        layout.paddingTop = layout.paddingBottom = 5;
        layout.spacingY = 10;
        layout.verticalDirection = cc.Layout.VerticalDirection.TOP_TO_BOTTOM;
        return textsLayoutNode;
    }

    private processConfiguration(data: any[] = []): QuizConfig {
        const configurations: any[] = [].concat(...data);
        let [gameName, count, description, pageNo, type, ...params] = configurations;
        let title;
        let soundFile;
        let image;
        let question: string;
        let sentences: string[] = [];
        let choices: string[] = [];
        let choicesSound: string[] = [];
        let correctAnswers: string[] = [];

        switch (type) {
            case "F":
                if (params.length === 5) {
                    title = params[0];
                    image = params[1];
                    const originalText: string[] = params[2].split('/');
                    originalText.forEach(
                        (o, i) => {
                            let matches = o.match(/\[(.*?)\]/g) || [];
                            let t = originalText[i].trim();
                            if (t && t.length > 0) {
                                let mc: string[] = [];
                                matches.forEach(
                                    (m, i) => {
                                        t = t.replace(m, '#');
                                        let text = m.replace('[', '').replace(']', '');
                                        mc.push(text);
                                        this._maxAnswerLengthF = text.length > this._maxAnswerLengthF ?
                                            text.length : this._maxAnswerLengthF;
                                        choices.push(text);
                                        correctAnswers.push(text);
                                    }
                                );
                                this._fillInBlanksMap.set(i, mc);
                                sentences.push(t);
                            }
                        }
                    );

                    choices.push(params[3]);
                    soundFile = params[4];
                }

                break;
            case "T":
                if (params.length === 5) {
                    title = params[0];
                    soundFile = params[1];
                    image = params[2];
                    choices.push(params[3]);
                    choicesSound.push(params[4]);
                }
                break;
            case "MC":
                if (params.length === 4) {
                    title = params[0];
                    params[1].endsWith('.png') ? image = params[1] : question = (params[1]);
                    this._imagesAsChoicesInMC = params[2].indexOf('.png') !== -1;
                    choices = params[2].split(',');
                    correctAnswers.push(params[3]);
                } else if (params.length === 5) {
                    title = params[0].trim();
                    params[1].endsWith('.png') ? image = params[1] : question = (params[1]);
                    image = params[2];
                    this._imagesAsChoicesInMC = params[3].indexOf('.png') !== -1;
                    choices = params[3].split(',');
                    correctAnswers.push(params[4].trim());
                }
                break;
            case "M":
                if (params.length === 3) {
                    title = params[0];
                    sentences.push(params[1]);
                    choices.push(params[2]);
                }
                break;

        }

        return {
            pageNo, type, title, soundFile, question, sentences, choices, choicesSound, correctAnswers, image
        };
    }

    onMatch() {
        this.node.parent.emit('correct');
        Drag.letDrag = false;
        this._fillInBlanksCount--;
        if (this._fillInBlanksCount <= 0) {
            this.node.parent.emit('nextProblem');
        }

    }
}
