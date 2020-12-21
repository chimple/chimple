import QuizSound from "./quiz-sound";
import QuizLiteracyButton from "./quiz-literacy-button";
import {Util} from "../../../../common/scripts/util";
import {QuizMathsConfig} from "../../quizmaths/scripts/quiz-maths";
import MathDrag from "../../quizmaths/scripts/math-drag";
import MathDrop from "../../quizmaths/scripts/math-drop";
import Overflow = cc.Label.Overflow;
import {QuizLiteracyConfig, QuizBtnData, QuizBtnType} from "./quiz-literacy";
import ChimpleLabel from "../../../../common/scripts/chimple-label";

const GRID_ELEMENT_SIZE = 24;
const LABEL_WIDTH = 250;
export const SORT_RANDOM = 'random';
export const SORT_ASC = 'asc';
export const SORT_DESC = 'desc';
export const SORT_ASCENDING = 'ascending';
export const SORT_DESCEDNGING = 'descending';

export class QuizHelper {
    public static renderTextLabel(quizConfig: QuizLiteracyConfig | QuizMathsConfig, parent: cc.Node, width: number = LABEL_WIDTH, hex: string = '#000000', childName: string = 'label', fontSize: number = 65, overflow = Overflow.SHRINK) {
        QuizHelper.renderTextLabelWithContent(quizConfig, parent, quizConfig.displayTexts, width, hex, childName, fontSize, overflow);
    }

    public static renderTextLabelWithContent(quizConfig: QuizLiteracyConfig | QuizMathsConfig, parent: cc.Node, content: string, width: number = LABEL_WIDTH, hex: string = '#000000', childName, fontSize: number = 75, overflow: Overflow.SHRINK) {
        // fontSize = content.length < 3 ? 100 : fontSize;
        const label = parent.getChildByName(childName);
        if (label) {
            label.color = new cc.Color().fromHEX(hex);
            label.width = width;
            const labelComponent = label.getComponent(cc.Label);
            labelComponent.fontSize = fontSize;
            labelComponent.overflow = overflow;
            labelComponent.string = content;
        }
    }

    public static createTextLabelWithContent(quizConfig: QuizLiteracyConfig | QuizMathsConfig, parent: cc.Node, content: string, labelBgPrefab: cc.Prefab, width: number = LABEL_WIDTH, height: number = LABEL_WIDTH, hex: string = '#000000', fontSize = 50) {
        const labelBg = cc.instantiate(labelBgPrefab);
        parent.addChild(labelBg);
        labelBg.width = width;
        labelBg.height = height;
        const label = labelBg.getChildByName('label');
        const labelComponent = label.getComponent(cc.Label);
        label.color = new cc.Color().fromHEX(hex);
        labelComponent.string = content;
        labelComponent.fontSize = fontSize;
        labelComponent.lineHeight = fontSize;
    }

    public static renderAdditionalQuestionLabel(quizConfig: QuizLiteracyConfig, label: cc.Node, width: number, height: number) {
        if (quizConfig.additionalQuestion) {
            const labelComponent = label.getComponent(cc.Label);
            labelComponent.string = quizConfig.additionalQuestion;
            labelComponent.overflow = Overflow.RESIZE_HEIGHT;
            label.width = width;
            label.height = height;
        }
    }

    public static renderSoundButton(quizConfig: QuizLiteracyConfig | QuizMathsConfig, parent: cc.Node, assetDir: string, isNumeric: boolean = false) {
        const soundButton = parent.getChildByName('soundButton');
        if (quizConfig.soundFile && !isNumeric) {
            if (soundButton) {
                const soundComponent: QuizSound = soundButton.getComponent(QuizSound);
                soundComponent.soundClip = `${assetDir}/${quizConfig.soundFile}`;
            }
        } else if (isNumeric) {
            if (soundButton) {
                const soundComponent: QuizSound = soundButton.getComponent(QuizSound);
                soundComponent.numericSound = quizConfig.soundFile;
            }
        } else {
            const soundButton = parent.getChildByName('soundButton');
            if (soundButton)
                soundButton.active = false;
        }
    }

    public static renderNumericSoundButton(quizConfig: QuizLiteracyConfig | QuizMathsConfig, parent: cc.Node, assetDir: string) {
        if (quizConfig.soundFile) {
            const soundButton = parent.getChildByName('soundButton');
            if (soundButton) {
                const soundComponent: QuizSound = soundButton.getComponent(QuizSound);
                soundComponent.soundClip = `${assetDir}/${quizConfig.soundFile}`;

            }
        } else {
            const soundButton = parent.getChildByName('soundButton');
            if (soundButton)
                soundButton.active = false;
        }
    }

    public static renderTextChoices(quizConfig: QuizLiteracyConfig | QuizMathsConfig,
                                    textButtonPrefab: cc.Prefab,
                                    panel: cc.Node,
                                    width: number,
                                    height: number,
                                    choices: string[],
                                    fontSize: number = 75) {
        choices = choices.filter((el) => el != null && el.length > 0);
        choices.forEach(
            (c, i) => {
                c = c.trim();
                const textBtn = cc.instantiate(textButtonPrefab);
                const quizButtonComponent = textBtn.getComponent(QuizLiteracyButton);
                quizButtonComponent.data = new QuizBtnData(QuizBtnType.Sentence,
                    c, null, quizConfig.answer && c && c.trim() === quizConfig.answer.trim());
                const label = textBtn.getChildByName('label');
                if (label) {
                    fontSize = c.length > 2 ? fontSize : 100;
                    const labelComponent = label.getComponent(ChimpleLabel);
                    labelComponent.enableWrapText = false;
                    labelComponent.overflow = Overflow.SHRINK;
                    label.width = width;
                    label.height = height;
                    if (fontSize > 0) {
                        labelComponent.fontSize = fontSize;
                        labelComponent.lineHeight = fontSize;
                    }
                    if (labelComponent) {
                        QuizHelper.resizeButton(textBtn, width, height);
                        labelComponent.string = c;
                        panel.addChild(textBtn, i);
                    }
                }
            }
        );
    }

    public static renderImageChoices(quizConfig: QuizLiteracyConfig | QuizMathsConfig, imageButtonPrefab: cc.Prefab, panel: cc.Node,
                                     assetDir: string, isAbsolutePath: boolean = false) {
        const choices = quizConfig.choices.split('^');
        choices.forEach(
            c => {
                const imageBtn = cc.instantiate(imageButtonPrefab);
                const quizButtonComponent = imageBtn.getComponent(QuizLiteracyButton);
                quizButtonComponent.quizDir = `${assetDir}/`;
                quizButtonComponent.data = new QuizBtnData(QuizBtnType.Picture,
                    null, c, quizConfig.answer && c && c.trim() === quizConfig.answer.trim(),
                    isAbsolutePath);
                const sprite = imageBtn.getChildByName('sprite');
                if (sprite) {
                    panel.addChild(imageBtn);
                }
            }
        );
    }

    public static resizeButton(btn: cc.Node, width: number, height: number) {
        btn.width = width;
        btn.height = height;
        btn.children.forEach(
            c => {
                c.width = width;
                c.height = height;
            }
        );
    }

    public static loadAndResizeResourceImage(quizConfig: QuizLiteracyConfig | QuizMathsConfig, imageNode: cc.Node,
                                             assetDir: string, imageFileName: string) {
        if (imageFileName) {
            const picWidth = imageNode.width;
            const picHeight = imageNode.height;

            const imageToLoad = `${assetDir}/${imageFileName}`;
            cc.resources.load(imageToLoad, cc.SpriteFrame, (err, spriteFrame) => {
                if (!err) {
                    // @ts-ignore
                    const sprite: cc.Sprite = imageNode.getComponent(cc.Sprite);
                    // @ts-ignore
                    sprite.spriteFrame = spriteFrame;
                    const size = sprite.spriteFrame.getOriginalSize();
                    const xScale = picWidth / size.width;
                    const yScale = picHeight / size.height;
                    const scale = Math.min(xScale, yScale);
                    imageNode.width = scale * size.width;
                    imageNode.height = scale * size.height;
                }
            });
        }

    }

    public static loadAndResizeImage(quizConfig: QuizLiteracyConfig | QuizMathsConfig, imageNode: cc.Node,
                                     assetDir: string, imageFileName: string) {
        if (imageFileName) {
            const picWidth = imageNode.width;
            const picHeight = imageNode.height;

            const imageToLoad = `${assetDir}/${imageFileName}`;

            Util.loadTexture(imageToLoad, (texture) => {
                if (texture) {
                    const sprite: cc.Sprite = imageNode.getComponent(cc.Sprite);
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
        return imageNode;
    }

    public static range(start: number, end: number, howMany: number = -1): number[] {
        // @ts-ignore
        const numbers = Array(end - start + 1).fill().map((_, idx) => start + idx);
        numbers.sort(() => Math.random() - 0.5);
        return howMany === -1 ? numbers : numbers.slice(0, howMany);
    }

    public static generateAnswer(input: string) {
        let answer: number = 0;
        let results = input.match(/(\d+)~(\d+)/);
        if (results && results.length === 3) {
            let start = Number(results[1]);
            let end = Number(results[2]);
            if (start === end) {
                answer = start
            } else if (results && results.length === 3) {
                let start = Number(results[1]);
                let end = Number(results[2]);
                let choices = QuizHelper.range(start, end, 1);
                answer = choices[0];
            }
        }
        return answer;
    }

    public static randomInRange(input: string, howMany: number, sort: string = SORT_RANDOM): string[] {
        let random = [];
        let results = input.match(/(\d+)~(\d+)/);
        if (results && results.length === 3) {
            let start = Number(results[1]);
            let end = Number(results[2]);
            end = (end - start < 4) ? start + 3 : end;
            let rNumbers = QuizHelper.range(start, end, howMany);
            rNumbers = sort === SORT_RANDOM ? rNumbers :
                sort === SORT_ASC ? rNumbers.sort() : rNumbers.sort((a, b) => b - a);
            random = rNumbers.map(x => String(x));
        }
        return random;
    }

    public static randomInRangeWithAnswer(input: string, answer: string, howMany: number, sort: string = SORT_RANDOM): string[] {
        let random = [];
        let results = input.match(/(\d+)~(\d+)/);
        if (results && results.length === 3) {
            let start = Number(results[1]);
            let end = Number(results[2]);
            end = (end - start < 4) ? start + 3 : end;
            let rNumbers = QuizHelper.range(start, end, howMany);
            rNumbers = sort === SORT_RANDOM ? rNumbers :
                sort === SORT_ASC ? rNumbers.sort() : rNumbers.sort((a, b) => b - a);
            random = rNumbers.map(x => String(x));

            if (!random.includes(answer)) {
                let rIndex = QuizHelper.range(0, random.length - 1, 1)[0];
                var deleted = random.splice(rIndex, 1);
                random.splice(rIndex, 0, answer);
            }
        }
        return random;
    }

    public static renderImagesInGrid(parent: cc.Node, childName: string, imagePrefab: cc.Prefab, choice: number, quizConfig: QuizMathsConfig) {
        let topLayout: cc.Node = parent.getChildByName(childName);
        // @ts-ignore
        for (let i = 0; i < choice; i++) {
            let image: cc.Node = cc.instantiate(imagePrefab);
            topLayout.addChild(image);
        }

        const text = String(choice);

        const quizButtonComponent = parent.getComponent(QuizLiteracyButton);
        if (quizButtonComponent) {
            quizButtonComponent.data = new QuizBtnData(QuizBtnType.Sentence,
                text, null, text && text && text.trim() === quizConfig.answer.trim());
        }

        const layout = topLayout.getComponent(cc.Layout);
        const vWidth = choice < 10 ? choice * GRID_ELEMENT_SIZE + layout.spacingX * (choice - 1) :
            10 * GRID_ELEMENT_SIZE + layout.spacingX * 9;
        parent.width = layout.paddingLeft + layout.paddingRight + vWidth;
        parent.height = layout.paddingTop + layout.paddingBottom +
            layout.spacingY * (choice % 10) + (choice % 10) * GRID_ELEMENT_SIZE
        ;
    }

    public static renderDragChoices(quizConfig: QuizMathsConfig,
                                    dragButtonPrefab: cc.Prefab,
                                    panel: cc.Node,
                                    width: number,
                                    height: number,
                                    choices: string[],
                                    resizeWithLabel: boolean = false,
                                    multipleDrags: boolean = false) {
        choices.forEach(
            (c, i) => {
                const tempNode = new cc.Node();
                const drag = cc.instantiate(dragButtonPrefab);
                drag.name = c;
                const mathDragComponent = drag.getComponent(MathDrag);
                mathDragComponent.resizeWithLabel = resizeWithLabel;
                mathDragComponent.returnBackOnNoMatch = true;
                mathDragComponent.fixOnMatch = false;
                mathDragComponent.multipleDrags = multipleDrags;
                drag.width = width;
                drag.height = height;
                tempNode.name = c;
                tempNode.addChild(drag);
                const label = drag.getChildByName('label');
                label.width = width;
                label.height = height;
                const dragLabel = label.getComponent(cc.Label);
                dragLabel.string = c;
                const boxCollider = mathDragComponent.getComponent(cc.BoxCollider);
                boxCollider.size = new cc.Size(0.5 * drag.width, drag.height * 0.5);
                panel.addChild(tempNode, i);
            }
        );
    }

    public static renderDropChoices(quizConfig: QuizMathsConfig,
                                    dropButtonPrefab: cc.Prefab,
                                    panel: cc.Node,
                                    width: number,
                                    height: number,
                                    choices: string[]) {
        choices.forEach(
            (c, i) => {
                const tempNode = new cc.Node();
                const drop = cc.instantiate(dropButtonPrefab);
                const mathDropComponent = drop.getComponent(MathDrop);
                mathDropComponent.allowOnlyOneDrop = true;
                drop.width = width;
                drop.height = height;
                tempNode.width = width;
                tempNode.height = height;
                tempNode.name = c + '_' + i;
                tempNode.addChild(drop);
                const label = drop.getChildByName('dropLabel');
                const dragLabel = label.getComponent(cc.Label);
                dragLabel.string = c;
                drop.name = c + '_' + i;
                const boxCollider = mathDropComponent.getComponent(cc.BoxCollider);
                boxCollider.size = new cc.Size(drop.width * 0.5, drop.height * 0.5);
                panel.addChild(tempNode, i);
            }
        );
    }
}
