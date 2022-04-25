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
  choice: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4b089zJqNxODrOUgzoQlozN", "choice");
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
    var quiz_1 = require("./quiz");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var util_1 = require("../../../common/scripts/util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var lineMatchingStartName = null;
    var lineMatchingStartNode = null;
    var Choice = function(_super) {
      __extends(Choice, _super);
      function Choice() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.image = null;
        _this.data = null;
        _this.quizDir = "";
        _this.quizNode = null;
        _this._graphics = null;
        _this._touchStartPoint = null;
        _this.enabled = true;
        return _this;
      }
      Choice_1 = Choice;
      Choice.prototype.onLoad = function() {
        var _this = this;
        this.quizNode.on(util_1.TouchEvents.TOUCH_START, this.onPageTouchStart, this);
        this.quizNode.on(util_1.TouchEvents.TOUCH_MOVE, this.onPageTouchMove, this);
        this.quizNode.on(util_1.TouchEvents.TOUCH_END, this.onPageTouchEnd, this);
        this._graphics = this.quizNode.parent.getChildByName("draw").getComponent(cc.Graphics);
        this._graphics.lineJoin = cc.Graphics.LineJoin.ROUND;
        this._graphics.lineCap = cc.Graphics.LineCap.ROUND;
        this._graphics.strokeColor = cc.Color.BLACK;
        this._graphics.lineWidth = 20;
        if (this.data.type == quiz_1.QuizBtnType.Sentence) this.label.string = this.data.text; else {
          var picWidth_1 = this.node.width;
          var picHeight_1 = this.node.height;
          util_1.Util.loadTexture(this.quizDir + this.data.pic, function(texture) {
            if (null != texture) {
              _this.image.spriteFrame = new cc.SpriteFrame(texture);
              var size = _this.image.spriteFrame.getOriginalSize();
              var xScale = picWidth_1 / size.width;
              var yScale = picHeight_1 / size.height;
              var scale = Math.min(xScale, yScale);
              _this.node.width = scale * size.width;
              _this.node.height = scale * size.height;
            }
          });
        }
      };
      Choice.prototype.onPageTouchStart = function(touch) {
        if (this.enabled) {
          this.clear();
          if (this.node.getBoundingBox().contains(this.node.parent.convertToNodeSpaceAR(touch.getLocation()))) {
            this._touchStartPoint = this.quizNode.parent.convertToNodeSpaceAR(touch.getLocation());
            lineMatchingStartName = this.data.matchName;
            lineMatchingStartNode = this.node;
          }
        }
      };
      Choice.prototype.clear = function() {
        this._graphics.clear();
        this._touchStartPoint = null;
      };
      Choice.prototype.onPageTouchMove = function(touch) {
        if (this._touchStartPoint && this.enabled) {
          this._graphics.clear();
          var loc = this.quizNode.parent.convertToNodeSpaceAR(touch.getLocation());
          cc.log("touch move from", this._touchStartPoint, " to", loc);
          this._graphics.moveTo(this._touchStartPoint.x, this._touchStartPoint.y);
          this._graphics.lineTo(loc.x, loc.y);
          this._graphics.stroke();
        }
      };
      Choice.prototype.onPageTouchEnd = function(touch) {
        if (this.enabled) {
          this.clear();
          if (this.node.getBoundingBox().contains(this.node.parent.convertToNodeSpaceAR(touch.getLocation()))) {
            var choiceComponent = this.node.getComponent(Choice_1);
            if (choiceComponent.data.matchName === lineMatchingStartName) {
              this.node.opacity = 100;
              var choiceComponent_1 = this.node.getComponent(Choice_1);
              choiceComponent_1.enabled = false;
              var otherChoiceComponent = lineMatchingStartNode.getComponent(Choice_1);
              lineMatchingStartNode.opacity = 100;
              otherChoiceComponent.enabled = false;
              choiceComponent_1.node.dispatchEvent(new cc.Event.EventCustom(quiz_1.LINE_MATCH_CHOICE_CORRECT, true));
            } else this.node.dispatchEvent(new cc.Event.EventCustom(quiz_1.LINE_MATCH_CHOICE_WRONG, true));
          }
        }
      };
      var Choice_1;
      __decorate([ property(cc.Label) ], Choice.prototype, "label", void 0);
      __decorate([ property(cc.Sprite) ], Choice.prototype, "image", void 0);
      __decorate([ error_handler_1.default() ], Choice.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], Choice.prototype, "onPageTouchStart", null);
      __decorate([ error_handler_1.default() ], Choice.prototype, "clear", null);
      __decorate([ error_handler_1.default() ], Choice.prototype, "onPageTouchMove", null);
      __decorate([ error_handler_1.default() ], Choice.prototype, "onPageTouchEnd", null);
      Choice = Choice_1 = __decorate([ ccclass ], Choice);
      return Choice;
    }(cc.Component);
    exports.default = Choice;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./quiz": "quiz"
  } ],
  "fill-blanks-drag": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6437eZGIhFG+523YySIbCDT", "fill-blanks-drag");
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
    var quiz_1 = require("./quiz");
    var drag_1 = require("../../../common/scripts/drag");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var FillBlanksDrag = function(_super) {
      __extends(FillBlanksDrag, _super);
      function FillBlanksDrag() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      FillBlanksDrag.prototype.onTouchEnd = function(touch) {
        _super.prototype.onTouchEnd.call(this, touch);
        this.match ? this.node.emit(quiz_1.FILL_IN_BLANKS_MATCH, this) : this.node.emit(quiz_1.FILL_IN_BLANKS_NO_MATCH);
      };
      FillBlanksDrag = __decorate([ ccclass ], FillBlanksDrag);
      return FillBlanksDrag;
    }(drag_1.default);
    exports.default = FillBlanksDrag;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drag": void 0,
    "./quiz": "quiz"
  } ],
  "fill-blanks-drop": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2e5d8BCDJdCjo7l/PcdbLjT", "fill-blanks-drop");
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
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var FillBlanksDrop = function(_super) {
      __extends(FillBlanksDrop, _super);
      function FillBlanksDrop() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.origWidth = 0;
        return _this;
      }
      FillBlanksDrop.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.origWidth = this.node.width;
      };
      FillBlanksDrop.prototype.onCollisionEnter = function(other, self) {
        _super.prototype.onCollisionEnter.call(this, other, self);
        this.allowDrop && (this.node.width = other.node.width);
      };
      FillBlanksDrop.prototype.onCollisionExit = function(other, self) {
        _super.prototype.onCollisionExit.call(this, other, self);
        this.allowDrop && (this.node.width = this.origWidth);
      };
      __decorate([ error_handler_1.default() ], FillBlanksDrop.prototype, "onLoad", null);
      FillBlanksDrop = __decorate([ ccclass ], FillBlanksDrop);
      return FillBlanksDrop;
    }(drop_1.default);
    exports.default = FillBlanksDrop;
    cc._RF.pop();
  }, {
    "../../../common/scripts/drop": void 0,
    "../../../common/scripts/lib/error-handler": void 0
  } ],
  "page-sound": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f2398RdqLhMcrZH1Dnm99kj", "page-sound");
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
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var PageSound = function(_super) {
      __extends(PageSound, _super);
      function PageSound() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._isSoundPlaying = false;
        _this._soundClip = null;
        _this._normalSpriteFrame = null;
        _this._pressedSpriteFrame = null;
        return _this;
      }
      PageSound.prototype.onLoad = function() {
        var button = this.node.getComponent(cc.Button);
        this._normalSpriteFrame = button.normalSprite;
        this._pressedSpriteFrame = button.pressedSprite;
      };
      PageSound.prototype.playSound = function(node) {
        var _this = this;
        var button = node.getComponent(cc.Button);
        if (!this._isSoundPlaying) {
          cc.audioEngine.stopAllEffects();
          this._isSoundPlaying = true;
          button.normalSprite = this._pressedSpriteFrame;
          var audioId = util_1.Util.play(this._soundClip, false);
          cc.audioEngine.setFinishCallback(audioId, function() {
            _this._isSoundPlaying = false;
            button.normalSprite = _this._normalSpriteFrame;
          });
        }
      };
      PageSound.prototype.stopSound = function() {
        this._isSoundPlaying = false;
        cc.audioEngine.stopMusic();
        var button = this.node.getComponent(cc.Button);
        button.normalSprite = this._normalSpriteFrame;
      };
      PageSound.prototype.soundOnLoad = function() {
        this.playSound(this.node);
      };
      PageSound.prototype.onButtonClick = function(event, customEventData) {
        var node = event.target;
        this.stopSound();
        this.playSound(node);
      };
      Object.defineProperty(PageSound.prototype, "soundClip", {
        set: function(n) {
          this._soundClip = n;
        },
        enumerable: false,
        configurable: true
      });
      PageSound.prototype.onDestroy = function() {
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic();
      };
      __decorate([ error_handler_1.default() ], PageSound.prototype, "onLoad", null);
      PageSound = __decorate([ ccclass ], PageSound);
      return PageSound;
    }(cc.Component);
    exports.default = PageSound;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0
  } ],
  "quiz-button": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c5590Jf0wBKCIbzkQluCQOP", "quiz-button");
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
    var quiz_1 = require("./quiz");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var util_1 = require("../../../common/scripts/util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var handleClick = true;
    var QuizButton = function(_super) {
      __extends(QuizButton, _super);
      function QuizButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.image = null;
        _this.data = null;
        _this.quizDir = "";
        _this.quizNode = null;
        return _this;
      }
      QuizButton.prototype.onLoad = function() {
        var _this = this;
        handleClick = true;
        if (this.data.type == quiz_1.QuizBtnType.Sentence) this.label.string = this.data.text; else {
          var picWidth_1 = this.node.width;
          var picHeight_1 = this.node.height;
          util_1.Util.loadTexture(this.quizDir + this.data.pic, function(texture) {
            if (null != texture) {
              _this.image.spriteFrame = new cc.SpriteFrame(texture);
              var size = _this.image.spriteFrame.getOriginalSize();
              var xScale = picWidth_1 / size.width;
              var yScale = picHeight_1 / size.height;
              var scale = Math.min(xScale, yScale);
              _this.node.width = scale * size.width;
              _this.node.height = scale * size.height;
            }
          });
        }
      };
      QuizButton.prototype.makeInteractable = function(interactable) {
        this.node.parent.children.forEach(function(but) {
          var butComp = but.getComponent(cc.Button);
          butComp.interactable = interactable;
          handleClick = interactable;
        });
      };
      QuizButton.prototype.onClick = function() {
        if (handleClick) {
          handleClick = false;
          this.makeInteractable(false);
          if (this.data.correct) {
            this.node.dispatchEvent(new cc.Event.EventCustom(quiz_1.MULTI_CHOICE_CORRECT, true));
            this.makeInteractable(false);
          } else {
            this.node.dispatchEvent(new cc.Event.EventCustom(quiz_1.MULTI_CHOICE_WRONG, true));
            this.makeInteractable(true);
          }
        }
      };
      __decorate([ property(cc.Label) ], QuizButton.prototype, "label", void 0);
      __decorate([ property(cc.Sprite) ], QuizButton.prototype, "image", void 0);
      __decorate([ error_handler_1.default() ], QuizButton.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], QuizButton.prototype, "makeInteractable", null);
      QuizButton = __decorate([ ccclass ], QuizButton);
      return QuizButton;
    }(cc.Component);
    exports.default = QuizButton;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./quiz": "quiz"
  } ],
  "quiz-tracing": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2a395j5Ke9As4MWH79KTOf5", "quiz-tracing");
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
    var singlelettertracing_1 = require("../../../common/Tracing/scripts/singlelettertracing");
    var util_1 = require("../../../common/scripts/util");
    var helper_1 = require("../../../common/scripts/helper");
    var QuizTracing = function(_super) {
      __extends(QuizTracing, _super);
      function QuizTracing() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.words = null;
        _this.singleLetterPrefab = null;
        _this.characters = [];
        _this._currentLetterIndex = 0;
        return _this;
      }
      QuizTracing.prototype.onLoad = function() {
        var _this = this;
        if (1 === this.currentConfig.choices.length) {
          var word = this.currentConfig.choices[0].toUpperCase();
          this.characters = word.split("");
          var wordLayout = this.words.getComponent(cc.Layout);
          helper_1.Helper.subScribeToTracingEvents(this.node, this.node, this.tracingFinished.bind(this));
          this.words.setPosition(new cc.Vec2(cc.winSize.width, this.words.getPosition().y));
          helper_1.Helper.buildLetters(this.node, this.words, this.characters, this.singleLetterPrefab, cc.winSize.width - 100, cc.winSize.height);
          this.node.emit(helper_1.CONFIG_LOADED);
          this.emitLetterEnabledEvent(wordLayout.node.getChildByName("L0"), 0);
          this.node.on(helper_1.MOVE_TO_NEXT_LETTER_EVENT, function(event) {
            event.stopPropagation();
            var data = event.getUserData();
            _this.moveToNextLetter(data);
          });
        }
      };
      QuizTracing.prototype.tracingFinished = function() {
        var wordLayout = this.words.getComponent(cc.Layout);
        var letterNode = wordLayout.node.getChildByName("L" + this._currentLetterIndex);
        letterNode.getComponent(singlelettertracing_1.SingleLetterTracing).pronounce();
        var customEvent = new cc.Event.EventCustom(helper_1.MOVE_TO_NEXT_LETTER_EVENT, true);
        this._currentLetterIndex++;
        customEvent.setUserData({
          elementIndex: this._currentLetterIndex
        });
        this.node.dispatchEvent(customEvent);
      };
      QuizTracing.prototype.emitLetterEnabledEvent = function(fNode, index) {
        fNode.emit("letterEnabledEvent", index);
      };
      QuizTracing.prototype.moveToNextLetter = function(data) {
        var _this = this;
        var index = data.elementIndex;
        var wordLayout = this.words.getComponent(cc.Layout);
        if (index <= this.characters.length - 1) {
          var child = wordLayout.node.getChildByName("L" + index);
          this.minScrollToLeft(index, child);
          this.scrollToLeft(index, child);
        } else {
          var pronounce_1 = this.quizDir + this.currentConfig.choicesSound + ".mp3";
          this.scheduleOnce(function() {
            util_1.Util.speak(pronounce_1, function() {
              _this.node.dispatchEvent(new cc.Event.EventCustom(helper_1.GO_TO_NEXT_PROBLEM, true));
            });
          }, 1);
        }
      };
      QuizTracing.prototype.minScrollToLeft = function(index, child) {
        var scrollToLeft = cc.winSize.width / 4;
        var wordLayout = this.words.getComponent(cc.Layout);
        var newPos = new cc.Vec2(wordLayout.node.position.x - scrollToLeft, wordLayout.node.position.y);
        this.tweenMove(wordLayout, newPos, index);
      };
      QuizTracing.prototype.tweenMove = function(wordLayout, newPos, index) {
        var _this = this;
        new cc.Tween().target(wordLayout.node).to(.5, {
          position: newPos
        }, {
          progress: null,
          easing: "sineOut"
        }).call(function() {
          _this.emitLetterEnabledEvent(wordLayout.node.getChildByName("L" + index), index);
        }).start();
      };
      QuizTracing.prototype.scrollToLeft = function(index, child) {
        var wordLayout = this.words.getComponent(cc.Layout);
        if (child.position.x - Math.abs(wordLayout.node.position.x / 2) + 1 * child.width > 3 * cc.winSize.width / 4) {
          var scrollToLeft = 1.1 * child.width;
          var newPos = new cc.Vec2(wordLayout.node.position.x - scrollToLeft, wordLayout.node.position.y);
          this.tweenMove(wordLayout, newPos, index);
        } else this.minScrollToLeft(index, child);
      };
      __decorate([ property(cc.Node) ], QuizTracing.prototype, "words", void 0);
      __decorate([ property(cc.Prefab) ], QuizTracing.prototype, "singleLetterPrefab", void 0);
      __decorate([ error_handler_1.default() ], QuizTracing.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], QuizTracing.prototype, "tracingFinished", null);
      __decorate([ error_handler_1.default() ], QuizTracing.prototype, "emitLetterEnabledEvent", null);
      __decorate([ error_handler_1.default() ], QuizTracing.prototype, "moveToNextLetter", null);
      __decorate([ error_handler_1.default() ], QuizTracing.prototype, "minScrollToLeft", null);
      __decorate([ error_handler_1.default() ], QuizTracing.prototype, "tweenMove", null);
      __decorate([ error_handler_1.default() ], QuizTracing.prototype, "scrollToLeft", null);
      QuizTracing = __decorate([ ccclass ], QuizTracing);
      return QuizTracing;
    }(cc.Component);
    exports.default = QuizTracing;
    cc._RF.pop();
  }, {
    "../../../common/Tracing/scripts/singlelettertracing": void 0,
    "../../../common/scripts/helper": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0
  } ],
  quiz: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f9db4QLwLZCkazRBqZcNazn", "quiz");
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
    exports.ChoiceData = exports.BtnData = exports.QuizBtnType = exports.LINE_MATCH_CHOICE_WRONG = exports.LINE_MATCH_CHOICE_CORRECT = exports.MULTI_CHOICE_WRONG = exports.MULTI_CHOICE_CORRECT = exports.FILL_IN_BLANKS_NO_MATCH = exports.FILL_IN_BLANKS_MATCH = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var page_sound_1 = require("./page-sound");
    var quiz_tracing_1 = require("./quiz-tracing");
    var fill_blanks_drag_1 = require("./fill-blanks-drag");
    var fill_blanks_drop_1 = require("./fill-blanks-drop");
    var quiz_button_1 = require("./quiz-button");
    var choice_1 = require("./choice");
    var config_1 = require("../../../common/scripts/lib/config");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var util_1 = require("../../../common/scripts/util");
    var chimple_label_1 = require("../../../common/scripts/chimple-label");
    var drag_1 = require("../../../common/scripts/drag");
    var helper_1 = require("../../../common/scripts/helper");
    var ADJUST_FILL_IN_BLANKS = "ADJUST_FILL_IN_BLANKS";
    exports.FILL_IN_BLANKS_MATCH = "fillInBlanksMatch";
    exports.FILL_IN_BLANKS_NO_MATCH = "fillInBlanksNoMatch";
    exports.MULTI_CHOICE_CORRECT = "multiChoiceCorrect";
    exports.MULTI_CHOICE_WRONG = "multiChoiceWrong";
    exports.LINE_MATCH_CHOICE_CORRECT = "lineMatchChoiceCorrect";
    exports.LINE_MATCH_CHOICE_WRONG = "lineMatchChoiceWrong";
    var QuizBtnType;
    (function(QuizBtnType) {
      QuizBtnType[QuizBtnType["Sentence"] = 0] = "Sentence";
      QuizBtnType[QuizBtnType["Picture"] = 1] = "Picture";
    })(QuizBtnType = exports.QuizBtnType || (exports.QuizBtnType = {}));
    var BtnData = function() {
      function BtnData(correct, type, text, pic) {
        this.correct = correct;
        this.type = type;
        this.text = text;
        this.pic = pic;
      }
      return BtnData;
    }();
    exports.BtnData = BtnData;
    var ChoiceData = function() {
      function ChoiceData(matchName, type, text, pic) {
        this.matchName = matchName;
        this.type = type;
        this.text = text;
        this.pic = pic;
      }
      return ChoiceData;
    }();
    exports.ChoiceData = ChoiceData;
    var Quiz = function(_super) {
      __extends(Quiz, _super);
      function Quiz() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._soundClip = null;
        _this._page = null;
        _this._quizDir = null;
        _this._soundDir = null;
        _this.titleSection = null;
        _this.middleSection = null;
        _this.imageSection = null;
        _this.bottomSection = null;
        _this.bottomSectionLayout = null;
        _this.quizTracing = null;
        _this.fillBlankDrag = null;
        _this.fillBlankDrop = null;
        _this.textsLayout = null;
        _this.quizLabel = null;
        _this._titleSection = null;
        _this._fillInBlanksMap = new Map();
        _this._maxAnswerLengthF = 0;
        _this._fillInBlanksDropTokens = [];
        _this._fillInBlanksCount = 0;
        _this._imagesAsChoicesInMC = false;
        _this._middleSectionNode = null;
        _this._lineMatchingCount = 0;
        return _this;
      }
      Quiz.prototype.onEnable = function() {
        var collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
      };
      Quiz.prototype.onLoad = function() {
        var config = config_1.default.getInstance();
        this.registerNotifications();
        this._currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
        this._quizDir = config_1.default.dir + (config.lesson.id + "/res/");
        this._soundDir = config_1.default.dir + (config.lesson.id + "/res/");
        this._page = this.node;
        this._currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
        console.log("quiz", JSON.stringify(this._currentConfig));
        this.renderTitle(this._currentConfig.title);
        this.loadTitleSound();
        this.renderMiddleSection();
        this.renderBottomSection();
      };
      Quiz.prototype.registerNotifications = function() {
        var _this = this;
        this.node.on(ADJUST_FILL_IN_BLANKS, function() {
          _this.adjustFillInBlanks();
        });
        this.node.on(helper_1.GO_TO_NEXT_PROBLEM, function(event) {
          event.stopPropagation();
          _this.scheduleOnce(function() {
            _this.node.parent.emit("nextProblem");
          }, 1);
        });
        this.node.on(exports.MULTI_CHOICE_WRONG, function(event) {
          event.stopPropagation();
          _this.node.parent.emit("wrong");
        });
        this.node.on(exports.MULTI_CHOICE_CORRECT, function(event) {
          event.stopPropagation();
          _this.node.parent.emit("correct");
          _this.scheduleOnce(function() {
            _this.node.parent.emit("nextProblem");
          }, 1);
        });
        this.node.on(exports.LINE_MATCH_CHOICE_WRONG, function(event) {
          event.stopPropagation();
          _this.node.parent.emit("wrong");
        });
        this.node.on(exports.LINE_MATCH_CHOICE_CORRECT, function(event) {
          event.stopPropagation();
          _this.node.parent.emit("correct");
          _this._lineMatchingCount--;
          _this._lineMatchingCount <= 0 && _this.scheduleOnce(function() {
            _this.node.parent.emit("nextProblem");
          }, 1);
        });
      };
      Quiz.prototype.adjustFillInBlanks = function() {
        this._fillInBlanksDropTokens.forEach(function(t) {
          var dropComponent = t.getComponent(fill_blanks_drop_1.default);
          var boxCollider = t.getComponent(cc.BoxCollider);
          var label = t.getChildByName("dropLabel");
          t.width = dropComponent.allowDrop ? t.width : label.width;
          t.height = label.height;
          boxCollider.size = dropComponent.allowDrop ? new cc.Size(t.width, t.height) : new cc.Size(0, 0);
        });
      };
      Quiz.prototype.loadImage = function(middleSectionNode, imageName) {
        var imageNode = cc.instantiate(this.imageSection);
        imageNode.active = false;
        middleSectionNode.addChild(imageNode);
        var picWidth = imageNode.width;
        var picHeight = imageNode.height;
        util_1.Util.loadTexture(this._quizDir + imageName, function(texture, err) {
          if (texture && !err) {
            imageNode.active = true;
            imageNode.setPosition(new cc.Vec2(0, 0));
            var sprite = imageNode.getComponent(cc.Sprite);
            sprite.spriteFrame = new cc.SpriteFrame(texture);
            var size = sprite.spriteFrame.getOriginalSize();
            var xScale = picWidth / size.width;
            var yScale = picHeight / size.height;
            var scale = Math.min(xScale, yScale);
            imageNode.width = scale * size.width;
            imageNode.height = scale * size.height;
          }
        });
      };
      Quiz.prototype.loadTitleSound = function() {
        var _this = this;
        var soundButton = this._titleSection.getChildByName("soundButton");
        this._currentConfig.soundFile ? util_1.Util.loadGameSound(this._quizDir + this._currentConfig.soundFile + ".mp3", function(clip) {
          _this._soundClip = clip;
          if (!!soundButton) {
            var pageSound = soundButton.getComponent(page_sound_1.default);
            pageSound.soundClip = _this._soundClip;
            soundButton.active = !!_this._currentConfig.soundFile;
          }
        }) : !soundButton || (soundButton.active = false);
      };
      Quiz.prototype.renderMiddleSection = function() {
        switch (this._currentConfig.type) {
         case "T":
          this._middleSectionNode = cc.instantiate(this.middleSection);
          this._page.addChild(this._middleSectionNode);
          this.loadImage(this._middleSectionNode, this._currentConfig.image);
          this._middleSectionNode.setPosition(new cc.Vec2(0, 100));
          break;

         case "F":
          this._middleSectionNode = cc.instantiate(this.middleSection);
          this._page.addChild(this._middleSectionNode);
          this.loadImage(this._middleSectionNode, this._currentConfig.image);
          this.loadSentences(this._middleSectionNode);
          this._middleSectionNode.setPosition(new cc.Vec2(0, -50));
          break;

         case "MC":
          if (this._currentConfig.question) {
            this._middleSectionNode = cc.instantiate(this.middleSection);
            this._page.addChild(this._middleSectionNode);
            this.loadQuestion(this._middleSectionNode);
            this.loadChoices();
          }
        }
      };
      Quiz.prototype.loadChoices = function() {
        var _this = this;
        var type = this._imagesAsChoicesInMC ? QuizBtnType.Picture : QuizBtnType.Sentence;
        var answerText = this._currentConfig.correctAnswers && 1 === this._currentConfig.correctAnswers.length ? this._currentConfig.correctAnswers[0].trim() : null;
        var choiceNodes = [];
        choiceNodes = this._currentConfig.choices.map(function(choice) {
          var choiceData = new BtnData(answerText === choice.trim(), type, choice, choice);
          return _this.createChoice(choiceData);
        });
        return choiceNodes;
      };
      Quiz.prototype.createChoice = function(data, isButton) {
        void 0 === isButton && (isButton = true);
        var choiceNode = isButton ? cc.instantiate(data.type == QuizBtnType.Sentence ? this.textChoiceButtonPrefab : this.imageChoiceButtonPrefab) : cc.instantiate(this.choicePrefab);
        choiceNode.name = data.type == QuizBtnType.Sentence ? data.text : data.pic;
        var choiceComp = isButton ? choiceNode.getComponent(quiz_button_1.default) : choiceNode.getComponent(choice_1.default);
        if (null != choiceComp) {
          choiceComp.quizDir = this._quizDir;
          choiceComp.data = data;
          choiceComp.quizNode = this.node;
        }
        return choiceNode;
      };
      Quiz.prototype.getLabel = function(text) {
        var questionNode = cc.instantiate(this.quizLabel);
        var questionLabel = questionNode.getComponent(cc.Label);
        questionLabel.string = text;
        return questionNode;
      };
      Quiz.prototype.loadQuestion = function(middleSectionNode) {
        var questionNode = this.getLabel(this._currentConfig.question);
        middleSectionNode.addChild(questionNode);
        middleSectionNode.height = 150;
        middleSectionNode.setPosition(new cc.Vec2(0, 100));
      };
      Quiz.prototype.loadSentences = function(middleSectionNode) {
        var _this = this;
        var sentencesLayoutNode = cc.instantiate(this.textsLayout);
        middleSectionNode.addChild(sentencesLayoutNode);
        sentencesLayoutNode.setPosition(new cc.Vec2(0, -75));
        this._currentConfig.sentences.forEach(function(s, sentenceIndex) {
          var tokens = s.split(/[\s.,]+/);
          var labels = _this._fillInBlanksMap.get(sentenceIndex) || [];
          var labelCount = 0;
          tokens.forEach(function(val, index) {
            var drop = cc.instantiate(_this.fillBlankDrop);
            var label = drop.getChildByName("dropLabel");
            var chimpleLabel = label.getComponent(cc.Label);
            var dropComponent = drop.getComponent(fill_blanks_drop_1.default);
            if ("#" === val) {
              var nVal = labels.length > labelCount ? labels[labelCount] : "";
              labelCount++;
              drop.name = nVal;
              chimpleLabel.string = "     ";
              dropComponent.allowDrop = true;
              drop.width = 30 * _this._maxAnswerLengthF;
              _this._fillInBlanksCount++;
            } else {
              var spriteLine = drop.getComponent(cc.Sprite);
              drop.removeComponent(spriteLine);
              chimpleLabel.string = val;
              dropComponent.allowDrop = false;
              drop.width = 0;
              drop.name = val;
            }
            _this._fillInBlanksDropTokens.push(drop);
            sentencesLayoutNode.addChild(drop);
          });
          _this.node.emit(ADJUST_FILL_IN_BLANKS);
        });
      };
      Quiz.prototype.renderBottomSection = function() {
        var _this = this;
        switch (this._currentConfig.type) {
         case "T":
          var bottomSectionNode = cc.instantiate(this.bottomSection);
          bottomSectionNode.width = cc.winSize.width - 100;
          bottomSectionNode.height = cc.winSize.height / 2;
          var quizTracing = cc.instantiate(this.quizTracing);
          var quizTracingComponent = quizTracing.getComponent(quiz_tracing_1.default);
          quizTracingComponent.quizDir = this._quizDir;
          quizTracingComponent.currentConfig = this._currentConfig;
          quizTracing.setPosition(new cc.Vec2(0, 0));
          bottomSectionNode.addChild(quizTracing);
          bottomSectionNode.setPosition(0, -225);
          this._page.addChild(bottomSectionNode);
          break;

         case "F":
          var bottomSectionLayoutNode_1 = cc.instantiate(this.bottomSectionLayout);
          bottomSectionLayoutNode_1.width = cc.winSize.width - 100;
          bottomSectionLayoutNode_1.height = cc.winSize.height / 4;
          this._currentConfig.choices.forEach(function(val) {
            var drag = cc.instantiate(_this.fillBlankDrag);
            drag.name = val;
            drag.on(exports.FILL_IN_BLANKS_MATCH, _this.onMatch.bind(_this));
            drag.on(exports.FILL_IN_BLANKS_NO_MATCH, function() {
              _this.node.parent.emit("wrong");
            });
            var dragComp = drag.getComponent(fill_blanks_drag_1.default);
            null != dragComp && (dragComp.label.string = val);
            var tempNode = new cc.Node();
            tempNode.name = val;
            tempNode.addChild(drag);
            bottomSectionLayoutNode_1.addChild(tempNode);
          });
          bottomSectionLayoutNode_1.setPosition(0, -300);
          this._page.addChild(bottomSectionLayoutNode_1);
          break;

         case "MC":
          var container_1 = cc.instantiate(this.bottomSectionLayout);
          container_1.width = cc.winSize.width;
          container_1.height = 300;
          if (this._imagesAsChoicesInMC) this.loadChoices().forEach(function(c) {
            container_1.addChild(c);
          }); else {
            var textsLayoutNode_1 = this.getVerticalLayout();
            this.loadImage(container_1, this._currentConfig.image);
            this.loadChoices().forEach(function(c) {
              textsLayoutNode_1.addChild(c);
            });
            container_1.addChild(textsLayoutNode_1);
          }
          this._middleSectionNode ? container_1.setPosition(0, -cc.winSize.height / 4) : container_1.setPosition(0, 0);
          this._page.addChild(container_1);
          break;

         case "M":
          var lineMatchingContainer = cc.instantiate(this.bottomSectionLayout);
          lineMatchingContainer.width = cc.winSize.width;
          var textsLayoutNodeLeft_1 = this.getVerticalLayout(cc.Layout.ResizeMode.CHILDREN);
          var choiceTokens = this._currentConfig.choices && 1 === this._currentConfig.choices.length && this._currentConfig.choices[0].split(",") || [];
          var sentenceTokens_1 = this._currentConfig.sentences && 1 === this._currentConfig.sentences.length && this._currentConfig.sentences[0].split(",") || [];
          sentenceTokens_1.forEach(function(s, i) {
            var choiceData = new ChoiceData(s, QuizBtnType.Sentence, s, s);
            var labelNode = _this.createChoice(choiceData, false);
            labelNode.height = 100;
            labelNode.width = 350;
            labelNode.children.forEach(function(c) {
              c.height = c.width = 100;
              c.width = 350;
            });
            textsLayoutNodeLeft_1.addChild(labelNode);
          });
          var textsLayoutNodeRight_1 = this.getVerticalLayout(cc.Layout.ResizeMode.CHILDREN);
          var minHeight_1 = 0;
          var maxImageHeight_1 = 150;
          this._lineMatchingCount = choiceTokens.length;
          var imageNodes = choiceTokens.map(function(t, i) {
            var choiceData = new ChoiceData(sentenceTokens_1[i], QuizBtnType.Picture, t, t);
            var imageNode = _this.createChoice(choiceData, false);
            imageNode.height = Math.min((cc.winSize.height - 100) / _this._lineMatchingCount, maxImageHeight_1);
            imageNode.width = imageNode.height = 150;
            imageNode.children.forEach(function(c) {
              c.height = c.width = 150;
            });
            minHeight_1 += imageNode.height;
            return imageNode;
          });
          imageNodes = util_1.Util.randomElements(imageNodes, imageNodes.length);
          imageNodes.forEach(function(c) {
            return textsLayoutNodeRight_1.addChild(c);
          });
          textsLayoutNodeLeft_1.height = textsLayoutNodeRight_1.height = minHeight_1 + 100;
          lineMatchingContainer.addChild(textsLayoutNodeLeft_1);
          lineMatchingContainer.addChild(textsLayoutNodeRight_1);
          this._middleSectionNode ? lineMatchingContainer.setPosition(0, -cc.winSize.height / 4) : lineMatchingContainer.setPosition(0, -cc.winSize.height / 8);
          this._page.addChild(lineMatchingContainer);
        }
      };
      Quiz.prototype.renderTitle = function(titleText) {
        this._titleSection = cc.instantiate(this.titleSection);
        this._titleSection.setPosition(new cc.Vec2(0, 275));
        this._page.addChild(this._titleSection);
        var titleTextNode = this._titleSection.getChildByName("titleText");
        if (!!titleTextNode) {
          var label = titleTextNode.getComponent(chimple_label_1.default);
          label.string = titleText;
        }
      };
      Quiz.prototype.getVerticalLayout = function(resizeMode) {
        void 0 === resizeMode && (resizeMode = cc.Layout.ResizeMode.CONTAINER);
        var textsLayoutNode = cc.instantiate(this.textsLayout);
        var layout = textsLayoutNode.getComponent(cc.Layout);
        layout.type = cc.Layout.Type.VERTICAL;
        layout.resizeMode = resizeMode;
        layout.paddingTop = layout.paddingBottom = 5;
        layout.spacingY = 10;
        layout.verticalDirection = cc.Layout.VerticalDirection.TOP_TO_BOTTOM;
        return textsLayoutNode;
      };
      Quiz.prototype.processConfiguration = function(data) {
        var _this = this;
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var gameName = configurations[0], count = configurations[1], description = configurations[2], pageNo = configurations[3], type = configurations[4], params = configurations.slice(5);
        var title;
        var soundFile;
        var image;
        var question;
        var sentences = [];
        var choices = [];
        var choicesSound = [];
        var correctAnswers = [];
        switch (type) {
         case "F":
          if (5 === params.length) {
            title = params[0];
            image = params[1];
            var originalText_1 = params[2].split("/");
            originalText_1.forEach(function(o, i) {
              var matches = o.match(/\[(.*?)\]/g) || [];
              var t = originalText_1[i].trim();
              if (t && t.length > 0) {
                var mc_1 = [];
                matches.forEach(function(m, i) {
                  t = t.replace(m, "#");
                  var text = m.replace("[", "").replace("]", "");
                  mc_1.push(text);
                  _this._maxAnswerLengthF = text.length > _this._maxAnswerLengthF ? text.length : _this._maxAnswerLengthF;
                  choices.push(text);
                  correctAnswers.push(text);
                });
                _this._fillInBlanksMap.set(i, mc_1);
                sentences.push(t);
              }
            });
            choices.push(params[3]);
            soundFile = params[4];
          }
          break;

         case "T":
          if (5 === params.length) {
            title = params[0];
            soundFile = params[1];
            image = params[2];
            choices.push(params[3]);
            choicesSound.push(params[4]);
          }
          break;

         case "MC":
          if (4 === params.length) {
            title = params[0];
            params[1].endsWith(".png") ? image = params[1] : question = params[1];
            this._imagesAsChoicesInMC = -1 !== params[2].indexOf(".png");
            choices = params[2].split(",");
            correctAnswers.push(params[3]);
          } else if (5 === params.length) {
            title = params[0].trim();
            params[1].endsWith(".png") ? image = params[1] : question = params[1];
            image = params[2];
            this._imagesAsChoicesInMC = -1 !== params[3].indexOf(".png");
            choices = params[3].split(",");
            correctAnswers.push(params[4].trim());
          }
          break;

         case "M":
          if (3 === params.length) {
            title = params[0];
            sentences.push(params[1]);
            choices.push(params[2]);
          }
        }
        return {
          pageNo: pageNo,
          type: type,
          title: title,
          soundFile: soundFile,
          question: question,
          sentences: sentences,
          choices: choices,
          choicesSound: choicesSound,
          correctAnswers: correctAnswers,
          image: image
        };
      };
      Quiz.prototype.onMatch = function() {
        this.node.parent.emit("correct");
        drag_1.default.letDrag = false;
        this._fillInBlanksCount--;
        this._fillInBlanksCount <= 0 && this.node.parent.emit("nextProblem");
      };
      __decorate([ property(cc.Prefab) ], Quiz.prototype, "titleSection", void 0);
      __decorate([ property(cc.Prefab) ], Quiz.prototype, "middleSection", void 0);
      __decorate([ property(cc.Prefab) ], Quiz.prototype, "imageSection", void 0);
      __decorate([ property(cc.Prefab) ], Quiz.prototype, "bottomSection", void 0);
      __decorate([ property(cc.Prefab) ], Quiz.prototype, "bottomSectionLayout", void 0);
      __decorate([ property(cc.Prefab) ], Quiz.prototype, "quizTracing", void 0);
      __decorate([ property(cc.Prefab) ], Quiz.prototype, "fillBlankDrag", void 0);
      __decorate([ property(cc.Prefab) ], Quiz.prototype, "fillBlankDrop", void 0);
      __decorate([ property(cc.Prefab) ], Quiz.prototype, "textsLayout", void 0);
      __decorate([ property(cc.Prefab) ], Quiz.prototype, "quizLabel", void 0);
      __decorate([ property(cc.Prefab) ], Quiz.prototype, "textChoiceButtonPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Quiz.prototype, "imageChoiceButtonPrefab", void 0);
      __decorate([ property(cc.Prefab) ], Quiz.prototype, "choicePrefab", void 0);
      __decorate([ error_handler_1.default() ], Quiz.prototype, "onEnable", null);
      __decorate([ error_handler_1.default() ], Quiz.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], Quiz.prototype, "registerNotifications", null);
      __decorate([ error_handler_1.default() ], Quiz.prototype, "adjustFillInBlanks", null);
      __decorate([ error_handler_1.default() ], Quiz.prototype, "loadImage", null);
      __decorate([ error_handler_1.default() ], Quiz.prototype, "loadTitleSound", null);
      __decorate([ error_handler_1.default() ], Quiz.prototype, "renderMiddleSection", null);
      __decorate([ error_handler_1.default() ], Quiz.prototype, "loadChoices", null);
      __decorate([ error_handler_1.default() ], Quiz.prototype, "createChoice", null);
      __decorate([ error_handler_1.default() ], Quiz.prototype, "getLabel", null);
      __decorate([ error_handler_1.default() ], Quiz.prototype, "loadQuestion", null);
      __decorate([ error_handler_1.default() ], Quiz.prototype, "loadSentences", null);
      __decorate([ error_handler_1.default() ], Quiz.prototype, "renderBottomSection", null);
      __decorate([ error_handler_1.default() ], Quiz.prototype, "renderTitle", null);
      __decorate([ error_handler_1.default() ], Quiz.prototype, "getVerticalLayout", null);
      Quiz = __decorate([ ccclass ], Quiz);
      return Quiz;
    }(cc.Component);
    exports.default = Quiz;
    cc._RF.pop();
  }, {
    "../../../common/scripts/chimple-label": void 0,
    "../../../common/scripts/drag": void 0,
    "../../../common/scripts/helper": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./choice": "choice",
    "./fill-blanks-drag": "fill-blanks-drag",
    "./fill-blanks-drop": "fill-blanks-drop",
    "./page-sound": "page-sound",
    "./quiz-button": "quiz-button",
    "./quiz-tracing": "quiz-tracing"
  } ]
}, {}, [ "choice", "fill-blanks-drag", "fill-blanks-drop", "page-sound", "quiz-button", "quiz-tracing", "quiz" ]);