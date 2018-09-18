/// <reference path="ExamEngine.ts" />
/// <reference path="Question.ts" />

class MultipleChoiceImageEngine extends Question {
    constructor(contentDocument) {
        super();
        this.Data = examEngine.loadQuestion();
        this.ContentDocument = contentDocument;
        let pQuestion = this.ContentDocument.getElementById('pQuestion');
        pQuestion.innerHTML = this.Data.dataItem["question"];
        this.createButtons();
        let iImage:HTMLImageElement = <HTMLImageElement>this.ContentDocument.getElementById('iImage');
        iImage.src = examEngine.exam["path"] + 'Images/' + this.Data.answer["image"];
    }

    public checkAnswer(value) {
        this.enableControls(false);
        let onEnded = function () {
            this.enableControls(true);
        };
        this.score(value === this.Data.answer["name"], onEnded.bind(this));
    }

    public createButtons() {
        let sAnswers:HTMLElement = this.ContentDocument.getElementById('sAnswers');
        let items = [];
        let item;
        for (let i = 0; i < this.Data.dataItem["items"].length; i++) {
            item = this.Data.dataItem["items"][i]["name"];
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