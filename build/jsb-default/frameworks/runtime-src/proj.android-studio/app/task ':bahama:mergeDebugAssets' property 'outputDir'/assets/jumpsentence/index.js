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
  BridgeBuilder: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "564342jP1ZJRJCTnRdZqqhf", "BridgeBuilder");
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
    var jumpsentence_1 = require("./jumpsentence");
    var emptyBox_1 = require("./emptyBox");
    var util_1 = require("../../../common/scripts/util");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BOX_W = 90;
    var BOX_H = 100;
    var KEYBOARD_Y = -200;
    var KEYBOARD_PADDING = 10;
    var BridgeBuilder = function(_super) {
      __extends(BridgeBuilder, _super);
      function BridgeBuilder() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.layout = null;
        _this.filledPrefab = null;
        _this.boxPrefab = null;
        _this.capsulePrefab = null;
        _this.emptyBoxPrefab = null;
        _this.emptyCapsulePrefab = null;
        _this.answerIndices = new Set();
        _this.sentence = "";
        _this.boxWidth = 0;
        _this.positions = [];
        _this.nodeUuid = [];
        _this.firstDrag = null;
        _this.firstDrop = null;
        _this.firstDragData = "";
        _this.isCharacterSet = false;
        _this.count = 0;
        return _this;
      }
      BridgeBuilder.prototype.Build = function(problem) {
        this.resetMembers();
        var splitter = new GraphemeSplitter();
        this.positions = splitter.splitGraphemes(problem);
        var shouldShow = true;
        for (var i = 0; i < this.positions.length; i++) {
          var char = this.positions[i];
          if ("[" == char) {
            shouldShow = false;
            continue;
          }
          if ("]" == char) {
            shouldShow = true;
            continue;
          }
          if ("@" == char) continue;
          if (!shouldShow) {
            this.answerIndices.add(i);
            this.count++;
          }
        }
        if (!this.isCharacterSet) {
          this.isCharacterSet = true;
          this.node.getComponent(jumpsentence_1.default).SetCharacters(this.answerIndices.size);
        }
        this.buildBridge();
      };
      BridgeBuilder.prototype.resetMembers = function() {
        this.answerIndices.clear();
        this.multiLineStartIndex = 0;
        this.sentence = "";
        this.boxWidth = 0;
        this.positions = null;
        this.firstDrag = null;
        this.firstDrop = null;
        this.firstDragData = "";
      };
      BridgeBuilder.prototype.buildBridge = function() {
        this.layout.node.width = cc.winSize.width - 200;
        var boxWords = "";
        for (var i = 0; i < this.positions.length; i++) {
          var char = this.positions[i];
          if ("[" == char || "]" == char || "@" == char) continue;
          if (this.answerIndices.has(i)) if (this.isSpecialCharacter(char)) {
            var capsule = cc.instantiate(this.emptyCapsulePrefab);
            this.layout.node.insertChild(capsule, i);
            capsule.getComponent(emptyBox_1.default).myCharacter = char;
            capsule.getComponent(emptyBox_1.default).characterIndex = i;
            this.nodeUuid.push(capsule.uuid);
            this.initializeFirstDrop(capsule, i);
          } else {
            var box = cc.instantiate(this.emptyBoxPrefab);
            this.layout.node.insertChild(box, i);
            box.getComponent(emptyBox_1.default).myCharacter = char;
            box.getComponent(emptyBox_1.default).characterIndex = i;
            this.nodeUuid.push(box.uuid);
            this.initializeFirstDrop(box, i);
          } else if (i + 1 == this.positions.length || "[" == this.positions[i + 1] || "@" == this.positions[i + 1]) {
            boxWords += char;
            this.boxWidth += 30;
            var filledBox = cc.instantiate(this.filledPrefab);
            this.layout.node.insertChild(filledBox, i);
            this.nodeUuid.push(filledBox.uuid);
            filledBox.getChildByName("Label").getComponent(cc.Label).string = boxWords;
            boxWords = "";
          } else {
            boxWords += char;
            this.boxWidth += 30;
          }
        }
      };
      BridgeBuilder.prototype.joinBridge = function(node, text) {
        cc.log("first ", node);
        var index = this.nodeUuid.indexOf(node.uuid);
        var leftNode;
        var rightNode;
        rightNode = index == this.nodeUuid.length - 1 ? new cc.Node() : this.layout.node.getChildByUuid(this.nodeUuid[index + 1]);
        leftNode = 0 == index ? new cc.Node() : this.layout.node.getChildByUuid(this.nodeUuid[index - 1]);
        cc.log(" count  ", this.count);
        if (--this.count < 5) {
          cc.log("reduce bridge manual");
          this.layout.node.width -= 120;
          this.layout.updateLayout();
        }
        if (leftNode.getChildByName("Label") && rightNode.getChildByName("Label")) {
          var newText = leftNode.getChildByName("Label").getComponent(cc.Label).string + text + rightNode.getChildByName("Label").getComponent(cc.Label).string;
          var unit = this.bridgeUnit(newText);
          var sIndex = leftNode.getSiblingIndex();
          leftNode.removeFromParent(true);
          rightNode.removeFromParent(true);
          node.removeFromParent(true);
          this.layout.node.insertChild(unit, sIndex);
          this.nodeUuid.splice(index, 2);
          this.nodeUuid[index - 1] = unit.uuid;
        } else if (leftNode.getChildByName("Label") && !rightNode.getChildByName("Label")) {
          leftNode.getChildByName("Label").getComponent(cc.Label).string += text;
          node.removeFromParent(true);
          this.nodeUuid.splice(index, 1);
        } else if (!leftNode.getChildByName("Label") && rightNode.getChildByName("Label")) {
          cc.log("no left ");
          var rightNodeLabel = rightNode.getChildByName("Label").getComponent(cc.Label);
          rightNodeLabel.string = text + rightNodeLabel.string;
          node.removeFromParent(true);
          this.nodeUuid.splice(index, 1);
        } else {
          cc.log("Middle single cell ");
          var sIndex = node.getSiblingIndex();
          var unit = this.bridgeUnit(text);
          node.removeFromParent(true);
          this.layout.node.insertChild(unit, sIndex);
          this.nodeUuid[index] = unit.uuid;
        }
      };
      BridgeBuilder.prototype.bridgeUnit = function(text) {
        var filledBox = cc.instantiate(this.filledPrefab);
        filledBox.getChildByName("Label").getComponent(cc.Label).string = text;
        filledBox.getComponent(cc.Layout).paddingLeft += 20;
        filledBox.getComponent(cc.Layout).paddingRight += 20;
        return filledBox;
      };
      BridgeBuilder.prototype.initializeFirstDrop = function(node, index) {
        if (null == this.firstDrop) {
          this.firstDrop = node;
          this.firstDragData = this.positions[index];
        }
      };
      BridgeBuilder.prototype.createChoiceBoxes = function() {
        var _this = this;
        var tempArr = [];
        this.answerIndices.forEach(function(e) {
          -1 == tempArr.indexOf(_this.positions[e]) && tempArr.push(_this.positions[e]);
        });
        var shuffledList = [];
        shuffledList = util_1.Util.shuffle(tempArr);
        var totalLen = shuffledList.length * BOX_W + (shuffledList.length - 1) * KEYBOARD_PADDING;
        var moveLeft;
        moveLeft = totalLen < 1024 ? totalLen / 2 - BOX_W / 2 : 512 - BOX_W / 2;
        for (var i = 0, j = 0; i < shuffledList.length; i++) {
          var text = shuffledList[i];
          var box = this.isSpecialCharacter(text) ? cc.instantiate(this.capsulePrefab) : cc.instantiate(this.boxPrefab);
          text == this.firstDragData && (this.firstDrag = box);
          box.getChildByName("Label").getComponent(cc.Label).string = text;
          box.parent = this.node;
          var currentPos = i * (BOX_W + KEYBOARD_PADDING);
          if (currentPos < 1024) {
            cc.log("left " + currentPos);
            box.position = cc.v2(currentPos - moveLeft, KEYBOARD_Y);
          } else {
            currentPos = j++ * (BOX_W + KEYBOARD_PADDING);
            box.position = cc.v2(currentPos - moveLeft, KEYBOARD_Y - BOX_H - KEYBOARD_PADDING);
          }
        }
        cc.log(this.firstDrop + " check " + this.firstDrag);
      };
      BridgeBuilder.prototype.isSpecialCharacter = function(char) {
        return " " == char || "!" == char || "?" == char || "," == char || "." == char;
      };
      BridgeBuilder.prototype.start = function() {
        var _this = this;
        var padding = 5;
        var newLayoutW = 0;
        this.layout.node.children.forEach(function(e) {
          cc.log("check " + e.name + e.width);
          "Capsule Empty" != e.name && "Box Empty" != e.name || (newLayoutW += e.width + padding);
        });
        newLayoutW += this.boxWidth;
        if (newLayoutW < cc.winSize.width - 360) {
          this.firstDrop = null;
          this.layout.type = cc.Layout.Type.HORIZONTAL;
          this.layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
          this.layout.updateLayout();
          this.layout.node.children.forEach(function(e) {
            if ("Capsule Empty" == e.name || "Box Empty" == e.name) {
              newLayoutW += e.width + padding;
              if (null == _this.firstDrop) {
                cc.log("came inside ");
                _this.firstDrop = e;
              }
            }
            cc.log("name " + e.name);
          });
        }
        null != this.firstDrag && this.showHelp(this.firstDrag);
      };
      BridgeBuilder.prototype.showHelp = function(dragNode) {
        var _this = this;
        this.scheduleOnce(function() {
          util_1.Util.showHelp(dragNode, _this.firstDrop);
        }, 1);
      };
      __decorate([ property(cc.Layout) ], BridgeBuilder.prototype, "layout", void 0);
      __decorate([ property(cc.Prefab) ], BridgeBuilder.prototype, "filledPrefab", void 0);
      __decorate([ property(cc.Prefab) ], BridgeBuilder.prototype, "boxPrefab", void 0);
      __decorate([ property(cc.Prefab) ], BridgeBuilder.prototype, "capsulePrefab", void 0);
      __decorate([ property(cc.Prefab) ], BridgeBuilder.prototype, "emptyBoxPrefab", void 0);
      __decorate([ property(cc.Prefab) ], BridgeBuilder.prototype, "emptyCapsulePrefab", void 0);
      __decorate([ error_handler_1.catchError() ], BridgeBuilder.prototype, "Build", null);
      __decorate([ error_handler_1.catchError() ], BridgeBuilder.prototype, "resetMembers", null);
      __decorate([ error_handler_1.catchError() ], BridgeBuilder.prototype, "buildBridge", null);
      __decorate([ error_handler_1.catchError() ], BridgeBuilder.prototype, "joinBridge", null);
      __decorate([ error_handler_1.catchError() ], BridgeBuilder.prototype, "bridgeUnit", null);
      __decorate([ error_handler_1.catchError() ], BridgeBuilder.prototype, "initializeFirstDrop", null);
      __decorate([ error_handler_1.catchError() ], BridgeBuilder.prototype, "createChoiceBoxes", null);
      __decorate([ error_handler_1.catchError() ], BridgeBuilder.prototype, "isSpecialCharacter", null);
      __decorate([ error_handler_1.catchError() ], BridgeBuilder.prototype, "start", null);
      __decorate([ error_handler_1.catchError() ], BridgeBuilder.prototype, "showHelp", null);
      BridgeBuilder = __decorate([ ccclass ], BridgeBuilder);
      return BridgeBuilder;
    }(cc.Component);
    exports.default = BridgeBuilder;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./emptyBox": "emptyBox",
    "./jumpsentence": "jumpsentence"
  } ],
  emptyBox: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "87d68E75UVIcpIkjrJbYFtl", "emptyBox");
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
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var EmptyBox = function(_super) {
      __extends(EmptyBox, _super);
      function EmptyBox() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.labelPrefab = null;
        _this.myCharacter = "";
        _this.characterIndex = -1;
        return _this;
      }
      EmptyBox.prototype.onLoad = function() {
        cc.director.getCollisionManager().enabled = true;
        this.isDone = false;
      };
      __decorate([ property(cc.Prefab) ], EmptyBox.prototype, "labelPrefab", void 0);
      __decorate([ error_handler_1.catchError() ], EmptyBox.prototype, "onLoad", null);
      EmptyBox = __decorate([ ccclass ], EmptyBox);
      return EmptyBox;
    }(cc.Component);
    exports.default = EmptyBox;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/error-handler": void 0
  } ],
  jumpsentence: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "30cddqvwJFCyrWv25GpOdqo", "jumpsentence");
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
    var BridgeBuilder_1 = require("./BridgeBuilder");
    var util_1 = require("../../../common/scripts/util");
    var keyboardAlphabets_1 = require("./keyboardAlphabets");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var game_1 = require("../../../common/scripts/game");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var JumpSentence = function(_super) {
      __extends(JumpSentence, _super);
      function JumpSentence() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.soundClip = null;
        _this._isRTL = false;
        _this.caseButtonNode = null;
        _this.lockedKeyboard = null;
        _this.unlockedKeyboard = null;
        _this.bridgePrefab = null;
        _this.friendPos = null;
        return _this;
      }
      JumpSentence_1 = JumpSentence;
      JumpSentence.prototype.onLoad = function() {
        this._isRTL = config_1.default.i.direction == config_1.Direction.RTL;
        var data = config_1.default.getInstance().data[0];
        this.callCount = 1;
        var fieldArr = data.toString().split(",").map(function(field) {
          return /^\d*\.?\d+$/.test(field) ? Number(field) : field;
        });
        this.level = fieldArr[0], this.worksheet = fieldArr[1], this.problemNo = fieldArr[2], 
        this.problem = fieldArr[3], this.soundFile = fieldArr[4], this.upperCase = fieldArr[5], 
        this.keyboardType = fieldArr[6];
        cc.log("sound file " + this.soundFile + "F_arr " + fieldArr);
        JumpSentence_1.updatedSentence = this.problem;
        this.StartGame();
      };
      JumpSentence.prototype.StartGame = function() {
        this.checkRTLAndChange();
        this.node.getComponent(BridgeBuilder_1.default).Build(this.problem);
        this.ChooseKeyboardType();
        this.onClickPlayAudio();
        this.placeCharNode();
      };
      JumpSentence.prototype.checkRTLAndChange = function() {
        if (this._isRTL) {
          this.node.getChildByName("Bridge").x = -100;
          this.caseButtonNode.x = -426;
          this.friendPos.scaleX = -.3;
        }
      };
      JumpSentence.prototype.placeCharNode = function() {
        this.friendPos.x = (cc.winSize.width / 2 - 120) * (this._isRTL ? 1 : -1);
        this.node.getChildByName("Wooden Log").x = this.friendPos.x;
      };
      JumpSentence.prototype.ChooseKeyboardType = function() {
        if ("en" == config_1.default.i.course.lang) if ("locked" == this.keyboardType) {
          this.lockedKeyboard.active = true;
          this.unlockedKeyboard.active = false;
        } else {
          this.lockedKeyboard.active = false;
          this.unlockedKeyboard.active = true;
          this.caseButtonNode.active = true;
          "y" == this.upperCase && this.unlockedKeyboard.getChildByName("Alphabets").getComponent(keyboardAlphabets_1.default).onClickSwitchCaseButton();
        } else this.node.getComponent(BridgeBuilder_1.default).createChoiceBoxes();
      };
      JumpSentence.prototype.SetCharacters = function(noOfCharacters) {
        this.charactersLeft = noOfCharacters;
        cc.log("Characters Left " + this.charactersLeft);
      };
      JumpSentence.prototype.decreaseCharacterByOne = function() {
        var _this = this;
        this.charactersLeft -= 1;
        if (0 == this.charactersLeft) {
          this.node.pauseSystemEvents(true);
          this.friend.stopAnimation("jumping2");
          new cc.Tween().target(this.friendPos).call(function() {
            _this.friend.playAnimation("jumping2", 1);
          }).to(2, {
            x: this._isRTL ? -50 : 50
          }, {
            progress: null,
            easing: "sineOut"
          }).delay(.5).call(function() {
            _this.friend.playAnimation("jumping2", 1);
          }).to(2, {
            x: (cc.winSize.width / 2 + 150) * (this._isRTL ? -1 : 1)
          }, {
            progress: null,
            easing: "sineOut"
          }).start();
          this.isGameFinished = true;
          this.PlayAudioOnGameEnd();
        }
      };
      JumpSentence.prototype.PlayAudioOnGameEnd = function() {
        var _this = this;
        cc.log("Playing Audio On Game End");
        this.friend.speakExtra(function() {
          _this.scheduleOnce(function() {
            _this.node.emit("nextProblem");
          }, 3);
        });
      };
      JumpSentence.prototype.onClickPlayAudio = function() {
        var _this = this;
        util_1.Util.loadGameSound(this.soundFile, function(clip) {
          null != clip && (_this.friend.extraClip = clip);
        });
      };
      JumpSentence.prototype.onDestroy = function() {
        JumpSentence_1.updatedSentence = null;
      };
      var JumpSentence_1;
      JumpSentence.updatedSentence = "";
      __decorate([ property(cc.Node) ], JumpSentence.prototype, "caseButtonNode", void 0);
      __decorate([ property(cc.Node) ], JumpSentence.prototype, "lockedKeyboard", void 0);
      __decorate([ property(cc.Node) ], JumpSentence.prototype, "unlockedKeyboard", void 0);
      __decorate([ property(cc.Prefab) ], JumpSentence.prototype, "bridgePrefab", void 0);
      __decorate([ property(cc.Node) ], JumpSentence.prototype, "friendPos", void 0);
      __decorate([ error_handler_1.catchError() ], JumpSentence.prototype, "onLoad", null);
      __decorate([ error_handler_1.catchError() ], JumpSentence.prototype, "StartGame", null);
      __decorate([ error_handler_1.catchError() ], JumpSentence.prototype, "checkRTLAndChange", null);
      __decorate([ error_handler_1.catchError() ], JumpSentence.prototype, "placeCharNode", null);
      __decorate([ error_handler_1.catchError() ], JumpSentence.prototype, "ChooseKeyboardType", null);
      __decorate([ error_handler_1.catchError() ], JumpSentence.prototype, "SetCharacters", null);
      __decorate([ error_handler_1.catchError() ], JumpSentence.prototype, "decreaseCharacterByOne", null);
      __decorate([ error_handler_1.catchError() ], JumpSentence.prototype, "PlayAudioOnGameEnd", null);
      __decorate([ error_handler_1.catchError() ], JumpSentence.prototype, "onClickPlayAudio", null);
      __decorate([ error_handler_1.catchError() ], JumpSentence.prototype, "onDestroy", null);
      JumpSentence = JumpSentence_1 = __decorate([ ccclass ], JumpSentence);
      return JumpSentence;
    }(game_1.default);
    exports.default = JumpSentence;
    cc._RF.pop();
  }, {
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./BridgeBuilder": "BridgeBuilder",
    "./keyboardAlphabets": "keyboardAlphabets"
  } ],
  keyboardAlphabets: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cd9b9bRGx1DPrIQXfAGL8ud", "keyboardAlphabets");
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
    var language_1 = require("./language");
    var config_1 = require("../../../common/scripts/lib/config");
    var language_2 = require("./language");
    var language_3 = require("./language");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LINE_HEIGHT = 65;
    var FONT_SIZE = 60;
    var KeyboardAlphabets = function(_super) {
      __extends(KeyboardAlphabets, _super);
      function KeyboardAlphabets() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.keys = [];
        _this.language = language_1.Language.English;
        _this.case = language_2.Case.Lower;
        return _this;
      }
      KeyboardAlphabets.prototype.onLoad = function() {
        switch (config_1.default.i.course.lang) {
         case "en":
          this.language = language_1.Language.English;
          break;

         case "ur":
          this.language = language_1.Language.Urdu;
          break;

         case "hi":
          this.language = language_1.Language.Hindi;
        }
        var alphabets = language_3.default.GetAlphabets(this.language, this.case);
        this.keys.forEach(function(key, index) {
          key.string = alphabets[index];
          key.fontSize = FONT_SIZE;
          key.lineHeight = LINE_HEIGHT;
          key.font = config_1.default.i.getTextFont(config_1.default.i.currentFontName);
        });
        0 == this.keys.length && this.hideKeyboard();
      };
      KeyboardAlphabets.prototype.hideKeyboard = function() {
        this.node.parent.active = false;
      };
      KeyboardAlphabets.prototype.onClickSwitchCaseButton = function() {
        var caseButton = this.node.parent.parent.getChildByName("Case");
        if (this.case == language_2.Case.Lower) {
          caseButton.getChildByName("Upper Case").active = false;
          caseButton.getChildByName("Lower Case").active = true;
          this.case = language_2.Case.Upper;
          var alphabets_1 = language_3.default.GetAlphabets(this.language, this.case);
          this.keys.forEach(function(key, index) {
            key.string = alphabets_1[index];
          });
        } else if (this.case == language_2.Case.Upper) {
          caseButton.getChildByName("Lower Case").active = false;
          caseButton.getChildByName("Upper Case").active = true;
          this.case = language_2.Case.Lower;
          var alphabets_2 = language_3.default.GetAlphabets(this.language, this.case);
          this.keys.forEach(function(key, index) {
            key.string = alphabets_2[index];
          });
        }
      };
      KeyboardAlphabets.prototype.start = function() {};
      __decorate([ property(cc.Label) ], KeyboardAlphabets.prototype, "keys", void 0);
      __decorate([ property({
        type: cc.Enum(language_1.Language)
      }) ], KeyboardAlphabets.prototype, "language", void 0);
      __decorate([ property({
        type: cc.Enum(language_2.Case)
      }) ], KeyboardAlphabets.prototype, "case", void 0);
      __decorate([ error_handler_1.catchError() ], KeyboardAlphabets.prototype, "onLoad", null);
      __decorate([ error_handler_1.catchError() ], KeyboardAlphabets.prototype, "hideKeyboard", null);
      __decorate([ error_handler_1.catchError() ], KeyboardAlphabets.prototype, "onClickSwitchCaseButton", null);
      KeyboardAlphabets = __decorate([ ccclass ], KeyboardAlphabets);
      return KeyboardAlphabets;
    }(cc.Component);
    exports.default = KeyboardAlphabets;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "./language": "language"
  } ],
  keyboardbutton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f69cfaE/GZDaaJTkALjL45G", "keyboardbutton");
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
    var emptyBox_1 = require("./emptyBox");
    var jumpsentence_1 = require("./jumpsentence");
    var BridgeBuilder_1 = require("./BridgeBuilder");
    var config_1 = require("../../../common/scripts/lib/config");
    var util_1 = require("../../../common/scripts/util");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var lessonController_1 = require("../../../common/scripts/lessonController");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var KeyboardButton = function(_super) {
      __extends(KeyboardButton, _super);
      function KeyboardButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._soundClip = null;
        _this.labelPrefab = null;
        _this.fillSprite = null;
        _this.hindiKeyBoard = false;
        return _this;
      }
      KeyboardButton.prototype.onLoad = function() {
        var _this = this;
        cc.director.getCollisionManager().enabled = true;
        this.node.on("touchstart", this.onTouchStart, this);
        this.node.on("touchmove", this.onTouchMove, this);
        this.node.on("touchend", this.onTouchEnd, this);
        this.node.on("touchcancel", this.onTouchEnd, this);
        this.bridgeComp = "en" == config_1.default.i.course.lang ? this.node.parent.parent.parent.getComponent(BridgeBuilder_1.default) : this.node.parent.getComponent(BridgeBuilder_1.default);
        var text = this.node.getChildByName("Label").getComponent(cc.Label).string;
        "en" != config_1.default.i.course.lang || text != this.bridgeComp.firstDragData.toUpperCase() && text != this.bridgeComp.firstDragData.toLowerCase() || this.bridgeComp.showHelp(this.node);
        var temp = this.node.getChildByName("Label").getComponent(cc.Label).string;
        var reg = new RegExp("[a-z]|[A-Z]");
        "en" == config_1.default.i.course.lang && reg.test(temp) && util_1.Util.loadsLetter(temp.toLowerCase(), function(clip) {
          _this._soundClip = clip;
        });
      };
      KeyboardButton.prototype.onCollisionStay = function(other, self) {
        cc.log("Colliding with empty box expecting " + other.node.getComponent(emptyBox_1.default).myCharacter + " getting : " + this.node.getChildByName("Label").getComponent(cc.Label).string);
        this.collidingBox && other.node.name != this.collidingBox.name && this.onCollisionExit(other, self);
        this.collidingBox = other.node;
        if (this.collidingBox.getComponent(emptyBox_1.default).myCharacter === this.node.getChildByName("Label").getComponent(cc.Label).string) {
          this.collidingBox.getChildByName("Glow Box").opacity = 255;
          this.isProcessing = true;
          this.isDone = false;
          this.collidingBox = other.node;
        } else this.isProcessing = false;
      };
      KeyboardButton.prototype.onCollisionExit = function(other, self) {
        this.collidingBox && (this.collidingBox.getChildByName("Glow Box").opacity = 0);
        this.isProcessing = false;
      };
      KeyboardButton.prototype.onTouchStart = function(touch) {
        if (0 == touch.getID()) {
          this.myOriginalLocation = this.node.position;
          cc.log("Original Location " + this.myOriginalLocation);
          this.isTouchEnded = false;
          this.isProcessing = false;
          try {
            !this._soundClip || lessonController_1.default.getFriend().speak(this._soundClip);
          } catch (error) {
            console.log("Failed playing sound");
          }
        }
      };
      KeyboardButton.prototype.onTouchMove = function(touch) {
        if (0 == touch.getID()) {
          this.node.position = this.node.position.add(touch.getDelta());
          if (this.isProcessing) {
            cc.log("Empty Box Chr " + this.collidingBox.getComponent(emptyBox_1.default).myCharacter + "label " + this.node.getChildByName("Label").getComponent(cc.Label).string + "!is Done " + !this.isDone);
            if (this.collidingBox.getComponent(emptyBox_1.default).myCharacter === this.node.getChildByName("Label").getComponent(cc.Label).string && !this.isDone) if ("Empty Box" == this.collidingBox.name || "Capsule Empty" == this.collidingBox.name) {
              cc.log("came active " + this.collidingBox.children[0]);
              this.collidingBox.getChildByName("Glow Box").opacity = 255;
            } else this.collidingBox.getChildByName("Glow Box").opacity = 0;
          }
        }
      };
      KeyboardButton.prototype.onTouchEnd = function(touch) {
        if (0 == touch.getID()) if (this.isProcessing) {
          console.log(this.collidingBox.getComponent(emptyBox_1.default).characterIndex, " This is myindex ");
          if (this.collidingBox.getComponent(emptyBox_1.default).myCharacter === this.node.getChildByName("Label").getComponent(cc.Label).string && !this.isDone) {
            "en" == config_1.default.i.course.lang ? this.node.parent.parent.parent.emit("correct") : this.node.parent.emit("correct");
            this.isDone = true;
            this.bridgeComp.joinBridge(this.collidingBox, this.node.getChildByName("Label").getComponent(cc.Label).string);
            var callback = cc.callFunc(this.onBacktoOriginalPlace, this);
            cc.log("Setting Back to Original Location on Touch End after success");
            var action = cc.sequence(cc.moveTo(.05, this.myOriginalLocation), callback);
            this.node.runAction(action);
            this.node.position = this.myOriginalLocation;
          }
        } else {
          this.isProcessing = false;
          cc.log("Setting Back to Original Location on Touch End if not colliding");
          this.node.position = this.myOriginalLocation;
          "en" == config_1.default.i.course.lang ? this.node.parent.parent.parent.emit("wrong") : this.node.parent.emit("wrong");
        }
      };
      KeyboardButton.prototype.onBacktoOriginalPlace = function() {
        cc.log("Setting Back Opacity to Opaque");
        this.node.opacity = 255;
        this.collidingBox.getComponent(cc.BoxCollider).enabled = false;
        if (this.hindiKeyBoard) {
          cc.log("came hindi touch end");
          this.node.parent.getComponent(jumpsentence_1.default).decreaseCharacterByOne();
        } else this.node.getParent().getParent().getParent().getComponent(jumpsentence_1.default).decreaseCharacterByOne();
      };
      __decorate([ property(cc.Prefab) ], KeyboardButton.prototype, "labelPrefab", void 0);
      __decorate([ property(cc.SpriteFrame) ], KeyboardButton.prototype, "fillSprite", void 0);
      __decorate([ property({
        type: Boolean
      }) ], KeyboardButton.prototype, "hindiKeyBoard", void 0);
      __decorate([ error_handler_1.catchError() ], KeyboardButton.prototype, "onLoad", null);
      __decorate([ error_handler_1.catchError() ], KeyboardButton.prototype, "onCollisionStay", null);
      __decorate([ error_handler_1.catchError() ], KeyboardButton.prototype, "onCollisionExit", null);
      __decorate([ error_handler_1.catchError() ], KeyboardButton.prototype, "onTouchStart", null);
      __decorate([ error_handler_1.catchError() ], KeyboardButton.prototype, "onTouchMove", null);
      __decorate([ error_handler_1.catchError() ], KeyboardButton.prototype, "onTouchEnd", null);
      __decorate([ error_handler_1.catchError() ], KeyboardButton.prototype, "onBacktoOriginalPlace", null);
      KeyboardButton = __decorate([ ccclass ], KeyboardButton);
      return KeyboardButton;
    }(cc.Component);
    exports.default = KeyboardButton;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lessonController": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./BridgeBuilder": "BridgeBuilder",
    "./emptyBox": "emptyBox",
    "./jumpsentence": "jumpsentence"
  } ],
  language: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "97503HpiJlAYY3tniA34wcI", "language");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Case = exports.Language = void 0;
    var Language;
    (function(Language) {
      Language[Language["English"] = 0] = "English";
      Language[Language["Hindi"] = 1] = "Hindi";
      Language[Language["Urdu"] = 2] = "Urdu";
    })(Language = exports.Language || (exports.Language = {}));
    var Case;
    (function(Case) {
      Case[Case["Upper"] = 0] = "Upper";
      Case[Case["Lower"] = 1] = "Lower";
      Case[Case["None"] = 2] = "None";
    })(Case = exports.Case || (exports.Case = {}));
    var Alphabets = function() {
      function Alphabets() {}
      Alphabets.GetAlphabets = function(languageType, caseType) {
        switch (languageType) {
         case Language.English:
          return caseType == Case.Upper ? this.alphabets.en.upper : this.alphabets.en.lower;

         case Language.Hindi:
          return this.alphabets.hi;

         case Language.Urdu:
          return this.alphabets.ur;
        }
      };
      Alphabets.alphabets = {
        en: {
          upper: [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ],
          lower: [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ]
        },
        ur: {},
        hi: {}
      };
      return Alphabets;
    }();
    exports.default = Alphabets;
    cc._RF.pop();
  }, {} ]
}, {}, [ "BridgeBuilder", "emptyBox", "jumpsentence", "keyboardAlphabets", "keyboardbutton", "language" ]);