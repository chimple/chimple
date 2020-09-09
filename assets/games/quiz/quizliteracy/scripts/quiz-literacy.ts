import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Config from "../../../../common/scripts/lib/config";
import { WordWord } from "./word_word";
import { ImageWord } from "./image_word";
import { ImageSentence } from "./image_sentence";
import { ImageSeqImage } from "./imageseq_image";
import { ImageseqSentence } from "./imageseq-sentence";
import { SoundonlyImage } from "./soundonly_image";
import { SoundonlyWord } from "./soundonly_word";
import { SoundonlySentence } from "./soundonly_sentence";
import { SentenceWord } from "./sentence_word";
import { SentenceSentence } from "./sentence_sentence";
import { ParagraphSequence } from "./paragraph_sequence";
import { ListeningComSequence } from "./Listening_com_sequence";
import { OrderingSequence } from "./ordering_sequence";
import { WordImage } from "./word-image";
import catchError from "../../../../common/scripts/lib/error-handler";
import { QUIZ_ANSWERED } from "../../../../common/scripts/quiz-monitor";

export const IMAGE_IMAGE = 'image_image';
export const IMAGE_SENTENCE = 'image_sentence';
export const IMAGE_WORD = 'image_word';
export const IMAGESEQ_IMAGE = 'imageseq_image';
export const IMAGESEQ_SENTENCE = 'imageseq_sentence';
export const LISTENING_COM_SENTENCE = 'listeningcomp_sentence';
export const ORDERING_SENTENCE = 'ordering_sentence';
export const PARAGRAPH_SENTENCE = 'paragraph_sentence';
export const SENTENCE_SENTENCE = 'sentence_sentence';
export const SENTENCE_WORD = 'sentence_word';
export const SOUNDONLY_IMAGE = 'soundonly_image';
export const SOUNDONLY_SENTENCE = 'soundonly_sentence';
export const SOUNDONLY_WORD = 'soundonly_word';
export const WORD_WORD = 'word_word';
export const WORD_IMAGE = 'word_image';

export const QUIZ_CORRECT = 'QUIZ_CORRECT';
export const QUIZ_WRONG = 'QUIZ_WRONG';

export enum QuizBtnType {
    Sentence,
    Picture
}

export class QuizBtnData {
    correct: boolean;
    type: QuizBtnType;
    text: string;
    pic: string;

    constructor(type: QuizBtnType, text: string, pic: string, correct: boolean = false) {
        this.type = type;
        this.text = text;
        this.pic = pic;
        this.correct = correct;
    }
}

export interface QuizLiteracyConfig {
    level: string;
    workSheet: string;
    problemNo: string;
    type: string;
    answer: string;
    choices: string;
    displayImages: string;
    displayTexts: string;
    soundFile: string;
    additionalQuestion: string;
}

@ccclass
export class QuizLiteracy extends cc.Component {
    @property(cc.Prefab)
    wordWord: cc.Prefab = null;

    @property(cc.Prefab)
    imageWord: cc.Prefab = null;

    @property(cc.Prefab)
    imageSentence: cc.Prefab = null;

    @property(cc.Prefab)
    imageSeqImage: cc.Prefab = null;

    @property(cc.Prefab)
    imageSeqSentence: cc.Prefab = null;

    @property(cc.Prefab)
    soundonlyImage: cc.Prefab = null;

    @property(cc.Prefab)
    soundonlyWord: cc.Prefab = null;

    @property(cc.Prefab)
    soundonlySentence: cc.Prefab = null;

    @property(cc.Prefab)
    sentenceWord: cc.Prefab = null;

    @property(cc.Prefab)
    sentenceSentence: cc.Prefab = null;

    @property(cc.Prefab)
    paragraphSentence: cc.Prefab = null;

    @property(cc.Prefab)
    listeningComSentence: cc.Prefab = null;

    @property(cc.Prefab)
    orderingSentence: cc.Prefab = null;

    @property(cc.Prefab)
    wordImage: cc.Prefab = null;

    private _assetDir: string;
    private _quizLiteracyConfig: QuizLiteracyConfig;

    @catchError()
    protected onLoad(): void {
        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        const config = Config.getInstance();
        this._quizLiteracyConfig = this.processConfiguration(config.data[0]);
        this._assetDir = Config.dir + `${config.lessonId}/res`;
        this.node.on(QUIZ_CORRECT, (event) => {
            this.next(event, true);
        });

        this.node.on(QUIZ_WRONG, (event) => {
            this.next(event, false);
        });

        switch (this._quizLiteracyConfig.type) {
            case WORD_WORD:
                const word = cc.instantiate(this.wordWord);
                const wordWordComponent = word.getComponent(WordWord);
                wordWordComponent.quizConfig = this._quizLiteracyConfig;
                wordWordComponent.assetDir = this._assetDir;
                this.node.addChild(word);
                break;
            case IMAGE_WORD:
                const imageWord = cc.instantiate(this.imageWord);
                const imageWordComponent = imageWord.getComponent(ImageWord);
                imageWordComponent.quizConfig = this._quizLiteracyConfig;
                imageWordComponent.assetDir = this._assetDir;
                this.node.addChild(imageWord);
                break;
            case IMAGE_SENTENCE:
            case  IMAGE_IMAGE:
                const imageSentence = cc.instantiate(this.imageSentence);
                const imageSentenceComponent = imageSentence.getComponent(ImageSentence);
                imageSentenceComponent.quizConfig = this._quizLiteracyConfig;
                imageSentenceComponent.assetDir = this._assetDir;
                this.node.addChild(imageSentence);
                break;

            case IMAGESEQ_IMAGE:
                const imageSeqImage = cc.instantiate(this.imageSeqImage);
                const imageSeqImageComponent = imageSeqImage.getComponent(ImageSeqImage);
                imageSeqImageComponent.quizConfig = this._quizLiteracyConfig;
                imageSeqImageComponent.assetDir = this._assetDir;
                this.node.addChild(imageSeqImage);
                break;

            case IMAGESEQ_SENTENCE:
                const imageSeqSentence = cc.instantiate(this.imageSeqSentence);
                const imageSeqSentenceComponent = imageSeqSentence.getComponent(ImageseqSentence);
                imageSeqSentenceComponent.quizConfig = this._quizLiteracyConfig;
                imageSeqSentenceComponent.assetDir = this._assetDir;
                this.node.addChild(imageSeqSentence);
                break;
            case SOUNDONLY_IMAGE:
                const soundonlyImage = cc.instantiate(this.soundonlyImage);
                const soundonlyImageComponent = soundonlyImage.getComponent(SoundonlyImage);
                soundonlyImageComponent.quizConfig = this._quizLiteracyConfig;
                soundonlyImageComponent.assetDir = this._assetDir;
                this.node.addChild(soundonlyImage);
                break;
            case SOUNDONLY_WORD:
                const soundonlyWord = cc.instantiate(this.soundonlyWord);
                const soundonlyWordComponent = soundonlyWord.getComponent(SoundonlyWord);
                soundonlyWordComponent.quizConfig = this._quizLiteracyConfig;
                soundonlyWordComponent.assetDir = this._assetDir;
                this.node.addChild(soundonlyWord);
                break;
            case SOUNDONLY_SENTENCE:
                const soundonlySentence = cc.instantiate(this.soundonlySentence);
                const soundonlySentenceComponent = soundonlySentence.getComponent(SoundonlySentence);
                soundonlySentenceComponent.quizConfig = this._quizLiteracyConfig;
                soundonlySentenceComponent.assetDir = this._assetDir;
                this.node.addChild(soundonlySentence);
                break;
            case SENTENCE_WORD:
                const sentenceWord = cc.instantiate(this.sentenceWord);
                const sentenceWordComponent = sentenceWord.getComponent(SentenceWord);
                sentenceWordComponent.quizConfig = this._quizLiteracyConfig;
                sentenceWordComponent.assetDir = this._assetDir;
                this.node.addChild(sentenceWord);
                break;
            case SENTENCE_SENTENCE:
                const sentenceSentence = cc.instantiate(this.sentenceSentence);
                const sentenceSentenceComponent = sentenceSentence.getComponent(SentenceSentence);
                sentenceSentenceComponent.quizConfig = this._quizLiteracyConfig;
                sentenceSentenceComponent.assetDir = this._assetDir;
                this.node.addChild(sentenceSentence);
                break;
            case PARAGRAPH_SENTENCE:
                const paragraphSentence = cc.instantiate(this.paragraphSentence);
                const paragraphSentenceComponent = paragraphSentence.getComponent(ParagraphSequence);
                paragraphSentenceComponent.quizConfig = this._quizLiteracyConfig;
                paragraphSentenceComponent.assetDir = this._assetDir;
                this.node.addChild(paragraphSentence);
                break;
            case LISTENING_COM_SENTENCE:
                const listeningComSentence = cc.instantiate(this.listeningComSentence);
                const listeningComSentenceComponent = listeningComSentence.getComponent(ListeningComSequence);
                listeningComSentenceComponent.quizConfig = this._quizLiteracyConfig;
                listeningComSentenceComponent.assetDir = this._assetDir;
                this.node.addChild(listeningComSentence);
                break;
            case ORDERING_SENTENCE:
                const orderingSentence = cc.instantiate(this.orderingSentence);
                const orderingSentenceComponent = orderingSentence.getComponent(OrderingSequence);
                orderingSentenceComponent.quizConfig = this._quizLiteracyConfig;
                orderingSentenceComponent.assetDir = this._assetDir;
                this.node.addChild(orderingSentence);
                break;

            case WORD_IMAGE:
                const wordImage = cc.instantiate(this.wordImage);
                const wordImageComponent = wordImage.getComponent(WordImage);
                wordImageComponent.quizConfig = this._quizLiteracyConfig;
                wordImageComponent.assetDir = this._assetDir;
                this.node.addChild(wordImage);
                break;
        }
    }

    @catchError()
    next(event, correct: boolean) {
        event.stopPropagation();
        correct ? this.node.emit('correct') : this.node.emit('wrong');
        this.node.emit(QUIZ_ANSWERED, correct);
        this.scheduleOnce(
            () => {
                cc.audioEngine.stopAllEffects();
                cc.audioEngine.stopMusic();
                this.node.emit('nextProblem');
            }, 1
        );
    }


    private processConfiguration(data: any[] = []): QuizLiteracyConfig {
        const configurations: any[] = [].concat(...data);
        let [level,
            workSheet,
            problemNo,
            type,
            answer,
            choice1,
            choice2,
            choice3,
            displayImages,
            displayTexts,
            soundFile,
            additionalQuestion] = configurations;
        let choices: string = choice1 + "^" + choice2 + "^" + choice3;

        return {
            level,
            workSheet,
            problemNo,
            type,
            answer,
            choices,
            displayImages,
            displayTexts,
            soundFile,
            additionalQuestion
        };
    }

    protected onDestroy(): void {
        cc.audioEngine.stopAll();
    }
}
