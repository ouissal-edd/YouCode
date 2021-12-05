class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}





let questionsAdministration = [
    new Question("aaa", ["86", "68", "59", "94"], "94"),
    new Question("bbb", ["Four", "Farine", "Pain", "Levure"], "Pain"),
    new Question("cc", ["17h00", "20h10", "19h30", "18h00"], "18h00"),


];

console.log(questionsAdministration);

class Quizadministration {
    constructor(questionsAdministration) {
        this.score = 0;
        this.questionsAdministration = questionsAdministration;
        this.currentQuestionIndex = 0;
    }
    getCurrentQuestion() {
        return this.questionsAdministration[this.currentQuestionIndex];
    }
    guess(answer) {
        if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.currentQuestionIndex++;
    }
    hasEnded() {
        return this.currentQuestionIndex >= this.questionsAdministration.length;
    }

}

let qmotivation = "What is your motivation to enter in this shcool?";
const none = {
    elementnone: function (id) {
        let element = document.getElementById(id);
        element.style.display = "none";
    },

    testone: function () {
        this.elementnone("quiztwo");
    },

};
const block = {
    elementnone: function (id) {
        let element = document.getElementById(id);
        element.style.display = "block";
    },

    testtwo: function () {
        this.elementnone("motivation");
    },

};
// Regroup all  functions relative to the App Display
const displayTwo = {
    elementShown: function (id, text) {
        let element = document.getElementById(id);
        element.innerHTML = text;
    },
    endQuiz: function () {
        endQuizHTML = `
        <h1>Quiz terminé !</h1>
        <h3> Votre score est de : ${quizadministration.score} / ${quizadministration.questionsAdministration.length}</h3>`;
        this.elementShown("quiztwo", endQuizHTML);
    },
    question: function () {
        this.elementShown("questiontwo", quizadministration.getCurrentQuestion().text);
    },
    choices: function () {
        let choices = quizadministration.getCurrentQuestion().choices;

        guessHandler = (id, guess) => {
            document.getElementById(id).onclick = function () {
                quizadministration.guess(guess);
                quizApp();
            }
        }
        // display choices and handle guess
        for (let i = 0; i < choices.length; i++) {
            this.elementShown("choic" + i, choices[i]);
            guessHandler("gues" + i, choices[i]);
        }
    },
    progress: function () {
        let currentQuestionNumber = quizadministration.currentQuestionIndex + 1;
        this.elementShown("progres", "Question " + currentQuestionNumber + " sur " + quizadministration.questionsAdministration.length);
    },

    // test two
    questionMotivation: function () {
        this.elementShown("questionMotivation", qmotivation);

    },



};


const saveData = document.getElementById("msub");
saveData.addEventListener("click", e => {
    e.preventDefault();
    let rep = document.getElementById("answerMotivation");
    let data = [];
    let FirstTest = localStorage.getItem('StoredData');
    var FirstTest1 = JSON.parse(FirstTest);

    FirstTest1.forEach(element => {
        data.push({
            Name: element.Name,
            CIN: element.CIN,
            onlineTest: element.resulFisrtTest,
            Motivation: rep.value,
            resultAdministration: quizadministration.score,

        });
        var dataJSON = JSON.stringify(data);
        localStorage.setItem('StoredData', dataJSON);

    });
    window.location.replace("file:///C:/Users/admin/Desktop/youcode/sass.html");



})




// Game logic
quizApp = () => {

    if (quizadministration.score == 3) {
        none.testone();
        block.testtwo();
    } else if (quizadministration.hasEnded()) {
        displayTwo.endQuiz();
    } else {
        displayTwo.question();
        displayTwo.choices();
        displayTwo.progress();
    }
}
// Create Quiz
let quizadministration = new Quizadministration(questionsAdministration);
quizApp();

console.log(quizadministration);