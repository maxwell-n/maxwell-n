/// <reference path="ExamEngine.ts" />
var Question = (function () {
    function Question() {
    }
    Question.prototype.score = function (correct, onEnded) {
        if (correct) {
            examEngine.playCorrect(function () {
                examEngine.nextQuestion();
            });
        }
        else {
            examEngine.playIncorrect(onEnded);
        }
    };
    return Question;
})();
//# sourceMappingURL=Question.js.map