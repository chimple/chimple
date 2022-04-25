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
  picturemeaning: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "60e405EGHpAWrKWiiyVrQ/P", "picturemeaning");
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
    exports.PictureMeaningData = exports.PictureMeaningType = void 0;
    var config_1 = require("../../../common/scripts/lib/config");
    var whatisthisChoice_1 = require("./whatisthisChoice");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var util_1 = require("../../../common/scripts/util");
    var game_1 = require("../../../common/scripts/game");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PictureMeaningType;
    (function(PictureMeaningType) {
      PictureMeaningType[PictureMeaningType["Sentence"] = 0] = "Sentence";
      PictureMeaningType[PictureMeaningType["Picture"] = 1] = "Picture";
    })(PictureMeaningType = exports.PictureMeaningType || (exports.PictureMeaningType = {}));
    var PictureMeaningData = function() {
      function PictureMeaningData(index, type, text, pic, sound) {
        this.index = index;
        this.type = type;
        this.text = text;
        this.pic = pic;
        this.sound = sound;
      }
      return PictureMeaningData;
    }();
    exports.PictureMeaningData = PictureMeaningData;
    var PictureMeaning = function(_super) {
      __extends(PictureMeaning, _super);
      function PictureMeaning() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.choiceLayout = null;
        _this.answerNode = null;
        _this.imageAnswerButtonPrefab = null;
        _this.imageChoiceButtonPrefab = null;
        _this.textAnswerButtonPrefab = null;
        _this.textChoiceButtonPrefab = null;
        _this.trafficLight = null;
        _this.fullLayout = null;
        return _this;
      }
      PictureMeaning.prototype.onLoad = function() {
        var _this = this;
        var _a = config_1.default.getInstance().data[0], level = _a[0], worksheet = _a[1], problem = _a[2], mode = _a[3], answer = _a[4], answerPic = _a[5], answerSound = _a[6], wrongAnswer1 = _a[7], wrongAnswer1Pic = _a[8], wrongAnswer1Sound = _a[9], wrongAnswer2 = _a[10], wrongAnswer2Pic = _a[11], wrongAnswer2Sound = _a[12];
        this.type = "S" == mode ? PictureMeaningType.Sentence : PictureMeaningType.Picture;
        var choiceNodes = [];
        var correctChoiceNode = this.setupNode(0, this.type, answer, answerPic, answerSound);
        choiceNodes.push(correctChoiceNode);
        choiceNodes.push(this.setupNode(1, this.type, wrongAnswer1, wrongAnswer1Pic, wrongAnswer1Sound));
        choiceNodes.push(this.setupNode(2, this.type, wrongAnswer2, wrongAnswer2Pic, wrongAnswer2Sound));
        choiceNodes = util_1.Util.shuffleByMapSortMap(choiceNodes);
        choiceNodes.forEach(function(choiceNode) {
          _this.choiceLayout.addChild(choiceNode);
        });
        var layoutComp = this.choiceLayout.getComponent(cc.Layout);
        null != layoutComp && (layoutComp.type = this.type == PictureMeaningType.Sentence ? cc.Layout.Type.HORIZONTAL : cc.Layout.Type.VERTICAL);
        util_1.Util.showHelp(correctChoiceNode, correctChoiceNode);
      };
      PictureMeaning.prototype.setupNode = function(index, type, text, pic, sound) {
        var answerData = new PictureMeaningData(index, type, text, pic, sound);
        var choiceData = new PictureMeaningData(index, type == PictureMeaningType.Sentence ? PictureMeaningType.Picture : PictureMeaningType.Sentence, text, pic, sound);
        var answerNode = this.createAnswer(answerData);
        this.answerNode.addChild(answerNode);
        if (0 == index) {
          this.answerNode.height = answerNode.height;
          this.answerNode.width = answerNode.width;
        } else {
          answerNode.y = cc.winSize.height;
          answerNode.zIndex = 1;
        }
        var choiceNode = this.createChoice(choiceData, answerNode);
        choiceNode.on("whatisthisCorrect", this.onMatch.bind(this));
        choiceNode.on("whatisthisWrong", this.onNoMatch.bind(this));
        return choiceNode;
      };
      PictureMeaning.prototype.onNoMatch = function() {
        this.node.emit("wrong");
        this.trafficLight.play("red_signal");
      };
      PictureMeaning.prototype.onMatch = function() {
        var _this = this;
        this.node.emit("correct");
        this.trafficLight.play("green_signal");
        this.choiceLayout.children.forEach(function(val) {
          var comp = val.getComponent(whatisthisChoice_1.default);
          null != comp && 0 != comp.data.index && new cc.Tween().target(val).delay(.5).by(.5, {
            x: _this.type == PictureMeaningType.Picture ? -cc.winSize.width : 0,
            y: _this.type == PictureMeaningType.Sentence ? -cc.winSize.height : 0
          }, {
            progress: null,
            easing: "quadOut"
          }).start();
        });
        new cc.Tween().target(this.friendPos).delay(4).call(function() {
          _this.fullLayout.getComponent(cc.Layout).spacingY = 150;
          null != _this.friend && _this.friend.playAnimation("skating", 1);
        }).to(2, {
          x: cc.winSize.width
        }, null).call(function() {
          _this.node.emit("nextProblem");
        }).start();
      };
      PictureMeaning.prototype.createAnswer = function(data) {
        var answerNode = cc.instantiate(data.type == PictureMeaningType.Sentence ? this.textAnswerButtonPrefab : this.imageAnswerButtonPrefab);
        if (data.type == PictureMeaningType.Picture) {
          var button = answerNode.getComponent(cc.Button);
          button.interactable = false;
        }
        var answerComp = answerNode.getComponent(whatisthisChoice_1.default);
        null != answerComp && (answerComp.data = data);
        return answerNode;
      };
      PictureMeaning.prototype.createChoice = function(data, answerNode) {
        var choiceNode = cc.instantiate(data.type == PictureMeaningType.Sentence ? this.textChoiceButtonPrefab : this.imageChoiceButtonPrefab);
        choiceNode.name = data.type == PictureMeaningType.Sentence ? data.text : data.pic;
        var choiceComp = choiceNode.getComponent(whatisthisChoice_1.default);
        if (null != choiceComp) {
          choiceComp.data = data;
          choiceComp.answerNode = answerNode;
        }
        return choiceNode;
      };
      __decorate([ property(cc.Node) ], PictureMeaning.prototype, "choiceLayout", void 0);
      __decorate([ property(cc.Node) ], PictureMeaning.prototype, "answerNode", void 0);
      __decorate([ property(cc.Prefab) ], PictureMeaning.prototype, "imageAnswerButtonPrefab", void 0);
      __decorate([ property(cc.Prefab) ], PictureMeaning.prototype, "imageChoiceButtonPrefab", void 0);
      __decorate([ property(cc.Prefab) ], PictureMeaning.prototype, "textAnswerButtonPrefab", void 0);
      __decorate([ property(cc.Prefab) ], PictureMeaning.prototype, "textChoiceButtonPrefab", void 0);
      __decorate([ property(cc.Animation) ], PictureMeaning.prototype, "trafficLight", void 0);
      __decorate([ property(cc.Node) ], PictureMeaning.prototype, "fullLayout", void 0);
      __decorate([ error_handler_1.default() ], PictureMeaning.prototype, "onLoad", null);
      PictureMeaning = __decorate([ ccclass ], PictureMeaning);
      return PictureMeaning;
    }(game_1.default);
    exports.default = PictureMeaning;
    cc._RF.pop();
  }, {
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./whatisthisChoice": "whatisthisChoice"
  } ],
  whatisthisChoice: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7a899DiOUlB9K3guxqBj0hk", "whatisthisChoice");
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
    var picturemeaning_1 = require("./picturemeaning");
    var util_1 = require("../../../common/scripts/util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var handleClick = true;
    var WhatIsThisChoice = function(_super) {
      __extends(WhatIsThisChoice, _super);
      function WhatIsThisChoice() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.image = null;
        _this.data = null;
        _this.answerNode = null;
        _this.soundClip = null;
        return _this;
      }
      WhatIsThisChoice.prototype.onLoad = function() {
        var _this = this;
        handleClick = true;
        this.data.type == picturemeaning_1.PictureMeaningType.Sentence ? this.label.string = this.data.text : util_1.Util.loadTexture(this.data.pic, function(texture) {
          if (null != texture) {
            _this.image.spriteFrame = new cc.SpriteFrame(texture);
            util_1.Util.resizeSprite(_this.image, 260, 206);
          }
        });
        util_1.Util.loadGameSound(this.data.sound, function(clip) {
          _this.soundClip = clip;
        });
      };
      WhatIsThisChoice.prototype.makeInteractable = function(interactable) {
        this.node.parent.children.forEach(function(but) {
          var butComp = but.getComponent(cc.Button);
          butComp.interactable = interactable;
        });
      };
      WhatIsThisChoice.prototype.onClick = function() {
        var _this = this;
        if (handleClick) {
          handleClick = false;
          this.makeInteractable(false);
          null != this.soundClip && this.scheduleOnce(function() {
            util_1.Util.play(_this.soundClip, false);
          }, .5);
          if (0 == this.data.index) this.node.emit("whatisthisCorrect"); else {
            this.node.emit("whatisthisWrong");
            var y = this.answerNode.y;
            new cc.Tween().target(this.answerNode).to(.5, {
              y: 0
            }, {
              progress: null,
              easing: "quadOut"
            }).delay(3).to(.5, {
              y: y
            }, {
              progress: null,
              easing: "quadOut"
            }).call(function() {
              handleClick = true;
              _this.makeInteractable(true);
            }).start();
          }
        }
      };
      __decorate([ property(cc.Label) ], WhatIsThisChoice.prototype, "label", void 0);
      __decorate([ property(cc.Sprite) ], WhatIsThisChoice.prototype, "image", void 0);
      WhatIsThisChoice = __decorate([ ccclass ], WhatIsThisChoice);
      return WhatIsThisChoice;
    }(cc.Component);
    exports.default = WhatIsThisChoice;
    cc._RF.pop();
  }, {
    "../../../common/scripts/util": void 0,
    "./picturemeaning": "picturemeaning"
  } ]
}, {}, [ "picturemeaning", "whatisthisChoice" ]);