/// <reference path="ExamEngine.ts" />
/// <reference path="Question.ts" />

class DrillAndKillEngine extends Question {
    private _data:IQuestion = null;
    private _contentDocument;

    constructor(contentDocument) {
        super();
        this._data = examEngine.loadQuestion();
        this._contentDocument = contentDocument;
        var pQuestion = this._contentDocument.getElementById('pQuestion');
        pQuestion.innerHTML = this._data.dataItem["question"];
        this.createButtons();
        var sQuestion = <HTMLImageElement>this._contentDocument.getElementById('sQuestion');
        sQuestion.innerHTML = examEngine.exam["questions"][examEngine.exam.currentQuestion]["answer"]["question"];
    }

    public checkAnswer(value) {
        this.enableControls(false);
        var onEnded = function () {
            this.enableControls(true);
        }
        this.score(value === this._data.answer["answer"], onEnded.bind(this));
    }

    public createButtons() {
        var sAnswers:HTMLElement = this._contentDocument.getElementById('sAnswers');
        var items = [];
        var item;

        function onClick(id) {
            this.checkAnswer(id);
        };
        var onClickLabel:(ev:MouseEvent) => any = function () {
            var radioButton:HTMLInputElement = <HTMLInputElement>this._contentDocument.getElementById(this.tagName);
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
                var radioButton:HTMLInputElement = this._contentDocument.createElement('input');
                radioButton.setAttribute('type', 'radio');
                radioButton.setAttribute('name', 'answer');
                radioButton.id = item;
                radioButton.onclick = onClick.bind(this, item);
                sAnswers.appendChild(radioButton);
                var label:HTMLLabelElement = this._contentDocument.createElement('label');
                label.innerText = item;
                label.htmlFor = item;
                sAnswers.appendChild(label);
                sAnswers.appendChild(this._contentDocument.createElement('br'));
            }
        }
    }

    public enableControls(enable) {
        var elements:NodeList = this._contentDocument.getElementsByTagName('input');
        for (var i = 0; i < elements.length; i++)
            (<HTMLElement>elements[i]).disabled = !enable;
    }
}