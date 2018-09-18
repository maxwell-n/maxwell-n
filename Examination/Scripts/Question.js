/// <reference path="ExamEngine.ts" />
class Question {
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
}
//# sourceMappingURL=Question.js.map