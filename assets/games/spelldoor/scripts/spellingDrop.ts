import {LetterType} from "../../../common/scripts/Utility";

export class SpellingDrop {
    index: number;
    isVowelOrConsonant: LetterType;
    letter: string;
    boundary: cc.Rect;
    position: cc.Vec2;

    constructor(index: number, letter: string, letterType: LetterType) {
        this.letter = letter;
        this.index = index;
        this.isVowelOrConsonant = letterType;
    }

    setIndex(index: number) {
        this.index = index;
    }

    setLetter(letter: string) {
        this.letter = letter;
    }

    setBoundary(boundary: cc.Rect) {
        this.boundary = boundary;
    }

    setPosition(position: cc.Vec2) {
        this.position = position;
    }
}
