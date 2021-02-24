import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Config from "../../../common/scripts/lib/config";
import {LetterTracingBackCard} from "./lettertracingbackcard";
import {LetterTracingFrontCard} from "./lettertracingfrontcard";
import catchError from "../../../common/scripts/lib/error-handler";
import {
    CONFIG_LOADED,
    RESET_TRACING,
    RESET_TRACING_ALLOWED,
    RESET_TRACING_NOT_ALLOWED
} from "../../../common/scripts/helper";
import Game from "../../../common/scripts/game";
import {Util} from "../../../common/scripts/util";


export const LETTER_TRACING_CARD_SCALE = 0.85;
export const LETTER_TRACING_CARD_EVENT = 'hideFrontCardAndShowBackCard';

export interface Data {
    elementIndex: number;
}

interface WriteCardConfig {
    level: string;
    workSheet: string;
    problemNo: string;
    traceText: string;
    options: string[];
    images: string[];
    sounds: string[];
}

@ccclass
export class WriteCard extends Game {

    @property(cc.Prefab)
    frontCardPrefab: cc.Prefab;

    @property(cc.Prefab)
    backCardPrefab: cc.Prefab;

    _currentConfig: WriteCardConfig;
    _letterTracingCardContainer: cc.Node = null;
    _frontCard: cc.Node = null;
    _backCard: cc.Node = null;
    _frontCards: cc.Node[] = [];
    _backCards: cc.Node[] = [];
    _currentIndex: number = 0;

    _originalFrontCardName: string;
    _originalBackCardName: string;

    @catchError()
    protected onLoad(): void {
        let manager = cc.director.getCollisionManager();
        manager.enabled = false;
        this._currentConfig = this.processConfiguration(Config.getInstance().data[0]);
        // register
        this.node.on(LETTER_TRACING_CARD_EVENT, (event) => {
            event.stopPropagation();
            const data = event.getUserData();
            this.hideFrontCardAndShowBackCard(data);
        });
        this.buildUI();
        Util.showHelp(null, null);

        this.node.on(RESET_TRACING_ALLOWED, () => {
            if (this.node.getChildByName('reeetTracingButton') !== null)
                this.node.getChildByName('reeetTracingButton').opacity = 255;
        })

        this.node.on(RESET_TRACING_NOT_ALLOWED, () => {
            if (this.node.getChildByName('reeetTracingButton') !== null)
                this.node.getChildByName('reeetTracingButton').opacity = 0

        })

        this.node.on(RESET_TRACING, (event) => {
            event.stopPropagation();
            console.log("current index" + this._currentIndex);
            const fNode = this.node.getChildByName(this._originalFrontCardName + this._currentIndex);
            if (!!fNode) {
                const frontComponent: LetterTracingFrontCard = fNode.getComponent(LetterTracingFrontCard)
                if (!!frontComponent) {
                    frontComponent.resetTracing();
                    this.emitCardEnabledEvent(fNode, this._currentIndex);
                }
            }
        });
    }

    @catchError()
    buildUI() {
        if (this._currentConfig !== null) {
            console.log('current config', this._currentConfig);
            this._letterTracingCardContainer = this.node;
            this._letterTracingCardContainer.scale *= LETTER_TRACING_CARD_SCALE;
            this.node.width = cc.winSize.width;
            this.node.height = cc.winSize.height;

            const optionsLength: number = this._currentConfig.options.length || 0;
            for (let i = 0; i < optionsLength; i++) {
                this.renderCard(i);
            }
            this.node.emit(CONFIG_LOADED);
            const fNode = this.node.getChildByName(this._originalFrontCardName + '0');
            this.emitCardEnabledEvent(fNode, 0);
        }
    }

    @catchError()
    renderCard(index: number) {
        this._frontCard = cc.instantiate(this.frontCardPrefab);
        this._originalFrontCardName = this._frontCard.name;
        this._frontCard.name = this._frontCard.name + index;
        this._frontCard.getComponent(LetterTracingFrontCard).optionIndex = index;

        this._backCard = cc.instantiate(this.backCardPrefab);
        this._originalBackCardName = this._backCard.name;
        this._backCard.name = this._backCard.name + index;
        this._backCard.getComponent(LetterTracingBackCard).optionIndex = index;

        this.node.addChild(this._frontCard);
        this.node.addChild(this._backCard);
        this._backCard.active = false;
        this._frontCard.opacity = index === 0 ? 255 : 0;
        // this._frontCard.setPosition((index - 1) * 512 + (index - 1) * 30, 0);
        // this._backCard.setPosition((index - 1) * 512 + (index - 1) * 30, 0);
        this._frontCard.setPosition(0, 0);
        this._backCard.setPosition(0, 0);
        // this._frontCard.opacity = 255;
        this._frontCards.push(this._frontCard);
        this._backCards.push(this._backCard);
    }

    @catchError()
    private emitCardEnabledEvent(fNode: cc.Node, index: number) {
        fNode.opacity = 255;
        fNode.emit('cardEnabled', index);
        this._currentIndex = index;
    }

    private processConfiguration(data: any[] = []): WriteCardConfig | null {
        const configurations: any[] = [].concat(...data);
        let [level, workSheet, problemNo, traceText, option1, image1, sound1, option2, image2, sound2, option3, image3, sound3] = configurations;
        const options = [option1, option2, option3]
        const images = [image1, image2, image3]
        const sounds = [sound1, sound2, sound3]
        return {
            level,
            workSheet,
            problemNo,
            traceText,
            options,
            images,
            sounds
        };
    }

    get currentConfig() {
        return this._currentConfig;
    }


    hideFrontCardAndShowBackCard(data: Data) {
        const index = data.elementIndex;
        const fNode = this.node.getChildByName(this._originalFrontCardName + index);
        const bcNode = this.node.getChildByName(this._originalBackCardName + index);

        new cc.Tween().target(fNode)
            .to(0.5, {opacity: 0}, {progress: null, easing: 'sineOut'})
            .call(() => {
                bcNode.active = true;
                bcNode.scale = 0;
                new cc.Tween().target(bcNode)
                    .to(0.5, {scale: 1}, {progress: null, easing: 'sineOut'})
                    .call(
                        () => {
                            bcNode.getComponent(LetterTracingBackCard).animateText();
                            bcNode.getComponent(LetterTracingBackCard).pronounce();
                            this.scheduleOnce(() => {
                                fNode.active = false;
                                new cc.Tween().target(bcNode)
                                    .to(0.2, {opacity: 255, scale: 0.75}, {progress: null, easing: 'quintInOut'})
                                    .then(new cc.Tween().to(0.2, {opacity: 255, scale: 0.5}, {
                                        progress: null,
                                        easing: 'cubicInOut'
                                    }))
                                    .then(new cc.Tween().to(0.2, {opacity: 255, scale: 0.25}, {
                                        progress: null,
                                        easing: 'cubicInOut'
                                    }))
                                    .then(new cc.Tween().to(0.2, {opacity: 255, scale: 0}, {
                                        progress: null,
                                        easing: 'cubicInOut'
                                    }))
                                    .call(() => {
                                        bcNode.active = false;
                                        if (index < this._currentConfig.options.length - 1) {
                                            const nextFNode = this.node.getChildByName(this._originalFrontCardName + (index + 1));
                                            this.emitCardEnabledEvent(nextFNode, index + 1);
                                        } else {
                                            this.node.emit('nextProblem');
                                        }
                                    })
                                    .start();
                            }, 1);
                        }
                    )
                    .start();
            })
            .start();
    }
}
