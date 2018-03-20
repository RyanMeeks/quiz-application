'use strict';

let questionNum = 0;
let correctAnswers = 0;

const questionGroup =  [
  { 
    question: `How many babies did Phoebe carry for her brother?`,
    answer: `3`,
    feedback: `She birthed 3 children.`,
    choices: [`1`, `2`, `3`, `4`],
  },
  {
    question: `Why does Ross' wife, Carol, leave him?`,
    answer: `Carol likes another woman.`,
    feedback: `Carol was in the closet.`,
    choices: [`Ross likes another man.`, `Carol likes another man.`, `Carol likes another woman.`, `Ross likes another woman.`],
  },
  {
    question: `Which "FRIEND" was famously overweight as a child?`,
    answer: `Monica`,
    feedback: `Monica lost some weight!`,
    choices: [`Ross`, `Phoebe`, `Joey`, `Monica`],
  },
  {
    question: `Whose surname is "Buffay?"`,
    answer: `Phoebe`,
    feedback: `Like "Boo-fay."`,
    choices: [`Ross`, `Phoebe`, `Joey`, `Monica`],
  },
  {
    question: `How many sisters does Joey have?`,
    answer: `7`,
    feedback: `Why do you think he's such a lady's man?`,
    choices: [`1`, `2`, `4`,`6`, `7`],
  },
  {
    question: `What was the name of Joey's agent?`,
    answer: `Estelle`,
    feedback: `She kind of looked like Madonna!`,
    choices: [`Bobbi`, `Estelle`, `Evelyn`, `Aetna`],
  },
  {
    question: `What dessert does Ross not enjoy?`,
    answer: `Ice Cream`,
    feedback: `Who doesn't like ice cream? What a weirdo!`,
    choices: [`Cake`, `Milkshakes`, `Candy`, `Ice Cream`],
  },
  {
    question: `What was the name of Phoebe's birth-mother`,
    answer: `Phoebe`,
    feedback: `Yep! Same name!`,
    choices: [`Estelle`, `Tammy`, `Ursula`, `Phoebe`],
  },
  {
    question: `Why does Monica receive her dad's Porsche?`,
    answer: `He ruined her childhood memories`,
    feedback: `Dad's trying to compensate.`,
    choices: [`It's a wedding gift`, `It's a birthday gift.`, `He ruined her childhood memories`, `He likes her better than Ross`],
  },
  {
    question: `What does Joey find in Las Vegas that astonishes him?`,
    answer: `His identical hand twin`,
    feedback: `Hopefully you've found yours!`,
    choices: [`His identical hand twin`, `A sister he never knew`, `Slot machines`, `His mom`],
  },
  ];

function triviaTemplate(question, questionsAnswered, correctAnswers) {
  console.log("triviaTemplate Works");
  $(".feedback-page-incorrect, .feedback-page-correct").empty();
  return `
    <header role='banner'>
      <img class="logo" src="https://vignette.wikia.nocookie.net/logopedia/images/2/23/1000px-Friends_logo_svg.png/revision/latest?cb=20130416015343" alt="friends logo">
      <ul>
        <li>Question: <span class="questionNumber">${questionNum+1}</span>/10</li>
        <li>Score: <span class="score">${correctAnswers}</span></li>
      </ul>
    </header>
    <p class="question-text">${questionGroup[questionNum].question}</p>
    <form>
      <fieldset>
      <legend>Answer Choices</legend>
        <label class="answerOption">
          <input type="radio" name="answer" required>
          <span>${questionGroup[questionNum].choices[0]}</span>
        </label>
        <label class="answerOption">
          <input type="radio" name="answer" required>
          <span>${questionGroup[questionNum].choices[1]}</span>
        </label>
        <label class="answerOption">
          <input type="radio" name="answer" required>
          <span>${questionGroup[questionNum].choices[2]}</span>
        </label>
        <label class="answerOption">
          <input type="radio" name="answer" required>
          <span>${questionGroup[questionNum].choices[3]}</span>
        </label>
        <button id='submit-answer' type='submit'>Submit Answer</button>
      </fieldset>
    </form>`
;}

function beginQuestion() {
  console.log("beginQuestion works");
  const question = questionGroup[0];
  const questionsAnswered = questionNum;
  $('.question-generator').html(triviaTemplate(question, questionsAnswered, correctAnswers));//run triviaTemplate Function
}

function handleSubmit() {
  console.log("handleSubmit works");
  $(".question-generator").on("submit", function() {
    event.preventDefault();
    console.log(questionNum);
    console.log(questionNum);
    const answer = $("input:checked").siblings("span").text();
    checkAnswer(answer);
  });
}

function checkAnswer(answer) {
  console.log("check answer works");
  if (answer === questionGroup[questionNum].answer) {
    correctAnswers++;

    $(".question-generator").empty();
    correctDisplay();
  }
  else {
    $(".question-generator").empty();
    incorrectDisplay();
  }

}

function incorrectDisplay() {
  console.log("incorrectDisplay works!");
  $(".feedback-page-incorrect").html(`
  <img class="logo" src="https://vignette.wikia.nocookie.net/logopedia/images/2/23/1000px-Friends_logo_svg.png/revision/latest?cb=20130416015343" alt="friends logo"><br>
  <h1 class="feedback">The Answer is <br>"${questionGroup[questionNum].answer}"<br>You're Not a Very Good Friend!</h1>
  <button type ="button" id="next-question-button">Next</button`);
  handleNextButton();
}

function handleNextButton() {
  $("#next-question-button").on("click", function() {
    $(".feedback-page-correct", "feedback-page-incorrect").empty();
    if (questionNum < 9) {
      console.log("handleNextButton Works!");
      questionNum++;
      beginQuestion();
    }
    else {
      console.log("else works");
      $(".feedback-page-correct, .feedback-page-incorrect").empty();
      calculateFinal(correctAnswers);
    }
  });
}

function correctDisplay() {
  console.log("correctDisplay works");
  $(".feedback-page-correct").html(`
  <img class="logo" src="https://vignette.wikia.nocookie.net/logopedia/images/2/23/1000px-Friends_logo_svg.png/revision/latest?cb=20130416015343" alt="friends logo">
  <h1 class="feedback">Great Job, That's Right!<br>${questionGroup[questionNum].feedback}<br>Your score is<br>${correctAnswers} out of ${questionNum+1}</h1>
  <button type ="button" id="next-question-button">Next</button>`);
  handleNextButton();
}

function handleClassButton() {
 console.log("handleClassButton works");
 $(".question-generator").on("click", ".answerOption", function() {
   $(".answerOption").removeClass("selected-answer");
   $(this).addClass("selected-answer");
 });
}

function calculateFinal(correctAnswers) {
  console.log("calculateFinal works");
  if (correctAnswers >= 8) {
    $(".final-page").html(`<img class="logo" src="https://vignette.wikia.nocookie.net/logopedia/images/2/23/1000px-Friends_logo_svg.png/revision/latest?cb=20130416015343" alt="friends logo">
    <h1 class="feedback">Great Job! You're an awesome Friend! You knew<br><span class="score">${correctAnswers}</span> out of 10</h1>
    <button type ="button" class = "restart">Restart</button>`);
  }
  else if (correctAnswers < 8 && correctAnswers >= 5) {
    $(".final-page").html(`
    <img class="logo" src="https://vignette.wikia.nocookie.net/logopedia/images/2/23/1000px-Friends_logo_svg.png/revision/latest?cb=20130416015343" alt="friends logo">
    <h1 class="feedback">Decent Job! You're an OK Friend! You knew<br><span class="score">${correctAnswers}</span> out of 10</h1>
    <button type ="button" class = "restart">Restart</button>`);
  }
  else {
    $(".final-page").html(`
    <img class="logo" src="https://vignette.wikia.nocookie.net/logopedia/images/2/23/1000px-Friends_logo_svg.png/revision/latest?cb=20130416015343" alt="friends logo">
    <h1 class="feedback">Eh! Monica has better friends. You knew<br><span class="score">${correctAnswers}</span> out of 10</h1>
    <button type ="button" class = "restart">Restart</button>`);
  }
  $(".restart").on("click", function() {
     location.reload();
  });
}

   //first page of quiz
function beginQuiz() {
  console.log("beginQuiz Works");
  $(".start-button").on("click", function() {
     $(".beginQuiz").hide();
     beginQuestion();
  });
}

function startGame() {
beginQuiz();
handleSubmit();
handleClassButton();
}

$(startGame);
