import ChimpleLabel from "../../../../common/scripts/chimple-label";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Usage extends cc.Component {
    @property(cc.Graphics)
    graphics: cc.Graphics = null

    lessons: number[]

    onLoad () {
        this.lessons.slice(0, 7).map((num, index) => {
            const x = index * this.node.width / 7
            const y = Math.min(num, 10) * this.node.height / 10
            if(index > 0) {
                this.graphics.lineTo(x, y)
            }
            this.graphics.stroke()
            this.graphics.moveTo(x, y)
            return [x, y, num]
        })
        .forEach(([x, y, num]) => {
            this.graphics.circle(x, y, 16)
            this.graphics.fillColor = num == 0 ? cc.Color.RED : num < 5 ? cc.Color.ORANGE : cc.Color.GREEN
            this.graphics.fill()
            const labelNode = new cc.Node()
            const label = labelNode.addComponent(ChimpleLabel)
            label.string = num.toString()
            label.fontSize = 24
            label.verticalAlign = cc.Label.VerticalAlign.CENTER
            labelNode.position = cc.v3(x, y)
            this.node.addChild(labelNode)
        })
    }
}
