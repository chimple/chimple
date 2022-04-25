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
  Listening_com_sequence: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a5ac0u+RXVL+46ydYUIa8sX", "Listening_com_sequence");
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
    exports.ListeningComSequence = void 0;
    var ccclass = cc._decorator.ccclass;
    var quiz_helper_1 = require("./quiz-helper");
    var property = cc._decorator.property;
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var WIDTH = 400;
    var HEIGHT = 150;
    var COLOR = "#887D7D";
    var ListeningComSequence = function(_super) {
      __extends(ListeningComSequence, _super);
      function ListeningComSequence() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.textButton = null;
        _this.additionalLabel = null;
        return _this;
      }
      ListeningComSequence.prototype.onLoad = function() {
        this.renderLeft();
        this.renderRight();
      };
      ListeningComSequence.prototype.renderLeft = function() {
        var topPanel = this.node.getChildByName("topPanel");
        var left = topPanel.getChildByName("left");
        this.renderSoundButton(left);
      };
      ListeningComSequence.prototype.renderRight = function() {
        var topPanel = this.node.getChildByName("topPanel");
        var right = topPanel.getChildByName("right");
        var additionalQuestionLabel = cc.instantiate(this.additionalLabel);
        quiz_helper_1.QuizHelper.renderAdditionalQuestionLabel(this.quizConfig, additionalQuestionLabel, WIDTH, HEIGHT);
        additionalQuestionLabel.color = new cc.Color().fromHEX(COLOR);
        right.addChild(additionalQuestionLabel);
        quiz_helper_1.QuizHelper.renderTextChoices(this.quizConfig, this.textButton, right, WIDTH, HEIGHT, this.quizConfig.choices.split("^"));
      };
      ListeningComSequence.prototype.renderSoundButton = function(parent) {
        quiz_helper_1.QuizHelper.renderSoundButton(this.quizConfig, parent, "" + this.assetDir);
      };
      __decorate([ property(cc.Prefab) ], ListeningComSequence.prototype, "textButton", void 0);
      __decorate([ property(cc.Prefab) ], ListeningComSequence.prototype, "additionalLabel", void 0);
      __decorate([ error_handler_1.default() ], ListeningComSequence.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], ListeningComSequence.prototype, "renderLeft", null);
      __decorate([ error_handler_1.default() ], ListeningComSequence.prototype, "renderRight", null);
      __decorate([ error_handler_1.default() ], ListeningComSequence.prototype, "renderSoundButton", null);
      ListeningComSequence = __decorate([ ccclass ], ListeningComSequence);
      return ListeningComSequence;
    }(cc.Component);
    exports.ListeningComSequence = ListeningComSequence;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "./quiz-helper": "quiz-helper"
  } ],
  "bigger-or-smaller": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cbde3Q9Uc9KWqqBHW38wtIu", "bigger-or-smaller");
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
    exports.BiggerOrSmaller = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var quiz_helper_1 = require("../../quizliteracy/scripts/quiz-helper");
    var LABEL_WIDTH = 550;
    var TEXT_WIDTH = 200;
    var TEXT_HEIGHT = 200;
    var BiggerOrSmaller = function(_super) {
      __extends(BiggerOrSmaller, _super);
      function BiggerOrSmaller() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.image = null;
        _this.textButton = null;
        _this.imageGridButton = null;
        _this.choices = [];
        _this.answer = 0;
        _this.choice1 = 0;
        _this.choice2 = 0;
        return _this;
      }
      BiggerOrSmaller.prototype.onLoad = function() {
        this.choices = quiz_helper_1.QuizHelper.randomInRange(this.quizConfig.choices, 2, this.quizConfig.order);
        this.choice1 = Number(this.choices[0]);
        this.choice2 = Number(this.choices[1]);
        var options = this.choices.map(function(n) {
          return Number(n);
        });
        "bigger" === this.quizConfig.order || "biggest" === this.quizConfig.order ? this.answer = Math.max.apply(Math, options) : "smaller" !== this.quizConfig.order && "smallest" !== this.quizConfig.order || (this.answer = Math.min.apply(Math, options));
        this.quizConfig.answer = String(this.answer);
        this.renderTopPanel();
        this.renderBottomPanel();
      };
      BiggerOrSmaller.prototype.renderTopPanel = function() {
        var topPanel = this.node.getChildByName("topPanel");
        this.renderSoundButton(topPanel);
        quiz_helper_1.QuizHelper.renderTextLabel(this.quizConfig, topPanel, LABEL_WIDTH);
      };
      BiggerOrSmaller.prototype.renderSoundButton = function(parent) {
        quiz_helper_1.QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir);
      };
      BiggerOrSmaller.prototype.addGrid = function(bottomPanel, childName, choice) {
        if ("number" === this.quizConfig.displayImage) {
          var c = bottomPanel.getChildByName(childName);
          quiz_helper_1.QuizHelper.renderTextChoices(this.quizConfig, this.textButton, c, TEXT_WIDTH, TEXT_HEIGHT, [ String(choice) ]);
        } else if ("image" === this.quizConfig.displayImage) {
          var c = bottomPanel.getChildByName(childName);
          var cGrid = cc.instantiate(this.imageGridButton);
          quiz_helper_1.QuizHelper.renderImagesInGrid(cGrid, "spriteGrid", this.image, choice, this.quizConfig);
          c.addChild(cGrid);
        }
      };
      BiggerOrSmaller.prototype.renderBottomPanel = function() {
        var bottomPanel = this.node.getChildByName("bottomPanel");
        this.addGrid(bottomPanel, "left", this.choice1);
        this.addGrid(bottomPanel, "right", this.choice2);
      };
      __decorate([ property(cc.Prefab) ], BiggerOrSmaller.prototype, "image", void 0);
      __decorate([ property(cc.Prefab) ], BiggerOrSmaller.prototype, "textButton", void 0);
      __decorate([ property(cc.Prefab) ], BiggerOrSmaller.prototype, "imageGridButton", void 0);
      __decorate([ error_handler_1.default() ], BiggerOrSmaller.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], BiggerOrSmaller.prototype, "renderTopPanel", null);
      __decorate([ error_handler_1.default() ], BiggerOrSmaller.prototype, "renderSoundButton", null);
      __decorate([ error_handler_1.default() ], BiggerOrSmaller.prototype, "addGrid", null);
      __decorate([ error_handler_1.default() ], BiggerOrSmaller.prototype, "renderBottomPanel", null);
      BiggerOrSmaller = __decorate([ ccclass ], BiggerOrSmaller);
      return BiggerOrSmaller;
    }(cc.Component);
    exports.BiggerOrSmaller = BiggerOrSmaller;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "../../quizliteracy/scripts/quiz-helper": "quiz-helper"
  } ],
  compare_number_magnitudes: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "091cb8wZJdKg40z8KYKGjCQ", "compare_number_magnitudes");
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
    exports.CompareNumberMagnitudes = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var util_1 = require("../../../../common/scripts/util");
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var quiz_maths_1 = require("./quiz-maths");
    var math_drag_1 = require("./math-drag");
    var quiz_helper_1 = require("../../quizliteracy/scripts/quiz-helper");
    var quiz_literacy_1 = require("../../quizliteracy/scripts/quiz-literacy");
    var DRAG_HEIGHT = 150;
    var DRAG_WIDTH = 150;
    var CompareNumberMagnitudes = function(_super) {
      __extends(CompareNumberMagnitudes, _super);
      function CompareNumberMagnitudes() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mathDrag = null;
        _this.mathDrop = null;
        _this.choices = [];
        _this.answers = [];
        _this.correctDrops = new Map();
        _this.currentMatches = [];
        return _this;
      }
      CompareNumberMagnitudes.prototype.onLoad = function() {
        var _this = this;
        this.answers = "ascending" === this.quizConfig.order ? __spreadArrays(this.choices.reverse()) : __spreadArrays(this.choices);
        this.choices = quiz_helper_1.QuizHelper.randomInRange(this.quizConfig.choices, 4, this.quizConfig.order);
        this.answers = "ascending" === this.quizConfig.order ? __spreadArrays(this.choices.reverse()) : __spreadArrays(this.choices);
        this.choices = util_1.Util.shuffle(this.choices);
        this.quizConfig.answer = String(this.answers);
        this.renderTopPanel();
        this.renderDragPanel();
        this.renderDropPanel();
        this.node.on(math_drag_1.MATH_MATCH, function(event) {
          event.stopPropagation();
          var data = event.getUserData();
          _this.correctDrops.set(data.drop, data.isCorrect);
          if (Array.from(_this.correctDrops.keys()).length === _this.choices.length) {
            var allCorrect = Array.from(_this.correctDrops.values()).every(function(n) {
              return true === n;
            });
            allCorrect ? _this.node.dispatchEvent(new cc.Event.EventCustom(quiz_maths_1.QUIZ_CORRECT, true)) : _this.node.dispatchEvent(new cc.Event.EventCustom(quiz_literacy_1.QUIZ_WRONG, true));
          }
        });
        this.node.on(math_drag_1.MATH_NO_MATCH, function(event) {
          event.stopPropagation();
          var data = event.getUserData();
          var splits = data.drop.split("_");
          splits && 2 === splits.length && splits[0].length > 0 && splits[1].length > 0 && _this.correctDrops.forEach(function(value, key) {
            key.endsWith(splits[1]) && _this.correctDrops.delete(key);
          });
        });
      };
      CompareNumberMagnitudes.prototype.renderTopPanel = function() {
        var topPanel = this.node.getChildByName("topPanel");
        this.renderSoundButton(topPanel);
      };
      CompareNumberMagnitudes.prototype.renderSoundButton = function(parent) {
        quiz_helper_1.QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir);
      };
      CompareNumberMagnitudes.prototype.renderDragPanel = function() {
        var dragPanel = this.node.getChildByName("dragPanel");
        quiz_helper_1.QuizHelper.renderDragChoices(this.quizConfig, this.mathDrag, dragPanel, DRAG_WIDTH, DRAG_HEIGHT, this.choices, false);
      };
      CompareNumberMagnitudes.prototype.renderDropPanel = function() {
        var dropPanel = this.node.getChildByName("dropPanel");
        quiz_helper_1.QuizHelper.renderDropChoices(this.quizConfig, this.mathDrop, dropPanel, DRAG_WIDTH, DRAG_HEIGHT, this.answers);
      };
      __decorate([ property(cc.Prefab) ], CompareNumberMagnitudes.prototype, "mathDrag", void 0);
      __decorate([ property(cc.Prefab) ], CompareNumberMagnitudes.prototype, "mathDrop", void 0);
      __decorate([ error_handler_1.default() ], CompareNumberMagnitudes.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], CompareNumberMagnitudes.prototype, "renderTopPanel", null);
      __decorate([ error_handler_1.default() ], CompareNumberMagnitudes.prototype, "renderSoundButton", null);
      __decorate([ error_handler_1.default() ], CompareNumberMagnitudes.prototype, "renderDragPanel", null);
      __decorate([ error_handler_1.default() ], CompareNumberMagnitudes.prototype, "renderDropPanel", null);
      CompareNumberMagnitudes = __decorate([ ccclass ], CompareNumberMagnitudes);
      return CompareNumberMagnitudes;
    }(cc.Component);
    exports.CompareNumberMagnitudes = CompareNumberMagnitudes;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "../../../../common/scripts/util": void 0,
    "../../quizliteracy/scripts/quiz-helper": "quiz-helper",
    "../../quizliteracy/scripts/quiz-literacy": "quiz-literacy",
    "./math-drag": "math-drag",
    "./quiz-maths": "quiz-maths"
  } ],
  "digit-numbers": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4195fSOlhZERL1wmJNugRUK", "digit-numbers");
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
    exports.DigitNumbers = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var quiz_helper_1 = require("../../quizliteracy/scripts/quiz-helper");
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var WIDTH = 200;
    var HEIGHT = 200;
    var DigitNumbers = function(_super) {
      __extends(DigitNumbers, _super);
      function DigitNumbers() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.image = null;
        _this.textButton = null;
        _this.choices = [];
        _this.answer = 0;
        return _this;
      }
      DigitNumbers.prototype.onLoad = function() {
        this.quizConfig.choices = -1 !== this.quizConfig.choices.indexOf("~") ? this.quizConfig.choices : this.quizConfig.choices + "~" + this.quizConfig.choices;
        this.answer = quiz_helper_1.QuizHelper.generateAnswer(this.quizConfig.choices);
        this.quizConfig.answer = String(this.answer);
        this.choices = quiz_helper_1.QuizHelper.randomInRangeWithAnswer(this.quizConfig.choices, this.quizConfig.answer, 4, this.quizConfig.order);
        this.renderTopPanel();
        this.renderBottomPanel();
      };
      DigitNumbers.prototype.renderTopPanel = function() {
        var topPanel = this.node.getChildByName("topPanel");
        this.renderSoundButton(topPanel);
        this.renderImages(topPanel);
      };
      DigitNumbers.prototype.renderBottomPanel = function() {
        var bottomPanel = this.node.getChildByName("bottomPanel");
        quiz_helper_1.QuizHelper.renderTextChoices(this.quizConfig, this.textButton, bottomPanel, WIDTH, HEIGHT, this.choices);
      };
      DigitNumbers.prototype.renderImages = function(topPanel) {
        quiz_helper_1.QuizHelper.renderImagesInGrid(topPanel, "topLayout", this.image, this.answer, this.quizConfig);
      };
      DigitNumbers.prototype.renderSoundButton = function(parent) {
        this.quizConfig.soundFile = String(this.answer);
        quiz_helper_1.QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir, true);
      };
      __decorate([ property(cc.Prefab) ], DigitNumbers.prototype, "image", void 0);
      __decorate([ property(cc.Prefab) ], DigitNumbers.prototype, "textButton", void 0);
      __decorate([ error_handler_1.default() ], DigitNumbers.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], DigitNumbers.prototype, "renderTopPanel", null);
      __decorate([ error_handler_1.default() ], DigitNumbers.prototype, "renderBottomPanel", null);
      __decorate([ error_handler_1.default() ], DigitNumbers.prototype, "renderImages", null);
      __decorate([ error_handler_1.default() ], DigitNumbers.prototype, "renderSoundButton", null);
      DigitNumbers = __decorate([ ccclass ], DigitNumbers);
      return DigitNumbers;
    }(cc.Component);
    exports.DigitNumbers = DigitNumbers;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "../../quizliteracy/scripts/quiz-helper": "quiz-helper"
  } ],
  image_sentence: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ce92fQnzh9OOKssxNOLE5va", "image_sentence");
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
    exports.ImageSentence = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var quiz_helper_1 = require("./quiz-helper");
    var Type = cc.Layout.Type;
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var WIDTH = 850;
    var HEIGHT = 85;
    var ImageSentence = function(_super) {
      __extends(ImageSentence, _super);
      function ImageSentence() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.textButton = null;
        _this.imageButton = null;
        return _this;
      }
      ImageSentence.prototype.onLoad = function() {
        this.renderTopPanel();
        this.renderBottomPanel();
      };
      ImageSentence.prototype.renderTopPanel = function() {
        var topPanel = this.node.getChildByName("topPanel");
        this.renderSoundButton(topPanel);
        this.renderLabel(topPanel);
        this.renderImage(topPanel);
      };
      ImageSentence.prototype.renderImage = function(parent) {
        var imageNode = parent.getChildByName("image");
        quiz_helper_1.QuizHelper.loadAndResizeImage(this.quizConfig, imageNode, this.assetDir, this.quizConfig.displayImages);
      };
      ImageSentence.prototype.renderBottomPanel = function() {
        var bottomPanel = this.node.getChildByName("bottomPanel");
        var choices = this.quizConfig.choices.split("^");
        var allImages = choices.every(function(n) {
          return n.endsWith(".png");
        });
        if (allImages) {
          var layout = bottomPanel.getComponent(cc.Layout);
          layout.type = Type.HORIZONTAL;
          quiz_helper_1.QuizHelper.renderImageChoices(this.quizConfig, this.imageButton, bottomPanel, this.assetDir);
        } else quiz_helper_1.QuizHelper.renderTextChoices(this.quizConfig, this.textButton, bottomPanel, WIDTH, HEIGHT, this.quizConfig.choices.split("^"));
      };
      ImageSentence.prototype.renderSoundButton = function(parent) {
        quiz_helper_1.QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir);
      };
      ImageSentence.prototype.renderLabel = function(parent) {
        quiz_helper_1.QuizHelper.renderTextLabel(this.quizConfig, parent);
      };
      __decorate([ property(cc.Prefab) ], ImageSentence.prototype, "textButton", void 0);
      __decorate([ property(cc.Prefab) ], ImageSentence.prototype, "imageButton", void 0);
      __decorate([ error_handler_1.default() ], ImageSentence.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], ImageSentence.prototype, "renderTopPanel", null);
      __decorate([ error_handler_1.default() ], ImageSentence.prototype, "renderImage", null);
      __decorate([ error_handler_1.default() ], ImageSentence.prototype, "renderBottomPanel", null);
      __decorate([ error_handler_1.default() ], ImageSentence.prototype, "renderSoundButton", null);
      __decorate([ error_handler_1.default() ], ImageSentence.prototype, "renderLabel", null);
      ImageSentence = __decorate([ ccclass ], ImageSentence);
      return ImageSentence;
    }(cc.Component);
    exports.ImageSentence = ImageSentence;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "./quiz-helper": "quiz-helper"
  } ],
  image_word: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "faaa4jxHu5L6b2yfvGsV+zi", "image_word");
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
    exports.ImageWord = void 0;
    var ccclass = cc._decorator.ccclass;
    var quiz_helper_1 = require("./quiz-helper");
    var property = cc._decorator.property;
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var LABEL_WIDTH = 250;
    var ImageWord = function(_super) {
      __extends(ImageWord, _super);
      function ImageWord() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.textButton = null;
        return _this;
      }
      ImageWord.prototype.onLoad = function() {
        this.renderTopPanel();
        this.renderBottomPanel();
      };
      ImageWord.prototype.renderTopPanel = function() {
        var topPanel = this.node.getChildByName("topPanel");
        var hLayout = topPanel.getChildByName("hLayout");
        this.renderSoundButton(topPanel);
        this.quizConfig.displayTexts && this.quizConfig.displayTexts.startsWith("__") ? this.renderLabel(hLayout, "rLabel") : this.quizConfig.displayTexts && this.quizConfig.displayTexts.endsWith("__") && this.renderLabel(hLayout, "lLabel");
        this.renderImage(hLayout);
      };
      ImageWord.prototype.renderImage = function(parent) {
        var imageNode = parent.getChildByName("image");
        quiz_helper_1.QuizHelper.loadAndResizeImage(this.quizConfig, imageNode, this.assetDir, this.quizConfig.displayImages);
      };
      ImageWord.prototype.renderBottomPanel = function() {
        var bottomPanel = this.node.getChildByName("bottomPanel");
        quiz_helper_1.QuizHelper.renderTextChoices(this.quizConfig, this.textButton, bottomPanel, 250, 250, this.quizConfig.choices.split("^"));
      };
      ImageWord.prototype.renderSoundButton = function(parent) {
        quiz_helper_1.QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir);
      };
      ImageWord.prototype.renderLabel = function(parent, childName) {
        quiz_helper_1.QuizHelper.renderTextLabel(this.quizConfig, parent, LABEL_WIDTH, "#000000", childName);
      };
      __decorate([ property(cc.Prefab) ], ImageWord.prototype, "textButton", void 0);
      __decorate([ error_handler_1.default() ], ImageWord.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], ImageWord.prototype, "renderTopPanel", null);
      __decorate([ error_handler_1.default() ], ImageWord.prototype, "renderImage", null);
      __decorate([ error_handler_1.default() ], ImageWord.prototype, "renderBottomPanel", null);
      __decorate([ error_handler_1.default() ], ImageWord.prototype, "renderSoundButton", null);
      __decorate([ error_handler_1.default() ], ImageWord.prototype, "renderLabel", null);
      ImageWord = __decorate([ ccclass ], ImageWord);
      return ImageWord;
    }(cc.Component);
    exports.ImageWord = ImageWord;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "./quiz-helper": "quiz-helper"
  } ],
  "imageseq-sentence": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ef356wOUgtMU5NFH3UvgwGG", "imageseq-sentence");
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
    exports.ImageseqSentence = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var Overflow = cc.Label.Overflow;
    var quiz_helper_1 = require("./quiz-helper");
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var WIDTH = 1e3;
    var HEIGHT = 85;
    var ImageseqSentence = function(_super) {
      __extends(ImageseqSentence, _super);
      function ImageseqSentence() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.textButton = null;
        _this.image = null;
        _this.label = null;
        _this.arrow = null;
        _this.fill = null;
        return _this;
      }
      ImageseqSentence.prototype.onLoad = function() {
        this.renderTopPanel();
        this.renderBottomPanel();
      };
      ImageseqSentence.prototype.renderTopPanel = function() {
        var topPanel = this.node.getChildByName("topPanel");
        this.renderSoundButton(topPanel);
        -1 !== this.quizConfig.displayImages.indexOf(".png") ? this.renderImageQuestions(topPanel) : this.renderTextQuestions(topPanel);
      };
      ImageseqSentence.prototype.renderImage = function(parent, imageNode, imageName) {
        return quiz_helper_1.QuizHelper.loadAndResizeImage(this.quizConfig, imageNode, this.assetDir, imageName);
      };
      ImageseqSentence.prototype.renderImageQuestions = function(parent) {
        var _this = this;
        var imagePanel = parent.getChildByName("imagePanel");
        var displayImages = this.quizConfig.displayImages.split("^");
        var howMany = displayImages.length;
        displayImages.forEach(function(s, i) {
          var image = cc.instantiate(_this.image);
          image = _this.renderImage(parent, image, s);
          imagePanel.addChild(image);
          if (i < displayImages.length - 1) {
            imagePanel.addChild(cc.instantiate(_this.arrow));
            if (2 === howMany) {
              imagePanel.addChild(cc.instantiate(_this.fill));
              imagePanel.addChild(cc.instantiate(_this.arrow));
            }
          }
        });
      };
      ImageseqSentence.prototype.renderTextQuestions = function(parent) {
        var _this = this;
        var imagePanel = parent.getChildByName("imagePanel");
        var displayImages = this.quizConfig.displayImages.split("^");
        displayImages.forEach(function(s, i) {
          var label = cc.instantiate(_this.label);
          var labelComponent = label.getComponent(cc.Label);
          labelComponent.overflow = Overflow.RESIZE_HEIGHT;
          labelComponent.string = s;
          imagePanel.addChild(label);
          label.width = 225;
          if (i < displayImages.length - 1) {
            imagePanel.addChild(cc.instantiate(_this.arrow));
            imagePanel.addChild(cc.instantiate(_this.fill));
            imagePanel.addChild(cc.instantiate(_this.arrow));
          }
        });
      };
      ImageseqSentence.prototype.renderBottomPanel = function() {
        var bottomPanel = this.node.getChildByName("bottomPanel");
        quiz_helper_1.QuizHelper.renderTextChoices(this.quizConfig, this.textButton, bottomPanel, WIDTH, HEIGHT, this.quizConfig.choices.split("^"));
      };
      ImageseqSentence.prototype.renderSoundButton = function(parent) {
        quiz_helper_1.QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir);
      };
      __decorate([ property(cc.Prefab) ], ImageseqSentence.prototype, "textButton", void 0);
      __decorate([ property(cc.Prefab) ], ImageseqSentence.prototype, "image", void 0);
      __decorate([ property(cc.Prefab) ], ImageseqSentence.prototype, "label", void 0);
      __decorate([ property(cc.Prefab) ], ImageseqSentence.prototype, "arrow", void 0);
      __decorate([ property(cc.Prefab) ], ImageseqSentence.prototype, "fill", void 0);
      __decorate([ error_handler_1.default() ], ImageseqSentence.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], ImageseqSentence.prototype, "renderTopPanel", null);
      __decorate([ error_handler_1.default() ], ImageseqSentence.prototype, "renderImage", null);
      __decorate([ error_handler_1.default() ], ImageseqSentence.prototype, "renderImageQuestions", null);
      __decorate([ error_handler_1.default() ], ImageseqSentence.prototype, "renderTextQuestions", null);
      __decorate([ error_handler_1.default() ], ImageseqSentence.prototype, "renderBottomPanel", null);
      __decorate([ error_handler_1.default() ], ImageseqSentence.prototype, "renderSoundButton", null);
      ImageseqSentence = __decorate([ ccclass ], ImageseqSentence);
      return ImageseqSentence;
    }(cc.Component);
    exports.ImageseqSentence = ImageseqSentence;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "./quiz-helper": "quiz-helper"
  } ],
  imageseq_image: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cc1ac50JJpOEIPljS90Ecls", "imageseq_image");
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
    exports.ImageSeqImage = void 0;
    var ccclass = cc._decorator.ccclass;
    var quiz_helper_1 = require("./quiz-helper");
    var property = cc._decorator.property;
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var ImageSeqImage = function(_super) {
      __extends(ImageSeqImage, _super);
      function ImageSeqImage() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.imageButton = null;
        _this.image = null;
        _this.arrow = null;
        _this.fill = null;
        return _this;
      }
      ImageSeqImage.prototype.onLoad = function() {
        this.renderTopPanel();
        this.renderBottomPanel();
      };
      ImageSeqImage.prototype.renderTopPanel = function() {
        var topPanel = this.node.getChildByName("topPanel");
        this.renderSoundButton(topPanel);
        this.renderImageQuestions(topPanel);
      };
      ImageSeqImage.prototype.renderImage = function(parent, imageNode, imageName) {
        return quiz_helper_1.QuizHelper.loadAndResizeImage(this.quizConfig, imageNode, this.assetDir, imageName);
      };
      ImageSeqImage.prototype.renderImageQuestions = function(parent) {
        var _this = this;
        var imagePanel = parent.getChildByName("imagePanel");
        var displayImages = this.quizConfig.displayImages.split("^");
        displayImages.forEach(function(s, i) {
          var image = cc.instantiate(_this.image);
          image = _this.renderImage(parent, image, s);
          imagePanel.addChild(image);
          if (i < displayImages.length - 1) {
            imagePanel.addChild(cc.instantiate(_this.arrow));
            imagePanel.addChild(cc.instantiate(_this.fill));
            imagePanel.addChild(cc.instantiate(_this.arrow));
          }
        });
      };
      ImageSeqImage.prototype.renderBottomPanel = function() {
        var bottomPanel = this.node.getChildByName("bottomPanel");
        quiz_helper_1.QuizHelper.renderImageChoices(this.quizConfig, this.imageButton, bottomPanel, this.assetDir);
      };
      ImageSeqImage.prototype.renderSoundButton = function(parent) {
        quiz_helper_1.QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir);
      };
      __decorate([ property(cc.Prefab) ], ImageSeqImage.prototype, "imageButton", void 0);
      __decorate([ property(cc.Prefab) ], ImageSeqImage.prototype, "image", void 0);
      __decorate([ property(cc.Prefab) ], ImageSeqImage.prototype, "arrow", void 0);
      __decorate([ property(cc.Prefab) ], ImageSeqImage.prototype, "fill", void 0);
      __decorate([ error_handler_1.default() ], ImageSeqImage.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], ImageSeqImage.prototype, "renderTopPanel", null);
      __decorate([ error_handler_1.default() ], ImageSeqImage.prototype, "renderImage", null);
      __decorate([ error_handler_1.default() ], ImageSeqImage.prototype, "renderImageQuestions", null);
      __decorate([ error_handler_1.default() ], ImageSeqImage.prototype, "renderBottomPanel", null);
      ImageSeqImage = __decorate([ ccclass ], ImageSeqImage);
      return ImageSeqImage;
    }(cc.Component);
    exports.ImageSeqImage = ImageSeqImage;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "./quiz-helper": "quiz-helper"
  } ],
  image: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "df2cb5GoVVIq4/bBR6zwS82", "image");
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
    var util_1 = require("../../../../common/scripts/util");
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var Image = function(_super) {
      __extends(Image, _super);
      function Image() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.quizDir = "";
        _this.imageName = "";
        return _this;
      }
      Image.prototype.onLoad = function() {
        var _this = this;
        var picWidth = this.node.width;
        var picHeight = this.node.height;
        util_1.Util.loadTexture(this.quizDir + this.imageName, function(texture) {
          if (null != texture) {
            var sprite = _this.node.getComponent(cc.Sprite);
            sprite.spriteFrame = new cc.SpriteFrame(texture);
            var size = sprite.spriteFrame.getOriginalSize();
            var xScale = picWidth / size.width;
            var yScale = picHeight / size.height;
            var scale = Math.min(xScale, yScale);
            _this.node.width = scale * size.width;
            _this.node.height = scale * size.height;
          }
        });
      };
      __decorate([ error_handler_1.default() ], Image.prototype, "onLoad", null);
      Image = __decorate([ ccclass ], Image);
      return Image;
    }(cc.Component);
    exports.default = Image;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "../../../../common/scripts/util": void 0
  } ],
  "math-drag": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2f807vS0h1OE40LAZaqkBNW", "math-drag");
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
    exports.MATH_NO_MATCH = exports.MATH_MATCH = void 0;
    var drag_1 = require("../../../../common/scripts/drag");
    var math_drop_1 = require("./math-drop");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    exports.MATH_MATCH = "MATH_MATCH";
    exports.MATH_NO_MATCH = "MATH_NO_MATCH";
    var handleClick = true;
    var MathDrag = function(_super) {
      __extends(MathDrag, _super);
      function MathDrag() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.matchIndex = "";
        return _this;
      }
      MathDrag.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        handleClick = true;
      };
      MathDrag.prototype.onTouchStart = function(touch) {
        if (handleClick) {
          drag_1.default.letDrag = true;
          _super.prototype.onTouchStart.call(this, touch);
          handleClick = false;
        }
      };
      MathDrag.prototype.onTouchEnd = function(touch) {
        _super.prototype.onTouchEnd.call(this, touch);
        this.match && (this.match = false);
      };
      MathDrag.prototype.onMatchOver = function() {
        this.isDragging = false;
        drag_1.default.letDrag = true;
        this.enableTouch();
        handleClick = true;
        this.allowDrag = true;
        var customEvent = new cc.Event.EventCustom(exports.MATH_MATCH, true);
        var matchGroups = this.matchingNode.name.split("_");
        var value = matchGroups[0];
        this.matchIndex = matchGroups[1];
        customEvent.setUserData({
          isCorrect: this.node.name === value,
          drop: value + "_" + this.matchIndex
        });
        this.node.dispatchEvent(customEvent);
      };
      MathDrag.prototype.collisionEnterCondition = function(self, other) {
        return !this.match;
      };
      MathDrag.prototype.onReturnBackOnNoMatch = function() {
        _super.prototype.onReturnBackOnNoMatch.call(this);
        handleClick = true;
        this.mathNoMatchEvent();
      };
      MathDrag.prototype.mathNoMatchEvent = function() {
        var customEvent = new cc.Event.EventCustom(exports.MATH_NO_MATCH, true);
        customEvent.setUserData({
          drop: this.node.name + "_" + this.matchIndex
        });
        this.node.dispatchEvent(customEvent);
        this.matchIndex = "";
      };
      MathDrag.prototype.collisionExitCondition = function(matchingNode, otherNode) {
        if (matchingNode && otherNode && otherNode.name === matchingNode.name) {
          var mathDropComponent = otherNode.getComponent(math_drop_1.default);
          mathDropComponent.allowDrop = true;
        }
        return _super.prototype.collisionExitCondition.call(this, matchingNode, otherNode);
      };
      MathDrag = __decorate([ ccclass ], MathDrag);
      return MathDrag;
    }(drag_1.default);
    exports.default = MathDrag;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/drag": void 0,
    "./math-drop": "math-drop"
  } ],
  "math-drop": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e4eb3pXl3lG6qmEcV+x+QYY", "math-drop");
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
    var drop_1 = require("../../../../common/scripts/drop");
    var math_drag_1 = require("./math-drag");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MathDrop = function(_super) {
      __extends(MathDrop, _super);
      function MathDrop() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.origWidth = 0;
        _this.droppedNodeUUID = null;
        return _this;
      }
      MathDrop.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.origWidth = this.node.width;
      };
      MathDrop.prototype.onCollisionEnter = function(other, self) {
        _super.prototype.onCollisionEnter.call(this, other, self);
        this.allowDrop && (this.node.width = other.node.width);
      };
      MathDrop.prototype.onCollisionExit = function(other, self) {
        _super.prototype.onCollisionExit.call(this, other, self);
        this.droppedNodeUUID === other.node.uuid && (this.allowDrop = true);
        this.allowDrop && (this.node.width = this.origWidth);
        if (null != other) {
          var mathDragComponent = other.getComponent(math_drag_1.default);
          if (null !== mathDragComponent && null !== mathDragComponent.matchIndex && mathDragComponent.matchIndex.length > 0) {
            var customEvent = new cc.Event.EventCustom(math_drag_1.MATH_NO_MATCH, true);
            customEvent.setUserData({
              drop: mathDragComponent.node.name + "_" + mathDragComponent.matchIndex
            });
            this.node.dispatchEvent(customEvent);
            mathDragComponent.matchIndex = "";
          }
        }
      };
      MathDrop.prototype.onMatchOver = function(matchingDragNode) {
        this.droppedNodeUUID = matchingDragNode.uuid;
        this.match = false;
        this.allowDrop = false;
      };
      MathDrop.prototype.collisionEnterCondition = function(self, other) {
        return true;
      };
      MathDrop = __decorate([ ccclass ], MathDrop);
      return MathDrop;
    }(drop_1.default);
    exports.default = MathDrop;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/drop": void 0,
    "./math-drag": "math-drag"
  } ],
  missing_number: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "51a9cok8JNNdJOqSW7/1vum", "missing_number");
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
    exports.MissingNumber = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var util_1 = require("../../../../common/scripts/util");
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var quiz_maths_1 = require("./quiz-maths");
    var math_drag_1 = require("./math-drag");
    var quiz_literacy_1 = require("../../quizliteracy/scripts/quiz-literacy");
    var quiz_helper_1 = require("../../quizliteracy/scripts/quiz-helper");
    var DRAG_HEIGHT = 150;
    var DRAG_WIDTH = 75;
    var MissingNumber = function(_super) {
      __extends(MissingNumber, _super);
      function MissingNumber() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.missingPanel = null;
        _this.mathDrag = null;
        _this.mathDrop = null;
        _this.choices = [];
        _this.individualNumbers = [];
        _this.answerIndex = -1;
        _this.step = 1;
        _this.correctDrops = new Map();
        return _this;
      }
      MissingNumber.prototype.onLoad = function() {
        var _this = this;
        this.choices = this.generateChoices();
        this.node.on(math_drag_1.MATH_MATCH, function(event) {
          event.stopPropagation();
          var data = event.getUserData();
          _this.correctDrops.set(data.drop, data.isCorrect);
          if (Array.from(_this.correctDrops.keys()).length === _this.individualNumbers.length) {
            var allCorrect = Array.from(_this.correctDrops.values()).every(function(n) {
              return true === n;
            });
            allCorrect ? _this.node.dispatchEvent(new cc.Event.EventCustom(quiz_maths_1.QUIZ_CORRECT, true)) : _this.node.dispatchEvent(new cc.Event.EventCustom(quiz_literacy_1.QUIZ_WRONG, true));
          }
        });
        this.node.on(math_drag_1.MATH_NO_MATCH, function(event) {
          event.stopPropagation();
          var data = event.getUserData();
          var splits = data.drop.split("_");
          splits && 2 === splits.length && splits[0].length > 0 && splits[1].length > 0 && _this.correctDrops.forEach(function(value, key) {
            key.endsWith(splits[1]) && _this.correctDrops.delete(key);
          });
        });
        this.renderDropPanel();
        this.renderDragPanel();
      };
      MissingNumber.prototype.generateChoices = function() {
        var choices = [];
        var options = this.quizConfig.answer.split("~");
        if (options && 2 === options.length) {
          this.step = Number(options[0]);
          this.answerIndex = Number(options[1]);
        }
        var values = this.quizConfig.choices.split("~");
        if (values && 2 === values.length) {
          var start = -1;
          var first = Number(values[0]) > Number(values[1]) ? Number(values[0]) : Number(values[1]);
          var second = Number(values[0]) > Number(values[1]) ? Number(values[1]) : Number(values[0]);
          if (this.quizConfig.order === quiz_helper_1.SORT_ASC || this.quizConfig.order === quiz_helper_1.SORT_ASCENDING) {
            var rNumber = util_1.Util.randomBetween(second, first - 3 * this.step);
            for (var i = 0; i < 4; i++) {
              start = rNumber;
              start += i * this.step;
              choices.push(String(start));
            }
          } else {
            var rNumber = util_1.Util.randomBetween(second + 4 * this.step, first);
            for (var i = 0; i < 4; i++) {
              start = rNumber;
              start -= i * this.step;
              choices.push(String(start));
            }
          }
        }
        return choices;
      };
      MissingNumber.prototype.renderDragPanel = function() {
        var dragPanel = this.node.getChildByName("dragPanel");
        var options = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ].map(function(a) {
          return String(a);
        });
        quiz_helper_1.QuizHelper.renderDragChoices(this.quizConfig, this.mathDrag, dragPanel, DRAG_WIDTH + 10, DRAG_HEIGHT, options, false, true);
      };
      MissingNumber.prototype.renderDropPanel = function() {
        var _this = this;
        var dropPanel = this.node.getChildByName("dropPanel");
        var missingPanel = cc.instantiate(this.missingPanel);
        dropPanel.width = 1024;
        this.choices.forEach(function(c, i) {
          if (i == _this.answerIndex - 1) {
            _this.individualNumbers = c.split("");
            quiz_helper_1.QuizHelper.renderDropChoices(_this.quizConfig, _this.mathDrop, missingPanel, DRAG_WIDTH, DRAG_HEIGHT, _this.individualNumbers);
            dropPanel.addChild(missingPanel);
          } else quiz_helper_1.QuizHelper.createTextLabelWithContent(_this.quizConfig, dropPanel, c, _this.label, DRAG_WIDTH - 10, 3 * DRAG_HEIGHT);
        });
      };
      __decorate([ property(cc.Prefab) ], MissingNumber.prototype, "label", void 0);
      __decorate([ property(cc.Prefab) ], MissingNumber.prototype, "missingPanel", void 0);
      __decorate([ property(cc.Prefab) ], MissingNumber.prototype, "mathDrag", void 0);
      __decorate([ property(cc.Prefab) ], MissingNumber.prototype, "mathDrop", void 0);
      __decorate([ error_handler_1.default() ], MissingNumber.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], MissingNumber.prototype, "generateChoices", null);
      __decorate([ error_handler_1.default() ], MissingNumber.prototype, "renderDragPanel", null);
      __decorate([ error_handler_1.default() ], MissingNumber.prototype, "renderDropPanel", null);
      MissingNumber = __decorate([ ccclass ], MissingNumber);
      return MissingNumber;
    }(cc.Component);
    exports.MissingNumber = MissingNumber;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "../../../../common/scripts/util": void 0,
    "../../quizliteracy/scripts/quiz-helper": "quiz-helper",
    "../../quizliteracy/scripts/quiz-literacy": "quiz-literacy",
    "./math-drag": "math-drag",
    "./quiz-maths": "quiz-maths"
  } ],
  "number-identification": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7842dNykQNDAImL6/MXg9ca", "number-identification");
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
    exports.NumberIdentification = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var quiz_helper_1 = require("../../quizliteracy/scripts/quiz-helper");
    var quiz_literacy_1 = require("../../quizliteracy/scripts/quiz-literacy");
    var quiz_maths_1 = require("./quiz-maths");
    var math_drag_1 = require("./math-drag");
    var DRAG_HEIGHT = 150;
    var DRAG_WIDTH = 75;
    var NumberIdentification = function(_super) {
      __extends(NumberIdentification, _super);
      function NumberIdentification() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.missingPanel = null;
        _this.mathDrag = null;
        _this.mathDrop = null;
        _this.choices = [];
        _this.answer = "";
        _this.individualNumbers = [];
        _this.correctDrops = new Map();
        return _this;
      }
      NumberIdentification.prototype.onLoad = function() {
        var _this = this;
        this.quizConfig.choices = -1 !== this.quizConfig.choices.indexOf("~") ? this.quizConfig.choices : this.quizConfig.choices + "~" + this.quizConfig.choices;
        this.choices = quiz_helper_1.QuizHelper.randomInRange(this.quizConfig.choices, 1, this.quizConfig.order);
        this.answer = String(quiz_helper_1.QuizHelper.generateAnswer(this.quizConfig.choices));
        this.quizConfig.answer = this.answer;
        this.individualNumbers = this.quizConfig.answer.split("");
        this.node.on(math_drag_1.MATH_MATCH, function(event) {
          event.stopPropagation();
          var data = event.getUserData();
          _this.correctDrops.set(data.drop, data.isCorrect);
          if (Array.from(_this.correctDrops.keys()).length === _this.individualNumbers.length) {
            var allCorrect = Array.from(_this.correctDrops.values()).every(function(n) {
              return true === n;
            });
            allCorrect ? _this.node.dispatchEvent(new cc.Event.EventCustom(quiz_maths_1.QUIZ_CORRECT, true)) : _this.node.dispatchEvent(new cc.Event.EventCustom(quiz_literacy_1.QUIZ_WRONG, true));
          }
        });
        this.node.on(math_drag_1.MATH_NO_MATCH, function(event) {
          event.stopPropagation();
          var data = event.getUserData();
          var splits = data.drop.split("_");
          splits && 2 === splits.length && splits[0].length > 0 && splits[1].length > 0 && _this.correctDrops.forEach(function(value, key) {
            key.endsWith(splits[1]) && _this.correctDrops.delete(key);
          });
        });
        this.renderTopPanel();
        this.renderDragPanel();
      };
      NumberIdentification.prototype.renderTopPanel = function() {
        var topPanel = this.node.getChildByName("topPanel");
        this.renderSoundButton(topPanel);
        this.renderDropPanel(topPanel);
      };
      NumberIdentification.prototype.renderSoundButton = function(parent) {
        this.quizConfig.soundFile = String(this.answer);
        quiz_helper_1.QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir, true);
      };
      NumberIdentification.prototype.renderDragPanel = function() {
        var dragPanel = this.node.getChildByName("dragPanel");
        var options = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ].map(function(a) {
          return String(a);
        });
        quiz_helper_1.QuizHelper.renderDragChoices(this.quizConfig, this.mathDrag, dragPanel, DRAG_WIDTH + 10, DRAG_HEIGHT, options, false, true);
      };
      NumberIdentification.prototype.renderDropPanel = function(topPanel) {
        var _this = this;
        var dropPanel = topPanel.getChildByName("dropPanel");
        var missingPanel = cc.instantiate(this.missingPanel);
        dropPanel.width = 1e3;
        this.choices.forEach(function(c, i) {
          quiz_helper_1.QuizHelper.renderDropChoices(_this.quizConfig, _this.mathDrop, missingPanel, DRAG_WIDTH + 10, DRAG_HEIGHT, _this.individualNumbers);
        });
        dropPanel.addChild(missingPanel);
      };
      __decorate([ property(cc.Prefab) ], NumberIdentification.prototype, "label", void 0);
      __decorate([ property(cc.Prefab) ], NumberIdentification.prototype, "missingPanel", void 0);
      __decorate([ property(cc.Prefab) ], NumberIdentification.prototype, "mathDrag", void 0);
      __decorate([ property(cc.Prefab) ], NumberIdentification.prototype, "mathDrop", void 0);
      __decorate([ error_handler_1.default() ], NumberIdentification.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], NumberIdentification.prototype, "renderTopPanel", null);
      __decorate([ error_handler_1.default() ], NumberIdentification.prototype, "renderSoundButton", null);
      __decorate([ error_handler_1.default() ], NumberIdentification.prototype, "renderDragPanel", null);
      __decorate([ error_handler_1.default() ], NumberIdentification.prototype, "renderDropPanel", null);
      NumberIdentification = __decorate([ ccclass ], NumberIdentification);
      return NumberIdentification;
    }(cc.Component);
    exports.NumberIdentification = NumberIdentification;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "../../quizliteracy/scripts/quiz-helper": "quiz-helper",
    "../../quizliteracy/scripts/quiz-literacy": "quiz-literacy",
    "./math-drag": "math-drag",
    "./quiz-maths": "quiz-maths"
  } ],
  "operation-with-objects": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "46c93ZtewdEdYIjswdY13w8", "operation-with-objects");
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
    var util_1 = require("../../../../common/scripts/util");
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var quiz_maths_1 = require("./quiz-maths");
    var quiz_literacy_1 = require("../../quizliteracy/scripts/quiz-literacy");
    var counting_answer_1 = require("../../../../common/scripts/counting-answer");
    var NUMBER_PADS = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
    var OperationWithObjects = function(_super) {
      __extends(OperationWithObjects, _super);
      function OperationWithObjects() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.fill1 = null;
        _this.fill2 = null;
        _this.empty = null;
        _this.c1 = null;
        _this.countingAnswerPrefab = null;
        _this.leftPrefab = null;
        _this.countingAnswer = null;
        _this.operator = "";
        _this.choices = [];
        _this.answer = "";
        _this.resultValidated = false;
        return _this;
      }
      OperationWithObjects.prototype.onLoad = function() {
        var _this = this;
        this.generateChoicesAndAnswer();
        var topPanel = this.node.getChildByName("topPanel");
        this.leftChild(topPanel);
        this.rightChild(topPanel);
        this.node.on(counting_answer_1.VALIDATE_RESULT, function(event) {
          if (_this.resultValidated) return;
          _this.resultValidated = true;
          event.stopPropagation();
          var data = event.getUserData();
          cc.log("data.result", data.result, "this.answer ", _this.answer);
          if (data.result && data.result === _this.answer) {
            _this.countingAnswer.getComponent(counting_answer_1.default).isValidResult = true;
            _this.node.dispatchEvent(new cc.Event.EventCustom(quiz_maths_1.QUIZ_CORRECT, true));
          } else {
            _this.countingAnswer.getComponent(counting_answer_1.default).isValidResult = true;
            _this.node.dispatchEvent(new cc.Event.EventCustom(quiz_literacy_1.QUIZ_WRONG, true));
          }
        });
      };
      OperationWithObjects.prototype.renderC1 = function(parent, count, spriteFrame) {
        for (var i = 0; i < count; i++) {
          var c1 = cc.instantiate(this.c1);
          c1.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          parent.addChild(c1);
        }
      };
      OperationWithObjects.prototype.leftChild = function(topPanel) {
        var left = cc.instantiate(this.leftPrefab);
        topPanel.addChild(left);
        var h1 = left.getChildByName("h1");
        switch (this.operator) {
         case "+":
          this.renderC1(h1, Number(this.choices[0]), this.fill2);
          this.renderC1(h1, Number(this.choices[1]), this.fill1);
          break;

         case "-":
          this.renderC1(h1, Number(this.choices[0]), this.fill2);
          this.renderC1(h1, Number(this.choices[1]), this.empty);
        }
        var h2 = left.getChildByName("h2");
        var label = h2.getChildByName("label");
        var labelComponent = label.getComponent(cc.Label);
        labelComponent.string = [ this.choices[0], this.operator, this.choices[1], "=" ].join(" ");
      };
      OperationWithObjects.prototype.rightChild = function(topPanel) {
        this.countingAnswer = cc.instantiate(this.countingAnswerPrefab);
        var countingAnswerComponent = this.countingAnswer.getComponent(counting_answer_1.default);
        countingAnswerComponent.numberpads = NUMBER_PADS;
        countingAnswerComponent.result = this.answer;
        topPanel.addChild(this.countingAnswer);
      };
      OperationWithObjects.prototype.generateChoicesAndAnswer = function() {
        var results = this.quizConfig.choices.match(/(.*)(\+|-|x)(.*)=\?/);
        if (results && 4 === results.length) {
          var op1V = "0";
          var op2V = "0";
          var op1CommaBased = -1 !== results[1].indexOf(",");
          var op2CommaBased = -1 !== results[3].indexOf(",");
          this.operator = results[2];
          if (op1CommaBased) op1V = util_1.Util.randomElements(results[1].split(","), 1)[0]; else if (op2CommaBased) op2V = util_1.Util.randomElements(results[3].split(","), 1)[0]; else {
            var parts = this.quizConfig.choices.split(this.operator);
            var op1range = parts[0].split("~");
            op1V = op1range.length > 1 ? String(util_1.Util.randomBetween(Number(op1range[0]), Number(op1range[1]))) : op1range[0];
            var op2range = parts[1].split("~");
            if (op2range.length > 1) {
              var temp = op2range[1].split("=");
              op2range[1] = temp[0];
              op2V = String(util_1.Util.randomBetween(Number(op2range[0]), Number(op2range[1])));
            } else {
              var temp = op2range[0].split("=");
              op2range[0] = temp[0];
              op2V = op2range[0];
            }
            if (Number(op1V) < Number(op2V) && "-" === this.operator) {
              var tmp = op1V;
              op1V = op2V;
              op2V = tmp;
            }
          }
          this.operator = results[2];
          switch (this.operator) {
           case "+":
            this.answer = String(Number(op1V) + Number(op2V));
            break;

           case "-":
            if (op1CommaBased) {
              var parts = this.quizConfig.answer.split("~");
              var min = parts[0];
              op2V = String(util_1.Util.randomBetween(Number(min), Number(op1V) - 1));
            } else if (op2CommaBased) {
              var parts = this.quizConfig.answer.split("~");
              var max = parts[1];
              op1V = String(util_1.Util.randomBetween(Number(op2V) + 1, Number(max)));
            }
            op1V = op1V.trim();
            op2V = op2V.trim();
            this.answer = String(Number(op1V) - Number(op2V));
            break;

           case "x":
            this.answer = String(Number(op1V) * Number(op2V));
          }
          this.choices.push(op1V);
          this.choices.push(op2V);
        }
      };
      __decorate([ property(cc.SpriteFrame) ], OperationWithObjects.prototype, "fill1", void 0);
      __decorate([ property(cc.SpriteFrame) ], OperationWithObjects.prototype, "fill2", void 0);
      __decorate([ property(cc.SpriteFrame) ], OperationWithObjects.prototype, "empty", void 0);
      __decorate([ property(cc.Prefab) ], OperationWithObjects.prototype, "c1", void 0);
      __decorate([ property(cc.Prefab) ], OperationWithObjects.prototype, "countingAnswerPrefab", void 0);
      __decorate([ property(cc.Prefab) ], OperationWithObjects.prototype, "leftPrefab", void 0);
      __decorate([ error_handler_1.default() ], OperationWithObjects.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], OperationWithObjects.prototype, "renderC1", null);
      __decorate([ error_handler_1.default() ], OperationWithObjects.prototype, "leftChild", null);
      __decorate([ error_handler_1.default() ], OperationWithObjects.prototype, "rightChild", null);
      __decorate([ error_handler_1.default() ], OperationWithObjects.prototype, "generateChoicesAndAnswer", null);
      OperationWithObjects = __decorate([ ccclass ], OperationWithObjects);
      return OperationWithObjects;
    }(cc.Component);
    exports.default = OperationWithObjects;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/counting-answer": void 0,
    "../../../../common/scripts/lib/error-handler": void 0,
    "../../../../common/scripts/util": void 0,
    "../../quizliteracy/scripts/quiz-literacy": "quiz-literacy",
    "./quiz-maths": "quiz-maths"
  } ],
  "operations-drag": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "64ef678URhLW5TRSh4xSQ1L", "operations-drag");
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
    exports.OperationsDrag = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var util_1 = require("../../../../common/scripts/util");
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var quiz_maths_1 = require("./quiz-maths");
    var math_drag_1 = require("./math-drag");
    var quiz_literacy_1 = require("../../quizliteracy/scripts/quiz-literacy");
    var quiz_helper_1 = require("../../quizliteracy/scripts/quiz-helper");
    var HORIZONTAL = "horizontal";
    var VERTICAL = "vertical";
    var DRAG_HEIGHT = 150;
    var DRAG_WIDTH = 75;
    var OperationsDrag = function(_super) {
      __extends(OperationsDrag, _super);
      function OperationsDrag() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.mathDrag = null;
        _this.mathDrop = null;
        _this.operator = "";
        _this.choices = [];
        _this.answer = "";
        _this.individualNumbers = [];
        _this.correctDrops = new Map();
        _this.missingItems = 0;
        return _this;
      }
      OperationsDrag.prototype.onLoad = function() {
        var _this = this;
        this.generateChoicesAndAnswer();
        this.quizConfig.answer = this.answer;
        this.individualNumbers = this.quizConfig.answer.split("");
        this.node.on(math_drag_1.MATH_MATCH, function(event) {
          event.stopPropagation();
          _this.missingItems++;
          var data = event.getUserData();
          _this.correctDrops.set(data.drop, data.isCorrect);
          cc.log("missing items", _this.missingItems);
          if (Array.from(_this.correctDrops.keys()).length === _this.individualNumbers.length) {
            var allCorrect = Array.from(_this.correctDrops.values()).every(function(n) {
              return true === n;
            });
            allCorrect ? _this.node.dispatchEvent(new cc.Event.EventCustom(quiz_maths_1.QUIZ_CORRECT, true)) : _this.node.dispatchEvent(new cc.Event.EventCustom(quiz_literacy_1.QUIZ_WRONG, true));
          }
        });
        this.node.on(math_drag_1.MATH_NO_MATCH, function(event) {
          event.stopPropagation();
          _this.missingItems--;
          var data = event.getUserData();
          var splits = data.drop.split("_");
          splits && 2 === splits.length && splits[0].length > 0 && splits[1].length > 0 && _this.correctDrops.forEach(function(value, key) {
            key.endsWith(splits[1]) && _this.correctDrops.delete(key);
          });
        });
        this.renderDropPanel();
        this.renderDragPanel();
      };
      OperationsDrag.prototype.generateChoicesAndAnswer = function() {
        var results = this.quizConfig.choices.match(/(.*)(\+|-|x)(.*)=\?/);
        if (results && 4 === results.length) {
          var op1V = "0";
          var op2V = "0";
          var op1CommaBased = -1 !== results[1].indexOf(",");
          var op2CommaBased = -1 !== results[3].indexOf(",");
          this.operator = results[2];
          if (op1CommaBased) op1V = util_1.Util.randomElements(results[1].split(","), 1)[0]; else if (op2CommaBased) op2V = util_1.Util.randomElements(results[3].split(","), 1)[0]; else {
            op1V = -1 === results[1].indexOf("~") ? results[1] : quiz_helper_1.QuizHelper.randomInRange(results[1], 1)[0];
            op2V = -1 === results[3].indexOf("~") ? results[3] : quiz_helper_1.QuizHelper.randomInRange(results[3], 1)[0];
            if (Number(op1V) < Number(op2V)) {
              var tmp = op1V;
              op1V = op2V;
              op2V = tmp;
            }
          }
          this.operator = results[2];
          switch (this.operator) {
           case "+":
            this.answer = String(Number(op1V) + Number(op2V));
            break;

           case "-":
            if (op1CommaBased) {
              var parts = this.quizConfig.answer.split("~");
              var min = parts[0];
              op2V = String(util_1.Util.randomBetween(Number(min), Number(op1V) - 1));
            } else if (op2CommaBased) {
              var parts = this.quizConfig.answer.split("~");
              var max = parts[1];
              op1V = String(util_1.Util.randomBetween(Number(op2V) + 1, Number(max)));
            }
            op1V = op1V.trim();
            op2V = op2V.trim();
            this.answer = String(Number(op1V) - Number(op2V));
            break;

           case "x":
            this.answer = String(Number(op1V) * Number(op2V));
          }
          this.choices.push(op1V);
          this.choices.push(op2V);
        }
      };
      OperationsDrag.prototype.renderDragPanel = function() {
        var dragPanel = this.node.getChildByName("dragPanel");
        var options = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ].map(function(a) {
          return String(a);
        });
        quiz_helper_1.QuizHelper.renderDragChoices(this.quizConfig, this.mathDrag, dragPanel, DRAG_WIDTH + 10, DRAG_HEIGHT, options, false, true);
      };
      OperationsDrag.prototype.renderDropPanel = function() {
        if (this.choices && 2 === this.choices.length) {
          var dropPanel = null;
          if (this.quizConfig.order === HORIZONTAL) {
            dropPanel = this.node.getChildByName("hDropPanel");
            this.node.getChildByName("vDropPanel").active = false;
            dropPanel.active = true;
            dropPanel.opacity = 255;
            var label = dropPanel.getChildByName("label");
            var labelComponent = label.getComponent(cc.Label);
            labelComponent.string = [ this.choices[0], this.operator, this.choices[1], "=" ].join(" ");
          } else if (this.quizConfig.order === VERTICAL) {
            dropPanel = this.node.getChildByName("vDropPanel");
            this.node.getChildByName("hDropPanel").active = false;
            dropPanel.active = true;
            dropPanel.opacity = 255;
            var upLabel = dropPanel.getChildByName("upLabel");
            var upLabelComponent = upLabel.getComponent(cc.Label);
            upLabelComponent.string = this.choices[0];
            var bottomLabel = dropPanel.getChildByName("bottomLabel");
            var bottomLabelComponent = bottomLabel.getComponent(cc.Label);
            bottomLabelComponent.string = this.operator + " " + this.choices[1] + "\n------";
          }
          if (dropPanel) {
            var missingPanel = dropPanel.getChildByName("missingPanel");
            quiz_helper_1.QuizHelper.renderDropChoices(this.quizConfig, this.mathDrop, missingPanel, DRAG_WIDTH + 10, DRAG_HEIGHT, this.individualNumbers);
          }
        }
      };
      __decorate([ property(cc.Prefab) ], OperationsDrag.prototype, "label", void 0);
      __decorate([ property(cc.Prefab) ], OperationsDrag.prototype, "mathDrag", void 0);
      __decorate([ property(cc.Prefab) ], OperationsDrag.prototype, "mathDrop", void 0);
      __decorate([ error_handler_1.default() ], OperationsDrag.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], OperationsDrag.prototype, "generateChoicesAndAnswer", null);
      __decorate([ error_handler_1.default() ], OperationsDrag.prototype, "renderDragPanel", null);
      __decorate([ error_handler_1.default() ], OperationsDrag.prototype, "renderDropPanel", null);
      OperationsDrag = __decorate([ ccclass ], OperationsDrag);
      return OperationsDrag;
    }(cc.Component);
    exports.OperationsDrag = OperationsDrag;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "../../../../common/scripts/util": void 0,
    "../../quizliteracy/scripts/quiz-helper": "quiz-helper",
    "../../quizliteracy/scripts/quiz-literacy": "quiz-literacy",
    "./math-drag": "math-drag",
    "./quiz-maths": "quiz-maths"
  } ],
  "ordering-drag": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f85f2PCRrhKpbe2qMR/HPP6", "ordering-drag");
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
    var drag_1 = require("../../../../common/scripts/drag");
    var ordering_sequence_1 = require("./ordering_sequence");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var OrderingDrag = function(_super) {
      __extends(OrderingDrag, _super);
      function OrderingDrag() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      OrderingDrag.prototype.onTouchEnd = function(touch) {
        _super.prototype.onTouchEnd.call(this, touch);
        this.match ? this.node.emit(ordering_sequence_1.ORDERING_MATCH, this) : this.node.emit(ordering_sequence_1.ORDERING_NO_MATCH);
      };
      OrderingDrag = __decorate([ ccclass ], OrderingDrag);
      return OrderingDrag;
    }(drag_1.default);
    exports.default = OrderingDrag;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/drag": void 0,
    "./ordering_sequence": "ordering_sequence"
  } ],
  "ordering-drop": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aaab4hEkMRI8KSKl87SXHWQ", "ordering-drop");
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
    var drop_1 = require("../../../../common/scripts/drop");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var OrderingDrop = function(_super) {
      __extends(OrderingDrop, _super);
      function OrderingDrop() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.origWidth = 0;
        return _this;
      }
      OrderingDrop.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.origWidth = this.node.width;
      };
      OrderingDrop.prototype.onCollisionEnter = function(other, self) {
        _super.prototype.onCollisionEnter.call(this, other, self);
        this.allowDrop && (this.node.width = other.node.width);
      };
      OrderingDrop.prototype.onCollisionExit = function(other, self) {
        _super.prototype.onCollisionExit.call(this, other, self);
        this.allowDrop && (this.node.width = this.origWidth);
      };
      OrderingDrop = __decorate([ ccclass ], OrderingDrop);
      return OrderingDrop;
    }(drop_1.default);
    exports.default = OrderingDrop;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/drop": void 0
  } ],
  ordering_sequence: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0b1feLVpzRFe4sDv6uT8+MA", "ordering_sequence");
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
    exports.OrderingSequence = exports.ORDERING_NO_MATCH = exports.ORDERING_MATCH = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var util_1 = require("../../../../common/scripts/util");
    var ordering_drop_1 = require("./ordering-drop");
    var quiz_helper_1 = require("./quiz-helper");
    var quiz_literacy_1 = require("./quiz-literacy");
    exports.ORDERING_MATCH = "ORDERING_MATCH";
    exports.ORDERING_NO_MATCH = "ORDERING_NO_MATCH";
    var OrderingSequence = function(_super) {
      __extends(OrderingSequence, _super);
      function OrderingSequence() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.orderingDropBox = null;
        _this.orderingDrag = null;
        _this.total = 0;
        return _this;
      }
      OrderingSequence.prototype.onLoad = function() {
        this.renderTopPanel();
        this.renderBottomPanel();
      };
      OrderingSequence.prototype.renderTopPanel = function() {
        var topPanel = this.node.getChildByName("topPanel");
        var hLayout = topPanel.getChildByName("hLayout");
        this.renderSoundButton(hLayout);
        var vLayout = topPanel.getChildByName("vLayout");
        this.renderDrop(vLayout);
      };
      OrderingSequence.prototype.renderDrop = function(parent) {
        var _this = this;
        var answers = this.quizConfig.answer.split("^");
        this.total = answers.length;
        answers.forEach(function(a, i) {
          var dropBox = cc.instantiate(_this.orderingDropBox);
          var label = dropBox.getChildByName("label");
          var labelComponent = label.getComponent(cc.Label);
          labelComponent.string = String(i + 1);
          labelComponent.fontSize = 40;
          var drop = dropBox.getChildByName("orderingDrop");
          drop.name = String(i);
          var dropComponent = drop.getComponent(ordering_drop_1.default);
          var boxCollider = drop.getComponent(cc.BoxCollider);
          var dropLabel = drop.getChildByName("dropLabel");
          dropLabel.opacity = 100;
          drop.width = dropComponent.allowDrop ? drop.width : label.width;
          drop.height = label.height;
          label.width = drop.width;
          boxCollider.size = dropComponent.allowDrop ? new cc.Size(drop.width, drop.height) : new cc.Size(0, 0);
          var dropLabelComponent = dropLabel.getComponent(cc.Label);
          dropLabelComponent.string = "";
          parent.addChild(dropBox);
        });
      };
      OrderingSequence.prototype.renderSoundButton = function(parent) {
        quiz_helper_1.QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir);
      };
      OrderingSequence.prototype.renderBottomPanel = function() {
        var bottomPanel = this.node.getChildByName("bottomPanel");
        this.renderDrag(bottomPanel);
      };
      OrderingSequence.prototype.renderDrag = function(parent) {
        var _this = this;
        var choices = this.quizConfig.choices.split("^");
        var displayChoices = [];
        choices.forEach(function(a, i) {
          var n = new cc.Node();
          var drag = cc.instantiate(_this.orderingDrag);
          var label = drag.getChildByName("label");
          var labelComponent = label.getComponent(cc.Label);
          labelComponent.fontSize = 40;
          labelComponent.string = a;
          drag.name = String(i);
          var boxCollider = drag.getComponent(cc.BoxCollider);
          drag.width = label.width + 20;
          drag.height = label.height + 20;
          boxCollider.size = new cc.Size(drag.width, drag.height);
          n.width = drag.width;
          n.height = drag.height;
          n.addChild(drag);
          displayChoices.push(n);
          drag.on(exports.ORDERING_MATCH, function() {
            _this.total--;
            _this.total <= 0 && _this.node.dispatchEvent(new cc.Event.EventCustom(quiz_literacy_1.QUIZ_CORRECT, true));
          });
        });
        displayChoices = util_1.Util.shuffle(displayChoices);
        displayChoices.forEach(function(d) {
          parent.addChild(d);
        });
      };
      __decorate([ property(cc.Prefab) ], OrderingSequence.prototype, "orderingDropBox", void 0);
      __decorate([ property(cc.Prefab) ], OrderingSequence.prototype, "orderingDrag", void 0);
      __decorate([ error_handler_1.default() ], OrderingSequence.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], OrderingSequence.prototype, "renderTopPanel", null);
      __decorate([ error_handler_1.default() ], OrderingSequence.prototype, "renderDrop", null);
      __decorate([ error_handler_1.default() ], OrderingSequence.prototype, "renderSoundButton", null);
      __decorate([ error_handler_1.default() ], OrderingSequence.prototype, "renderBottomPanel", null);
      __decorate([ error_handler_1.default() ], OrderingSequence.prototype, "renderDrag", null);
      OrderingSequence = __decorate([ ccclass ], OrderingSequence);
      return OrderingSequence;
    }(cc.Component);
    exports.OrderingSequence = OrderingSequence;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "../../../../common/scripts/util": void 0,
    "./ordering-drop": "ordering-drop",
    "./quiz-helper": "quiz-helper",
    "./quiz-literacy": "quiz-literacy"
  } ],
  paragraph_sequence: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "36b02Hnn6xCOJzGQDj4kLE0", "paragraph_sequence");
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
    exports.ParagraphSequence = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var Overflow = cc.Label.Overflow;
    var quiz_helper_1 = require("./quiz-helper");
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var LABEL_WIDTH = 400;
    var WIDTH = 400;
    var HEIGHT = 175;
    var COLOR = "#887D7D";
    var ParagraphSequence = function(_super) {
      __extends(ParagraphSequence, _super);
      function ParagraphSequence() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.textButton = null;
        _this.additionalLabel = null;
        return _this;
      }
      ParagraphSequence.prototype.onLoad = function() {
        this.renderLeft();
        this.renderRight();
      };
      ParagraphSequence.prototype.renderLeft = function() {
        var topPanel = this.node.getChildByName("topPanel");
        var left = topPanel.getChildByName("left");
        this.renderLabel(left);
      };
      ParagraphSequence.prototype.renderRight = function() {
        var topPanel = this.node.getChildByName("topPanel");
        var right = topPanel.getChildByName("right");
        var additionalQuestionLabel = cc.instantiate(this.additionalLabel);
        quiz_helper_1.QuizHelper.renderAdditionalQuestionLabel(this.quizConfig, additionalQuestionLabel, WIDTH, HEIGHT);
        additionalQuestionLabel.color = new cc.Color().fromHEX(COLOR);
        right.addChild(additionalQuestionLabel);
        quiz_helper_1.QuizHelper.renderTextChoices(this.quizConfig, this.textButton, right, WIDTH, HEIGHT, this.quizConfig.choices.split("^"));
      };
      ParagraphSequence.prototype.renderLabel = function(parent) {
        quiz_helper_1.QuizHelper.renderTextLabel(this.quizConfig, parent, LABEL_WIDTH, COLOR, "label", 45, Overflow.RESIZE_HEIGHT);
      };
      __decorate([ property(cc.Prefab) ], ParagraphSequence.prototype, "textButton", void 0);
      __decorate([ property(cc.Prefab) ], ParagraphSequence.prototype, "additionalLabel", void 0);
      __decorate([ error_handler_1.default() ], ParagraphSequence.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], ParagraphSequence.prototype, "renderLeft", null);
      __decorate([ error_handler_1.default() ], ParagraphSequence.prototype, "renderRight", null);
      __decorate([ error_handler_1.default() ], ParagraphSequence.prototype, "renderLabel", null);
      ParagraphSequence = __decorate([ ccclass ], ParagraphSequence);
      return ParagraphSequence;
    }(cc.Component);
    exports.ParagraphSequence = ParagraphSequence;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "./quiz-helper": "quiz-helper"
  } ],
  "quiz-helper": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ae596QHmtdDCK8KJvocGZX3", "quiz-helper");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.QuizHelper = exports.SORT_DESCEDNGING = exports.SORT_ASCENDING = exports.SORT_DESC = exports.SORT_ASC = exports.SORT_RANDOM = void 0;
    var quiz_sound_1 = require("./quiz-sound");
    var quiz_literacy_button_1 = require("./quiz-literacy-button");
    var util_1 = require("../../../../common/scripts/util");
    var math_drag_1 = require("../../quizmaths/scripts/math-drag");
    var math_drop_1 = require("../../quizmaths/scripts/math-drop");
    var Overflow = cc.Label.Overflow;
    var quiz_literacy_1 = require("./quiz-literacy");
    var chimple_label_1 = require("../../../../common/scripts/chimple-label");
    var GRID_ELEMENT_SIZE = 24;
    var LABEL_WIDTH = 250;
    exports.SORT_RANDOM = "random";
    exports.SORT_ASC = "asc";
    exports.SORT_DESC = "desc";
    exports.SORT_ASCENDING = "ascending";
    exports.SORT_DESCEDNGING = "descending";
    var QuizHelper = function() {
      function QuizHelper() {}
      QuizHelper.renderTextLabel = function(quizConfig, parent, width, hex, childName, fontSize, overflow) {
        void 0 === width && (width = LABEL_WIDTH);
        void 0 === hex && (hex = "#000000");
        void 0 === childName && (childName = "label");
        void 0 === fontSize && (fontSize = 65);
        void 0 === overflow && (overflow = Overflow.SHRINK);
        QuizHelper.renderTextLabelWithContent(quizConfig, parent, quizConfig.displayTexts, width, hex, childName, fontSize, overflow);
      };
      QuizHelper.renderTextLabelWithContent = function(quizConfig, parent, content, width, hex, childName, fontSize, overflow) {
        void 0 === width && (width = LABEL_WIDTH);
        void 0 === hex && (hex = "#000000");
        void 0 === fontSize && (fontSize = 75);
        var label = parent.getChildByName(childName);
        if (label) {
          label.color = new cc.Color().fromHEX(hex);
          label.width = width;
          var labelComponent = label.getComponent(cc.Label);
          labelComponent.fontSize = fontSize;
          labelComponent.overflow = overflow;
          labelComponent.string = content;
        }
      };
      QuizHelper.createTextLabelWithContent = function(quizConfig, parent, content, labelBgPrefab, width, height, hex, fontSize) {
        void 0 === width && (width = LABEL_WIDTH);
        void 0 === height && (height = LABEL_WIDTH);
        void 0 === hex && (hex = "#000000");
        void 0 === fontSize && (fontSize = 50);
        var labelBg = cc.instantiate(labelBgPrefab);
        parent.addChild(labelBg);
        labelBg.width = width;
        labelBg.height = height;
        var label = labelBg.getChildByName("label");
        var labelComponent = label.getComponent(cc.Label);
        label.color = new cc.Color().fromHEX(hex);
        labelComponent.string = content;
        labelComponent.fontSize = fontSize;
        labelComponent.lineHeight = fontSize;
      };
      QuizHelper.renderAdditionalQuestionLabel = function(quizConfig, label, width, height) {
        if (quizConfig.additionalQuestion) {
          var labelComponent = label.getComponent(cc.Label);
          labelComponent.string = quizConfig.additionalQuestion;
          labelComponent.overflow = Overflow.RESIZE_HEIGHT;
          label.width = width;
          label.height = height;
        }
      };
      QuizHelper.renderSoundButton = function(quizConfig, parent, assetDir, isNumeric) {
        void 0 === isNumeric && (isNumeric = false);
        var soundButton = parent.getChildByName("soundButton");
        if (quizConfig.soundFile && !isNumeric) {
          if (soundButton) {
            var soundComponent = soundButton.getComponent(quiz_sound_1.default);
            soundComponent.soundClip = assetDir + "/" + quizConfig.soundFile;
          }
        } else if (isNumeric) {
          if (soundButton) {
            var soundComponent = soundButton.getComponent(quiz_sound_1.default);
            soundComponent.numericSound = quizConfig.soundFile;
          }
        } else {
          var soundButton_1 = parent.getChildByName("soundButton");
          soundButton_1 && (soundButton_1.active = false);
        }
      };
      QuizHelper.renderNumericSoundButton = function(quizConfig, parent, assetDir) {
        if (quizConfig.soundFile) {
          var soundButton = parent.getChildByName("soundButton");
          if (soundButton) {
            var soundComponent = soundButton.getComponent(quiz_sound_1.default);
            soundComponent.soundClip = assetDir + "/" + quizConfig.soundFile;
          }
        } else {
          var soundButton = parent.getChildByName("soundButton");
          soundButton && (soundButton.active = false);
        }
      };
      QuizHelper.renderTextChoices = function(quizConfig, textButtonPrefab, panel, width, height, choices, fontSize) {
        void 0 === fontSize && (fontSize = 80);
        choices = choices.filter(function(el) {
          return null != el && el.length > 0;
        });
        choices.forEach(function(c, i) {
          c = c.trim();
          var textBtn = cc.instantiate(textButtonPrefab);
          var quizButtonComponent = textBtn.getComponent(quiz_literacy_button_1.default);
          quizButtonComponent.data = new quiz_literacy_1.QuizBtnData(quiz_literacy_1.QuizBtnType.Sentence, c, null, quizConfig.answer && c && c.trim() === quizConfig.answer.trim());
          var label = textBtn.getChildByName("label");
          if (label) {
            var labelComponent = label.getComponent(chimple_label_1.default);
            labelComponent.enableWrapText = false;
            labelComponent.overflow = Overflow.SHRINK;
            label.width = width;
            label.height = height;
            if (fontSize > 0) {
              labelComponent.fontSize = fontSize;
              labelComponent.lineHeight = fontSize;
            }
            if (labelComponent) {
              QuizHelper.resizeButton(textBtn, width, height);
              labelComponent.string = c;
              panel.addChild(textBtn, i);
            }
          }
        });
      };
      QuizHelper.renderImageChoices = function(quizConfig, imageButtonPrefab, panel, assetDir, isAbsolutePath) {
        void 0 === isAbsolutePath && (isAbsolutePath = false);
        var choices = quizConfig.choices.split("^");
        choices.forEach(function(c) {
          var imageBtn = cc.instantiate(imageButtonPrefab);
          var quizButtonComponent = imageBtn.getComponent(quiz_literacy_button_1.default);
          quizButtonComponent.quizDir = assetDir + "/";
          quizButtonComponent.data = new quiz_literacy_1.QuizBtnData(quiz_literacy_1.QuizBtnType.Picture, null, c, quizConfig.answer && c && c.trim() === quizConfig.answer.trim(), isAbsolutePath);
          var sprite = imageBtn.getChildByName("sprite");
          sprite && panel.addChild(imageBtn);
        });
      };
      QuizHelper.resizeButton = function(btn, width, height) {
        btn.width = width;
        btn.height = height;
        btn.children.forEach(function(c) {
          c.width = width;
          c.height = height;
        });
      };
      QuizHelper.loadAndResizeResourceImage = function(quizConfig, imageNode, assetDir, imageFileName) {
        if (imageFileName) {
          var picWidth_1 = imageNode.width;
          var picHeight_1 = imageNode.height;
          var imageToLoad = assetDir + "/" + imageFileName;
          cc.resources.load(imageToLoad, cc.SpriteFrame, function(err, spriteFrame) {
            if (!err) {
              var sprite = imageNode.getComponent(cc.Sprite);
              sprite.spriteFrame = spriteFrame;
              var size = sprite.spriteFrame.getOriginalSize();
              var xScale = picWidth_1 / size.width;
              var yScale = picHeight_1 / size.height;
              var scale = Math.min(xScale, yScale);
              imageNode.width = scale * size.width;
              imageNode.height = scale * size.height;
            }
          });
        }
      };
      QuizHelper.loadAndResizeImage = function(quizConfig, imageNode, assetDir, imageFileName) {
        if (imageFileName) {
          var picWidth_2 = imageNode.width;
          var picHeight_2 = imageNode.height;
          var imageToLoad = assetDir + "/" + imageFileName;
          util_1.Util.loadTexture(imageToLoad, function(texture) {
            if (texture) {
              var sprite = imageNode.getComponent(cc.Sprite);
              sprite.spriteFrame = new cc.SpriteFrame(texture);
              var size = sprite.spriteFrame.getOriginalSize();
              var xScale = picWidth_2 / size.width;
              var yScale = picHeight_2 / size.height;
              var scale = Math.min(xScale, yScale);
              imageNode.width = scale * size.width;
              imageNode.height = scale * size.height;
            }
          });
        }
        return imageNode;
      };
      QuizHelper.range = function(start, end, howMany) {
        void 0 === howMany && (howMany = -1);
        var numbers = Array(end - start + 1).fill().map(function(_, idx) {
          return start + idx;
        });
        numbers.sort(function() {
          return Math.random() - .5;
        });
        return -1 === howMany ? numbers : numbers.slice(0, howMany);
      };
      QuizHelper.generateAnswer = function(input) {
        var answer = 0;
        var results = input.match(/(\d+)~(\d+)/);
        if (results && 3 === results.length) {
          var start = Number(results[1]);
          var end = Number(results[2]);
          if (start === end) answer = start; else if (results && 3 === results.length) {
            var start_1 = Number(results[1]);
            var end_1 = Number(results[2]);
            var choices = QuizHelper.range(start_1, end_1, 1);
            answer = choices[0];
          }
        }
        return answer;
      };
      QuizHelper.randomInRange = function(input, howMany, sort) {
        void 0 === sort && (sort = exports.SORT_RANDOM);
        var random = [];
        var results = input.match(/(\d+)~(\d+)/);
        if (results && 3 === results.length) {
          var start = Number(results[1]);
          var end = Number(results[2]);
          end = end - start < 4 ? start + 3 : end;
          var rNumbers = QuizHelper.range(start, end, howMany);
          rNumbers = sort === exports.SORT_RANDOM ? rNumbers : sort === exports.SORT_ASC ? rNumbers.sort() : rNumbers.sort(function(a, b) {
            return b - a;
          });
          random = rNumbers.map(function(x) {
            return String(x);
          });
        }
        return random;
      };
      QuizHelper.randomInRangeWithAnswer = function(input, answer, howMany, sort) {
        void 0 === sort && (sort = exports.SORT_RANDOM);
        var random = [];
        var results = input.match(/(\d+)~(\d+)/);
        if (results && 3 === results.length) {
          var start = Number(results[1]);
          var end = Number(results[2]);
          end = end - start < 4 ? start + 3 : end;
          var rNumbers = QuizHelper.range(start, end, howMany);
          rNumbers = sort === exports.SORT_RANDOM ? rNumbers : sort === exports.SORT_ASC ? rNumbers.sort() : rNumbers.sort(function(a, b) {
            return b - a;
          });
          random = rNumbers.map(function(x) {
            return String(x);
          });
          if (!random.includes(answer)) {
            var rIndex = QuizHelper.range(0, random.length - 1, 1)[0];
            var deleted = random.splice(rIndex, 1);
            random.splice(rIndex, 0, answer);
          }
        }
        return random;
      };
      QuizHelper.renderImagesInGrid = function(parent, childName, imagePrefab, choice, quizConfig) {
        var topLayout = parent.getChildByName(childName);
        for (var i = 0; i < choice; i++) {
          var image = cc.instantiate(imagePrefab);
          topLayout.addChild(image);
        }
        var text = String(choice);
        var quizButtonComponent = parent.getComponent(quiz_literacy_button_1.default);
        quizButtonComponent && (quizButtonComponent.data = new quiz_literacy_1.QuizBtnData(quiz_literacy_1.QuizBtnType.Sentence, text, null, text && text && text.trim() === quizConfig.answer.trim()));
        var layout = topLayout.getComponent(cc.Layout);
        var vWidth = choice < 10 ? choice * GRID_ELEMENT_SIZE + layout.spacingX * (choice - 1) : 10 * GRID_ELEMENT_SIZE + 9 * layout.spacingX;
        parent.width = layout.paddingLeft + layout.paddingRight + vWidth;
        parent.height = layout.paddingTop + layout.paddingBottom + layout.spacingY * (choice % 10) + choice % 10 * GRID_ELEMENT_SIZE;
      };
      QuizHelper.renderDragChoices = function(quizConfig, dragButtonPrefab, panel, width, height, choices, resizeWithLabel, multipleDrags) {
        void 0 === resizeWithLabel && (resizeWithLabel = false);
        void 0 === multipleDrags && (multipleDrags = false);
        choices.forEach(function(c, i) {
          var tempNode = new cc.Node();
          var drag = cc.instantiate(dragButtonPrefab);
          drag.name = c;
          var mathDragComponent = drag.getComponent(math_drag_1.default);
          mathDragComponent.resizeWithLabel = resizeWithLabel;
          mathDragComponent.returnBackOnNoMatch = true;
          mathDragComponent.fixOnMatch = false;
          mathDragComponent.multipleDrags = multipleDrags;
          drag.width = width;
          drag.height = height;
          tempNode.name = c;
          tempNode.addChild(drag);
          var label = drag.getChildByName("label");
          label.width = width;
          label.height = height;
          var dragLabel = label.getComponent(cc.Label);
          dragLabel.string = c;
          var boxCollider = mathDragComponent.getComponent(cc.BoxCollider);
          boxCollider.size = new cc.Size(.5 * drag.width, .5 * drag.height);
          panel.addChild(tempNode, i);
        });
      };
      QuizHelper.renderDropChoices = function(quizConfig, dropButtonPrefab, panel, width, height, choices) {
        choices.forEach(function(c, i) {
          var tempNode = new cc.Node();
          var drop = cc.instantiate(dropButtonPrefab);
          var mathDropComponent = drop.getComponent(math_drop_1.default);
          drop.width = width;
          drop.height = height;
          tempNode.width = width;
          tempNode.height = height;
          tempNode.name = c + "_" + i;
          tempNode.addChild(drop);
          var label = drop.getChildByName("dropLabel");
          var dragLabel = label.getComponent(cc.Label);
          dragLabel.string = c;
          drop.name = c + "_" + i;
          var boxCollider = mathDropComponent.getComponent(cc.BoxCollider);
          boxCollider.size = new cc.Size(.5 * drop.width, .5 * drop.height);
          panel.addChild(tempNode, i);
        });
      };
      return QuizHelper;
    }();
    exports.QuizHelper = QuizHelper;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/chimple-label": void 0,
    "../../../../common/scripts/util": void 0,
    "../../quizmaths/scripts/math-drag": "math-drag",
    "../../quizmaths/scripts/math-drop": "math-drop",
    "./quiz-literacy": "quiz-literacy",
    "./quiz-literacy-button": "quiz-literacy-button",
    "./quiz-sound": "quiz-sound"
  } ],
  "quiz-literacy-button": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e2137R8x5dOP6caoEr5eQUe", "quiz-literacy-button");
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
    var util_1 = require("../../../../common/scripts/util");
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var quiz_literacy_1 = require("./quiz-literacy");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var handleClick = true;
    var QuizLiteracyButton = function(_super) {
      __extends(QuizLiteracyButton, _super);
      function QuizLiteracyButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.image = null;
        _this.data = null;
        _this.quizDir = "";
        _this.quizNode = null;
        return _this;
      }
      QuizLiteracyButton.prototype.onLoad = function() {
        var _this = this;
        handleClick = true;
        if (this.data.type == quiz_literacy_1.QuizBtnType.Sentence) this.label.string = this.data.text; else if (this.data.type == quiz_literacy_1.QuizBtnType.Picture) {
          var picWidth_1 = this.node.width;
          var picHeight_1 = this.node.height;
          if (this.data.absolutePath) {
            var isRectangle_1 = "rectangle" === this.data.pic;
            cc.resources.load(this.quizDir + this.data.pic, cc.SpriteFrame, function(err, spriteFrame) {
              if (!err) {
                _this.image.spriteFrame = spriteFrame;
                cc.log("isRectangle", isRectangle_1);
                var size = _this.image.spriteFrame.getOriginalSize();
                var xScale = picWidth_1 / size.width;
                var yScale = picHeight_1 / size.height;
                var answerButton = _this.node.getChildByName("answer_button");
                var sprite = _this.node.getChildByName("sprite");
                var scale = Math.min(xScale, yScale);
                if (answerButton) {
                  if (sprite) if (isRectangle_1) {
                    sprite.width = xScale * answerButton.width;
                    sprite.height = yScale * answerButton.height;
                  } else sprite.width = sprite.height = scale * answerButton.width;
                } else {
                  _this.node.width = scale * size.width;
                  _this.node.height = scale * size.height;
                }
              }
            });
          } else util_1.Util.loadTexture(this.quizDir + this.data.pic, function(texture) {
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
      QuizLiteracyButton.prototype.makeInteractable = function(interactable) {
        var butComp = this.node.getComponent(cc.Button);
        if (butComp) {
          butComp.interactable = interactable;
          handleClick = interactable;
        }
      };
      QuizLiteracyButton.prototype.onClick = function() {
        if (handleClick) {
          handleClick = false;
          this.makeInteractable(false);
          if (this.data.correct) {
            this.node.dispatchEvent(new cc.Event.EventCustom(quiz_literacy_1.QUIZ_CORRECT, true));
            this.makeInteractable(false);
          } else {
            this.node.dispatchEvent(new cc.Event.EventCustom(quiz_literacy_1.QUIZ_WRONG, true));
            this.makeInteractable(false);
          }
        }
      };
      __decorate([ property(cc.Label) ], QuizLiteracyButton.prototype, "label", void 0);
      __decorate([ property(cc.Sprite) ], QuizLiteracyButton.prototype, "image", void 0);
      __decorate([ error_handler_1.default() ], QuizLiteracyButton.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], QuizLiteracyButton.prototype, "makeInteractable", null);
      __decorate([ error_handler_1.default() ], QuizLiteracyButton.prototype, "onClick", null);
      QuizLiteracyButton = __decorate([ ccclass ], QuizLiteracyButton);
      return QuizLiteracyButton;
    }(cc.Component);
    exports.default = QuizLiteracyButton;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "../../../../common/scripts/util": void 0,
    "./quiz-literacy": "quiz-literacy"
  } ],
  "quiz-literacy": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0af301l3Z5AGrqRjcAkeZV7", "quiz-literacy");
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
    exports.QuizLiteracy = exports.QuizBtnData = exports.QuizBtnType = exports.QUIZ_WRONG = exports.QUIZ_CORRECT = exports.WORD_IMAGE = exports.WORD_WORD = exports.SOUNDONLY_WORD = exports.SOUNDONLY_SENTENCE = exports.SOUNDONLY_IMAGE = exports.SENTENCE_WORD = exports.SENTENCE_SENTENCE = exports.PARAGRAPH_SENTENCE = exports.ORDERING_SENTENCE = exports.LISTENING_COM_SENTENCE = exports.IMAGESEQ_SENTENCE = exports.IMAGESEQ_IMAGE = exports.IMAGE_WORD = exports.IMAGE_SENTENCE = exports.IMAGE_IMAGE = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var config_1 = require("../../../../common/scripts/lib/config");
    var word_word_1 = require("./word_word");
    var image_word_1 = require("./image_word");
    var image_sentence_1 = require("./image_sentence");
    var imageseq_image_1 = require("./imageseq_image");
    var imageseq_sentence_1 = require("./imageseq-sentence");
    var soundonly_image_1 = require("./soundonly_image");
    var soundonly_word_1 = require("./soundonly_word");
    var soundonly_sentence_1 = require("./soundonly_sentence");
    var sentence_word_1 = require("./sentence_word");
    var sentence_sentence_1 = require("./sentence_sentence");
    var paragraph_sequence_1 = require("./paragraph_sequence");
    var Listening_com_sequence_1 = require("./Listening_com_sequence");
    var ordering_sequence_1 = require("./ordering_sequence");
    var word_image_1 = require("./word-image");
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var quiz_monitor_1 = require("../../../../common/scripts/quiz-monitor");
    exports.IMAGE_IMAGE = "image_image";
    exports.IMAGE_SENTENCE = "image_sentence";
    exports.IMAGE_WORD = "image_word";
    exports.IMAGESEQ_IMAGE = "imageseq_image";
    exports.IMAGESEQ_SENTENCE = "imageseq_sentence";
    exports.LISTENING_COM_SENTENCE = "listeningcomp_sentence";
    exports.ORDERING_SENTENCE = "ordering_sentence";
    exports.PARAGRAPH_SENTENCE = "paragraph_sentence";
    exports.SENTENCE_SENTENCE = "sentence_sentence";
    exports.SENTENCE_WORD = "sentence_word";
    exports.SOUNDONLY_IMAGE = "soundonly_image";
    exports.SOUNDONLY_SENTENCE = "soundonly_sentence";
    exports.SOUNDONLY_WORD = "soundonly_word";
    exports.WORD_WORD = "word_word";
    exports.WORD_IMAGE = "word_image";
    exports.QUIZ_CORRECT = "QUIZ_CORRECT";
    exports.QUIZ_WRONG = "QUIZ_WRONG";
    var QuizBtnType;
    (function(QuizBtnType) {
      QuizBtnType[QuizBtnType["Sentence"] = 0] = "Sentence";
      QuizBtnType[QuizBtnType["Picture"] = 1] = "Picture";
    })(QuizBtnType = exports.QuizBtnType || (exports.QuizBtnType = {}));
    var QuizBtnData = function() {
      function QuizBtnData(type, text, pic, correct, absolutePath) {
        void 0 === correct && (correct = false);
        void 0 === absolutePath && (absolutePath = false);
        this.type = type;
        this.text = text;
        this.pic = pic;
        this.correct = correct;
        this.absolutePath = absolutePath;
      }
      return QuizBtnData;
    }();
    exports.QuizBtnData = QuizBtnData;
    var QuizLiteracy = function(_super) {
      __extends(QuizLiteracy, _super);
      function QuizLiteracy() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.wordWord = null;
        _this.imageWord = null;
        _this.imageSentence = null;
        _this.imageSeqImage = null;
        _this.imageSeqSentence = null;
        _this.soundonlyImage = null;
        _this.soundonlyWord = null;
        _this.soundonlySentence = null;
        _this.sentenceWord = null;
        _this.sentenceSentence = null;
        _this.paragraphSentence = null;
        _this.listeningComSentence = null;
        _this.orderingSentence = null;
        _this.wordImage = null;
        return _this;
      }
      QuizLiteracy.prototype.onLoad = function() {
        var _this = this;
        var collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        var config = config_1.default.getInstance();
        this._quizLiteracyConfig = this.processConfiguration(config.data[0]);
        this._assetDir = config_1.default.dir + (config.currentGameLessonId + "/res");
        this.node.on(exports.QUIZ_CORRECT, function(event) {
          _this.next(event, true);
        });
        this.node.on(exports.QUIZ_WRONG, function(event) {
          _this.next(event, false);
        });
        switch (this._quizLiteracyConfig.type) {
         case exports.WORD_WORD:
          var word = cc.instantiate(this.wordWord);
          var wordWordComponent = word.getComponent(word_word_1.WordWord);
          wordWordComponent.quizConfig = this._quizLiteracyConfig;
          wordWordComponent.assetDir = this._assetDir;
          this.node.addChild(word);
          break;

         case exports.IMAGE_WORD:
          var imageWord = cc.instantiate(this.imageWord);
          var imageWordComponent = imageWord.getComponent(image_word_1.ImageWord);
          imageWordComponent.quizConfig = this._quizLiteracyConfig;
          imageWordComponent.assetDir = this._assetDir;
          this.node.addChild(imageWord);
          break;

         case exports.IMAGE_SENTENCE:
         case exports.IMAGE_IMAGE:
          var imageSentence = cc.instantiate(this.imageSentence);
          var imageSentenceComponent = imageSentence.getComponent(image_sentence_1.ImageSentence);
          imageSentenceComponent.quizConfig = this._quizLiteracyConfig;
          imageSentenceComponent.assetDir = this._assetDir;
          this.node.addChild(imageSentence);
          break;

         case exports.IMAGESEQ_IMAGE:
          var imageSeqImage = cc.instantiate(this.imageSeqImage);
          var imageSeqImageComponent = imageSeqImage.getComponent(imageseq_image_1.ImageSeqImage);
          imageSeqImageComponent.quizConfig = this._quizLiteracyConfig;
          imageSeqImageComponent.assetDir = this._assetDir;
          this.node.addChild(imageSeqImage);
          break;

         case exports.IMAGESEQ_SENTENCE:
          var imageSeqSentence = cc.instantiate(this.imageSeqSentence);
          var imageSeqSentenceComponent = imageSeqSentence.getComponent(imageseq_sentence_1.ImageseqSentence);
          imageSeqSentenceComponent.quizConfig = this._quizLiteracyConfig;
          imageSeqSentenceComponent.assetDir = this._assetDir;
          this.node.addChild(imageSeqSentence);
          break;

         case exports.SOUNDONLY_IMAGE:
          var soundonlyImage = cc.instantiate(this.soundonlyImage);
          var soundonlyImageComponent = soundonlyImage.getComponent(soundonly_image_1.SoundonlyImage);
          soundonlyImageComponent.quizConfig = this._quizLiteracyConfig;
          soundonlyImageComponent.assetDir = this._assetDir;
          this.node.addChild(soundonlyImage);
          break;

         case exports.SOUNDONLY_WORD:
          var soundonlyWord = cc.instantiate(this.soundonlyWord);
          var soundonlyWordComponent = soundonlyWord.getComponent(soundonly_word_1.SoundonlyWord);
          soundonlyWordComponent.quizConfig = this._quizLiteracyConfig;
          soundonlyWordComponent.assetDir = this._assetDir;
          this.node.addChild(soundonlyWord);
          break;

         case exports.SOUNDONLY_SENTENCE:
          var soundonlySentence = cc.instantiate(this.soundonlySentence);
          var soundonlySentenceComponent = soundonlySentence.getComponent(soundonly_sentence_1.SoundonlySentence);
          soundonlySentenceComponent.quizConfig = this._quizLiteracyConfig;
          soundonlySentenceComponent.assetDir = this._assetDir;
          this.node.addChild(soundonlySentence);
          break;

         case exports.SENTENCE_WORD:
          var sentenceWord = cc.instantiate(this.sentenceWord);
          var sentenceWordComponent = sentenceWord.getComponent(sentence_word_1.SentenceWord);
          sentenceWordComponent.quizConfig = this._quizLiteracyConfig;
          sentenceWordComponent.assetDir = this._assetDir;
          this.node.addChild(sentenceWord);
          break;

         case exports.SENTENCE_SENTENCE:
          var sentenceSentence = cc.instantiate(this.sentenceSentence);
          var sentenceSentenceComponent = sentenceSentence.getComponent(sentence_sentence_1.SentenceSentence);
          sentenceSentenceComponent.quizConfig = this._quizLiteracyConfig;
          sentenceSentenceComponent.assetDir = this._assetDir;
          this.node.addChild(sentenceSentence);
          break;

         case exports.PARAGRAPH_SENTENCE:
          var paragraphSentence = cc.instantiate(this.paragraphSentence);
          var paragraphSentenceComponent = paragraphSentence.getComponent(paragraph_sequence_1.ParagraphSequence);
          paragraphSentenceComponent.quizConfig = this._quizLiteracyConfig;
          paragraphSentenceComponent.assetDir = this._assetDir;
          this.node.addChild(paragraphSentence);
          break;

         case exports.LISTENING_COM_SENTENCE:
          var listeningComSentence = cc.instantiate(this.listeningComSentence);
          var listeningComSentenceComponent = listeningComSentence.getComponent(Listening_com_sequence_1.ListeningComSequence);
          listeningComSentenceComponent.quizConfig = this._quizLiteracyConfig;
          listeningComSentenceComponent.assetDir = this._assetDir;
          this.node.addChild(listeningComSentence);
          break;

         case exports.ORDERING_SENTENCE:
          var orderingSentence = cc.instantiate(this.orderingSentence);
          var orderingSentenceComponent = orderingSentence.getComponent(ordering_sequence_1.OrderingSequence);
          orderingSentenceComponent.quizConfig = this._quizLiteracyConfig;
          orderingSentenceComponent.assetDir = this._assetDir;
          this.node.addChild(orderingSentence);
          break;

         case exports.WORD_IMAGE:
          var wordImage = cc.instantiate(this.wordImage);
          var wordImageComponent = wordImage.getComponent(word_image_1.WordImage);
          wordImageComponent.quizConfig = this._quizLiteracyConfig;
          wordImageComponent.assetDir = this._assetDir;
          this.node.addChild(wordImage);
        }
      };
      QuizLiteracy.prototype.next = function(event, correct) {
        var _this = this;
        event.stopPropagation();
        correct ? this.node.emit("correct") : this.node.emit("wrong");
        this.node.emit(quiz_monitor_1.QUIZ_ANSWERED, correct);
        this.scheduleOnce(function() {
          cc.audioEngine.stopAllEffects();
          cc.audioEngine.stopMusic();
          _this.node.emit("nextProblem");
        }, 1);
      };
      QuizLiteracy.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var level = configurations[0], workSheet = configurations[1], problemNo = configurations[2], type = configurations[3], answer = configurations[4], choice1 = configurations[5], choice2 = configurations[6], choice3 = configurations[7], displayImages = configurations[8], displayTexts = configurations[9], soundFile = configurations[10], additionalQuestion = configurations[11];
        var choices = choice1.trim() + "^" + choice2.trim() + "^" + choice3.trim();
        return {
          level: level,
          workSheet: workSheet,
          problemNo: problemNo,
          type: type,
          answer: answer,
          choices: choices,
          displayImages: displayImages,
          displayTexts: displayTexts,
          soundFile: soundFile,
          additionalQuestion: additionalQuestion
        };
      };
      QuizLiteracy.prototype.onDestroy = function() {
        cc.audioEngine.stopAll();
      };
      __decorate([ property(cc.Prefab) ], QuizLiteracy.prototype, "wordWord", void 0);
      __decorate([ property(cc.Prefab) ], QuizLiteracy.prototype, "imageWord", void 0);
      __decorate([ property(cc.Prefab) ], QuizLiteracy.prototype, "imageSentence", void 0);
      __decorate([ property(cc.Prefab) ], QuizLiteracy.prototype, "imageSeqImage", void 0);
      __decorate([ property(cc.Prefab) ], QuizLiteracy.prototype, "imageSeqSentence", void 0);
      __decorate([ property(cc.Prefab) ], QuizLiteracy.prototype, "soundonlyImage", void 0);
      __decorate([ property(cc.Prefab) ], QuizLiteracy.prototype, "soundonlyWord", void 0);
      __decorate([ property(cc.Prefab) ], QuizLiteracy.prototype, "soundonlySentence", void 0);
      __decorate([ property(cc.Prefab) ], QuizLiteracy.prototype, "sentenceWord", void 0);
      __decorate([ property(cc.Prefab) ], QuizLiteracy.prototype, "sentenceSentence", void 0);
      __decorate([ property(cc.Prefab) ], QuizLiteracy.prototype, "paragraphSentence", void 0);
      __decorate([ property(cc.Prefab) ], QuizLiteracy.prototype, "listeningComSentence", void 0);
      __decorate([ property(cc.Prefab) ], QuizLiteracy.prototype, "orderingSentence", void 0);
      __decorate([ property(cc.Prefab) ], QuizLiteracy.prototype, "wordImage", void 0);
      __decorate([ error_handler_1.default() ], QuizLiteracy.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], QuizLiteracy.prototype, "next", null);
      QuizLiteracy = __decorate([ ccclass ], QuizLiteracy);
      return QuizLiteracy;
    }(cc.Component);
    exports.QuizLiteracy = QuizLiteracy;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/config": void 0,
    "../../../../common/scripts/lib/error-handler": void 0,
    "../../../../common/scripts/quiz-monitor": void 0,
    "./Listening_com_sequence": "Listening_com_sequence",
    "./image_sentence": "image_sentence",
    "./image_word": "image_word",
    "./imageseq-sentence": "imageseq-sentence",
    "./imageseq_image": "imageseq_image",
    "./ordering_sequence": "ordering_sequence",
    "./paragraph_sequence": "paragraph_sequence",
    "./sentence_sentence": "sentence_sentence",
    "./sentence_word": "sentence_word",
    "./soundonly_image": "soundonly_image",
    "./soundonly_sentence": "soundonly_sentence",
    "./soundonly_word": "soundonly_word",
    "./word-image": "word-image",
    "./word_word": "word_word"
  } ],
  "quiz-maths": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dd1b82YuRlE+avr/PAqC+nJ", "quiz-maths");
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
    exports.QUIZ_NEXT = exports.QUIZ_CORRECT = exports.SHAPES = exports.WORD_PROBLEM = exports.OPERATIONS_WITHOUT_OBJECTS = exports.OPERATIONS_WITH_OBJECTS = exports.OPERATIONS_DRAG = exports.NUMBER_IDENTIFICATION = exports.MISSING_NUMBER_DRAG = exports.COMPARE_NUMBER_MAGNITUDES = exports.RECOGNIZE_NUMBER = exports.BIGGER_OR_SMALLER = exports.BIGGEST_AND_SMALLEST = exports.SINGLE_DIGIT_NUMBERS = exports.TWO_DIGIT_NUMBERS = exports.DIGIT_NUMBERS = void 0;
    var ccclass = cc._decorator.ccclass;
    var config_1 = require("../../../../common/scripts/lib/config");
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var bigger_or_smaller_1 = require("./bigger-or-smaller");
    var compare_number_magnitudes_1 = require("./compare_number_magnitudes");
    var digit_numbers_1 = require("./digit-numbers");
    var missing_number_1 = require("./missing_number");
    var number_identification_1 = require("./number-identification");
    var operation_with_objects_1 = require("./operation-with-objects");
    var operations_drag_1 = require("./operations-drag");
    var recognize_number_1 = require("./recognize-number");
    var shapes_1 = require("./shapes");
    var word_problem_1 = require("./word-problem");
    var property = cc._decorator.property;
    var quiz_literacy_1 = require("../../quizliteracy/scripts/quiz-literacy");
    var quiz_monitor_1 = require("../../../../common/scripts/quiz-monitor");
    var profile_1 = require("../../../../common/scripts/lib/profile");
    var helper_1 = require("../../../../common/scripts/helper");
    exports.DIGIT_NUMBERS = "digit_numbers";
    exports.TWO_DIGIT_NUMBERS = "2digit_numbers";
    exports.SINGLE_DIGIT_NUMBERS = "single_digit_numbers";
    exports.BIGGEST_AND_SMALLEST = "biggest_and_smallest";
    exports.BIGGER_OR_SMALLER = "bigger_and_smaller";
    exports.RECOGNIZE_NUMBER = "recognize_number";
    exports.COMPARE_NUMBER_MAGNITUDES = "compare_number_magnitudes";
    exports.MISSING_NUMBER_DRAG = "missing_number_drag";
    exports.NUMBER_IDENTIFICATION = "number_identification";
    exports.OPERATIONS_DRAG = "operations_drag";
    exports.OPERATIONS_WITH_OBJECTS = "operations_with_objects";
    exports.OPERATIONS_WITHOUT_OBJECTS = "operations_without_objects";
    exports.WORD_PROBLEM = "word_problem";
    exports.SHAPES = "shapes";
    exports.QUIZ_CORRECT = "QUIZ_CORRECT";
    exports.QUIZ_NEXT = "QUIZ_NEXT";
    var QuizMaths = function(_super) {
      __extends(QuizMaths, _super);
      function QuizMaths() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.digitNumbers = null;
        _this.biggerOrSmaller = null;
        _this.recognizeNumber = null;
        _this.compareNumberMagnitudes = null;
        _this.missingNumber = null;
        _this.numberIdentify = null;
        _this.operationsDrag = null;
        _this.operationWithObjects = null;
        _this.wordProblem = null;
        _this.shapes = null;
        _this._mathsConfig = null;
        _this._nextDone = false;
        return _this;
      }
      QuizMaths.prototype.onLoad = function() {
        var _this = this;
        var collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        var config = config_1.default.getInstance();
        this._mathsConfig = this.processConfiguration(config.data[0]);
        this._assetDir = helper_1.HELP_DIR + profile_1.default.lang + "-help/" + helper_1.QUIZ_MATHS_DIR;
        this.node.on(exports.QUIZ_CORRECT, function(event) {
          if (!_this._nextDone) {
            _this._nextDone = true;
            _this.next(event, true);
          }
        });
        this.node.on(quiz_literacy_1.QUIZ_WRONG, function(event) {
          if (!_this._nextDone) {
            _this._nextDone = true;
            _this.next(event, false);
          }
        });
        switch (this._mathsConfig.type) {
         case exports.DIGIT_NUMBERS:
         case exports.TWO_DIGIT_NUMBERS:
         case exports.SINGLE_DIGIT_NUMBERS:
          var digitNumbers = cc.instantiate(this.digitNumbers);
          var digitNumbersComponent = digitNumbers.getComponent(digit_numbers_1.DigitNumbers);
          digitNumbersComponent.quizConfig = this._mathsConfig;
          digitNumbersComponent.assetDir = this._assetDir;
          this.node.addChild(digitNumbers);
          break;

         case exports.BIGGEST_AND_SMALLEST:
         case exports.BIGGER_OR_SMALLER:
          var biggerOrSmaller = cc.instantiate(this.biggerOrSmaller);
          var biggerOrSmallerComponent = biggerOrSmaller.getComponent(bigger_or_smaller_1.BiggerOrSmaller);
          biggerOrSmallerComponent.quizConfig = this._mathsConfig;
          biggerOrSmallerComponent.assetDir = this._assetDir;
          this.node.addChild(biggerOrSmaller);
          break;

         case exports.RECOGNIZE_NUMBER:
          var recognizeNumber = cc.instantiate(this.recognizeNumber);
          var recognizeNumberComponent = recognizeNumber.getComponent(recognize_number_1.RecognizeNumber);
          recognizeNumberComponent.quizConfig = this._mathsConfig;
          recognizeNumberComponent.assetDir = this._assetDir;
          this.node.addChild(recognizeNumber);
          break;

         case exports.COMPARE_NUMBER_MAGNITUDES:
          var compareNumberMagnitudes = cc.instantiate(this.compareNumberMagnitudes);
          var compareNumberMagnitudesComponent = compareNumberMagnitudes.getComponent(compare_number_magnitudes_1.CompareNumberMagnitudes);
          compareNumberMagnitudesComponent.quizConfig = this._mathsConfig;
          compareNumberMagnitudesComponent.assetDir = this._assetDir;
          this.node.addChild(compareNumberMagnitudes);
          break;

         case exports.MISSING_NUMBER_DRAG:
          var missingNumber = cc.instantiate(this.missingNumber);
          var missingNumbersComponent = missingNumber.getComponent(missing_number_1.MissingNumber);
          missingNumbersComponent.quizConfig = this._mathsConfig;
          missingNumbersComponent.assetDir = this._assetDir;
          this.node.addChild(missingNumber);
          break;

         case exports.NUMBER_IDENTIFICATION:
          var numberIdentify = cc.instantiate(this.numberIdentify);
          var numberIdentifyComponent = numberIdentify.getComponent(number_identification_1.NumberIdentification);
          numberIdentifyComponent.quizConfig = this._mathsConfig;
          numberIdentifyComponent.assetDir = this._assetDir;
          this.node.addChild(numberIdentify);
          break;

         case exports.OPERATIONS_DRAG:
          var operationsDrag = cc.instantiate(this.operationsDrag);
          var operationsDragComponent = operationsDrag.getComponent(operations_drag_1.OperationsDrag);
          operationsDragComponent.quizConfig = this._mathsConfig;
          operationsDragComponent.assetDir = this._assetDir;
          this.node.addChild(operationsDrag);
          break;

         case exports.OPERATIONS_WITH_OBJECTS:
         case exports.OPERATIONS_WITHOUT_OBJECTS:
          var operationWithObjects = cc.instantiate(this.operationWithObjects);
          var operationWithObjectsComponent = operationWithObjects.getComponent(operation_with_objects_1.default);
          operationWithObjectsComponent.quizConfig = this._mathsConfig;
          operationWithObjectsComponent.assetDir = this._assetDir;
          this.node.addChild(operationWithObjects);
          break;

         case exports.SHAPES:
          var shapes = cc.instantiate(this.shapes);
          var shapesComponent = shapes.getComponent(shapes_1.default);
          shapesComponent.quizConfig = this._mathsConfig;
          shapesComponent.assetDir = "items/shape";
          this.node.addChild(shapes);
          break;

         case exports.WORD_PROBLEM:
          var wordProblem = cc.instantiate(this.wordProblem);
          var wordProblemComponent = wordProblem.getComponent(word_problem_1.default);
          wordProblemComponent.quizConfig = this._mathsConfig;
          wordProblemComponent.assetDir = helper_1.HELP_DIR + profile_1.default.lang + "-help/" + helper_1.QUESTION_BOARD;
          this.node.addChild(wordProblem);
        }
      };
      QuizMaths.prototype.next = function(event, correct) {
        var _this = this;
        event.stopPropagation();
        correct ? this.node.emit("correct") : this.node.emit("wrong");
        this.node.emit(quiz_monitor_1.QUIZ_ANSWERED, correct);
        this.scheduleOnce(function() {
          cc.audioEngine.stopAllEffects();
          cc.audioEngine.stopMusic();
          _this.node.emit("nextProblem");
        }, 1);
      };
      QuizMaths.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var level = configurations[0], workSheet = configurations[1], problemNo = configurations[2], type = configurations[3], answer = configurations[4], choices = configurations[5], order = configurations[6], soundFile = configurations[7], displayTexts = configurations[8], displayImage = configurations[9];
        if ("shapes" === type) {
          var choice1 = configurations[5];
          var choice2 = configurations[6];
          var choice3 = configurations[7];
          var choice4 = configurations[8];
          choices = choice1.trim() + "," + choice2.trim() + "," + choice3.trim() + "," + choice4.trim();
          order = configurations[9];
          soundFile = configurations[10];
          displayTexts = configurations[11];
        }
        return {
          level: level,
          workSheet: workSheet,
          problemNo: problemNo,
          type: type,
          answer: answer,
          choices: choices,
          order: order,
          soundFile: soundFile,
          displayTexts: displayTexts,
          displayImage: displayImage
        };
      };
      QuizMaths.prototype.onDestroy = function() {
        cc.audioEngine.stopAll();
      };
      __decorate([ property(cc.Prefab) ], QuizMaths.prototype, "digitNumbers", void 0);
      __decorate([ property(cc.Prefab) ], QuizMaths.prototype, "biggerOrSmaller", void 0);
      __decorate([ property(cc.Prefab) ], QuizMaths.prototype, "recognizeNumber", void 0);
      __decorate([ property(cc.Prefab) ], QuizMaths.prototype, "compareNumberMagnitudes", void 0);
      __decorate([ property(cc.Prefab) ], QuizMaths.prototype, "missingNumber", void 0);
      __decorate([ property(cc.Prefab) ], QuizMaths.prototype, "numberIdentify", void 0);
      __decorate([ property(cc.Prefab) ], QuizMaths.prototype, "operationsDrag", void 0);
      __decorate([ property(cc.Prefab) ], QuizMaths.prototype, "operationWithObjects", void 0);
      __decorate([ property(cc.Prefab) ], QuizMaths.prototype, "wordProblem", void 0);
      __decorate([ property(cc.Prefab) ], QuizMaths.prototype, "shapes", void 0);
      __decorate([ error_handler_1.default() ], QuizMaths.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], QuizMaths.prototype, "next", null);
      QuizMaths = __decorate([ ccclass ], QuizMaths);
      return QuizMaths;
    }(cc.Component);
    exports.default = QuizMaths;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/helper": void 0,
    "../../../../common/scripts/lib/config": void 0,
    "../../../../common/scripts/lib/error-handler": void 0,
    "../../../../common/scripts/lib/profile": void 0,
    "../../../../common/scripts/quiz-monitor": void 0,
    "../../quizliteracy/scripts/quiz-literacy": "quiz-literacy",
    "./bigger-or-smaller": "bigger-or-smaller",
    "./compare_number_magnitudes": "compare_number_magnitudes",
    "./digit-numbers": "digit-numbers",
    "./missing_number": "missing_number",
    "./number-identification": "number-identification",
    "./operation-with-objects": "operation-with-objects",
    "./operations-drag": "operations-drag",
    "./recognize-number": "recognize-number",
    "./shapes": "shapes",
    "./word-problem": "word-problem"
  } ],
  "quiz-sound": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9563edbQVtJbL3SD6MMRaDt", "quiz-sound");
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
    var util_1 = require("../../../../common/scripts/util");
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var QuizSound = function(_super) {
      __extends(QuizSound, _super);
      function QuizSound() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._isSoundPlaying = false;
        _this._soundClip = null;
        _this._normalSpriteFrame = null;
        _this._pressedSpriteFrame = null;
        _this._numericSound = null;
        return _this;
      }
      QuizSound.prototype.onLoad = function() {
        var _this = this;
        var button = this.node.getComponent(cc.Button);
        this._normalSpriteFrame = button.normalSprite;
        this._pressedSpriteFrame = button.pressedSprite;
        this.scheduleOnce(function() {
          _this.soundOnLoad();
        }, .5);
      };
      QuizSound.prototype.playSound = function(node) {
        var _this = this;
        var button = node.getComponent(cc.Button);
        if (!this._isSoundPlaying) {
          this._isSoundPlaying = true;
          button.normalSprite = this._pressedSpriteFrame;
          this._soundClip ? util_1.Util.speak(this._soundClip, function() {
            _this._isSoundPlaying = false;
            button.normalSprite = _this._normalSpriteFrame;
          }) : this._numericSound && util_1.Util.speakEquation([ this._numericSound ], function(index) {
            _this._isSoundPlaying = false;
            button.normalSprite = _this._normalSpriteFrame;
          });
        }
      };
      QuizSound.prototype.stopSound = function() {
        this._isSoundPlaying = false;
        cc.audioEngine.stopAllEffects();
        var button = this.node.getComponent(cc.Button);
        button.normalSprite = this._normalSpriteFrame;
      };
      QuizSound.prototype.soundOnLoad = function() {
        this.playSound(this.node);
      };
      QuizSound.prototype.onButtonClick = function(event, customEventData) {
        var node = event.target;
        this.stopSound();
        this.playSound(node);
      };
      Object.defineProperty(QuizSound.prototype, "soundClip", {
        set: function(n) {
          this._soundClip = n;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(QuizSound.prototype, "numericSound", {
        set: function(n) {
          this._numericSound = n;
        },
        enumerable: false,
        configurable: true
      });
      QuizSound.prototype.onDestroy = function() {};
      __decorate([ error_handler_1.default() ], QuizSound.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], QuizSound.prototype, "playSound", null);
      __decorate([ error_handler_1.default() ], QuizSound.prototype, "stopSound", null);
      __decorate([ error_handler_1.default() ], QuizSound.prototype, "soundOnLoad", null);
      __decorate([ error_handler_1.default() ], QuizSound.prototype, "onButtonClick", null);
      QuizSound = __decorate([ ccclass ], QuizSound);
      return QuizSound;
    }(cc.Component);
    exports.default = QuizSound;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "../../../../common/scripts/util": void 0
  } ],
  "recognize-number": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bd2b41r+zhGIZlscRVGSgkV", "recognize-number");
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
    exports.RecognizeNumber = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var quiz_helper_1 = require("../../quizliteracy/scripts/quiz-helper");
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var WIDTH = 200;
    var HEIGHT = 200;
    var RecognizeNumber = function(_super) {
      __extends(RecognizeNumber, _super);
      function RecognizeNumber() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.textButton = null;
        _this.choices = [];
        _this.answer = 0;
        return _this;
      }
      RecognizeNumber.prototype.onLoad = function() {
        this.quizConfig.choices = -1 !== this.quizConfig.choices.indexOf("~") ? this.quizConfig.choices : this.quizConfig.choices + "~" + this.quizConfig.choices;
        this.answer = quiz_helper_1.QuizHelper.generateAnswer(this.quizConfig.choices);
        this.quizConfig.answer = String(this.answer);
        this.choices = quiz_helper_1.QuizHelper.randomInRangeWithAnswer(this.quizConfig.choices, this.quizConfig.answer, 4, this.quizConfig.order);
        this.renderTopPanel();
        this.renderBottomPanel();
      };
      RecognizeNumber.prototype.renderTopPanel = function() {
        var topPanel = this.node.getChildByName("topPanel");
        this.renderSoundButton(topPanel);
      };
      RecognizeNumber.prototype.renderBottomPanel = function() {
        var bottomPanel = this.node.getChildByName("bottomPanel");
        quiz_helper_1.QuizHelper.renderTextChoices(this.quizConfig, this.textButton, bottomPanel, WIDTH, HEIGHT, this.choices);
      };
      RecognizeNumber.prototype.renderSoundButton = function(parent) {
        this.quizConfig.soundFile = String(this.answer);
        quiz_helper_1.QuizHelper.renderSoundButton(this.quizConfig, parent, "" + this.assetDir, true);
      };
      __decorate([ property(cc.Prefab) ], RecognizeNumber.prototype, "textButton", void 0);
      __decorate([ error_handler_1.default() ], RecognizeNumber.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], RecognizeNumber.prototype, "renderTopPanel", null);
      __decorate([ error_handler_1.default() ], RecognizeNumber.prototype, "renderBottomPanel", null);
      __decorate([ error_handler_1.default() ], RecognizeNumber.prototype, "renderSoundButton", null);
      RecognizeNumber = __decorate([ ccclass ], RecognizeNumber);
      return RecognizeNumber;
    }(cc.Component);
    exports.RecognizeNumber = RecognizeNumber;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "../../quizliteracy/scripts/quiz-helper": "quiz-helper"
  } ],
  sentence_sentence: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2228fppMExNdbmB7XkI8JlP", "sentence_sentence");
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
    exports.SentenceSentence = void 0;
    var ccclass = cc._decorator.ccclass;
    var quiz_helper_1 = require("./quiz-helper");
    var property = cc._decorator.property;
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var WIDTH = 800;
    var HEIGHT = 85;
    var LABEL_WIDTH = 880;
    var SentenceSentence = function(_super) {
      __extends(SentenceSentence, _super);
      function SentenceSentence() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.textButton = null;
        return _this;
      }
      SentenceSentence.prototype.onLoad = function() {
        this.renderTopPanel();
        this.renderBottomPanel();
      };
      SentenceSentence.prototype.renderTopPanel = function() {
        var topPanel = this.node.getChildByName("topPanel");
        this.renderSoundButton(topPanel);
        this.renderLabel(topPanel);
      };
      SentenceSentence.prototype.renderBottomPanel = function() {
        var bottomPanel = this.node.getChildByName("bottomPanel");
        quiz_helper_1.QuizHelper.renderTextChoices(this.quizConfig, this.textButton, bottomPanel, WIDTH, HEIGHT, this.quizConfig.choices.split("^"));
      };
      SentenceSentence.prototype.renderSoundButton = function(parent) {
        quiz_helper_1.QuizHelper.renderSoundButton(this.quizConfig, parent, "" + this.assetDir);
      };
      SentenceSentence.prototype.renderLabel = function(parent) {
        quiz_helper_1.QuizHelper.renderTextLabel(this.quizConfig, parent, LABEL_WIDTH);
      };
      __decorate([ property(cc.Prefab) ], SentenceSentence.prototype, "textButton", void 0);
      __decorate([ error_handler_1.default() ], SentenceSentence.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], SentenceSentence.prototype, "renderTopPanel", null);
      __decorate([ error_handler_1.default() ], SentenceSentence.prototype, "renderBottomPanel", null);
      __decorate([ error_handler_1.default() ], SentenceSentence.prototype, "renderSoundButton", null);
      __decorate([ error_handler_1.default() ], SentenceSentence.prototype, "renderLabel", null);
      SentenceSentence = __decorate([ ccclass ], SentenceSentence);
      return SentenceSentence;
    }(cc.Component);
    exports.SentenceSentence = SentenceSentence;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "./quiz-helper": "quiz-helper"
  } ],
  sentence_word: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a03ebJfzZ5FypxcPGGPQ7Gj", "sentence_word");
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
    exports.SentenceWord = void 0;
    var ccclass = cc._decorator.ccclass;
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var quiz_helper_1 = require("./quiz-helper");
    var property = cc._decorator.property;
    var WIDTH = 300;
    var HEIGHT = 250;
    var LABEL_WIDTH = 880;
    var SentenceWord = function(_super) {
      __extends(SentenceWord, _super);
      function SentenceWord() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.textButton = null;
        return _this;
      }
      SentenceWord.prototype.onLoad = function() {
        this.renderTopPanel();
        this.renderBottomPanel();
      };
      SentenceWord.prototype.renderTopPanel = function() {
        var topPanel = this.node.getChildByName("topPanel");
        this.renderSoundButton(topPanel);
        this.renderLabel(topPanel);
      };
      SentenceWord.prototype.renderBottomPanel = function() {
        var bottomPanel = this.node.getChildByName("bottomPanel");
        quiz_helper_1.QuizHelper.renderTextChoices(this.quizConfig, this.textButton, bottomPanel, WIDTH, HEIGHT, this.quizConfig.choices.split("^"));
      };
      SentenceWord.prototype.renderSoundButton = function(parent) {
        quiz_helper_1.QuizHelper.renderSoundButton(this.quizConfig, parent, "" + this.assetDir);
      };
      SentenceWord.prototype.renderLabel = function(parent) {
        quiz_helper_1.QuizHelper.renderTextLabel(this.quizConfig, parent, LABEL_WIDTH);
      };
      __decorate([ property(cc.Prefab) ], SentenceWord.prototype, "textButton", void 0);
      __decorate([ error_handler_1.default() ], SentenceWord.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], SentenceWord.prototype, "renderTopPanel", null);
      __decorate([ error_handler_1.default() ], SentenceWord.prototype, "renderBottomPanel", null);
      __decorate([ error_handler_1.default() ], SentenceWord.prototype, "renderSoundButton", null);
      __decorate([ error_handler_1.default() ], SentenceWord.prototype, "renderLabel", null);
      SentenceWord = __decorate([ ccclass ], SentenceWord);
      return SentenceWord;
    }(cc.Component);
    exports.SentenceWord = SentenceWord;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "./quiz-helper": "quiz-helper"
  } ],
  shapes: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "18488PgJMhBvIdzlER1ktlm", "shapes");
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
    var quiz_helper_1 = require("../../quizliteracy/scripts/quiz-helper");
    var property = cc._decorator.property;
    var util_1 = require("../../../../common/scripts/util");
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var helper_1 = require("../../../../common/scripts/helper");
    var profile_1 = require("../../../../common/scripts/lib/profile");
    var LABEL_WIDTH = 850;
    var WIDTH = 200;
    var HEIGHT = 200;
    var WHICH = "which";
    var WHAT = "what";
    var FONT_SIZE = 40;
    var Shapes = function(_super) {
      __extends(Shapes, _super);
      function Shapes() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.imageButton = null;
        _this.textButton = null;
        return _this;
      }
      Shapes.prototype.onLoad = function() {
        this.audioDir = helper_1.HELP_DIR + profile_1.default.lang + "-help/" + helper_1.QUIZ_MATHS_DIR;
        this.quizConfig.choices = this.quizConfig.choices.replace(/,/g, "^");
        this.quizConfig.answer = this.quizConfig.answer.replace(/,/g, "^");
        var options = this.quizConfig.answer.split("^");
        this.quizConfig.answer = util_1.Util.randomElements(options, 1)[0];
        this.renderTopPanel();
        this.quizConfig.order === WHAT && this.renderImage();
        this.renderBottomPanel();
      };
      Shapes.prototype.renderImage = function() {
        var imageNode = this.node.getChildByName("image");
        quiz_helper_1.QuizHelper.loadAndResizeResourceImage(this.quizConfig, imageNode, this.assetDir, this.quizConfig.answer);
      };
      Shapes.prototype.renderTopPanel = function() {
        var topPanel = this.node.getChildByName("topPanel");
        this.renderSoundButton(topPanel);
        quiz_helper_1.QuizHelper.renderTextLabel(this.quizConfig, topPanel, LABEL_WIDTH);
      };
      Shapes.prototype.renderSoundButton = function(parent) {
        quiz_helper_1.QuizHelper.renderSoundButton(this.quizConfig, parent, this.audioDir);
      };
      Shapes.prototype.renderBottomPanel = function() {
        var bottomPanel = this.node.getChildByName("bottomPanel");
        switch (this.quizConfig.order) {
         case WHICH:
          quiz_helper_1.QuizHelper.renderImageChoices(this.quizConfig, this.imageButton, bottomPanel, this.assetDir, true);
          break;

         case WHAT:
          quiz_helper_1.QuizHelper.renderTextChoices(this.quizConfig, this.textButton, bottomPanel, WIDTH, HEIGHT, this.quizConfig.choices.split("^"), FONT_SIZE);
        }
      };
      __decorate([ property(cc.Prefab) ], Shapes.prototype, "imageButton", void 0);
      __decorate([ property(cc.Prefab) ], Shapes.prototype, "textButton", void 0);
      __decorate([ error_handler_1.default() ], Shapes.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], Shapes.prototype, "renderImage", null);
      __decorate([ error_handler_1.default() ], Shapes.prototype, "renderTopPanel", null);
      __decorate([ error_handler_1.default() ], Shapes.prototype, "renderSoundButton", null);
      __decorate([ error_handler_1.default() ], Shapes.prototype, "renderBottomPanel", null);
      Shapes = __decorate([ ccclass ], Shapes);
      return Shapes;
    }(cc.Component);
    exports.default = Shapes;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/helper": void 0,
    "../../../../common/scripts/lib/error-handler": void 0,
    "../../../../common/scripts/lib/profile": void 0,
    "../../../../common/scripts/util": void 0,
    "../../quizliteracy/scripts/quiz-helper": "quiz-helper"
  } ],
  soundonly_image: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e90195Z5Z1LAZPVlS9+8rKO", "soundonly_image");
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
    exports.SoundonlyImage = void 0;
    var ccclass = cc._decorator.ccclass;
    var quiz_helper_1 = require("./quiz-helper");
    var property = cc._decorator.property;
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var SoundonlyImage = function(_super) {
      __extends(SoundonlyImage, _super);
      function SoundonlyImage() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.imageButton = null;
        return _this;
      }
      SoundonlyImage.prototype.onLoad = function() {
        this.renderTopPanel();
        this.renderBottomPanel();
      };
      SoundonlyImage.prototype.renderTopPanel = function() {
        var topPanel = this.node.getChildByName("topPanel");
        this.renderSoundButton(topPanel);
      };
      SoundonlyImage.prototype.renderBottomPanel = function() {
        var bottomPanel = this.node.getChildByName("bottomPanel");
        quiz_helper_1.QuizHelper.renderImageChoices(this.quizConfig, this.imageButton, bottomPanel, this.assetDir);
      };
      SoundonlyImage.prototype.renderSoundButton = function(parent) {
        quiz_helper_1.QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir);
      };
      __decorate([ property(cc.Prefab) ], SoundonlyImage.prototype, "imageButton", void 0);
      __decorate([ error_handler_1.default() ], SoundonlyImage.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], SoundonlyImage.prototype, "renderTopPanel", null);
      __decorate([ error_handler_1.default() ], SoundonlyImage.prototype, "renderBottomPanel", null);
      __decorate([ error_handler_1.default() ], SoundonlyImage.prototype, "renderSoundButton", null);
      SoundonlyImage = __decorate([ ccclass ], SoundonlyImage);
      return SoundonlyImage;
    }(cc.Component);
    exports.SoundonlyImage = SoundonlyImage;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "./quiz-helper": "quiz-helper"
  } ],
  soundonly_sentence: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7460dK/q59Ghr3LtJunGBYo", "soundonly_sentence");
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
    exports.SoundonlySentence = void 0;
    var ccclass = cc._decorator.ccclass;
    var quiz_helper_1 = require("./quiz-helper");
    var property = cc._decorator.property;
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var WIDTH = 850;
    var HEIGHT = 85;
    var SoundonlySentence = function(_super) {
      __extends(SoundonlySentence, _super);
      function SoundonlySentence() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.textButton = null;
        return _this;
      }
      SoundonlySentence.prototype.onLoad = function() {
        this.renderTopPanel();
        this.renderBottomPanel();
      };
      SoundonlySentence.prototype.renderTopPanel = function() {
        var topPanel = this.node.getChildByName("topPanel");
        this.renderSoundButton(topPanel);
      };
      SoundonlySentence.prototype.renderBottomPanel = function() {
        var bottomPanel = this.node.getChildByName("bottomPanel");
        quiz_helper_1.QuizHelper.renderTextChoices(this.quizConfig, this.textButton, bottomPanel, WIDTH, HEIGHT, this.quizConfig.choices.split("^"));
      };
      SoundonlySentence.prototype.renderSoundButton = function(parent) {
        quiz_helper_1.QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir);
      };
      __decorate([ property(cc.Prefab) ], SoundonlySentence.prototype, "textButton", void 0);
      __decorate([ error_handler_1.default() ], SoundonlySentence.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], SoundonlySentence.prototype, "renderTopPanel", null);
      __decorate([ error_handler_1.default() ], SoundonlySentence.prototype, "renderBottomPanel", null);
      __decorate([ error_handler_1.default() ], SoundonlySentence.prototype, "renderSoundButton", null);
      SoundonlySentence = __decorate([ ccclass ], SoundonlySentence);
      return SoundonlySentence;
    }(cc.Component);
    exports.SoundonlySentence = SoundonlySentence;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "./quiz-helper": "quiz-helper"
  } ],
  soundonly_word: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a5de1pZ1+FJbZvaKw7p8V24", "soundonly_word");
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
    exports.SoundonlyWord = void 0;
    var ccclass = cc._decorator.ccclass;
    var quiz_helper_1 = require("./quiz-helper");
    var property = cc._decorator.property;
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var SoundonlyWord = function(_super) {
      __extends(SoundonlyWord, _super);
      function SoundonlyWord() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.textButton = null;
        return _this;
      }
      SoundonlyWord.prototype.onLoad = function() {
        this.renderTopPanel();
        this.renderBottomPanel();
      };
      SoundonlyWord.prototype.renderTopPanel = function() {
        var topPanel = this.node.getChildByName("topPanel");
        this.renderSoundButton(topPanel);
      };
      SoundonlyWord.prototype.renderBottomPanel = function() {
        var bottomPanel = this.node.getChildByName("bottomPanel");
        var cs = this.quizConfig.choices.split("^");
        quiz_helper_1.QuizHelper.renderTextChoices(this.quizConfig, this.textButton, bottomPanel, 250, 250, cs);
      };
      SoundonlyWord.prototype.renderSoundButton = function(parent) {
        quiz_helper_1.QuizHelper.renderSoundButton(this.quizConfig, parent, "" + this.assetDir);
      };
      __decorate([ property(cc.Prefab) ], SoundonlyWord.prototype, "textButton", void 0);
      __decorate([ error_handler_1.default() ], SoundonlyWord.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], SoundonlyWord.prototype, "renderTopPanel", null);
      __decorate([ error_handler_1.default() ], SoundonlyWord.prototype, "renderBottomPanel", null);
      __decorate([ error_handler_1.default() ], SoundonlyWord.prototype, "renderSoundButton", null);
      SoundonlyWord = __decorate([ ccclass ], SoundonlyWord);
      return SoundonlyWord;
    }(cc.Component);
    exports.SoundonlyWord = SoundonlyWord;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "./quiz-helper": "quiz-helper"
  } ],
  "word-image": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "736beIpb/lH1Io1Ne9StIw1", "word-image");
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
    exports.WordImage = void 0;
    var ccclass = cc._decorator.ccclass;
    var quiz_helper_1 = require("./quiz-helper");
    var property = cc._decorator.property;
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var LABEL_WIDTH = 750;
    var WordImage = function(_super) {
      __extends(WordImage, _super);
      function WordImage() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.imageButton = null;
        return _this;
      }
      WordImage.prototype.onLoad = function() {
        this.renderTopPanel();
        this.renderBottomPanel();
      };
      WordImage.prototype.renderTopPanel = function() {
        var topPanel = this.node.getChildByName("topPanel");
        this.renderSoundButton(topPanel);
        this.renderLabel(topPanel);
      };
      WordImage.prototype.renderBottomPanel = function() {
        var bottomPanel = this.node.getChildByName("bottomPanel");
        quiz_helper_1.QuizHelper.renderImageChoices(this.quizConfig, this.imageButton, bottomPanel, this.assetDir);
      };
      WordImage.prototype.renderSoundButton = function(parent) {
        quiz_helper_1.QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir);
      };
      WordImage.prototype.renderLabel = function(parent) {
        quiz_helper_1.QuizHelper.renderTextLabel(this.quizConfig, parent, LABEL_WIDTH);
      };
      __decorate([ property(cc.Prefab) ], WordImage.prototype, "imageButton", void 0);
      __decorate([ error_handler_1.default() ], WordImage.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], WordImage.prototype, "renderTopPanel", null);
      __decorate([ error_handler_1.default() ], WordImage.prototype, "renderBottomPanel", null);
      __decorate([ error_handler_1.default() ], WordImage.prototype, "renderSoundButton", null);
      __decorate([ error_handler_1.default() ], WordImage.prototype, "renderLabel", null);
      WordImage = __decorate([ ccclass ], WordImage);
      return WordImage;
    }(cc.Component);
    exports.WordImage = WordImage;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "./quiz-helper": "quiz-helper"
  } ],
  "word-problem": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "01fb3XQBs1EcJJEpgVPQBDO", "word-problem");
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
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var quiz_maths_1 = require("./quiz-maths");
    var math_drag_1 = require("./math-drag");
    var property = cc._decorator.property;
    var quiz_literacy_1 = require("../../quizliteracy/scripts/quiz-literacy");
    var quiz_helper_1 = require("../../quizliteracy/scripts/quiz-helper");
    var DRAG_HEIGHT = 150;
    var DRAG_WIDTH = 75;
    var LABEL_WIDTH = 850;
    var WordProblem = function(_super) {
      __extends(WordProblem, _super);
      function WordProblem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mathDrag = null;
        _this.mathDrop = null;
        _this.individualNumbers = [];
        _this.correctDrops = new Map();
        return _this;
      }
      WordProblem.prototype.onLoad = function() {
        var _this = this;
        this.individualNumbers = this.quizConfig.answer.split("");
        this.node.on(math_drag_1.MATH_MATCH, function(event) {
          event.stopPropagation();
          var data = event.getUserData();
          _this.correctDrops.set(data.drop, data.isCorrect);
          if (Array.from(_this.correctDrops.keys()).length === _this.individualNumbers.length) {
            var allCorrect = Array.from(_this.correctDrops.values()).every(function(n) {
              return true === n;
            });
            allCorrect ? _this.node.dispatchEvent(new cc.Event.EventCustom(quiz_maths_1.QUIZ_CORRECT, true)) : _this.node.dispatchEvent(new cc.Event.EventCustom(quiz_literacy_1.QUIZ_WRONG, true));
          }
        });
        this.node.on(math_drag_1.MATH_NO_MATCH, function(event) {
          event.stopPropagation();
          var data = event.getUserData();
          var splits = data.drop.split("_");
          splits && 2 === splits.length && splits[0].length > 0 && splits[1].length > 0 && _this.correctDrops.forEach(function(value, key) {
            key.endsWith(splits[1]) && _this.correctDrops.delete(key);
          });
        });
        this.renderTopPanel();
        this.renderDropPanel();
        this.renderDragPanel();
      };
      WordProblem.prototype.renderTopPanel = function() {
        var topPanel = this.node.getChildByName("topPanel");
        this.renderSoundButton(topPanel);
        quiz_helper_1.QuizHelper.renderTextLabel(this.quizConfig, topPanel, LABEL_WIDTH, "#000000", "label", 50);
      };
      WordProblem.prototype.renderSoundButton = function(parent) {
        quiz_helper_1.QuizHelper.renderSoundButton(this.quizConfig, parent, this.assetDir);
      };
      WordProblem.prototype.renderDragPanel = function() {
        var dragPanel = this.node.getChildByName("dragPanel");
        var options = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ].map(function(a) {
          return String(a);
        });
        quiz_helper_1.QuizHelper.renderDragChoices(this.quizConfig, this.mathDrag, dragPanel, DRAG_WIDTH + 10, DRAG_HEIGHT, options, false, true);
      };
      WordProblem.prototype.renderDropPanel = function() {
        var dropPanel = null;
        dropPanel = this.node.getChildByName("hDropPanel");
        dropPanel.active = true;
        dropPanel.opacity = 255;
        if (dropPanel) {
          var missingPanel = dropPanel.getChildByName("missingPanel");
          quiz_helper_1.QuizHelper.renderDropChoices(this.quizConfig, this.mathDrop, missingPanel, DRAG_WIDTH + 10, DRAG_HEIGHT, this.individualNumbers);
        }
      };
      __decorate([ property(cc.Prefab) ], WordProblem.prototype, "mathDrag", void 0);
      __decorate([ property(cc.Prefab) ], WordProblem.prototype, "mathDrop", void 0);
      __decorate([ error_handler_1.default() ], WordProblem.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], WordProblem.prototype, "renderTopPanel", null);
      __decorate([ error_handler_1.default() ], WordProblem.prototype, "renderSoundButton", null);
      __decorate([ error_handler_1.default() ], WordProblem.prototype, "renderDragPanel", null);
      __decorate([ error_handler_1.default() ], WordProblem.prototype, "renderDropPanel", null);
      WordProblem = __decorate([ ccclass ], WordProblem);
      return WordProblem;
    }(cc.Component);
    exports.default = WordProblem;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "../../quizliteracy/scripts/quiz-helper": "quiz-helper",
    "../../quizliteracy/scripts/quiz-literacy": "quiz-literacy",
    "./math-drag": "math-drag",
    "./quiz-maths": "quiz-maths"
  } ],
  word_word: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d82ebBOXxlIZ5CBJkKW4OS6", "word_word");
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
    exports.WordWord = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var quiz_helper_1 = require("./quiz-helper");
    var error_handler_1 = require("../../../../common/scripts/lib/error-handler");
    var WIDTH = 250;
    var HEIGHT = 250;
    var LABEL_WIDTH = 750;
    var WordWord = function(_super) {
      __extends(WordWord, _super);
      function WordWord() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.textButton = null;
        return _this;
      }
      WordWord.prototype.onLoad = function() {
        this.renderTopPanel();
        this.renderBottomPanel();
      };
      WordWord.prototype.renderTopPanel = function() {
        var topPanel = this.node.getChildByName("topPanel");
        this.renderSoundButton(topPanel);
        this.renderLabel(topPanel);
      };
      WordWord.prototype.renderBottomPanel = function() {
        var bottomPanel = this.node.getChildByName("bottomPanel");
        quiz_helper_1.QuizHelper.renderTextChoices(this.quizConfig, this.textButton, bottomPanel, 250, 250, this.quizConfig.choices.split("^"));
      };
      WordWord.prototype.renderSoundButton = function(parent) {
        quiz_helper_1.QuizHelper.renderSoundButton(this.quizConfig, parent, "" + this.assetDir);
      };
      WordWord.prototype.renderLabel = function(parent) {
        quiz_helper_1.QuizHelper.renderTextLabel(this.quizConfig, parent, LABEL_WIDTH);
      };
      __decorate([ property(cc.Prefab) ], WordWord.prototype, "textButton", void 0);
      __decorate([ error_handler_1.default() ], WordWord.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], WordWord.prototype, "renderTopPanel", null);
      __decorate([ error_handler_1.default() ], WordWord.prototype, "renderBottomPanel", null);
      __decorate([ error_handler_1.default() ], WordWord.prototype, "renderSoundButton", null);
      __decorate([ error_handler_1.default() ], WordWord.prototype, "renderLabel", null);
      WordWord = __decorate([ ccclass ], WordWord);
      return WordWord;
    }(cc.Component);
    exports.WordWord = WordWord;
    cc._RF.pop();
  }, {
    "../../../../common/scripts/lib/error-handler": void 0,
    "./quiz-helper": "quiz-helper"
  } ]
}, {}, [ "Listening_com_sequence", "image", "image_sentence", "image_word", "imageseq-sentence", "imageseq_image", "ordering-drag", "ordering-drop", "ordering_sequence", "paragraph_sequence", "quiz-helper", "quiz-literacy-button", "quiz-literacy", "quiz-sound", "sentence_sentence", "sentence_word", "soundonly_image", "soundonly_sentence", "soundonly_word", "word-image", "word_word", "bigger-or-smaller", "compare_number_magnitudes", "digit-numbers", "math-drag", "math-drop", "missing_number", "number-identification", "operation-with-objects", "operations-drag", "quiz-maths", "recognize-number", "shapes", "word-problem" ]);