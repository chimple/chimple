window.__require = function t(e, o, n) {
function r(i, a) {
if (!o[i]) {
if (!e[i]) {
var s = i.split("/");
s = s[s.length - 1];
if (!e[s]) {
var l = "function" == typeof __require && __require;
if (!a && l) return l(s, !0);
if (c) return c(s, !0);
throw new Error("Cannot find module '" + i + "'");
}
i = s;
}
var u = o[i] = {
exports: {}
};
e[i][0].call(u.exports, function(t) {
return r(e[i][1][t] || t);
}, u, u.exports, t, e, o, n);
}
return o[i].exports;
}
for (var c = "function" == typeof __require && __require, i = 0; i < n.length; i++) r(n[i]);
return r;
}({
backButton: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "7082dngCaFG/b2DSeSfDxXQ", "backButton");
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
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("../../../common/scripts/lib/config"), i = cc._decorator, a = i.ccclass, s = (i.property, 
function(t) {
n(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.onButtonClick = function(t, e) {
c.default.getInstance().popScene();
};
return e = r([ a ], e);
}(cc.Component));
o.default = s;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0
} ],
chapterContent: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "44799QSQ/dBoaNm8rQ2ydtk", "chapterContent");
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
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = cc._decorator, i = c.ccclass, a = c.property, s = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.label = null;
e.layout = null;
return e;
}
e.prototype.start = function() {
this.layout.getComponent(cc.Layout).updateLayout();
this.layout.parent.width = this.layout.width;
};
r([ a(cc.Label) ], e.prototype, "label", void 0);
r([ a(cc.Node) ], e.prototype, "layout", void 0);
return e = r([ i ], e);
}(cc.Component);
o.default = s;
cc._RF.pop();
}, {} ],
character: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "ac607T3kDFM0JEFGxTkBTUR", "character");
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
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = cc._decorator, i = c.ccclass, a = (c.property, function(t) {
n(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
return e = r([ i ], e);
}(cc.Component));
o.default = a;
cc._RF.pop();
}, {} ],
courseContent: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "d91c0gXhclDD6RZOzsKPeTI", "courseContent");
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
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("../../../common/scripts/lib/config"), i = t("./chapterContent"), a = t("./lessonButton"), s = cc._decorator, l = s.ccclass, u = s.property, p = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.lessonButtonPrefab = null;
e.chapterContentPrefab = null;
e.chaptersLayout = null;
return e;
}
o = e;
e.prototype.onLoad = function() {
var t = c.default.i;
this.chaptersLayout.removeAllChildren();
for (var e = null, n = 0, r = 0, s = t.curriculum.get(t.courseId).chapters; r < s.length; r++) {
var l = s[r], u = cc.instantiate(this.chapterContentPrefab);
u.width = cc.winSize.width;
var p = u.getComponent(i.default);
p.label.string = l.name;
this.chaptersLayout.addChild(u);
(e = p.layout).width = cc.winSize.width;
for (var d = 0, f = l.lessons; d < f.length; d++) {
var h = f[d], y = cc.instantiate(this.lessonButtonPrefab), m = y.getComponent(a.default);
m.course = t.course;
m.chapter = l;
m.lesson = h;
m.loading = this.loading;
e.addChild(y);
}
var g = e.getComponent(cc.Layout);
null != g && g.updateLayout();
var v = u.getComponent(cc.Layout);
null != v && v.updateLayout();
u.color = new cc.Color().fromHEX(o.colors[n++ % o.colors.length]);
}
this.chaptersLayout.getComponent(cc.Layout).updateLayout();
this.chaptersLayout.parent.height = this.chaptersLayout.height;
this.chaptersLayout.parent.width = cc.winSize.width;
this.chaptersLayout.parent.parent.width = cc.winSize.width;
};
var o;
e.colors = [ "#511F73", "#26A699", "#F29727", "#F24C3D" ];
r([ u(cc.Prefab) ], e.prototype, "lessonButtonPrefab", void 0);
r([ u(cc.Prefab) ], e.prototype, "chapterContentPrefab", void 0);
r([ u(cc.Node) ], e.prototype, "chaptersLayout", void 0);
return e = o = r([ l ], e);
}(cc.Component);
o.default = p;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0,
"./chapterContent": "chapterContent",
"./lessonButton": "lessonButton"
} ],
headerButton: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "3681eSnAN5MGoPeKVSnGUjg", "headerButton");
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
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = cc._decorator, i = c.ccclass, a = c.property, s = function(t) {
n(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
r([ a(cc.Label) ], e.prototype, "label", void 0);
r([ a(cc.Button) ], e.prototype, "button", void 0);
r([ a(cc.Sprite) ], e.prototype, "sprite", void 0);
r([ a(cc.Sprite) ], e.prototype, "selected", void 0);
return e = r([ i ], e);
}(cc.Component);
o.default = s;
cc._RF.pop();
}, {} ],
home: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "e8ad40c/lZIVay1x6a995wv", "home");
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
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("../../../common/scripts/lib/config"), i = t("../../../common/scripts/lib/profile"), a = t("../../../common/scripts/util"), s = t("../../../common/scripts/util-logger"), l = t("../../../common/scripts/balloon"), u = t("../../../common/scripts/lib/constants"), p = cc._decorator, d = p.ccclass, f = p.property, h = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.nestPrefab = null;
e.balloons = null;
e.balloonPrefab = null;
e.loadingPrefab = null;
e.logo = null;
e.nest = null;
e.bgMusic = null;
return e;
}
e.prototype.onLoad = function() {
var t = this, e = c.default.getInstance();
s.default.initPluginFirebase();
cc.sys.isNative && jsb.fileUtils.setSearchPaths([ jsb.fileUtils.getWritablePath() + "subpackages", jsb.fileUtils.getWritablePath() + "HotUpdateSearchPaths", "@assets/subpackages/", "@assets/" ]);
var o = Object.assign({});
o["" + u.LOG_TYPE] = u.APP_START;
s.default.logEvent(o);
a.Util.playSfx(this.bgMusic, !0, !0);
var n = this.logo.y;
new cc.Tween().target(this.logo).set({
y: cc.winSize.height
}).to(1, {
y: n
}, {
progress: null,
easing: "elasticOut"
}).start();
[ "en", "en-maths" ].forEach(function(o, n, r) {
var c = cc.instantiate(t.balloonPrefab), a = c.getComponent(l.default);
a.chimp = t.nest.getChildByName("chimp");
a.type = l.BalloonType.Type;
a.game = o;
a.onClickCallback = function() {
var o = t.node.getChildByName("nest");
if (null != o) {
var n = o.getChildByName("home");
if (null != n) {
var r = n.getComponent(cc.Button);
null != r && (r.interactable = !1);
}
}
e.pushScene("menu/map/scene/map" + i.default.lastWorld.toString(), "menu");
};
c.scale = .8;
if (r.length > 2) {
var s = t.balloons.getComponent(cc.Layout);
null != s && (s.spacingX = 50);
}
var u = new cc.Node();
u.width = .8 * c.width;
u.addChild(c);
t.balloons.addChild(u);
new cc.Tween().target(c).set({
y: cc.winSize.height
}).delay(1).to(1, {
y: 0
}, {
progress: null,
easing: "elasticOut"
}).start();
});
var r = cc.director.getScene().getChildByName("loading");
if (null == r) {
var p = cc.instantiate(this.loadingPrefab);
p.zIndex = 3;
cc.game.addPersistRootNode(p);
p.active = !1;
} else r.active = !1;
};
e.prototype.nextFlow = function() {};
e.prototype.onInventoryButtonClicked = function() {
c.default.getInstance().pushScene("rewards");
};
e.prototype.onDestroy = function() {
cc.audioEngine.stopMusic();
};
r([ f(cc.Prefab) ], e.prototype, "nestPrefab", void 0);
r([ f(cc.Node) ], e.prototype, "balloons", void 0);
r([ f(cc.Prefab) ], e.prototype, "balloonPrefab", void 0);
r([ f(cc.Prefab) ], e.prototype, "loadingPrefab", void 0);
r([ f(cc.Node) ], e.prototype, "logo", void 0);
r([ f(cc.Node) ], e.prototype, "nest", void 0);
r([ f(cc.AudioClip) ], e.prototype, "bgMusic", void 0);
return e = r([ d ], e);
}(cc.Component);
o.default = h;
cc._RF.pop();
}, {
"../../../common/scripts/balloon": void 0,
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/constants": void 0,
"../../../common/scripts/lib/profile": void 0,
"../../../common/scripts/util": void 0,
"../../../common/scripts/util-logger": void 0
} ],
hotUpdate: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "1eddd6WqopBsqESK/HdMEPs", "hotUpdate");
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
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
o.PROJECT_MANIFEST = o.UpdateEvent = void 0;
var c, i = t("../../../common/scripts/util"), a = t("../../../common/scripts/util-logger"), s = cc._decorator, l = s.ccclass, u = s.property;
(function(t) {
t[t.Checking = 0] = "Checking";
t[t.Updating = 1] = "Updating";
t[t.UpdateDone = 2] = "UpdateDone";
t[t.Done = 3] = "Done";
t[t.Error = 4] = "Error";
})(c = o.UpdateEvent || (o.UpdateEvent = {}));
o.PROJECT_MANIFEST = "project.manifest";
var p = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.status = null;
e.fileProgress = null;
e.manifest = null;
return e;
}
o = e;
e.prototype.oneByOne = function(t, e, n) {
var r = this;
o.doHotUpdate(t[e].storagePath, t[e].manifestUrl, null, function(o, i, a) {
r.status.string = i;
r.fileProgress.progress = a;
if (o == c.Done || o == c.UpdateDone || o == c.Error) {
n(e, o == c.UpdateDone && "HotUpdateSearchPaths" == t[e].storagePath);
++e < t.length && r.oneByOne(t, e, n);
}
});
};
e.prototype.onLoad = function() {
a.default.initPluginFirebase();
if (cc.sys.isNative) {
var t = [ {
storagePath: "HotUpdateSearchPaths",
manifestUrl: this.manifest.nativeUrl
} ], e = i.Util.getSubpackages().map(function(t) {
return {
storagePath: e + "/" + t,
manifestUrl: t + "/project.manifest"
};
}), o = !1;
this.oneByOne(t, 0, function(e, n) {
o = o || n;
if (e == t.length - 1) if (o) {
cc.audioEngine.stopAll();
cc.game.restart();
} else cc.director.loadScene("home");
});
} else cc.director.loadScene("home");
};
e.doHotUpdate = function(t, e, o, n) {
var r = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + t, i = new jsb.AssetsManager("", r, function(t, e) {
return Number(t) - Number(e);
});
i.setVerifyCallback(function(t, e) {
var o = e.compressed, r = e.md5, i = e.path;
e.size;
if (o) {
n(c.Checking, "Verification passed : " + i, 0);
return !0;
}
n(c.Checking, "Verification passed : " + i + " (" + r + ")", 0);
return !0;
});
n(c.Checking, "Hot update is ready, please check or directly update", 0);
if (cc.sys.os === cc.sys.OS_ANDROID) {
i.setMaxConcurrentTask(2);
n(c.Checking, "Max concurrent tasks count have been limited to 2", 0);
}
n(c.Checking, "Checking or updating ...", 0);
if (i.getState() === jsb.AssetsManager.State.UNINITED) if (e) {
var a = e;
cc.loader.md5Pipe && (a = cc.loader.md5Pipe.transformURL(a));
i.loadLocalManifest(a);
} else {
var s = new jsb.Manifest(o, r);
i.loadLocalManifest(s, r);
}
i.getLocalManifest() && i.getLocalManifest().isLoaded() || n(c.Error, "Failed to load local manifest ...", 0);
i.setEventCallback(function(t) {
switch (t.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
i.setEventCallback(null);
n(c.Error, "No local manifest file found, hot update skipped", 0);
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
i.setEventCallback(null);
n(c.Error, "Fail to download manifest file, hot update skipped", 0);
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
i.setEventCallback(null);
n(c.Done, "Already up to date with the latest remote version", 0);
break;

case jsb.EventAssetsManager.NEW_VERSION_FOUND:
n(c.Checking, "New version found, please try to update", 0);
i.setEventCallback(null);
if (i) {
i.setEventCallback(function(t) {
switch (t.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
i.setEventCallback(null);
n(c.Error, "No local manifest file found, hot update skipped", 0);
break;

case jsb.EventAssetsManager.UPDATE_PROGRESSION:
var e = t.getMessage();
n(c.Updating, e, t.getPercentByFile());
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
i.setEventCallback(null);
n(c.Error, "No local manifest file found, hot update skipped", 0);
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
i.setEventCallback(null);
n(c.Done, "Already up to date with the latest remote version", 0);
break;

case jsb.EventAssetsManager.UPDATE_FINISHED:
i.setEventCallback(null);
n(c.UpdateDone, "Update finished. " + t.getMessage(), 1);
break;

case jsb.EventAssetsManager.UPDATE_FAILED:
i.setEventCallback(null);
n(c.Error, "Update failed. " + t.getMessage(), 0);
break;

case jsb.EventAssetsManager.ERROR_UPDATING:
i.setEventCallback(null);
n(c.Error, "Asset update error: " + t.getAssetId() + ", " + t.getMessage(), 0);
break;

case jsb.EventAssetsManager.ERROR_DECOMPRESS:
i.setEventCallback(null);
n(c.Error, t.getMessage(), 0);
}
});
i.update();
}
break;

default:
return;
}
});
i.checkUpdate();
};
e.prototype.cancel = function() {
cc.director.loadScene("home");
};
var o;
r([ u(cc.Label) ], e.prototype, "status", void 0);
r([ u(cc.ProgressBar) ], e.prototype, "fileProgress", void 0);
r([ u({
type: cc.Asset
}) ], e.prototype, "manifest", void 0);
return e = o = r([ l ], e);
}(cc.Component);
o.default = p;
cc._RF.pop();
}, {
"../../../common/scripts/util": void 0,
"../../../common/scripts/util-logger": void 0
} ],
inventory: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "9525c5LUTFDcpDN2ZyfajcH", "inventory");
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
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("./item"), i = t("../../../common/scripts/lib/profile"), a = cc._decorator, s = a.ccclass, l = a.property, u = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.itemPrefab = null;
e.layoutNode = null;
e.scrollValue = 100;
e.individualLayoutNode = null;
e.characterNameLabel = null;
e.currentScrollValue = 1e3;
e.hatArmature = null;
e.handArmature = null;
e.glassArmature = null;
e.shoeArmature = null;
e.neckArmature = null;
e.lastSelectedButton = 0;
e.characterName = "bear";
e.normalSprite = null;
e.inventoryData = [ [ "hat1", "hat1-hat1", "hat1-hat2", "hat1-hat3", "hat1-hat4", "hat1-hat5", "hat1-hat6", "hat1-hat7", "hat1-hat8", "hat1-hat9", "hat1-hat10" ], [ "hand", "handacc-hand1", "handacc-hand2", "handacc-hand3", "handacc-hand4", "handacc-hand5", "handacc-hand6", "handacc-hand7", "handacc-hand8" ], [ "glasses", "glassacc-glass1", "glassacc-glass2", "glassacc-glass3", "glassacc-glass4", "glassacc-glass5", "glassacc-glass6", "glassacc-glass7", "glassacc-glass8", "glassacc-glass9", "glassacc-glass10" ], [ "shoes", "left_shoe-shoe1", "left_shoe-shoe2", "left_shoe-shoe3", "left_shoe-shoe4", "left_shoe-shoe5", "left_shoe-shoe6", "left_shoe-shoe7", "left_shoe-shoe8", "left_shoe-shoe9", "left_shoe-shoe10" ], [ "neck", "neck_acc-neck1", "neck_acc-neck2", "neck_acc-neck3", "neck_acc-neck4", "neck_acc-neck5", "neck_acc-neck6", "neck_acc-neck7", "neck_acc-neck8", "neck_acc-neck9", "neck_acc-neck10" ] ];
e.saveConstants = [ "hat1", "handacc", "glassacc", "left_shoe", "neck_acc" ];
e.animationNames = [ "hat", "hand", "glass", "leg", "neck" ];
return e;
}
e.prototype.onLoad = function() {
this.buildIndividualItems(this.inventoryData[0]);
for (var t = 1; t < this.inventoryData[0].length; t++) this.hatArmature.armatureName = this.inventoryData[0][t].split("-")[1];
for (t = 1; t < this.inventoryData[1].length; t++) this.handArmature.armatureName = this.inventoryData[1][t].split("-")[1];
for (t = 1; t < this.inventoryData[2].length; t++) this.glassArmature.armatureName = this.inventoryData[2][t].split("-")[1];
for (t = 1; t < this.inventoryData[3].length; t++) this.shoeArmature.armatureName = this.inventoryData[3][t].split("-")[1];
for (t = 1; t < this.inventoryData[4].length; t++) this.neckArmature.armatureName = this.inventoryData[4][t].split("-")[1];
try {
this.characterName = i.User.getCurrentUser().currentCharacter;
} catch (t) {
console.log("error reading character name");
}
this.characterNameLabel.getComponent(cc.Label).string = this.characterName;
this.node.getChildByName(this.characterName + "_dragon").active = !0;
try {
this.loadSavedCharacterAcc();
} catch (t) {
console.log("error loading inventory");
}
};
e.prototype.loadSavedCharacterAcc = function() {
var t = this;
this.saveConstants.forEach(function(e) {
var o = t.characterName.concat("-", e), n = i.User.getCurrentUser().inventory[o], r = dragonBones.CCFactory.getInstance(), c = t.node.getChildByName(t.characterName + "_dragon").getComponent(dragonBones.ArmatureDisplay).armature();
c.getSlot(e).childArmature = r.buildArmature(n);
"left_shoe" === e && (c.getSlot(e).childArmature = r.buildArmature(t.characterName.concat("-", "right_shoe")));
});
};
e.prototype.onInventoryButtonClick = function(t) {
var e = "acc" + this.lastSelectedButton.toString();
if (this.lastSelectedButton > -1) {
var o = cc.Color.BLACK;
this.node.getChildByName("acc_layout").getChildByName(e).getChildByName(this.lastSelectedButton.toString()).getChildByName("Background").color = o.fromHEX("#282C65");
this.node.getChildByName("acc_layout").getChildByName(e).getChildByName(this.lastSelectedButton.toString()).getChildByName("icon").color = o.fromHEX("#FFFFFF");
}
e = "acc" + t.currentTarget.name;
var n = cc.Color.BLACK;
this.node.getChildByName("acc_layout").getChildByName(e).getChildByName(t.currentTarget.name).getChildByName("Background").color = n.fromHEX("#FFFFFF");
this.node.getChildByName("acc_layout").getChildByName(e).getChildByName(t.currentTarget.name).getChildByName("icon").color = n.fromHEX("#282C65FFFFFF");
this.buildIndividualItems(this.inventoryData[parseInt(t.currentTarget.name)]);
this.lastSelectedButton = parseInt(t.currentTarget.name);
};
e.prototype.scrollRight = function() {
var t = this.node.getChildByName("scrollview").getComponent(cc.ScrollView);
this.currentScrollValue < t.getMaxScrollOffset().x + 1e3 && (this.currentScrollValue += this.scrollValue);
var e = this.node.convertToNodeSpace(cc.v2(this.currentScrollValue, 0));
t.scrollToOffset(new cc.Vec2(Math.abs(e.x) - cc.winSize.width / 2, 0), 2);
};
e.prototype.scrollLeft = function() {
this.currentScrollValue > 1e3 && (this.currentScrollValue -= this.scrollValue);
var t = this.node.convertToNodeSpace(cc.v2(this.currentScrollValue, 0));
this.node.getChildByName("scrollview").getComponent(cc.ScrollView).scrollToOffset(new cc.Vec2(Math.abs(t.x) - cc.winSize.width / 2, 0), 2);
};
e.prototype.buildIndividualItems = function(t) {
var e = this;
this.layoutNode.removeAllChildren();
t.forEach(function(o, n) {
if (0 != n) {
var r = cc.instantiate(e.itemPrefab);
r.name = o;
r.getChildByName("New Button").getChildByName("Background").getComponent(cc.Sprite).spriteFrame = e.node.getChildByName("button_textures").getChildByName(o.split("-")[0]).getChildByName(o.split("-")[1]).getComponent(cc.Sprite).spriteFrame;
r.getChildByName("New Button").height = e.node.getChildByName("button_textures").getChildByName(o.split("-")[0]).getChildByName(o.split("-")[1]).height;
r.getChildByName("New Button").width = e.node.getChildByName("button_textures").getChildByName(o.split("-")[0]).getChildByName(o.split("-")[1]).width;
"false" !== i.User.getCurrentUser().unlockedInventory[t[0] + "-" + n] && void 0 !== i.User.getCurrentUser().unlockedInventory[t[0] + "-" + n] || (r.getChildByName("New Button").getChildByName("lock_icon").active = !0);
var a = r.getComponent(c.default);
a.onClickCallback = function(t) {
var o = t.split("-"), n = o[0], r = o[1], c = r, a = dragonBones.CCFactory.getInstance(), s = e.node.getChildByName(e.characterName + "_dragon").getComponent(dragonBones.ArmatureDisplay).armature();
s.getSlot(n).childArmature = a.buildArmature(c);
e.node.getChildByName(e.characterName + "_dragon").getComponent(dragonBones.ArmatureDisplay).playAnimation(e.animationNames[e.lastSelectedButton], 1);
"left_shoe" === n && (s.getSlot("right_shoe").childArmature = a.buildArmature(c));
var l = e.characterName.concat("-", n);
i.User.getCurrentUser().inventory[l] = r;
};
"false" !== i.User.getCurrentUser().unlockedInventory[t[0] + "-" + n] && void 0 !== i.User.getCurrentUser().unlockedInventory[t[0] + "-" + n] || (a.isLocked = !0);
r.getChildByName("New Button").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = o;
r.getChildByName("New Button").name = o;
e.layoutNode.addChild(r);
}
});
};
e.prototype.start = function() {};
r([ l(cc.Prefab) ], e.prototype, "itemPrefab", void 0);
r([ l(cc.Node) ], e.prototype, "layoutNode", void 0);
r([ l() ], e.prototype, "scrollValue", void 0);
r([ l(cc.Node) ], e.prototype, "individualLayoutNode", void 0);
r([ l(cc.Label) ], e.prototype, "characterNameLabel", void 0);
r([ l(dragonBones.ArmatureDisplay) ], e.prototype, "hatArmature", void 0);
r([ l(dragonBones.ArmatureDisplay) ], e.prototype, "handArmature", void 0);
r([ l(dragonBones.ArmatureDisplay) ], e.prototype, "glassArmature", void 0);
r([ l(dragonBones.ArmatureDisplay) ], e.prototype, "shoeArmature", void 0);
r([ l(dragonBones.ArmatureDisplay) ], e.prototype, "neckArmature", void 0);
return e = r([ s ], e);
}(cc.Component);
o.default = u;
cc._RF.pop();
}, {
"../../../common/scripts/lib/profile": void 0,
"./item": "item"
} ],
item: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "e9c76rOfsRMNruLTUm9odcG", "item");
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
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = cc._decorator, i = c.ccclass, a = c.property, s = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.isLocked = !1;
e.lockIconNode = null;
e.onClickCallback = null;
return e;
}
e.prototype.onLoad = function() {};
e.prototype.onItemClick = function(t) {
console.log(t.currentTarget.name);
this.isLocked || this.onClickCallback(t.currentTarget.name);
};
e.prototype.start = function() {};
r([ a(cc.Node) ], e.prototype, "lockIconNode", void 0);
return e = r([ i ], e);
}(cc.Component);
o.default = s;
cc._RF.pop();
}, {} ],
lessonButton: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "65142Zn2nJMzL9T1AFOOeug", "lessonButton");
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
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("../../../common/scripts/util"), i = t("../../../common/scripts/lib/config"), a = t("../../../common/scripts/lib/profile"), s = t("../../../common/scripts/lessonController"), l = cc._decorator, u = l.ccclass, p = l.property, d = function(t) {
n(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.onLoad = function() {
var t = this;
if (null != this.lesson && null != this.course.id && null != this.chapter) {
var e = i.default.i;
this.label.string = this.lesson.name;
c.Util.load(this.course.id + "/course/res/icons/" + this.lesson.image, function(e, o) {
e || (t.sprite.spriteFrame = new cc.SpriteFrame(o));
});
this.button.node.on("click", function() {
e.lessonId = t.lesson.id;
e.chapterId = t.chapter.id;
e.courseId = t.course.id;
e.lesson = t.lesson;
e.chapter = t.chapter;
e.course = t.course;
t.loading.active = !0;
s.default.preloadLesson(function() {
e.pushScene("common/scenes/lessonController");
});
});
null != this.chapterLabel && (this.chapterLabel.string = this.chapter.name);
null != this.courseSprite && c.Util.load(this.course.id + "/course/res/icons/" + this.course.id + "_bg.png", function(e, o) {
e || (t.courseSprite.spriteFrame = new cc.SpriteFrame(o));
});
a.User.getCurrentUser().lessonProgressMap.has(this.lesson.id) || (this.completedSprite.node.active = !1);
}
};
r([ p(cc.Label) ], e.prototype, "label", void 0);
r([ p(cc.Button) ], e.prototype, "button", void 0);
r([ p(cc.Sprite) ], e.prototype, "sprite", void 0);
r([ p(cc.Label) ], e.prototype, "chapterLabel", void 0);
r([ p(cc.Sprite) ], e.prototype, "courseSprite", void 0);
r([ p(cc.Sprite) ], e.prototype, "completedSprite", void 0);
r([ p(cc.Sprite) ], e.prototype, "downloadSprite", void 0);
return e = r([ u ], e);
}(cc.Component);
o.default = d;
cc._RF.pop();
}, {
"../../../common/scripts/lessonController": void 0,
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/profile": void 0,
"../../../common/scripts/util": void 0
} ],
"level-indicator": [ function(t, e, o) {
"use strict";
cc._RF.push(e, "a8776kXU99GSpSY943ub5Ck", "level-indicator");
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
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("../../../common/scripts/lib/config"), i = t("../../../common/scripts/lib/profile"), a = t("../../../common/scripts/util"), s = cc._decorator, l = s.ccclass, u = s.property, p = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.touchable = !0;
e.levelsClickAudio = null;
return e;
}
e.prototype.onLoad = function() {
if (this.touchable) {
this.node.on(a.TouchEvents.TOUCH_START, this.onTouchStart, this);
this.node.on(a.TouchEvents.TOUCH_END, this.onTouchEnd, this);
}
};
e.prototype.onTouchStart = function(t) {
new cc.Tween().target(this.node).to(.5, {
scale: .9
}, {
progress: null,
easing: "elasticOut"
}).start();
};
e.prototype.onTouchEnd = function(t) {
var e = this;
new cc.Tween().target(this.node).to(.5, {
scale: 1
}, {
progress: null,
easing: "elasticOut"
}).call(function() {
a.Util.playSfx(e.levelsClickAudio);
var t = c.default.getInstance();
if (t.flow != c.Flow.Default) {
i.default.lastWorld = e.world;
i.default.lastLevel = e.level;
}
t.flow == c.Flow.Debug ? t.pushScene("menu/home/scenes/games") : t.pushScene("menu/map/scene/submap", "menu");
}).start();
};
r([ u ], e.prototype, "touchable", void 0);
r([ u({
type: cc.AudioClip
}) ], e.prototype, "levelsClickAudio", void 0);
return e = r([ l ], e);
}(cc.Component);
o.default = p;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/profile": void 0,
"../../../common/scripts/util": void 0
} ],
mapBar: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "c0e31IUiTpAn7jvWUsGTSL3", "mapBar");
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
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("./map"), i = t("../../../common/scripts/lib/config"), a = t("../../../common/scripts/lib/profile"), s = t("../../../common/scripts/util"), l = cc._decorator, u = l.ccclass, p = l.property, d = [ "Number identification\nPattern recognition", "Count and write numbers up to 10", "Compare magnitude of numbers within 10\nOrder numbers within 10", "Count and write numbers up to 50\nAdd, subtract numbers within 10", "Count and write two digit numbers\nCompose & decompose numbers within 10", "Recognize 2 digit numbers\nSkip counting within 50s", "Add, subtract numbers within 20\nFast operations within 10", "Skip counting within 100\nWord problems within 10", "Recognize 3 digit numbers\nMultiplication", "Add, subtract within 100\nFast operations within 20" ], f = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.worldMap = null;
e.icons = null;
e.blockPrefab = null;
e.block = null;
e.mapUpAudio = null;
e.mapDownAudio = null;
return e;
}
o = e;
e.prototype.onLoad = function() {
o.clicked = !1;
var t = this.node.getParent().getChildByName("MapScrollView");
if (null != t) {
var e = t.getComponent(c.default);
if (null != e) for (var n = a.default.lastWorld + 1; n < this.icons.childrenCount; n++) this.disableButton(n, e);
}
this.node.width = cc.winSize.width;
this.node.height = cc.winSize.height;
"en-maths" == i.default.i.courseId && this.icons.children.forEach(function(t, e) {
var o = t.getChildByName("text");
if (o) {
var n = o.getComponent(cc.Label);
n && (n.string = d[e]);
}
});
};
e.prototype.disableButton = function(t, e) {
var o = this.icons.children[t];
if (null != o) {
var n = o.getComponent(cc.Button);
null != n && i.default.getInstance().flow == i.Flow.Default && (n.interactable = !1);
}
};
e.prototype.goToMap = function(t, e) {
if (!o.clicked) {
o.clicked = !0;
var n = t.target.getSiblingIndex();
i.default.loadScene("menu/map/scene/map" + n.toString(), "menu");
}
};
e.prototype.raiseWorldMap = function(t, e) {
s.Util.playSfx(this.mapUpAudio);
this.block = cc.instantiate(this.blockPrefab);
this.block.on("touchstart", this.lowerWorldMap, this);
this.node.insertChild(this.block, 1);
new cc.Tween().target(this.worldMap).to(.5, {
y: -24
}, null).start();
};
e.prototype.lowerWorldMap = function(t, e) {
s.Util.playSfx(this.mapDownAudio);
this.block && this.block.removeFromParent();
new cc.Tween().target(this.worldMap).to(.5, {
y: -cc.winSize.height
}, null).start();
};
var o;
e.clicked = !1;
r([ p(cc.Node) ], e.prototype, "worldMap", void 0);
r([ p(cc.Node) ], e.prototype, "icons", void 0);
r([ p(cc.Prefab) ], e.prototype, "blockPrefab", void 0);
r([ p({
type: cc.AudioClip
}) ], e.prototype, "mapUpAudio", void 0);
r([ p({
type: cc.AudioClip
}) ], e.prototype, "mapDownAudio", void 0);
return e = o = r([ u ], e);
}(cc.Component);
o.default = f;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/profile": void 0,
"../../../common/scripts/util": void 0,
"./map": "map"
} ],
map: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "45c3fT7Oh5G5IjB97cV3bEP", "map");
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
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("./level-indicator"), i = t("../../../common/scripts/lib/config"), a = t("../../../common/scripts/util"), s = t("../../../common/scripts/helper"), l = cc._decorator, u = l.ccclass, p = l.property, d = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.forestMap = null;
e.levelCompletedPrefab = null;
e.currentLevelPrefab = null;
e.unlockedPrefab = null;
e.view = null;
e.content = null;
e.layout = null;
e.block = null;
e.textFont = null;
e.world = 0;
e.bgMusic = null;
e.worlds = [];
e.balloon = null;
return e;
}
e.prototype.onLoad = function() {};
e.prototype.showLevelIndicator = function(t, e, o, n, r, l) {
void 0 === l && (l = !1);
var u = cc.instantiate(e), p = u.getComponent(c.default);
p.level = r;
p.world = n;
i.default.getInstance().flow != i.Flow.Default && (p.touchable = !0);
u.position = o;
t.addChild(u);
a.Util.initText(u, this.textFont, String(r + 1), s.LEVEL_FONT_SIZE, "#808080", !0, new cc.Vec2(-2.5, 0));
l && (this.balloon = u);
};
e.prototype.scrollToCurrentLevel = function() {
if (null != this.balloon) {
var t = this.balloon.getParent().convertToWorldSpace(this.balloon.getPosition()), e = this.node.convertToNodeSpace(t);
this.node.getComponent(cc.ScrollView).scrollToOffset(new cc.Vec2(Math.abs(e.x) - cc.winSize.width / 2, 0), 2);
}
};
e.prototype.onDestroy = function() {
console.log("map destroy");
this.node.destroyAllChildren();
this.node.destroy();
};
r([ p(cc.Node) ], e.prototype, "forestMap", void 0);
r([ p(cc.Prefab) ], e.prototype, "levelCompletedPrefab", void 0);
r([ p(cc.Prefab) ], e.prototype, "currentLevelPrefab", void 0);
r([ p(cc.Prefab) ], e.prototype, "unlockedPrefab", void 0);
r([ p(cc.Node) ], e.prototype, "view", void 0);
r([ p(cc.Node) ], e.prototype, "content", void 0);
r([ p(cc.Node) ], e.prototype, "layout", void 0);
r([ p(cc.Node) ], e.prototype, "block", void 0);
r([ p({
type: cc.Font
}) ], e.prototype, "textFont", void 0);
r([ p ], e.prototype, "world", void 0);
r([ p(cc.AudioClip) ], e.prototype, "bgMusic", void 0);
return e = r([ u ], e);
}(cc.Component);
o.default = d;
cc._RF.pop();
}, {
"../../../common/scripts/helper": void 0,
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/util": void 0,
"./level-indicator": "level-indicator"
} ],
picDisplayPrefab: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "36cb0+0OLxFoJh8vQWRMvMy", "picDisplayPrefab");
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
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("../../../common/scripts/lib/profile"), i = cc._decorator, a = i.ccclass, s = i.property, l = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.picNode = null;
return e;
}
e.prototype.onLoad = function() {
this.loadUserImageOrAvatar();
};
e.prototype.loadUserImageOrAvatar = function() {
var t = this, e = c.User.getCurrentUser(), o = this.picNode;
"" != e.imgPath ? cc.loader.load(e.imgPath, function(t, e) {
if (!t) {
var n = new cc.SpriteFrame(e);
o.getComponent(cc.Sprite).spriteFrame = n;
}
}) : cc.resources.load("avatars/" + e.avatarImage, function(e, o) {
t.picNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(o);
});
};
r([ s(cc.Node) ], e.prototype, "picNode", void 0);
return e = r([ a ], e);
}(cc.Component);
o.default = l;
cc._RF.pop();
}, {
"../../../common/scripts/lib/profile": void 0
} ],
rewards: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "4d3cakHbFBPdb0cWsMvTLq1", "rewards");
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
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("../../../common/scripts/lib/config"), i = t("../../../common/scripts/lib/profile"), a = cc._decorator, s = a.ccclass, l = a.property, u = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.layoutHolder = null;
e.normalSprite = null;
e.lastSelectedButton = -1;
e.leftSideNormalSprite = null;
e.sideLayoutNode = null;
e.saveConstants = [ "character", "background", "achievement" ];
return e;
}
e.prototype.onLoad = function() {
this.checkLockStatus(this.saveConstants);
};
e.prototype.checkLockStatus = function(t) {
var e = this;
t.forEach(function(t, o) {
for (var n = e.layoutHolder.children[o].children[0].children[0].childrenCount, r = 0; r < n; r++) "false" === i.User.getCurrentUser().unlockedRewards[t + "-" + r] || i.User.getCurrentUser().unlockedRewards[e.saveConstants[0] + "-" + r];
});
};
e.prototype.onContentClick = function(t, e) {
for (var o = 0; o < 3; o++) if (parseInt(e) === o) {
this.layoutHolder.getChildByName(o.toString()).active = !0;
var n = cc.Color.BLACK;
this.sideLayoutNode.children[o].getChildByName("Background").color = n.fromHEX("#17ADEC");
this.sideLayoutNode.children[o].getChildByName("Background").children[0].color = n.fromHEX("#17ADEC");
} else {
this.layoutHolder.getChildByName(o.toString()).active = !1;
n = cc.Color.BLACK;
this.sideLayoutNode.children[o].getChildByName("Background").color = n.fromHEX("#FFFFFF");
this.sideLayoutNode.children[o].getChildByName("Background").children[0].color = n.fromHEX("#FFFFFF");
}
};
e.prototype.onCharacterClick = function(t, e) {
console.log("hello character");
this.lastSelectedButton.toString();
this.lastSelectedButton;
"indi_button_prefab" + t.currentTarget.name;
this.lastSelectedButton = parseInt(t.currentTarget.name);
i.User.getCurrentUser().currentCharacter = e.toString().trim();
c.default.getInstance().pushScene("inventory");
};
e.prototype.onBgClick = function(t, e) {
this.lastSelectedButton.toString();
this.lastSelectedButton;
"bg_button_prefab" + t.currentTarget.name;
this.lastSelectedButton = parseInt(t.currentTarget.name);
i.User.getCurrentUser().currentBg = e.toString().trim();
};
r([ l(cc.Node) ], e.prototype, "layoutHolder", void 0);
r([ l(cc.Node) ], e.prototype, "sideLayoutNode", void 0);
return e = r([ s ], e);
}(cc.Component);
o.default = u;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/profile": void 0
} ],
startContent: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "8dd3dM68/dIZr6N+Ydk2DUq", "startContent");
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
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("../../../common/scripts/lib/profile"), i = t("../../../common/scripts/lib/config"), a = t("./lessonButton"), s = cc._decorator, l = s.ccclass, u = s.property, p = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.startLessonButtonPrefab = null;
e.layout = null;
return e;
}
e.prototype.onLoad = function() {
var t = this, e = c.User.getCurrentUser().courseProgressMap;
i.default.i.curriculum.forEach(function(o, n) {
var r = e.get(n).currentLessonId, c = null, i = null;
o.chapters.some(function(t) {
if (null != (c = t.lessons.find(function(t) {
return t.id == r;
}))) {
i = t;
return !0;
}
});
if (null == c) {
i = o.chapters[0];
c = i.lessons[0];
}
var s = cc.instantiate(t.startLessonButtonPrefab), l = s.getComponent(a.default);
l.course = o;
l.chapter = i;
l.lesson = c;
l.loading = t.loading;
t.layout.addChild(s);
});
};
r([ u(cc.Prefab) ], e.prototype, "startLessonButtonPrefab", void 0);
r([ u(cc.Node) ], e.prototype, "layout", void 0);
return e = r([ l ], e);
}(cc.Component);
o.default = p;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/profile": void 0,
"./lessonButton": "lessonButton"
} ],
start: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "334f2WfhThDUp2BXojJ6HNk", "start");
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
var r, c = arguments.length, i = c < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i);
return c > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = t("../../../common/scripts/lib/config"), i = t("../../../common/scripts/lib/profile"), a = t("./headerButton"), s = t("../../../common/scripts/util"), l = t("./startContent"), u = t("./courseContent"), p = cc._decorator, d = p.ccclass, f = p.property, h = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.content = null;
e.startContentPrefab = null;
e.courseContentPrefab = null;
e.header = null;
e.headerButtonPrefab = null;
e.homeButton = null;
e.loading = null;
return e;
}
e.prototype.onLoad = function() {
var t = this;
this.loading.width = cc.winSize.width;
var e = c.default.i, o = 0;
i.User.getCurrentUser().courseProgressMap.forEach(function() {
var e = cc.instantiate(t.headerButtonPrefab), n = e.getComponent(a.default);
n.label.string = "";
n.sprite.spriteFrame = null;
n.selected.node.active = !1;
t.header.insertChild(e, ++o);
});
this.homeButton.getComponent(a.default).button.node.on("click", function() {
t.onHomeClick();
});
this.header.width = cc.winSize.width;
this.header.getComponent(cc.Layout).spacingX = Math.max(0, cc.winSize.width / (o + 2) - this.homeButton.width);
o = 0;
e.loadCourseJsons(this.node, function() {
e.curriculum.forEach(function(n, r) {
var c = t.header.children[++o].getComponent(a.default);
c.label.string = r;
s.Util.load(r + "/course/res/icons/" + r + ".png", function(t, e) {
t || (c.sprite.spriteFrame = new cc.SpriteFrame(e));
});
c.button.node.on("click", function() {
t.selectHeaderButton(c);
e.courseId = r;
e.course = n;
t.content.removeAllChildren();
var o = cc.instantiate(t.courseContentPrefab);
o.getComponent(u.default).loading = t.loading;
t.content.addChild(o);
});
});
t.onHomeClick();
t.loading.active = !1;
});
};
e.prototype.onHomeClick = function() {
this.selectHeaderButton(this.homeButton.getComponent(a.default));
this.content.removeAllChildren();
var t = cc.instantiate(this.startContentPrefab);
t.getComponent(l.default).loading = this.loading;
this.content.addChild(t);
};
e.prototype.onProfileClick = function() {
c.default.i.pushScene("menu/inventory/scenes/inventory", "menu");
};
e.prototype.selectHeaderButton = function(t) {
null != this.selectedHeaderButton && (this.selectedHeaderButton.selected.node.active = !1);
t.selected.node.active = !0;
this.selectedHeaderButton = t;
};
r([ f(cc.Node) ], e.prototype, "content", void 0);
r([ f(cc.Prefab) ], e.prototype, "startContentPrefab", void 0);
r([ f(cc.Prefab) ], e.prototype, "courseContentPrefab", void 0);
r([ f(cc.Node) ], e.prototype, "header", void 0);
r([ f(cc.Prefab) ], e.prototype, "headerButtonPrefab", void 0);
r([ f(cc.Node) ], e.prototype, "homeButton", void 0);
r([ f(cc.Node) ], e.prototype, "loading", void 0);
return e = r([ d ], e);
}(cc.Component);
o.default = h;
cc._RF.pop();
}, {
"../../../common/scripts/lib/config": void 0,
"../../../common/scripts/lib/profile": void 0,
"../../../common/scripts/util": void 0,
"./courseContent": "courseContent",
"./headerButton": "headerButton",
"./startContent": "startContent"
} ]
}, {}, [ "home", "hotUpdate", "backButton", "inventory", "item", "character", "level-indicator", "map", "mapBar", "rewards", "chapterContent", "courseContent", "headerButton", "lessonButton", "picDisplayPrefab", "start", "startContent" ]);