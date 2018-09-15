/// <reference path="../../JavaScript/utils.ts" />
/// <reference path="DrillAndKill.ts" />
/// <reference path="FillInTheBlank.ts" />
/// <reference path="Matching.ts" />
/// <reference path="MultipleChoice.ts" />
/// <reference path="MultipleChoiceImage.ts" />

interface IExam {
    correctCount: number;
    currentQuestion: number;
    errorCount: number;
    name: string;
    questions: Object[];
    title: string;
}

interface IQuestion {
    currentQuestion: number;
    answer;
    dataItem;
}

class ExamEngine {
    public exam:IExam;
    private _iframe;

    private _correctMP3 = [
        "Babys Giggle.mp3",
        "Cash Register.mp3",
        "Congratulations.mp3",
        "Electro Vox.mp3",
        "Gospel Hit.mp3",
        "Jive Turkey.mp3",
        "Thank You.mp3",
        "Thats Good.mp3",
        "Yeah Vocal.mp3",
        "Yeehaw Cowboy.mp3"
    ];

    private _incorrectMP3 = [
        "Error.mp3"
    ];

    constructor() {
        window.ondragstart = this.dragEvent;
        window.ondragenter = this.dragEvent;
        window.ondragover = this.dragEvent;
        window.ondragover = this.dragEvent;
    }

    private dragEvent = (ev:MouseEvent) => {
        ev.preventDefault();
    };

    public loadExam() {
        window.onbeforeunload = function () {
            let doc = this._iframe.contentDocument;
            switch (fileUtil.getFileNameWithoutExtension(doc.URL)) {
                case "ExamFinish":
                case "ExamIntro":
                    break;
                default:
                    return "You work will be lost.";
            }
        }.bind(this);
        this._iframe = document.getElementById("iframe");
        this._iframe.onload = this.loadIFrame.bind(this);
        let urlParam:string = urlUtil.getURLParam("Exam");
        this.exam = fileUtil.load(urlParam);
        this.exam.name = fileUtil.getFileNameWithoutExtension(urlParam);
        this.exam.questions = [];
        this.exam.currentQuestion = -1;
        this.exam.correctCount = 0;
        this.exam.errorCount = 0;
        for (let i = 0; i < this.exam["data"].length; i++)
            this.createQuestion(i);
        //localStorage.setItem("exam", JSON.stringify(this.exam));
        this._iframe.src = "ExamIntro.html";
    }

    private loadIFrame() {
        let doc = this._iframe.contentDocument;
        switch (fileUtil.getFileNameWithoutExtension(doc.URL)) {
            case "DrillAndKill":
                new DrillAndKillEngine(doc);
                break;
            case "ExamFinish":
                doc.getElementById('h1Title').innerHTML = this.exam.title;
                doc.getElementById('pCorrect').innerHTML = "You got " + this.exam.correctCount.toString() + " question" + (this.exam.correctCount === 1 ? "" : "s") + " correct.";
                doc.getElementById('pIncorrect').innerHTML = "You got " + this.exam.errorCount.toString() + " question" + (this.exam.errorCount === 1 ? "" : "s") + " incorrect.";
                doc.getElementById('bHome').hidden = true;
                break;
            case "ExamIntro":
                let pTitle = doc.getElementById("h1Title");
                pTitle.innerHTML = this.exam["title"];
                let pQuestions = doc.getElementById("pQuestions");
                pQuestions.innerHTML = "There are  " + this.exam.questions.length + " questions.";
                break;
            case "FillInTheBlank":
                new FillInTheBlankEngine(doc);
                break;
            case "Matching":
                new MatchingEngine(doc);
                break;
            case "MultipleChoice":
                new MultipleChoiceEngine(doc);
                break;
            case "MultipleChoiceImage":
                new MultipleChoiceImageEngine(doc);
                break;
        }
    }

    public createQuestion(index) {
        let obj;
        let idx;
        for (let i = 0; i < this.exam["data"][index]["items"].length; i++) {
            obj = {
                answer: this.exam["data"][index]["items"][i],
                item: i,
                dataIndex: index,
                questionType: this.exam["data"][index]["questionType"]
            };
            idx = randomizeUtil.randomNumber(this.exam.questions.length + 1);
            this.exam.questions.splice(idx, 0, obj);
        }
    }

    public loadQuestion() {
        let answer = this.exam.questions[this.exam.currentQuestion];
        let data:IQuestion = {
            currentQuestion: this.exam.currentQuestion,
            answer: answer["answer"],
            dataItem: this.exam["data"][answer["dataIndex"]]
        };
        this.updateScore();
        return data;
    }

    public nextQuestion() {
        this.exam.currentQuestion = this.exam.currentQuestion + 1;
        if (this.exam.currentQuestion < this.exam.questions.length) {

            let answer = this.exam.questions[this.exam.currentQuestion];
            switch (answer["questionType"]) {
                case "Drill and Kill":
                    this._iframe.contentDocument.location.replace("DrillAndKill.html");
                    break;
                case "Fill in the Blank":
                    this._iframe.contentDocument.location.replace("FillInTheBlank.html");
                    break;
                case "Matching":
                    this._iframe.contentDocument.location.replace("Matching.html");
                    break;
                case "Multiple Choice Image":
                    this._iframe.contentDocument.location.replace("MultipleChoiceImage.html");
                    break;
                case "Multiple Choice":
                    this._iframe.contentDocument.location.replace("MultipleChoice.html");
                    break;
            }
        } else {
            this._iframe.contentDocument.location.replace("ExamFinish.html");
        }
    }

    public playCorrect(onEnded) {
        this.exam.correctCount += 1;
        this.updateScore();
        let i = randomizeUtil.randomNumber(this._correctMP3.length);
        audioUtil.playCached("Scripts/Sounds/Correct/" + this._correctMP3[i], onEnded);
    }

    public playIncorrect(onEnded) {
        this.exam.errorCount += 1;
        this.updateScore();
        let i = randomizeUtil.randomNumber(this._incorrectMP3.length);
        audioUtil.playCached("Scripts/Sounds/Incorrect/" + this._incorrectMP3[i], onEnded);
    }

    public updateScore() {
        let dCorrect = this._iframe.contentDocument.getElementById('dCorrect');
        if (dCorrect !== null)
            dCorrect.innerHTML = this.exam.correctCount.toString();
        let dError = this._iframe.contentDocument.getElementById("dError");
        if (dError !== null)
            dError.innerHTML = this.exam.errorCount.toString();
    }
}

var examEngine = new ExamEngine();