/// <reference path="ExamEngine.ts" />
/// <reference path="Question.ts" />
class MultipleChoiceEngine extends Question {
    constructor(contentDocument) {
        super();
        this._data = null;
        this._data = examEngine.loadQuestion();
        this._contentDocument = contentDocument;
        let pQuestion = this._contentDocument.getElementById('pQuestion');
        pQuestion.innerHTML = this._data.dataItem["question"];
        this.createButtons();
        // let sQuestion = this._contentDocument.getElementById('sQuestion');
        // sQuestion.innerHTML = examEngine.exam["questions"][examEngine.exam.currentQuestion]["answer"];
    }
    checkAnswer(value) {
        this.enableControls(false);
        let onEnded = function () {
            this.enableControls(true);
        };
        this.score(value === this._data.answer, onEnded.bind(this));
    }
    createButtons() {
        let sAnswers = this._contentDocument.getElementById('sAnswers');
        let items = [];
        let item;
        let list = [];
        if (this._data.answer)
            for (let i = 0; i < this._data.dataItem["items"].length; i++) {
                let item = this._data.dataItem["items"][i];
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
                let radioButton = this._contentDocument.createElement('input');
                radioButton.setAttribute('type', 'radio');
                radioButton.setAttribute('item', 'answer');
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
//# sourceMappingURL=MultipleChoice.js.map