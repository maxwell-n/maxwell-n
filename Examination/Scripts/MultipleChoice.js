/// <reference path="ExamEngine.ts" />
/// <reference path="Question.ts" />
class MultipleChoiceEngine extends Question {
    constructor(contentDocument) {
        super();
        this._btnNext = null;
        this._sExplanation = null;
        this.Data = examEngine.loadQuestion();
        this.ContentDocument = contentDocument;
        let pQuestion = this.ContentDocument.getElementById('pQuestion');
        pQuestion.innerHTML = this.Data.dataItem["question"];
        this.createButtons();
        this._btnNext = this.ContentDocument.getElementById('btnNext');
        this._btnNext.style.display = "none";
        this._sExplanation = this.ContentDocument.getElementById('sExplanation');
    }
    checkAnswer(value) {
        this.enableControls(false);
        let onEnded = function () {
        };
        let correct = value === this.Data.answer;
        if (this._sExplanation && !correct && this.Data.explanation)
            this._sExplanation.innerHTML = "ANSWER: " + this.Data.answer + "<BR/><BR/>" + this.Data.explanation;
        else
            this._sExplanation.innerHTML = "CORRECT!";
        this._btnNext.style.display = "block";
        this._btnNext.onclick = function () {
            examEngine.nextQuestion();
        };
        this.score(correct, onEnded.bind(this));
    }
    score(correct, onEnded) {
        if (correct) {
            examEngine.exam.correctCount += 1;
            examEngine.updateScore();
            examEngine.playCorrect(null);
        }
        else {
            examEngine.exam.errorCount += 1;
            examEngine.updateScore();
        }
    }
    createButtons() {
        let sAnswers = this.ContentDocument.getElementById('sAnswers');
        let items = [];
        let item;
        let list = [];
        if (this.Data.answer)
            for (let i = 0; i < this.Data.dataItem["items"].length; i++) {
                let item = this.Data.dataItem["items"][i];
                if (list.indexOf(item) === -1) {
                    let idx = randomizeUtil.randomNumber(list.length + 1);
                    list.splice(idx, 0, item);
                }
                //list.push(item);
            }
        for (let i = 0; i < list.length; i++) {
            item = list[i];
            if (items.indexOf(item) === -1) {
                items.push(item);
                let radioButton = this.ContentDocument.createElement('input');
                radioButton.setAttribute('type', 'radio');
                radioButton.setAttribute('item', 'answer');
                radioButton.id = item;
                radioButton.onclick = this.checkAnswer.bind(this, item);
                sAnswers.appendChild(radioButton);
                let label = this.ContentDocument.createElement('label');
                label.innerText = item;
                label.htmlFor = item;
                sAnswers.appendChild(label);
                sAnswers.appendChild(this.ContentDocument.createElement('br'));
            }
        }
    }
    enableControls(enable) {
        let elements = this.ContentDocument.getElementsByTagName('input');
        for (let i = 0; i < elements.length; i++)
            elements[i].disabled = !enable;
    }
}
//# sourceMappingURL=MultipleChoice.js.map