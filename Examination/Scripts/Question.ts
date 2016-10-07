/// <reference path="ExamEngine.ts" />

class Question {

    public score(correct:boolean, onEnded?) {
        if (correct) {
            examEngine.playCorrect(function () {
                examEngine.nextQuestion();
            });
        } else {
            examEngine.playIncorrect(onEnded);
        }
    }
}