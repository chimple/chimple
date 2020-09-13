window.__require = function e(t, o, n) {
function i(r, l) {
if (!o[r]) {
if (!t[r]) {
var c = r.split("/");
c = c[c.length - 1];
if (!t[c]) {
var s = "function" == typeof __require && __require;
if (!l && s) return s(c, !0);
if (a) return a(c, !0);
throw new Error("Cannot find module '" + r + "'");
}
r = c;
}
var u = o[r] = {
exports: {}
};
t[r][0].call(u.exports, function(e) {
return i(t[r][1][e] || e);
}, u, u.exports, e, t, o, n);
}
return o[r].exports;
}
for (var a = "function" == typeof __require && __require, r = 0; r < n.length; r++) i(n[r]);
return i;
}({
nimbletable: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "6a390mFaB9B/LrP8hn2ahQC", "nimbletable");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), i = this && this.__decorate || function(e, t, o, n) {
var i, a = arguments.length, r = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, o, n); else for (var l = e.length - 1; l >= 0; l--) (i = e[l]) && (r = (a < 3 ? i(r) : a > 3 ? i(t, o, r) : i(t, o)) || r);
return a > 3 && r && Object.defineProperty(t, o, r), r;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = e("../../../common/scripts/lib/config"), r = e("../../../common/scripts/util"), l = e("../../../common/scripts/lib/error-handler"), c = cc._decorator, s = c.ccclass, u = c.property, m = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.label = null;
t.choicesPrefab = null;
t.correctAudio = null;
t.wrongAudio = null;
t.text = "hello";
t.arr_name = [];
t.currentProblem = 0;
t.totalNextQues = 4;
t.checkLasts = !1;
t._totalCount = null;
t.isInitial = !0;
return t;
}
t.prototype.nextProblem = function() {
this.currentProblem++;
if ("" == this.arr_name[this.currentProblem][5]) this.node.emit("nextProblem"); else {
this.node.getChildByName("examples").getChildByName("layoutExamples").removeAllChildren();
this.makeScreen();
}
};
t.prototype.makeNimbleTableData = function(e) {
for (var t = [], o = 0, n = 3; n < e.length; n += 7) {
o++;
var i = n, a = [ "1", "1", "1", "1" ];
a.push(e[i + 3]);
a.push(e[i + 4]);
a.push(e[i + 5]);
a.push(e[i + 6]);
for (var r = 0, l = +e[i]; r < 15; r++, l += +e[i + 2]) l <= +e[i + 1] ? a.push(l.toString()) : a.push("");
t.push(a);
}
for (n = 1; n <= o; n++) t.push([ "1", "1", n.toString(), "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ]);
return t;
};
t.prototype.onLoad = function() {
a.default.getInstance();
var e = this.makeNimbleTableData(a.default.i.data[0]);
console.log("data came", e);
this.arr_name = e;
this.makeScreen();
};
t.prototype.makeScreen = function() {
this.examples = [];
var e = this.arr_name[this.currentProblem];
this.firstValue = e[4];
this.secondValue = e[5];
this.mathSign = e[6];
this.rightAnswer = e[7];
var t = null;
this._totalCount = this.rightAnswer;
"" != this.firstValue && (this.node.getChildByName("questionboard_quickfacts").getChildByName("question").getComponent(cc.Label).string = this.firstValue + " " + this.mathSign + " " + this.secondValue + " = ?");
for (var o = 8; o <= 22; o++) if ("" != e[o]) {
this.totalExamplesCount = o;
this.examples.push(e[o]);
var n = cc.instantiate(this.choicesPrefab);
n.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = e[o];
e[o] === this.rightAnswer && null != n && (t = n);
this.node.getChildByName("examples").getChildByName("layoutExamples").addChild(n);
n.name = "2_" + o;
n.getComponent(cc.Button).node.on("click", this.callback, this);
n.getComponent(cc.Animation).play("popup");
}
if (this.isInitial) {
this.isInitial = !1;
try {
r.Util.showHelp(t, t);
} catch (e) {}
}
for (o = 0; o < 4; o++) {
var i = this.arr_name[o + this.currentProblem + 1], a = this.node.getChildByName("nextQues").getChildByName("transparentBg").getChildByName("containerNode").getChildByName("" + (o + 1));
console.log("el ", i);
if ("" != i[5]) {
a.getComponent(cc.Label).string = i[4] + " " + i[6] + " " + i[5] + " = ?";
} else a.getComponent(cc.Label).string = "";
}
};
t.prototype.callback = function(e) {
var t = this;
if (this.node.getChildByName("examples").getChildByName("layoutExamples").getChildByName(e.node.name).getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string == this.rightAnswer) {
this.node.emit("correct");
for (var o = 8; o <= this.totalExamplesCount; o++) {
this.node.getChildByName("examples").getChildByName("layoutExamples").getChildByName("2_" + o).getComponent(cc.Animation).play("correct");
this.node.getChildByName("examples").getChildByName("layoutExamples").getChildByName("2_" + o).getComponent(cc.Button).node.off("click", this.callback, this);
}
this.nextProblemTimeout = setTimeout(function() {
t.node.getChildByName("questionboard_quickfacts").getChildByName("question").getComponent(cc.Label).string = t.firstValue + " " + t.mathSign + " " + t.secondValue + " = " + t.rightAnswer;
var e = cc.moveBy(.5, 0, 132), o = cc.moveBy(.5 / 3, 2, 50);
r.Util.speakEquation([ String(t._totalCount) ], function(e) {});
t.nextProblemTimeout2 = setTimeout(function() {
t.node.getChildByName("questionboard_quickfacts").getChildByName("question").runAction(cc.sequence(o, cc.callFunc(function() {
t.node.getChildByName("questionboard_quickfacts").getChildByName("question").getComponent(cc.Label).string = "";
t.node.getChildByName("questionboard_quickfacts").getChildByName("question").position = new cc.Vec3(-7, -70);
})));
t.node.getChildByName("nextQues").getChildByName("transparentBg").getChildByName("containerNode").runAction(cc.sequence(e, cc.callFunc(function() {
t.nextProblem();
t.node.getChildByName("nextQues").getChildByName("transparentBg").getChildByName("containerNode").position = new cc.Vec3(12, 50);
})));
}, 3e3);
}, 300);
} else {
this.node.emit("wrong");
this.node.getChildByName("examples").getChildByName("layoutExamples").getChildByName(e.node.name).getComponent(cc.Animation).play("wrong");
setTimeout(function() {
t.wrongAnimationTimer = t.node.getChildByName("examples").getChildByName("layoutExamples").getChildByName(e.node.name).removeAllChildren();
}, 300);
}
};
t.prototype.onDestroy = function() {
clearTimeout(this.wrongAnimationTimer);
clearTimeout(this.nextProblemTimeout);
clearTimeout(this.nextProblemTimeout2);
};
i([ u(cc.Label) ], t.prototype, "label", void 0);
i([ u(cc.Prefab) ], t.prototype, "choicesPrefab", void 0);
i([ u({
type: cc.AudioClip
}) ], t.prototype, "correctAudio", void 0);
i([ u({
type: cc.AudioClip
}) ], t.prototype, "wrongAudio", void 0);
i([ u ], t.prototype, "text", void 0);
i([ l.default() ], t.prototype, "nextProblem", null);
i([ l.default() ], t.prototype, "makeNimbleTableData", null);
i([ l.default() ], t.prototype, "onLoad", null);
i([ l.default() ], t.prototype, "makeScreen", null);
i([ l.default() ], t.prototype, "callback", null);
i([ l.default() ], t.prototype, "onDestroy", null);
return t = i([ s ], t);
}(cc.Component);
o.default = m;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/error-handler": void 0,
"../../../common/scripts/util": void 0
} ]
}, {}, [ "nimbletable" ]);