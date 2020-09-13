window.__require = function t(e, o, n) {
function r(c, l) {
if (!o[c]) {
if (!e[c]) {
var a = c.split("/");
a = a[a.length - 1];
if (!e[a]) {
var s = "function" == typeof __require && __require;
if (!l && s) return s(a, !0);
if (i) return i(a, !0);
throw new Error("Cannot find module '" + c + "'");
}
c = a;
}
var d = o[c] = {
exports: {}
};
e[c][0].call(d.exports, function(t) {
return r(e[c][1][t] || t);
}, d, d.exports, t, e, o, n);
}
return o[c].exports;
}
for (var i = "function" == typeof __require && __require, c = 0; c < n.length; c++) r(n[c]);
return r;
}({
"choice-card": [ function(t, e, o) {
"use strict";
cc._RF.push(e, "e7320BLVnBPD7DR8j4uMvwq", "choice-card");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(t, e, o, n) {
var r, i = arguments.length, c = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var l = t.length - 1; l >= 0; l--) (r = t[l]) && (c = (i < 3 ? r(c) : i > 3 ? r(e, o, c) : r(e, o)) || c);
return i > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator.ccclass, c = t("./openwindow"), l = t("../../../common/scripts/lib/error-handler"), a = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.text = null;
e.touchEnabled = !1;
e.parentNode = null;
return e;
}
e.prototype.onLoad = function() {
this.node.on("touchstart", this.onTouchStart, this);
this.node.on("touchend", this.onTouchEnd, this);
};
e.prototype.onTouchStart = function(t) {};
e.prototype.onTouchEnd = function(t) {
if (this.touchEnabled) {
var e = new cc.Event.EventCustom(c.CHOICE_CLICKED, !0);
e.setUserData({
text: this.text,
parentNode: this.parentNode,
node: this.node
});
this.node.dispatchEvent(e);
}
};
r([ l.default() ], e.prototype, "onLoad", null);
return e = r([ i ], e);
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {
"../../../common/scripts/lib/error-handler": void 0,
"./openwindow": "openwindow"
} ],
openwindow: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "291f3UD6GBOVrQuUin/ftHU", "openwindow");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(t, e, o, n) {
var r, i = arguments.length, c = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var l = t.length - 1; l >= 0; l--) (r = t[l]) && (c = (i < 3 ? r(c) : i > 3 ? r(e, o, c) : r(e, o)) || c);
return i > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
o.CHOICE_CLICKED = o.SCROLL_ENDED = o.SCROLL_BEGAN = o.START_SCROLL_CLICK = void 0;
var i = cc._decorator.ccclass, c = cc._decorator.property, l = t("../../../common/scripts/lib/config"), a = t("../../../common/scripts/util"), s = t("./choice-card"), d = t("../../../common/scripts/lib/error-handler");
o.START_SCROLL_CLICK = "START_SCROLL_CLICK";
o.SCROLL_BEGAN = "SCROLL_BEGAN";
o.SCROLL_ENDED = "SCROLL_ENDED";
o.CHOICE_CLICKED = "CHOICE_CLICKED";
var u = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e._currentConfig = null;
e.slotWindowPrefab = null;
e.scrollWindow = null;
e.slotFramePrefab = null;
e.scrollClip = null;
e.correctClip = null;
e.wrongClip = null;
e._frameHeight = 0;
e._slots = [];
e._words = [];
e._choiceCard1 = null;
e._choiceCard2 = null;
e._curIndex = 0;
e._helpDragNode = null;
e.friend = null;
e.friendNode = null;
e._isRTL = !1;
return e;
}
e.prototype.onLoad = function() {
var t = this;
this._isRTL = l.default.i.direction == l.Direction.RTL;
this._currentConfig = this.processConfiguration(l.default.getInstance().data[0]);
a.Util.loadFriend(function(e) {
t.friendNode = e;
t.friendNode.scale = .75;
t.friend = e.getComponent(dragonBones.ArmatureDisplay);
});
this.buildUI();
this.node.on(o.START_SCROLL_CLICK, function(e) {
e.stopPropagation();
t._curIndex = 0;
t.renderUI();
});
};
e.prototype.startAutoScroll = function() {
var t = new cc.Event.EventCustom(o.START_SCROLL_CLICK, !0);
this.node.dispatchEvent(t);
};
e.prototype.buildUI = function() {
var t = this;
this.buildSlots();
this.buildChoices();
this.renderUI();
this.node.on(o.CHOICE_CLICKED, function(e) {
e.stopPropagation();
var o = e.getUserData(), n = -1 !== t._currentConfig.goodimage.indexOf("/") ? t._currentConfig.goodimage.substr(t._currentConfig.goodimage.lastIndexOf("/") + 1).replace(".png", "") : t._currentConfig.goodimage;
if (o && o.text === n) {
t._choiceCard1.parent.getComponent(s.default).touchEnabled = !1;
t._choiceCard2.parent.getComponent(s.default).touchEnabled = !1;
t.node.emit("correct");
var r = o.parentNode;
r.getChildByName("character_node").addChild(t.friendNode);
var i = r.getComponent(cc.Animation);
i.on("finished", function() {
null != t.friend && t.friend.playAnimation("laugh", 1);
t.scheduleOnce(function() {
t.node.emit("nextProblem");
}, 1);
});
i.play("door_open");
} else t.node.emit("wrong");
});
};
e.prototype.playOpenAnim = function(t, e) {
var o = this, n = t.getChildByName("curtain_node");
if (n) {
var r = n.getComponent(cc.Animation);
r.play("open");
r.on("finished", function() {
o.speak(e, function() {
o._curIndex++;
o.renderUI();
});
});
}
};
e.prototype.buildSlots = function() {
var t = -1 !== this._currentConfig.word.indexOf(",") ? this._currentConfig.word.split(",") : this._currentConfig.word.split(""), e = cc.instantiate(this.slotWindowPrefab);
e.setPosition(new cc.Vec2(0, cc.winSize.height / 4 - 50));
var o = e.getChildByName("slotLayout"), n = o.getComponent(cc.Layout);
if (t.length > 5) {
e.scale = 1.1;
n.resizeMode = cc.Layout.ResizeMode.CONTAINER;
} else {
e.scale = 1.25;
n.resizeMode = cc.Layout.ResizeMode.CONTAINER;
}
this.addFrames(o, t);
this.node.addChild(e);
this._slots = this._slots.reverse();
this._words = this._words.reverse();
};
e.prototype.addSlots = function(t, e) {
var o = cc.instantiate(this.scrollWindow), n = o.getChildByName("contentNode");
this.addContent(n, e);
t.addChild(o);
this._slots.push(o);
this._words.push(e);
};
e.prototype.renderUI = function() {
var t = this, e = this._curIndex <= this._slots.length - 1 ? this._isRTL ? this._curIndex : this._slots.length - 1 - this._curIndex : -1;
if (-1 !== e) {
var o = this._slots[e], n = this._words[e];
o && n && this.animationOpenWindow(o, n);
} else a.Util.loadGameSound(this._currentConfig.sound, function(e) {
e && a.Util.play(e, !1);
t.scheduleOnce(function() {
t._choiceCard1.parent.getComponent(s.default).touchEnabled = !0;
t._choiceCard2.parent.getComponent(s.default).touchEnabled = !0;
t._choiceCard1.opacity = 255;
t._choiceCard2.opacity = 255;
t.scheduleOnce(function() {
a.Util.showHelp(t._helpDragNode, t._helpDragNode);
}, .5);
}, 1);
});
};
e.prototype.animationOpenWindow = function(t, e) {
var o = this;
this.scheduleOnce(function() {
o.playOpenAnim(t, e);
}, .5);
};
e.prototype.speak = function(t, e) {
a.Util.speakPhonicsOrLetter(t, e);
};
e.prototype.autoScrollToWord = function(t, e) {
var o = this, n = this.getSlotItems(), r = t.getComponent(cc.ScrollView), i = n.indexOf(e), c = r.getScrollOffset();
if (Math.floor(c.y) !== Math.floor(i * this._frameHeight)) {
r.scrollToBottom(.5);
this.scheduleOnce(function() {
r.scrollToOffset(new cc.Vec2(0, i * o._frameHeight), .5);
}, .5);
}
this.scheduleOnce(function() {
o.speak(e, function() {
o._curIndex++;
o.renderUI();
});
}, 1);
};
e.prototype.getSlotItems = function() {
var t = -1 !== this._currentConfig.slots.indexOf(",") ? this._currentConfig.slots.split(",") : this._currentConfig.slots.split(""), e = -1 !== this._currentConfig.word.indexOf(",") ? this._currentConfig.word.split(",") : this._currentConfig.word.split("");
t = t.concat(e);
return Array.from(new Set(t));
};
e.prototype.addScrollContents = function(t) {
var e = this, o = new cc.Color().fromHEX("#" + Math.floor(16777215 * Math.random()).toString(16));
this.getSlotItems().forEach(function(n) {
var r = e.createSlotFrame(n, o);
t.addChild(r);
e._frameHeight = r.height;
t.height += r.height;
});
};
e.prototype.addContent = function(t, e) {
var o = new cc.Color().fromHEX("#" + Math.floor(16777215 * Math.random()).toString(16)), n = this.createSlotFrame(e, o);
t.addChild(n);
};
e.prototype.createSlotFrame = function(t, e) {
var o = cc.instantiate(this.slotFramePrefab), n = o.getChildByName("slotitem").getChildByName("label");
n.color = e;
n.getComponent(cc.Label).string = t;
n.addComponent(cc.LabelOutline).width = 2;
return o;
};
e.prototype.addFrames = function(t, e) {
var o = this;
e.forEach(function(e) {
o.addSlots(t, e);
});
};
e.prototype.buildChoices = function() {
var t = Math.random() >= .5;
this._choiceCard1 = this.node.getChildByName("left_Button").getChildByName("image");
this.loadTextureAndShowImage(this._choiceCard1, t ? this._currentConfig.goodimage : this._currentConfig.badimage);
this._choiceCard2 = this.node.getChildByName("right_Button").getChildByName("image");
this.loadTextureAndShowImage(this._choiceCard2, t ? this._currentConfig.badimage : this._currentConfig.goodimage);
this._helpDragNode = t ? this._choiceCard1 : this._choiceCard2;
};
e.prototype.loadTextureAndShowImage = function(t, e) {
var o = this;
t.opacity = 0;
var n = t.parent.getComponent(s.default);
n.parentNode = this.node.getChildByName("door_node");
n.text = -1 !== e.indexOf("/") ? e.substr(e.lastIndexOf("/") + 1).replace(".png", "") : e;
n.touchEnabled = !1;
a.Util.loadTexture(e, function(e) {
o.showImage(t, e);
});
};
e.prototype.showImage = function(t, e) {
t.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(e);
};
e.prototype.processConfiguration = function(t) {
void 0 === t && (t = []);
var e = [].concat.apply([], t);
return {
level: e[0],
worksheet: e[1],
problem: e[2],
type: e[3],
word: e[4],
goodimage: e[5],
badimage: e[6],
sound: e[7],
slots: e[8]
};
};
r([ c(cc.Prefab) ], e.prototype, "slotWindowPrefab", void 0);
r([ c(cc.Prefab) ], e.prototype, "scrollWindow", void 0);
r([ c(cc.Prefab) ], e.prototype, "slotFramePrefab", void 0);
r([ c(cc.AudioClip) ], e.prototype, "scrollClip", void 0);
r([ c(cc.AudioClip) ], e.prototype, "correctClip", void 0);
r([ c(cc.AudioClip) ], e.prototype, "wrongClip", void 0);
r([ d.default() ], e.prototype, "onLoad", null);
r([ d.default() ], e.prototype, "startAutoScroll", null);
r([ d.default() ], e.prototype, "buildUI", null);
r([ d.default() ], e.prototype, "playOpenAnim", null);
r([ d.default() ], e.prototype, "buildSlots", null);
r([ d.default() ], e.prototype, "addSlots", null);
r([ d.default() ], e.prototype, "renderUI", null);
r([ d.default() ], e.prototype, "animationOpenWindow", null);
r([ d.default() ], e.prototype, "speak", null);
r([ d.default() ], e.prototype, "autoScrollToWord", null);
r([ d.default() ], e.prototype, "getSlotItems", null);
r([ d.default() ], e.prototype, "addScrollContents", null);
r([ d.default() ], e.prototype, "addContent", null);
r([ d.default() ], e.prototype, "createSlotFrame", null);
r([ d.default() ], e.prototype, "addFrames", null);
r([ d.default() ], e.prototype, "buildChoices", null);
r([ d.default() ], e.prototype, "loadTextureAndShowImage", null);
r([ d.default() ], e.prototype, "showImage", null);
return e = r([ i ], e);
}(cc.Component);
o.default = u;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/error-handler": void 0,
"../../../common/scripts/util": void 0,
"./choice-card": "choice-card"
} ],
"scrollable-view": [ function(t, e, o) {
"use strict";
cc._RF.push(e, "4e172i39UBLNI1Cu1WSdeWZ", "scrollable-view");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(t, e, o, n) {
var r, i = arguments.length, c = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var l = t.length - 1; l >= 0; l--) (r = t[l]) && (c = (i < 3 ? r(c) : i > 3 ? r(e, o, c) : r(e, o)) || c);
return i > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator.ccclass, c = cc.ScrollView.EventType, l = t("./openwindow"), a = t("../../../common/scripts/lib/error-handler"), s = function(t) {
n(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.onLoad = function() {
this.bindScrollEventHandler();
this.node.off("touchstart", this.onTouchStart, this);
this.node.off("touchend", this.onTouchStart, this);
this.node.off("touchcancel", this.onTouchStart, this);
this.node.off("touchmove", this.onTouchStart, this);
};
e.prototype.onTouchStart = function(t) {};
e.prototype.bindScrollEventHandler = function() {
var t = new cc.Component.EventHandler();
t.target = this.node;
t.component = "scrollable-view";
t.handler = "mapEventHandler";
this.node.getComponent(cc.ScrollView).scrollEvents.push(t);
};
e.prototype.mapEventHandler = function(t, e, o) {
switch (e) {
case c.SCROLLING:
this.node.dispatchEvent(new cc.Event.EventCustom(l.SCROLL_BEGAN, !0));
break;

case c.SCROLL_ENDED:
this.node.dispatchEvent(new cc.Event.EventCustom(l.SCROLL_ENDED, !0));
}
};
r([ a.default() ], e.prototype, "onLoad", null);
r([ a.default() ], e.prototype, "bindScrollEventHandler", null);
r([ a.default() ], e.prototype, "mapEventHandler", null);
return e = r([ i ], e);
}(cc.Component);
o.default = s;
cc._RF.pop();
}, {
"../../../common/scripts/lib/error-handler": void 0,
"./openwindow": "openwindow"
} ],
slot: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "d912a16IpRJs7OBcPeIvcyT", "slot");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(t, e, o, n) {
var r, i = arguments.length, c = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var l = t.length - 1; l >= 0; l--) (r = t[l]) && (c = (i < 3 ? r(c) : i > 3 ? r(e, o, c) : r(e, o)) || c);
return i > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator.ccclass, c = function(t) {
n(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
return e = r([ i ], e);
}(cc.Component);
o.default = c;
cc._RF.pop();
}, {} ],
"spin-button": [ function(t, e, o) {
"use strict";
cc._RF.push(e, "c7661KX4NVKGpSBCXp3FiNo", "spin-button");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(t, e, o, n) {
var r, i = arguments.length, c = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var l = t.length - 1; l >= 0; l--) (r = t[l]) && (c = (i < 3 ? r(c) : i > 3 ? r(e, o, c) : r(e, o)) || c);
return i > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator.ccclass, c = t("./openwindow"), l = cc._decorator.property, a = t("../../../common/scripts/util"), s = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.clickClip = null;
e.clickedEnabled = !0;
return e;
}
e.prototype.onButtonClick = function(t, e) {
if (this.clickedEnabled) {
cc.audioEngine.stopAllEffects();
a.Util.playSfx(this.clickClip);
this.clickedEnabled = !1;
var o = new cc.Event.EventCustom(c.START_SCROLL_CLICK, !0);
this.node.dispatchEvent(o);
}
};
r([ l(cc.AudioClip) ], e.prototype, "clickClip", void 0);
return e = r([ i ], e);
}(cc.Component);
o.default = s;
cc._RF.pop();
}, {
"../../../common/scripts/util": void 0,
"./openwindow": "openwindow"
} ]
}, {}, [ "choice-card", "openwindow", "scrollable-view", "slot", "spin-button" ]);