import Card from "./card";
import Config from '../../../common/scripts/lib/config';
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";

const { ccclass, property } = cc._decorator;

const border: number = 80;

@ccclass
export default class LetterPair extends cc.Component {

    @property(cc.Prefab)
    cardPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    progressMonitorPrefab: cc.Prefab = null;

    totalPieces: number = 0;
    isInteracting: boolean = false;

    @catchError()
    onLoad() {
        const data = Config.getInstance().data
        const numCards = data.length * 2;
        const allValues = Array(data.length);
        for (let i = 0; i < numCards; i++) {
            const place = Math.floor(Math.random() * numCards);
            let j = place;
            while (allValues[j] != null) {
                j = (j + 1) % numCards;
            }
            allValues[j] = i;
        }
        const boxWidth = (cc.winSize.width - border) / numCards * 2;
        const boxHeight = (cc.winSize.height - border * 2) / 2;
        let prefix = 0;
        data.forEach(row => {
            const card1 = cc.instantiate(this.cardPrefab);
            card1.name = prefix + '1';
            const cardComp1 = card1.getComponent(Card);
            cardComp1.cardType = row[3];
            cardComp1.cardContent = row[4];
            cardComp1.cardFontSize = row[5];
            cardComp1.cardFontColor = row[6];
            cardComp1.cardBgType = row[7];
            cardComp1.cardBgColor = row[8];
            cardComp1.audio = row[15];
            card1.position = new cc.Vec2(
                (boxWidth * (allValues[prefix] % (numCards / 2)) + Math.random() * (boxWidth - border)) - cc.winSize.width / 2 + border,
                (boxHeight * (Math.floor(allValues[prefix] / numCards * 2)) + Math.random() * (boxHeight - border)) - cc.winSize.height / 2 + border);
            const card2 = cc.instantiate(this.cardPrefab);
            card2.name = prefix + '2';
            prefix++;
            const cardComp2 = card2.getComponent(Card);
            cardComp2.cardType = row[9];
            cardComp2.cardContent = row[10];
            cardComp2.cardFontSize = row[11];
            cardComp2.cardFontColor = row[12];
            cardComp2.cardBgType = row[13];
            cardComp2.cardBgColor = row[14];
            cardComp2.audio = row[15];
            card2.position = new cc.Vec2(
                (boxWidth * (allValues[prefix] % (numCards / 2)) + Math.random() * (boxWidth - border)) - cc.winSize.width / 2 + border,
                (boxHeight * (Math.floor(allValues[prefix] / numCards * 2)) + Math.random() * (boxHeight - border)) - cc.winSize.height / 2 + border);

            this.node.getChildByName('CardContainer').addChild(card1);
            this.node.getChildByName('CardContainer').addChild(card2);
            prefix++;
            this.totalPieces++;
            if(prefix == 2) {
                Util.showHelp(card1, card2)
            }
        });
        Card.letDrag = true
    }


    drop(isMatch: boolean) {
        this.isInteracting = false;
        if (isMatch) {
            if (--this.totalPieces <= 0) {
                this.node.emit('nextProblem');
            }
        }
    }

    drag(): boolean {
        if (!this.isInteracting) {
            this.isInteracting = true;
            return true;
        }
        return false;
    }
}
