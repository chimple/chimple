window.__require = function t(o, e, n) {
function i(c, l) {
if (!e[c]) {
if (!o[c]) {
var a = c.split("/");
a = a[a.length - 1];
if (!o[a]) {
var s = "function" == typeof __require && __require;
if (!l && s) return s(a, !0);
if (r) return r(a, !0);
throw new Error("Cannot find module '" + c + "'");
}
c = a;
}
var p = e[c] = {
exports: {}
};
o[c][0].call(p.exports, function(t) {
return i(o[c][1][t] || t);
}, p, p.exports, t, o, e, n);
}
return e[c].exports;
}
for (var r = "function" == typeof __require && __require, c = 0; c < n.length; c++) i(n[c]);
return i;
}({
Utility: [ function(t, o, e) {
"use strict";
cc._RF.push(o, "17645ZqYAJEjYqU32CU9ltl", "Utility");
Object.defineProperty(e, "__esModule", {
value: !0
});
e.AlphabetUtil = e.LetterType = void 0;
var n, i = t("../../../common/scripts/util"), r = t("../../../common/scripts/lib/config");
(function(t) {
t[t.Consonant = 0] = "Consonant";
t[t.Vowel = 1] = "Vowel";
})(n = e.LetterType || (e.LetterType = {}));
var c = {
"en/": [ [ "a", "e", "i", "o", "u" ], [ "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z" ] ],
"hi/": [ [ "अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ए", "ऐ", "ओ", "औ", "अं", "अः", "अँ" ], [ "क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ", "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न", "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह" ] ]
}, l = function() {
function t() {}
t.isConsonantOrVowel = function(o) {
return t.contains(c[r.default.i.course.lang + "/"][0], o) ? n.Vowel : n.Consonant;
};
t.getRandomVowel = function() {
return c[r.default.i.course.lang + "/"][0][Math.floor(Math.random() * c[r.default.i.course.lang + "/"][0].length)].toUpperCase();
};
t.getRandomConsonant = function() {
return c[r.default.i.course.lang + "/"][1][Math.floor(Math.random() * c[r.default.i.course.lang + "/"][1].length)].toUpperCase();
};
t.getRandomConsonantArray = function(t) {
return c[t][1];
};
t.contains = function(t, o) {
return t.indexOf(o) > -1;
};
t.getRandomVowelArray = function(o) {
if (o > 5) throw new Error("Size should be less than or equal to 21");
for (var e = new Array(o), n = 0; n < o; n++) {
var i = this.getRandomVowel();
t.contains(e, i) ? n-- : e[n] = i;
}
e.forEach(function(t) {
console.log("Random Vowels Generated " + t);
});
return e;
};
t.playLetterSound = function(t, o) {
o ? i.Util.load(r.default.dir + "sound/wordvoice/" + t + ".mp3", function(t, o) {
cc.log("Audio Error: " + t);
cc.audioEngine.play(o, !1, 1);
}, !0) : i.Util.load(r.default.dir + "sound/lettervoice/" + t + ".mp3", function(t, o) {
cc.log("Audio Error: " + t);
cc.audioEngine.play(o, !1, 1);
}, !0);
};
return t;
}();
e.AlphabetUtil = l;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/util": void 0
} ],
spelldoor: [ function(t, o, e) {
"use strict";
cc._RF.push(o, "32d3et6w8hIjqTgdBZJpv/o", "spelldoor");
var n = this && this.__extends || function() {
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
function n() {
this.constructor = o;
}
o.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
};
}(), i = this && this.__decorate || function(t, o, e, n) {
var i, r = arguments.length, c = r < 3 ? o : null === n ? n = Object.getOwnPropertyDescriptor(o, e) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, o, e, n); else for (var l = t.length - 1; l >= 0; l--) (i = t[l]) && (c = (r < 3 ? i(c) : r > 3 ? i(o, e, c) : i(o, e)) || c);
return r > 3 && c && Object.defineProperty(o, e, c), c;
};
Object.defineProperty(e, "__esModule", {
value: !0
});
var r = t("../../../common/scripts/lib/config"), c = t("../../../common/scripts/drag"), l = t("./spellingDrag"), a = t("../../../common/scripts/util"), s = t("./Utility"), p = t("../../../common/scripts/lib/error-handler"), u = cc._decorator, d = u.ccclass, f = u.property, h = function(t) {
n(o, t);
function o() {
var o = null !== t && t.apply(this, arguments) || this;
o.dropLayout = null;
o.choiceLayout = null;
o.sprite = null;
o.spellingDrag = null;
o.spellingDrop = null;
o.anim = null;
o.friendPos = null;
o.friend = null;
o.choices = [];
o.clip = null;
o.empty = 0;
return o;
}
o.prototype.onLoad = function() {
var t = this, o = r.default.getInstance();
cc.director.getCollisionManager().enabled = !0;
c.default.letDrag = !1;
a.Util.loadFriend(function(o) {
t.friend = o.getComponent(dragonBones.ArmatureDisplay);
t.friendPos.addChild(o);
t.friend.playAnimation("sad", 1);
});
var e = o.data[0], n = (e[0], e[1], e[2], e[3]), i = e[4], p = e[5], u = e[6], d = e[7], f = e[8], h = null, y = null, g = new GraphemeSplitter(), m = g.splitGraphemes(i), v = parseInt(p), _ = parseInt(u);
g.splitGraphemes(n).forEach(function(o, e, n) {
s.AlphabetUtil.isConsonantOrVowel(o) == s.LetterType.Consonant ? v-- : _--;
var i = cc.instantiate(t.spellingDrop);
i.name = o;
t.dropLayout.addChild(i);
var r = t.createDrag(o);
i.addChild(r);
if ("*" == m[e] || 0 == t.empty && e == n.length - 1) {
t.empty++;
t.choices.push(r);
if (null == h) {
h = r;
y = i;
}
new cc.Tween().target(r).delay(3).to(.5, {
y: -cc.winSize.height
}, null).start();
} else r.getComponent(l.default).allowDrag = !1;
});
for (;v-- > 0; ) this.choices.push(this.createDrag(s.AlphabetUtil.getRandomConsonant().toLowerCase()));
for (;_-- > 0; ) this.choices.push(this.createDrag(s.AlphabetUtil.getRandomVowel().toLowerCase()));
a.Util.loadTexture(d, function(o) {
t.anim.once("finished", function() {
t.scheduleOnce(function() {
t.sprite.spriteFrame = new cc.SpriteFrame(o);
a.Util.loadGameSound(f, function(o) {
if (null != o) {
t.clip = o;
a.Util.play(o, !1);
}
});
t.anim.play().wrapMode = cc.WrapMode.Reverse;
}, 1);
});
t.scheduleOnce(function() {
t.anim.play();
}, 1);
});
var w = this.choiceLayout.y;
new cc.Tween().target(this.choiceLayout).set({
y: -cc.winSize.height
}).delay(5).call(function() {
a.Util.shuffle(t.choices);
t.choices.forEach(function(o) {
if (null != o.parent) {
o.removeFromParent();
o.position = cc.Vec2.ZERO;
}
var e = new cc.Node();
e.width = o.width;
e.addChild(o);
t.choiceLayout.addChild(e);
});
}).to(.5, {
y: w
}, null).call(function() {
a.Util.showHelp(h, y);
c.default.letDrag = !0;
}).start();
};
o.prototype.createDrag = function(t) {
var o = this, e = cc.instantiate(this.spellingDrag);
e.name = t;
e.on("spellingMatch", this.onMatch.bind(this));
e.on("spellingNoMatch", function() {
o.node.emit("wrong");
});
return e;
};
o.prototype.onMatch = function() {
var t = this;
this.node.emit("correct");
if (--this.empty <= 0) {
c.default.letDrag = !1;
null != this.clip && this.scheduleOnce(function() {
return a.Util.play(t.clip, !1);
}, .5);
this.endAnimate();
}
};
o.prototype.endAnimate = function() {
var t = this;
this.scheduleOnce(function() {
t.anim.once("finished", function() {
new cc.Tween().target(t.friendPos).delay(.5).call(function() {
null != t.friend && t.friend.playAnimation("jumping", 1);
}).to(1, {
x: 0
}, null).delay(1).call(function() {
t.node.emit("nextProblem");
}).start();
});
t.anim.play().wrapMode = cc.WrapMode.Normal;
}, 1);
};
i([ f(cc.Node) ], o.prototype, "dropLayout", void 0);
i([ f(cc.Node) ], o.prototype, "choiceLayout", void 0);
i([ f(cc.Sprite) ], o.prototype, "sprite", void 0);
i([ f(cc.Prefab) ], o.prototype, "spellingDrag", void 0);
i([ f(cc.Prefab) ], o.prototype, "spellingDrop", void 0);
i([ f(cc.Animation) ], o.prototype, "anim", void 0);
i([ f(cc.Node) ], o.prototype, "friendPos", void 0);
i([ p.default() ], o.prototype, "onLoad", null);
return o = i([ d ], o);
}(cc.Component);
e.default = h;
cc._RF.pop();
}, {
"../../../common/scripts/drag": void 0,
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/error-handler": void 0,
"../../../common/scripts/util": void 0,
"./Utility": "Utility",
"./spellingDrag": "spellingDrag"
} ],
spellingDrag: [ function(t, o, e) {
"use strict";
cc._RF.push(o, "1d505nPB4hNAI/dqMsKYwJt", "spellingDrag");
var n = this && this.__extends || function() {
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
function n() {
this.constructor = o;
}
o.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
};
}(), i = this && this.__decorate || function(t, o, e, n) {
var i, r = arguments.length, c = r < 3 ? o : null === n ? n = Object.getOwnPropertyDescriptor(o, e) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, o, e, n); else for (var l = t.length - 1; l >= 0; l--) (i = t[l]) && (c = (r < 3 ? i(c) : r > 3 ? i(o, e, c) : i(o, e)) || c);
return r > 3 && c && Object.defineProperty(o, e, c), c;
};
Object.defineProperty(e, "__esModule", {
value: !0
});
var r = t("../../../common/scripts/drag"), c = t("../../../common/scripts/util"), l = cc._decorator, a = l.ccclass, s = (l.property, 
function(t) {
n(o, t);
function o() {
var o = null !== t && t.apply(this, arguments) || this;
o._soundClip = null;
return o;
}
o.prototype.onLoad = function() {
var o = this;
t.prototype.onLoad.call(this);
this.label.string = this.node.name;
c.Util.loadsPhonicsOrLetter(this.node.name.toLowerCase(), function(t) {
o._soundClip = t;
});
};
o.prototype.onTouchStart = function(o) {
t.prototype.onTouchStart.call(this, o);
if (null != this._soundClip) try {
c.Util.play(this._soundClip, !1);
} catch (t) {
console.log("Failed playing sound");
}
};
o.prototype.onTouchEnd = function(o) {
var e = this.allowDrag;
t.prototype.onTouchEnd.call(this, o);
e && this.isMoved && (this.match ? this.node.emit("spellingMatch", this) : this.node.emit("spellingNoMatch"));
};
return o = i([ a ], o);
}(r.default));
e.default = s;
cc._RF.pop();
}, {
"../../../common/scripts/drag": void 0,
"../../../common/scripts/util": void 0
} ],
spellingDrop: [ function(t, o, e) {
"use strict";
cc._RF.push(o, "ac928EDQMVMboj3SFohsgXo", "spellingDrop");
Object.defineProperty(e, "__esModule", {
value: !0
});
e.MissingBox = void 0;
var n = function() {
function t(t, o, e) {
this.letter = o;
this.index = t;
this.isVowelOrConsonant = e;
}
t.prototype.setIndex = function(t) {
this.index = t;
};
t.prototype.setLetter = function(t) {
this.letter = t;
};
t.prototype.setBoundary = function(t) {
this.boundary = t;
};
t.prototype.setPosition = function(t) {
this.position = t;
};
return t;
}();
e.MissingBox = n;
cc._RF.pop();
}, {} ]
}, {}, [ "Utility", "spelldoor", "spellingDrag", "spellingDrop" ]);