//select the element
const score1 = document.querySelector("#score--0");
const score2 = document.querySelector("#score--1");
const currentScore1 = document.getElementById("current--0");
const currentScore2 = document.getElementById("current--1");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const New = document.querySelector(".btn--new");
const Roll = document.querySelector(".btn--roll");
const Hold = document.querySelector(".btn--hold");
const dice1 = document.querySelector(".dice");

//declaration
let score;
let currentScore;
let activeplayer = 0;

let playing ;

//restart the game functionality
const start = function () {
   playing=true; 
  score = [0, 0];
  currentScore = 0;
  score1.textContent = 0;
  score2.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;

  dice1.classList.add("hidden");
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  player1.classList.add("player--active");
  player2.classList.remove("player--active");
  
};
start(); //call the function for reload page , it appear refresh

//switch player function
const switchPlayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentScore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
};

//dice rolling functionality and event handler
Roll.addEventListener("click", function () {
  if (playing) {
    //generate the random dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display it
    dice1.classList.remove("hidden");
    dice1.src = `dice-${dice}.png`;

    //check if roll is 1 then switch palyer and not play continue
    if (dice !== 1) {
        currentScore = currentScore + dice;
        document.getElementById(`current--${activeplayer}`).textContent =
          currentScore;
    } else {
      
        switchPlayer();
    }
  }
});
//hold button all functionality and event handler
Hold.addEventListener("click", function () {
  if (playing) {
    //current score display on final socre ,when click on hold button
    score[activeplayer] += currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      score[activeplayer];

    //checking the winner player and switch player
    if (score[activeplayer] >= 10) {
      playing = false;
      dice1.classList.add("hidden");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

//restart the game event handler
New.addEventListener("click", start);
