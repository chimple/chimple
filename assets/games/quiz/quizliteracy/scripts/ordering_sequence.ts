import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import catchError from "../../../../common/scripts/lib/error-handler";
import { Util } from "../../../../common/scripts/util";
import OrderingDrop from "./ordering-drop";
import { QuizHelper } from "./quiz-helper";
import { QuizLiteracyConfig, QUIZ_CORRECT } from "./quiz-literacy";
import Overflow = cc.Label.Overflow;

export const ORDERING_MATCH = 'ORDERING_MATCH';
export const ORDERING_NO_MATCH = 'ORDERING_NO_MATCH';

@ccclass
export class OrderingSequence extends cc.Component {

    @property(cc.Prefab)
    orderingDropBox: cc.Prefab = null;

    @property(cc.Prefab)
    orderingDrag: cc.Prefab = null;

    quizConfig: QuizLiteracyConfig;
    assetDir: string;

    total: number = 0;

    @catchError()
    protected onLoad(): void {
        this.renderTopPanel();
        this.renderBottomPanel();
    }

    @catchError()
    renderTopPanel() {
        const topPanel = this.node.getChildByName('topPanel');
        const hLayout = topPanel.getChildByName('hLayout');
        this.renderSoundButton(hLayout);
        const vLayout = topPanel.getChildByName('vLayout');
        this.renderDrop(vLayout);
    }

    @catchError()
    private renderDrop(parent: cc.Node) {
        const answers = this.quizConfig.answer.split('^');
        this.total = answers.length;
        answers.forEach(
            (a, i) => {
                const dropBox = cc.instantiate(this.orderingDropBox);
                const label = dropBox.getChildByName('label');
                const labelComponent = label.getComponent(cc.Label);
                labelComponent.string = String(i+1);
                labelComponent.fontSize = 40;
                const drop = dropBox.getChildByName('orderingDrop');
                drop.name = String(i);
                const dropComponent = drop.getComponent(OrderingDrop);
                const boxCollider = drop.getComponent(cc.BoxCollider);
                const dropLabel: cc.Node = drop.getChildByName('dropLabel');
                dropLabel.opacity = 100;
                drop.width = dropComponent.allowDrop ? drop.width : label.width;
                drop.height = label.height;
                label.width = drop.width;
                boxCollider.size = dropComponent.allowDrop ? new cc.Size(drop.width, drop.height) :
                    new cc.Size(0, 0);

                const dropLabelComponent = dropLabel.getComponent(cc.Label);
                dropLabelComponent.string = '';
                parent.addChild(dropBox);

            }
        );
    }

    @catchError()
    renderSoundButton(parent: cc.Node) {
        QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir);
    }

    @catchError()
    renderBottomPanel() {
        const bottomPanel = this.node.getChildByName('bottomPanel');
        this.renderDrag(bottomPanel);
    }

    @catchError()
    private renderDrag(parent: cc.Node) {
        const choices = this.quizConfig.choices.split('^');
        let displayChoices: cc.Node[] = [];
        choices.forEach(
            (a, i) => {
                const n = new cc.Node();
                const drag = cc.instantiate(this.orderingDrag);
                const label = drag.getChildByName('label');
                const labelComponent = label.getComponent(cc.Label);
                labelComponent.fontSize = 40;
                labelComponent.string = a;
                drag.name = String(i);
                const boxCollider = drag.getComponent(cc.BoxCollider);
                drag.width = label.width + 2 * 10;
                drag.height = label.height + 2 * 10;
                boxCollider.size = new cc.Size(drag.width, drag.height);
                n.width = drag.width;
                n.height = drag.height;
                n.addChild(drag);
                displayChoices.push(n);

                drag.on(ORDERING_MATCH, () => {
                    this.total--;
                    if (this.total <= 0) {
                        this.node.dispatchEvent(new cc.Event.EventCustom(QUIZ_CORRECT, true));
                    }
                });
            }
        );

        displayChoices = Util.shuffle(displayChoices);
        displayChoices.forEach(
            d => {
                parent.addChild(d);
            }
        );
    }
}
