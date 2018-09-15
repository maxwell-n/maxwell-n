/// <reference path="ExamEngine.ts" />
/// <reference path="Question.ts" />

class MultipleChoiceEngine extends Question {
    private _data:IQuestion = null;
    private _contentDocument;

    constructor(contentDocument) {
        super();
        this._data = examEngine.loadQuestion();
        this._contentDocument = contentDocument;
        let pQuestion = this._contentDocument.getElementById('pQuestion');
        pQuestion.innerHTML = this._data.dataItem["question"];
        this.createButtons();
        let iImage:HTMLImageElement = <HTMLImageElement>this._contentDocument.getElementById('iImage');
        iImage.src = examEngine.exam["path"] + 'Images/' + this._data.answer["image"];
    }

    public checkAnswer(value) {
        this.enableControls(false);
        let onEnded = function () {
            this.enableControls(true);
        }
        this.score(value === this._data.answer["name"], onEnded.bind(this));
    }

    public createButtons() {
        let sAnswers:HTMLElement = this._contentDocument.getElementById('sAnswers');
        let items = [];
        let item;
        for (let i = 0; i < this._data.dataItem["items"].length; i++) {
            item = this._data.dataItem["items"][i]["name"];
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