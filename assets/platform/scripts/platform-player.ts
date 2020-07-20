import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import { QuizCollect } from "./quiz-collect";
import { Reward } from "./reward";
import { Util, TouchEvents } from "../../common/scripts/util";
import { GROUND_GROUP, WALL_GROUP, QUIZ_GROUP, OBSTACLE_GROUP } from "../../common/scripts/helper";
import { PlatformUtil } from "./platformUtil";

export const Y_PULL = -425;

@ccclass
export class PlatformPlayer extends cc.Component {
    private _prevPos: cc.Vec2 = null;
    private _currentPos: cc.Vec2 = null;

    private _isInJumpMode: boolean = false;
    private _speed: cc.Vec2 = new cc.Vec2(0, 0);
    private _maxSpeedV2: cc.Vec2 = new cc.Vec2(0, 0);
    private _chimpleNode: cc.Node = null;

    @property()
    gravity: number = 0;

    @property()
    drag: number = 0;

    @property()
    constSpeed: number = 0;

    @property()
    jumpSpeed: number = 0;

    @property(cc.AudioClip)
    wallHitAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    jumpAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    landAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    collectCorrectAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    collectWrongAudio: cc.AudioClip = null;

    private _isFallingDown: boolean = false;
    private _isJumpingUp: boolean = false;
    private _isOnGround: number = 0;
    private _isOnHighGround: number = 0;
    private _isOnWallContact: number = 0;
    private _isPlayerRotating: boolean = false;
    private _isInAir: boolean = false;

    protected onLoad(): void {
        cc.find('Platform')
            .on(TouchEvents.TOUCH_START, this.onTouchStart, this);

        cc.find('Platform')
            .on(TouchEvents.TOUCH_END, this.onTouchEnded, this);

        this._speed = new cc.Vec2(0, this.jumpSpeed * (1 + this.gravity * 1 / 60));
        this._maxSpeedV2 = new cc.Vec2(this.constSpeed, this.jumpSpeed);
        this._chimpleNode = this.node.getChildByName('platformchimp_ske');
    }

    protected onEnable(): void {
        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        // collisionManager.enabledDebugDraw = true;
        // collisionManager.enabledDrawBoundingBox = true;
    }

    onTouchStart(touch: cc.Touch) {
        if (!this._isInJumpMode) {
            this.playChimpAnimation('jump_up');
            Util.playSfx(this.jumpAudio);
        }
        this._isInJumpMode = true;
    }

    onTouchEnded(touch: cc.Touch) {
        this._isInJumpMode = false;
    }

    evaluateConditions() {
        if (this._speed.y > 0) {
            this._isJumpingUp = true;
            this._isFallingDown = false;
            this._isInAir = true;
        } else if (this._speed.y < 0) {
            this._isJumpingUp = false;
            this._isFallingDown = true;
            this._isInAir = true;
        } else if (this._speed.y === 0) {
            if (this._isOnGround <= 0 && this._isOnHighGround <= 0) {
                this._isInAir = true;
            } else {
                this._isInAir = false;
            }
            this._isJumpingUp = false;
            this._isFallingDown = false;
        }
    }

    protected update(dt: number): void {
        this.evaluateConditions();

        if (this._isInJumpMode
            && this._speed.y === 0
            && (Math.abs(this._speed.x) >= 50 || this._isOnWallContact > 0)
            && ((this._isOnGround > 0 || this._isOnHighGround > 0)
                && !this._isInAir)) {
            this._speed.y = this.jumpSpeed;
            this._isInAir = true;
            // play jump start animation
        }
        if (this._isInAir === true) {
            this._speed.y += this.gravity * 1 / 60;
        }

        if (Math.abs(this._speed.y) > this._maxSpeedV2.y) {
            this._speed.y = this._speed.y > 0 ? this._maxSpeedV2.y : -this._maxSpeedV2.y;
        }

        this.node.y += this._speed.y * 1 / 60;
        if (this._isOnWallContact <= 0) {
            this.node.x += this._speed.x * 1 / 60;
        }

        if (this._speed.x >= 50 && !this._isPlayerRotating) {
            this._isPlayerRotating = true;
            this._chimpleNode.runAction(cc.repeatForever(cc.rotateBy(1, -360)));
        } else if (this._isOnWallContact > 0 && this._isPlayerRotating) {
            this._isPlayerRotating = false;
            this._chimpleNode.stopAllActions();
            this._chimpleNode.runAction(cc.rotateTo(0.5, 0));
        }
    }

    protected lateUpdate(): void {
        this._prevPos = this._currentPos ? new cc.Vec2(this._currentPos.x, this._currentPos.y) : this.node.position;
        this._currentPos = this.node.position;
    }

    protected printState() {
        // cc.log('speed.x', this._speed.x, 'speed.y', this._speed.y, 'isInAir', this._isInAir,
        //     'jumping up', this._isJumpingUp, 'falling down', this._isFallingDown);
    }

    collisionGroundEnter(other, self) {
        let otherAabb = other.world.aabb;
        let otherPreAabb = other.world.preAabb.clone();
        let selfAabb = self.world.aabb;
        let selfPreAabb = self.world.preAabb.clone();

        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;

        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;

        const otherBoxCollider = other.node.getComponent(cc.BoxCollider);
        if (otherBoxCollider.tag === 0) {
            this._isOnGround++;
        } else if (otherBoxCollider.tag === 1) {
            this._isOnHighGround++;
        }

        if (this._speed.x <= 0) {
            this._speed.x = this.constSpeed;
        }

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if ((this._isOnGround === 1)
                && this._speed.y <= 0
                && this._isOnHighGround === 0
                && (selfPreAabb.yMax > otherPreAabb.yMax)) {
                this.setPlayerOnGround(otherPreAabb);
                // play jump end animation
            } else if ((this._isOnHighGround === 1)
                && this._speed.y <= 0
                && this._isInAir
                && (selfPreAabb.yMax > otherPreAabb.yMax)) {
                this.setPlayerOnGround(otherPreAabb);
            } else if (otherBoxCollider.tag === 0
                && this._speed.y <= 0 && (selfPreAabb.yMin < otherPreAabb.yMax)
                && otherBoxCollider.tag === 0) {
                this.setPlayerOnGround(otherPreAabb);
            } else if (otherBoxCollider.tag === 1
                && this._isOnHighGround === 1
                && this._isOnGround == 0
                && selfPreAabb.yMin < otherPreAabb.yMax && this._speed.y <= 0) {
                this._speed.y += this.gravity * 1 / 60;
            }
        }
        this._isInAir = false;
    }

    setPlayerOnGround(otherPreAabb) {
        const boxCollideComponent = this.node.getComponent(cc.BoxCollider);
        this.node.y = otherPreAabb.yMax + boxCollideComponent.size.height / 2;
        this._speed.y = 0;
    }

    setPlayerOnGroundWhenCollideWithWall(otherPreAabb) {
        this.node.y = this.node.y + 100;
        this._speed.y = 0;
    }

    runAnimation(name: string) {
        const db = this._chimpleNode.getComponent(dragonBones.ArmatureDisplay);
        if (db != null)
            db.playAnimation(name, 1);
    }

    collisionWallEnter(other, self) {
        var otherAabb = other.world.aabb;
        var otherPreAabb = other.world.preAabb.clone();
        var selfAabb = self.world.aabb;
        var selfPreAabb = self.world.preAabb.clone();
        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;

        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;

        this._isOnWallContact++;
        this.playChimpAnimation('collide');
        Util.playSfx(this.wallHitAudio);
        if (this._isOnHighGround === 1
            && this._isOnGround == 0
            && this._speed.y > 0
            && selfPreAabb.yMin < otherPreAabb.yMax) {
            this.setPlayerOnGroundWhenCollideWithWall(otherPreAabb);
        }
        // play wall Animation
        // if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
        //     if (this._isOnGround <= 0) {
        //         this._speed.y = -this.jumpSpeed;
        //     }
        // }
    }

    public playChimpAnimation(name, loop = 1) {
        const armature = this._chimpleNode.getComponent(dragonBones.ArmatureDisplay);
        if (armature != null)
            armature.playAnimation(name, loop);
    }

    private consumeQuizzesIfAny(other, self) {
        let quizCollect = other.node.getComponent(QuizCollect);
        if (quizCollect !== null) {
            if (!quizCollect.touched) {
                quizCollect.touched = true;
                PlatformUtil.collectQuiz(other.node, this);
            }
        }
    }

    private consumeRewardsIfAny(other, self) {
        let rewardCollect = other.node.getComponent(Reward);
        if (!!rewardCollect && !rewardCollect.touched) {
            rewardCollect.touched = true;
            const isObstacle: boolean = other.node.group === 'obstacle';
            PlatformUtil.collectReward(other.node, isObstacle, this);
        }
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        switch (other.node.group) {
            case GROUND_GROUP:
                this.collisionGroundEnter(other, self);
                break;
            case WALL_GROUP:
                this.collisionWallEnter(other, self);
                break;
            case QUIZ_GROUP:
                this.consumeQuizzesIfAny(other, self);
                this.consumeRewardsIfAny(other, self);
                break;
            case OBSTACLE_GROUP:
                this.consumeRewardsIfAny(other, self);

        }
    }

    onCollisionExit(other, self) {
        if (other.node.group == 'ground') {
            let otherAabb = other.world.aabb;
            let otherPreAabb = other.world.preAabb.clone();
            let selfAabb = self.world.aabb;
            let selfPreAabb = self.world.preAabb.clone();

            selfPreAabb.x = selfAabb.x;
            otherPreAabb.x = otherAabb.x;

            selfPreAabb.y = selfAabb.y;
            otherPreAabb.y = otherAabb.y;

            const otherBoxCollider = other.node.getComponent(cc.BoxCollider);

            if (otherBoxCollider.tag === 0
                && this._speed.y <= 0
                && (selfPreAabb.yMax < otherPreAabb.yMax)) {
                this.setPlayerOnGround(otherPreAabb);
            }

            if (otherBoxCollider.tag === 0) {
                this._isOnGround--;
            } else if (otherBoxCollider.tag === 1) {
                this._isOnHighGround--;
            }

            if ((otherBoxCollider.tag === 1 || otherBoxCollider.tag == 0)
                && this._isOnHighGround === 1
                && !this._isInAir
                && this._isOnGround == 0
                && selfPreAabb.yMax > otherPreAabb.yMax && this._speed.y === 0) {
                this._speed.y += this.gravity * 1 / 60;
            }

            this._isInJumpMode = false;
        } else if (other.node.group === 'wall') {
            this._isOnWallContact--;
        }
    }

    public linearVelocity() {
        return null;
    }
}
