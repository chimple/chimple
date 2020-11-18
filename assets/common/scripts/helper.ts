import { SingleLetterTracing } from "../Tracing/scripts/singlelettertracing";

export const GROUND_GROUP = "ground";
export const WALL_GROUP = "wall";
export const PLAYER_GROUP = "player";
export const REWARD_GROUP = "reward";
export const OBSTACLE_GROUP = "obstacle";
export const QUIZ_GROUP = "quizcollect";
export const FILLER_GROUP = "fillerwait";

export const COIN = "coin";
export const BANANA = "banana";
export const CROWN = "crown";
export const DIAMOND = "diamond";
export const DIAMOND_BOX = "diamondbox";

export const ALL_REWARDS = [COIN, BANANA, CROWN, DIAMOND, DIAMOND_BOX];
export const FONT_SIZE = '65';
export const LEVEL_FONT_SIZE = '40';
export const DEFAULT_FONT_COLOR = cc.Color.BLACK;

export const CONFIG_LOADED = 'configLoaded';
export const TRACING_FINISHED = 'tracingFinished';
export const SHOW_CHILD_IMAGE = 'showChildImage';
export const TRACING_CORRECT = 'tracingCorrect';
export const TRACING_WRONG = 'tracingWrong';
export const MOVE_TO_NEXT_LETTER_EVENT = 'moveToNextLetter';
export const RECORDING_FINISHED = 'recordingFinished';
export const BACK_FINISHED = 'backFinished';

export const MOVE_MATCH = 'MoveMatch';
export const MOVE_NOT_MATCH = 'MoveNotMatch';

export const GAME_START_EVENT = 'gameStart';
export const GAME_OVER_EVENT = 'gameOver';
export const PROBLEM_OVER_EVENT = 'problemOver';
export const CORRECT_EVENT = 'correct';
export const WRONG_EVENT = 'wrong';
export const SOUND_LOADED_EVENT = 'soundLoaded';

export const HELP_DIR = 'help/';
export const QUESTION_BOARD = 'questionboard';
export const QUIZ_MATHS_DIR = 'quizmaths';
export const NUMBER_VOICE = 'numbervoice/';
export const PHONIC_VOICE = 'course/res/sound/phonicvoice/';
export const LETTER_VOICE = 'course/res/sound/lettervoice/';
export const TUTORIAL_IMAGES = 'drawshape/res/image/';
export const AUTO_TOUCH_START = 'autoTouchStart';
export const BOTTOM_MIDDLE = new cc.Vec2(0, 0.5);
export const GO_TO_NEXT_PROBLEM = 'goToNextProblem';

export class Helper {
    public static subScribeToTracingEvents(node: cc.Node, container: cc.Node, tracingFinishedCallback: Function) {
        node.on(TRACING_FINISHED, (event) => {
            tracingFinishedCallback();
        });

        node.on(TRACING_CORRECT, (event) => {
            event.stopPropagation();
            container.emit('correct');
        });

        node.on(TRACING_WRONG, (event) => {
            event.stopPropagation();
            container.emit('wrong');
        });
    }

    public static buildLetters(node: cc.Node, words: cc.Node, characters: string[], singleLetterPrefab: cc.Prefab,
                               width: number, height: number) {
        const wordLayout = words.getComponent(cc.Layout);
        // wordLayout.padding = 50;
        wordLayout.spacingX = 50;
        words.scale = 0.75;
        characters.forEach(
            (c, i) => {
                const singleLetter: cc.Node = cc.instantiate(singleLetterPrefab);
                singleLetter.width = width;
                singleLetter.height = height;
                singleLetter.name = 'L' + i;
                const singleLetterComponent = singleLetter.getComponent(SingleLetterTracing);
                singleLetterComponent.order = i;
                singleLetterComponent.letter = c;
                singleLetterComponent.wordTracingContainer = node;
                wordLayout.node.addChild(singleLetter);
            }
        );
    }
}
