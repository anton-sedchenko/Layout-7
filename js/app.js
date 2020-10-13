'use strict';

const btnStartGame = document.querySelector('.btn-start-game');
const btnSkipQuestion = document.querySelector('.btn-skip-question');
const allElements = document.querySelector('.main-wrap');
const questionElement = document.querySelector('.question');
const cardsContainer = document.querySelector('.cards-container');

const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');

const currentPrizeEl = document.querySelector('.score__current');
const scoreTotalEl = document.querySelector('.score__total');
const quizOverMessageEl = document.querySelector('.quiz-over-block');
const quizOverMessageStr = document.querySelector('.quiz-over-message');
const quizWinBlockEl = document.querySelector('.quiz-win-block');

const prizeSumConst = 1000000;
const initRoundPrizeConst = 100;

let scoreTotalCounter;
let currentRoundPrize;
let currentQuestionIndex;
let shuffleArr;

// Получаем массив индексов вопросов в случайно перемешанном порядке
function shuffle(array) {
  let i = array.length;
  let j = 0;
  let temp;
  while (i--) {
    j = Math.floor(Math.random() * (i+1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// прячем всё кроме кнопки Старт
btnSkipQuestion.classList.add('hide');
allElements.classList.add('hide');
quizOverMessageEl.classList.add('hide');
quizWinBlockEl.classList.add('hide');

// слушаем нажатия старт и скип
btnStartGame.addEventListener('click', startGame);
btnSkipQuestion.addEventListener('click', skipQuestion);

function setNextQuestion() {
  showQuestion(shuffleArr[currentQuestionIndex]);
}
// questions[i]['correct']
function showQuestion(question) {
  questionElement.textContent = question.question;
  option1.textContent = question['content'][0];
  option2.textContent = question['content'][1];
  option3.textContent = question['content'][2];
  option4.textContent = question['content'][3];
}

function startGame() {
  shuffleArr = shuffle(window.questions);
  btnSkipQuestion.classList.remove('hide');
  allElements.classList.remove('hide');
  quizOverMessageEl.classList.add('hide');
  quizWinBlockEl.classList.add('hide');
  currentRoundPrize = initRoundPrizeConst;
  currentPrizeEl.textContent = currentRoundPrize;
  scoreTotalCounter = 0;
  scoreTotalEl.textContent = scoreTotalCounter;
  currentQuestionIndex = 0;
  btnStartGame.setAttribute('disabled', 'disabled');
  questionElement.classList.add('show-question');
  setNextQuestion();
}

function skipQuestion() {
  currentQuestionIndex += 1;
  setNextQuestion();
  btnSkipQuestion.setAttribute('disabled', 'disabled');
}

cardsContainer.onclick = function(event) {
  let target = event.target;
  if (target.tagName !== 'DIV') {
    return;
  }
  const id = +event.target.id;
  const correctId = window.questions[currentQuestionIndex].correct;
  if (id === correctId) {
    currentQuestionIndex += 1;
    scoreTotalCounter += currentRoundPrize;
    scoreTotalEl.textContent = scoreTotalCounter;
    currentRoundPrize += currentRoundPrize;
    currentPrizeEl.textContent = currentRoundPrize;
    showQuestion(shuffleArr[currentQuestionIndex]);
  } else {
    quizOver();
  }
  if (scoreTotalCounter >= prizeSumConst) {
    quizWon();
  }
}

function quizOver() {
  btnSkipQuestion.classList.add('hide');
  allElements.classList.add('hide');
  btnStartGame.removeAttribute('disabled');
  btnSkipQuestion.removeAttribute('disabled');
  currentPrizeEl.textContent = currentRoundPrize;
  scoreTotalEl.textContent = scoreTotalCounter;
  quizOverMessageStr.textContent = scoreTotalCounter;
  quizOverMessageEl.classList.remove('hide');
  return;
}

function quizWon() {
  btnSkipQuestion.classList.add('hide');
  allElements.classList.add('hide');
  btnStartGame.removeAttribute('disabled');
  btnSkipQuestion.removeAttribute('disabled');
  currentPrizeEl.textContent = currentRoundPrize;
  scoreTotalEl.textContent = scoreTotalCounter;
  quizWinBlockEl.classList.remove('hide');
  return;
}
