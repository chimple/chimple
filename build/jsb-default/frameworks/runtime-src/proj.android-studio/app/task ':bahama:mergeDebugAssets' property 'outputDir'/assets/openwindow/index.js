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
  "choice-card": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e7320BLVnBPD7DR8j4uMvwq", "choice-card");
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
    var openwindow_1 = require("./openwindow");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var ChoiceCard = function(_super) {
      __extends(ChoiceCard, _super);
      function ChoiceCard() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.text = null;
        _this.touchEnabled = false;
        _this.parentNode = null;
        return _this;
      }
      ChoiceCard.prototype.onLoad = function() {
        this.node.on("touchstart", this.onTouchStart, this);
        this.node.on("touchend", this.onTouchEnd, this);
      };
      ChoiceCard.prototype.onTouchStart = function(touch) {};
      ChoiceCard.prototype.onTouchEnd = function(touch) {
        if (this.touchEnabled) {
          var customEvent = new cc.Event.EventCustom(openwindow_1.CHOICE_CLICKED, true);
          customEvent.setUserData({
            text: this.text,
            parentNode: this.parentNode,
            node: this.node
          });
          this.node.dispatchEvent(customEvent);
        }
      };
      __decorate([ error_handler_1.default() ], ChoiceCard.prototype, "onLoad", null);
      ChoiceCard = __decorate([ ccclass ], ChoiceCard);
      return ChoiceCard;
    }(cc.Component);
    exports.default = ChoiceCard;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/error-handler": void 0,
    "./openwindow": "openwindow"
  } ],
  openwindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "291f3UD6GBOVrQuUin/ftHU", "openwindow");
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
    exports.CHOICE_CLICKED = exports.SCROLL_ENDED = exports.SCROLL_BEGAN = exports.START_SCROLL_CLICK = void 0;
    var ccclass = cc._decorator.ccclass;
    var property = cc._decorator.property;
    var config_1 = require("../../../common/scripts/lib/config");
    var util_1 = require("../../../common/scripts/util");
    var choice_card_1 = require("./choice-card");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var game_1 = require("../../../common/scripts/game");
    exports.START_SCROLL_CLICK = "START_SCROLL_CLICK";
    exports.SCROLL_BEGAN = "SCROLL_BEGAN";
    exports.SCROLL_ENDED = "SCROLL_ENDED";
    exports.CHOICE_CLICKED = "CHOICE_CLICKED";
    var OpenWindow = function(_super) {
      __extends(OpenWindow, _super);
      function OpenWindow() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._currentConfig = null;
        _this.slotWindowPrefab = null;
        _this.scrollWindow = null;
        _this.slotFramePrefab = null;
        _this.scrollClip = null;
        _this.correctClip = null;
        _this.wrongClip = null;
        _this._frameHeight = 0;
        _this._slots = [];
        _this._words = [];
        _this._choiceCard1 = null;
        _this._choiceCard2 = null;
        _this._curIndex = 0;
        _this._helpDragNode = null;
        _this._isRTL = false;
        return _this;
      }
      OpenWindow.prototype.onLoad = function() {
        var _this = this;
        this._isRTL = config_1.default.i.direction == config_1.Direction.RTL;
        this._currentConfig = this.processConfiguration(config_1.default.getInstance().data[0]);
        this.buildUI();
        this.node.on(exports.START_SCROLL_CLICK, function(event) {
          event.stopPropagation();
          _this._curIndex = 0;
          _this.renderUI();
        });
      };
      OpenWindow.prototype.startAutoScroll = function() {
        var customEvent = new cc.Event.EventCustom(exports.START_SCROLL_CLICK, true);
        this.node.dispatchEvent(customEvent);
      };
      OpenWindow.prototype.buildUI = function() {
        var _this = this;
        this.buildSlots();
        this.buildChoices();
        this.renderUI();
        this.node.on(exports.CHOICE_CLICKED, function(event) {
          event.stopPropagation();
          var data = event.getUserData();
          var matchText = -1 !== _this._currentConfig.goodimage.indexOf("/") ? _this._currentConfig.goodimage.substr(_this._currentConfig.goodimage.lastIndexOf("/") + 1).replace(".png", "") : _this._currentConfig.goodimage;
          if (!data || data.text !== matchText) _this.node.emit("wrong"); else {
            _this._choiceCard1.parent.getComponent(choice_card_1.default).touchEnabled = false;
            _this._choiceCard2.parent.getComponent(choice_card_1.default).touchEnabled = false;
            _this.node.emit("correct");
            var door = data.parentNode;
            var doorAnimation = door.getComponent(cc.Animation);
            doorAnimation.on("finished", function() {
              _this.scheduleOnce(function() {
                _this.node.emit("nextProblem");
              }, 1);
            });
            doorAnimation.play("door_open");
          }
        });
      };
      OpenWindow.prototype.playOpenAnim = function(scrollableSlot, word) {
        var _this = this;
        var curtain = scrollableSlot.getChildByName("curtain_node");
        if (!!curtain) {
          var anim = curtain.getComponent(cc.Animation);
          anim.play("open");
          anim.on("finished", function() {
            _this.speak(word, function() {
              _this._curIndex++;
              _this.renderUI();
            });
          });
        }
      };
      OpenWindow.prototype.buildSlots = function() {
        var words = -1 !== this._currentConfig.word.indexOf(",") ? this._currentConfig.word.split(",") : this._currentConfig.word.split("");
        var slotWindow = cc.instantiate(this.slotWindowPrefab);
        slotWindow.setPosition(new cc.Vec2(0, cc.winSize.height / 4 - 50));
        var slotLayout = slotWindow.getChildByName("slotLayout");
        var layoutComponent = slotLayout.getComponent(cc.Layout);
        if (words.length > 5) {
          slotWindow.scale = 1.1;
          layoutComponent.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        } else {
          slotWindow.scale = 1.25;
          layoutComponent.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        }
        config_1.default.wide && (layoutComponent.spacingX = 45);
        this.addFrames(slotLayout, words);
        this.node.addChild(slotWindow);
        this._slots = this._slots.reverse();
        this._words = this._words.reverse();
      };
      OpenWindow.prototype.addSlots = function(parent, word) {
        var scrollableWindow = cc.instantiate(this.scrollWindow);
        var contentSlot = scrollableWindow.getChildByName("contentNode");
        this.addContent(contentSlot, word);
        var curtainNode = scrollableWindow.getChildByName("curtain_node");
        config_1.default.wide && (curtainNode.scale = 1.4);
        parent.addChild(scrollableWindow);
        this._slots.push(scrollableWindow);
        this._words.push(word);
      };
      OpenWindow.prototype.renderUI = function() {
        var _this = this;
        var popIndex = this._curIndex <= this._slots.length - 1 ? this._isRTL ? this._curIndex : this._slots.length - 1 - this._curIndex : -1;
        if (-1 !== popIndex) {
          var slot = this._slots[popIndex];
          var word = this._words[popIndex];
          !slot || !word || this.animationOpenWindow(slot, word);
        } else util_1.Util.loadGameSound(this._currentConfig.sound, function(clip) {
          clip && (_this.friend.extraClip = clip);
          _this.scheduleOnce(function() {
            _this._choiceCard1.parent.getComponent(choice_card_1.default).touchEnabled = true;
            _this._choiceCard2.parent.getComponent(choice_card_1.default).touchEnabled = true;
            _this._choiceCard1.opacity = 255;
            _this._choiceCard2.opacity = 255;
            _this.scheduleOnce(function() {
              util_1.Util.showHelp(_this._helpDragNode, _this._helpDragNode);
            }, .5);
          }, 1);
        });
      };
      OpenWindow.prototype.animationOpenWindow = function(scrollableSlot, word) {
        var _this = this;
        this.scheduleOnce(function() {
          _this.playOpenAnim(scrollableSlot, word);
        }, .5);
      };
      OpenWindow.prototype.speak = function(w, callBack) {
        this.friend.speakPhonicsOrLetter(w, callBack);
      };
      OpenWindow.prototype.autoScrollToWord = function(parent, word) {
        var _this = this;
        var slots = this.getSlotItems();
        var scrollView = parent.getComponent(cc.ScrollView);
        var index = slots.indexOf(word);
        var curOffSet = scrollView.getScrollOffset();
        if (Math.floor(curOffSet.y) !== Math.floor(index * this._frameHeight)) {
          scrollView.scrollToBottom(.5);
          this.scheduleOnce(function() {
            scrollView.scrollToOffset(new cc.Vec2(0, index * _this._frameHeight), .5);
          }, .5);
        }
        this.scheduleOnce(function() {
          _this.speak(word, function() {
            _this._curIndex++;
            _this.renderUI();
          });
        }, 1);
      };
      OpenWindow.prototype.getSlotItems = function() {
        var slotItems = -1 !== this._currentConfig.slots.indexOf(",") ? this._currentConfig.slots.split(",") : this._currentConfig.slots.split("");
        var answers = -1 !== this._currentConfig.word.indexOf(",") ? this._currentConfig.word.split(",") : this._currentConfig.word.split("");
        slotItems = slotItems.concat(answers);
        return Array.from(new Set(slotItems));
      };
      OpenWindow.prototype.addScrollContents = function(parent) {
        var _this = this;
        var color = new cc.Color().fromHEX("#" + Math.floor(16777215 * Math.random()).toString(16));
        var slotItems = this.getSlotItems();
        slotItems.forEach(function(s) {
          var frame = _this.createSlotFrame(s, color);
          parent.addChild(frame);
          _this._frameHeight = frame.height;
          parent.height += frame.height;
        });
      };
      OpenWindow.prototype.addContent = function(parent, s) {
        var color = new cc.Color().fromHEX("#" + Math.floor(16777215 * Math.random()).toString(16));
        var frame = this.createSlotFrame(s, color);
        parent.addChild(frame);
        s;
      };
      OpenWindow.prototype.createSlotFrame = function(w, color) {
        var frame = cc.instantiate(this.slotFramePrefab);
        var slotItem = frame.getChildByName("slotitem");
        var labelNode = slotItem.getChildByName("label");
        labelNode.color = color;
        var label = labelNode.getComponent(cc.Label);
        label.string = config_1.default.wide ? " " + w + " " : w;
        var outLine = labelNode.addComponent(cc.LabelOutline);
        outLine.width = 2;
        return frame;
      };
      OpenWindow.prototype.addFrames = function(parent, words) {
        var _this = this;
        words.forEach(function(w) {
          _this.addSlots(parent, w);
        });
      };
      OpenWindow.prototype.buildChoices = function() {
        var firstCardCorrect = Math.random() >= .5;
        this._choiceCard1 = this.node.getChildByName("left_Button").getChildByName("image");
        this.loadTextureAndShowImage(this._choiceCard1, firstCardCorrect ? this._currentConfig.goodimage : this._currentConfig.badimage);
        this._choiceCard2 = this.node.getChildByName("right_Button").getChildByName("image");
        this.loadTextureAndShowImage(this._choiceCard2, firstCardCorrect ? this._currentConfig.badimage : this._currentConfig.goodimage);
        this._helpDragNode = firstCardCorrect ? this._choiceCard1 : this._choiceCard2;
      };
      OpenWindow.prototype.loadTextureAndShowImage = function(node, image) {
        var _this = this;
        node.opacity = 0;
        var component = node.parent.getComponent(choice_card_1.default);
        component.parentNode = this.node.getChildByName("door_node");
        component.text = -1 !== image.indexOf("/") ? image.substr(image.lastIndexOf("/") + 1).replace(".png", "") : image;
        component.touchEnabled = false;
        util_1.Util.loadTexture(image, function(texture) {
          _this.showImage(node, texture);
        });
      };
      OpenWindow.prototype.showImage = function(node, texture) {
        var sprite = node.getComponent(cc.Sprite);
        sprite.spriteFrame = new cc.SpriteFrame(texture);
        util_1.Util.resizeSprite(sprite, 272, 201);
      };
      OpenWindow.prototype.processConfiguration = function(data) {
        void 0 === data && (data = []);
        var configurations = [].concat.apply([], data);
        var level = configurations[0], worksheet = configurations[1], problem = configurations[2], type = configurations[3], word = configurations[4], goodimage = configurations[5], badimage = configurations[6], sound = configurations[7], slots = configurations[8];
        return {
          level: level,
          worksheet: worksheet,
          problem: problem,
          type: type,
          word: word,
          goodimage: goodimage,
          badimage: badimage,
          sound: sound,
          slots: slots
        };
      };
      __decorate([ property(cc.Prefab) ], OpenWindow.prototype, "slotWindowPrefab", void 0);
      __decorate([ property(cc.Prefab) ], OpenWindow.prototype, "scrollWindow", void 0);
      __decorate([ property(cc.Prefab) ], OpenWindow.prototype, "slotFramePrefab", void 0);
      __decorate([ property(cc.AudioClip) ], OpenWindow.prototype, "scrollClip", void 0);
      __decorate([ property(cc.AudioClip) ], OpenWindow.prototype, "correctClip", void 0);
      __decorate([ property(cc.AudioClip) ], OpenWindow.prototype, "wrongClip", void 0);
      __decorate([ error_handler_1.default() ], OpenWindow.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], OpenWindow.prototype, "startAutoScroll", null);
      __decorate([ error_handler_1.default() ], OpenWindow.prototype, "buildUI", null);
      __decorate([ error_handler_1.default() ], OpenWindow.prototype, "playOpenAnim", null);
      __decorate([ error_handler_1.default() ], OpenWindow.prototype, "buildSlots", null);
      __decorate([ error_handler_1.default() ], OpenWindow.prototype, "addSlots", null);
      __decorate([ error_handler_1.default() ], OpenWindow.prototype, "renderUI", null);
      __decorate([ error_handler_1.default() ], OpenWindow.prototype, "animationOpenWindow", null);
      __decorate([ error_handler_1.default() ], OpenWindow.prototype, "speak", null);
      __decorate([ error_handler_1.default() ], OpenWindow.prototype, "autoScrollToWord", null);
      __decorate([ error_handler_1.default() ], OpenWindow.prototype, "getSlotItems", null);
      __decorate([ error_handler_1.default() ], OpenWindow.prototype, "addScrollContents", null);
      __decorate([ error_handler_1.default() ], OpenWindow.prototype, "addContent", null);
      __decorate([ error_handler_1.default() ], OpenWindow.prototype, "createSlotFrame", null);
      __decorate([ error_handler_1.default() ], OpenWindow.prototype, "addFrames", null);
      __decorate([ error_handler_1.default() ], OpenWindow.prototype, "buildChoices", null);
      __decorate([ error_handler_1.default() ], OpenWindow.prototype, "loadTextureAndShowImage", null);
      __decorate([ error_handler_1.default() ], OpenWindow.prototype, "showImage", null);
      OpenWindow = __decorate([ ccclass ], OpenWindow);
      return OpenWindow;
    }(game_1.default);
    exports.default = OpenWindow;
    cc._RF.pop();
  }, {
    "../../../common/scripts/game": void 0,
    "../../../common/scripts/lib/config": void 0,
    "../../../common/scripts/lib/error-handler": void 0,
    "../../../common/scripts/util": void 0,
    "./choice-card": "choice-card"
  } ],
  "scrollable-view": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4e172i39UBLNI1Cu1WSdeWZ", "scrollable-view");
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
    var EventType = cc.ScrollView.EventType;
    var openwindow_1 = require("./openwindow");
    var error_handler_1 = require("../../../common/scripts/lib/error-handler");
    var ScrollableView = function(_super) {
      __extends(ScrollableView, _super);
      function ScrollableView() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ScrollableView.prototype.onLoad = function() {
        this.bindScrollEventHandler();
        this.node.off("touchstart", this.onTouchStart, this);
        this.node.off("touchend", this.onTouchStart, this);
        this.node.off("touchcancel", this.onTouchStart, this);
        this.node.off("touchmove", this.onTouchStart, this);
      };
      ScrollableView.prototype.onTouchStart = function(touch) {};
      ScrollableView.prototype.bindScrollEventHandler = function() {
        var scrollViewEventHandler = new cc.Component.EventHandler();
        scrollViewEventHandler.target = this.node;
        scrollViewEventHandler.component = "scrollable-view";
        scrollViewEventHandler.handler = "mapEventHandler";
        var scrollView = this.node.getComponent(cc.ScrollView);
        scrollView.scrollEvents.push(scrollViewEventHandler);
      };
      ScrollableView.prototype.mapEventHandler = function(scrollView, eventType, customEventData) {
        switch (eventType) {
         case EventType.SCROLLING:
          this.node.dispatchEvent(new cc.Event.EventCustom(openwindow_1.SCROLL_BEGAN, true));
          break;

         case EventType.SCROLL_ENDED:
          this.node.dispatchEvent(new cc.Event.EventCustom(openwindow_1.SCROLL_ENDED, true));
        }
      };
      __decorate([ error_handler_1.default() ], ScrollableView.prototype, "onLoad", null);
      __decorate([ error_handler_1.default() ], ScrollableView.prototype, "bindScrollEventHandler", null);
      __decorate([ error_handler_1.default() ], ScrollableView.prototype, "mapEventHandler", null);
      ScrollableView = __decorate([ ccclass ], ScrollableView);
      return ScrollableView;
    }(cc.Component);
    exports.default = ScrollableView;
    cc._RF.pop();
  }, {
    "../../../common/scripts/lib/error-handler": void 0,
    "./openwindow": "openwindow"
  } ],
  slot: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d912a16IpRJs7OBcPeIvcyT", "slot");
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
    var Slot = function(_super) {
      __extends(Slot, _super);
      function Slot() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Slot = __decorate([ ccclass ], Slot);
      return Slot;
    }(cc.Component);
    exports.default = Slot;
    cc._RF.pop();
  }, {} ],
  "spin-button": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c7661KX4NVKGpSBCXp3FiNo", "spin-button");
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
    var openwindow_1 = require("./openwindow");
    var property = cc._decorator.property;
    var util_1 = require("../../../common/scripts/util");
    var SpinButton = function(_super) {
      __extends(SpinButton, _super);
      function SpinButton() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.clickClip = null;
        _this.clickedEnabled = true;
        return _this;
      }
      SpinButton.prototype.onButtonClick = function(event, customEventData) {
        if (this.clickedEnabled) {
          cc.audioEngine.stopAllEffects();
          util_1.Util.playSfx(this.clickClip);
          this.clickedEnabled = false;
          var customEvent = new cc.Event.EventCustom(openwindow_1.START_SCROLL_CLICK, true);
          this.node.dispatchEvent(customEvent);
        }
      };
      __decorate([ property(cc.AudioClip) ], SpinButton.prototype, "clickClip", void 0);
      SpinButton = __decorate([ ccclass ], SpinButton);
      return SpinButton;
    }(cc.Component);
    exports.default = SpinButton;
    cc._RF.pop();
  }, {
    "../../../common/scripts/util": void 0,
    "./openwindow": "openwindow"
  } ]
}, {}, [ "choice-card", "openwindow", "scrollable-view", "slot", "spin-button" ]);