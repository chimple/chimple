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
  "option-script": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fb2a7oTrVlEz7JWrmmIbWHj", "option-script");
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
    var questionboard_1 = require("./questionboard");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var OptionScript = function(_super) {
      __extends(OptionScript, _super);
      function OptionScript() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._text = null;
        _this._correctAnswer = null;
        return _this;
      }
      OptionScript.prototype.onButtonClick = function(event, customEventData) {
        if (this._text === this._correctAnswer) this.node.dispatchEvent(new cc.Event.EventCustom(questionboard_1.CORRECT_ANSWER, true)); else {
          var customEvent = new cc.Event.EventCustom(questionboard_1.WRONG_ANSWER, true);
          customEvent.setUserData({
            node: this.node
          });
          this.node.dispatchEvent(customEvent);
        }
      };
      OptionScript.prototype.onLoad = function() {
        var button = this.node.getComponent(cc.Button);
        button.interactable = false;
      };
      Object.defineProperty(OptionScript.prototype, "correctAnswer", {
        set: function(a) {
          this._correctAnswer = a;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(OptionScript.prototype, "text", {
        set: function(t) {
          this._text = t;
        },
        enumerable: false,
        configurable: true
      });
      __decorate([ error_handler_1.catchError() ], OptionScript.prototype, "onLoad", null);
      OptionScript = __decorate([ ccclass ], OptionScript);
      return OptionScript;
    }(cc.Component);
    exports.default = OptionScript;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/error-handler": void 0,
    "./questionboard": "questionboard"
  } ],
  questionboard: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "40970aonR9HOIRy321YWN8O", "questionboard");
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
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SEQUENCE_TYPE_EQUATION = exports.SEQUENCE_TYPE_INCLUSION = exports.SEQUENCE_TYPE_COMPARISION = exports.SEQUENCE_TYPE_MULTIPLY = exports.SEQUENCE_TYPE_SUBTRACTION = exports.SEQUENCE_TYPE_ADDITION = exports.SEQUENCE_TYPE_NONE = exports.DISABLE_BUTTONS = exports.ENABLE_BUTTONS = exports.WRONG_ANSWER = exports.CORRECT_ANSWER = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var Vec2 = cc.Vec2;
    var countingLayout_1 = require("../../../common/scripts/countingLayout");
    var game_1 = require("../../../common/scripts/game");
    var config_1 = require("../../../common/scripts/lib/config");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var util_1 = require("../../../common/scripts/util");
    var option_script_1 = require("./option-script");
    var profile_1 = require("../../../common/scripts/lib/profile");
    var constants_1 = require("../../../common/scripts/lib/constants");
    var chimple_richtext_1 = require("../../../common/scripts/chimple-richtext");
    exports.CORRECT_ANSWER = "CORRECT_ANSWER";
    exports.WRONG_ANSWER = "WRONG_ANSWER";
    exports.ENABLE_BUTTONS = "ENABLE_BUTTONS";
    exports.DISABLE_BUTTONS = "DISABLE_BUTTONS";
    exports.SEQUENCE_TYPE_NONE = "0";
    exports.SEQUENCE_TYPE_ADDITION = "1";
    exports.SEQUENCE_TYPE_SUBTRACTION = "2";
    exports.SEQUENCE_TYPE_MULTIPLY = "3";
    exports.SEQUENCE_TYPE_COMPARISION = "4";
    exports.SEQUENCE_TYPE_INCLUSION = "5";
    exports.SEQUENCE_TYPE_EQUATION = "6";
    var EquationFormula = function() {
      function EquationFormula() {}
      return EquationFormula;
    }();
    var QuestionBoard = function(_super) {
      __extends(QuestionBoard, _super);
      function QuestionBoard() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._currentConfig = null;
        _this.questionLayoutPrefab = null;
        _this.answerLayoutPrefab = null;
        _this.whiteCardPrefab = null;
        _this.yellowCardPrefab = null;
        _this.greenCardPrefab = null;
        _this.plusSignPrefab = null;
        _this.minusSignPrefab = null;
        _this.questionSignPrefab = null;
        _this.countingLayout = null;
        _this.equalSignPrefab = null;
        _this.answerEquationLayoutPrefab = null;
        _this.hLayoutPrefab = null;
        _this.shadowLayoutPrefab = null;
        _this.optionsLayoutPrefab = null;
        _this.equationTextPrefab = null;
        _this.optionPrefab = null;
        _this.takeClip = null;
        _this.putClip = null;
        _this.fruit1Texture = null;
        _this.fruit2Texture = null;
        _this._equations = null;
        _this._options = null;
        _this._question = null;
        _this._answer = null;
        _this._fruitTextures = [];
        _this._optionNodes = [];
        _this._correctAnswer = null;
        _this._equationFormula = null;
        _this._textures = [];
        _this._wasAnsweredCorrectly = false;
        _this._fruitNodes = [];
        _this._registeredForReAsk = false;
        _this._fruits = [ "acorn", "apple", "cherry" ];
        _this._helpMode = false;
        _this._helpNode = null;
        _this._correctAnswered = false;
        return _this;
      }
      QuestionBoard.prototype.onLoad = function() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this._currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
        this._equationFormula = this.createFormula();
        this._fruitTextures.push(this.fruit1Texture, this.fruit2Texture);
        this._options = cc.instantiate(this.optionsLayoutPrefab);
        this._question = cc.instantiate(this.questionLayoutPrefab);
        this._answer = cc.instantiate(this.answerLayoutPrefab);
        this._equations = cc.instantiate(this.answerEquationLayoutPrefab);
        this.node.addChild(this._answer);
        this.createQuestion(this._currentConfig.problemSentence);
        this.node.addChild(this._question);
        this.node.addChild(this._equations);
        this._answer.opacity = 0;
        this._answer.setPosition(new cc.Vec2(0, 120));
        this._question.setPosition(new cc.Vec2(0, 110));
        this._options.setPosition(new cc.Vec2(0, -235));
        this.node.addChild(this._options);
        this.friendPos.removeFromParent();
        this.node.addChild(this.friendPos);
        this.subscribeToEvents();
        this._helpMode = true;
        this.createOptions();
        this.configureSound();
        this.enableButtons();
      };
      QuestionBoard.prototype.createFormula = function() {
        var equationFormula = new EquationFormula();
        var signIndex = this._currentConfig.rightFormula.indexOf("=");
        var plusIndex = this._currentConfig.rightFormula.indexOf("+");
        var minusIndex = this._currentConfig.rightFormula.indexOf("-");
        var multiplyIndex = this._currentConfig.rightFormula.indexOf("X");
        var signBeforeOp = signIndex < plusIndex || signIndex < minusIndex || signIndex < multiplyIndex;
        var plus = -1 !== this._currentConfig.rightFormula.lastIndexOf("+");
        var minus = -1 !== this._currentConfig.rightFormula.lastIndexOf("-");
        var multiply = -1 !== this._currentConfig.rightFormula.lastIndexOf("X");
        var formula = this._currentConfig.rightFormula.split(/\+ | - | X | =/) || [];
        if (null !== formula && 3 === formula.length) {
          equationFormula.sign = "=";
          if (signBeforeOp) {
            equationFormula.resultBold = formula[0].trim().startsWith("<");
            equationFormula.result = formula[0].trim().replace("<", "").replace(">", "");
            equationFormula.operand1Bold = formula[1].trim().startsWith("<");
            equationFormula.operator = plus ? "+" : minus ? "-" : multiply ? "X" : "";
            equationFormula.operand1 = formula[1].trim().replace("<", "").replace(">", "");
            equationFormula.operand2Bold = formula[2].trim().startsWith("<");
            equationFormula.operand2 = formula[2].trim().replace("<", "").replace(">", "");
          } else {
            equationFormula.operand1Bold = formula[0].trim().startsWith("<");
            equationFormula.operand1 = formula[0].trim().replace("<", "").replace(">", "");
            equationFormula.operand2Bold = formula[1].trim().startsWith("<");
            equationFormula.operator = plus ? "+" : minus ? "-" : multiply ? "X" : "";
            equationFormula.operand2 = formula[1].trim().replace("<", "").replace(">", "");
            equationFormula.resultBold = formula[2].trim().startsWith("<");
            equationFormula.result = formula[2].trim().replace("<", "").replace(">", "");
          }
        }
        return equationFormula;
      };
      QuestionBoard.prototype.configureSound = function() {
        var _this = this;
        var lang = profile_1.default.lang || config_1.Lang.ENGLISH;
        cc.assetManager.loadRemote(constants_1.ASSET_URL + "/" + lang + "-help-remote/questionboard/" + this._currentConfig.voiceSource, function(err, clip) {
          clip && !err && (_this.friend.extraClip = clip);
        });
      };
      QuestionBoard.prototype.createOptions = function() {
        for (var i = 1; i <= 4; i++) {
          this._currentConfig.rightAnswer === String(i) && (this._correctAnswer = this._currentConfig["exampleNumber" + i]);
          this.createOption(this._currentConfig["exampleNumber" + i], this._currentConfig["exampleWord" + i], this._currentConfig.rightAnswer === String(i));
        }
      };
      QuestionBoard.prototype.createQuestion = function(text) {
        var qTextNode = this._question.getChildByName("questionText");
        var qLabel = qTextNode.getComponent(cc.Label);
        qLabel.enableWrapText = true;
        qLabel.string = text;
      };
      QuestionBoard.prototype.subscribeToEvents = function() {
        var _this = this;
        this.node.on(exports.CORRECT_ANSWER, function(event) {
          if (!_this._correctAnswered) {
            event.stopPropagation();
            _this._wasAnsweredCorrectly = true;
            _this.node.emit("correct");
            _this._options.opacity = 0;
            _this._equations.opacity = 255;
            _this.showBox(false);
            _this.showEquationFormula();
            _this._correctAnswered = true;
          }
        });
        this.node.on(exports.WRONG_ANSWER, function(event) {
          event.stopPropagation();
          if (!_this._correctAnswered) {
            var data = event.getUserData();
            var wrongNode = data.node;
            _this._wasAnsweredCorrectly = false;
            _this._equations.opacity = 0;
            _this._options.opacity = 255;
            _this.disableButtons();
            _this.node.emit("wrong");
            _this.showBox(false);
            _this.showEquationFormula();
          }
        });
        this.node.on(exports.ENABLE_BUTTONS, function(event) {
          event.stopPropagation();
          _this.enableButtons();
        });
        this.node.on(exports.DISABLE_BUTTONS, function(event) {
          event.stopPropagation();
          _this.disableButtons();
        });
      };
      QuestionBoard.prototype.createCountingLayout = function(node, count) {
        var clNode = cc.instantiate(this.countingLayout);
        clNode.width = clNode.height = 125;
        clNode.setAnchorPoint(new Vec2(.5, .5));
        var cl = clNode.getComponent(countingLayout_1.default);
        var layout = cl.getComponent(cc.Layout);
        var totalCount = "-" === this._equationFormula.operator ? this._equationFormula.operand1 : this._equationFormula.result;
        layout.cellSize = new cc.Size(31.25, 31.25);
        layout.resizeMode = cc.Layout.ResizeMode.CHILDREN;
        cl.fullCount = parseInt(count);
        cl.scale = .8;
        cl.fullTexture = this._fruitTextures[0];
        node.addChild(clNode);
        return clNode;
      };
      QuestionBoard.prototype.showEquation = function() {
        var _this = this;
        var layout = this.createLayout(960);
        layout.paddingTop = 75;
        layout.paddingBottom = 75;
        layout.cellSize = new cc.Size(150, 150);
        var operand1 = cc.instantiate(this.whiteCardPrefab);
        operand1.name = "operand1";
        this.createCountingLayout(operand1, this._equationFormula.operand1);
        this.addEquationToLayout(layout, operand1);
        var operator = cc.instantiate(this.greenCardPrefab);
        var signNode = "-" === this._equationFormula.operator ? cc.instantiate(this.minusSignPrefab) : "+" === this._equationFormula.operator ? cc.instantiate(this.plusSignPrefab) : null;
        operator.addChild(signNode);
        this.addEquationToLayout(layout, operator);
        var questionNode = cc.instantiate(this.yellowCardPrefab);
        var qSign = cc.instantiate(this.questionSignPrefab);
        questionNode.addChild(qSign);
        var op2Node = this.createCountingLayout(questionNode, this._equationFormula.operand2);
        op2Node.active = false;
        this.addEquationToLayout(layout, questionNode);
        var equalSign = cc.instantiate(this.greenCardPrefab);
        equalSign.addChild(cc.instantiate(this.equalSignPrefab));
        this.addEquationToLayout(layout, equalSign);
        var resultCard = cc.instantiate(this.whiteCardPrefab);
        this.createCountingLayout(resultCard, this._equationFormula.result);
        this.addEquationToLayout(layout, resultCard);
        this.showFruits(this._fruitNodes, false, function() {
          _this.scheduleOnce(function() {
            qSign.active = false;
            op2Node.active = true;
          }, .25);
        });
        this.registerForReAskCall();
      };
      QuestionBoard.prototype.addEquationToLayout = function(layout, node) {
        layout.node.addChild(node);
        this._fruitNodes.push(node);
        node.active = false;
      };
      QuestionBoard.prototype.showSubtraction = function() {
        var _this = this;
        var layout = this.createLayout(960);
        this.createFruits(layout.node, Number(this._equationFormula.operand1), 0, true);
        this.showFruits(this._fruitNodes, false, function() {
          _this.removeFruits(layout.node, Number(_this._equationFormula.operand2));
        }, 3);
        this.registerForReAskSubstractionCall();
      };
      QuestionBoard.prototype.removeFruits = function(parent, op2) {
        var _this = this;
        var j = 0;
        this.schedule(function() {
          var node = _this._fruitNodes[_this._fruitNodes.length - 1 - j];
          if (!!node) {
            try {
              !_this.takeClip || util_1.Util.play(_this.takeClip, false);
            } catch (e) {}
            j++;
            node.getChildByName("top").active = false;
            !node.getChildByName("shadow") || (node.getChildByName("shadow").active = true);
            j === op2 && _this.scheduleOnce(function() {
              _this.node.emit("REMOVE_FRUITS_COMPLETED");
            }, 1);
          }
        }, 1, op2 - 1);
      };
      QuestionBoard.prototype.createLayout = function(changeWidth, changeHeight) {
        void 0 === changeWidth && (changeWidth = 0);
        void 0 === changeHeight && (changeHeight = 0);
        var hLayout = cc.instantiate(this.hLayoutPrefab);
        this._answer.addChild(hLayout);
        changeWidth > 0 && (hLayout.width = changeWidth);
        changeHeight > 0 && (hLayout.height = changeHeight);
        return hLayout.getComponent(cc.Layout);
      };
      QuestionBoard.prototype.showAddition = function() {
        var layout = this.createLayout(960);
        this.createFruits(layout.node, Number(this._equationFormula.operand1), Number(this._equationFormula.operand2));
        this.showFruits();
        this.registerForReAskCall();
      };
      QuestionBoard.prototype.registerForReAskCall = function() {
        var _this = this;
        if (!this._registeredForReAsk) {
          this._registeredForReAsk = true;
          this.node.on("SHOW_FRUIT_COMPLETED", function() {
            _this.reAsk();
          });
        }
      };
      QuestionBoard.prototype.registerForReAskSubstractionCall = function() {
        var _this = this;
        if (!this._registeredForReAsk) {
          this._registeredForReAsk = true;
          this.node.on("REMOVE_FRUITS_COMPLETED", function() {
            _this.reAsk();
          }, 3);
        }
      };
      QuestionBoard.prototype.showInclusion = function() {
        var layout = this.createLayout(960);
        this.createFruits(layout.node, Number(this._equationFormula.operand1), Number(this._equationFormula.operand2), true);
        this.showFruits(this._fruitNodes, true);
        this.registerForReAskCall();
      };
      QuestionBoard.prototype.createFruits = function(parent, op1, op2, shouldCreateShadow) {
        void 0 === op2 && (op2 = 0);
        void 0 === shouldCreateShadow && (shouldCreateShadow = false);
        for (var i = 0; i < op1; i++) this._fruitNodes.push(this.createFruit(parent, 0, shouldCreateShadow));
        for (var i = 0; i < op2; i++) this._fruitNodes.push(this.createFruit(parent, 1, shouldCreateShadow));
      };
      QuestionBoard.prototype.createFruitsForMultiplication = function(parent, op1, op2, shouldCreateShadow) {
        void 0 === op2 && (op2 = 0);
        void 0 === shouldCreateShadow && (shouldCreateShadow = false);
        for (var i = 0; i < op1; i++) for (var i_1 = 0; i_1 < op2; i_1++) this._fruitNodes.push(this.createFruit(parent, 0, shouldCreateShadow));
      };
      QuestionBoard.prototype.showFruits = function(array, shadowOnTopOnLoad, callBack, timeDelay) {
        void 0 === array && (array = this._fruitNodes);
        void 0 === shadowOnTopOnLoad && (shadowOnTopOnLoad = false);
        void 0 === callBack && (callBack = null);
        void 0 === timeDelay && (timeDelay = 2);
        shadowOnTopOnLoad && array.forEach(function(n) {
          var shadowNode = n.getChildByName("shadow");
          if (shadowOnTopOnLoad && null != shadowNode) {
            n.getChildByName("shadow").zIndex = shadowOnTopOnLoad ? 2 : 1;
            n.getChildByName("top").zIndex = shadowOnTopOnLoad ? 1 : 2;
            n.active = true;
          }
        });
        this.iterateAndShowNodesWithScheduler(array, shadowOnTopOnLoad, callBack, timeDelay);
      };
      QuestionBoard.prototype.iterateAndShowNodesWithScheduler = function(array, shadowOnTopOnLoad, callBack, timeDelay) {
        var _this = this;
        void 0 === timeDelay && (timeDelay = 2);
        var j = 0;
        this.unscheduleAllCallbacks();
        this.schedule(function() {
          var node = array[j];
          if (!!node) {
            try {
              !_this.putClip || util_1.Util.play(_this.putClip, false);
            } catch (e) {}
            j++;
            node.active = true;
            var shadowNode = node.getChildByName("shadow");
            shadowOnTopOnLoad && null != shadowNode && (shadowNode.active = false);
          }
          if (array.length === j) {
            !callBack || callBack.apply(_this);
            -1 !== timeDelay && _this.scheduleOnce(function() {
              _this.node.emit("SHOW_FRUIT_COMPLETED");
            }, timeDelay);
          }
        }, 1, array.length - 1);
      };
      QuestionBoard.prototype.iterateAndShowNodes = function(array, shadowOnTopOnLoad, timeDelay) {
        var _this = this;
        void 0 === timeDelay && (timeDelay = 2);
        array.forEach(function(node, index) {
          new cc.Tween().target(node).to(1 + .25 * index, {
            opacity: 255
          }, {
            progress: null,
            easing: "quadOut"
          }).call(function() {
            try {
              node.active = true;
              var shadowNode = node.getChildByName("shadow");
              shadowOnTopOnLoad && null != shadowNode && (shadowNode.active = false);
              try {
                !_this.putClip || util_1.Util.play(_this.putClip, false);
              } catch (e) {}
            } catch (e) {}
            console.log("index", index, "array.length - 1", array.length - 1);
            array.length - 1 === index && _this.scheduleOnce(function() {
              _this.node.emit("SHOW_FRUIT_COMPLETED");
            }, timeDelay);
          }).start();
        });
      };
      QuestionBoard.prototype.clear = function() {
        this._answer.removeAllChildren(true);
        this._fruitNodes.forEach(function(n) {
          return n.removeFromParent(true);
        });
        this._equations.removeAllChildren(true);
        this._fruitNodes = [];
      };
      QuestionBoard.prototype.reAsk = function() {
        this.clear();
        if (this._wasAnsweredCorrectly) this.node.emit("nextProblem"); else {
          this.showBox(true);
          this.enableButtons();
        }
      };
      QuestionBoard.prototype.createFruit = function(parent, index, shouldCreateShadow) {
        void 0 === shouldCreateShadow && (shouldCreateShadow = false);
        var common = new cc.Node();
        var node = new cc.Node();
        node.name = "top";
        var spriteComponent = node.addComponent(cc.Sprite);
        spriteComponent.spriteFrame = this._fruitTextures[index];
        node.scale = .75;
        if (shouldCreateShadow) {
          var shadow = cc.instantiate(this.shadowLayoutPrefab);
          shadow.name = "shadow";
          var shadowSprite = shadow.getComponent(cc.Sprite);
          shadow.scale = .75;
          shadowSprite.spriteFrame = this._fruitTextures[index];
          common.addChild(shadow);
        }
        common.addChild(node);
        common.width = node.width;
        common.height = node.height;
        common.active = false;
        parent.addChild(common);
        return common;
      };
      QuestionBoard.prototype.showEquationFormula = function() {
        this.buildEquation(this._equationFormula.operand1, this._equationFormula.operand1Bold);
        this.buildEquation(this._equationFormula.operator);
        this.buildEquation(this._equationFormula.operand2, this._equationFormula.operand2Bold);
        this.buildEquation(this._equationFormula.sign);
        this.buildEquation(this._equationFormula.result, this._equationFormula.resultBold);
        switch (this._equationFormula.operator) {
         case "+":
          this._currentConfig.sequenceType === exports.SEQUENCE_TYPE_ADDITION ? this.showAddition() : this._currentConfig.sequenceType === exports.SEQUENCE_TYPE_INCLUSION ? this.showInclusion() : this._currentConfig.sequenceType === exports.SEQUENCE_TYPE_COMPARISION ? this.showComparision() : this._currentConfig.sequenceType === exports.SEQUENCE_TYPE_EQUATION && this.showEquation();
          break;

         case "-":
          this._currentConfig.sequenceType === exports.SEQUENCE_TYPE_SUBTRACTION ? this.showSubtraction() : this._currentConfig.sequenceType === exports.SEQUENCE_TYPE_COMPARISION ? this.showComparision() : this._currentConfig.sequenceType === exports.SEQUENCE_TYPE_EQUATION && this.showEquation();
          break;

         case "X":
          this._currentConfig.sequenceType === exports.SEQUENCE_TYPE_MULTIPLY && this.showMultiplication();
        }
      };
      QuestionBoard.prototype.showComparision = function() {
        var _this = this;
        var layout1 = this.createLayout(960, 150);
        var layout2 = this.createLayout(960, 150);
        layout1.node.setPosition(new cc.Vec2(layout1.node.x, layout1.node.y + this._answer.height / 4));
        layout2.node.setPosition(new cc.Vec2(layout2.node.x, layout2.node.y - this._answer.height / 4));
        var op1Count = Number(this._equationFormula.operand1);
        var op2Count = Number(this._equationFormula.operand2);
        this.createFruits(layout1.node, op1Count, 0);
        this.createFruits(layout2.node, 0, op2Count);
        var group1 = [];
        for (var i = 0; i < op1Count; i++) group1.push(this._fruitNodes[i]);
        var group2 = [];
        for (var i = op1Count; i < op1Count + op2Count; i++) group2.push(this._fruitNodes[i]);
        this.showFruits(group1, false, function() {
          _this.showFruits(group2, false, function() {
            _this.registerForReAskCall();
          });
        }, -1);
      };
      QuestionBoard.prototype.showMultiplication = function() {
        var layout = this.createLayout(96 * (1 + Number(this._equationFormula.operand2)));
        this.createFruitsForMultiplication(layout.node, Number(this._equationFormula.operand1), Number(this._equationFormula.operand2), false);
        this.showFruitsForMultiplication(Number(this._equationFormula.operand2));
        this.registerForReAskCall();
      };
      QuestionBoard.prototype.showFruitsForMultiplication = function(groupSize, timeDelay) {
        var _this = this;
        void 0 === timeDelay && (timeDelay = 2);
        var j = 0;
        var inputElements = __spreadArrays(this._fruitNodes);
        this.schedule(function() {
          var nodes = [];
          for (var i = 0; i < groupSize; i++) nodes.push(inputElements.pop());
          if (!!nodes && nodes.length > 0) {
            try {
              !_this.putClip || util_1.Util.play(_this.putClip, false);
            } catch (e) {}
            nodes.forEach(function(n) {
              !n || (n.active = true);
            });
            j += groupSize;
          }
          _this._fruitNodes.length === j && _this.scheduleOnce(function() {
            _this.node.emit("SHOW_FRUIT_COMPLETED");
          }, timeDelay);
        }, 1, this._fruitNodes.length / groupSize - 1);
      };
      QuestionBoard.prototype.buildEquation = function(text, isBold) {
        void 0 === isBold && (isBold = false);
        var equationText = cc.instantiate(this.equationTextPrefab);
        equationText.setPosition(new cc.Vec2(equationText.x, equationText.y + 30));
        var richText = equationText.getComponent(chimple_richtext_1.default);
        richText.string = isBold ? "<color=#FFFFFFF><bold>" + text + "</bold></color>" : "<color=#FFFFFFF>" + text + "</color>";
        richText.fontSize = 80;
        var layout = this._equations.getComponent(cc.Layout);
        layout.node.addChild(richText.node);
      };
      QuestionBoard.prototype.showBox = function(showQuestion) {
        var _this = this;
        new cc.Tween().target(showQuestion ? this._answer : this._question).to(.25, {
          opacity: 255
        }, {
          progress: null,
          easing: "quadOut"
        }).to(.15, {
          scaleX: 0
        }, {
          progress: null,
          easing: "quadOut"
        }).call(function() {
          new cc.Tween().target(showQuestion ? _this._question : _this._answer).to(.25, {
            opacity: 255
          }, {
            progress: null,
            easing: "quadOut"
          }).to(.15, {
            scaleX: 1
          }, {
            progress: null,
            easing: "quadOut"
          }).start();
        }).start();
      };
      QuestionBoard.prototype.enableButtons = function() {
        var _this = this;
        this._optionNodes.forEach(function(n) {
          var optionSprite = n.getComponent(cc.Button);
          optionSprite.interactable = true;
        });
        this.scheduleOnce(function() {
          _this._helpMode = false;
          util_1.Util.showHelp(_this._helpNode, _this._helpNode);
        }, .5);
      };
      QuestionBoard.prototype.disableButtons = function() {
        this._optionNodes.forEach(function(n) {
          var optionSprite = n.getComponent(cc.Button);
          optionSprite.interactable = false;
        });
      };
      QuestionBoard.prototype.createOption = function(value, text, isCorrect) {
        void 0 === isCorrect && (isCorrect = false);
        var option = cc.instantiate(this.optionPrefab);
        var backGround = option.getChildByName("Background");
        var optionComponent = option.getComponent(option_script_1.default);
        optionComponent.correctAnswer = this._correctAnswer;
        var optionBtn = option.getComponent(cc.Button);
        optionBtn.interactable = false;
        var eNumber = backGround.getChildByName("exampleNumber");
        var eWord = backGround.getChildByName("exampleWord");
        var labelNumber = eNumber.getComponent(cc.Label);
        labelNumber.string = value;
        optionComponent.text = value;
        option.name = "" + value;
        var labelWord = eWord.getComponent(cc.Label);
        labelWord.string = text;
        this._options.addChild(option);
        this._optionNodes.push(option);
        this._helpMode && isCorrect && (this._helpNode = option);
      };
      QuestionBoard.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var level = configurations[0], workSheet = configurations[1], problemNo = configurations[2], sequenceType = configurations[3], voiceSource = configurations[4], problemSentence = configurations[5], exampleNumber1 = configurations[6], exampleNumber2 = configurations[7], exampleNumber3 = configurations[8], exampleNumber4 = configurations[9], exampleWord1 = configurations[10], exampleWord2 = configurations[11], exampleWord3 = configurations[12], exampleWord4 = configurations[13], rightFormula = configurations[14], rightAnswer = configurations[15], objectValueA = configurations[16], objectValueB = configurations[17], objectValueC = configurations[18], objectValueD = configurations[19], equationValueA = configurations[20], equationValueB = configurations[21], equationSign = configurations[22], equationUnknown = configurations[23];
        return {
          level: level,
          workSheet: workSheet,
          problemNo: problemNo,
          sequenceType: sequenceType,
          voiceSource: voiceSource,
          problemSentence: problemSentence,
          exampleNumber1: exampleNumber1,
          exampleNumber2: exampleNumber2,
          exampleNumber3: exampleNumber3,
          exampleNumber4: exampleNumber4,
          exampleWord1: exampleWord1,
          exampleWord2: exampleWord2,
          exampleWord3: exampleWord3,
          exampleWord4: exampleWord4,
          rightFormula: rightFormula,
          rightAnswer: rightAnswer,
          objectValueA: objectValueA,
          objectValueB: objectValueB,
          objectValueC: objectValueC,
          objectValueD: objectValueD,
          equationValueA: equationValueA,
          equationValueB: equationValueB,
          equationSign: equationSign,
          equationUnknown: equationUnknown
        };
      };
      QuestionBoard.prototype.onDestroy = function() {
        cc.audioEngine.stopAllEffects();
      };
      __decorate([ property(cc.Prefab) ], QuestionBoard.prototype, "questionLayoutPrefab", void 0);
      __decorate([ property(cc.Prefab) ], QuestionBoard.prototype, "answerLayoutPrefab", void 0);
      __decorate([ property(cc.Prefab) ], QuestionBoard.prototype, "whiteCardPrefab", void 0);
      __decorate([ property(cc.Prefab) ], QuestionBoard.prototype, "yellowCardPrefab", void 0);
      __decorate([ property(cc.Prefab) ], QuestionBoard.prototype, "greenCardPrefab", void 0);
      __decorate([ property(cc.Prefab) ], QuestionBoard.prototype, "plusSignPrefab", void 0);
      __decorate([ property(cc.Prefab) ], QuestionBoard.prototype, "minusSignPrefab", void 0);
      __decorate([ property(cc.Prefab) ], QuestionBoard.prototype, "questionSignPrefab", void 0);
      __decorate([ property(cc.Prefab) ], QuestionBoard.prototype, "countingLayout", void 0);
      __decorate([ property(cc.Prefab) ], QuestionBoard.prototype, "equalSignPrefab", void 0);
      __decorate([ property(cc.Prefab) ], QuestionBoard.prototype, "answerEquationLayoutPrefab", void 0);
      __decorate([ property(cc.Prefab) ], QuestionBoard.prototype, "hLayoutPrefab", void 0);
      __decorate([ property(cc.Prefab) ], QuestionBoard.prototype, "shadowLayoutPrefab", void 0);
      __decorate([ property(cc.Prefab) ], QuestionBoard.prototype, "optionsLayoutPrefab", void 0);
      __decorate([ property(cc.Prefab) ], QuestionBoard.prototype, "equationTextPrefab", void 0);
      __decorate([ property(cc.Prefab) ], QuestionBoard.prototype, "optionPrefab", void 0);
      __decorate([ property(cc.AudioClip) ], QuestionBoard.prototype, "takeClip", void 0);
      __decorate([ property(cc.AudioClip) ], QuestionBoard.prototype, "putClip", void 0);
      __decorate([ property(cc.SpriteFrame) ], QuestionBoard.prototype, "fruit1Texture", void 0);
      __decorate([ property(cc.SpriteFrame) ], QuestionBoard.prototype, "fruit2Texture", void 0);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "onLoad", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "createFormula", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "configureSound", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "createOptions", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "createQuestion", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "subscribeToEvents", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "createCountingLayout", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "showEquation", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "addEquationToLayout", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "showSubtraction", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "removeFruits", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "createLayout", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "showAddition", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "registerForReAskCall", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "registerForReAskSubstractionCall", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "showInclusion", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "createFruits", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "createFruitsForMultiplication", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "showFruits", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "iterateAndShowNodesWithScheduler", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "clear", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "reAsk", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "createFruit", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "showEquationFormula", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "showComparision", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "showMultiplication", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "showFruitsForMultiplication", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "buildEquation", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "showBox", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "enableButtons", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "disableButtons", null);
      __decorate([ error_handler_1.catchError() ], QuestionBoard.prototype, "createOption", null);
      QuestionBoard = __decorate([ ccclass ], QuestionBoard);
      return QuestionBoard;
    }(game_1.default);
    exports.default = QuestionBoard;
    cc._RF.pop();
  }, {
    "../../../common/scripts/chimple-richtext": void 0,
    "../../../common/scripts/countingLayout": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/constants": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/lib/profile": void 0,
    "../../../common/scripts/util": void 0,
    "./option-script": "option-script"
  } ],
  "sound-button": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6475dW/WZdJO6x5522s86Ja", "sound-button");
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
    var util_1 = require("../../../common/scripts/util");
    var questionboard_1 = require("./questionboard");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var SoundButton = function(_super) {
      __extends(SoundButton, _super);
      function SoundButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._isSoundPlaying = false;
        _this._soundClip = null;
        _this._normalSpriteFrame = null;
        _this._pressedSpriteFrame = null;
        return _this;
      }
      SoundButton.prototype.onLoad = function() {
        var button = this.node.getComponent(cc.Button);
        this._normalSpriteFrame = button.normalSprite;
        this._pressedSpriteFrame = button.pressedSprite;
      };
      SoundButton.prototype.playSound = function(node) {
        var button = node.getComponent(cc.Button);
        if (!this._isSoundPlaying) {
          this._isSoundPlaying = true;
          button.normalSprite = this._pressedSpriteFrame;
          var location = "" + this._soundClip;
          util_1.Util.loadGameSound("" + this._soundClip, function(clip) {
            var _this = this;
            if (null != clip) {
              var audioId = util_1.Util.play(clip, false);
              -1 != audioId && cc.audioEngine.setFinishCallback(audioId, function() {
                _this._isSoundPlaying = false;
                button.normalSprite = _this._normalSpriteFrame;
                null != _this.node && _this.node.dispatchEvent(new cc.Event.EventCustom(questionboard_1.ENABLE_BUTTONS, true));
              });
            }
          });
        }
      };
      SoundButton.prototype.stopSound = function() {
        this._isSoundPlaying = false;
        cc.audioEngine.stopAllEffects();
        var button = this.node.getComponent(cc.Button);
        button.normalSprite = this._normalSpriteFrame;
      };
      SoundButton.prototype.soundOnLoad = function() {
        var _this = this;
        var button = this.node.getComponent(cc.Button);
        button.interactable = false;
        setTimeout(function() {
          null != _this.node && _this.playSound(_this.node);
          button.interactable = true;
        }, 7e3);
      };
      SoundButton.prototype.onButtonClick = function(event, customEventData) {
        var node = event.target;
        this.stopSound();
        this.playSound(node);
      };
      Object.defineProperty(SoundButton.prototype, "soundClip", {
        set: function(n) {
          this._soundClip = n;
        },
        enumerable: false,
        configurable: true
      });
      SoundButton.prototype.onDestroy = function() {
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic();
      };
      __decorate([ error_handler_1.catchError() ], SoundButton.prototype, "onLoad", null);
      __decorate([ error_handler_1.catchError() ], SoundButton.prototype, "playSound", null);
      SoundButton = __decorate([ ccclass ], SoundButton);
      return SoundButton;
    }(cc.Component);
    exports.default = SoundButton;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./questionboard": "questionboard"
  } ]
}, {}, [ "option-script", "questionboard", "sound-button" ]);