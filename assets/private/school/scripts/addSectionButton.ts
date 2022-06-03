import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import AddSectionDialog from "./addSectionDialog";

@ccclass
export class AddSectionButton extends cc.Component {
    @property(cc.Prefab)
    addSectionPrefab: cc.Prefab = null;

    parent: cc.Node = null;

    onAddSelectionClick(event) {
        const addSectionDialog = cc.instantiate(this.addSectionPrefab);
        const addSectionDialogComponent = addSectionDialog.getComponent(AddSectionDialog);
        addSectionDialogComponent.parent = this.parent;
        this.parent.addChild(addSectionDialog);
    }
}