import { dataArray, sizesArray, typeArray } from './arraysGames.js';
import { drawSelectSize } from './drawSelect.js';
import { drawGrid } from './drawGrid.js';
import { modalFunction } from './modalFunction.js';
// import soundCard1 from '../assets/souds/card1.wav';

const $moves = document.querySelector('.js-moves');

const $gamesPlayed = document.querySelector('.js-games-played');
const $btnReset = document.getElementById('js-btn-reset');
const $btnChangeLayout = document.getElementById('js-btn-change-layout');
const $gameTable = document.querySelector('.js-game-table');
const $fragment = document.createDocumentFragment();
const $formGame = document.getElementById('form-game');
const $selectNumRows = document.getElementById('num-rows');
const $selectTypeCard = document.getElementById('type-rows');
const $timer = document.querySelector('.js-timer');
const $gamesWins = document.querySelector('.js-games-wins');
const $gamesLose = document.querySelector('.js-games-lose');
const $modal = document.querySelector('.modal');
const $modalForm = document.querySelector('.modal-form');
const $modalContent = document.querySelector('.modal-content');

let arrayData = [];
let isModalOpen = false;

const sounC1 = new Audio('../assets/souds/card1.wav');
const sounC2_fail = new Audio('../assets/souds/card2_fail.wav');
const sounC2_pair = new Audio('../assets/souds/card2_pair.wav');
const soundWind = new Audio('../assets/souds/win.wav');
const soundlose = new Audio('../assets/souds/lose.wav');
const soundOver = new Audio('../assets/souds/over.wav');

const keyWin = 'memory-game-wins';
const keyDefeat = 'memory-game-defeats';
const keyPlayed = 'memory-game-played';
const keySize = 'memory-game-size';
const keyType = 'memory-game-type';

let card_1 = '';
let card_2 = '';
let card_1_id = '';
let card_2_id = '';
let movesPlayer = 0;
let cardClicked = 0;
let cardEquals = 0;
let itsEquals = false;
let contReset = 0;
let timer = 30;
let timerInit = false;
let timerFunc = null;
let timerUser = 30;
let sizeDefault = localStorage.getItem(keySize) || 16;
let typeDefault = localStorage.getItem(keyType) || 'food';
let gamesPlayed = localStorage.getItem(keyPlayed) || 0;
let gamesWins = localStorage.getItem(keyWin) || 0;
let gamesLose = localStorage.getItem(keyDefeat) || 0;
let conditionWin = arrayData.length / 2;

const saveStatInLS = (key, value) => {
  localStorage.setItem(key, value);
};

const showAllCards = () => {
  document.querySelectorAll('.js-btn').forEach((item, index) => {
    item.innerHTML = arrayData[index];
    item.disabled = true;
  });
};

const drawTimer = (time) => {
  timer = time;
  $timer.innerHTML = '';
  $timer.innerHTML = time;
};

const btnClick = (element, id) => {
  itsEquals = false;
  if (movesPlayer <= 0 && cardClicked === 0) {
  }
  if (!timerInit) {
    timerInit = true;
    timerFunc = setInterval(() => {
      timer--;
      drawTimer(timer);
      if (timer <= 10) {
        $timer.classList.add('danger');
        $timer.classList.remove('ok');
      }
      if (timer === 0) {
        gamesLose++;
        clearInterval(timerFunc);
        showAllCards();
        soundlose.play();

        $gamesLose.innerHTML = gamesLose;
        isModalOpen = true;
        modalFunction(isModalOpen, $modal, $modalContent, `Don't be discouraged. Keep trying 😥`);
        gamesPlayed++;
        $gamesPlayed.innerHTML = gamesPlayed;
        saveStatInLS(keyPlayed, gamesPlayed);
        saveStatInLS(keyDefeat, gamesLose);
      }
    }, 1000);
    // timerFunc;
  }

  cardClicked++;
  try {
    if (cardClicked === 1) {
      card_1 = arrayData[id];
      card_1_id = id;
      element && (element.innerHTML = arrayData[id]);
      element && (element.disabled = true);
      sounC1.play();
      return;
    }
    if (cardClicked === 2) {
      card_2 = arrayData[id];
      card_2_id = id;
      element && (element.innerHTML = arrayData[id]);
      element && (element.disabled = true);
      movesPlayer++;
      $moves.innerHTML = movesPlayer;
    }

    if (card_1 === card_2) {
      cardEquals++;
      cardClicked = 0;
      document.getElementById(card_1_id).disabled = true;
      document.getElementById(card_2_id).disabled = true;
      itsEquals = true;
      sounC2_pair.play();
      document.getElementById(card_1_id).classList.add('pair');
      document.getElementById(card_2_id).classList.add('pair');
    } else {
      sounC2_fail.play();
    }

    if (conditionWin === cardEquals) {
      gamesWins++;
      soundWind.play();
      clearInterval(timerFunc);
      $gamesWins.innerHTML = gamesWins;
      isModalOpen = true;
      gamesPlayed++;
      $gamesPlayed.innerHTML = gamesPlayed;
      saveStatInLS(keyPlayed, gamesPlayed);
      saveStatInLS(keyWin, gamesWins);
      modalFunction(isModalOpen, $modal, $modalContent, '🥳🥳 Good Job 🥳🥳');
      return;
    }

    if (conditionWin !== cardEquals && card_2_id) {
      cardClicked = 0;
      if (!itsEquals) {
        setTimeout(() => {
          document.getElementById(card_1_id).innerHTML = '';
          document.getElementById(card_2_id).innerHTML = '';
          document.getElementById(card_1_id).disabled = false;
          document.getElementById(card_2_id).disabled = false;
          card_1_id = '';
          card_2_id = '';
        }, 200);
      }
      return;
    }
  } catch (error) {
    console.log(error, 'cardClicked: ', cardClicked, element);
  }
};

const resetGame = () => {
  conditionWin = arrayData.length / 2;
  timerInit = false;
  clearInterval(timerFunc);
  timer = timerUser;
  drawTimer(timer);
  document.querySelectorAll('.js-btn').forEach((item) => {
    item.innerHTML = '';
    item.disabled = false;
    item.classList.remove('pair');
  });
  $timer.classList.remove('danger');
  $timer.classList.add('ok');
  arrayData.sort(() => Math.random() - 0.5);
  $moves.innerHTML = 0;
  card_1 = '';
  card_2 = '';
  card_1_id = '';
  card_2_id = '';
  movesPlayer = 0;
  cardClicked = 0;
  cardEquals = 0;
};

document.addEventListener('DOMContentLoaded', (e) => {
  arrayData = dataArray(typeDefault, sizeDefault);
  arrayData.sort(() => Math.random() - 0.5);
  conditionWin = arrayData.length / 2;
  drawSelectSize($selectNumRows, sizesArray);
  drawSelectSize($selectTypeCard, typeArray);
  drawGrid($gameTable, sizeDefault);
  $timer.innerHTML = timer;
  gamesPlayed = localStorage.getItem(keyPlayed) ? localStorage.getItem(keyPlayed) : 0;
  gamesWins = localStorage.getItem(keyWin) || 0;
  gamesLose = localStorage.getItem(keyDefeat) || 0;
  sizeDefault = localStorage.getItem(keySize) || 16;
  typeDefault = localStorage.getItem(keyType) || 'food';
  $gamesLose.innerHTML = gamesLose;
  $gamesPlayed.innerHTML = gamesPlayed;
  $gamesWins.innerHTML = gamesWins;
});

$formGame.addEventListener('submit', (e) => {
  e.preventDefault();
  clearInterval(timerFunc);
  sizeDefault = $selectNumRows.value;
  typeDefault = $selectTypeCard.value;
  saveStatInLS(keySize, sizeDefault);
  saveStatInLS(keyType, typeDefault);
  arrayData = dataArray(typeDefault, sizeDefault);
  arrayData.sort(() => Math.random() - 0.5);
  timerInit = false;
  if ($selectNumRows.value === '16') {
    timerUser = 30;
    drawTimer(timerUser);
  }
  if ($selectNumRows.value === '20') {
    timerUser = 45;
    drawTimer(timerUser);
  }
  if ($selectNumRows.value === '24') {
    timerUser = 60;
    drawTimer(timerUser);
  }
  $timer.classList.remove('danger');
  $timer.classList.add('ok');
  $modalForm.classList.remove('show');
  conditionWin = arrayData.length / 2;
  console.log(conditionWin);
  drawGrid($gameTable, sizeDefault);
});

document.addEventListener('click', (e) => {
  if (e.target.matches('.js-btn')) {
    btnClick(e.target, e.target.id);
  }
  if (e.target === $btnReset || e.target.matches('#js-btn-reset span')) {
    contReset++;
    resetGame();
  }
  if (e.target === $btnChangeLayout || e.target.matches('#js-btn-change-layout *')) {
    $modalForm.classList.add('show');
  }
  if (e.target.matches('.modal-btn-close')) {
    isModalOpen = false;
    $modal.classList.remove('show');
  }
  if (e.target.matches('.modal-form-btn-close')) {
    $modalForm.classList.remove('show');
  }
});

document.addEventListener('mouseover', (e) => {
  if (e.target.matches('.js-btn')) {
    e.target.innerHTML = '?';
  }
});
document.addEventListener('mouseout', (e) => {
  if (e.target.matches('.js-btn')) {
    e.target.innerHTML = '';
  }
});
