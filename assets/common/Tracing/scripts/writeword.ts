import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Config, { Direction } from "../../../common/scripts/lib/config";
import { LETTER_SCALE, SingleLetterTracing } from "./singlelettertracing";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";
import { MOVE_TO_NEXT_LETTER_EVENT, CONFIG_LOADED, SOUND_LOADED_EVENT, TRACING_FINISHED, TRACING_CORRECT, TRACING_WRONG } from "../../../common/scripts/helper";

export const TRACE_WIDTH = 512;
export const TRACE_HEIGHT = 768;

export interface WriteWordConfig {
    level: string;
    workSheet: string;
    problemNo: string;
    word: string;
    image: string;
    sound: string;
}

@ccclass
export default class WriteWord extends cc.Component {

    @property(cc.Node)
    words: cc.Node = null;

    @property(cc.Prefab)
    singleLetterPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    imageNode: cc.Prefab = null;

    private _currentConfig: WriteWordConfig = null;
    private _wordTracingContainer: cc.Node = null;
    private _imageName: string = null;
    private _image: cc.Node;
    private _characters: string[];
    private _sound: any = null;
    private _soundID: number;
    private _originalLetterName: string;
    private _wordLayout: cc.Layout;
    private _singleLetterComponent: SingleLetterTracing;
    private _currentLetterIndex: number = 0;
    private _texture: any = null;

    @catchError()
    protected onLoad(): void {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;

        this.subScribeToTracingEvents();
        // register
        this.node.on(MOVE_TO_NEXT_LETTER_EVENT, (event) => {
            event.stopPropagation();
            const data = event.getUserData();
            this.moveToNextLetter(data);
        });

        this._currentConfig = this.processConfiguration(Config.getInstance().data[0]);
        this._image = cc.instantiate(this.imageNode);
        if (this._currentConfig !== null) {
            this._wordTracingContainer = this.node;
            this._wordTracingContainer.scale *= 1;
            this.node.width = cc.winSize.width;
            this.node.height = cc.winSize.height;
            this.buildLetters();
            this.node.emit(CONFIG_LOADED);
            this.loadSounds(this._currentConfig.sound);
            this.node.on(SOUND_LOADED_EVENT, () => {
                this.pronounce();
            });

            this.emitLetterEnabledEvent(
                this._wordLayout.node.getChildByName(this._originalLetterName + '0'), 0
            );

            Util.loadTexture(this._currentConfig.image, (texture, err) => {
                if (!!texture && !err) {
                    this._texture = texture;
                }
            });
        }
    }

    @catchError()
    private moveToNextLetter(data) {
        const index = data.elementIndex;
        if (index <= this._characters.length - 1) {
            const child = this._wordLayout.node.getChildByName(this._originalLetterName + index);
            if (Config.i.direction == Direction.RTL) {
                this.minScrollToRight(index, child);
                this.scrollToRight(index, child);
            } else {
                this.minScrollToLeft(index, child);
                this.scrollToLeft(index, child);
            }
        } else {
            // load image
            this.loadImage(this._currentConfig.image);
        }
    }

    @catchError()
    minScrollToLeft(index: number, child: cc.Node) {
        const scrollToLeft = cc.winSize.width / 6;
        const newPos = new cc.Vec2(this._wordLayout.node.position.x - scrollToLeft, this._wordLayout.node.position.y);
        new cc.Tween().target(this._wordLayout.node)
            .to(0.5, {position: newPos}, {progress: null, easing: 'sineOut'})
            .call(() => {
                this.emitLetterEnabledEvent(
                    this._wordLayout.node.getChildByName(this._originalLetterName + index), index
                );
            })
            .start();
    }

    @catchError()
    scrollToLeft(index: number, child: cc.Node) {
        if (child.position.x - Math.abs(this._wordLayout.node.position.x / 2) + child.width * 1.0 > cc.winSize.width) {
            const scrollToLeft = child.width;
            const newPos = new cc.Vec2(this._wordLayout.node.position.x - scrollToLeft, this._wordLayout.node.position.y);
            new cc.Tween().target(this._wordLayout.node)
                .to(0.5, {position: newPos}, {progress: null, easing: 'sineOut'})
                .call(() => {
                    this.emitLetterEnabledEvent(
                        this._wordLayout.node.getChildByName(this._originalLetterName + index), index
                    );
                })
                .start();
        } else {
            this.minScrollToLeft(index, child);
        }
    }

    //functions  for RTL
    @catchError()
    minScrollToRight(index: number, child: cc.Node) {
        const scrollToRight = cc.winSize.width / 6;
        const newPos = new cc.Vec2(this._wordLayout.node.position.x + (1.0 * scrollToRight), this._wordLayout.node.position.y);
        new cc.Tween().target(this._wordLayout.node)
            .to(0.5, {position: newPos}, {progress: null, easing: 'sineOut'})
            .call(() => {
                this.emitLetterEnabledEvent(
                    this._wordLayout.node.getChildByName(this._originalLetterName + index), index
                );
            })
            .start();
    }

    @catchError()
    scrollToRight(index: number, child: cc.Node) {
        if (child.position.x - Math.abs(this._wordLayout.node.position.x / 2) + child.width * 1.0 > cc.winSize.width) {
            const scrollToRight = child.width;
            const newPos = new cc.Vec2(this._wordLayout.node.position.x + (1.2 * scrollToRight), this._wordLayout.node.position.y);
            new cc.Tween().target(this._wordLayout.node)
                .to(0.5, {position: newPos}, {progress: null, easing: 'sineOut'})
                .call(() => {
                    this.emitLetterEnabledEvent(
                        this._wordLayout.node.getChildByName(this._originalLetterName + index), index
                    );
                })
                .start();
        } else {
            this.minScrollToRight(index, child);
        }
    }

    //functions for RTL

    @catchError()
    protected tracingFinished() {
        const letterNode: cc.Node =
            this._wordLayout.node.getChildByName(this._originalLetterName + this._currentLetterIndex);
        letterNode.getComponent(SingleLetterTracing).pronounce();

        this.pronounce();

        const customEvent: cc.Event.EventCustom = new cc.Event.EventCustom(MOVE_TO_NEXT_LETTER_EVENT, true);
        this._currentLetterIndex++;
        customEvent.setUserData({
            elementIndex: this._currentLetterIndex
        });
        this.node.dispatchEvent(customEvent);
    }

    @catchError()
    private buildLetters() {
        this._wordLayout = this.words.getComponent(cc.Layout);
        // this._wordLayout.padding = 50;
        this._wordLayout.spacingX = 50;
        if (Config.i.direction == Direction.RTL) {
            this.words.scaleX = -LETTER_SCALE;
            this._wordTracingContainer.x = cc.winSize.width;

        } else {
            this.words.scale = LETTER_SCALE;
        }
        this._characters.forEach(
            (c, i) => {
                const singleLetter: cc.Node = cc.instantiate(this.singleLetterPrefab);
                if (Config.i.direction == Direction.RTL) {
                    singleLetter.scaleX = -LETTER_SCALE;
                }
                singleLetter.width = TRACE_WIDTH;
                singleLetter.height = TRACE_HEIGHT;
                this._originalLetterName = singleLetter.name;
                singleLetter.name = this._originalLetterName + i;
                this._singleLetterComponent = singleLetter.getComponent(SingleLetterTracing);
                this._singleLetterComponent.order = i;
                this._singleLetterComponent.letter = c;
                this._singleLetterComponent.wordTracingContainer = this.node;
                this._wordLayout.node.addChild(singleLetter);
                if (i === 0) {
                    this._currentLetterIndex = i;
                }
            }
        );
    }

    @catchError()
    private subScribeToTracingEvents() {
        this.node.on(TRACING_FINISHED, (event) => {
            this.tracingFinished();
        });

        this.node.on(TRACING_CORRECT, (event) => {
            event.stopPropagation();
            this._wordTracingContainer.emit('correct');
        });

        this.node.on(TRACING_WRONG, (event) => {
            event.stopPropagation();
            this._wordTracingContainer.emit('wrong');
        });
    }

    @catchError()
    private emitLetterEnabledEvent(fNode: cc.Node, index: number) {
        fNode.emit('letterEnabledEvent', index);
    }


    private processConfiguration(data: any[] = []): WriteWordConfig | null {
        const configurations: any[] = [].concat(...data);
        let [level, workSheet, problemNo, word, image, sound] = configurations;
        this._characters = Array.from(word);
        image = !!image ? image : word;
        sound = !!sound ? sound : word;
        return {
            level,
            workSheet,
            problemNo,
            word,
            image,
            sound
        };

    }

    loadImage(imageName: string) {
        this._imageName = imageName;
        if (!!this._texture) {
            this._image.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this._texture);
            this.node.addChild(this._image);
            this._image.opacity = 0;
            this._image.scale = 0;
            this.hideLayoutAndShowImage();
        } else {
            this.node.emit('nextProblem');
        }
    }

    hideLayoutAndShowImage() {
        new cc.Tween().target(this._wordLayout.node)
            .to(1, {opacity: 0}, {progress: null, easing: 'sineOut'})
            .call(() => {
                if (!!this._image) {
                    new cc.Tween().target(this._image)
                        .to(1, {scale: 1, opacity: 255}, {progress: null, easing: 'sineOut'})
                        .call(() => {
                                this.scheduleOnce(() => {
                                    this.node.emit('nextProblem');
                                }, 0.01);
                            }
                        )
                        .start();
                } else {
                    this.node.emit('nextProblem');
                }
            })
            .start();
    }

    get currentConfig() {
        return this._currentConfig;
    }

    private loadSounds(sound: string) {
        if (this._sound === null) {
            Util.loadGameSound(sound,
                (data) => {
                    this._sound = data;
                    this.node.emit(SOUND_LOADED_EVENT);
                }
            );
        }
    }

    private pronounce() {
        if (this._currentLetterIndex === this._characters.length - 1) {
            this.scheduleOnce(() => {
                if (!!this._sound)
                    this._soundID = Util.play(this._sound, false);
            }, 1);
        }
    }

    protected onDestroy(): void {
        cc.audioEngine.stopAllEffects();
    }
}
