import { Queue } from "../../queue";
import ChimpleLabel from "./chimple-label";
import Help from "./help";
import { DEFAULT_FONT_COLOR, LETTER_VOICE, NUMBER_VOICE, PHONIC_VOICE } from "./helper";
import LessonController from "./lessonController";
import Config from "./lib/config";
import { ASSET_LOAD_METHOD, COURSES_URL } from "./lib/constants";
import Profile, { LANGUAGE, SFX_OFF } from "./lib/profile";
import UtilLogger from "./util-logger";
import Overflow = cc.Label.Overflow;
import HorizontalAlign = cc.Label.HorizontalAlign;
import VerticalAlign = cc.Label.VerticalAlign;

export const SUBPACKAGES = 'subpackages'

const numberMappings = {
  "+": "plus",
  "-": "minus",
  "&": "and",
  "=": "equals",
  x: "times",
};

export const enum TouchEvents {
  TOUCH_START = "touchstart",
  TOUCH_END = "touchend",
  TOUCH_MOVE = "touchmove",
  TOUCH_CANCEL = "touchCancel",
}

const DOWNLOAD_STARTED = "DOWNLOAED_STARTED";
const DOWNLOAD_SUCCESS = "DOWNLOAD_SUCCESS";
const DOWNLOAD_FAILED = "DOWNLOAD_FAILED";

export class Util {
  private static _i18NMap = new Map();
  private static _resources: string[] = [];
  static bundles: Map<string, cc.AssetManager.Bundle> = new Map();
  private static helpAudioId: number = -1;
  static chimp: dragonBones.ArmatureDisplay = null;

  public static shuffle<T>(arr): T[] {
    let ctr = arr.length;
    let temp;
    let index;
    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = arr[ctr];
      arr[ctr] = arr[index];
      arr[index] = temp;
    }
    return arr;
  }

  public static shuffleByMapSortMap<T>(unshuffled): T[] {
    return unshuffled
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }

  public static randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  public static pickRandomElements(array, howManyElements: number) {
    const resultArray = [];
    for (let i = 0; i < howManyElements; i++) {
      let shuffledArray = Util.shuffle(array);
      let index = Math.floor(Math.random() * shuffledArray.length);
      resultArray.push(shuffledArray.splice(index, 1));
    }
    return resultArray;
  }

  public static initText(
    parentNode: cc.Node,
    textFont: cc.Font,
    text: string = "",
    fontSize: string = "10",
    fontColor: string = null,
    showLabel: boolean = true,
    adj: cc.Vec2 = new cc.Vec2(0, 0),
    horizontalAlign = HorizontalAlign.CENTER,
    verticalAlign = VerticalAlign.CENTER,
    anchorPoint: cc.Vec2 = new cc.Vec2(0.5, 0.5),
    outlineEnable: boolean = false,
    outlineWidth: number = 0
  ): cc.Node {
    const qLabelNode = new cc.Node(text);
    const label = qLabelNode.addComponent(ChimpleLabel);
    label.string = showLabel ? text : "";
    //label.font = textFont;
    label.overflow = Overflow.NONE;
    let defaultFontColor: cc.Color = DEFAULT_FONT_COLOR;
    if (!!fontColor) {
      defaultFontColor = defaultFontColor.fromHEX(fontColor);
    }
    qLabelNode.color = defaultFontColor;
    const fSize: number = parseInt(fontSize);
    label.fontSize = fSize;
    label.horizontalAlign = horizontalAlign;
    label.verticalAlign = verticalAlign;
    label.lineHeight = fSize + 100;
    qLabelNode.setAnchorPoint(anchorPoint);
    // @ts-ignore
    qLabelNode.position = new cc.Vec2(adj.x, adj.y); // to align text with middle since in bigger font size it aligns down
    if (outlineEnable) {
      const outLine = qLabelNode.addComponent(cc.LabelOutline);
      outLine.width = outlineWidth;
    }
    parentNode.addChild(qLabelNode);
    return qLabelNode;
  }

  public static isBetweenRange(input: number, min: number, max: number) {
    return input >= min && input <= max;
  }

  public static chunk<T>(array: T[], chunkSize: number): T[] {
    const R = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      R.push(array.slice(i, i + chunkSize));
    }
    return R;
  }

  public static chunkByIncreaseSize<T>(
    array: T[],
    startChunkSize: number,
    increment: number
  ): T[] {
    const R = [];
    let chunkSize = startChunkSize;
    let counter = 1;
    for (let i = 0; i < array.length; i = chunkSize + counter * increment) {
      R.push(array.slice(i, i + chunkSize + counter * increment));
      counter++;
    }
    return R;
  }

  public static speakEquation(
    nums: Array<string>,
    callbackOnEnd: (index: number) => void
  ) {
    var index: number = 0;
    const audios = nums.map((val: string) => {
      let num: string =
        val in numberMappings ? numberMappings[val] : "d_" + val;
      num = !num.endsWith(".mp3") ? num + ".mp3" : num;
      return Config.dir + "course/res/sound/numbervoice/" + num;
    });
    this.speakOneByOne(audios, 0, callbackOnEnd);
  }

  public static speakOneByOne(
    audios: Array<string>,
    index: number,
    callbackOnEnd: (index: number) => void
  ) {
    this.speak(audios[index], () => {
      callbackOnEnd(index);
      if (++index < audios.length) {
        this.speakOneByOne(audios, index, callbackOnEnd);
      }
    });
  }

  public static speak(audio: string, callback: Function) {
    Util.load(
      audio,
      (err, clip) => {
        this.speakClip(clip, callback);
      },
      true
    );
  }

  public static speakClip(clip: cc.AudioClip, callback: Function) {
    if (clip != null) {
      if (Array.isArray(clip) && clip.length === 0) {
        callback();
      } else {
        const audioId = Util.play(clip, false);
        if (audioId != -1) {
          cc.audioEngine.setFinishCallback(audioId, callback);
        } else {
          callback();
        }
      }
    } else {
      callback();
    }
  }

  public static speakMusic(audio: string, callback: Function) {
    Util.load(
      audio,
      (err, clip) => {
        if (clip != null) {
          if (Array.isArray(clip) && clip.length === 0) {
            callback();
          } else {
            const audioId = cc.audioEngine.playMusic(clip, false);
            cc.audioEngine.setFinishCallback(audioId, callback);
          }
        } else {
          callback();
        }
      },
      true
    );
  }

  public static loadNumericSound(text: string, callBack: Function) {
    let fileName = `d_${text.toLowerCase()}`;
    fileName = fileName.endsWith(".mp3") ? fileName : fileName + ".mp3";
    const location = Config.dir + NUMBER_VOICE;
    const fullFilePath = location + fileName;

    Util.load(
      fullFilePath,
      (err, clip) => {
        if (!err && clip !== null) {
          callBack(clip);
        } else {
          callBack(null);
        }
      },
      true
    );
  }

  public static loadsPhonicsOrLetter(audio: string, callback: Function) {
    audio = audio.replace(".m4a", "");
    audio = audio.endsWith(".mp3") ? audio : audio + ".mp3";
    const phonicsLoc = Config.dir + PHONIC_VOICE + audio;
    Util.load(
      phonicsLoc,
      (err, clip) => {
        if (!err && clip != null) {
          callback(clip);
        } else if (err != null) {
          const letterLoc = Config.dir + LETTER_VOICE + audio;
          Util.load(
            letterLoc,
            (err, clip) => {
              if (!err && clip != null) {
                callback(clip);
              } else if (err != null) {
                callback(null);
              }
            },
            true
          );
        }
      },
      true
    );
  }

  public static loadsLetter(audio: string, callback: Function) {
    audio = audio.replace(".m4a", "");
    audio = audio.endsWith(".mp3") ? audio : audio + ".mp3";
    const letterLoc = Config.dir + LETTER_VOICE + audio;
    Util.load(
      letterLoc,
      (err, clip) => {
        if (!err && clip != null) {
          callback(clip);
        } else if (err != null) {
          callback(null);
        }
      },
      true
    );
  }

  public static loadGameSound(path: string, callBack: Function) {
    const filePath = path.startsWith(Config.dir)
      ? path
      : Config.dir + `${Config.i.lesson.id}/res/${path}`;
    const fullFilePath =
      filePath + (path.endsWith(".mp3") || path.endsWith(".m4a") ? "" : ".mp3");
    Util.load(
      fullFilePath,
      (err, clip) => {
        if (err) {
          cc.log(err);
        }
        if (!err && clip !== null) {
          callBack(clip);
        } else {
          callBack(null);
        }
      },
      true
    );
  }

  public static loadTexture(
    path: string,
    callBack: Function,
    needsRelease: boolean = true
  ) {
    path =
      path.endsWith(".png") || path.endsWith(".jpg") ? path : path + ".png";
    const fullFilePath = path.startsWith(Config.dir)
      ? path
      : Config.dir + `${Config.i.lesson.id}/res/${path}`;
    Util.load(
      fullFilePath,
      (err, texture) => {
        if (!!texture && !err) {
          callBack(texture, err);
        } else if (err) {
          callBack(null);
        }
      },
      needsRelease
    );
  }

  public static flattenDeep<T>(arr) {
    return arr.reduce(
      (acc, val) =>
        Array.isArray(val)
          ? acc.concat(this.flattenDeep(val))
          : acc.concat(val),
      []
    );
  }

  public static randomElements(array, n) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, n);
    return selected;
  }

  public static takePictureFromCamera(callback) {
    jsb.reflection.callStaticMethod(
      "org/cocos2dx/javascript/AppActivity",
      "openCamera",
      "()V"
    );
    let checkCount = 10;
    let result = null;
    // return callback with image path
    return (async () => {
      while (checkCount > 0 && result == null) {
        result = await Util.checkCameraResult();
        checkCount--;
      }
      callback(result);
    })();
  }

  private static checkCameraResult(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(function () {
        let result = jsb.reflection.callStaticMethod(
          "org/cocos2dx/javascript/AppActivity",
          "checkCameraResult",
          "()Ljava/lang/String;"
        );
        resolve(result);
        console.log("Returned promise");
      }, 6000);
    });
  }

  public static getRandomPosition(array, removeTaken) {
    let randomIndex;
    let coordinates;
    randomIndex = Util.randomBetween(0, array.length - 1);
    coordinates = array[randomIndex];
    if (removeTaken) {
      array.splice(randomIndex, 1);
    }
    return coordinates;
  }

  public static generatePositionsArray(maxX, maxY, safeRadius, irregularity) {
    let positionsArray = [];
    let r, c;
    let rows;
    let columns;
    rows = Math.floor(maxY / safeRadius);
    columns = Math.floor(maxX / safeRadius);
    for (r = 1; r <= rows; r += 1) {
      for (c = 1; c <= columns; c += 1) {
        positionsArray.push({
          x:
            Math.round((maxX * c) / columns) +
            Util.randomBetween(irregularity * -1, irregularity) -
            maxX / 2 -
            50,
          y:
            Math.round((maxY * r) / rows) +
            Util.randomBetween(irregularity * -1, irregularity) -
            maxY / 2,
        });
      }
    }
    return positionsArray;
  }

  public static speakLetter(audio: string, callback: Function) {
    const letterLoc = Config.dir + LETTER_VOICE + audio;
    Util.load(
      letterLoc,
      (err, clip) => {
        if (!err && clip != null) {
          const audioId = Util.play(clip, false);
          if (audioId !== -1) {
            cc.audioEngine.setFinishCallback(audioId, callback);
          } else {
            callback();
          }
          cc.audioEngine.setFinishCallback(audioId, callback);
        } else if (err != null) {
          callback();
        }
      },
      true
    );
  }

  public static speakPhonicsOrLetter(audio: string, callback: Function) {
    audio = audio.replace(".m4a", "");
    audio = !audio.endsWith(".mp3") ? audio + ".mp3" : audio;
    const phonicsLoc = Config.dir + PHONIC_VOICE + audio;
    Util.load(
      phonicsLoc,
      (err, clip) => {
        if (!err && clip != null) {
          const audioId = Util.play(clip, false);
          if (audioId !== -1) {
            cc.audioEngine.setFinishCallback(audioId, callback);
          } else {
            this.speakLetter(audio, callback);
          }
          cc.audioEngine.setFinishCallback(audioId, callback);
        } else if (err != null) {
          this.speakLetter(audio, callback);
        }
      },
      true
    );
  }

  public static speakGameAudioOrPhonics(audio: string, callback: Function) {
    audio = audio.replace(".m4a", "");
    audio = !audio.endsWith(".mp3") ? audio + ".mp3" : audio;
    const phonicsLoc = Config.dir + PHONIC_VOICE + audio;
    Util.load(
      phonicsLoc,
      (err, clip) => {
        if (err! = null) {
          this.playGameSound(audio, callback);
        } else if (!err && clip != null) {
          const audioId = Util.play(clip, false);
          if (audioId !== -1) {
            cc.audioEngine.setFinishCallback(audioId, callback);
          } else {
            this.playGameSound(audio, callback);
          }
          cc.audioEngine.setFinishCallback(audioId, callback);
        }
      },
      true
    );
  }

  public static playGameSound(nameOfSound, callback: Function) {
    Util.loadGameSound(nameOfSound, function (clip) {
      if (clip != null) {
        const audioId = Util.play(clip, false);
        if (audioId != -1) {
          cc.audioEngine.setFinishCallback(audioId, () => {
            callback();
          });
        }
      }
    });
  }

  public static speakLettersOrWords(audio: string, callback: Function) {
    audio = audio.replace(".m4a", "");
    audio = !audio.endsWith(".mp3") ? audio + ".mp3" : audio;
    const letterLoc = Config.dir + LETTER_VOICE + audio;
    Util.loadGameSound(letterLoc, (clip) => {
      let audioId = -1;
      if (clip != null) {
        audioId = cc.audioEngine.play(clip, false, 1);
      }
      if (audioId >= 0) {
        cc.audioEngine.setFinishCallback(audioId, callback);
      } else {
        const wordLoc = Config.dir + Config.i.course.id + "/res/" + audio;
        Util.loadGameSound(wordLoc, (clip) => {
          if (clip != null) {
            audioId = cc.audioEngine.play(clip, false, 1);
          }
          if (audioId >= 0) {
            cc.audioEngine.setFinishCallback(audioId, callback);
          } else if (callback != null) {
            callback();
          }
        });
      }
    });
  }

  public static freeResources() {
    for (let i = this._resources.length - 1; i >= 0; i--) {
      try {
        cc.log("free resource ---->:", this._resources[i]);
        cc.resources.release(this._resources[i]);
      } catch (e) {
      }
      this._resources.splice(i, 1);
    }
    cc.log("resources left: --->", this._resources.length);
  }

  public static load(
    res: string,
    callback: Function,
    needsRelease: boolean = true
  ) {
    const resArray = res.split("/");
    const courseName = resArray[0];
    const lessonName = resArray[1];
    const resDir = resArray.slice(2).join("/");
    const resName = resDir.split(".")[0];
    const bundle = this.bundles.get(
      lessonName == "course" ? courseName : lessonName
    );
    const ext = resDir.split(".")[1];
    if (ext === "mp3" || ext === "m4a") {
      bundle.load(resName, cc.AudioClip, function (err, asset) {
        if (err) {
          cc.log(JSON.stringify(err));
        }
        callback(err, asset);
      });
    } else if (ext === "png" || ext === "jpg") {
      bundle.load(resName, cc.Texture2D, function (err, asset) {
        if (err) {
          cc.log(JSON.stringify(err));
        }
        callback(err, asset);
      });
    } else {
      bundle.load(resName, (err, asset) => {
        if (err) {
          cc.log(JSON.stringify(err));
        }
        callback(err, asset);
      });
    }
  }

  public static loadi18NMapping(callBack: Function) {
    let jsonFile = 'lang/' + Profile.getValue(LANGUAGE) + '/i18n'
    cc.resources.load(jsonFile, (err, jsonAsset) => {
      if (!err && !!jsonAsset) {
        const data =
          jsonAsset instanceof cc.JsonAsset ? jsonAsset.json : jsonAsset;
        if (!!data) {
          Object.keys(data).forEach((key) => {
            let value = data[key];
            Util._i18NMap.set(key, value);
          });
        }
        callBack();
      } else {
        callBack();
      }
    });
  }

  public static i18NText(key: string) {
    return Util._i18NMap.has(key) ? this._i18NMap.get(key) : key;
  }

  public static i18NNumberConvert(
    lbString: string,
    startWithDigit: boolean = true
  ) {
    let regExCondition = startWithDigit
      ? /^\d/.test(lbString)
      : /\d/.test(lbString);
    if (regExCondition) {
      let numbers: string[] = lbString.split("");
      numbers = numbers.map((n) => Util.i18NText(n));
      console.log("converted ", Util.i18NText(numbers.join("")));
      return Util.i18NText(numbers.join(""));
    } else {
      return lbString;
    }
  }

  public static showHelp(
    from: cc.Node,
    to: cc.Node,
    callBack: Function = null,
    playAudio: boolean = true
  ) {
    const config = Config.getInstance();
    if (config.problem == 1 && from != null && to != null) {
      cc.resources.load("prefabs/help", function (err, prefab) {
        if (!err) {
          const help = cc.instantiate(prefab);
          // @ts-ignore
          const helpComp = help.getComponent(Help);
          if (helpComp != null) {
            helpComp.initNodes(from, to, null);
          }
          // @ts-ignore
          lessonNode.addChild(help);
        }
      });
    }
    if (playAudio) {
      const lessonNode = cc.Canvas.instance.node
      const lessonComp = lessonNode.getComponent(LessonController)
      lessonComp.friend.speakHelp(callBack)
    } else {
      if (callBack != null) callBack();
    }
  }

  public static playHelpAudio(audio: string, callback: Function) {
    cc.assetManager.loadBundle(Profile.getValue(LANGUAGE) + '-help', (err, bundle) => {
      if (!err) {
        bundle.load(audio, cc.AudioClip, (err, clip) => {
          if (!err) {
            this.helpAudioId = Util.play(clip, false);
            if (this.helpAudioId != -1) {
              cc.audioEngine.setFinishCallback(this.helpAudioId, callback);
            } else {
              callback();
            }
          } else {
            callback()
          }
        })
      } else {
        callback()
      }
    })
  }

  public static computeTimeDiff(
    append: string,
    startDate: Date = new Date(),
    endDate: Date = new Date()
  ) {
    let diff = endDate.getTime() - startDate.getTime();
    cc.log(`${append} -> computeTimeDiff in milliseconds ${diff}`);
  }

  public static * shuffleGenerator(array) {
    let i = array.length;
    while (i--) {
      yield array.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    }
  }

  public static loadFriend(callback: Function) {
    cc.resources.load(
      "prefabs/friend/" + Config.getInstance().friend,
      (err, prefab) => {
        if (err != null) cc.log(err);
        const friendNode = prefab != null ? cc.instantiate(prefab) : null;
        if (callback != null) callback(friendNode);
      }
    );
  }

  public static playSfx(
    audioClip: cc.AudioClip,
    isMusic: boolean = false,
    loop: boolean = false
  ): number {
    if (Profile.getItem(SFX_OFF) == 0) {
      try {
        return isMusic
          ? cc.audioEngine.playMusic(audioClip, loop)
          : cc.audioEngine.playEffect(audioClip, loop);
      } catch (e) {
      }
    }
    return -1;
  }

  public static stopHelpAudio() {
    try {
      cc.audioEngine.stopEffect(this.helpAudioId);
      if (this.chimp) this.chimp.playAnimation("idle", 1);
    } catch (e) {
      cc.log(e);
    }
    return this.helpAudioId;
  }

  public static play(audioClip: cc.AudioClip, loop: boolean = false) {
    let audioId = -1;
    try {
      if (audioClip) {
        audioId = cc.audioEngine.playEffect(audioClip, loop);
      }
    } catch (e) {
      cc.log(e);
    }
    return audioId;
  }

  public static getSubpackages(): Array<string> {
    const subpackages = JSON.parse(cc.sys.localStorage.getItem(SUBPACKAGES));
    return subpackages ? subpackages : [];
  }

  public static addSubpackage(subpackage: string) {
    const subpackages = this.getSubpackages();
    subpackages.push(subpackage);
    cc.sys.localStorage.setItem(SUBPACKAGES, JSON.stringify(subpackages));
  }

  public static downloadIfNeeded(
    node: cc.Node,
    course: string,
    lesson: string,
    callbackOnExists: Function
  ) {
    const storageDir = course;
    const manifestPath = storageDir + "/" + lesson;
    const testFile = manifestPath + "/res/" + lesson + ".json";

    if (
      cc.sys.isNative &&
      cc.sys.os == cc.sys.OS_ANDROID &&
      ASSET_LOAD_METHOD === "file" &&
      !jsb.fileUtils.isFileExist(testFile)
    ) {
      UtilLogger.downloadFile(`${COURSES_URL}${manifestPath}.zip`, storageDir);
      const callback = () => {
        cc.log(
          `calling checkIfUrlDownloaded ${COURSES_URL}${manifestPath}.zip`
        );
        const isFileDownloaded = UtilLogger.checkIfUrlDownloaded(
          `${COURSES_URL}${manifestPath}.zip`,
          storageDir
        );
        if (
          isFileDownloaded == DOWNLOAD_FAILED ||
          isFileDownloaded == DOWNLOAD_SUCCESS
        ) {
          cc.director.getScheduler().unschedule(callback, node);
          if (isFileDownloaded == DOWNLOAD_SUCCESS) {
            Util.addSubpackage(manifestPath);
            callbackOnExists(true);
          } else {
            callbackOnExists(false);
          }
        }
      };
      cc.director.getScheduler().schedule(callback, node, 1);
    } else {
      callbackOnExists(true);
    }
  }

    public static assignHomework(chapterId: string, lessonId: string,
        schoolId: string, studentId: string,
        subjectId: string) {

    let updateInfo = {
      chapter: chapterId,
      lesson: lessonId,
      kind: 'AssignHomeWork',
      schoolId: schoolId,
      studentId: studentId,
      subjectId: subjectId
    };

    Queue.getInstance().push(updateInfo);

  }
}
