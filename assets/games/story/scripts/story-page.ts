import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Config from "../../../common/scripts/lib/config";
import Right from "./right";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";
import { SOUND_LOADED_EVENT } from "../../../common/scripts/helper";

interface StoryConfig {
    pageNo: string;
    text: string;
    image: string;
    layout: string;
    storySoundFile: string[];
}

export const PORTRAIT = 'P';
export const LANDSCAPE = 'L';

@ccclass
export class StoryPage extends cc.Component {

    @property(cc.Prefab)
    landscape: cc.Prefab = null;

    @property(cc.Prefab)
    portrait: cc.Prefab = null;

    @property(cc.Prefab)
    word: cc.Prefab = null;

    @property(cc.Prefab)
    lleft: cc.Prefab = null;

    @property(cc.Prefab)
    lright: cc.Prefab = null;

    @property(cc.Prefab)
    pleft: cc.Prefab = null;

    @property(cc.Prefab)
    pright: cc.Prefab = null;

    @property(cc.Prefab)
    nextButton: cc.Prefab = null;

    @property(cc.Prefab)
    prevButton: cc.Prefab = null;

    private _inOrderWords: string[] = [];
    private _words: Map<string, cc.AudioClip> = new Map<string, cc.AudioClip>();
    private _storyConfig: StoryConfig;
    private _storyContent: cc.Node = null;
    private _isSideBySide: boolean = true;
    private _rightComponent: Right = null;
    private _storyDir: string = null;
    private _soundDir: string = null;
    private _ableToSpeakAnyIndividualClip: number = -1;

    private _imageNode: cc.Node = null;
    private _textNode: cc.Node = null;

    @catchError()
    protected onLoad(): void {
        const config = Config.getInstance();
        this._storyConfig = this.processConfiguration(config.data[0]);
        this._storyDir = Config.dir + `${config.lessonId}/res/`;
        this._soundDir = Config.dir + `${config.lessonId}/res/${this._storyConfig.pageNo}/`;
        this._isSideBySide = this._storyConfig.layout === LANDSCAPE ? true : false;
        if (this._isSideBySide) {
            this._storyContent = cc.instantiate(this.landscape);
        } else {
            this._storyContent = cc.instantiate(this.portrait);
        }

        this.node.on(SOUND_LOADED_EVENT, () => {
            this.showText();
        });

        this.initLayout();
        this.renderNextPrevButtons();
    }

    @catchError()
    private renderText() {
        let textNode: cc.Node = null;
        const config = Config.getInstance();
        if (this._storyConfig.text) {
            textNode = this._storyConfig.layout === LANDSCAPE ? cc.instantiate(this.lright) :
                cc.instantiate(this.pright);
            const texts = this._storyConfig.text.split(' ');
            this._rightComponent = textNode.getComponent(Right);
            texts.forEach(
                (t, index) => {
                    t = t.toString().replace(/"/g, "");
                    this._inOrderWords.push(t);
                    // const soundT = t.replace(/[\.!,\?]/g,'');
                    try {
                        Util.loadGameSound(this._soundDir + index + ".m4a", (clip) => {
                            this._words.set(t, clip);
                            if (index === texts.length - 1) {
                                this.node.emit(SOUND_LOADED_EVENT);
                            }
                        });
                    } catch (e) {

                    }
                }
            );
        }

        return textNode;
    }

    @catchError()
    private renderImage() {
        let imageNode: cc.Node = null;
        if (this._storyConfig.image) {
            imageNode = this._storyConfig.layout === LANDSCAPE ? cc.instantiate(this.lleft) :
                cc.instantiate(this.pleft);

            const picWidth = imageNode.width;
            const picHeight = imageNode.height;

            Util.loadTexture(this._storyDir + this._storyConfig.image, (texture) => {
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

    @catchError()
    private isTitlePage() {
        return this._storyConfig.pageNo === "1";
    }

    @catchError()
    private isLastPage() {
        const config = Config.getInstance();
        return Number(this._storyConfig.pageNo) === config.totalProblems;
    }

    @catchError()
    private renderNextPrevButtons() {
        const config = Config.getInstance();
        let next: cc.Node = null;
        let prev: cc.Node = null;
        if (this.isTitlePage()) {
            next = cc.instantiate(this.nextButton);
            next.active = false;
        } else if (this.isLastPage()) {
            prev = cc.instantiate(this.prevButton);
            next = cc.instantiate(this.nextButton);
            next.active = false;
            prev.active = false;
        } else {
            next = cc.instantiate(this.nextButton);
            prev = cc.instantiate(this.prevButton);
            next.active = false;
            prev.active = false;
        }

        if (next) {
            this.node.addChild(next);
            this.scheduleOnce(
                () => {
                    next.active = true;
                }, 0.5
            );
        }
        if (prev) {
            this.node.addChild(prev);
            this.scheduleOnce(
                () => {
                    prev.active = true;
                }, 0.5
            );
        }
    }

    @catchError()
    changePage(direction: number) {
        cc.audioEngine.stopAll();
        cc.log('direction', direction);
        direction > 0 ?
            this.node.parent.emit('nextProblem') : this.node.parent.emit('nextProblem');

    }

    @catchError()
    private initLayout() {
        this._isSideBySide = this._storyConfig.layout === LANDSCAPE ? true : false;
        if (this._isSideBySide) {
            this._storyContent = cc.instantiate(this.landscape);
        } else {
            this._storyContent = cc.instantiate(this.portrait);
        }

        const sheet = this.node.getChildByName('sheet');
        if(sheet)
            sheet.addChild(this._storyContent);
        else
            this.node.addChild(this._storyContent);

        this._imageNode = this.renderImage();
        this._textNode = this.renderText();
        if (this.isTitlePage()) {
            this._storyContent.addChild(this._textNode);
            this._storyContent.addChild(this._imageNode);
        } else {
            this._storyContent.addChild(this._imageNode);
            this._storyContent.addChild(this._textNode);
        }

    }

    @catchError()
    showText() {
        if (this._textNode) {
            const tokenized = this.createTextToken(this._storyConfig.text);
            this._textNode.getComponent(cc.RichText).string = tokenized;
            this._rightComponent.storyText = JSON.parse(JSON.stringify(tokenized));
            this._rightComponent.words = this._words;
            this.scheduleOnce(
                () => {
                    const iterator = this.displayIterator(this._inOrderWords, 0, this._inOrderWords.length)[Symbol.iterator]();
                    this.speakWordOneByOne(iterator);
                }, 1
            );
        }
    }

    * gen() {
        yield* this._inOrderWords;
    }

    private displayIterator = (array: string[], from, to = Infinity, step = 1) => ({
        [Symbol.iterator]: function () {
            let done = false;
            let value = 0;
            return {
                next() {
                    value = from;
                    done = from >= to;
                    from = !done ? from + step : value;
                    return {done: done, value: array[value], index: value};
                }
            };
        }
    });

    @catchError()
    speakWordOneByOne(iterator) {
        let next = iterator.next();
        if (!!next && !next.done && !!next.value) {
            const word = next.value;
            if (this._words) {
                let clip: cc.AudioClip = this._words.get(word);
                this.speak(word, next.index, clip, () => {
                    if (this._rightComponent) {
                        this._rightComponent.noHighlight(word, next.index, '#ff0000', '#000000');
                    }
                    this.speakWordOneByOne(iterator);
                });
            }
        } else {
            this.speakFullSentenceWithoutHighlight();
        }
    }

    @catchError()
    speakFullSentenceWithoutHighlight() {
        let sounds = [];
        if (this._ableToSpeakAnyIndividualClip === -1) {
            sounds = this._storyConfig.storySoundFile.map(
                sf => {
                    let storySoundFile = this._storyDir + sf;
                    return storySoundFile;
                }
            );
            Util.speakOneByOne(sounds, 0, (index) => {
            });
        }
    }

    @catchError()
    speak(word: string, index: number, clip: cc.AudioClip, callback: Function) {
        if (clip !== null) {
            const audioId = cc.audioEngine.playEffect(clip, false);
            if (audioId !== -1) {
                if (this._rightComponent) {
                    this._rightComponent.highlight(word, index, '#000000', '#ff0000', true);
                }
                this._ableToSpeakAnyIndividualClip = 1;
                cc.audioEngine.setFinishCallback(audioId, callback);
            } else {
                this.errorInSpeakClip(callback);
            }
        } else {
            this.errorInSpeakClip(callback);
        }
    }

    @catchError()
    errorInSpeakClip(callback: Function) {
        if (this._ableToSpeakAnyIndividualClip !== 1) {
            this._ableToSpeakAnyIndividualClip = -1;
        }
        this.scheduleOnce(
            () => {
                callback();
            }, 0.25
        );
    }

    @catchError()
    private createTextToken(text: string) {
        text.replace;
        let token = text.split(/\s+/)
            .map((t, i) => {
                t = t.toString().replace(/"/g, "");
                return `<color="#000000" param="${t}_${i}" click="Handler">${t}</color>`;
            })
            .join(' ');
        return token;
    }

    private processConfiguration(data: any[] = []): StoryConfig {
        const configurations: any[] = [].concat(...data);
        let [name, level, description, pageNo, type, text, image, layout, storySound] = configurations;
        let storySoundFile = storySound.split(',');
        return {
            pageNo,
            text,
            image,
            layout,
            storySoundFile
        };
    }

    protected onDestroy(): void {
        cc.audioEngine.stopAll();
    }
}
