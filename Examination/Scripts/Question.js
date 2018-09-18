/// <reference path="ExamEngine.ts" />
class Question {
    constructor() {
        this._data = null;
    }
    score(correct, onEnded) {
        if (correct) {
            examEngine.playCorrect(function () {
                examEngine.nextQuestion();
            }.bind(this));
        }
        else {
            examEngine.playIncorrect(onEnded);
        }
    }
    get ContentDocument() {
        return this._contentDocument;
    }
    set ContentDocument(document) {
        this._contentDocument = document;
    }
    get Data() {
        return this._data;
    }
    set Data(data) {
        this._data = data;
    }
}
//# sourceMappingURL=Question.js.map