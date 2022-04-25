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
  left: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2772dr2wV5DJ5pXYoO3qIJg", "left");
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
    var Left = function(_super) {
      __extends(Left, _super);
      function Left() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Left.prototype.onLoad = function() {};
      Left = __decorate([ ccclass ], Left);
      return Left;
    }(cc.Component);
    exports.default = Left;
    cc._RF.pop();
  }, {} ],
  "nav-button": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "faaebRKxZ5Mh6CYTO/nCbf6", "nav-button");
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
    var story_page_1 = require("./story-page");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var handleClick = true;
    var NavButton = function(_super) {
      __extends(NavButton, _super);
      function NavButton() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NavButton.prototype.onLoad = function() {
        handleClick = true;
      };
      NavButton.prototype.onClick = function(event, customEventData) {
        if (handleClick) {
          handleClick = false;
          var storyComponent = this.node.parent.getComponent(story_page_1.StoryPage);
          storyComponent.changePage(Number(customEventData));
        }
      };
      __decorate([ error_handler_1.default() ], NavButton.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], NavButton.prototype, "onClick", null);
      NavButton = __decorate([ ccclass ], NavButton);
      return NavButton;
    }(cc.Component);
    exports.default = NavButton;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/error-handler": void 0,
    "./story-page": "story-page"
  } ],
  right: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "69f6e/u5kpACIaUR+dUW1em", "right");
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
    var chimple_richtext_1 = require("../../../common/scripts/chimple-richtext");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Right = function(_super) {
      __extends(Right, _super);
      function Right() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lastIndex = -1;
        _this.storyText = null;
        _this.words = null;
        return _this;
      }
      Right.prototype.Handler = function(event, param) {
        var params = param.split("_");
        var word = params[0];
        var index = params[1];
        this.speakAndHighLight(word, index, "#000000", "#ff0000");
      };
      Right.prototype.speakAndHighLight = function(word, index, color1, color2) {
        var _this = this;
        cc.log("storyText", this.storyText, "word to highlight", word);
        this.highlight(word, index, color1, color2);
        var soundClip = this.words.get(word);
        try {
          if (!soundClip) this.noHighlight(word, index, "#ff0000", "#000000"); else {
            var soundId = cc.audioEngine.playEffect(soundClip, false);
            cc.audioEngine.setFinishCallback(soundId, function() {
              _this.noHighlight(word, index, "#ff0000", "#000000");
            });
          }
        } catch (e) {}
      };
      Right.prototype.highlight = function(word, index, color1, color2, shouldCheckIndex) {
        void 0 === shouldCheckIndex && (shouldCheckIndex = false);
        var replaceString = 'color="' + color1 + '" param="' + word + "_" + index + '"';
        var replaceWithString = 'color="' + color2 + '" param="' + word + "_" + index + '"';
        if (shouldCheckIndex) {
          this.lastIndex > -1 ? this.node.getComponent(chimple_richtext_1.default).string = this.storyText.slice(0, this.lastIndex) + this.storyText.slice(this.lastIndex).replace(replaceString, replaceWithString) : this.node.getComponent(chimple_richtext_1.default).string = this.storyText.replace(replaceString, replaceWithString);
          cc.log("this.storyText after highlight", this.node.getComponent(chimple_richtext_1.default).string);
          this.lastIndex = this.storyText.indexOf(word) > this.lastIndex ? this.storyText.indexOf(word) : this.lastIndex;
        } else this.node.getComponent(chimple_richtext_1.default).string = this.storyText.replace(replaceString, replaceWithString);
      };
      Right.prototype.noHighlight = function(word, index, color1, color2) {
        var replaceString = 'color="' + color1 + '" param="' + word + "_" + index + '"';
        var replaceWithString = 'color="' + color2 + '" param="' + word + "_" + index + '"';
        this.node.getComponent(chimple_richtext_1.default).string = this.storyText.replace(replaceString, replaceWithString);
        cc.log("this.storyText after no highlight", this.node.getComponent(chimple_richtext_1.default).string);
      };
      __decorate([ error_handler_1.default() ], Right.prototype, "Handler", null);
      __decorate([ error_handler_1.default() ], Right.prototype, "speakAndHighLight", null);
      __decorate([ error_handler_1.default() ], Right.prototype, "highlight", null);
      __decorate([ error_handler_1.default() ], Right.prototype, "noHighlight", null);
      Right = __decorate([ ccclass ], Right);
      return Right;
    }(cc.Component);
    exports.default = Right;
    cc._RF.pop();
  }, {
    "../../../common/scripts/chimple-richtext": void 0,
    "../../../common/scripts/lib/error-handler": void 0
  } ],
  selector: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "31778Y2NMdLW7xWIl8F58d2", "selector");
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
    exports.Selector = exports.ConfigType = void 0;
    var ccclass = cc._decorator.ccclass;
    var config_1 = require("../../../common/scripts/lib/config");
    var property = cc._decorator.property;
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var ConfigType;
    (function(ConfigType) {
      ConfigType[ConfigType["Story"] = 0] = "Story";
      ConfigType[ConfigType["Quiz"] = 1] = "Quiz";
    })(ConfigType = exports.ConfigType || (exports.ConfigType = {}));
    var Selector = function(_super) {
      __extends(Selector, _super);
      function Selector() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.storyPage = null;
        _this.quizPage = null;
        _this.draw = null;
        return _this;
      }
      Selector.prototype.onLoad = function() {
        var config = config_1.default.getInstance();
        var type = this.processConfiguration(config.data[0]);
        var graphicsNode = cc.instantiate(this.draw);
        graphicsNode.zIndex = 2;
        this.node.addChild(graphicsNode);
        if (type === ConfigType.Story) {
          var story = cc.instantiate(this.storyPage);
          story.zIndex = 1;
          this.node.addChild(story);
        } else if (type === ConfigType.Quiz) {
          var quiz = cc.instantiate(this.quizPage);
          quiz.zIndex = 1;
          this.node.addChild(quiz);
        }
      };
      Selector.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var name = configurations[0], level = configurations[1], description = configurations[2], type = configurations[3], params = configurations.slice(4);
        return "S" === type ? ConfigType.Story : ConfigType.Quiz;
      };
      __decorate([ property(cc.Prefab) ], Selector.prototype, "storyPage", void 0);
      __decorate([ property(cc.Prefab) ], Selector.prototype, "quizPage", void 0);
      __decorate([ property(cc.Prefab) ], Selector.prototype, "draw", void 0);
      __decorate([ error_handler_1.default() ], Selector.prototype, "onLoad", null);
      Selector = __decorate([ ccclass ], Selector);
      return Selector;
    }(cc.Component);
    exports.Selector = Selector;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0
  } ],
  "story-page": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7d2edAAWHhOoawyDyowtMdn", "story-page");
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
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    var __values = this && this.__values || function(o) {
      var s = "function" === typeof Symbol && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && "number" === typeof o.length) return {
        next: function() {
          o && i >= o.length && (o = void 0);
          return {
            value: o && o[i++],
            done: !o
          };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.StoryPage = exports.LANDSCAPE = exports.PORTRAIT = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var config_1 = require("../../../common/scripts/lib/config");
    var right_1 = require("./right");
    var util_1 = require("../../../common/scripts/util");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var helper_1 = require("../../../common/scripts/helper");
    var chimple_richtext_1 = require("../../../common/scripts/chimple-richtext");
    exports.PORTRAIT = "P";
    exports.LANDSCAPE = "L";
    var StoryPage = function(_super) {
      __extends(StoryPage, _super);
      function StoryPage() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.landscape = null;
        _this.portrait = null;
        _this.word = null;
        _this.lleft = null;
        _this.lright = null;
        _this.pleft = null;
        _this.pright = null;
        _this.nextButton = null;
        _this.prevButton = null;
        _this._inOrderWords = [];
        _this._words = new Map();
        _this._storyContent = null;
        _this._isSideBySide = true;
        _this._rightComponent = null;
        _this._storyDir = null;
        _this._soundDir = null;
        _this._ableToSpeakAnyIndividualClip = -1;
        _this._imageNode = null;
        _this._textNode = null;
        _this.displayIterator = function(array, from, to, step) {
          var _a;
          void 0 === to && (to = Infinity);
          void 0 === step && (step = 1);
          return _a = {}, _a[Symbol.iterator] = function() {
            var done = false;
            var value = 0;
            return {
              next: function() {
                value = from;
                done = from >= to;
                from = done ? value : from + step;
                return {
                  done: done,
                  value: array[value],
                  index: value
                };
              }
            };
          }, _a;
        };
        return _this;
      }
      StoryPage.prototype.onLoad = function() {
        var _this = this;
        var config = config_1.default.getInstance();
        this._storyConfig = this.processConfiguration(config.data[0]);
        this._storyDir = config_1.default.dir + (config.lesson.id + "/res/");
        this._soundDir = config_1.default.dir + (config.lesson.id + "/res/") + this._storyConfig.pageNo + "/";
        this._isSideBySide = this._storyConfig.layout === exports.LANDSCAPE;
        this._isSideBySide ? this._storyContent = cc.instantiate(this.landscape) : this._storyContent = cc.instantiate(this.portrait);
        this.node.on(helper_1.SOUND_LOADED_EVENT, function() {
          _this.showText();
        });
        this.initLayout();
        this.renderNextPrevButtons();
      };
      StoryPage.prototype.renderText = function() {
        var _this = this;
        var textNode = null;
        var config = config_1.default.getInstance();
        if (this._storyConfig.text) {
          textNode = this._storyConfig.layout === exports.LANDSCAPE ? cc.instantiate(this.lright) : cc.instantiate(this.pright);
          var texts_1 = this._storyConfig.text.split(" ");
          this._rightComponent = textNode.getComponent(right_1.default);
          texts_1.forEach(function(t, index) {
            t = t.toString().replace(/"/g, "");
            _this._inOrderWords.push(t);
            try {
              util_1.Util.loadGameSound(_this._soundDir + index + ".m4a", function(clip) {
                _this._words.set(t, clip);
                index === texts_1.length - 1 && _this.node.emit(helper_1.SOUND_LOADED_EVENT);
              });
            } catch (e) {}
          });
        }
        return textNode;
      };
      StoryPage.prototype.renderImage = function() {
        var imageNode = null;
        if (this._storyConfig.image) {
          imageNode = this._storyConfig.layout === exports.LANDSCAPE ? cc.instantiate(this.lleft) : cc.instantiate(this.pleft);
          var picWidth_1 = imageNode.width;
          var picHeight_1 = imageNode.height;
          util_1.Util.loadTexture(this._storyDir + this._storyConfig.image, function(texture) {
            if (texture) {
              var sprite = imageNode.getComponent(cc.Sprite);
              sprite.spriteFrame = new cc.SpriteFrame(texture);
              var size = sprite.spriteFrame.getOriginalSize();
              var xScale = picWidth_1 / size.width;
              var yScale = picHeight_1 / size.height;
              var scale = Math.min(xScale, yScale);
              imageNode.width = scale * size.width;
              imageNode.height = scale * size.height;
            }
          });
        }
        return imageNode;
      };
      StoryPage.prototype.isTitlePage = function() {
        return "1" === this._storyConfig.pageNo;
      };
      StoryPage.prototype.isLastPage = function() {
        var config = config_1.default.getInstance();
        return Number(this._storyConfig.pageNo) === config.totalProblems;
      };
      StoryPage.prototype.renderNextPrevButtons = function() {
        var config = config_1.default.getInstance();
        var next = null;
        var prev = null;
        if (this.isTitlePage()) {
          next = cc.instantiate(this.nextButton);
          next.active = false;
        } else if (this.isLastPage()) {
          prev = cc.instantiate(this.prevButton);
          next = cc.instantiate(this.nextButton);
          next.active = false;
          prev.active = false;
        } else {
          next = cc.instantiate(this.nextButton);
          prev = cc.instantiate(this.prevButton);
          next.active = false;
          prev.active = false;
        }
        if (next) {
          this.node.addChild(next);
          this.scheduleOnce(function() {
            next.active = true;
          }, .5);
        }
        if (prev) {
          this.node.addChild(prev);
          this.scheduleOnce(function() {
            prev.active = true;
          }, .5);
        }
      };
      StoryPage.prototype.changePage = function(direction) {
        cc.audioEngine.stopAll();
        cc.log("direction", direction);
        direction > 0 ? this.node.parent.emit("nextProblem") : this.node.parent.emit("prevProblem");
      };
      StoryPage.prototype.initLayout = function() {
        this._isSideBySide = this._storyConfig.layout === exports.LANDSCAPE;
        this._isSideBySide ? this._storyContent = cc.instantiate(this.landscape) : this._storyContent = cc.instantiate(this.portrait);
        var sheet = this.node.getChildByName("sheet");
        sheet ? sheet.addChild(this._storyContent) : this.node.addChild(this._storyContent);
        this._imageNode = this.renderImage();
        this._textNode = this.renderText();
        if (this.isTitlePage()) {
          this._storyContent.addChild(this._textNode);
          this._storyContent.addChild(this._imageNode);
        } else {
          this._storyContent.addChild(this._imageNode);
          this._storyContent.addChild(this._textNode);
        }
      };
      StoryPage.prototype.showText = function() {
        var _this = this;
        if (this._textNode) {
          var tokenized = this.createTextToken(this._storyConfig.text);
          this._textNode.getComponent(chimple_richtext_1.default).string = tokenized;
          this._rightComponent.storyText = JSON.parse(JSON.stringify(tokenized));
          this._rightComponent.words = this._words;
          this.scheduleOnce(function() {
            var iterator = _this.displayIterator(_this._inOrderWords, 0, _this._inOrderWords.length)[Symbol.iterator]();
            _this.speakWordOneByOne(iterator);
          }, 1);
        }
      };
      StoryPage.prototype.gen = function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
           case 0:
            return [ 5, __values(this._inOrderWords) ];

           case 1:
            _a.sent();
            return [ 2 ];
          }
        });
      };
      StoryPage.prototype.speakWordOneByOne = function(iterator) {
        var _this = this;
        var next = iterator.next();
        if (!next || next.done || !next.value) this.speakFullSentenceWithoutHighlight(); else {
          var word_1 = next.value;
          if (this._words) {
            var clip = this._words.get(word_1);
            this.speak(word_1, next.index, clip, function() {
              _this._rightComponent && _this._rightComponent.noHighlight(word_1, next.index, "#ff0000", "#000000");
              _this.speakWordOneByOne(iterator);
            });
          }
        }
      };
      StoryPage.prototype.speakFullSentenceWithoutHighlight = function() {
        var _this = this;
        var sounds = [];
        if (-1 === this._ableToSpeakAnyIndividualClip) {
          sounds = this._storyConfig.storySoundFile.map(function(sf) {
            var storySoundFile = _this._storyDir + sf;
            return storySoundFile;
          });
          util_1.Util.speakOneByOne(sounds, 0, function(index) {});
        }
      };
      StoryPage.prototype.speak = function(word, index, clip, callback) {
        if (null !== clip) {
          var audioId = cc.audioEngine.playEffect(clip, false);
          if (-1 !== audioId) {
            this._rightComponent && this._rightComponent.highlight(word, index, "#000000", "#ff0000", true);
            this._ableToSpeakAnyIndividualClip = 1;
            cc.audioEngine.setFinishCallback(audioId, callback);
          } else this.errorInSpeakClip(callback);
        } else this.errorInSpeakClip(callback);
      };
      StoryPage.prototype.errorInSpeakClip = function(callback) {
        1 !== this._ableToSpeakAnyIndividualClip && (this._ableToSpeakAnyIndividualClip = -1);
        this.scheduleOnce(function() {
          callback();
        }, .25);
      };
      StoryPage.prototype.createTextToken = function(text) {
        text.replace;
        var token = text.split(/\s+/).map(function(t, i) {
          t = t.toString().replace(/"/g, "");
          return '<color="#000000" param="' + t + "_" + i + '" click="Handler">' + t + "</color>";
        }).join(" ");
        return token;
      };
      StoryPage.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var name = configurations[0], level = configurations[1], description = configurations[2], pageNo = configurations[3], type = configurations[4], text = configurations[5], image = configurations[6], layout = configurations[7], storySound = configurations[8];
        var storySoundFile = storySound.split(",");
        return {
          pageNo: pageNo,
          text: text,
          image: image,
          layout: layout,
          storySoundFile: storySoundFile
        };
      };
      StoryPage.prototype.onDestroy = function() {
        cc.audioEngine.stopAll();
      };
      __decorate([ property(cc.Prefab) ], StoryPage.prototype, "landscape", void 0);
      __decorate([ property(cc.Prefab) ], StoryPage.prototype, "portrait", void 0);
      __decorate([ property(cc.Prefab) ], StoryPage.prototype, "word", void 0);
      __decorate([ property(cc.Prefab) ], StoryPage.prototype, "lleft", void 0);
      __decorate([ property(cc.Prefab) ], StoryPage.prototype, "lright", void 0);
      __decorate([ property(cc.Prefab) ], StoryPage.prototype, "pleft", void 0);
      __decorate([ property(cc.Prefab) ], StoryPage.prototype, "pright", void 0);
      __decorate([ property(cc.Prefab) ], StoryPage.prototype, "nextButton", void 0);
      __decorate([ property(cc.Prefab) ], StoryPage.prototype, "prevButton", void 0);
      __decorate([ error_handler_1.default() ], StoryPage.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], StoryPage.prototype, "renderText", null);
      __decorate([ error_handler_1.default() ], StoryPage.prototype, "renderImage", null);
      __decorate([ error_handler_1.default() ], StoryPage.prototype, "isTitlePage", null);
      __decorate([ error_handler_1.default() ], StoryPage.prototype, "isLastPage", null);
      __decorate([ error_handler_1.default() ], StoryPage.prototype, "renderNextPrevButtons", null);
      __decorate([ error_handler_1.default() ], StoryPage.prototype, "changePage", null);
      __decorate([ error_handler_1.default() ], StoryPage.prototype, "initLayout", null);
      __decorate([ error_handler_1.default() ], StoryPage.prototype, "showText", null);
      __decorate([ error_handler_1.default() ], StoryPage.prototype, "speakWordOneByOne", null);
      __decorate([ error_handler_1.default() ], StoryPage.prototype, "speakFullSentenceWithoutHighlight", null);
      __decorate([ error_handler_1.default() ], StoryPage.prototype, "speak", null);
      __decorate([ error_handler_1.default() ], StoryPage.prototype, "errorInSpeakClip", null);
      __decorate([ error_handler_1.default() ], StoryPage.prototype, "createTextToken", null);
      StoryPage = __decorate([ ccclass ], StoryPage);
      return StoryPage;
    }(cc.Component);
    exports.StoryPage = StoryPage;
    cc._RF.pop();
  }, {
    "../../../common/scripts/chimple-richtext": void 0,
    "../../../common/scripts/helper": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./right": "right"
  } ],
  "word-script": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b36ed1TDEVOB6AfUnNMv5iA", "word-script");
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
    var WordScript = function(_super) {
      __extends(WordScript, _super);
      function WordScript() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      WordScript.prototype.onButtonClick = function(event, customEventData) {};
      WordScript = __decorate([ ccclass ], WordScript);
      return WordScript;
    }(cc.Component);
    exports.default = WordScript;
    cc._RF.pop();
  }, {} ]
}, {}, [ "left", "nav-button", "right", "selector", "story-page", "word-script" ]);