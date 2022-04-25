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
  equationChoice: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "56b73ULfw9L5ZwTSwwHMoYt", "equationChoice");
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
    var drag_1 = require("../../../common/scripts/drag");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var EquationChoice = function(_super) {
      __extends(EquationChoice, _super);
      function EquationChoice() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bgNode = null;
        return _this;
      }
      EquationChoice.prototype.onTouchEnd = function(touch) {
        _super.prototype.onTouchEnd.call(this, touch);
        this.isDragging && (this.match ? this.node.emit("equationMatch") : this.node.emit("equationNoMatch"));
      };
      __decorate([ property(cc.Node) ], EquationChoice.prototype, "bgNode", void 0);
      EquationChoice = __decorate([ ccclass ], EquationChoice);
      return EquationChoice;
    }(drag_1.default);
    exports.default = EquationChoice;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0
  } ],
  equationDrop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c1f45FcFqZJfrhkuJ6ZxTfO", "equationDrop");
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
    var drop_1 = require("../../../common/scripts/drop");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var EquationDrop = function(_super) {
      __extends(EquationDrop, _super);
      function EquationDrop() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      EquationDrop = __decorate([ ccclass ], EquationDrop);
      return EquationDrop;
    }(drop_1.default);
    exports.default = EquationDrop;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drop": void 0
  } ],
  foodjar: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a6684eBznNCa6ASE01tZ+dS", "foodjar");
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
    var countingLayout_1 = require("../../../common/scripts/countingLayout");
    var drag_1 = require("../../../common/scripts/drag");
    var game_1 = require("../../../common/scripts/game");
    var config_1 = require("../../../common/scripts/lib/config");
    var util_1 = require("../../../common/scripts/util");
    var multLayout_1 = require("../scripts/multLayout");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var numAddTextures = 9;
    var numSubTextures = 3;
    var FoodJarProblem = function() {
      function FoodJarProblem() {}
      FoodJarProblem.prototype.toStringArray = function() {
        return [ this.first.toString(), this.operator, this.second.toString(), "=", this.answer.toString() ];
      };
      return FoodJarProblem;
    }();
    var BoxType;
    (function(BoxType) {
      BoxType[BoxType["Empty"] = 0] = "Empty";
      BoxType[BoxType["Label"] = 1] = "Label";
      BoxType[BoxType["LabelInCard"] = 2] = "LabelInCard";
      BoxType[BoxType["Objects"] = 3] = "Objects";
      BoxType[BoxType["ObjectsInCard"] = 4] = "ObjectsInCard";
    })(BoxType || (BoxType = {}));
    var LayoutType;
    (function(LayoutType) {
      LayoutType[LayoutType["NumbersOnTop"] = 0] = "NumbersOnTop";
      LayoutType[LayoutType["Mixed"] = 1] = "Mixed";
      LayoutType[LayoutType["ObjectsOnTop"] = 2] = "ObjectsOnTop";
      LayoutType[LayoutType["Multiplication"] = 3] = "Multiplication";
    })(LayoutType || (LayoutType = {}));
    var FoodJar = function(_super) {
      __extends(FoodJar, _super);
      function FoodJar() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.firstLayout = null;
        _this.secondLayout = null;
        _this.choiceLayout = null;
        _this.equationChoice = null;
        _this.countingLayout = null;
        _this.equationDrop = null;
        _this.equationLabel = null;
        _this.multDrop = null;
        _this.multChoice = null;
        _this.addTexture1 = null;
        _this.addTexture2 = null;
        _this.addTexture3 = null;
        _this.addTexture4 = null;
        _this.addTexture5 = null;
        _this.addTexture6 = null;
        _this.addTexture7 = null;
        _this.addTexture8 = null;
        _this.addTexture9 = null;
        _this.subFullTexture1 = null;
        _this.subEmptyTexture1 = null;
        _this.subFullTexture2 = null;
        _this.subEmptyTexture2 = null;
        _this.subFullTexture3 = null;
        _this.subEmptyTexture3 = null;
        _this.choiceNodes = [];
        _this.problem = new FoodJarProblem();
        _this.notSolved = 0;
        _this.layoutType = null;
        _this.jars = [];
        _this.firstDrag = null;
        _this.firstDrop = null;
        return _this;
      }
      FoodJar.prototype.onLoad = function() {
        var _this = this;
        drag_1.default.letDrag = false;
        cc.director.getCollisionManager().enabled = true;
        var row = config_1.default.getInstance().data[0];
        var level = row[0], worksheet = row[1], problem = row[2], type = row[3], mathSign = row[4], minNumber = row[5], maxNumber = row[6], repeat = row[7], line1BlankCount = row[8], panelCount = row[9];
        var operator = "R" == mathSign ? Math.random() < .5 ? "+" : "-" : mathSign;
        "A" == type ? parseInt(line1BlankCount) > 0 ? this.layoutType = LayoutType.Mixed : this.layoutType = LayoutType.NumbersOnTop : this.layoutType = "B" == type ? LayoutType.ObjectsOnTop : LayoutType.Multiplication;
        if (this.layoutType == LayoutType.Multiplication) this.layoutLong(parseInt(minNumber), parseInt(repeat)); else {
          this.createProblem(parseInt(minNumber), parseInt(maxNumber), operator, parseInt(panelCount));
          this.layoutScreen(type, parseInt(line1BlankCount));
          this.choiceNodes.forEach(function(element) {
            _this.choiceLayout.addChild(element);
          });
        }
        this.choiceLayout.children.length > 5 && (this.choiceLayout.getComponent(cc.Layout).spacingX = 10);
        drag_1.default.letDrag = true;
        util_1.Util.showHelp(this.firstDrag, this.firstDrop);
      };
      FoodJar.prototype.checkIfDone = function() {
        var _this = this;
        this.node.emit("correct");
        if (--this.notSolved <= 0) {
          drag_1.default.letDrag = false;
          this.scheduleOnce(function() {
            if (_this.layoutType == LayoutType.Multiplication) {
              _this.choiceLayout.removeAllChildren();
              _this.choiceLayout.addChild(_this.createLabel(_this.problem.first.toString()));
              _this.choiceLayout.addChild(_this.createLabel(_this.problem.operator));
              _this.choiceLayout.addChild(_this.createLabel(_this.problem.second.toString()));
              _this.choiceLayout.addChild(_this.createLabel("="));
              _this.choiceLayout.addChild(_this.createLabel(_this.problem.answer.toString()));
            }
            _this.scaleForSpeaking(-1);
            _this.friend.speakEquation(_this.problem.toStringArray(), _this.scaleForSpeaking.bind(_this));
          }, 2);
        }
      };
      FoodJar.prototype.indicateWrongMove = function() {
        this.node.emit("wrong");
      };
      FoodJar.prototype.scaleForSpeaking = function(index) {
        var _this = this;
        var layout = this.secondLayout;
        this.layoutType == LayoutType.NumbersOnTop ? layout = this.firstLayout : this.layoutType == LayoutType.Multiplication && (layout = this.choiceLayout);
        index >= 0 && (layout.children[index].scale = 1);
        if (index + 1 < layout.children.length) layout.children[index + 1].scale = 1.2; else {
          null != this.friend && this.friend.playAnimation("jumping", 1);
          new cc.Tween().target(this.friendPos).to(1, {
            x: 0
          }, null).call(function() {
            null != _this.friend && _this.friend.playAnimation("eating", 1);
            _this.jars.forEach(function(jar) {
              var cl = jar.getComponent(countingLayout_1.default);
              if (null != cl) null != _this.friend && cl.feed(_this.friend.node); else {
                var ml = jar.getComponent(multLayout_1.default);
                null != ml && null != _this.friend && ml.feed(_this.friend.node);
              }
            });
            _this.firstLayout.parent.removeAllChildren();
          }).delay(3).call(function() {
            _this.node.emit("nextProblem");
          }).start();
        }
      };
      FoodJar.prototype.createEmpty = function(name, boxType) {
        this.notSolved++;
        var drop = cc.instantiate(this.equationDrop);
        drop.name = boxType == BoxType.Label ? "L" + name : "O" + name;
        null == this.firstDrop && (this.firstDrop = drop);
        return drop;
      };
      FoodJar.prototype.createLabel = function(name, shrink) {
        void 0 === shrink && (shrink = false);
        var labelNode = cc.instantiate(this.equationLabel);
        var child = labelNode.getChildByName("New Label");
        var label = child.getComponent(cc.Label);
        label.string = name;
        if (shrink) {
          label.fontSize = 60;
          labelNode.width = child.width;
        }
        return labelNode;
      };
      FoodJar.prototype.createLabelInCard = function(name) {
        return this.createCard("L" + name, this.createLabel(name));
      };
      FoodJar.prototype.createObjects = function(count, textureIndex, emptyCount) {
        void 0 === textureIndex && (textureIndex = 0);
        void 0 === emptyCount && (emptyCount = -1);
        var clNode = cc.instantiate(this.countingLayout);
        var cl = clNode.getComponent(countingLayout_1.default);
        this.jars.push(clNode);
        cl.fullCount = count;
        0 == textureIndex && (textureIndex = Math.ceil(Math.random() * numAddTextures));
        if (-1 == emptyCount) cl.fullTexture = this["addTexture" + textureIndex]; else {
          cl.emptyCount = emptyCount;
          cl.fullTexture = this["subFullTexture" + textureIndex];
          cl.emptyTexture = this["subEmptyTexture" + textureIndex];
        }
        return clNode;
      };
      FoodJar.prototype.createObjectsInCard = function(count) {
        return this.createCard("O" + count.toString(), this.createObjects(count));
      };
      FoodJar.prototype.createCard = function(name, child) {
        var _this = this;
        var ec = cc.instantiate(this.equationChoice);
        ec.on("equationMatch", function() {
          _this.checkIfDone();
        });
        ec.on("equationNoMatch", function() {
          _this.indicateWrongMove();
        });
        ec.name = name;
        ec.addChild(child);
        null != this.firstDrop && this.firstDrop.name == name && null == this.firstDrag && (this.firstDrag = ec);
        var tempNode = new cc.Node();
        tempNode.addChild(ec);
        tempNode.height = ec.height;
        tempNode.width = ec.width;
        return tempNode;
      };
      FoodJar.prototype.createLongCard = function(count, draggable) {
        var _this = this;
        void 0 === draggable && (draggable = true);
        var lc = cc.instantiate(this.multChoice);
        this.jars.push(lc);
        if (draggable) {
          lc.on("equationMatch", function() {
            _this.checkIfDone();
          });
          lc.on("equationNoMatch", function() {
            _this.indicateWrongMove();
          });
          null != this.firstDrop && this.firstDrop.name == count.toString() && null == this.firstDrag && (this.firstDrag = lc);
        } else {
          var drag = lc.getComponent(drag_1.default);
          drag.allowDrag = false;
        }
        lc.name = count.toString();
        var ml = lc.getComponent(multLayout_1.default);
        ml.count = count;
        var tempNode = new cc.Node();
        tempNode.addChild(lc);
        tempNode.height = lc.height;
        tempNode.width = lc.width;
        return tempNode;
      };
      FoodJar.prototype.createLongEmpty = function(name) {
        this.notSolved++;
        var md = cc.instantiate(this.multDrop);
        md.name = name;
        null == this.firstDrop && (this.firstDrop = md);
        return md;
      };
      FoodJar.prototype.createProblem = function(minNumber, maxNumber, operator, numChoices) {
        this.problem.operator = operator;
        this.problem.choices = [];
        "-" == operator && (maxNumber -= 1);
        this.problem.answer = Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
        if ("+" == operator) {
          this.problem.answer = Math.floor(Math.random() * (maxNumber - minNumber - 1)) + minNumber + 1;
          this.problem.first = Math.floor(Math.random() * (this.problem.answer - 1 - minNumber)) + minNumber;
          this.problem.second = this.problem.answer - this.problem.first;
        } else if ("-" == operator) {
          this.problem.answer = Math.floor(Math.random() * (maxNumber - 1 - minNumber)) + minNumber;
          this.problem.first = Math.floor(Math.random() * (maxNumber - this.problem.answer + 1)) + this.problem.answer + 1;
          this.problem.second = this.problem.first - this.problem.answer;
        }
        this.problem.choices.push(this.problem.first, this.problem.second, this.problem.answer);
        var choiceOptions = [];
        for (var index = minNumber; index <= maxNumber; index++) index != this.problem.answer && index != this.problem.first && index != this.problem.second && choiceOptions.push(index);
        while (this.problem.choices.length <= numChoices && choiceOptions.length > 0) {
          var randIndex = Math.floor(Math.random() * choiceOptions.length);
          this.problem.choices.push(choiceOptions[randIndex]);
          choiceOptions.splice(randIndex, 1);
        }
      };
      FoodJar.prototype.layoutScreen = function(type, blankCount) {
        var numbersOnTop = this.layoutType == LayoutType.NumbersOnTop;
        if (this.layoutType == LayoutType.NumbersOnTop || this.layoutType == LayoutType.Mixed) {
          this.addColumn(this.problem.first, numbersOnTop, Math.random() > .5);
          this.firstLayout.addChild(this.createLabel(this.problem.operator));
          this.secondLayout.addChild(this.createLabel(this.problem.operator));
          this.addColumn(this.problem.second, numbersOnTop, Math.random() > .5);
          this.firstLayout.addChild(this.createLabel("="));
          this.secondLayout.addChild(this.createLabel("="));
          this.addColumn(this.problem.answer, numbersOnTop, Math.random() > .5);
          for (var index = 3; index < this.problem.choices.length; index++) numbersOnTop ? this.addToChoicesRandomly(this.createObjectsInCard(this.problem.choices[index])) : Math.random() > .5 ? this.addToChoicesRandomly(this.createObjectsInCard(this.problem.choices[index])) : this.addToChoicesRandomly(this.createLabelInCard(this.problem.choices[index].toString()));
        } else if (this.layoutType == LayoutType.ObjectsOnTop) {
          if ("+" == this.problem.operator) {
            this.addSumObjects(this.firstLayout, this.problem.first);
            this.addSumObjects(this.firstLayout, this.problem.second);
          } else {
            var textureIndex = Math.ceil(Math.random() * numSubTextures);
            if (this.problem.first > 10) {
              this.firstLayout.addChild(this.createObjects(10, textureIndex, Math.max(0, 10 - this.problem.answer)));
              var secondNum = this.problem.first - 10;
              this.firstLayout.addChild(this.createObjects(secondNum, textureIndex, Math.min(secondNum, this.problem.second)));
            } else this.firstLayout.addChild(this.createObjects(this.problem.first, textureIndex, this.problem.second));
          }
          this.secondLayout.addChild(this.createEmpty(this.problem.first.toString(), BoxType.Label));
          this.secondLayout.addChild(this.createEmpty(this.problem.operator, BoxType.Label));
          this.secondLayout.addChild(this.createEmpty(this.problem.second.toString(), BoxType.Label));
          this.secondLayout.addChild(this.createEmpty("=", BoxType.Label));
          this.secondLayout.addChild(this.createEmpty(this.problem.answer.toString(), BoxType.Label));
          this.addToChoicesRandomly(this.createLabelInCard(this.problem.first.toString()));
          this.addToChoicesRandomly(this.createLabelInCard(this.problem.operator.toString()));
          this.addToChoicesRandomly(this.createLabelInCard(this.problem.second.toString()));
          this.addToChoicesRandomly(this.createLabelInCard("="));
          this.addToChoicesRandomly(this.createLabelInCard(this.problem.answer.toString()));
        }
      };
      FoodJar.prototype.addSumObjects = function(layout, num) {
        if (num > 10) {
          var textureIndex = Math.ceil(Math.random() * numSubTextures);
          layout.addChild(this.createObjects(10, textureIndex, 0));
          layout.addChild(this.createObjects(num - 10, textureIndex, 0));
        } else layout.addChild(this.createObjects(num));
      };
      FoodJar.prototype.layoutLong = function(num, count) {
        this.problem.first = num;
        this.problem.second = count;
        this.problem.operator = "x";
        this.problem.answer = num * count;
        this.node.getChildByName("New Layout").removeChild(this.secondLayout);
        this.firstLayout.height = 324;
        this.choiceLayout.height = 324;
        for (var index = 1; index <= count; index++) {
          this.firstLayout.addChild(this.createLongEmpty(num.toString()));
          index == count ? this.firstLayout.addChild(this.createLabel("=", true)) : this.firstLayout.addChild(this.createLabel("+", true));
          this.choiceLayout.addChild(this.createLongCard(num));
        }
        this.firstLayout.addChild(this.createLongCard(num * count, false));
      };
      FoodJar.prototype.addColumn = function(num, topRowNum, secondRowEmpty) {
        if (topRowNum) {
          this.firstLayout.addChild(this.createLabel(num.toString()));
          this.secondLayout.addChild(this.createEmpty(num.toString(), BoxType.Objects));
          this.addToChoicesRandomly(this.createObjectsInCard(num));
        } else if (secondRowEmpty) {
          this.firstLayout.addChild(this.createObjects(num));
          this.secondLayout.addChild(this.createEmpty(num.toString(), BoxType.Label));
          this.addToChoicesRandomly(this.createLabelInCard(num.toString()));
        } else {
          this.firstLayout.addChild(this.createEmpty(num.toString(), BoxType.Objects));
          this.secondLayout.addChild(this.createLabel(num.toString()));
          this.addToChoicesRandomly(this.createObjectsInCard(num));
        }
      };
      FoodJar.prototype.addToChoicesRandomly = function(node) {
        this.choiceNodes.splice(Math.floor(Math.random() * this.choiceNodes.length), 0, node);
      };
      __decorate([ property(cc.Node) ], FoodJar.prototype, "firstLayout", void 0);
      __decorate([ property(cc.Node) ], FoodJar.prototype, "secondLayout", void 0);
      __decorate([ property(cc.Node) ], FoodJar.prototype, "choiceLayout", void 0);
      __decorate([ property(cc.Prefab) ], FoodJar.prototype, "equationChoice", void 0);
      __decorate([ property(cc.Prefab) ], FoodJar.prototype, "countingLayout", void 0);
      __decorate([ property(cc.Prefab) ], FoodJar.prototype, "equationDrop", void 0);
      __decorate([ property(cc.Prefab) ], FoodJar.prototype, "equationLabel", void 0);
      __decorate([ property(cc.Prefab) ], FoodJar.prototype, "multDrop", void 0);
      __decorate([ property(cc.Prefab) ], FoodJar.prototype, "multChoice", void 0);
      __decorate([ property(cc.SpriteFrame) ], FoodJar.prototype, "addTexture1", void 0);
      __decorate([ property(cc.SpriteFrame) ], FoodJar.prototype, "addTexture2", void 0);
      __decorate([ property(cc.SpriteFrame) ], FoodJar.prototype, "addTexture3", void 0);
      __decorate([ property(cc.SpriteFrame) ], FoodJar.prototype, "addTexture4", void 0);
      __decorate([ property(cc.SpriteFrame) ], FoodJar.prototype, "addTexture5", void 0);
      __decorate([ property(cc.SpriteFrame) ], FoodJar.prototype, "addTexture6", void 0);
      __decorate([ property(cc.SpriteFrame) ], FoodJar.prototype, "addTexture7", void 0);
      __decorate([ property(cc.SpriteFrame) ], FoodJar.prototype, "addTexture8", void 0);
      __decorate([ property(cc.SpriteFrame) ], FoodJar.prototype, "addTexture9", void 0);
      __decorate([ property(cc.SpriteFrame) ], FoodJar.prototype, "subFullTexture1", void 0);
      __decorate([ property(cc.SpriteFrame) ], FoodJar.prototype, "subEmptyTexture1", void 0);
      __decorate([ property(cc.SpriteFrame) ], FoodJar.prototype, "subFullTexture2", void 0);
      __decorate([ property(cc.SpriteFrame) ], FoodJar.prototype, "subEmptyTexture2", void 0);
      __decorate([ property(cc.SpriteFrame) ], FoodJar.prototype, "subFullTexture3", void 0);
      __decorate([ property(cc.SpriteFrame) ], FoodJar.prototype, "subEmptyTexture3", void 0);
      FoodJar = __decorate([ ccclass ], FoodJar);
      return FoodJar;
    }(game_1.default);
    exports.default = FoodJar;
    cc._RF.pop();
  }, {
    "../../../common/scripts/countingLayout": void 0,
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/util": void 0,
    "../scripts/multLayout": "multLayout"
  } ],
  multLayout: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8d78cWrjR9MGaovV7XxWmV4", "multLayout");
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
    var MultLayout = function(_super) {
      __extends(MultLayout, _super);
      function MultLayout() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.count = 0;
        _this.countingSpriteFrame = null;
        _this.objectsLayout = null;
        _this.label = null;
        return _this;
      }
      MultLayout.prototype.onLoad = function() {
        this.label.string = this.count.toString();
        var layout = this.objectsLayout.getComponent(cc.Layout);
        this.count > 12 && (layout.cellSize = cc.size(16, 16));
        for (var index = 0; index < this.count; index++) {
          var image = new cc.Node();
          var sprite = image.addComponent(cc.Sprite);
          sprite.spriteFrame = this.countingSpriteFrame;
          this.objectsLayout.addChild(image);
        }
      };
      MultLayout.prototype.feed = function(friend) {
        var friendPos = friend.convertToWorldSpaceAR(cc.Vec2.ZERO);
        friendPos.y += 200;
        var _loop_1 = function() {
          var fruit = this_1.objectsLayout.children[this_1.objectsLayout.childrenCount - 1];
          var pos = fruit.convertToWorldSpaceAR(cc.Vec2.ZERO);
          fruit.removeFromParent(true);
          fruit.position = pos;
          cc.director.getScene().addChild(fruit);
          new cc.Tween().target(fruit).to(1, {
            position: friendPos
          }, null).call(function() {
            fruit.active = false;
          }).start();
        };
        var this_1 = this;
        while (this.objectsLayout.childrenCount > 0) _loop_1();
      };
      __decorate([ property ], MultLayout.prototype, "count", void 0);
      __decorate([ property(cc.SpriteFrame) ], MultLayout.prototype, "countingSpriteFrame", void 0);
      __decorate([ property(cc.Node) ], MultLayout.prototype, "objectsLayout", void 0);
      __decorate([ property(cc.Label) ], MultLayout.prototype, "label", void 0);
      MultLayout = __decorate([ ccclass ], MultLayout);
      return MultLayout;
    }(cc.Component);
    exports.default = MultLayout;
    cc._RF.pop();
  }, {} ]
}, {}, [ "equationChoice", "equationDrop", "foodjar", "multLayout" ]);