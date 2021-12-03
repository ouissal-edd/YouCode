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
let questions = [
    new Question("Quel est le nombre manquant ? 56 63 – 36 65 – 49 86 – 68 ..", ["86", "68", "59", "94"], "94"),
    new Question("Maçon est à la maison ce que boulanger est à", ["Four", "Farine", "Pain", "Levure"], "Pain"),
    new Question(" Vincent a rendez-vous chaque jour de la semaine à 14 heures avec son dentiste mais ce dernier est systématiquement en retard. Le lundi, Vincent a été reçu à 14 h 30, le mardi à 15 h 20, le mercredi à 16 h 30. A quelle heure sera reçu Vincent le jeudi ?", ["17h00", "20h10", "19h30", "18h00"], "18h00"),
    new Question("Quelle lettre vient à la place du point d’interrogation ? U – D – T – Q – C – S – S – H – ?", ["I", "J", "R", "N"], "N"),
    new Question("sssss", ["I", "J", "P", "N"], "P")

];

console.log(questions);

class Quiz {
    constructor(questions, data) {
        this.score = 0;
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.data = data;
    }
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    guess(answer) {
        if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.currentQuestionIndex++;
    }
    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }
    storData() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}


// Regroup all  functions relative to the App Display
const display = {
    elementShown: function (id, text) {
        let element = document.getElementById(id);
        element.innerHTML = text;
    },
    endQuiz: function () {
        endQuizHTML = `
        <h1>Quiz terminé !</h1>
        <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
        this.elementShown("quiz", endQuizHTML);
    },
    question: function () {
        this.elementShown("question", quiz.getCurrentQuestion().text);
    },
    choices: function () {
        let choices = quiz.getCurrentQuestion().choices;

        guessHandler = (id, guess) => {
            document.getElementById(id).onclick = function () {
                quiz.guess(guess);
                quizApp();
            }
        }
        // display choices and handle guess
        for (let i = 0; i < choices.length; i++) {
            this.elementShown("choice" + i, choices[i]);
            guessHandler("guess" + i, choices[i]);
        }
    },
    progress: function () {
        let currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    },
    passt: function () {

        window.location.replace("file:///C:/Users/admin/Desktop/youcode/secondTest.html");
    },
    saveData: function () {
        let data = [];

        data.push({
            resulFisrtTest: quiz.score
        });
        var dataJSON = JSON.stringify(data);
        localStorage.setItem('StoredData', dataJSON);
    }

};


// Game logic
quizApp = () => {
    if (quiz.score == 5) {
        display.saveData();
        display.passt();
    } else if (quiz.hasEnded()) {
        display.endQuiz();

    } else {
        display.question();
        display.choices();
        display.progress();
    }
}
// Create Quiz
let quiz = new Quiz(questions);
quizApp();

console.log(quiz);