import {Util} from "../../../common/scripts/util";
import {PlatformPlayer} from "./platform-player";
import {COLLECT_REWARD_EVENT} from "./platformer";
import {QuizCollect} from "./quiz-collect";
import {Reward} from "./reward";
import Assemble from "./assemble";

export class PlatformUtil {

    public static collectReward(
        reward: cc.Node,
        isObstacle: boolean,
        player: PlatformPlayer
    ) {
        let rewardC: Reward = reward.getComponent(Reward);
        const isAnswerCorrectly = isObstacle ? false : rewardC.isCorrect();

        if (isAnswerCorrectly) {
            player.playChimpAnimation("collect_correct");
            Util.playSfx(player.collectCorrectAudio);
        } else {
            player.playChimpAnimation("collect_wrong");
            Util.playSfx(player.collectWrongAudio);
        }

        if (isObstacle) {
            const assemble: Assemble = player.node.parent.parent.getComponent(Assemble);
            const rewardsMonitor = assemble.rewardsMonitor
            if (!!rewardsMonitor)
                rewardsMonitor.emit(COLLECT_REWARD_EVENT, reward, isAnswerCorrectly);
        } else {
            PlatformUtil.runRewardAnimation(reward, isAnswerCorrectly, player);
        }
    }

    public static collectQuiz(quiz: cc.Node, player: PlatformPlayer) {
        let quizCollect: QuizCollect = quiz.getComponent(QuizCollect);
        const isAnswerCorrectly = quizCollect.isCorrect();
        if (isAnswerCorrectly) {
            player.playChimpAnimation("collect_correct");
            Util.playSfx(player.collectCorrectAudio);
        } else {
            player.playChimpAnimation("collect_wrong");
            Util.playSfx(player.collectWrongAudio);
        }

        PlatformUtil.runQuizAnimation(quiz, isAnswerCorrectly, player);
    }

    public static runQuizAnimation(quiz: cc.Node, isAnswerCorrectly, player: PlatformPlayer) {
        const assemble: Assemble = player.node.parent.parent.getComponent(Assemble);
        const rewardsMonitor = assemble.rewardsMonitor
        let anim = quiz.getComponent(cc.Animation);
        const clip = isAnswerCorrectly
            ? "quizcollect_correct"
            : "quizcollect_wrong";
        let animState = anim.getAnimationState(`${clip}`);
        animState.wrapMode = cc.WrapMode.Normal;
        anim.on("finished", function (event) {
            if (!!rewardsMonitor)
                rewardsMonitor.emit(COLLECT_REWARD_EVENT, quiz, isAnswerCorrectly);
        });
        anim.play(`${clip}`);
    }

    public static runRewardAnimation(
        reward: cc.Node,
        isAnswerCorrectly: boolean,
        player: PlatformPlayer
    ) {
        const assemble: Assemble = player.node.parent.parent.getComponent(Assemble);
        const rewardsMonitor = assemble.rewardsMonitor
        let anim = reward.getComponent(cc.Animation);
        if (isAnswerCorrectly) {
            const clip = "quizcollect_correct";
            let animState = anim.getAnimationState(`${clip}`);
            animState.wrapMode = cc.WrapMode.Normal;
            anim.play(`${clip}`);
            player.node.parent.parent.emit('correct')
            if (!!rewardsMonitor)
                rewardsMonitor.emit(COLLECT_REWARD_EVENT, reward, isAnswerCorrectly);
        } else {
            player.node.parent.parent.emit('wrong')
            if (!!rewardsMonitor)
                rewardsMonitor.emit(COLLECT_REWARD_EVENT, reward, isAnswerCorrectly);
        }
    }


}
