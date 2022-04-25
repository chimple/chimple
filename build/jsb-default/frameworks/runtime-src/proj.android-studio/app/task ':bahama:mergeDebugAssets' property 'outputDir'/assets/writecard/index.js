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
  lettertracingbackcard: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "acec3FaEClIN4cjiOVY6VX8", "lettertracingbackcard");
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
    exports.LetterTracingBackCard = void 0;
    var ccclass = cc._decorator.ccclass;
    var Color = cc.Color;
    var util_1 = require("../../../common/scripts/util");
    var writecard_1 = require("./writecard");
    var helper_1 = require("../../../common/scripts/helper");
    var lessonController_1 = require("../../../common/scripts/lessonController");
    var LetterTracingBackCard = function(_super) {
      __extends(LetterTracingBackCard, _super);
      function LetterTracingBackCard() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._sound = null;
        _this._textNode = null;
        return _this;
      }
      LetterTracingBackCard.prototype.onLoad = function() {
        var _this = this;
        this._WriteCard = this.node.parent.getComponent(writecard_1.WriteCard);
        var imageFace = this.node.getChildByName("imageFace");
        null != imageFace && (this._image = imageFace.getChildByName("image"));
        this._textNode = this.node.getChildByName("textNode");
        this.node.parent.on(helper_1.CONFIG_LOADED, function() {
          _this._optionText = _this._WriteCard.currentConfig.options[_this.optionIndex];
          var imageText = _this._WriteCard.currentConfig.images[_this.optionIndex];
          var sound = _this._WriteCard.currentConfig.sounds[_this.optionIndex];
          var label = _this._textNode.getComponent(cc.Label);
          label.string = _this._optionText;
          _this._textNode.color = helper_1.DEFAULT_FONT_COLOR;
          _this.loadImage(imageText);
          _this.loadSounds(sound);
        });
      };
      LetterTracingBackCard.prototype.loadImage = function(imageName) {
        var _this = this;
        !imageName || util_1.Util.loadTexture(imageName, function(texture) {
          if (!!texture) {
            var sprite = _this._image.getComponent(cc.Sprite);
            sprite.spriteFrame = new cc.SpriteFrame(texture);
            util_1.Util.resizeSprite(sprite, 400, 333);
          }
        });
      };
      LetterTracingBackCard.prototype.loadSounds = function(text) {
        var _this = this;
        util_1.Util.loadGameSound(text.toLowerCase(), function(clip) {
          _this._sound = clip;
          _this.node.emit("soundLoaded");
        });
      };
      Object.defineProperty(LetterTracingBackCard.prototype, "optionIndex", {
        get: function() {
          return this._optionIndex;
        },
        set: function(index) {
          this._optionIndex = index;
        },
        enumerable: false,
        configurable: true
      });
      LetterTracingBackCard.prototype.animateText = function() {
        new cc.Tween().target(this._textNode).to(.1, {
          color: Color.RED
        }, {
          progress: null,
          easing: "sineOut"
        }).to(.15, {
          scale: 1.25
        }, {
          progress: null,
          easing: "sineOut"
        }).to(.15, {
          scale: 1
        }, {
          progress: null,
          easing: "sineOut"
        }).to(.1, {
          color: helper_1.DEFAULT_FONT_COLOR
        }, {
          progress: null,
          easing: "sineOut"
        }).start();
      };
      LetterTracingBackCard.prototype.pronounce = function() {
        lessonController_1.default.getFriend().speak(this._sound);
      };
      LetterTracingBackCard.prototype.onDestroy = function() {
        cc.audioEngine.stopAllEffects();
      };
      LetterTracingBackCard = __decorate([ ccclass ], LetterTracingBackCard);
      return LetterTracingBackCard;
    }(cc.Component);
    exports.LetterTracingBackCard = LetterTracingBackCard;
    cc._RF.pop();
  }, {
    "../../../common/scripts/helper": void 0,
    "../../../common/scripts/lessonController": void 0,
    "../../../common/scripts/util": void 0,
    "./writecard": "writecard"
  } ],
  lettertracingfrontcard: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a753819skdEkpyGIbDDs8N8", "lettertracingfrontcard");
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
    exports.LetterTracingFrontCard = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var writecard_1 = require("./writecard");
    var util_1 = require("../../../common/scripts/util");
    var helper_1 = require("../../../common/scripts/helper");
    var tracing_container_1 = require("../../../common/Tracing/scripts/tracing-container");
    var lessonController_1 = require("../../../common/scripts/lessonController");
    var trace_graphics_1 = require("../../../common/Tracing/scripts/trace-graphics");
    var LetterTracingFrontCard = function(_super) {
      __extends(LetterTracingFrontCard, _super);
      function LetterTracingFrontCard() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._tracingContainer = null;
        _this._traceGraphics = null;
        _this._sound = null;
        return _this;
      }
      LetterTracingFrontCard.prototype.onLoad = function() {
        var _this = this;
        this._WriteCard = this.node.parent.getComponent(writecard_1.WriteCard);
        this._tracingContainer = cc.instantiate(this.tracingContainerPrefab);
        this.node.parent.on(helper_1.CONFIG_LOADED, function() {
          _this.setAlphabetToDisplay(_this._WriteCard.currentConfig.traceText);
          _this.loadSounds(_this._WriteCard.currentConfig.traceText);
          _this.subScribeToTracingEvents();
        });
      };
      LetterTracingFrontCard.prototype.subScribeToTracingEvents = function() {
        var _this = this;
        this.node.on(helper_1.TRACING_FINISHED, function(event) {
          event.stopPropagation();
          _this.tracingFinished();
        });
        this.node.on(helper_1.TRACING_CORRECT, function(event) {
          event.stopPropagation();
          _this.node.parent.emit("correct");
        });
        this.node.on(helper_1.TRACING_WRONG, function(event) {
          event.stopPropagation();
          _this.node.parent.emit("wrong");
        });
        this.node.on(helper_1.RESET_TRACING_ALLOWED, function() {
          null !== _this.node.getChildByName("reeetTracingButton") && (_this.node.getChildByName("reeetTracingButton").opacity = 255);
        });
        this.node.on(helper_1.RESET_TRACING_NOT_ALLOWED, function() {
          null !== _this.node.getChildByName("reeetTracingButton") && (_this.node.getChildByName("reeetTracingButton").opacity = 0);
        });
        null !== this.node.getChildByName("reeetTracingButton") && (this.node.getChildByName("reeetTracingButton").opacity = 0);
      };
      LetterTracingFrontCard.prototype.resetTracing = function() {
        var traceGraphics = this._traceGraphics.getComponent(trace_graphics_1.default);
        traceGraphics.resetGraphics();
      };
      LetterTracingFrontCard.prototype.setAlphabetToDisplay = function(letter) {
        var _this = this;
        this._tracingContainerComponent = this._tracingContainer.getComponent(tracing_container_1.default);
        this._tracingContainerComponent.tracingLetter = letter;
        this._tracingContainerComponent.traceGenerationMode = false;
        this.node.addChild(this._tracingContainer);
        this._tracingContainer.setPosition(new cc.Vec2(-256, -350));
        this._tracingContainer.zIndex = 100;
        this._traceGraphics = this._tracingContainerComponent.traceGraphics;
        this._tracingContainerComponent._traceGraphicsComponent.adjustedScale = writecard_1.LETTER_TRACING_CARD_SCALE;
        this.node.on("cardEnabled", function(index) {
          _this._optionIndex === index && _this._traceGraphics.emit("enabledGraphics");
        });
      };
      LetterTracingFrontCard.prototype.loadSounds = function(text) {
        var _this = this;
        util_1.Util.loadsLetter(text.toLowerCase(), function(clip) {
          _this._sound = clip;
          _this.node.emit("soundLoaded");
        });
      };
      LetterTracingFrontCard.prototype.pronounce = function() {
        lessonController_1.default.getFriend().speak(this._sound);
      };
      LetterTracingFrontCard.prototype.tracingFinished = function() {
        var _this = this;
        this.pronounce();
        this.clearGraphics();
        this.scheduleOnce(function() {
          var customEvent = new cc.Event.EventCustom(writecard_1.LETTER_TRACING_CARD_EVENT, true);
          customEvent.setUserData({
            elementIndex: _this.optionIndex
          });
          _this.node.dispatchEvent(customEvent);
        }, 1);
      };
      LetterTracingFrontCard.prototype.clearGraphics = function() {
        this._tracingContainerComponent._traceGraphicsComponent.clear();
      };
      LetterTracingFrontCard.prototype.onDestroy = function() {
        cc.audioEngine.stopAllEffects();
      };
      Object.defineProperty(LetterTracingFrontCard.prototype, "optionIndex", {
        get: function() {
          return this._optionIndex;
        },
        set: function(index) {
          this._optionIndex = index;
        },
        enumerable: false,
        configurable: true
      });
      __decorate([ property(cc.Prefab) ], LetterTracingFrontCard.prototype, "tracingContainerPrefab", void 0);
      LetterTracingFrontCard = __decorate([ ccclass ], LetterTracingFrontCard);
      return LetterTracingFrontCard;
    }(cc.Component);
    exports.LetterTracingFrontCard = LetterTracingFrontCard;
    cc._RF.pop();
  }, {
    "../../../common/Tracing/scripts/trace-graphics": void 0,
    "../../../common/Tracing/scripts/tracing-container": void 0,
    "../../../common/scripts/helper": void 0,
    "../../../common/scripts/lessonController": void 0,
    "../../../common/scripts/util": void 0,
    "./writecard": "writecard"
  } ],
  writecard: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "26b91PcY09KPpsuUF+lBa66", "writecard");
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
    exports.WriteCard = exports.LETTER_TRACING_CARD_EVENT = exports.LETTER_TRACING_CARD_SCALE = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var config_1 = require("../../../common/scripts/lib/config");
    var lettertracingbackcard_1 = require("./lettertracingbackcard");
    var lettertracingfrontcard_1 = require("./lettertracingfrontcard");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var helper_1 = require("../../../common/scripts/helper");
    var game_1 = require("../../../common/scripts/game");
    var util_1 = require("../../../common/scripts/util");
    exports.LETTER_TRACING_CARD_SCALE = .85;
    exports.LETTER_TRACING_CARD_EVENT = "hideFrontCardAndShowBackCard";
    var WriteCard = function(_super) {
      __extends(WriteCard, _super);
      function WriteCard() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._letterTracingCardContainer = null;
        _this._frontCard = null;
        _this._backCard = null;
        _this._frontCards = [];
        _this._backCards = [];
        _this._currentIndex = 0;
        return _this;
      }
      WriteCard.prototype.onLoad = function() {
        var _this = this;
        var manager = cc.director.getCollisionManager();
        manager.enabled = false;
        this._currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
        this.node.on(exports.LETTER_TRACING_CARD_EVENT, function(event) {
          event.stopPropagation();
          var data = event.getUserData();
          _this.hideFrontCardAndShowBackCard(data);
        });
        this.buildUI();
        util_1.Util.showHelp(null, null);
        this.node.on(helper_1.RESET_TRACING_ALLOWED, function() {
          null !== _this.node.getChildByName("reeetTracingButton") && (_this.node.getChildByName("reeetTracingButton").opacity = 255);
        });
        this.node.on(helper_1.RESET_TRACING_NOT_ALLOWED, function() {
          null !== _this.node.getChildByName("reeetTracingButton") && (_this.node.getChildByName("reeetTracingButton").opacity = 0);
        });
        null !== this.node.getChildByName("reeetTracingButton") && (this.node.getChildByName("reeetTracingButton").opacity = 0);
        this.node.on(helper_1.RESET_TRACING, function(event) {
          event.stopPropagation();
          console.log("current index" + _this._currentIndex);
          var fNode = _this.node.getChildByName(_this._originalFrontCardName + _this._currentIndex);
          if (!!fNode) {
            var frontComponent = fNode.getComponent(lettertracingfrontcard_1.LetterTracingFrontCard);
            if (!!frontComponent) {
              frontComponent.resetTracing();
              _this.emitCardEnabledEvent(fNode, _this._currentIndex);
            }
          }
        });
      };
      WriteCard.prototype.buildUI = function() {
        if (null !== this._currentConfig) {
          console.log("current config", this._currentConfig);
          this._letterTracingCardContainer = this.node;
          this._letterTracingCardContainer.scale *= exports.LETTER_TRACING_CARD_SCALE;
          this.node.width = cc.winSize.width;
          this.node.height = cc.winSize.height;
          var optionsLength = this._currentConfig.options.length || 0;
          for (var i = 0; i < optionsLength; i++) this.renderCard(i);
          this.node.emit(helper_1.CONFIG_LOADED);
          var fNode = this.node.getChildByName(this._originalFrontCardName + "0");
          this.emitCardEnabledEvent(fNode, 0);
        }
      };
      WriteCard.prototype.renderCard = function(index) {
        this._frontCard = cc.instantiate(this.frontCardPrefab);
        this._originalFrontCardName = this._frontCard.name;
        this._frontCard.name = this._frontCard.name + index;
        this._frontCard.getComponent(lettertracingfrontcard_1.LetterTracingFrontCard).optionIndex = index;
        this._backCard = cc.instantiate(this.backCardPrefab);
        this._originalBackCardName = this._backCard.name;
        this._backCard.name = this._backCard.name + index;
        this._backCard.getComponent(lettertracingbackcard_1.LetterTracingBackCard).optionIndex = index;
        this.node.addChild(this._frontCard);
        this.node.addChild(this._backCard);
        this._backCard.active = false;
        this._frontCard.opacity = 0 === index ? 255 : 0;
        this._frontCard.setPosition(0, 0);
        this._backCard.setPosition(0, 0);
        this._frontCards.push(this._frontCard);
        this._backCards.push(this._backCard);
      };
      WriteCard.prototype.emitCardEnabledEvent = function(fNode, index) {
        fNode.opacity = 255;
        fNode.emit("cardEnabled", index);
        this._currentIndex = index;
      };
      WriteCard.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var level = configurations[0], workSheet = configurations[1], problemNo = configurations[2], traceText = configurations[3], option1 = configurations[4], image1 = configurations[5], sound1 = configurations[6], option2 = configurations[7], image2 = configurations[8], sound2 = configurations[9], option3 = configurations[10], image3 = configurations[11], sound3 = configurations[12];
        var options = [ option1, option2, option3 ];
        var images = [ image1, image2, image3 ];
        var sounds = [ sound1, sound2, sound3 ];
        return {
          level: level,
          workSheet: workSheet,
          problemNo: problemNo,
          traceText: traceText,
          options: options,
          images: images,
          sounds: sounds
        };
      };
      Object.defineProperty(WriteCard.prototype, "currentConfig", {
        get: function() {
          return this._currentConfig;
        },
        enumerable: false,
        configurable: true
      });
      WriteCard.prototype.hideFrontCardAndShowBackCard = function(data) {
        var _this = this;
        var index = data.elementIndex;
        var fNode = this.node.getChildByName(this._originalFrontCardName + index);
        var bcNode = this.node.getChildByName(this._originalBackCardName + index);
        new cc.Tween().target(fNode).to(.5, {
          opacity: 0
        }, {
          progress: null,
          easing: "sineOut"
        }).call(function() {
          bcNode.active = true;
          bcNode.scale = 0;
          new cc.Tween().target(bcNode).to(.5, {
            scale: 1
          }, {
            progress: null,
            easing: "sineOut"
          }).call(function() {
            bcNode.getComponent(lettertracingbackcard_1.LetterTracingBackCard).animateText();
            bcNode.getComponent(lettertracingbackcard_1.LetterTracingBackCard).pronounce();
            _this.scheduleOnce(function() {
              fNode.active = false;
              new cc.Tween().target(bcNode).to(.2, {
                opacity: 255,
                scale: .75
              }, {
                progress: null,
                easing: "quintInOut"
              }).then(new cc.Tween().to(.2, {
                opacity: 255,
                scale: .5
              }, {
                progress: null,
                easing: "cubicInOut"
              })).then(new cc.Tween().to(.2, {
                opacity: 255,
                scale: .25
              }, {
                progress: null,
                easing: "cubicInOut"
              })).then(new cc.Tween().to(.2, {
                opacity: 255,
                scale: 0
              }, {
                progress: null,
                easing: "cubicInOut"
              })).call(function() {
                bcNode.active = false;
                if (index < _this._currentConfig.options.length - 1) {
                  var nextFNode = _this.node.getChildByName(_this._originalFrontCardName + (index + 1));
                  _this.emitCardEnabledEvent(nextFNode, index + 1);
                } else _this.node.emit("nextProblem");
              }).start();
            }, 1);
          }).start();
        }).start();
      };
      __decorate([ property(cc.Prefab) ], WriteCard.prototype, "frontCardPrefab", void 0);
      __decorate([ property(cc.Prefab) ], WriteCard.prototype, "backCardPrefab", void 0);
      __decorate([ error_handler_1.default() ], WriteCard.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], WriteCard.prototype, "buildUI", null);
      __decorate([ error_handler_1.default() ], WriteCard.prototype, "renderCard", null);
      __decorate([ error_handler_1.default() ], WriteCard.prototype, "emitCardEnabledEvent", null);
      WriteCard = __decorate([ ccclass ], WriteCard);
      return WriteCard;
    }(game_1.default);
    exports.WriteCard = WriteCard;
    cc._RF.pop();
  }, {
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/helper": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./lettertracingbackcard": "lettertracingbackcard",
    "./lettertracingfrontcard": "lettertracingfrontcard"
  } ]
}, {}, [ "lettertracingbackcard", "lettertracingfrontcard", "writecard" ]);