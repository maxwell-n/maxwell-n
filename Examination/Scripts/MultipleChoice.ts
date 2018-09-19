/// <reference path="ExamEngine.ts" />
/// <reference path="Question.ts" />

class MultipleChoiceEngine extends Question {
    private readonly _btnNext: HTMLButtonElement = null;
    private readonly _sExplanation: HTMLElement = null;

    constructor(contentDocument) {
        super();
        this.Data = examEngine.loadQuestion();
        this.ContentDocument = contentDocument;
        let pQuestion = this.ContentDocument.getElementById('pQuestion');
        pQuestion.innerHTML = this.Data.dataItem["question"];
        this.createButtons();
        this._btnNext = <HTMLButtonElement>this.ContentDocument.getElementById('btnNext');
        this._btnNext.style.display = "none";
        this._sExplanation = <HTMLElement>this.ContentDocument.getElementById('sExplanation');
    }

    public checkAnswer(value) {
        this.enableControls(false);
        let onEnded = function () {
        };
        let correct: boolean = value === this.Data.answer;
        if (this._sExplanation && !correct && this.Data.explanation)
            this._sExplanation.innerHTML = "ANSWER: " + this.Data.answer + "<BR/><BR/>" + this.Data.explanation;
        else
            this._sExplanation.innerHTML = "CORRECT!";
        this._btnNext.style.display = "block";
        this._btnNext.onclick = function () {
            examEngine.nextQuestion();
        }
        this.score(correct, onEnded.bind(this));
    }

    public score(correct: boolean, onEnded?) {
        if (correct) {
            examEngine.exam.correctCount += 1;
            examEngine.updateScore();
            examEngine.playCorrect(null);
        } else {
            examEngine.exam.errorCount += 1;
            examEngine.updateScore();
        }
    }

    public createButtons() {
        let sAnswers:HTMLElement = this.ContentDocument.getElementById('sAnswers');
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
                let radioButton:HTMLInputElement = this.ContentDocument.createElement('input');
                radioButton.setAttribute('type', 'radio');
                radioButton.setAttribute('item', 'answer');
                radioButton.id = item;
                radioButton.onclick = this.checkAnswer.bind(this, item);
                sAnswers.appendChild(radioButton);
                let label:HTMLLabelElement = this.ContentDocument.createElement('label');
                label.innerText = item;
                label.htmlFor = item;
                sAnswers.appendChild(label);
                sAnswers.appendChild(this.ContentDocument.createElement('br'));
            }
        }
    }

    public enableControls(enable) {
        let elements:NodeList = this.ContentDocument.getElementsByTagName('input');
        for (let i = 0; i < elements.length; i++)
            (<HTMLInputElement>elements[i]).disabled = !enable;
    }
}