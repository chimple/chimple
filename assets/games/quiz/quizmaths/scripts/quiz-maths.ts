import ccclass = cc._decorator.ccclass;
import Config from "../../../../common/scripts/lib/config";
import catchError from "../../../../common/scripts/lib/error-handler";
import {BiggerOrSmaller} from "./bigger-or-smaller";
import {CompareNumberMagnitudes} from "./compare_number_magnitudes";
import {DigitNumbers} from "./digit-numbers";
import {MissingNumber} from "./missing_number";
import {NumberIdentification} from "./number-identification";
import OperationWithObjects from "./operation-with-objects";
import {OperationsDrag} from "./operations-drag";
import {RecognizeNumber} from "./recognize-number";
import Shapes from "./shapes";
import WordProblem from "./word-problem";
import property = cc._decorator.property;
import {QUIZ_WRONG} from "../../quizliteracy/scripts/quiz-literacy";
import {QUIZ_ANSWERED} from "../../../../common/scripts/quiz-monitor";
import Profile, {LANGUAGE} from "../../../../common/scripts/lib/profile";
import {HELP_DIR, NUMBER_VOICE, QUESTION_BOARD, QUIZ_MATHS_DIR} from "../../../../common/scripts/helper";
import { ASSET_URL } from "../../../../common/scripts/lib/constants";
import MathDrag from "./math-drag";

export const DIGIT_NUMBERS = "digit_numbers";
export const TWO_DIGIT_NUMBERS = "2digit_numbers";
export const SINGLE_DIGIT_NUMBERS = "single_digit_numbers";
export const BIGGEST_AND_SMALLEST = "biggest_and_smallest";
export const BIGGER_OR_SMALLER = "bigger_and_smaller";
export const RECOGNIZE_NUMBER = "recognize_number";
export const COMPARE_NUMBER_MAGNITUDES = "compare_number_magnitudes";
export const MISSING_NUMBER_DRAG = "missing_number_drag";
export const NUMBER_IDENTIFICATION = "number_identification";
export const OPERATIONS_DRAG = "operations_drag";
export const OPERATIONS_WITH_OBJECTS = "operations_with_objects";
export const OPERATIONS_WITHOUT_OBJECTS = "operations_without_objects";
export const WORD_PROBLEM = "word_problem";
export const SHAPES = "shapes";

export const QUIZ_CORRECT = "QUIZ_CORRECT";
export const QUIZ_NEXT = "QUIZ_NEXT";

export interface QuizMathsConfig {
    level: string;
    workSheet: string;
    problemNo: string;
    type: string;
    answer: string;
    choices: string;
    order: string;
    displayTexts: string;
    soundFile: string;
    displayImage: string;
}

@ccclass
export default class QuizMaths extends cc.Component {
    @property(cc.Prefab)
    digitNumbers: cc.Prefab = null;

    @property(cc.Prefab)
    biggerOrSmaller: cc.Prefab = null;

    @property(cc.Prefab)
    recognizeNumber: cc.Prefab = null;

    @property(cc.Prefab)
    compareNumberMagnitudes: cc.Prefab = null;

    @property(cc.Prefab)
    missingNumber: cc.Prefab = null;

    @property(cc.Prefab)
    numberIdentify: cc.Prefab = null;

    @property(cc.Prefab)
    operationsDrag: cc.Prefab = null;

    @property(cc.Prefab)
    operationWithObjects: cc.Prefab = null;

    @property(cc.Prefab)
    wordProblem: cc.Prefab = null;

    @property(cc.Prefab)
    shapes: cc.Prefab = null;

    private _mathsConfig: QuizMathsConfig = null;
    private _assetDir: string;

    private _nextDone: boolean = false

    @catchError()
    protected onLoad(): void {
        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        // collisionManager.enabledDebugDraw = true;
        // collisionManager.enabledDrawBoundingBox = true;

        const config = Config.getInstance();
        this._mathsConfig = this.processConfiguration(config.data[0]);
        this._assetDir = HELP_DIR + Profile.lang + '-help/' + QUIZ_MATHS_DIR;

        this.node.on(QUIZ_CORRECT, event => {
            if (!this._nextDone) {
                this._nextDone = true;
                this.next(event, true);
            }
        });

        this.node.on(QUIZ_WRONG, event => {
            if (!this._nextDone) {
                this._nextDone = true;
                this.next(event, false);
            }

        });

        switch (this._mathsConfig.type) {
            case DIGIT_NUMBERS:
            case TWO_DIGIT_NUMBERS:
            case SINGLE_DIGIT_NUMBERS:
                const digitNumbers = cc.instantiate(this.digitNumbers);
                const digitNumbersComponent = digitNumbers.getComponent(DigitNumbers);
                digitNumbersComponent.quizConfig = this._mathsConfig;
                digitNumbersComponent.assetDir = this._assetDir;
                this.node.addChild(digitNumbers);
                break;
            case BIGGEST_AND_SMALLEST:
            case BIGGER_OR_SMALLER:
                const biggerOrSmaller = cc.instantiate(this.biggerOrSmaller);
                const biggerOrSmallerComponent = biggerOrSmaller.getComponent(
                    BiggerOrSmaller
                );
                biggerOrSmallerComponent.quizConfig = this._mathsConfig;
                biggerOrSmallerComponent.assetDir = this._assetDir;
                this.node.addChild(biggerOrSmaller);
                break;
            case RECOGNIZE_NUMBER:
                const recognizeNumber = cc.instantiate(this.recognizeNumber);
                const recognizeNumberComponent = recognizeNumber.getComponent(
                    RecognizeNumber
                );
                recognizeNumberComponent.quizConfig = this._mathsConfig;
                recognizeNumberComponent.assetDir = this._assetDir;
                this.node.addChild(recognizeNumber);
                break;

            case COMPARE_NUMBER_MAGNITUDES:
                const compareNumberMagnitudes = cc.instantiate(
                    this.compareNumberMagnitudes
                );
                const compareNumberMagnitudesComponent = compareNumberMagnitudes.getComponent(
                    CompareNumberMagnitudes
                );
                compareNumberMagnitudesComponent.quizConfig = this._mathsConfig;
                compareNumberMagnitudesComponent.assetDir = this._assetDir;
                this.node.addChild(compareNumberMagnitudes);
                break;

            case MISSING_NUMBER_DRAG:
                const missingNumber = cc.instantiate(this.missingNumber);
                const missingNumbersComponent = missingNumber.getComponent(
                    MissingNumber
                );
                missingNumbersComponent.quizConfig = this._mathsConfig;
                missingNumbersComponent.assetDir = this._assetDir;
                this.node.addChild(missingNumber);
                break;

            case NUMBER_IDENTIFICATION:
                const numberIdentify = cc.instantiate(this.numberIdentify);
                const numberIdentifyComponent = numberIdentify.getComponent(
                    NumberIdentification
                );
                numberIdentifyComponent.quizConfig = this._mathsConfig;
                numberIdentifyComponent.assetDir = this._assetDir;
                this.node.addChild(numberIdentify);
                break;

            case OPERATIONS_DRAG:
                const operationsDrag = cc.instantiate(this.operationsDrag);
                const operationsDragComponent = operationsDrag.getComponent(
                    OperationsDrag
                );
                operationsDragComponent.quizConfig = this._mathsConfig;
                operationsDragComponent.assetDir = this._assetDir;
                this.node.addChild(operationsDrag);
                break;

            case OPERATIONS_WITH_OBJECTS:
            case OPERATIONS_WITHOUT_OBJECTS:
                const operationWithObjects = cc.instantiate(this.operationWithObjects);
                const operationWithObjectsComponent = operationWithObjects.getComponent(
                    OperationWithObjects
                );
                operationWithObjectsComponent.quizConfig = this._mathsConfig;
                operationWithObjectsComponent.assetDir = this._assetDir;
                this.node.addChild(operationWithObjects);
                break;

            case SHAPES:
                const shapes = cc.instantiate(this.shapes);
                const shapesComponent = shapes.getComponent(Shapes);
                shapesComponent.quizConfig = this._mathsConfig;
                shapesComponent.assetDir = "items/shape";
                this.node.addChild(shapes);
                break;

            case WORD_PROBLEM:
                const wordProblem = cc.instantiate(this.wordProblem);
                const wordProblemComponent = wordProblem.getComponent(WordProblem);
                wordProblemComponent.quizConfig = this._mathsConfig;
                wordProblemComponent.assetDir = `${ASSET_URL}/${Profile.lang}-help-remote/questionboard`
                // wordProblemComponent.assetDir = HELP_DIR + Profile.lang + '-help/' + QUESTION_BOARD;
                this.node.addChild(wordProblem);
                break;
        }
    }

    @catchError()
    next(event, correct: boolean) {
        event.stopPropagation();
        correct ? this.node.emit("correct") : this.node.emit("wrong");
        this.node.emit(QUIZ_ANSWERED, correct);
        this.scheduleOnce(() => {
            cc.audioEngine.stopAllEffects();
            cc.audioEngine.stopMusic();
            this.node.emit("nextProblem");
        }, 1);
        MathDrag.dragWrongMovesCount = 0;
    }

    private processConfiguration(data: any[] = []): QuizMathsConfig {
        const configurations: any[] = [].concat(...data);
        let [
            level,
            workSheet,
            problemNo,
            type,
            answer,
            choices,
            order,
            soundFile,
            displayTexts,
            displayImage
        ] = configurations;

        if (type === 'shapes') {
            let choice1 = configurations[5];
            let choice2 = configurations[6];
            let choice3 = configurations[7];
            let choice4 = configurations[8];
            choices = choice1.trim() + "," + choice2.trim() + "," + choice3.trim() + "," + choice4.trim();
            order = configurations[9];
            soundFile = configurations[10];
            displayTexts = configurations[11];
        }

        return {
            level,
            workSheet,
            problemNo,
            type,
            answer,
            choices,
            order,
            soundFile,
            displayTexts,
            displayImage
        };
    }

    protected onDestroy(): void {
        cc.audioEngine.stopAll();
    }
}
