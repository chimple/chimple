import Config from "../../../../common/scripts/lib/config";
import Profile, { Gender, User, CURRENTMODE } from "../../../../common/scripts/lib/profile";
import { MODE, Mode, LOG_RIGHT_MOVES } from "../../../../common/scripts/lib/constants";
import { Util } from "../../../../common/scripts/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CollectUserInfo extends cc.Component {

    @property(cc.Button)
    nextButton: cc.Button = null;

    @property(cc.Node)
    prefabContainer: cc.Node = null;

    @property(cc.Node)
    buttonContainer: cc.Node = null;

    @property(cc.Prefab)
    schoolPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    newcamerascenePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    ageandgenderscenePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    nameinputscenePrefab: cc.Prefab = null;

    userAge: number = 0;
    userName: string = "";
    userGender: Gender;
    userlanguage: string = "english";
    imgPath: string = "";
    avatarImage: string = "";

    currentPrefabNumber: number = 0;
    isLastScene: boolean = false
    enableNextButton: boolean = false;
    profilecreated: boolean = false;

    @property(cc.SpriteFrame)
    disableSprite: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    enableSprite: cc.SpriteFrame = null;

    scenes: string[] = [];

    onLoad() {
        this.scenes.push("newcamerascene", "ageandgenderscene", "nameinputscene");
        this.disableButton();
        this.activateCurrentPrefab();
        if (User.getUsers().length === 0) {
            this.buttonContainer.addChild(cc.instantiate(this.schoolPrefab))
        }
    }

    activateCurrentPrefab() {
        for (let i = 0; i < this.prefabContainer.childrenCount; i++) {
            // inactive all first
            this.prefabContainer.children[i].active = false;
            this.prefabContainer.children[i].removeFromParent();
        }
        const sceneName = this.scenes[this.currentPrefabNumber];
        let loadedChild = null;
        switch (sceneName) {
            case "newcamerascene":
                loadedChild = cc.instantiate(this.newcamerascenePrefab)
                break;
            case "ageandgenderscene":
                loadedChild = cc.instantiate(this.ageandgenderscenePrefab)
                break;
            case "nameinputscene":
                loadedChild = cc.instantiate(this.nameinputscenePrefab)
                break;
        }
        this.prefabContainer.addChild(loadedChild)
        // active the current one
        this.prefabContainer.children[0].active = true;
    }

    disableButton() {
        this.nextButton.interactable = false
        this.nextButton.node.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = this.disableSprite;
    }

    enableButton() {
        this.nextButton.interactable = true
        this.nextButton.node.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = this.enableSprite;
    }

    onClickBackBtn() {
        Config.loadScene('private/home/loginnew/scenes/welcomePage', 'private', null);

    }

    onNextButtonClicked(event) {
        console.log(this.currentPrefabNumber);
        if (!this.profilecreated) {
            if (this.currentPrefabNumber >= 2) {
                this.profilecreated = true
                Profile.setItem(CURRENTMODE, Mode.Home)
                const newUser: User = User.createUser(this.userName, this.imgPath, this.userAge, this.userGender, null, this.avatarImage);
                User.setCurrentUser(newUser);

                // navigate to character modification
                Config.loadScene('menu/inventory/scenes/inventory', "menu", null);
                newUser.openAllRewardsForCharacter("chimp")
                // Config.getInstance().pushScene("menu/start/scenes/start", "menu", null)
                return;
            }

            if (this.currentPrefabNumber === 0) {
                this.buttonContainer.active = false;
            }

            this.currentPrefabNumber++;
            this.activateCurrentPrefab();
            if (!this.enableNextButton)
                this.disableButton()
        }
    }
}
