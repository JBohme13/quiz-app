'use strict'

let questionNumber = 0;
let score = 0;


function quizQuestion() {
    if(questionNumber < STORE.length) {
        return ` <div class='question-page'>
        <form class='answers'>
        <legend class='question'>${STORE[questionNumber].question}</legend>
        <fieldset>
            <label  class='answer-option'>
            <input type='radio' name='answer' value='${STORE[questionNumber].answers[0]}' required='required'>
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

function restartQuiz() {
  $('.restart-button').click(function(event) {
    location.reload();
  });
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
    if(questionNumber <= 9) {
    questionNumber ++;
    };
}

function changeScore() {
    score ++;
}

function submitAnswer() {
    $('.question-html').on('submit', '.answers', function(event) {
       event.preventDefault();
       let selected = $('input[name=answer]:checked','.answers');
       let answer = selected.val();
       console.log(answer);
       console.log(selected);
       console.log(STORE[questionNumber].correctAnswer);
       if (answer === STORE[questionNumber].correctAnswer) {
           correctAnswerSubmit();
       } else {
           wrongAnswerSubmit();
       };
    }); 
}

function correctAnswerSubmit() {
    $('.question-html').empty().html(
        `<div class="answer-box">
        <p>Correct!</p>
        <button class="next-button">next</button>
        </div>`
    );
    changeScore();
    displayScore();
}

function wrongAnswerSubmit() {
  $('.question-html').empty().html(
    `<div class="answer-box">
        <p>Nope! The correct answer is "${STORE[questionNumber].correctAnswer}"</p>
        <button class="next-button">next</button>
        </div>`
  );
}

function nextQuestion() {
  $('.question-html').on('click', '.next-button', function(event) {
    if(questionNumber === 9) {
      $('.question-html').html(quizResults());
      $('.next-button').hide();
      $('.restart-button').show();
    } else {
    changeQuestionNumber();
    displayQuestionNumber();
    renderQuizQuestion();
    };
  });
}

function quizResults() {
  if (score >= 8) {
    return `<div class="answer-box">
        <p>Your score is ${score}, way to go!</p>
        <button class="next-button">next</button>
        </div>`
  } else if (score < 8 && score >= 5) {
    return `<div class="answer-box">
        <p>Your score is ${score}, not bad, but better luck next time!</p>
        <button class="next-button">next</button>
        </div>`
  } else if (score < 5) {
    return `<div class="answer-box">
        <p>Your score is ${score}, please try again.</p>
        <button class="next-button">next</button>
        </div>`
  };
}

function displayQuestionNumber() {
  $('.question-number').text(questionNumber + 1 + '/10');
  console.log('displayQuestionNumber ran');
}

function displayScore() {
  $('.score-number').text(score);
  console.log('displayScore ran');
}

startQuiz();
$(displayQuestionNumber());
$(displayScore());
$(submitAnswer());
$(nextQuestion());
$(restartQuiz());