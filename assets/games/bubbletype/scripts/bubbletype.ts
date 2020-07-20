const { ccclass, property } = cc._decorator;
import catchError from '../../../common/scripts/lib/error-handler';
import Config, { Direction } from '../../../common/scripts/lib/config';
import { Util } from '../../../common/scripts/util';

export const GAME_SOUND = 'games/starfall/sound/';

export interface CountingConfig {
    level: string,
    worksheet: string,
    problemCount: string,
    wordRegenTime: string,
    words: string,
    numberofConsonantChoices: string,
    numberofVowelChoices: string,
    image: string,
    soundDuration: string,
    one: string,
    two: string,
    numberpads: string[]
}


@ccclass
export default class BubbleType extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Prefab)
    bubblePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    buttonPrefab: cc.Prefab = null;

    @property(cc.Node)
    friendPos: cc.Node = null;

    fallingTime: number = 30;//18

    @property
    inputBoxString: string = '';

    @property({
        type: cc.AudioClip
    })
    correctAudio: cc.AudioClip = null;

    @property({
        type: cc.AudioClip
    })
    popAudio: cc.AudioClip = null;

    @property({
        type: cc.AudioClip
    })
    wrongAudio: cc.AudioClip = null;

    alphabets: string;
    words: string[] = []

    wordsOnScreen: string[] = ["", "", ""]
    score: number = 0;
    maxScore: number = 0;
    isScenePoped: boolean = false;
    isFirstPageKeys: boolean = true;
    bubbledestroyBoundry: number = 520
    protected _sound: any = null;
    protected _soundID: number;
    friend: dragonBones.ArmatureDisplay = null;


    // LIFE-CYCLE CALLBACKS:
    @catchError()
    onLoad() {
        this.alphabets = JSON.stringify(this.processConfiguration(Config.getInstance().data[0]).numberpads[0]).replace(new RegExp(/"/g), "");
        const element = Config.getInstance().data[0]
        let stringData = element[5] + ""
        this.words = stringData.split(" ")
        this.maxScore = parseInt(element[3])
        this.startGame();
        this.node.getChildByName("score").getComponent(cc.Label).string = this.score + "/" + this.maxScore
        this.createDog();
    }
    @catchError()
    startGame() {

        if (Config.i.direction == Direction.RTL) {
            this.node.getChildByName("score").position = new cc.Vec2(-415, 107);
            this.bubbledestroyBoundry = -520
        }
        //current letter or words spawning on screen
        for (var i = 0; i < 3; i++) {
            const card2 = cc.instantiate(this.bubblePrefab);
            var randomNum = (250 * Math.random()) + 100
            let fallingAction = cc.moveTo(this.fallingTime * ((i / 3) + 1), this.bubbledestroyBoundry, randomNum)
            card2.position = new cc.Vec2(-500 + (-500 * (i / 3)), randomNum);
            if (Config.i.direction == Direction.RTL) {
                fallingAction = cc.moveTo(this.fallingTime * ((i / 3) + 1), this.bubbledestroyBoundry, randomNum)
                card2.position = new cc.Vec2(500 + (500 * (i / 3)), randomNum);
            }
            card2.name = (i + 1).toString()
            let currentWordIndex = Math.floor(Math.random() * (this.words.length - 0)) + 0
            card2.getChildByName("Label").getComponent(cc.Label).string = this.words[currentWordIndex]
            console.log(this.words[currentWordIndex].length);
            if (this.words[currentWordIndex].length > 3)
                card2.getChildByName('bubble').scaleX = 1.5
            this.wordsOnScreen[i] = this.words[currentWordIndex]

            this.node.getChildByName("bubblesFolder").addChild(card2)
            card2.runAction(cc.sequence([fallingAction, cc.callFunc(this.bubbleAnimationCallback, this, card2.name)]))

        }
        //// keyboard logic was here
        let formattedData = this.dataConvert(this.words);
        let padding = 20;
        let buttonSize = 100 + padding;
        // let width = 1200;
        // let total_letters_in_row = 10;
        // let startX = width / total_letters_in_row;
        let alphabetArray = this.alphabets.split(" ")
        let layoutToAdd = 1;
        for (let i = 0; i < alphabetArray.length; i++) {
            if (alphabetArray[i] === "$") {
                layoutToAdd++;
                continue;
            }
            let y = 0
            let x = -530 + i * buttonSize
            if (i > 9 && i < 20) {
                y = -194 + 90
                x = -530 + (i - 10) * buttonSize
            }
            if (i > 19) {
                if (alphabetArray.length < 29)
                    x = -350 + (i - 20) * buttonSize
                else
                    x = -530 + (i - 20) * buttonSize
                y = -298 + 90
            }
            if (i > 29) {
                if (alphabetArray.length < 39)
                    x = -340 + (i - 30) * buttonSize
                else
                    x = -530 + (i - 30) * buttonSize
                y = -406 + 90
            }

            let tempButton = cc.instantiate(this.buttonPrefab);
            tempButton.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = alphabetArray[i]//this.alphabets.substr(i, 1)
            tempButton.name = alphabetArray[i]//this.alphabets.substr(i, 1)
            tempButton.on('click', this.callback, this)
            if (formattedData.indexOf(tempButton.name) === -1) {
                tempButton.getComponent(cc.Button).interactable = false
            }
            else {
                tempButton.getComponent(cc.Button).interactable = true
            }
            this.node.getChildByName("mainLayout").getChildByName("layout" + layoutToAdd).addChild(tempButton);
            if (tempButton.name == this.wordsOnScreen[0]) {
                Util.showHelp(tempButton, tempButton)
            }
        }
        ////////// in this block

        //// keyboard letters toggle button
        // this.node.getChildByName("togglePrefab").on('click', this.toggleKeyboard, this);
    }
    @catchError()
    createDog() {
        Util.loadFriend((friendNode: cc.Node) => {
            this.friend = friendNode.getComponent(dragonBones.ArmatureDisplay);
            this.friendPos.addChild(friendNode);
            this.friendPos.setPosition(new cc.Vec2(-510, 75));
            this.friendPos.scaleX = 0.4;
            this.friendPos.scaleY = 0.4;
            if (Config.i.direction == Direction.RTL) {
                this.friendPos.setPosition(new cc.Vec2(510, 75));
                this.friendPos.scaleX = -0.4;
            }
            if (this.friend != null)
                this.friend.playAnimation('blowing', 1);
        });
    }
    @catchError()
    toggleKeyboard(event) {
        if (this.isFirstPageKeys) {
            this.isFirstPageKeys = false
            cc.log("its first");
            // clear other buttons first 
            this.node.getChildByName("keyboardNode").removeAllChildren();
            // add new keyboard buttons
            let formattedData = this.dataConvert(this.words);
            let padding = 20;
            let buttonSize = 100 + padding;
            // let width = 1200;
            // let total_letters_in_row = 10;
            // let startX = width / total_letters_in_row;
            // for (var i = 0; i < this.alphabets.length; i++) {
            let alphabetArray = this.alphabets.split(" ")
            for (let i = 30; i < alphabetArray.length; i++) {

                let y = -90
                let x = -530 + (i - 30) * buttonSize
                if (i - 30 > (9) && i - 30 < (20)) {
                    y = -210
                    x = -530 + (i - 10 - 30) * buttonSize
                }
                if (i - 30 > (19)) {
                    if (this.alphabets.length < (29 - 30))
                        x = -350 + (i - 20 - 30) * buttonSize
                    else
                        x = -530 + (i - 20 - 30) * buttonSize
                    y = -330
                }

                let tempButton = cc.instantiate(this.buttonPrefab);
                tempButton.position = cc.v2(x, y)
                tempButton.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = alphabetArray[0]//this.alphabets.substr(i, 1)
                tempButton.name = alphabetArray[0]//this.alphabets.substr(i, 1)
                tempButton.on('click', this.callback, this)
                if (formattedData.indexOf(tempButton.name) === -1) {
                    tempButton.getComponent(cc.Button).interactable = false
                }
                else {
                    tempButton.getComponent(cc.Button).interactable = true
                }
                this.node.getChildByName("keyboardNode").addChild(tempButton)
            }
        }
        else {
            // clear other buttons first 
            this.node.getChildByName("keyboardNode").removeAllChildren();
            // add new keyboard buttons
            this.isFirstPageKeys = true
            cc.log("its second");
            let formattedData = this.dataConvert(this.words);
            let padding = 20;
            let buttonSize = 100 + padding;
            // let width = 1200;
            // let total_letters_in_row = 10;
            // let startX = width / total_letters_in_row;
            let alphabetArray = this.alphabets.split(" ")
            for (let i = 0; i < alphabetArray.length; i++) {
                let y = -90
                let x = -530 + i * buttonSize
                if (i > 9 && i < 20) {
                    y = -210
                    x = -530 + (i - 10) * buttonSize
                }
                if (i > 19) {
                    if (this.alphabets.length < 29)
                        x = -350 + (i - 20) * buttonSize
                    else
                        x = -530 + (i - 20) * buttonSize
                    y = -330
                }
                let tempButton = cc.instantiate(this.buttonPrefab);
                tempButton.position = cc.v2(x, y)
                tempButton.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = alphabetArray[i]//this.alphabets.substr(i, 1)
                tempButton.name = alphabetArray[i]//this.alphabets.substr(i, 1)
                tempButton.on('click', this.callback, this)
                if (formattedData.indexOf(tempButton.name) === -1) {
                    tempButton.getComponent(cc.Button).interactable = false
                }
                else {
                    tempButton.getComponent(cc.Button).interactable = true
                }
                this.node.getChildByName("keyboardNode").addChild(tempButton)
            }
        }
    }
    @catchError()
    callback(event) {
        this.inputBoxString = this.inputBoxString.concat(event.node.name)
        for (let i = 0; i < 3; i++) {
            if (this.wordsOnScreen[i] === this.inputBoxString) {
                this.score += 1

                // concat and win 
                if (this.node != null) {
                    this.node.getChildByName("score").getComponent(cc.Label).string = this.score + "/" + this.maxScore
                    this.node.getChildByName("richText").getComponent(cc.RichText).string = this.inputBoxString
                    setTimeout(() => {
                        this.inputBoxString = ""
                        if (this.node != null)
                            this.node.getChildByName("richText").getComponent(cc.RichText).string = this.inputBoxString
                    }, 500)
                }
                // pop that bubble or respawn
                var randomNum = (250 * Math.random()) + 100
                // play bubble pop animation on this x nd y axis 
                let popBubbleName = (i + 1).toString()

                Util.speakLettersOrWords(this.inputBoxString, () => {
                    if (this.score >= this.maxScore && !this.isScenePoped) {
                        // Config.getInstance().nextProblem();

                        this.node.emit('nextProblem');
                        this.isScenePoped = true;
                    }
                    this.node.emit('correct');
                });

                if (this.node != null) {
                    // disapear normal bubble and play anim
                    this.node.getChildByName("bubble_pop_node").position = this.node.getChildByName("bubblesFolder").getChildByName(popBubbleName).position
                    this.node.getChildByName("bubble_pop_node").getComponent(cc.Animation).play()
                    this.node.getChildByName("bubblesFolder").getChildByName(popBubbleName).position = new cc.Vec2(-700 + (Math.random() * 100), randomNum);
                    if (Config.i.direction == Direction.RTL)
                        this.node.getChildByName("bubblesFolder").getChildByName(popBubbleName).position = new cc.Vec2(700 + (Math.random() * 100), randomNum);
                    this.node.getChildByName("bubblesFolder").getChildByName(popBubbleName).stopAllActions()
                    let fallingAction = cc.moveTo(this.fallingTime, this.bubbledestroyBoundry, randomNum)
                    let currentWordIndex = Math.floor(Math.random() * (this.words.length - 0)) + 0
                    this.wordsOnScreen[parseInt(popBubbleName) - 1] = this.words[currentWordIndex]
                    this.node.getChildByName("bubblesFolder").getChildByName(popBubbleName).getChildByName("Label").getComponent(cc.Label).string = this.words[currentWordIndex]
                    this.node.getChildByName("bubblesFolder").getChildByName(popBubbleName).runAction(cc.sequence([fallingAction, cc.callFunc(this.bubbleAnimationCallback, this, popBubbleName)]))
                }
                return;
            }
        }
        for (let i = 0; i < 3; i++) {
            if (this.wordsOnScreen[i].startsWith(this.inputBoxString)) {
                // concat and win 
                if (this.node != null)
                    this.node.getChildByName("richText").getComponent(cc.RichText).string = this.inputBoxString
                // right alphabet letters sound
                // Util.play(this.correctAudio, false);
                // this.node.emit('correct');
                // cc.log(" on my way ::");
                return;
            }
        }

        // wrong alphabet type sound
        // Util.play(this.wrongAudio, false);
        this.node.emit('wrong')
        // clear input field
        if (this.node != null) {
            setTimeout(() => {
                this.inputBoxString = ""
                if (this.node != null)
                    this.node.getChildByName("richText").getComponent(cc.RichText).string = this.inputBoxString
            }, 100)
            this.node.getChildByName("richText").getComponent(cc.RichText).string = this.inputBoxString
        }
    }
    @catchError()
    dataConvert(arr) {
        // individual letters are there
        let fullLetterArray = []
        for (let j = 0; j < this.words.length; j++) {
            for (let i = 0; i < this.words[j].length; i++) {
                fullLetterArray.push(this.words[j].charAt(i))
            }
        }
        for (let i = 0; i < this.alphabets.length; i++) {
            if (fullLetterArray.indexOf(this.alphabets.substr(i, 1)) != -1) {
                console.log(this.alphabets.substr(i, 1), "<<")
            }
        }
        return fullLetterArray;
    }
    @catchError()
    bubbleAnimationCallback(obj) {
        console.log("Her is log of console");
        if (this.node != null) {
            var randomNum = (250 * Math.random()) + 100
            // play bubble pop animation on this x nd y axis 
            // this.node.getChildByName("bubble_pop_node").position = this.node.getChildByName("bubblesFolder").getChildByName(obj.name).position
            // this.node.getChildByName("bubble_pop_node").getComponent(cc.Animation).play()
            // disapear normal bubble and play anim
            this.node.getChildByName("bubblesFolder").getChildByName(obj.name).position = new cc.Vec2(this.node.getChildByName("bubblesFolder").getChildByName(obj.name).x - 1100, randomNum);
            if (Config.i.direction == Direction.RTL)
                this.node.getChildByName("bubblesFolder").getChildByName(obj.name).position = new cc.Vec2(this.node.getChildByName("bubblesFolder").getChildByName(obj.name).x + 1100, randomNum);
            let fallingAction = cc.moveTo(this.fallingTime, this.bubbledestroyBoundry, randomNum)
            let currentWordIndex = Math.floor(Math.random() * (this.words.length - 0)) + 0
            this.wordsOnScreen[parseInt(obj.name) - 1] = this.words[currentWordIndex]
            this.node.getChildByName("bubblesFolder").getChildByName(obj.name).getChildByName("Label").getComponent(cc.Label).string = this.words[currentWordIndex]
            this.node.getChildByName("bubblesFolder").getChildByName(obj.name).runAction(cc.sequence([fallingAction, cc.callFunc(this.bubbleAnimationCallback, this, obj.name)]))
        }
    }
    @catchError()
    private processConfiguration(data: any[] = []): CountingConfig | null {
        const configurations: any[] = [].concat(...data);
        let [level,
            worksheet,
            problemCount,
            wordRegenTime,
            words,
            numberofConsonantChoices,
            numberofVowelChoices,
            image,
            soundDuration,
            one,
            two,
            numberpads] = configurations;
        numberpads = numberpads.split(',');
        return {
            level,
            worksheet,
            problemCount,
            wordRegenTime,
            words,
            numberofConsonantChoices,
            numberofVowelChoices,
            image,
            soundDuration,
            one,
            two,
            numberpads
        };
    }
    // update(dt) { }
}
