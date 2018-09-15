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
        let section = this._contentDocument.getElementById('sPlay');
        section.onclick = this.playSound.bind(this);
        let btnCheckAnswer = <HTMLButtonElement>this._contentDocument.getElementById('btnCheckAnswer');
        btnCheckAnswer.onclick = this.checkAnswer.bind(this);

    }

    public checkAnswer() {
        this.enableControls(false);
        let onEnded = function () {
            this.enableControls(true);
        }
        this.score(this._tbText.value.toLowerCase() === this._data.answer.toLocaleLowerCase(), onEnded.bind(this));
    }

    public enableControls(enable) {
        let elements:NodeList = this._contentDocument.getElementsByClassName('button');
        for (let i = 0; i < elements.length; i++)
            (<HTMLButtonElement>elements[i]).disabled = !enable;
        let sPlay = this._contentDocument.getElementById('sPlay');
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
        if (e.key === "Enter") {
            this._contentDocument.getElementById('btnCheckAnswer').click();
        }
    }
}

