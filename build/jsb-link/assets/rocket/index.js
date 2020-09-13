window.__require = function t(o, e, r) {
function n(c, a) {
if (!e[c]) {
if (!o[c]) {
var l = c.split("/");
l = l[l.length - 1];
if (!o[l]) {
var d = "function" == typeof __require && __require;
if (!a && d) return d(l, !0);
if (i) return i(l, !0);
throw new Error("Cannot find module '" + c + "'");
}
c = l;
}
var u = e[c] = {
exports: {}
};
o[c][0].call(u.exports, function(t) {
return n(o[c][1][t] || t);
}, u, u.exports, t, o, e, r);
}
return e[c].exports;
}
for (var i = "function" == typeof __require && __require, c = 0; c < r.length; c++) n(r[c]);
return n;
}({
rocket: [ function(t, o, e) {
"use strict";
cc._RF.push(o, "036ebjj6pxHQ5T08XFmxWQH", "rocket");
var r = this && this.__extends || function() {
var t = function(o, e) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, o) {
t.__proto__ = o;
} || function(t, o) {
for (var e in o) o.hasOwnProperty(e) && (t[e] = o[e]);
})(o, e);
};
return function(o, e) {
t(o, e);
function r() {
this.constructor = o;
}
o.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r());
};
}(), n = this && this.__decorate || function(t, o, e, r) {
var n, i = arguments.length, c = i < 3 ? o : null === r ? r = Object.getOwnPropertyDescriptor(o, e) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, o, e, r); else for (var a = t.length - 1; a >= 0; a--) (n = t[a]) && (c = (i < 3 ? n(c) : i > 3 ? n(o, e, c) : n(o, e)) || c);
return i > 3 && c && Object.defineProperty(o, e, c), c;
};
Object.defineProperty(e, "__esModule", {
value: !0
});
e.STICK_CHOICE_WRONG = e.STICK_CHOICE_CORRECT = void 0;
var i = cc._decorator.ccclass, c = cc._decorator.property, a = cc.BoxCollider, l = cc.Layout, d = t("../../../common/scripts/lib/config"), u = t("../../../common/scripts/util"), s = t("./word-sound-button"), p = t("../../../common/scripts/drag"), h = t("./sticker-choice"), f = t("../../spelldoor/scripts/Utility"), y = t("../../../common/scripts/lib/error-handler");
e.STICK_CHOICE_CORRECT = "stickChoiceCorrect";
e.STICK_CHOICE_WRONG = "stickChoiceWrong";
var _ = function(t) {
r(o, t);
function o() {
var o = null !== t && t.apply(this, arguments) || this;
o._currentConfig = null;
o.wordNoteBoardPrefab = null;
o.dropContainerPrefab = null;
o.choiceContainerPrefab = null;
o.choiceContainerOneRowPrefab = null;
o.rocketheadPrefab = null;
o.rockettailPrefab = null;
o.stickerPrefab = null;
o.stickerDropPrefab = null;
o.soundBtnPrefab = null;
o.imageNodePrefab = null;
o._dog = null;
o._friend = null;
o._wordNoteBoard = null;
o._dropLayout = null;
o._loadedTexture = null;
o._totalDrops = 0;
o._rocketHead = null;
o._rocketTail = null;
o._dropContainer = null;
o._mWord = [];
o._choiceContainers = [];
o._helpDragNode = null;
o._helpDropNode = null;
o._helpWord = null;
o._isRTL = !1;
return o;
}
o.prototype.onLoad = function() {
this._isRTL = d.default.i.direction == d.Direction.RTL;
cc.director.getCollisionManager().enabled = !0;
p.default.letDrag = !0;
this._currentConfig = this.processConfiguration(d.default.getInstance().data[0]);
var t = new Date();
this.buildUI();
u.Util.computeTimeDiff("wordnote buildUI", t);
};
o.prototype.buildUI = function() {
var t = this;
this.buildWordNoteBoard();
this.buildDropContainer();
this._mWord = this.diff(this._currentConfig.card, this._currentConfig.activeCard);
if ("true" === this._currentConfig.fullboard || "true" === this._currentConfig.partialboard) for (var o = 1; o <= 2; o++) {
var r = this.buildChoiceContainerSingleRow(o);
this._choiceContainers.push(r);
} else {
r = this.buildChoiceContainer(1);
this._choiceContainers.push(r);
}
this.speakWord(.1);
this.node.on(e.STICK_CHOICE_CORRECT, this.stickCorrect.bind(this));
this.node.on(e.STICK_CHOICE_WRONG, this.stickWrong.bind(this));
this.scheduleOnce(function() {
t._choiceContainers.forEach(function(t) {
return t.opacity = 255;
});
}, .1);
this.scheduleOnce(function() {
u.Util.showHelp(t._helpDragNode, t._helpDropNode);
}, .5);
};
o.prototype.speakWord = function(t) {
var o = this;
void 0 === t && (t = 0);
this.scheduleOnce(function() {
try {
u.Util.loadGameSound(o._currentConfig.sound, function(t) {
u.Util.play(t, !1);
});
} catch (t) {}
}, t);
};
o.prototype.createDog = function(t) {
var o = this;
this._dog = t.getChildByName("character_node").getChildByName("dog");
this._dog.active = !0;
u.Util.loadFriend(function(t) {
o._friend = t.getComponent(dragonBones.ArmatureDisplay);
o._dog.addChild(t);
o._friend.playAnimation("face_touch", 1);
});
};
o.prototype.createSoundBtn = function() {
var t = cc.instantiate(this.soundBtnPrefab);
t.setPosition(new cc.Vec2(320, 30));
t.getComponent(s.default).containerComponent = this;
this._wordNoteBoard.addChild(t);
};
o.prototype.loadTexture = function() {
var t = this;
u.Util.loadTexture(this._currentConfig.image, function(o) {
t.showImage(o);
});
};
o.prototype.showImage = function(t) {
var o = this._wordNoteBoard.getChildByName("imageNode");
o.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t);
this.checkRTLAndScaleX(o, .25);
o.scaleY = .25;
};
o.prototype.buildWordNoteBoard = function() {
this._wordNoteBoard = cc.instantiate(this.wordNoteBoardPrefab);
var t = this._wordNoteBoard.getChildByName("label"), o = t.getComponent(cc.Label);
t.addComponent(cc.LabelOutline).width = 2;
o.string = this._currentConfig.word;
this._wordNoteBoard.setPosition(new cc.Vec2(0, 263));
this.createSoundBtn();
this.loadTexture();
this.checkRTLAndScaleX(this._wordNoteBoard, 1);
this.checkRTLAndScaleX(t, 1);
this.node.addChild(this._wordNoteBoard);
};
o.prototype.onTouchEnd = function(t) {
this.speakWord();
};
o.prototype.buildDropContainer = function() {
this._dropContainer = cc.instantiate(this.dropContainerPrefab);
this._dropContainer.setPosition(new cc.Vec2(-80, 25));
if (this._isRTL) {
this._dropContainer.setPosition(new cc.Vec2(80, 25));
this.checkRTLAndScaleX(this._dropContainer, 1);
}
this._dropLayout = this._dropContainer.getChildByName("dropLayout");
this.addChildrenToDropLayout(this._dropLayout, this.stickerDropPrefab);
this.node.addChild(this._dropContainer);
};
o.prototype.addChildrenToDropLayout = function(t, o) {
this._rocketHead = cc.instantiate(this.rocketheadPrefab);
this.createDog(this._rocketHead);
t.addChild(this._rocketHead);
var e = "en/" === d.default.dir ? this._currentConfig.word.split("") : this._currentConfig.activeCard.split(","), r = this._currentConfig.card.split(","), n = "true" === this._currentConfig.fullboard || "true" === this._currentConfig.partialboard ? e : r;
this.buildWords(t, n || [], o, !0);
this._rocketTail = cc.instantiate(this.rockettailPrefab);
t.addChild(this._rocketTail);
};
o.prototype.createSticker = function(t, o, e, r, n, i) {
var c = n ? cc.instantiate(n) : t.getChildByName("sticker" + o);
n && t.addChild(c);
c.getComponent(a).size = new cc.Size(c.width, c.height);
var l = c.getChildByName("label");
l.color = cc.Color.WHITE;
var d = l.addComponent(cc.LabelOutline);
d.width = 3;
d.color = cc.Color.BLACK;
if (l) {
var u = l.getComponent(cc.Label);
l.width = 1 * u.fontSize;
if (r) {
c.color = cc.Color.GRAY;
l.opacity = 0;
c.opacity = 50;
this._totalDrops++;
} else c.color = new cc.Color().fromHEX("#" + Math.floor(16777215 * Math.random()).toString(16));
if (!r) {
var s = c.getComponent(h.default);
s.word = e;
s.name = e;
s.allowDrag = i;
l.opacity = i ? 255 : 128;
}
c.width = l.width;
if (u) {
c.name = e;
u.string = e;
}
}
return c;
};
o.prototype.buildWords = function(t, o, e, r) {
var n = this;
void 0 === r && (r = !1);
o.forEach(function(o, i) {
n._helpWord || (n._helpWord = o);
var c = !0;
"true" !== n._currentConfig.partialboard || "true" === n._currentConfig.fullboard || r || (c = n._currentConfig.activeCard.includes(o));
var a = n.createSticker(t, i + 1, o, r, e, c);
if (r) n._helpWord === o && (n._helpDropNode = a); else {
n._helpWord === o && (n._helpDragNode = a);
if (n._isRTL) {
var l = new cc.Node();
l.name = "shouldFlip";
a.addChild(l);
}
a.on("stickChoice", function() {
n._totalDrops--;
n.node.emit("correct");
0 === n._totalDrops && n.scheduleOnce(function() {
n.playSuccessAnimation();
}, 1);
});
a.on("stickNoChoice", function() {
n.node.emit("wrong");
});
}
});
};
o.prototype.stickCorrect = function(t) {
t.stopPropagation();
this._totalDrops--;
this.node.emit("correct");
if (0 === this._totalDrops) {
this.speakWord(0);
this.playSuccessAnimation();
}
};
o.prototype.stickWrong = function(t) {
t.stopPropagation();
this.node.emit("wrong");
};
o.prototype.moveToNext = function() {
this.node.emit("nextProblem");
};
o.prototype.playSuccessAnimation = function() {
var t = this;
this._rocketTail.getChildByName("fire").getComponent(cc.Animation).play("fire");
this.scheduleOnce(function() {
new cc.Tween().target(t._dropContainer).to(1.5, {
x: (cc.winSize.width + 100) * (t._isRTL ? 1 : -1)
}, {
progress: null,
easing: "quadOut"
}).call(function() {
t.moveToNext();
}).start();
}, 1);
};
o.prototype.removeDuplicateCharacters = function(t) {
return t.replace(/[\s\S](?=([\s\S]+))/g, function(t, o) {
return o.indexOf(t) + 1 ? "" : t;
});
};
o.prototype.diff = function(t, o) {
var e = "en/" === d.default.dir ? this._currentConfig.word.split("") : o.split(","), r = t.split(",").filter(function(t) {
return !o.includes(t);
});
return u.Util.shuffle(e.concat(r).slice(0, 26));
};
o.prototype.addChildrenToChoiceLayout = function(t, o, e) {
var r = this.buildShowWords(t);
this.buildWords(o, r || [], e, !1);
};
o.prototype.buildChoiceContainerSingleRow = function(t) {
var o = cc.instantiate(this.choiceContainerOneRowPrefab);
this.addChoiceContainerToNode(o, t, !1);
return o;
};
o.prototype.addChoiceContainerToNode = function(t, o, e) {
void 0 === e && (e = !1);
t.opacity = 0;
t.name = "choiceContainer" + o;
t.setPosition(new cc.Vec2(0, -150 * o + 50 * (o - 1)));
var r = t.getChildByName("choiceLayout");
e ? this.addChildrenToChoiceLayout(o, r, this.stickerPrefab) : this.addChildrenToChoiceLayoutSingleRow(o, r);
r.name = "choiceLayout" + o;
this.node.addChild(t);
this.updateChoiceLayout(r);
};
o.prototype.checkRTLAndScaleX = function(t, o) {
t.scaleX = this._isRTL ? -o : o;
};
o.prototype.buildShowWords = function(t) {
var o = "true" === this._currentConfig.fullboard || "true" === this._currentConfig.partialboard ? u.Util.chunk(this._mWord, Math.floor(this._mWord.length / 2)) : u.Util.shuffle(this._currentConfig.activeCard.split(","));
return "true" === this._currentConfig.fullboard || "true" === this._currentConfig.partialboard ? o[t - 1] : o;
};
o.prototype.addChildrenToChoiceLayoutSingleRow = function(t, o) {
var e = this.buildShowWords(t);
this.buildWords(o, e || [], null, !1);
};
o.prototype.buildChoiceContainer = function(t) {
var o = cc.instantiate(this.choiceContainerPrefab);
this.addChoiceContainerToNode(o, t, !0);
return o;
};
o.prototype.updateChoiceLayout = function(t) {
this.scheduleOnce(function() {
t.getComponent(cc.Layout).type = l.Type.NONE;
}, .05);
};
o.prototype.processConfiguration = function(t) {
void 0 === t && (t = []);
var o = [].concat.apply([], t), e = o[0], r = o[1], n = o[2], i = o[3], c = o[4], a = o[5], l = o[6], u = o[7], s = o[8], p = o[9];
0 === c.length && (c = f.AlphabetUtil.getRandomConsonantArray(d.default.dir).join(","));
return {
level: e,
worksheet: r,
problem: n,
word: i,
card: c,
activeCard: a,
sound: l,
image: u,
partialboard: s,
fullboard: p
};
};
n([ c(cc.Prefab) ], o.prototype, "wordNoteBoardPrefab", void 0);
n([ c(cc.Prefab) ], o.prototype, "dropContainerPrefab", void 0);
n([ c(cc.Prefab) ], o.prototype, "choiceContainerPrefab", void 0);
n([ c(cc.Prefab) ], o.prototype, "choiceContainerOneRowPrefab", void 0);
n([ c(cc.Prefab) ], o.prototype, "rocketheadPrefab", void 0);
n([ c(cc.Prefab) ], o.prototype, "rockettailPrefab", void 0);
n([ c(cc.Prefab) ], o.prototype, "stickerPrefab", void 0);
n([ c(cc.Prefab) ], o.prototype, "stickerDropPrefab", void 0);
n([ c(cc.Prefab) ], o.prototype, "soundBtnPrefab", void 0);
n([ c(cc.Prefab) ], o.prototype, "imageNodePrefab", void 0);
n([ y.default() ], o.prototype, "onLoad", null);
n([ y.default() ], o.prototype, "buildUI", null);
n([ y.default() ], o.prototype, "speakWord", null);
n([ y.default() ], o.prototype, "createDog", null);
n([ y.default() ], o.prototype, "createSoundBtn", null);
n([ y.default() ], o.prototype, "loadTexture", null);
n([ y.default() ], o.prototype, "showImage", null);
n([ y.default() ], o.prototype, "buildWordNoteBoard", null);
n([ y.default() ], o.prototype, "buildDropContainer", null);
n([ y.default() ], o.prototype, "addChildrenToDropLayout", null);
n([ y.default() ], o.prototype, "createSticker", null);
n([ y.default() ], o.prototype, "buildWords", null);
n([ y.default() ], o.prototype, "stickCorrect", null);
n([ y.default() ], o.prototype, "stickWrong", null);
n([ y.default() ], o.prototype, "moveToNext", null);
n([ y.default() ], o.prototype, "playSuccessAnimation", null);
n([ y.default() ], o.prototype, "removeDuplicateCharacters", null);
n([ y.default() ], o.prototype, "diff", null);
n([ y.default() ], o.prototype, "addChildrenToChoiceLayout", null);
n([ y.default() ], o.prototype, "buildChoiceContainerSingleRow", null);
n([ y.default() ], o.prototype, "addChoiceContainerToNode", null);
n([ y.default() ], o.prototype, "checkRTLAndScaleX", null);
n([ y.default() ], o.prototype, "buildShowWords", null);
n([ y.default() ], o.prototype, "addChildrenToChoiceLayoutSingleRow", null);
n([ y.default() ], o.prototype, "buildChoiceContainer", null);
n([ y.default() ], o.prototype, "updateChoiceLayout", null);
return o = n([ i ], o);
}(cc.Component);
e.default = _;
cc._RF.pop();
}, {
"../../../common/scripts/drag": void 0,
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/error-handler": void 0,
"../../../common/scripts/util": void 0,
"../../spelldoor/scripts/Utility": void 0,
"./sticker-choice": "sticker-choice",
"./word-sound-button": "word-sound-button"
} ],
"sticker-choice": [ function(t, o, e) {
"use strict";
cc._RF.push(o, "68357KHZmdHJYH5e+nGeKY1", "sticker-choice");
var r = this && this.__extends || function() {
var t = function(o, e) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, o) {
t.__proto__ = o;
} || function(t, o) {
for (var e in o) o.hasOwnProperty(e) && (t[e] = o[e]);
})(o, e);
};
return function(o, e) {
t(o, e);
function r() {
this.constructor = o;
}
o.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r());
};
}(), n = this && this.__decorate || function(t, o, e, r) {
var n, i = arguments.length, c = i < 3 ? o : null === r ? r = Object.getOwnPropertyDescriptor(o, e) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, o, e, r); else for (var a = t.length - 1; a >= 0; a--) (n = t[a]) && (c = (i < 3 ? n(c) : i > 3 ? n(o, e, c) : n(o, e)) || c);
return i > 3 && c && Object.defineProperty(o, e, c), c;
};
Object.defineProperty(e, "__esModule", {
value: !0
});
var i = t("../../../common/scripts/drag"), c = t("./rocket"), a = cc._decorator.ccclass, l = cc._decorator.property, d = t("../../../common/scripts/util"), u = t("../../../common/scripts/lib/error-handler"), s = function(t) {
r(o, t);
function o() {
var o = null !== t && t.apply(this, arguments) || this;
o._originalPosition = null;
o.name = "";
o.word = "";
o.correctClip = null;
o.wrongClip = null;
return o;
}
o.prototype.onLoad = function() {
t.prototype.onLoad.call(this);
};
o.prototype.start = function() {
t.prototype.start.call(this);
};
o.prototype.onTouchStart = function(o) {
t.prototype.onTouchStart.call(this, o);
this._originalPosition = this.node.position;
try {
d.Util.speakPhonicsOrLetter(this.word || this.name, function() {});
} catch (t) {}
};
o.prototype.onTouchMove = function(o) {
t.prototype.onTouchMove.call(this, o);
};
o.prototype.returnBackOnNoMatchPos = function() {
try {
this.wrongClip && d.Util.playSfx(this.wrongClip);
} catch (t) {}
return this._originalPosition ? this._originalPosition : this.node.position;
};
o.prototype.onTouchEnd = function(o) {
t.prototype.onTouchEnd.call(this, o);
this.match ? this.node.dispatchEvent(new cc.Event.EventCustom(c.STICK_CHOICE_CORRECT, !0)) : this.allowDrag && this.isMoved && this.node.dispatchEvent(new cc.Event.EventCustom(c.STICK_CHOICE_WRONG, !0));
};
o.prototype.onMatchOver = function() {
t.prototype.onMatchOver.call(this);
};
n([ l(cc.AudioClip) ], o.prototype, "correctClip", void 0);
n([ l(cc.AudioClip) ], o.prototype, "wrongClip", void 0);
n([ u.default() ], o.prototype, "onLoad", null);
return o = n([ a ], o);
}(i.default);
e.default = s;
cc._RF.pop();
}, {
"../../../common/scripts/drag": void 0,
"../../../common/scripts/lib/error-handler": void 0,
"../../../common/scripts/util": void 0,
"./rocket": "rocket"
} ],
"sticker-drop": [ function(t, o, e) {
"use strict";
cc._RF.push(o, "469d0J683hPaKec5sFv8XZs", "sticker-drop");
var r = this && this.__extends || function() {
var t = function(o, e) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, o) {
t.__proto__ = o;
} || function(t, o) {
for (var e in o) o.hasOwnProperty(e) && (t[e] = o[e]);
})(o, e);
};
return function(o, e) {
t(o, e);
function r() {
this.constructor = o;
}
o.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r());
};
}(), n = this && this.__decorate || function(t, o, e, r) {
var n, i = arguments.length, c = i < 3 ? o : null === r ? r = Object.getOwnPropertyDescriptor(o, e) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, o, e, r); else for (var a = t.length - 1; a >= 0; a--) (n = t[a]) && (c = (i < 3 ? n(c) : i > 3 ? n(o, e, c) : n(o, e)) || c);
return i > 3 && c && Object.defineProperty(o, e, c), c;
};
Object.defineProperty(e, "__esModule", {
value: !0
});
var i = t("../../../common/scripts/drop"), c = cc._decorator.ccclass, a = function(t) {
r(o, t);
function o() {
return null !== t && t.apply(this, arguments) || this;
}
o.prototype.onMatchOver = function() {
t.prototype.onMatchOver.call(this);
this.node.opacity = 255;
};
return o = n([ c ], o);
}(i.default);
e.default = a;
cc._RF.pop();
}, {
"../../../common/scripts/drop": void 0
} ],
"word-sound-button": [ function(t, o, e) {
"use strict";
cc._RF.push(o, "06bd7Dt3iFGwLj+Z+8zj0OH", "word-sound-button");
var r = this && this.__extends || function() {
var t = function(o, e) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, o) {
t.__proto__ = o;
} || function(t, o) {
for (var e in o) o.hasOwnProperty(e) && (t[e] = o[e]);
})(o, e);
};
return function(o, e) {
t(o, e);
function r() {
this.constructor = o;
}
o.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r());
};
}(), n = this && this.__decorate || function(t, o, e, r) {
var n, i = arguments.length, c = i < 3 ? o : null === r ? r = Object.getOwnPropertyDescriptor(o, e) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, o, e, r); else for (var a = t.length - 1; a >= 0; a--) (n = t[a]) && (c = (i < 3 ? n(c) : i > 3 ? n(o, e, c) : n(o, e)) || c);
return i > 3 && c && Object.defineProperty(o, e, c), c;
};
Object.defineProperty(e, "__esModule", {
value: !0
});
var i = cc._decorator.ccclass, c = t("../../../common/scripts/lib/error-handler"), a = function(t) {
r(o, t);
function o() {
var o = null !== t && t.apply(this, arguments) || this;
o._isSoundPlaying = !1;
return o;
}
o.prototype.playSound = function() {
if (!this._isSoundPlaying) {
this._isSoundPlaying = !0;
this.containerComponent.speakWord();
}
};
o.prototype.stopSound = function() {
this._isSoundPlaying = !1;
cc.audioEngine.stopAllEffects();
};
o.prototype.soundOnLoad = function() {
this.playSound();
};
o.prototype.onButtonClick = function(t, o) {
t.target;
this.stopSound();
this.playSound();
};
o.prototype.onDestroy = function() {
cc.audioEngine.stopAllEffects();
};
n([ c.default() ], o.prototype, "playSound", null);
n([ c.default() ], o.prototype, "stopSound", null);
n([ c.default() ], o.prototype, "soundOnLoad", null);
n([ c.default() ], o.prototype, "onButtonClick", null);
return o = n([ i ], o);
}(cc.Component);
e.default = a;
cc._RF.pop();
}, {
"../../../common/scripts/lib/error-handler": void 0
} ]
}, {}, [ "rocket", "sticker-choice", "sticker-drop", "word-sound-button" ]);