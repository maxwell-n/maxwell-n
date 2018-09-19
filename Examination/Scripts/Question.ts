/// <reference path="ExamEngine.ts" />

class Question {
    private _contentDocument;
    private _data: IQuestion = null;

    public score(correct: boolean, onEnded?) {
        if (correct) {
            examEngine.exam.correctCount += 1;
            examEngine.updateScore();
            examEngine.playCorrect(function () {
                examEngine.nextQuestion();
            }.bind(this));
        } else {
            examEngine.exam.errorCount += 1;
            examEngine.updateScore();
            examEngine.playIncorrect(onEnded);
        }
    }

    get ContentDocument() {
        return this._contentDocument;
    }

    set ContentDocument(document){
        this._contentDocument = document;
    }

    get Data(): IQuestion {
        return this._data;
    }

    set Data(data: IQuestion){
        this._data = data;
    }

}