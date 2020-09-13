window.__require = function t(e, o, n) {
function i(c, s) {
if (!o[c]) {
if (!e[c]) {
var l = c.split("/");
l = l[l.length - 1];
if (!e[l]) {
var a = "function" == typeof __require && __require;
if (!s && a) return a(l, !0);
if (r) return r(l, !0);
throw new Error("Cannot find module '" + c + "'");
}
c = l;
}
var d = o[c] = {
exports: {}
};
e[c][0].call(d.exports, function(t) {
return i(e[c][1][t] || t);
}, d, d.exports, t, e, o, n);
}
return o[c].exports;
}
for (var r = "function" == typeof __require && __require, c = 0; c < n.length; c++) i(n[c]);
return i;
}({
CommonBlock: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "67f43WsyVpLZ7sWQJdjmnZ6", "CommonBlock");
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
}(), i = this && this.__decorate || function(t, e, o, n) {
var i, r = arguments.length, c = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (c = (r < 3 ? i(c) : r > 3 ? i(e, o, c) : i(e, o)) || c);
return r > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
o.DEFAULT_FONT_COLOR = void 0;
var r = cc._decorator.property, c = cc.Label.Overflow, s = t("../../../common/scripts/lib/error-handler"), l = t("../../../common/scripts/chimple-label");
o.DEFAULT_FONT_COLOR = cc.Color.BLACK;
var a = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.textFont = null;
e.slotSelectedPrefab = null;
e._contentText = null;
e._fontSize = null;
e._fontColor = null;
e._questionSound = null;
e.highlightNode = null;
e._isHighlightNodePresent = !1;
return e;
}
Object.defineProperty(e.prototype, "contentText", {
get: function() {
return this._contentText;
},
set: function(t) {
this._contentText = t;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "fontSize", {
get: function() {
return this._fontSize;
},
set: function(t) {
this._fontSize = t;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "fontColor", {
get: function() {
return this._fontColor;
},
set: function(t) {
this._fontColor = t;
},
enumerable: !1,
configurable: !0
});
e.prototype.createLabelNode = function(t, e, n, i, r) {
void 0 === e && (e = "");
void 0 === n && (n = "10");
void 0 === i && (i = null);
void 0 === r && (r = !0);
var s = new cc.Node(e), a = s.addComponent(l.default);
a.string = r ? e : "";
a.font = t;
a.overflow = c.NONE;
var d = o.DEFAULT_FONT_COLOR;
i && (d = d.fromHEX(i));
s.color = d;
s.addComponent(cc.LabelOutline).width = 3;
var h = parseInt(n);
a.fontSize = h;
a.lineHeight = h;
s.position = new cc.Vec2(0, .1 * h);
return s;
};
e.prototype.getRandom = function(t, e) {
return Math.random() * (e - t) + t;
};
e.prototype.addHighLightedNode = function() {
if (!this._isHighlightNodePresent && this.highlightNode) {
this._isHighlightNodePresent = !0;
this.highlightNode.width = this.node.width;
this.highlightNode.height = this.node.height;
this.node.addChild(this.highlightNode);
}
};
e.prototype.removeHighLightedNode = function() {
if (this._isHighlightNodePresent && this.highlightNode) {
this._isHighlightNodePresent = !1;
this.node.removeChild(this.highlightNode);
}
};
i([ r({
type: cc.Font
}) ], e.prototype, "textFont", void 0);
i([ r(cc.Prefab) ], e.prototype, "slotSelectedPrefab", void 0);
i([ s.default() ], e.prototype, "createLabelNode", null);
i([ s.default() ], e.prototype, "addHighLightedNode", null);
i([ s.default() ], e.prototype, "removeHighLightedNode", null);
return e;
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {
"../../../common/scripts/chimple-label": void 0,
"../../../common/scripts/lib/error-handler": void 0
} ],
answerblock: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "736a5xa/ABAMYiLpVMzh3hK", "answerblock");
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
}(), i = this && this.__decorate || function(t, e, o, n) {
var i, r = arguments.length, c = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (c = (r < 3 ? i(c) : r > 3 ? i(e, o, c) : i(e, o)) || c);
return r > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = t("./CommonBlock"), c = t("./grid"), s = t("./wordblock"), l = t("./questionblock"), a = t("../../../common/scripts/util"), d = t("../../../common/scripts/lib/config"), h = cc.Vec2, u = t("../../../common/scripts/lib/error-handler"), p = cc._decorator, f = p.ccclass, g = p.property, _ = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.originalPosition = new h(0, 0);
e.finishPosition = new h(0, 0);
e.matchRect = null;
e.match = !1;
e.moved = !1;
e._sound = null;
e._explode = null;
e._startPos = null;
e._isRTL = !1;
e.wrongMoveAudio = null;
e.rightMoveAudio = null;
e.problemClear = null;
e.explodeParticle = null;
e.questionBlocksMap = new Map();
return e;
}
e.prototype.onLoad = function() {
var t = this;
this.node.on(c.TouchEvents.TOUCH_START, this.onTouchStart, this);
this.node.on(c.TouchEvents.TOUCH_END, this.onTouchEnd, this);
this.node.on(c.TouchEvents.TOUCH_MOVE, this.onTouchMove, this);
this.node.on(c.TouchEvents.TOUCH_CANCEL, this.onTouchEnd, this);
this.fontColor = "#654321";
var e = this.createLabelNode(this.textFont, this.contentText, this.fontSize, this.fontColor);
this._isRTL = d.default.i.direction == d.Direction.RTL;
if (this._isRTL) {
this.node.scaleX *= -c.SCALE;
this.node.scaleY *= c.SCALE;
} else this.node.scale *= c.SCALE;
this.node.addChild(e);
this.node.width = c.Grid._maxNodeWidth;
this.node.height = c.Grid._maxNodeHeight;
this.highlightNode = cc.instantiate(this.slotSelectedPrefab);
a.Util.loadGameSound(this.contentText, function(e) {
t._sound = e;
});
};
e.prototype.start = function() {
var t = this.contentText + c.PLACEHOLDER_PAIR, e = this.node.parent.getChildByName("ground");
this.pairingPlaceHolderBlock = e.getChildByName(t).getComponent(s.default);
var o = this.pairingPlaceHolderBlock.node.getBoundingBox();
this.matchRect = cc.Rect.fromMinMax(cc.v2(o.x + 40, o.y + 40), cc.v2(o.x + o.width - 40, o.y + o.height - 40));
this.finishPosition = this.pairingPlaceHolderBlock.node.position;
var n = cc.moveTo(.3, this.originalPosition);
this.node.runAction(n);
};
e.prototype.checkRTLAndScale = function(t) {
return this._isRTL ? -t * c.SCALE : t * c.SCALE;
};
e.prototype.renderAnswerHolder = function(t) {
this.render(t);
if (t.combinedQAndA) {
var e = t.content, o = [];
t.combinedQAndA.split("-").map(function(t) {
o.push(t);
});
this.questionBlocksMap.set(e, o);
}
};
e.prototype.render = function(t) {
var e = t.xPositions[t.index];
this.originalPosition = new h(e, -375);
this.grid = t.wordMatrix;
this.fontSize = c.FONT_SIZE;
this.contentText = t.content;
this.node.setPosition(this.originalPosition.x, this.originalPosition.y);
t.parentNode.addChild(this.node);
};
e.prototype.onTouchStart = function(t) {
var e = this, o = this.node.getParent().convertToNodeSpaceAR(t.getLocation());
this._startPos = o;
if (this.match) new cc.Tween().target(this.node).to(.1, {
scaleX: this.checkRTLAndScale(1.1),
scaleY: 1.1 * c.SCALE
}, {
progress: null,
easing: "sineOut"
}).call(function() {
e.speak();
}).start(); else {
this.moved = !1;
new cc.Tween().target(this.node).to(.1, {
scaleX: this.checkRTLAndScale(1.1),
scaleY: 1.1 * c.SCALE
}, {
progress: null,
easing: "sineOut"
}).call(function() {
e.speak();
}).start();
}
};
e.prototype.speak = function() {
try {
if (this._sound) {
this._soundID = a.Util.play(this._sound, !1);
-1 === this._soundID && a.Util.speakPhonicsOrLetter(this.contentText, function() {});
} else a.Util.speakPhonicsOrLetter(this.contentText, function() {});
} catch (t) {}
};
e.prototype.onTouchMove = function(t) {
var e = this;
this.moved = !0;
var o = new cc.Vec2(1 / c.MATRIX_CONTAINER_SCALE * t.getDelta().x, 1 / c.MATRIX_CONTAINER_SCALE * t.getDelta().y);
this.node.setPosition(this.node.position.add(cc.v2(this._isRTL ? o.neg().x : o.x, o.y)));
if (this.node.getBoundingBox().intersects(this.matchRect)) {
this.match = !0;
this.pairingPlaceHolderBlock.addHighLightedNode();
this.questionBlocksMap.get(this.contentText).forEach(function(t) {
e.node.parent.getChildByName("ground").getChildByName(t).getComponent(l.default).addHighLightedNode();
});
} else {
this.match = !1;
this.pairingPlaceHolderBlock.removeHighLightedNode();
this.questionBlocksMap.get(this.contentText).forEach(function(t) {
e.node.parent.getChildByName("ground").getChildByName(t).getComponent(l.default).removeHighLightedNode();
});
}
new cc.Tween().target(this.node).call(function() {
cc.audioEngine.stopEffect(e._sound);
}).to(.15, {
scaleX: this.checkRTLAndScale(1),
scaleY: c.SCALE
}, {
progress: null,
easing: "sineOut"
}).start();
};
e.prototype.onTouchEnd = function(t) {
var e = this.node.getParent().convertToNodeSpaceAR(t.getLocation()).sub(this._startPos);
new cc.Tween().target(this.node).to(.15, {
scaleX: this.checkRTLAndScale(1),
scaleY: c.SCALE
}, {
progress: null,
easing: "sineOut"
}).start();
var o = e.magSqr() >= 50;
if (this.match) this.matchFound(); else {
this.match = !1;
this.matchNotFound(o);
}
};
e.prototype.matchFound = function() {
var t = this;
this.match = !0;
this.node.off(c.TouchEvents.TOUCH_MOVE);
this.node.off(c.TouchEvents.TOUCH_END);
this.node.parent.emit("correct");
this.moveToPos(this.finishPosition).call(function() {
t.removeHighLightedNode();
t.sparkle();
t.rightMoveAudio && a.Util.playSfx(t.rightMoveAudio);
t.grid.scheduleOnce(function() {
t.unSparkle();
t.grid.wordMatched(t.contentText);
}, .5);
t.questionBlocksMap.get(t.contentText).forEach(function(e) {
t.node.parent.getChildByName("ground").getChildByName(e).getComponent(l.default).removeHighLightedNode();
});
t.moved = !1;
}).start();
};
e.prototype.matchNotFound = function(t) {
var e = this;
this.moveToPos(this.originalPosition).call(function() {
if (e.moved && t) {
e.wrongMoveAudio && a.Util.playSfx(e.wrongMoveAudio);
e.node.parent.emit("wrong");
e.moved = !1;
}
}).start();
};
e.prototype.moveToPos = function(t) {
return new cc.Tween().target(this.node).to(.25, {
position: this.node.position,
scaleX: this.checkRTLAndScale(1),
scaleY: c.SCALE
}, {
progress: null,
easing: "elasticOut"
}).to(.15, {
position: t
}, {
progress: null,
easing: "quadOut"
});
};
e.prototype.onDestroy = function() {
cc.audioEngine.stopAllEffects();
};
e.prototype.sparkle = function() {
this._explode = cc.instantiate(this.explodeParticle);
this._explode.position = this.node.position;
this.node.parent.addChild(this._explode);
};
e.prototype.unSparkle = function() {
if (null != this._explode) {
this.node.removeChild(this._explode);
this._explode = null;
}
};
i([ g({
type: cc.AudioClip
}) ], e.prototype, "wrongMoveAudio", void 0);
i([ g({
type: cc.AudioClip
}) ], e.prototype, "rightMoveAudio", void 0);
i([ g({
type: cc.AudioClip
}) ], e.prototype, "problemClear", void 0);
i([ g(cc.Prefab) ], e.prototype, "explodeParticle", void 0);
i([ u.default() ], e.prototype, "onLoad", null);
i([ u.default() ], e.prototype, "start", null);
i([ u.default() ], e.prototype, "checkRTLAndScale", null);
i([ u.default() ], e.prototype, "renderAnswerHolder", null);
i([ u.default() ], e.prototype, "render", null);
i([ u.default() ], e.prototype, "onTouchStart", null);
i([ u.default() ], e.prototype, "speak", null);
i([ u.default() ], e.prototype, "onTouchMove", null);
i([ u.default() ], e.prototype, "onTouchEnd", null);
i([ u.default() ], e.prototype, "matchFound", null);
i([ u.default() ], e.prototype, "matchNotFound", null);
i([ u.default() ], e.prototype, "moveToPos", null);
i([ u.default() ], e.prototype, "sparkle", null);
i([ u.default() ], e.prototype, "unSparkle", null);
return e = i([ f ], e);
}(r.default);
o.default = _;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/error-handler": void 0,
"../../../common/scripts/util": void 0,
"./CommonBlock": "CommonBlock",
"./grid": "grid",
"./questionblock": "questionblock",
"./wordblock": "wordblock"
} ],
grid: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "3ca74VIctlE4JZY6uSw5DYe", "grid");
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
}(), i = this && this.__decorate || function(t, e, o, n) {
var i, r = arguments.length, c = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (c = (r < 3 ? i(c) : r > 3 ? i(e, o, c) : i(e, o)) || c);
return r > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
o.Grid = o.TouchEvents = o.BLOCK_TYPE = o.PLACEHOLDER_PAIR = o.FONT_SIZE = o.HALF = o.SCALE = o.MATRIX_CONTAINER_SCALE = o.V_MARGIN = o.H_MARGIN = o.H_GAP = o.V_GAP = o.GAME_SOUND = void 0;
var r, c = cc._decorator.ccclass, s = cc._decorator.property, l = t("../../../common/scripts/lib/config"), a = t("./answerblock"), d = t("./wordblock"), h = cc.Vec2, u = t("./questionblock"), p = t("../../../common/scripts/util"), f = t("../../../common/scripts/lib/error-handler");
o.GAME_SOUND = "games/grid/sound/";
o.V_GAP = 18;
o.H_GAP = 20;
o.H_MARGIN = 50;
o.V_MARGIN = 30;
o.MATRIX_CONTAINER_SCALE = .85;
o.SCALE = 1;
o.HALF = .5;
o.FONT_SIZE = "65";
o.PLACEHOLDER_PAIR = "-PAIR";
(function(t) {
t[t.H_QUESTION = 0] = "H_QUESTION";
t[t.V_QUESTION = 1] = "V_QUESTION";
t[t.ANSWER = 2] = "ANSWER";
t[t.PLACEHOLDER = 3] = "PLACEHOLDER";
})(r = o.BLOCK_TYPE || (o.BLOCK_TYPE = {}));
(function(t) {
t.TOUCH_START = "touchstart";
t.TOUCH_END = "touchend";
t.TOUCH_MOVE = "touchmove";
t.TOUCH_CANCEL = "touchCancel";
})(o.TouchEvents || (o.TouchEvents = {}));
var g = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.groundPrefab = null;
e.questionBlockPrefab = null;
e.answerBlockPrefab = null;
e.wordBlockPrefab = null;
e.gameLoadAudio = null;
e.currentConfig = null;
e._remainingAnswers = [];
e._matchedCounterInCurrentRun = 0;
e._helpDragNode = null;
e._helpDropNode = null;
e._isRTL = !1;
return e;
}
g = e;
e.prototype.onLoad = function() {
var t = this;
g._horizontalPositions = [];
g._verticalPositions = [];
this.currentConfig = this.processConfiguration(l.default.getInstance().data[0]);
this._isRTL = l.default.i.direction == l.Direction.RTL;
p.Util.playSfx(this.gameLoadAudio);
if (null !== this.currentConfig) {
this.matrixContainer = this.node;
if (this._isRTL) {
this.matrixContainer.scaleX *= -o.MATRIX_CONTAINER_SCALE;
this.matrixContainer.scaleY *= o.MATRIX_CONTAINER_SCALE;
} else this.matrixContainer.scale *= o.MATRIX_CONTAINER_SCALE;
this.currentConfig.horizontalProblem = this.currentConfig.horizontalProblem;
this.currentConfig.verticalProblem = this.shuffle(this.currentConfig.verticalProblem);
this.buildGround();
this.renderWordMatrix(this.mapToWordMatrixElements(this.currentConfig.horizontalProblem), this.questionBlockPrefab, r.H_QUESTION);
this.renderWordMatrix(this.mapToWordMatrixElements(this.currentConfig.verticalProblem), this.questionBlockPrefab, r.V_QUESTION);
this.buildAnswersAndPlaceHolders(this.currentConfig.horizontalProblem, this.currentConfig.verticalProblem, this.currentConfig.aHorizontalProblem);
this.scheduleOnce(function() {
p.Util.showHelp(t._helpDragNode, t._helpDropNode);
}, .5);
}
};
e.prototype.mapToWordMatrixElements = function(t) {
return t.map(function(t) {
return {
text: t
};
});
};
e.prototype.processConfiguration = function(t) {
void 0 === t && (t = []);
var e = [].concat.apply([], t), o = e[0], n = e[1], i = e[2], r = e[3], c = e[4], s = e[5], l = s || c;
return {
level: o,
workSheet: n,
problemNo: i,
verticalProblem: this.shuffle(r.split(",")),
horizontalProblem: c.split(","),
aHorizontalProblem: l.split(",")
};
};
e.prototype.getRandom = function(t, e) {
return Math.random() * (e - t) + t;
};
e.prototype.buildGround = function() {
var t = this.currentConfig.horizontalProblem.length, e = this.currentConfig.verticalProblem.length, n = this.currentConfig.horizontalProblem.reduce(function(t, e) {
return t.length > e.length ? t : e;
}), i = this.currentConfig.verticalProblem.reduce(function(t, e) {
return t.length > e.length ? t : e;
}), r = cc.instantiate(this.questionBlockPrefab).getComponent(u.default), c = r.createLabelNode(r.textFont, n + i + i + i, o.FONT_SIZE, "#654321");
if (this._isRTL) {
c.scaleX = -o.SCALE;
c.scaleY = o.SCALE;
} else c.scale = o.SCALE;
g._maxNodeWidth = c.getBoundingBox().width + 1.3 * o.H_MARGIN;
g._maxNodeHeight = c.getBoundingBox().height + o.V_MARGIN;
this._ground = cc.instantiate(this.groundPrefab);
var s = 5 * o.V_MARGIN + g._maxNodeWidth + t * g._maxNodeWidth, l = 8 * o.V_MARGIN + g._maxNodeHeight + e * g._maxNodeHeight;
this.ground.setContentSize(new cc.Size(s, l));
this.matrixContainer.addChild(this.ground);
};
e.prototype.renderWordMatrix = function(t, e, o) {
var n = this, i = t.length;
t.forEach(function(t, c) {
var s = JSON.parse(JSON.stringify(t)), l = cc.instantiate(e);
switch (o) {
case r.H_QUESTION:
case r.V_QUESTION:
var h = l.getComponent(u.default), p = {
wordMatrix: n,
parentNode: n.ground,
content: s.text,
blockType: o,
index: c,
totalBlocks: i
};
h.render(p);
break;

case r.ANSWER:
var f = l.getComponent(a.default), g = {
wordMatrix: n,
parentNode: n.matrixContainer,
content: s.text,
combinedQAndA: s.questionRelatedText,
blockType: o,
index: c,
totalBlocks: i,
xPositions: s.xPositions
};
f.renderAnswerHolder(g);
0 === c && (n._helpDragNode = l);
break;

case r.PLACEHOLDER:
var _ = l.getComponent(d.default), m = {
wordMatrix: n,
parentNode: n.ground,
content: s.placeHolderText,
blockType: o,
index: c,
totalBlocks: i,
position: s.placeHolderPosition
};
_.render(m);
0 === c && (n._helpDropNode = l);
}
});
};
e.prototype.flattenDeep = function(t) {
var e = this;
return t.reduce(function(t, o) {
return Array.isArray(o) ? t.concat(e.flattenDeep(o)) : t.concat(o);
}, []);
};
e.prototype.buildAnswersAndPlaceHolders = function(t, e, o) {
this._remainingAnswers = this.computeAnswers(t, e, o);
this.renderWordMatrix(this._remainingAnswers, this.wordBlockPrefab, r.PLACEHOLDER);
this.renderWordMatrix(this.slices(this._remainingAnswers, t.length), this.answerBlockPrefab, r.ANSWER);
};
e.prototype.computeAnswers = function(t, e, n) {
console.log("horizontalConfigs", t);
console.log("aHorizontalConfigs", n);
var i = this.flattenDeep(e.map(function(e, i) {
return t.map(function(t, r) {
return {
text: e + n[r],
placeHolderPosition: new h(g._horizontalPositions[r], g._verticalPositions[i]),
placeHolderText: e + n[r] + o.PLACEHOLDER_PAIR,
questionRelatedText: e + "-" + t,
xPositions: Array.from(new Set(g._horizontalPositions))
};
});
}));
return this.shuffle(i);
};
e.prototype.slices = function(t, e) {
this._matchedCounterInCurrentRun = 0;
return t.slice(0, e);
};
e.prototype.shuffle = function(t) {
for (var e, o, n = t.length; n > 0; ) {
o = Math.floor(Math.random() * n);
e = t[--n];
t[n] = t[o];
t[o] = e;
}
return t;
};
e.addToHorizontalPositions = function(t) {
g._horizontalPositions.push(t);
};
e.addToVerticalPositions = function(t) {
g._verticalPositions.push(t);
};
Object.defineProperty(e.prototype, "ground", {
get: function() {
return this._ground;
},
enumerable: !1,
configurable: !0
});
e.prototype.wordMatched = function(t) {
this._matchedCounterInCurrentRun++;
this._remainingAnswers = this._remainingAnswers.filter(function(e) {
return e.text !== t;
});
this._remainingAnswers.length <= 0 ? this.node.emit("nextProblem") : this._matchedCounterInCurrentRun === this.currentConfig.horizontalProblem.length && this.renderWordMatrix(this.slices(this._remainingAnswers, this.currentConfig.horizontalProblem.length), this.answerBlockPrefab, r.ANSWER);
};
var g;
e._maxNodeWidth = 0;
e._maxNodeHeight = 0;
e._horizontalPositions = [];
e._verticalPositions = [];
i([ s(cc.Prefab) ], e.prototype, "groundPrefab", void 0);
i([ s(cc.Prefab) ], e.prototype, "questionBlockPrefab", void 0);
i([ s(cc.Prefab) ], e.prototype, "answerBlockPrefab", void 0);
i([ s(cc.Prefab) ], e.prototype, "wordBlockPrefab", void 0);
i([ s({
type: cc.AudioClip
}) ], e.prototype, "gameLoadAudio", void 0);
i([ f.default() ], e.prototype, "onLoad", null);
i([ f.default() ], e.prototype, "mapToWordMatrixElements", null);
i([ f.default() ], e.prototype, "buildGround", null);
i([ f.default() ], e.prototype, "renderWordMatrix", null);
i([ f.default() ], e.prototype, "buildAnswersAndPlaceHolders", null);
i([ f.default() ], e.prototype, "computeAnswers", null);
i([ f.default() ], e.prototype, "slices", null);
i([ f.default() ], e.prototype, "wordMatched", null);
return e = g = i([ c ], e);
}(cc.Component);
o.Grid = g;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/error-handler": void 0,
"../../../common/scripts/util": void 0,
"./answerblock": "answerblock",
"./questionblock": "questionblock",
"./wordblock": "wordblock"
} ],
ground: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "16f0fFVfwRFAojrnIPvN0ch", "ground");
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
}(), i = this && this.__decorate || function(t, e, o, n) {
var i, r = arguments.length, c = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (c = (r < 3 ? i(c) : r > 3 ? i(e, o, c) : i(e, o)) || c);
return r > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = cc._decorator, c = r.ccclass, s = (r.property, function(t) {
n(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
return e = i([ c ], e);
}(cc.Component));
o.default = s;
cc._RF.pop();
}, {} ],
questionblock: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "fec20HTyIZFwZJfUjwQdlER", "questionblock");
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
}(), i = this && this.__decorate || function(t, e, o, n) {
var i, r = arguments.length, c = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (c = (r < 3 ? i(c) : r > 3 ? i(e, o, c) : i(e, o)) || c);
return r > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = t("./CommonBlock"), c = t("./grid"), s = cc._decorator.property, l = t("../../../common/scripts/lib/config"), a = t("../../../common/scripts/util"), d = t("../../../common/scripts/lib/error-handler"), h = cc._decorator.ccclass, u = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.slotSelectedPrefab = null;
e.highlightNode = null;
e._isHighlightNodePresent = !1;
e._sound = null;
e._isRTL = !1;
return e;
}
e.prototype.onLoad = function() {
var t = this;
this.node.on(c.TouchEvents.TOUCH_START, this.onTouchStart, this);
this.node.on(c.TouchEvents.TOUCH_MOVE, this.onTouchMove, this);
this.node.on(c.TouchEvents.TOUCH_END, this.onTouchEnd, this);
this.fontColor = "#654321";
var e = this.createLabelNode(this.textFont, this.contentText, this.fontSize, this.fontColor);
this.node.addChild(e);
this.highlightNode = cc.instantiate(this.slotSelectedPrefab);
this._isRTL = l.default.i.direction == l.Direction.RTL;
a.Util.loadGameSound(this.contentText, function(e) {
t._sound = e;
});
this._isRTL && (this.node.scaleX = -1);
};
e.prototype.onTouchMove = function(t) {
var e = t.getLocation(), o = this.node.getParent().convertToNodeSpaceAR(e);
this.node.getBoundingBox().contains(o) || this.touchEnded();
};
e.prototype.onTouchStart = function(t) {
var e = this;
new cc.Tween().target(this.node).call(function() {
e.addHighLightedNode();
e.speak();
}).to(.15, {
scaleX: this.checkRTLAndScale(1.1),
scaleY: 1.1 * c.SCALE
}, {
progress: null,
easing: "sineOut"
}).start();
};
e.prototype.speak = function() {
try {
if (this._sound) {
this._soundID = a.Util.play(this._sound, !1);
-1 === this._soundID && a.Util.speakPhonicsOrLetter(this.contentText, function() {});
} else a.Util.speakPhonicsOrLetter(this.contentText, function() {});
} catch (t) {}
};
e.prototype.onTouchEnd = function(t) {
this.touchEnded();
};
e.prototype.touchEnded = function() {
var t = this;
new cc.Tween().target(this.node).to(.15, {
scaleX: this.checkRTLAndScale(1.1),
scaleY: 1.1 * c.SCALE
}, {
progress: null,
easing: "sineOut"
}).call(function() {
t.removeHighLightedNode();
}).start();
};
e.prototype.checkRTLAndScale = function(t) {
return t * c.SCALE * (this._isRTL ? -1 : 1);
};
e.prototype.render = function(t) {
this.node.name = t.content;
this.contentText = t.content;
this.node.width = c.Grid._maxNodeWidth;
this.node.height = c.Grid._maxNodeHeight;
this.fontSize = c.FONT_SIZE;
this.node.scale *= c.SCALE;
var e, o = 0;
switch (t.blockType) {
case c.BLOCK_TYPE.H_QUESTION:
var n = parseFloat(((t.index + 1) / (t.totalBlocks + 1)).toFixed(2));
e = t.parentNode.getBoundingBox().width * (this.node.anchorX - n) + .5 * this.node.getBoundingBox().width;
o = t.parentNode.getBoundingBox().height * c.HALF - 2.35 * c.V_MARGIN;
this.node.setPosition(e, o);
c.Grid.addToHorizontalPositions(e);
break;

case c.BLOCK_TYPE.V_QUESTION:
this.node.width -= c.H_MARGIN;
n = parseFloat(((t.index + 1) / (t.totalBlocks + 1)).toFixed(2));
e = t.parentNode.getBoundingBox().x + this.node.getBoundingBox().width * c.HALF + c.H_MARGIN;
o = t.parentNode.getBoundingBox().height * (this.node.anchorY - n) - .7 * this.node.getBoundingBox().height;
this.node.setPosition(e, o);
c.Grid.addToVerticalPositions(o);
}
t.parentNode.addChild(this.node);
};
e.prototype.onDestroy = function() {
cc.audioEngine.stopAllEffects();
};
i([ s(cc.Prefab) ], e.prototype, "slotSelectedPrefab", void 0);
i([ d.default() ], e.prototype, "onLoad", null);
i([ d.default() ], e.prototype, "speak", null);
i([ d.default() ], e.prototype, "checkRTLAndScale", null);
i([ d.default() ], e.prototype, "render", null);
return e = i([ h ], e);
}(r.default);
o.default = u;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/error-handler": void 0,
"../../../common/scripts/util": void 0,
"./CommonBlock": "CommonBlock",
"./grid": "grid"
} ],
wordblock: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "838aexRwfVPA6gdgGhMuC9w", "wordblock");
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
}(), i = this && this.__decorate || function(t, e, o, n) {
var i, r = arguments.length, c = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, o, n); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (c = (r < 3 ? i(c) : r > 3 ? i(e, o, c) : i(e, o)) || c);
return r > 3 && c && Object.defineProperty(e, o, c), c;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = t("./CommonBlock"), c = t("./grid"), s = t("../../../common/scripts/lib/config"), l = t("../../../common/scripts/lib/error-handler"), a = cc._decorator, d = a.ccclass, h = (a.property, 
function(t) {
n(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.onLoad = function() {
this.fontColor = "#654321";
var t = this.createLabelNode(this.textFont, this.contentText, this.fontSize, this.fontColor, !1);
this.node.addChild(t);
this.node.width = c.Grid._maxNodeWidth + c.H_GAP;
this.node.height = c.Grid._maxNodeHeight + c.V_GAP;
this.highlightNode = cc.instantiate(this.slotSelectedPrefab);
s.default.i.direction == s.Direction.RTL && (this.node.scaleX = -1);
};
e.prototype.render = function(t) {
this.fontSize = c.FONT_SIZE;
this.node.name = t.content;
this.contentText = t.content;
this.node.setPosition(t.position.x, t.position.y);
t.parentNode.addChild(this.node);
s.default.i.direction == s.Direction.RTL && (this.node.scaleX = -1);
};
i([ l.default() ], e.prototype, "onLoad", null);
i([ l.default() ], e.prototype, "render", null);
return e = i([ d ], e);
}(r.default));
o.default = h;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/error-handler": void 0,
"./CommonBlock": "CommonBlock",
"./grid": "grid"
} ]
}, {}, [ "CommonBlock", "answerblock", "grid", "ground", "questionblock", "wordblock" ]);