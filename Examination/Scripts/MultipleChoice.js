/// <reference path="ExamEngine.ts" />
/// <reference path="Question.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MultipleChoiceEngine = (function (_super) {
    __extends(MultipleChoiceEngine, _super);
    function MultipleChoiceEngine(contentDocument) {
        _super.call(this);
        this._data = null;
        this._data = examEngine.loadQuestion();
        this._contentDocument = contentDocument;
        var pQuestion = this._contentDocument.getElementById('pQuestion');
        pQuestion.innerHTML = this._data.dataItem["question"];
        this.createButtons();
        var iImage = this._contentDocument.getElementById('iImage');
        iImage.src = examEngine.exam["path"] + 'Images/' + this._data.answer["image"];
    }
    MultipleChoiceEngine.prototype.checkAnswer = function (value) {
        this.enableControls(false);
        var onEnded = function () {
            this.enableControls(true);
        };
        this.score(value === this._data.answer["name"], onEnded.bind(this));
    };
    MultipleChoiceEngine.prototype.createButtons = function () {
        var sAnswers = this._contentDocument.getElementById('sAnswers');
        var items = [];
        var item;
        for (var i = 0; i < this._data.dataItem["items"].length; i++) {
            item = this._data.dataItem["items"][i]["name"];
            if (items.indexOf(item) === -1) {
                items.push(item);
                var radioButton = this._contentDocument.createElement('input');
                radioButton.setAttribute('type', 'radio');
                radioButton.setAttribute('name', 'answer');
                radioButton.id = item;
                radioButton.onclick = this.checkAnswer.bind(this, item);
                sAnswers.appendChild(radioButton);
                var label = this._contentDocument.createElement('label');
                label.innerText = item;
                label.htmlFor = item;
                sAnswers.appendChild(label);
                sAnswers.appendChild(this._contentDocument.createElement('br'));
            }
        }
    };
    MultipleChoiceEngine.prototype.enableControls = function (enable) {
        var elements = this._contentDocument.getElementsByTagName('input');
        for (var i = 0; i < elements.length; i++)
            elements[i].disabled = !enable;
    };
    return MultipleChoiceEngine;
})(Question);
//# sourceMappingURL=MultipleChoice.js.map