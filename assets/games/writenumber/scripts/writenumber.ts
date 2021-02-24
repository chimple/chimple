import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Layout = cc.Layout;
import Config from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";
import { Anim } from "./anim";
import catchError from "../../../common/scripts/lib/error-handler";
import {
    CONFIG_LOADED,
    SOUND_LOADED_EVENT,
    TRACING_FINISHED,
    TRACING_CORRECT,
    TRACING_WRONG,
    RESET_TRACING, RESET_TRACING_ALLOWED, RESET_TRACING_NOT_ALLOWED
} from "../../../common/scripts/helper";
import { SingleLetterTracing } from "../../../common/Tracing/scripts/singlelettertracing";
import Game from "../../../common/scripts/game";

interface WriteNumberConfig {
    level: string;
    workSheet: string;
    problemNo: string;
    count: string;
}

const LETTER_SCALE = 0.95;
const TRACE_HEIGHT = 768;
const LENGTH_3 = 3;
const LENGTH_2 = 2;
const SPACING_1 = 660;
const SPACING_2 = 465;
const SPACING_3 = 400;
const ADJ_1 = 0.4;
const ADJ_2 = 0.4;

export const NUMBER_TRACING_TEXTURE = "games/writenumber/textures/";

@ccclass
export class WriteNumber extends Game {

    @property(cc.Prefab)
    wordsPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    animsPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    progressMonitorPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    singleLetterPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    imageNode: cc.Prefab = null;

    private _currentConfig: WriteNumberConfig = null;
    private _numericTracingContainer: cc.Node = null;
    private _characters: string[];
    private _sound: any = null;
    private _soundID: number;
    private _originalLetterName: string;
    private _layout: cc.Layout;
    private _animLayout: cc.Layout;
    private _words: cc.Node = null;
    private _anims: cc.Node = null;
    private _dog: cc.Node = null;
    private _currentLetterIndex: number = 0;

    private _touchAllowedOnAnimLayout: boolean = false;
    private _speakCount: number;

    private _shouldShowAnimSprite: boolean = true;
    private _animationFinishIndex = 0;

    @catchError()
    protected onLoad(): void {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this._shouldShowAnimSprite = true;

        if (this._shouldShowAnimSprite) {
            // this._dog = this.node.getChildByName('dog');
            // Util.loadFriend((friendNode: cc.Node) => {
            //     this.friend = friendNode.getComponent(dragonBones.ArmatureDisplay);
            //     this._dog.addChild(friendNode);
            //     this._dog.setPosition(new cc.Vec2(cc.winSize.width / 3, -1000));
            //     this._dog.scaleX = -0.6;
            //     this._dog.scaleY = 0.6;
            //     this._dog.opacity = 0;
            const friendY = this.friend.node.y
            this.friend.node.y += cc.winSize.height
                new cc.Tween().target(this.friend.node)
                    .to(0.25, {y: friendY}, {
                        progress: null,
                        easing  : 'quadOut'
                    })
                    .call(() => {
                        // this._dog.opacity = 255;
                        this.friend.playAnimation('throw', 1);
                        this.scheduleOnce(
                            () => {
                                this.buildAnimSprites();
                                this.scheduleOnce(() => {
                                    this._words.opacity = 255;
                                    Util.showHelp(null, null)
                                    // new cc.Tween().target(this.friend.node)
                                    //     .to(2, {position: new cc.Vec2(cc.winSize.width / 3, -cc.winSize.height * 2)}, {
                                    //         progress: null,
                                    //         easing  : 'quadOut'
                                    //     })
                                    //     .start();
                                }, 2);
                            },
                            0.65
                        );
                    })
                    .start();
            // });
        }
        this._currentConfig = this.processConfiguration(Config.getInstance().data[0]);
        if (this._currentConfig !== null) {
            this._words = cc.instantiate(this.wordsPrefab);
            this.node.addChild(this._words);
            const adj = this._characters.length === LENGTH_3 ? ADJ_1 : ADJ_2;
            const diff = this._characters.length === LENGTH_3 ? SPACING_1 : this._characters.length === LENGTH_2 ? SPACING_2 : SPACING_3;
            this._words.setPosition(new cc.Vec2(adj * cc.winSize.width - diff, 100));
            this._anims = cc.instantiate(this.animsPrefab);
            this.node.addChild(this._anims);
            this._anims.setPosition(new cc.Vec2(-cc.winSize.width / 4, 0));
            this._anims.width = (1 - adj) * cc.winSize.width;
            this._anims.height = cc.winSize.height;
            this._numericTracingContainer = this.node;
            this._numericTracingContainer.scale *= 1;
            this.node.width = cc.winSize.width;
            this.node.height = cc.winSize.height;
            this._speakCount = 0;
            this._words.opacity = this._shouldShowAnimSprite ? 0 : 255;
            this.buildNumbers();
            this.subScribeToTracingEvents();
            this.node.emit(CONFIG_LOADED);
            this.emitLetterEnabledEvent(
                this._layout.node.getChildByName(this._originalLetterName + '0'), 0
            );
            this.loadSounds(this._currentConfig.count);
        }
    }

    @catchError()
    private createSprite(parent: cc.Node, pos: cc.Vec2) {
        const sprite = cc.instantiate(this.imageNode);
        sprite.setPosition(new cc.Vec2(850, 200));
        sprite.scale = 0;
        sprite.opacity = 255;
        const component = sprite.getComponent(Anim);
        parent.addChild(sprite);
        component.containerNode = this.node;
        component.position = pos;
        component.animateToScreen();
    }

    @catchError()
    private buildNumbers() {
        this.buildLayout();
    }

    @catchError()
    private buildLayout() {
        this._layout = this._words.getComponent(cc.Layout);
        this._layout.node.zIndex = 2;
        // this._layout.padding = 20;
        this._layout.spacingX = 20;
        this._layout.spacingY = 0;
        this._layout.resizeMode = Layout.ResizeMode.CONTAINER;
        this._words.setPosition(new cc.Vec2(this._words.getPosition().x, this._words.getPosition().y - 50));
        this._words.scale = LETTER_SCALE;
        this._characters.forEach(
            (c, i) => {
                const singleLetter: cc.Node = cc.instantiate(this.singleLetterPrefab);
                singleLetter.height = TRACE_HEIGHT;
                singleLetter.scale = 1.25;
                this._originalLetterName = singleLetter.name;
                singleLetter.name = this._originalLetterName + i;
                const singleLetterComponent = singleLetter.getComponent(SingleLetterTracing);
                singleLetterComponent.wordTracingContainer = this.node;
                singleLetterComponent.order = i;
                singleLetterComponent.letter = c;
                this._layout.node.addChild(singleLetter);
                if (i === 0) {
                    this._currentLetterIndex = i;
                }
            }
        );
        this._layout.updateLayout();
    }

    @catchError()
    private buildAnimSprites() {
        this._animLayout = this._anims.getComponent(cc.Layout);
        this._animLayout.node.width = 425;
        this._animLayout.node.setPosition(new cc.Vec2(-512, -350));
        this._animLayout.type = Layout.Type.NONE;
        this._animLayout.resizeMode = Layout.ResizeMode.NONE;
        this._anims.scale = 0.85;
        this.generateAnimSprites(Number(this._currentConfig.count));
        this._animLayout.updateLayout();
    }

    @catchError()
    private generateAnimSprites(howMany: number) {
        const rows = Math.ceil(howMany / 2);
        const columns = 2;
        const gapX = Math.floor(350 / howMany) + 25;
        const gapY = howMany < 3 ? 400 : Math.floor(800 / (Math.ceil(howMany * 0.5)));

        for (let i = 0; i < howMany; i++) {
            const variationX = i % 2 === 0 ? 100 : 300;
            this.createSprite(
                this._animLayout.node,
                new cc.Vec2(variationX, gapY + (gapY) * Math.floor(i / 2))
            );
        }
    }

    private loadSounds(text: string) {
        Util.loadNumericSound(
            text, (data) => {
                this._sound = data;
                this.node.emit(SOUND_LOADED_EVENT);
            }
        );
    }

    @catchError()
    private subScribeToTracingEvents() {
        this.node.on(TRACING_FINISHED, (event) => {
            event.stopPropagation();
            this.tracingFinished();
        });

        this.node.on(TRACING_CORRECT, (event) => {
            event.stopPropagation();
            this.node.emit('correct');
        });

        this.node.on(TRACING_WRONG, (event) => {
            event.stopPropagation();
            this.node.emit('wrong');
        });

        this.node.on(RESET_TRACING, (event) => {
            event.stopPropagation();
            const letterNode: cc.Node =
                this._layout.node.getChildByName(this._originalLetterName + (this._currentLetterIndex));
            const singleLetterTracing: SingleLetterTracing = letterNode.getComponent(SingleLetterTracing);
            singleLetterTracing.reset();
        });

        this.node.on(RESET_TRACING_ALLOWED, () => {
            if (this.node.getChildByName('reeetTracingButton') !== null)
                this.node.getChildByName('reeetTracingButton').active = true;
        })

        this.node.on(RESET_TRACING_NOT_ALLOWED, () => {
            if (this.node.getChildByName('reeetTracingButton') !== null)
                this.node.getChildByName('reeetTracingButton').active = false;

        })
    }

    @catchError()
    private emitLetterEnabledEvent(fNode: cc.Node, index: number) {
        fNode.emit('letterEnabledEvent', index, 1);
    }

    @catchError()
    protected tracingFinished() {
        this.pronounceAndTrigger();
    }

    @catchError()
    private individualLetterSound() {
        if (this._characters.length > 1) {
            const letterNode: cc.Node =
                this._layout.node.getChildByName(this._originalLetterName + (this._currentLetterIndex - 1));
            letterNode.getComponent(SingleLetterTracing).pronounce();
        }
    }

    @catchError()
    private pronounceAndTrigger() {
        this._currentLetterIndex++;
        this.individualLetterSound();

        if (this._currentLetterIndex === this._characters.length) {
            this.scheduleOnce(() => {
                this.friend.speak(this._sound)
                // try {
                //     if (!!this._sound)
                //         this._soundID = Util.play(this._sound, false);
                // } catch (e) {

                // }
                this.scheduleOnce(() => {
                    this._touchAllowedOnAnimLayout = true;
                }, 0.1);
            }, 1);
        } else {
            this.emitLetterEnabledEvent(
                this._layout.node.getChildByName(this._originalLetterName + this._currentLetterIndex),
                this._currentLetterIndex
            );
        }
    }

    private processConfiguration(data: any[] = []): WriteNumberConfig | null {
        const configurations: any[] = [].concat(...data);

        let [level, workSheet, problemNo, count] = configurations;
        this._characters = Array.from(count);
        return {
            level,
            workSheet,
            problemNo,
            count
        };
    }

    protected onDestroy(): void {
        cc.audioEngine.stopAllEffects();
    }

    moveToNext() {
        if (this._animationFinishIndex === Number(this._currentConfig.count)
            && this._speakCount === Number(this._currentConfig.count)) {
            this.node.emit('nextProblem');
        }
    }

    updateSpeakCount() {
        if (this._speakCount < Number(this._currentConfig.count)) {
            this._speakCount++;
        }
    }

    updateAnimationIndexCount() {
        if (this._animationFinishIndex < Number(this._currentConfig.count)) {
            this._animationFinishIndex++;
        }
        if (this._animationFinishIndex === Number(this._currentConfig.count)) {
            this.moveToNext();
        }
    }

    get speakCount() {
        return this._speakCount;
    }

    get touchAllowedOnAnimLayout() {
        return this._touchAllowedOnAnimLayout;
    }
}
