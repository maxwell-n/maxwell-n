/// <reference path="ExamEngine.ts" />
/// <reference path="Question.ts" />

class DrillAndKillEngine extends Question {
    private _data:IQuestion = null;
    private _contentDocument;

    constructor(contentDocument) {
        super();
        this._data = examEngine.loadQuestion();
        this._contentDocument = contentDocument;
        let pQuestion = this._contentDocument.getElementById('pQuestion');
        pQuestion.innerHTML = this._data.dataItem["question"];
        this.createButtons();
        let sQuestion = <HTMLImageElement>this._contentDocument.getElementById('sQuestion');
        sQuestion.innerHTML = examEngine.exam["questions"][examEngine.exam.currentQuestion]["answer"]["question"];
    }

    public checkAnswer(value) {
        this.enableControls(false);
        this.score(value === this._data.answer["answer"], function () {
            this.enableControls(true);
        }.bind(this));
    }

    public createButtons() {
        let sAnswers:HTMLElement = this._contentDocument.getElementById('sAnswers');
        let items = [];
        let item;
        let list = [];

        for (let i = 0; i < this._data.dataItem["items"].length; i++) {
            let answer = this._data.dataItem["items"][i]["answer"];
            if (list.indexOf(answer) === -1) {
                let idx = randomizeUtil.randomNumber(list.length + 1);
                list.splice(idx, 0, answer);
            }
        }
        while (list.length > 5) {
            let idx = randomizeUtil.randomNumber(list.length);
            if (list[idx] !== examEngine.exam["questions"][examEngine.exam.currentQuestion]["answer"]["answer"])
                list.splice(idx, 1);
        }

        for (let i = 0; i < list.length; i++) {
            item = list[i];
            if (items.indexOf(item) === -1) {
                items.push(item);
                let radioButton:HTMLInputElement = this._contentDocument.createElement('input');
                radioButton.setAttribute('type', 'radio');
                radioButton.setAttribute('name', 'answer');
                radioButton.id = item;
                radioButton.onclick = this.checkAnswer.bind(this, item);
                sAnswers.appendChild(radioButton);
                let label:HTMLLabelElement = this._contentDocument.createElement('label');
                label.innerText = item;
                label.htmlFor = item;
                sAnswers.appendChild(label);
                sAnswers.appendChild(this._contentDocument.createElement('br'));
            }
        }
    }

    public enableControls(enable) {
        let elements:NodeList = this._contentDocument.getElementsByTagName('input');
        for (let i = 0; i < elements.length; i++)
            (<HTMLInputElement>elements[i]).disabled = !enable;
    }
}