/// <reference path="ExamEngine.ts" />
/// <reference path="Question.ts" />
class FillInTheBlankEngine extends Question {
    constructor(contentDocument) {
        super();
        this._data = null;
        this._data = examEngine.loadQuestion();
        this.ContentDocument = contentDocument;
        this._tbText = this.ContentDocument.getElementById('tbText');
        this._tbText.value = "";
        this._tbText.onkeypress = this.searchKeyPress.bind(this);
        this.playSound(null);
        let section = this.ContentDocument.getElementById('sPlay');
        section.onclick = this.playSound.bind(this);
        let btnCheckAnswer = this.ContentDocument.getElementById('btnCheckAnswer');
        btnCheckAnswer.onclick = this.checkAnswer.bind(this);
    }
    checkAnswer() {
        this.enableControls(false);
        let onEnded = function () {
            this.enableControls(true);
        };
        this.score(this._tbText.value.toLowerCase() === this._data.answer.toLocaleLowerCase(), onEnded.bind(this));
    }
    enableControls(enable) {
        let elements = this.ContentDocument.getElementsByClassName('button');
        for (let i = 0; i < elements.length; i++)
            elements[i].disabled = !enable;
        let sPlay = this.ContentDocument.getElementById('sPlay');
        sPlay.disabled = !enable;
    }
    playSound(onEnded) {
        this.enableControls(true);
        this._tbText.focus();
        audioUtil.playCached(examEngine.exam["path"] + examEngine.exam.name + "/" + this._data.answer + ".mp3", onEnded);
    }
    searchKeyPress(e) {
        // look for window.event in case event isn't passed in
        if (typeof e == 'undefined' && window.event) {
            e = window.event;
        }
        if (e.key === "Enter") {
            this.ContentDocument.getElementById('btnCheckAnswer').click();
        }
    }
}
//# sourceMappingURL=FillInTheBlank.js.map