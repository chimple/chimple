import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Layout = cc.Layout;
import Config from "../../../common/scripts/lib/config";
import {Util} from "../../../common/scripts/util";
import {LETTER_SCALE, SingleNumberTracing} from "./singlenumbertracing";
import {CONFIG_LOADED, TRACING_FINISHED, TRACING_CORRECT, TRACING_WRONG} from "../../../common/scripts/helper";
import Game from "../../../common/scripts/game";

export const TRACE_HEIGHT = 768;
const BAT_SIZE_X = 176;
const BAT_SIZE_Y = 30;
const BALL_SIZE = 20;
const LIMIT = 25;
const SPACE = 10;

interface WriteSetConfig {
    level: string;
    workSheet: string;
    problemNo: string;
    count: string;
}

@ccclass
export class WriteSet extends Game {

    @property(cc.Prefab)
    wordsPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    animsPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    singleLetterPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    b1: cc.Prefab = null;

    @property(cc.Prefab)
    b2: cc.Prefab = null;

    private _currentConfig: WriteSetConfig = null;
    private _numericTracingContainer: cc.Node = null;
    private _characters: string[];
    private _originalLetterName: string;
    private _layout: cc.Layout;
    private _animLayout: cc.Layout;
    private _words: cc.Node = null;
    private _anims: cc.Node = null;
    private _currentLetterIndex: number = 0;
    private _shelf: cc.Node = null;

    private _touchAllowedOnAnimLayout: boolean = false;
    private _speakCount: number;

    protected onLoad(): void {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;
        const writeBg: cc.Node = this.node.getChildByName('writeset_bg');
        if (!!writeBg) {
            this._shelf = writeBg.getChildByName('writeset_shelf_main');
        }

        this._currentConfig = this.processConfiguration(Config.getInstance().data[0]);
        if (this._currentConfig !== null) {
            this._words = cc.instantiate(this.wordsPrefab);
            this.node.addChild(this._words);
            this._anims = cc.instantiate(this.animsPrefab);
            this.node.addChild(this._anims);
            this._numericTracingContainer = this.node;
            this._numericTracingContainer.scale *= 1;
            this._speakCount = 0;
            this.buildNumbersWithGrid();
            this.subScribeToTracingEvents();
            this.node.emit(CONFIG_LOADED);
            let equations: string[] = Number(this._currentConfig.count) <= 100 ? [this._currentConfig.count] : [
                String(Number(this._currentConfig.count) - (Number(this._currentConfig.count) % 10)),
                String(Number(this._currentConfig.count) % 10)
            ];

            if(Number(this._currentConfig.count) <= LIMIT)
            {
                this.friend.node.setPosition(
                    this.friend.node.position.x,
                    this.friend.node.position.y - 600
                )
            }

            Util.showHelp(null, null, () => {
                this.friend.speakEquation(equations, (index) => {
                    // @ts-ignore
                    this.emitLetterEnabledEvent(
                        this._layout.node.getChildByName(this._originalLetterName + '0'), 0
                    );
                });
            })
        }
    }

    private createSprite(parent: cc.Node, count: number, index: number) {
        const sprite = count > LIMIT ? cc.instantiate(this.b2) : cc.instantiate(this.b1);
        sprite.scale = 0.75;
        parent.addChild(sprite);
    }

    private buildLayout() {
        this._layout = this._words.getComponent(cc.Layout);
        this._layout.node.zIndex = 2;
        // this._layout.padding = 20;
        this._layout.spacingX = 125;
        this._layout.spacingY = 0;
        this._layout.resizeMode = Layout.ResizeMode.CONTAINER;
        this._words.scale = LETTER_SCALE;
        this._characters.forEach(
            (c, i) => {
                const singleLetter: cc.Node = cc.instantiate(this.singleLetterPrefab);
                singleLetter.height = TRACE_HEIGHT;
                singleLetter.scale = 1.25;
                this._originalLetterName = singleLetter.name;
                singleLetter.name = this._originalLetterName + i;
                const singleLetterComponent = singleLetter.getComponent(SingleNumberTracing);
                singleLetterComponent.tracingScale = 0.75;
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

    private buildGrid() {
        this._animLayout = this._anims.getComponent(cc.Layout);
        this._animLayout.node.zIndex = 1;
        this._animLayout.node.setPosition(new cc.Vec2(cc.winSize.width / 2, 0));
        this._animLayout.resizeMode = Layout.ResizeMode.CHILDREN;
        this.adjustLayout(Number(this._currentConfig.count));
        this._animLayout.updateLayout();
    }

    private adjustLayout(howMany) {
        if (howMany <= LIMIT) {
            this._animLayout.spacingX = 0;
            this._animLayout.cellSize = new cc.Size(BAT_SIZE_X, BAT_SIZE_Y);
            let totalWidth = Math.floor(howMany / (SPACE / 2)) * BAT_SIZE_X +
                Math.floor(howMany / (SPACE / 2)) * SPACE + 1 * BAT_SIZE_X;
            this._anims.width = totalWidth;
            this._anims.height = BAT_SIZE_Y * SPACE / 2 + SPACE;
            this.generateSprites(howMany);
        } else {
            this._animLayout.cellSize = new cc.Size(BALL_SIZE, BALL_SIZE);
            this._animLayout.spacingX = SPACE;
            let totalWidth = Math.floor(howMany / SPACE) * BALL_SIZE +
                Math.floor(howMany / SPACE) * SPACE + 1 * BALL_SIZE;
            this._anims.width = totalWidth;
            this._anims.height = BALL_SIZE * SPACE + SPACE;
            this.generateSprites(howMany);
        }
    }

    private buildNumbersWithGrid() {
        this.buildGrid();
        this.buildLayout();
        this._words.width = cc.winSize.width;
        this._words.height = cc.winSize.height / 2;
        if (!!this._shelf && Number(this._currentConfig.count) <= LIMIT) {
            this._shelf.width = this._shelf.width < this._layout.node.width ?
                (this._layout.node.width) :this._shelf.width;
        }
        this._words.setPosition(new cc.Vec2(50, 25));
        this._anims.setPosition(new cc.Vec2(0, 250));

    }

    private generateSprites(count: number) {
        for (let i = 0; i < count; i++) {
            this.createSprite(
                this._animLayout.node, count,
                (i + 1)
            );
        }
    }

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
    }

    private emitLetterEnabledEvent(fNode: cc.Node, index: number) {
        fNode.emit('letterEnabledEvent', index, 1);
    }

    protected tracingFinished() {
        this.pronounceAndTrigger();
    }

    private individualLetterSound() {
        if (this._characters.length > 1) {
            const letterNode: cc.Node =
                this._layout.node.getChildByName(this._originalLetterName + (this._currentLetterIndex - 1));
            letterNode.getComponent(SingleNumberTracing).pronounce();
        }
    }

    private pronounceAndTrigger() {
        this._currentLetterIndex++;
        this.individualLetterSound();

        if (this._currentLetterIndex === this._characters.length) {
            this.scheduleOnce(
                () => {
                    this.node.emit('nextProblem');
                }, 1
            );

        } else {
            this.emitLetterEnabledEvent(
                this._layout.node.getChildByName(this._originalLetterName + this._currentLetterIndex),
                this._currentLetterIndex
            );
        }
    }

    private processConfiguration(data: any[] = []): WriteSetConfig | null {
        const configurations: any[] = [].concat(...data);

        let [level, workSheet, problemNo, count] = configurations;
        this._characters = Array.from(count);
        return {
            level,
            workSheet,
            problemNo,
            count
        };

        return null;
    }

    protected onDestroy(): void {
        cc.audioEngine.stopAllEffects();
    }

    updateSpeakCount() {
        this._speakCount++;
    }

    get speakCount() {
        return this._speakCount;
    }

    get touchAllowedOnAnimLayout() {
        return this._touchAllowedOnAnimLayout;
    }
}
