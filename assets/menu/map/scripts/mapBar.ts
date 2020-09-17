import Map from "./map";
import Config, { Flow } from "../../../common/scripts/lib/config";
import Profile from "../../../common/scripts/lib/profile";
import { Util } from "../../../common/scripts/util";

const { ccclass, property } = cc._decorator;

const mathWorlds = [
    'Number identification\nPattern recognition',
    'Count and write numbers up to 10',
    'Compare magnitude of numbers within 10\nOrder numbers within 10',
    'Count and write numbers up to 50\nAdd, subtract numbers within 10',
    'Count and write two digit numbers\nCompose & decompose numbers within 10',
    'Recognize 2 digit numbers\nSkip counting within 50s',
    'Add, subtract numbers within 20\nFast operations within 10',
    'Skip counting within 100\nWord problems within 10',
    'Recognize 3 digit numbers\nMultiplication',
    'Add, subtract within 100\nFast operations within 20'
]

@ccclass
export default class MapBar extends cc.Component {
    @property(cc.Node)
    worldMap: cc.Node = null

    @property(cc.Node)
    icons: cc.Node = null

    @property(cc.Prefab)
    blockPrefab: cc.Prefab = null

    static clicked: boolean = false
    block: cc.Node = null

    @property({
        type: cc.AudioClip
    })
    mapUpAudio: cc.AudioClip = null;

    @property({
        type: cc.AudioClip
    })
    mapDownAudio: cc.AudioClip = null;

    onLoad() {
        MapBar.clicked = false
        const map = this.node.getParent().getChildByName('MapScrollView')
        if (map != null) {
            const mapComp = map.getComponent(Map)
            if (mapComp != null) {
                for (let index = Profile.lastWorld + 1; index < this.icons.childrenCount; index++) {
                    this.disableButton(index, mapComp);
                }
            }
        }
        this.node.width = cc.winSize.width
        this.node.height = cc.winSize.height
        if (Config.i.course.id == 'en-maths') {
            this.icons.children.forEach((icon, index) => {
                const text = icon.getChildByName('text')
                if (text) {
                    const label = text.getComponent(cc.Label)
                    if (label) {
                        label.string = mathWorlds[index]
                    }
                }
            })
        }
    }

    private disableButton(index: number, mapComp: Map) {
        const worldButton = this.icons.children[index];
        if (worldButton != null) {
            const buttonComp = worldButton.getComponent(cc.Button);
            if (buttonComp != null) {
                // if (index == mapComp.world) {
                //     buttonComp.node.scale = 1.1;
                // }
                // else {
                if (Config.getInstance().flow == Flow.Default) {
                    buttonComp.interactable = false;
                }

                // }
            }
        }
    }

    goToMap(event, customEventData) {
        if (!MapBar.clicked) {
            MapBar.clicked = true
            const button: cc.Node = event.target
            const world = button.getSiblingIndex()
            Config.loadScene('menu/map/scene/map' + world.toString(), 'menu')
        }
    }

    raiseWorldMap(event, customEventData) {
        Util.playSfx(this.mapUpAudio);
        this.block = cc.instantiate(this.blockPrefab)
        this.block.on('touchstart', this.lowerWorldMap, this)
        this.node.insertChild(this.block, 1)
        new cc.Tween().target(this.worldMap)
            .to(0.5, { y: -24 }, null)
            .start()
    }

    lowerWorldMap(event, customEventData) {
        Util.playSfx(this.mapDownAudio);
        if (this.block) this.block.removeFromParent()
        new cc.Tween().target(this.worldMap)
            .to(0.5, { y: -cc.winSize.height }, null)
            .start()
    }

}
