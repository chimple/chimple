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
  calculator: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "21b29QgFZhAf5QS7MBl+Foz", "calculator");
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
    var answer_grid_1 = require("../../../common/scripts/answer-grid");
    var counting_answer_1 = require("../../../common/scripts/counting-answer");
    var game_1 = require("../../../common/scripts/game");
    var config_1 = require("../../../common/scripts/lib/config");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var util_1 = require("../../../common/scripts/util");
    var Calculator = function(_super) {
      __extends(Calculator, _super);
      function Calculator() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.drawingDot = null;
        _this.drawingAreaPrefab = null;
        _this.countingAnswerPrefab = null;
        _this.labelPrefab = null;
        _this.layoutPrefab = null;
        _this.text = "hello";
        _this.highlightNode = null;
        _this.startLocation = cc.v2(0, 0);
        _this.adjustCords = cc.v2(0, 0);
        _this.isOneTouched = false;
        _this._countingAnswer = null;
        _this._currentConfig = null;
        _this._drawingAreaNode = null;
        _this._graphicsNode = null;
        _this._layout = null;
        _this.firstNumber = 30;
        _this.secondNumber = 10;
        _this.resultNumber = 20;
        _this.isPlusSign = false;
        _this.problemCount = 5;
        _this._answeredCorrectly = false;
        return _this;
      }
      Calculator.prototype.onLoad = function() {
        var _this = this;
        util_1.Util.loadi18NMapping(function() {
          _this.node.getChildByName("writeLabel").getComponent(cc.Label).string = util_1.Util.i18NText("Write here");
        });
        this._currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
        this.loadData();
        this._graphicsNode = cc.instantiate(this.drawingDot);
        this._graphicsNode.name = "canvas";
        this.node.addChild(this._graphicsNode);
        this.last_location = new cc.Vec2(0, 0);
        this.node.getChildByName("clearDraw").getComponent(cc.Button).node.on("click", this.clearDrawing, this);
        this._layout = cc.instantiate(this.layoutPrefab);
        this.node.getChildByName("layoutFolder").addChild(this._layout);
        this.setUpLayout();
        this._drawingAreaNode.on("touchstart", this.onTouchStart, this);
        this._drawingAreaNode.on("touchmove", this.onTouchMove, this);
        this._drawingAreaNode.on("touchend", this.onTouchEnd, this);
        var temp = this.problemCount.valueOf();
        this.node.on(counting_answer_1.VALIDATE_RESULT, function(event) {
          event.stopPropagation();
          var data = event.getUserData();
          if (data.result != _this.resultNumber || _this._answeredCorrectly) {
            if (!_this._answeredCorrectly) {
              console.log("You r wrong .right is >> " + _this.resultNumber);
              _this.node.emit("wrong");
              _this._countingAnswer.getComponent(counting_answer_1.default).clearDigits(false);
            }
          } else {
            var startIndex3 = 4 - _this.resultNumber.toString().trim().length + 1;
            for (var i = 0; i < _this.resultNumber.toString().trim().length; i++) {
              var resultLabelPrefab = cc.instantiate(_this.labelPrefab);
              resultLabelPrefab.getComponent(cc.Label).string = _this.resultNumber.toString().trim().charAt(i);
              resultLabelPrefab.name = i + "";
              _this.node.getChildByName("answersLabel").getChildByName("answer_1").getChildByName("" + (i + startIndex3)).addChild(resultLabelPrefab);
            }
            temp -= 1;
            _this._answeredCorrectly = true;
            _this.problemCount = temp;
            _this.node.emit("nextProblem");
            _this.node.emit("correct");
            _this._countingAnswer.getComponent(counting_answer_1.default).isValidResult = true;
          }
          console.log(data.result + " ::: ");
        });
        this.node.on(answer_grid_1.HELP_BTN, function(event) {
          event.stopPropagation();
          var data = event.getUserData();
          console.log(data, " [] ", data.helpNodes);
          _this.showHelp(_this.helpIterator(data.helpNodes));
        });
      };
      Calculator.prototype.helpIterator = function(helpNodes) {
        return helpNodes[Symbol.iterator]();
      };
      Calculator.prototype.showHelp = function(helpIterator, playAudio) {
        var _this = this;
        void 0 === playAudio && (playAudio = true);
        var nextItem = helpIterator.next();
        nextItem.done || util_1.Util.showHelp(nextItem.value, nextItem.value, function() {
          _this.showHelp(helpIterator, false);
        }, playAudio);
      };
      Calculator.prototype.loadData = function() {
        var row = config_1.default.getInstance().data[0];
        this.rowData = row;
        this.setUpQuestionArea(row);
        this.clearDrawing();
      };
      Calculator.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var level = configurations[0], worksheet = configurations[1], problemCount = configurations[2], number1 = configurations[3], addition = configurations[4], subtraction = configurations[5], number2 = configurations[6], result = configurations[7], regrouping = configurations[8], numberpads = configurations[9];
        numberpads = numberpads.split(",");
        return {
          level: level,
          worksheet: worksheet,
          problemCount: problemCount,
          number1: number1,
          addition: addition,
          subtraction: subtraction,
          number2: number2,
          result: result,
          regrouping: regrouping,
          numberpads: numberpads
        };
      };
      Calculator.prototype.setUpQuestionArea = function(row) {
        var firstOperand = (row[3] + "").indexOf(",");
        var tempFirst;
        if (-1 != firstOperand) {
          tempFirst = (row[3] + "").split(",");
          this.firstNumber = this.selectRandomOne(tempFirst);
        }
        firstOperand = (row[3] + "").indexOf("-");
        if (-1 != firstOperand) {
          tempFirst = (row[3] + "").split("-");
          this.firstNumber = this.generateRandomNumbers(tempFirst[0], tempFirst[1]);
        }
        1 == (row[3] + "").length && (this.firstNumber = parseInt(tempFirst[0]));
        console.log(this.firstNumber.toString().trim().length, " <<< Str length ", this.firstNumber.toString().trim());
        var secondOperand = (row[6] + "").indexOf(",");
        var tempSecond;
        if (-1 != secondOperand) {
          tempSecond = (row[6] + "").split(",");
          this.secondNumber = this.selectRandomOne(tempSecond);
        }
        secondOperand = (row[6] + "").indexOf("-");
        if (-1 != secondOperand) {
          tempSecond = (row[6] + "").split("-");
          this.secondNumber = this.generateRandomNumbers(tempSecond[0], tempSecond[1]);
        }
        1 == (row[6] + "").length && (this.secondNumber = parseInt(tempSecond[0]));
        "TRUE" == row[4] && (this.isPlusSign = true);
        if (Number(this.secondNumber) > Number(this.firstNumber) && !this.isPlusSign) {
          this.secondNumber = Number(this.firstNumber) + Number(this.secondNumber);
          this.firstNumber = Number(this.secondNumber) - Number(this.firstNumber);
          this.secondNumber = Number(this.secondNumber) - Number(this.firstNumber);
        }
        var startIndex = 4 - this.firstNumber.toString().trim().length + 1;
        for (var i = 0; i < this.firstNumber.toString().trim().length; i++) {
          var tempLabelPrefab = cc.instantiate(this.labelPrefab);
          tempLabelPrefab.getComponent(cc.Label).string = this.firstNumber.toString().trim().charAt(i);
          tempLabelPrefab.name = "" + i;
          this.node.getChildByName("answersLabel").getChildByName("firstNum_1").getChildByName("" + (i + startIndex)).addChild(tempLabelPrefab);
        }
        var operatorLabelPrefab = cc.instantiate(this.labelPrefab);
        operatorLabelPrefab.getComponent(cc.Label).string = this.isPlusSign ? "+" : "-";
        operatorLabelPrefab.name = this.isPlusSign ? "plus" : "minus";
        this.node.getChildByName("answersLabel").getChildByName("secondNum_1").getChildByName("" + (4 - this.secondNumber.toString().trim().length)).addChild(operatorLabelPrefab);
        var startIndex2 = 4 - this.secondNumber.toString().trim().length + 1;
        for (var i = 0; i < this.secondNumber.toString().trim().length; i++) {
          var tempLabelPrefab = cc.instantiate(this.labelPrefab);
          tempLabelPrefab.getComponent(cc.Label).string = this.secondNumber.toString().trim().charAt(i);
          tempLabelPrefab.name = "" + i;
          this.node.getChildByName("answersLabel").getChildByName("secondNum_1").getChildByName("" + (i + startIndex2)).addChild(tempLabelPrefab);
        }
        this.isPlusSign ? this.resultNumber = Number(this.firstNumber) + Number(this.secondNumber) : this.resultNumber = Number(this.firstNumber) - Number(this.secondNumber);
      };
      Calculator.prototype.setUpLayout = function() {
        this._drawingAreaNode = cc.instantiate(this.drawingAreaPrefab);
        this._layout.addChild(this._drawingAreaNode);
        this._countingAnswer = cc.instantiate(this.countingAnswerPrefab);
        this._countingAnswer.getComponent(counting_answer_1.default).numberpads = this._currentConfig.numberpads;
        this._countingAnswer.getComponent(counting_answer_1.default).result = "" + this.resultNumber;
        this._countingAnswer.getComponent(counting_answer_1.default).delay = 0;
        this._layout.addChild(this._countingAnswer);
      };
      Calculator.prototype.clearDrawing = function() {
        void 0 != this.drawing && this.drawing.clear();
      };
      Calculator.prototype.onTouchStart = function(touch) {
        var location = touch.getLocation();
        if (0 == touch.getID()) {
          this.startLocation.x = this.node.getParent().convertToNodeSpaceAR(location).x - this.adjustCords.x;
          this.startLocation.y = this.node.getParent().convertToNodeSpaceAR(location).y - this.adjustCords.y;
        }
        cc.log("on touch start!!! " + this.node.getParent().convertToNodeSpaceAR(location));
      };
      Calculator.prototype.generateRandomNumbers = function(start, end) {
        return Math.floor(Math.random() * (+end - +start)) + +start;
      };
      Calculator.prototype.selectRandomOne = function(arr) {
        var randomSelect = this.generateRandomNumbers(0, arr.length);
        return arr[randomSelect];
      };
      Calculator.prototype.onTouchMove = function(touch) {
        if (0 == touch.getID()) {
          var location = touch.getLocation();
          var nodeSpaceLocation = this.node.getParent().convertToNodeSpaceAR(location);
          var tempCord = nodeSpaceLocation.x - this.adjustCords.x;
          var tempCordY = nodeSpaceLocation.y - this.adjustCords.y;
          cc.log("on move!!! " + tempCordY);
          if (this.calculateMagnitute(nodeSpaceLocation, this.last_location) > 10 && tempCord > -460 && tempCord < -50 && tempCordY > -250 && tempCordY < 250) {
            console.log("Prefab Spawned!!!");
            this.drawing = this.node.getChildByName("canvas").getChildByName("graphicsNode").getComponent(cc.Graphics);
            this.drawing.lineWidth = 6;
            this.drawing.moveTo(this.startLocation.x, this.startLocation.y);
            this.drawing.lineTo(nodeSpaceLocation.x - this.adjustCords.x, nodeSpaceLocation.y - this.adjustCords.y);
            this.drawing.strokeColor = cc.Color.BLACK;
            this.drawing.stroke();
            this.last_location = nodeSpaceLocation;
            this.startLocation.x = nodeSpaceLocation.x - this.adjustCords.x;
            this.startLocation.y = nodeSpaceLocation.y - this.adjustCords.y;
          }
        }
      };
      Calculator.prototype.onTouchEnd = function(touch) {
        cc.log("on touch end!!!");
      };
      Calculator.prototype.calculateMagnitute = function(location1, location2) {
        var deltaX = location1.x - location2.x;
        var deltaY = location1.y - location2.y;
        var magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        return magnitude;
      };
      Calculator.prototype.start = function() {};
      Calculator.prototype.onDestroy = function() {
        clearTimeout(this.clearTime);
      };
      __decorate([ property(cc.Label) ], Calculator.prototype, "label", void 0);
      __decorate([ property(cc.Prefab) ], Calculator.prototype, "drawingDot", void 0);
      __decorate([ property(cc.Prefab) ], Calculator.prototype, "drawingAreaPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Calculator.prototype, "countingAnswerPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Calculator.prototype, "labelPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Calculator.prototype, "layoutPrefab", void 0);
      __decorate([ property ], Calculator.prototype, "text", void 0);
      __decorate([ error_handler_1.default() ], Calculator.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], Calculator.prototype, "helpIterator", null);
      __decorate([ error_handler_1.default() ], Calculator.prototype, "showHelp", null);
      __decorate([ error_handler_1.default() ], Calculator.prototype, "loadData", null);
      __decorate([ error_handler_1.default() ], Calculator.prototype, "setUpQuestionArea", null);
      __decorate([ error_handler_1.default() ], Calculator.prototype, "setUpLayout", null);
      __decorate([ error_handler_1.default() ], Calculator.prototype, "clearDrawing", null);
      __decorate([ error_handler_1.default() ], Calculator.prototype, "onTouchStart", null);
      __decorate([ error_handler_1.default() ], Calculator.prototype, "generateRandomNumbers", null);
      __decorate([ error_handler_1.default() ], Calculator.prototype, "selectRandomOne", null);
      __decorate([ error_handler_1.default() ], Calculator.prototype, "onTouchMove", null);
      __decorate([ error_handler_1.default() ], Calculator.prototype, "onTouchEnd", null);
      __decorate([ error_handler_1.default() ], Calculator.prototype, "calculateMagnitute", null);
      __decorate([ error_handler_1.default() ], Calculator.prototype, "start", null);
      __decorate([ error_handler_1.default() ], Calculator.prototype, "onDestroy", null);
      Calculator = __decorate([ ccclass ], Calculator);
      return Calculator;
    }(game_1.default);
    exports.default = Calculator;
    cc._RF.pop();
  }, {
    "../../../common/scripts/answer-grid": void 0,
    "../../../common/scripts/counting-answer": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0
  } ]
}, {}, [ "calculator" ]);