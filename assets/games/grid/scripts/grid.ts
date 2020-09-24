import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Config, { Direction } from "../../../common/scripts/lib/config";
import AnswerBlock from "./answerblock";
import WordBlock from "./wordblock";
import Vec2 = cc.Vec2;
import QuestionBlock from "./questionblock";
import { Util } from "../../../common/scripts/util";
import catchError from "../../../common/scripts/lib/error-handler";

export const GAME_SOUND = 'games/grid/sound/';

interface GridConfig {
    level: string;
    workSheet: string;
    problemNo: string;
    verticalProblem: string[];
    horizontalProblem: string[];
    aHorizontalProblem: string[];
}

interface GridElement {
    text: string;
    placeHolderPosition?: Vec2;
    placeHolderText?: string;
    questionRelatedText?: string;
    xPositions?: number[];
}

export interface RenderParams {
    wordMatrix: Grid
    parentNode?: cc.Node;
    content?: string;
    blockType?: BLOCK_TYPE;
    index?: number;
    totalBlocks?: number;
    position?: Vec2;
    xPositions?: number[];
    combinedQAndA?: string;
}

export const V_GAP: number = 18;
export const H_GAP: number = 20;
export const H_MARGIN: number = 50;
export const V_MARGIN: number = 30;
export const MATRIX_CONTAINER_SCALE: number = 0.85;
export const SCALE: number = 1.0;
export const HALF: number = 0.5;
export const FONT_SIZE = '65';
export const PLACEHOLDER_PAIR = '-PAIR';

export const enum BLOCK_TYPE {
    H_QUESTION,
    V_QUESTION,
    ANSWER,
    PLACEHOLDER
}

export const enum TouchEvents {
    TOUCH_START = "touchstart",
    TOUCH_END = "touchend",
    TOUCH_MOVE = "touchmove",
    TOUCH_CANCEL = "touchCancel"
}

@ccclass
export class Grid extends cc.Component {
  @property(cc.Prefab)
  groundPrefab: cc.Prefab = null;

  @property(cc.Prefab)
  questionBlockPrefab: cc.Prefab = null;

  @property(cc.Prefab)
  answerBlockPrefab: cc.Prefab = null;

  @property(cc.Prefab)
  wordBlockPrefab: cc.Prefab = null;

  @property({
    type: cc.AudioClip,
  })
  gameLoadAudio: cc.AudioClip = null;

  private currentConfig: GridConfig = null;
  private _ground: cc.Node;
  private matrixContainer: cc.Node;

  public static _maxNodeWidth: number = 0;
  public static _maxNodeHeight: number = 0;

  private static _horizontalPositions: number[] = [];
  private static _verticalPositions: number[] = [];
  private _remainingAnswers: GridElement[] = [];
  private _matchedCounterInCurrentRun = 0;

  private _helpDragNode: cc.Node = null;
  private _helpDropNode: cc.Node = null;
  _isRTL: boolean = false;

  @catchError()
  protected onLoad(): void {
    cc.log("asdasdasdasdasdasdasdadsasdasdasd")
    Grid._horizontalPositions = [];
    Grid._verticalPositions = [];
    this.currentConfig = this.processConfiguration(
      Config.getInstance().data[0]
    );
    this._isRTL = Config.i.direction == Direction.RTL;
    Util.playSfx(this.gameLoadAudio);
    if (this.currentConfig !== null) {
      this.matrixContainer = this.node;
      if (this._isRTL) {
        this.matrixContainer.scaleX *= -MATRIX_CONTAINER_SCALE;
        this.matrixContainer.scaleY *= MATRIX_CONTAINER_SCALE;
      } else {
        this.matrixContainer.scale *= MATRIX_CONTAINER_SCALE;
      }
      this.currentConfig.horizontalProblem = this.currentConfig.horizontalProblem;
      this.currentConfig.verticalProblem = this.shuffle(
        this.currentConfig.verticalProblem
      );
      this.buildGround();
      this.renderWordMatrix(
        this.mapToWordMatrixElements(this.currentConfig.horizontalProblem),
        this.questionBlockPrefab,
        BLOCK_TYPE.H_QUESTION
      );
      this.renderWordMatrix(
        this.mapToWordMatrixElements(this.currentConfig.verticalProblem),
        this.questionBlockPrefab,
        BLOCK_TYPE.V_QUESTION
      );
      this.buildAnswersAndPlaceHolders(
        this.currentConfig.horizontalProblem,
        this.currentConfig.verticalProblem,
        this.currentConfig.aHorizontalProblem
      );

      this.scheduleOnce(() => {
        Util.showHelp(this._helpDragNode, this._helpDropNode);
      }, 0.5);
    }
  }

  @catchError()
  private mapToWordMatrixElements(strs: string[]): GridElement[] {
    return strs.map((s) => {
      return {
        text: s,
      } as GridElement;
    });
  }

  private processConfiguration(data: any[] = []): GridConfig | null {
    const configurations: any[] = [].concat(...data);

    let [
      level,
      workSheet,
      problemNo,
      verticalProblemStr,
      horizontalProblemStr,
      aHorizontalProblemStr,
    ] = configurations;
    let ahorizontalProblemStr = !aHorizontalProblemStr
      ? horizontalProblemStr
      : aHorizontalProblemStr;
    return {
      level,
      workSheet,
      problemNo,
      verticalProblem: this.shuffle(verticalProblemStr.split(",")),
      horizontalProblem: horizontalProblemStr.split(","),
      aHorizontalProblem: ahorizontalProblemStr.split(","),
    };
  }

  private getRandom(min, max): number {
    return Math.random() * (max - min) + min;
  }

  @catchError()
  private buildGround(): void {
    const horizontalWordsCount = this.currentConfig.horizontalProblem.length;
    const verticalWordsCount = this.currentConfig.verticalProblem.length;

    const lh: string = this.currentConfig.horizontalProblem.reduce(function (
      a,
      b
    ) {
      return a.length > b.length ? a : b;
    });

    const lv: string = this.currentConfig.verticalProblem.reduce(function (
      a,
      b
    ) {
      return a.length > b.length ? a : b;
    });

    const tNode: cc.Node = cc.instantiate(this.questionBlockPrefab);
    let questionBlockComponent = tNode.getComponent(QuestionBlock);
    const fontColor = "#654321";
    const labelNode: cc.Node = questionBlockComponent.createLabelNode(
      questionBlockComponent.textFont,
      lh + lv + lv + lv,
      FONT_SIZE,
      fontColor
    );
    if (this._isRTL) {
      labelNode.scaleX = -SCALE;
      labelNode.scaleY = SCALE;
    } else {
      labelNode.scale = SCALE;
    }
    Grid._maxNodeWidth = labelNode.getBoundingBox().width + 1.3 * H_MARGIN;
    Grid._maxNodeHeight = labelNode.getBoundingBox().height + V_MARGIN;
    this._ground = cc.instantiate(this.groundPrefab);
    let groundWidth: number =
      5 * V_MARGIN +
      Grid._maxNodeWidth +
      horizontalWordsCount * Grid._maxNodeWidth;
    let groundHeight: number =
      8 * V_MARGIN +
      Grid._maxNodeHeight +
      verticalWordsCount * Grid._maxNodeHeight;
    this.ground.setContentSize(new cc.Size(groundWidth, groundHeight));

    this.matrixContainer.addChild(this.ground);
  }

  @catchError()
  private renderWordMatrix(
    choices: GridElement[],
    prefab: cc.Prefab,
    blockType: BLOCK_TYPE
  ) {
    const length: number = choices.length;
    choices.forEach((choice: GridElement, index: number) => {
      const ch: GridElement = JSON.parse(JSON.stringify(choice));
      const node: cc.Node = cc.instantiate(prefab);
      switch (blockType) {
        case BLOCK_TYPE.H_QUESTION:
        case BLOCK_TYPE.V_QUESTION:
          let questionBlockComponent = node.getComponent(QuestionBlock);
          const renderParams: RenderParams = {
            wordMatrix: this,
            parentNode: this.ground,
            content: ch.text,
            blockType: blockType,
            index: index,
            totalBlocks: length,
          };
          questionBlockComponent.render(renderParams);
          break;

        case BLOCK_TYPE.ANSWER:
          let answerBlockComponent = node.getComponent(AnswerBlock);
          const renderParamsAnswer: RenderParams = {
            wordMatrix: this,
            parentNode: this.matrixContainer,
            content: ch.text,
            combinedQAndA: ch.questionRelatedText,
            blockType: blockType,
            index,
            totalBlocks: length,
            xPositions: ch.xPositions,
          };
          answerBlockComponent.renderAnswerHolder(renderParamsAnswer);
          if (index === 0) this._helpDragNode = node;
          break;

        case BLOCK_TYPE.PLACEHOLDER:
          let component: WordBlock = node.getComponent(WordBlock);
          const renderParamsPlaceHolder: RenderParams = {
            wordMatrix: this,
            parentNode: this.ground,
            content: ch.placeHolderText,
            blockType: blockType,
            index,
            totalBlocks: length,
            position: ch.placeHolderPosition,
          };
          component.render(renderParamsPlaceHolder);
          if (index === 0) this._helpDropNode = node;
          break;
      }
    });
  }

  private flattenDeep<T>(arr) {
    return arr.reduce(
      (acc, val) =>
        Array.isArray(val)
          ? acc.concat(this.flattenDeep(val))
          : acc.concat(val),
      []
    );
  }

  @catchError()
  private buildAnswersAndPlaceHolders(
    horizontalConfigs: string[],
    verticalConfigs: string[],
    aHorizontalConfigs: string[]
  ): void {
    this._remainingAnswers = this.computeAnswers(
      horizontalConfigs,
      verticalConfigs,
      aHorizontalConfigs
    );
    this.renderWordMatrix(
      this._remainingAnswers,
      this.wordBlockPrefab,
      BLOCK_TYPE.PLACEHOLDER
    );
    this.renderWordMatrix(
      this.slices(this._remainingAnswers, horizontalConfigs.length),
      this.answerBlockPrefab,
      BLOCK_TYPE.ANSWER
    );
  }

  @catchError()
  private computeAnswers(
    horizontalConfigs: string[],
    verticalConfigs: string[],
    aHorizontalConfigs: string[]
  ): GridElement[] {
    console.log("horizontalConfigs", horizontalConfigs);
    console.log("aHorizontalConfigs", aHorizontalConfigs);
    const wordMatrixElements: GridElement[] = this.flattenDeep<string[]>(
      verticalConfigs.map((vText: string, y: number) =>
        horizontalConfigs.map((hText: string, x: number) => {
          return {
            text: vText + aHorizontalConfigs[x],
            placeHolderPosition: new Vec2(
              Grid._horizontalPositions[x],
              Grid._verticalPositions[y]
            ),
            placeHolderText: vText + aHorizontalConfigs[x] + PLACEHOLDER_PAIR,
            questionRelatedText: vText + "-" + hText,
            xPositions: Array.from(new Set(Grid._horizontalPositions)),
          } as GridElement;
        })
      )
    );
    return this.shuffle(wordMatrixElements);
  }

  @catchError()
  private slices(answers: GridElement[], sliceLength: number): GridElement[] {
    this._matchedCounterInCurrentRun = 0;
    return answers.slice(0, sliceLength);
  }

  private shuffle<T>(arr): T[] {
    let ctr = arr.length;
    let temp;
    let index;
    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = arr[ctr];
      arr[ctr] = arr[index];
      arr[index] = temp;
    }
    return arr;
  }

  public static addToHorizontalPositions(x: number): void {
    Grid._horizontalPositions.push(x);
  }

  public static addToVerticalPositions(y: number): void {
    Grid._verticalPositions.push(y);
  }

  public get ground(): cc.Node {
    return this._ground;
  }

  @catchError()
  public wordMatched(word: string): void {
    this._matchedCounterInCurrentRun++;
    this._remainingAnswers = this._remainingAnswers.filter(
      (a: GridElement) => a.text !== word
    );
    if (this._remainingAnswers.length <= 0) {
      this.node.emit("nextProblem");
    } else {
      if (
        this._matchedCounterInCurrentRun ===
        this.currentConfig.horizontalProblem.length
      ) {
        this.renderWordMatrix(
          this.slices(
            this._remainingAnswers,
            this.currentConfig.horizontalProblem.length
          ),
          this.answerBlockPrefab,
          BLOCK_TYPE.ANSWER
        );
      }
    }
  }

  @catchError()
  public playGameSound(nameOfSound) {
    Util.loadGameSound(nameOfSound, function (clip) {
      if (clip != null) {
        const audioId = Util.play(clip, false);
        if (audioId != -1) {
          cc.audioEngine.setFinishCallback(audioId, () => {});
        }
      }
    });
  }
}
