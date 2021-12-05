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
    new Question("  A quelle heure sera reçu Vincent le jeudi ?", ["17h00", "20h10", "19h30", "18h00"], "18h00"),
    new Question("Quelle lettre vient au ? U – D – N– H – ?", ["I", "J", "R", "N"], "N"),
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
        <h1>test terminé !</h1>
        <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length} </h3>`;
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


        let infoCandidat = localStorage.getItem('StoredData');
        var infoCandidat1 = JSON.parse(infoCandidat);

        infoCandidat1.forEach(element => {
            data.push({
                Name: element.full_name,
                CIN: element.CIN,
                resulFisrtTest: quiz.score

            });
            var dataJSON = JSON.stringify(data);
            localStorage.setItem('StoredData', dataJSON);

        });

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
const onlineTest = document.getElementById("FirstTest");
const start = document.getElementById("start");
const btn = document.getElementById("strt");
btn.addEventListener("click", e => {
    e.preventDefault();
    onlineTest.style.display = "block";
    start.style.display = "none";


})