window.__require = function t(e, o, n) {
function r(c, s) {
if (!o[c]) {
if (!e[c]) {
var a = c.split("/");
a = a[a.length - 1];
if (!e[a]) {
var l = "function" == typeof __require && __require;
if (!s && l) return l(a, !0);
if (i) return i(a, !0);
throw new Error("Cannot find module '" + c + "'");
}
c = a;
}
var p = o[c] = {
exports: {}
};
e[c][0].call(p.exports, function(t) {
return r(e[c][1][t] || t);
}, p, p.exports, t, e, o, n);
}
return o[c].exports;
}
for (var i = "function" == typeof __require && __require, c = 0; c < n.length; c++) r(n[c]);
return r;
}({
left: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "2772dr2wV5DJ5pXYoO3qIJg", "left");
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
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var s = t.length - 1; s >= 0; s--) (r = t[s]) && (c = (i < 3 ? r(c) : i > 3 ? r(e, o, c) : r(e, o)) || c);
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
e.prototype.onLoad = function() {};
return e = r([ i ], e);
}(cc.Component);
o.default = c;
cc._RF.pop();
}, {} ],
"nav-button": [ function(t, e, o) {
"use strict";
cc._RF.push(e, "faaebRKxZ5Mh6CYTO/nCbf6", "nav-button");
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
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var s = t.length - 1; s >= 0; s--) (r = t[s]) && (c = (i < 3 ? r(c) : i > 3 ? r(e, o, c) : r(e, o)) || c);
return i > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator.ccclass, c = t("./story-page"), s = t("../../../common/scripts/lib/error-handler"), a = !0, l = function(t) {
n(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.onLoad = function() {
a = !0;
};
e.prototype.onClick = function(t, e) {
if (a) {
a = !1;
this.node.parent.getComponent(c.StoryPage).changePage(Number(e));
}
};
r([ s.default() ], e.prototype, "onLoad", null);
r([ s.default() ], e.prototype, "onClick", null);
return e = r([ i ], e);
}(cc.Component);
o.default = l;
cc._RF.pop();
}, {
"../../../common/scripts/lib/error-handler": void 0,
"./story-page": "story-page"
} ],
right: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "69f6e/u5kpACIaUR+dUW1em", "right");
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
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var s = t.length - 1; s >= 0; s--) (r = t[s]) && (c = (i < 3 ? r(c) : i > 3 ? r(e, o, c) : r(e, o)) || c);
return i > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = t("../../../common/scripts/lib/error-handler"), c = cc._decorator, s = c.ccclass, a = (c.property, 
function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.lastIndex = -1;
e.storyText = null;
e.words = null;
return e;
}
e.prototype.Handler = function(t, e) {
var o = e.split("_"), n = o[0], r = o[1];
this.speakAndHighLight(n, r, "#000000", "#ff0000");
};
e.prototype.speakAndHighLight = function(t, e, o, n) {
var r = this;
cc.log("storyText", this.storyText, "word to highlight", t);
this.highlight(t, e, o, n);
var i = this.words.get(t);
try {
if (i) {
var c = cc.audioEngine.playEffect(i, !1);
cc.audioEngine.setFinishCallback(c, function() {
r.noHighlight(t, e, "#ff0000", "#000000");
});
} else this.noHighlight(t, e, "#ff0000", "#000000");
} catch (t) {}
};
e.prototype.highlight = function(t, e, o, n, r) {
void 0 === r && (r = !1);
var i = 'color="' + o + '" param="' + t + "_" + e + '"', c = 'color="' + n + '" param="' + t + "_" + e + '"';
if (r) {
this.lastIndex > -1 ? this.node.getComponent(cc.RichText).string = this.storyText.slice(0, this.lastIndex) + this.storyText.slice(this.lastIndex).replace(i, c) : this.node.getComponent(cc.RichText).string = this.storyText.replace(i, c);
cc.log("this.storyText after highlight", this.node.getComponent(cc.RichText).string);
this.lastIndex = this.storyText.indexOf(t) > this.lastIndex ? this.storyText.indexOf(t) : this.lastIndex;
} else this.node.getComponent(cc.RichText).string = this.storyText.replace(i, c);
};
e.prototype.noHighlight = function(t, e, o, n) {
var r = 'color="' + o + '" param="' + t + "_" + e + '"', i = 'color="' + n + '" param="' + t + "_" + e + '"';
this.node.getComponent(cc.RichText).string = this.storyText.replace(r, i);
cc.log("this.storyText after no highlight", this.node.getComponent(cc.RichText).string);
};
r([ i.default() ], e.prototype, "Handler", null);
r([ i.default() ], e.prototype, "speakAndHighLight", null);
r([ i.default() ], e.prototype, "highlight", null);
r([ i.default() ], e.prototype, "noHighlight", null);
return e = r([ s ], e);
}(cc.Component));
o.default = a;
cc._RF.pop();
}, {
"../../../common/scripts/lib/error-handler": void 0
} ],
selector: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "31778Y2NMdLW7xWIl8F58d2", "selector");
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
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var s = t.length - 1; s >= 0; s--) (r = t[s]) && (c = (i < 3 ? r(c) : i > 3 ? r(e, o, c) : r(e, o)) || c);
return i > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
o.Selector = o.ConfigType = void 0;
var i, c = cc._decorator.ccclass, s = t("../../../common/scripts/lib/config"), a = cc._decorator.property, l = t("../../../common/scripts/lib/error-handler");
(function(t) {
t[t.Story = 0] = "Story";
t[t.Quiz = 1] = "Quiz";
})(i = o.ConfigType || (o.ConfigType = {}));
var p = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.storyPage = null;
e.quizPage = null;
e.draw = null;
return e;
}
e.prototype.onLoad = function() {
var t = s.default.getInstance(), e = this.processConfiguration(t.data[0]), o = cc.instantiate(this.draw);
o.zIndex = 2;
this.node.addChild(o);
if (e === i.Story) {
var n = cc.instantiate(this.storyPage);
n.zIndex = 1;
this.node.addChild(n);
} else if (e === i.Quiz) {
var r = cc.instantiate(this.quizPage);
r.zIndex = 1;
this.node.addChild(r);
}
};
e.prototype.processConfiguration = function(t) {
void 0 === t && (t = []);
var e = [].concat.apply([], t), o = (e[0], e[1], e[2], e[3]);
e.slice(4);
return "S" === o ? i.Story : i.Quiz;
};
r([ a(cc.Prefab) ], e.prototype, "storyPage", void 0);
r([ a(cc.Prefab) ], e.prototype, "quizPage", void 0);
r([ a(cc.Prefab) ], e.prototype, "draw", void 0);
r([ l.default() ], e.prototype, "onLoad", null);
return e = r([ c ], e);
}(cc.Component);
o.Selector = p;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/error-handler": void 0
} ],
"story-page": [ function(t, e, o) {
"use strict";
cc._RF.push(e, "7d2edAAWHhOoawyDyowtMdn", "story-page");
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
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var s = t.length - 1; s >= 0; s--) (r = t[s]) && (c = (i < 3 ? r(c) : i > 3 ? r(e, o, c) : r(e, o)) || c);
return i > 3 && c && Object.defineProperty(e, o, c), c;
}, i = this && this.__generator || function(t, e) {
var o, n, r, i, c = {
label: 0,
sent: function() {
if (1 & r[0]) throw r[1];
return r[1];
},
trys: [],
ops: []
};
return i = {
next: s(0),
throw: s(1),
return: s(2)
}, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
return this;
}), i;
function s(t) {
return function(e) {
return a([ t, e ]);
};
}
function a(i) {
if (o) throw new TypeError("Generator is already executing.");
for (;c; ) try {
if (o = 1, n && (r = 2 & i[0] ? n.return : i[0] ? n.throw || ((r = n.return) && r.call(n), 
0) : n.next) && !(r = r.call(n, i[1])).done) return r;
(n = 0, r) && (i = [ 2 & i[0], r.value ]);
switch (i[0]) {
case 0:
case 1:
r = i;
break;

case 4:
c.label++;
return {
value: i[1],
done: !1
};

case 5:
c.label++;
n = i[1];
i = [ 0 ];
continue;

case 7:
i = c.ops.pop();
c.trys.pop();
continue;

default:
if (!(r = c.trys, r = r.length > 0 && r[r.length - 1]) && (6 === i[0] || 2 === i[0])) {
c = 0;
continue;
}
if (3 === i[0] && (!r || i[1] > r[0] && i[1] < r[3])) {
c.label = i[1];
break;
}
if (6 === i[0] && c.label < r[1]) {
c.label = r[1];
r = i;
break;
}
if (r && c.label < r[2]) {
c.label = r[2];
c.ops.push(i);
break;
}
r[2] && c.ops.pop();
c.trys.pop();
continue;
}
i = e.call(t, c);
} catch (t) {
i = [ 6, t ];
n = 0;
} finally {
o = r = 0;
}
if (5 & i[0]) throw i[1];
return {
value: i[0] ? i[1] : void 0,
done: !0
};
}
}, c = this && this.__values || function(t) {
var e = "function" == typeof Symbol && Symbol.iterator, o = e && t[e], n = 0;
if (o) return o.call(t);
if (t && "number" == typeof t.length) return {
next: function() {
t && n >= t.length && (t = void 0);
return {
value: t && t[n++],
done: !t
};
}
};
throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(o, "__esModule", {
value: !0
});
o.StoryPage = o.LANDSCAPE = o.PORTRAIT = void 0;
var s = cc._decorator.ccclass, a = cc._decorator.property, l = t("../../../common/scripts/lib/config"), p = t("./right"), u = t("../../../common/scripts/util"), f = t("../../../common/scripts/lib/error-handler"), h = t("../../../common/scripts/helper");
o.PORTRAIT = "P";
o.LANDSCAPE = "L";
var d = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.landscape = null;
e.portrait = null;
e.word = null;
e.lleft = null;
e.lright = null;
e.pleft = null;
e.pright = null;
e.nextButton = null;
e.prevButton = null;
e._inOrderWords = [];
e._words = new Map();
e._storyContent = null;
e._isSideBySide = !0;
e._rightComponent = null;
e._storyDir = null;
e._soundDir = null;
e._ableToSpeakAnyIndividualClip = -1;
e._imageNode = null;
e._textNode = null;
e.displayIterator = function(t, e, o, n) {
var r;
void 0 === o && (o = Infinity);
void 0 === n && (n = 1);
return (r = {})[Symbol.iterator] = function() {
var r = !1, i = 0;
return {
next: function() {
i = e;
e = (r = e >= o) ? i : e + n;
return {
done: r,
value: t[i],
index: i
};
}
};
}, r;
};
return e;
}
e.prototype.onLoad = function() {
var t = this, e = l.default.getInstance();
this._storyDir = l.default.dir + (e.game + "/") + e.gameLevelName + "/res/" + e.worksheet + "/";
this._soundDir = l.default.dir + (e.game + "/") + e.gameLevelName + "/res/" + e.worksheet + "/" + e.problem + "/";
this._storyConfig = this.processConfiguration(e.data[0]);
this._isSideBySide = this._storyConfig.layout === o.LANDSCAPE;
this._isSideBySide ? this._storyContent = cc.instantiate(this.landscape) : this._storyContent = cc.instantiate(this.portrait);
this.node.on(h.SOUND_LOADED_EVENT, function() {
t.showText();
});
this.initLayout();
this.renderNextPrevButtons();
};
e.prototype.renderText = function() {
var t = this, e = null;
l.default.getInstance();
if (this._storyConfig.text) {
e = this._storyConfig.layout === o.LANDSCAPE ? cc.instantiate(this.lright) : cc.instantiate(this.pright);
var n = this._storyConfig.text.split(" ");
this._rightComponent = e.getComponent(p.default);
n.forEach(function(e, o) {
e = e.toString().replace(/"/g, "");
t._inOrderWords.push(e);
u.Util.loadGameSound(t._soundDir + o + ".m4a", function(r) {
t._words.set(e, r);
o === n.length - 1 && t.node.emit(h.SOUND_LOADED_EVENT);
});
});
}
return e;
};
e.prototype.renderImage = function() {
var t = null;
if (this._storyConfig.image) {
var e = (t = this._storyConfig.layout === o.LANDSCAPE ? cc.instantiate(this.lleft) : cc.instantiate(this.pleft)).width, n = t.height;
u.Util.loadTexture(this._storyDir + this._storyConfig.image, function(o) {
if (o) {
var r = t.getComponent(cc.Sprite);
r.spriteFrame = new cc.SpriteFrame(o);
var i = r.spriteFrame.getOriginalSize(), c = e / i.width, s = n / i.height, a = Math.min(c, s);
t.width = a * i.width;
t.height = a * i.height;
}
});
}
return t;
};
e.prototype.isTitlePage = function() {
return "1" === this._storyConfig.problemNo;
};
e.prototype.isLastPage = function() {
var t = l.default.getInstance();
return Number(this._storyConfig.problemNo) === t.totalProblems;
};
e.prototype.renderNextPrevButtons = function() {
l.default.getInstance();
var t = null, e = null;
if (this.isTitlePage()) (t = cc.instantiate(this.nextButton)).active = !1; else if (this.isLastPage()) {
e = cc.instantiate(this.prevButton);
(t = cc.instantiate(this.nextButton)).active = !1;
e.active = !1;
} else {
t = cc.instantiate(this.nextButton);
e = cc.instantiate(this.prevButton);
t.active = !1;
e.active = !1;
}
if (t) {
this.node.addChild(t);
this.scheduleOnce(function() {
t.active = !0;
}, .5);
}
if (e) {
this.node.addChild(e);
this.scheduleOnce(function() {
e.active = !0;
}, .5);
}
};
e.prototype.changePage = function(t) {
cc.audioEngine.stopAll();
cc.log("direction", t);
this.node.parent.emit("nextProblem");
};
e.prototype.initLayout = function() {
this._isSideBySide = this._storyConfig.layout === o.LANDSCAPE;
this._isSideBySide ? this._storyContent = cc.instantiate(this.landscape) : this._storyContent = cc.instantiate(this.portrait);
this.node.getChildByName("sheet").addChild(this._storyContent);
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
e.prototype.showText = function() {
var t = this;
if (this._textNode) {
var e = this.createTextToken(this._storyConfig.text);
this._textNode.getComponent(cc.RichText).string = e;
this._rightComponent.storyText = JSON.parse(JSON.stringify(e));
this._rightComponent.words = this._words;
this.scheduleOnce(function() {
var e = t.displayIterator(t._inOrderWords, 0, t._inOrderWords.length)[Symbol.iterator]();
t.speakWordOneByOne(e);
}, 1);
}
};
e.prototype.gen = function() {
return i(this, function(t) {
switch (t.label) {
case 0:
return [ 5, c(this._inOrderWords) ];

case 1:
t.sent();
return [ 2 ];
}
});
};
e.prototype.speakWordOneByOne = function(t) {
var e = this, o = t.next();
if (o && !o.done && o.value) {
var n = o.value;
if (this._words) {
var r = this._words.get(n);
this.speak(n, o.index, r, function() {
e._rightComponent && e._rightComponent.noHighlight(n, o.index, "#ff0000", "#000000");
e.speakWordOneByOne(t);
});
}
} else this.speakFullSentenceWithoutHighlight();
};
e.prototype.speakFullSentenceWithoutHighlight = function() {
var t = this, e = [];
if (-1 === this._ableToSpeakAnyIndividualClip) {
e = this._storyConfig.storySoundFile.map(function(e) {
return t._storyDir + e;
});
u.Util.speakOneByOne(e, 0, function(t) {});
}
};
e.prototype.speak = function(t, e, o, n) {
if (null !== o) {
var r = cc.audioEngine.playEffect(o, !1);
if (-1 !== r) {
this._rightComponent && this._rightComponent.highlight(t, e, "#000000", "#ff0000", !0);
this._ableToSpeakAnyIndividualClip = 1;
cc.audioEngine.setFinishCallback(r, n);
} else this.errorInSpeakClip(n);
} else this.errorInSpeakClip(n);
};
e.prototype.errorInSpeakClip = function(t) {
1 !== this._ableToSpeakAnyIndividualClip && (this._ableToSpeakAnyIndividualClip = -1);
this.scheduleOnce(function() {
t();
}, .25);
};
e.prototype.createTextToken = function(t) {
t.replace;
return t.split(/\s+/).map(function(t, e) {
return '<color="#000000" param="' + (t = t.toString().replace(/"/g, "")) + "_" + e + '" click="Handler">' + t + "</color>";
}).join(" ");
};
e.prototype.processConfiguration = function(t) {
void 0 === t && (t = []);
var e = [].concat.apply([], t), o = e[0], n = e[1], r = e[2];
e[3];
return {
level: o,
workSheet: n,
problemNo: r,
text: e[4],
image: e[5],
layout: e[6],
storySoundFile: e[7].split(",")
};
};
e.prototype.onDestroy = function() {
cc.audioEngine.stopAll();
};
r([ a(cc.Prefab) ], e.prototype, "landscape", void 0);
r([ a(cc.Prefab) ], e.prototype, "portrait", void 0);
r([ a(cc.Prefab) ], e.prototype, "word", void 0);
r([ a(cc.Prefab) ], e.prototype, "lleft", void 0);
r([ a(cc.Prefab) ], e.prototype, "lright", void 0);
r([ a(cc.Prefab) ], e.prototype, "pleft", void 0);
r([ a(cc.Prefab) ], e.prototype, "pright", void 0);
r([ a(cc.Prefab) ], e.prototype, "nextButton", void 0);
r([ a(cc.Prefab) ], e.prototype, "prevButton", void 0);
r([ f.default() ], e.prototype, "onLoad", null);
r([ f.default() ], e.prototype, "renderText", null);
r([ f.default() ], e.prototype, "renderImage", null);
r([ f.default() ], e.prototype, "isTitlePage", null);
r([ f.default() ], e.prototype, "isLastPage", null);
r([ f.default() ], e.prototype, "renderNextPrevButtons", null);
r([ f.default() ], e.prototype, "changePage", null);
r([ f.default() ], e.prototype, "initLayout", null);
r([ f.default() ], e.prototype, "showText", null);
r([ f.default() ], e.prototype, "speakWordOneByOne", null);
r([ f.default() ], e.prototype, "speakFullSentenceWithoutHighlight", null);
r([ f.default() ], e.prototype, "speak", null);
r([ f.default() ], e.prototype, "errorInSpeakClip", null);
r([ f.default() ], e.prototype, "createTextToken", null);
return e = r([ s ], e);
}(cc.Component);
o.StoryPage = d;
cc._RF.pop();
}, {
"../../../common/scripts/helper": void 0,
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/error-handler": void 0,
"../../../common/scripts/util": void 0,
"./right": "right"
} ],
"word-script": [ function(t, e, o) {
"use strict";
cc._RF.push(e, "b36ed1TDEVOB6AfUnNMv5iA", "word-script");
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
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var s = t.length - 1; s >= 0; s--) (r = t[s]) && (c = (i < 3 ? r(c) : i > 3 ? r(e, o, c) : r(e, o)) || c);
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
e.prototype.onButtonClick = function(t, e) {};
return e = r([ i ], e);
}(cc.Component);
o.default = c;
cc._RF.pop();
}, {} ]
}, {}, [ "left", "nav-button", "right", "selector", "story-page", "word-script" ]);