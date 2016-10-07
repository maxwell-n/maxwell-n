/// <reference path="ExamEngine.ts" />
/// <reference path="Question.ts" />

class FillInTheBlankEngine extends Question {
    private _data:IQuestion = null;
    private _tbText:HTMLInputElement;
    private _contentDocument;

    constructor(contentDocument) {
        super();
        this._data = examEngine.loadQuestion();
        this._contentDocument = contentDocument;
        this._tbText = <HTMLInputElement>this._contentDocument.getElementById('tbText');
        this._tbText.value = "";
        this._tbText.onkeypress = this.searchKeyPress.bind(this);
        this.playSound(null);
        var section = this._contentDocument.getElementById('sPlay');
        section.onclick = this.playSound.bind(this);
        var btnCheckAnswer = <HTMLButtonElement>this._contentDocument.getElementById('btnCheckAnswer');
        btnCheckAnswer.onclick = this.checkAnswer.bind(this);

    }

    public checkAnswer() {
        this.enableControls(false);
        var onEnded = function () {
            this.enableControls(true);
        }
        this.score(this._tbText.value.toLowerCase() === this._data.answer.toLocaleLowerCase(), onEnded.bind(this));
    }

    public enableControls(enable) {
        var elements:NodeList = this._contentDocument.getElementsByClassName('button');
        for (var i = 0; i < elements.length; i++)
            (<HTMLElement>elements[i]).disabled = !enable;
        var sPlay = this._contentDocument.getElementById('sPlay');
        sPlay.disabled = !enable;
    }

    public playSound(onEnded) {
        this.enableControls(true);
        this._tbText.focus();
        audioUtil.playCached(examEngine.exam["path"] + examEngine.exam.name + "/" + this._data.answer + ".mp3", onEnded);
    }

    public searchKeyPress(e) {
        // look for window.event in case event isn't passed in
        if (typeof e == 'undefined' && window.event) {
            e = window.event;
        }
        if (e.keyCode == 13) {
            this._contentDocument.getElementById('btnCheckAnswer').click();
        }
    }
}

