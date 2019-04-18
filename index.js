'use strict'

let questionNumber = 0;
let score = 0;


function quizQuestion() {
    if(questionNumber < STORE.length) {
        return ` <div class='question-page'>
        <h2 class='question'>${STORE[questionNumber].question}</h2>
        <form class='aswers'>
        <fieldset>
            <label class='answer-option'>
            <input type='radio' name='answer' value='${STORE[questionNumber].answers[0]}'>
            <span>${STORE[questionNumber].answers[0]}</span>
            </label><br>
            <label class='answer-option'>
            <input type='radio' name='answer' value='${STORE[questionNumber].answers[1]}'>
            <span>${STORE[questionNumber].answers[1]}</span>
            </label><br>
            <label class='answer-option'>
            <input type='radio' name='answer' value='${STORE[questionNumber].answers[2]}'>
            <span>${STORE[questionNumber].answers[2]}</span>
            </label><br>
            <label class='answer-option'>
            <input type='radio' name='answer' value='${STORE[questionNumber].answers[3]}'>
            <span>${STORE[questionNumber].answers[3]}</span>
            </label><br>
            <button type='submit' class='submit-button'>submit</button>
        </fieldset>
        </form>
    <div>`;
    }
}

function renderQuizQuestion() {
    $('.question-html').html(quizQuestion());
}

function startQuiz() {
    $('.start-button').click(function(event) {
        renderQuizQuestion();
        $('.quiz-start').remove();
        console.log('startQuiz ran');
    });
}

function changeQuestionNumber() {
    questionNumber ++;
}

function changeScore() {
    score ++;
}

function submitAnswer() {
    $('.submit-button').click(function(event) {
       event.preventDefault();
       let selected = $('input:checked');
       let answer = selected.val();
       if (answer === STORE[questionNumber].correctAnswer) {
           CorrectAnswerSubmit();
       } else {
           WrongAnswerSubmit();
       };
    }); 
}

function CorrectAnswerSubmit() {
    $('.question-html').clear().html(
        `<div class="results-box">
        <p>Correct!</p>
        <button class="next-button">next</button>
        </div>`
    );
    changeQuestionNumber();
    changeScore();
}

startQuiz();