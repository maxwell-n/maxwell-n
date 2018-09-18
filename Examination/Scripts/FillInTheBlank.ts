/// <reference path="ExamEngine.ts" />
/// <reference path="Question.ts" />

class FillInTheBlankEngine extends Question {
    private _tbText:HTMLInputElement;

    constructor(contentDocument) {
        super();
        this.Data = examEngine.loadQuestion();
        this.ContentDocument = contentDocument;
        this._tbText = <HTMLInputElement>this.ContentDocument.getElementById('tbText');
        this._tbText.value = "";
        this._tbText.onkeypress = this.searchKeyPress.bind(this);
        this.playSound(null);
        let section = this.ContentDocument.getElementById('sPlay');
        section.onclick = this.playSound.bind(this);
        let btnCheckAnswer = <HTMLButtonElement>this.ContentDocument.getElementById('btnCheckAnswer');
        btnCheckAnswer.onclick = this.checkAnswer.bind(this);

    }

    public checkAnswer() {
        this.enableControls(false);
        let onEnded = function () {
            this.enableControls(true);
        }
        this.score(this._tbText.value.toLowerCase() === this.Data.answer.toLocaleLowerCase(), onEnded.bind(this));
    }

    public enableControls(enable) {
        let elements:NodeList = this.ContentDocument.getElementsByClassName('button');
        for (let i = 0; i < elements.length; i++)
            (<HTMLButtonElement>elements[i]).disabled = !enable;
        let sPlay = this.ContentDocument.getElementById('sPlay');
        sPlay.disabled = !enable;
    }

    public playSound(onEnded) {
        this.enableControls(true);
        this._tbText.focus();
        audioUtil.playCached(examEngine.exam["path"] + examEngine.exam.name + "/" + this.Data.answer + ".mp3", onEnded);
    }

    public searchKeyPress(e) {
        // look for window.event in case event isn't passed in
        if (typeof e == 'undefined' && window.event) {
            e = window.event;
        }
        if (e.key === "Enter") {
            this.ContentDocument.getElementById('btnCheckAnswer').click();
        }
    }
}

