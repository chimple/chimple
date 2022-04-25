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
  "add-button": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4513aTMXchNBpNJlsTFjleg", "add-button");
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
    var blender_1 = require("./blender");
    var property = cc._decorator.property;
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var AddButton = function(_super) {
      __extends(AddButton, _super);
      function AddButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._layout = null;
        _this.placeValueNode = null;
        _this._handleClick = true;
        _this.addClip = null;
        return _this;
      }
      AddButton.prototype.onLoad = function() {
        this._handleClick = true;
        this._layout = this.node.parent.getChildByName("layout");
      };
      AddButton.prototype.check = function() {
        this._handleClick && this.checkIfClickAllowed(this.node, this._layout) ? this.makeInteractable(true) : this.makeInteractable(false);
      };
      AddButton.prototype.onClick = function(event, customEventData) {
        var _this = this;
        try {
          this.check();
          if (this._handleClick && this.addClip) {
            this.makeInteractable(false);
            var placeValue2 = this.placeValueNode.getComponent(blender_1.default);
            this.node.name === blender_1.ADD_BUTTON_HUNDRED ? placeValue2.addToHundredContainer(false) : this.node.name === blender_1.ADD_BUTTON_TEN ? placeValue2.addToTenContainer(false) : this.node.name === blender_1.ADD_BUTTON_ONE && placeValue2.addToOneContainer(false);
            this.scheduleOnce(function() {
              _this.makeInteractable(true);
              cc.audioEngine.playEffect(_this.addClip, false);
              var customEvent = new cc.Event.EventCustom(blender_1.ADDED_PLACE_VALUE_ITEM, true);
              _this.node.dispatchEvent(customEvent);
            }, .05);
          }
        } catch (e) {}
      };
      AddButton.prototype.makeInteractable = function(interactable, gameCompleted) {
        void 0 === gameCompleted && (gameCompleted = false);
        gameCompleted && (interactable = false);
        var butComp = this.node.getComponent(cc.Button);
        if (butComp) {
          butComp.interactable = interactable;
          this._handleClick = interactable;
        }
      };
      AddButton.prototype.hundredCount = function() {
        return this.node.parent.parent.getChildByName(blender_1.BLENDER1_NODE).getChildByName(blender_1.LAYOUT).childrenCount;
      };
      AddButton.prototype.tenCount = function() {
        return this.node.parent.parent.getChildByName(blender_1.BLENDER2_NODE).getChildByName(blender_1.LAYOUT).childrenCount;
      };
      AddButton.prototype.oneCount = function() {
        return this.node.parent.parent.getChildByName(blender_1.BLENDER3_NODE).getChildByName(blender_1.LAYOUT).childrenCount;
      };
      AddButton.prototype.checkIfClickAllowed = function(self, other) {
        return self.name === blender_1.ADD_BUTTON_HUNDRED ? other.children.length < blender_1.MAX_CHILDREN : self.name === blender_1.ADD_BUTTON_TEN ? this.hundredCount() < blender_1.MAX_CHILDREN && other.children.length <= blender_1.MAX_CHILDREN || this.hundredCount() === blender_1.MAX_CHILDREN && other.children.length < blender_1.MAX_CHILDREN : self.name === blender_1.ADD_BUTTON_ONE && (this.hundredCount() === blender_1.MAX_CHILDREN && this.tenCount() === blender_1.MAX_CHILDREN && other.children.length < blender_1.MAX_CHILDREN || (this.hundredCount() < blender_1.MAX_CHILDREN || this.tenCount() < blender_1.MAX_CHILDREN) && other.children.length <= blender_1.MAX_CHILDREN);
      };
      __decorate([ property(cc.AudioClip) ], AddButton.prototype, "addClip", void 0);
      __decorate([ error_handler_1.default() ], AddButton.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], AddButton.prototype, "check", null);
      __decorate([ error_handler_1.default() ], AddButton.prototype, "onClick", null);
      __decorate([ error_handler_1.default() ], AddButton.prototype, "makeInteractable", null);
      __decorate([ error_handler_1.default() ], AddButton.prototype, "hundredCount", null);
      __decorate([ error_handler_1.default() ], AddButton.prototype, "tenCount", null);
      __decorate([ error_handler_1.default() ], AddButton.prototype, "oneCount", null);
      __decorate([ error_handler_1.default() ], AddButton.prototype, "checkIfClickAllowed", null);
      AddButton = __decorate([ ccclass ], AddButton);
      return AddButton;
    }(cc.Component);
    exports.default = AddButton;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/error-handler": void 0,
    "./blender": "blender"
  } ],
  blender: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c59e1Wgl6tDc5EUtmShqDcJ", "blender");
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
    exports.MOVE_IF_NEEDED = exports.ADDED_PLACE_VALUE_ITEM = exports.PLAY_FINAL_ANIMATION = exports.REMOVED_PLACE_VALUE_ITEM = exports.LAND_ONE_COLOR = exports.LAND_ONE_SCALE_Y = exports.LAND_ONE_SCALE_X = exports.LAND_HUNDRED_COLOR = exports.LAND_HUNDRED_SCALE = exports.LAND_TEN_COLOR = exports.LAND_TEN_SCALE_Y = exports.LAND_TEN_SCALE_X = exports.MAX_CHILDREN = exports.LAYOUT = exports.REMOVE_BUTTON_ONE = exports.REMOVE_BUTTON_TEN = exports.REMOVE_BUTTON_HUNDRED = exports.ADD_BUTTON_ONE = exports.ADD_BUTTON_TEN = exports.ADD_BUTTON_HUNDRED = exports.landTen = exports.landOne = exports.landhundred = exports.BLENDER3_NODE = exports.BLENDER2_NODE = exports.BLENDER1_NODE = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var game_1 = require("../../../common/scripts/game");
    var config_1 = require("../../../common/scripts/lib/config");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var util_1 = require("../../../common/scripts/util");
    var add_button_1 = require("./add-button");
    var remove_button_1 = require("./remove-button");
    var chimple_richtext_1 = require("../../../common/scripts/chimple-richtext");
    exports.BLENDER1_NODE = "blender1_node";
    exports.BLENDER2_NODE = "blender2_node";
    exports.BLENDER3_NODE = "blender3_node";
    exports.landhundred = "landHundred";
    exports.landOne = "landOne";
    exports.landTen = "landTen";
    exports.ADD_BUTTON_HUNDRED = "add_button_hundred";
    exports.ADD_BUTTON_TEN = "add_button_ten";
    exports.ADD_BUTTON_ONE = "add_button_one";
    exports.REMOVE_BUTTON_HUNDRED = "remove_button_hundred";
    exports.REMOVE_BUTTON_TEN = "remove_button_ten";
    exports.REMOVE_BUTTON_ONE = "remove_button_one";
    exports.LAYOUT = "layout";
    exports.MAX_CHILDREN = 9;
    var TEXT_BG = "text_bg";
    var LABEL = "label";
    exports.LAND_TEN_SCALE_X = .9;
    exports.LAND_TEN_SCALE_Y = .9;
    exports.LAND_TEN_COLOR = "#00FF2A";
    exports.LAND_HUNDRED_SCALE = .9;
    exports.LAND_HUNDRED_COLOR = "#EAFF00";
    exports.LAND_ONE_SCALE_X = .8;
    exports.LAND_ONE_SCALE_Y = .8;
    exports.LAND_ONE_COLOR = "#42F9FF";
    exports.REMOVED_PLACE_VALUE_ITEM = "REMOVED_PLACE_VALUE_ITEM";
    exports.PLAY_FINAL_ANIMATION = "PLAY_FINAL_ANIMATION";
    exports.ADDED_PLACE_VALUE_ITEM = "ADDED_PLACE_VALUE_ITEM";
    exports.MOVE_IF_NEEDED = "MOVE_IF_NEEDED";
    var Blender = function(_super) {
      __extends(Blender, _super);
      function Blender() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mixturePrefab = null;
        _this.goalPrefab = null;
        _this.landHundredPrefab = null;
        _this.landTenPrefab = null;
        _this.landOnePrefab = null;
        _this.placeLabelPrefab = null;
        _this._currentConfig = null;
        _this._mixture = null;
        _this._placeValueComponent = null;
        _this._hundredTextNode = null;
        _this._tenTextNode = null;
        _this._oneTextNode = null;
        _this._hundredLayoutNode = null;
        _this._tenLayoutNode = null;
        _this._oneLayoutNode = null;
        _this._finalText = 0;
        _this._cup = null;
        _this._collectStarted = false;
        _this._collectedHundred = false;
        _this._collectedTenth = false;
        _this._collectedOne = false;
        _this._landHundredPos = null;
        _this._landTenPos = null;
        _this._landOnePos = null;
        _this.zeroT = util_1.Util.i18NText("0");
        _this.cupText = "<color=#EAFF00><bold>@0<color=#00FF2A><bold>@1</bold></color><color=#42F9FF><bold>@2</bold></color></bold></color>";
        _this.objectives = [];
        _this._helpMode = false;
        _this._helpNodes = [];
        return _this;
      }
      Blender_1 = Blender;
      Blender.prototype.onLoad = function() {
        var _this = this;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this._mixture = cc.instantiate(this.mixturePrefab);
        this._placeValueComponent = this.node.getComponent(Blender_1);
        this._currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
        this.objectives = this._currentConfig.objectNo.split("");
        this.node.on(exports.ADDED_PLACE_VALUE_ITEM, function(event) {
          event.stopPropagation();
          _this.moveIfNeeded();
        });
        this.node.on(exports.REMOVED_PLACE_VALUE_ITEM, function(event) {
          event.stopPropagation();
          _this.moveIfNeeded();
        });
        this.node.on(exports.PLAY_FINAL_ANIMATION, function() {
          _this.playFinishAnimation();
        });
        this._helpMode = true;
        this.createCup();
      };
      Blender.prototype.playFinishAnimation = function() {
        var _this = this;
        if (!this._collectStarted && parseInt(this._currentConfig.objectNo) === this._finalText) {
          this.node.emit("correct");
          this.stopRemoVeFromContainers();
          this.scheduleOnce(function() {
            var anim = _this._mixture.getComponent(cc.Animation);
            if (null !== anim) {
              anim.stop();
              anim.on("finished", function() {
                _this.collectNumbers();
              }, _this);
              anim.play("blending");
            }
          }, 0);
        }
      };
      Blender.prototype.collectNumbers = function() {
        if (!this._collectStarted) {
          this._collectStarted = true;
          this.updateToLabel(this._cup, "", "", null, "#654321", false);
          this.moveCupToNext();
        }
      };
      Blender.prototype.moveCupToNext = function() {
        var _this = this;
        this._collectedHundred ? this._collectedTenth ? this._collectedOne ? this.scheduleOnce(function() {
          var equations = _this.formatFinalTextForSpeak(_this._finalText);
          !!equations && equations.length > 0 ? _this.friend.speakEquation(equations, function(index) {
            if (index + 1 === equations.length) {
              _this._finalText = null;
              _this._collectStarted = false;
              _this.node.emit("nextProblem");
            }
          }) : _this.node.emit("nextProblem");
        }, .5) : this.moveCupToBlender(this._mixture.getChildByName(exports.BLENDER3_NODE), this._oneTextNode, "_collectedOne") : this.moveCupToBlender(this._mixture.getChildByName(exports.BLENDER2_NODE), this._tenTextNode, "_collectedTenth") : this.moveCupToBlender(this._mixture.getChildByName(exports.BLENDER1_NODE), this._hundredTextNode, "_collectedHundred");
      };
      Blender.prototype.formatFinalTextForSpeak = function(finalText) {
        var hundredDigit = Math.floor(finalText / 100);
        var remainingDigit = String(finalText % 100);
        var andOp = "en/" === config_1.default.dir ? "and" : "";
        var equations = [];
        0 !== hundredDigit ? equations.push(String(100 * hundredDigit)) : "";
        !andOp ? "" : equations.push(andOp);
        2 === remainingDigit.length && "00" !== remainingDigit || 1 === remainingDigit.length && "0" !== remainingDigit ? equations.push(remainingDigit) : "";
        return equations;
      };
      Blender.prototype.moveCupToBlender = function(blender, textNode, collected) {
        var _this = this;
        var cupPosition = this.node.convertToNodeSpaceAR(blender.convertToWorldSpaceAR(cc.v3(0, 0)));
        new cc.Tween().target(this._cup).to(1, {
          position: new cc.Vec2(cupPosition.x, this._cup.position.y)
        }, {
          progress: null,
          easing: "quadOut"
        }).call(function() {
          var oldWorPos = textNode.convertToWorldSpaceAR(cc.v3(0, 0));
          var newLocPos = _this.node.convertToNodeSpaceAR(oldWorPos);
          textNode.removeFromParent(false);
          _this.node.addChild(textNode);
          textNode.setPosition(newLocPos);
          new cc.Tween().target(textNode).to(1, {
            position: new cc.Vec2(textNode.position.x, textNode.position.y + 140)
          }, {
            progress: null,
            easing: "quadOut"
          }).to(.25, {
            opacity: 0
          }, null).call(function() {
            var animation = _this._cup.getComponent(cc.Animation);
            animation.on("glass_filling", function(event) {});
            animation.play();
          }).call(function() {
            var result = _this.labelValue(textNode);
            var text = [];
            if ("_collectedHundred" === collected) {
              text.push(String(Number(_this.objectives[0])));
              text.push("100");
            } else if ("_collectedTenth" === collected) {
              text.push(String(Number(_this.objectives[1])));
              text.push("10");
            } else if ("_collectedOne" === collected) {
              text.push(String(Number(_this.objectives[2])));
              text.push("1");
            }
            _this.replaceCupText(_this._cup, text, result, function() {
              _this["" + collected] = true;
              _this.moveCupToNext();
            });
          }).start();
        }).start();
      };
      Blender.prototype.labelValue = function(node) {
        var result = null;
        var placeLabel = node.getChildByName("placeLabel");
        if (null !== placeLabel) {
          var labelNode = placeLabel.getChildByName("label");
          if (null !== labelNode) {
            var labelComponent = labelNode.getComponent(chimple_richtext_1.default);
            result = labelComponent.string.replace(/<\/?[^>]+(>|$)/g, "") || "";
          }
        }
        return result;
      };
      Blender.prototype.stopRemoVeFromContainers = function() {
        var blender1 = this._mixture.getChildByName(exports.BLENDER1_NODE);
        var blender2 = this._mixture.getChildByName(exports.BLENDER2_NODE);
        var blender3 = this._mixture.getChildByName(exports.BLENDER3_NODE);
        [ blender1, blender2, blender3 ].forEach(function(b, i) {
          var childName = 0 == i ? exports.ADD_BUTTON_HUNDRED : 1 == i ? exports.ADD_BUTTON_TEN : exports.ADD_BUTTON_ONE;
          var b1 = b.getChildByName(childName);
          var adb = b1.getComponent(add_button_1.default);
          adb.makeInteractable(false);
          childName = 0 == i ? exports.REMOVE_BUTTON_HUNDRED : 1 == i ? exports.REMOVE_BUTTON_TEN : exports.REMOVE_BUTTON_ONE;
          var b2 = b.getChildByName(childName);
          var adb2 = b2.getComponent(remove_button_1.default);
          adb2.makeInteractable(false);
        });
      };
      Blender.prototype.createCup = function() {
        var _this = this;
        this._cup = cc.instantiate(this.goalPrefab);
        this.node.addChild(this._cup);
        this._cup.scale = 2.25;
        var texts = String(Number(this._currentConfig.objectNo)).split("").map(function(c, i) {
          return "0" !== c && String(Number(c) * Math.pow(10, 2 - i));
        });
        this.replaceCupText(this._cup, [ String(Number(this._currentConfig.objectNo)) ], util_1.Util.i18NNumberConvert(String(this._currentConfig.objectNo)), function() {
          _this.moveCup();
        });
      };
      Blender.prototype.replaceCupText = function(node, text, convertedString, callBack) {
        void 0 === callBack && (callBack = Function = null);
        var tokens = convertedString.split("");
        var displayText = this.cupText;
        if (3 === tokens.length) for (var i = 0; i <= tokens.length - 1; i++) {
          displayText = displayText.replace("@" + i, tokens[i]);
          0 === i && (this.cupText = this.cupText.replace("@" + i, tokens[i]));
        } else if (2 === tokens.length) for (var i = 0; i <= tokens.length - 1; i++) {
          displayText = displayText.replace("@" + (i + 1), tokens[i]);
          0 === i && (this.cupText = this.cupText.replace("@" + (i + 1), tokens[i]));
        } else if (1 === tokens.length) for (var i = 0; i <= tokens.length - 1; i++) {
          displayText = displayText.replace("@2", tokens[i]);
          this.cupText = this.cupText.replace("@2", tokens[i]);
        }
        var placeLabel = node.getChildByName("placeLabel");
        if (null !== placeLabel) {
          var labelNode = placeLabel.getChildByName("label");
          if (null !== labelNode) {
            var labelComponent_1 = labelNode.getComponent(chimple_richtext_1.default);
            new cc.Tween().target(labelNode).to(.25, {
              opacity: 0
            }, null).call(function() {
              labelComponent_1.string = displayText;
            }).to(.25, {
              opacity: 255
            }, null).start();
          }
        }
        try {
          this.friend.speakEquation(text, function(index) {
            index + 1 == text.length && (!callBack || callBack());
          });
        } catch (e) {}
      };
      Blender.prototype.moveCup = function() {
        var _this = this;
        new cc.Tween().target(this._cup).parallel(new cc.Tween().to(1, {
          position: new cc.Vec2(100 + 3 * -cc.winSize.width / 8, 5 * cc.winSize.height / 12 + 15)
        }, null), new cc.Tween().to(1, {
          scale: 1
        }, {
          progress: null,
          easing: "backOut"
        })).call(function() {
          var equations = _this.formatFinalTextForSpeak(Number(_this._currentConfig.objectNo));
          !!equations && equations.length > 0 ? _this.friend.speakEquation(equations, function(index) {
            index + 1 === equations.length && _this.scheduleOnce(function() {
              _this.buildScene();
            }, .5);
          }) : "000" !== _this._currentConfig.objectNo && "00" !== _this._currentConfig.objectNo && "0" !== _this._currentConfig.objectNo || _this.scheduleOnce(function() {
            _this.buildScene();
          }, .5);
        }).start();
      };
      Blender.prototype.moveIfNeeded = function() {
        this.oneLayoutAnimate();
        this.tenLayoutAnimate();
      };
      Blender.prototype.oneLayoutAnimate = function() {
        var oneCount = this.oneCount();
        if (oneCount > exports.MAX_CHILDREN) {
          this._oneLayoutNode.removeAllChildren(true);
          this.playTenMoveAnimation();
        } else {
          this.updateText();
          parseInt(this._currentConfig.objectNo) === this._finalText && this.node.emit(exports.PLAY_FINAL_ANIMATION);
        }
      };
      Blender.prototype.tenLayoutAnimate = function() {
        var tenCount = this.tenCount();
        if (tenCount > exports.MAX_CHILDREN) {
          this._tenLayoutNode.removeAllChildren(true);
          this.playHundredMoveAnimation();
        } else {
          this.updateText();
          parseInt(this._currentConfig.objectNo) === this._finalText && this.node.emit(exports.PLAY_FINAL_ANIMATION);
        }
      };
      Blender.prototype.hundredCount = function() {
        return this._mixture.getChildByName(exports.BLENDER1_NODE).getChildByName(exports.LAYOUT).childrenCount;
      };
      Blender.prototype.tenCount = function() {
        return this._mixture.getChildByName(exports.BLENDER2_NODE).getChildByName(exports.LAYOUT).childrenCount;
      };
      Blender.prototype.oneCount = function() {
        return this._mixture.getChildByName(exports.BLENDER3_NODE).getChildByName(exports.LAYOUT).childrenCount;
      };
      Blender.prototype.updateText = function() {
        var hundredNumber = 0 === this._hundredLayoutNode.childrenCount ? "000" : String(100 * this._hundredLayoutNode.childrenCount);
        this.updateToLabel(this._hundredTextNode, hundredNumber, hundredNumber, null, exports.LAND_HUNDRED_COLOR);
        var tenNumber = this._tenLayoutNode.childrenCount > 9 ? "00" : 0 === this._tenLayoutNode.childrenCount ? "00" : String(10 * this._tenLayoutNode.childrenCount);
        this.updateToLabel(this._tenTextNode, tenNumber, tenNumber, null, exports.LAND_TEN_COLOR);
        var oneNumber = String(1 * this._oneLayoutNode.childrenCount);
        this.updateToLabel(this._oneTextNode, oneNumber, oneNumber, null, exports.LAND_ONE_COLOR);
        this._finalText = Number(100 * this._hundredLayoutNode.childrenCount + 10 * this._tenLayoutNode.childrenCount + 1 * this._oneLayoutNode.childrenCount);
      };
      Blender.prototype.updateToLabel = function(node, text, displayText, formatted, color, shouldAlwaysSpeak) {
        void 0 === formatted && (formatted = null);
        void 0 === color && (color = null);
        void 0 === shouldAlwaysSpeak && (shouldAlwaysSpeak = false);
        var placeLabel = node.getChildByName("placeLabel");
        var speakText = text;
        displayText = util_1.Util.i18NNumberConvert(displayText);
        formatted ? displayText = formatted : !color || (displayText = "<color=" + color + "><bold>" + displayText + "</bold></color>");
        if (null !== placeLabel) {
          var labelNode = placeLabel.getChildByName("label");
          if (null !== labelNode) {
            var labelComponent_2 = labelNode.getComponent(chimple_richtext_1.default);
            var eStr = labelComponent_2.string;
            var zeroT = util_1.Util.i18NText(this.zeroT);
            var allZeros = speakText.startsWith(zeroT) && speakText.endsWith(zeroT);
            if (!!speakText && !isNaN(Number(speakText)) && eStr !== displayText && (!allZeros || shouldAlwaysSpeak)) try {
              this.friend.speakEquation([ speakText ], function(index) {});
            } catch (e) {}
            eStr !== displayText && new cc.Tween().target(labelNode).to(.25, {
              opacity: 0
            }, null).call(function() {
              labelComponent_2.string = displayText;
            }).to(.25, {
              opacity: 255
            }, null).start();
          }
        }
      };
      Blender.prototype.buildScene = function() {
        var _this = this;
        this._mixture.setPosition(new cc.Vec2(-125, -25));
        this.node.addChild(this._mixture);
        var blender1 = this._mixture.getChildByName(exports.BLENDER1_NODE);
        var blender2 = this._mixture.getChildByName(exports.BLENDER2_NODE);
        var blender3 = this._mixture.getChildByName(exports.BLENDER3_NODE);
        var hundredLabelNode = blender1.getChildByName(LABEL);
        hundredLabelNode.getComponent(cc.Label).string = util_1.Util.i18NText("hundred");
        var tenLabelNode = blender2.getChildByName(LABEL);
        tenLabelNode.getComponent(cc.Label).string = util_1.Util.i18NText("ten");
        var oneLabelNode = blender3.getChildByName(LABEL);
        oneLabelNode.getComponent(cc.Label).string = util_1.Util.i18NText("one");
        this._hundredTextNode = blender1.getChildByName(TEXT_BG);
        this._tenTextNode = blender2.getChildByName(TEXT_BG);
        this._oneTextNode = blender3.getChildByName(TEXT_BG);
        this._hundredLayoutNode = blender1.getChildByName(exports.LAYOUT);
        this._tenLayoutNode = blender2.getChildByName(exports.LAYOUT);
        this._oneLayoutNode = blender3.getChildByName(exports.LAYOUT);
        [ blender1, blender2, blender3 ].forEach(function(b, i) {
          var childName = 0 == i ? exports.ADD_BUTTON_HUNDRED : 1 == i ? exports.ADD_BUTTON_TEN : exports.ADD_BUTTON_ONE;
          var b1 = b.getChildByName(childName);
          var adb = b1.getComponent(add_button_1.default);
          adb.placeValueNode = _this.node;
        });
        var hundredNumber = 0 === Number(this._currentConfig.suggestHundredDigit) ? "000" : String(100 * Number(this._currentConfig.suggestHundredDigit));
        this.buildContainer(this._mixture.getChildByName(exports.BLENDER1_NODE), hundredNumber, Number(this._currentConfig.suggestHundredDigit), this.landHundredPrefab, exports.landhundred, exports.LAND_HUNDRED_SCALE, exports.LAND_HUNDRED_SCALE, exports.LAND_HUNDRED_COLOR);
        var tenNumber = 0 === Number(this._currentConfig.suggestTenthDigit) ? "00" : String(10 * Number(this._currentConfig.suggestTenthDigit));
        this.buildContainer(this._mixture.getChildByName(exports.BLENDER2_NODE), tenNumber, Number(this._currentConfig.suggestTenthDigit), this.landTenPrefab, exports.landTen, exports.LAND_TEN_SCALE_X, exports.LAND_TEN_SCALE_Y, exports.LAND_TEN_COLOR);
        var oneNumber = 0 === Number(this._currentConfig.suggestZerothDigit) ? "0" : String(1 * Number(this._currentConfig.suggestZerothDigit));
        this.buildContainer(this._mixture.getChildByName(exports.BLENDER3_NODE), oneNumber, Number(this._currentConfig.suggestZerothDigit), this.landOnePrefab, exports.landOne, exports.LAND_ONE_SCALE_X, exports.LAND_ONE_SCALE_Y, exports.LAND_ONE_COLOR);
        this.scheduleOnce(function() {
          util_1.Util.showHelp(null, null);
        }, .5);
      };
      Blender.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var level = configurations[0], workSheet = configurations[1], problem = configurations[2], objectNo = configurations[3], suggestNo = configurations[4];
        objectNo = 1 === objectNo.length ? "00" + objectNo : 2 === objectNo.length ? "0" + objectNo : objectNo;
        suggestNo = 1 === suggestNo.length ? "00" + suggestNo : 2 === suggestNo.length ? "0" + suggestNo : suggestNo;
        var _a = suggestNo.split(""), suggestHundredDigit = _a[0], suggestTenthDigit = _a[1], suggestZerothDigit = _a[2];
        return {
          level: level,
          workSheet: workSheet,
          problem: problem,
          objectNo: objectNo,
          suggestNo: suggestNo,
          suggestHundredDigit: suggestHundredDigit,
          suggestTenthDigit: suggestTenthDigit,
          suggestZerothDigit: suggestZerothDigit
        };
      };
      Blender.prototype.playTenMoveAnimation = function() {
        var _this = this;
        var tenNode = this.createFromPrefab(this.landTenPrefab, exports.LAND_TEN_SCALE_X, exports.LAND_TEN_SCALE_Y);
        var blender2 = this._mixture.getChildByName(exports.BLENDER2_NODE);
        var blender3 = this._mixture.getChildByName(exports.BLENDER3_NODE);
        var pos = this.node.convertToNodeSpaceAR(blender3.getPosition());
        tenNode.setPosition(pos.x + blender3.width - 25 + blender2.width / 2, pos.y + blender3.height - 150);
        this.node.addChild(tenNode);
        new cc.Tween().target(tenNode).to(1, {
          opacity: 255
        }, null).to(1, {
          position: new cc.Vec2(tenNode.position.x - blender3.width + 25 - blender2.width / 2, tenNode.position.y)
        }, {
          progress: null,
          easing: "quadOut"
        }).call(function() {
          tenNode.active = false;
          tenNode.removeFromParent(true);
          _this.scheduleOnce(function() {
            _this.addToTenContainer();
            _this.tenLayoutAnimate();
          }, .5);
        }).start();
      };
      Blender.prototype.playHundredMoveAnimation = function() {
        var _this = this;
        var hundredNode = this.createFromPrefab(this.landHundredPrefab, exports.LAND_HUNDRED_SCALE, exports.LAND_HUNDRED_SCALE);
        var blender1 = this._mixture.getChildByName(exports.BLENDER1_NODE);
        var blender2 = this._mixture.getChildByName(exports.BLENDER2_NODE);
        var pos = this.node.convertToNodeSpaceAR(blender2.getPosition());
        hundredNode.setPosition(pos.x + blender2.width - 25, pos.y + blender2.height - 100);
        this.node.addChild(hundredNode);
        hundredNode.scale = .6;
        new cc.Tween().target(hundredNode).to(1, {
          opacity: 255
        }, null).to(1, {
          position: new cc.Vec2(hundredNode.position.x - blender1.width / 2 - 50, hundredNode.position.y)
        }, {
          progress: null,
          easing: "quadOut"
        }).call(function() {
          hundredNode.active = false;
          hundredNode.removeFromParent(true);
          _this.scheduleOnce(function() {
            _this.addToHundredContainer();
          }, .5);
        }).start();
      };
      Blender.prototype.addToOneContainer = function(shouldUpdateText) {
        void 0 === shouldUpdateText && (shouldUpdateText = true);
        this.addToContainer(10, this._oneLayoutNode, this.landOnePrefab, exports.LAND_ONE_SCALE_X, exports.LAND_ONE_SCALE_Y);
      };
      Blender.prototype.addToTenContainer = function(shouldUpdateText) {
        void 0 === shouldUpdateText && (shouldUpdateText = true);
        this.addToContainer(10, this._tenLayoutNode, this.landTenPrefab, exports.LAND_TEN_SCALE_X, exports.LAND_TEN_SCALE_Y);
        shouldUpdateText ? this.updateText() : "";
      };
      Blender.prototype.addToHundredContainer = function(shouldUpdateText) {
        void 0 === shouldUpdateText && (shouldUpdateText = true);
        this.addToContainer(100, this._hundredLayoutNode, this.landHundredPrefab, exports.LAND_HUNDRED_SCALE, exports.LAND_HUNDRED_SCALE);
        if (shouldUpdateText) {
          this.updateText();
          parseInt(this._currentConfig.objectNo) === this._finalText && this.node.emit(exports.PLAY_FINAL_ANIMATION);
        }
      };
      Blender.prototype.createFromPrefab = function(prefab, scaleX, scaleY) {
        var item = cc.instantiate(prefab);
        item.scaleX = scaleX;
        item.scaleY = scaleY;
        item.setPosition(new cc.Vec2(0, 0));
        return item;
      };
      Blender.prototype.addToContainer = function(faceValue, node, prefab, scaleX, scaleY, suggestedItem) {
        void 0 === suggestedItem && (suggestedItem = false);
        var item = this.createFromPrefab(prefab, scaleX, scaleY);
        node.addChild(item);
      };
      Blender.prototype.setUpLayout = function(faceValue, node, totalElements, prefab, scaleX, scaleY) {
        for (var i = 0; i < totalElements; i++) this.addToContainer(faceValue, node, prefab, scaleX, scaleY, true);
      };
      Blender.prototype.createLabel = function(name, color, shrink) {
        void 0 === color && (color = "#ffffff");
        void 0 === shrink && (shrink = false);
        var labelNode = cc.instantiate(this.placeLabelPrefab);
        var child = labelNode.getChildByName("label");
        var label = child.getComponent(chimple_richtext_1.default);
        name = util_1.Util.i18NNumberConvert(name);
        label.string = "<color=" + color + "><bold>" + name + "</bold></color>";
        if (shrink) {
          label.fontSize = 32;
          labelNode.width = child.width;
        }
        return labelNode;
      };
      Blender.prototype.buildContainer = function(node, labelStr, totalElements, prefab, allowDropName, scaleX, scaleY, fontColor) {
        node.getChildByName(TEXT_BG).addChild(this.createLabel(labelStr, fontColor));
        var layout = node.getChildByName(exports.LAYOUT);
        var faceValue = 0;
        switch (allowDropName) {
         case exports.landhundred:
          faceValue = 100;
          break;

         case exports.landTen:
          faceValue = 10;
          break;

         case exports.landOne:
          faceValue = 1;
        }
        this.setUpLayout(faceValue, node.getChildByName(exports.LAYOUT), totalElements, prefab, scaleX, scaleY);
      };
      var Blender_1;
      __decorate([ property(cc.Prefab) ], Blender.prototype, "mixturePrefab", void 0);
      __decorate([ property(cc.Prefab) ], Blender.prototype, "goalPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Blender.prototype, "landHundredPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Blender.prototype, "landTenPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Blender.prototype, "landOnePrefab", void 0);
      __decorate([ property(cc.Prefab) ], Blender.prototype, "placeLabelPrefab", void 0);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "onLoad", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "moveCupToNext", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "formatFinalTextForSpeak", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "moveCupToBlender", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "labelValue", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "stopRemoVeFromContainers", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "createCup", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "replaceCupText", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "moveCup", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "moveIfNeeded", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "oneLayoutAnimate", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "tenLayoutAnimate", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "hundredCount", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "tenCount", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "oneCount", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "updateText", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "updateToLabel", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "buildScene", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "processConfiguration", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "playTenMoveAnimation", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "playHundredMoveAnimation", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "addToOneContainer", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "addToTenContainer", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "addToHundredContainer", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "createFromPrefab", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "addToContainer", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "setUpLayout", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "createLabel", null);
      __decorate([ error_handler_1.catchError() ], Blender.prototype, "buildContainer", null);
      Blender = Blender_1 = __decorate([ ccclass ], Blender);
      return Blender;
    }(game_1.default);
    exports.default = Blender;
    cc._RF.pop();
  }, {
    "../../../common/scripts/chimple-richtext": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./add-button": "add-button",
    "./remove-button": "remove-button"
  } ],
  "remove-button": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d159amRl1tGOoudBdjr9bL9", "remove-button");
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
    var blender_1 = require("./blender");
    var add_button_1 = require("./add-button");
    var RemoveButton = function(_super) {
      __extends(RemoveButton, _super);
      function RemoveButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.removeClip = null;
        _this._handleClick = true;
        return _this;
      }
      RemoveButton.prototype.onLoad = function() {
        this._handleClick = true;
      };
      RemoveButton.prototype.onClick = function(event, customEventData) {
        var _this = this;
        try {
          var name = "";
          var addButtonNode = null;
          if (this.node.name === blender_1.REMOVE_BUTTON_HUNDRED) {
            name = blender_1.BLENDER1_NODE;
            addButtonNode = this.node.parent.getChildByName("add_button_hundred");
          } else if (this.node.name === blender_1.REMOVE_BUTTON_TEN) {
            name = blender_1.BLENDER2_NODE;
            addButtonNode = this.node.parent.getChildByName("add_button_ten");
          } else if (this.node.name === blender_1.REMOVE_BUTTON_ONE) {
            name = blender_1.BLENDER3_NODE;
            addButtonNode = this.node.parent.getChildByName("add_button_one");
          }
          if (this._handleClick && this.childCount(name) > 0) {
            this.makeInteractable(false);
            this.removeLastChild(name);
            var addButtonComponent = addButtonNode.getComponent(add_button_1.default);
            addButtonComponent.makeInteractable(true);
            this.scheduleOnce(function() {
              var customEvent = new cc.Event.EventCustom(blender_1.REMOVED_PLACE_VALUE_ITEM, true);
              _this.node.dispatchEvent(customEvent);
              util_1.Util.play(_this.removeClip, false);
              _this.makeInteractable(true);
            }, .05);
          }
        } catch (e) {}
      };
      RemoveButton.prototype.makeInteractable = function(interactable) {
        var butComp = this.node.getComponent(cc.Button);
        if (butComp) {
          butComp.interactable = interactable;
          this._handleClick = interactable;
        }
      };
      RemoveButton.prototype.removeHundredChild = function() {
        var layout = this.node.parent.parent.getChildByName(blender_1.BLENDER1_NODE).getChildByName(blender_1.LAYOUT);
        var children = layout.children || [];
        layout.removeChild(children[children.length - 1]);
      };
      RemoveButton.prototype.removeTenChild = function() {
        var layout = this.node.parent.parent.getChildByName(blender_1.BLENDER2_NODE).getChildByName(blender_1.LAYOUT);
        var children = layout.children || [];
        layout.removeChild(children[children.length - 1]);
      };
      RemoveButton.prototype.removeOneChild = function() {
        var layout = this.node.parent.parent.getChildByName(blender_1.BLENDER3_NODE).getChildByName(blender_1.LAYOUT);
        var children = layout.children || [];
        layout.removeChild(children[children.length - 1]);
      };
      RemoveButton.prototype.removeLastChild = function(name) {
        var layout = this.node.parent.parent.getChildByName(name).getChildByName(blender_1.LAYOUT);
        var children = layout.children || [];
        layout.removeChild(children[children.length - 1]);
      };
      RemoveButton.prototype.childCount = function(name) {
        var layout = this.node.parent.parent.getChildByName(name).getChildByName(blender_1.LAYOUT);
        return layout.children.length;
      };
      __decorate([ property(cc.AudioClip) ], RemoveButton.prototype, "removeClip", void 0);
      RemoveButton = __decorate([ ccclass ], RemoveButton);
      return RemoveButton;
    }(cc.Component);
    exports.default = RemoveButton;
    cc._RF.pop();
  }, {
    "../../../common/scripts/util": void 0,
    "./add-button": "add-button",
    "./blender": "blender"
  } ]
}, {}, [ "add-button", "blender", "remove-button" ]);