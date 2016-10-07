/// <reference path="ExamEngine.ts" />
/// <reference path="Question.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DrillAndKillEngine = (function (_super) {
    __extends(DrillAndKillEngine, _super);
    function DrillAndKillEngine(contentDocument) {
        _super.call(this);
        this._data = null;
        this._data = examEngine.loadQuestion();
        this._contentDocument = contentDocument;
        var pQuestion = this._contentDocument.getElementById('pQuestion');
        pQuestion.innerHTML = this._data.dataItem["question"];
        this.createButtons();
        var sQuestion = this._contentDocument.getElementById('sQuestion');
        sQuestion.innerHTML = examEngine.exam["questions"][examEngine.exam.currentQuestion]["answer"]["question"];
    }
    DrillAndKillEngine.prototype.checkAnswer = function (value) {
        this.enableControls(false);
        var onEnded = function () {
            this.enableControls(true);
        };
        this.score(value === this._data.answer["answer"], onEnded.bind(this));
    };
    DrillAndKillEngine.prototype.createButtons = function () {
        var sAnswers = this._contentDocument.getElementById('sAnswers');
        var items = [];
        var item;
        function onClick(id) {
            this.checkAnswer(id);
        }
        ;
        var onClickLabel = function () {
            var radioButton = this._contentDocument.getElementById(this.tagName);
            radioButton.onclick(new MouseEvent);
        };
        var list = [];
        for (var i = 0; i < this._data.dataItem["items"].length; i++) {
            var answer = this._data.dataItem["items"][i]["answer"];
            if (list.indexOf(answer) === -1) {
                var idx = randomizeUtil.randomNumber(list.length + 1);
                list.splice(idx, 0, answer);
            }
        }
        while (list.length > 5) {
            var idx = randomizeUtil.randomNumber(list.length);
            if (list[idx] !== examEngine.exam["questions"][examEngine.exam.currentQuestion]["answer"]["answer"])
                list.splice(idx, 1);
        }
        for (var i = 0; i < list.length; i++) {
            item = list[i];
            if (items.indexOf(item) === -1) {
                items.push(item);
                var radioButton = this._contentDocument.createElement('input');
                radioButton.setAttribute('type', 'radio');
                radioButton.setAttribute('name', 'answer');
                radioButton.id = item;
                radioButton.onclick = onClick.bind(this, item);
                sAnswers.appendChild(radioButton);
                var label = this._contentDocument.createElement('label');
                label.innerText = item;
                label.htmlFor = item;
                sAnswers.appendChild(label);
                sAnswers.appendChild(this._contentDocument.createElement('br'));
            }
        }
    };
    DrillAndKillEngine.prototype.enableControls = function (enable) {
        var elements = this._contentDocument.getElementsByTagName('input');
        for (var i = 0; i < elements.length; i++)
            elements[i].disabled = !enable;
    };
    return DrillAndKillEngine;
})(Question);
//# sourceMappingURL=DrillAndKill.js.map