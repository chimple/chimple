import CountingLayout from "../../../common/scripts/countingLayout";
import Drag from "../../../common/scripts/drag";
import Game from "../../../common/scripts/game";
import Config from "../../../common/scripts/lib/config";
import { Util } from "../../../common/scripts/util";
import MultLayout from "../scripts/multLayout";

const { ccclass, property } = cc._decorator;

const numAddTextures: number = 9
const numSubTextures: number = 3

class FoodJarProblem {
    operator: string;

    first: number;
    second: number;
    answer: number;
    choices: Array<number>;

    toStringArray(): Array<string> {
        return [
            this.first.toString(),
            this.operator,
            this.second.toString(),
            '=',
            this.answer.toString()
        ]
    }
}

enum BoxType {
    Empty,
    Label,
    LabelInCard,
    Objects,
    ObjectsInCard
}

enum LayoutType {
    NumbersOnTop,
    Mixed,
    ObjectsOnTop,
    Multiplication
}

@ccclass
export default class FoodJar extends Game {

    @property(cc.Node)
    firstLayout: cc.Node = null;

    @property(cc.Node)
    secondLayout: cc.Node = null;

    @property(cc.Node)
    choiceLayout: cc.Node = null;

    @property(cc.Prefab)
    equationChoice: cc.Prefab = null;

    @property(cc.Prefab)
    countingLayout: cc.Prefab = null;

    @property(cc.Prefab)
    equationDrop: cc.Prefab = null;

    @property(cc.Prefab)
    equationLabel: cc.Prefab = null;

    @property(cc.Prefab)
    multDrop: cc.Prefab = null;

    @property(cc.Prefab)
    multChoice: cc.Prefab = null;

    @property(cc.SpriteFrame)
    addTexture1: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    addTexture2: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    addTexture3: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    addTexture4: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    addTexture5: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    addTexture6: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    addTexture7: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    addTexture8: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    addTexture9: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    subFullTexture1: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    subEmptyTexture1: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    subFullTexture2: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    subEmptyTexture2: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    subFullTexture3: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    subEmptyTexture3: cc.SpriteFrame = null

    choiceNodes: Array<cc.Node> = [];

    problem: FoodJarProblem = new FoodJarProblem();
    notSolved: number = 0;
    layoutType: LayoutType = null;
    jars: Array<cc.Node> = []
    // textureIndex: number = 0
    firstDrag: cc.Node = null
    firstDrop: cc.Node = null

    // @catchError()
    onLoad() {
        Drag.letDrag = false
        cc.director.getCollisionManager().enabled = true
        const row = Config.getInstance().data[0];
        const [level, worksheet, problem, type, mathSign, minNumber, maxNumber, repeat, line1BlankCount, panelCount] = row;

        const operator = mathSign == 'R' ? (Math.random() < 0.5 ? '+' : '-') : mathSign;
        if (type == 'A') {
            if (parseInt(line1BlankCount) > 0) {
                this.layoutType = LayoutType.Mixed;
            } else {
                this.layoutType = LayoutType.NumbersOnTop;
            }
        } else if (type == 'B') {
            this.layoutType = LayoutType.ObjectsOnTop;
        } else {
            this.layoutType = LayoutType.Multiplication;
        }
        if (this.layoutType == LayoutType.Multiplication) {
            this.layoutLong(parseInt(minNumber), parseInt(repeat));
        } else {
            this.createProblem(parseInt(minNumber), parseInt(maxNumber), operator, parseInt(panelCount));
            this.layoutScreen(type, parseInt(line1BlankCount));
            this.choiceNodes.forEach(element => {
                this.choiceLayout.addChild(element);
            });
        }
        if (this.choiceLayout.children.length > 5) {
            this.choiceLayout.getComponent(cc.Layout).spacingX = 10
        }
        Drag.letDrag = true
        Util.showHelp(this.firstDrag, this.firstDrop)
    }

    checkIfDone() {
        this.node.emit('correct');
        if (--this.notSolved <= 0) {
            Drag.letDrag = false
            this.scheduleOnce(() => {
                if (this.layoutType == LayoutType.Multiplication) {
                    this.choiceLayout.removeAllChildren();
                    this.choiceLayout.addChild(this.createLabel(this.problem.first.toString()));
                    this.choiceLayout.addChild(this.createLabel(this.problem.operator));
                    this.choiceLayout.addChild(this.createLabel(this.problem.second.toString()));
                    this.choiceLayout.addChild(this.createLabel('='));
                    this.choiceLayout.addChild(this.createLabel(this.problem.answer.toString()));
                }
                this.scaleForSpeaking(-1);
                this.friend.speakEquation(this.problem.toStringArray(), this.scaleForSpeaking.bind(this));
            }, 2);
        }
    }

    indicateWrongMove() {
        this.node.emit('wrong');
    }

    scaleForSpeaking(index: number) {
        var layout: cc.Node = this.secondLayout;
        if (this.layoutType == LayoutType.NumbersOnTop) {
            layout = this.firstLayout;
        } else if (this.layoutType == LayoutType.Multiplication) {
            layout = this.choiceLayout;
        }
        if (index >= 0) {
            layout.children[index].scale = 1;
        }
        if (index + 1 < layout.children.length) {
            layout.children[index + 1].scale = 1.2;
        } else {
            if(this.friend != null) this.friend.playAnimation('jumping', 1)
            new cc.Tween().target(this.friendPos)
                .to(1, { x: 0 }, null)
                .call(() => {
                    if(this.friend != null) this.friend.playAnimation('eating', 1)
                    this.jars.forEach((jar) => {
                        const cl = jar.getComponent(CountingLayout)
                        if (cl != null) {
                            if(this.friend != null) cl.feed(this.friend.node)
                        } else {
                            const ml = jar.getComponent(MultLayout)
                            if (ml != null) {
                                if(this.friend != null) ml.feed(this.friend.node)
                            }
                        }
                    })
                    this.firstLayout.parent.removeAllChildren()
                })
                .delay(3)
                .call(() => {
                    this.node.emit('nextProblem');
                })
                .start()
        }
    }

    createEmpty(name: string, boxType: BoxType): cc.Node {
        this.notSolved++;
        const drop = cc.instantiate(this.equationDrop);
        drop.name = boxType == BoxType.Label ? 'L' + name : 'O' + name;
        if(this.firstDrop == null) {
            this.firstDrop = drop
        }
        return drop;
    }

    createLabel(name: string, shrink: boolean = false): cc.Node {
        const labelNode = cc.instantiate(this.equationLabel);
        const child = labelNode.getChildByName('New Label');
        const label = child.getComponent(cc.Label);
        label.string = name;
        if (shrink) {
            label.fontSize = 60
            labelNode.width = child.width
        }
        return labelNode;
    }

    createLabelInCard(name: string): cc.Node {
        return this.createCard('L' + name, this.createLabel(name));
    }

    createObjects(count: number, textureIndex: number = 0, emptyCount: number = -1): cc.Node {
        const clNode = cc.instantiate(this.countingLayout);
        const cl = clNode.getComponent(CountingLayout);
        this.jars.push(clNode)
        cl.fullCount = count;
        if (textureIndex == 0) {
            textureIndex = Math.ceil(Math.random() * numAddTextures)
        }
        if (emptyCount == -1) {
            cl.fullTexture = this['addTexture' + textureIndex]
        } else {
            cl.emptyCount = emptyCount
            cl.fullTexture = this['subFullTexture' + textureIndex]
            cl.emptyTexture = this['subEmptyTexture' + textureIndex]
        }
        return clNode;
    }

    createObjectsInCard(count: number): cc.Node {
        return this.createCard('O' + count.toString(), this.createObjects(count));
    }

    createCard(name: string, child: cc.Node): cc.Node {
        const ec = cc.instantiate(this.equationChoice);
        ec.on('equationMatch', () => { this.checkIfDone() });
        ec.on('equationNoMatch', () => { this.indicateWrongMove() });
        ec.name = name;
        ec.addChild(child);
        if(this.firstDrop!=null && this.firstDrop.name == name && this.firstDrag == null) {
            this.firstDrag = ec
        }
        const tempNode = new cc.Node();
        tempNode.addChild(ec);
        tempNode.height = ec.height;
        tempNode.width = ec.width;
        return tempNode;
    }

    createLongCard(count: number, draggable: boolean = true): cc.Node {
        const lc = cc.instantiate(this.multChoice);
        this.jars.push(lc)
        if (!draggable) {
            const drag = lc.getComponent(Drag)
            drag.allowDrag = false
        } else {
            lc.on('equationMatch', () => { this.checkIfDone() });
            lc.on('equationNoMatch', () => { this.indicateWrongMove() });
            if(this.firstDrop!=null && this.firstDrop.name == count.toString() && this.firstDrag == null) {
                this.firstDrag = lc
            }    
        }
        lc.name = count.toString();
        const ml = lc.getComponent(MultLayout);
        ml.count = count;
        const tempNode = new cc.Node();
        tempNode.addChild(lc);
        tempNode.height = lc.height;
        tempNode.width = lc.width;
        return tempNode;
    }

    createLongEmpty(name: string): cc.Node {
        this.notSolved++;
        const md = cc.instantiate(this.multDrop);
        md.name = name;
        if(this.firstDrop == null) {
            this.firstDrop = md
        }
        return md;
    }

    createProblem(minNumber: number, maxNumber: number, operator: string, numChoices: number) {
        this.problem.operator = operator;
        this.problem.choices = [];

        if (operator == '-') {
            maxNumber = maxNumber - 1;
        }
        this.problem.answer = Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
        if (operator == '+') {
            this.problem.answer = Math.floor(Math.random() * (maxNumber - minNumber - 1)) + minNumber + 1;
            this.problem.first = Math.floor(Math.random() * (this.problem.answer - 1 - minNumber)) + minNumber;
            this.problem.second = this.problem.answer - this.problem.first;
        } else if (operator == '-') {
            this.problem.answer = Math.floor(Math.random() * (maxNumber - 1 - minNumber)) + minNumber;
            this.problem.first = Math.floor(Math.random() * (maxNumber - this.problem.answer + 1)) + this.problem.answer + 1;
            this.problem.second = this.problem.first - this.problem.answer;
        }
        this.problem.choices.push(this.problem.first, this.problem.second, this.problem.answer);
        const choiceOptions: Array<number> = [];
        for (let index = minNumber; index <= maxNumber; index++) {
            if (index != this.problem.answer && index != this.problem.first && index != this.problem.second) {
                choiceOptions.push(index);
            }
        }
        while (this.problem.choices.length <= numChoices && choiceOptions.length > 0) {
            const randIndex = Math.floor(Math.random() * choiceOptions.length);
            this.problem.choices.push(choiceOptions[randIndex]);
            choiceOptions.splice(randIndex, 1);
        }
    }

    layoutScreen(type: string, blankCount: number) {
        const numbersOnTop: boolean = (this.layoutType == LayoutType.NumbersOnTop);
        if (this.layoutType == LayoutType.NumbersOnTop || this.layoutType == LayoutType.Mixed) {
            this.addColumn(this.problem.first, numbersOnTop, Math.random() > 0.5);
            this.firstLayout.addChild(this.createLabel(this.problem.operator));
            this.secondLayout.addChild(this.createLabel(this.problem.operator));
            this.addColumn(this.problem.second, numbersOnTop, Math.random() > 0.5);
            this.firstLayout.addChild(this.createLabel('='));
            this.secondLayout.addChild(this.createLabel('='));
            this.addColumn(this.problem.answer, numbersOnTop, Math.random() > 0.5);

            for (let index = 3; index < this.problem.choices.length; index++) {
                if (numbersOnTop) {
                    this.addToChoicesRandomly(this.createObjectsInCard(this.problem.choices[index]));
                } else {
                    if (Math.random() > 0.5) {
                        this.addToChoicesRandomly(this.createObjectsInCard(this.problem.choices[index]));
                    } else {
                        this.addToChoicesRandomly(this.createLabelInCard(this.problem.choices[index].toString()));
                    }
                }
            }
        } else if (this.layoutType == LayoutType.ObjectsOnTop) {
            if (this.problem.operator == '+') {
                this.addSumObjects(this.firstLayout, this.problem.first)
                this.addSumObjects(this.firstLayout, this.problem.second)
            } else {
                const textureIndex = Math.ceil(Math.random() * numSubTextures)
                if (this.problem.first > 10) {
                    this.firstLayout.addChild(this.createObjects(10, textureIndex, Math.max(0, 10 - this.problem.answer)));
                    const secondNum = this.problem.first - 10
                    this.firstLayout.addChild(this.createObjects(secondNum, textureIndex, Math.min(secondNum, this.problem.second)));
                } else {
                    this.firstLayout.addChild(this.createObjects(this.problem.first, textureIndex, this.problem.second));
                }
            }
            this.secondLayout.addChild(this.createEmpty(this.problem.first.toString(), BoxType.Label));
            this.secondLayout.addChild(this.createEmpty(this.problem.operator, BoxType.Label));
            this.secondLayout.addChild(this.createEmpty(this.problem.second.toString(), BoxType.Label));
            this.secondLayout.addChild(this.createEmpty('=', BoxType.Label));
            this.secondLayout.addChild(this.createEmpty(this.problem.answer.toString(), BoxType.Label));

            this.addToChoicesRandomly(this.createLabelInCard(this.problem.first.toString()));
            this.addToChoicesRandomly(this.createLabelInCard(this.problem.operator.toString()));
            this.addToChoicesRandomly(this.createLabelInCard(this.problem.second.toString()));
            this.addToChoicesRandomly(this.createLabelInCard('='));
            this.addToChoicesRandomly(this.createLabelInCard(this.problem.answer.toString()));
        }
    }

    addSumObjects(layout: cc.Node, num: number) {
        if (num > 10) {
            const textureIndex = Math.ceil(Math.random() * numSubTextures)
            layout.addChild(this.createObjects(10, textureIndex, 0))
            layout.addChild(this.createObjects(num - 10, textureIndex, 0))
        } else {
            layout.addChild(this.createObjects(num))
        }
    }

    layoutLong(num: number, count: number) {
        this.problem.first = num;
        this.problem.second = count;
        this.problem.operator = 'x';
        this.problem.answer = num * count;
        this.node.getChildByName('New Layout').removeChild(this.secondLayout)
        this.firstLayout.height = 324
        this.choiceLayout.height = 324
        for (let index = 1; index <= count; index++) {
            this.firstLayout.addChild(this.createLongEmpty(num.toString()));
            if (index == count) {
                this.firstLayout.addChild(this.createLabel('=', true));
            } else {
                this.firstLayout.addChild(this.createLabel('+', true));
            }
            this.choiceLayout.addChild(this.createLongCard(num));
        }
        this.firstLayout.addChild(this.createLongCard(num * count, false));
    }

    addColumn(num: number, topRowNum: boolean, secondRowEmpty: boolean) {
        if (topRowNum) {
            this.firstLayout.addChild(this.createLabel(num.toString()));
            this.secondLayout.addChild(this.createEmpty(num.toString(), BoxType.Objects));
            this.addToChoicesRandomly(this.createObjectsInCard(num));
        } else {
            if (secondRowEmpty) {
                this.firstLayout.addChild(this.createObjects(num));
                this.secondLayout.addChild(this.createEmpty(num.toString(), BoxType.Label));
                this.addToChoicesRandomly(this.createLabelInCard(num.toString()));
            } else {
                this.firstLayout.addChild(this.createEmpty(num.toString(), BoxType.Objects));
                this.secondLayout.addChild(this.createLabel(num.toString()));
                this.addToChoicesRandomly(this.createObjectsInCard(num));
            }
        }
    }

    addToChoicesRandomly(node: cc.Node) {
        this.choiceNodes.splice(Math.floor(Math.random() * this.choiceNodes.length), 0, node);
    }

}
