window.__require = function t(n, e, i) {
function o(a, c) {
if (!e[a]) {
if (!n[a]) {
var s = a.split("/");
s = s[s.length - 1];
if (!n[s]) {
var h = "function" == typeof __require && __require;
if (!c && h) return h(s, !0);
if (r) return r(s, !0);
throw new Error("Cannot find module '" + a + "'");
}
a = s;
}
var p = e[a] = {
exports: {}
};
n[a][0].call(p.exports, function(t) {
return o(n[a][1][t] || t);
}, p, p.exports, t, n, e, i);
}
return e[a].exports;
}
for (var r = "function" == typeof __require && __require, a = 0; a < i.length; a++) o(i[a]);
return o;
}({
imagerecorder: [ function(t, n, e) {
"use strict";
cc._RF.push(n, "81166YxH/9FvoH17KHx2wTS", "imagerecorder");
var i = this && this.__extends || function() {
var t = function(n, e) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, n) {
t.__proto__ = n;
} || function(t, n) {
for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
})(n, e);
};
return function(n, e) {
t(n, e);
function i() {
this.constructor = n;
}
n.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i());
};
}(), o = this && this.__decorate || function(t, n, e, i) {
var o, r = arguments.length, a = r < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, e) : i;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, n, e, i); else for (var c = t.length - 1; c >= 0; c--) (o = t[c]) && (a = (r < 3 ? o(a) : r > 3 ? o(n, e, a) : o(n, e)) || a);
return r > 3 && a && Object.defineProperty(n, e, a), a;
};
Object.defineProperty(e, "__esModule", {
value: !0
});
e.ImageRecorder = void 0;
var r = cc._decorator.ccclass, a = t("../../../common/scripts/lib/config"), c = cc._decorator.property, s = t("../../../common/Tracing/scripts/tracing-container"), h = t("../../../common/scripts/helper"), p = function(t) {
i(n, t);
function n() {
var n = null !== t && t.apply(this, arguments) || this;
n.progressMonitorPrefab = null;
n._tracingContainerVisible = !1;
n._recordingContainerComponent = null;
n._tracingContainerComponent = null;
n._imageName = null;
n._tracePath = null;
n._jsonLoadingStatus = !0;
n._currentConfig = null;
return n;
}
n.prototype.onLoad = function() {
var t = this;
this._recordingContainer = cc.instantiate(this.recordContainerPrefab);
this._tracingContainer = cc.instantiate(this.tracingContainerPrefab);
this._currentConfig = this.processConfiguration(a.default.getInstance().data[0]);
if (null !== this._currentConfig) {
this._imageName = this._currentConfig.image;
this.setImageToDisplay(this._imageName);
}
this.node.dispatchEvent(new cc.Event.EventCustom(h.TRACING_FINISHED, !0));
this.node.on(h.RECORDING_FINISHED, function(n) {
n.stopPropagation();
t.scheduleOnce(function() {
t._tracingContainer.active = !0;
t._recordingContainer.active = !1;
}, 3);
});
this.node.on(h.BACK_FINISHED, function(n) {
n.stopPropagation();
t._tracingContainer.active = !1;
t._recordingContainer.active = !0;
});
this.node.on(h.TRACING_FINISHED, function(n) {
n.stopPropagation();
t.nextProblem();
});
};
n.prototype.nextProblem = function() {
this.node.emit("nextProblem");
};
n.prototype.loadTracePath = function(t) {
var n = this;
try {
null == this._tracePath && a.default.getInstance().loadPathJSON(t, function(t) {
if (t && t.length > 0) {
n._jsonLoadingStatus = !0;
n._tracePath = t;
} else {
n._jsonLoadingStatus = !1;
n._tracePath = null;
}
});
} catch (t) {
this._jsonLoadingStatus = !1;
}
};
n.prototype.setImageToDisplay = function(t) {
this._recordingContainerComponent = this._recordingContainer.getComponent(s.default);
this._recordingContainerComponent.tracingImage = t;
this._tracingContainerComponent = this._tracingContainer.getComponent(s.default);
this._tracingContainerComponent.tracingImage = this._imageName;
this._tracingContainerComponent.lineWidth = 25;
this._recordingContainerComponent.lineWidth = 25;
this._tracingContainerComponent.traceGenerationMode = !0;
this.node.addChild(this._recordingContainer);
this.node.addChild(this._tracingContainer);
this.node.setPosition(new cc.Vec2(-cc.winSize.width / 2, -cc.winSize.height / 2));
this._tracingContainer.active = !1;
this._recordingContainer.setPosition(new cc.Vec2(0, 0));
this._tracingContainer.setPosition(new cc.Vec2(0, 0));
this._recordingContainerComponent.traceGraphics.emit("enabledGraphics");
this._tracingContainerComponent.traceGraphics.emit("enabledGraphics");
null !== this._imageName && null == this._tracePath && this.loadTracePath(this._imageName);
};
n.prototype.processConfiguration = function(t) {
void 0 === t && (t = []);
var n = [].concat.apply([], t);
if (4 === n.length) {
return {
level: n[0],
workSheet: n[1],
problemNo: n[2],
image: n[3]
};
}
return null;
};
n.prototype.update = function(t) {
null !== this._imageName && null == this._tracePath && this._jsonLoadingStatus && this.loadTracePath(this._imageName);
if (!1 === this._tracingContainerVisible && null !== this._tracePath) {
this._tracingContainer.active = !0;
this._tracingContainerVisible = !0;
this._tracingContainerComponent._traceGraphicsComponent.loadTracePath(this._imageName);
}
};
o([ c(cc.Prefab) ], n.prototype, "progressMonitorPrefab", void 0);
o([ c(cc.Prefab) ], n.prototype, "recordContainerPrefab", void 0);
o([ c(cc.Prefab) ], n.prototype, "tracingContainerPrefab", void 0);
return n = o([ r ], n);
}(cc.Component);
e.ImageRecorder = p;
cc._RF.pop();
}, {
"../../../common/Tracing/scripts/tracing-container": void 0,
"../../../common/scripts/helper": void 0,
"../../../common/scripts/lib/config": void 0
} ]
}, {}, [ "imagerecorder" ]);