import ccclass = cc._decorator.ccclass;
import Color = cc.Color;
import { Util } from "../../../common/scripts/util";
import { WriteCard } from "./writecard";
import { CONFIG_LOADED, DEFAULT_FONT_COLOR } from "../../../common/scripts/helper";
import LessonController from "../../../common/scripts/lessonController";

@ccclass
export class LetterTracingBackCard extends cc.Component {
    _WriteCard: WriteCard;
    _optionIndex: number;
    _sound: any = null;
    _soundID: number;
    _image: cc.Node;
    _optionText: string;
    _textNode: cc.Node = null;

    protected onLoad(): void {
        this._WriteCard = this.node.parent.getComponent(WriteCard);
        const imageFace: cc.Node = this.node.getChildByName('imageFace');
        if (imageFace != null) {
            this._image = imageFace.getChildByName('image');
        }

        this._textNode = this.node.getChildByName('textNode');

        this.node.parent.on(CONFIG_LOADED, () => {
            this._optionText = this._WriteCard.currentConfig.options[this.optionIndex];
            const imageText = this._WriteCard.currentConfig.images[this.optionIndex];
            const sound = this._WriteCard.currentConfig.sounds[this.optionIndex];
            const label: cc.Label = this._textNode.getComponent(cc.Label);
            label.string = this._optionText;
            this._textNode.color = DEFAULT_FONT_COLOR;
            this.loadImage(imageText);
            this.loadSounds(sound);
        });
    }

    loadImage(imageName: string) {
        if (!!imageName) {
            Util.loadTexture(imageName, (texture) => {
                if (!!texture) {
                    const sprite = this._image.getComponent(cc.Sprite);
                    sprite.spriteFrame = new cc.SpriteFrame(texture);
                    Util.resizeSprite(sprite, 400, 333)
                }
            });
        }
    }

    protected loadSounds(text: string) {
        Util.loadGameSound(
            text.toLowerCase(), (clip) => {
                this._sound = clip;
                this.node.emit('soundLoaded');
            }
        )
    }

    get optionIndex() {
        return this._optionIndex;
    }

    set optionIndex(index) {
        this._optionIndex = index;
    }

    animateText() {
        new cc.Tween().target(this._textNode)
            .to(0.1, {color: Color.RED}, {progress: null, easing: 'sineOut'})
            .to(0.15, {scale: 1.25}, {progress: null, easing: 'sineOut'})
            .to(0.15, {scale: 1.0}, {progress: null, easing: 'sineOut'})
            .to(0.1, {color: DEFAULT_FONT_COLOR}, {progress: null, easing: 'sineOut'})
            .start();
    }

    pronounce() {
        LessonController.getFriend().speak(this._sound)
        // if (!!this._sound)
        //     this._soundID = Util.play(this._sound, false);
    }

    protected onDestroy(): void {
        cc.audioEngine.stopAllEffects();
    }
}
