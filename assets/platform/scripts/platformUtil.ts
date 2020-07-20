import { Util } from "../../common/scripts/util";
import { PlatformPlayer } from "./platform-player";
import { COLLECT_REWARD_EVENT } from "./platformer";
import { QuizCollect } from "./quiz-collect";
import { Reward } from "./reward";

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
      const rewardsMonitor = cc.find("RewardsMonitor");
      if (!!rewardsMonitor)
        rewardsMonitor.emit(COLLECT_REWARD_EVENT, reward, isAnswerCorrectly);
    } else {
      PlatformUtil.runRewardAnimation(reward, isAnswerCorrectly);
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

    PlatformUtil.runQuizAnimation(quiz, isAnswerCorrectly);
  }

  public static runQuizAnimation(quiz: cc.Node, isAnswerCorrectly) {
    const rewardsMonitor = cc.find("RewardsMonitor");
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
    isAnswerCorrectly: boolean
  ) {
    const rewardsMonitor = cc.find("RewardsMonitor");
    let anim = reward.getComponent(cc.Animation);
    if (isAnswerCorrectly) {
      const clip = "quizcollect_correct";
      let animState = anim.getAnimationState(`${clip}`);
      animState.wrapMode = cc.WrapMode.Normal;
      anim.play(`${clip}`);
      if (!!rewardsMonitor)
        rewardsMonitor.emit(COLLECT_REWARD_EVENT, reward, isAnswerCorrectly);
    } else {
      if (!!rewardsMonitor)
        rewardsMonitor.emit(COLLECT_REWARD_EVENT, reward, isAnswerCorrectly);
    }
  }



}