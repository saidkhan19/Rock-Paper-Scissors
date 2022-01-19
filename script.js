'use strict';

const NUMBER_OF_FIGURES = 3;
const figures = [
  '<div class="circle circle--big paper"><img src="./images/icon-paper.svg" alt="paper"></div>',
  '<div class="circle circle--big scissors"><img src="./images/icon-scissors.svg" alt="scissors"></div>',
  '<div class="circle circle--big rock"><img src="./images/icon-rock.svg" alt="rock"></div>',
];
const placeholderFigure = '<div class="circle circle--big circle-big-placeholder"></div>';

let playerScore = 0;
let playerFigure = null;
let botFigure = null;
let results = null;

let mainPage = document.querySelector(".main");
let resultsPage = document.querySelector(".results");
let modal = document.querySelector(".rules-modal");
let pageWrapper = document.querySelector(".page-wrapper");

document.querySelectorAll(".main > .circle").forEach(item => {
  item.addEventListener('click', userSelected, false);
});

document.querySelector(".btn-play").onclick = function() {

  replaceLastChild(document.querySelector(".player-picked"));
  replaceLastChild(document.querySelector(".bot-picked"), placeholderFigure);

  document.querySelector(".results-tab").setAttribute("data-visible", false);
  resultsPage.setAttribute("data-results-open", false);
  resultsPage.setAttribute("data-visible", false);

  mainPage.setAttribute("data-visible", true);
}

document.querySelector(".btn-rules").onclick = function() {
  if (modal.dataset.visible === "false") {
    modal.setAttribute("data-visible", true);
    pageWrapper.setAttribute("data-visible", true);
  }
}
document.querySelector(".close-modal").onclick = function() {
  modal.setAttribute("data-visible", false);
  pageWrapper.setAttribute("data-visible", false);
}
document.querySelector(".page-wrapper").onclick = function() {
  modal.setAttribute("data-visible", false);
  pageWrapper.setAttribute("data-visible", false);
}


function userSelected(e) {
  mainPage.setAttribute("data-visible", false);

  playerFigure = +e.target.dataset.index;
  document.getElementById("player-picked").insertAdjacentHTML("beforeend", `${figures[playerFigure]}`);

  resultsPage.setAttribute("data-visible", true);

  botSelected();
}

function botSelected() {
  let iterationCount = getRandom(3, NUMBER_OF_FIGURES * 2);
  let botPickedDiv =  document.getElementById("bot-picked");

  let timer = setInterval(function() {
    let randomFigure = 0;
    do {
      randomFigure = getRandom(0, NUMBER_OF_FIGURES);
    } while (randomFigure === botFigure || randomFigure === playerFigure);

    botFigure = randomFigure;
    replaceLastChild(botPickedDiv, figures[botFigure]);

    if (iterationCount === 1) {
      clearInterval(timer);

      showResults();
    }
    iterationCount--;
  }, 500);
}

function showResults() {
  resultsPage.setAttribute("data-results-open", true);

  if (playerFigure === 0 && botFigure === 1) updateResults("lose");
  else if (playerFigure === 0 && botFigure === 2) updateResults("win");
  else if (playerFigure === 1 && botFigure === 0) updateResults("win");
  else if (playerFigure === 1 && botFigure === 2) updateResults("lose");
  else if (playerFigure === 2 && botFigure === 0) updateResults("lose");
  else if (playerFigure === 2 && botFigure === 1) updateResults("win");
  
  document.querySelector(".results-tab").setAttribute("data-visible", true);
}

function updateResults(r) {
  results = r;
  let resultsHeader = document.querySelector("#results-header");
  if (results === "win") {
    document.querySelector("#score").innerHTML = ++playerScore;
    document.querySelector(".player-picked").lastElementChild.classList.add("circle--win");
    resultsHeader.innerHTML = "you win";
  }
  else if (results === "lose") {
    document.querySelector(".bot-picked").lastElementChild.classList.add("circle--win");
    resultsHeader.innerHTML = "you lose";
  }
}

function replaceLastChild(parentElem, newChildString="") {
  parentElem.removeChild(parentElem.lastElementChild);
  parentElem.insertAdjacentHTML("beforeend", newChildString);
}


function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}