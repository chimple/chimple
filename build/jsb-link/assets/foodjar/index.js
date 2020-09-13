window.__require = function t(e, o, r) {
function i(a, c) {
if (!o[a]) {
if (!e[a]) {
var s = a.split("/");
s = s[s.length - 1];
if (!e[s]) {
var l = "function" == typeof __require && __require;
if (!c && l) return l(s, !0);
if (n) return n(s, !0);
throw new Error("Cannot find module '" + a + "'");
}
a = s;
}
var d = o[a] = {
exports: {}
};
e[a][0].call(d.exports, function(t) {
return i(e[a][1][t] || t);
}, d, d.exports, t, e, o, r);
}
return o[a].exports;
}
for (var n = "function" == typeof __require && __require, a = 0; a < r.length; a++) i(r[a]);
return i;
}({
equationChoice: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "56b73ULfw9L5ZwTSwwHMoYt", "equationChoice");
var r = this && this.__extends || function() {
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
function r() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (r.prototype = o.prototype, new r());
};
}(), i = this && this.__decorate || function(t, e, o, r) {
var i, n = arguments.length, a = n < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, o) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, r); else for (var c = t.length - 1; c >= 0; c--) (i = t[c]) && (a = (n < 3 ? i(a) : n > 3 ? i(e, o, a) : i(e, o)) || a);
return n > 3 && a && Object.defineProperty(e, o, a), a;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("../../../common/scripts/drag"), a = cc._decorator, c = a.ccclass, s = a.property, l = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.bgNode = null;
return e;
}
e.prototype.onTouchEnd = function(e) {
t.prototype.onTouchEnd.call(this, e);
this.isDragging && (this.match ? this.node.emit("equationMatch") : this.node.emit("equationNoMatch"));
};
i([ s(cc.Node) ], e.prototype, "bgNode", void 0);
return e = i([ c ], e);
}(n.default);
o.default = l;
cc._RF.pop();
}, {
"../../../common/scripts/drag": void 0
} ],
equationDrop: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "c1f45FcFqZJfrhkuJ6ZxTfO", "equationDrop");
var r = this && this.__extends || function() {
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
function r() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (r.prototype = o.prototype, new r());
};
}(), i = this && this.__decorate || function(t, e, o, r) {
var i, n = arguments.length, a = n < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, o) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, r); else for (var c = t.length - 1; c >= 0; c--) (i = t[c]) && (a = (n < 3 ? i(a) : n > 3 ? i(e, o, a) : i(e, o)) || a);
return n > 3 && a && Object.defineProperty(e, o, a), a;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("../../../common/scripts/drop"), a = cc._decorator, c = a.ccclass, s = (a.property, 
function(t) {
r(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
return e = i([ c ], e);
}(n.default));
o.default = s;
cc._RF.pop();
}, {
"../../../common/scripts/drop": void 0
} ],
foodjar: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "a6684eBznNCa6ASE01tZ+dS", "foodjar");
var r = this && this.__extends || function() {
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
function r() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (r.prototype = o.prototype, new r());
};
}(), i = this && this.__decorate || function(t, e, o, r) {
var i, n = arguments.length, a = n < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, o) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, r); else for (var c = t.length - 1; c >= 0; c--) (i = t[c]) && (a = (n < 3 ? i(a) : n > 3 ? i(e, o, a) : i(e, o)) || a);
return n > 3 && a && Object.defineProperty(e, o, a), a;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var n, a, c = t("../../../common/scripts/lib/config"), s = t("../scripts/multLayout"), l = t("../../../common/scripts/util"), d = t("../../../common/scripts/lib/error-handler"), u = t("../../../common/scripts/drag"), h = t("../../../common/scripts/countingLayout"), p = cc._decorator, f = p.ccclass, y = p.property, m = function() {
function t() {}
t.prototype.toStringArray = function() {
return [ this.first.toString(), this.operator, this.second.toString(), "=", this.answer.toString() ];
};
return t;
}();
(function(t) {
t[t.Empty = 0] = "Empty";
t[t.Label = 1] = "Label";
t[t.LabelInCard = 2] = "LabelInCard";
t[t.Objects = 3] = "Objects";
t[t.ObjectsInCard = 4] = "ObjectsInCard";
})(n || (n = {}));
(function(t) {
t[t.NumbersOnTop = 0] = "NumbersOnTop";
t[t.Mixed = 1] = "Mixed";
t[t.ObjectsOnTop = 2] = "ObjectsOnTop";
t[t.Multiplication = 3] = "Multiplication";
})(a || (a = {}));
var b = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.firstLayout = null;
e.secondLayout = null;
e.choiceLayout = null;
e.equationChoice = null;
e.countingLayout = null;
e.equationDrop = null;
e.equationLabel = null;
e.multDrop = null;
e.multChoice = null;
e.friendPos = null;
e.addTexture1 = null;
e.addTexture2 = null;
e.addTexture3 = null;
e.addTexture4 = null;
e.addTexture5 = null;
e.addTexture6 = null;
e.addTexture7 = null;
e.addTexture8 = null;
e.addTexture9 = null;
e.subFullTexture1 = null;
e.subEmptyTexture1 = null;
e.subFullTexture2 = null;
e.subEmptyTexture2 = null;
e.subFullTexture3 = null;
e.subEmptyTexture3 = null;
e.choiceNodes = [];
e.friend = null;
e.problem = new m();
e.notSolved = 0;
e.layoutType = null;
e.jars = [];
e.firstDrag = null;
e.firstDrop = null;
return e;
}
e.prototype.onLoad = function() {
var t = this;
u.default.letDrag = !1;
cc.director.getCollisionManager().enabled = !0;
l.Util.loadFriend(function(e) {
t.friend = e.getComponent(dragonBones.ArmatureDisplay);
t.friendPos.addChild(e);
t.friend.playAnimation("laugh", 1);
});
var e = c.default.getInstance().data[0], o = (e[0], e[1], e[2], e[3]), r = e[4], i = e[5], n = e[6], s = e[7], d = e[8], h = e[9], p = "R" == r ? Math.random() < .5 ? "+" : "-" : r;
"A" == o ? parseInt(d) > 0 ? this.layoutType = a.Mixed : this.layoutType = a.NumbersOnTop : this.layoutType = "B" == o ? a.ObjectsOnTop : a.Multiplication;
if (this.layoutType == a.Multiplication) this.layoutLong(parseInt(i), parseInt(s)); else {
this.createProblem(parseInt(i), parseInt(n), p, parseInt(h));
this.layoutScreen(o, parseInt(d));
this.choiceNodes.forEach(function(e) {
t.choiceLayout.addChild(e);
});
}
this.choiceLayout.children.length > 5 && (this.choiceLayout.getComponent(cc.Layout).spacingX = 10);
u.default.letDrag = !0;
l.Util.showHelp(this.firstDrag, this.firstDrop);
};
e.prototype.checkIfDone = function() {
var t = this;
this.node.emit("correct");
if (--this.notSolved <= 0) {
u.default.letDrag = !1;
this.scheduleOnce(function() {
if (t.layoutType == a.Multiplication) {
t.choiceLayout.removeAllChildren();
t.choiceLayout.addChild(t.createLabel(t.problem.first.toString()));
t.choiceLayout.addChild(t.createLabel(t.problem.operator));
t.choiceLayout.addChild(t.createLabel(t.problem.second.toString()));
t.choiceLayout.addChild(t.createLabel("="));
t.choiceLayout.addChild(t.createLabel(t.problem.answer.toString()));
}
t.scaleForSpeaking(-1);
l.Util.speakEquation(t.problem.toStringArray(), t.scaleForSpeaking.bind(t));
}, 2);
}
};
e.prototype.indicateWrongMove = function() {
this.node.emit("wrong");
};
e.prototype.scaleForSpeaking = function(t) {
var e = this, o = this.secondLayout;
this.layoutType == a.NumbersOnTop ? o = this.firstLayout : this.layoutType == a.Multiplication && (o = this.choiceLayout);
t >= 0 && (o.children[t].scale = 1);
if (t + 1 < o.children.length) o.children[t + 1].scale = 1.2; else {
null != this.friend && this.friend.playAnimation("jumping", 1);
new cc.Tween().target(this.friendPos).to(1, {
x: 0
}, null).call(function() {
null != e.friend && e.friend.playAnimation("eating", 1);
e.jars.forEach(function(t) {
var o = t.getComponent(h.default);
if (null != o) null != e.friend && o.feed(e.friend.node); else {
var r = t.getComponent(s.default);
null != r && null != e.friend && r.feed(e.friend.node);
}
});
e.firstLayout.parent.removeAllChildren();
}).delay(3).call(function() {
e.node.emit("nextProblem");
}).start();
}
};
e.prototype.createEmpty = function(t, e) {
this.notSolved++;
var o = cc.instantiate(this.equationDrop);
o.name = e == n.Label ? "L" + t : "O" + t;
null == this.firstDrop && (this.firstDrop = o);
return o;
};
e.prototype.createLabel = function(t, e) {
void 0 === e && (e = !1);
var o = cc.instantiate(this.equationLabel), r = o.getChildByName("New Label"), i = r.getComponent(cc.Label);
i.string = t;
if (e) {
i.fontSize = 60;
o.width = r.width;
}
return o;
};
e.prototype.createLabelInCard = function(t) {
return this.createCard("L" + t, this.createLabel(t));
};
e.prototype.createObjects = function(t, e, o) {
void 0 === e && (e = 0);
void 0 === o && (o = -1);
var r = cc.instantiate(this.countingLayout), i = r.getComponent(h.default);
this.jars.push(r);
i.fullCount = t;
0 == e && (e = Math.ceil(9 * Math.random()));
if (-1 == o) i.fullTexture = this["addTexture" + e]; else {
i.emptyCount = o;
i.fullTexture = this["subFullTexture" + e];
i.emptyTexture = this["subEmptyTexture" + e];
}
return r;
};
e.prototype.createObjectsInCard = function(t) {
return this.createCard("O" + t.toString(), this.createObjects(t));
};
e.prototype.createCard = function(t, e) {
var o = this, r = cc.instantiate(this.equationChoice);
r.on("equationMatch", function() {
o.checkIfDone();
});
r.on("equationNoMatch", function() {
o.indicateWrongMove();
});
r.name = t;
r.addChild(e);
null != this.firstDrop && this.firstDrop.name == t && null == this.firstDrag && (this.firstDrag = r);
var i = new cc.Node();
i.addChild(r);
i.height = r.height;
i.width = r.width;
return i;
};
e.prototype.createLongCard = function(t, e) {
var o = this;
void 0 === e && (e = !0);
var r = cc.instantiate(this.multChoice);
this.jars.push(r);
if (e) {
r.on("equationMatch", function() {
o.checkIfDone();
});
r.on("equationNoMatch", function() {
o.indicateWrongMove();
});
null != this.firstDrop && this.firstDrop.name == t.toString() && null == this.firstDrag && (this.firstDrag = r);
} else {
r.getComponent(u.default).allowDrag = !1;
}
r.name = t.toString();
r.getComponent(s.default).count = t;
var i = new cc.Node();
i.addChild(r);
i.height = r.height;
i.width = r.width;
return i;
};
e.prototype.createLongEmpty = function(t) {
this.notSolved++;
var e = cc.instantiate(this.multDrop);
e.name = t;
null == this.firstDrop && (this.firstDrop = e);
return e;
};
e.prototype.createProblem = function(t, e, o, r) {
this.problem.operator = o;
this.problem.choices = [];
"-" == o && (e -= 1);
this.problem.answer = Math.floor(Math.random() * (e - t)) + t;
if ("+" == o) {
this.problem.answer = Math.floor(Math.random() * (e - t - 1)) + t + 1;
this.problem.first = Math.floor(Math.random() * (this.problem.answer - 1 - t)) + t;
this.problem.second = this.problem.answer - this.problem.first;
} else if ("-" == o) {
this.problem.answer = Math.floor(Math.random() * (e - 1 - t)) + t;
this.problem.first = Math.floor(Math.random() * (e - this.problem.answer + 1)) + this.problem.answer + 1;
this.problem.second = this.problem.first - this.problem.answer;
}
this.problem.choices.push(this.problem.first, this.problem.second, this.problem.answer);
for (var i = [], n = t; n <= e; n++) n != this.problem.answer && n != this.problem.first && n != this.problem.second && i.push(n);
for (;this.problem.choices.length <= r && i.length > 0; ) {
var a = Math.floor(Math.random() * i.length);
this.problem.choices.push(i[a]);
i.splice(a, 1);
}
};
e.prototype.layoutScreen = function(t, e) {
var o = this.layoutType == a.NumbersOnTop;
if (this.layoutType == a.NumbersOnTop || this.layoutType == a.Mixed) {
this.addColumn(this.problem.first, o, Math.random() > .5);
this.firstLayout.addChild(this.createLabel(this.problem.operator));
this.secondLayout.addChild(this.createLabel(this.problem.operator));
this.addColumn(this.problem.second, o, Math.random() > .5);
this.firstLayout.addChild(this.createLabel("="));
this.secondLayout.addChild(this.createLabel("="));
this.addColumn(this.problem.answer, o, Math.random() > .5);
for (var r = 3; r < this.problem.choices.length; r++) o ? this.addToChoicesRandomly(this.createObjectsInCard(this.problem.choices[r])) : Math.random() > .5 ? this.addToChoicesRandomly(this.createObjectsInCard(this.problem.choices[r])) : this.addToChoicesRandomly(this.createLabelInCard(this.problem.choices[r].toString()));
} else if (this.layoutType == a.ObjectsOnTop) {
if ("+" == this.problem.operator) {
this.addSumObjects(this.firstLayout, this.problem.first);
this.addSumObjects(this.firstLayout, this.problem.second);
} else {
var i = Math.ceil(3 * Math.random());
if (this.problem.first > 10) {
this.firstLayout.addChild(this.createObjects(10, i, Math.max(0, 10 - this.problem.answer)));
var c = this.problem.first - 10;
this.firstLayout.addChild(this.createObjects(c, i, Math.min(c, this.problem.second)));
} else this.firstLayout.addChild(this.createObjects(this.problem.first, i, this.problem.second));
}
this.secondLayout.addChild(this.createEmpty(this.problem.first.toString(), n.Label));
this.secondLayout.addChild(this.createEmpty(this.problem.operator, n.Label));
this.secondLayout.addChild(this.createEmpty(this.problem.second.toString(), n.Label));
this.secondLayout.addChild(this.createEmpty("=", n.Label));
this.secondLayout.addChild(this.createEmpty(this.problem.answer.toString(), n.Label));
this.addToChoicesRandomly(this.createLabelInCard(this.problem.first.toString()));
this.addToChoicesRandomly(this.createLabelInCard(this.problem.operator.toString()));
this.addToChoicesRandomly(this.createLabelInCard(this.problem.second.toString()));
this.addToChoicesRandomly(this.createLabelInCard("="));
this.addToChoicesRandomly(this.createLabelInCard(this.problem.answer.toString()));
}
};
e.prototype.addSumObjects = function(t, e) {
if (e > 10) {
var o = Math.ceil(3 * Math.random());
t.addChild(this.createObjects(10, o, 0));
t.addChild(this.createObjects(e - 10, o, 0));
} else t.addChild(this.createObjects(e));
};
e.prototype.layoutLong = function(t, e) {
this.problem.first = t;
this.problem.second = e;
this.problem.operator = "x";
this.problem.answer = t * e;
this.node.getChildByName("New Layout").removeChild(this.secondLayout);
this.firstLayout.height = 324;
this.choiceLayout.height = 324;
for (var o = 1; o <= e; o++) {
this.firstLayout.addChild(this.createLongEmpty(t.toString()));
o == e ? this.firstLayout.addChild(this.createLabel("=", !0)) : this.firstLayout.addChild(this.createLabel("+", !0));
this.choiceLayout.addChild(this.createLongCard(t));
}
this.firstLayout.addChild(this.createLongCard(t * e, !1));
};
e.prototype.addColumn = function(t, e, o) {
if (e) {
this.firstLayout.addChild(this.createLabel(t.toString()));
this.secondLayout.addChild(this.createEmpty(t.toString(), n.Objects));
this.addToChoicesRandomly(this.createObjectsInCard(t));
} else if (o) {
this.firstLayout.addChild(this.createObjects(t));
this.secondLayout.addChild(this.createEmpty(t.toString(), n.Label));
this.addToChoicesRandomly(this.createLabelInCard(t.toString()));
} else {
this.firstLayout.addChild(this.createEmpty(t.toString(), n.Objects));
this.secondLayout.addChild(this.createLabel(t.toString()));
this.addToChoicesRandomly(this.createObjectsInCard(t));
}
};
e.prototype.addToChoicesRandomly = function(t) {
this.choiceNodes.splice(Math.floor(Math.random() * this.choiceNodes.length), 0, t);
};
i([ y(cc.Node) ], e.prototype, "firstLayout", void 0);
i([ y(cc.Node) ], e.prototype, "secondLayout", void 0);
i([ y(cc.Node) ], e.prototype, "choiceLayout", void 0);
i([ y(cc.Prefab) ], e.prototype, "equationChoice", void 0);
i([ y(cc.Prefab) ], e.prototype, "countingLayout", void 0);
i([ y(cc.Prefab) ], e.prototype, "equationDrop", void 0);
i([ y(cc.Prefab) ], e.prototype, "equationLabel", void 0);
i([ y(cc.Prefab) ], e.prototype, "multDrop", void 0);
i([ y(cc.Prefab) ], e.prototype, "multChoice", void 0);
i([ y(cc.Node) ], e.prototype, "friendPos", void 0);
i([ y(cc.SpriteFrame) ], e.prototype, "addTexture1", void 0);
i([ y(cc.SpriteFrame) ], e.prototype, "addTexture2", void 0);
i([ y(cc.SpriteFrame) ], e.prototype, "addTexture3", void 0);
i([ y(cc.SpriteFrame) ], e.prototype, "addTexture4", void 0);
i([ y(cc.SpriteFrame) ], e.prototype, "addTexture5", void 0);
i([ y(cc.SpriteFrame) ], e.prototype, "addTexture6", void 0);
i([ y(cc.SpriteFrame) ], e.prototype, "addTexture7", void 0);
i([ y(cc.SpriteFrame) ], e.prototype, "addTexture8", void 0);
i([ y(cc.SpriteFrame) ], e.prototype, "addTexture9", void 0);
i([ y(cc.SpriteFrame) ], e.prototype, "subFullTexture1", void 0);
i([ y(cc.SpriteFrame) ], e.prototype, "subEmptyTexture1", void 0);
i([ y(cc.SpriteFrame) ], e.prototype, "subFullTexture2", void 0);
i([ y(cc.SpriteFrame) ], e.prototype, "subEmptyTexture2", void 0);
i([ y(cc.SpriteFrame) ], e.prototype, "subFullTexture3", void 0);
i([ y(cc.SpriteFrame) ], e.prototype, "subEmptyTexture3", void 0);
i([ d.default() ], e.prototype, "onLoad", null);
return e = i([ f ], e);
}(cc.Component);
o.default = b;
cc._RF.pop();
}, {
"../../../common/scripts/countingLayout": void 0,
"../../../common/scripts/drag": void 0,
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/error-handler": void 0,
"../../../common/scripts/util": void 0,
"../scripts/multLayout": "multLayout"
} ],
multLayout: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "8d78cWrjR9MGaovV7XxWmV4", "multLayout");
var r = this && this.__extends || function() {
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
function r() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (r.prototype = o.prototype, new r());
};
}(), i = this && this.__decorate || function(t, e, o, r) {
var i, n = arguments.length, a = n < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, o) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, r); else for (var c = t.length - 1; c >= 0; c--) (i = t[c]) && (a = (n < 3 ? i(a) : n > 3 ? i(e, o, a) : i(e, o)) || a);
return n > 3 && a && Object.defineProperty(e, o, a), a;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = cc._decorator, a = n.ccclass, c = n.property, s = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.count = 0;
e.countingSpriteFrame = null;
e.objectsLayout = null;
e.label = null;
return e;
}
e.prototype.onLoad = function() {
this.label.string = this.count.toString();
var t = this.objectsLayout.getComponent(cc.Layout);
this.count > 12 && (t.cellSize = cc.size(16, 16));
for (var e = 0; e < this.count; e++) {
var o = new cc.Node();
o.addComponent(cc.Sprite).spriteFrame = this.countingSpriteFrame;
this.objectsLayout.addChild(o);
}
};
e.prototype.feed = function(t) {
var e = t.convertToWorldSpaceAR(cc.Vec2.ZERO);
e.y += 200;
for (var o = function() {
var t = r.objectsLayout.children[r.objectsLayout.childrenCount - 1], o = t.convertToWorldSpaceAR(cc.Vec2.ZERO);
t.removeFromParent(!0);
t.position = o;
cc.director.getScene().addChild(t);
new cc.Tween().target(t).to(1, {
position: e
}, null).call(function() {
t.active = !1;
}).start();
}, r = this; this.objectsLayout.childrenCount > 0; ) o();
};
i([ c ], e.prototype, "count", void 0);
i([ c(cc.SpriteFrame) ], e.prototype, "countingSpriteFrame", void 0);
i([ c(cc.Node) ], e.prototype, "objectsLayout", void 0);
i([ c(cc.Label) ], e.prototype, "label", void 0);
return e = i([ a ], e);
}(cc.Component);
o.default = s;
cc._RF.pop();
}, {} ]
}, {}, [ "equationChoice", "equationDrop", "foodjar", "multLayout" ]);