import catchError from "../../../common/scripts/lib/error-handler";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Right extends cc.Component {
    lastIndex: number = -1;
    storyText: string = null;
    words: Map<string, cc.AudioClip> = null;

    @catchError()
    Handler(event, param) {
        const params = param.split("_");
        const word = params[0];
        const index = params[1];
        this.speakAndHighLight(word, index, '#000000', '#ff0000');
    }

    @catchError()
    speakAndHighLight(word: string, index: number, color1, color2) {
        cc.log('storyText', this.storyText, 'word to highlight', word);
        this.highlight(word, index, color1, color2);
        // const wordClip = word.replace(/[\.,]/g,'');
        const soundClip = this.words.get(word);
        try {
            if (!!soundClip) {
                let soundId = cc.audioEngine.playEffect(soundClip, false);
                cc.audioEngine.setFinishCallback(soundId, () => {
                    this.noHighlight(word, index, '#ff0000', '#000000');
                });
            } else {
                this.noHighlight(word, index, '#ff0000', '#000000');
            }
        } catch (e) {

        }
    }

    @catchError()
    public highlight(word, index: number, color1, color2, shouldCheckIndex: boolean = false) {
        let replaceString = `color="${color1}" param="${word}_${index}"`;
        let replaceWithString = `color="${color2}" param="${word}_${index}"`;
        if (shouldCheckIndex) {
            if (this.lastIndex > -1) {
                this.node.getComponent(cc.RichText).string =
                    this.storyText.slice(0, this.lastIndex) + this.storyText.slice(this.lastIndex).replace(replaceString, replaceWithString);
            } else {
                this.node.getComponent(cc.RichText).string = this.storyText.replace(
                    replaceString, replaceWithString
                );
            }
            cc.log('this.storyText after highlight', this.node.getComponent(cc.RichText).string);
            this.lastIndex = this.storyText.indexOf(word) > this.lastIndex ? this.storyText.indexOf(word) : this.lastIndex;
        } else {
            this.node.getComponent(cc.RichText).string = this.storyText.replace(
                replaceString, replaceWithString
            );
        }
    }

    @catchError()
    public noHighlight(word, index: number, color1, color2) {
        let replaceString = `color="${color1}" param="${word}_${index}"`;
        let replaceWithString = `color="${color2}" param="${word}_${index}"`;
        this.node.getComponent(cc.RichText).string = this.storyText.replace(
            replaceString, replaceWithString
        );
        cc.log('this.storyText after no highlight', this.node.getComponent(cc.RichText).string);
    }
}
