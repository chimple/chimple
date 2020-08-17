import JumpSentence from "./jumpsentence";
import EmptyBox from "./emptyBox";
import { Util } from "../../../common/scripts/util";
import { catchError } from "../../../common/scripts/lib/error-handler";

const { ccclass, property } = cc._decorator;
const BOX_W = 90;
const BOX_H = 100;
const KEYBOARD_Y = -200;
const KEYBOARD_PADDING = 10;

@ccclass
export default class BridgeBuilder extends cc.Component {

  @property(cc.Layout)
  layout: cc.Layout = null;

  @property(cc.Prefab)
  filledPrefab: cc.Prefab = null;

  @property(cc.Prefab)
  boxPrefab: cc.Prefab = null;

  @property(cc.Prefab)
  capsulePrefab: cc.Prefab = null;

  @property(cc.Prefab)
  emptyBoxPrefab: cc.Prefab = null;

  @property(cc.Prefab)
  emptyCapsulePrefab: cc.Prefab = null;

  answerIndices: Set<number> = new Set<number>();
  multiLineStartIndex: number;
  sentence: string = "";
  boxWidth: number = 0;
  positions: Array<string> = [];
  nodeUuid: Array<string> = [];
  firstDrag: cc.Node = null;
  firstDrop: cc.Node = null;
  firstDragData: string = "";
  isCharacterSet: boolean = false;
  count: number = 0;

  @catchError()
  public Build(problem: string) {
    this.resetMembers();
    //@ts-ignore
    var splitter = new GraphemeSplitter();
    this.positions = splitter.splitGraphemes(problem);
    let shouldShow = true;
    for (let i = 0; i < this.positions.length; i++) {
      let char = this.positions[i];
      if (char == "[") {
        shouldShow = false;
        continue;
      }
      else if (char == "]") {
        shouldShow = true;
        continue;
      }
      else if (char == "@") {
        continue;
      }
      if (!shouldShow) {
        this.answerIndices.add(i);
        this.count++;
      }
    }
    if (!this.isCharacterSet) {
      this.isCharacterSet = true;
      this.node
        .getComponent(JumpSentence)
        .SetCharacters(this.answerIndices.size);
    }
    this.buildBridge();
  }

  @catchError()
  resetMembers() {
    this.answerIndices.clear();
    this.multiLineStartIndex = 0;
    this.sentence = "";
    this.boxWidth = 0;
    this.positions = null;
    this.firstDrag = null;
    this.firstDrop = null;
    this.firstDragData = "";
  }

  @catchError()
  buildBridge() {
    this.layout.node.width = cc.winSize.width - 200;
    let boxWords = "";
    for (let i = 0; i < this.positions.length; i++) {
      let char = this.positions[i];
      if (char == "[" || char == "]" || char == "@") {
        continue;
      }
      if (this.answerIndices.has(i)) {
        if (this.isSpecialCharacter(char)) {
          let capsule = cc.instantiate(this.emptyCapsulePrefab);
          this.layout.node.insertChild(capsule, i);
          capsule.getComponent(EmptyBox).myCharacter = char;
          capsule.getComponent(EmptyBox).characterIndex = i;
          this.nodeUuid.push(capsule.uuid)
          this.initializeFirstDrop(capsule, i)
        } else {
          let box = cc.instantiate(this.emptyBoxPrefab);
          this.layout.node.insertChild(box, i);
          box.getComponent(EmptyBox).myCharacter = char;
          box.getComponent(EmptyBox).characterIndex = i;
          this.nodeUuid.push(box.uuid);
          this.initializeFirstDrop(box, i)
        }
      } else if (
        (
          i + 1 == this.positions.length ||
          this.positions[i + 1] == "[" ||
          this.positions[i + 1] == "@")
      ) {
        boxWords += char;
        this.boxWidth += 30;
        let filledBox = cc.instantiate(this.filledPrefab);
        this.layout.node.insertChild(filledBox, i);
        this.nodeUuid.push(filledBox.uuid);
        filledBox.getChildByName("Label").getComponent(cc.Label).string = boxWords;
        boxWords = "";
      } else {
        boxWords += char;
        this.boxWidth += 30;
      }
    }
  }

  @catchError()
  joinBridge(node: cc.Node, text: string) {
    cc.log("first ", node);
    let index = this.nodeUuid.indexOf(node.uuid);
    let leftNode;
    let rightNode;
    if (index == this.nodeUuid.length - 1) {
      rightNode = new cc.Node();
    }
    else {
      rightNode = this.layout.node.getChildByUuid(this.nodeUuid[index + 1]);
    }
    if (index == 0) {
      leftNode = new cc.Node();
    }
    else {
      leftNode = this.layout.node.getChildByUuid(this.nodeUuid[index - 1]);
    }
    cc.log(" count  ", this.count)
    if (--this.count < 5) {
      cc.log("reduce bridge manual")
      this.layout.node.width -= 120;
      this.layout.updateLayout()
    }

    if (leftNode.getChildByName("Label") && rightNode.getChildByName("Label")) {
      let newText = leftNode.getChildByName("Label").getComponent(cc.Label).string + text + rightNode.getChildByName("Label").getComponent(cc.Label).string
      let unit = this.bridgeUnit(newText);
      let sIndex = leftNode.getSiblingIndex();
      leftNode.removeFromParent(true);
      rightNode.removeFromParent(true);
      node.removeFromParent(true);
      this.layout.node.insertChild(unit, sIndex);
      this.nodeUuid.splice(index, 2);
      this.nodeUuid[index - 1] = unit.uuid;
    }
    else if (leftNode.getChildByName("Label") && !rightNode.getChildByName("Label")) {
      leftNode.getChildByName("Label").getComponent(cc.Label).string += text;
      node.removeFromParent(true);
      this.nodeUuid.splice(index, 1);
    }
    else if (!leftNode.getChildByName("Label") && rightNode.getChildByName("Label")) {
      cc.log("no left ");
      let rightNodeLabel = rightNode.getChildByName("Label").getComponent(cc.Label);
      rightNodeLabel.string = text + rightNodeLabel.string;
      node.removeFromParent(true);
      this.nodeUuid.splice(index, 1);
    }
    else {
      cc.log("Middle single cell ");
      let sIndex = node.getSiblingIndex();
      let unit = this.bridgeUnit(text);
      node.removeFromParent(true);
      this.layout.node.insertChild(unit, sIndex);
      this.nodeUuid[index] = unit.uuid;
    }
  }

  @catchError()
  bridgeUnit(text: string): cc.Node {
    let filledBox = cc.instantiate(this.filledPrefab);
    filledBox.getChildByName("Label").getComponent(cc.Label).string = text;
    filledBox.getComponent(cc.Layout).paddingLeft += 20;
    filledBox.getComponent(cc.Layout).paddingRight += 20;
    return filledBox;
  }

  @catchError()
  initializeFirstDrop(node: cc.Node, index: number) {
    if (this.firstDrop == null) {
      this.firstDrop = node;
      this.firstDragData = this.positions[index];
    }
  }

  @catchError()
  createChoiceBoxes() {
    let tempArr = [];
    this.answerIndices.forEach(e => {
      if (tempArr.indexOf(this.positions[e]) == -1) {
        tempArr.push(this.positions[e]);
      }
    });
    let shuffledList = [];
    shuffledList = Util.shuffle(tempArr);
    let totalLen =
      shuffledList.length * BOX_W +
      (shuffledList.length - 1) * KEYBOARD_PADDING;
    let moveLeft;
    if (totalLen < 1024) {
      moveLeft = totalLen / 2 - BOX_W / 2;
    } else {
      moveLeft = 512 - BOX_W / 2;
    }
    for (let i = 0, j = 0; i < shuffledList.length; i++) {
      let text = shuffledList[i];
      let box = this.isSpecialCharacter(text)
        ? cc.instantiate(this.capsulePrefab)
        : cc.instantiate(this.boxPrefab);
      if (text == this.firstDragData) {
        this.firstDrag = box;
      }
      box.getChildByName("Label").getComponent(cc.Label).string = text;
      box.parent = this.node;
      let currentPos = i * (BOX_W + KEYBOARD_PADDING);
      if (currentPos < 1024) {
        cc.log("left " + currentPos);
        box.position = cc.v2(currentPos - moveLeft, KEYBOARD_Y);
      } else {
        currentPos = j++ * (BOX_W + KEYBOARD_PADDING);
        box.position = cc.v2(
          currentPos - moveLeft,
          KEYBOARD_Y - BOX_H - KEYBOARD_PADDING
        );
      }
    }
    cc.log(this.firstDrop + " check " + this.firstDrag);
  }

  @catchError()
  private isSpecialCharacter(char: string): boolean {
    if (
      char == " " ||
      char == "!" ||
      char == "?" ||
      char == "," ||
      char == "."
    ) {
      return true;
    } else {
      return false;
    }
  }

  @catchError()
  start() {
    let padding = 5;
    let newLayoutW = 0;
    this.layout.node.children.forEach(e => {
      cc.log("check " + e.name + e.width);
      if (e.name == "Capsule Empty" || e.name == "Box Empty") {
        newLayoutW += e.width + padding;
      }
    });
    newLayoutW += this.boxWidth;
    if (newLayoutW < cc.winSize.width - 360) {
      this.firstDrop = null;
      this.layout.type = cc.Layout.Type.HORIZONTAL;
      this.layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
      this.layout.updateLayout();
      this.layout.node.children.forEach(e => {
        if (e.name == "Capsule Empty" || e.name == "Box Empty") {
          newLayoutW += e.width + padding;
          if (this.firstDrop == null) {
            cc.log("came inside ");
            this.firstDrop = e;
          }
        }
        cc.log("name " + e.name);
      });
    }
    if (this.firstDrag != null) {
      this.showHelp(this.firstDrag);
    }
  }

  @catchError()
  showHelp(dragNode: cc.Node) {
    this.scheduleOnce(() => {
      Util.showHelp(dragNode, this.firstDrop);
    }, 1);
  }
}
