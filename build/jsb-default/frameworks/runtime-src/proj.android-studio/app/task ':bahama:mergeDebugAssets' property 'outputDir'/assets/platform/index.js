window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  assemble: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c8aa3vcQrZEo4Zj7R4mE6vS", "assemble");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var config_1 = require("../../../common/scripts/lib/config");
    var util_1 = require("../../../common/scripts/util");
    var platformer_1 = require("./platformer");
    var reward_1 = require("./reward");
    var rewardsMonitor_1 = require("./rewardsMonitor");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LEVEL_MAP = [ "map1", "map2", "map3", "map4", "map5" ];
    var REWARD_COLLECTED_EXPIRED_TIME = 30;
    var PLAYING_MAP = [ "map0" ];
    var BALLOON_WIDTH = 384;
    var RewardStatus;
    (function(RewardStatus) {
      RewardStatus[RewardStatus["Collecting"] = 0] = "Collecting";
      RewardStatus[RewardStatus["Finished"] = 1] = "Finished";
      RewardStatus[RewardStatus["TimedOut"] = 2] = "TimedOut";
      RewardStatus[RewardStatus["Idle"] = 3] = "Idle";
    })(RewardStatus || (RewardStatus = {}));
    var Assemble = function(_super) {
      __extends(Assemble, _super);
      function Assemble() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.map0 = null;
        _this.map1 = null;
        _this.map2 = null;
        _this.map3 = null;
        _this.map4 = null;
        _this.map5 = null;
        _this.bgMusic = null;
        _this.filler = null;
        _this.player = null;
        _this.startAudio = null;
        _this.balloon = null;
        _this.reward = null;
        _this.displayCollectReward = null;
        _this.displayCollectLabel = null;
        _this.rewardsMonitorPrefab = null;
        _this.displayImage = null;
        _this.x = 0;
        _this.gameIndex = 0;
        _this.cameraNode = null;
        _this.rewardStatus = RewardStatus.Collecting;
        _this.numScreens = 1;
        _this.stopScrollX = 10 * cc.winSize.width;
        _this.balloonMode = false;
        _this.rewardsMonitor = null;
        _this.randomFruitNumber = -1;
        _this._pickLetters = [];
        _this._showLetters = [];
        _this._alphabetCollectMode = false;
        return _this;
      }
      Assemble.prototype.onLoad = function() {
        var config = config_1.default.getInstance();
        this.configureRewards();
        var physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        this.player.zIndex = 1;
        this.player.x = cc.winSize.width / 2;
        this.player.y = cc.winSize.height / 2;
        this.world = this.node.getChildByName("world");
        this.world.x = -cc.winSize.width / 2;
        this.world.y = -cc.winSize.height / 2;
        this.cameraNode = this.node.getChildByName("Main Camera");
        this.platformFlowPlay();
      };
      Assemble.prototype.createRewardMonitor = function() {
        var _this = this;
        this.rewardsMonitor = cc.instantiate(this.rewardsMonitorPrefab);
        var progressMonitorNode = this.node.parent.parent.getChildByName("ProgressMonitor");
        !progressMonitorNode || (progressMonitorNode.opacity = 0);
        var rewardMonitorComponent = this.rewardsMonitor.getComponent(rewardsMonitor_1.default);
        if (null !== this.rewardsMonitor) {
          this.rewardsMonitor.on(rewardsMonitor_1.ALL_REWARDS_COLLECTED, function() {
            if (_this.rewardStatus == RewardStatus.Collecting) {
              cc.log("ALL_REWARDS_COLLECTED");
              _this.rewardStatus = RewardStatus.Finished;
              _this.afterRewardsCollected();
            }
          });
          if (this._alphabetCollectMode) {
            rewardMonitorComponent.alphabetCollectMode = true;
            rewardMonitorComponent.alphabetToCollect = this.pickLetters[0];
          } else {
            rewardMonitorComponent.alphabetCollectMode = false;
            this.randomFruitNumber = util_1.Util.randomBetween(1, 10);
            var rewardNode = cc.instantiate(this.reward);
            if (!!rewardNode) {
              var reward = rewardNode.getComponent(reward_1.Reward);
              rewardMonitorComponent.shadowImage = reward["r" + this.randomFruitNumber];
              this.displayImage = reward["r" + this.randomFruitNumber];
            }
          }
        }
        this.node.parent.addChild(this.rewardsMonitor);
      };
      Assemble.prototype.platformFlowPlay = function() {
        this.createRewardMonitor();
        this.rewardsMonitor.active = true;
        util_1.Util.playSfx(this.bgMusic, true, true);
        this.addPath(true, 1);
        if (this._alphabetCollectMode) {
          var displayCollectReward_1 = cc.instantiate(this.displayCollectLabel);
          if (!!displayCollectReward_1) {
            var chimpleNode = displayCollectReward_1.getChildByName("rewardCollect");
            var label = chimpleNode.getComponent(cc.Label);
            label.string = this.pickLetters[0];
            displayCollectReward_1.opacity = 255;
            displayCollectReward_1.scale = 1;
            displayCollectReward_1.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
            cc.director.getScene().addChild(displayCollectReward_1);
            this.scheduleOnce(function() {
              displayCollectReward_1.opacity = 0;
              displayCollectReward_1.removeFromParent(false);
            }, 2);
          }
        } else {
          var displayCollectReward_2 = cc.instantiate(this.displayCollectReward);
          if (displayCollectReward_2) {
            var spriteNode = displayCollectReward_2.getChildByName("rewardCollect");
            var sprite = spriteNode.getComponent(cc.Sprite);
            spriteNode.scale = 2;
            sprite.spriteFrame = this.displayImage;
            displayCollectReward_2.opacity = 255;
            displayCollectReward_2.scale = .5;
            displayCollectReward_2.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
            cc.director.getScene().addChild(displayCollectReward_2);
            this.scheduleOnce(function() {
              var anim = displayCollectReward_2.getComponent(cc.Animation);
              anim.play("displaycollectreward");
              anim.on("finished", function() {
                displayCollectReward_2.opacity = 0;
                displayCollectReward_2.removeFromParent(false);
              });
            }, 1);
          }
        }
      };
      Assemble.prototype.configureRewards = function() {};
      Assemble.prototype.addPlatform = function(isPlaying, count) {
        var levelPrefabs = isPlaying ? PLAYING_MAP : LEVEL_MAP;
        for (var index = 0; index < count; index++) {
          var node1 = cc.instantiate(this[levelPrefabs[Math.floor(Math.random() * levelPrefabs.length)]]);
          node1.setPosition(this.x, 0);
          this.world.addChild(node1);
          this.x += node1.width;
        }
      };
      Assemble.prototype.afterRewardsCollected = function() {
        cc.audioEngine.stopMusic();
        var config = config_1.default.getInstance();
        this.addBridge();
        this.player.active = false;
        this.node.off(util_1.TouchEvents.TOUCH_START);
        this.node.off(util_1.TouchEvents.TOUCH_END);
        this.node.emit("nextProblem");
      };
      Assemble.prototype.addPath = function(isPlaying, count) {
        this.addPlatform(isPlaying, count);
        this.stopScrollX = this.x;
      };
      Assemble.prototype.addBridge = function() {
        this.bridgeNode = new cc.Node();
        this.bridgeNode.setPosition(this.x, 0);
        this.bridgeNode.setAnchorPoint(0, 0);
        while (this.bridgeNode.width < cc.winSize.width) {
          var endFillerNode = cc.instantiate(this.filler);
          endFillerNode.setPosition(this.bridgeNode.width, -192);
          this.bridgeNode.addChild(endFillerNode);
          this.bridgeNode.width += endFillerNode.width;
        }
        this.x += this.bridgeNode.width;
        this.world.addChild(this.bridgeNode);
      };
      Assemble.prototype.onDestroy = function() {
        cc.audioEngine.stopMusic();
      };
      Assemble.prototype.lateUpdate = function() {
        if (this.rewardStatus == RewardStatus.Collecting && this.world.x > -this.stopScrollX - 1 * cc.winSize.width / 4) {
          var currentWorldX = this.world.x;
          this.world.x = -this.player.x - 1 * cc.winSize.width / 4;
          this.node.getComponent(platformer_1.Platformer).scrollLayersInParallax(this.world.x - currentWorldX);
          if (-this.world.x / 1024 + .9 > this.numScreens) {
            this.numScreens++;
            this.addPath(false, 1);
          }
        }
      };
      Object.defineProperty(Assemble.prototype, "pickLetters", {
        get: function() {
          return this._pickLetters;
        },
        set: function(newVal) {
          this._pickLetters = newVal;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Assemble.prototype, "showLetters", {
        get: function() {
          return this._showLetters;
        },
        set: function(newVal) {
          this._showLetters = newVal;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Assemble.prototype, "alphabetCollectMode", {
        get: function() {
          return this._alphabetCollectMode;
        },
        enumerable: false,
        configurable: true
      });
      __decorate([ property(cc.Prefab) ], Assemble.prototype, "map0", void 0);
      __decorate([ property(cc.Prefab) ], Assemble.prototype, "map1", void 0);
      __decorate([ property(cc.Prefab) ], Assemble.prototype, "map2", void 0);
      __decorate([ property(cc.Prefab) ], Assemble.prototype, "map3", void 0);
      __decorate([ property(cc.Prefab) ], Assemble.prototype, "map4", void 0);
      __decorate([ property(cc.Prefab) ], Assemble.prototype, "map5", void 0);
      __decorate([ property(cc.AudioClip) ], Assemble.prototype, "bgMusic", void 0);
      __decorate([ property(cc.Prefab) ], Assemble.prototype, "filler", void 0);
      __decorate([ property(cc.Node) ], Assemble.prototype, "player", void 0);
      __decorate([ property(cc.AudioClip) ], Assemble.prototype, "startAudio", void 0);
      __decorate([ property(cc.Prefab) ], Assemble.prototype, "balloon", void 0);
      __decorate([ property(cc.Prefab) ], Assemble.prototype, "reward", void 0);
      __decorate([ property(cc.Prefab) ], Assemble.prototype, "displayCollectReward", void 0);
      __decorate([ property(cc.Prefab) ], Assemble.prototype, "displayCollectLabel", void 0);
      __decorate([ property(cc.Prefab) ], Assemble.prototype, "rewardsMonitorPrefab", void 0);
      Assemble = __decorate([ ccclass ], Assemble);
      return Assemble;
    }(cc.Component);
    exports.default = Assemble;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/util": void 0,
    "./platformer": "platformer",
    "./reward": "reward",
    "./rewardsMonitor": "rewardsMonitor"
  } ],
  "base-level": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a5c0bSQue5Nv6CbWCa6TsDI", "base-level");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BaseLevel = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var Vec2 = cc.Vec2;
    var helper_1 = require("../../../common/scripts/helper");
    var util_1 = require("../../../common/scripts/util");
    var assemble_1 = require("./assemble");
    var quiz_collect_1 = require("./quiz-collect");
    var reward_1 = require("./reward");
    var BaseLevel = function(_super) {
      __extends(BaseLevel, _super);
      function BaseLevel() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._allRewardItems = [];
        _this._quizItems = [];
        _this._shouldShowReward = false;
        _this.rewardPrefab = null;
        _this.quizPrefab = null;
        return _this;
      }
      BaseLevel.prototype.onLoad = function() {};
      BaseLevel.prototype.start = function() {
        var _this = this;
        this.scheduleOnce(function() {
          _this.initQuizPrefabs();
          _this._shouldShowReward && _this.buildRewards(true);
          _this.buildRewards(false);
        }, .5);
      };
      Object.defineProperty(BaseLevel.prototype, "inCorrectAnswers", {
        get: function() {
          return this._incorrectAnswers;
        },
        set: function(newVal) {
          this._incorrectAnswers = newVal;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(BaseLevel.prototype, "correctAnswers", {
        get: function() {
          return this._correctAnswers;
        },
        set: function(newVal) {
          this._correctAnswers = newVal;
        },
        enumerable: false,
        configurable: true
      });
      BaseLevel.prototype.randomRewards = function() {
        this._correctNumber = this.randomFruit();
        var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
        var index = numbers.indexOf(this._correctNumber);
        -1 !== index && numbers.splice(index, 1);
        this._generator || (this._generator = util_1.Util.shuffleGenerator(numbers));
        cc.log("correct fruit to pick", this._correctNumber, " and others", JSON.stringify(numbers));
      };
      BaseLevel.prototype.buildRewards = function(isReward) {
        this._allRewardItems = [];
        var rewardsNodesInUI = this.findRewardsOrObstacles(isReward);
        isReward && this.randomRewards();
        for (var i in rewardsNodesInUI) {
          var quiz = rewardsNodesInUI[i];
          if (!!quiz) {
            var rewardNode = cc.instantiate(this.rewardPrefab);
            rewardNode.scale = .5;
            var reward = rewardNode.getComponent(reward_1.Reward);
            reward.correctAnswer = this._correctNumber;
            var min = this._generator.next().value;
            isReward ? Math.random() < .5 ? reward.loadImage(this._correctNumber) : reward.loadImage(min) : reward.loadObstacle();
            rewardNode.position = new cc.Vec2(quiz.position.x, quiz.position.y + 50);
            this._allRewardItems.push(rewardNode);
          }
        }
        this.showRewards();
      };
      BaseLevel.prototype.randomFruit = function() {
        var platform = this.node.parent.parent;
        if (null != platform) {
          var assemble = platform.getComponent(assemble_1.default);
          return assemble.randomFruitNumber;
        }
        return 0;
      };
      BaseLevel.prototype.buildQuizzes = function() {
        this._quizItems = [];
        var quizNodesInUI = this.findQuizLocations();
        for (var i in quizNodesInUI) {
          var quiz = quizNodesInUI[i];
          if (!!quiz) {
            var parent = cc.instantiate(this.quizPrefab);
            var quizCollect = parent.getComponent(quiz_collect_1.QuizCollect);
            quizCollect.correctAnswers = this.correctAnswers;
            quizCollect.text = quiz.text;
            util_1.Util.initText(parent, null, quiz.text, helper_1.FONT_SIZE, null, true, new Vec2(-5.5, 10));
            parent.position = new cc.Vec2(quiz.position.x, quiz.position.y + 50);
            this._quizItems.push(parent);
          }
        }
        this._shouldShowReward = 0 === this._quizItems.length;
        this.showQuizzes();
      };
      BaseLevel.prototype.findRewardsOrObstacles = function(isReward) {
        var group = isReward ? "quizcollect" : "obstacle";
        return this.node.children.filter(function(c) {
          return c.name.startsWith("collect");
        }).map(function(c, index) {
          cc.log("node", c, " group", c.group);
          if (c.name.startsWith("collect") && c.group === group) {
            var quiz = {
              position: c.getPosition()
            };
            return quiz;
          }
        });
      };
      BaseLevel.prototype.findQuizLocations = function() {
        var length = this.node.children.filter(function(c) {
          return c.group === helper_1.QUIZ_GROUP && c.name.startsWith("collect");
        }).length || 0;
        var correctCount = this._correctAnswers.length;
        var incorrectCount = length - correctCount;
        var texts = util_1.Util.randomElements(this.correctAnswers, correctCount).concat(util_1.Util.randomElements(this.inCorrectAnswers, incorrectCount));
        return !!texts && texts.length > 0 ? this.node.children.filter(function(c) {
          return c.name.startsWith("collect");
        }).map(function(c, index) {
          if (c.group === helper_1.QUIZ_GROUP && c.name.startsWith("collect")) {
            var quiz = {
              position: c.getPosition(),
              text: texts[index]
            };
            return quiz;
          }
        }) : [];
      };
      BaseLevel.prototype.showRewards = function() {
        for (var i in this._allRewardItems) {
          var r = this._allRewardItems[i];
          this.node.addChild(r);
        }
      };
      BaseLevel.prototype.showQuizzes = function() {
        for (var i in this._quizItems) {
          var r = this._quizItems[i];
          this.node.addChild(r);
        }
      };
      BaseLevel.prototype.initQuizPrefabs = function() {
        this.setQuizOptions();
        this.buildQuizzes();
      };
      __decorate([ property(cc.Prefab) ], BaseLevel.prototype, "rewardPrefab", void 0);
      __decorate([ property(cc.Prefab) ], BaseLevel.prototype, "quizPrefab", void 0);
      BaseLevel = __decorate([ ccclass ], BaseLevel);
      return BaseLevel;
    }(cc.Component);
    exports.BaseLevel = BaseLevel;
    cc._RF.pop();
  }, {
    "../../../common/scripts/helper": void 0,
    "../../../common/scripts/util": void 0,
    "./assemble": "assemble",
    "./quiz-collect": "quiz-collect",
    "./reward": "reward"
  } ],
  "camera-movement": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "02d3bnxUBNIyr/Cr8wl/ksy", "camera-movement");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CamraMovement = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var platformer_1 = require("./platformer");
    var util_1 = require("../../../common/scripts/util");
    var CamraMovement = function(_super) {
      __extends(CamraMovement, _super);
      function CamraMovement() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.player = null;
        _this.platformer = null;
        _this.stopScrollX = 10 * cc.winSize.width;
        _this.startGameX = 0;
        _this.numScreens = 1;
        _this._gameMode = false;
        return _this;
      }
      Object.defineProperty(CamraMovement.prototype, "gameMode", {
        get: function() {
          return this._gameMode;
        },
        set: function(newVal) {
          this._gameMode = newVal;
        },
        enumerable: false,
        configurable: true
      });
      CamraMovement.prototype.onLoad = function() {
        this.camera = this.getComponent(cc.Camera);
        if (this.node) {
          this.node.on(util_1.TouchEvents.TOUCH_START, this.onTouchStart, this);
          this.node.on(util_1.TouchEvents.TOUCH_END, this.onTouchEnded, this);
        }
      };
      CamraMovement.prototype.onTouchStart = function(touch) {};
      CamraMovement.prototype.onTouchEnded = function(touch) {};
      __decorate([ property(cc.Node) ], CamraMovement.prototype, "player", void 0);
      __decorate([ property(platformer_1.Platformer) ], CamraMovement.prototype, "platformer", void 0);
      CamraMovement = __decorate([ ccclass ], CamraMovement);
      return CamraMovement;
    }(cc.Component);
    exports.CamraMovement = CamraMovement;
    cc._RF.pop();
  }, {
    "../../../common/scripts/util": void 0,
    "./platformer": "platformer"
  } ],
  level: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ff92cX5bmlOlrX2RKo11zBj", "level");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Level = void 0;
    var ccclass = cc._decorator.ccclass;
    var base_level_1 = require("./base-level");
    var assemble_1 = require("./assemble");
    var Level = function(_super) {
      __extends(Level, _super);
      function Level() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Level.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
      };
      Level.prototype.start = function() {
        _super.prototype.start.call(this);
      };
      Level.prototype.setQuizOptions = function() {
        var platform = this.node.parent.parent;
        if (null !== platform) {
          var assemble = platform.getComponent(assemble_1.default);
          this.correctAnswers = assemble.pickLetters;
          this.inCorrectAnswers = assemble.showLetters;
        } else {
          this.correctAnswers = [];
          this.inCorrectAnswers = [];
        }
      };
      Level = __decorate([ ccclass ], Level);
      return Level;
    }(base_level_1.BaseLevel);
    exports.Level = Level;
    cc._RF.pop();
  }, {
    "./assemble": "assemble",
    "./base-level": "base-level"
  } ],
  obstacle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "02ae5fDckxOF4NaKlVZNvIe", "obstacle");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Obstacle = function(_super) {
      __extends(Obstacle, _super);
      function Obstacle() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = "hello";
        return _this;
      }
      Obstacle.prototype.onClick = function(event, customEventData) {
        var node = event.target;
        var parent = node.parent;
        var anim = parent.getComponent(cc.Animation);
        anim.stop();
        anim.play("waterfall_end");
        anim.on("finished", function() {
          parent.removeComponent(cc.RigidBody);
          node.removeFromParent(false);
        }, this);
      };
      __decorate([ property(cc.Label) ], Obstacle.prototype, "label", void 0);
      __decorate([ property ], Obstacle.prototype, "text", void 0);
      Obstacle = __decorate([ ccclass ], Obstacle);
      return Obstacle;
    }(cc.Component);
    exports.default = Obstacle;
    cc._RF.pop();
  }, {} ],
  "one-side-platform": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6769buWK85IdKDERDWcM/5O", "one-side-platform");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.OneSidePlatform = void 0;
    var ccclass = cc._decorator.ccclass;
    var platform_player_1 = require("./platform-player");
    var OneSidePlatform = function(_super) {
      __extends(OneSidePlatform, _super);
      function OneSidePlatform() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._player = null;
        return _this;
      }
      OneSidePlatform.prototype.onLoad = function() {
        this._pointVelPlatform = cc.v2();
        this._pointVelOther = cc.v2();
        this._relativeVel = cc.v2();
        this._relativePoint = cc.v2();
        this._player = cc.find("Player");
      };
      OneSidePlatform.prototype.onBeginContact = function(contact, selfCollider, otherCollider) {
        var otherBody = otherCollider.body;
        var platformBody = selfCollider.body;
        var worldManifold = contact.getWorldManifold();
        var points = worldManifold.points;
        var pointVelPlatform = this._pointVelPlatform;
        var pointVelOther = this._pointVelOther;
        var relativeVel = this._relativeVel;
        var relativePoint = this._relativePoint;
        var playerComponent = this._player.getComponent(platform_player_1.PlatformPlayer);
        console.log("_player linear velocity", playerComponent.linearVelocity());
        if (!!playerComponent.linearVelocity() && playerComponent.linearVelocity().y > 0) {
          console.log("contact.disabled as player jumping up");
          contact.disabled = true;
          return;
        }
        for (var i = 0; i < points.length; i++) {
          platformBody.getLinearVelocityFromWorldPoint(points[i], pointVelPlatform);
          otherBody.getLinearVelocityFromWorldPoint(points[i], pointVelOther);
          platformBody.getLocalVector(pointVelOther.subSelf(pointVelPlatform), relativeVel);
          var platformFaceX = selfCollider.getAABB().width / 2;
          if (relativeVel.y < -32 && platformFaceX - 32 >= selfCollider.getAABB().width / 2) {
            var platformFaceX_1 = selfCollider.getAABB().width / 2;
            console.log("contact.enabled 111");
            return;
          }
          if (relativeVel.y < 32) {
            platformBody.getLocalPoint(points[i], relativePoint);
            var platformFaceY = selfCollider.getAABB().height / 2;
            if (relativePoint.y > platformFaceY - 3.2) {
              console.log("contact.enabled 222", relativeVel.x, relativeVel.y);
              return;
            }
          }
        }
        console.log("contact.disabled");
        contact.disabled = true;
      };
      OneSidePlatform = __decorate([ ccclass ], OneSidePlatform);
      return OneSidePlatform;
    }(cc.Component);
    exports.OneSidePlatform = OneSidePlatform;
    cc._RF.pop();
  }, {
    "./platform-player": "platform-player"
  } ],
  "platform-player": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "38640T2oKBB4pfxujd6q/zG", "platform-player");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PlatformPlayer = exports.Y_PULL = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var quiz_collect_1 = require("./quiz-collect");
    var reward_1 = require("./reward");
    var util_1 = require("../../../common/scripts/util");
    var helper_1 = require("../../../common/scripts/helper");
    var platformUtil_1 = require("./platformUtil");
    exports.Y_PULL = -425;
    var PlatformPlayer = function(_super) {
      __extends(PlatformPlayer, _super);
      function PlatformPlayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._prevPos = null;
        _this._currentPos = null;
        _this._isInJumpMode = false;
        _this._speed = new cc.Vec2(0, 0);
        _this._maxSpeedV2 = new cc.Vec2(0, 0);
        _this._chimpleNode = null;
        _this.gravity = 0;
        _this.drag = 0;
        _this.constSpeed = 0;
        _this.jumpSpeed = 0;
        _this.wallHitAudio = null;
        _this.jumpAudio = null;
        _this.landAudio = null;
        _this.collectCorrectAudio = null;
        _this.collectWrongAudio = null;
        _this._isFallingDown = false;
        _this._isJumpingUp = false;
        _this._isOnGround = 0;
        _this._isOnHighGround = 0;
        _this._isOnWallContact = 0;
        _this._isPlayerRotating = false;
        _this._isInAir = false;
        return _this;
      }
      PlatformPlayer.prototype.onLoad = function() {
        var platform = this.node.parent.parent;
        platform.on(util_1.TouchEvents.TOUCH_START, this.onTouchStart, this);
        platform.on(util_1.TouchEvents.TOUCH_END, this.onTouchEnded, this);
        this._speed = new cc.Vec2(0, this.jumpSpeed * (1 + 1 * this.gravity / 60));
        this._maxSpeedV2 = new cc.Vec2(this.constSpeed, this.jumpSpeed);
        this._chimpleNode = this.node.getChildByName("platformchimp_ske");
      };
      PlatformPlayer.prototype.onEnable = function() {
        var collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
      };
      PlatformPlayer.prototype.onTouchStart = function(touch) {
        if (!this._isInJumpMode) {
          this.playChimpAnimation("jump_up");
          util_1.Util.playSfx(this.jumpAudio);
        }
        this._isInJumpMode = true;
      };
      PlatformPlayer.prototype.onTouchEnded = function(touch) {
        this._isInJumpMode = false;
      };
      PlatformPlayer.prototype.evaluateConditions = function() {
        if (this._speed.y > 0) {
          this._isJumpingUp = true;
          this._isFallingDown = false;
          this._isInAir = true;
        } else if (this._speed.y < 0) {
          this._isJumpingUp = false;
          this._isFallingDown = true;
          this._isInAir = true;
        } else if (0 === this._speed.y) {
          this._isOnGround <= 0 && this._isOnHighGround <= 0 ? this._isInAir = true : this._isInAir = false;
          this._isJumpingUp = false;
          this._isFallingDown = false;
        }
      };
      PlatformPlayer.prototype.update = function(dt) {
        this.evaluateConditions();
        if (this._isInJumpMode && 0 === this._speed.y && (Math.abs(this._speed.x) >= 50 || this._isOnWallContact > 0) && (this._isOnGround > 0 || this._isOnHighGround > 0) && !this._isInAir) {
          this._speed.y = this.jumpSpeed;
          this._isInAir = true;
        }
        true === this._isInAir && (this._speed.y += 1 * this.gravity / 60);
        Math.abs(this._speed.y) > this._maxSpeedV2.y && (this._speed.y = this._speed.y > 0 ? this._maxSpeedV2.y : -this._maxSpeedV2.y);
        this.node.y += 1 * this._speed.y / 60;
        this._isOnWallContact <= 0 && (this.node.x += 1 * this._speed.x / 60);
        if (this._speed.x >= 50 && !this._isPlayerRotating) {
          this._isPlayerRotating = true;
          this._chimpleNode.runAction(cc.repeatForever(cc.rotateBy(1, -360)));
        } else if (this._isOnWallContact > 0 && this._isPlayerRotating) {
          this._isPlayerRotating = false;
          this._chimpleNode.stopAllActions();
          this._chimpleNode.runAction(cc.rotateTo(.5, 0));
        }
      };
      PlatformPlayer.prototype.lateUpdate = function() {
        this._prevPos = this._currentPos ? new cc.Vec2(this._currentPos.x, this._currentPos.y) : this.node.position;
        this._currentPos = this.node.position;
      };
      PlatformPlayer.prototype.printState = function() {};
      PlatformPlayer.prototype.collisionGroundEnter = function(other, self) {
        var otherAabb = other.world.aabb;
        var otherPreAabb = other.world.preAabb.clone();
        var selfAabb = self.world.aabb;
        var selfPreAabb = self.world.preAabb.clone();
        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;
        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;
        var otherBoxCollider = other.node.getComponent(cc.BoxCollider);
        0 === otherBoxCollider.tag ? this._isOnGround++ : 1 === otherBoxCollider.tag && this._isOnHighGround++;
        this._speed.x <= 0 && (this._speed.x = this.constSpeed);
        cc.Intersection.rectRect(selfPreAabb, otherPreAabb) && (1 === this._isOnGround && this._speed.y <= 0 && 0 === this._isOnHighGround && selfPreAabb.yMax > otherPreAabb.yMax ? this.setPlayerOnGround(otherPreAabb) : 1 === this._isOnHighGround && this._speed.y <= 0 && this._isInAir && selfPreAabb.yMax > otherPreAabb.yMax ? this.setPlayerOnGround(otherPreAabb) : 0 === otherBoxCollider.tag && this._speed.y <= 0 && selfPreAabb.yMin < otherPreAabb.yMax && 0 === otherBoxCollider.tag ? this.setPlayerOnGround(otherPreAabb) : 1 === otherBoxCollider.tag && 1 === this._isOnHighGround && 0 == this._isOnGround && selfPreAabb.yMin < otherPreAabb.yMax && this._speed.y <= 0 && (this._speed.y += 1 * this.gravity / 60));
        this._isInAir = false;
      };
      PlatformPlayer.prototype.setPlayerOnGround = function(otherPreAabb) {
        var boxCollideComponent = this.node.getComponent(cc.BoxCollider);
        this.node.y = otherPreAabb.yMax + boxCollideComponent.size.height / 2;
        this._speed.y = 0;
      };
      PlatformPlayer.prototype.setPlayerOnGroundWhenCollideWithWall = function(otherPreAabb) {
        this.node.y = this.node.y + 100;
        this._speed.y = 0;
      };
      PlatformPlayer.prototype.runAnimation = function(name) {
        var db = this._chimpleNode.getComponent(dragonBones.ArmatureDisplay);
        null != db && db.playAnimation(name, 1);
      };
      PlatformPlayer.prototype.collisionWallEnter = function(other, self) {
        var otherAabb = other.world.aabb;
        var otherPreAabb = other.world.preAabb.clone();
        var selfAabb = self.world.aabb;
        var selfPreAabb = self.world.preAabb.clone();
        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;
        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;
        this._isOnWallContact++;
        this.playChimpAnimation("collide");
        util_1.Util.playSfx(this.wallHitAudio);
        1 === this._isOnHighGround && 0 == this._isOnGround && this._speed.y > 0 && selfPreAabb.yMin < otherPreAabb.yMax && this.setPlayerOnGroundWhenCollideWithWall(otherPreAabb);
      };
      PlatformPlayer.prototype.playChimpAnimation = function(name, loop) {
        void 0 === loop && (loop = 1);
        var armature = this._chimpleNode.getComponent(dragonBones.ArmatureDisplay);
        null != armature && armature.playAnimation(name, loop);
      };
      PlatformPlayer.prototype.consumeQuizzesIfAny = function(other, self) {
        var quizCollect = other.node.getComponent(quiz_collect_1.QuizCollect);
        if (null !== quizCollect && !quizCollect.touched) {
          quizCollect.touched = true;
          platformUtil_1.PlatformUtil.collectQuiz(other.node, this);
        }
      };
      PlatformPlayer.prototype.consumeRewardsIfAny = function(other, self) {
        var rewardCollect = other.node.getComponent(reward_1.Reward);
        if (!!rewardCollect && !rewardCollect.touched) {
          rewardCollect.touched = true;
          var isObstacle = "obstacle" === other.node.group;
          platformUtil_1.PlatformUtil.collectReward(other.node, isObstacle, this);
        }
      };
      PlatformPlayer.prototype.onCollisionEnter = function(other, self) {
        switch (other.node.group) {
         case helper_1.GROUND_GROUP:
          this.collisionGroundEnter(other, self);
          break;

         case helper_1.WALL_GROUP:
          this.collisionWallEnter(other, self);
          break;

         case helper_1.QUIZ_GROUP:
          this.consumeQuizzesIfAny(other, self);
          this.consumeRewardsIfAny(other, self);
          break;

         case helper_1.OBSTACLE_GROUP:
          this.consumeRewardsIfAny(other, self);
        }
      };
      PlatformPlayer.prototype.onCollisionExit = function(other, self) {
        if ("ground" == other.node.group) {
          var otherAabb = other.world.aabb;
          var otherPreAabb = other.world.preAabb.clone();
          var selfAabb = self.world.aabb;
          var selfPreAabb = self.world.preAabb.clone();
          selfPreAabb.x = selfAabb.x;
          otherPreAabb.x = otherAabb.x;
          selfPreAabb.y = selfAabb.y;
          otherPreAabb.y = otherAabb.y;
          var otherBoxCollider = other.node.getComponent(cc.BoxCollider);
          0 === otherBoxCollider.tag && this._speed.y <= 0 && selfPreAabb.yMax < otherPreAabb.yMax && this.setPlayerOnGround(otherPreAabb);
          0 === otherBoxCollider.tag ? this._isOnGround-- : 1 === otherBoxCollider.tag && this._isOnHighGround--;
          (1 === otherBoxCollider.tag || 0 == otherBoxCollider.tag) && 1 === this._isOnHighGround && !this._isInAir && 0 == this._isOnGround && selfPreAabb.yMax > otherPreAabb.yMax && 0 === this._speed.y && (this._speed.y += 1 * this.gravity / 60);
          this._isInJumpMode = false;
        } else "wall" === other.node.group && this._isOnWallContact--;
      };
      PlatformPlayer.prototype.linearVelocity = function() {
        return null;
      };
      __decorate([ property() ], PlatformPlayer.prototype, "gravity", void 0);
      __decorate([ property() ], PlatformPlayer.prototype, "drag", void 0);
      __decorate([ property() ], PlatformPlayer.prototype, "constSpeed", void 0);
      __decorate([ property() ], PlatformPlayer.prototype, "jumpSpeed", void 0);
      __decorate([ property(cc.AudioClip) ], PlatformPlayer.prototype, "wallHitAudio", void 0);
      __decorate([ property(cc.AudioClip) ], PlatformPlayer.prototype, "jumpAudio", void 0);
      __decorate([ property(cc.AudioClip) ], PlatformPlayer.prototype, "landAudio", void 0);
      __decorate([ property(cc.AudioClip) ], PlatformPlayer.prototype, "collectCorrectAudio", void 0);
      __decorate([ property(cc.AudioClip) ], PlatformPlayer.prototype, "collectWrongAudio", void 0);
      PlatformPlayer = __decorate([ ccclass ], PlatformPlayer);
      return PlatformPlayer;
    }(cc.Component);
    exports.PlatformPlayer = PlatformPlayer;
    cc._RF.pop();
  }, {
    "../../../common/scripts/helper": void 0,
    "../../../common/scripts/util": void 0,
    "./platformUtil": "platformUtil",
    "./quiz-collect": "quiz-collect",
    "./reward": "reward"
  } ],
  platformUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "576f6YXbSFPArQmZAkyder6", "platformUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PlatformUtil = void 0;
    var util_1 = require("../../../common/scripts/util");
    var platformer_1 = require("./platformer");
    var quiz_collect_1 = require("./quiz-collect");
    var reward_1 = require("./reward");
    var assemble_1 = require("./assemble");
    var PlatformUtil = function() {
      function PlatformUtil() {}
      PlatformUtil.collectReward = function(reward, isObstacle, player) {
        var rewardC = reward.getComponent(reward_1.Reward);
        var isAnswerCorrectly = !isObstacle && rewardC.isCorrect();
        if (isAnswerCorrectly) {
          player.playChimpAnimation("collect_correct");
          util_1.Util.playSfx(player.collectCorrectAudio);
        } else {
          player.playChimpAnimation("collect_wrong");
          util_1.Util.playSfx(player.collectWrongAudio);
        }
        if (isObstacle) {
          var assemble = player.node.parent.parent.getComponent(assemble_1.default);
          var rewardsMonitor = assemble.rewardsMonitor;
          !rewardsMonitor || rewardsMonitor.emit(platformer_1.COLLECT_REWARD_EVENT, reward, isAnswerCorrectly);
        } else PlatformUtil.runRewardAnimation(reward, isAnswerCorrectly, player);
      };
      PlatformUtil.collectQuiz = function(quiz, player) {
        var quizCollect = quiz.getComponent(quiz_collect_1.QuizCollect);
        var isAnswerCorrectly = quizCollect.isCorrect();
        if (isAnswerCorrectly) {
          player.playChimpAnimation("collect_correct");
          util_1.Util.playSfx(player.collectCorrectAudio);
        } else {
          player.playChimpAnimation("collect_wrong");
          util_1.Util.playSfx(player.collectWrongAudio);
        }
        PlatformUtil.runQuizAnimation(quiz, isAnswerCorrectly, player);
      };
      PlatformUtil.runQuizAnimation = function(quiz, isAnswerCorrectly, player) {
        var assemble = player.node.parent.parent.getComponent(assemble_1.default);
        var rewardsMonitor = assemble.rewardsMonitor;
        var anim = quiz.getComponent(cc.Animation);
        var clip = isAnswerCorrectly ? "quizcollect_correct" : "quizcollect_wrong";
        var animState = anim.getAnimationState("" + clip);
        animState.wrapMode = cc.WrapMode.Normal;
        anim.on("finished", function(event) {
          !rewardsMonitor || rewardsMonitor.emit(platformer_1.COLLECT_REWARD_EVENT, quiz, isAnswerCorrectly);
        });
        anim.play("" + clip);
      };
      PlatformUtil.runRewardAnimation = function(reward, isAnswerCorrectly, player) {
        var assemble = player.node.parent.parent.getComponent(assemble_1.default);
        var rewardsMonitor = assemble.rewardsMonitor;
        var anim = reward.getComponent(cc.Animation);
        if (isAnswerCorrectly) {
          var clip = "quizcollect_correct";
          var animState = anim.getAnimationState("" + clip);
          animState.wrapMode = cc.WrapMode.Normal;
          anim.play("" + clip);
          player.node.parent.parent.emit("correct");
          !rewardsMonitor || rewardsMonitor.emit(platformer_1.COLLECT_REWARD_EVENT, reward, isAnswerCorrectly);
        } else {
          player.node.parent.parent.emit("wrong");
          !rewardsMonitor || rewardsMonitor.emit(platformer_1.COLLECT_REWARD_EVENT, reward, isAnswerCorrectly);
        }
      };
      return PlatformUtil;
    }();
    exports.PlatformUtil = PlatformUtil;
    cc._RF.pop();
  }, {
    "../../../common/scripts/util": void 0,
    "./assemble": "assemble",
    "./platformer": "platformer",
    "./quiz-collect": "quiz-collect",
    "./reward": "reward"
  } ],
  platformer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dbd095npB5FKqlGItyaYHFK", "platformer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Platformer = exports.COLLECT_REWARD_EVENT = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var config_1 = require("../../../common/scripts/lib/config");
    var PLAYER_Z_INDEX = 100;
    var PLATFORM_ZINDEX = -5;
    var BG_LAST_ZINDEX = -4;
    var BG_ZINDEX = -3;
    var FG_ZINDEX = -2;
    var LAST_HORIZONTAL_PARALLAX_RATIO = .1;
    var BG_HORIZONTAL_PARALLAX_RATIO = .2;
    var FG_HORIZONTAL_PARALLAX_RATIO = .5;
    exports.COLLECT_REWARD_EVENT = "collect_reward_event";
    var Platformer = function(_super) {
      __extends(Platformer, _super);
      function Platformer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bgLast = null;
        _this.bgLayer = null;
        _this.fgLayer = null;
        _this._bgNode = null;
        return _this;
      }
      Platformer.prototype.onLoad = function() {
        this._bgNode = cc.director.getScene().getChildByName(config_1.BG_NAME);
        null == this._bgNode && this.arrangeScene();
      };
      Platformer.prototype.onEnable = function() {
        var physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        var collisionManager = cc.director.getCollisionManager();
      };
      Platformer.prototype.createLayer = function(prefab, zIndex, index) {
        var layer = cc.instantiate(prefab);
        layer.setAnchorPoint(0, 0);
        layer.setPosition(layer.width * index, 0);
        layer.zIndex = zIndex;
        this._bgNode.addChild(layer);
        return layer;
      };
      Platformer.prototype.arrangeScene = function() {
        this._bgNode = new cc.Node();
        this._bgNode.name = config_1.BG_NAME;
        this._bgNode.zIndex = PLATFORM_ZINDEX;
        cc.director.getScene().addChild(this._bgNode);
        cc.game.addPersistRootNode(this._bgNode);
        this.createLayer(this.bgLast, BG_LAST_ZINDEX, 0);
        this.createLayer(this.bgLast, BG_LAST_ZINDEX, 1);
        this.createLayer(this.fgLayer, FG_ZINDEX, 0);
        this.createLayer(this.fgLayer, FG_ZINDEX, 1);
        this.createLayer(this.bgLayer, BG_ZINDEX, 0);
        this.createLayer(this.bgLayer, BG_ZINDEX, 1);
      };
      Platformer.prototype.moveLayers = function(layerNode1, layerNode2, adjustment, delta) {
        layerNode1.x += adjustment * delta;
        layerNode2.x += adjustment * delta;
        layerNode1.x + layerNode1.width < 0 && (layerNode1.x = layerNode2.x + layerNode2.width);
        layerNode2.x + layerNode2.width < 0 && (layerNode2.x = layerNode1.x + layerNode1.width);
      };
      Platformer.prototype.scrollLayersInParallax = function(dt) {
        if (this._bgNode.childrenCount >= 6) {
          this.moveLayers(this._bgNode.children[0], this._bgNode.children[1], LAST_HORIZONTAL_PARALLAX_RATIO, dt);
          this.moveLayers(this._bgNode.children[2], this._bgNode.children[3], BG_HORIZONTAL_PARALLAX_RATIO, dt);
          this.moveLayers(this._bgNode.children[4], this._bgNode.children[5], FG_HORIZONTAL_PARALLAX_RATIO, dt);
        }
      };
      __decorate([ property(cc.Prefab) ], Platformer.prototype, "bgLast", void 0);
      __decorate([ property(cc.Prefab) ], Platformer.prototype, "bgLayer", void 0);
      __decorate([ property(cc.Prefab) ], Platformer.prototype, "fgLayer", void 0);
      Platformer = __decorate([ ccclass ], Platformer);
      return Platformer;
    }(cc.Component);
    exports.Platformer = Platformer;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0
  } ],
  "player-animations": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "38e2e2+pMpIuriok1CsQmAf", "player-animations");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PlayerAnimations = exports.collide = exports.squash = exports.falling = exports.jump = exports.sad = exports.happy = exports.idle = exports.walking = void 0;
    exports.walking = "walking";
    exports.idle = "idle";
    exports.happy = "happy";
    exports.sad = "sad";
    exports.jump = "jump";
    exports.falling = "falling";
    exports.squash = "squash";
    exports.collide = "collide";
    var PlayerAnimations = function() {
      function PlayerAnimations(player, body, anim) {
        this._player = player;
        this._body = body;
        this._anim = anim;
      }
      PlayerAnimations.prototype.animate = function() {};
      PlayerAnimations.prototype.fallCondition = function() {
        return this._currentAnimState !== exports.jump;
      };
      PlayerAnimations.prototype.reset = function() {
        this._anim.stop();
        this._currentAnimState = null;
      };
      PlayerAnimations.prototype.animState = function(state, isLooped, shouldPlay) {
        void 0 === isLooped && (isLooped = true);
        void 0 === shouldPlay && (shouldPlay = true);
        if (shouldPlay && this._currentAnimState !== state) {
          this._prevAnimState = this._currentAnimState;
          this.reset();
          this._currentAnimState = state;
          var aState = this._anim.play(state);
          if (isLooped) {
            aState.wrapMode = cc.WrapMode.Loop;
            aState.repeatCount = Infinity;
          }
        }
      };
      Object.defineProperty(PlayerAnimations.prototype, "currentAnimState", {
        get: function() {
          return this._currentAnimState;
        },
        set: function(state) {
          this._currentAnimState = state;
        },
        enumerable: false,
        configurable: true
      });
      return PlayerAnimations;
    }();
    exports.PlayerAnimations = PlayerAnimations;
    cc._RF.pop();
  }, {} ],
  "quiz-collect": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6d0cerR9Z9Hvqmk6Uykd0Je", "quiz-collect");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.QuizCollect = void 0;
    var ccclass = cc._decorator.ccclass;
    var QuizCollect = function(_super) {
      __extends(QuizCollect, _super);
      function QuizCollect() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._touched = false;
        _this._text = null;
        _this._correctAnswers = null;
        return _this;
      }
      QuizCollect.prototype.onLoad = function() {};
      QuizCollect.prototype.start = function() {};
      Object.defineProperty(QuizCollect.prototype, "correctAnswers", {
        get: function() {
          return this._correctAnswers;
        },
        set: function(answer) {
          this._correctAnswers = JSON.parse(JSON.stringify(answer));
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(QuizCollect.prototype, "text", {
        get: function() {
          return this._text;
        },
        set: function(text) {
          this._text = text;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(QuizCollect.prototype, "touched", {
        get: function() {
          return this._touched;
        },
        set: function(touched) {
          this._touched = touched;
        },
        enumerable: false,
        configurable: true
      });
      QuizCollect.prototype.isCorrect = function() {
        return this._correctAnswers.includes(this._text[0]);
      };
      QuizCollect = __decorate([ ccclass ], QuizCollect);
      return QuizCollect;
    }(cc.Component);
    exports.QuizCollect = QuizCollect;
    cc._RF.pop();
  }, {} ],
  rewardsMonitor: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "344069cbT1LiImfiMJP5MI3", "rewardsMonitor");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ALL_REWARDS_COLLECTED = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var Vec2 = cc.Vec2;
    var HorizontalAlign = cc.Label.HorizontalAlign;
    var VerticalAlign = cc.Label.VerticalAlign;
    var platformer_1 = require("../../platform/scripts/platformer");
    var config_1 = require("../../../common/scripts/lib/config");
    var util_1 = require("../../../common/scripts/util");
    exports.ALL_REWARDS_COLLECTED = "ALL_REWARDS_COLLECTED";
    var RewardsMonitor = function(_super) {
      __extends(RewardsMonitor, _super);
      function RewardsMonitor() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.incomplete = null;
        _this.rewardImageNode = null;
        _this.alphabetCollectMode = false;
        _this.shadowImage = null;
        _this.alphabetToCollect = "";
        _this.totalItems = 0;
        return _this;
      }
      RewardsMonitor.prototype.onLoad = function() {
        var _this = this;
        var flow = config_1.default.getInstance().flow;
        this.totalItems = flow === config_1.Flow.Open ? 1 : 3;
        this.node.on(platformer_1.COLLECT_REWARD_EVENT, function(collectedItem, isAnsweredCorrectly) {
          isAnsweredCorrectly ? _this.collectItem(collectedItem) : _this.removeItem(collectedItem);
        });
        for (var index = 1; index <= this.totalItems; index++) {
          var node = new cc.Node();
          this.alphabetCollectMode ? this.createRewardLabel(node, index) : this.createRewardStar(node, index);
          this.node.addChild(node);
        }
      };
      RewardsMonitor.prototype.createRewardStar = function(node, index) {
        node.name = index.toString();
        var spriteNode = cc.instantiate(this.rewardImageNode);
        spriteNode.scale = .5;
        spriteNode.name = "sprite";
        spriteNode.group = "gameCamera";
        node.addChild(spriteNode);
        var sprite = spriteNode.getComponent(cc.Sprite);
        sprite.spriteFrame = !this.shadowImage ? this.incomplete : this.shadowImage;
        node.width = spriteNode.width;
        node.height = spriteNode.height;
      };
      RewardsMonitor.prototype.createRewardLabel = function(node, index) {
        node.name = index.toString();
        var labelNode = util_1.Util.initText(node, null, this.alphabetToCollect, "40", null, true, new Vec2(-5.5, 10), HorizontalAlign.CENTER, VerticalAlign.CENTER, new cc.Vec2(.5, .5), true, 2);
        labelNode.group = "gameCamera";
        node.width = 50;
        node.height = labelNode.height;
      };
      RewardsMonitor.prototype.removeItem = function(item) {
        var rewardsItems = [].concat(this.node.children.filter(function(c) {
          return 2 === c.children.length;
        })).length;
        item.removeFromParent(false);
        if (0 === rewardsItems) return;
        var currentNode = this.node.getChildByName(rewardsItems.toString());
        currentNode.removeAllChildren(false);
        this.alphabetCollectMode ? this.createRewardLabel(currentNode, rewardsItems) : this.createRewardStar(currentNode, rewardsItems);
        rewardsItems--;
      };
      RewardsMonitor.prototype.collectLabel = function(item) {
        var labelItems = [].concat(this.node.children.filter(function(c) {
          return 2 === c.children.length;
        })).length;
        labelItems++;
        var currentNode = this.node.getChildByName(labelItems.toString());
        if (null !== currentNode) {
          var worldPos = item.convertToWorldSpaceAR(new cc.Vec2(0, 0));
          var itemPos = currentNode.convertToNodeSpaceAR(worldPos);
          item.removeFromParent();
          currentNode.addChild(item);
          item.setPosition(itemPos);
          this.smoothLabel(item, labelItems);
        }
      };
      RewardsMonitor.prototype.collectReward = function(item) {
        var rewardsItems = [].concat(this.node.children.filter(function(c) {
          return 2 === c.children.length;
        })).length;
        rewardsItems++;
        var currentNode = this.node.getChildByName(rewardsItems.toString());
        if (null != currentNode) {
          item.children.forEach(function(c) {
            return c.group = "gameCamera";
          });
          var currentSpriteNode = currentNode.getChildByName("sprite");
          item.width = currentSpriteNode.width;
          item.height = currentSpriteNode.height;
          item.scale = .5;
          item.opacity = 255;
          item.group = "gameCamera";
          var worldPos = item.convertToWorldSpaceAR(new cc.Vec2(0, 0));
          var itemPos = currentNode.convertToNodeSpaceAR(worldPos);
          item.removeFromParent();
          currentNode.addChild(item);
          item.setPosition(itemPos);
          this.smoothPath(item, currentNode);
        } else {
          item.opacity = 0;
          item.removeFromParent(false);
        }
      };
      RewardsMonitor.prototype.collectItem = function(item) {
        this.alphabetCollectMode ? this.collectLabel(item) : this.collectReward(item);
      };
      RewardsMonitor.prototype.smoothLabel = function(item, labelItemIndex) {
        var _this = this;
        item.runAction(cc.sequence([ cc.bezierTo(1, [ cc.v2(item.x + 200, item.y - 200), cc.v2(item.x + 400, item.y - 400), new cc.Vec2(0, 0) ]), cc.callFunc(function() {
          item.active = 0;
          item.opacity = 0;
          var childIndex = labelItemIndex;
          var currentNode = _this.node.getChildByName(childIndex.toString());
          if (null != currentNode) {
            var labelNode = currentNode.getChildByName(_this.alphabetToCollect);
            !labelNode || (labelNode.color = cc.Color.BLUE);
          }
          var labelsCollected = [].concat(_this.node.children.filter(function(c) {
            return 2 === c.children.length;
          })).length;
          labelsCollected === _this.totalItems && _this.node.emit(exports.ALL_REWARDS_COLLECTED);
        }) ]));
      };
      RewardsMonitor.prototype.smoothPath = function(item, parent) {
        var _this = this;
        item.runAction(cc.sequence([ cc.bezierTo(1, [ cc.v2(item.x - 200, item.y - 200), cc.v2(item.x + 200, item.y - 200), new cc.Vec2(0, 0) ]), cc.callFunc(function() {
          item.x = 0;
          item.y = 16;
          var rewardsCollected = [].concat(_this.node.children.filter(function(c) {
            return 2 === c.children.length;
          })).length;
          rewardsCollected === _this.totalItems && _this.node.emit(exports.ALL_REWARDS_COLLECTED);
        }) ]));
      };
      __decorate([ property(cc.SpriteFrame) ], RewardsMonitor.prototype, "incomplete", void 0);
      __decorate([ property(cc.Prefab) ], RewardsMonitor.prototype, "rewardImageNode", void 0);
      RewardsMonitor = __decorate([ ccclass ], RewardsMonitor);
      return RewardsMonitor;
    }(cc.Component);
    exports.default = RewardsMonitor;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/util": void 0,
    "../../platform/scripts/platformer": "platformer"
  } ],
  reward: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9c1bah8ilxKzohciiCbYfCQ", "reward");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Reward = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var Vec2 = cc.Vec2;
    var helper_1 = require("../../../common/scripts/helper");
    var Reward = function(_super) {
      __extends(Reward, _super);
      function Reward() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.r1 = null;
        _this.r2 = null;
        _this.r3 = null;
        _this.r4 = null;
        _this.r5 = null;
        _this.r6 = null;
        _this.r7 = null;
        _this.r8 = null;
        _this.r9 = null;
        _this.r10 = null;
        _this.o1 = null;
        _this.o2 = null;
        _this.imageNode = null;
        _this._touched = false;
        _this._rewardNumber = -1;
        _this.correctAnswer = -1;
        return _this;
      }
      Object.defineProperty(Reward.prototype, "touched", {
        get: function() {
          return this._touched;
        },
        set: function(touched) {
          this._touched = touched;
        },
        enumerable: false,
        configurable: true
      });
      Reward.prototype.onLoad = function() {};
      Reward.prototype.loadImage = function(index) {
        this._rewardNumber = index;
        var image = cc.instantiate(this.imageNode);
        image.getComponent(cc.Sprite).spriteFrame = this["r" + index];
        image.setPosition(new Vec2(0, -16));
        this.node.addChild(image);
      };
      Reward.prototype.loadObstacle = function() {
        this.node.group = helper_1.OBSTACLE_GROUP;
        var image = cc.instantiate(this.imageNode);
        image.getComponent(cc.Sprite).spriteFrame = Math.random() > .5 ? this.o1 : this.o2;
        image.setPosition(new Vec2(0, -16));
        this.node.addChild(image);
      };
      Reward.prototype.isCorrect = function() {
        return !!this.correctAnswer && !!this._rewardNumber && this.correctAnswer === this._rewardNumber;
      };
      __decorate([ property(cc.SpriteFrame) ], Reward.prototype, "r1", void 0);
      __decorate([ property(cc.SpriteFrame) ], Reward.prototype, "r2", void 0);
      __decorate([ property(cc.SpriteFrame) ], Reward.prototype, "r3", void 0);
      __decorate([ property(cc.SpriteFrame) ], Reward.prototype, "r4", void 0);
      __decorate([ property(cc.SpriteFrame) ], Reward.prototype, "r5", void 0);
      __decorate([ property(cc.SpriteFrame) ], Reward.prototype, "r6", void 0);
      __decorate([ property(cc.SpriteFrame) ], Reward.prototype, "r7", void 0);
      __decorate([ property(cc.SpriteFrame) ], Reward.prototype, "r8", void 0);
      __decorate([ property(cc.SpriteFrame) ], Reward.prototype, "r9", void 0);
      __decorate([ property(cc.SpriteFrame) ], Reward.prototype, "r10", void 0);
      __decorate([ property(cc.SpriteFrame) ], Reward.prototype, "o1", void 0);
      __decorate([ property(cc.SpriteFrame) ], Reward.prototype, "o2", void 0);
      __decorate([ property(cc.Prefab) ], Reward.prototype, "imageNode", void 0);
      Reward = __decorate([ ccclass ], Reward);
      return Reward;
    }(cc.Component);
    exports.Reward = Reward;
    cc._RF.pop();
  }, {
    "../../../common/scripts/helper": void 0
  } ],
  wait: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2199fsFvd5LapxyeaXXmYoy", "wait");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Wait = function(_super) {
      __extends(Wait, _super);
      function Wait() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Wait.prototype.onBeginContact = function(contact, selfCollider, otherCollider) {
        this.node.emit("waitStart");
      };
      Wait = __decorate([ ccclass ], Wait);
      return Wait;
    }(cc.Component);
    exports.default = Wait;
    cc._RF.pop();
  }, {} ]
}, {}, [ "assemble", "base-level", "camera-movement", "level", "obstacle", "one-side-platform", "platform-player", "platformUtil", "platformer", "player-animations", "quiz-collect", "reward", "rewardsMonitor", "wait" ]);