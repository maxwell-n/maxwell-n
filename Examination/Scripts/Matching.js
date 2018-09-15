/// <reference path="ExamEngine.ts" />
/// <reference path="Question.ts" />
class MatchingEngine extends Question {
    constructor(contentDocument) {
        super();
        this._data = null;
        this._data = examEngine.loadQuestion();
        this._contentDocument = contentDocument;
        var button;
        var img;
        var indexes = [];
        indexes.push(this._data["answer"]);
        var add = true;
        var i = 0;
        var num = randomizeUtil.randomNumber(this._data.dataItem["items"].length - 1);
        while (indexes.length < 4) {
            for (i = 0; i < indexes.length; i++) {
                if (indexes[i] === this._data.dataItem["items"][num])
                    add = false;
            }
            if (add)
                indexes.push(this._data.dataItem["items"][num]);
            num = randomizeUtil.randomNumber(this._data.dataItem["items"].length);
            add = true;
        }
        i = 0;
        while (indexes.length > 0) {
            num = randomizeUtil.randomNumber(indexes.length);
            button = this._contentDocument.getElementById("btn" + i);
            button.name = indexes[num];
            button.onclick = this.checkAnswer.bind(this, indexes[num]);
            button.ondblclick = this.checkAnswer.bind(this, indexes[num]);
            button.oncontextmenu = function (e) {
                e.preventDefault();
                return false;
            };
            button.ondragstart = function (e) { e.preventDefault(); };
            img = this._contentDocument.getElementById("img" + i);
            img.src = examEngine.exam["path"] + 'Images/' + indexes[num] + '.jpg';
            indexes.splice(num, 1);
            i++;
        }
        var sPlay = this._contentDocument.getElementById('sPlay');
        sPlay.onclick = this.playSound.bind(this);
        sPlay.ondblclick = this.playSound.bind(this);
        sPlay.oncontextmenu = function (e) {
            e.preventDefault();
            return false;
        };
        sPlay.ondragstart = function (e) { e.preventDefault(); };
        audioUtil.play(examEngine.exam["path"] + "Sounds/" + this._data.answer + ".mp3", null);
    }
    checkAnswer(value) {
        this.enableControls(false);
        var onEnded = function () {
            this.enableControls(true);
        };
        this.score(value === this._data.answer, onEnded.bind(this));
    }
    playSound() {
        audioUtil.playCached(examEngine.exam["path"] + "Sounds/" + this._data.answer + ".mp3", null);
    }
    enableControls(enable) {
        var elements = this._contentDocument.getElementsByClassName('button');
        for (var i = 0; i < elements.length; i++)
            elements[i].disabled = !enable;
        var sPlay = this._contentDocument.getElementById('sPlay');
        sPlay.disabled = !enable;
    }
}
//# sourceMappingURL=Matching.js.map