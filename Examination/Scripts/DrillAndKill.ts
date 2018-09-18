/// <reference path="ExamEngine.ts" />
/// <reference path="Question.ts" />

class DrillAndKillEngine extends Question {
    constructor(contentDocument) {
        super();
        this.Data = examEngine.loadQuestion();
        this.ContentDocument = contentDocument;
        let pQuestion = this.ContentDocument.getElementById('pQuestion');
        pQuestion.innerHTML = this.Data.dataItem["question"];
        this.createButtons();
        let sQuestion = <HTMLImageElement>this.ContentDocument.getElementById('sQuestion');
        sQuestion.innerHTML = examEngine.exam["questions"][examEngine.exam.currentQuestion]["answer"]["question"];
    }

    public checkAnswer(value) {
        this.enableControls(false);
        this.score(value === this.Data.answer["answer"], function () {
            this.enableControls(true);
        }.bind(this));
    }

    public createButtons() {
        let sAnswers:HTMLElement = this.ContentDocument.getElementById('sAnswers');
        let items = [];
        let item;
        let list = [];

        for (let i = 0; i < this.Data.dataItem["items"].length; i++) {
            let answer = this.Data.dataItem["items"][i]["answer"];
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
                let radioButton:HTMLInputElement = this.ContentDocument.createElement('input');
                radioButton.setAttribute('type', 'radio');
                radioButton.setAttribute('name', 'answer');
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