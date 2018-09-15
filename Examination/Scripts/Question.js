/// <reference path="ExamEngine.ts" />
class Question {
    score(correct, onEnded) {
        if (correct) {
            examEngine.playCorrect(function () {
                examEngine.nextQuestion();
            }.bind(this));
        }
        else {
            examEngine.playIncorrect(onEnded);
        }
    }
}
//# sourceMappingURL=Question.js.map