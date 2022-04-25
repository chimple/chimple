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
  "move-choice": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8c66eiPV19DvJxjaiL66KuI", "move-choice");
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
    var util_1 = require("../../../common/scripts/util");
    var auto_drag_1 = require("../../../common/scripts/auto-drag");
    var helper_1 = require("../../../common/scripts/helper");
    var ccclass = cc._decorator.ccclass;
    var MoveChoice = function(_super) {
      __extends(MoveChoice, _super);
      function MoveChoice() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.moveDropNode = null;
        _this.value = null;
        _this.parent = null;
        _this.dragInProgress = false;
        return _this;
      }
      MoveChoice.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
      };
      MoveChoice.prototype.onTouchStart = function(touch) {
        _super.prototype.onTouchStart.call(this, touch);
        if (this.allowDrag && !this.dragInProgress) {
          this.dragInProgress = true;
          util_1.Util.speakEquation([ String(this.value) ], function(index) {});
        }
      };
      MoveChoice.prototype.onTouchEnd = function(touch) {
        _super.prototype.onTouchEnd.call(this, touch);
        this.dragInProgress = true;
        new cc.Tween().target(this.node).to(.5, {
          scale: 1
        }, {
          progress: null,
          easing: "elasticOut"
        }).start();
      };
      MoveChoice.prototype.onMatchOver = function() {
        _super.prototype.onMatchOver.call(this);
        this.node.opacity = 255;
        this.node.dispatchEvent(new cc.Event.EventCustom(helper_1.MOVE_MATCH, true));
      };
      MoveChoice.prototype.onMatchFail = function() {
        _super.prototype.onMatchFail.call(this);
        var customEvent = new cc.Event.EventCustom(helper_1.MOVE_NOT_MATCH, true);
        customEvent.setUserData({
          choice: this.node
        });
        this.node.dispatchEvent(customEvent);
      };
      MoveChoice.prototype.findDropNode = function() {
        return this.moveDropNode;
      };
      MoveChoice = __decorate([ ccclass ], MoveChoice);
      return MoveChoice;
    }(auto_drag_1.default);
    exports.default = MoveChoice;
    cc._RF.pop();
  }, {
    "../../../common/scripts/auto-drag": void 0,
    "../../../common/scripts/helper": void 0,
    "../../../common/scripts/util": void 0
  } ],
  "move-drop": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d33f3b2bKNCP7NdIzUjYn7B", "move-drop");
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
    var ccclass = cc._decorator.ccclass;
    var MoveDrop = function(_super) {
      __extends(MoveDrop, _super);
      function MoveDrop() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      MoveDrop = __decorate([ ccclass ], MoveDrop);
      return MoveDrop;
    }(drop_1.default);
    exports.default = MoveDrop;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drop": void 0
  } ],
  sumtogether: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a3640KcMFxMZ5ZRS4dD5QX6", "sumtogether");
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
    exports.SumTogether = exports.GAME_VOICE = void 0;
    var config_1 = require("../../../common/scripts/lib/config");
    var move_choice_1 = require("./move-choice");
    var move_drop_1 = require("./move-drop");
    var util_1 = require("../../../common/scripts/util");
    var drag_1 = require("../../../common/scripts/drag");
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var Layout = cc.Layout;
    var helper_1 = require("../../../common/scripts/helper");
    var game_1 = require("../../../common/scripts/game");
    exports.GAME_VOICE = "games/lettertracing/sounds";
    var BLANK_DOMINO = "dominodiceblank_movingobjects";
    var EQUAL_SIGN = "=";
    var QUESTION_MARK = "?";
    var OperationType;
    (function(OperationType) {
      OperationType["minus"] = "-";
      OperationType["plus"] = "+";
    })(OperationType || (OperationType = {}));
    var Queue = function() {
      function Queue() {
        this._store = [];
      }
      Queue.prototype.push = function(val) {
        this._store.push(val);
      };
      Queue.prototype.pop = function() {
        return this._store.shift();
      };
      return Queue;
    }();
    var SumTogether = function(_super) {
      __extends(SumTogether, _super);
      function SumTogether() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.progressMonitorPrefab = null;
        _this.optionsLayout = null;
        _this.equationLayout = null;
        _this.choicesLayout = null;
        _this.numberLabel = null;
        _this.dropLabel = null;
        _this.domino0 = null;
        _this.domino1 = null;
        _this.domino2 = null;
        _this.domino3 = null;
        _this.domino4 = null;
        _this.domino5 = null;
        _this.domino6 = null;
        _this.domino7 = null;
        _this.domino8 = null;
        _this.domino9 = null;
        _this.domino10 = null;
        _this.dogPrefab = null;
        _this._currentConfig = null;
        _this._dropNode = null;
        _this._answer = 0;
        _this._operations = null;
        _this._helpDragNode = null;
        _this._helpShown = false;
        return _this;
      }
      SumTogether.prototype.onLoad = function() {
        var _this = this;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        drag_1.default.letDrag = true;
        this._operations = new Queue();
        this.optionsLayout.width = cc.winSize.width;
        this._currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
        if (null !== this._currentConfig) {
          console.log(this._currentConfig);
          this.createOptions();
          this.createEquation();
          this._operations.push(this.renderLHS);
          this._operations.push(this.speakLHS);
          this._operations.push(this.displayLHS);
          this._operations.push(this.displayOperator);
          this._operations.push(this.renderRHS);
          this._operations.push(this.speakRHS);
          this._operations.push(this.displayRHS);
          this._operations.push(this.displayEquals);
          this._operations.push(this.createChoices);
          this.node.on(helper_1.MOVE_MATCH, function(event) {
            event.stopPropagation();
            _this.disableTouchOnChoices();
            _this.node.emit("correct");
            _this.scheduleOnce(function() {
              _this.node.emit("nextProblem");
            });
          });
          this.node.on(helper_1.MOVE_NOT_MATCH, function(event) {
            event.stopPropagation();
            var data = event.getUserData();
            var moveChoice = data.choice.getComponent(move_choice_1.default);
            moveChoice.dragInProgress = false;
            _this.node.emit("wrong");
          });
          this.processOperations();
        }
      };
      SumTogether.prototype.createOptions = function() {
        this.createDogs(Number(this._currentConfig.lhs), Number(this._currentConfig.rhs), this._currentConfig.op);
      };
      SumTogether.prototype.createEquation = function() {
        this.equationLayout.width = cc.winSize.width;
        this.equationLayout.addChild(this.createLabel(this._currentConfig.lhs, "L" + this._currentConfig.lhs, true));
        this.equationLayout.addChild(this.createLabel(this._currentConfig.op, this._currentConfig.op, true));
        this.equationLayout.addChild(this.createLabel(this._currentConfig.rhs, "R" + this._currentConfig.rhs, true));
        this.equationLayout.addChild(this.createLabel(EQUAL_SIGN, EQUAL_SIGN, true));
        this.equationLayout.addChild(this.createDropNode(QUESTION_MARK));
      };
      SumTogether.prototype.createDropNode = function(name, shrink) {
        void 0 === shrink && (shrink = false);
        this._dropNode = cc.instantiate(this.dropLabel);
        this._dropNode.opacity = 0;
        var moveDropComponent = this._dropNode.getComponent(move_drop_1.default);
        this._dropNode.group = "drop";
        this._dropNode.name = "domino" + this._answer;
        var child = this._dropNode.getChildByName("label");
        var label = child.getComponent(cc.Label);
        var outLine = child.addComponent(cc.LabelOutline);
        outLine.width = 2;
        label.string = name;
        if (shrink) {
          label.fontSize = 60;
          this._dropNode.width = child.width;
        }
        return this._dropNode;
      };
      SumTogether.prototype.renderLHS = function() {
        this.unHideDogs(0, Number(this._currentConfig.lhs) - 1);
      };
      SumTogether.prototype.displayLHS = function() {
        this.equationLayout.getChildByName("L" + this._currentConfig.lhs).opacity = 255;
      };
      SumTogether.prototype.displayRHS = function() {
        this.equationLayout.getChildByName("R" + this._currentConfig.rhs).opacity = 255;
      };
      SumTogether.prototype.displayEquals = function() {
        this.equationLayout.getChildByName(EQUAL_SIGN).opacity = 255;
        util_1.Util.speakEquation([ EQUAL_SIGN ], function(index) {});
      };
      SumTogether.prototype.displayOperator = function() {
        this.equationLayout.getChildByName(this._currentConfig.op).opacity = 255;
        util_1.Util.speakEquation([ this._currentConfig.op ], function(index) {});
      };
      SumTogether.prototype.renderRHS = function() {
        switch (this._currentConfig.op) {
         case OperationType.minus:
          this.changeColors(Number(this._currentConfig.lhs) - Number(this._currentConfig.rhs), Number(this._currentConfig.rhs) + Number(this._currentConfig.lhs) - Number(this._currentConfig.rhs));
          break;

         case OperationType.plus:
          this.unHideDogs(Number(this._currentConfig.lhs), Number(this._currentConfig.lhs) + Number(this._currentConfig.rhs) - 1, true);
        }
      };
      SumTogether.prototype.changeColor = function(n, color) {
        console.log(n);
        var node = n.getChildByName("dominodice_movingobjects");
        node && (node.color = color);
      };
      SumTogether.prototype.changeColors = function(fromIndex, toIndex) {
        var _this = this;
        var nodes = this.optionsLayout.children.filter(function(c, i) {
          return i >= fromIndex && i <= toIndex;
        });
        nodes.forEach(function(n, i) {
          _this.changeColor(n, cc.Color.RED);
        });
      };
      SumTogether.prototype.processOperations = function() {
        var _this = this;
        this.scheduleOnce(function() {
          _this.executePop();
        }, .5);
      };
      SumTogether.prototype.executePop = function() {
        var _this = this;
        var func = this._operations.pop();
        if (!!func) {
          func.apply(this);
          this.scheduleOnce(function() {
            _this.processOperations();
          }, 0);
        }
      };
      SumTogether.prototype.createDogs = function(lhsCount, rhsCount, operation) {
        for (var i = 1; i <= lhsCount; i++) this.createDog(i);
        switch (operation) {
         case OperationType.minus:
          break;

         case OperationType.plus:
          for (var i = 1; i <= rhsCount; i++) this.createDog(i);
        }
      };
      SumTogether.prototype.createDog = function(i) {
        var dName = "domino0";
        var domino = cc.instantiate(this[dName]);
        domino.y = 30;
        domino.opacity = 0;
        domino.scale = .8;
        this.optionsLayout.addChild(domino);
      };
      SumTogether.prototype.unHideDogs = function(fromIndex, toIndex, changeColor) {
        var _this = this;
        void 0 === changeColor && (changeColor = false);
        var nodes = this.optionsLayout.children.filter(function(c, i) {
          return i >= fromIndex && i <= toIndex;
        });
        nodes.forEach(function(n, i) {
          changeColor && _this.changeColor(n, cc.Color.GREEN);
          new cc.Tween().target(n).to(.5 + .5 * i, {
            opacity: 255
          }, {
            progress: null,
            easing: "quadOut"
          }).start();
        });
      };
      SumTogether.prototype.speakLHS = function() {
        util_1.Util.speakEquation([ String(this._currentConfig.lhs) ], function(index) {});
      };
      SumTogether.prototype.speakRHS = function() {
        util_1.Util.speakEquation([ String(this._currentConfig.rhs) ], function() {});
      };
      SumTogether.prototype.disableTouchOnChoices = function() {
        this.choicesLayout.children.forEach(function(c) {
          c.getComponent(move_choice_1.default).disableTouch();
        });
      };
      SumTogether.prototype.createChoices = function() {
        var _this = this;
        this.choicesLayout.width = cc.winSize.width;
        var _loop_1 = function(i) {
          var dName = "domino" + i;
          var domino = cc.instantiate(this_1[dName]);
          domino.opacity = 255;
          domino.width = 95;
          domino.height = 178;
          this_1.choicesLayout.addChild(domino);
          domino.children.forEach(function(c) {
            if (c.name === BLANK_DOMINO) {
              var autoDragComponent = domino.getComponent(move_choice_1.default);
              autoDragComponent.value = i;
              autoDragComponent.parent = _this.node;
              var labelNode = _this.createLabel(String(i));
              labelNode.name = "number" + String(i);
              Number(_this._answer) === i && (_this._helpDragNode = labelNode);
              c.addChild(labelNode);
              labelNode.opacity = 0;
              autoDragComponent.label = labelNode.getComponent(cc.Label);
              var outLine = labelNode.addComponent(cc.LabelOutline);
              outLine.width = 2;
              autoDragComponent.moveDropNode = _this._dropNode;
            }
          });
        };
        var this_1 = this;
        for (var i = 0; i <= 9; i++) _loop_1(i);
        this.scheduleOnce(function() {
          _this.showDominos();
        }, 1);
      };
      SumTogether.prototype.showDominos = function() {
        var _this = this;
        this.choicesLayout.children.forEach(function(domino, i) {
          new cc.Tween().target(domino).to(.05 + .05 * i, {
            opacity: 255
          }, {
            progress: null,
            easing: "quadOut"
          }).to(.05, {
            scaleX: 0
          }, {
            progress: null,
            easing: "quadOut"
          }).call(function() {
            domino.children.forEach(function(c) {
              if (c.name !== BLANK_DOMINO) {
                c.opacity = 0;
                c.active = false;
              } else {
                c.opacity = 255;
                var labelNode = c.getChildByName("number" + i);
                labelNode.active = true;
                labelNode.opacity = 255;
              }
            });
          }).to(.05, {
            scaleX: 1
          }, {
            progress: null,
            easing: "quadOut"
          }).call(function() {
            var layout = _this.choicesLayout.getComponent(cc.Layout);
            layout.type = Layout.Type.NONE;
            _this._dropNode.opacity = 255;
            _this.scheduleOnce(function() {
              if (!_this._helpShown) {
                _this._helpShown = true;
                util_1.Util.showHelp(_this._helpDragNode, _this._helpDragNode);
              }
            }, 1);
          }).start();
        });
      };
      SumTogether.prototype.computeAnswer = function(lhs, rhs, op) {
        switch (op) {
         case OperationType.minus:
          this._answer = Number(lhs) - Number(rhs);
          break;

         case OperationType.plus:
          this._answer = Number(lhs) + Number(rhs);
        }
      };
      SumTogether.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var level = configurations[0], workSheet = configurations[1], problemNo = configurations[2], op = configurations[3], lhs = configurations[4], rhs = configurations[5];
        this.computeAnswer(lhs, rhs, op);
        return {
          level: level,
          workSheet: workSheet,
          problemNo: problemNo,
          op: op,
          lhs: lhs,
          rhs: rhs
        };
      };
      SumTogether.prototype.createLabel = function(name, changeName, hide, shrink) {
        void 0 === changeName && (changeName = null);
        void 0 === hide && (hide = false);
        void 0 === shrink && (shrink = false);
        var labelNode = cc.instantiate(this.numberLabel);
        var child = labelNode.getChildByName("label");
        var label = child.getComponent(cc.Label);
        !changeName || (labelNode.name = changeName);
        hide && (labelNode.opacity = 0);
        var outLine = child.addComponent(cc.LabelOutline);
        outLine.width = 2;
        label.string = name;
        if (shrink) {
          label.fontSize = 60;
          labelNode.width = child.width;
        }
        return labelNode;
      };
      __decorate([ property(cc.Prefab) ], SumTogether.prototype, "progressMonitorPrefab", void 0);
      __decorate([ property(cc.Node) ], SumTogether.prototype, "optionsLayout", void 0);
      __decorate([ property(cc.Node) ], SumTogether.prototype, "equationLayout", void 0);
      __decorate([ property(cc.Node) ], SumTogether.prototype, "choicesLayout", void 0);
      __decorate([ property(cc.Prefab) ], SumTogether.prototype, "numberLabel", void 0);
      __decorate([ property(cc.Prefab) ], SumTogether.prototype, "dropLabel", void 0);
      __decorate([ property(cc.Prefab) ], SumTogether.prototype, "domino0", void 0);
      __decorate([ property(cc.Prefab) ], SumTogether.prototype, "domino1", void 0);
      __decorate([ property(cc.Prefab) ], SumTogether.prototype, "domino2", void 0);
      __decorate([ property(cc.Prefab) ], SumTogether.prototype, "domino3", void 0);
      __decorate([ property(cc.Prefab) ], SumTogether.prototype, "domino4", void 0);
      __decorate([ property(cc.Prefab) ], SumTogether.prototype, "domino5", void 0);
      __decorate([ property(cc.Prefab) ], SumTogether.prototype, "domino6", void 0);
      __decorate([ property(cc.Prefab) ], SumTogether.prototype, "domino7", void 0);
      __decorate([ property(cc.Prefab) ], SumTogether.prototype, "domino8", void 0);
      __decorate([ property(cc.Prefab) ], SumTogether.prototype, "domino9", void 0);
      __decorate([ property(cc.Prefab) ], SumTogether.prototype, "domino10", void 0);
      __decorate([ property(cc.Prefab) ], SumTogether.prototype, "dogPrefab", void 0);
      SumTogether = __decorate([ ccclass ], SumTogether);
      return SumTogether;
    }(game_1.default);
    exports.SumTogether = SumTogether;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/helper": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/util": void 0,
    "./move-choice": "move-choice",
    "./move-drop": "move-drop"
  } ]
}, {}, [ "move-choice", "move-drop", "sumtogether" ]);