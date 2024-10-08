import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Config, { Direction } from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";
import ChoiceCard from "./choice-card";
import catchError from "../../../common/scripts/lib/error-handler";
import Game from "../../../common/scripts/game";

export const START_SCROLL_CLICK = 'START_SCROLL_CLICK';
export const SCROLL_BEGAN = 'SCROLL_BEGAN';
export const SCROLL_ENDED = 'SCROLL_ENDED';
export const CHOICE_CLICKED = 'CHOICE_CLICKED';

export interface OpenWindowConfig {
    level: string;
    worksheet: string;
    problem: string;
    type: string;
    word: string;
    goodimage: string;
    badimage: string;
    sound: string;
    slots: string;
}

@ccclass
export default class OpenWindow extends Game {

    private _currentConfig: OpenWindowConfig = null;

    @property(cc.Prefab)
    slotWindowPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    scrollWindow: cc.Prefab = null;

    @property(cc.Prefab)
    slotFramePrefab: cc.Prefab = null;

    @property(cc.AudioClip)
    scrollClip: cc.AudioClip = null;

    @property(cc.AudioClip)
    correctClip: cc.AudioClip = null;

    @property(cc.AudioClip)
    wrongClip: cc.AudioClip = null;

    private _frameHeight: number = 0;
    private _slots: cc.Node[] = [];
    private _words: string[] = [];
    private _choiceCard1: cc.Node = null;
    private _choiceCard2: cc.Node = null;
    private _curIndex: number = 0;
    private _helpDragNode: cc.Node = null;

    _isRTL: boolean = false;

    @catchError()
    protected onLoad(): void {
        this._isRTL = Config.i.direction == Direction.RTL;
        this._currentConfig = this.processConfiguration(Config.getInstance().data[0]);

        this.buildUI();
        this.node.on(START_SCROLL_CLICK, (event) => {
            event.stopPropagation();
            this._curIndex = 0;
            this.renderUI();
        });
    }

    @catchError()
    protected startAutoScroll() {
        const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(START_SCROLL_CLICK, true);
        this.node.dispatchEvent(customEvent);
    }

    @catchError()
    buildUI() {
        this.buildSlots();
        this.buildChoices();
        this.renderUI();

        this.node.on(CHOICE_CLICKED, (event) => {
            event.stopPropagation();
            const data = event.getUserData();
            const matchText = this._currentConfig.goodimage.indexOf("/") !== -1 ?
                this._currentConfig.goodimage.substr(this._currentConfig.goodimage.lastIndexOf('/') + 1).replace('.png', '')
                : this._currentConfig.goodimage;
            if (!!data && data.text === matchText) {
                this._choiceCard1.parent.getComponent(ChoiceCard).touchEnabled = false;
                this._choiceCard2.parent.getComponent(ChoiceCard).touchEnabled = false;
                this.node.emit('correct');
                const door = data.parentNode;
                const doorAnimation = door.getComponent(cc.Animation);
                doorAnimation.on('finished', () => {
                    this.scheduleOnce(
                        () => {
                            this.node.emit('nextProblem');
                        }, 1
                    );
                });
                doorAnimation.play('door_open');
            } else {
                this.node.emit('wrong');
            }
        });
    }

    // playCloseAnim() {
    //     const curtain = this._randomWindow.getChildByName('curtain_node');
    //     if (!!curtain) {
    //         const anim: cc.Animation = curtain.getComponent(cc.Animation);
    //         anim.play('close');
    //         this.scheduleOnce(() => {
    //             this.playOpenAnim();
    //             try {
    //                 // @ts-ignore
    //                 Util.loadGameSound(this._currentConfig.sound, (clip) => {
    //                     if(clip) {
    //                         Util.play(clip, false);
    //                     }
    //                     this.scheduleOnce(
    //                         () => {
    //                             this.node.emit('nextProblem');
    //                         }, 1
    //                     );
    //                 });
    //             } catch (e) {
    //
    //             }
    //         }, 1);
    //     }
    // }

    @catchError()
    playOpenAnim(scrollableSlot: cc.Node, word: string) {
        const curtain = scrollableSlot.getChildByName('curtain_node');
        if (!!curtain) {
            const anim: cc.Animation = curtain.getComponent(cc.Animation);
            anim.play('open');
            anim.on('finished', () => {
                this.speak(word, () => {
                    this._curIndex++;
                    this.renderUI();
                });
            });
        }
    }

    @catchError()
    buildSlots() {
        const words = this._currentConfig.word.indexOf(',') !== -1 ?
            this._currentConfig.word.split(',') :
            this._currentConfig.word.split('');
        const slotWindow = cc.instantiate(this.slotWindowPrefab);
        slotWindow.setPosition(new cc.Vec2(0, cc.winSize.height / 4 - 50));
        const slotLayout = slotWindow.getChildByName('slotLayout');
        const layoutComponent = slotLayout.getComponent(cc.Layout);
        if (words.length > 5) {
            slotWindow.scale = 1.1;
            layoutComponent.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        } else {
            slotWindow.scale = 1.25;
            layoutComponent.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        }
        if (Config.wide) layoutComponent.spacingX = 45
        this.addFrames(slotLayout, words);
        this.node.addChild(slotWindow);
        this._slots = this._slots.reverse();
        this._words = this._words.reverse();
    }

    @catchError()
    addSlots(parent: cc.Node, word: string) {
        const scrollableWindow = cc.instantiate(this.scrollWindow);
        const contentSlot = scrollableWindow.getChildByName('contentNode');
        this.addContent(contentSlot, word);
        const curtainNode = scrollableWindow.getChildByName('curtain_node');
        if (Config.wide) curtainNode.scale = 1.4
        parent.addChild(scrollableWindow);
        this._slots.push(scrollableWindow);
        this._words.push(word);
    }

    @catchError()
    renderUI() {
        const popIndex = this._curIndex <= this._slots.length - 1 ?
            this._isRTL ? this._curIndex : this._slots.length - 1 - this._curIndex : -1;
        if (popIndex !== -1) {
            const slot = this._slots[popIndex];
            const word = this._words[popIndex];
            if (!!slot && !!word) {
                this.animationOpenWindow(slot, word);
            }
        } else {
            Util.loadGameSound(this._currentConfig.sound, (clip) => {
                if (clip) {
                    // Util.play(clip, false);
                    this.friend.extraClip = clip
                }
                this.scheduleOnce(
                    () => {
                        this._choiceCard1.parent.getComponent(ChoiceCard).touchEnabled = true;
                        this._choiceCard2.parent.getComponent(ChoiceCard).touchEnabled = true;
                        this._choiceCard1.opacity = 255;
                        this._choiceCard2.opacity = 255;
                        this.scheduleOnce(
                            () => {
                                Util.showHelp(this._helpDragNode, this._helpDragNode);
                            }, 0.5
                        );

                    }, 1
                );
            });
        }
    }

    @catchError()
    animationOpenWindow(scrollableSlot: cc.Node, word: string) {
        this.scheduleOnce(
            () => {
                this.playOpenAnim(scrollableSlot, word);
            }, 0.5
        );
    }

    @catchError()
    speak(w: string, callBack: Function) {
        this.friend.speakPhonicsOrLetter(w, callBack);
    }

    @catchError()
    autoScrollToWord(parent: cc.Node, word: string) {
        let slots = this.getSlotItems();
        const scrollView = parent.getComponent(cc.ScrollView);
        const index = slots.indexOf(word);
        const curOffSet = scrollView.getScrollOffset();
        if (Math.floor(curOffSet.y) !== Math.floor(index * this._frameHeight)) {
            scrollView.scrollToBottom(0.5);
            this.scheduleOnce(() => {
                scrollView.scrollToOffset(new cc.Vec2(0, index * this._frameHeight), 0.5);
            }, 0.5);
        }

        this.scheduleOnce(
            () => {
                this.speak(word, () => {
                    this._curIndex++;
                    this.renderUI();
                });
            }, 1
        );
    }

    @catchError()
    getSlotItems() {
        let slotItems = this._currentConfig.slots.indexOf(",") !== -1 ?
            this._currentConfig.slots.split(',') :
            this._currentConfig.slots.split('');

        let answers = this._currentConfig.word.indexOf(',') !== -1 ?
            this._currentConfig.word.split(',') :
            this._currentConfig.word.split('');
        slotItems = slotItems.concat(answers);
        return Array.from(new Set(slotItems));
    }

    @catchError()
    addScrollContents(parent: cc.Node) {
        const color = new cc.Color().fromHEX('#' + Math.floor(Math.random() * 16777215).toString(16));
        let slotItems = this.getSlotItems();

        slotItems.forEach(
            s => {
                const frame = this.createSlotFrame(s, color);
                parent.addChild(frame);
                this._frameHeight = frame.height;
                parent.height += frame.height;
            }
        );
    }

    @catchError()
    addContent(parent: cc.Node, s: string) {
        const color = new cc.Color().fromHEX('#' + Math.floor(Math.random() * 16777215).toString(16));
        const frame = this.createSlotFrame(s, color);
        parent.addChild(frame);
        s;
    }

    @catchError()
    createSlotFrame(w: string, color: cc.Color): cc.Node {
        const frame = cc.instantiate(this.slotFramePrefab);
        const slotItem = frame.getChildByName('slotitem');
        const labelNode = slotItem.getChildByName('label');
        labelNode.color = color;
        const label = labelNode.getComponent(cc.Label);
        label.string = Config.wide ? ' ' + w + ' ' : w;
        const outLine = labelNode.addComponent(cc.LabelOutline);
        outLine.width = 2;

        return frame;
    }

    @catchError()
    addFrames(parent: cc.Node, words: string[]) {
        words.forEach(
            w => {
                this.addSlots(parent, w);
            }
        );
    }

    @catchError()
    buildChoices() {
        let firstCardCorrect = Math.random() >= 0.5;
        this._choiceCard1 = this.node.getChildByName('left_Button').getChildByName('image');
        this.loadTextureAndShowImage(this._choiceCard1, firstCardCorrect ? this._currentConfig.goodimage : this._currentConfig.badimage);
        this._choiceCard2 = this.node.getChildByName('right_Button').getChildByName('image');
        this.loadTextureAndShowImage(this._choiceCard2, firstCardCorrect ? this._currentConfig.badimage : this._currentConfig.goodimage);
        this._helpDragNode = firstCardCorrect ? this._choiceCard1 : this._choiceCard2;
    }

    @catchError()
    loadTextureAndShowImage(node: cc.Node, image: string) {
        node.opacity = 0;
        const component: ChoiceCard = node.parent.getComponent(ChoiceCard);
        component.parentNode = this.node.getChildByName('door_node');
        component.text = image.indexOf("/") !== -1 ?
            image.substr(image.lastIndexOf('/') + 1).replace('.png', '') : image;
        component.touchEnabled = false;
        Util.loadTexture(image,
            (texture) => {
                this.showImage(node, texture);
            });
    }

    @catchError()
    showImage(node, texture) {
        const sprite = node.getComponent(cc.Sprite);
        sprite.spriteFrame = new cc.SpriteFrame(texture);
        Util.resizeSprite(sprite, 272, 201)
    }

    private processConfiguration(data: any[] = []): OpenWindowConfig | null {
        let configurations: any[] = [].concat(...data);

        let [level, worksheet, problem, type, word, goodimage, badimage, sound, slots] = configurations;
        return {
            level, worksheet, problem, type, word, goodimage, badimage, sound, slots
        };
    }
}
