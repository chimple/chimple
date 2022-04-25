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
  nimbletable: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6a390mFaB9B/LrP8hn2ahQC", "nimbletable");
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
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var game_1 = require("../../../common/scripts/game");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NimbleTable = function(_super) {
      __extends(NimbleTable, _super);
      function NimbleTable() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.choicesPrefab = null;
        _this.correctAudio = null;
        _this.wrongAudio = null;
        _this.text = "hello";
        _this.arr_name = [];
        _this.currentProblem = 0;
        _this.totalNextQues = 4;
        _this.checkLasts = false;
        _this._totalCount = null;
        _this.isInitial = true;
        return _this;
      }
      NimbleTable.prototype.nextProblem = function() {
        this.currentProblem++;
        if ("" == this.arr_name[this.currentProblem][5]) this.node.emit("nextProblem"); else {
          this.node.getChildByName("examples").getChildByName("layoutExamples").removeAllChildren();
          this.makeScreen();
        }
      };
      NimbleTable.prototype.makeNimbleTableData = function(array) {
        var result = [];
        var dataRowsCount = 0;
        for (var i = 3; i < array.length; i += 7) {
          dataRowsCount++;
          var k = i;
          var temp = [ "1", "1", "1", "1" ];
          temp.push(array[k + 3]);
          temp.push(array[k + 4]);
          temp.push(array[k + 5]);
          temp.push(array[k + 6]);
          for (var c = 0, d = +array[k]; c < 15; c++, d += +array[k + 2]) d <= +array[k + 1] ? temp.push(d.toString()) : temp.push("");
          result.push(temp);
        }
        for (var i = 1; i <= dataRowsCount; i++) result.push([ "1", "1", i.toString(), "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ]);
        return result;
      };
      NimbleTable.prototype.onLoad = function() {
        var config = config_1.default.getInstance();
        var result = this.makeNimbleTableData(config_1.default.i.data[0]);
        console.log("data came", result);
        this.arr_name = result;
        this.makeScreen();
      };
      NimbleTable.prototype.makeScreen = function() {
        this.examples = [];
        var el = this.arr_name[this.currentProblem];
        this.firstValue = el[4];
        this.secondValue = el[5];
        this.mathSign = el[6];
        this.rightAnswer = el[7];
        var tempString = "";
        var answerNode = null;
        this._totalCount = this.rightAnswer;
        "" != this.firstValue && (this.node.getChildByName("questionboard_quickfacts").getChildByName("question").getComponent(cc.Label).string = tempString + this.firstValue + " " + this.mathSign + " " + this.secondValue + " = ?");
        for (var i = 8; i <= 22; i++) if ("" != el[i]) {
          this.totalExamplesCount = i;
          this.examples.push(el[i]);
          var choices = cc.instantiate(this.choicesPrefab);
          choices.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = el[i];
          el[i] === this.rightAnswer && null != choices && (answerNode = choices);
          this.node.getChildByName("examples").getChildByName("layoutExamples").addChild(choices);
          choices.name = "2_" + i;
          choices.getComponent(cc.Button).node.on("click", this.callback, this);
          choices.getComponent(cc.Animation).play("popup");
        }
        if (this.isInitial) {
          this.isInitial = false;
          try {
            util_1.Util.showHelp(answerNode, answerNode);
          } catch (e) {}
        }
        for (var i = 0; i < 4; i++) {
          var el_1 = this.arr_name[i + this.currentProblem + 1];
          var labelNode = this.node.getChildByName("nextQues").getChildByName("transparentBg").getChildByName("containerNode").getChildByName("" + (i + 1));
          if ("" != el_1[5]) {
            var questionString = "";
            labelNode.getComponent(cc.Label).string = questionString + el_1[4] + " " + el_1[6] + " " + el_1[5] + " = ?";
          } else labelNode.getComponent(cc.Label).string = "";
        }
      };
      NimbleTable.prototype.callback = function(event) {
        var _this = this;
        var buttonValue = this.node.getChildByName("examples").getChildByName("layoutExamples").getChildByName(event.node.name).getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string;
        if (buttonValue == this.rightAnswer) {
          this.node.emit("correct");
          for (var i = 8; i <= this.totalExamplesCount; i++) {
            this.node.getChildByName("examples").getChildByName("layoutExamples").getChildByName("2_" + i).getComponent(cc.Animation).play("correct");
            this.node.getChildByName("examples").getChildByName("layoutExamples").getChildByName("2_" + i).getComponent(cc.Button).node.off("click", this.callback, this);
          }
          this.nextProblemTimeout = setTimeout(function() {
            var tempString = "";
            _this.node.getChildByName("questionboard_quickfacts").getChildByName("question").getComponent(cc.Label).string = tempString + _this.firstValue + " " + _this.mathSign + " " + _this.secondValue + " = " + _this.rightAnswer;
            var timeFactor = .5;
            var nextProblemAnimation = cc.moveBy(timeFactor, 0, 132);
            var questionUpAction = cc.moveBy(timeFactor / 3, 2, 50);
            util_1.Util.speakEquation([ String(_this._totalCount) ], function(index) {});
            _this.nextProblemTimeout2 = setTimeout(function() {
              _this.node.getChildByName("questionboard_quickfacts").getChildByName("question").runAction(cc.sequence(questionUpAction, cc.callFunc(function() {
                _this.node.getChildByName("questionboard_quickfacts").getChildByName("question").getComponent(cc.Label).string = "";
                _this.node.getChildByName("questionboard_quickfacts").getChildByName("question").position = new cc.Vec3(-7, -70);
              })));
              _this.node.getChildByName("nextQues").getChildByName("transparentBg").getChildByName("containerNode").runAction(cc.sequence(nextProblemAnimation, cc.callFunc(function() {
                _this.nextProblem();
                _this.node.getChildByName("nextQues").getChildByName("transparentBg").getChildByName("containerNode").position = new cc.Vec3(12, 50);
              })));
            }, 3e3);
          }, 300);
        } else {
          this.node.emit("wrong");
          this.node.getChildByName("examples").getChildByName("layoutExamples").getChildByName(event.node.name).getComponent(cc.Animation).play("wrong");
          setTimeout(function() {
            _this.wrongAnimationTimer = _this.node.getChildByName("examples").getChildByName("layoutExamples").getChildByName(event.node.name).removeAllChildren();
          }, 300);
        }
      };
      NimbleTable.prototype.onDestroy = function() {
        clearTimeout(this.wrongAnimationTimer);
        clearTimeout(this.nextProblemTimeout);
        clearTimeout(this.nextProblemTimeout2);
      };
      __decorate([ property(cc.Label) ], NimbleTable.prototype, "label", void 0);
      __decorate([ property(cc.Prefab) ], NimbleTable.prototype, "choicesPrefab", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], NimbleTable.prototype, "correctAudio", void 0);
      __decorate([ property({
        type: cc.AudioClip
      }) ], NimbleTable.prototype, "wrongAudio", void 0);
      __decorate([ property ], NimbleTable.prototype, "text", void 0);
      __decorate([ error_handler_1.default() ], NimbleTable.prototype, "nextProblem", null);
      __decorate([ error_handler_1.default() ], NimbleTable.prototype, "makeNimbleTableData", null);
      __decorate([ error_handler_1.default() ], NimbleTable.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], NimbleTable.prototype, "makeScreen", null);
      __decorate([ error_handler_1.default() ], NimbleTable.prototype, "callback", null);
      __decorate([ error_handler_1.default() ], NimbleTable.prototype, "onDestroy", null);
      NimbleTable = __decorate([ ccclass ], NimbleTable);
      return NimbleTable;
    }(game_1.default);
    exports.default = NimbleTable;
    cc._RF.pop();
  }, {
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0
  } ]
}, {}, [ "nimbletable" ]);