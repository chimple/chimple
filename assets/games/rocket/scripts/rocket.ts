import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import BoxCollider = cc.BoxCollider;
import Layout = cc.Layout;
import Config, { Direction } from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";
import WordSoundButton from "./word-sound-button";
import Drag from "../../../common/scripts/drag";
import StickerChoice from "./sticker-choice";
import { AlphabetUtil } from "../../spelldoor/scripts/Utility";
import catchError from "../../../common/scripts/lib/error-handler";

const MAX_CHOICE_IN_ROW = 13;
export const STICK_CHOICE_CORRECT = 'stickChoiceCorrect';
export const STICK_CHOICE_WRONG = 'stickChoiceWrong';

export interface RocketConfig {
    level: string;
    worksheet: string;
    problem: string;
    word: string;
    card: string;
    activeCard: string;
    sound: string;
    image: string;
    partialboard: string;
    fullboard: string;
}

@ccclass
export default class Rocket extends cc.Component {
    private _currentConfig: RocketConfig = null;

    @property(cc.Prefab)
    wordNoteBoardPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    dropContainerPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    choiceContainerPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    choiceContainerOneRowPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    rocketheadPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    rockettailPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    stickerPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    stickerDropPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    soundBtnPrefab: cc.Prefab = null;

    _dog: cc.Node = null;
    _friend: dragonBones.ArmatureDisplay = null
    _wordNoteBoard: cc.Node = null;
    _dropLayout: cc.Node = null;
    _loadedTexture = null;
    _totalDrops: number = 0;
    _rocketHead: cc.Node = null;
    _rocketTail: cc.Node = null;
    _dropContainer: cc.Node = null;
    _mWord = [];
    _choiceContainers = [];

    _helpDragNode: cc.Node = null;
    _helpDropNode: cc.Node = null;
    _helpWord: string = null;
    _isRTL: boolean = false

    @catchError()
    protected onLoad(): void {
        this._isRTL = Config.i.direction == Direction.RTL
        cc.director.getCollisionManager().enabled = true;
        Drag.letDrag = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true

        this._currentConfig = this.processConfiguration(Config.getInstance().data[0]);
        let bt = new Date();
        this.buildUI();
        Util.computeTimeDiff('wordnote buildUI', bt);
    }

    @catchError()
    buildUI() {
        this.buildWordNoteBoard();
        this.buildDropContainer();
        this._mWord = this.diff(this._currentConfig.card, this._currentConfig.activeCard);
        if (this._currentConfig.fullboard === "true" || this._currentConfig.partialboard === "true") {
            for (let i = 1; i <= 2; i++) {
                const c = this.buildChoiceContainerSingleRow(i);
                this._choiceContainers.push(c);
            }
        } else {
            const c = this.buildChoiceContainer(1);
            this._choiceContainers.push(c);
        }
        this.speakWord(0.1);

        this.node.on(STICK_CHOICE_CORRECT, this.stickCorrect.bind(this));
        this.node.on(STICK_CHOICE_WRONG, this.stickWrong.bind(this));
        this.scheduleOnce(
            () => {
                this._choiceContainers.forEach(
                    (c: cc.Node) => c.opacity = 255
                );
            }, 0.1
        );

        this.scheduleOnce(
            () => {
                Util.showHelp(this._helpDragNode, this._helpDropNode);
            }, 0.5
        );
    }

    @catchError()
    speakWord(timedelay = 0) {
        this.scheduleOnce(
            () => {
                try {
                    Util.loadGameSound(this._currentConfig.sound, (clip) => {
                        Util.play(clip, false);
                    });
                } catch (e) {

                }
            }, timedelay
        );
    }

    @catchError()
    createDog(parent: cc.Node) {
        this._dog = parent.getChildByName("character_node").getChildByName("dog");
        this._dog.active = true;
        Util.loadFriend((friendNode: cc.Node) => {
            this._friend = friendNode.getComponent(dragonBones.ArmatureDisplay)
            this._dog.addChild(friendNode)
            this._friend.playAnimation('face_touch', 1)
        })
    }

    @catchError()
    createSoundBtn() {
        const soundBtn = cc.instantiate(this.soundBtnPrefab);
        soundBtn.setPosition(new cc.Vec2(320, 30));
        soundBtn.getComponent(WordSoundButton).containerComponent = this;
        this._wordNoteBoard.addChild(soundBtn);
    }

    @catchError()
    loadTexture() {
        // @ts-ignore
        Util.loadTexture(this._currentConfig.image,
            (texture) => {
                this.showImage(texture);
            });
    }

    @catchError()
    showImage(texture) {
        const image = this._wordNoteBoard.getChildByName('frame').getChildByName('imageNode');
        image.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        this.checkRTLAndScaleX(image, 0.5);
        image.scaleY = 0.5;
          }

    @catchError()
    buildWordNoteBoard() {
        this._wordNoteBoard = cc.instantiate(this.wordNoteBoardPrefab);
        const labelNode = this._wordNoteBoard.getChildByName('label');
        const label = labelNode.getComponent(cc.Label);
        const outLine = labelNode.addComponent(cc.LabelOutline);
        outLine.width = 2;
        label.string = this._currentConfig.word;
        this._wordNoteBoard.setPosition(new cc.Vec2(0, 263));
        this.createSoundBtn();
        this.loadTexture();
        this.checkRTLAndScaleX(this._wordNoteBoard, 1);
        this.checkRTLAndScaleX(labelNode, 1);
        this.node.addChild(this._wordNoteBoard);
    }

    onTouchEnd(touch: cc.Touch) {
        this.speakWord();
    }

    @catchError()
    buildDropContainer() {
        this._dropContainer = cc.instantiate(this.dropContainerPrefab);
        this._dropContainer.setPosition(new cc.Vec2(-80, 25));
        if (this._isRTL) {
          this._dropContainer.setPosition(new cc.Vec2(80, 25));
          this.checkRTLAndScaleX(this._dropContainer, 1)
        }
        this._dropLayout = this._dropContainer.getChildByName('dropLayout');
        this.addChildrenToDropLayout(this._dropLayout, this.stickerDropPrefab);
        this.node.addChild(this._dropContainer);
    }

    @catchError()
    addChildrenToDropLayout(node: cc.Node, prefab: cc.Prefab) {
        this._rocketHead = cc.instantiate(this.rocketheadPrefab);
        this.createDog(this._rocketHead);
        node.addChild(this._rocketHead);

        //@ts-ignore
        let word = Config.dir === 'en/' ? this._currentConfig.word.split('') :
            this._currentConfig.activeCard.split(',');
        let card = this._currentConfig.card.split(',');

        let showWords = this._currentConfig.fullboard === 'true'
            || this._currentConfig.partialboard === 'true' ? word : card;

        this.buildWords(node, showWords || [], prefab, true);

        this._rocketTail = cc.instantiate(this.rockettailPrefab);
        node.addChild(this._rocketTail);
    }

    @catchError()
    createSticker(parent: cc.Node, index: number, word: string, isDrop, prefab: cc.Prefab, isAllowDrag) {
        const sticker = !!prefab ? cc.instantiate(prefab) : parent.getChildByName('sticker' + index);
        !!prefab ? parent.addChild(sticker) : '';
        sticker.getComponent(BoxCollider).size = new cc.Size(sticker.width, sticker.height);
        const labelNode = sticker.getChildByName('label');
        labelNode.color = cc.Color.WHITE;

        const outLine = labelNode.addComponent(cc.LabelOutline);
        outLine.width = 3;
        outLine.color = cc.Color.BLACK;

        if (!!labelNode) {
            const label = labelNode.getComponent(cc.Label);
            labelNode.width = label.fontSize * 1;

            if (isDrop) {
                sticker.color = cc.Color.GRAY;
                labelNode.opacity = 0;
                sticker.opacity = 50;
                this._totalDrops++;
            } else {
                sticker.color = new cc.Color().fromHEX('#' + Math.floor(Math.random() * 16777215).toString(16));
            }

            if (!isDrop) {
                const stickerChoice = sticker.getComponent(StickerChoice);
                stickerChoice.word = word;
                stickerChoice.name = word;
                stickerChoice.allowDrag = isAllowDrag;
                labelNode.opacity = isAllowDrag ? 255 : 128;
            }

            sticker.width = labelNode.width;
            if (!!label) {
                sticker.name = word;
                label.string = word;
            }
        }
        return sticker;
    }

    @catchError()
    buildWords(node: cc.Node, words: string[], prefab: cc.Prefab, isDrop: boolean = false) {
        words.forEach(
            (w, i) => {
                if (!this._helpWord) this._helpWord = w;
                let isAllowDrag: boolean = true;

                if (this._currentConfig.partialboard === "true"
                    && this._currentConfig.fullboard !== "true"
                    && !isDrop) {
                    isAllowDrag = this._currentConfig.activeCard.includes(w);
                }

                const sticker = this.createSticker(node, (i + 1), w, isDrop, prefab, isAllowDrag);
                if (!isDrop) {
                    if (this._helpWord === w) this._helpDragNode = sticker;
                    if (this._isRTL) {
                      let newNode = new cc.Node()
                      newNode.name = 'shouldFlip'
                      sticker.addChild(newNode)
                    }
                    sticker.on('stickChoice', () => {
                        this._totalDrops--;
                        this.node.emit('correct');

                        if (this._totalDrops === 0) {
                            this.scheduleOnce(() => {
                                this.playSuccessAnimation();
                            }, 1);
                        }
                    });
                    sticker.on('stickNoChoice', () => {
                        this.node.emit('wrong');
                    });
                } else {
                    if (this._helpWord === w)
                        this._helpDropNode = sticker;
                }
            }
        );
    }

    @catchError()
    stickCorrect(event) {
        event.stopPropagation();
        this._totalDrops--;
        this.node.emit('correct');

        if (this._totalDrops === 0) {
            this.speakWord(0);
            this.playSuccessAnimation();
        }
    }

    @catchError()
    stickWrong(event) {
        event.stopPropagation();
        this.node.emit('wrong');
    }

    @catchError()
    moveToNext() {
        this.node.emit('nextProblem');
    }

    @catchError()
    playSuccessAnimation() {
        const fire = this._rocketTail.getChildByName('fire');
        const fireAnimation = fire.getComponent(cc.Animation);
        fireAnimation.play('fire');

        this.scheduleOnce(
            () => {
                new cc.Tween()
                    .target(this._dropContainer)
                    .to(
                      1.5, { x: (cc.winSize.width + 100) * (this._isRTL ? 1 : -1) }, { progress: null, easing: 'quadOut' })
                      .call(() => {
                        this.moveToNext();
                    })
                    .start();
            }, 1
        );
    }

    @catchError()
    removeDuplicateCharacters(str) {
        return str.replace(/[\s\S](?=([\s\S]+))/g, function (c, s) {
            return s.indexOf(c) + 1 ? '' : c;
        });
    }

    @catchError()
    diff(card: string, activeCard: string): string[] {
        // @ts-ignore
        let activeCardArr = Config.dir === 'en/' ?
            this._currentConfig.word.split('') : activeCard.split(',');
        let cardArr = card.split(',');
        let onlyCards = cardArr.filter(x => !activeCard.includes(x));
        return Util.shuffle(activeCardArr.concat(onlyCards).slice(0, MAX_CHOICE_IN_ROW * 2));

    }

    @catchError()
    addChildrenToChoiceLayout(index: number, node: cc.Node, prefab: cc.Prefab) {
        const chars = this.buildShowWords(index);
        this.buildWords(node, chars || [], prefab, false);
    }

    @catchError()
    buildChoiceContainerSingleRow(index: number): cc.Node {
        const choiceContainer = cc.instantiate(this.choiceContainerOneRowPrefab);
        this.addChoiceContainerToNode(choiceContainer, index, false);
        return choiceContainer;
    }

    @catchError()
    addChoiceContainerToNode(choiceContainer, index, addChild: boolean = false) {
        choiceContainer.opacity = 0;
        choiceContainer.name = 'choiceContainer' + index;
        choiceContainer.setPosition(new cc.Vec2(0, index * -150 + (index - 1) * 50));
        const choiceLayout = choiceContainer.getChildByName('choiceLayout');
        if (addChild) {
            this.addChildrenToChoiceLayout(index, choiceLayout, this.stickerPrefab);
        } else {
            this.addChildrenToChoiceLayoutSingleRow(index, choiceLayout);
        }

        choiceLayout.name = 'choiceLayout' + index;
        this.node.addChild(choiceContainer);
        this.updateChoiceLayout(choiceLayout);
    }

    @catchError()
    checkRTLAndScaleX(node: cc.Node, scale: number) {
      node.scaleX = this._isRTL ? -scale : scale
    }

    @catchError()
    buildShowWords(index: number) {
        let showWords: string[] = this._currentConfig.fullboard === "true" ||
            this._currentConfig.partialboard === "true" ?
            Util.chunk(this._mWord, Math.floor(this._mWord.length / 2)) :
            Util.shuffle(this._currentConfig.activeCard.split(','));

        let chars: any = [];

        if (this._currentConfig.fullboard === "true" || this._currentConfig.partialboard === "true") {
            chars = showWords[(index - 1)];
        } else {
            chars = showWords;
        }

        return chars;
    }

    @catchError()
    addChildrenToChoiceLayoutSingleRow(index: number, node: cc.Node) {
        const chars = this.buildShowWords(index);
        this.buildWords(node, chars || [], null, false);
    }

    @catchError()
    buildChoiceContainer(index: number): cc.Node {
        const choiceContainer = cc.instantiate(this.choiceContainerPrefab);
        this.addChoiceContainerToNode(choiceContainer, index, true);
        return choiceContainer;
    }

    @catchError()
    updateChoiceLayout(choiceLayoutNode: cc.Node) {
        this.scheduleOnce(
            () => {
                const layout = choiceLayoutNode.getComponent(cc.Layout);
                layout.type = Layout.Type.NONE;
            }, 0.05
        );
    }

    private processConfiguration(data: any[] = []): RocketConfig | null {
        let configurations: any[] = [].concat(...data);

        let [level, worksheet, problem, word, card,
            activeCard, sound, image, partialboard, fullboard] = configurations;

        if (card.length === 0) {
            card = AlphabetUtil.getRandomConsonantArray(Config.dir).join(',');
        }

        return {
            level, worksheet, problem, word, card,
            activeCard, sound, image, partialboard, fullboard
        };
    }

}
