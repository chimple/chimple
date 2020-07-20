import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;

@ccclass
export class QuizCollect extends cc.Component {
    private _touched: boolean = false;
    private _text = null;
    private _correctAnswers= null;

    protected onLoad(): void {
    }

    protected start(): void {
    }

    get correctAnswers() {
        return this._correctAnswers;
    }

    set correctAnswers(answer: any) {
        this._correctAnswers = JSON.parse(JSON.stringify(answer));
    }

    get text() {
        return this._text;
    }

    set text(text) {
        this._text = text;
    }

    get touched() {
        return this._touched;
    }

    set touched(touched) {
        this._touched = touched;
    }

    isCorrect(): boolean {
        return this._correctAnswers.includes(this._text[0]);
    }

}
