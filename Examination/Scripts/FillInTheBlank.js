/// <reference path="ExamEngine.ts" />
/// <reference path="Question.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var FillInTheBlankEngine = (function (_super) {
    __extends(FillInTheBlankEngine, _super);
    function FillInTheBlankEngine(contentDocument) {
        _super.call(this);
        this._data = null;
        this._data = examEngine.loadQuestion();
        this._contentDocument = contentDocument;
        this._tbText = this._contentDocument.getElementById('tbText');
        this._tbText.value = "";
        this._tbText.onkeypress = this.searchKeyPress.bind(this);
        this.playSound(null);
        var section = this._contentDocument.getElementById('sPlay');
        section.onclick = this.playSound.bind(this);
        var btnCheckAnswer = this._contentDocument.getElementById('btnCheckAnswer');
        btnCheckAnswer.onclick = this.checkAnswer.bind(this);
    }
    FillInTheBlankEngine.prototype.checkAnswer = function () {
        this.enableControls(false);
        var onEnded = function () {
            this.enableControls(true);
        };
        this.score(this._tbText.value.toLowerCase() === this._data.answer.toLocaleLowerCase(), onEnded.bind(this));
    };
    FillInTheBlankEngine.prototype.enableControls = function (enable) {
        var elements = this._contentDocument.getElementsByClassName('button');
        for (var i = 0; i < elements.length; i++)
            elements[i].disabled = !enable;
        var sPlay = this._contentDocument.getElementById('sPlay');
        sPlay.disabled = !enable;
    };
    FillInTheBlankEngine.prototype.playSound = function (onEnded) {
        this.enableControls(true);
        this._tbText.focus();
        audioUtil.playCached(examEngine.exam["path"] + examEngine.exam.name + "/" + this._data.answer + ".mp3", onEnded);
    };
    FillInTheBlankEngine.prototype.searchKeyPress = function (e) {
        // look for window.event in case event isn't passed in
        if (typeof e == 'undefined' && window.event) {
            e = window.event;
        }
        if (e.keyCode == 13) {
            this._contentDocument.getElementById('btnCheckAnswer').click();
        }
    };
    return FillInTheBlankEngine;
})(Question);
//# sourceMappingURL=FillInTheBlank.js.map