(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("electron"), require("os"), require("path"), require("fs"), require("constants"), require("stream"), require("util"), require("assert"), require("http"), require("buffer"), require("events"), require("zlib"), require("child_process"));
	else if(typeof define === 'function' && define.amd)
		define(["electron", "os", "path", "fs", "constants", "stream", "util", "assert", "http", "buffer", "events", "zlib", "child_process"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("electron"), require("os"), require("path"), require("fs"), require("constants"), require("stream"), require("util"), require("assert"), require("http"), require("buffer"), require("events"), require("zlib"), require("child_process")) : factory(root["electron"], root["os"], root["path"], root["fs"], root["constants"], root["stream"], root["util"], root["assert"], root["http"], root["buffer"], root["events"], root["zlib"], root["child_process"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_17__, __WEBPACK_EXTERNAL_MODULE_18__, __WEBPACK_EXTERNAL_MODULE_19__, __WEBPACK_EXTERNAL_MODULE_50__, __WEBPACK_EXTERNAL_MODULE_62__, __WEBPACK_EXTERNAL_MODULE_63__, __WEBPACK_EXTERNAL_MODULE_66__, __WEBPACK_EXTERNAL_MODULE_132__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/* jslint node: true, sub: true, esversion: 6 */

	var _require = __webpack_require__(1),
	    app = _require.app,
	    BrowserWindow = _require.BrowserWindow,
	    ipcMain = _require.ipcMain,
	    dialog = _require.dialog,
	    globalShortcut = _require.globalShortcut;

	var os = __webpack_require__(2);
	var path = __webpack_require__(3);
	global.SDKBOX_CHANEL = 'gui';
	var LaunchWin = __webpack_require__(4);

	// Keep a global reference of the window object, if you don't, the window will
	// be closed automatically when the JavaScript object is garbage collected.
	var win = void 0;

	// This method will be called when Electron has finished
	// initialization and is ready to create browser windows.
	// Some APIs can only be used after this event occurs.
	app.on('ready', function () {

	    // const ret = globalShortcut.register('f12', () => {
	    //     let win = BrowserWindow.getFocusedWindow();
	    //     if (!win) return;
	    //     win.webContents.toggleDevTools();
	    // })

	    // if (!ret) {
	    //     console.log('registration f12 failed')
	    // }

	    win = LaunchWin.launch();
	});

	// Quit when all windows are closed.
	app.on('window-all-closed', function () {
	    // On macOS it is common for applications and their menu bar
	    // to stay active until the user quits explicitly with Cmd + Q
	    if (process.platform !== 'darwin') {
	        app.quit();
	    }
	});

	app.on('activate', function () {
	    // On macOS it's common to re-create a window in the app when the
	    // dock icon is clicked and there are no other windows open.
	    if (win === null) {
	        win = LaunchWin.launch();
	    }
	});

	app.on('will-quit', function () {
	    // Unregister a shortcut.
	    globalShortcut.unregister('f12'

	    // Unregister all shortcuts.
	    );globalShortcut.unregisterAll();
	}

	// In this file you can include the rest of your app's specific main process
	// code. You can also put them in separate files and require them here.

	// Make this app a single instance app.
	//
	// The main window will be restored and focused instead of a second window
	// opened when a person attempts to launch a second instance.
	//
	// Returns true if the current version of the app should quit instead of
	// launching.
	);function makeSingleInstance() {
	    if (process.mas) return false;

	    return app.makeSingleInstance(function () {
	        if (mainWindow) {
	            if (mainWindow.isMinimized()) mainWindow.restore();
	            mainWindow.focus();
	        }
	    });
	}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("electron");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("os");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _Config = __webpack_require__(5);

	var _Utils = __webpack_require__(6);

	var _Utils2 = _interopRequireDefault(_Utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _require = __webpack_require__(1),
	    app = _require.app,
	    BrowserWindow = _require.BrowserWindow,
	    ipcMain = _require.ipcMain,
	    dialog = _require.dialog;

	var os = __webpack_require__(2);
	var path = __webpack_require__(3);
	var http = __webpack_require__(50);


	var cfgFile = path.join(os.homedir(), '.sdkbox', 'conf', 'gui.json');
	var infofile = path.join(os.homedir(), '.sdkbox', 'creator', 'data', 'info.json');
	var SDKBoxWin = void 0;

	function load() {
	    track({
	        'event': 'creator_sdkbox_load'
	    });

	    // app.on('ready', () => {});
	    // app.on('activate', () => {});
	    app.on('will-quit', function () {
	        track({
	            'event': 'creator_quit'
	        });
	    });
	    fetchRemoteVersions();
	}

	function unload() {
	    track({
	        'event': 'creator_sdkbox_unload'
	    });
	}

	function launch() {
	    try {
	        if (SDKBoxWin) {
	            SDKBoxWin.show();
	        }
	    } catch (e) {
	        SDKBoxWin = null;
	    }
	    if (SDKBoxWin) {
	        return;
	    }

	    var win = void 0;
	    var configs = null;

	    // load win size
	    if (true) {
	        configs = _Utils2.default.readJsonFromFile(cfgFile);
	    }
	    if (!configs) {
	        configs = {
	            windowPos: {
	                width: 1080,
	                height: 720
	            }
	        };
	    }

	    // Create the browser window.
	    win = new BrowserWindow({
	        width: configs.windowPos.width,
	        height: configs.windowPos.height,
	        minWidth: 960,
	        minHeight: 600
	    });
	    win.downloads = {};

	    var projectRoot = _Utils2.default.getProjectRoot();
	    var html_path = 'file://' + path.join(__dirname, '..', 'pages') + '/index.html';
	    if (false) {
	        html_path += '?project=' + encodeURIComponent(projectRoot) + '&builtinCocosRoot=' + encodeURIComponent(Editor.builtinCocosRoot);
	    }

	    // and load the index.html of the app.
	    win.loadURL(html_path);
	    track({
	        'event': 'session_start'
	    });

	    // Open the DevTools.
	    // win.webContents.openDevTools()

	    ipcMain.on('open-file-dialog', function (event) {
	        var path = dialog.showOpenDialog({
	            properties: ['openDirectory']
	        });
	        event.sender.send('selected-directory', path);
	    });

	    ipcMain.on('download-file', function (event, url) {
	        if (null == win) {
	            console.log('Win is null');
	            return;
	        }

	        win.webContents.downloadURL(url);
	    });
	    ipcMain.on('cancel-download-file', function (event, url) {
	        var item = win.downloads[url];
	        if (!item) {
	            console.log('failed, can not find download item by url');
	            return;
	        }
	        item.cancel();
	        delete win.downloads[url];
	    });

	    // Emitted when the window is closed.
	    win.on('close', function () {
	        SDKBoxWin = null;
	        track({
	            'event': 'session_end'
	        });
	        if (true) {
	            // save winsize
	            configs = _Utils2.default.readJsonFromFile(cfgFile);
	            var bounds = win.getBounds();
	            if (!configs) {
	                configs = {};
	            }
	            configs.windowPos = {
	                width: bounds.width,
	                height: bounds.height
	            };
	            _Utils2.default.writeJsonToFile(cfgFile, configs);

	            // quit
	            app.quit();
	        }
	    });

	    win.on('closed', function () {
	        // Dereference the window object, usually you would store windows
	        // in an array if your app supports multi windows, this is the time
	        // when you should delete the corresponding element.
	        win = null;
	    });

	    win.webContents.session.on('will-download', function (event, item, webContents) {
	        // Set the save path, making Electron not to prompt a save dialog.
	        var win = SDKBoxWin;
	        var url = item.getURL();
	        var paths = url.split('/');
	        var temp_path = path.join(os.homedir(), '.sdkbox', 'temp', paths[paths.length - 1]);
	        item.setSavePath(temp_path);
	        win.downloads[url] = item;

	        item.on('updated', function (event, state) {
	            var options = {
	                'state': state,
	                'url': url
	            };
	            if (state === 'interrupted') {
	                delete win.downloads[url];
	            }
	            if (state === 'progressing') {
	                options.downloadRatio = item.getReceivedBytes() * 100 / item.getTotalBytes();
	            }
	            win.webContents.send('download-status', options);

	            // if (state === 'interrupted') {
	            //     console.log('Download is interrupted but can be resumed')
	            // } else if (state === 'progressing') {
	            //     options.downloadRatio = item.getReceivedBytes() * 100 / item.getTotalBytes();
	            //     if (item.isPaused()) {
	            //         console.log('Download is paused')
	            //     } else {
	            //         console.log(`Received bytes: ${item.getReceivedBytes()*100/item.getTotalBytes()}`)
	            //     }
	            // }
	        });
	        item.once('done', function (event, state) {
	            if (!win) {
	                return;
	            }
	            delete win.downloads[url];
	            win.webContents.send('download-finish', {
	                'state': state,
	                'url': url
	            });

	            // if (state === 'completed') {
	            //     console.log('Download successfully')
	            // } else {
	            //     console.log(`Download failed: ${state}`)
	            // }
	        });
	    });

	    SDKBoxWin = win;

	    return win;
	}

	function sendMsgToSBWin(msg, options) {
	    if (null == SDKBoxWin) {
	        return;
	    }
	    if (null == SDKBoxWin.webContents) {
	        return;
	    }
	    if ('undefined' == typeof msg) {
	        return;
	    }
	    SDKBoxWin.webContents.send(msg, options);
	}

	function track(json) {
	    function httpGetAsync(theUrl, callback) {
	        // Editor.log(`URL Get: ${theUrl}`);
	        http.get(theUrl, function (res) {
	            // Editor.log(`${theUrl} -> ${res.statusCode}`)
	        });
	    }

	    json.chanel = ("gui");
	    if ('undefined' != typeof Editor) {
	        json.userName = Editor.lastLogin;
	        json.creatorVersion = Editor.App.version;
	    }
	    json.version = _Config.Config.version;
	    json.beta = _Config.Config.beta;
	    var url = 'http://metrics.sdkbox.com/?' + JSON.stringify(json);
	    httpGetAsync(url);
	}

	function fetchRemoteVersions() {
	    if (fs.fs.existsSync(infofile)) {
	        var json = _Utils2.default.readJsonFromFile(infofile);
	        try {
	            var t = json.fetchTime;
	            var _ct = Date.parse(new Date());
	            if ('undefined' == typeof t || _ct - t > 1000 * 60 * 60 * 24) {
	                // one day
	                json.fetchTime = _ct;
	                _Utils2.default.writeJsonToFile(infofile, json);
	                _Utils2.default.loadRemoteVersions();
	            } else {
	                // Editor.log('SDKBox GUI For Creator is the latest version.');
	            }
	        } catch (e) {}
	    } else {
	        ct = Date.parse(new Date());
	        var _json = {
	            fetchTime: ct
	        };
	        _Utils2.default.writeJsonToFile(infofile, _json);
	        _Utils2.default.loadRemoteVersions();
	    }
	}

	function needUpdate() {
	    var json = _Utils2.default.readJsonFromFile(infofile);
	    if (null == json) {
	        return true;
	    }

	    var update = true;
	    try {
	        if (_Utils2.default.compareVersions(json.version.installer.local, json.version.installer.remote) >= 0 && _Utils2.default.compareVersions(json.version.gui.local, json.version.gui.remote) >= 0) {
	            update = false;
	        }
	    } catch (e) {
	        update = true;
	    }

	    if (!update) {
	        fetchRemoteVersions();
	    }

	    return update;
	}

	module.exports.launch = launch;
	module.exports.sendMsgToSBWin = sendMsgToSBWin;
	module.exports.load = load;
	module.exports.unload = unload;
	module.exports.needUpdate = needUpdate;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Config = {
	    version: '1.2.9',
	    beta: false
	};

	exports.Config = Config;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var os = __webpack_require__(2);
	var path = __webpack_require__(3);
	var fs = __webpack_require__(7);
	var fse = __webpack_require__(8);
	var http = __webpack_require__(50);
	var unzip = __webpack_require__(51);
	var CLI = __webpack_require__(131);
	var deepmerge = __webpack_require__(133);

	var projectRoot = null;

	var Utils = function () {
	    function Utils() {
	        _classCallCheck(this, Utils);
	    }

	    _createClass(Utils, null, [{
	        key: 'installerInstalled',


	        /******* Installer **********/
	        value: function installerInstalled() {
	            var sdkbox_bin_path = path.join(os.homedir(), '.sdkbox', 'bin', 'sdkbox');
	            var stats = null;
	            try {
	                stats = fs.statSync(sdkbox_bin_path);
	            } catch (e) {
	                stats = null;
	            }
	            if (!stats) {
	                return false;
	            }
	            return stats.isFile();
	        }
	    }, {
	        key: 'needUpdate',
	        value: function needUpdate() {
	            'sdkbox version--jsonapi';

	            var infofile = path.join(os.homedir(), '.sdkbox', 'creator', 'data', 'info.json');

	            try {
	                var contents = fs.readFileSync(infofile);
	                var json = JSON.parse(contents);
	                if (json.version.installer.local == json.version.installer.remote && json.version.gui.local == json.version.gui.remote) {
	                    return false;
	                } else {
	                    return true;
	                }
	            } catch (e) {
	                return true;
	            }
	        }
	    }, {
	        key: 'loadVersions',
	        value: function loadVersions() {
	            Utils.loadLocalInstallerVersion();
	            Utils.loadLocalGUIVersion();
	            Utils.loadRemoteInstallerVersion();
	            Utils.loadRemoteGUIVersion();
	        }
	    }, {
	        key: 'loadRemoteVersions',
	        value: function loadRemoteVersions() {
	            Utils.loadRemoteInstallerVersion();
	            Utils.loadRemoteGUIVersion();
	        }
	    }, {
	        key: 'loadLocalInstallerVersion',
	        value: function loadLocalInstallerVersion() {
	            var cli = CLI.getInstance();
	            var tag = 'sdkbox version';
	            if (cli.query(tag)) {
	                return;
	            }

	            var sdkbox_path = Utils.getInstallerPath();
	            var args = [sdkbox_path, '--local', '--jsonapi', 'version'];
	            var options = {
	                tag: tag
	            };
	            cli.exec(args, options, {
	                stdout: function stdout(data) {
	                    try {
	                        var json = JSON.parse(data);
	                        var v = {
	                            'version': {
	                                'installer': {
	                                    'local': json.version
	                                }
	                            }
	                        };
	                        Utils.mergeAndSaveVersions(v);
	                    } catch (e) {
	                        console.log('loadLocalInstallerVersion:' + e);
	                    }
	                },
	                stderr: function stderr(data) {},
	                exit: function exit(stdout, stderr) {},
	                error: function error(err, stdout, stderr) {}
	            });
	        }
	    }, {
	        key: 'loadRemoteInstallerVersion',
	        value: function loadRemoteInstallerVersion() {
	            var url = 'http://download.sdkbox.com/installer/v1/manifest.json';
	            Utils.getJson(url, function (json, error) {
	                if (error) {
	                    console.log(error);
	                } else if (json) {
	                    var keys = Object.keys(json.packages.SDKBOX.versions);
	                    var v = {
	                        'version': {
	                            'installer': {
	                                'remote': keys[0]
	                            }
	                        }
	                    };
	                    Utils.mergeAndSaveVersions(v);
	                }
	            });
	        }
	    }, {
	        key: 'loadLocalGUIVersion',
	        value: function loadLocalGUIVersion() {
	            var infofile = path.join(os.homedir(), '.sdkbox', 'creator', 'app', 'package.json');

	            fse.readJson(infofile).then(function (json) {
	                var v = {
	                    'version': {
	                        'gui': {
	                            'local': json.version
	                        }
	                    }
	                };
	                Utils.mergeAndSaveVersions(v);
	            }).catch(function (err) {});
	        }
	    }, {
	        key: 'loadRemoteGUIVersion',
	        value: function loadRemoteGUIVersion() {
	            // const url = 'http://staging.sdkbox.com/gui/creator/sdkbox-1.0.4.zip';
	            var url = 'http://staging.sdkbox.com/gui/creator/version';
	            Utils.getJson(url, function (json, error) {
	                if (error) {
	                    console.log(error);
	                    return;
	                } else if (json) {
	                    var v = {
	                        'version': {
	                            'gui': {
	                                'remote': json.version
	                            }
	                        }
	                    };
	                    Utils.mergeAndSaveVersions(v);
	                }
	            });
	        }
	    }, {
	        key: 'mergeAndSaveVersions',
	        value: function mergeAndSaveVersions(data) {
	            var infofile = path.join(os.homedir(), '.sdkbox', 'creator', 'data', 'info.json');
	            fse.pathExists(infofile).then(function (exist) {
	                if (exist) {
	                    fse.readJson(infofile).then(function (json) {
	                        var contents = JSON.stringify(deepmerge(json, data));
	                        Utils.saveToFile(infofile, contents);
	                    }).catch(function (err) {
	                        console.error(err);
	                    });
	                } else {
	                    var contents = JSON.stringify(data);
	                    Utils.saveToFile(infofile, contents);
	                }
	            }).catch(function (err) {
	                console.log(err);
	            });
	        }
	    }, {
	        key: 'installInstaller',
	        value: function installInstaller(cb) {
	            //const install_cmd = "python -c \"import urllib; s = urllib.urlopen('https://raw.githubusercontent.com/sdkbox-doc/en/master/install/install.py').read(); exec s\"";
	            var cli = CLI.getInstance();
	            var tag = 'install sdkbox';
	            if (cli.query(tag)) {
	                return;
	            }

	            var args = ['python', '-c', "import urllib; s = urllib.urlopen('https://raw.githubusercontent.com/sdkbox-doc/en/master/install/install.py').read(); exec s"];
	            var options = {
	                tag: tag
	            };
	            cli.exec(args, options, {
	                stdout: function stdout(data) {
	                    cb('loading');
	                },
	                stderr: function stderr(data) {},
	                exit: function exit(stdout, stderr) {
	                    cb('success');
	                },
	                error: function error(err, stdout, stderr) {
	                    cb('failed', 'install SDKBox Installer failed');
	                }
	            });
	        }
	    }, {
	        key: 'installInstallerIf',
	        value: function installInstallerIf(cb) {
	            if (installerInstalled()) {
	                return;
	            }
	            installInstaller(cb);
	        }
	    }, {
	        key: 'updateInstaller',
	        value: function updateInstaller(cb) {
	            var cli = CLI.getInstance();
	            var tag = 'sdkbox version';
	            if (cli.query(tag)) {
	                return;
	            }

	            var sdkbox_path = Utils.getInstallerPath();
	            var args = [sdkbox_path, '--alwaysupdate', '--nohelp', 'version'];
	            var options = {
	                tag: tag
	            };
	            cli.exec(args, options, {
	                stdout: function stdout(data) {
	                    cb('loading');
	                },
	                stderr: function stderr(data) {},
	                exit: function exit(stdout, stderr) {
	                    cb('success');
	                },
	                error: function error(err, stdout, stderr) {
	                    cb('failed', 'update SDKBox Installer failed');
	                }
	            });
	        }
	    }, {
	        key: 'getInstallerPath',
	        value: function getInstallerPath() {
	            var sdkbox_bin_path = path.join(os.homedir(), '.sdkbox', 'bin', 'sdkbox');
	            if ('win32' == os.platform()) {
	                sdkbox_bin_path += '.bat';
	            }

	            if (Utils.fileExist(sdkbox_bin_path)) {
	                return sdkbox_bin_path;
	            } else {
	                return null;
	            }
	        }
	    }, {
	        key: 'getSdkboxPluginsPath',
	        value: function getSdkboxPluginsPath(plugin) {
	            var folder = path.join(os.homedir(), '.sdkbox', 'plugins');
	            if (plugin) {
	                return path.join(folder, plugin);
	            } else {
	                return folder;
	            }
	        }
	    }, {
	        key: 'updateGUIMod',
	        value: function updateGUIMod(url, fileName, cb) {
	            var tmpPath = path.join(os.homedir(), '.sdkbox', 'temp', fileName);
	            Utils.downloadFile(url, tmpPath, function (filePath, error) {
	                if (error) {
	                    cb('failed', error);
	                } else {
	                    //check md5?

	                    //extra
	                    var tmpDst = path.join(os.homedir(), '.sdkbox', 'temp');
	                    var ext = unzip.Extract({
	                        path: tmpDst
	                    }).on('close', function () {
	                        var dst = path.join(os.homedir(), '.sdkbox', 'creator', 'app');
	                        fse.move(path.join(tmpDst, 'sdkbox', 'app'), dst, {
	                            overwrite: true
	                        }).then(function () {
	                            return fse.move(path.join(tmpDst, 'sdkbox', 'package.json'), path.join(os.homedir(), '.sdkbox', 'creator', 'app', 'package.json'), {
	                                overwrite: true
	                            });
	                        }).then(function () {
	                            cb('success');
	                        }).catch(function (e) {
	                            cb('failed', e.message);
	                        });
	                    }).on('error', function (e) {
	                        cb('failed', e.message);
	                    });
	                    fs.createReadStream(tmpPath).pipe(ext);
	                }
	            });
	        }
	    }, {
	        key: 'downloadFile',
	        value: function (_downloadFile) {
	            function downloadFile(_x, _x2, _x3) {
	                return _downloadFile.apply(this, arguments);
	            }

	            downloadFile.toString = function () {
	                return _downloadFile.toString();
	            };

	            return downloadFile;
	        }(function (url, fullfilepath, cb) {
	            var redirect = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

	            // redirect = redirect || 1;
	            fse.remove(fullfilepath).then(function () {
	                return fse.ensureDir(path.dirname(fullfilepath));
	            }).then(function () {
	                var file = fse.createWriteStream(fullfilepath);
	                file.on('open', function () {
	                    http.get(url, function (res) {
	                        var statusCode = res.statusCode;

	                        var contentType = res.headers['content-type'];

	                        if (302 == statusCode && redirect < 4 && res.headers.location) {
	                            downloadFile(res.headers.location, fullfilepath, cb, redirect + 1);
	                            return;
	                        }

	                        if (statusCode !== 200) {
	                            cb(null, 'status code:' + statusCode);
	                            return;
	                        }

	                        // res.setEncoding('utf8');
	                        res.pipe(file);
	                        // res.on('data', (chunk) => {
	                        //     file.pipe(chunk);
	                        // });
	                        res.on('end', function () {
	                            file.close();
	                            cb(fullfilepath, null);
	                        });
	                    }).on('error', function (e) {
	                        console.log(e);
	                        fs.unlink(fullfilepath);
	                        cb(null, e.message);
	                    });
	                });
	                file.on('error', function (e) {
	                    console.log(e);
	                });
	            }).catch(function (e) {
	                cb(null, e.message);
	            });
	        })
	    }, {
	        key: 'saveToFile',
	        value: function saveToFile(filePath, data) {
	            var dir_path = path.dirname(filePath);
	            fse.ensureDir(dir_path).then(function () {
	                // console.log('saveToFile %s, %O', filePath, data);
	                // Editor.log(`saveToFile ${data}`);
	                fs.writeFileSync(filePath, data);
	            });
	        }
	    }, {
	        key: 'fileExist',
	        value: function fileExist(file) {
	            var stats = void 0;
	            try {
	                stats = fs.statSync(file);
	            } catch (e) {
	                stats = null;
	            }
	            if (!stats) {
	                return false;
	            }
	            return stats.isFile();
	        }
	    }, {
	        key: 'getJson',
	        value: function getJson(url, cb) {
	            http.get(url, function (res) {
	                var statusCode = res.statusCode;

	                var contentType = res.headers['content-type'];

	                if (statusCode !== 200) {
	                    cb(null, 'status code:' + statusCode);
	                    return;
	                }

	                res.setEncoding('utf8');
	                var rawData = '';
	                res.on('data', function (chunk) {
	                    rawData += chunk;
	                });
	                res.on('end', function () {
	                    try {
	                        var parsedData = JSON.parse(rawData);
	                        cb(parsedData, null);
	                    } catch (e) {
	                        cb(null, e.message);
	                    }
	                });
	            }).on('error', function (e) {
	                cb(null, e.message);
	            });
	        }
	    }, {
	        key: 'compareVersions',
	        value: function compareVersions(v1, v2) {
	            if (null == v1 && null == v2) {
	                return 0;
	            }
	            if (null == v1) {
	                return -1;
	            }
	            if (null == v2) {
	                return 1;
	            }

	            var v1a = v1.replace(/^v/, '').split('.');
	            var v2a = v2.replace(/^v/, '').split('.');

	            var len = Math.min(v1a.length, v2a.length);
	            for (var i = 0; i < len; i++) {
	                var n1 = parseInt(v1a[i] || 0, 10);
	                var n2 = parseInt(v2a[i] || 0, 10);

	                if (n1 > n2) return 1;
	                if (n2 > n1) return -1;
	            }
	            if (v1a.length > len) {
	                for (var _i = len; _i < v1a.length; _i++) {
	                    var n = parseInt(v1a[_i] || 0, 10);
	                    if (0 != n) {
	                        return 1;
	                    }
	                }
	            }
	            if (v2a.length > len) {
	                for (var _i2 = len; _i2 < v2a.length; _i2++) {
	                    var _n = parseInt(v2a[_i2] || 0, 10);
	                    if (0 != _n) {
	                        return -1;
	                    }
	                }
	            }

	            return 0;
	        }
	    }, {
	        key: 'readJsonFromFile',
	        value: function readJsonFromFile(filePath) {
	            try {
	                var contents = fs.readFileSync(filePath);
	                if (contents) {
	                    return JSON.parse(contents);
	                }
	            } catch (e) {}

	            return null;
	        }
	    }, {
	        key: 'writeJsonToFile',
	        value: function writeJsonToFile(filePath, json) {
	            fs.writeFileSync(filePath, JSON.stringify(json, 0, 4));
	        }
	    }, {
	        key: 'getProjectRoot',
	        value: function getProjectRoot() {
	            if (null == projectRoot) {
	                if (Editor.Project && Editor.Project.path) {
	                    projectRoot = Editor.Project.path;
	                }
	            }
	            if (null == projectRoot) {
	                if (Editor.projectInfo && Editor.projectInfo.path) {
	                    projectRoot = Editor.projectInfo.path;
	                }
	            }

	            return projectRoot;
	        }
	    }]);

	    return Utils;
	}();

	exports.default = Utils;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = require("fs");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var assign = __webpack_require__(9);

	var fs = {};

	// Export graceful-fs:
	assign(fs, __webpack_require__(10)
	// Export extra methods:
	);assign(fs, __webpack_require__(20));
	assign(fs, __webpack_require__(29));
	assign(fs, __webpack_require__(24));
	assign(fs, __webpack_require__(33));
	assign(fs, __webpack_require__(35));
	assign(fs, __webpack_require__(40));
	assign(fs, __webpack_require__(41));
	assign(fs, __webpack_require__(42));
	assign(fs, __webpack_require__(43));
	assign(fs, __webpack_require__(49));
	assign(fs, __webpack_require__(28));

	module.exports = fs;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';

	// simple mutable assign

	function assign() {
	  var args = [].slice.call(arguments).filter(function (i) {
	    return i;
	  });
	  var dest = args.shift();
	  args.forEach(function (src) {
	    Object.keys(src).forEach(function (key) {
	      dest[key] = src[key];
	    });
	  });

	  return dest;
	}

	module.exports = assign;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// This is adapted from https://github.com/normalize/mz
	// Copyright (c) 2014-2016 Jonathan Ong me@jongleberry.com and Contributors
	var u = __webpack_require__(11).fromCallback;
	var fs = __webpack_require__(12);

	var api = ['access', 'appendFile', 'chmod', 'chown', 'close', 'fchmod', 'fchown', 'fdatasync', 'fstat', 'fsync', 'ftruncate', 'futimes', 'lchown', 'link', 'lstat', 'mkdir', 'open', 'read', 'readFile', 'readdir', 'readlink', 'realpath', 'rename', 'rmdir', 'stat', 'symlink', 'truncate', 'unlink', 'utimes', 'write', 'writeFile'];
	// fs.mkdtemp() was added in Node.js v5.10.0, so check if it exists
	typeof fs.mkdtemp === 'function' && api.push('mkdtemp'

	// Export all keys:
	);Object.keys(fs).forEach(function (key) {
	  exports[key] = fs[key];
	}

	// Universalify async methods:
	);api.forEach(function (method) {
	  exports[method] = u(fs[method]);
	}

	// We differ from mz/fs in that we still ship the old, broken, fs.exists()
	// since we are a drop-in replacement for the native module
	);exports.exists = function (filename, callback) {
	  if (typeof callback === 'function') {
	    return fs.exists(filename, callback);
	  }
	  return new Promise(function (resolve) {
	    return fs.exists(filename, resolve);
	  });
	};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict';

	exports.fromCallback = function (fn) {
	  return Object.defineProperty(function () {
	    var _arguments = arguments,
	        _this = this;

	    if (typeof arguments[arguments.length - 1] === 'function') fn.apply(this, arguments);else {
	      return new Promise(function (resolve, reject) {
	        _arguments[_arguments.length] = function (err, res) {
	          if (err) return reject(err);
	          resolve(res);
	        };
	        _arguments.length++;
	        fn.apply(_this, _arguments);
	      });
	    }
	  }, 'name', { value: fn.name });
	};

	exports.fromPromise = function (fn) {
	  return Object.defineProperty(function () {
	    var cb = arguments[arguments.length - 1];
	    if (typeof cb !== 'function') return fn.apply(this, arguments);else fn.apply(this, arguments).then(function (r) {
	      return cb(null, r);
	    }).catch(cb);
	  }, 'name', { value: fn.name });
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(7)
	var polyfills = __webpack_require__(13)
	var legacy = __webpack_require__(16)
	var queue = []

	var util = __webpack_require__(18)

	function noop () {}

	var debug = noop
	if (util.debuglog)
	  debug = util.debuglog('gfs4')
	else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
	  debug = function() {
	    var m = util.format.apply(util, arguments)
	    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ')
	    console.error(m)
	  }

	if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
	  process.on('exit', function() {
	    debug(queue)
	    __webpack_require__(19).equal(queue.length, 0)
	  })
	}

	module.exports = patch(__webpack_require__(14))
	if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH) {
	  module.exports = patch(fs)
	}

	// Always patch fs.close/closeSync, because we want to
	// retry() whenever a close happens *anywhere* in the program.
	// This is essential when multiple graceful-fs instances are
	// in play at the same time.
	module.exports.close =
	fs.close = (function (fs$close) { return function (fd, cb) {
	  return fs$close.call(fs, fd, function (err) {
	    if (!err)
	      retry()

	    if (typeof cb === 'function')
	      cb.apply(this, arguments)
	  })
	}})(fs.close)

	module.exports.closeSync =
	fs.closeSync = (function (fs$closeSync) { return function (fd) {
	  // Note that graceful-fs also retries when fs.closeSync() fails.
	  // Looks like a bug to me, although it's probably a harmless one.
	  var rval = fs$closeSync.apply(fs, arguments)
	  retry()
	  return rval
	}})(fs.closeSync)

	function patch (fs) {
	  // Everything that references the open() function needs to be in here
	  polyfills(fs)
	  fs.gracefulify = patch
	  fs.FileReadStream = ReadStream;  // Legacy name.
	  fs.FileWriteStream = WriteStream;  // Legacy name.
	  fs.createReadStream = createReadStream
	  fs.createWriteStream = createWriteStream
	  var fs$readFile = fs.readFile
	  fs.readFile = readFile
	  function readFile (path, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null

	    return go$readFile(path, options, cb)

	    function go$readFile (path, options, cb) {
	      return fs$readFile(path, options, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$readFile, [path, options, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  var fs$writeFile = fs.writeFile
	  fs.writeFile = writeFile
	  function writeFile (path, data, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null

	    return go$writeFile(path, data, options, cb)

	    function go$writeFile (path, data, options, cb) {
	      return fs$writeFile(path, data, options, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$writeFile, [path, data, options, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  var fs$appendFile = fs.appendFile
	  if (fs$appendFile)
	    fs.appendFile = appendFile
	  function appendFile (path, data, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null

	    return go$appendFile(path, data, options, cb)

	    function go$appendFile (path, data, options, cb) {
	      return fs$appendFile(path, data, options, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$appendFile, [path, data, options, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  var fs$readdir = fs.readdir
	  fs.readdir = readdir
	  function readdir (path, options, cb) {
	    var args = [path]
	    if (typeof options !== 'function') {
	      args.push(options)
	    } else {
	      cb = options
	    }
	    args.push(go$readdir$cb)

	    return go$readdir(args)

	    function go$readdir$cb (err, files) {
	      if (files && files.sort)
	        files.sort()

	      if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	        enqueue([go$readdir, [args]])
	      else {
	        if (typeof cb === 'function')
	          cb.apply(this, arguments)
	        retry()
	      }
	    }
	  }

	  function go$readdir (args) {
	    return fs$readdir.apply(fs, args)
	  }

	  if (process.version.substr(0, 4) === 'v0.8') {
	    var legStreams = legacy(fs)
	    ReadStream = legStreams.ReadStream
	    WriteStream = legStreams.WriteStream
	  }

	  var fs$ReadStream = fs.ReadStream
	  ReadStream.prototype = Object.create(fs$ReadStream.prototype)
	  ReadStream.prototype.open = ReadStream$open

	  var fs$WriteStream = fs.WriteStream
	  WriteStream.prototype = Object.create(fs$WriteStream.prototype)
	  WriteStream.prototype.open = WriteStream$open

	  fs.ReadStream = ReadStream
	  fs.WriteStream = WriteStream

	  function ReadStream (path, options) {
	    if (this instanceof ReadStream)
	      return fs$ReadStream.apply(this, arguments), this
	    else
	      return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
	  }

	  function ReadStream$open () {
	    var that = this
	    open(that.path, that.flags, that.mode, function (err, fd) {
	      if (err) {
	        if (that.autoClose)
	          that.destroy()

	        that.emit('error', err)
	      } else {
	        that.fd = fd
	        that.emit('open', fd)
	        that.read()
	      }
	    })
	  }

	  function WriteStream (path, options) {
	    if (this instanceof WriteStream)
	      return fs$WriteStream.apply(this, arguments), this
	    else
	      return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
	  }

	  function WriteStream$open () {
	    var that = this
	    open(that.path, that.flags, that.mode, function (err, fd) {
	      if (err) {
	        that.destroy()
	        that.emit('error', err)
	      } else {
	        that.fd = fd
	        that.emit('open', fd)
	      }
	    })
	  }

	  function createReadStream (path, options) {
	    return new ReadStream(path, options)
	  }

	  function createWriteStream (path, options) {
	    return new WriteStream(path, options)
	  }

	  var fs$open = fs.open
	  fs.open = open
	  function open (path, flags, mode, cb) {
	    if (typeof mode === 'function')
	      cb = mode, mode = null

	    return go$open(path, flags, mode, cb)

	    function go$open (path, flags, mode, cb) {
	      return fs$open(path, flags, mode, function (err, fd) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$open, [path, flags, mode, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  return fs
	}

	function enqueue (elem) {
	  debug('ENQUEUE', elem[0].name, elem[1])
	  queue.push(elem)
	}

	function retry () {
	  var elem = queue.shift()
	  if (elem) {
	    debug('RETRY', elem[0].name, elem[1])
	    elem[0].apply(null, elem[1])
	  }
	}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(14)
	var constants = __webpack_require__(15)

	var origCwd = process.cwd
	var cwd = null

	var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform

	process.cwd = function() {
	  if (!cwd)
	    cwd = origCwd.call(process)
	  return cwd
	}
	try {
	  process.cwd()
	} catch (er) {}

	var chdir = process.chdir
	process.chdir = function(d) {
	  cwd = null
	  chdir.call(process, d)
	}

	module.exports = patch

	function patch (fs) {
	  // (re-)implement some things that are known busted or missing.

	  // lchmod, broken prior to 0.6.2
	  // back-port the fix here.
	  if (constants.hasOwnProperty('O_SYMLINK') &&
	      process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
	    patchLchmod(fs)
	  }

	  // lutimes implementation, or no-op
	  if (!fs.lutimes) {
	    patchLutimes(fs)
	  }

	  // https://github.com/isaacs/node-graceful-fs/issues/4
	  // Chown should not fail on einval or eperm if non-root.
	  // It should not fail on enosys ever, as this just indicates
	  // that a fs doesn't support the intended operation.

	  fs.chown = chownFix(fs.chown)
	  fs.fchown = chownFix(fs.fchown)
	  fs.lchown = chownFix(fs.lchown)

	  fs.chmod = chmodFix(fs.chmod)
	  fs.fchmod = chmodFix(fs.fchmod)
	  fs.lchmod = chmodFix(fs.lchmod)

	  fs.chownSync = chownFixSync(fs.chownSync)
	  fs.fchownSync = chownFixSync(fs.fchownSync)
	  fs.lchownSync = chownFixSync(fs.lchownSync)

	  fs.chmodSync = chmodFixSync(fs.chmodSync)
	  fs.fchmodSync = chmodFixSync(fs.fchmodSync)
	  fs.lchmodSync = chmodFixSync(fs.lchmodSync)

	  fs.stat = statFix(fs.stat)
	  fs.fstat = statFix(fs.fstat)
	  fs.lstat = statFix(fs.lstat)

	  fs.statSync = statFixSync(fs.statSync)
	  fs.fstatSync = statFixSync(fs.fstatSync)
	  fs.lstatSync = statFixSync(fs.lstatSync)

	  // if lchmod/lchown do not exist, then make them no-ops
	  if (!fs.lchmod) {
	    fs.lchmod = function (path, mode, cb) {
	      if (cb) process.nextTick(cb)
	    }
	    fs.lchmodSync = function () {}
	  }
	  if (!fs.lchown) {
	    fs.lchown = function (path, uid, gid, cb) {
	      if (cb) process.nextTick(cb)
	    }
	    fs.lchownSync = function () {}
	  }

	  // on Windows, A/V software can lock the directory, causing this
	  // to fail with an EACCES or EPERM if the directory contains newly
	  // created files.  Try again on failure, for up to 60 seconds.

	  // Set the timeout this long because some Windows Anti-Virus, such as Parity
	  // bit9, may lock files for up to a minute, causing npm package install
	  // failures. Also, take care to yield the scheduler. Windows scheduling gives
	  // CPU to a busy looping process, which can cause the program causing the lock
	  // contention to be starved of CPU by node, so the contention doesn't resolve.
	  if (platform === "win32") {
	    fs.rename = (function (fs$rename) { return function (from, to, cb) {
	      var start = Date.now()
	      var backoff = 0;
	      fs$rename(from, to, function CB (er) {
	        if (er
	            && (er.code === "EACCES" || er.code === "EPERM")
	            && Date.now() - start < 60000) {
	          setTimeout(function() {
	            fs.stat(to, function (stater, st) {
	              if (stater && stater.code === "ENOENT")
	                fs$rename(from, to, CB);
	              else
	                cb(er)
	            })
	          }, backoff)
	          if (backoff < 100)
	            backoff += 10;
	          return;
	        }
	        if (cb) cb(er)
	      })
	    }})(fs.rename)
	  }

	  // if read() returns EAGAIN, then just try it again.
	  fs.read = (function (fs$read) { return function (fd, buffer, offset, length, position, callback_) {
	    var callback
	    if (callback_ && typeof callback_ === 'function') {
	      var eagCounter = 0
	      callback = function (er, _, __) {
	        if (er && er.code === 'EAGAIN' && eagCounter < 10) {
	          eagCounter ++
	          return fs$read.call(fs, fd, buffer, offset, length, position, callback)
	        }
	        callback_.apply(this, arguments)
	      }
	    }
	    return fs$read.call(fs, fd, buffer, offset, length, position, callback)
	  }})(fs.read)

	  fs.readSync = (function (fs$readSync) { return function (fd, buffer, offset, length, position) {
	    var eagCounter = 0
	    while (true) {
	      try {
	        return fs$readSync.call(fs, fd, buffer, offset, length, position)
	      } catch (er) {
	        if (er.code === 'EAGAIN' && eagCounter < 10) {
	          eagCounter ++
	          continue
	        }
	        throw er
	      }
	    }
	  }})(fs.readSync)
	}

	function patchLchmod (fs) {
	  fs.lchmod = function (path, mode, callback) {
	    fs.open( path
	           , constants.O_WRONLY | constants.O_SYMLINK
	           , mode
	           , function (err, fd) {
	      if (err) {
	        if (callback) callback(err)
	        return
	      }
	      // prefer to return the chmod error, if one occurs,
	      // but still try to close, and report closing errors if they occur.
	      fs.fchmod(fd, mode, function (err) {
	        fs.close(fd, function(err2) {
	          if (callback) callback(err || err2)
	        })
	      })
	    })
	  }

	  fs.lchmodSync = function (path, mode) {
	    var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)

	    // prefer to return the chmod error, if one occurs,
	    // but still try to close, and report closing errors if they occur.
	    var threw = true
	    var ret
	    try {
	      ret = fs.fchmodSync(fd, mode)
	      threw = false
	    } finally {
	      if (threw) {
	        try {
	          fs.closeSync(fd)
	        } catch (er) {}
	      } else {
	        fs.closeSync(fd)
	      }
	    }
	    return ret
	  }
	}

	function patchLutimes (fs) {
	  if (constants.hasOwnProperty("O_SYMLINK")) {
	    fs.lutimes = function (path, at, mt, cb) {
	      fs.open(path, constants.O_SYMLINK, function (er, fd) {
	        if (er) {
	          if (cb) cb(er)
	          return
	        }
	        fs.futimes(fd, at, mt, function (er) {
	          fs.close(fd, function (er2) {
	            if (cb) cb(er || er2)
	          })
	        })
	      })
	    }

	    fs.lutimesSync = function (path, at, mt) {
	      var fd = fs.openSync(path, constants.O_SYMLINK)
	      var ret
	      var threw = true
	      try {
	        ret = fs.futimesSync(fd, at, mt)
	        threw = false
	      } finally {
	        if (threw) {
	          try {
	            fs.closeSync(fd)
	          } catch (er) {}
	        } else {
	          fs.closeSync(fd)
	        }
	      }
	      return ret
	    }

	  } else {
	    fs.lutimes = function (_a, _b, _c, cb) { if (cb) process.nextTick(cb) }
	    fs.lutimesSync = function () {}
	  }
	}

	function chmodFix (orig) {
	  if (!orig) return orig
	  return function (target, mode, cb) {
	    return orig.call(fs, target, mode, function (er) {
	      if (chownErOk(er)) er = null
	      if (cb) cb.apply(this, arguments)
	    })
	  }
	}

	function chmodFixSync (orig) {
	  if (!orig) return orig
	  return function (target, mode) {
	    try {
	      return orig.call(fs, target, mode)
	    } catch (er) {
	      if (!chownErOk(er)) throw er
	    }
	  }
	}


	function chownFix (orig) {
	  if (!orig) return orig
	  return function (target, uid, gid, cb) {
	    return orig.call(fs, target, uid, gid, function (er) {
	      if (chownErOk(er)) er = null
	      if (cb) cb.apply(this, arguments)
	    })
	  }
	}

	function chownFixSync (orig) {
	  if (!orig) return orig
	  return function (target, uid, gid) {
	    try {
	      return orig.call(fs, target, uid, gid)
	    } catch (er) {
	      if (!chownErOk(er)) throw er
	    }
	  }
	}


	function statFix (orig) {
	  if (!orig) return orig
	  // Older versions of Node erroneously returned signed integers for
	  // uid + gid.
	  return function (target, cb) {
	    return orig.call(fs, target, function (er, stats) {
	      if (!stats) return cb.apply(this, arguments)
	      if (stats.uid < 0) stats.uid += 0x100000000
	      if (stats.gid < 0) stats.gid += 0x100000000
	      if (cb) cb.apply(this, arguments)
	    })
	  }
	}

	function statFixSync (orig) {
	  if (!orig) return orig
	  // Older versions of Node erroneously returned signed integers for
	  // uid + gid.
	  return function (target) {
	    var stats = orig.call(fs, target)
	    if (stats.uid < 0) stats.uid += 0x100000000
	    if (stats.gid < 0) stats.gid += 0x100000000
	    return stats;
	  }
	}

	// ENOSYS means that the fs doesn't support the op. Just ignore
	// that, because it doesn't matter.
	//
	// if there's no getuid, or if getuid() is something other
	// than 0, and the error is EINVAL or EPERM, then just ignore
	// it.
	//
	// This specific case is a silent failure in cp, install, tar,
	// and most other unix tools that manage permissions.
	//
	// When running as root, or if other types of errors are
	// encountered, then it's strict.
	function chownErOk (er) {
	  if (!er)
	    return true

	  if (er.code === "ENOSYS")
	    return true

	  var nonroot = !process.getuid || process.getuid() !== 0
	  if (nonroot) {
	    if (er.code === "EINVAL" || er.code === "EPERM")
	      return true
	  }

	  return false
	}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict'

	var fs = __webpack_require__(7)

	module.exports = clone(fs)

	function clone (obj) {
	  if (obj === null || typeof obj !== 'object')
	    return obj

	  if (obj instanceof Object)
	    var copy = { __proto__: obj.__proto__ }
	  else
	    var copy = Object.create(null)

	  Object.getOwnPropertyNames(obj).forEach(function (key) {
	    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))
	  })

	  return copy
	}


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = require("constants");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(17).Stream

	module.exports = legacy

	function legacy (fs) {
	  return {
	    ReadStream: ReadStream,
	    WriteStream: WriteStream
	  }

	  function ReadStream (path, options) {
	    if (!(this instanceof ReadStream)) return new ReadStream(path, options);

	    Stream.call(this);

	    var self = this;

	    this.path = path;
	    this.fd = null;
	    this.readable = true;
	    this.paused = false;

	    this.flags = 'r';
	    this.mode = 438; /*=0666*/
	    this.bufferSize = 64 * 1024;

	    options = options || {};

	    // Mixin options into this
	    var keys = Object.keys(options);
	    for (var index = 0, length = keys.length; index < length; index++) {
	      var key = keys[index];
	      this[key] = options[key];
	    }

	    if (this.encoding) this.setEncoding(this.encoding);

	    if (this.start !== undefined) {
	      if ('number' !== typeof this.start) {
	        throw TypeError('start must be a Number');
	      }
	      if (this.end === undefined) {
	        this.end = Infinity;
	      } else if ('number' !== typeof this.end) {
	        throw TypeError('end must be a Number');
	      }

	      if (this.start > this.end) {
	        throw new Error('start must be <= end');
	      }

	      this.pos = this.start;
	    }

	    if (this.fd !== null) {
	      process.nextTick(function() {
	        self._read();
	      });
	      return;
	    }

	    fs.open(this.path, this.flags, this.mode, function (err, fd) {
	      if (err) {
	        self.emit('error', err);
	        self.readable = false;
	        return;
	      }

	      self.fd = fd;
	      self.emit('open', fd);
	      self._read();
	    })
	  }

	  function WriteStream (path, options) {
	    if (!(this instanceof WriteStream)) return new WriteStream(path, options);

	    Stream.call(this);

	    this.path = path;
	    this.fd = null;
	    this.writable = true;

	    this.flags = 'w';
	    this.encoding = 'binary';
	    this.mode = 438; /*=0666*/
	    this.bytesWritten = 0;

	    options = options || {};

	    // Mixin options into this
	    var keys = Object.keys(options);
	    for (var index = 0, length = keys.length; index < length; index++) {
	      var key = keys[index];
	      this[key] = options[key];
	    }

	    if (this.start !== undefined) {
	      if ('number' !== typeof this.start) {
	        throw TypeError('start must be a Number');
	      }
	      if (this.start < 0) {
	        throw new Error('start must be >= zero');
	      }

	      this.pos = this.start;
	    }

	    this.busy = false;
	    this._queue = [];

	    if (this.fd === null) {
	      this._open = fs.open;
	      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
	      this.flush();
	    }
	  }
	}


/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = require("stream");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = require("util");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	module.exports = require("assert");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var u = __webpack_require__(11).fromCallback;
	module.exports = {
	  copy: u(__webpack_require__(21))
	};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var fs = __webpack_require__(12);
	var path = __webpack_require__(3);
	var ncp = __webpack_require__(22);
	var mkdir = __webpack_require__(24);
	var pathExists = __webpack_require__(28).pathExists;

	function copy(src, dest, options, callback) {
	  if (typeof options === 'function' && !callback) {
	    callback = options;
	    options = {};
	  } else if (typeof options === 'function' || options instanceof RegExp) {
	    options = { filter: options };
	  }
	  callback = callback || function () {};
	  options = options || {};

	  // Warn about using preserveTimestamps on 32-bit node:
	  if (options.preserveTimestamps && process.arch === 'ia32') {
	    console.warn('fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n\n    see https://github.com/jprichardson/node-fs-extra/issues/269');
	  }

	  // don't allow src and dest to be the same
	  var basePath = process.cwd();
	  var currentPath = path.resolve(basePath, src);
	  var targetPath = path.resolve(basePath, dest);
	  if (currentPath === targetPath) return callback(new Error('Source and destination must not be the same.'));

	  fs.lstat(src, function (err, stats) {
	    if (err) return callback(err);

	    var dir = null;
	    if (stats.isDirectory()) {
	      var parts = dest.split(path.sep);
	      parts.pop();
	      dir = parts.join(path.sep);
	    } else {
	      dir = path.dirname(dest);
	    }

	    pathExists(dir, function (err, dirExists) {
	      if (err) return callback(err);
	      if (dirExists) return ncp(src, dest, options, callback);
	      mkdir.mkdirs(dir, function (err) {
	        if (err) return callback(err);
	        ncp(src, dest, options, callback);
	      });
	    });
	  });
	}

	module.exports = copy;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// imported from ncp (this is temporary, will rewrite)

	var fs = __webpack_require__(12);
	var path = __webpack_require__(3);
	var utimes = __webpack_require__(23);

	function ncp(source, dest, options, callback) {
	  if (!callback) {
	    callback = options;
	    options = {};
	  }

	  var basePath = process.cwd();
	  var currentPath = path.resolve(basePath, source);
	  var targetPath = path.resolve(basePath, dest);

	  var filter = options.filter;
	  var transform = options.transform;
	  var overwrite = options.overwrite;
	  // If overwrite is undefined, use clobber, otherwise default to true:
	  if (overwrite === undefined) overwrite = options.clobber;
	  if (overwrite === undefined) overwrite = true;
	  var errorOnExist = options.errorOnExist;
	  var dereference = options.dereference;
	  var preserveTimestamps = options.preserveTimestamps === true;

	  var started = 0;
	  var finished = 0;
	  var running = 0;

	  var errored = false;

	  startCopy(currentPath);

	  function startCopy(source) {
	    started++;
	    if (filter) {
	      if (filter instanceof RegExp) {
	        console.warn('Warning: fs-extra: Passing a RegExp filter is deprecated, use a function');
	        if (!filter.test(source)) {
	          return doneOne(true);
	        }
	      } else if (typeof filter === 'function') {
	        if (!filter(source, dest)) {
	          return doneOne(true);
	        }
	      }
	    }
	    return getStats(source);
	  }

	  function getStats(source) {
	    var stat = dereference ? fs.stat : fs.lstat;
	    running++;
	    stat(source, function (err, stats) {
	      if (err) return onError(err

	      // We need to get the mode from the stats object and preserve it.
	      );var item = {
	        name: source,
	        mode: stats.mode,
	        mtime: stats.mtime, // modified time
	        atime: stats.atime, // access time
	        stats: stats // temporary
	      };

	      if (stats.isDirectory()) {
	        return onDir(item);
	      } else if (stats.isFile() || stats.isCharacterDevice() || stats.isBlockDevice()) {
	        return onFile(item);
	      } else if (stats.isSymbolicLink()) {
	        // Symlinks don't really need to know about the mode.
	        return onLink(source);
	      }
	    });
	  }

	  function onFile(file) {
	    var target = file.name.replace(currentPath, targetPath.replace('$', '$$$$') // escapes '$' with '$$'
	    );isWritable(target, function (writable) {
	      if (writable) {
	        copyFile(file, target);
	      } else {
	        if (overwrite) {
	          rmFile(target, function () {
	            copyFile(file, target);
	          });
	        } else if (errorOnExist) {
	          onError(new Error(target + ' already exists'));
	        } else {
	          doneOne();
	        }
	      }
	    });
	  }

	  function copyFile(file, target) {
	    var readStream = fs.createReadStream(file.name);
	    var writeStream = fs.createWriteStream(target, { mode: file.mode });

	    readStream.on('error', onError);
	    writeStream.on('error', onError);

	    if (transform) {
	      transform(readStream, writeStream, file);
	    } else {
	      writeStream.on('open', function () {
	        readStream.pipe(writeStream);
	      });
	    }

	    writeStream.once('close', function () {
	      fs.chmod(target, file.mode, function (err) {
	        if (err) return onError(err);
	        if (preserveTimestamps) {
	          utimes.utimesMillis(target, file.atime, file.mtime, function (err) {
	            if (err) return onError(err);
	            return doneOne();
	          });
	        } else {
	          doneOne();
	        }
	      });
	    });
	  }

	  function rmFile(file, done) {
	    fs.unlink(file, function (err) {
	      if (err) return onError(err);
	      return done();
	    });
	  }

	  function onDir(dir) {
	    var target = dir.name.replace(currentPath, targetPath.replace('$', '$$$$') // escapes '$' with '$$'
	    );isWritable(target, function (writable) {
	      if (writable) {
	        return mkDir(dir, target);
	      }
	      copyDir(dir.name);
	    });
	  }

	  function mkDir(dir, target) {
	    fs.mkdir(target, dir.mode, function (err) {
	      if (err) return onError(err
	      // despite setting mode in fs.mkdir, doesn't seem to work
	      // so we set it here.
	      );fs.chmod(target, dir.mode, function (err) {
	        if (err) return onError(err);
	        copyDir(dir.name);
	      });
	    });
	  }

	  function copyDir(dir) {
	    fs.readdir(dir, function (err, items) {
	      if (err) return onError(err);
	      items.forEach(function (item) {
	        startCopy(path.join(dir, item));
	      });
	      return doneOne();
	    });
	  }

	  function onLink(link) {
	    var target = link.replace(currentPath, targetPath);
	    fs.readlink(link, function (err, resolvedPath) {
	      if (err) return onError(err);
	      checkLink(resolvedPath, target);
	    });
	  }

	  function checkLink(resolvedPath, target) {
	    if (dereference) {
	      resolvedPath = path.resolve(basePath, resolvedPath);
	    }
	    isWritable(target, function (writable) {
	      if (writable) {
	        return makeLink(resolvedPath, target);
	      }
	      fs.readlink(target, function (err, targetDest) {
	        if (err) return onError(err);

	        if (dereference) {
	          targetDest = path.resolve(basePath, targetDest);
	        }
	        if (targetDest === resolvedPath) {
	          return doneOne();
	        }
	        return rmFile(target, function () {
	          makeLink(resolvedPath, target);
	        });
	      });
	    });
	  }

	  function makeLink(linkPath, target) {
	    fs.symlink(linkPath, target, function (err) {
	      if (err) return onError(err);
	      return doneOne();
	    });
	  }

	  function isWritable(path, done) {
	    fs.lstat(path, function (err) {
	      if (err) {
	        if (err.code === 'ENOENT') return done(true);
	        return done(false);
	      }
	      return done(false);
	    });
	  }

	  function onError(err) {
	    // ensure callback is defined & called only once:
	    if (!errored && callback !== undefined) {
	      errored = true;
	      return callback(err);
	    }
	  }

	  function doneOne(skipped) {
	    if (!skipped) running--;
	    finished++;
	    if (started === finished && running === 0) {
	      if (callback !== undefined) {
	        return callback(null);
	      }
	    }
	  }
	}

	module.exports = ncp;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var fs = __webpack_require__(12);
	var os = __webpack_require__(2);
	var path = __webpack_require__(3

	// HFS, ext{2,3}, FAT do not, Node.js v0.10 does not
	);function hasMillisResSync() {
	  var tmpfile = path.join('millis-test-sync' + Date.now().toString() + Math.random().toString().slice(2));
	  tmpfile = path.join(os.tmpdir(), tmpfile

	  // 550 millis past UNIX epoch
	  );var d = new Date(1435410243862);
	  fs.writeFileSync(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141');
	  var fd = fs.openSync(tmpfile, 'r+');
	  fs.futimesSync(fd, d, d);
	  fs.closeSync(fd);
	  return fs.statSync(tmpfile).mtime > 1435410243000;
	}

	function hasMillisRes(callback) {
	  var tmpfile = path.join('millis-test' + Date.now().toString() + Math.random().toString().slice(2));
	  tmpfile = path.join(os.tmpdir(), tmpfile

	  // 550 millis past UNIX epoch
	  );var d = new Date(1435410243862);
	  fs.writeFile(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141', function (err) {
	    if (err) return callback(err);
	    fs.open(tmpfile, 'r+', function (err, fd) {
	      if (err) return callback(err);
	      fs.futimes(fd, d, d, function (err) {
	        if (err) return callback(err);
	        fs.close(fd, function (err) {
	          if (err) return callback(err);
	          fs.stat(tmpfile, function (err, stats) {
	            if (err) return callback(err);
	            callback(null, stats.mtime > 1435410243000);
	          });
	        });
	      });
	    });
	  });
	}

	function timeRemoveMillis(timestamp) {
	  if (typeof timestamp === 'number') {
	    return Math.floor(timestamp / 1000) * 1000;
	  } else if (timestamp instanceof Date) {
	    return new Date(Math.floor(timestamp.getTime() / 1000) * 1000);
	  } else {
	    throw new Error('fs-extra: timeRemoveMillis() unknown parameter type');
	  }
	}

	function utimesMillis(path, atime, mtime, callback) {
	  // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
	  fs.open(path, 'r+', function (err, fd) {
	    if (err) return callback(err);
	    fs.futimes(fd, atime, mtime, function (futimesErr) {
	      fs.close(fd, function (closeErr) {
	        if (callback) callback(futimesErr || closeErr);
	      });
	    });
	  });
	}

	module.exports = {
	  hasMillisRes: hasMillisRes,
	  hasMillisResSync: hasMillisResSync,
	  timeRemoveMillis: timeRemoveMillis,
	  utimesMillis: utimesMillis
	};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var u = __webpack_require__(11).fromCallback;
	var mkdirs = u(__webpack_require__(25));
	var mkdirsSync = __webpack_require__(27);

	module.exports = {
	  mkdirs: mkdirs,
	  mkdirsSync: mkdirsSync,
	  // alias
	  mkdirp: mkdirs,
	  mkdirpSync: mkdirsSync,
	  ensureDir: mkdirs,
	  ensureDirSync: mkdirsSync
	};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var fs = __webpack_require__(12);
	var path = __webpack_require__(3);
	var invalidWin32Path = __webpack_require__(26).invalidWin32Path;

	var o777 = parseInt('0777', 8);

	function mkdirs(p, opts, callback, made) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  } else if (!opts || (typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) !== 'object') {
	    opts = { mode: opts };
	  }

	  if (process.platform === 'win32' && invalidWin32Path(p)) {
	    var errInval = new Error(p + ' contains invalid WIN32 path characters.');
	    errInval.code = 'EINVAL';
	    return callback(errInval);
	  }

	  var mode = opts.mode;
	  var xfs = opts.fs || fs;

	  if (mode === undefined) {
	    mode = o777 & ~process.umask();
	  }
	  if (!made) made = null;

	  callback = callback || function () {};
	  p = path.resolve(p);

	  xfs.mkdir(p, mode, function (er) {
	    if (!er) {
	      made = made || p;
	      return callback(null, made);
	    }
	    switch (er.code) {
	      case 'ENOENT':
	        if (path.dirname(p) === p) return callback(er);
	        mkdirs(path.dirname(p), opts, function (er, made) {
	          if (er) callback(er, made);else mkdirs(p, opts, callback, made);
	        });
	        break;

	      // In the case of any other error, just see if there's a dir
	      // there already.  If so, then hooray!  If not, then something
	      // is borked.
	      default:
	        xfs.stat(p, function (er2, stat) {
	          // if the stat fails, then that's super weird.
	          // let the original error be the failure reason.
	          if (er2 || !stat.isDirectory()) callback(er, made);else callback(null, made);
	        });
	        break;
	    }
	  });
	}

	module.exports = mkdirs;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var path = __webpack_require__(3

	// get drive on windows
	);function getRootPath(p) {
	  p = path.normalize(path.resolve(p)).split(path.sep);
	  if (p.length > 0) return p[0];
	  return null;
	}

	// http://stackoverflow.com/a/62888/10333 contains more accurate
	// TODO: expand to include the rest
	var INVALID_PATH_CHARS = /[<>:"|?*]/;

	function invalidWin32Path(p) {
	  var rp = getRootPath(p);
	  p = p.replace(rp, '');
	  return INVALID_PATH_CHARS.test(p);
	}

	module.exports = {
	  getRootPath: getRootPath,
	  invalidWin32Path: invalidWin32Path
	};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var fs = __webpack_require__(12);
	var path = __webpack_require__(3);
	var invalidWin32Path = __webpack_require__(26).invalidWin32Path;

	var o777 = parseInt('0777', 8);

	function mkdirsSync(p, opts, made) {
	  if (!opts || (typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) !== 'object') {
	    opts = { mode: opts };
	  }

	  var mode = opts.mode;
	  var xfs = opts.fs || fs;

	  if (process.platform === 'win32' && invalidWin32Path(p)) {
	    var errInval = new Error(p + ' contains invalid WIN32 path characters.');
	    errInval.code = 'EINVAL';
	    throw errInval;
	  }

	  if (mode === undefined) {
	    mode = o777 & ~process.umask();
	  }
	  if (!made) made = null;

	  p = path.resolve(p);

	  try {
	    xfs.mkdirSync(p, mode);
	    made = made || p;
	  } catch (err0) {
	    switch (err0.code) {
	      case 'ENOENT':
	        if (path.dirname(p) === p) throw err0;
	        made = mkdirsSync(path.dirname(p), opts, made);
	        mkdirsSync(p, opts, made);
	        break;

	      // In the case of any other error, just see if there's a dir
	      // there already.  If so, then hooray!  If not, then something
	      // is borked.
	      default:
	        var stat = void 0;
	        try {
	          stat = xfs.statSync(p);
	        } catch (err1) {
	          throw err0;
	        }
	        if (!stat.isDirectory()) throw err0;
	        break;
	    }
	  }

	  return made;
	}

	module.exports = mkdirsSync;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var u = __webpack_require__(11).fromPromise;
	var fs = __webpack_require__(10);

	function pathExists(path) {
	  return fs.access(path).then(function () {
	    return true;
	  }).catch(function () {
	    return false;
	  });
	}

	module.exports = {
	  pathExists: u(pathExists),
	  pathExistsSync: fs.existsSync
	};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  copySync: __webpack_require__(30)
	};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var fs = __webpack_require__(12);
	var path = __webpack_require__(3);
	var copyFileSync = __webpack_require__(31);
	var mkdir = __webpack_require__(24);

	function copySync(src, dest, options) {
	  if (typeof options === 'function' || options instanceof RegExp) {
	    options = { filter: options };
	  }

	  options = options || {};
	  options.recursive = !!options.recursive;

	  // default to true for now
	  options.clobber = 'clobber' in options ? !!options.clobber : true;
	  // overwrite falls back to clobber
	  options.overwrite = 'overwrite' in options ? !!options.overwrite : options.clobber;
	  options.dereference = 'dereference' in options ? !!options.dereference : false;
	  options.preserveTimestamps = 'preserveTimestamps' in options ? !!options.preserveTimestamps : false;

	  options.filter = options.filter || function () {
	    return true;
	  };

	  // Warn about using preserveTimestamps on 32-bit node:
	  if (options.preserveTimestamps && process.arch === 'ia32') {
	    console.warn('fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n\n    see https://github.com/jprichardson/node-fs-extra/issues/269');
	  }

	  var stats = options.recursive && !options.dereference ? fs.lstatSync(src) : fs.statSync(src);
	  var destFolder = path.dirname(dest);
	  var destFolderExists = fs.existsSync(destFolder);
	  var performCopy = false;

	  if (options.filter instanceof RegExp) {
	    console.warn('Warning: fs-extra: Passing a RegExp filter is deprecated, use a function');
	    performCopy = options.filter.test(src);
	  } else if (typeof options.filter === 'function') performCopy = options.filter(src, dest);

	  if (stats.isFile() && performCopy) {
	    if (!destFolderExists) mkdir.mkdirsSync(destFolder);
	    copyFileSync(src, dest, {
	      overwrite: options.overwrite,
	      errorOnExist: options.errorOnExist,
	      preserveTimestamps: options.preserveTimestamps
	    });
	  } else if (stats.isDirectory() && performCopy) {
	    if (!fs.existsSync(dest)) mkdir.mkdirsSync(dest);
	    var contents = fs.readdirSync(src);
	    contents.forEach(function (content) {
	      var opts = options;
	      opts.recursive = true;
	      copySync(path.join(src, content), path.join(dest, content), opts);
	    });
	  } else if (options.recursive && stats.isSymbolicLink() && performCopy) {
	    var srcPath = fs.readlinkSync(src);
	    fs.symlinkSync(srcPath, dest);
	  }
	}

	module.exports = copySync;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var fs = __webpack_require__(12);

	var BUF_LENGTH = 64 * 1024;
	var _buff = __webpack_require__(32)(BUF_LENGTH);

	function copyFileSync(srcFile, destFile, options) {
	  var overwrite = options.overwrite;
	  var errorOnExist = options.errorOnExist;
	  var preserveTimestamps = options.preserveTimestamps;

	  if (fs.existsSync(destFile)) {
	    if (overwrite) {
	      fs.unlinkSync(destFile);
	    } else if (errorOnExist) {
	      throw new Error(destFile + ' already exists');
	    } else return;
	  }

	  var fdr = fs.openSync(srcFile, 'r');
	  var stat = fs.fstatSync(fdr);
	  var fdw = fs.openSync(destFile, 'w', stat.mode);
	  var bytesRead = 1;
	  var pos = 0;

	  while (bytesRead > 0) {
	    bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos);
	    fs.writeSync(fdw, _buff, 0, bytesRead);
	    pos += bytesRead;
	  }

	  if (preserveTimestamps) {
	    fs.futimesSync(fdw, stat.atime, stat.mtime);
	  }

	  fs.closeSync(fdr);
	  fs.closeSync(fdw);
	}

	module.exports = copyFileSync;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	'use strict';

	/* eslint-disable node/no-deprecated-api */
	module.exports = function (size) {
	  if (typeof Buffer.allocUnsafe === 'function') {
	    try {
	      return Buffer.allocUnsafe(size);
	    } catch (e) {
	      return new Buffer(size);
	    }
	  }
	  return new Buffer(size);
	};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var u = __webpack_require__(11).fromCallback;
	var rimraf = __webpack_require__(34);

	module.exports = {
	  remove: u(rimraf),
	  removeSync: rimraf.sync
	};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var fs = __webpack_require__(12);
	var path = __webpack_require__(3);
	var assert = __webpack_require__(19);

	var isWindows = process.platform === 'win32';

	function defaults(options) {
	  var methods = ['unlink', 'chmod', 'stat', 'lstat', 'rmdir', 'readdir'];
	  methods.forEach(function (m) {
	    options[m] = options[m] || fs[m];
	    m = m + 'Sync';
	    options[m] = options[m] || fs[m];
	  });

	  options.maxBusyTries = options.maxBusyTries || 3;
	}

	function rimraf(p, options, cb) {
	  var busyTries = 0;

	  if (typeof options === 'function') {
	    cb = options;
	    options = {};
	  }

	  assert(p, 'rimraf: missing path');
	  assert.equal(typeof p === 'undefined' ? 'undefined' : _typeof(p), 'string', 'rimraf: path should be a string');
	  assert.equal(typeof cb === 'undefined' ? 'undefined' : _typeof(cb), 'function', 'rimraf: callback function required');
	  assert(options, 'rimraf: invalid options argument provided');
	  assert.equal(typeof options === 'undefined' ? 'undefined' : _typeof(options), 'object', 'rimraf: options should be object');

	  defaults(options);

	  rimraf_(p, options, function CB(er) {
	    if (er) {
	      if (isWindows && (er.code === 'EBUSY' || er.code === 'ENOTEMPTY' || er.code === 'EPERM') && busyTries < options.maxBusyTries) {
	        busyTries++;
	        var time = busyTries * 100;
	        // try again, with the same exact callback as this one.
	        return setTimeout(function () {
	          return rimraf_(p, options, CB);
	        }, time);
	      }

	      // already gone
	      if (er.code === 'ENOENT') er = null;
	    }

	    cb(er);
	  });
	}

	// Two possible strategies.
	// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
	// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
	//
	// Both result in an extra syscall when you guess wrong.  However, there
	// are likely far more normal files in the world than directories.  This
	// is based on the assumption that a the average number of files per
	// directory is >= 1.
	//
	// If anyone ever complains about this, then I guess the strategy could
	// be made configurable somehow.  But until then, YAGNI.
	function rimraf_(p, options, cb) {
	  assert(p);
	  assert(options);
	  assert(typeof cb === 'function'

	  // sunos lets the root user unlink directories, which is... weird.
	  // so we have to lstat here and make sure it's not a dir.
	  );options.lstat(p, function (er, st) {
	    if (er && er.code === 'ENOENT') {
	      return cb(null);
	    }

	    // Windows can EPERM on stat.  Life is suffering.
	    if (er && er.code === 'EPERM' && isWindows) {
	      return fixWinEPERM(p, options, er, cb);
	    }

	    if (st && st.isDirectory()) {
	      return rmdir(p, options, er, cb);
	    }

	    options.unlink(p, function (er) {
	      if (er) {
	        if (er.code === 'ENOENT') {
	          return cb(null);
	        }
	        if (er.code === 'EPERM') {
	          return isWindows ? fixWinEPERM(p, options, er, cb) : rmdir(p, options, er, cb);
	        }
	        if (er.code === 'EISDIR') {
	          return rmdir(p, options, er, cb);
	        }
	      }
	      return cb(er);
	    });
	  });
	}

	function fixWinEPERM(p, options, er, cb) {
	  assert(p);
	  assert(options);
	  assert(typeof cb === 'function');
	  if (er) {
	    assert(er instanceof Error);
	  }

	  options.chmod(p, 666, function (er2) {
	    if (er2) {
	      cb(er2.code === 'ENOENT' ? null : er);
	    } else {
	      options.stat(p, function (er3, stats) {
	        if (er3) {
	          cb(er3.code === 'ENOENT' ? null : er);
	        } else if (stats.isDirectory()) {
	          rmdir(p, options, er, cb);
	        } else {
	          options.unlink(p, cb);
	        }
	      });
	    }
	  });
	}

	function fixWinEPERMSync(p, options, er) {
	  var stats = void 0;

	  assert(p);
	  assert(options);
	  if (er) {
	    assert(er instanceof Error);
	  }

	  try {
	    options.chmodSync(p, 666);
	  } catch (er2) {
	    if (er2.code === 'ENOENT') {
	      return;
	    } else {
	      throw er;
	    }
	  }

	  try {
	    stats = options.statSync(p);
	  } catch (er3) {
	    if (er3.code === 'ENOENT') {
	      return;
	    } else {
	      throw er;
	    }
	  }

	  if (stats.isDirectory()) {
	    rmdirSync(p, options, er);
	  } else {
	    options.unlinkSync(p);
	  }
	}

	function rmdir(p, options, originalEr, cb) {
	  assert(p);
	  assert(options);
	  if (originalEr) {
	    assert(originalEr instanceof Error);
	  }
	  assert(typeof cb === 'function'

	  // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
	  // if we guessed wrong, and it's not a directory, then
	  // raise the original error.
	  );options.rmdir(p, function (er) {
	    if (er && (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM')) {
	      rmkids(p, options, cb);
	    } else if (er && er.code === 'ENOTDIR') {
	      cb(originalEr);
	    } else {
	      cb(er);
	    }
	  });
	}

	function rmkids(p, options, cb) {
	  assert(p);
	  assert(options);
	  assert(typeof cb === 'function');

	  options.readdir(p, function (er, files) {
	    if (er) return cb(er);

	    var n = files.length;
	    var errState = void 0;

	    if (n === 0) return options.rmdir(p, cb);

	    files.forEach(function (f) {
	      rimraf(path.join(p, f), options, function (er) {
	        if (errState) {
	          return;
	        }
	        if (er) return cb(errState = er);
	        if (--n === 0) {
	          options.rmdir(p, cb);
	        }
	      });
	    });
	  });
	}

	// this looks simpler, and is strictly *faster*, but will
	// tie up the JavaScript thread and fail on excessively
	// deep directory trees.
	function rimrafSync(p, options) {
	  var st = void 0;

	  options = options || {};
	  defaults(options);

	  assert(p, 'rimraf: missing path');
	  assert.equal(typeof p === 'undefined' ? 'undefined' : _typeof(p), 'string', 'rimraf: path should be a string');
	  assert(options, 'rimraf: missing options');
	  assert.equal(typeof options === 'undefined' ? 'undefined' : _typeof(options), 'object', 'rimraf: options should be object');

	  try {
	    st = options.lstatSync(p);
	  } catch (er) {
	    if (er.code === 'ENOENT') {
	      return;
	    }

	    // Windows can EPERM on stat.  Life is suffering.
	    if (er.code === 'EPERM' && isWindows) {
	      fixWinEPERMSync(p, options, er);
	    }
	  }

	  try {
	    // sunos lets the root user unlink directories, which is... weird.
	    if (st && st.isDirectory()) {
	      rmdirSync(p, options, null);
	    } else {
	      options.unlinkSync(p);
	    }
	  } catch (er) {
	    if (er.code === 'ENOENT') {
	      return;
	    } else if (er.code === 'EPERM') {
	      return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
	    } else if (er.code !== 'EISDIR') {
	      throw er;
	    }
	    rmdirSync(p, options, er);
	  }
	}

	function rmdirSync(p, options, originalEr) {
	  assert(p);
	  assert(options);
	  if (originalEr) {
	    assert(originalEr instanceof Error);
	  }

	  try {
	    options.rmdirSync(p);
	  } catch (er) {
	    if (er.code === 'ENOTDIR') {
	      throw originalEr;
	    } else if (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM') {
	      rmkidsSync(p, options);
	    } else if (er.code !== 'ENOENT') {
	      throw er;
	    }
	  }
	}

	function rmkidsSync(p, options) {
	  assert(p);
	  assert(options);
	  options.readdirSync(p).forEach(function (f) {
	    return rimrafSync(path.join(p, f), options);
	  });
	  options.rmdirSync(p, options);
	}

	module.exports = rimraf;
	rimraf.sync = rimrafSync;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var u = __webpack_require__(11).fromCallback;
	var jsonFile = __webpack_require__(36);

	jsonFile.outputJsonSync = __webpack_require__(38);
	jsonFile.outputJson = u(__webpack_require__(39)
	// aliases
	);jsonFile.outputJSONSync = jsonFile.outputJSONSync;
	jsonFile.outputJSON = jsonFile.outputJson;
	jsonFile.writeJSON = jsonFile.writeJson;
	jsonFile.writeJSONSync = jsonFile.writeJsonSync;
	jsonFile.readJSON = jsonFile.readJson;
	jsonFile.readJSONSync = jsonFile.readJsonSync;

	module.exports = jsonFile;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var u = __webpack_require__(11).fromCallback;
	var jsonFile = __webpack_require__(37);

	module.exports = {
	  // jsonfile exports
	  readJson: u(jsonFile.readFile),
	  readJsonSync: jsonFile.readFileSync,
	  writeJson: u(jsonFile.writeFile),
	  writeJsonSync: jsonFile.writeFileSync
	};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	var _fs
	try {
	  _fs = __webpack_require__(12)
	} catch (_) {
	  _fs = __webpack_require__(7)
	}

	function readFile (file, options, callback) {
	  if (callback == null) {
	    callback = options
	    options = {}
	  }

	  if (typeof options === 'string') {
	    options = {encoding: options}
	  }

	  options = options || {}
	  var fs = options.fs || _fs

	  var shouldThrow = true
	  // DO NOT USE 'passParsingErrors' THE NAME WILL CHANGE!!!, use 'throws' instead
	  if ('passParsingErrors' in options) {
	    shouldThrow = options.passParsingErrors
	  } else if ('throws' in options) {
	    shouldThrow = options.throws
	  }

	  fs.readFile(file, options, function (err, data) {
	    if (err) return callback(err)

	    data = stripBom(data)

	    var obj
	    try {
	      obj = JSON.parse(data, options ? options.reviver : null)
	    } catch (err2) {
	      if (shouldThrow) {
	        err2.message = file + ': ' + err2.message
	        return callback(err2)
	      } else {
	        return callback(null, null)
	      }
	    }

	    callback(null, obj)
	  })
	}

	function readFileSync (file, options) {
	  options = options || {}
	  if (typeof options === 'string') {
	    options = {encoding: options}
	  }

	  var fs = options.fs || _fs

	  var shouldThrow = true
	  // DO NOT USE 'passParsingErrors' THE NAME WILL CHANGE!!!, use 'throws' instead
	  if ('passParsingErrors' in options) {
	    shouldThrow = options.passParsingErrors
	  } else if ('throws' in options) {
	    shouldThrow = options.throws
	  }

	  try {
	    var content = fs.readFileSync(file, options)
	    content = stripBom(content)
	    return JSON.parse(content, options.reviver)
	  } catch (err) {
	    if (shouldThrow) {
	      err.message = file + ': ' + err.message
	      throw err
	    } else {
	      return null
	    }
	  }
	}

	function writeFile (file, obj, options, callback) {
	  if (callback == null) {
	    callback = options
	    options = {}
	  }
	  options = options || {}
	  var fs = options.fs || _fs

	  var spaces = typeof options === 'object' && options !== null
	    ? 'spaces' in options
	    ? options.spaces : this.spaces
	    : this.spaces

	  var str = ''
	  try {
	    str = JSON.stringify(obj, options ? options.replacer : null, spaces) + '\n'
	  } catch (err) {
	    if (callback) return callback(err, null)
	  }

	  fs.writeFile(file, str, options, callback)
	}

	function writeFileSync (file, obj, options) {
	  options = options || {}
	  var fs = options.fs || _fs

	  var spaces = typeof options === 'object' && options !== null
	    ? 'spaces' in options
	    ? options.spaces : this.spaces
	    : this.spaces

	  var str = JSON.stringify(obj, options.replacer, spaces) + '\n'
	  // not sure if fs.writeFileSync returns anything, but just in case
	  return fs.writeFileSync(file, str, options)
	}

	function stripBom (content) {
	  // we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
	  if (Buffer.isBuffer(content)) content = content.toString('utf8')
	  content = content.replace(/^\uFEFF/, '')
	  return content
	}

	var jsonfile = {
	  spaces: null,
	  readFile: readFile,
	  readFileSync: readFileSync,
	  writeFile: writeFile,
	  writeFileSync: writeFileSync
	}

	module.exports = jsonfile


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var fs = __webpack_require__(12);
	var path = __webpack_require__(3);
	var mkdir = __webpack_require__(24);
	var jsonFile = __webpack_require__(36);

	function outputJsonSync(file, data, options) {
	  var dir = path.dirname(file);

	  if (!fs.existsSync(dir)) {
	    mkdir.mkdirsSync(dir);
	  }

	  jsonFile.writeJsonSync(file, data, options);
	}

	module.exports = outputJsonSync;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var path = __webpack_require__(3);
	var mkdir = __webpack_require__(24);
	var pathExists = __webpack_require__(28).pathExists;
	var jsonFile = __webpack_require__(36);

	function outputJson(file, data, options, callback) {
	  if (typeof options === 'function') {
	    callback = options;
	    options = {};
	  }

	  var dir = path.dirname(file);

	  pathExists(dir, function (err, itDoes) {
	    if (err) return callback(err);
	    if (itDoes) return jsonFile.writeJson(file, data, options, callback);

	    mkdir.mkdirs(dir, function (err) {
	      if (err) return callback(err);
	      jsonFile.writeJson(file, data, options, callback);
	    });
	  });
	}

	module.exports = outputJson;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// most of this code was written by Andrew Kelley
	// licensed under the BSD license: see
	// https://github.com/andrewrk/node-mv/blob/master/package.json

	// this needs a cleanup

	var u = __webpack_require__(11).fromCallback;
	var fs = __webpack_require__(12);
	var ncp = __webpack_require__(22);
	var path = __webpack_require__(3);
	var remove = __webpack_require__(33).remove;
	var mkdirp = __webpack_require__(24).mkdirs;

	function move(source, dest, options, callback) {
	  if (typeof options === 'function') {
	    callback = options;
	    options = {};
	  }

	  var shouldMkdirp = 'mkdirp' in options ? options.mkdirp : true;
	  var overwrite = options.overwrite || options.clobber || false;

	  if (shouldMkdirp) {
	    mkdirs();
	  } else {
	    doRename();
	  }

	  function mkdirs() {
	    mkdirp(path.dirname(dest), function (err) {
	      if (err) return callback(err);
	      doRename();
	    });
	  }

	  function doRename() {
	    if (path.resolve(source) === path.resolve(dest)) {
	      fs.access(source, callback);
	    } else if (overwrite) {
	      fs.rename(source, dest, function (err) {
	        if (!err) return callback();

	        if (err.code === 'ENOTEMPTY' || err.code === 'EEXIST') {
	          remove(dest, function (err) {
	            if (err) return callback(err);
	            options.overwrite = false; // just overwriteed it, no need to do it again
	            move(source, dest, options, callback);
	          });
	          return;
	        }

	        // weird Windows shit
	        if (err.code === 'EPERM') {
	          setTimeout(function () {
	            remove(dest, function (err) {
	              if (err) return callback(err);
	              options.overwrite = false;
	              move(source, dest, options, callback);
	            });
	          }, 200);
	          return;
	        }

	        if (err.code !== 'EXDEV') return callback(err);
	        moveAcrossDevice(source, dest, overwrite, callback);
	      });
	    } else {
	      fs.link(source, dest, function (err) {
	        if (err) {
	          if (err.code === 'EXDEV' || err.code === 'EISDIR' || err.code === 'EPERM' || err.code === 'ENOTSUP') {
	            moveAcrossDevice(source, dest, overwrite, callback);
	            return;
	          }
	          callback(err);
	          return;
	        }
	        fs.unlink(source, callback);
	      });
	    }
	  }
	}

	function moveAcrossDevice(source, dest, overwrite, callback) {
	  fs.stat(source, function (err, stat) {
	    if (err) {
	      callback(err);
	      return;
	    }

	    if (stat.isDirectory()) {
	      moveDirAcrossDevice(source, dest, overwrite, callback);
	    } else {
	      moveFileAcrossDevice(source, dest, overwrite, callback);
	    }
	  });
	}

	function moveFileAcrossDevice(source, dest, overwrite, callback) {
	  var flags = overwrite ? 'w' : 'wx';
	  var ins = fs.createReadStream(source);
	  var outs = fs.createWriteStream(dest, { flags: flags });

	  ins.on('error', function (err) {
	    ins.destroy();
	    outs.destroy();
	    outs.removeListener('close', onClose

	    // may want to create a directory but `out` line above
	    // creates an empty file for us: See #108
	    // don't care about error here
	    );fs.unlink(dest, function () {
	      // note: `err` here is from the input stream errror
	      if (err.code === 'EISDIR' || err.code === 'EPERM') {
	        moveDirAcrossDevice(source, dest, overwrite, callback);
	      } else {
	        callback(err);
	      }
	    });
	  });

	  outs.on('error', function (err) {
	    ins.destroy();
	    outs.destroy();
	    outs.removeListener('close', onClose);
	    callback(err);
	  });

	  outs.once('close', onClose);
	  ins.pipe(outs);

	  function onClose() {
	    fs.unlink(source, callback);
	  }
	}

	function moveDirAcrossDevice(source, dest, overwrite, callback) {
	  var options = {
	    overwrite: false
	  };

	  if (overwrite) {
	    remove(dest, function (err) {
	      if (err) return callback(err);
	      startNcp();
	    });
	  } else {
	    startNcp();
	  }

	  function startNcp() {
	    ncp(source, dest, options, function (err) {
	      if (err) return callback(err);
	      remove(source, callback);
	    });
	  }
	}

	module.exports = {
	  move: u(move)
	};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var fs = __webpack_require__(12);
	var path = __webpack_require__(3);
	var copySync = __webpack_require__(29).copySync;
	var removeSync = __webpack_require__(33).removeSync;
	var mkdirpSync = __webpack_require__(24).mkdirsSync;
	var buffer = __webpack_require__(32);

	function moveSync(src, dest, options) {
	  options = options || {};
	  var overwrite = options.overwrite || options.clobber || false;

	  src = path.resolve(src);
	  dest = path.resolve(dest);

	  if (src === dest) return fs.accessSync(src);

	  if (isSrcSubdir(src, dest)) throw new Error('Cannot move \'' + src + '\' into itself \'' + dest + '\'.');

	  mkdirpSync(path.dirname(dest));
	  tryRenameSync();

	  function tryRenameSync() {
	    if (overwrite) {
	      try {
	        return fs.renameSync(src, dest);
	      } catch (err) {
	        if (err.code === 'ENOTEMPTY' || err.code === 'EEXIST' || err.code === 'EPERM') {
	          removeSync(dest);
	          options.overwrite = false; // just overwriteed it, no need to do it again
	          return moveSync(src, dest, options);
	        }

	        if (err.code !== 'EXDEV') throw err;
	        return moveSyncAcrossDevice(src, dest, overwrite);
	      }
	    } else {
	      try {
	        fs.linkSync(src, dest);
	        return fs.unlinkSync(src);
	      } catch (err) {
	        if (err.code === 'EXDEV' || err.code === 'EISDIR' || err.code === 'EPERM' || err.code === 'ENOTSUP') {
	          return moveSyncAcrossDevice(src, dest, overwrite);
	        }
	        throw err;
	      }
	    }
	  }
	}

	function moveSyncAcrossDevice(src, dest, overwrite) {
	  var stat = fs.statSync(src);

	  if (stat.isDirectory()) {
	    return moveDirSyncAcrossDevice(src, dest, overwrite);
	  } else {
	    return moveFileSyncAcrossDevice(src, dest, overwrite);
	  }
	}

	function moveFileSyncAcrossDevice(src, dest, overwrite) {
	  var BUF_LENGTH = 64 * 1024;
	  var _buff = buffer(BUF_LENGTH);

	  var flags = overwrite ? 'w' : 'wx';

	  var fdr = fs.openSync(src, 'r');
	  var stat = fs.fstatSync(fdr);
	  var fdw = fs.openSync(dest, flags, stat.mode);
	  var bytesRead = 1;
	  var pos = 0;

	  while (bytesRead > 0) {
	    bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos);
	    fs.writeSync(fdw, _buff, 0, bytesRead);
	    pos += bytesRead;
	  }

	  fs.closeSync(fdr);
	  fs.closeSync(fdw);
	  return fs.unlinkSync(src);
	}

	function moveDirSyncAcrossDevice(src, dest, overwrite) {
	  var options = {
	    overwrite: false
	  };

	  if (overwrite) {
	    removeSync(dest);
	    tryCopySync();
	  } else {
	    tryCopySync();
	  }

	  function tryCopySync() {
	    copySync(src, dest, options);
	    return removeSync(src);
	  }
	}

	// return true if dest is a subdir of src, otherwise false.
	// extract dest base dir and check if that is the same as src basename
	function isSrcSubdir(src, dest) {
	  try {
	    return fs.statSync(src).isDirectory() && src !== dest && dest.indexOf(src) > -1 && dest.split(path.dirname(src) + path.sep)[1].split(path.sep)[0] === path.basename(src);
	  } catch (e) {
	    return false;
	  }
	}

	module.exports = {
	  moveSync: moveSync
	};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var u = __webpack_require__(11).fromCallback;
	var fs = __webpack_require__(7);
	var path = __webpack_require__(3);
	var mkdir = __webpack_require__(24);
	var remove = __webpack_require__(33);

	var emptyDir = u(function emptyDir(dir, callback) {
	  callback = callback || function () {};
	  fs.readdir(dir, function (err, items) {
	    if (err) return mkdir.mkdirs(dir, callback);

	    items = items.map(function (item) {
	      return path.join(dir, item);
	    });

	    deleteItem();

	    function deleteItem() {
	      var item = items.pop();
	      if (!item) return callback();
	      remove.remove(item, function (err) {
	        if (err) return callback(err);
	        deleteItem();
	      });
	    }
	  });
	});

	function emptyDirSync(dir) {
	  var items = void 0;
	  try {
	    items = fs.readdirSync(dir);
	  } catch (err) {
	    return mkdir.mkdirsSync(dir);
	  }

	  items.forEach(function (item) {
	    item = path.join(dir, item);
	    remove.removeSync(item);
	  });
	}

	module.exports = {
	  emptyDirSync: emptyDirSync,
	  emptydirSync: emptyDirSync,
	  emptyDir: emptyDir,
	  emptydir: emptyDir
	};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var file = __webpack_require__(44);
	var link = __webpack_require__(45);
	var symlink = __webpack_require__(46);

	module.exports = {
	  // file
	  createFile: file.createFile,
	  createFileSync: file.createFileSync,
	  ensureFile: file.createFile,
	  ensureFileSync: file.createFileSync,
	  // link
	  createLink: link.createLink,
	  createLinkSync: link.createLinkSync,
	  ensureLink: link.createLink,
	  ensureLinkSync: link.createLinkSync,
	  // symlink
	  createSymlink: symlink.createSymlink,
	  createSymlinkSync: symlink.createSymlinkSync,
	  ensureSymlink: symlink.createSymlink,
	  ensureSymlinkSync: symlink.createSymlinkSync
	};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var u = __webpack_require__(11).fromCallback;
	var path = __webpack_require__(3);
	var fs = __webpack_require__(12);
	var mkdir = __webpack_require__(24);
	var pathExists = __webpack_require__(28).pathExists;

	function createFile(file, callback) {
	  function makeFile() {
	    fs.writeFile(file, '', function (err) {
	      if (err) return callback(err);
	      callback();
	    });
	  }

	  pathExists(file, function (err, fileExists) {
	    if (err) return callback(err);
	    if (fileExists) return callback();
	    var dir = path.dirname(file);
	    pathExists(dir, function (err, dirExists) {
	      if (err) return callback(err);
	      if (dirExists) return makeFile();
	      mkdir.mkdirs(dir, function (err) {
	        if (err) return callback(err);
	        makeFile();
	      });
	    });
	  });
	}

	function createFileSync(file) {
	  if (fs.existsSync(file)) return;

	  var dir = path.dirname(file);
	  if (!fs.existsSync(dir)) {
	    mkdir.mkdirsSync(dir);
	  }

	  fs.writeFileSync(file, '');
	}

	module.exports = {
	  createFile: u(createFile),
	  createFileSync: createFileSync
	};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var u = __webpack_require__(11).fromCallback;
	var path = __webpack_require__(3);
	var fs = __webpack_require__(12);
	var mkdir = __webpack_require__(24);
	var pathExists = __webpack_require__(28).pathExists;

	function createLink(srcpath, dstpath, callback) {
	  function makeLink(srcpath, dstpath) {
	    fs.link(srcpath, dstpath, function (err) {
	      if (err) return callback(err);
	      callback(null);
	    });
	  }

	  pathExists(dstpath, function (err, destinationExists) {
	    if (err) return callback(err);
	    if (destinationExists) return callback(null);
	    fs.lstat(srcpath, function (err, stat) {
	      if (err) {
	        err.message = err.message.replace('lstat', 'ensureLink');
	        return callback(err);
	      }

	      var dir = path.dirname(dstpath);
	      pathExists(dir, function (err, dirExists) {
	        if (err) return callback(err);
	        if (dirExists) return makeLink(srcpath, dstpath);
	        mkdir.mkdirs(dir, function (err) {
	          if (err) return callback(err);
	          makeLink(srcpath, dstpath);
	        });
	      });
	    });
	  });
	}

	function createLinkSync(srcpath, dstpath, callback) {
	  var destinationExists = fs.existsSync(dstpath);
	  if (destinationExists) return undefined;

	  try {
	    fs.lstatSync(srcpath);
	  } catch (err) {
	    err.message = err.message.replace('lstat', 'ensureLink');
	    throw err;
	  }

	  var dir = path.dirname(dstpath);
	  var dirExists = fs.existsSync(dir);
	  if (dirExists) return fs.linkSync(srcpath, dstpath);
	  mkdir.mkdirsSync(dir);

	  return fs.linkSync(srcpath, dstpath);
	}

	module.exports = {
	  createLink: u(createLink),
	  createLinkSync: createLinkSync
	};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var u = __webpack_require__(11).fromCallback;
	var path = __webpack_require__(3);
	var fs = __webpack_require__(12);
	var _mkdirs = __webpack_require__(24);
	var mkdirs = _mkdirs.mkdirs;
	var mkdirsSync = _mkdirs.mkdirsSync;

	var _symlinkPaths = __webpack_require__(47);
	var symlinkPaths = _symlinkPaths.symlinkPaths;
	var symlinkPathsSync = _symlinkPaths.symlinkPathsSync;

	var _symlinkType = __webpack_require__(48);
	var symlinkType = _symlinkType.symlinkType;
	var symlinkTypeSync = _symlinkType.symlinkTypeSync;

	var pathExists = __webpack_require__(28).pathExists;

	function createSymlink(srcpath, dstpath, type, callback) {
	  callback = typeof type === 'function' ? type : callback;
	  type = typeof type === 'function' ? false : type;

	  pathExists(dstpath, function (err, destinationExists) {
	    if (err) return callback(err);
	    if (destinationExists) return callback(null);
	    symlinkPaths(srcpath, dstpath, function (err, relative) {
	      if (err) return callback(err);
	      srcpath = relative.toDst;
	      symlinkType(relative.toCwd, type, function (err, type) {
	        if (err) return callback(err);
	        var dir = path.dirname(dstpath);
	        pathExists(dir, function (err, dirExists) {
	          if (err) return callback(err);
	          if (dirExists) return fs.symlink(srcpath, dstpath, type, callback);
	          mkdirs(dir, function (err) {
	            if (err) return callback(err);
	            fs.symlink(srcpath, dstpath, type, callback);
	          });
	        });
	      });
	    });
	  });
	}

	function createSymlinkSync(srcpath, dstpath, type, callback) {
	  callback = typeof type === 'function' ? type : callback;
	  type = typeof type === 'function' ? false : type;

	  var destinationExists = fs.existsSync(dstpath);
	  if (destinationExists) return undefined;

	  var relative = symlinkPathsSync(srcpath, dstpath);
	  srcpath = relative.toDst;
	  type = symlinkTypeSync(relative.toCwd, type);
	  var dir = path.dirname(dstpath);
	  var exists = fs.existsSync(dir);
	  if (exists) return fs.symlinkSync(srcpath, dstpath, type);
	  mkdirsSync(dir);
	  return fs.symlinkSync(srcpath, dstpath, type);
	}

	module.exports = {
	  createSymlink: u(createSymlink),
	  createSymlinkSync: createSymlinkSync
	};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var path = __webpack_require__(3);
	var fs = __webpack_require__(12);
	var pathExists = __webpack_require__(28).pathExists;

	/**
	 * Function that returns two types of paths, one relative to symlink, and one
	 * relative to the current working directory. Checks if path is absolute or
	 * relative. If the path is relative, this function checks if the path is
	 * relative to symlink or relative to current working directory. This is an
	 * initiative to find a smarter `srcpath` to supply when building symlinks.
	 * This allows you to determine which path to use out of one of three possible
	 * types of source paths. The first is an absolute path. This is detected by
	 * `path.isAbsolute()`. When an absolute path is provided, it is checked to
	 * see if it exists. If it does it's used, if not an error is returned
	 * (callback)/ thrown (sync). The other two options for `srcpath` are a
	 * relative url. By default Node's `fs.symlink` works by creating a symlink
	 * using `dstpath` and expects the `srcpath` to be relative to the newly
	 * created symlink. If you provide a `srcpath` that does not exist on the file
	 * system it results in a broken symlink. To minimize this, the function
	 * checks to see if the 'relative to symlink' source file exists, and if it
	 * does it will use it. If it does not, it checks if there's a file that
	 * exists that is relative to the current working directory, if does its used.
	 * This preserves the expectations of the original fs.symlink spec and adds
	 * the ability to pass in `relative to current working direcotry` paths.
	 */

	function symlinkPaths(srcpath, dstpath, callback) {
	  if (path.isAbsolute(srcpath)) {
	    return fs.lstat(srcpath, function (err, stat) {
	      if (err) {
	        err.message = err.message.replace('lstat', 'ensureSymlink');
	        return callback(err);
	      }
	      return callback(null, {
	        'toCwd': srcpath,
	        'toDst': srcpath
	      });
	    });
	  } else {
	    var dstdir = path.dirname(dstpath);
	    var relativeToDst = path.join(dstdir, srcpath);
	    return pathExists(relativeToDst, function (err, exists) {
	      if (err) return callback(err);
	      if (exists) {
	        return callback(null, {
	          'toCwd': relativeToDst,
	          'toDst': srcpath
	        });
	      } else {
	        return fs.lstat(srcpath, function (err, stat) {
	          if (err) {
	            err.message = err.message.replace('lstat', 'ensureSymlink');
	            return callback(err);
	          }
	          return callback(null, {
	            'toCwd': srcpath,
	            'toDst': path.relative(dstdir, srcpath)
	          });
	        });
	      }
	    });
	  }
	}

	function symlinkPathsSync(srcpath, dstpath) {
	  var exists = void 0;
	  if (path.isAbsolute(srcpath)) {
	    exists = fs.existsSync(srcpath);
	    if (!exists) throw new Error('absolute srcpath does not exist');
	    return {
	      'toCwd': srcpath,
	      'toDst': srcpath
	    };
	  } else {
	    var dstdir = path.dirname(dstpath);
	    var relativeToDst = path.join(dstdir, srcpath);
	    exists = fs.existsSync(relativeToDst);
	    if (exists) {
	      return {
	        'toCwd': relativeToDst,
	        'toDst': srcpath
	      };
	    } else {
	      exists = fs.existsSync(srcpath);
	      if (!exists) throw new Error('relative srcpath does not exist');
	      return {
	        'toCwd': srcpath,
	        'toDst': path.relative(dstdir, srcpath)
	      };
	    }
	  }
	}

	module.exports = {
	  symlinkPaths: symlinkPaths,
	  symlinkPathsSync: symlinkPathsSync
	};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var fs = __webpack_require__(12);

	function symlinkType(srcpath, type, callback) {
	  callback = typeof type === 'function' ? type : callback;
	  type = typeof type === 'function' ? false : type;
	  if (type) return callback(null, type);
	  fs.lstat(srcpath, function (err, stats) {
	    if (err) return callback(null, 'file');
	    type = stats && stats.isDirectory() ? 'dir' : 'file';
	    callback(null, type);
	  });
	}

	function symlinkTypeSync(srcpath, type) {
	  var stats = void 0;

	  if (type) return type;
	  try {
	    stats = fs.lstatSync(srcpath);
	  } catch (e) {
	    return 'file';
	  }
	  return stats && stats.isDirectory() ? 'dir' : 'file';
	}

	module.exports = {
	  symlinkType: symlinkType,
	  symlinkTypeSync: symlinkTypeSync
	};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var u = __webpack_require__(11).fromCallback;
	var fs = __webpack_require__(12);
	var path = __webpack_require__(3);
	var mkdir = __webpack_require__(24);
	var pathExists = __webpack_require__(28).pathExists;

	function outputFile(file, data, encoding, callback) {
	  if (typeof encoding === 'function') {
	    callback = encoding;
	    encoding = 'utf8';
	  }

	  var dir = path.dirname(file);
	  pathExists(dir, function (err, itDoes) {
	    if (err) return callback(err);
	    if (itDoes) return fs.writeFile(file, data, encoding, callback);

	    mkdir.mkdirs(dir, function (err) {
	      if (err) return callback(err);

	      fs.writeFile(file, data, encoding, callback);
	    });
	  });
	}

	function outputFileSync(file, data, encoding) {
	  var dir = path.dirname(file);
	  if (fs.existsSync(dir)) {
	    return fs.writeFileSync.apply(fs, arguments);
	  }
	  mkdir.mkdirsSync(dir);
	  fs.writeFileSync.apply(fs, arguments);
	}

	module.exports = {
	  outputFile: u(outputFile),
	  outputFileSync: outputFileSync
	};

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	module.exports = require("http");

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.Parse = __webpack_require__(52);
	exports.Extract = __webpack_require__(95);

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = Parse.create = Parse;

	__webpack_require__(53);
	var Transform = __webpack_require__(54);
	var inherits = __webpack_require__(18).inherits;
	var zlib = __webpack_require__(66);
	var binary = __webpack_require__(67);
	var PullStream = __webpack_require__(72);
	var MatchStream = __webpack_require__(86);
	var Entry = __webpack_require__(92);

	inherits(Parse, Transform);

	function Parse(opts) {
	  var self = this;
	  if (!(this instanceof Parse)) {
	    return new Parse(opts);
	  }

	  Transform.call(this, { lowWaterMark: 0 });
	  this._opts = opts || { verbose: false };
	  this._hasEntryListener = false;

	  this._pullStream = new PullStream();
	  this._pullStream.on("error", function (e) {
	    self.emit('error', e);
	  });
	  this._pullStream.once("end", function () {
	    self._streamEnd = true;
	  });
	  this._pullStream.once("finish", function () {
	    self._streamFinish = true;
	  });

	  this._readRecord();
	}

	Parse.prototype._readRecord = function () {
	  var self = this;
	  this._pullStream.pull(4, function (err, data) {
	    if (err) {
	      return self.emit('error', err);
	    }

	    if (data.length === 0) {
	      return;
	    }

	    var signature = data.readUInt32LE(0);
	    if (signature === 0x04034b50) {
	      self._readFile();
	    } else if (signature === 0x02014b50) {
	      self._readCentralDirectoryFileHeader();
	    } else if (signature === 0x06054b50) {
	      self._readEndOfCentralDirectoryRecord();
	    } else {
	      err = new Error('invalid signature: 0x' + signature.toString(16));
	      self.emit('error', err);
	    }
	  });
	};

	Parse.prototype._readFile = function () {
	  var self = this;
	  this._pullStream.pull(26, function (err, data) {
	    if (err) {
	      return self.emit('error', err);
	    }

	    var vars = binary.parse(data)
	      .word16lu('versionsNeededToExtract')
	      .word16lu('flags')
	      .word16lu('compressionMethod')
	      .word16lu('lastModifiedTime')
	      .word16lu('lastModifiedDate')
	      .word32lu('crc32')
	      .word32lu('compressedSize')
	      .word32lu('uncompressedSize')
	      .word16lu('fileNameLength')
	      .word16lu('extraFieldLength')
	      .vars;

	    return self._pullStream.pull(vars.fileNameLength, function (err, fileName) {
	      if (err) {
	        return self.emit('error', err);
	      }
	      fileName = fileName.toString('utf8');
	      var entry = new Entry();
	      entry.path = fileName;
	      entry.props.path = fileName;
	      entry.type = (vars.compressedSize === 0 && /[\/\\]$/.test(fileName)) ? 'Directory' : 'File';

	      if (self._opts.verbose) {
	        if (entry.type === 'Directory') {
	          console.log('   creating:', fileName);
	        } else if (entry.type === 'File') {
	          if (vars.compressionMethod === 0) {
	            console.log(' extracting:', fileName);
	          } else {
	            console.log('  inflating:', fileName);
	          }
	        }
	      }

	      var hasEntryListener = self._hasEntryListener;
	      if (hasEntryListener) {
	        self.emit('entry', entry);
	      }

	      self._pullStream.pull(vars.extraFieldLength, function (err, extraField) {
	        if (err) {
	          return self.emit('error', err);
	        }
	        if (vars.compressionMethod === 0) {
	          self._pullStream.pull(vars.compressedSize, function (err, compressedData) {
	            if (err) {
	              return self.emit('error', err);
	            }

	            if (hasEntryListener) {
	              entry.write(compressedData);
	              entry.end();
	            }

	            return self._readRecord();
	          });
	        } else {
	          var fileSizeKnown = !(vars.flags & 0x08);

	          var inflater = zlib.createInflateRaw();
	          inflater.on('error', function (err) {
	            self.emit('error', err);
	          });

	          if (fileSizeKnown) {
	            entry.size = vars.uncompressedSize;
	            if (hasEntryListener) {
	              entry.on('finish', self._readRecord.bind(self));
	              self._pullStream.pipe(vars.compressedSize, inflater).pipe(entry);
	            } else {
	              self._pullStream.drain(vars.compressedSize, function (err) {
	                if (err) {
	                  return self.emit('error', err);
	                }
	                self._readRecord();
	              });
	            }
	          } else {
	            var descriptorSig = new Buffer(4);
	            descriptorSig.writeUInt32LE(0x08074b50, 0);

	            var matchStream = new MatchStream({ pattern: descriptorSig }, function (buf, matched, extra) {
	              if (hasEntryListener) {
	                if (!matched) {
	                  return this.push(buf);
	                }
	                this.push(buf);
	              }
	              setImmediate(function() {
	                self._pullStream.unpipe();
	                self._pullStream.prepend(extra);
	                self._processDataDescriptor(entry);
	              });
	              return this.push(null);
	            });

	            self._pullStream.pipe(matchStream);
	            if (hasEntryListener) {
	              matchStream.pipe(inflater).pipe(entry);
	            }
	          }
	        }
	      });
	    });
	  });
	};

	Parse.prototype._processDataDescriptor = function (entry) {
	  var self = this;
	  this._pullStream.pull(16, function (err, data) {
	    if (err) {
	      return self.emit('error', err);
	    }

	    var vars = binary.parse(data)
	      .word32lu('dataDescriptorSignature')
	      .word32lu('crc32')
	      .word32lu('compressedSize')
	      .word32lu('uncompressedSize')
	      .vars;

	    entry.size = vars.uncompressedSize;
	    self._readRecord();
	  });
	};

	Parse.prototype._readCentralDirectoryFileHeader = function () {
	  var self = this;
	  this._pullStream.pull(42, function (err, data) {
	    if (err) {
	      return self.emit('error', err);
	    }

	    var vars = binary.parse(data)
	      .word16lu('versionMadeBy')
	      .word16lu('versionsNeededToExtract')
	      .word16lu('flags')
	      .word16lu('compressionMethod')
	      .word16lu('lastModifiedTime')
	      .word16lu('lastModifiedDate')
	      .word32lu('crc32')
	      .word32lu('compressedSize')
	      .word32lu('uncompressedSize')
	      .word16lu('fileNameLength')
	      .word16lu('extraFieldLength')
	      .word16lu('fileCommentLength')
	      .word16lu('diskNumber')
	      .word16lu('internalFileAttributes')
	      .word32lu('externalFileAttributes')
	      .word32lu('offsetToLocalFileHeader')
	      .vars;

	    return self._pullStream.pull(vars.fileNameLength, function (err, fileName) {
	      if (err) {
	        return self.emit('error', err);
	      }
	      fileName = fileName.toString('utf8');

	      self._pullStream.pull(vars.extraFieldLength, function (err, extraField) {
	        if (err) {
	          return self.emit('error', err);
	        }
	        self._pullStream.pull(vars.fileCommentLength, function (err, fileComment) {
	          if (err) {
	            return self.emit('error', err);
	          }
	          return self._readRecord();
	        });
	      });
	    });
	  });
	};

	Parse.prototype._readEndOfCentralDirectoryRecord = function () {
	  var self = this;
	  this._pullStream.pull(18, function (err, data) {
	    if (err) {
	      return self.emit('error', err);
	    }

	    var vars = binary.parse(data)
	      .word16lu('diskNumber')
	      .word16lu('diskStart')
	      .word16lu('numberOfRecordsOnDisk')
	      .word16lu('numberOfRecords')
	      .word32lu('sizeOfCentralDirectory')
	      .word32lu('offsetToStartOfCentralDirectory')
	      .word16lu('commentLength')
	      .vars;

	    if (vars.commentLength) {
	      setImmediate(function() {
	        self._pullStream.pull(vars.commentLength, function (err, comment) {
	          if (err) {
	            return self.emit('error', err);
	          }
	          comment = comment.toString('utf8');
	          return self._pullStream.end();
	        });
	      });

	    } else {
	      self._pullStream.end();
	    }
	  });
	};

	Parse.prototype._transform = function (chunk, encoding, callback) {
	  if (this._pullStream.write(chunk)) {
	    return callback();
	  }

	  this._pullStream.once('drain', callback);
	};

	Parse.prototype.pipe = function (dest, opts) {
	  var self = this;
	  if (typeof dest.add === "function") {
	    self.on("entry", function (entry) {
	      dest.add(entry);
	    })
	  }
	  return Transform.prototype.pipe.apply(this, arguments);
	};

	Parse.prototype._flush = function (callback) {
	  if (!this._streamEnd || !this._streamFinish) {
	    return setImmediate(this._flush.bind(this, callback));
	  }

	  this.emit('close');
	  return callback();
	};

	Parse.prototype.addListener = function(type, listener) {
	  if ('entry' === type) {
	    this._hasEntryListener = true;
	  }
	  return Transform.prototype.addListener.call(this, type, listener);
	};

	Parse.prototype.on = Parse.prototype.addListener;


/***/ }),
/* 53 */
/***/ (function(module, exports) {

	(function (global, undefined) {
	    "use strict";

	    if (global.setImmediate) {
	        return;
	    }

	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;

	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }

	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }

	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }

	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }

	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }

	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }

	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };

	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }

	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }

	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };

	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }

	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }

	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }

	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();

	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();

	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();

	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();

	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }

	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(55)


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.


	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.

	module.exports = Transform;

	var Duplex = __webpack_require__(56);

	/*<replacement>*/
	var util = __webpack_require__(57);
	util.inherits = __webpack_require__(58);
	/*</replacement>*/

	util.inherits(Transform, Duplex);


	function TransformState(options, stream) {
	  this.afterTransform = function(er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb)
	    return stream.emit('error', new Error('no writecb in Transform class'));

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (data !== null && data !== undefined)
	    stream.push(data);

	  if (cb)
	    cb(er);

	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}


	function Transform(options) {
	  if (!(this instanceof Transform))
	    return new Transform(options);

	  Duplex.call(this, options);

	  var ts = this._transformState = new TransformState(options, this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  this.once('finish', function() {
	    if ('function' === typeof this._flush)
	      this._flush(function(er) {
	        done(stream, er);
	      });
	    else
	      done(stream);
	  });
	}

	Transform.prototype.push = function(chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function(chunk, encoding, cb) {
	  throw new Error('not implemented');
	};

	Transform.prototype._write = function(chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform ||
	        rs.needReadable ||
	        rs.length < rs.highWaterMark)
	      this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function(n) {
	  var ts = this._transformState;

	  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};


	function done(stream, er) {
	  if (er)
	    return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var rs = stream._readableState;
	  var ts = stream._transformState;

	  if (ws.length)
	    throw new Error('calling transform done when ws.length != 0');

	  if (ts.transforming)
	    throw new Error('calling transform done when still transforming');

	  return stream.push(null);
	}


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.

	module.exports = Duplex;

	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	/*</replacement>*/


	/*<replacement>*/
	var util = __webpack_require__(57);
	util.inherits = __webpack_require__(58);
	/*</replacement>*/

	var Readable = __webpack_require__(60);
	var Writable = __webpack_require__(65);

	util.inherits(Duplex, Readable);

	forEach(objectKeys(Writable.prototype), function(method) {
	  if (!Duplex.prototype[method])
	    Duplex.prototype[method] = Writable.prototype[method];
	});

	function Duplex(options) {
	  if (!(this instanceof Duplex))
	    return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false)
	    this.readable = false;

	  if (options && options.writable === false)
	    this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false)
	    this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended)
	    return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(this.end.bind(this));
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}


/***/ }),
/* 57 */
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.

	function isArray(arg) {
	  if (Array.isArray) {
	    return Array.isArray(arg);
	  }
	  return objectToString(arg) === '[object Array]';
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = Buffer.isBuffer;

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	try {
	  var util = __webpack_require__(18);
	  if (typeof util.inherits !== 'function') throw '';
	  module.exports = util.inherits;
	} catch (e) {
	  module.exports = __webpack_require__(59);
	}


/***/ }),
/* 59 */
/***/ (function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Readable;

	/*<replacement>*/
	var isArray = __webpack_require__(61);
	/*</replacement>*/


	/*<replacement>*/
	var Buffer = __webpack_require__(62).Buffer;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	var EE = __webpack_require__(63).EventEmitter;

	/*<replacement>*/
	if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	var Stream = __webpack_require__(17);

	/*<replacement>*/
	var util = __webpack_require__(57);
	util.inherits = __webpack_require__(58);
	/*</replacement>*/

	var StringDecoder;

	util.inherits(Readable, Stream);

	function ReadableState(options, stream) {
	  options = options || {};

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : 16 * 1024;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = false;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // In streams that never have any data, and do push(null) right away,
	  // the consumer can miss the 'end' event if they do some I/O before
	  // consuming the stream.  So, we don't emit('end') until some reading
	  // happens.
	  this.calledRead = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, becuase any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;


	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder)
	      StringDecoder = __webpack_require__(64).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  if (!(this instanceof Readable))
	    return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  Stream.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function(chunk, encoding) {
	  var state = this._readableState;

	  if (typeof chunk === 'string' && !state.objectMode) {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function(chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (chunk === null || chunk === undefined) {
	    state.reading = false;
	    if (!state.ended)
	      onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      if (state.decoder && !addToFront && !encoding)
	        chunk = state.decoder.write(chunk);

	      // update the buffer info.
	      state.length += state.objectMode ? 1 : chunk.length;
	      if (addToFront) {
	        state.buffer.unshift(chunk);
	      } else {
	        state.reading = false;
	        state.buffer.push(chunk);
	      }

	      if (state.needReadable)
	        emitReadable(stream);

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	}



	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended &&
	         (state.needReadable ||
	          state.length < state.highWaterMark ||
	          state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function(enc) {
	  if (!StringDecoder)
	    StringDecoder = __webpack_require__(64).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	};

	// Don't raise the hwm > 128MB
	var MAX_HWM = 0x800000;
	function roundUpToNextPowerOf2(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
	    n++;
	  }
	  return n;
	}

	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended)
	    return 0;

	  if (state.objectMode)
	    return n === 0 ? 0 : 1;

	  if (n === null || isNaN(n)) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length)
	      return state.buffer[0].length;
	    else
	      return state.length;
	  }

	  if (n <= 0)
	    return 0;

	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark)
	    state.highWaterMark = roundUpToNextPowerOf2(n);

	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else
	      return state.length;
	  }

	  return n;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function(n) {
	  var state = this._readableState;
	  state.calledRead = true;
	  var nOrig = n;
	  var ret;

	  if (typeof n !== 'number' || n > 0)
	    state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 &&
	      state.needReadable &&
	      (state.length >= state.highWaterMark || state.ended)) {
	    emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    ret = null;

	    // In cases where the decoder did not receive enough data
	    // to produce a full chunk, then immediately received an
	    // EOF, state.buffer will contain [<Buffer >, <Buffer 00 ...>].
	    // howMuchToRead will see this and coerce the amount to
	    // read to zero (because it's looking at the length of the
	    // first <Buffer > in state.buffer), and we'll end up here.
	    //
	    // This can only happen via state.decoder -- no other venue
	    // exists for pushing a zero-length chunk into state.buffer
	    // and triggering this behavior. In this case, we return our
	    // remaining data and end the stream, if appropriate.
	    if (state.length > 0 && state.decoder) {
	      ret = fromList(n, state);
	      state.length -= ret.length;
	    }

	    if (state.length === 0)
	      endReadable(this);

	    return ret;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length - n <= state.highWaterMark)
	    doRead = true;

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading)
	    doRead = false;

	  if (doRead) {
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0)
	      state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }

	  // If _read called its callback synchronously, then `reading`
	  // will be false, and we need to re-evaluate how much data we
	  // can return to the user.
	  if (doRead && !state.reading)
	    n = howMuchToRead(nOrig, state);

	  if (n > 0)
	    ret = fromList(n, state);
	  else
	    ret = null;

	  if (ret === null) {
	    state.needReadable = true;
	    n = 0;
	  }

	  state.length -= n;

	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended)
	    state.needReadable = true;

	  // If we happened to read() exactly the remaining amount in the
	  // buffer, and the EOF has been seen at this point, then make sure
	  // that we emit 'end' on the very next tick.
	  if (state.ended && !state.endEmitted && state.length === 0)
	    endReadable(this);

	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!Buffer.isBuffer(chunk) &&
	      'string' !== typeof chunk &&
	      chunk !== null &&
	      chunk !== undefined &&
	      !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}


	function onEofChunk(stream, state) {
	  if (state.decoder && !state.ended) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // if we've ended and we have some data left, then emit
	  // 'readable' now to make sure it gets picked up.
	  if (state.length > 0)
	    emitReadable(stream);
	  else
	    endReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (state.emittedReadable)
	    return;

	  state.emittedReadable = true;
	  if (state.sync)
	    process.nextTick(function() {
	      emitReadable_(stream);
	    });
	  else
	    emitReadable_(stream);
	}

	function emitReadable_(stream) {
	  stream.emit('readable');
	}


	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(function() {
	      maybeReadMore_(stream, state);
	    });
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended &&
	         state.length < state.highWaterMark) {
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;
	    else
	      len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function(n) {
	  this.emit('error', new Error('not implemented'));
	};

	Readable.prototype.pipe = function(dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;

	  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
	              dest !== process.stdout &&
	              dest !== process.stderr;

	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted)
	    process.nextTick(endFn);
	  else
	    src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    if (readable !== src) return;
	    cleanup();
	  }

	  function onend() {
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  function cleanup() {
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (!dest._writableState || dest._writableState.needDrain)
	      ondrain();
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EE.listenerCount(dest, 'error') === 0)
	      dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error)
	    dest.on('error', onerror);
	  else if (isArray(dest._events.error))
	    dest._events.error.unshift(onerror);
	  else
	    dest._events.error = [onerror, dest._events.error];



	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    // the handler that waits for readable events after all
	    // the data gets sucked out in flow.
	    // This would be easier to follow with a .once() handler
	    // in flow(), but that is too slow.
	    this.on('readable', pipeOnReadable);

	    state.flowing = true;
	    process.nextTick(function() {
	      flow(src);
	    });
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function() {
	    var dest = this;
	    var state = src._readableState;
	    state.awaitDrain--;
	    if (state.awaitDrain === 0)
	      flow(src);
	  };
	}

	function flow(src) {
	  var state = src._readableState;
	  var chunk;
	  state.awaitDrain = 0;

	  function write(dest, i, list) {
	    var written = dest.write(chunk);
	    if (false === written) {
	      state.awaitDrain++;
	    }
	  }

	  while (state.pipesCount && null !== (chunk = src.read())) {

	    if (state.pipesCount === 1)
	      write(state.pipes, 0, null);
	    else
	      forEach(state.pipes, write);

	    src.emit('data', chunk);

	    // if anyone needs a drain, then we have to wait for that.
	    if (state.awaitDrain > 0)
	      return;
	  }

	  // if every destination was unpiped, either before entering this
	  // function, or in the while loop, then stop flowing.
	  //
	  // NB: This is a pretty rare edge case.
	  if (state.pipesCount === 0) {
	    state.flowing = false;

	    // if there were data event listeners added, then switch to old mode.
	    if (EE.listenerCount(src, 'data') > 0)
	      emitDataEvents(src);
	    return;
	  }

	  // at this point, no one needed a drain, so we just ran out of data
	  // on the next readable event, start it over again.
	  state.ranOut = true;
	}

	function pipeOnReadable() {
	  if (this._readableState.ranOut) {
	    this._readableState.ranOut = false;
	    flow(this);
	  }
	}


	Readable.prototype.unpipe = function(dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0)
	    return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes)
	      return this;

	    if (!dest)
	      dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    this.removeListener('readable', pipeOnReadable);
	    state.flowing = false;
	    if (dest)
	      dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    this.removeListener('readable', pipeOnReadable);
	    state.flowing = false;

	    for (var i = 0; i < len; i++)
	      dests[i].emit('unpipe', this);
	    return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1)
	    return this;

	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1)
	    state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function(ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);

	  if (ev === 'data' && !this._readableState.flowing)
	    emitDataEvents(this);

	  if (ev === 'readable' && this.readable) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        this.read(0);
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function() {
	  emitDataEvents(this);
	  this.read(0);
	  this.emit('resume');
	};

	Readable.prototype.pause = function() {
	  emitDataEvents(this, true);
	  this.emit('pause');
	};

	function emitDataEvents(stream, startPaused) {
	  var state = stream._readableState;

	  if (state.flowing) {
	    // https://github.com/isaacs/readable-stream/issues/16
	    throw new Error('Cannot switch to old mode now.');
	  }

	  var paused = startPaused || false;
	  var readable = false;

	  // convert to an old-style stream.
	  stream.readable = true;
	  stream.pipe = Stream.prototype.pipe;
	  stream.on = stream.addListener = Stream.prototype.on;

	  stream.on('readable', function() {
	    readable = true;

	    var c;
	    while (!paused && (null !== (c = stream.read())))
	      stream.emit('data', c);

	    if (c === null) {
	      readable = false;
	      stream._readableState.needReadable = true;
	    }
	  });

	  stream.pause = function() {
	    paused = true;
	    this.emit('pause');
	  };

	  stream.resume = function() {
	    paused = false;
	    if (readable)
	      process.nextTick(function() {
	        stream.emit('readable');
	      });
	    else
	      this.read(0);
	    this.emit('resume');
	  };

	  // now make it start, just in case it hadn't already.
	  stream.emit('readable');
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function(stream) {
	  var state = this._readableState;
	  var paused = false;

	  var self = this;
	  stream.on('end', function() {
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length)
	        self.push(chunk);
	    }

	    self.push(null);
	  });

	  stream.on('data', function(chunk) {
	    if (state.decoder)
	      chunk = state.decoder.write(chunk);

	    // don't skip over falsy values in objectMode
	    //if (state.objectMode && util.isNullOrUndefined(chunk))
	    if (state.objectMode && (chunk === null || chunk === undefined))
	      return;
	    else if (!state.objectMode && (!chunk || !chunk.length))
	      return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (typeof stream[i] === 'function' &&
	        typeof this[i] === 'undefined') {
	      this[i] = function(method) { return function() {
	        return stream[method].apply(stream, arguments);
	      }}(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function(ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function(n) {
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};



	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;

	  // nothing in the list, definitely empty.
	  if (list.length === 0)
	    return null;

	  if (length === 0)
	    ret = null;
	  else if (objectMode)
	    ret = list.shift();
	  else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode)
	      ret = list.join('');
	    else
	      ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode)
	        ret = '';
	      else
	        ret = new Buffer(n);

	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);

	        if (stringMode)
	          ret += buf.slice(0, cpy);
	        else
	          buf.copy(ret, c, 0, cpy);

	        if (cpy < buf.length)
	          list[0] = buf.slice(cpy);
	        else
	          list.shift();

	        c += cpy;
	      }
	    }
	  }

	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0)
	    throw new Error('endReadable called on non-empty stream');

	  if (!state.endEmitted && state.calledRead) {
	    state.ended = true;
	    process.nextTick(function() {
	      // Check that we didn't get one last unshift.
	      if (!state.endEmitted && state.length === 0) {
	        state.endEmitted = true;
	        stream.readable = false;
	        stream.emit('end');
	      }
	    });
	  }
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf (xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}


/***/ }),
/* 61 */
/***/ (function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ }),
/* 62 */
/***/ (function(module, exports) {

	module.exports = require("buffer");

/***/ }),
/* 63 */
/***/ (function(module, exports) {

	module.exports = require("events");

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var Buffer = __webpack_require__(62).Buffer;

	var isBufferEncoding = Buffer.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     }


	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	var StringDecoder = exports.StringDecoder = function(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }

	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	};


	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = (buffer.length >= this.charLength - this.charReceived) ?
	        this.charLength - this.charReceived :
	        buffer.length;

	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;

	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }

	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);

	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;

	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }

	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);

	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }

	  charStr += buffer.toString(this.encoding, 0, end);

	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }

	  // or just emit the charStr
	  return charStr;
	};

	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;

	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];

	    // See http://en.wikipedia.org/wiki/UTF-8#Description

	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }

	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }

	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};

	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);

	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }

	  return res;
	};

	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}

	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}

	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, cb), and it'll handle all
	// the drain event emission and buffering.

	module.exports = Writable;

	/*<replacement>*/
	var Buffer = __webpack_require__(62).Buffer;
	/*</replacement>*/

	Writable.WritableState = WritableState;


	/*<replacement>*/
	var util = __webpack_require__(57);
	util.inherits = __webpack_require__(58);
	/*</replacement>*/

	var Stream = __webpack_require__(17);

	util.inherits(Writable, Stream);

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	}

	function WritableState(options, stream) {
	  options = options || {};

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : 16 * 1024;

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, becuase any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function(er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.buffer = [];

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	}

	function Writable(options) {
	  var Duplex = __webpack_require__(56);

	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex))
	    return new Writable(options);

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function() {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};


	function writeAfterEnd(stream, state, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  process.nextTick(function() {
	    cb(er);
	  });
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  if (!Buffer.isBuffer(chunk) &&
	      'string' !== typeof chunk &&
	      chunk !== null &&
	      chunk !== undefined &&
	      !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    process.nextTick(function() {
	      cb(er);
	    });
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function(chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (Buffer.isBuffer(chunk))
	    encoding = 'buffer';
	  else if (!encoding)
	    encoding = state.defaultEncoding;

	  if (typeof cb !== 'function')
	    cb = function() {};

	  if (state.ended)
	    writeAfterEnd(this, state, cb);
	  else if (validChunk(this, state, chunk, cb))
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);

	  return ret;
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode &&
	      state.decodeStrings !== false &&
	      typeof chunk === 'string') {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (Buffer.isBuffer(chunk))
	    encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret)
	    state.needDrain = true;

	  if (state.writing)
	    state.buffer.push(new WriteReq(chunk, encoding, cb));
	  else
	    doWrite(stream, state, len, chunk, encoding, cb);

	  return ret;
	}

	function doWrite(stream, state, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  if (sync)
	    process.nextTick(function() {
	      cb(er);
	    });
	  else
	    cb(er);

	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er)
	    onwriteError(stream, state, sync, er, cb);
	  else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(stream, state);

	    if (!finished && !state.bufferProcessing && state.buffer.length)
	      clearBuffer(stream, state);

	    if (sync) {
	      process.nextTick(function() {
	        afterWrite(stream, state, finished, cb);
	      });
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished)
	    onwriteDrain(stream, state);
	  cb();
	  if (finished)
	    finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}


	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;

	  for (var c = 0; c < state.buffer.length; c++) {
	    var entry = state.buffer[c];
	    var chunk = entry.chunk;
	    var encoding = entry.encoding;
	    var cb = entry.callback;
	    var len = state.objectMode ? 1 : chunk.length;

	    doWrite(stream, state, len, chunk, encoding, cb);

	    // if we didn't call the onwrite immediately, then
	    // it means that we need to wait until it does.
	    // also, that means that the chunk and cb are currently
	    // being processed, so move the buffer counter past them.
	    if (state.writing) {
	      c++;
	      break;
	    }
	  }

	  state.bufferProcessing = false;
	  if (c < state.buffer.length)
	    state.buffer = state.buffer.slice(c);
	  else
	    state.buffer.length = 0;
	}

	Writable.prototype._write = function(chunk, encoding, cb) {
	  cb(new Error('not implemented'));
	};

	Writable.prototype.end = function(chunk, encoding, cb) {
	  var state = this._writableState;

	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (typeof chunk !== 'undefined' && chunk !== null)
	    this.write(chunk, encoding);

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished)
	    endWritable(this, state, cb);
	};


	function needFinish(stream, state) {
	  return (state.ending &&
	          state.length === 0 &&
	          !state.finished &&
	          !state.writing);
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(stream, state);
	  if (need) {
	    state.finished = true;
	    stream.emit('finish');
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished)
	      process.nextTick(cb);
	    else
	      stream.once('finish', cb);
	  }
	  state.ended = true;
	}


/***/ }),
/* 66 */
/***/ (function(module, exports) {

	module.exports = require("zlib");

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	var Chainsaw = __webpack_require__(68);
	var EventEmitter = __webpack_require__(63).EventEmitter;
	var Buffers = __webpack_require__(70);
	var Vars = __webpack_require__(71);
	var Stream = __webpack_require__(17).Stream;

	exports = module.exports = function (bufOrEm, eventName) {
	    if (Buffer.isBuffer(bufOrEm)) {
	        return exports.parse(bufOrEm);
	    }
	    
	    var s = exports.stream();
	    if (bufOrEm && bufOrEm.pipe) {
	        bufOrEm.pipe(s);
	    }
	    else if (bufOrEm) {
	        bufOrEm.on(eventName || 'data', function (buf) {
	            s.write(buf);
	        });
	        
	        bufOrEm.on('end', function () {
	            s.end();
	        });
	    }
	    return s;
	};

	exports.stream = function (input) {
	    if (input) return exports.apply(null, arguments);
	    
	    var pending = null;
	    function getBytes (bytes, cb, skip) {
	        pending = {
	            bytes : bytes,
	            skip : skip,
	            cb : function (buf) {
	                pending = null;
	                cb(buf);
	            },
	        };
	        dispatch();
	    }
	    
	    var offset = null;
	    function dispatch () {
	        if (!pending) {
	            if (caughtEnd) done = true;
	            return;
	        }
	        if (typeof pending === 'function') {
	            pending();
	        }
	        else {
	            var bytes = offset + pending.bytes;
	            
	            if (buffers.length >= bytes) {
	                var buf;
	                if (offset == null) {
	                    buf = buffers.splice(0, bytes);
	                    if (!pending.skip) {
	                        buf = buf.slice();
	                    }
	                }
	                else {
	                    if (!pending.skip) {
	                        buf = buffers.slice(offset, bytes);
	                    }
	                    offset = bytes;
	                }
	                
	                if (pending.skip) {
	                    pending.cb();
	                }
	                else {
	                    pending.cb(buf);
	                }
	            }
	        }
	    }
	    
	    function builder (saw) {
	        function next () { if (!done) saw.next() }
	        
	        var self = words(function (bytes, cb) {
	            return function (name) {
	                getBytes(bytes, function (buf) {
	                    vars.set(name, cb(buf));
	                    next();
	                });
	            };
	        });
	        
	        self.tap = function (cb) {
	            saw.nest(cb, vars.store);
	        };
	        
	        self.into = function (key, cb) {
	            if (!vars.get(key)) vars.set(key, {});
	            var parent = vars;
	            vars = Vars(parent.get(key));
	            
	            saw.nest(function () {
	                cb.apply(this, arguments);
	                this.tap(function () {
	                    vars = parent;
	                });
	            }, vars.store);
	        };
	        
	        self.flush = function () {
	            vars.store = {};
	            next();
	        };
	        
	        self.loop = function (cb) {
	            var end = false;
	            
	            saw.nest(false, function loop () {
	                this.vars = vars.store;
	                cb.call(this, function () {
	                    end = true;
	                    next();
	                }, vars.store);
	                this.tap(function () {
	                    if (end) saw.next()
	                    else loop.call(this)
	                }.bind(this));
	            }, vars.store);
	        };
	        
	        self.buffer = function (name, bytes) {
	            if (typeof bytes === 'string') {
	                bytes = vars.get(bytes);
	            }
	            
	            getBytes(bytes, function (buf) {
	                vars.set(name, buf);
	                next();
	            });
	        };
	        
	        self.skip = function (bytes) {
	            if (typeof bytes === 'string') {
	                bytes = vars.get(bytes);
	            }
	            
	            getBytes(bytes, function () {
	                next();
	            });
	        };
	        
	        self.scan = function find (name, search) {
	            if (typeof search === 'string') {
	                search = new Buffer(search);
	            }
	            else if (!Buffer.isBuffer(search)) {
	                throw new Error('search must be a Buffer or a string');
	            }
	            
	            var taken = 0;
	            pending = function () {
	                var pos = buffers.indexOf(search, offset + taken);
	                var i = pos-offset-taken;
	                if (pos !== -1) {
	                    pending = null;
	                    if (offset != null) {
	                        vars.set(
	                            name,
	                            buffers.slice(offset, offset + taken + i)
	                        );
	                        offset += taken + i + search.length;
	                    }
	                    else {
	                        vars.set(
	                            name,
	                            buffers.slice(0, taken + i)
	                        );
	                        buffers.splice(0, taken + i + search.length);
	                    }
	                    next();
	                    dispatch();
	                } else {
	                    i = Math.max(buffers.length - search.length - offset - taken, 0);
					}
	                taken += i;
	            };
	            dispatch();
	        };
	        
	        self.peek = function (cb) {
	            offset = 0;
	            saw.nest(function () {
	                cb.call(this, vars.store);
	                this.tap(function () {
	                    offset = null;
	                });
	            });
	        };
	        
	        return self;
	    };
	    
	    var stream = Chainsaw.light(builder);
	    stream.writable = true;
	    
	    var buffers = Buffers();
	    
	    stream.write = function (buf) {
	        buffers.push(buf);
	        dispatch();
	    };
	    
	    var vars = Vars();
	    
	    var done = false, caughtEnd = false;
	    stream.end = function () {
	        caughtEnd = true;
	    };
	    
	    stream.pipe = Stream.prototype.pipe;
	    Object.getOwnPropertyNames(EventEmitter.prototype).forEach(function (name) {
	        stream[name] = EventEmitter.prototype[name];
	    });
	    
	    return stream;
	};

	exports.parse = function parse (buffer) {
	    var self = words(function (bytes, cb) {
	        return function (name) {
	            if (offset + bytes <= buffer.length) {
	                var buf = buffer.slice(offset, offset + bytes);
	                offset += bytes;
	                vars.set(name, cb(buf));
	            }
	            else {
	                vars.set(name, null);
	            }
	            return self;
	        };
	    });
	    
	    var offset = 0;
	    var vars = Vars();
	    self.vars = vars.store;
	    
	    self.tap = function (cb) {
	        cb.call(self, vars.store);
	        return self;
	    };
	    
	    self.into = function (key, cb) {
	        if (!vars.get(key)) {
	            vars.set(key, {});
	        }
	        var parent = vars;
	        vars = Vars(parent.get(key));
	        cb.call(self, vars.store);
	        vars = parent;
	        return self;
	    };
	    
	    self.loop = function (cb) {
	        var end = false;
	        var ender = function () { end = true };
	        while (end === false) {
	            cb.call(self, ender, vars.store);
	        }
	        return self;
	    };
	    
	    self.buffer = function (name, size) {
	        if (typeof size === 'string') {
	            size = vars.get(size);
	        }
	        var buf = buffer.slice(offset, Math.min(buffer.length, offset + size));
	        offset += size;
	        vars.set(name, buf);
	        
	        return self;
	    };
	    
	    self.skip = function (bytes) {
	        if (typeof bytes === 'string') {
	            bytes = vars.get(bytes);
	        }
	        offset += bytes;
	        
	        return self;
	    };
	    
	    self.scan = function (name, search) {
	        if (typeof search === 'string') {
	            search = new Buffer(search);
	        }
	        else if (!Buffer.isBuffer(search)) {
	            throw new Error('search must be a Buffer or a string');
	        }
	        vars.set(name, null);
	        
	        // simple but slow string search
	        for (var i = 0; i + offset <= buffer.length - search.length + 1; i++) {
	            for (
	                var j = 0;
	                j < search.length && buffer[offset+i+j] === search[j];
	                j++
	            );
	            if (j === search.length) break;
	        }
	        
	        vars.set(name, buffer.slice(offset, offset + i));
	        offset += i + search.length;
	        return self;
	    };
	    
	    self.peek = function (cb) {
	        var was = offset;
	        cb.call(self, vars.store);
	        offset = was;
	        return self;
	    };
	    
	    self.flush = function () {
	        vars.store = {};
	        return self;
	    };
	    
	    self.eof = function () {
	        return offset >= buffer.length;
	    };
	    
	    return self;
	};

	// convert byte strings to unsigned little endian numbers
	function decodeLEu (bytes) {
	    var acc = 0;
	    for (var i = 0; i < bytes.length; i++) {
	        acc += Math.pow(256,i) * bytes[i];
	    }
	    return acc;
	}

	// convert byte strings to unsigned big endian numbers
	function decodeBEu (bytes) {
	    var acc = 0;
	    for (var i = 0; i < bytes.length; i++) {
	        acc += Math.pow(256, bytes.length - i - 1) * bytes[i];
	    }
	    return acc;
	}

	// convert byte strings to signed big endian numbers
	function decodeBEs (bytes) {
	    var val = decodeBEu(bytes);
	    if ((bytes[0] & 0x80) == 0x80) {
	        val -= Math.pow(256, bytes.length);
	    }
	    return val;
	}

	// convert byte strings to signed little endian numbers
	function decodeLEs (bytes) {
	    var val = decodeLEu(bytes);
	    if ((bytes[bytes.length - 1] & 0x80) == 0x80) {
	        val -= Math.pow(256, bytes.length);
	    }
	    return val;
	}

	function words (decode) {
	    var self = {};
	    
	    [ 1, 2, 4, 8 ].forEach(function (bytes) {
	        var bits = bytes * 8;
	        
	        self['word' + bits + 'le']
	        = self['word' + bits + 'lu']
	        = decode(bytes, decodeLEu);
	        
	        self['word' + bits + 'ls']
	        = decode(bytes, decodeLEs);
	        
	        self['word' + bits + 'be']
	        = self['word' + bits + 'bu']
	        = decode(bytes, decodeBEu);
	        
	        self['word' + bits + 'bs']
	        = decode(bytes, decodeBEs);
	    });
	    
	    // word8be(n) == word8le(n) for all n
	    self.word8 = self.word8u = self.word8be;
	    self.word8s = self.word8bs;
	    
	    return self;
	}


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	var Traverse = __webpack_require__(69);
	var EventEmitter = __webpack_require__(63).EventEmitter;

	module.exports = Chainsaw;
	function Chainsaw (builder) {
	    var saw = Chainsaw.saw(builder, {});
	    var r = builder.call(saw.handlers, saw);
	    if (r !== undefined) saw.handlers = r;
	    saw.record();
	    return saw.chain();
	};

	Chainsaw.light = function ChainsawLight (builder) {
	    var saw = Chainsaw.saw(builder, {});
	    var r = builder.call(saw.handlers, saw);
	    if (r !== undefined) saw.handlers = r;
	    return saw.chain();
	};

	Chainsaw.saw = function (builder, handlers) {
	    var saw = new EventEmitter;
	    saw.handlers = handlers;
	    saw.actions = [];

	    saw.chain = function () {
	        var ch = Traverse(saw.handlers).map(function (node) {
	            if (this.isRoot) return node;
	            var ps = this.path;

	            if (typeof node === 'function') {
	                this.update(function () {
	                    saw.actions.push({
	                        path : ps,
	                        args : [].slice.call(arguments)
	                    });
	                    return ch;
	                });
	            }
	        });

	        process.nextTick(function () {
	            saw.emit('begin');
	            saw.next();
	        });

	        return ch;
	    };

	    saw.pop = function () {
	        return saw.actions.shift();
	    };

	    saw.next = function () {
	        var action = saw.pop();

	        if (!action) {
	            saw.emit('end');
	        }
	        else if (!action.trap) {
	            var node = saw.handlers;
	            action.path.forEach(function (key) { node = node[key] });
	            node.apply(saw.handlers, action.args);
	        }
	    };

	    saw.nest = function (cb) {
	        var args = [].slice.call(arguments, 1);
	        var autonext = true;

	        if (typeof cb === 'boolean') {
	            var autonext = cb;
	            cb = args.shift();
	        }

	        var s = Chainsaw.saw(builder, {});
	        var r = builder.call(s.handlers, s);

	        if (r !== undefined) s.handlers = r;

	        // If we are recording...
	        if ("undefined" !== typeof saw.step) {
	            // ... our children should, too
	            s.record();
	        }

	        cb.apply(s.chain(), args);
	        if (autonext !== false) s.on('end', saw.next);
	    };

	    saw.record = function () {
	        upgradeChainsaw(saw);
	    };

	    ['trap', 'down', 'jump'].forEach(function (method) {
	        saw[method] = function () {
	            throw new Error("To use the trap, down and jump features, please "+
	                            "call record() first to start recording actions.");
	        };
	    });

	    return saw;
	};

	function upgradeChainsaw(saw) {
	    saw.step = 0;

	    // override pop
	    saw.pop = function () {
	        return saw.actions[saw.step++];
	    };

	    saw.trap = function (name, cb) {
	        var ps = Array.isArray(name) ? name : [name];
	        saw.actions.push({
	            path : ps,
	            step : saw.step,
	            cb : cb,
	            trap : true
	        });
	    };

	    saw.down = function (name) {
	        var ps = (Array.isArray(name) ? name : [name]).join('/');
	        var i = saw.actions.slice(saw.step).map(function (x) {
	            if (x.trap && x.step <= saw.step) return false;
	            return x.path.join('/') == ps;
	        }).indexOf(true);

	        if (i >= 0) saw.step += i;
	        else saw.step = saw.actions.length;

	        var act = saw.actions[saw.step - 1];
	        if (act && act.trap) {
	            // It's a trap!
	            saw.step = act.step;
	            act.cb();
	        }
	        else saw.next();
	    };

	    saw.jump = function (step) {
	        saw.step = step;
	        saw.next();
	    };
	};


/***/ }),
/* 69 */
/***/ (function(module, exports) {

	module.exports = Traverse;
	function Traverse (obj) {
	    if (!(this instanceof Traverse)) return new Traverse(obj);
	    this.value = obj;
	}

	Traverse.prototype.get = function (ps) {
	    var node = this.value;
	    for (var i = 0; i < ps.length; i ++) {
	        var key = ps[i];
	        if (!Object.hasOwnProperty.call(node, key)) {
	            node = undefined;
	            break;
	        }
	        node = node[key];
	    }
	    return node;
	};

	Traverse.prototype.set = function (ps, value) {
	    var node = this.value;
	    for (var i = 0; i < ps.length - 1; i ++) {
	        var key = ps[i];
	        if (!Object.hasOwnProperty.call(node, key)) node[key] = {};
	        node = node[key];
	    }
	    node[ps[i]] = value;
	    return value;
	};

	Traverse.prototype.map = function (cb) {
	    return walk(this.value, cb, true);
	};

	Traverse.prototype.forEach = function (cb) {
	    this.value = walk(this.value, cb, false);
	    return this.value;
	};

	Traverse.prototype.reduce = function (cb, init) {
	    var skip = arguments.length === 1;
	    var acc = skip ? this.value : init;
	    this.forEach(function (x) {
	        if (!this.isRoot || !skip) {
	            acc = cb.call(this, acc, x);
	        }
	    });
	    return acc;
	};

	Traverse.prototype.deepEqual = function (obj) {
	    if (arguments.length !== 1) {
	        throw new Error(
	            'deepEqual requires exactly one object to compare against'
	        );
	    }
	    
	    var equal = true;
	    var node = obj;
	    
	    this.forEach(function (y) {
	        var notEqual = (function () {
	            equal = false;
	            //this.stop();
	            return undefined;
	        }).bind(this);
	        
	        //if (node === undefined || node === null) return notEqual();
	        
	        if (!this.isRoot) {
	        /*
	            if (!Object.hasOwnProperty.call(node, this.key)) {
	                return notEqual();
	            }
	        */
	            if (typeof node !== 'object') return notEqual();
	            node = node[this.key];
	        }
	        
	        var x = node;
	        
	        this.post(function () {
	            node = x;
	        });
	        
	        var toS = function (o) {
	            return Object.prototype.toString.call(o);
	        };
	        
	        if (this.circular) {
	            if (Traverse(obj).get(this.circular.path) !== x) notEqual();
	        }
	        else if (typeof x !== typeof y) {
	            notEqual();
	        }
	        else if (x === null || y === null || x === undefined || y === undefined) {
	            if (x !== y) notEqual();
	        }
	        else if (x.__proto__ !== y.__proto__) {
	            notEqual();
	        }
	        else if (x === y) {
	            // nop
	        }
	        else if (typeof x === 'function') {
	            if (x instanceof RegExp) {
	                // both regexps on account of the __proto__ check
	                if (x.toString() != y.toString()) notEqual();
	            }
	            else if (x !== y) notEqual();
	        }
	        else if (typeof x === 'object') {
	            if (toS(y) === '[object Arguments]'
	            || toS(x) === '[object Arguments]') {
	                if (toS(x) !== toS(y)) {
	                    notEqual();
	                }
	            }
	            else if (x instanceof Date || y instanceof Date) {
	                if (!(x instanceof Date) || !(y instanceof Date)
	                || x.getTime() !== y.getTime()) {
	                    notEqual();
	                }
	            }
	            else {
	                var kx = Object.keys(x);
	                var ky = Object.keys(y);
	                if (kx.length !== ky.length) return notEqual();
	                for (var i = 0; i < kx.length; i++) {
	                    var k = kx[i];
	                    if (!Object.hasOwnProperty.call(y, k)) {
	                        notEqual();
	                    }
	                }
	            }
	        }
	    });
	    
	    return equal;
	};

	Traverse.prototype.paths = function () {
	    var acc = [];
	    this.forEach(function (x) {
	        acc.push(this.path); 
	    });
	    return acc;
	};

	Traverse.prototype.nodes = function () {
	    var acc = [];
	    this.forEach(function (x) {
	        acc.push(this.node);
	    });
	    return acc;
	};

	Traverse.prototype.clone = function () {
	    var parents = [], nodes = [];
	    
	    return (function clone (src) {
	        for (var i = 0; i < parents.length; i++) {
	            if (parents[i] === src) {
	                return nodes[i];
	            }
	        }
	        
	        if (typeof src === 'object' && src !== null) {
	            var dst = copy(src);
	            
	            parents.push(src);
	            nodes.push(dst);
	            
	            Object.keys(src).forEach(function (key) {
	                dst[key] = clone(src[key]);
	            });
	            
	            parents.pop();
	            nodes.pop();
	            return dst;
	        }
	        else {
	            return src;
	        }
	    })(this.value);
	};

	function walk (root, cb, immutable) {
	    var path = [];
	    var parents = [];
	    var alive = true;
	    
	    return (function walker (node_) {
	        var node = immutable ? copy(node_) : node_;
	        var modifiers = {};
	        
	        var state = {
	            node : node,
	            node_ : node_,
	            path : [].concat(path),
	            parent : parents.slice(-1)[0],
	            key : path.slice(-1)[0],
	            isRoot : path.length === 0,
	            level : path.length,
	            circular : null,
	            update : function (x) {
	                if (!state.isRoot) {
	                    state.parent.node[state.key] = x;
	                }
	                state.node = x;
	            },
	            'delete' : function () {
	                delete state.parent.node[state.key];
	            },
	            remove : function () {
	                if (Array.isArray(state.parent.node)) {
	                    state.parent.node.splice(state.key, 1);
	                }
	                else {
	                    delete state.parent.node[state.key];
	                }
	            },
	            before : function (f) { modifiers.before = f },
	            after : function (f) { modifiers.after = f },
	            pre : function (f) { modifiers.pre = f },
	            post : function (f) { modifiers.post = f },
	            stop : function () { alive = false }
	        };
	        
	        if (!alive) return state;
	        
	        if (typeof node === 'object' && node !== null) {
	            state.isLeaf = Object.keys(node).length == 0;
	            
	            for (var i = 0; i < parents.length; i++) {
	                if (parents[i].node_ === node_) {
	                    state.circular = parents[i];
	                    break;
	                }
	            }
	        }
	        else {
	            state.isLeaf = true;
	        }
	        
	        state.notLeaf = !state.isLeaf;
	        state.notRoot = !state.isRoot;
	        
	        // use return values to update if defined
	        var ret = cb.call(state, state.node);
	        if (ret !== undefined && state.update) state.update(ret);
	        if (modifiers.before) modifiers.before.call(state, state.node);
	        
	        if (typeof state.node == 'object'
	        && state.node !== null && !state.circular) {
	            parents.push(state);
	            
	            var keys = Object.keys(state.node);
	            keys.forEach(function (key, i) {
	                path.push(key);
	                
	                if (modifiers.pre) modifiers.pre.call(state, state.node[key], key);
	                
	                var child = walker(state.node[key]);
	                if (immutable && Object.hasOwnProperty.call(state.node, key)) {
	                    state.node[key] = child.node;
	                }
	                
	                child.isLast = i == keys.length - 1;
	                child.isFirst = i == 0;
	                
	                if (modifiers.post) modifiers.post.call(state, child);
	                
	                path.pop();
	            });
	            parents.pop();
	        }
	        
	        if (modifiers.after) modifiers.after.call(state, state.node);
	        
	        return state;
	    })(root).node;
	}

	Object.keys(Traverse.prototype).forEach(function (key) {
	    Traverse[key] = function (obj) {
	        var args = [].slice.call(arguments, 1);
	        var t = Traverse(obj);
	        return t[key].apply(t, args);
	    };
	});

	function copy (src) {
	    if (typeof src === 'object' && src !== null) {
	        var dst;
	        
	        if (Array.isArray(src)) {
	            dst = [];
	        }
	        else if (src instanceof Date) {
	            dst = new Date(src);
	        }
	        else if (src instanceof Boolean) {
	            dst = new Boolean(src);
	        }
	        else if (src instanceof Number) {
	            dst = new Number(src);
	        }
	        else if (src instanceof String) {
	            dst = new String(src);
	        }
	        else {
	            dst = Object.create(Object.getPrototypeOf(src));
	        }
	        
	        Object.keys(src).forEach(function (key) {
	            dst[key] = src[key];
	        });
	        return dst;
	    }
	    else return src;
	}


/***/ }),
/* 70 */
/***/ (function(module, exports) {

	module.exports = Buffers;

	function Buffers (bufs) {
	    if (!(this instanceof Buffers)) return new Buffers(bufs);
	    this.buffers = bufs || [];
	    this.length = this.buffers.reduce(function (size, buf) {
	        return size + buf.length
	    }, 0);
	}

	Buffers.prototype.push = function () {
	    for (var i = 0; i < arguments.length; i++) {
	        if (!Buffer.isBuffer(arguments[i])) {
	            throw new TypeError('Tried to push a non-buffer');
	        }
	    }
	    
	    for (var i = 0; i < arguments.length; i++) {
	        var buf = arguments[i];
	        this.buffers.push(buf);
	        this.length += buf.length;
	    }
	    return this.length;
	};

	Buffers.prototype.unshift = function () {
	    for (var i = 0; i < arguments.length; i++) {
	        if (!Buffer.isBuffer(arguments[i])) {
	            throw new TypeError('Tried to unshift a non-buffer');
	        }
	    }
	    
	    for (var i = 0; i < arguments.length; i++) {
	        var buf = arguments[i];
	        this.buffers.unshift(buf);
	        this.length += buf.length;
	    }
	    return this.length;
	};

	Buffers.prototype.copy = function (dst, dStart, start, end) {
	    return this.slice(start, end).copy(dst, dStart, 0, end - start);
	};

	Buffers.prototype.splice = function (i, howMany) {
	    var buffers = this.buffers;
	    var index = i >= 0 ? i : this.length - i;
	    var reps = [].slice.call(arguments, 2);
	    
	    if (howMany === undefined) {
	        howMany = this.length - index;
	    }
	    else if (howMany > this.length - index) {
	        howMany = this.length - index;
	    }
	    
	    for (var i = 0; i < reps.length; i++) {
	        this.length += reps[i].length;
	    }
	    
	    var removed = new Buffers();
	    var bytes = 0;
	    
	    var startBytes = 0;
	    for (
	        var ii = 0;
	        ii < buffers.length && startBytes + buffers[ii].length < index;
	        ii ++
	    ) { startBytes += buffers[ii].length }
	    
	    if (index - startBytes > 0) {
	        var start = index - startBytes;
	        
	        if (start + howMany < buffers[ii].length) {
	            removed.push(buffers[ii].slice(start, start + howMany));
	            
	            var orig = buffers[ii];
	            //var buf = new Buffer(orig.length - howMany);
	            var buf0 = new Buffer(start);
	            for (var i = 0; i < start; i++) {
	                buf0[i] = orig[i];
	            }
	            
	            var buf1 = new Buffer(orig.length - start - howMany);
	            for (var i = start + howMany; i < orig.length; i++) {
	                buf1[ i - howMany - start ] = orig[i]
	            }
	            
	            if (reps.length > 0) {
	                var reps_ = reps.slice();
	                reps_.unshift(buf0);
	                reps_.push(buf1);
	                buffers.splice.apply(buffers, [ ii, 1 ].concat(reps_));
	                ii += reps_.length;
	                reps = [];
	            }
	            else {
	                buffers.splice(ii, 1, buf0, buf1);
	                //buffers[ii] = buf;
	                ii += 2;
	            }
	        }
	        else {
	            removed.push(buffers[ii].slice(start));
	            buffers[ii] = buffers[ii].slice(0, start);
	            ii ++;
	        }
	    }
	    
	    if (reps.length > 0) {
	        buffers.splice.apply(buffers, [ ii, 0 ].concat(reps));
	        ii += reps.length;
	    }
	    
	    while (removed.length < howMany) {
	        var buf = buffers[ii];
	        var len = buf.length;
	        var take = Math.min(len, howMany - removed.length);
	        
	        if (take === len) {
	            removed.push(buf);
	            buffers.splice(ii, 1);
	        }
	        else {
	            removed.push(buf.slice(0, take));
	            buffers[ii] = buffers[ii].slice(take);
	        }
	    }
	    
	    this.length -= removed.length;
	    
	    return removed;
	};
	 
	Buffers.prototype.slice = function (i, j) {
	    var buffers = this.buffers;
	    if (j === undefined) j = this.length;
	    if (i === undefined) i = 0;
	    
	    if (j > this.length) j = this.length;
	    
	    var startBytes = 0;
	    for (
	        var si = 0;
	        si < buffers.length && startBytes + buffers[si].length <= i;
	        si ++
	    ) { startBytes += buffers[si].length }
	    
	    var target = new Buffer(j - i);
	    
	    var ti = 0;
	    for (var ii = si; ti < j - i && ii < buffers.length; ii++) {
	        var len = buffers[ii].length;
	        
	        var start = ti === 0 ? i - startBytes : 0;
	        var end = ti + len >= j - i
	            ? Math.min(start + (j - i) - ti, len)
	            : len
	        ;
	        
	        buffers[ii].copy(target, ti, start, end);
	        ti += end - start;
	    }
	    
	    return target;
	};

	Buffers.prototype.pos = function (i) {
	    if (i < 0 || i >= this.length) throw new Error('oob');
	    var l = i, bi = 0, bu = null;
	    for (;;) {
	        bu = this.buffers[bi];
	        if (l < bu.length) {
	            return {buf: bi, offset: l};
	        } else {
	            l -= bu.length;
	        }
	        bi++;
	    }
	};

	Buffers.prototype.get = function get (i) {
	    var pos = this.pos(i);

	    return this.buffers[pos.buf].get(pos.offset);
	};

	Buffers.prototype.set = function set (i, b) {
	    var pos = this.pos(i);

	    return this.buffers[pos.buf].set(pos.offset, b);
	};

	Buffers.prototype.indexOf = function (needle, offset) {
	    if ("string" === typeof needle) {
	        needle = new Buffer(needle);
	    } else if (needle instanceof Buffer) {
	        // already a buffer
	    } else {
	        throw new Error('Invalid type for a search string');
	    }

	    if (!needle.length) {
	        return 0;
	    }

	    if (!this.length) {
	        return -1;
	    }

	    var i = 0, j = 0, match = 0, mstart, pos = 0;

	    // start search from a particular point in the virtual buffer
	    if (offset) {
	        var p = this.pos(offset);
	        i = p.buf;
	        j = p.offset;
	        pos = offset;
	    }

	    // for each character in virtual buffer
	    for (;;) {
	        while (j >= this.buffers[i].length) {
	            j = 0;
	            i++;

	            if (i >= this.buffers.length) {
	                // search string not found
	                return -1;
	            }
	        }

	        var char = this.buffers[i][j];

	        if (char == needle[match]) {
	            // keep track where match started
	            if (match == 0) {
	                mstart = {
	                    i: i,
	                    j: j,
	                    pos: pos
	                };
	            }
	            match++;
	            if (match == needle.length) {
	                // full match
	                return mstart.pos;
	            }
	        } else if (match != 0) {
	            // a partial match ended, go back to match starting position
	            // this will continue the search at the next character
	            i = mstart.i;
	            j = mstart.j;
	            pos = mstart.pos;
	            match = 0;
	        }

	        j++;
	        pos++;
	    }
	};

	Buffers.prototype.toBuffer = function() {
	    return this.slice();
	}

	Buffers.prototype.toString = function(encoding, start, end) {
	    return this.slice(start, end).toString(encoding);
	}


/***/ }),
/* 71 */
/***/ (function(module, exports) {

	module.exports = function (store) {
	    function getset (name, value) {
	        var node = vars.store;
	        var keys = name.split('.');
	        keys.slice(0,-1).forEach(function (k) {
	            if (node[k] === undefined) node[k] = {};
	            node = node[k]
	        });
	        var key = keys[keys.length - 1];
	        if (arguments.length == 1) {
	            return node[key];
	        }
	        else {
	            return node[key] = value;
	        }
	    }
	    
	    var vars = {
	        get : function (name) {
	            return getset(name);
	        },
	        set : function (name, value) {
	            return getset(name, value);
	        },
	        store : store || {},
	    };
	    return vars;
	};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = PullStream;

	__webpack_require__(53);
	var inherits = __webpack_require__(18).inherits;
	var PassThrough = __webpack_require__(73);
	var over = __webpack_require__(79);
	var SliceStream = __webpack_require__(80);

	function PullStream(opts) {
	  var self = this;
	  this.opts = opts || {};
	  PassThrough.call(this, opts);
	  this.once('finish', function() {
	    self._writesFinished = true;
	    if (self._flushed) {
	      self._finish();
	    }
	  });
	  this.on('readable', function() {
	    self._process();
	  });
	}
	inherits(PullStream, PassThrough);

	PullStream.prototype.pull = over([
	  [over.numberOptionalWithDefault(null), over.func, function (len, callback) {
	    if (len === 0) {
	      return callback(null, new Buffer(0));
	    }

	    var self = this;
	    pullServiceRequest();

	    function pullServiceRequest() {
	      self._serviceRequests = null;
	      if (self._flushed) {
	        return callback(new Error('End of Stream'));
	      }

	      var data = self.read(len || undefined);
	      if (data) {
	        setImmediate(callback.bind(null, null, data));
	      } else {
	        self._serviceRequests = pullServiceRequest;
	      }
	    }
	  }]
	]);

	PullStream.prototype.pullUpTo = over([
	  [over.numberOptionalWithDefault(null), function (len) {
	    var data = this.read(len);
	    if (len && !data) {
	      data = this.read();
	    }
	    return data;
	  }]
	]);

	PullStream.prototype.pipe = over([
	  [over.numberOptionalWithDefault(null), over.object, function (len, destStream) {
	    if (!len) {
	      return PassThrough.prototype.pipe.call(this, destStream);
	    }

	    if (len === 0) {
	      return destStream.end();
	    }


	    var pullstream = this;
	    pullstream
	      .pipe(new SliceStream({ length: len }, function (buf, sliceEnd, extra) {
	        if (!sliceEnd) {
	          return this.push(buf);
	        }
	        pullstream.unpipe();
	        pullstream.unshift(extra);
	        this.push(buf);
	        return this.push(null);
	      }))
	      .pipe(destStream);

	    return destStream;
	  }]
	]);

	PullStream.prototype._process = function () {
	  if (this._serviceRequests) {
	    this._serviceRequests();
	  }
	};

	PullStream.prototype.prepend = function (chunk) {
	  this.unshift(chunk);
	};

	PullStream.prototype.drain = function (len, callback) {
	  if (this._flushed) {
	    return callback(new Error('End of Stream'));
	  }

	  var data = this.pullUpTo(len);
	  var bytesDrained = data && data.length || 0;
	  if (bytesDrained === len) {
	     setImmediate(callback);
	  } else if (bytesDrained > 0) {
	    this.drain(len - bytesDrained, callback);
	  } else {
	    //internal buffer is empty, wait until data can be consumed
	    this.once('readable', this.drain.bind(this, len - bytesDrained, callback));
	  }
	};

	PullStream.prototype._flush = function (callback) {
	  var self = this;
	  if (this._readableState.length > 0) {
	    return setImmediate(self._flush.bind(self, callback));
	  }

	  this._flushed = true;
	  if (self._writesFinished) {
	    self._finish(callback);
	  } else {
	    callback();
	  }
	};

	PullStream.prototype._finish = function (callback) {
	  callback = callback || function () {};
	  if (this._serviceRequests) {
	    this._serviceRequests();
	  }
	  setImmediate(callback);
	};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(74)


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.

	module.exports = PassThrough;

	var Transform = __webpack_require__(75);

	/*<replacement>*/
	var util = __webpack_require__(57);
	util.inherits = __webpack_require__(58);
	/*</replacement>*/

	util.inherits(PassThrough, Transform);

	function PassThrough(options) {
	  if (!(this instanceof PassThrough))
	    return new PassThrough(options);

	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function(chunk, encoding, cb) {
	  cb(null, chunk);
	};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.


	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.

	module.exports = Transform;

	var Duplex = __webpack_require__(76);

	/*<replacement>*/
	var util = __webpack_require__(57);
	util.inherits = __webpack_require__(58);
	/*</replacement>*/

	util.inherits(Transform, Duplex);


	function TransformState(options, stream) {
	  this.afterTransform = function(er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb)
	    return stream.emit('error', new Error('no writecb in Transform class'));

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (data !== null && data !== undefined)
	    stream.push(data);

	  if (cb)
	    cb(er);

	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}


	function Transform(options) {
	  if (!(this instanceof Transform))
	    return new Transform(options);

	  Duplex.call(this, options);

	  var ts = this._transformState = new TransformState(options, this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  this.once('finish', function() {
	    if ('function' === typeof this._flush)
	      this._flush(function(er) {
	        done(stream, er);
	      });
	    else
	      done(stream);
	  });
	}

	Transform.prototype.push = function(chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function(chunk, encoding, cb) {
	  throw new Error('not implemented');
	};

	Transform.prototype._write = function(chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform ||
	        rs.needReadable ||
	        rs.length < rs.highWaterMark)
	      this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function(n) {
	  var ts = this._transformState;

	  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};


	function done(stream, er) {
	  if (er)
	    return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var rs = stream._readableState;
	  var ts = stream._transformState;

	  if (ws.length)
	    throw new Error('calling transform done when ws.length != 0');

	  if (ts.transforming)
	    throw new Error('calling transform done when still transforming');

	  return stream.push(null);
	}


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.

	module.exports = Duplex;

	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	/*</replacement>*/


	/*<replacement>*/
	var util = __webpack_require__(57);
	util.inherits = __webpack_require__(58);
	/*</replacement>*/

	var Readable = __webpack_require__(77);
	var Writable = __webpack_require__(78);

	util.inherits(Duplex, Readable);

	forEach(objectKeys(Writable.prototype), function(method) {
	  if (!Duplex.prototype[method])
	    Duplex.prototype[method] = Writable.prototype[method];
	});

	function Duplex(options) {
	  if (!(this instanceof Duplex))
	    return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false)
	    this.readable = false;

	  if (options && options.writable === false)
	    this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false)
	    this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended)
	    return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(this.end.bind(this));
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Readable;

	/*<replacement>*/
	var isArray = __webpack_require__(61);
	/*</replacement>*/


	/*<replacement>*/
	var Buffer = __webpack_require__(62).Buffer;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	var EE = __webpack_require__(63).EventEmitter;

	/*<replacement>*/
	if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	var Stream = __webpack_require__(17);

	/*<replacement>*/
	var util = __webpack_require__(57);
	util.inherits = __webpack_require__(58);
	/*</replacement>*/

	var StringDecoder;

	util.inherits(Readable, Stream);

	function ReadableState(options, stream) {
	  options = options || {};

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : 16 * 1024;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = false;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // In streams that never have any data, and do push(null) right away,
	  // the consumer can miss the 'end' event if they do some I/O before
	  // consuming the stream.  So, we don't emit('end') until some reading
	  // happens.
	  this.calledRead = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, becuase any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;


	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder)
	      StringDecoder = __webpack_require__(64).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  if (!(this instanceof Readable))
	    return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  Stream.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function(chunk, encoding) {
	  var state = this._readableState;

	  if (typeof chunk === 'string' && !state.objectMode) {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function(chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (chunk === null || chunk === undefined) {
	    state.reading = false;
	    if (!state.ended)
	      onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      if (state.decoder && !addToFront && !encoding)
	        chunk = state.decoder.write(chunk);

	      // update the buffer info.
	      state.length += state.objectMode ? 1 : chunk.length;
	      if (addToFront) {
	        state.buffer.unshift(chunk);
	      } else {
	        state.reading = false;
	        state.buffer.push(chunk);
	      }

	      if (state.needReadable)
	        emitReadable(stream);

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	}



	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended &&
	         (state.needReadable ||
	          state.length < state.highWaterMark ||
	          state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function(enc) {
	  if (!StringDecoder)
	    StringDecoder = __webpack_require__(64).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	};

	// Don't raise the hwm > 128MB
	var MAX_HWM = 0x800000;
	function roundUpToNextPowerOf2(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
	    n++;
	  }
	  return n;
	}

	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended)
	    return 0;

	  if (state.objectMode)
	    return n === 0 ? 0 : 1;

	  if (n === null || isNaN(n)) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length)
	      return state.buffer[0].length;
	    else
	      return state.length;
	  }

	  if (n <= 0)
	    return 0;

	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark)
	    state.highWaterMark = roundUpToNextPowerOf2(n);

	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else
	      return state.length;
	  }

	  return n;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function(n) {
	  var state = this._readableState;
	  state.calledRead = true;
	  var nOrig = n;
	  var ret;

	  if (typeof n !== 'number' || n > 0)
	    state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 &&
	      state.needReadable &&
	      (state.length >= state.highWaterMark || state.ended)) {
	    emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    ret = null;

	    // In cases where the decoder did not receive enough data
	    // to produce a full chunk, then immediately received an
	    // EOF, state.buffer will contain [<Buffer >, <Buffer 00 ...>].
	    // howMuchToRead will see this and coerce the amount to
	    // read to zero (because it's looking at the length of the
	    // first <Buffer > in state.buffer), and we'll end up here.
	    //
	    // This can only happen via state.decoder -- no other venue
	    // exists for pushing a zero-length chunk into state.buffer
	    // and triggering this behavior. In this case, we return our
	    // remaining data and end the stream, if appropriate.
	    if (state.length > 0 && state.decoder) {
	      ret = fromList(n, state);
	      state.length -= ret.length;
	    }

	    if (state.length === 0)
	      endReadable(this);

	    return ret;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length - n <= state.highWaterMark)
	    doRead = true;

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading)
	    doRead = false;

	  if (doRead) {
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0)
	      state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }

	  // If _read called its callback synchronously, then `reading`
	  // will be false, and we need to re-evaluate how much data we
	  // can return to the user.
	  if (doRead && !state.reading)
	    n = howMuchToRead(nOrig, state);

	  if (n > 0)
	    ret = fromList(n, state);
	  else
	    ret = null;

	  if (ret === null) {
	    state.needReadable = true;
	    n = 0;
	  }

	  state.length -= n;

	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended)
	    state.needReadable = true;

	  // If we happened to read() exactly the remaining amount in the
	  // buffer, and the EOF has been seen at this point, then make sure
	  // that we emit 'end' on the very next tick.
	  if (state.ended && !state.endEmitted && state.length === 0)
	    endReadable(this);

	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!Buffer.isBuffer(chunk) &&
	      'string' !== typeof chunk &&
	      chunk !== null &&
	      chunk !== undefined &&
	      !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}


	function onEofChunk(stream, state) {
	  if (state.decoder && !state.ended) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // if we've ended and we have some data left, then emit
	  // 'readable' now to make sure it gets picked up.
	  if (state.length > 0)
	    emitReadable(stream);
	  else
	    endReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (state.emittedReadable)
	    return;

	  state.emittedReadable = true;
	  if (state.sync)
	    process.nextTick(function() {
	      emitReadable_(stream);
	    });
	  else
	    emitReadable_(stream);
	}

	function emitReadable_(stream) {
	  stream.emit('readable');
	}


	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(function() {
	      maybeReadMore_(stream, state);
	    });
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended &&
	         state.length < state.highWaterMark) {
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;
	    else
	      len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function(n) {
	  this.emit('error', new Error('not implemented'));
	};

	Readable.prototype.pipe = function(dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;

	  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
	              dest !== process.stdout &&
	              dest !== process.stderr;

	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted)
	    process.nextTick(endFn);
	  else
	    src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    if (readable !== src) return;
	    cleanup();
	  }

	  function onend() {
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  function cleanup() {
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (!dest._writableState || dest._writableState.needDrain)
	      ondrain();
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EE.listenerCount(dest, 'error') === 0)
	      dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error)
	    dest.on('error', onerror);
	  else if (isArray(dest._events.error))
	    dest._events.error.unshift(onerror);
	  else
	    dest._events.error = [onerror, dest._events.error];



	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    // the handler that waits for readable events after all
	    // the data gets sucked out in flow.
	    // This would be easier to follow with a .once() handler
	    // in flow(), but that is too slow.
	    this.on('readable', pipeOnReadable);

	    state.flowing = true;
	    process.nextTick(function() {
	      flow(src);
	    });
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function() {
	    var dest = this;
	    var state = src._readableState;
	    state.awaitDrain--;
	    if (state.awaitDrain === 0)
	      flow(src);
	  };
	}

	function flow(src) {
	  var state = src._readableState;
	  var chunk;
	  state.awaitDrain = 0;

	  function write(dest, i, list) {
	    var written = dest.write(chunk);
	    if (false === written) {
	      state.awaitDrain++;
	    }
	  }

	  while (state.pipesCount && null !== (chunk = src.read())) {

	    if (state.pipesCount === 1)
	      write(state.pipes, 0, null);
	    else
	      forEach(state.pipes, write);

	    src.emit('data', chunk);

	    // if anyone needs a drain, then we have to wait for that.
	    if (state.awaitDrain > 0)
	      return;
	  }

	  // if every destination was unpiped, either before entering this
	  // function, or in the while loop, then stop flowing.
	  //
	  // NB: This is a pretty rare edge case.
	  if (state.pipesCount === 0) {
	    state.flowing = false;

	    // if there were data event listeners added, then switch to old mode.
	    if (EE.listenerCount(src, 'data') > 0)
	      emitDataEvents(src);
	    return;
	  }

	  // at this point, no one needed a drain, so we just ran out of data
	  // on the next readable event, start it over again.
	  state.ranOut = true;
	}

	function pipeOnReadable() {
	  if (this._readableState.ranOut) {
	    this._readableState.ranOut = false;
	    flow(this);
	  }
	}


	Readable.prototype.unpipe = function(dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0)
	    return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes)
	      return this;

	    if (!dest)
	      dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    this.removeListener('readable', pipeOnReadable);
	    state.flowing = false;
	    if (dest)
	      dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    this.removeListener('readable', pipeOnReadable);
	    state.flowing = false;

	    for (var i = 0; i < len; i++)
	      dests[i].emit('unpipe', this);
	    return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1)
	    return this;

	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1)
	    state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function(ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);

	  if (ev === 'data' && !this._readableState.flowing)
	    emitDataEvents(this);

	  if (ev === 'readable' && this.readable) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        this.read(0);
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function() {
	  emitDataEvents(this);
	  this.read(0);
	  this.emit('resume');
	};

	Readable.prototype.pause = function() {
	  emitDataEvents(this, true);
	  this.emit('pause');
	};

	function emitDataEvents(stream, startPaused) {
	  var state = stream._readableState;

	  if (state.flowing) {
	    // https://github.com/isaacs/readable-stream/issues/16
	    throw new Error('Cannot switch to old mode now.');
	  }

	  var paused = startPaused || false;
	  var readable = false;

	  // convert to an old-style stream.
	  stream.readable = true;
	  stream.pipe = Stream.prototype.pipe;
	  stream.on = stream.addListener = Stream.prototype.on;

	  stream.on('readable', function() {
	    readable = true;

	    var c;
	    while (!paused && (null !== (c = stream.read())))
	      stream.emit('data', c);

	    if (c === null) {
	      readable = false;
	      stream._readableState.needReadable = true;
	    }
	  });

	  stream.pause = function() {
	    paused = true;
	    this.emit('pause');
	  };

	  stream.resume = function() {
	    paused = false;
	    if (readable)
	      process.nextTick(function() {
	        stream.emit('readable');
	      });
	    else
	      this.read(0);
	    this.emit('resume');
	  };

	  // now make it start, just in case it hadn't already.
	  stream.emit('readable');
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function(stream) {
	  var state = this._readableState;
	  var paused = false;

	  var self = this;
	  stream.on('end', function() {
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length)
	        self.push(chunk);
	    }

	    self.push(null);
	  });

	  stream.on('data', function(chunk) {
	    if (state.decoder)
	      chunk = state.decoder.write(chunk);

	    // don't skip over falsy values in objectMode
	    //if (state.objectMode && util.isNullOrUndefined(chunk))
	    if (state.objectMode && (chunk === null || chunk === undefined))
	      return;
	    else if (!state.objectMode && (!chunk || !chunk.length))
	      return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (typeof stream[i] === 'function' &&
	        typeof this[i] === 'undefined') {
	      this[i] = function(method) { return function() {
	        return stream[method].apply(stream, arguments);
	      }}(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function(ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function(n) {
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};



	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;

	  // nothing in the list, definitely empty.
	  if (list.length === 0)
	    return null;

	  if (length === 0)
	    ret = null;
	  else if (objectMode)
	    ret = list.shift();
	  else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode)
	      ret = list.join('');
	    else
	      ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode)
	        ret = '';
	      else
	        ret = new Buffer(n);

	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);

	        if (stringMode)
	          ret += buf.slice(0, cpy);
	        else
	          buf.copy(ret, c, 0, cpy);

	        if (cpy < buf.length)
	          list[0] = buf.slice(cpy);
	        else
	          list.shift();

	        c += cpy;
	      }
	    }
	  }

	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0)
	    throw new Error('endReadable called on non-empty stream');

	  if (!state.endEmitted && state.calledRead) {
	    state.ended = true;
	    process.nextTick(function() {
	      // Check that we didn't get one last unshift.
	      if (!state.endEmitted && state.length === 0) {
	        state.endEmitted = true;
	        stream.readable = false;
	        stream.emit('end');
	      }
	    });
	  }
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf (xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, cb), and it'll handle all
	// the drain event emission and buffering.

	module.exports = Writable;

	/*<replacement>*/
	var Buffer = __webpack_require__(62).Buffer;
	/*</replacement>*/

	Writable.WritableState = WritableState;


	/*<replacement>*/
	var util = __webpack_require__(57);
	util.inherits = __webpack_require__(58);
	/*</replacement>*/

	var Stream = __webpack_require__(17);

	util.inherits(Writable, Stream);

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	}

	function WritableState(options, stream) {
	  options = options || {};

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : 16 * 1024;

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, becuase any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function(er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.buffer = [];

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	}

	function Writable(options) {
	  var Duplex = __webpack_require__(76);

	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex))
	    return new Writable(options);

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function() {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};


	function writeAfterEnd(stream, state, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  process.nextTick(function() {
	    cb(er);
	  });
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  if (!Buffer.isBuffer(chunk) &&
	      'string' !== typeof chunk &&
	      chunk !== null &&
	      chunk !== undefined &&
	      !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    process.nextTick(function() {
	      cb(er);
	    });
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function(chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (Buffer.isBuffer(chunk))
	    encoding = 'buffer';
	  else if (!encoding)
	    encoding = state.defaultEncoding;

	  if (typeof cb !== 'function')
	    cb = function() {};

	  if (state.ended)
	    writeAfterEnd(this, state, cb);
	  else if (validChunk(this, state, chunk, cb))
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);

	  return ret;
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode &&
	      state.decodeStrings !== false &&
	      typeof chunk === 'string') {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (Buffer.isBuffer(chunk))
	    encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret)
	    state.needDrain = true;

	  if (state.writing)
	    state.buffer.push(new WriteReq(chunk, encoding, cb));
	  else
	    doWrite(stream, state, len, chunk, encoding, cb);

	  return ret;
	}

	function doWrite(stream, state, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  if (sync)
	    process.nextTick(function() {
	      cb(er);
	    });
	  else
	    cb(er);

	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er)
	    onwriteError(stream, state, sync, er, cb);
	  else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(stream, state);

	    if (!finished && !state.bufferProcessing && state.buffer.length)
	      clearBuffer(stream, state);

	    if (sync) {
	      process.nextTick(function() {
	        afterWrite(stream, state, finished, cb);
	      });
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished)
	    onwriteDrain(stream, state);
	  cb();
	  if (finished)
	    finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}


	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;

	  for (var c = 0; c < state.buffer.length; c++) {
	    var entry = state.buffer[c];
	    var chunk = entry.chunk;
	    var encoding = entry.encoding;
	    var cb = entry.callback;
	    var len = state.objectMode ? 1 : chunk.length;

	    doWrite(stream, state, len, chunk, encoding, cb);

	    // if we didn't call the onwrite immediately, then
	    // it means that we need to wait until it does.
	    // also, that means that the chunk and cb are currently
	    // being processed, so move the buffer counter past them.
	    if (state.writing) {
	      c++;
	      break;
	    }
	  }

	  state.bufferProcessing = false;
	  if (c < state.buffer.length)
	    state.buffer = state.buffer.slice(c);
	  else
	    state.buffer.length = 0;
	}

	Writable.prototype._write = function(chunk, encoding, cb) {
	  cb(new Error('not implemented'));
	};

	Writable.prototype.end = function(chunk, encoding, cb) {
	  var state = this._writableState;

	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (typeof chunk !== 'undefined' && chunk !== null)
	    this.write(chunk, encoding);

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished)
	    endWritable(this, state, cb);
	};


	function needFinish(stream, state) {
	  return (state.ending &&
	          state.length === 0 &&
	          !state.finished &&
	          !state.writing);
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(stream, state);
	  if (need) {
	    state.finished = true;
	    stream.emit('finish');
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished)
	      process.nextTick(cb);
	    else
	      stream.once('finish', cb);
	  }
	  state.ended = true;
	}


/***/ }),
/* 79 */
/***/ (function(module, exports) {

	'use strict';

	// overloadDefs
	// self, overloadDefs
	var overload = module.exports = function () {
	  var self, selfSet = false, overloadDefs;
	  if (arguments.length === 1) {
	    overloadDefs = arguments[0];
	  } else {
	    selfSet = true;
	    self = arguments[0];
	    overloadDefs = arguments[1];
	  }
	  return function () {
	    if (!selfSet) {
	      self = this;
	    }
	    var args = Array.prototype.slice.call(arguments);
	    var overloadMatchData = findOverload(overloadDefs, args);
	    if (!overloadMatchData) {
	      throw new Error(createErrorMessage('No match found.', overloadDefs));
	    }
	    var overloadFn = overloadMatchData.def[overloadMatchData.def.length - 1];
	    return overloadFn.apply(self, overloadMatchData.args);
	  };
	};

	var findOverload = overload.findOverload = function (overloadDefs, args) {
	  for (var i = 0; i < overloadDefs.length; i++) {
	    if (i === overloadDefs.length - 1 && typeof(overloadDefs[i]) === 'function') {
	      return { args: args, def: [overloadDefs[i]] };
	    }
	    var newArgs;
	    if (newArgs = isMatch(overloadDefs[i], args)) {
	      return { args: newArgs, def: overloadDefs[i] };
	    }
	  }
	  return null;
	};

	function isMatch(overloadDef, args) {
	  var overloadDefIdx;
	  var argIdx;
	  var newArgs = [];
	  for (overloadDefIdx = 0, argIdx = 0; overloadDefIdx < overloadDef.length - 1; overloadDefIdx++) {
	    if (typeof(overloadDef[overloadDefIdx]) !== 'function') {
	      throw new Error("Invalid overload definition. Array should only contain functions.");
	    }
	    //console.log('overloadDef/arg:', overloadDef[overloadDefIdx], args[argIdx]);
	    var result = overloadDef[overloadDefIdx](args[argIdx]);
	    //console.log('result:', result);
	    if (result) {
	      if (result.hasOwnProperty('defaultValue')) {
	        newArgs.push(result.defaultValue);
	      } else {
	        if (overloadDef[overloadDefIdx].optional && args[argIdx] === null) {
	          argIdx++;
	          newArgs.push(overloadDef[overloadDefIdx].defaultValue);
	          continue;
	        }
	        newArgs.push(args[argIdx]);
	        argIdx++;
	      }
	    } else {
	      if (overloadDef[overloadDefIdx].optional) {
	        newArgs.push(overloadDef[overloadDefIdx].defaultValue);
	        continue;
	      }
	      return false;
	    }
	  }
	  //console.log('compares', overloadDefIdx, overloadDef.length - 1, argIdx, args.length, newArgs.length);
	  if (overloadDefIdx === overloadDef.length - 1 && argIdx >= args.length) {
	    return newArgs;
	  }
	  return false;
	}

	function createErrorMessage(message, overloadDefs) {
	  message += '\n';
	  message += '  Possible matches:\n';
	  for (var i = 0; i < overloadDefs.length; i++) {
	    var overloadDef = overloadDefs[i];
	    if (typeof(overloadDef) === 'function') {
	      message += '   [default]\n';
	    } else {
	      var matchers = overloadDef.slice(0, overloadDef.length - 1);
	      matchers = matchers.map(function (m) {
	        if (!m) {
	          return '[invalid argument definition]';
	        }
	        return m.name || m;
	      });
	      if (matchers.length === 0) {
	        message += '   ()\n';
	      } else {
	        message += '   (' + matchers.join(', ') + ')\n';
	      }
	    }
	  }
	  return message;
	}

	// --- func
	overload.func = function func(arg) {
	  return typeof(arg) === 'function';
	};

	overload.funcOptional = function funcOptional(arg) {
	  if (!arg) {
	    return true;
	  }
	  return overload.func(arg);
	};
	overload.funcOptional.optional = true;

	overload.funcOptionalWithDefault = function (def) {
	  var fn = function funcOptionalWithDefault(arg) {
	    if (arg === undefined) {
	      return false;
	    }
	    return overload.func(arg);
	  };
	  fn.optional = true;
	  fn.defaultValue = def;
	  return fn;
	};

	// --- callback
	overload.callbackOptional = function callbackOptional(arg) {
	  if (!arg) {
	    return { defaultValue: function defaultCallback() {} };
	  }
	  return overload.func(arg);
	};
	overload.callbackOptional.optional = true;

	// --- string
	overload.string = function string(arg) {
	  return typeof(arg) === 'string';
	};

	overload.stringOptional = function stringOptional(arg) {
	  if (!arg) {
	    return true;
	  }
	  return overload.string(arg);
	};
	overload.stringOptional.optional = true;

	overload.stringOptionalWithDefault = function (def) {
	  var fn = function stringOptionalWithDefault(arg) {
	    if (arg === undefined) {
	      return false;
	    }
	    return overload.string(arg);
	  };
	  fn.optional = true;
	  fn.defaultValue = def;
	  return fn;
	};

	// --- number
	overload.number = function number(arg) {
	  return typeof(arg) === 'number';
	};

	overload.numberOptional = function numberOptional(arg) {
	  if (!arg) {
	    return true;
	  }
	  return overload.number(arg);
	};
	overload.numberOptional.optional = true;

	overload.numberOptionalWithDefault = function (def) {
	  var fn = function numberOptionalWithDefault(arg) {
	    if (arg === undefined) {
	      return false;
	    }
	    return overload.number(arg);
	  };
	  fn.optional = true;
	  fn.defaultValue = def;
	  return fn;
	};

	// --- array
	overload.array = function array(arg) {
	  return arg instanceof Array;
	};

	overload.arrayOptional = function arrayOptional(arg) {
	  if (!arg) {
	    return true;
	  }
	  return overload.array(arg);
	};
	overload.arrayOptional.optional = true;

	overload.arrayOptionalWithDefault = function (def) {
	  var fn = function arrayOptionalWithDefault(arg) {
	    if (arg === undefined) {
	      return false;
	    }
	    return overload.array(arg);
	  };
	  fn.optional = true;
	  fn.defaultValue = def;
	  return fn;
	};

	// --- object
	overload.object = function object(arg) {
	  return typeof(arg) === 'object';
	};

	overload.objectOptional = function objectOptional(arg) {
	  if (!arg) {
	    return true;
	  }
	  return overload.object(arg);
	};
	overload.objectOptional.optional = true;

	overload.objectOptionalWithDefault = function (def) {
	  var fn = function objectOptionalWithDefault(arg) {
	    if (arg === undefined) {
	      return false;
	    }
	    return overload.object(arg);
	  };
	  fn.optional = true;
	  fn.defaultValue = def;
	  return fn;
	};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = SliceStream;

	var Transform = __webpack_require__(81);
	var inherits = __webpack_require__(18).inherits;

	inherits(SliceStream, Transform);

	function SliceStream(opts, sliceFn) {
	  if (!(this instanceof SliceStream)) {
	    return new SliceStream(opts, sliceFn);
	  }

	  this._opts = opts;
	  this._accumulatedLength = 0;
	  this.sliceFn = sliceFn;

	  Transform.call(this);
	}

	SliceStream.prototype._transform = function (chunk, encoding, callback) {
	  this._accumulatedLength += chunk.length;

	  if (this._accumulatedLength >= this._opts.length) {
	    //todo handle more than one slice in a stream
	    var offset = chunk.length - (this._accumulatedLength - this._opts.length);
	    this.sliceFn(chunk.slice(0, offset), true, chunk.slice(offset));
	    callback();
	  } else {
	    this.sliceFn(chunk);
	    callback();
	  }
	};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(82)


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.


	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.

	module.exports = Transform;

	var Duplex = __webpack_require__(83);

	/*<replacement>*/
	var util = __webpack_require__(57);
	util.inherits = __webpack_require__(58);
	/*</replacement>*/

	util.inherits(Transform, Duplex);


	function TransformState(options, stream) {
	  this.afterTransform = function(er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb)
	    return stream.emit('error', new Error('no writecb in Transform class'));

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (data !== null && data !== undefined)
	    stream.push(data);

	  if (cb)
	    cb(er);

	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}


	function Transform(options) {
	  if (!(this instanceof Transform))
	    return new Transform(options);

	  Duplex.call(this, options);

	  var ts = this._transformState = new TransformState(options, this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  this.once('finish', function() {
	    if ('function' === typeof this._flush)
	      this._flush(function(er) {
	        done(stream, er);
	      });
	    else
	      done(stream);
	  });
	}

	Transform.prototype.push = function(chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function(chunk, encoding, cb) {
	  throw new Error('not implemented');
	};

	Transform.prototype._write = function(chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform ||
	        rs.needReadable ||
	        rs.length < rs.highWaterMark)
	      this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function(n) {
	  var ts = this._transformState;

	  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};


	function done(stream, er) {
	  if (er)
	    return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var rs = stream._readableState;
	  var ts = stream._transformState;

	  if (ws.length)
	    throw new Error('calling transform done when ws.length != 0');

	  if (ts.transforming)
	    throw new Error('calling transform done when still transforming');

	  return stream.push(null);
	}


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.

	module.exports = Duplex;

	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	/*</replacement>*/


	/*<replacement>*/
	var util = __webpack_require__(57);
	util.inherits = __webpack_require__(58);
	/*</replacement>*/

	var Readable = __webpack_require__(84);
	var Writable = __webpack_require__(85);

	util.inherits(Duplex, Readable);

	forEach(objectKeys(Writable.prototype), function(method) {
	  if (!Duplex.prototype[method])
	    Duplex.prototype[method] = Writable.prototype[method];
	});

	function Duplex(options) {
	  if (!(this instanceof Duplex))
	    return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false)
	    this.readable = false;

	  if (options && options.writable === false)
	    this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false)
	    this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended)
	    return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(this.end.bind(this));
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Readable;

	/*<replacement>*/
	var isArray = __webpack_require__(61);
	/*</replacement>*/


	/*<replacement>*/
	var Buffer = __webpack_require__(62).Buffer;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	var EE = __webpack_require__(63).EventEmitter;

	/*<replacement>*/
	if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	var Stream = __webpack_require__(17);

	/*<replacement>*/
	var util = __webpack_require__(57);
	util.inherits = __webpack_require__(58);
	/*</replacement>*/

	var StringDecoder;

	util.inherits(Readable, Stream);

	function ReadableState(options, stream) {
	  options = options || {};

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : 16 * 1024;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = false;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // In streams that never have any data, and do push(null) right away,
	  // the consumer can miss the 'end' event if they do some I/O before
	  // consuming the stream.  So, we don't emit('end') until some reading
	  // happens.
	  this.calledRead = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, becuase any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;


	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder)
	      StringDecoder = __webpack_require__(64).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  if (!(this instanceof Readable))
	    return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  Stream.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function(chunk, encoding) {
	  var state = this._readableState;

	  if (typeof chunk === 'string' && !state.objectMode) {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function(chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (chunk === null || chunk === undefined) {
	    state.reading = false;
	    if (!state.ended)
	      onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      if (state.decoder && !addToFront && !encoding)
	        chunk = state.decoder.write(chunk);

	      // update the buffer info.
	      state.length += state.objectMode ? 1 : chunk.length;
	      if (addToFront) {
	        state.buffer.unshift(chunk);
	      } else {
	        state.reading = false;
	        state.buffer.push(chunk);
	      }

	      if (state.needReadable)
	        emitReadable(stream);

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	}



	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended &&
	         (state.needReadable ||
	          state.length < state.highWaterMark ||
	          state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function(enc) {
	  if (!StringDecoder)
	    StringDecoder = __webpack_require__(64).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	};

	// Don't raise the hwm > 128MB
	var MAX_HWM = 0x800000;
	function roundUpToNextPowerOf2(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
	    n++;
	  }
	  return n;
	}

	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended)
	    return 0;

	  if (state.objectMode)
	    return n === 0 ? 0 : 1;

	  if (n === null || isNaN(n)) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length)
	      return state.buffer[0].length;
	    else
	      return state.length;
	  }

	  if (n <= 0)
	    return 0;

	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark)
	    state.highWaterMark = roundUpToNextPowerOf2(n);

	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else
	      return state.length;
	  }

	  return n;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function(n) {
	  var state = this._readableState;
	  state.calledRead = true;
	  var nOrig = n;
	  var ret;

	  if (typeof n !== 'number' || n > 0)
	    state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 &&
	      state.needReadable &&
	      (state.length >= state.highWaterMark || state.ended)) {
	    emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    ret = null;

	    // In cases where the decoder did not receive enough data
	    // to produce a full chunk, then immediately received an
	    // EOF, state.buffer will contain [<Buffer >, <Buffer 00 ...>].
	    // howMuchToRead will see this and coerce the amount to
	    // read to zero (because it's looking at the length of the
	    // first <Buffer > in state.buffer), and we'll end up here.
	    //
	    // This can only happen via state.decoder -- no other venue
	    // exists for pushing a zero-length chunk into state.buffer
	    // and triggering this behavior. In this case, we return our
	    // remaining data and end the stream, if appropriate.
	    if (state.length > 0 && state.decoder) {
	      ret = fromList(n, state);
	      state.length -= ret.length;
	    }

	    if (state.length === 0)
	      endReadable(this);

	    return ret;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length - n <= state.highWaterMark)
	    doRead = true;

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading)
	    doRead = false;

	  if (doRead) {
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0)
	      state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }

	  // If _read called its callback synchronously, then `reading`
	  // will be false, and we need to re-evaluate how much data we
	  // can return to the user.
	  if (doRead && !state.reading)
	    n = howMuchToRead(nOrig, state);

	  if (n > 0)
	    ret = fromList(n, state);
	  else
	    ret = null;

	  if (ret === null) {
	    state.needReadable = true;
	    n = 0;
	  }

	  state.length -= n;

	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended)
	    state.needReadable = true;

	  // If we happened to read() exactly the remaining amount in the
	  // buffer, and the EOF has been seen at this point, then make sure
	  // that we emit 'end' on the very next tick.
	  if (state.ended && !state.endEmitted && state.length === 0)
	    endReadable(this);

	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!Buffer.isBuffer(chunk) &&
	      'string' !== typeof chunk &&
	      chunk !== null &&
	      chunk !== undefined &&
	      !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}


	function onEofChunk(stream, state) {
	  if (state.decoder && !state.ended) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // if we've ended and we have some data left, then emit
	  // 'readable' now to make sure it gets picked up.
	  if (state.length > 0)
	    emitReadable(stream);
	  else
	    endReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (state.emittedReadable)
	    return;

	  state.emittedReadable = true;
	  if (state.sync)
	    process.nextTick(function() {
	      emitReadable_(stream);
	    });
	  else
	    emitReadable_(stream);
	}

	function emitReadable_(stream) {
	  stream.emit('readable');
	}


	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(function() {
	      maybeReadMore_(stream, state);
	    });
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended &&
	         state.length < state.highWaterMark) {
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;
	    else
	      len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function(n) {
	  this.emit('error', new Error('not implemented'));
	};

	Readable.prototype.pipe = function(dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;

	  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
	              dest !== process.stdout &&
	              dest !== process.stderr;

	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted)
	    process.nextTick(endFn);
	  else
	    src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    if (readable !== src) return;
	    cleanup();
	  }

	  function onend() {
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  function cleanup() {
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (!dest._writableState || dest._writableState.needDrain)
	      ondrain();
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EE.listenerCount(dest, 'error') === 0)
	      dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error)
	    dest.on('error', onerror);
	  else if (isArray(dest._events.error))
	    dest._events.error.unshift(onerror);
	  else
	    dest._events.error = [onerror, dest._events.error];



	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    // the handler that waits for readable events after all
	    // the data gets sucked out in flow.
	    // This would be easier to follow with a .once() handler
	    // in flow(), but that is too slow.
	    this.on('readable', pipeOnReadable);

	    state.flowing = true;
	    process.nextTick(function() {
	      flow(src);
	    });
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function() {
	    var dest = this;
	    var state = src._readableState;
	    state.awaitDrain--;
	    if (state.awaitDrain === 0)
	      flow(src);
	  };
	}

	function flow(src) {
	  var state = src._readableState;
	  var chunk;
	  state.awaitDrain = 0;

	  function write(dest, i, list) {
	    var written = dest.write(chunk);
	    if (false === written) {
	      state.awaitDrain++;
	    }
	  }

	  while (state.pipesCount && null !== (chunk = src.read())) {

	    if (state.pipesCount === 1)
	      write(state.pipes, 0, null);
	    else
	      forEach(state.pipes, write);

	    src.emit('data', chunk);

	    // if anyone needs a drain, then we have to wait for that.
	    if (state.awaitDrain > 0)
	      return;
	  }

	  // if every destination was unpiped, either before entering this
	  // function, or in the while loop, then stop flowing.
	  //
	  // NB: This is a pretty rare edge case.
	  if (state.pipesCount === 0) {
	    state.flowing = false;

	    // if there were data event listeners added, then switch to old mode.
	    if (EE.listenerCount(src, 'data') > 0)
	      emitDataEvents(src);
	    return;
	  }

	  // at this point, no one needed a drain, so we just ran out of data
	  // on the next readable event, start it over again.
	  state.ranOut = true;
	}

	function pipeOnReadable() {
	  if (this._readableState.ranOut) {
	    this._readableState.ranOut = false;
	    flow(this);
	  }
	}


	Readable.prototype.unpipe = function(dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0)
	    return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes)
	      return this;

	    if (!dest)
	      dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    this.removeListener('readable', pipeOnReadable);
	    state.flowing = false;
	    if (dest)
	      dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    this.removeListener('readable', pipeOnReadable);
	    state.flowing = false;

	    for (var i = 0; i < len; i++)
	      dests[i].emit('unpipe', this);
	    return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1)
	    return this;

	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1)
	    state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function(ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);

	  if (ev === 'data' && !this._readableState.flowing)
	    emitDataEvents(this);

	  if (ev === 'readable' && this.readable) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        this.read(0);
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function() {
	  emitDataEvents(this);
	  this.read(0);
	  this.emit('resume');
	};

	Readable.prototype.pause = function() {
	  emitDataEvents(this, true);
	  this.emit('pause');
	};

	function emitDataEvents(stream, startPaused) {
	  var state = stream._readableState;

	  if (state.flowing) {
	    // https://github.com/isaacs/readable-stream/issues/16
	    throw new Error('Cannot switch to old mode now.');
	  }

	  var paused = startPaused || false;
	  var readable = false;

	  // convert to an old-style stream.
	  stream.readable = true;
	  stream.pipe = Stream.prototype.pipe;
	  stream.on = stream.addListener = Stream.prototype.on;

	  stream.on('readable', function() {
	    readable = true;

	    var c;
	    while (!paused && (null !== (c = stream.read())))
	      stream.emit('data', c);

	    if (c === null) {
	      readable = false;
	      stream._readableState.needReadable = true;
	    }
	  });

	  stream.pause = function() {
	    paused = true;
	    this.emit('pause');
	  };

	  stream.resume = function() {
	    paused = false;
	    if (readable)
	      process.nextTick(function() {
	        stream.emit('readable');
	      });
	    else
	      this.read(0);
	    this.emit('resume');
	  };

	  // now make it start, just in case it hadn't already.
	  stream.emit('readable');
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function(stream) {
	  var state = this._readableState;
	  var paused = false;

	  var self = this;
	  stream.on('end', function() {
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length)
	        self.push(chunk);
	    }

	    self.push(null);
	  });

	  stream.on('data', function(chunk) {
	    if (state.decoder)
	      chunk = state.decoder.write(chunk);

	    // don't skip over falsy values in objectMode
	    //if (state.objectMode && util.isNullOrUndefined(chunk))
	    if (state.objectMode && (chunk === null || chunk === undefined))
	      return;
	    else if (!state.objectMode && (!chunk || !chunk.length))
	      return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (typeof stream[i] === 'function' &&
	        typeof this[i] === 'undefined') {
	      this[i] = function(method) { return function() {
	        return stream[method].apply(stream, arguments);
	      }}(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function(ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function(n) {
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};



	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;

	  // nothing in the list, definitely empty.
	  if (list.length === 0)
	    return null;

	  if (length === 0)
	    ret = null;
	  else if (objectMode)
	    ret = list.shift();
	  else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode)
	      ret = list.join('');
	    else
	      ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode)
	        ret = '';
	      else
	        ret = new Buffer(n);

	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);

	        if (stringMode)
	          ret += buf.slice(0, cpy);
	        else
	          buf.copy(ret, c, 0, cpy);

	        if (cpy < buf.length)
	          list[0] = buf.slice(cpy);
	        else
	          list.shift();

	        c += cpy;
	      }
	    }
	  }

	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0)
	    throw new Error('endReadable called on non-empty stream');

	  if (!state.endEmitted && state.calledRead) {
	    state.ended = true;
	    process.nextTick(function() {
	      // Check that we didn't get one last unshift.
	      if (!state.endEmitted && state.length === 0) {
	        state.endEmitted = true;
	        stream.readable = false;
	        stream.emit('end');
	      }
	    });
	  }
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf (xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, cb), and it'll handle all
	// the drain event emission and buffering.

	module.exports = Writable;

	/*<replacement>*/
	var Buffer = __webpack_require__(62).Buffer;
	/*</replacement>*/

	Writable.WritableState = WritableState;


	/*<replacement>*/
	var util = __webpack_require__(57);
	util.inherits = __webpack_require__(58);
	/*</replacement>*/

	var Stream = __webpack_require__(17);

	util.inherits(Writable, Stream);

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	}

	function WritableState(options, stream) {
	  options = options || {};

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : 16 * 1024;

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, becuase any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function(er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.buffer = [];

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	}

	function Writable(options) {
	  var Duplex = __webpack_require__(83);

	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex))
	    return new Writable(options);

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function() {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};


	function writeAfterEnd(stream, state, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  process.nextTick(function() {
	    cb(er);
	  });
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  if (!Buffer.isBuffer(chunk) &&
	      'string' !== typeof chunk &&
	      chunk !== null &&
	      chunk !== undefined &&
	      !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    process.nextTick(function() {
	      cb(er);
	    });
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function(chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (Buffer.isBuffer(chunk))
	    encoding = 'buffer';
	  else if (!encoding)
	    encoding = state.defaultEncoding;

	  if (typeof cb !== 'function')
	    cb = function() {};

	  if (state.ended)
	    writeAfterEnd(this, state, cb);
	  else if (validChunk(this, state, chunk, cb))
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);

	  return ret;
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode &&
	      state.decodeStrings !== false &&
	      typeof chunk === 'string') {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (Buffer.isBuffer(chunk))
	    encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret)
	    state.needDrain = true;

	  if (state.writing)
	    state.buffer.push(new WriteReq(chunk, encoding, cb));
	  else
	    doWrite(stream, state, len, chunk, encoding, cb);

	  return ret;
	}

	function doWrite(stream, state, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  if (sync)
	    process.nextTick(function() {
	      cb(er);
	    });
	  else
	    cb(er);

	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er)
	    onwriteError(stream, state, sync, er, cb);
	  else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(stream, state);

	    if (!finished && !state.bufferProcessing && state.buffer.length)
	      clearBuffer(stream, state);

	    if (sync) {
	      process.nextTick(function() {
	        afterWrite(stream, state, finished, cb);
	      });
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished)
	    onwriteDrain(stream, state);
	  cb();
	  if (finished)
	    finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}


	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;

	  for (var c = 0; c < state.buffer.length; c++) {
	    var entry = state.buffer[c];
	    var chunk = entry.chunk;
	    var encoding = entry.encoding;
	    var cb = entry.callback;
	    var len = state.objectMode ? 1 : chunk.length;

	    doWrite(stream, state, len, chunk, encoding, cb);

	    // if we didn't call the onwrite immediately, then
	    // it means that we need to wait until it does.
	    // also, that means that the chunk and cb are currently
	    // being processed, so move the buffer counter past them.
	    if (state.writing) {
	      c++;
	      break;
	    }
	  }

	  state.bufferProcessing = false;
	  if (c < state.buffer.length)
	    state.buffer = state.buffer.slice(c);
	  else
	    state.buffer.length = 0;
	}

	Writable.prototype._write = function(chunk, encoding, cb) {
	  cb(new Error('not implemented'));
	};

	Writable.prototype.end = function(chunk, encoding, cb) {
	  var state = this._writableState;

	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (typeof chunk !== 'undefined' && chunk !== null)
	    this.write(chunk, encoding);

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished)
	    endWritable(this, state, cb);
	};


	function needFinish(stream, state) {
	  return (state.ending &&
	          state.length === 0 &&
	          !state.finished &&
	          !state.writing);
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(stream, state);
	  if (need) {
	    state.finished = true;
	    stream.emit('finish');
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished)
	      process.nextTick(cb);
	    else
	      stream.once('finish', cb);
	  }
	  state.ended = true;
	}


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = Match;

	var Transform = __webpack_require__(17).Transform;
	var inherits = __webpack_require__(18).inherits;
	var Buffers = __webpack_require__(70);

	if (!Transform) {
	  Transform = __webpack_require__(87);
	}

	inherits(Match, Transform);

	function Match(opts, matchFn) {
	  if (!(this instanceof Match)) {
	    return new Match(opts, matchFn);
	  }

	  //todo - better handle opts e.g. pattern.length can't be > highWaterMark
	  this._opts = opts;
	  if (typeof this._opts.pattern === "string") {
	    this._opts.pattern = new Buffer(this._opts.pattern);
	  }
	  this._matchFn = matchFn;
	  this._bufs = Buffers();

	  Transform.call(this);
	}

	Match.prototype._transform = function (chunk, encoding, callback) {
	  var pattern = this._opts.pattern;
	  this._bufs.push(chunk);

	  var index = this._bufs.indexOf(pattern);
	  if (index >= 0) {
	    processMatches.call(this, index, pattern, callback);
	  } else {
	    var buf = this._bufs.splice(0, this._bufs.length - chunk.length);
	    if (buf && buf.length > 0) {
	      this._matchFn(buf.toBuffer());
	    }
	    callback();
	  }
	};

	function processMatches(index, pattern, callback) {
	  var buf = this._bufs.splice(0, index).toBuffer();
	  if (this._opts.consume) {
	    this._bufs.splice(0, pattern.length);
	  }
	  this._matchFn(buf, pattern, this._bufs.toBuffer());

	  index = this._bufs.indexOf(pattern);
	  if (index > 0 || this._opts.consume && index === 0) {
	    process.nextTick(processMatches.bind(this, index, pattern, callback));
	  } else {
	    callback();
	  }
	}


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(88)


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.


	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.

	module.exports = Transform;

	var Duplex = __webpack_require__(89);

	/*<replacement>*/
	var util = __webpack_require__(57);
	util.inherits = __webpack_require__(58);
	/*</replacement>*/

	util.inherits(Transform, Duplex);


	function TransformState(options, stream) {
	  this.afterTransform = function(er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb)
	    return stream.emit('error', new Error('no writecb in Transform class'));

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (data !== null && data !== undefined)
	    stream.push(data);

	  if (cb)
	    cb(er);

	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}


	function Transform(options) {
	  if (!(this instanceof Transform))
	    return new Transform(options);

	  Duplex.call(this, options);

	  var ts = this._transformState = new TransformState(options, this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  this.once('finish', function() {
	    if ('function' === typeof this._flush)
	      this._flush(function(er) {
	        done(stream, er);
	      });
	    else
	      done(stream);
	  });
	}

	Transform.prototype.push = function(chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function(chunk, encoding, cb) {
	  throw new Error('not implemented');
	};

	Transform.prototype._write = function(chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform ||
	        rs.needReadable ||
	        rs.length < rs.highWaterMark)
	      this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function(n) {
	  var ts = this._transformState;

	  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};


	function done(stream, er) {
	  if (er)
	    return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var rs = stream._readableState;
	  var ts = stream._transformState;

	  if (ws.length)
	    throw new Error('calling transform done when ws.length != 0');

	  if (ts.transforming)
	    throw new Error('calling transform done when still transforming');

	  return stream.push(null);
	}


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.

	module.exports = Duplex;

	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	/*</replacement>*/


	/*<replacement>*/
	var util = __webpack_require__(57);
	util.inherits = __webpack_require__(58);
	/*</replacement>*/

	var Readable = __webpack_require__(90);
	var Writable = __webpack_require__(91);

	util.inherits(Duplex, Readable);

	forEach(objectKeys(Writable.prototype), function(method) {
	  if (!Duplex.prototype[method])
	    Duplex.prototype[method] = Writable.prototype[method];
	});

	function Duplex(options) {
	  if (!(this instanceof Duplex))
	    return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false)
	    this.readable = false;

	  if (options && options.writable === false)
	    this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false)
	    this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended)
	    return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(this.end.bind(this));
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Readable;

	/*<replacement>*/
	var isArray = __webpack_require__(61);
	/*</replacement>*/


	/*<replacement>*/
	var Buffer = __webpack_require__(62).Buffer;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	var EE = __webpack_require__(63).EventEmitter;

	/*<replacement>*/
	if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	var Stream = __webpack_require__(17);

	/*<replacement>*/
	var util = __webpack_require__(57);
	util.inherits = __webpack_require__(58);
	/*</replacement>*/

	var StringDecoder;

	util.inherits(Readable, Stream);

	function ReadableState(options, stream) {
	  options = options || {};

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : 16 * 1024;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = false;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // In streams that never have any data, and do push(null) right away,
	  // the consumer can miss the 'end' event if they do some I/O before
	  // consuming the stream.  So, we don't emit('end') until some reading
	  // happens.
	  this.calledRead = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, becuase any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;


	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder)
	      StringDecoder = __webpack_require__(64).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  if (!(this instanceof Readable))
	    return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  Stream.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function(chunk, encoding) {
	  var state = this._readableState;

	  if (typeof chunk === 'string' && !state.objectMode) {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function(chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (chunk === null || chunk === undefined) {
	    state.reading = false;
	    if (!state.ended)
	      onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      if (state.decoder && !addToFront && !encoding)
	        chunk = state.decoder.write(chunk);

	      // update the buffer info.
	      state.length += state.objectMode ? 1 : chunk.length;
	      if (addToFront) {
	        state.buffer.unshift(chunk);
	      } else {
	        state.reading = false;
	        state.buffer.push(chunk);
	      }

	      if (state.needReadable)
	        emitReadable(stream);

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	}



	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended &&
	         (state.needReadable ||
	          state.length < state.highWaterMark ||
	          state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function(enc) {
	  if (!StringDecoder)
	    StringDecoder = __webpack_require__(64).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	};

	// Don't raise the hwm > 128MB
	var MAX_HWM = 0x800000;
	function roundUpToNextPowerOf2(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
	    n++;
	  }
	  return n;
	}

	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended)
	    return 0;

	  if (state.objectMode)
	    return n === 0 ? 0 : 1;

	  if (n === null || isNaN(n)) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length)
	      return state.buffer[0].length;
	    else
	      return state.length;
	  }

	  if (n <= 0)
	    return 0;

	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark)
	    state.highWaterMark = roundUpToNextPowerOf2(n);

	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else
	      return state.length;
	  }

	  return n;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function(n) {
	  var state = this._readableState;
	  state.calledRead = true;
	  var nOrig = n;
	  var ret;

	  if (typeof n !== 'number' || n > 0)
	    state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 &&
	      state.needReadable &&
	      (state.length >= state.highWaterMark || state.ended)) {
	    emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    ret = null;

	    // In cases where the decoder did not receive enough data
	    // to produce a full chunk, then immediately received an
	    // EOF, state.buffer will contain [<Buffer >, <Buffer 00 ...>].
	    // howMuchToRead will see this and coerce the amount to
	    // read to zero (because it's looking at the length of the
	    // first <Buffer > in state.buffer), and we'll end up here.
	    //
	    // This can only happen via state.decoder -- no other venue
	    // exists for pushing a zero-length chunk into state.buffer
	    // and triggering this behavior. In this case, we return our
	    // remaining data and end the stream, if appropriate.
	    if (state.length > 0 && state.decoder) {
	      ret = fromList(n, state);
	      state.length -= ret.length;
	    }

	    if (state.length === 0)
	      endReadable(this);

	    return ret;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length - n <= state.highWaterMark)
	    doRead = true;

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading)
	    doRead = false;

	  if (doRead) {
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0)
	      state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }

	  // If _read called its callback synchronously, then `reading`
	  // will be false, and we need to re-evaluate how much data we
	  // can return to the user.
	  if (doRead && !state.reading)
	    n = howMuchToRead(nOrig, state);

	  if (n > 0)
	    ret = fromList(n, state);
	  else
	    ret = null;

	  if (ret === null) {
	    state.needReadable = true;
	    n = 0;
	  }

	  state.length -= n;

	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended)
	    state.needReadable = true;

	  // If we happened to read() exactly the remaining amount in the
	  // buffer, and the EOF has been seen at this point, then make sure
	  // that we emit 'end' on the very next tick.
	  if (state.ended && !state.endEmitted && state.length === 0)
	    endReadable(this);

	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!Buffer.isBuffer(chunk) &&
	      'string' !== typeof chunk &&
	      chunk !== null &&
	      chunk !== undefined &&
	      !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}


	function onEofChunk(stream, state) {
	  if (state.decoder && !state.ended) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // if we've ended and we have some data left, then emit
	  // 'readable' now to make sure it gets picked up.
	  if (state.length > 0)
	    emitReadable(stream);
	  else
	    endReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (state.emittedReadable)
	    return;

	  state.emittedReadable = true;
	  if (state.sync)
	    process.nextTick(function() {
	      emitReadable_(stream);
	    });
	  else
	    emitReadable_(stream);
	}

	function emitReadable_(stream) {
	  stream.emit('readable');
	}


	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(function() {
	      maybeReadMore_(stream, state);
	    });
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended &&
	         state.length < state.highWaterMark) {
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;
	    else
	      len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function(n) {
	  this.emit('error', new Error('not implemented'));
	};

	Readable.prototype.pipe = function(dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;

	  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
	              dest !== process.stdout &&
	              dest !== process.stderr;

	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted)
	    process.nextTick(endFn);
	  else
	    src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    if (readable !== src) return;
	    cleanup();
	  }

	  function onend() {
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  function cleanup() {
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (!dest._writableState || dest._writableState.needDrain)
	      ondrain();
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EE.listenerCount(dest, 'error') === 0)
	      dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error)
	    dest.on('error', onerror);
	  else if (isArray(dest._events.error))
	    dest._events.error.unshift(onerror);
	  else
	    dest._events.error = [onerror, dest._events.error];



	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    // the handler that waits for readable events after all
	    // the data gets sucked out in flow.
	    // This would be easier to follow with a .once() handler
	    // in flow(), but that is too slow.
	    this.on('readable', pipeOnReadable);

	    state.flowing = true;
	    process.nextTick(function() {
	      flow(src);
	    });
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function() {
	    var dest = this;
	    var state = src._readableState;
	    state.awaitDrain--;
	    if (state.awaitDrain === 0)
	      flow(src);
	  };
	}

	function flow(src) {
	  var state = src._readableState;
	  var chunk;
	  state.awaitDrain = 0;

	  function write(dest, i, list) {
	    var written = dest.write(chunk);
	    if (false === written) {
	      state.awaitDrain++;
	    }
	  }

	  while (state.pipesCount && null !== (chunk = src.read())) {

	    if (state.pipesCount === 1)
	      write(state.pipes, 0, null);
	    else
	      forEach(state.pipes, write);

	    src.emit('data', chunk);

	    // if anyone needs a drain, then we have to wait for that.
	    if (state.awaitDrain > 0)
	      return;
	  }

	  // if every destination was unpiped, either before entering this
	  // function, or in the while loop, then stop flowing.
	  //
	  // NB: This is a pretty rare edge case.
	  if (state.pipesCount === 0) {
	    state.flowing = false;

	    // if there were data event listeners added, then switch to old mode.
	    if (EE.listenerCount(src, 'data') > 0)
	      emitDataEvents(src);
	    return;
	  }

	  // at this point, no one needed a drain, so we just ran out of data
	  // on the next readable event, start it over again.
	  state.ranOut = true;
	}

	function pipeOnReadable() {
	  if (this._readableState.ranOut) {
	    this._readableState.ranOut = false;
	    flow(this);
	  }
	}


	Readable.prototype.unpipe = function(dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0)
	    return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes)
	      return this;

	    if (!dest)
	      dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    this.removeListener('readable', pipeOnReadable);
	    state.flowing = false;
	    if (dest)
	      dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    this.removeListener('readable', pipeOnReadable);
	    state.flowing = false;

	    for (var i = 0; i < len; i++)
	      dests[i].emit('unpipe', this);
	    return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1)
	    return this;

	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1)
	    state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function(ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);

	  if (ev === 'data' && !this._readableState.flowing)
	    emitDataEvents(this);

	  if (ev === 'readable' && this.readable) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        this.read(0);
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function() {
	  emitDataEvents(this);
	  this.read(0);
	  this.emit('resume');
	};

	Readable.prototype.pause = function() {
	  emitDataEvents(this, true);
	  this.emit('pause');
	};

	function emitDataEvents(stream, startPaused) {
	  var state = stream._readableState;

	  if (state.flowing) {
	    // https://github.com/isaacs/readable-stream/issues/16
	    throw new Error('Cannot switch to old mode now.');
	  }

	  var paused = startPaused || false;
	  var readable = false;

	  // convert to an old-style stream.
	  stream.readable = true;
	  stream.pipe = Stream.prototype.pipe;
	  stream.on = stream.addListener = Stream.prototype.on;

	  stream.on('readable', function() {
	    readable = true;

	    var c;
	    while (!paused && (null !== (c = stream.read())))
	      stream.emit('data', c);

	    if (c === null) {
	      readable = false;
	      stream._readableState.needReadable = true;
	    }
	  });

	  stream.pause = function() {
	    paused = true;
	    this.emit('pause');
	  };

	  stream.resume = function() {
	    paused = false;
	    if (readable)
	      process.nextTick(function() {
	        stream.emit('readable');
	      });
	    else
	      this.read(0);
	    this.emit('resume');
	  };

	  // now make it start, just in case it hadn't already.
	  stream.emit('readable');
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function(stream) {
	  var state = this._readableState;
	  var paused = false;

	  var self = this;
	  stream.on('end', function() {
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length)
	        self.push(chunk);
	    }

	    self.push(null);
	  });

	  stream.on('data', function(chunk) {
	    if (state.decoder)
	      chunk = state.decoder.write(chunk);

	    // don't skip over falsy values in objectMode
	    //if (state.objectMode && util.isNullOrUndefined(chunk))
	    if (state.objectMode && (chunk === null || chunk === undefined))
	      return;
	    else if (!state.objectMode && (!chunk || !chunk.length))
	      return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (typeof stream[i] === 'function' &&
	        typeof this[i] === 'undefined') {
	      this[i] = function(method) { return function() {
	        return stream[method].apply(stream, arguments);
	      }}(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function(ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function(n) {
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};



	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;

	  // nothing in the list, definitely empty.
	  if (list.length === 0)
	    return null;

	  if (length === 0)
	    ret = null;
	  else if (objectMode)
	    ret = list.shift();
	  else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode)
	      ret = list.join('');
	    else
	      ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode)
	        ret = '';
	      else
	        ret = new Buffer(n);

	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);

	        if (stringMode)
	          ret += buf.slice(0, cpy);
	        else
	          buf.copy(ret, c, 0, cpy);

	        if (cpy < buf.length)
	          list[0] = buf.slice(cpy);
	        else
	          list.shift();

	        c += cpy;
	      }
	    }
	  }

	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0)
	    throw new Error('endReadable called on non-empty stream');

	  if (!state.endEmitted && state.calledRead) {
	    state.ended = true;
	    process.nextTick(function() {
	      // Check that we didn't get one last unshift.
	      if (!state.endEmitted && state.length === 0) {
	        state.endEmitted = true;
	        stream.readable = false;
	        stream.emit('end');
	      }
	    });
	  }
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf (xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, cb), and it'll handle all
	// the drain event emission and buffering.

	module.exports = Writable;

	/*<replacement>*/
	var Buffer = __webpack_require__(62).Buffer;
	/*</replacement>*/

	Writable.WritableState = WritableState;


	/*<replacement>*/
	var util = __webpack_require__(57);
	util.inherits = __webpack_require__(58);
	/*</replacement>*/

	var Stream = __webpack_require__(17);

	util.inherits(Writable, Stream);

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	}

	function WritableState(options, stream) {
	  options = options || {};

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : 16 * 1024;

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, becuase any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function(er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.buffer = [];

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	}

	function Writable(options) {
	  var Duplex = __webpack_require__(89);

	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex))
	    return new Writable(options);

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function() {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};


	function writeAfterEnd(stream, state, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  process.nextTick(function() {
	    cb(er);
	  });
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  if (!Buffer.isBuffer(chunk) &&
	      'string' !== typeof chunk &&
	      chunk !== null &&
	      chunk !== undefined &&
	      !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    process.nextTick(function() {
	      cb(er);
	    });
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function(chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (Buffer.isBuffer(chunk))
	    encoding = 'buffer';
	  else if (!encoding)
	    encoding = state.defaultEncoding;

	  if (typeof cb !== 'function')
	    cb = function() {};

	  if (state.ended)
	    writeAfterEnd(this, state, cb);
	  else if (validChunk(this, state, chunk, cb))
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);

	  return ret;
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode &&
	      state.decodeStrings !== false &&
	      typeof chunk === 'string') {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (Buffer.isBuffer(chunk))
	    encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret)
	    state.needDrain = true;

	  if (state.writing)
	    state.buffer.push(new WriteReq(chunk, encoding, cb));
	  else
	    doWrite(stream, state, len, chunk, encoding, cb);

	  return ret;
	}

	function doWrite(stream, state, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  if (sync)
	    process.nextTick(function() {
	      cb(er);
	    });
	  else
	    cb(er);

	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er)
	    onwriteError(stream, state, sync, er, cb);
	  else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(stream, state);

	    if (!finished && !state.bufferProcessing && state.buffer.length)
	      clearBuffer(stream, state);

	    if (sync) {
	      process.nextTick(function() {
	        afterWrite(stream, state, finished, cb);
	      });
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished)
	    onwriteDrain(stream, state);
	  cb();
	  if (finished)
	    finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}


	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;

	  for (var c = 0; c < state.buffer.length; c++) {
	    var entry = state.buffer[c];
	    var chunk = entry.chunk;
	    var encoding = entry.encoding;
	    var cb = entry.callback;
	    var len = state.objectMode ? 1 : chunk.length;

	    doWrite(stream, state, len, chunk, encoding, cb);

	    // if we didn't call the onwrite immediately, then
	    // it means that we need to wait until it does.
	    // also, that means that the chunk and cb are currently
	    // being processed, so move the buffer counter past them.
	    if (state.writing) {
	      c++;
	      break;
	    }
	  }

	  state.bufferProcessing = false;
	  if (c < state.buffer.length)
	    state.buffer = state.buffer.slice(c);
	  else
	    state.buffer.length = 0;
	}

	Writable.prototype._write = function(chunk, encoding, cb) {
	  cb(new Error('not implemented'));
	};

	Writable.prototype.end = function(chunk, encoding, cb) {
	  var state = this._writableState;

	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (typeof chunk !== 'undefined' && chunk !== null)
	    this.write(chunk, encoding);

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished)
	    endWritable(this, state, cb);
	};


	function needFinish(stream, state) {
	  return (state.ending &&
	          state.length === 0 &&
	          !state.finished &&
	          !state.writing);
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(stream, state);
	  if (need) {
	    state.finished = true;
	    stream.emit('finish');
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished)
	      process.nextTick(cb);
	    else
	      stream.once('finish', cb);
	  }
	  state.ended = true;
	}


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = Entry;

	var PassThrough = __webpack_require__(93);
	var inherits = __webpack_require__(18).inherits;

	inherits(Entry, PassThrough);

	function Entry () {
	  PassThrough.call(this);
	  this.props = {};
	}

	Entry.prototype.autodrain = function () {
	  this.on('readable', this.read.bind(this));
	};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(94)


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.

	module.exports = PassThrough;

	var Transform = __webpack_require__(55);

	/*<replacement>*/
	var util = __webpack_require__(57);
	util.inherits = __webpack_require__(58);
	/*</replacement>*/

	util.inherits(PassThrough, Transform);

	function PassThrough(options) {
	  if (!(this instanceof PassThrough))
	    return new PassThrough(options);

	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function(chunk, encoding, cb) {
	  cb(null, chunk);
	};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = Extract;

	var Parse = __webpack_require__(51).Parse;
	var Writer = __webpack_require__(96).Writer;
	var Writable = __webpack_require__(130);
	var path = __webpack_require__(3);
	var inherits = __webpack_require__(18).inherits;

	inherits(Extract, Writable);

	function Extract (opts) {
	  var self = this;
	  if (!(this instanceof Extract)) {
	    return new Extract(opts);
	  }

	  Writable.apply(this);
	  this._opts = opts || { verbose: false };

	  this._parser = Parse(this._opts);
	  this._parser.on('error', function(err) {
	    self.emit('error', err);
	  });
	  this.on('finish', function() {
	    self._parser.end();
	  });

	  var writer = Writer({
	    type: 'Directory',
	    path: opts.path
	  });
	  writer.on('error', function(err) {
	    self.emit('error', err);
	  });
	  writer.on('close', function() {
	    self.emit('close')
	  });

	  this.on('pipe', function(source) {
	    if (opts.verbose && source.path) {
	      console.log('Archive: ', source.path);
	    }
	  });

	  this._parser.pipe(writer);
	}

	Extract.prototype._write = function (chunk, encoding, callback) {
	  if (this._parser.write(chunk)) {
	    return callback();
	  }

	  return this._parser.once('drain', callback);
	};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	exports.Abstract = __webpack_require__(97)
	exports.Reader = __webpack_require__(98)
	exports.Writer = __webpack_require__(110)

	exports.File =
	  { Reader: __webpack_require__(106)
	  , Writer: __webpack_require__(128) }

	exports.Dir = 
	  { Reader : __webpack_require__(104)
	  , Writer : __webpack_require__(125) }

	exports.Link =
	  { Reader : __webpack_require__(107)
	  , Writer : __webpack_require__(127) }

	exports.Proxy =
	  { Reader : __webpack_require__(109)
	  , Writer : __webpack_require__(129) }

	exports.Reader.Dir = exports.DirReader = exports.Dir.Reader
	exports.Reader.File = exports.FileReader = exports.File.Reader
	exports.Reader.Link = exports.LinkReader = exports.Link.Reader
	exports.Reader.Proxy = exports.ProxyReader = exports.Proxy.Reader

	exports.Writer.Dir = exports.DirWriter = exports.Dir.Writer
	exports.Writer.File = exports.FileWriter = exports.File.Writer
	exports.Writer.Link = exports.LinkWriter = exports.Link.Writer
	exports.Writer.Proxy = exports.ProxyWriter = exports.Proxy.Writer

	exports.collect = __webpack_require__(126)


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	// the parent class for all fstreams.

	module.exports = Abstract

	var Stream = __webpack_require__(17).Stream
	  , inherits = __webpack_require__(58)

	function Abstract () {
	  Stream.call(this)
	}

	inherits(Abstract, Stream)

	Abstract.prototype.on = function (ev, fn) {
	  if (ev === "ready" && this.ready) {
	    process.nextTick(fn.bind(this))
	  } else {
	    Stream.prototype.on.call(this, ev, fn)
	  }
	  return this
	}

	Abstract.prototype.abort = function () {
	  this._aborted = true
	  this.emit("abort")
	}

	Abstract.prototype.destroy = function () {}

	Abstract.prototype.warn = function (msg, code) {
	  var me = this
	    , er = decorate(msg, code, me)
	  if (!me.listeners("warn")) {
	    console.error("%s %s\n" +
	                  "path = %s\n" +
	                  "syscall = %s\n" +
	                  "fstream_type = %s\n" +
	                  "fstream_path = %s\n" +
	                  "fstream_unc_path = %s\n" +
	                  "fstream_class = %s\n" +
	                  "fstream_stack =\n%s\n",
	                  code || "UNKNOWN",
	                  er.stack,
	                  er.path,
	                  er.syscall,
	                  er.fstream_type,
	                  er.fstream_path,
	                  er.fstream_unc_path,
	                  er.fstream_class,
	                  er.fstream_stack.join("\n"))
	  } else {
	    me.emit("warn", er)
	  }
	}

	Abstract.prototype.info = function (msg, code) {
	  this.emit("info", msg, code)
	}

	Abstract.prototype.error = function (msg, code, th) {
	  var er = decorate(msg, code, this)
	  if (th) throw er
	  else this.emit("error", er)
	}

	function decorate (er, code, me) {
	  if (!(er instanceof Error)) er = new Error(er)
	  er.code = er.code || code
	  er.path = er.path || me.path
	  er.fstream_type = er.fstream_type || me.type
	  er.fstream_path = er.fstream_path || me.path
	  if (me._path !== me.path) {
	    er.fstream_unc_path = er.fstream_unc_path || me._path
	  }
	  if (me.linkpath) {
	    er.fstream_linkpath = er.fstream_linkpath || me.linkpath
	  }
	  er.fstream_class = er.fstream_class || me.constructor.name
	  er.fstream_stack = er.fstream_stack ||
	    new Error().stack.split(/\n/).slice(3).map(function (s) {
	      return s.replace(/^    at /, "")
	    })

	  return er
	}


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

	
	module.exports = Reader

	var fs = __webpack_require__(99)
	  , Stream = __webpack_require__(17).Stream
	  , inherits = __webpack_require__(58)
	  , path = __webpack_require__(3)
	  , getType = __webpack_require__(103)
	  , hardLinks = Reader.hardLinks = {}
	  , Abstract = __webpack_require__(97)

	// Must do this *before* loading the child classes
	inherits(Reader, Abstract)

	var DirReader = __webpack_require__(104)
	  , FileReader = __webpack_require__(106)
	  , LinkReader = __webpack_require__(107)
	  , SocketReader = __webpack_require__(108)
	  , ProxyReader = __webpack_require__(109)

	function Reader (props, currentStat) {
	  var me = this
	  if (!(me instanceof Reader)) return new Reader(props, currentStat)

	  if (typeof props === "string") {
	    props = { path: props }
	  }

	  if (!props.path) {
	    me.error("Must provide a path", null, true)
	  }

	  // polymorphism.
	  // call fstream.Reader(dir) to get a DirReader object, etc.
	  // Note that, unlike in the Writer case, ProxyReader is going
	  // to be the *normal* state of affairs, since we rarely know
	  // the type of a file prior to reading it.


	  var type
	    , ClassType

	  if (props.type && typeof props.type === "function") {
	    type = props.type
	    ClassType = type
	  } else {
	    type = getType(props)
	    ClassType = Reader
	  }

	  if (currentStat && !type) {
	    type = getType(currentStat)
	    props[type] = true
	    props.type = type
	  }

	  switch (type) {
	    case "Directory":
	      ClassType = DirReader
	      break

	    case "Link":
	      // XXX hard links are just files.
	      // However, it would be good to keep track of files' dev+inode
	      // and nlink values, and create a HardLinkReader that emits
	      // a linkpath value of the original copy, so that the tar
	      // writer can preserve them.
	      // ClassType = HardLinkReader
	      // break

	    case "File":
	      ClassType = FileReader
	      break

	    case "SymbolicLink":
	      ClassType = LinkReader
	      break

	    case "Socket":
	      ClassType = SocketReader
	      break

	    case null:
	      ClassType = ProxyReader
	      break
	  }

	  if (!(me instanceof ClassType)) {
	    return new ClassType(props)
	  }

	  Abstract.call(me)

	  me.readable = true
	  me.writable = false

	  me.type = type
	  me.props = props
	  me.depth = props.depth = props.depth || 0
	  me.parent = props.parent || null
	  me.root = props.root || (props.parent && props.parent.root) || me

	  me._path = me.path = path.resolve(props.path)
	  if (process.platform === "win32") {
	    me.path = me._path = me.path.replace(/\?/g, "_")
	    if (me._path.length >= 260) {
	      // how DOES one create files on the moon?
	      // if the path has spaces in it, then UNC will fail.
	      me._swallowErrors = true
	      //if (me._path.indexOf(" ") === -1) {
	        me._path = "\\\\?\\" + me.path.replace(/\//g, "\\")
	      //}
	    }
	  }
	  me.basename = props.basename = path.basename(me.path)
	  me.dirname = props.dirname = path.dirname(me.path)

	  // these have served their purpose, and are now just noisy clutter
	  props.parent = props.root = null

	  // console.error("\n\n\n%s setting size to", props.path, props.size)
	  me.size = props.size
	  me.filter = typeof props.filter === "function" ? props.filter : null
	  if (props.sort === "alpha") props.sort = alphasort

	  // start the ball rolling.
	  // this will stat the thing, and then call me._read()
	  // to start reading whatever it is.
	  // console.error("calling stat", props.path, currentStat)
	  me._stat(currentStat)
	}

	function alphasort (a, b) {
	  return a === b ? 0
	       : a.toLowerCase() > b.toLowerCase() ? 1
	       : a.toLowerCase() < b.toLowerCase() ? -1
	       : a > b ? 1
	       : -1
	}

	Reader.prototype._stat = function (currentStat) {
	  var me = this
	    , props = me.props
	    , stat = props.follow ? "stat" : "lstat"
	  // console.error("Reader._stat", me._path, currentStat)
	  if (currentStat) process.nextTick(statCb.bind(null, null, currentStat))
	  else fs[stat](me._path, statCb)


	  function statCb (er, props_) {
	    // console.error("Reader._stat, statCb", me._path, props_, props_.nlink)
	    if (er) return me.error(er)

	    Object.keys(props_).forEach(function (k) {
	      props[k] = props_[k]
	    })

	    // if it's not the expected size, then abort here.
	    if (undefined !== me.size && props.size !== me.size) {
	      return me.error("incorrect size")
	    }
	    me.size = props.size

	    var type = getType(props)
	    var handleHardlinks = props.hardlinks !== false
	    
	    // special little thing for handling hardlinks.
	    if (handleHardlinks && type !== "Directory" && props.nlink && props.nlink > 1) {
	      var k = props.dev + ":" + props.ino
	      // console.error("Reader has nlink", me._path, k)
	      if (hardLinks[k] === me._path || !hardLinks[k]) hardLinks[k] = me._path
	      else {
	        // switch into hardlink mode.
	        type = me.type = me.props.type = "Link"
	        me.Link = me.props.Link = true
	        me.linkpath = me.props.linkpath = hardLinks[k]
	        // console.error("Hardlink detected, switching mode", me._path, me.linkpath)
	        // Setting __proto__ would arguably be the "correct"
	        // approach here, but that just seems too wrong.
	        me._stat = me._read = LinkReader.prototype._read
	      }
	    }

	    if (me.type && me.type !== type) {
	      me.error("Unexpected type: " + type)
	    }

	    // if the filter doesn't pass, then just skip over this one.
	    // still have to emit end so that dir-walking can move on.
	    if (me.filter) {
	      var who = me._proxy || me
	      // special handling for ProxyReaders
	      if (!me.filter.call(who, who, props)) {
	        if (!me._disowned) {
	          me.abort()
	          me.emit("end")
	          me.emit("close")
	        }
	        return
	      }
	    }

	    // last chance to abort or disown before the flow starts!
	    var events = ["_stat", "stat", "ready"]
	    var e = 0
	    ;(function go () {
	      if (me._aborted) {
	        me.emit("end")
	        me.emit("close")
	        return
	      }

	      if (me._paused && me.type !== "Directory") {
	        me.once("resume", go)
	        return
	      }

	      var ev = events[e ++]
	      if (!ev) {
	        return me._read()
	      }
	      me.emit(ev, props)
	      go()
	    })()
	  }
	}

	Reader.prototype.pipe = function (dest, opts) {
	  var me = this
	  if (typeof dest.add === "function") {
	    // piping to a multi-compatible, and we've got directory entries.
	    me.on("entry", function (entry) {
	      var ret = dest.add(entry)
	      if (false === ret) {
	        me.pause()
	      }
	    })
	  }

	  // console.error("R Pipe apply Stream Pipe")
	  return Stream.prototype.pipe.apply(this, arguments)
	}

	Reader.prototype.pause = function (who) {
	  this._paused = true
	  who = who || this
	  this.emit("pause", who)
	  if (this._stream) this._stream.pause(who)
	}

	Reader.prototype.resume = function (who) {
	  this._paused = false
	  who = who || this
	  this.emit("resume", who)
	  if (this._stream) this._stream.resume(who)
	  this._read()
	}

	Reader.prototype._read = function () {
	  this.error("Cannot read unknown type: "+this.type)
	}



/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	// Monkey-patching the fs module.
	// It's ugly, but there is simply no other way to do this.
	var fs = module.exports = __webpack_require__(100)

	var assert = __webpack_require__(19)

	// fix up some busted stuff, mostly on windows and old nodes
	__webpack_require__(102)

	var util = __webpack_require__(18)

	function noop () {}

	var debug = noop
	if (util.debuglog)
	  debug = util.debuglog('gfs')
	else if (/\bgfs\b/i.test(process.env.NODE_DEBUG || ''))
	  debug = function() {
	    var m = util.format.apply(util, arguments)
	    m = 'GFS: ' + m.split(/\n/).join('\nGFS: ')
	    console.error(m)
	  }

	if (/\bgfs\b/i.test(process.env.NODE_DEBUG || '')) {
	  process.on('exit', function() {
	    debug('fds', fds)
	    debug(queue)
	    assert.equal(queue.length, 0)
	  })
	}


	var originalOpen = fs.open
	fs.open = open

	function open(path, flags, mode, cb) {
	  if (typeof mode === "function") cb = mode, mode = null
	  if (typeof cb !== "function") cb = noop
	  new OpenReq(path, flags, mode, cb)
	}

	function OpenReq(path, flags, mode, cb) {
	  this.path = path
	  this.flags = flags
	  this.mode = mode
	  this.cb = cb
	  Req.call(this)
	}

	util.inherits(OpenReq, Req)

	OpenReq.prototype.process = function() {
	  originalOpen.call(fs, this.path, this.flags, this.mode, this.done)
	}

	var fds = {}
	OpenReq.prototype.done = function(er, fd) {
	  debug('open done', er, fd)
	  if (fd)
	    fds['fd' + fd] = this.path
	  Req.prototype.done.call(this, er, fd)
	}


	var originalReaddir = fs.readdir
	fs.readdir = readdir

	function readdir(path, cb) {
	  if (typeof cb !== "function") cb = noop
	  new ReaddirReq(path, cb)
	}

	function ReaddirReq(path, cb) {
	  this.path = path
	  this.cb = cb
	  Req.call(this)
	}

	util.inherits(ReaddirReq, Req)

	ReaddirReq.prototype.process = function() {
	  originalReaddir.call(fs, this.path, this.done)
	}

	ReaddirReq.prototype.done = function(er, files) {
	  if (files && files.sort)
	    files = files.sort()
	  Req.prototype.done.call(this, er, files)
	  onclose()
	}


	var originalClose = fs.close
	fs.close = close

	function close (fd, cb) {
	  debug('close', fd)
	  if (typeof cb !== "function") cb = noop
	  delete fds['fd' + fd]
	  originalClose.call(fs, fd, function(er) {
	    onclose()
	    cb(er)
	  })
	}


	var originalCloseSync = fs.closeSync
	fs.closeSync = closeSync

	function closeSync (fd) {
	  try {
	    return originalCloseSync(fd)
	  } finally {
	    onclose()
	  }
	}


	// Req class
	function Req () {
	  // start processing
	  this.done = this.done.bind(this)
	  this.failures = 0
	  this.process()
	}

	Req.prototype.done = function (er, result) {
	  var tryAgain = false
	  if (er) {
	    var code = er.code
	    var tryAgain = code === "EMFILE" || code === "ENFILE"
	    if (process.platform === "win32")
	      tryAgain = tryAgain || code === "OK"
	  }

	  if (tryAgain) {
	    this.failures ++
	    enqueue(this)
	  } else {
	    var cb = this.cb
	    cb(er, result)
	  }
	}

	var queue = []

	function enqueue(req) {
	  queue.push(req)
	  debug('enqueue %d %s', queue.length, req.constructor.name, req)
	}

	function onclose() {
	  var req = queue.shift()
	  if (req) {
	    debug('process', req.constructor.name, req)
	    req.process()
	  }
	}


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(101).require('fs', ['stream'])


/***/ }),
/* 101 */
/***/ (function(module, exports) {

	var natives = process.binding('natives')
	var module = require('module')
	var normalRequire = require
	exports.source = src
	exports.require = req
	var vm = require('vm')

	// fallback for 0.x support
	var runInThisContext, ContextifyScript, Script
	/*istanbul ignore next*/
	try {
	  ContextifyScript = process.binding('contextify').ContextifyScript;
	  runInThisContext = function runInThisContext(code, options) {
	    var script = new ContextifyScript(code, options);
	    return script.runInThisContext();
	  }
	} catch (er) {
	  Script = process.binding('evals').NodeScript;
	  runInThisContext = Script.runInThisContext;
	}

	var wrap = [
	  '(function (exports, require, module, __filename, __dirname) { ',
	  '\n});'
	];


	// Basically the same functionality as node's (buried deep)
	// NativeModule class, but without caching, or internal/ blocking,
	// or a class, since that's not really necessary.  I assume that if
	// you're loading something with this module, it's because you WANT
	// a separate copy.  However, to preserve semantics, any require()
	// calls made throughout the internal module load IS cached.
	function req (id, whitelist) {
	  var cache = Object.create(null)

	  if (Array.isArray(whitelist)) {
	    // a whitelist of things to pull from the "actual" native modules
	    whitelist.forEach(function (id) {
	      cache[id] = {
	        loading: false,
	        loaded: true,
	        filename: id + '.js',
	        exports: require(id)
	      }
	    })
	  }

	  return req_(id, cache)
	}

	function req_ (id, cache) {
	  // Buffer is special, because it's a type rather than a "normal"
	  // class, and many things depend on `Buffer.isBuffer` working.
	  if (id === 'buffer') {
	    return require('buffer')
	  }

	  // native_module isn't actually a natives binding.
	  // weird, right?
	  if (id === 'native_module') {
	    return {
	      getSource: src,
	      wrap: function (script) {
	        return wrap[0] + script + wrap[1]
	      },
	      wrapper: wrap,
	      _cache: cache
	    }
	  }

	  var source = src(id)
	  if (!source) {
	    return undefined
	  }
	  source = wrap[0] + source + wrap[1]

	  var cachingRequire = function require (id) {
	    if (cache[id]) {
	      return cache[id].exports
	    }
	    return req_(id, cache)
	  }

	  var nm = {
	    exports: {},
	    loading: true,
	    loaded: false,
	    filename: id + '.js'
	  }
	  cache[id] = nm
	  var fn
	  try {
	    /* istanbul ignore else */
	    if (ContextifyScript) {
	      fn = runInThisContext(source, {
	        filename: nm.filename,
	        lineOffset: 0,
	        displayErrors: true
	      });
	    } else {
	      fn = runInThisContext(source, nm.filename, true);
	    }
	    fn(nm.exports, cachingRequire, nm, nm.filename)
	    nm.loaded = true
	  } finally {
	    nm.loading = false
	  }

	  return nm.exports
	}

	function src (id) {
	  return natives[id]
	}


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(100)
	var constants = __webpack_require__(15)

	var origCwd = process.cwd
	var cwd = null
	process.cwd = function() {
	  if (!cwd)
	    cwd = origCwd.call(process)
	  return cwd
	}
	var chdir = process.chdir
	process.chdir = function(d) {
	  cwd = null
	  chdir.call(process, d)
	}

	// (re-)implement some things that are known busted or missing.

	// lchmod, broken prior to 0.6.2
	// back-port the fix here.
	if (constants.hasOwnProperty('O_SYMLINK') &&
	    process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
	  fs.lchmod = function (path, mode, callback) {
	    callback = callback || noop
	    fs.open( path
	           , constants.O_WRONLY | constants.O_SYMLINK
	           , mode
	           , function (err, fd) {
	      if (err) {
	        callback(err)
	        return
	      }
	      // prefer to return the chmod error, if one occurs,
	      // but still try to close, and report closing errors if they occur.
	      fs.fchmod(fd, mode, function (err) {
	        fs.close(fd, function(err2) {
	          callback(err || err2)
	        })
	      })
	    })
	  }

	  fs.lchmodSync = function (path, mode) {
	    var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)

	    // prefer to return the chmod error, if one occurs,
	    // but still try to close, and report closing errors if they occur.
	    var err, err2
	    try {
	      var ret = fs.fchmodSync(fd, mode)
	    } catch (er) {
	      err = er
	    }
	    try {
	      fs.closeSync(fd)
	    } catch (er) {
	      err2 = er
	    }
	    if (err || err2) throw (err || err2)
	    return ret
	  }
	}


	// lutimes implementation, or no-op
	if (!fs.lutimes) {
	  if (constants.hasOwnProperty("O_SYMLINK")) {
	    fs.lutimes = function (path, at, mt, cb) {
	      fs.open(path, constants.O_SYMLINK, function (er, fd) {
	        cb = cb || noop
	        if (er) return cb(er)
	        fs.futimes(fd, at, mt, function (er) {
	          fs.close(fd, function (er2) {
	            return cb(er || er2)
	          })
	        })
	      })
	    }

	    fs.lutimesSync = function (path, at, mt) {
	      var fd = fs.openSync(path, constants.O_SYMLINK)
	        , err
	        , err2
	        , ret

	      try {
	        var ret = fs.futimesSync(fd, at, mt)
	      } catch (er) {
	        err = er
	      }
	      try {
	        fs.closeSync(fd)
	      } catch (er) {
	        err2 = er
	      }
	      if (err || err2) throw (err || err2)
	      return ret
	    }

	  } else if (fs.utimensat && constants.hasOwnProperty("AT_SYMLINK_NOFOLLOW")) {
	    // maybe utimensat will be bound soonish?
	    fs.lutimes = function (path, at, mt, cb) {
	      fs.utimensat(path, at, mt, constants.AT_SYMLINK_NOFOLLOW, cb)
	    }

	    fs.lutimesSync = function (path, at, mt) {
	      return fs.utimensatSync(path, at, mt, constants.AT_SYMLINK_NOFOLLOW)
	    }

	  } else {
	    fs.lutimes = function (_a, _b, _c, cb) { process.nextTick(cb) }
	    fs.lutimesSync = function () {}
	  }
	}


	// https://github.com/isaacs/node-graceful-fs/issues/4
	// Chown should not fail on einval or eperm if non-root.
	// It should not fail on enosys ever, as this just indicates
	// that a fs doesn't support the intended operation.

	fs.chown = chownFix(fs.chown)
	fs.fchown = chownFix(fs.fchown)
	fs.lchown = chownFix(fs.lchown)

	fs.chmod = chownFix(fs.chmod)
	fs.fchmod = chownFix(fs.fchmod)
	fs.lchmod = chownFix(fs.lchmod)

	fs.chownSync = chownFixSync(fs.chownSync)
	fs.fchownSync = chownFixSync(fs.fchownSync)
	fs.lchownSync = chownFixSync(fs.lchownSync)

	fs.chmodSync = chownFix(fs.chmodSync)
	fs.fchmodSync = chownFix(fs.fchmodSync)
	fs.lchmodSync = chownFix(fs.lchmodSync)

	function chownFix (orig) {
	  if (!orig) return orig
	  return function (target, uid, gid, cb) {
	    return orig.call(fs, target, uid, gid, function (er, res) {
	      if (chownErOk(er)) er = null
	      cb(er, res)
	    })
	  }
	}

	function chownFixSync (orig) {
	  if (!orig) return orig
	  return function (target, uid, gid) {
	    try {
	      return orig.call(fs, target, uid, gid)
	    } catch (er) {
	      if (!chownErOk(er)) throw er
	    }
	  }
	}

	// ENOSYS means that the fs doesn't support the op. Just ignore
	// that, because it doesn't matter.
	//
	// if there's no getuid, or if getuid() is something other
	// than 0, and the error is EINVAL or EPERM, then just ignore
	// it.
	//
	// This specific case is a silent failure in cp, install, tar,
	// and most other unix tools that manage permissions.
	//
	// When running as root, or if other types of errors are
	// encountered, then it's strict.
	function chownErOk (er) {
	  if (!er)
	    return true

	  if (er.code === "ENOSYS")
	    return true

	  var nonroot = !process.getuid || process.getuid() !== 0
	  if (nonroot) {
	    if (er.code === "EINVAL" || er.code === "EPERM")
	      return true
	  }

	  return false
	}


	// if lchmod/lchown do not exist, then make them no-ops
	if (!fs.lchmod) {
	  fs.lchmod = function (path, mode, cb) {
	    process.nextTick(cb)
	  }
	  fs.lchmodSync = function () {}
	}
	if (!fs.lchown) {
	  fs.lchown = function (path, uid, gid, cb) {
	    process.nextTick(cb)
	  }
	  fs.lchownSync = function () {}
	}



	// on Windows, A/V software can lock the directory, causing this
	// to fail with an EACCES or EPERM if the directory contains newly
	// created files.  Try again on failure, for up to 1 second.
	if (process.platform === "win32") {
	  var rename_ = fs.rename
	  fs.rename = function rename (from, to, cb) {
	    var start = Date.now()
	    rename_(from, to, function CB (er) {
	      if (er
	          && (er.code === "EACCES" || er.code === "EPERM")
	          && Date.now() - start < 1000) {
	        return rename_(from, to, CB)
	      }
	      if(cb) cb(er)
	    })
	  }
	}


	// if read() returns EAGAIN, then just try it again.
	var read = fs.read
	fs.read = function (fd, buffer, offset, length, position, callback_) {
	  var callback
	  if (callback_ && typeof callback_ === 'function') {
	    var eagCounter = 0
	    callback = function (er, _, __) {
	      if (er && er.code === 'EAGAIN' && eagCounter < 10) {
	        eagCounter ++
	        return read.call(fs, fd, buffer, offset, length, position, callback)
	      }
	      callback_.apply(this, arguments)
	    }
	  }
	  return read.call(fs, fd, buffer, offset, length, position, callback)
	}

	var readSync = fs.readSync
	fs.readSync = function (fd, buffer, offset, length, position) {
	  var eagCounter = 0
	  while (true) {
	    try {
	      return readSync.call(fs, fd, buffer, offset, length, position)
	    } catch (er) {
	      if (er.code === 'EAGAIN' && eagCounter < 10) {
	        eagCounter ++
	        continue
	      }
	      throw er
	    }
	  }
	}



/***/ }),
/* 103 */
/***/ (function(module, exports) {

	module.exports = getType

	function getType (st) {
	  var types =
	      [ "Directory"
	      , "File"
	      , "SymbolicLink"
	      , "Link" // special for hardlinks from tarballs
	      , "BlockDevice"
	      , "CharacterDevice"
	      , "FIFO"
	      , "Socket" ]
	    , type

	  if (st.type && -1 !== types.indexOf(st.type)) {
	    st[st.type] = true
	    return st.type
	  }

	  for (var i = 0, l = types.length; i < l; i ++) {
	    type = types[i]
	    var is = st[type] || st["is" + type]
	    if (typeof is === "function") is = is.call(st)
	    if (is) {
	      st[type] = true
	      st.type = type
	      return type
	    }
	  }

	  return null
	}


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	// A thing that emits "entry" events with Reader objects
	// Pausing it causes it to stop emitting entry events, and also
	// pauses the current entry if there is one.

	module.exports = DirReader

	var fs = __webpack_require__(99)
	  , fstream = __webpack_require__(96)
	  , Reader = fstream.Reader
	  , inherits = __webpack_require__(58)
	  , mkdir = __webpack_require__(105)
	  , path = __webpack_require__(3)
	  , Reader = __webpack_require__(98)
	  , assert = __webpack_require__(19).ok

	inherits(DirReader, Reader)

	function DirReader (props) {
	  var me = this
	  if (!(me instanceof DirReader)) throw new Error(
	    "DirReader must be called as constructor.")

	  // should already be established as a Directory type
	  if (props.type !== "Directory" || !props.Directory) {
	    throw new Error("Non-directory type "+ props.type)
	  }

	  me.entries = null
	  me._index = -1
	  me._paused = false
	  me._length = -1

	  if (props.sort) {
	    this.sort = props.sort
	  }

	  Reader.call(this, props)
	}

	DirReader.prototype._getEntries = function () {
	  var me = this

	  // race condition.  might pause() before calling _getEntries,
	  // and then resume, and try to get them a second time.
	  if (me._gotEntries) return
	  me._gotEntries = true

	  fs.readdir(me._path, function (er, entries) {
	    if (er) return me.error(er)

	    me.entries = entries

	    me.emit("entries", entries)
	    if (me._paused) me.once("resume", processEntries)
	    else processEntries()

	    function processEntries () {
	      me._length = me.entries.length
	      if (typeof me.sort === "function") {
	        me.entries = me.entries.sort(me.sort.bind(me))
	      }
	      me._read()
	    }
	  })
	}

	// start walking the dir, and emit an "entry" event for each one.
	DirReader.prototype._read = function () {
	  var me = this

	  if (!me.entries) return me._getEntries()

	  if (me._paused || me._currentEntry || me._aborted) {
	    // console.error("DR paused=%j, current=%j, aborted=%j", me._paused, !!me._currentEntry, me._aborted)
	    return
	  }

	  me._index ++
	  if (me._index >= me.entries.length) {
	    if (!me._ended) {
	      me._ended = true
	      me.emit("end")
	      me.emit("close")
	    }
	    return
	  }

	  // ok, handle this one, then.

	  // save creating a proxy, by stat'ing the thing now.
	  var p = path.resolve(me._path, me.entries[me._index])
	  assert(p !== me._path)
	  assert(me.entries[me._index])

	  // set this to prevent trying to _read() again in the stat time.
	  me._currentEntry = p
	  fs[ me.props.follow ? "stat" : "lstat" ](p, function (er, stat) {
	    if (er) return me.error(er)

	    var who = me._proxy || me

	    stat.path = p
	    stat.basename = path.basename(p)
	    stat.dirname = path.dirname(p)
	    var childProps = me.getChildProps.call(who, stat)
	    childProps.path = p
	    childProps.basename = path.basename(p)
	    childProps.dirname = path.dirname(p)

	    var entry = Reader(childProps, stat)

	    // console.error("DR Entry", p, stat.size)

	    me._currentEntry = entry

	    // "entry" events are for direct entries in a specific dir.
	    // "child" events are for any and all children at all levels.
	    // This nomenclature is not completely final.

	    entry.on("pause", function (who) {
	      if (!me._paused && !entry._disowned) {
	        me.pause(who)
	      }
	    })

	    entry.on("resume", function (who) {
	      if (me._paused && !entry._disowned) {
	        me.resume(who)
	      }
	    })

	    entry.on("stat", function (props) {
	      me.emit("_entryStat", entry, props)
	      if (entry._aborted) return
	      if (entry._paused) entry.once("resume", function () {
	        me.emit("entryStat", entry, props)
	      })
	      else me.emit("entryStat", entry, props)
	    })

	    entry.on("ready", function EMITCHILD () {
	      // console.error("DR emit child", entry._path)
	      if (me._paused) {
	        // console.error("  DR emit child - try again later")
	        // pause the child, and emit the "entry" event once we drain.
	        // console.error("DR pausing child entry")
	        entry.pause(me)
	        return me.once("resume", EMITCHILD)
	      }

	      // skip over sockets.  they can't be piped around properly,
	      // so there's really no sense even acknowledging them.
	      // if someone really wants to see them, they can listen to
	      // the "socket" events.
	      if (entry.type === "Socket") {
	        me.emit("socket", entry)
	      } else {
	        me.emitEntry(entry)
	      }
	    })

	    var ended = false
	    entry.on("close", onend)
	    entry.on("disown", onend)
	    function onend () {
	      if (ended) return
	      ended = true
	      me.emit("childEnd", entry)
	      me.emit("entryEnd", entry)
	      me._currentEntry = null
	      if (!me._paused) {
	        me._read()
	      }
	    }

	    // XXX Remove this.  Works in node as of 0.6.2 or so.
	    // Long filenames should not break stuff.
	    entry.on("error", function (er) {
	      if (entry._swallowErrors) {
	        me.warn(er)
	        entry.emit("end")
	        entry.emit("close")
	      } else {
	        me.emit("error", er)
	      }
	    })

	    // proxy up some events.
	    ; [ "child"
	      , "childEnd"
	      , "warn"
	      ].forEach(function (ev) {
	        entry.on(ev, me.emit.bind(me, ev))
	      })
	  })
	}

	DirReader.prototype.disown = function (entry) {
	  entry.emit("beforeDisown")
	  entry._disowned = true
	  entry.parent = entry.root = null
	  if (entry === this._currentEntry) {
	    this._currentEntry = null
	  }
	  entry.emit("disown")
	}

	DirReader.prototype.getChildProps = function (stat) {
	  return { depth: this.depth + 1
	         , root: this.root || this
	         , parent: this
	         , follow: this.follow
	         , filter: this.filter
	         , sort: this.props.sort
	         , hardlinks: this.props.hardlinks
	         }
	}

	DirReader.prototype.pause = function (who) {
	  var me = this
	  if (me._paused) return
	  who = who || me
	  me._paused = true
	  if (me._currentEntry && me._currentEntry.pause) {
	    me._currentEntry.pause(who)
	  }
	  me.emit("pause", who)
	}

	DirReader.prototype.resume = function (who) {
	  var me = this
	  if (!me._paused) return
	  who = who || me

	  me._paused = false
	  // console.error("DR Emit Resume", me._path)
	  me.emit("resume", who)
	  if (me._paused) {
	    // console.error("DR Re-paused", me._path)
	    return
	  }

	  if (me._currentEntry) {
	    if (me._currentEntry.resume) me._currentEntry.resume(who)
	  } else me._read()
	}

	DirReader.prototype.emitEntry = function (entry) {
	  this.emit("entry", entry)
	  this.emit("child", entry)
	}


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	var path = __webpack_require__(3);
	var fs = __webpack_require__(7);
	var _0777 = parseInt('0777', 8);

	module.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;

	function mkdirP (p, opts, f, made) {
	    if (typeof opts === 'function') {
	        f = opts;
	        opts = {};
	    }
	    else if (!opts || typeof opts !== 'object') {
	        opts = { mode: opts };
	    }
	    
	    var mode = opts.mode;
	    var xfs = opts.fs || fs;
	    
	    if (mode === undefined) {
	        mode = _0777 & (~process.umask());
	    }
	    if (!made) made = null;
	    
	    var cb = f || function () {};
	    p = path.resolve(p);
	    
	    xfs.mkdir(p, mode, function (er) {
	        if (!er) {
	            made = made || p;
	            return cb(null, made);
	        }
	        switch (er.code) {
	            case 'ENOENT':
	                mkdirP(path.dirname(p), opts, function (er, made) {
	                    if (er) cb(er, made);
	                    else mkdirP(p, opts, cb, made);
	                });
	                break;

	            // In the case of any other error, just see if there's a dir
	            // there already.  If so, then hooray!  If not, then something
	            // is borked.
	            default:
	                xfs.stat(p, function (er2, stat) {
	                    // if the stat fails, then that's super weird.
	                    // let the original error be the failure reason.
	                    if (er2 || !stat.isDirectory()) cb(er, made)
	                    else cb(null, made);
	                });
	                break;
	        }
	    });
	}

	mkdirP.sync = function sync (p, opts, made) {
	    if (!opts || typeof opts !== 'object') {
	        opts = { mode: opts };
	    }
	    
	    var mode = opts.mode;
	    var xfs = opts.fs || fs;
	    
	    if (mode === undefined) {
	        mode = _0777 & (~process.umask());
	    }
	    if (!made) made = null;

	    p = path.resolve(p);

	    try {
	        xfs.mkdirSync(p, mode);
	        made = made || p;
	    }
	    catch (err0) {
	        switch (err0.code) {
	            case 'ENOENT' :
	                made = sync(path.dirname(p), opts, made);
	                sync(p, opts, made);
	                break;

	            // In the case of any other error, just see if there's a dir
	            // there already.  If so, then hooray!  If not, then something
	            // is borked.
	            default:
	                var stat;
	                try {
	                    stat = xfs.statSync(p);
	                }
	                catch (err1) {
	                    throw err0;
	                }
	                if (!stat.isDirectory()) throw err0;
	                break;
	        }
	    }

	    return made;
	};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	// Basically just a wrapper around an fs.ReadStream

	module.exports = FileReader

	var fs = __webpack_require__(99)
	  , fstream = __webpack_require__(96)
	  , Reader = fstream.Reader
	  , inherits = __webpack_require__(58)
	  , mkdir = __webpack_require__(105)
	  , Reader = __webpack_require__(98)
	  , EOF = {EOF: true}
	  , CLOSE = {CLOSE: true}

	inherits(FileReader, Reader)

	function FileReader (props) {
	  // console.error("    FR create", props.path, props.size, new Error().stack)
	  var me = this
	  if (!(me instanceof FileReader)) throw new Error(
	    "FileReader must be called as constructor.")

	  // should already be established as a File type
	  // XXX Todo: preserve hardlinks by tracking dev+inode+nlink,
	  // with a HardLinkReader class.
	  if (!((props.type === "Link" && props.Link) ||
	        (props.type === "File" && props.File))) {
	    throw new Error("Non-file type "+ props.type)
	  }

	  me._buffer = []
	  me._bytesEmitted = 0
	  Reader.call(me, props)
	}

	FileReader.prototype._getStream = function () {
	  var me = this
	    , stream = me._stream = fs.createReadStream(me._path, me.props)

	  if (me.props.blksize) {
	    stream.bufferSize = me.props.blksize
	  }

	  stream.on("open", me.emit.bind(me, "open"))

	  stream.on("data", function (c) {
	    // console.error("\t\t%d %s", c.length, me.basename)
	    me._bytesEmitted += c.length
	    // no point saving empty chunks
	    if (!c.length) return
	    else if (me._paused || me._buffer.length) {
	      me._buffer.push(c)
	      me._read()
	    } else me.emit("data", c)
	  })

	  stream.on("end", function () {
	    if (me._paused || me._buffer.length) {
	      // console.error("FR Buffering End", me._path)
	      me._buffer.push(EOF)
	      me._read()
	    } else {
	      me.emit("end")
	    }

	    if (me._bytesEmitted !== me.props.size) {
	      me.error("Didn't get expected byte count\n"+
	               "expect: "+me.props.size + "\n" +
	               "actual: "+me._bytesEmitted)
	    }
	  })

	  stream.on("close", function () {
	    if (me._paused || me._buffer.length) {
	      // console.error("FR Buffering Close", me._path)
	      me._buffer.push(CLOSE)
	      me._read()
	    } else {
	      // console.error("FR close 1", me._path)
	      me.emit("close")
	    }
	  })

	  me._read()
	}

	FileReader.prototype._read = function () {
	  var me = this
	  // console.error("FR _read", me._path)
	  if (me._paused) {
	    // console.error("FR _read paused", me._path)
	    return
	  }

	  if (!me._stream) {
	    // console.error("FR _getStream calling", me._path)
	    return me._getStream()
	  }

	  // clear out the buffer, if there is one.
	  if (me._buffer.length) {
	    // console.error("FR _read has buffer", me._buffer.length, me._path)
	    var buf = me._buffer
	    for (var i = 0, l = buf.length; i < l; i ++) {
	      var c = buf[i]
	      if (c === EOF) {
	        // console.error("FR Read emitting buffered end", me._path)
	        me.emit("end")
	      } else if (c === CLOSE) {
	        // console.error("FR Read emitting buffered close", me._path)
	        me.emit("close")
	      } else {
	        // console.error("FR Read emitting buffered data", me._path)
	        me.emit("data", c)
	      }

	      if (me._paused) {
	        // console.error("FR Read Re-pausing at "+i, me._path)
	        me._buffer = buf.slice(i)
	        return
	      }
	    }
	    me._buffer.length = 0
	  }
	  // console.error("FR _read done")
	  // that's about all there is to it.
	}

	FileReader.prototype.pause = function (who) {
	  var me = this
	  // console.error("FR Pause", me._path)
	  if (me._paused) return
	  who = who || me
	  me._paused = true
	  if (me._stream) me._stream.pause()
	  me.emit("pause", who)
	}

	FileReader.prototype.resume = function (who) {
	  var me = this
	  // console.error("FR Resume", me._path)
	  if (!me._paused) return
	  who = who || me
	  me.emit("resume", who)
	  me._paused = false
	  if (me._stream) me._stream.resume()
	  me._read()
	}


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	// Basically just a wrapper around an fs.readlink
	//
	// XXX: Enhance this to support the Link type, by keeping
	// a lookup table of {<dev+inode>:<path>}, so that hardlinks
	// can be preserved in tarballs.

	module.exports = LinkReader

	var fs = __webpack_require__(99)
	  , fstream = __webpack_require__(96)
	  , inherits = __webpack_require__(58)
	  , mkdir = __webpack_require__(105)
	  , Reader = __webpack_require__(98)

	inherits(LinkReader, Reader)

	function LinkReader (props) {
	  var me = this
	  if (!(me instanceof LinkReader)) throw new Error(
	    "LinkReader must be called as constructor.")

	  if (!((props.type === "Link" && props.Link) ||
	        (props.type === "SymbolicLink" && props.SymbolicLink))) {
	    throw new Error("Non-link type "+ props.type)
	  }

	  Reader.call(me, props)
	}

	// When piping a LinkReader into a LinkWriter, we have to
	// already have the linkpath property set, so that has to
	// happen *before* the "ready" event, which means we need to
	// override the _stat method.
	LinkReader.prototype._stat = function (currentStat) {
	  var me = this
	  fs.readlink(me._path, function (er, linkpath) {
	    if (er) return me.error(er)
	    me.linkpath = me.props.linkpath = linkpath
	    me.emit("linkpath", linkpath)
	    Reader.prototype._stat.call(me, currentStat)
	  })
	}

	LinkReader.prototype._read = function () {
	  var me = this
	  if (me._paused) return
	  // basically just a no-op, since we got all the info we need
	  // from the _stat method
	  if (!me._ended) {
	    me.emit("end")
	    me.emit("close")
	    me._ended = true
	  }
	}


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	// Just get the stats, and then don't do anything.
	// You can't really "read" from a socket.  You "connect" to it.
	// Mostly, this is here so that reading a dir with a socket in it
	// doesn't blow up.

	module.exports = SocketReader

	var fs = __webpack_require__(99)
	  , fstream = __webpack_require__(96)
	  , inherits = __webpack_require__(58)
	  , mkdir = __webpack_require__(105)
	  , Reader = __webpack_require__(98)

	inherits(SocketReader, Reader)

	function SocketReader (props) {
	  var me = this
	  if (!(me instanceof SocketReader)) throw new Error(
	    "SocketReader must be called as constructor.")

	  if (!(props.type === "Socket" && props.Socket)) {
	    throw new Error("Non-socket type "+ props.type)
	  }

	  Reader.call(me, props)
	}

	SocketReader.prototype._read = function () {
	  var me = this
	  if (me._paused) return
	  // basically just a no-op, since we got all the info we have
	  // from the _stat method
	  if (!me._ended) {
	    me.emit("end")
	    me.emit("close")
	    me._ended = true
	  }
	}


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

	// A reader for when we don't yet know what kind of thing
	// the thing is.

	module.exports = ProxyReader

	var Reader = __webpack_require__(98)
	  , getType = __webpack_require__(103)
	  , inherits = __webpack_require__(58)
	  , fs = __webpack_require__(99)

	inherits(ProxyReader, Reader)

	function ProxyReader (props) {
	  var me = this
	  if (!(me instanceof ProxyReader)) throw new Error(
	    "ProxyReader must be called as constructor.")

	  me.props = props
	  me._buffer = []
	  me.ready = false

	  Reader.call(me, props)
	}

	ProxyReader.prototype._stat = function () {
	  var me = this
	    , props = me.props
	    // stat the thing to see what the proxy should be.
	    , stat = props.follow ? "stat" : "lstat"

	  fs[stat](props.path, function (er, current) {
	    var type
	    if (er || !current) {
	      type = "File"
	    } else {
	      type = getType(current)
	    }

	    props[type] = true
	    props.type = me.type = type

	    me._old = current
	    me._addProxy(Reader(props, current))
	  })
	}

	ProxyReader.prototype._addProxy = function (proxy) {
	  var me = this
	  if (me._proxyTarget) {
	    return me.error("proxy already set")
	  }

	  me._proxyTarget = proxy
	  proxy._proxy = me

	  ; [ "error"
	    , "data"
	    , "end"
	    , "close"
	    , "linkpath"
	    , "entry"
	    , "entryEnd"
	    , "child"
	    , "childEnd"
	    , "warn"
	    , "stat"
	    ].forEach(function (ev) {
	      // console.error("~~ proxy event", ev, me.path)
	      proxy.on(ev, me.emit.bind(me, ev))
	    })

	  me.emit("proxy", proxy)

	  proxy.on("ready", function () {
	    // console.error("~~ proxy is ready!", me.path)
	    me.ready = true
	    me.emit("ready")
	  })

	  var calls = me._buffer
	  me._buffer.length = 0
	  calls.forEach(function (c) {
	    proxy[c[0]].apply(proxy, c[1])
	  })
	}

	ProxyReader.prototype.pause = function () {
	  return this._proxyTarget ? this._proxyTarget.pause() : false
	}

	ProxyReader.prototype.resume = function () {
	  return this._proxyTarget ? this._proxyTarget.resume() : false
	}


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	
	module.exports = Writer

	var fs = __webpack_require__(99)
	  , inherits = __webpack_require__(58)
	  , rimraf = __webpack_require__(111)
	  , mkdir = __webpack_require__(105)
	  , path = __webpack_require__(3)
	  , umask = process.platform === "win32" ? 0 : process.umask()
	  , getType = __webpack_require__(103)
	  , Abstract = __webpack_require__(97)

	// Must do this *before* loading the child classes
	inherits(Writer, Abstract)

	Writer.dirmode = 0777 & (~umask)
	Writer.filemode = 0666 & (~umask)

	var DirWriter = __webpack_require__(125)
	  , LinkWriter = __webpack_require__(127)
	  , FileWriter = __webpack_require__(128)
	  , ProxyWriter = __webpack_require__(129)

	// props is the desired state.  current is optionally the current stat,
	// provided here so that subclasses can avoid statting the target
	// more than necessary.
	function Writer (props, current) {
	  var me = this

	  if (typeof props === "string") {
	    props = { path: props }
	  }

	  if (!props.path) me.error("Must provide a path", null, true)

	  // polymorphism.
	  // call fstream.Writer(dir) to get a DirWriter object, etc.
	  var type = getType(props)
	    , ClassType = Writer

	  switch (type) {
	    case "Directory":
	      ClassType = DirWriter
	      break
	    case "File":
	      ClassType = FileWriter
	      break
	    case "Link":
	    case "SymbolicLink":
	      ClassType = LinkWriter
	      break
	    case null:
	      // Don't know yet what type to create, so we wrap in a proxy.
	      ClassType = ProxyWriter
	      break
	  }

	  if (!(me instanceof ClassType)) return new ClassType(props)

	  // now get down to business.

	  Abstract.call(me)

	  // props is what we want to set.
	  // set some convenience properties as well.
	  me.type = props.type
	  me.props = props
	  me.depth = props.depth || 0
	  me.clobber = false === props.clobber ? props.clobber : true
	  me.parent = props.parent || null
	  me.root = props.root || (props.parent && props.parent.root) || me

	  me._path = me.path = path.resolve(props.path)
	  if (process.platform === "win32") {
	    me.path = me._path = me.path.replace(/\?/g, "_")
	    if (me._path.length >= 260) {
	      me._swallowErrors = true
	      me._path = "\\\\?\\" + me.path.replace(/\//g, "\\")
	    }
	  }
	  me.basename = path.basename(props.path)
	  me.dirname = path.dirname(props.path)
	  me.linkpath = props.linkpath || null

	  props.parent = props.root = null

	  // console.error("\n\n\n%s setting size to", props.path, props.size)
	  me.size = props.size

	  if (typeof props.mode === "string") {
	    props.mode = parseInt(props.mode, 8)
	  }

	  me.readable = false
	  me.writable = true

	  // buffer until ready, or while handling another entry
	  me._buffer = []
	  me.ready = false

	  me.filter = typeof props.filter === "function" ? props.filter: null

	  // start the ball rolling.
	  // this checks what's there already, and then calls
	  // me._create() to call the impl-specific creation stuff.
	  me._stat(current)
	}

	// Calling this means that it's something we can't create.
	// Just assert that it's already there, otherwise raise a warning.
	Writer.prototype._create = function () {
	  var me = this
	  fs[me.props.follow ? "stat" : "lstat"](me._path, function (er, current) {
	    if (er) {
	      return me.warn("Cannot create " + me._path + "\n" +
	                     "Unsupported type: "+me.type, "ENOTSUP")
	    }
	    me._finish()
	  })
	}

	Writer.prototype._stat = function (current) {
	  var me = this
	    , props = me.props
	    , stat = props.follow ? "stat" : "lstat"
	    , who = me._proxy || me

	  if (current) statCb(null, current)
	  else fs[stat](me._path, statCb)

	  function statCb (er, current) {
	    if (me.filter && !me.filter.call(who, who, current)) {
	      me._aborted = true
	      me.emit("end")
	      me.emit("close")
	      return
	    }

	    // if it's not there, great.  We'll just create it.
	    // if it is there, then we'll need to change whatever differs
	    if (er || !current) {
	      return create(me)
	    }

	    me._old = current
	    var currentType = getType(current)

	    // if it's a type change, then we need to clobber or error.
	    // if it's not a type change, then let the impl take care of it.
	    if (currentType !== me.type) {
	      return rimraf(me._path, function (er) {
	        if (er) return me.error(er)
	        me._old = null
	        create(me)
	      })
	    }

	    // otherwise, just handle in the app-specific way
	    // this creates a fs.WriteStream, or mkdir's, or whatever
	    create(me)
	  }
	}

	function create (me) {
	  // console.error("W create", me._path, Writer.dirmode)

	  // XXX Need to clobber non-dirs that are in the way,
	  // unless { clobber: false } in the props.
	  mkdir(path.dirname(me._path), Writer.dirmode, function (er, made) {
	    // console.error("W created", path.dirname(me._path), er)
	    if (er) return me.error(er)

	    // later on, we have to set the mode and owner for these
	    me._madeDir = made
	    return me._create()
	  })
	}

	function endChmod (me, want, current, path, cb) {
	    var wantMode = want.mode
	      , chmod = want.follow || me.type !== "SymbolicLink"
	              ? "chmod" : "lchmod"

	  if (!fs[chmod]) return cb()
	  if (typeof wantMode !== "number") return cb()

	  var curMode = current.mode & 0777
	  wantMode = wantMode & 0777
	  if (wantMode === curMode) return cb()

	  fs[chmod](path, wantMode, cb)
	}


	function endChown (me, want, current, path, cb) {
	  // Don't even try it unless root.  Too easy to EPERM.
	  if (process.platform === "win32") return cb()
	  if (!process.getuid || !process.getuid() === 0) return cb()
	  if (typeof want.uid !== "number" &&
	      typeof want.gid !== "number" ) return cb()

	  if (current.uid === want.uid &&
	      current.gid === want.gid) return cb()

	  var chown = (me.props.follow || me.type !== "SymbolicLink")
	            ? "chown" : "lchown"
	  if (!fs[chown]) return cb()

	  if (typeof want.uid !== "number") want.uid = current.uid
	  if (typeof want.gid !== "number") want.gid = current.gid

	  fs[chown](path, want.uid, want.gid, cb)
	}

	function endUtimes (me, want, current, path, cb) {
	  if (!fs.utimes || process.platform === "win32") return cb()

	  var utimes = (want.follow || me.type !== "SymbolicLink")
	             ? "utimes" : "lutimes"

	  if (utimes === "lutimes" && !fs[utimes]) {
	    utimes = "utimes"
	  }

	  if (!fs[utimes]) return cb()

	  var curA = current.atime
	    , curM = current.mtime
	    , meA = want.atime
	    , meM = want.mtime

	  if (meA === undefined) meA = curA
	  if (meM === undefined) meM = curM

	  if (!isDate(meA)) meA = new Date(meA)
	  if (!isDate(meM)) meA = new Date(meM)

	  if (meA.getTime() === curA.getTime() &&
	      meM.getTime() === curM.getTime()) return cb()

	  fs[utimes](path, meA, meM, cb)
	}


	// XXX This function is beastly.  Break it up!
	Writer.prototype._finish = function () {
	  var me = this

	  // console.error(" W Finish", me._path, me.size)

	  // set up all the things.
	  // At this point, we're already done writing whatever we've gotta write,
	  // adding files to the dir, etc.
	  var todo = 0
	  var errState = null
	  var done = false

	  if (me._old) {
	    // the times will almost *certainly* have changed.
	    // adds the utimes syscall, but remove another stat.
	    me._old.atime = new Date(0)
	    me._old.mtime = new Date(0)
	    // console.error(" W Finish Stale Stat", me._path, me.size)
	    setProps(me._old)
	  } else {
	    var stat = me.props.follow ? "stat" : "lstat"
	    // console.error(" W Finish Stating", me._path, me.size)
	    fs[stat](me._path, function (er, current) {
	      // console.error(" W Finish Stated", me._path, me.size, current)
	      if (er) {
	        // if we're in the process of writing out a
	        // directory, it's very possible that the thing we're linking to
	        // doesn't exist yet (especially if it was intended as a symlink),
	        // so swallow ENOENT errors here and just soldier on.
	        if (er.code === "ENOENT" &&
	            (me.type === "Link" || me.type === "SymbolicLink") &&
	            process.platform === "win32") {
	          me.ready = true
	          me.emit("ready")
	          me.emit("end")
	          me.emit("close")
	          me.end = me._finish = function () {}
	          return
	        } else return me.error(er)
	      }
	      setProps(me._old = current)
	    })
	  }

	  return

	  function setProps (current) {
	    todo += 3
	    endChmod(me, me.props, current, me._path, next("chmod"))
	    endChown(me, me.props, current, me._path, next("chown"))
	    endUtimes(me, me.props, current, me._path, next("utimes"))
	  }

	  function next (what) {
	    return function (er) {
	      // console.error("   W Finish", what, todo)
	      if (errState) return
	      if (er) {
	        er.fstream_finish_call = what
	        return me.error(errState = er)
	      }
	      if (--todo > 0) return
	      if (done) return
	      done = true

	      // we may still need to set the mode/etc. on some parent dirs
	      // that were created previously.  delay end/close until then.
	      if (!me._madeDir) return end()
	      else endMadeDir(me, me._path, end)

	      function end (er) {
	        if (er) {
	          er.fstream_finish_call = "setupMadeDir"
	          return me.error(er)
	        }
	        // all the props have been set, so we're completely done.
	        me.emit("end")
	        me.emit("close")
	      }
	    }
	  }
	}

	function endMadeDir (me, p, cb) {
	  var made = me._madeDir
	  // everything *between* made and path.dirname(me._path)
	  // needs to be set up.  Note that this may just be one dir.
	  var d = path.dirname(p)

	  endMadeDir_(me, d, function (er) {
	    if (er) return cb(er)
	    if (d === made) {
	      return cb()
	    }
	    endMadeDir(me, d, cb)
	  })
	}

	function endMadeDir_ (me, p, cb) {
	  var dirProps = {}
	  Object.keys(me.props).forEach(function (k) {
	    dirProps[k] = me.props[k]

	    // only make non-readable dirs if explicitly requested.
	    if (k === "mode" && me.type !== "Directory") {
	      dirProps[k] = dirProps[k] | 0111
	    }
	  })

	  var todo = 3
	  , errState = null
	  fs.stat(p, function (er, current) {
	    if (er) return cb(errState = er)
	    endChmod(me, dirProps, current, p, next)
	    endChown(me, dirProps, current, p, next)
	    endUtimes(me, dirProps, current, p, next)
	  })

	  function next (er) {
	    if (errState) return
	    if (er) return cb(errState = er)
	    if (-- todo === 0) return cb()
	  }
	}

	Writer.prototype.pipe = function () {
	  this.error("Can't pipe from writable stream")
	}

	Writer.prototype.add = function () {
	  this.error("Cannot add to non-Directory type")
	}

	Writer.prototype.write = function () {
	  return true
	}

	function objectToString (d) {
	  return Object.prototype.toString.call(d)
	}

	function isDate(d) {
	  return typeof d === 'object' && objectToString(d) === '[object Date]';
	}


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = rimraf
	rimraf.sync = rimrafSync

	var assert = __webpack_require__(19)
	var path = __webpack_require__(3)
	var fs = __webpack_require__(7)
	var glob = __webpack_require__(112)

	var defaultGlobOpts = {
	  nosort: true,
	  silent: true
	}

	// for EMFILE handling
	var timeout = 0

	var isWindows = (process.platform === "win32")

	function defaults (options) {
	  var methods = [
	    'unlink',
	    'chmod',
	    'stat',
	    'lstat',
	    'rmdir',
	    'readdir'
	  ]
	  methods.forEach(function(m) {
	    options[m] = options[m] || fs[m]
	    m = m + 'Sync'
	    options[m] = options[m] || fs[m]
	  })

	  options.maxBusyTries = options.maxBusyTries || 3
	  options.emfileWait = options.emfileWait || 1000
	  if (options.glob === false) {
	    options.disableGlob = true
	  }
	  options.disableGlob = options.disableGlob || false
	  options.glob = options.glob || defaultGlobOpts
	}

	function rimraf (p, options, cb) {
	  if (typeof options === 'function') {
	    cb = options
	    options = {}
	  }

	  assert(p, 'rimraf: missing path')
	  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
	  assert.equal(typeof cb, 'function', 'rimraf: callback function required')
	  assert(options, 'rimraf: invalid options argument provided')
	  assert.equal(typeof options, 'object', 'rimraf: options should be object')

	  defaults(options)

	  var busyTries = 0
	  var errState = null
	  var n = 0

	  if (options.disableGlob || !glob.hasMagic(p))
	    return afterGlob(null, [p])

	  options.lstat(p, function (er, stat) {
	    if (!er)
	      return afterGlob(null, [p])

	    glob(p, options.glob, afterGlob)
	  })

	  function next (er) {
	    errState = errState || er
	    if (--n === 0)
	      cb(errState)
	  }

	  function afterGlob (er, results) {
	    if (er)
	      return cb(er)

	    n = results.length
	    if (n === 0)
	      return cb()

	    results.forEach(function (p) {
	      rimraf_(p, options, function CB (er) {
	        if (er) {
	          if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") &&
	              busyTries < options.maxBusyTries) {
	            busyTries ++
	            var time = busyTries * 100
	            // try again, with the same exact callback as this one.
	            return setTimeout(function () {
	              rimraf_(p, options, CB)
	            }, time)
	          }

	          // this one won't happen if graceful-fs is used.
	          if (er.code === "EMFILE" && timeout < options.emfileWait) {
	            return setTimeout(function () {
	              rimraf_(p, options, CB)
	            }, timeout ++)
	          }

	          // already gone
	          if (er.code === "ENOENT") er = null
	        }

	        timeout = 0
	        next(er)
	      })
	    })
	  }
	}

	// Two possible strategies.
	// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
	// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
	//
	// Both result in an extra syscall when you guess wrong.  However, there
	// are likely far more normal files in the world than directories.  This
	// is based on the assumption that a the average number of files per
	// directory is >= 1.
	//
	// If anyone ever complains about this, then I guess the strategy could
	// be made configurable somehow.  But until then, YAGNI.
	function rimraf_ (p, options, cb) {
	  assert(p)
	  assert(options)
	  assert(typeof cb === 'function')

	  // sunos lets the root user unlink directories, which is... weird.
	  // so we have to lstat here and make sure it's not a dir.
	  options.lstat(p, function (er, st) {
	    if (er && er.code === "ENOENT")
	      return cb(null)

	    // Windows can EPERM on stat.  Life is suffering.
	    if (er && er.code === "EPERM" && isWindows)
	      fixWinEPERM(p, options, er, cb)

	    if (st && st.isDirectory())
	      return rmdir(p, options, er, cb)

	    options.unlink(p, function (er) {
	      if (er) {
	        if (er.code === "ENOENT")
	          return cb(null)
	        if (er.code === "EPERM")
	          return (isWindows)
	            ? fixWinEPERM(p, options, er, cb)
	            : rmdir(p, options, er, cb)
	        if (er.code === "EISDIR")
	          return rmdir(p, options, er, cb)
	      }
	      return cb(er)
	    })
	  })
	}

	function fixWinEPERM (p, options, er, cb) {
	  assert(p)
	  assert(options)
	  assert(typeof cb === 'function')
	  if (er)
	    assert(er instanceof Error)

	  options.chmod(p, 666, function (er2) {
	    if (er2)
	      cb(er2.code === "ENOENT" ? null : er)
	    else
	      options.stat(p, function(er3, stats) {
	        if (er3)
	          cb(er3.code === "ENOENT" ? null : er)
	        else if (stats.isDirectory())
	          rmdir(p, options, er, cb)
	        else
	          options.unlink(p, cb)
	      })
	  })
	}

	function fixWinEPERMSync (p, options, er) {
	  assert(p)
	  assert(options)
	  if (er)
	    assert(er instanceof Error)

	  try {
	    options.chmodSync(p, 666)
	  } catch (er2) {
	    if (er2.code === "ENOENT")
	      return
	    else
	      throw er
	  }

	  try {
	    var stats = options.statSync(p)
	  } catch (er3) {
	    if (er3.code === "ENOENT")
	      return
	    else
	      throw er
	  }

	  if (stats.isDirectory())
	    rmdirSync(p, options, er)
	  else
	    options.unlinkSync(p)
	}

	function rmdir (p, options, originalEr, cb) {
	  assert(p)
	  assert(options)
	  if (originalEr)
	    assert(originalEr instanceof Error)
	  assert(typeof cb === 'function')

	  // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
	  // if we guessed wrong, and it's not a directory, then
	  // raise the original error.
	  options.rmdir(p, function (er) {
	    if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
	      rmkids(p, options, cb)
	    else if (er && er.code === "ENOTDIR")
	      cb(originalEr)
	    else
	      cb(er)
	  })
	}

	function rmkids(p, options, cb) {
	  assert(p)
	  assert(options)
	  assert(typeof cb === 'function')

	  options.readdir(p, function (er, files) {
	    if (er)
	      return cb(er)
	    var n = files.length
	    if (n === 0)
	      return options.rmdir(p, cb)
	    var errState
	    files.forEach(function (f) {
	      rimraf(path.join(p, f), options, function (er) {
	        if (errState)
	          return
	        if (er)
	          return cb(errState = er)
	        if (--n === 0)
	          options.rmdir(p, cb)
	      })
	    })
	  })
	}

	// this looks simpler, and is strictly *faster*, but will
	// tie up the JavaScript thread and fail on excessively
	// deep directory trees.
	function rimrafSync (p, options) {
	  options = options || {}
	  defaults(options)

	  assert(p, 'rimraf: missing path')
	  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
	  assert(options, 'rimraf: missing options')
	  assert.equal(typeof options, 'object', 'rimraf: options should be object')

	  var results

	  if (options.disableGlob || !glob.hasMagic(p)) {
	    results = [p]
	  } else {
	    try {
	      options.lstatSync(p)
	      results = [p]
	    } catch (er) {
	      results = glob.sync(p, options.glob)
	    }
	  }

	  if (!results.length)
	    return

	  for (var i = 0; i < results.length; i++) {
	    var p = results[i]

	    try {
	      var st = options.lstatSync(p)
	    } catch (er) {
	      if (er.code === "ENOENT")
	        return

	      // Windows can EPERM on stat.  Life is suffering.
	      if (er.code === "EPERM" && isWindows)
	        fixWinEPERMSync(p, options, er)
	    }

	    try {
	      // sunos lets the root user unlink directories, which is... weird.
	      if (st && st.isDirectory())
	        rmdirSync(p, options, null)
	      else
	        options.unlinkSync(p)
	    } catch (er) {
	      if (er.code === "ENOENT")
	        return
	      if (er.code === "EPERM")
	        return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)
	      if (er.code !== "EISDIR")
	        throw er

	      rmdirSync(p, options, er)
	    }
	  }
	}

	function rmdirSync (p, options, originalEr) {
	  assert(p)
	  assert(options)
	  if (originalEr)
	    assert(originalEr instanceof Error)

	  try {
	    options.rmdirSync(p)
	  } catch (er) {
	    if (er.code === "ENOENT")
	      return
	    if (er.code === "ENOTDIR")
	      throw originalEr
	    if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
	      rmkidsSync(p, options)
	  }
	}

	function rmkidsSync (p, options) {
	  assert(p)
	  assert(options)
	  options.readdirSync(p).forEach(function (f) {
	    rimrafSync(path.join(p, f), options)
	  })

	  // We only end up here once we got ENOTEMPTY at least once, and
	  // at this point, we are guaranteed to have removed all the kids.
	  // So, we know that it won't be ENOENT or ENOTDIR or anything else.
	  // try really hard to delete stuff on windows, because it has a
	  // PROFOUNDLY annoying habit of not closing handles promptly when
	  // files are deleted, resulting in spurious ENOTEMPTY errors.
	  var retries = isWindows ? 100 : 1
	  var i = 0
	  do {
	    var threw = true
	    try {
	      var ret = options.rmdirSync(p, options)
	      threw = false
	      return ret
	    } finally {
	      if (++i < retries && threw)
	        continue
	    }
	  } while (true)
	}


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	// Approach:
	//
	// 1. Get the minimatch set
	// 2. For each pattern in the set, PROCESS(pattern, false)
	// 3. Store matches per-set, then uniq them
	//
	// PROCESS(pattern, inGlobStar)
	// Get the first [n] items from pattern that are all strings
	// Join these together.  This is PREFIX.
	//   If there is no more remaining, then stat(PREFIX) and
	//   add to matches if it succeeds.  END.
	//
	// If inGlobStar and PREFIX is symlink and points to dir
	//   set ENTRIES = []
	// else readdir(PREFIX) as ENTRIES
	//   If fail, END
	//
	// with ENTRIES
	//   If pattern[n] is GLOBSTAR
	//     // handle the case where the globstar match is empty
	//     // by pruning it out, and testing the resulting pattern
	//     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
	//     // handle other cases.
	//     for ENTRY in ENTRIES (not dotfiles)
	//       // attach globstar + tail onto the entry
	//       // Mark that this entry is a globstar match
	//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
	//
	//   else // not globstar
	//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
	//       Test ENTRY against pattern[n]
	//       If fails, continue
	//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
	//
	// Caveat:
	//   Cache all stats and readdirs results to minimize syscall.  Since all
	//   we ever care about is existence and directory-ness, we can just keep
	//   `true` for files, and [children,...] for directories, or `false` for
	//   things that don't exist.

	module.exports = glob

	var fs = __webpack_require__(7)
	var rp = __webpack_require__(113)
	var minimatch = __webpack_require__(115)
	var Minimatch = minimatch.Minimatch
	var inherits = __webpack_require__(58)
	var EE = __webpack_require__(63).EventEmitter
	var path = __webpack_require__(3)
	var assert = __webpack_require__(19)
	var isAbsolute = __webpack_require__(119)
	var globSync = __webpack_require__(120)
	var common = __webpack_require__(121)
	var alphasort = common.alphasort
	var alphasorti = common.alphasorti
	var setopts = common.setopts
	var ownProp = common.ownProp
	var inflight = __webpack_require__(122)
	var util = __webpack_require__(18)
	var childrenIgnored = common.childrenIgnored
	var isIgnored = common.isIgnored

	var once = __webpack_require__(124)

	function glob (pattern, options, cb) {
	  if (typeof options === 'function') cb = options, options = {}
	  if (!options) options = {}

	  if (options.sync) {
	    if (cb)
	      throw new TypeError('callback provided to sync glob')
	    return globSync(pattern, options)
	  }

	  return new Glob(pattern, options, cb)
	}

	glob.sync = globSync
	var GlobSync = glob.GlobSync = globSync.GlobSync

	// old api surface
	glob.glob = glob

	function extend (origin, add) {
	  if (add === null || typeof add !== 'object') {
	    return origin
	  }

	  var keys = Object.keys(add)
	  var i = keys.length
	  while (i--) {
	    origin[keys[i]] = add[keys[i]]
	  }
	  return origin
	}

	glob.hasMagic = function (pattern, options_) {
	  var options = extend({}, options_)
	  options.noprocess = true

	  var g = new Glob(pattern, options)
	  var set = g.minimatch.set

	  if (!pattern)
	    return false

	  if (set.length > 1)
	    return true

	  for (var j = 0; j < set[0].length; j++) {
	    if (typeof set[0][j] !== 'string')
	      return true
	  }

	  return false
	}

	glob.Glob = Glob
	inherits(Glob, EE)
	function Glob (pattern, options, cb) {
	  if (typeof options === 'function') {
	    cb = options
	    options = null
	  }

	  if (options && options.sync) {
	    if (cb)
	      throw new TypeError('callback provided to sync glob')
	    return new GlobSync(pattern, options)
	  }

	  if (!(this instanceof Glob))
	    return new Glob(pattern, options, cb)

	  setopts(this, pattern, options)
	  this._didRealPath = false

	  // process each pattern in the minimatch set
	  var n = this.minimatch.set.length

	  // The matches are stored as {<filename>: true,...} so that
	  // duplicates are automagically pruned.
	  // Later, we do an Object.keys() on these.
	  // Keep them as a list so we can fill in when nonull is set.
	  this.matches = new Array(n)

	  if (typeof cb === 'function') {
	    cb = once(cb)
	    this.on('error', cb)
	    this.on('end', function (matches) {
	      cb(null, matches)
	    })
	  }

	  var self = this
	  this._processing = 0

	  this._emitQueue = []
	  this._processQueue = []
	  this.paused = false

	  if (this.noprocess)
	    return this

	  if (n === 0)
	    return done()

	  var sync = true
	  for (var i = 0; i < n; i ++) {
	    this._process(this.minimatch.set[i], i, false, done)
	  }
	  sync = false

	  function done () {
	    --self._processing
	    if (self._processing <= 0) {
	      if (sync) {
	        process.nextTick(function () {
	          self._finish()
	        })
	      } else {
	        self._finish()
	      }
	    }
	  }
	}

	Glob.prototype._finish = function () {
	  assert(this instanceof Glob)
	  if (this.aborted)
	    return

	  if (this.realpath && !this._didRealpath)
	    return this._realpath()

	  common.finish(this)
	  this.emit('end', this.found)
	}

	Glob.prototype._realpath = function () {
	  if (this._didRealpath)
	    return

	  this._didRealpath = true

	  var n = this.matches.length
	  if (n === 0)
	    return this._finish()

	  var self = this
	  for (var i = 0; i < this.matches.length; i++)
	    this._realpathSet(i, next)

	  function next () {
	    if (--n === 0)
	      self._finish()
	  }
	}

	Glob.prototype._realpathSet = function (index, cb) {
	  var matchset = this.matches[index]
	  if (!matchset)
	    return cb()

	  var found = Object.keys(matchset)
	  var self = this
	  var n = found.length

	  if (n === 0)
	    return cb()

	  var set = this.matches[index] = Object.create(null)
	  found.forEach(function (p, i) {
	    // If there's a problem with the stat, then it means that
	    // one or more of the links in the realpath couldn't be
	    // resolved.  just return the abs value in that case.
	    p = self._makeAbs(p)
	    rp.realpath(p, self.realpathCache, function (er, real) {
	      if (!er)
	        set[real] = true
	      else if (er.syscall === 'stat')
	        set[p] = true
	      else
	        self.emit('error', er) // srsly wtf right here

	      if (--n === 0) {
	        self.matches[index] = set
	        cb()
	      }
	    })
	  })
	}

	Glob.prototype._mark = function (p) {
	  return common.mark(this, p)
	}

	Glob.prototype._makeAbs = function (f) {
	  return common.makeAbs(this, f)
	}

	Glob.prototype.abort = function () {
	  this.aborted = true
	  this.emit('abort')
	}

	Glob.prototype.pause = function () {
	  if (!this.paused) {
	    this.paused = true
	    this.emit('pause')
	  }
	}

	Glob.prototype.resume = function () {
	  if (this.paused) {
	    this.emit('resume')
	    this.paused = false
	    if (this._emitQueue.length) {
	      var eq = this._emitQueue.slice(0)
	      this._emitQueue.length = 0
	      for (var i = 0; i < eq.length; i ++) {
	        var e = eq[i]
	        this._emitMatch(e[0], e[1])
	      }
	    }
	    if (this._processQueue.length) {
	      var pq = this._processQueue.slice(0)
	      this._processQueue.length = 0
	      for (var i = 0; i < pq.length; i ++) {
	        var p = pq[i]
	        this._processing--
	        this._process(p[0], p[1], p[2], p[3])
	      }
	    }
	  }
	}

	Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
	  assert(this instanceof Glob)
	  assert(typeof cb === 'function')

	  if (this.aborted)
	    return

	  this._processing++
	  if (this.paused) {
	    this._processQueue.push([pattern, index, inGlobStar, cb])
	    return
	  }

	  //console.error('PROCESS %d', this._processing, pattern)

	  // Get the first [n] parts of pattern that are all strings.
	  var n = 0
	  while (typeof pattern[n] === 'string') {
	    n ++
	  }
	  // now n is the index of the first one that is *not* a string.

	  // see if there's anything else
	  var prefix
	  switch (n) {
	    // if not, then this is rather simple
	    case pattern.length:
	      this._processSimple(pattern.join('/'), index, cb)
	      return

	    case 0:
	      // pattern *starts* with some non-trivial item.
	      // going to readdir(cwd), but not include the prefix in matches.
	      prefix = null
	      break

	    default:
	      // pattern has some string bits in the front.
	      // whatever it starts with, whether that's 'absolute' like /foo/bar,
	      // or 'relative' like '../baz'
	      prefix = pattern.slice(0, n).join('/')
	      break
	  }

	  var remain = pattern.slice(n)

	  // get the list of entries.
	  var read
	  if (prefix === null)
	    read = '.'
	  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
	    if (!prefix || !isAbsolute(prefix))
	      prefix = '/' + prefix
	    read = prefix
	  } else
	    read = prefix

	  var abs = this._makeAbs(read)

	  //if ignored, skip _processing
	  if (childrenIgnored(this, read))
	    return cb()

	  var isGlobStar = remain[0] === minimatch.GLOBSTAR
	  if (isGlobStar)
	    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb)
	  else
	    this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb)
	}

	Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
	  var self = this
	  this._readdir(abs, inGlobStar, function (er, entries) {
	    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
	  })
	}

	Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {

	  // if the abs isn't a dir, then nothing can match!
	  if (!entries)
	    return cb()

	  // It will only match dot entries if it starts with a dot, or if
	  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
	  var pn = remain[0]
	  var negate = !!this.minimatch.negate
	  var rawGlob = pn._glob
	  var dotOk = this.dot || rawGlob.charAt(0) === '.'

	  var matchedEntries = []
	  for (var i = 0; i < entries.length; i++) {
	    var e = entries[i]
	    if (e.charAt(0) !== '.' || dotOk) {
	      var m
	      if (negate && !prefix) {
	        m = !e.match(pn)
	      } else {
	        m = e.match(pn)
	      }
	      if (m)
	        matchedEntries.push(e)
	    }
	  }

	  //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)

	  var len = matchedEntries.length
	  // If there are no matched entries, then nothing matches.
	  if (len === 0)
	    return cb()

	  // if this is the last remaining pattern bit, then no need for
	  // an additional stat *unless* the user has specified mark or
	  // stat explicitly.  We know they exist, since readdir returned
	  // them.

	  if (remain.length === 1 && !this.mark && !this.stat) {
	    if (!this.matches[index])
	      this.matches[index] = Object.create(null)

	    for (var i = 0; i < len; i ++) {
	      var e = matchedEntries[i]
	      if (prefix) {
	        if (prefix !== '/')
	          e = prefix + '/' + e
	        else
	          e = prefix + e
	      }

	      if (e.charAt(0) === '/' && !this.nomount) {
	        e = path.join(this.root, e)
	      }
	      this._emitMatch(index, e)
	    }
	    // This was the last one, and no stats were needed
	    return cb()
	  }

	  // now test all matched entries as stand-ins for that part
	  // of the pattern.
	  remain.shift()
	  for (var i = 0; i < len; i ++) {
	    var e = matchedEntries[i]
	    var newPattern
	    if (prefix) {
	      if (prefix !== '/')
	        e = prefix + '/' + e
	      else
	        e = prefix + e
	    }
	    this._process([e].concat(remain), index, inGlobStar, cb)
	  }
	  cb()
	}

	Glob.prototype._emitMatch = function (index, e) {
	  if (this.aborted)
	    return

	  if (isIgnored(this, e))
	    return

	  if (this.paused) {
	    this._emitQueue.push([index, e])
	    return
	  }

	  var abs = isAbsolute(e) ? e : this._makeAbs(e)

	  if (this.mark)
	    e = this._mark(e)

	  if (this.absolute)
	    e = abs

	  if (this.matches[index][e])
	    return

	  if (this.nodir) {
	    var c = this.cache[abs]
	    if (c === 'DIR' || Array.isArray(c))
	      return
	  }

	  this.matches[index][e] = true

	  var st = this.statCache[abs]
	  if (st)
	    this.emit('stat', e, st)

	  this.emit('match', e)
	}

	Glob.prototype._readdirInGlobStar = function (abs, cb) {
	  if (this.aborted)
	    return

	  // follow all symlinked directories forever
	  // just proceed as if this is a non-globstar situation
	  if (this.follow)
	    return this._readdir(abs, false, cb)

	  var lstatkey = 'lstat\0' + abs
	  var self = this
	  var lstatcb = inflight(lstatkey, lstatcb_)

	  if (lstatcb)
	    fs.lstat(abs, lstatcb)

	  function lstatcb_ (er, lstat) {
	    if (er && er.code === 'ENOENT')
	      return cb()

	    var isSym = lstat && lstat.isSymbolicLink()
	    self.symlinks[abs] = isSym

	    // If it's not a symlink or a dir, then it's definitely a regular file.
	    // don't bother doing a readdir in that case.
	    if (!isSym && lstat && !lstat.isDirectory()) {
	      self.cache[abs] = 'FILE'
	      cb()
	    } else
	      self._readdir(abs, false, cb)
	  }
	}

	Glob.prototype._readdir = function (abs, inGlobStar, cb) {
	  if (this.aborted)
	    return

	  cb = inflight('readdir\0'+abs+'\0'+inGlobStar, cb)
	  if (!cb)
	    return

	  //console.error('RD %j %j', +inGlobStar, abs)
	  if (inGlobStar && !ownProp(this.symlinks, abs))
	    return this._readdirInGlobStar(abs, cb)

	  if (ownProp(this.cache, abs)) {
	    var c = this.cache[abs]
	    if (!c || c === 'FILE')
	      return cb()

	    if (Array.isArray(c))
	      return cb(null, c)
	  }

	  var self = this
	  fs.readdir(abs, readdirCb(this, abs, cb))
	}

	function readdirCb (self, abs, cb) {
	  return function (er, entries) {
	    if (er)
	      self._readdirError(abs, er, cb)
	    else
	      self._readdirEntries(abs, entries, cb)
	  }
	}

	Glob.prototype._readdirEntries = function (abs, entries, cb) {
	  if (this.aborted)
	    return

	  // if we haven't asked to stat everything, then just
	  // assume that everything in there exists, so we can avoid
	  // having to stat it a second time.
	  if (!this.mark && !this.stat) {
	    for (var i = 0; i < entries.length; i ++) {
	      var e = entries[i]
	      if (abs === '/')
	        e = abs + e
	      else
	        e = abs + '/' + e
	      this.cache[e] = true
	    }
	  }

	  this.cache[abs] = entries
	  return cb(null, entries)
	}

	Glob.prototype._readdirError = function (f, er, cb) {
	  if (this.aborted)
	    return

	  // handle errors, and cache the information
	  switch (er.code) {
	    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
	    case 'ENOTDIR': // totally normal. means it *does* exist.
	      var abs = this._makeAbs(f)
	      this.cache[abs] = 'FILE'
	      if (abs === this.cwdAbs) {
	        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
	        error.path = this.cwd
	        error.code = er.code
	        this.emit('error', error)
	        this.abort()
	      }
	      break

	    case 'ENOENT': // not terribly unusual
	    case 'ELOOP':
	    case 'ENAMETOOLONG':
	    case 'UNKNOWN':
	      this.cache[this._makeAbs(f)] = false
	      break

	    default: // some unusual error.  Treat as failure.
	      this.cache[this._makeAbs(f)] = false
	      if (this.strict) {
	        this.emit('error', er)
	        // If the error is handled, then we abort
	        // if not, we threw out of here
	        this.abort()
	      }
	      if (!this.silent)
	        console.error('glob error', er)
	      break
	  }

	  return cb()
	}

	Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
	  var self = this
	  this._readdir(abs, inGlobStar, function (er, entries) {
	    self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
	  })
	}


	Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
	  //console.error('pgs2', prefix, remain[0], entries)

	  // no entries means not a dir, so it can never have matches
	  // foo.txt/** doesn't match foo.txt
	  if (!entries)
	    return cb()

	  // test without the globstar, and with every child both below
	  // and replacing the globstar.
	  var remainWithoutGlobStar = remain.slice(1)
	  var gspref = prefix ? [ prefix ] : []
	  var noGlobStar = gspref.concat(remainWithoutGlobStar)

	  // the noGlobStar pattern exits the inGlobStar state
	  this._process(noGlobStar, index, false, cb)

	  var isSym = this.symlinks[abs]
	  var len = entries.length

	  // If it's a symlink, and we're in a globstar, then stop
	  if (isSym && inGlobStar)
	    return cb()

	  for (var i = 0; i < len; i++) {
	    var e = entries[i]
	    if (e.charAt(0) === '.' && !this.dot)
	      continue

	    // these two cases enter the inGlobStar state
	    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
	    this._process(instead, index, true, cb)

	    var below = gspref.concat(entries[i], remain)
	    this._process(below, index, true, cb)
	  }

	  cb()
	}

	Glob.prototype._processSimple = function (prefix, index, cb) {
	  // XXX review this.  Shouldn't it be doing the mounting etc
	  // before doing stat?  kinda weird?
	  var self = this
	  this._stat(prefix, function (er, exists) {
	    self._processSimple2(prefix, index, er, exists, cb)
	  })
	}
	Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {

	  //console.error('ps2', prefix, exists)

	  if (!this.matches[index])
	    this.matches[index] = Object.create(null)

	  // If it doesn't exist, then just mark the lack of results
	  if (!exists)
	    return cb()

	  if (prefix && isAbsolute(prefix) && !this.nomount) {
	    var trail = /[\/\\]$/.test(prefix)
	    if (prefix.charAt(0) === '/') {
	      prefix = path.join(this.root, prefix)
	    } else {
	      prefix = path.resolve(this.root, prefix)
	      if (trail)
	        prefix += '/'
	    }
	  }

	  if (process.platform === 'win32')
	    prefix = prefix.replace(/\\/g, '/')

	  // Mark this as a match
	  this._emitMatch(index, prefix)
	  cb()
	}

	// Returns either 'DIR', 'FILE', or false
	Glob.prototype._stat = function (f, cb) {
	  var abs = this._makeAbs(f)
	  var needDir = f.slice(-1) === '/'

	  if (f.length > this.maxLength)
	    return cb()

	  if (!this.stat && ownProp(this.cache, abs)) {
	    var c = this.cache[abs]

	    if (Array.isArray(c))
	      c = 'DIR'

	    // It exists, but maybe not how we need it
	    if (!needDir || c === 'DIR')
	      return cb(null, c)

	    if (needDir && c === 'FILE')
	      return cb()

	    // otherwise we have to stat, because maybe c=true
	    // if we know it exists, but not what it is.
	  }

	  var exists
	  var stat = this.statCache[abs]
	  if (stat !== undefined) {
	    if (stat === false)
	      return cb(null, stat)
	    else {
	      var type = stat.isDirectory() ? 'DIR' : 'FILE'
	      if (needDir && type === 'FILE')
	        return cb()
	      else
	        return cb(null, type, stat)
	    }
	  }

	  var self = this
	  var statcb = inflight('stat\0' + abs, lstatcb_)
	  if (statcb)
	    fs.lstat(abs, statcb)

	  function lstatcb_ (er, lstat) {
	    if (lstat && lstat.isSymbolicLink()) {
	      // If it's a symlink, then treat it as the target, unless
	      // the target does not exist, then treat it as a file.
	      return fs.stat(abs, function (er, stat) {
	        if (er)
	          self._stat2(f, abs, null, lstat, cb)
	        else
	          self._stat2(f, abs, er, stat, cb)
	      })
	    } else {
	      self._stat2(f, abs, er, lstat, cb)
	    }
	  }
	}

	Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
	  if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
	    this.statCache[abs] = false
	    return cb()
	  }

	  var needDir = f.slice(-1) === '/'
	  this.statCache[abs] = stat

	  if (abs.slice(-1) === '/' && stat && !stat.isDirectory())
	    return cb(null, false, stat)

	  var c = true
	  if (stat)
	    c = stat.isDirectory() ? 'DIR' : 'FILE'
	  this.cache[abs] = this.cache[abs] || c

	  if (needDir && c === 'FILE')
	    return cb()

	  return cb(null, c, stat)
	}


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = realpath
	realpath.realpath = realpath
	realpath.sync = realpathSync
	realpath.realpathSync = realpathSync
	realpath.monkeypatch = monkeypatch
	realpath.unmonkeypatch = unmonkeypatch

	var fs = __webpack_require__(7)
	var origRealpath = fs.realpath
	var origRealpathSync = fs.realpathSync

	var version = process.version
	var ok = /^v[0-5]\./.test(version)
	var old = __webpack_require__(114)

	function newError (er) {
	  return er && er.syscall === 'realpath' && (
	    er.code === 'ELOOP' ||
	    er.code === 'ENOMEM' ||
	    er.code === 'ENAMETOOLONG'
	  )
	}

	function realpath (p, cache, cb) {
	  if (ok) {
	    return origRealpath(p, cache, cb)
	  }

	  if (typeof cache === 'function') {
	    cb = cache
	    cache = null
	  }
	  origRealpath(p, cache, function (er, result) {
	    if (newError(er)) {
	      old.realpath(p, cache, cb)
	    } else {
	      cb(er, result)
	    }
	  })
	}

	function realpathSync (p, cache) {
	  if (ok) {
	    return origRealpathSync(p, cache)
	  }

	  try {
	    return origRealpathSync(p, cache)
	  } catch (er) {
	    if (newError(er)) {
	      return old.realpathSync(p, cache)
	    } else {
	      throw er
	    }
	  }
	}

	function monkeypatch () {
	  fs.realpath = realpath
	  fs.realpathSync = realpathSync
	}

	function unmonkeypatch () {
	  fs.realpath = origRealpath
	  fs.realpathSync = origRealpathSync
	}


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var pathModule = __webpack_require__(3);
	var isWindows = process.platform === 'win32';
	var fs = __webpack_require__(7);

	// JavaScript implementation of realpath, ported from node pre-v6

	var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

	function rethrow() {
	  // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
	  // is fairly slow to generate.
	  var callback;
	  if (DEBUG) {
	    var backtrace = new Error;
	    callback = debugCallback;
	  } else
	    callback = missingCallback;

	  return callback;

	  function debugCallback(err) {
	    if (err) {
	      backtrace.message = err.message;
	      err = backtrace;
	      missingCallback(err);
	    }
	  }

	  function missingCallback(err) {
	    if (err) {
	      if (process.throwDeprecation)
	        throw err;  // Forgot a callback but don't know where? Use NODE_DEBUG=fs
	      else if (!process.noDeprecation) {
	        var msg = 'fs: missing callback ' + (err.stack || err.message);
	        if (process.traceDeprecation)
	          console.trace(msg);
	        else
	          console.error(msg);
	      }
	    }
	  }
	}

	function maybeCallback(cb) {
	  return typeof cb === 'function' ? cb : rethrow();
	}

	var normalize = pathModule.normalize;

	// Regexp that finds the next partion of a (partial) path
	// result is [base_with_slash, base], e.g. ['somedir/', 'somedir']
	if (isWindows) {
	  var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
	} else {
	  var nextPartRe = /(.*?)(?:[\/]+|$)/g;
	}

	// Regex to find the device root, including trailing slash. E.g. 'c:\\'.
	if (isWindows) {
	  var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
	} else {
	  var splitRootRe = /^[\/]*/;
	}

	exports.realpathSync = function realpathSync(p, cache) {
	  // make p is absolute
	  p = pathModule.resolve(p);

	  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
	    return cache[p];
	  }

	  var original = p,
	      seenLinks = {},
	      knownHard = {};

	  // current character position in p
	  var pos;
	  // the partial path so far, including a trailing slash if any
	  var current;
	  // the partial path without a trailing slash (except when pointing at a root)
	  var base;
	  // the partial path scanned in the previous round, with slash
	  var previous;

	  start();

	  function start() {
	    // Skip over roots
	    var m = splitRootRe.exec(p);
	    pos = m[0].length;
	    current = m[0];
	    base = m[0];
	    previous = '';

	    // On windows, check that the root exists. On unix there is no need.
	    if (isWindows && !knownHard[base]) {
	      fs.lstatSync(base);
	      knownHard[base] = true;
	    }
	  }

	  // walk down the path, swapping out linked pathparts for their real
	  // values
	  // NB: p.length changes.
	  while (pos < p.length) {
	    // find the next part
	    nextPartRe.lastIndex = pos;
	    var result = nextPartRe.exec(p);
	    previous = current;
	    current += result[0];
	    base = previous + result[1];
	    pos = nextPartRe.lastIndex;

	    // continue if not a symlink
	    if (knownHard[base] || (cache && cache[base] === base)) {
	      continue;
	    }

	    var resolvedLink;
	    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
	      // some known symbolic link.  no need to stat again.
	      resolvedLink = cache[base];
	    } else {
	      var stat = fs.lstatSync(base);
	      if (!stat.isSymbolicLink()) {
	        knownHard[base] = true;
	        if (cache) cache[base] = base;
	        continue;
	      }

	      // read the link if it wasn't read before
	      // dev/ino always return 0 on windows, so skip the check.
	      var linkTarget = null;
	      if (!isWindows) {
	        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
	        if (seenLinks.hasOwnProperty(id)) {
	          linkTarget = seenLinks[id];
	        }
	      }
	      if (linkTarget === null) {
	        fs.statSync(base);
	        linkTarget = fs.readlinkSync(base);
	      }
	      resolvedLink = pathModule.resolve(previous, linkTarget);
	      // track this, if given a cache.
	      if (cache) cache[base] = resolvedLink;
	      if (!isWindows) seenLinks[id] = linkTarget;
	    }

	    // resolve the link, then start over
	    p = pathModule.resolve(resolvedLink, p.slice(pos));
	    start();
	  }

	  if (cache) cache[original] = p;

	  return p;
	};


	exports.realpath = function realpath(p, cache, cb) {
	  if (typeof cb !== 'function') {
	    cb = maybeCallback(cache);
	    cache = null;
	  }

	  // make p is absolute
	  p = pathModule.resolve(p);

	  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
	    return process.nextTick(cb.bind(null, null, cache[p]));
	  }

	  var original = p,
	      seenLinks = {},
	      knownHard = {};

	  // current character position in p
	  var pos;
	  // the partial path so far, including a trailing slash if any
	  var current;
	  // the partial path without a trailing slash (except when pointing at a root)
	  var base;
	  // the partial path scanned in the previous round, with slash
	  var previous;

	  start();

	  function start() {
	    // Skip over roots
	    var m = splitRootRe.exec(p);
	    pos = m[0].length;
	    current = m[0];
	    base = m[0];
	    previous = '';

	    // On windows, check that the root exists. On unix there is no need.
	    if (isWindows && !knownHard[base]) {
	      fs.lstat(base, function(err) {
	        if (err) return cb(err);
	        knownHard[base] = true;
	        LOOP();
	      });
	    } else {
	      process.nextTick(LOOP);
	    }
	  }

	  // walk down the path, swapping out linked pathparts for their real
	  // values
	  function LOOP() {
	    // stop if scanned past end of path
	    if (pos >= p.length) {
	      if (cache) cache[original] = p;
	      return cb(null, p);
	    }

	    // find the next part
	    nextPartRe.lastIndex = pos;
	    var result = nextPartRe.exec(p);
	    previous = current;
	    current += result[0];
	    base = previous + result[1];
	    pos = nextPartRe.lastIndex;

	    // continue if not a symlink
	    if (knownHard[base] || (cache && cache[base] === base)) {
	      return process.nextTick(LOOP);
	    }

	    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
	      // known symbolic link.  no need to stat again.
	      return gotResolvedLink(cache[base]);
	    }

	    return fs.lstat(base, gotStat);
	  }

	  function gotStat(err, stat) {
	    if (err) return cb(err);

	    // if not a symlink, skip to the next path part
	    if (!stat.isSymbolicLink()) {
	      knownHard[base] = true;
	      if (cache) cache[base] = base;
	      return process.nextTick(LOOP);
	    }

	    // stat & read the link if not read before
	    // call gotTarget as soon as the link target is known
	    // dev/ino always return 0 on windows, so skip the check.
	    if (!isWindows) {
	      var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
	      if (seenLinks.hasOwnProperty(id)) {
	        return gotTarget(null, seenLinks[id], base);
	      }
	    }
	    fs.stat(base, function(err) {
	      if (err) return cb(err);

	      fs.readlink(base, function(err, target) {
	        if (!isWindows) seenLinks[id] = target;
	        gotTarget(err, target);
	      });
	    });
	  }

	  function gotTarget(err, target, base) {
	    if (err) return cb(err);

	    var resolvedLink = pathModule.resolve(previous, target);
	    if (cache) cache[base] = resolvedLink;
	    gotResolvedLink(resolvedLink);
	  }

	  function gotResolvedLink(resolvedLink) {
	    // resolve the link, then start over
	    p = pathModule.resolve(resolvedLink, p.slice(pos));
	    start();
	  }
	};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = minimatch
	minimatch.Minimatch = Minimatch

	var path = { sep: '/' }
	try {
	  path = __webpack_require__(3)
	} catch (er) {}

	var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
	var expand = __webpack_require__(116)

	var plTypes = {
	  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
	  '?': { open: '(?:', close: ')?' },
	  '+': { open: '(?:', close: ')+' },
	  '*': { open: '(?:', close: ')*' },
	  '@': { open: '(?:', close: ')' }
	}

	// any single thing other than /
	// don't need to escape / when using new RegExp()
	var qmark = '[^/]'

	// * => any number of characters
	var star = qmark + '*?'

	// ** when dots are allowed.  Anything goes, except .. and .
	// not (^ or / followed by one or two dots followed by $ or /),
	// followed by anything, any number of times.
	var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'

	// not a ^ or / followed by a dot,
	// followed by anything, any number of times.
	var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'

	// characters that need to be escaped in RegExp.
	var reSpecials = charSet('().*{}+?[]^$\\!')

	// "abc" -> { a:true, b:true, c:true }
	function charSet (s) {
	  return s.split('').reduce(function (set, c) {
	    set[c] = true
	    return set
	  }, {})
	}

	// normalizes slashes.
	var slashSplit = /\/+/

	minimatch.filter = filter
	function filter (pattern, options) {
	  options = options || {}
	  return function (p, i, list) {
	    return minimatch(p, pattern, options)
	  }
	}

	function ext (a, b) {
	  a = a || {}
	  b = b || {}
	  var t = {}
	  Object.keys(b).forEach(function (k) {
	    t[k] = b[k]
	  })
	  Object.keys(a).forEach(function (k) {
	    t[k] = a[k]
	  })
	  return t
	}

	minimatch.defaults = function (def) {
	  if (!def || !Object.keys(def).length) return minimatch

	  var orig = minimatch

	  var m = function minimatch (p, pattern, options) {
	    return orig.minimatch(p, pattern, ext(def, options))
	  }

	  m.Minimatch = function Minimatch (pattern, options) {
	    return new orig.Minimatch(pattern, ext(def, options))
	  }

	  return m
	}

	Minimatch.defaults = function (def) {
	  if (!def || !Object.keys(def).length) return Minimatch
	  return minimatch.defaults(def).Minimatch
	}

	function minimatch (p, pattern, options) {
	  if (typeof pattern !== 'string') {
	    throw new TypeError('glob pattern string required')
	  }

	  if (!options) options = {}

	  // shortcut: comments match nothing.
	  if (!options.nocomment && pattern.charAt(0) === '#') {
	    return false
	  }

	  // "" only matches ""
	  if (pattern.trim() === '') return p === ''

	  return new Minimatch(pattern, options).match(p)
	}

	function Minimatch (pattern, options) {
	  if (!(this instanceof Minimatch)) {
	    return new Minimatch(pattern, options)
	  }

	  if (typeof pattern !== 'string') {
	    throw new TypeError('glob pattern string required')
	  }

	  if (!options) options = {}
	  pattern = pattern.trim()

	  // windows support: need to use /, not \
	  if (path.sep !== '/') {
	    pattern = pattern.split(path.sep).join('/')
	  }

	  this.options = options
	  this.set = []
	  this.pattern = pattern
	  this.regexp = null
	  this.negate = false
	  this.comment = false
	  this.empty = false

	  // make the set of regexps etc.
	  this.make()
	}

	Minimatch.prototype.debug = function () {}

	Minimatch.prototype.make = make
	function make () {
	  // don't do it more than once.
	  if (this._made) return

	  var pattern = this.pattern
	  var options = this.options

	  // empty patterns and comments match nothing.
	  if (!options.nocomment && pattern.charAt(0) === '#') {
	    this.comment = true
	    return
	  }
	  if (!pattern) {
	    this.empty = true
	    return
	  }

	  // step 1: figure out negation, etc.
	  this.parseNegate()

	  // step 2: expand braces
	  var set = this.globSet = this.braceExpand()

	  if (options.debug) this.debug = console.error

	  this.debug(this.pattern, set)

	  // step 3: now we have a set, so turn each one into a series of path-portion
	  // matching patterns.
	  // These will be regexps, except in the case of "**", which is
	  // set to the GLOBSTAR object for globstar behavior,
	  // and will not contain any / characters
	  set = this.globParts = set.map(function (s) {
	    return s.split(slashSplit)
	  })

	  this.debug(this.pattern, set)

	  // glob --> regexps
	  set = set.map(function (s, si, set) {
	    return s.map(this.parse, this)
	  }, this)

	  this.debug(this.pattern, set)

	  // filter out everything that didn't compile properly.
	  set = set.filter(function (s) {
	    return s.indexOf(false) === -1
	  })

	  this.debug(this.pattern, set)

	  this.set = set
	}

	Minimatch.prototype.parseNegate = parseNegate
	function parseNegate () {
	  var pattern = this.pattern
	  var negate = false
	  var options = this.options
	  var negateOffset = 0

	  if (options.nonegate) return

	  for (var i = 0, l = pattern.length
	    ; i < l && pattern.charAt(i) === '!'
	    ; i++) {
	    negate = !negate
	    negateOffset++
	  }

	  if (negateOffset) this.pattern = pattern.substr(negateOffset)
	  this.negate = negate
	}

	// Brace expansion:
	// a{b,c}d -> abd acd
	// a{b,}c -> abc ac
	// a{0..3}d -> a0d a1d a2d a3d
	// a{b,c{d,e}f}g -> abg acdfg acefg
	// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
	//
	// Invalid sets are not expanded.
	// a{2..}b -> a{2..}b
	// a{b}c -> a{b}c
	minimatch.braceExpand = function (pattern, options) {
	  return braceExpand(pattern, options)
	}

	Minimatch.prototype.braceExpand = braceExpand

	function braceExpand (pattern, options) {
	  if (!options) {
	    if (this instanceof Minimatch) {
	      options = this.options
	    } else {
	      options = {}
	    }
	  }

	  pattern = typeof pattern === 'undefined'
	    ? this.pattern : pattern

	  if (typeof pattern === 'undefined') {
	    throw new TypeError('undefined pattern')
	  }

	  if (options.nobrace ||
	    !pattern.match(/\{.*\}/)) {
	    // shortcut. no need to expand.
	    return [pattern]
	  }

	  return expand(pattern)
	}

	// parse a component of the expanded set.
	// At this point, no pattern may contain "/" in it
	// so we're going to return a 2d array, where each entry is the full
	// pattern, split on '/', and then turned into a regular expression.
	// A regexp is made at the end which joins each array with an
	// escaped /, and another full one which joins each regexp with |.
	//
	// Following the lead of Bash 4.1, note that "**" only has special meaning
	// when it is the *only* thing in a path portion.  Otherwise, any series
	// of * is equivalent to a single *.  Globstar behavior is enabled by
	// default, and can be disabled by setting options.noglobstar.
	Minimatch.prototype.parse = parse
	var SUBPARSE = {}
	function parse (pattern, isSub) {
	  if (pattern.length > 1024 * 64) {
	    throw new TypeError('pattern is too long')
	  }

	  var options = this.options

	  // shortcuts
	  if (!options.noglobstar && pattern === '**') return GLOBSTAR
	  if (pattern === '') return ''

	  var re = ''
	  var hasMagic = !!options.nocase
	  var escaping = false
	  // ? => one single character
	  var patternListStack = []
	  var negativeLists = []
	  var stateChar
	  var inClass = false
	  var reClassStart = -1
	  var classStart = -1
	  // . and .. never match anything that doesn't start with .,
	  // even when options.dot is set.
	  var patternStart = pattern.charAt(0) === '.' ? '' // anything
	  // not (start or / followed by . or .. followed by / or end)
	  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
	  : '(?!\\.)'
	  var self = this

	  function clearStateChar () {
	    if (stateChar) {
	      // we had some state-tracking character
	      // that wasn't consumed by this pass.
	      switch (stateChar) {
	        case '*':
	          re += star
	          hasMagic = true
	        break
	        case '?':
	          re += qmark
	          hasMagic = true
	        break
	        default:
	          re += '\\' + stateChar
	        break
	      }
	      self.debug('clearStateChar %j %j', stateChar, re)
	      stateChar = false
	    }
	  }

	  for (var i = 0, len = pattern.length, c
	    ; (i < len) && (c = pattern.charAt(i))
	    ; i++) {
	    this.debug('%s\t%s %s %j', pattern, i, re, c)

	    // skip over any that are escaped.
	    if (escaping && reSpecials[c]) {
	      re += '\\' + c
	      escaping = false
	      continue
	    }

	    switch (c) {
	      case '/':
	        // completely not allowed, even escaped.
	        // Should already be path-split by now.
	        return false

	      case '\\':
	        clearStateChar()
	        escaping = true
	      continue

	      // the various stateChar values
	      // for the "extglob" stuff.
	      case '?':
	      case '*':
	      case '+':
	      case '@':
	      case '!':
	        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c)

	        // all of those are literals inside a class, except that
	        // the glob [!a] means [^a] in regexp
	        if (inClass) {
	          this.debug('  in class')
	          if (c === '!' && i === classStart + 1) c = '^'
	          re += c
	          continue
	        }

	        // if we already have a stateChar, then it means
	        // that there was something like ** or +? in there.
	        // Handle the stateChar, then proceed with this one.
	        self.debug('call clearStateChar %j', stateChar)
	        clearStateChar()
	        stateChar = c
	        // if extglob is disabled, then +(asdf|foo) isn't a thing.
	        // just clear the statechar *now*, rather than even diving into
	        // the patternList stuff.
	        if (options.noext) clearStateChar()
	      continue

	      case '(':
	        if (inClass) {
	          re += '('
	          continue
	        }

	        if (!stateChar) {
	          re += '\\('
	          continue
	        }

	        patternListStack.push({
	          type: stateChar,
	          start: i - 1,
	          reStart: re.length,
	          open: plTypes[stateChar].open,
	          close: plTypes[stateChar].close
	        })
	        // negation is (?:(?!js)[^/]*)
	        re += stateChar === '!' ? '(?:(?!(?:' : '(?:'
	        this.debug('plType %j %j', stateChar, re)
	        stateChar = false
	      continue

	      case ')':
	        if (inClass || !patternListStack.length) {
	          re += '\\)'
	          continue
	        }

	        clearStateChar()
	        hasMagic = true
	        var pl = patternListStack.pop()
	        // negation is (?:(?!js)[^/]*)
	        // The others are (?:<pattern>)<type>
	        re += pl.close
	        if (pl.type === '!') {
	          negativeLists.push(pl)
	        }
	        pl.reEnd = re.length
	      continue

	      case '|':
	        if (inClass || !patternListStack.length || escaping) {
	          re += '\\|'
	          escaping = false
	          continue
	        }

	        clearStateChar()
	        re += '|'
	      continue

	      // these are mostly the same in regexp and glob
	      case '[':
	        // swallow any state-tracking char before the [
	        clearStateChar()

	        if (inClass) {
	          re += '\\' + c
	          continue
	        }

	        inClass = true
	        classStart = i
	        reClassStart = re.length
	        re += c
	      continue

	      case ']':
	        //  a right bracket shall lose its special
	        //  meaning and represent itself in
	        //  a bracket expression if it occurs
	        //  first in the list.  -- POSIX.2 2.8.3.2
	        if (i === classStart + 1 || !inClass) {
	          re += '\\' + c
	          escaping = false
	          continue
	        }

	        // handle the case where we left a class open.
	        // "[z-a]" is valid, equivalent to "\[z-a\]"
	        if (inClass) {
	          // split where the last [ was, make sure we don't have
	          // an invalid re. if so, re-walk the contents of the
	          // would-be class to re-translate any characters that
	          // were passed through as-is
	          // TODO: It would probably be faster to determine this
	          // without a try/catch and a new RegExp, but it's tricky
	          // to do safely.  For now, this is safe and works.
	          var cs = pattern.substring(classStart + 1, i)
	          try {
	            RegExp('[' + cs + ']')
	          } catch (er) {
	            // not a valid class!
	            var sp = this.parse(cs, SUBPARSE)
	            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]'
	            hasMagic = hasMagic || sp[1]
	            inClass = false
	            continue
	          }
	        }

	        // finish up the class.
	        hasMagic = true
	        inClass = false
	        re += c
	      continue

	      default:
	        // swallow any state char that wasn't consumed
	        clearStateChar()

	        if (escaping) {
	          // no need
	          escaping = false
	        } else if (reSpecials[c]
	          && !(c === '^' && inClass)) {
	          re += '\\'
	        }

	        re += c

	    } // switch
	  } // for

	  // handle the case where we left a class open.
	  // "[abc" is valid, equivalent to "\[abc"
	  if (inClass) {
	    // split where the last [ was, and escape it
	    // this is a huge pita.  We now have to re-walk
	    // the contents of the would-be class to re-translate
	    // any characters that were passed through as-is
	    cs = pattern.substr(classStart + 1)
	    sp = this.parse(cs, SUBPARSE)
	    re = re.substr(0, reClassStart) + '\\[' + sp[0]
	    hasMagic = hasMagic || sp[1]
	  }

	  // handle the case where we had a +( thing at the *end*
	  // of the pattern.
	  // each pattern list stack adds 3 chars, and we need to go through
	  // and escape any | chars that were passed through as-is for the regexp.
	  // Go through and escape them, taking care not to double-escape any
	  // | chars that were already escaped.
	  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
	    var tail = re.slice(pl.reStart + pl.open.length)
	    this.debug('setting tail', re, pl)
	    // maybe some even number of \, then maybe 1 \, followed by a |
	    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
	      if (!$2) {
	        // the | isn't already escaped, so escape it.
	        $2 = '\\'
	      }

	      // need to escape all those slashes *again*, without escaping the
	      // one that we need for escaping the | character.  As it works out,
	      // escaping an even number of slashes can be done by simply repeating
	      // it exactly after itself.  That's why this trick works.
	      //
	      // I am sorry that you have to see this.
	      return $1 + $1 + $2 + '|'
	    })

	    this.debug('tail=%j\n   %s', tail, tail, pl, re)
	    var t = pl.type === '*' ? star
	      : pl.type === '?' ? qmark
	      : '\\' + pl.type

	    hasMagic = true
	    re = re.slice(0, pl.reStart) + t + '\\(' + tail
	  }

	  // handle trailing things that only matter at the very end.
	  clearStateChar()
	  if (escaping) {
	    // trailing \\
	    re += '\\\\'
	  }

	  // only need to apply the nodot start if the re starts with
	  // something that could conceivably capture a dot
	  var addPatternStart = false
	  switch (re.charAt(0)) {
	    case '.':
	    case '[':
	    case '(': addPatternStart = true
	  }

	  // Hack to work around lack of negative lookbehind in JS
	  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
	  // like 'a.xyz.yz' doesn't match.  So, the first negative
	  // lookahead, has to look ALL the way ahead, to the end of
	  // the pattern.
	  for (var n = negativeLists.length - 1; n > -1; n--) {
	    var nl = negativeLists[n]

	    var nlBefore = re.slice(0, nl.reStart)
	    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8)
	    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd)
	    var nlAfter = re.slice(nl.reEnd)

	    nlLast += nlAfter

	    // Handle nested stuff like *(*.js|!(*.json)), where open parens
	    // mean that we should *not* include the ) in the bit that is considered
	    // "after" the negated section.
	    var openParensBefore = nlBefore.split('(').length - 1
	    var cleanAfter = nlAfter
	    for (i = 0; i < openParensBefore; i++) {
	      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '')
	    }
	    nlAfter = cleanAfter

	    var dollar = ''
	    if (nlAfter === '' && isSub !== SUBPARSE) {
	      dollar = '$'
	    }
	    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast
	    re = newRe
	  }

	  // if the re is not "" at this point, then we need to make sure
	  // it doesn't match against an empty path part.
	  // Otherwise a/* will match a/, which it should not.
	  if (re !== '' && hasMagic) {
	    re = '(?=.)' + re
	  }

	  if (addPatternStart) {
	    re = patternStart + re
	  }

	  // parsing just a piece of a larger pattern.
	  if (isSub === SUBPARSE) {
	    return [re, hasMagic]
	  }

	  // skip the regexp for non-magical patterns
	  // unescape anything in it, though, so that it'll be
	  // an exact match against a file etc.
	  if (!hasMagic) {
	    return globUnescape(pattern)
	  }

	  var flags = options.nocase ? 'i' : ''
	  try {
	    var regExp = new RegExp('^' + re + '$', flags)
	  } catch (er) {
	    // If it was an invalid regular expression, then it can't match
	    // anything.  This trick looks for a character after the end of
	    // the string, which is of course impossible, except in multi-line
	    // mode, but it's not a /m regex.
	    return new RegExp('$.')
	  }

	  regExp._glob = pattern
	  regExp._src = re

	  return regExp
	}

	minimatch.makeRe = function (pattern, options) {
	  return new Minimatch(pattern, options || {}).makeRe()
	}

	Minimatch.prototype.makeRe = makeRe
	function makeRe () {
	  if (this.regexp || this.regexp === false) return this.regexp

	  // at this point, this.set is a 2d array of partial
	  // pattern strings, or "**".
	  //
	  // It's better to use .match().  This function shouldn't
	  // be used, really, but it's pretty convenient sometimes,
	  // when you just want to work with a regex.
	  var set = this.set

	  if (!set.length) {
	    this.regexp = false
	    return this.regexp
	  }
	  var options = this.options

	  var twoStar = options.noglobstar ? star
	    : options.dot ? twoStarDot
	    : twoStarNoDot
	  var flags = options.nocase ? 'i' : ''

	  var re = set.map(function (pattern) {
	    return pattern.map(function (p) {
	      return (p === GLOBSTAR) ? twoStar
	      : (typeof p === 'string') ? regExpEscape(p)
	      : p._src
	    }).join('\\\/')
	  }).join('|')

	  // must match entire pattern
	  // ending in a * or ** will make it less strict.
	  re = '^(?:' + re + ')$'

	  // can match anything, as long as it's not this.
	  if (this.negate) re = '^(?!' + re + ').*$'

	  try {
	    this.regexp = new RegExp(re, flags)
	  } catch (ex) {
	    this.regexp = false
	  }
	  return this.regexp
	}

	minimatch.match = function (list, pattern, options) {
	  options = options || {}
	  var mm = new Minimatch(pattern, options)
	  list = list.filter(function (f) {
	    return mm.match(f)
	  })
	  if (mm.options.nonull && !list.length) {
	    list.push(pattern)
	  }
	  return list
	}

	Minimatch.prototype.match = match
	function match (f, partial) {
	  this.debug('match', f, this.pattern)
	  // short-circuit in the case of busted things.
	  // comments, etc.
	  if (this.comment) return false
	  if (this.empty) return f === ''

	  if (f === '/' && partial) return true

	  var options = this.options

	  // windows: need to use /, not \
	  if (path.sep !== '/') {
	    f = f.split(path.sep).join('/')
	  }

	  // treat the test path as a set of pathparts.
	  f = f.split(slashSplit)
	  this.debug(this.pattern, 'split', f)

	  // just ONE of the pattern sets in this.set needs to match
	  // in order for it to be valid.  If negating, then just one
	  // match means that we have failed.
	  // Either way, return on the first hit.

	  var set = this.set
	  this.debug(this.pattern, 'set', set)

	  // Find the basename of the path by looking for the last non-empty segment
	  var filename
	  var i
	  for (i = f.length - 1; i >= 0; i--) {
	    filename = f[i]
	    if (filename) break
	  }

	  for (i = 0; i < set.length; i++) {
	    var pattern = set[i]
	    var file = f
	    if (options.matchBase && pattern.length === 1) {
	      file = [filename]
	    }
	    var hit = this.matchOne(file, pattern, partial)
	    if (hit) {
	      if (options.flipNegate) return true
	      return !this.negate
	    }
	  }

	  // didn't get any hits.  this is success if it's a negative
	  // pattern, failure otherwise.
	  if (options.flipNegate) return false
	  return this.negate
	}

	// set partial to true to test if, for example,
	// "/a/b" matches the start of "/*/b/*/d"
	// Partial means, if you run out of file before you run
	// out of pattern, then that's fine, as long as all
	// the parts match.
	Minimatch.prototype.matchOne = function (file, pattern, partial) {
	  var options = this.options

	  this.debug('matchOne',
	    { 'this': this, file: file, pattern: pattern })

	  this.debug('matchOne', file.length, pattern.length)

	  for (var fi = 0,
	      pi = 0,
	      fl = file.length,
	      pl = pattern.length
	      ; (fi < fl) && (pi < pl)
	      ; fi++, pi++) {
	    this.debug('matchOne loop')
	    var p = pattern[pi]
	    var f = file[fi]

	    this.debug(pattern, p, f)

	    // should be impossible.
	    // some invalid regexp stuff in the set.
	    if (p === false) return false

	    if (p === GLOBSTAR) {
	      this.debug('GLOBSTAR', [pattern, p, f])

	      // "**"
	      // a/**/b/**/c would match the following:
	      // a/b/x/y/z/c
	      // a/x/y/z/b/c
	      // a/b/x/b/x/c
	      // a/b/c
	      // To do this, take the rest of the pattern after
	      // the **, and see if it would match the file remainder.
	      // If so, return success.
	      // If not, the ** "swallows" a segment, and try again.
	      // This is recursively awful.
	      //
	      // a/**/b/**/c matching a/b/x/y/z/c
	      // - a matches a
	      // - doublestar
	      //   - matchOne(b/x/y/z/c, b/**/c)
	      //     - b matches b
	      //     - doublestar
	      //       - matchOne(x/y/z/c, c) -> no
	      //       - matchOne(y/z/c, c) -> no
	      //       - matchOne(z/c, c) -> no
	      //       - matchOne(c, c) yes, hit
	      var fr = fi
	      var pr = pi + 1
	      if (pr === pl) {
	        this.debug('** at the end')
	        // a ** at the end will just swallow the rest.
	        // We have found a match.
	        // however, it will not swallow /.x, unless
	        // options.dot is set.
	        // . and .. are *never* matched by **, for explosively
	        // exponential reasons.
	        for (; fi < fl; fi++) {
	          if (file[fi] === '.' || file[fi] === '..' ||
	            (!options.dot && file[fi].charAt(0) === '.')) return false
	        }
	        return true
	      }

	      // ok, let's see if we can swallow whatever we can.
	      while (fr < fl) {
	        var swallowee = file[fr]

	        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee)

	        // XXX remove this slice.  Just pass the start index.
	        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
	          this.debug('globstar found match!', fr, fl, swallowee)
	          // found a match.
	          return true
	        } else {
	          // can't swallow "." or ".." ever.
	          // can only swallow ".foo" when explicitly asked.
	          if (swallowee === '.' || swallowee === '..' ||
	            (!options.dot && swallowee.charAt(0) === '.')) {
	            this.debug('dot detected!', file, fr, pattern, pr)
	            break
	          }

	          // ** swallows a segment, and continue.
	          this.debug('globstar swallow a segment, and continue')
	          fr++
	        }
	      }

	      // no match was found.
	      // However, in partial mode, we can't say this is necessarily over.
	      // If there's more *pattern* left, then
	      if (partial) {
	        // ran out of file
	        this.debug('\n>>> no match, partial?', file, fr, pattern, pr)
	        if (fr === fl) return true
	      }
	      return false
	    }

	    // something other than **
	    // non-magic patterns just have to match exactly
	    // patterns with magic have been turned into regexps.
	    var hit
	    if (typeof p === 'string') {
	      if (options.nocase) {
	        hit = f.toLowerCase() === p.toLowerCase()
	      } else {
	        hit = f === p
	      }
	      this.debug('string match', p, f, hit)
	    } else {
	      hit = f.match(p)
	      this.debug('pattern match', p, f, hit)
	    }

	    if (!hit) return false
	  }

	  // Note: ending in / means that we'll get a final ""
	  // at the end of the pattern.  This can only match a
	  // corresponding "" at the end of the file.
	  // If the file ends in /, then it can only match a
	  // a pattern that ends in /, unless the pattern just
	  // doesn't have any more for it. But, a/b/ should *not*
	  // match "a/b/*", even though "" matches against the
	  // [^/]*? pattern, except in partial mode, where it might
	  // simply not be reached yet.
	  // However, a/b/ should still satisfy a/*

	  // now either we fell off the end of the pattern, or we're done.
	  if (fi === fl && pi === pl) {
	    // ran out of pattern and filename at the same time.
	    // an exact hit!
	    return true
	  } else if (fi === fl) {
	    // ran out of file, but still had pattern left.
	    // this is ok if we're doing the match as part of
	    // a glob fs traversal.
	    return partial
	  } else if (pi === pl) {
	    // ran out of pattern, still have file left.
	    // this is only acceptable if we're on the very last
	    // empty segment of a file with a trailing slash.
	    // a/* should match a/b/
	    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '')
	    return emptyFileEnd
	  }

	  // should be unreachable.
	  throw new Error('wtf?')
	}

	// replace stuff like \* with *
	function globUnescape (s) {
	  return s.replace(/\\(.)/g, '$1')
	}

	function regExpEscape (s) {
	  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
	}


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

	var concatMap = __webpack_require__(117);
	var balanced = __webpack_require__(118);

	module.exports = expandTop;

	var escSlash = '\0SLASH'+Math.random()+'\0';
	var escOpen = '\0OPEN'+Math.random()+'\0';
	var escClose = '\0CLOSE'+Math.random()+'\0';
	var escComma = '\0COMMA'+Math.random()+'\0';
	var escPeriod = '\0PERIOD'+Math.random()+'\0';

	function numeric(str) {
	  return parseInt(str, 10) == str
	    ? parseInt(str, 10)
	    : str.charCodeAt(0);
	}

	function escapeBraces(str) {
	  return str.split('\\\\').join(escSlash)
	            .split('\\{').join(escOpen)
	            .split('\\}').join(escClose)
	            .split('\\,').join(escComma)
	            .split('\\.').join(escPeriod);
	}

	function unescapeBraces(str) {
	  return str.split(escSlash).join('\\')
	            .split(escOpen).join('{')
	            .split(escClose).join('}')
	            .split(escComma).join(',')
	            .split(escPeriod).join('.');
	}


	// Basically just str.split(","), but handling cases
	// where we have nested braced sections, which should be
	// treated as individual members, like {a,{b,c},d}
	function parseCommaParts(str) {
	  if (!str)
	    return [''];

	  var parts = [];
	  var m = balanced('{', '}', str);

	  if (!m)
	    return str.split(',');

	  var pre = m.pre;
	  var body = m.body;
	  var post = m.post;
	  var p = pre.split(',');

	  p[p.length-1] += '{' + body + '}';
	  var postParts = parseCommaParts(post);
	  if (post.length) {
	    p[p.length-1] += postParts.shift();
	    p.push.apply(p, postParts);
	  }

	  parts.push.apply(parts, p);

	  return parts;
	}

	function expandTop(str) {
	  if (!str)
	    return [];

	  // I don't know why Bash 4.3 does this, but it does.
	  // Anything starting with {} will have the first two bytes preserved
	  // but *only* at the top level, so {},a}b will not expand to anything,
	  // but a{},b}c will be expanded to [a}c,abc].
	  // One could argue that this is a bug in Bash, but since the goal of
	  // this module is to match Bash's rules, we escape a leading {}
	  if (str.substr(0, 2) === '{}') {
	    str = '\\{\\}' + str.substr(2);
	  }

	  return expand(escapeBraces(str), true).map(unescapeBraces);
	}

	function identity(e) {
	  return e;
	}

	function embrace(str) {
	  return '{' + str + '}';
	}
	function isPadded(el) {
	  return /^-?0\d/.test(el);
	}

	function lte(i, y) {
	  return i <= y;
	}
	function gte(i, y) {
	  return i >= y;
	}

	function expand(str, isTop) {
	  var expansions = [];

	  var m = balanced('{', '}', str);
	  if (!m || /\$$/.test(m.pre)) return [str];

	  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
	  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
	  var isSequence = isNumericSequence || isAlphaSequence;
	  var isOptions = m.body.indexOf(',') >= 0;
	  if (!isSequence && !isOptions) {
	    // {a},b}
	    if (m.post.match(/,.*\}/)) {
	      str = m.pre + '{' + m.body + escClose + m.post;
	      return expand(str);
	    }
	    return [str];
	  }

	  var n;
	  if (isSequence) {
	    n = m.body.split(/\.\./);
	  } else {
	    n = parseCommaParts(m.body);
	    if (n.length === 1) {
	      // x{{a,b}}y ==> x{a}y x{b}y
	      n = expand(n[0], false).map(embrace);
	      if (n.length === 1) {
	        var post = m.post.length
	          ? expand(m.post, false)
	          : [''];
	        return post.map(function(p) {
	          return m.pre + n[0] + p;
	        });
	      }
	    }
	  }

	  // at this point, n is the parts, and we know it's not a comma set
	  // with a single entry.

	  // no need to expand pre, since it is guaranteed to be free of brace-sets
	  var pre = m.pre;
	  var post = m.post.length
	    ? expand(m.post, false)
	    : [''];

	  var N;

	  if (isSequence) {
	    var x = numeric(n[0]);
	    var y = numeric(n[1]);
	    var width = Math.max(n[0].length, n[1].length)
	    var incr = n.length == 3
	      ? Math.abs(numeric(n[2]))
	      : 1;
	    var test = lte;
	    var reverse = y < x;
	    if (reverse) {
	      incr *= -1;
	      test = gte;
	    }
	    var pad = n.some(isPadded);

	    N = [];

	    for (var i = x; test(i, y); i += incr) {
	      var c;
	      if (isAlphaSequence) {
	        c = String.fromCharCode(i);
	        if (c === '\\')
	          c = '';
	      } else {
	        c = String(i);
	        if (pad) {
	          var need = width - c.length;
	          if (need > 0) {
	            var z = new Array(need + 1).join('0');
	            if (i < 0)
	              c = '-' + z + c.slice(1);
	            else
	              c = z + c;
	          }
	        }
	      }
	      N.push(c);
	    }
	  } else {
	    N = concatMap(n, function(el) { return expand(el, false) });
	  }

	  for (var j = 0; j < N.length; j++) {
	    for (var k = 0; k < post.length; k++) {
	      var expansion = pre + N[j] + post[k];
	      if (!isTop || isSequence || expansion)
	        expansions.push(expansion);
	    }
	  }

	  return expansions;
	}



/***/ }),
/* 117 */
/***/ (function(module, exports) {

	module.exports = function (xs, fn) {
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        var x = fn(xs[i], i);
	        if (isArray(x)) res.push.apply(res, x);
	        else res.push(x);
	    }
	    return res;
	};

	var isArray = Array.isArray || function (xs) {
	    return Object.prototype.toString.call(xs) === '[object Array]';
	};


/***/ }),
/* 118 */
/***/ (function(module, exports) {

	module.exports = balanced;
	function balanced(a, b, str) {
	  if (a instanceof RegExp) a = maybeMatch(a, str);
	  if (b instanceof RegExp) b = maybeMatch(b, str);

	  var r = range(a, b, str);

	  return r && {
	    start: r[0],
	    end: r[1],
	    pre: str.slice(0, r[0]),
	    body: str.slice(r[0] + a.length, r[1]),
	    post: str.slice(r[1] + b.length)
	  };
	}

	function maybeMatch(reg, str) {
	  var m = str.match(reg);
	  return m ? m[0] : null;
	}

	balanced.range = range;
	function range(a, b, str) {
	  var begs, beg, left, right, result;
	  var ai = str.indexOf(a);
	  var bi = str.indexOf(b, ai + 1);
	  var i = ai;

	  if (ai >= 0 && bi > 0) {
	    begs = [];
	    left = str.length;

	    while (i >= 0 && !result) {
	      if (i == ai) {
	        begs.push(i);
	        ai = str.indexOf(a, i + 1);
	      } else if (begs.length == 1) {
	        result = [ begs.pop(), bi ];
	      } else {
	        beg = begs.pop();
	        if (beg < left) {
	          left = beg;
	          right = bi;
	        }

	        bi = str.indexOf(b, i + 1);
	      }

	      i = ai < bi && ai >= 0 ? ai : bi;
	    }

	    if (begs.length) {
	      result = [ left, right ];
	    }
	  }

	  return result;
	}


/***/ }),
/* 119 */
/***/ (function(module, exports) {

	'use strict';

	function posix(path) {
		return path.charAt(0) === '/';
	}

	function win32(path) {
		// https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
		var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
		var result = splitDeviceRe.exec(path);
		var device = result[1] || '';
		var isUnc = Boolean(device && device.charAt(1) !== ':');

		// UNC paths are always absolute
		return Boolean(result[2] || isUnc);
	}

	module.exports = process.platform === 'win32' ? win32 : posix;
	module.exports.posix = posix;
	module.exports.win32 = win32;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = globSync
	globSync.GlobSync = GlobSync

	var fs = __webpack_require__(7)
	var rp = __webpack_require__(113)
	var minimatch = __webpack_require__(115)
	var Minimatch = minimatch.Minimatch
	var Glob = __webpack_require__(112).Glob
	var util = __webpack_require__(18)
	var path = __webpack_require__(3)
	var assert = __webpack_require__(19)
	var isAbsolute = __webpack_require__(119)
	var common = __webpack_require__(121)
	var alphasort = common.alphasort
	var alphasorti = common.alphasorti
	var setopts = common.setopts
	var ownProp = common.ownProp
	var childrenIgnored = common.childrenIgnored
	var isIgnored = common.isIgnored

	function globSync (pattern, options) {
	  if (typeof options === 'function' || arguments.length === 3)
	    throw new TypeError('callback provided to sync glob\n'+
	                        'See: https://github.com/isaacs/node-glob/issues/167')

	  return new GlobSync(pattern, options).found
	}

	function GlobSync (pattern, options) {
	  if (!pattern)
	    throw new Error('must provide pattern')

	  if (typeof options === 'function' || arguments.length === 3)
	    throw new TypeError('callback provided to sync glob\n'+
	                        'See: https://github.com/isaacs/node-glob/issues/167')

	  if (!(this instanceof GlobSync))
	    return new GlobSync(pattern, options)

	  setopts(this, pattern, options)

	  if (this.noprocess)
	    return this

	  var n = this.minimatch.set.length
	  this.matches = new Array(n)
	  for (var i = 0; i < n; i ++) {
	    this._process(this.minimatch.set[i], i, false)
	  }
	  this._finish()
	}

	GlobSync.prototype._finish = function () {
	  assert(this instanceof GlobSync)
	  if (this.realpath) {
	    var self = this
	    this.matches.forEach(function (matchset, index) {
	      var set = self.matches[index] = Object.create(null)
	      for (var p in matchset) {
	        try {
	          p = self._makeAbs(p)
	          var real = rp.realpathSync(p, self.realpathCache)
	          set[real] = true
	        } catch (er) {
	          if (er.syscall === 'stat')
	            set[self._makeAbs(p)] = true
	          else
	            throw er
	        }
	      }
	    })
	  }
	  common.finish(this)
	}


	GlobSync.prototype._process = function (pattern, index, inGlobStar) {
	  assert(this instanceof GlobSync)

	  // Get the first [n] parts of pattern that are all strings.
	  var n = 0
	  while (typeof pattern[n] === 'string') {
	    n ++
	  }
	  // now n is the index of the first one that is *not* a string.

	  // See if there's anything else
	  var prefix
	  switch (n) {
	    // if not, then this is rather simple
	    case pattern.length:
	      this._processSimple(pattern.join('/'), index)
	      return

	    case 0:
	      // pattern *starts* with some non-trivial item.
	      // going to readdir(cwd), but not include the prefix in matches.
	      prefix = null
	      break

	    default:
	      // pattern has some string bits in the front.
	      // whatever it starts with, whether that's 'absolute' like /foo/bar,
	      // or 'relative' like '../baz'
	      prefix = pattern.slice(0, n).join('/')
	      break
	  }

	  var remain = pattern.slice(n)

	  // get the list of entries.
	  var read
	  if (prefix === null)
	    read = '.'
	  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
	    if (!prefix || !isAbsolute(prefix))
	      prefix = '/' + prefix
	    read = prefix
	  } else
	    read = prefix

	  var abs = this._makeAbs(read)

	  //if ignored, skip processing
	  if (childrenIgnored(this, read))
	    return

	  var isGlobStar = remain[0] === minimatch.GLOBSTAR
	  if (isGlobStar)
	    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar)
	  else
	    this._processReaddir(prefix, read, abs, remain, index, inGlobStar)
	}


	GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
	  var entries = this._readdir(abs, inGlobStar)

	  // if the abs isn't a dir, then nothing can match!
	  if (!entries)
	    return

	  // It will only match dot entries if it starts with a dot, or if
	  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
	  var pn = remain[0]
	  var negate = !!this.minimatch.negate
	  var rawGlob = pn._glob
	  var dotOk = this.dot || rawGlob.charAt(0) === '.'

	  var matchedEntries = []
	  for (var i = 0; i < entries.length; i++) {
	    var e = entries[i]
	    if (e.charAt(0) !== '.' || dotOk) {
	      var m
	      if (negate && !prefix) {
	        m = !e.match(pn)
	      } else {
	        m = e.match(pn)
	      }
	      if (m)
	        matchedEntries.push(e)
	    }
	  }

	  var len = matchedEntries.length
	  // If there are no matched entries, then nothing matches.
	  if (len === 0)
	    return

	  // if this is the last remaining pattern bit, then no need for
	  // an additional stat *unless* the user has specified mark or
	  // stat explicitly.  We know they exist, since readdir returned
	  // them.

	  if (remain.length === 1 && !this.mark && !this.stat) {
	    if (!this.matches[index])
	      this.matches[index] = Object.create(null)

	    for (var i = 0; i < len; i ++) {
	      var e = matchedEntries[i]
	      if (prefix) {
	        if (prefix.slice(-1) !== '/')
	          e = prefix + '/' + e
	        else
	          e = prefix + e
	      }

	      if (e.charAt(0) === '/' && !this.nomount) {
	        e = path.join(this.root, e)
	      }
	      this._emitMatch(index, e)
	    }
	    // This was the last one, and no stats were needed
	    return
	  }

	  // now test all matched entries as stand-ins for that part
	  // of the pattern.
	  remain.shift()
	  for (var i = 0; i < len; i ++) {
	    var e = matchedEntries[i]
	    var newPattern
	    if (prefix)
	      newPattern = [prefix, e]
	    else
	      newPattern = [e]
	    this._process(newPattern.concat(remain), index, inGlobStar)
	  }
	}


	GlobSync.prototype._emitMatch = function (index, e) {
	  if (isIgnored(this, e))
	    return

	  var abs = this._makeAbs(e)

	  if (this.mark)
	    e = this._mark(e)

	  if (this.absolute) {
	    e = abs
	  }

	  if (this.matches[index][e])
	    return

	  if (this.nodir) {
	    var c = this.cache[abs]
	    if (c === 'DIR' || Array.isArray(c))
	      return
	  }

	  this.matches[index][e] = true

	  if (this.stat)
	    this._stat(e)
	}


	GlobSync.prototype._readdirInGlobStar = function (abs) {
	  // follow all symlinked directories forever
	  // just proceed as if this is a non-globstar situation
	  if (this.follow)
	    return this._readdir(abs, false)

	  var entries
	  var lstat
	  var stat
	  try {
	    lstat = fs.lstatSync(abs)
	  } catch (er) {
	    if (er.code === 'ENOENT') {
	      // lstat failed, doesn't exist
	      return null
	    }
	  }

	  var isSym = lstat && lstat.isSymbolicLink()
	  this.symlinks[abs] = isSym

	  // If it's not a symlink or a dir, then it's definitely a regular file.
	  // don't bother doing a readdir in that case.
	  if (!isSym && lstat && !lstat.isDirectory())
	    this.cache[abs] = 'FILE'
	  else
	    entries = this._readdir(abs, false)

	  return entries
	}

	GlobSync.prototype._readdir = function (abs, inGlobStar) {
	  var entries

	  if (inGlobStar && !ownProp(this.symlinks, abs))
	    return this._readdirInGlobStar(abs)

	  if (ownProp(this.cache, abs)) {
	    var c = this.cache[abs]
	    if (!c || c === 'FILE')
	      return null

	    if (Array.isArray(c))
	      return c
	  }

	  try {
	    return this._readdirEntries(abs, fs.readdirSync(abs))
	  } catch (er) {
	    this._readdirError(abs, er)
	    return null
	  }
	}

	GlobSync.prototype._readdirEntries = function (abs, entries) {
	  // if we haven't asked to stat everything, then just
	  // assume that everything in there exists, so we can avoid
	  // having to stat it a second time.
	  if (!this.mark && !this.stat) {
	    for (var i = 0; i < entries.length; i ++) {
	      var e = entries[i]
	      if (abs === '/')
	        e = abs + e
	      else
	        e = abs + '/' + e
	      this.cache[e] = true
	    }
	  }

	  this.cache[abs] = entries

	  // mark and cache dir-ness
	  return entries
	}

	GlobSync.prototype._readdirError = function (f, er) {
	  // handle errors, and cache the information
	  switch (er.code) {
	    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
	    case 'ENOTDIR': // totally normal. means it *does* exist.
	      var abs = this._makeAbs(f)
	      this.cache[abs] = 'FILE'
	      if (abs === this.cwdAbs) {
	        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
	        error.path = this.cwd
	        error.code = er.code
	        throw error
	      }
	      break

	    case 'ENOENT': // not terribly unusual
	    case 'ELOOP':
	    case 'ENAMETOOLONG':
	    case 'UNKNOWN':
	      this.cache[this._makeAbs(f)] = false
	      break

	    default: // some unusual error.  Treat as failure.
	      this.cache[this._makeAbs(f)] = false
	      if (this.strict)
	        throw er
	      if (!this.silent)
	        console.error('glob error', er)
	      break
	  }
	}

	GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

	  var entries = this._readdir(abs, inGlobStar)

	  // no entries means not a dir, so it can never have matches
	  // foo.txt/** doesn't match foo.txt
	  if (!entries)
	    return

	  // test without the globstar, and with every child both below
	  // and replacing the globstar.
	  var remainWithoutGlobStar = remain.slice(1)
	  var gspref = prefix ? [ prefix ] : []
	  var noGlobStar = gspref.concat(remainWithoutGlobStar)

	  // the noGlobStar pattern exits the inGlobStar state
	  this._process(noGlobStar, index, false)

	  var len = entries.length
	  var isSym = this.symlinks[abs]

	  // If it's a symlink, and we're in a globstar, then stop
	  if (isSym && inGlobStar)
	    return

	  for (var i = 0; i < len; i++) {
	    var e = entries[i]
	    if (e.charAt(0) === '.' && !this.dot)
	      continue

	    // these two cases enter the inGlobStar state
	    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
	    this._process(instead, index, true)

	    var below = gspref.concat(entries[i], remain)
	    this._process(below, index, true)
	  }
	}

	GlobSync.prototype._processSimple = function (prefix, index) {
	  // XXX review this.  Shouldn't it be doing the mounting etc
	  // before doing stat?  kinda weird?
	  var exists = this._stat(prefix)

	  if (!this.matches[index])
	    this.matches[index] = Object.create(null)

	  // If it doesn't exist, then just mark the lack of results
	  if (!exists)
	    return

	  if (prefix && isAbsolute(prefix) && !this.nomount) {
	    var trail = /[\/\\]$/.test(prefix)
	    if (prefix.charAt(0) === '/') {
	      prefix = path.join(this.root, prefix)
	    } else {
	      prefix = path.resolve(this.root, prefix)
	      if (trail)
	        prefix += '/'
	    }
	  }

	  if (process.platform === 'win32')
	    prefix = prefix.replace(/\\/g, '/')

	  // Mark this as a match
	  this._emitMatch(index, prefix)
	}

	// Returns either 'DIR', 'FILE', or false
	GlobSync.prototype._stat = function (f) {
	  var abs = this._makeAbs(f)
	  var needDir = f.slice(-1) === '/'

	  if (f.length > this.maxLength)
	    return false

	  if (!this.stat && ownProp(this.cache, abs)) {
	    var c = this.cache[abs]

	    if (Array.isArray(c))
	      c = 'DIR'

	    // It exists, but maybe not how we need it
	    if (!needDir || c === 'DIR')
	      return c

	    if (needDir && c === 'FILE')
	      return false

	    // otherwise we have to stat, because maybe c=true
	    // if we know it exists, but not what it is.
	  }

	  var exists
	  var stat = this.statCache[abs]
	  if (!stat) {
	    var lstat
	    try {
	      lstat = fs.lstatSync(abs)
	    } catch (er) {
	      if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
	        this.statCache[abs] = false
	        return false
	      }
	    }

	    if (lstat && lstat.isSymbolicLink()) {
	      try {
	        stat = fs.statSync(abs)
	      } catch (er) {
	        stat = lstat
	      }
	    } else {
	      stat = lstat
	    }
	  }

	  this.statCache[abs] = stat

	  var c = true
	  if (stat)
	    c = stat.isDirectory() ? 'DIR' : 'FILE'

	  this.cache[abs] = this.cache[abs] || c

	  if (needDir && c === 'FILE')
	    return false

	  return c
	}

	GlobSync.prototype._mark = function (p) {
	  return common.mark(this, p)
	}

	GlobSync.prototype._makeAbs = function (f) {
	  return common.makeAbs(this, f)
	}


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	exports.alphasort = alphasort
	exports.alphasorti = alphasorti
	exports.setopts = setopts
	exports.ownProp = ownProp
	exports.makeAbs = makeAbs
	exports.finish = finish
	exports.mark = mark
	exports.isIgnored = isIgnored
	exports.childrenIgnored = childrenIgnored

	function ownProp (obj, field) {
	  return Object.prototype.hasOwnProperty.call(obj, field)
	}

	var path = __webpack_require__(3)
	var minimatch = __webpack_require__(115)
	var isAbsolute = __webpack_require__(119)
	var Minimatch = minimatch.Minimatch

	function alphasorti (a, b) {
	  return a.toLowerCase().localeCompare(b.toLowerCase())
	}

	function alphasort (a, b) {
	  return a.localeCompare(b)
	}

	function setupIgnores (self, options) {
	  self.ignore = options.ignore || []

	  if (!Array.isArray(self.ignore))
	    self.ignore = [self.ignore]

	  if (self.ignore.length) {
	    self.ignore = self.ignore.map(ignoreMap)
	  }
	}

	// ignore patterns are always in dot:true mode.
	function ignoreMap (pattern) {
	  var gmatcher = null
	  if (pattern.slice(-3) === '/**') {
	    var gpattern = pattern.replace(/(\/\*\*)+$/, '')
	    gmatcher = new Minimatch(gpattern, { dot: true })
	  }

	  return {
	    matcher: new Minimatch(pattern, { dot: true }),
	    gmatcher: gmatcher
	  }
	}

	function setopts (self, pattern, options) {
	  if (!options)
	    options = {}

	  // base-matching: just use globstar for that.
	  if (options.matchBase && -1 === pattern.indexOf("/")) {
	    if (options.noglobstar) {
	      throw new Error("base matching requires globstar")
	    }
	    pattern = "**/" + pattern
	  }

	  self.silent = !!options.silent
	  self.pattern = pattern
	  self.strict = options.strict !== false
	  self.realpath = !!options.realpath
	  self.realpathCache = options.realpathCache || Object.create(null)
	  self.follow = !!options.follow
	  self.dot = !!options.dot
	  self.mark = !!options.mark
	  self.nodir = !!options.nodir
	  if (self.nodir)
	    self.mark = true
	  self.sync = !!options.sync
	  self.nounique = !!options.nounique
	  self.nonull = !!options.nonull
	  self.nosort = !!options.nosort
	  self.nocase = !!options.nocase
	  self.stat = !!options.stat
	  self.noprocess = !!options.noprocess
	  self.absolute = !!options.absolute

	  self.maxLength = options.maxLength || Infinity
	  self.cache = options.cache || Object.create(null)
	  self.statCache = options.statCache || Object.create(null)
	  self.symlinks = options.symlinks || Object.create(null)

	  setupIgnores(self, options)

	  self.changedCwd = false
	  var cwd = process.cwd()
	  if (!ownProp(options, "cwd"))
	    self.cwd = cwd
	  else {
	    self.cwd = path.resolve(options.cwd)
	    self.changedCwd = self.cwd !== cwd
	  }

	  self.root = options.root || path.resolve(self.cwd, "/")
	  self.root = path.resolve(self.root)
	  if (process.platform === "win32")
	    self.root = self.root.replace(/\\/g, "/")

	  // TODO: is an absolute `cwd` supposed to be resolved against `root`?
	  // e.g. { cwd: '/test', root: __dirname } === path.join(__dirname, '/test')
	  self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd)
	  if (process.platform === "win32")
	    self.cwdAbs = self.cwdAbs.replace(/\\/g, "/")
	  self.nomount = !!options.nomount

	  // disable comments and negation in Minimatch.
	  // Note that they are not supported in Glob itself anyway.
	  options.nonegate = true
	  options.nocomment = true

	  self.minimatch = new Minimatch(pattern, options)
	  self.options = self.minimatch.options
	}

	function finish (self) {
	  var nou = self.nounique
	  var all = nou ? [] : Object.create(null)

	  for (var i = 0, l = self.matches.length; i < l; i ++) {
	    var matches = self.matches[i]
	    if (!matches || Object.keys(matches).length === 0) {
	      if (self.nonull) {
	        // do like the shell, and spit out the literal glob
	        var literal = self.minimatch.globSet[i]
	        if (nou)
	          all.push(literal)
	        else
	          all[literal] = true
	      }
	    } else {
	      // had matches
	      var m = Object.keys(matches)
	      if (nou)
	        all.push.apply(all, m)
	      else
	        m.forEach(function (m) {
	          all[m] = true
	        })
	    }
	  }

	  if (!nou)
	    all = Object.keys(all)

	  if (!self.nosort)
	    all = all.sort(self.nocase ? alphasorti : alphasort)

	  // at *some* point we statted all of these
	  if (self.mark) {
	    for (var i = 0; i < all.length; i++) {
	      all[i] = self._mark(all[i])
	    }
	    if (self.nodir) {
	      all = all.filter(function (e) {
	        var notDir = !(/\/$/.test(e))
	        var c = self.cache[e] || self.cache[makeAbs(self, e)]
	        if (notDir && c)
	          notDir = c !== 'DIR' && !Array.isArray(c)
	        return notDir
	      })
	    }
	  }

	  if (self.ignore.length)
	    all = all.filter(function(m) {
	      return !isIgnored(self, m)
	    })

	  self.found = all
	}

	function mark (self, p) {
	  var abs = makeAbs(self, p)
	  var c = self.cache[abs]
	  var m = p
	  if (c) {
	    var isDir = c === 'DIR' || Array.isArray(c)
	    var slash = p.slice(-1) === '/'

	    if (isDir && !slash)
	      m += '/'
	    else if (!isDir && slash)
	      m = m.slice(0, -1)

	    if (m !== p) {
	      var mabs = makeAbs(self, m)
	      self.statCache[mabs] = self.statCache[abs]
	      self.cache[mabs] = self.cache[abs]
	    }
	  }

	  return m
	}

	// lotta situps...
	function makeAbs (self, f) {
	  var abs = f
	  if (f.charAt(0) === '/') {
	    abs = path.join(self.root, f)
	  } else if (isAbsolute(f) || f === '') {
	    abs = f
	  } else if (self.changedCwd) {
	    abs = path.resolve(self.cwd, f)
	  } else {
	    abs = path.resolve(f)
	  }

	  if (process.platform === 'win32')
	    abs = abs.replace(/\\/g, '/')

	  return abs
	}


	// Return true, if pattern ends with globstar '**', for the accompanying parent directory.
	// Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
	function isIgnored (self, path) {
	  if (!self.ignore.length)
	    return false

	  return self.ignore.some(function(item) {
	    return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path))
	  })
	}

	function childrenIgnored (self, path) {
	  if (!self.ignore.length)
	    return false

	  return self.ignore.some(function(item) {
	    return !!(item.gmatcher && item.gmatcher.match(path))
	  })
	}


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	var wrappy = __webpack_require__(123)
	var reqs = Object.create(null)
	var once = __webpack_require__(124)

	module.exports = wrappy(inflight)

	function inflight (key, cb) {
	  if (reqs[key]) {
	    reqs[key].push(cb)
	    return null
	  } else {
	    reqs[key] = [cb]
	    return makeres(key)
	  }
	}

	function makeres (key) {
	  return once(function RES () {
	    var cbs = reqs[key]
	    var len = cbs.length
	    var args = slice(arguments)

	    // XXX It's somewhat ambiguous whether a new callback added in this
	    // pass should be queued for later execution if something in the
	    // list of callbacks throws, or if it should just be discarded.
	    // However, it's such an edge case that it hardly matters, and either
	    // choice is likely as surprising as the other.
	    // As it happens, we do go ahead and schedule it for later execution.
	    try {
	      for (var i = 0; i < len; i++) {
	        cbs[i].apply(null, args)
	      }
	    } finally {
	      if (cbs.length > len) {
	        // added more in the interim.
	        // de-zalgo, just in case, but don't call again.
	        cbs.splice(0, len)
	        process.nextTick(function () {
	          RES.apply(null, args)
	        })
	      } else {
	        delete reqs[key]
	      }
	    }
	  })
	}

	function slice (args) {
	  var length = args.length
	  var array = []

	  for (var i = 0; i < length; i++) array[i] = args[i]
	  return array
	}


/***/ }),
/* 123 */
/***/ (function(module, exports) {

	// Returns a wrapper function that returns a wrapped callback
	// The wrapper function should do some stuff, and return a
	// presumably different callback function.
	// This makes sure that own properties are retained, so that
	// decorations and such are not lost along the way.
	module.exports = wrappy
	function wrappy (fn, cb) {
	  if (fn && cb) return wrappy(fn)(cb)

	  if (typeof fn !== 'function')
	    throw new TypeError('need wrapper function')

	  Object.keys(fn).forEach(function (k) {
	    wrapper[k] = fn[k]
	  })

	  return wrapper

	  function wrapper() {
	    var args = new Array(arguments.length)
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i]
	    }
	    var ret = fn.apply(this, args)
	    var cb = args[args.length-1]
	    if (typeof ret === 'function' && ret !== cb) {
	      Object.keys(cb).forEach(function (k) {
	        ret[k] = cb[k]
	      })
	    }
	    return ret
	  }
	}


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	var wrappy = __webpack_require__(123)
	module.exports = wrappy(once)
	module.exports.strict = wrappy(onceStrict)

	once.proto = once(function () {
	  Object.defineProperty(Function.prototype, 'once', {
	    value: function () {
	      return once(this)
	    },
	    configurable: true
	  })

	  Object.defineProperty(Function.prototype, 'onceStrict', {
	    value: function () {
	      return onceStrict(this)
	    },
	    configurable: true
	  })
	})

	function once (fn) {
	  var f = function () {
	    if (f.called) return f.value
	    f.called = true
	    return f.value = fn.apply(this, arguments)
	  }
	  f.called = false
	  return f
	}

	function onceStrict (fn) {
	  var f = function () {
	    if (f.called)
	      throw new Error(f.onceError)
	    f.called = true
	    return f.value = fn.apply(this, arguments)
	  }
	  var name = fn.name || 'Function wrapped with `once`'
	  f.onceError = name + " shouldn't be called more than once"
	  f.called = false
	  return f
	}


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

	// It is expected that, when .add() returns false, the consumer
	// of the DirWriter will pause until a "drain" event occurs. Note
	// that this is *almost always going to be the case*, unless the
	// thing being written is some sort of unsupported type, and thus
	// skipped over.

	module.exports = DirWriter

	var fs = __webpack_require__(99)
	  , fstream = __webpack_require__(96)
	  , Writer = __webpack_require__(110)
	  , inherits = __webpack_require__(58)
	  , mkdir = __webpack_require__(105)
	  , path = __webpack_require__(3)
	  , collect = __webpack_require__(126)

	inherits(DirWriter, Writer)

	function DirWriter (props) {
	  var me = this
	  if (!(me instanceof DirWriter)) me.error(
	    "DirWriter must be called as constructor.", null, true)

	  // should already be established as a Directory type
	  if (props.type !== "Directory" || !props.Directory) {
	    me.error("Non-directory type "+ props.type + " " +
	                    JSON.stringify(props), null, true)
	  }

	  Writer.call(this, props)
	}

	DirWriter.prototype._create = function () {
	  var me = this
	  mkdir(me._path, Writer.dirmode, function (er) {
	    if (er) return me.error(er)
	    // ready to start getting entries!
	    me.ready = true
	    me.emit("ready")
	    me._process()
	  })
	}

	// a DirWriter has an add(entry) method, but its .write() doesn't
	// do anything.  Why a no-op rather than a throw?  Because this
	// leaves open the door for writing directory metadata for
	// gnu/solaris style dumpdirs.
	DirWriter.prototype.write = function () {
	  return true
	}

	DirWriter.prototype.end = function () {
	  this._ended = true
	  this._process()
	}

	DirWriter.prototype.add = function (entry) {
	  var me = this

	  // console.error("\tadd", entry._path, "->", me._path)
	  collect(entry)
	  if (!me.ready || me._currentEntry) {
	    me._buffer.push(entry)
	    return false
	  }

	  // create a new writer, and pipe the incoming entry into it.
	  if (me._ended) {
	    return me.error("add after end")
	  }

	  me._buffer.push(entry)
	  me._process()

	  return 0 === this._buffer.length
	}

	DirWriter.prototype._process = function () {
	  var me = this

	  // console.error("DW Process p=%j", me._processing, me.basename)

	  if (me._processing) return

	  var entry = me._buffer.shift()
	  if (!entry) {
	    // console.error("DW Drain")
	    me.emit("drain")
	    if (me._ended) me._finish()
	    return
	  }

	  me._processing = true
	  // console.error("DW Entry", entry._path)

	  me.emit("entry", entry)

	  // ok, add this entry
	  //
	  // don't allow recursive copying
	  var p = entry
	  do {
	    var pp = p._path || p.path
	    if (pp === me.root._path || pp === me._path ||
	        (pp && pp.indexOf(me._path) === 0)) {
	      // console.error("DW Exit (recursive)", entry.basename, me._path)
	      me._processing = false
	      if (entry._collected) entry.pipe()
	      return me._process()
	    }
	  } while (p = p.parent)

	  // console.error("DW not recursive")

	  // chop off the entry's root dir, replace with ours
	  var props = { parent: me
	              , root: me.root || me
	              , type: entry.type
	              , depth: me.depth + 1 }

	  var p = entry._path || entry.path || entry.props.path
	  if (entry.parent) {
	    p = p.substr(entry.parent._path.length + 1)
	  }
	  // get rid of any ../../ shenanigans
	  props.path = path.join(me.path, path.join("/", p))

	  // if i have a filter, the child should inherit it.
	  props.filter = me.filter

	  // all the rest of the stuff, copy over from the source.
	  Object.keys(entry.props).forEach(function (k) {
	    if (!props.hasOwnProperty(k)) {
	      props[k] = entry.props[k]
	    }
	  })

	  // not sure at this point what kind of writer this is.
	  var child = me._currentChild = new Writer(props)
	  child.on("ready", function () {
	    // console.error("DW Child Ready", child.type, child._path)
	    // console.error("  resuming", entry._path)
	    entry.pipe(child)
	    entry.resume()
	  })

	  // XXX Make this work in node.
	  // Long filenames should not break stuff.
	  child.on("error", function (er) {
	    if (child._swallowErrors) {
	      me.warn(er)
	      child.emit("end")
	      child.emit("close")
	    } else {
	      me.emit("error", er)
	    }
	  })

	  // we fire _end internally *after* end, so that we don't move on
	  // until any "end" listeners have had their chance to do stuff.
	  child.on("close", onend)
	  var ended = false
	  function onend () {
	    if (ended) return
	    ended = true
	    // console.error("* DW Child end", child.basename)
	    me._currentChild = null
	    me._processing = false
	    me._process()
	  }
	}


/***/ }),
/* 126 */
/***/ (function(module, exports) {

	module.exports = collect

	function collect (stream) {
	  if (stream._collected) return

	  stream._collected = true
	  stream.pause()

	  stream.on("data", save)
	  stream.on("end", save)
	  var buf = []
	  function save (b) {
	    if (typeof b === "string") b = new Buffer(b)
	    if (Buffer.isBuffer(b) && !b.length) return
	    buf.push(b)
	  }

	  stream.on("entry", saveEntry)
	  var entryBuffer = []
	  function saveEntry (e) {
	    collect(e)
	    entryBuffer.push(e)
	  }

	  stream.on("proxy", proxyPause)
	  function proxyPause (p) {
	    p.pause()
	  }


	  // replace the pipe method with a new version that will
	  // unlock the buffered stuff.  if you just call .pipe()
	  // without a destination, then it'll re-play the events.
	  stream.pipe = (function (orig) { return function (dest) {
	    // console.error(" === open the pipes", dest && dest.path)

	    // let the entries flow through one at a time.
	    // Once they're all done, then we can resume completely.
	    var e = 0
	    ;(function unblockEntry () {
	      var entry = entryBuffer[e++]
	      // console.error(" ==== unblock entry", entry && entry.path)
	      if (!entry) return resume()
	      entry.on("end", unblockEntry)
	      if (dest) dest.add(entry)
	      else stream.emit("entry", entry)
	    })()

	    function resume () {
	      stream.removeListener("entry", saveEntry)
	      stream.removeListener("data", save)
	      stream.removeListener("end", save)

	      stream.pipe = orig
	      if (dest) stream.pipe(dest)

	      buf.forEach(function (b) {
	        if (b) stream.emit("data", b)
	        else stream.emit("end")
	      })

	      stream.resume()
	    }

	    return dest
	  }})(stream.pipe)
	}


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

	
	module.exports = LinkWriter

	var fs = __webpack_require__(99)
	  , Writer = __webpack_require__(110)
	  , inherits = __webpack_require__(58)
	  , path = __webpack_require__(3)
	  , rimraf = __webpack_require__(111)

	inherits(LinkWriter, Writer)

	function LinkWriter (props) {
	  var me = this
	  if (!(me instanceof LinkWriter)) throw new Error(
	    "LinkWriter must be called as constructor.")

	  // should already be established as a Link type
	  if (!((props.type === "Link" && props.Link) ||
	        (props.type === "SymbolicLink" && props.SymbolicLink))) {
	    throw new Error("Non-link type "+ props.type)
	  }

	  if (props.linkpath === "") props.linkpath = "."
	  if (!props.linkpath) {
	    me.error("Need linkpath property to create " + props.type)
	  }

	  Writer.call(this, props)
	}

	LinkWriter.prototype._create = function () {
	  // console.error(" LW _create")
	  var me = this
	    , hard = me.type === "Link" || process.platform === "win32"
	    , link = hard ? "link" : "symlink"
	    , lp = hard ? path.resolve(me.dirname, me.linkpath) : me.linkpath

	  // can only change the link path by clobbering
	  // For hard links, let's just assume that's always the case, since
	  // there's no good way to read them if we don't already know.
	  if (hard) return clobber(me, lp, link)

	  fs.readlink(me._path, function (er, p) {
	    // only skip creation if it's exactly the same link
	    if (p && p === lp) return finish(me)
	    clobber(me, lp, link)
	  })
	}

	function clobber (me, lp, link) {
	  rimraf(me._path, function (er) {
	    if (er) return me.error(er)
	    create(me, lp, link)
	  })
	}

	function create (me, lp, link) {
	  fs[link](lp, me._path, function (er) {
	    // if this is a hard link, and we're in the process of writing out a
	    // directory, it's very possible that the thing we're linking to
	    // doesn't exist yet (especially if it was intended as a symlink),
	    // so swallow ENOENT errors here and just soldier in.
	    // Additionally, an EPERM or EACCES can happen on win32 if it's trying
	    // to make a link to a directory.  Again, just skip it.
	    // A better solution would be to have fs.symlink be supported on
	    // windows in some nice fashion.
	    if (er) {
	      if ((er.code === "ENOENT" ||
	           er.code === "EACCES" ||
	           er.code === "EPERM" ) && process.platform === "win32") {
	        me.ready = true
	        me.emit("ready")
	        me.emit("end")
	        me.emit("close")
	        me.end = me._finish = function () {}
	      } else return me.error(er)
	    }
	    finish(me)
	  })
	}

	function finish (me) {
	  me.ready = true
	  me.emit("ready")
	  if (me._ended && !me._finished) me._finish()
	}

	LinkWriter.prototype.end = function () {
	  // console.error("LW finish in end")
	  this._ended = true
	  if (this.ready) {
	    this._finished = true
	    this._finish()
	  }
	}


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = FileWriter

	var fs = __webpack_require__(99)
	  , mkdir = __webpack_require__(105)
	  , Writer = __webpack_require__(110)
	  , inherits = __webpack_require__(58)
	  , EOF = {}

	inherits(FileWriter, Writer)

	function FileWriter (props) {
	  var me = this
	  if (!(me instanceof FileWriter)) throw new Error(
	    "FileWriter must be called as constructor.")

	  // should already be established as a File type
	  if (props.type !== "File" || !props.File) {
	    throw new Error("Non-file type "+ props.type)
	  }

	  me._buffer = []
	  me._bytesWritten = 0

	  Writer.call(this, props)
	}

	FileWriter.prototype._create = function () {
	  var me = this
	  if (me._stream) return

	  var so = {}
	  if (me.props.flags) so.flags = me.props.flags
	  so.mode = Writer.filemode
	  if (me._old && me._old.blksize) so.bufferSize = me._old.blksize

	  me._stream = fs.createWriteStream(me._path, so)

	  me._stream.on("open", function (fd) {
	    // console.error("FW open", me._buffer, me._path)
	    me.ready = true
	    me._buffer.forEach(function (c) {
	      if (c === EOF) me._stream.end()
	      else me._stream.write(c)
	    })
	    me.emit("ready")
	    // give this a kick just in case it needs it.
	    me.emit("drain")
	  })

	  me._stream.on("drain", function () { me.emit("drain") })

	  me._stream.on("close", function () {
	    // console.error("\n\nFW Stream Close", me._path, me.size)
	    me._finish()
	  })
	}

	FileWriter.prototype.write = function (c) {
	  var me = this

	  me._bytesWritten += c.length

	  if (!me.ready) {
	    if (!Buffer.isBuffer(c) && typeof c !== 'string')
	      throw new Error('invalid write data')
	    me._buffer.push(c)
	    return false
	  }

	  var ret = me._stream.write(c)
	  // console.error("\t-- fw wrote, _stream says", ret, me._stream._queue.length)

	  // allow 2 buffered writes, because otherwise there's just too
	  // much stop and go bs.
	  if (ret === false && me._stream._queue) {
	    return me._stream._queue.length <= 2;
	  } else {
	    return ret;
	  }
	}

	FileWriter.prototype.end = function (c) {
	  var me = this

	  if (c) me.write(c)

	  if (!me.ready) {
	    me._buffer.push(EOF)
	    return false
	  }

	  return me._stream.end()
	}

	FileWriter.prototype._finish = function () {
	  var me = this
	  if (typeof me.size === "number" && me._bytesWritten != me.size) {
	    me.error(
	      "Did not get expected byte count.\n" +
	      "expect: " + me.size + "\n" +
	      "actual: " + me._bytesWritten)
	  }
	  Writer.prototype._finish.call(me)
	}


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

	// A writer for when we don't know what kind of thing
	// the thing is.  That is, it's not explicitly set,
	// so we're going to make it whatever the thing already
	// is, or "File"
	//
	// Until then, collect all events.

	module.exports = ProxyWriter

	var Writer = __webpack_require__(110)
	  , getType = __webpack_require__(103)
	  , inherits = __webpack_require__(58)
	  , collect = __webpack_require__(126)
	  , fs = __webpack_require__(7)

	inherits(ProxyWriter, Writer)

	function ProxyWriter (props) {
	  var me = this
	  if (!(me instanceof ProxyWriter)) throw new Error(
	    "ProxyWriter must be called as constructor.")

	  me.props = props
	  me._needDrain = false

	  Writer.call(me, props)
	}

	ProxyWriter.prototype._stat = function () {
	  var me = this
	    , props = me.props
	    // stat the thing to see what the proxy should be.
	    , stat = props.follow ? "stat" : "lstat"

	  fs[stat](props.path, function (er, current) {
	    var type
	    if (er || !current) {
	      type = "File"
	    } else {
	      type = getType(current)
	    }

	    props[type] = true
	    props.type = me.type = type

	    me._old = current
	    me._addProxy(Writer(props, current))
	  })
	}

	ProxyWriter.prototype._addProxy = function (proxy) {
	  // console.error("~~ set proxy", this.path)
	  var me = this
	  if (me._proxy) {
	    return me.error("proxy already set")
	  }

	  me._proxy = proxy
	  ; [ "ready"
	    , "error"
	    , "close"
	    , "pipe"
	    , "drain"
	    , "warn"
	    ].forEach(function (ev) {
	      proxy.on(ev, me.emit.bind(me, ev))
	    })

	  me.emit("proxy", proxy)

	  var calls = me._buffer
	  calls.forEach(function (c) {
	    // console.error("~~ ~~ proxy buffered call", c[0], c[1])
	    proxy[c[0]].apply(proxy, c[1])
	  })
	  me._buffer.length = 0
	  if (me._needsDrain) me.emit("drain")
	}

	ProxyWriter.prototype.add = function (entry) {
	  // console.error("~~ proxy add")
	  collect(entry)

	  if (!this._proxy) {
	    this._buffer.push(["add", [entry]])
	    this._needDrain = true
	    return false
	  }
	  return this._proxy.add(entry)
	}

	ProxyWriter.prototype.write = function (c) {
	  // console.error("~~ proxy write")
	  if (!this._proxy) {
	    this._buffer.push(["write", [c]])
	    this._needDrain = true
	    return false
	  }
	  return this._proxy.write(c)
	}

	ProxyWriter.prototype.end = function (c) {
	  // console.error("~~ proxy end")
	  if (!this._proxy) {
	    this._buffer.push(["end", [c]])
	    return false
	  }
	  return this._proxy.end(c)
	}


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(65)


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var child_process = __webpack_require__(132);

	var _instance = void 0;

	module.exports = function () {
	    _createClass(CLI, null, [{
	        key: 'getInstance',
	        value: function getInstance() {
	            if (!_instance) {
	                _instance = new CLI();
	            }
	            return _instance;
	        }
	    }]);

	    function CLI() {
	        _classCallCheck(this, CLI);

	        this._process = new Map();
	    }

	    _createClass(CLI, [{
	        key: 'exec',
	        value: function exec(args, options, callback) {
	            this._nextId++;

	            var cmd = args.shift();
	            var tag = options.tag;
	            delete options.tag;

	            var child = child_process.spawn(cmd, args, options);
	            console.log('[CLI] spawn (' + child.pid + '): ' + cmd + ' ' + args.join(" "));

	            var procs = this._process;
	            procs.set(tag, child);

	            var stdout = [];
	            var stderr = [];

	            child.stdout.on('data', function (data) {
	                stdout.push(data);
	                if ((typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object') {
	                    callback.stdout(data);
	                }
	            });
	            child.stderr.on('data', function (data) {
	                stderr.push(data);
	                if ((typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object') {
	                    callback.stderr(data);
	                }
	            });

	            child.on('error', function (err) {
	                if (procs.has(tag)) {
	                    procs.delete(tag);
	                }
	                if ((typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object') {
	                    callback.error(err, stdout.join(''), stderr.join(''));
	                } else if (typeof callback === 'function') {
	                    callback(err, stdout.join(''), stderr.join(''));
	                }
	            });
	            child.on('exit', function (code, signal) {
	                signal = signal ? signal : '';
	                console.log('[CLI] exit (' + child.pid + ') ' + code + ' ' + signal);
	                if (procs.has(tag)) {
	                    procs.delete(tag);
	                }
	                if ((typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object') {
	                    callback.exit(stdout.join(''), stderr.join(''));
	                } else if (typeof callback === 'function') {
	                    callback(null, stdout.join(''), stderr.join(''));
	                }
	            });
	        }
	    }, {
	        key: 'kill',
	        value: function kill(tag) {
	            if (this._process.has(tag)) {
	                var child = this._process[tag];
	                if (child) {
	                    child.kill();
	                }
	                this._process.delete(tag);
	            }
	        }
	    }, {
	        key: 'query',
	        value: function query(tag) {
	            return this._process.has(tag);
	        }
	    }]);

	    return CLI;
	}();

/***/ }),
/* 132 */
/***/ (function(module, exports) {

	module.exports = require("child_process");

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory();
	    } else {
	        root.deepmerge = factory();
	    }
	}(this, function () {

	function isMergeableObject(val) {
	    var nonNullObject = val && typeof val === 'object'

	    return nonNullObject
	        && Object.prototype.toString.call(val) !== '[object RegExp]'
	        && Object.prototype.toString.call(val) !== '[object Date]'
	}

	function emptyTarget(val) {
	    return Array.isArray(val) ? [] : {}
	}

	function cloneIfNecessary(value, optionsArgument) {
	    var clone = optionsArgument && optionsArgument.clone === true
	    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
	}

	function defaultArrayMerge(target, source, optionsArgument) {
	    var destination = target.slice()
	    source.forEach(function(e, i) {
	        if (typeof destination[i] === 'undefined') {
	            destination[i] = cloneIfNecessary(e, optionsArgument)
	        } else if (isMergeableObject(e)) {
	            destination[i] = deepmerge(target[i], e, optionsArgument)
	        } else if (target.indexOf(e) === -1) {
	            destination.push(cloneIfNecessary(e, optionsArgument))
	        }
	    })
	    return destination
	}

	function mergeObject(target, source, optionsArgument) {
	    var destination = {}
	    if (isMergeableObject(target)) {
	        Object.keys(target).forEach(function (key) {
	            destination[key] = cloneIfNecessary(target[key], optionsArgument)
	        })
	    }
	    Object.keys(source).forEach(function (key) {
	        if (!isMergeableObject(source[key]) || !target[key]) {
	            destination[key] = cloneIfNecessary(source[key], optionsArgument)
	        } else {
	            destination[key] = deepmerge(target[key], source[key], optionsArgument)
	        }
	    })
	    return destination
	}

	function deepmerge(target, source, optionsArgument) {
	    var array = Array.isArray(source);
	    var options = optionsArgument || { arrayMerge: defaultArrayMerge }
	    var arrayMerge = options.arrayMerge || defaultArrayMerge

	    if (array) {
	        return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
	    } else {
	        return mergeObject(target, source, optionsArgument)
	    }
	}

	deepmerge.all = function deepmergeAll(array, optionsArgument) {
	    if (!Array.isArray(array) || array.length < 2) {
	        throw new Error('first argument should be an array with at least two elements')
	    }

	    // we are sure there are at least 2 values, so it is safe to have no initial value
	    return array.reduce(function(prev, next) {
	        return deepmerge(prev, next, optionsArgument)
	    })
	}

	return deepmerge

	}));


/***/ })
/******/ ])
});
;