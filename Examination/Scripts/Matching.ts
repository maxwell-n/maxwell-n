/// <reference path="ExamEngine.ts" />
/// <reference path="Question.ts" />

class MatchingEngine extends Question {
    constructor(contentDocument) {
        super();
        this.Data = examEngine.loadQuestion();
        this.ContentDocument = contentDocument;
        let button:HTMLButtonElement;
        let img;
        let indexes = [];
        indexes.push(this.Data["answer"]);
        let add = true;
        let i = 0;
        let num = randomizeUtil.randomNumber(this.Data.dataItem["items"].length - 1);
        while (indexes.length < 4) {
            for (i = 0; i < indexes.length; i++) {
                if (indexes[i] === this.Data.dataItem["items"][num])
                    add = false;
            }
            if (add)
                indexes.push(this.Data.dataItem["items"][num]);
            num = randomizeUtil.randomNumber(this.Data.dataItem["items"].length);
            add = true;
        }
        i = 0;
        while (indexes.length > 0) {
            num = randomizeUtil.randomNumber(indexes.length);
            button = <HTMLButtonElement>this.ContentDocument.getElementById("btn" + i);
            button.name = indexes[num];
            button.onclick = this.checkAnswer.bind(this, indexes[num]);
            button.ondblclick = this.checkAnswer.bind(this, indexes[num]);
            button.oncontextmenu = function(e){
                e.preventDefault();
                return false;
            };
            button.ondragstart = function(e){e.preventDefault();};
            img = this.ContentDocument.getElementById("img" + i);
            img.src = examEngine.exam["path"] + 'Images/' + indexes[num] + '.jpg';
            indexes.splice(num, 1);
            i++;
        }
        let sPlay = this.ContentDocument.getElementById('sPlay');
        sPlay.onclick = this.playSound.bind(this);
        sPlay.ondblclick = this.playSound.bind(this);
        sPlay.oncontextmenu = function(e){
            e.preventDefault();
            return false;
        };
        sPlay.ondragstart = function(e){e.preventDefault();};
        audioUtil.play(examEngine.exam["path"] + "Sounds/" + this.Data.answer + ".mp3", null);
    }

    public checkAnswer(value) {
        this.enableControls(false);
        let onEnded = function () {
            this.enableControls(true);
        }
        this.score(value === this.Data.answer, onEnded.bind(this));
    }

    public playSound() {
        audioUtil.playCached(examEngine.exam["path"] + "Sounds/" + this.Data.answer + ".mp3", null);
    }

    public enableControls(enable) {
        let elements:NodeList = this.ContentDocument.getElementsByClassName('button');
        for (let i = 0; i < elements.length; i++)
            (<HTMLButtonElement>elements[i]).disabled = !enable;
        let sPlay = this.ContentDocument.getElementById('sPlay');
        sPlay.disabled = !enable;
    }
}