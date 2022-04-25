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
  "clear-script": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1db42t4HblISpwbpKmB7ohD", "clear-script");
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
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var answer_grid_1 = require("../../../common/scripts/answer-grid");
    var ClearScript = function(_super) {
      __extends(ClearScript, _super);
      function ClearScript() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.oneByOne = true;
        return _this;
      }
      ClearScript.prototype.onButtonClick = function(event, customEventData) {
        var customEvent = new cc.Event.EventCustom(answer_grid_1.CLEAR_BUTTON_CLICKED, true);
        customEvent.setUserData({
          oneByOne: this.oneByOne
        });
        this.node.dispatchEvent(customEvent);
      };
      __decorate([ property ], ClearScript.prototype, "oneByOne", void 0);
      __decorate([ error_handler_1.default() ], ClearScript.prototype, "onButtonClick", null);
      ClearScript = __decorate([ ccclass ], ClearScript);
      return ClearScript;
    }(cc.Component);
    exports.default = ClearScript;
    cc._RF.pop();
  }, {
    "../../../common/scripts/answer-grid": void 0,
    "../../../common/scripts/lib/error-handler": void 0
  } ],
  "confirm-script": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "39b03+IG5xB1rI0A9kPqHyX", "confirm-script");
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
    var ccclass = cc._decorator.ccclass;
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var answer_grid_1 = require("../../../common/scripts/answer-grid");
    var ConfirmScript = function(_super) {
      __extends(ConfirmScript, _super);
      function ConfirmScript() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ConfirmScript.prototype.onButtonClick = function(event, customEventData) {
        var customEvent = new cc.Event.EventCustom(answer_grid_1.CONFIRM_BUTTON_CLICKED, true);
        this.node.dispatchEvent(customEvent);
      };
      __decorate([ error_handler_1.default() ], ConfirmScript.prototype, "onButtonClick", null);
      ConfirmScript = __decorate([ ccclass ], ConfirmScript);
      return ConfirmScript;
    }(cc.Component);
    exports.default = ConfirmScript;
    cc._RF.pop();
  }, {
    "../../../common/scripts/answer-grid": void 0,
    "../../../common/scripts/lib/error-handler": void 0
  } ],
  "counting-item": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c7c53vOy8hLp7eh3941D851", "counting-item");
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
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var util_1 = require("../../../common/scripts/util");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var CountingItem = function(_super) {
      __extends(CountingItem, _super);
      function CountingItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.loadAudio = null;
        _this.touchAudio = null;
        _this.countingComponent = null;
        _this.isBranches = false;
        _this._count = null;
        return _this;
      }
      CountingItem.prototype.onLoad = function() {
        this.registerTouch();
        this.hideLabel();
      };
      CountingItem.prototype.showLabel = function(text) {
        var imageNode = this.node.getChildByName("imageNode");
        if (!!imageNode) {
          imageNode.opacity = 255;
          var labelNode = imageNode.getChildByName("labelNode");
          labelNode.color = new cc.Color().fromHEX("#654321");
          var label = labelNode.getComponent(cc.Label);
          var textL = this.countingComponent.currentConfig.numberpads[text] || text;
          var outLine = labelNode.addComponent(cc.LabelOutline);
          outLine.width = 2;
          label.string = textL;
        }
      };
      CountingItem.prototype.hideLabel = function() {
        var imageNode = this.node.getChildByName("imageNode");
        !imageNode || (imageNode.opacity = 0);
      };
      CountingItem.prototype.playLoadingSound = function() {
        try {
          !this.loadAudio || util_1.Util.playSfx(this.loadAudio);
        } catch (e) {}
      };
      CountingItem.prototype.onTouchStart = function(touch) {
        try {
          this.count();
        } catch (e) {}
      };
      CountingItem.prototype.bringToFront = function() {
        this._originZIndex = this.node.zIndex;
        this.node.zIndex = 100;
      };
      CountingItem.prototype.sendBack = function() {
        this.node.zIndex = this._originZIndex;
      };
      CountingItem.prototype.reCount = function() {
        this._count = null;
        this.count();
        this.sendBack();
      };
      CountingItem.prototype.count = function() {
        try {
          !this.touchAudio || util_1.Util.playSfx(this.touchAudio);
          this.bringToFront();
          if (null === this._count) {
            this._count = this.countingComponent.updateCount(this.isBranches ? 5 : 1);
            this.showLabel(String(this._count));
          }
        } catch (e) {}
      };
      CountingItem.prototype.onTouchEnd = function(touch) {
        this.sendBack();
      };
      CountingItem.prototype.registerTouch = function() {
        this.node.on("touchstart", this.onTouchStart, this);
        this.node.on("touchend", this.onTouchEnd, this);
        this.node.on("touchcancel", this.onTouchEnd, this);
      };
      CountingItem.prototype.unregisterTouch = function() {
        this.node.off("touchstart", this.onTouchStart, this);
        this.node.off("touchend", this.onTouchEnd, this);
        this.node.off("touchcancel", this.onTouchEnd, this);
      };
      CountingItem.prototype.onDestroy = function() {
        cc.audioEngine.stopAllEffects();
        this.unregisterTouch();
      };
      __decorate([ property(cc.AudioClip) ], CountingItem.prototype, "loadAudio", void 0);
      __decorate([ property(cc.AudioClip) ], CountingItem.prototype, "touchAudio", void 0);
      __decorate([ error_handler_1.default() ], CountingItem.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], CountingItem.prototype, "showLabel", null);
      __decorate([ error_handler_1.default() ], CountingItem.prototype, "hideLabel", null);
      __decorate([ error_handler_1.default() ], CountingItem.prototype, "playLoadingSound", null);
      __decorate([ error_handler_1.default() ], CountingItem.prototype, "reCount", null);
      __decorate([ error_handler_1.default() ], CountingItem.prototype, "count", null);
      CountingItem = __decorate([ ccclass ], CountingItem);
      return CountingItem;
    }(cc.Component);
    exports.default = CountingItem;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0
  } ],
  total: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "84d22OfiahGMrOGwaiLgxHi", "total");
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
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var config_1 = require("../../../common/scripts/lib/config");
    var util_1 = require("../../../common/scripts/util");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var counting_answer_1 = require("../../../common/scripts/counting-answer");
    var counting_item_1 = require("./counting-item");
    var answer_grid_1 = require("../../../common/scripts/answer-grid");
    var game_1 = require("../../../common/scripts/game");
    var Total = function(_super) {
      __extends(Total, _super);
      function Total() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.layoutPrefab = null;
        _this.countingAnswerPrefab = null;
        _this.countingQuestionPrefab = null;
        _this.stone1Prefab = null;
        _this.stone2Prefab = null;
        _this.stone3Prefab = null;
        _this.stone4Prefab = null;
        _this.stone5Prefab = null;
        _this.branch1Prefab = null;
        _this.branchesPrefab = null;
        _this._layout = null;
        _this._countingQuestion = null;
        _this._countingAnswer = null;
        _this._currentConfig = null;
        _this._stoneTypes = [ "stone1", "stone2", "stone3", "stone4", "stone5" ];
        _this._randomPositions = [];
        _this._currentCount = 0;
        _this._totalCount = null;
        _this._answeredCorrectly = false;
        _this._recountInProgress = false;
        return _this;
      }
      Total.prototype.onLoad = function() {
        var _this = this;
        this._currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
        this._layout = cc.instantiate(this.layoutPrefab);
        this._totalCount = !this._currentConfig.stoneCount || this._currentConfig.stoneCount === this._currentConfig.numberpads[0] ? !this._currentConfig.tallyCount || this._currentConfig.tallyCount === this._currentConfig.numberpads[0] ? null : this._currentConfig.tallyCount : this._currentConfig.stoneCount;
        this.setUpLayout();
        this.node.addChild(this._layout);
        this.node.on(counting_answer_1.VALIDATE_RESULT, function(event) {
          event.stopPropagation();
          var data = event.getUserData();
          var matchCount = _this._totalCount;
          if (_this._answeredCorrectly || !data.result || data.result !== matchCount) {
            if (!_this._answeredCorrectly) {
              _this._countingAnswer.getComponent(counting_answer_1.default).isValidResult = false;
              _this.wrongAnimations();
            }
          } else {
            _this._answeredCorrectly = true;
            _this._countingAnswer.getComponent(counting_answer_1.default).isValidResult = true;
            _this.correctAnimations();
          }
        });
        this.node.on(answer_grid_1.HELP_BTN, function(event) {
          event.stopPropagation();
          var data = event.getUserData();
          _this.showHelp(_this.helpIterator(data.helpNodes), true);
        });
      };
      Total.prototype.helpIterator = function(helpNodes) {
        return helpNodes[Symbol.iterator]();
      };
      Total.prototype.showHelp = function(helpIterator, playAudio) {
        var _this = this;
        var nextItem = helpIterator.next();
        nextItem.done || util_1.Util.showHelp(nextItem.value, nextItem.value, function() {
          _this.showHelp(helpIterator, false);
        }, playAudio);
      };
      Total.prototype.correctAnimations = function() {
        var _this = this;
        try {
          this.friend.speakEquation([ String(this._totalCount) ], function(index) {
            _this.node.emit("correct");
            _this.node.emit("nextProblem");
          });
        } catch (e) {
          this.node.emit("nextProblem");
        }
      };
      Total.prototype.wrongAnimations = function() {
        var _this = this;
        this.node.emit("wrong");
        this._countingAnswer.getComponent(counting_answer_1.default).clearDigits(false);
        this.scheduleOnce(function() {
          _this.reCount();
        }, .25);
      };
      Total.prototype.hideItems = function() {
        this._countingQuestion.children.forEach(function(n, i) {
          var itemComponent = n.getComponent(counting_item_1.default);
          itemComponent.hideLabel();
        });
      };
      Total.prototype.reCount = function() {
        var _this = this;
        if (!this._recountInProgress) {
          this.hideItems();
          this._recountInProgress = true;
          this.currentCount = 0;
          this._countingQuestion.children.forEach(function(n, i) {
            new cc.Tween().target(n).to(.5 + .2 * i, {
              opacity: 255
            }, null).call(function() {
              var itemComponent = n.getComponent(counting_item_1.default);
              itemComponent.reCount();
            }).call(function() {
              _this._countingQuestion.children.length - 1 === i && (_this._recountInProgress = false);
            }).start();
          });
        }
      };
      Total.prototype.setUpLayout = function() {
        this._countingQuestion = cc.instantiate(this.countingQuestionPrefab);
        this._countingQuestion.height = cc.winSize.height;
        this._layout.addChild(this._countingQuestion);
        this.addStonesOrBranches();
        this._countingAnswer = cc.instantiate(this.countingAnswerPrefab);
        var countingAnswerComponent = this._countingAnswer.getComponent(counting_answer_1.default);
        countingAnswerComponent.numberpads = this._currentConfig.numberpads;
        countingAnswerComponent.result = this._totalCount;
        this._layout.addChild(this._countingAnswer);
      };
      Total.prototype.addStonesOrBranches = function() {
        if (!!this._currentConfig.stoneCount && this._currentConfig.stoneCount !== this._currentConfig.numberpads[0] && this._currentConfig.stoneCount.length > 0) {
          this._randomPositions = util_1.Util.generatePositionsArray(this._countingQuestion.width, this._countingQuestion.height - 20, 100, 30);
          this.createStones(Number(this._currentConfig.stoneCount));
          this.animate(Number(this._currentConfig.stoneCount));
        } else if (!!this._currentConfig.tallyCount && this._currentConfig.tallyCount.length > 0) {
          var fives = Math.floor(Number(this._currentConfig.tallyCount) / 5);
          var singles = Number(this._currentConfig.tallyCount) % 5;
          this._randomPositions = util_1.Util.generatePositionsArray(this._countingQuestion.width - 40, this._countingQuestion.height - 40, 150, 50);
          this.createBranches(fives, singles);
          this.animate(fives + singles);
        }
      };
      Total.prototype.createStones = function(count) {
        for (var i = 0; i < count; i++) {
          var stoneType = this._stoneTypes[i % 5];
          var stoneNode = cc.instantiate(this[stoneType + "Prefab"]);
          stoneNode.name = "stone" + i;
          this._countingQuestion.addChild(stoneNode);
          stoneNode.getComponent(counting_item_1.default).countingComponent = this;
          stoneNode.setPosition(new cc.Vec2(this._randomPositions[i].x, cc.winSize.height + 100));
        }
      };
      Total.prototype.animate = function(count) {
        var yAxis = -384;
        var xAxis = 0;
        this._countingQuestion.children.forEach(function(n, i) {
          xAxis++;
          if ("br" == n.name.substr(0, 2)) {
            if (i % 3 == 0) {
              yAxis = yAxis + n.height + 50;
              xAxis = 0;
            }
          } else if (i % 4 == 0) {
            yAxis = yAxis + n.height + 30;
            xAxis = 0;
          }
          new cc.Tween().target(n).to(.5 + .2 * i / 4, {
            position: new cc.Vec2(xAxis * (n.width + 30) - 100, yAxis)
          }, null).call(function() {
            n.getComponent(counting_item_1.default).playLoadingSound();
          }).start();
        });
      };
      Total.prototype.createBranches = function(countBranches, countSingle) {
        for (var i = 0; i < countBranches; i++) {
          var stoneNode = cc.instantiate(this.branchesPrefab);
          stoneNode.name = "branches" + i;
          this._countingQuestion.addChild(stoneNode);
          var itemComponent = stoneNode.getComponent(counting_item_1.default);
          itemComponent.countingComponent = this;
          itemComponent.isBranches = true;
          stoneNode.setPosition(new cc.Vec2(this._randomPositions[i].x, cc.winSize.height + 100));
        }
        for (var i = countBranches; i < countBranches + countSingle; i++) {
          var stoneNode = cc.instantiate(this.branch1Prefab);
          stoneNode.name = "branch" + i;
          this._countingQuestion.addChild(stoneNode);
          stoneNode.getComponent(counting_item_1.default).countingComponent = this;
          stoneNode.setPosition(new cc.Vec2(this._randomPositions[i].x, cc.winSize.height + 100));
        }
      };
      Total.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var level = configurations[0], workSheet = configurations[1], problem = configurations[2], stoneCount = configurations[3], tallyCount = configurations[4], numberpads = configurations[5];
        numberpads = numberpads.split(",");
        return {
          level: level,
          workSheet: workSheet,
          problem: problem,
          stoneCount: stoneCount,
          tallyCount: tallyCount,
          numberpads: numberpads
        };
      };
      Object.defineProperty(Total.prototype, "currentCount", {
        get: function() {
          return this._currentCount;
        },
        set: function(n) {
          this._currentCount = n;
        },
        enumerable: false,
        configurable: true
      });
      Total.prototype.updateCount = function(times) {
        void 0 === times && (times = 1);
        for (var i = 0; i < times; i++) this._currentCount++;
        return this.currentCount;
      };
      Object.defineProperty(Total.prototype, "currentConfig", {
        get: function() {
          return this._currentConfig;
        },
        enumerable: false,
        configurable: true
      });
      __decorate([ property(cc.Prefab) ], Total.prototype, "layoutPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Total.prototype, "countingAnswerPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Total.prototype, "countingQuestionPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Total.prototype, "stone1Prefab", void 0);
      __decorate([ property(cc.Prefab) ], Total.prototype, "stone2Prefab", void 0);
      __decorate([ property(cc.Prefab) ], Total.prototype, "stone3Prefab", void 0);
      __decorate([ property(cc.Prefab) ], Total.prototype, "stone4Prefab", void 0);
      __decorate([ property(cc.Prefab) ], Total.prototype, "stone5Prefab", void 0);
      __decorate([ property(cc.Prefab) ], Total.prototype, "branch1Prefab", void 0);
      __decorate([ property(cc.Prefab) ], Total.prototype, "branchesPrefab", void 0);
      __decorate([ error_handler_1.default() ], Total.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], Total.prototype, "helpIterator", null);
      __decorate([ error_handler_1.default() ], Total.prototype, "showHelp", null);
      __decorate([ error_handler_1.default() ], Total.prototype, "correctAnimations", null);
      __decorate([ error_handler_1.default() ], Total.prototype, "wrongAnimations", null);
      __decorate([ error_handler_1.default() ], Total.prototype, "hideItems", null);
      __decorate([ error_handler_1.default() ], Total.prototype, "reCount", null);
      __decorate([ error_handler_1.default() ], Total.prototype, "setUpLayout", null);
      __decorate([ error_handler_1.default() ], Total.prototype, "addStonesOrBranches", null);
      __decorate([ error_handler_1.default() ], Total.prototype, "createStones", null);
      __decorate([ error_handler_1.default() ], Total.prototype, "animate", null);
      __decorate([ error_handler_1.default() ], Total.prototype, "createBranches", null);
      Total = __decorate([ ccclass ], Total);
      return Total;
    }(game_1.default);
    exports.default = Total;
    cc._RF.pop();
  }, {
    "../../../common/scripts/answer-grid": void 0,
    "../../../common/scripts/counting-answer": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./counting-item": "counting-item"
  } ]
}, {}, [ "clear-script", "confirm-script", "counting-item", "total" ]);