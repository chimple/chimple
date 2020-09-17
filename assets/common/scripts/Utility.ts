import Config from "./lib/config";
import { Util } from "./util";


export enum LetterType {
    Consonant,
    Vowel
}

const vowelList = ['a', 'e', 'i', 'o', 'u'];
const consonantList = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm',
    'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];

const hindiVowelList = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः', 'अँ']
const hindiConsonantList = ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह']

const langMap = {
    'en/': [vowelList, consonantList],
    'hi/': [hindiVowelList, hindiConsonantList]
}

export class AlphabetUtil {

    static isConsonantOrVowel(character: string): LetterType {

        let letterType;
        AlphabetUtil.contains(langMap[Config.i.course.lang +'/'][0], character) ? letterType = LetterType.Vowel : letterType = LetterType.Consonant;
        return letterType;
    }

    static getRandomVowel(): string {
        return langMap[Config.i.course.lang +'/'][0][Math.floor(Math.random() * langMap[Config.i.course.lang +'/'][0].length)].toUpperCase();
    }

    static getRandomConsonant(): string {
        return langMap[Config.i.course.lang +'/'][1][Math.floor(Math.random() * langMap[Config.i.course.lang +'/'][1].length)].toUpperCase();
    }

    static getRandomConsonantArray(lang: string): Array<string> {
        return langMap[lang][1];
    }

    static contains(array: Array<string>, element: string): boolean {
        return array.indexOf(element) > -1;
    }

    static getRandomVowelArray(size: number): Array<string> {
        if (size > 5) throw new Error("Size should be less than or equal to 21");

        let randomVowelArray = new Array(size);

        for (let i = 0; i < size; i++) {
            let randomVowel = this.getRandomVowel();
            if (!AlphabetUtil.contains(randomVowelArray, randomVowel)) {
                randomVowelArray[i] = (randomVowel);
            } else {
                i--;
            }
        }

        randomVowelArray.forEach((randomVowel) => {
            console.log("Random Vowels Generated " + randomVowel);
        })

        return randomVowelArray;
    }

    static playLetterSound(letterOrWord: string, isWord: boolean) {
        if (isWord) {
            Util.load(Config.dir + "sound/wordvoice/" + letterOrWord + ".mp3", function (err, clip) {
                cc.log("Audio Error: " + err);
                var audioID = cc.audioEngine.play(clip, false, 1)
            }, true
            )
        } else {
            Util.load(Config.dir + "sound/lettervoice/" + letterOrWord + ".mp3", function (err, clip) {
                cc.log("Audio Error: " + err);
                var audioID = cc.audioEngine.play(clip, false, 1)
            }, true
            )
        }

    }

}