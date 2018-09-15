/// <reference path="ExamEngine.ts" />
/// <reference path="Question.ts" />
class MultipleChoiceImageEngine extends Question {
    constructor(contentDocument) {
        super();
        this._data = null;
        this._data = examEngine.loadQuestion();
        this._contentDocument = contentDocument;
        let pQuestion = this._contentDocument.getElementById('pQuestion');
        pQuestion.innerHTML = this._data.dataItem["question"];
        this.createButtons();
        let iImage = this._contentDocument.getElementById('iImage');
        iImage.src = examEngine.exam["path"] + 'Images/' + this._data.answer["image"];
    }
    checkAnswer(value) {
        this.enableControls(false);
        let onEnded = function () {
            this.enableControls(true);
        };
        this.score(value === this._data.answer["name"], onEnded.bind(this));
    }
    createButtons() {
        let sAnswers = this._contentDocument.getElementById('sAnswers');
        let items = [];
        let item;
        for (let i = 0; i < this._data.dataItem["items"].length; i++) {
            item = this._data.dataItem["items"][i]["name"];
            if (items.indexOf(item) === -1) {
                items.push(item);
                let radioButton = this._contentDocument.createElement('input');
                radioButton.setAttribute('type', 'radio');
                radioButton.setAttribute('name', 'answer');
                radioButton.id = item;
                radioButton.onclick = this.checkAnswer.bind(this, item);
                sAnswers.appendChild(radioButton);
                let label = this._contentDocument.createElement('label');
                label.innerText = item;
                label.htmlFor = item;
                sAnswers.appendChild(label);
                sAnswers.appendChild(this._contentDocument.createElement('br'));
            }
        }
    }
    enableControls(enable) {
        let elements = this._contentDocument.getElementsByTagName('input');
        for (let i = 0; i < elements.length; i++)
            elements[i].disabled = !enable;
    }
}
//# sourceMappingURL=MultipleChoiceImage.js.map