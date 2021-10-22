let audioTurn = new Audio("ting.mp3");
let gameOver = new Audio("gameover.mp3");
let turn = "X";
let isGameover = false;
let draw = new Audio("draw.wav");

const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

const restartGame = () => {
  location.reload();
};

const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let win = false;
  let wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
      boxtext[e[0]].innerText === boxtext[e[2]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".line").style.display = `grid`;
      if (e[5] == 0) {
        document.querySelector(".line").style.width = `20vw`;
        document.querySelector(
          ".line"
        ).style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]})`;
      } else {
        document.querySelector(".line").style.width = `20vw`;
        document.querySelector(
          ".line"
        ).style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      }
      document.querySelector(".info").innerText =
        boxtext[e[0]].innerText + " Won!";
      isGameover = true;
      let win = true;
      document
        .querySelector(".imgbox")
        .getElementsByTagName("img")[0].style.width = "200px";
    }
  });
  if (!win) {
    let drawChance = 0;
    for (let i = 0; i < 9; i++) {
      if (boxtext[i].innerText !== "") {
        drawChance++;
      }
    }
    if (drawChance === 9) {
      document.querySelector(".info").innerText = "Tie";
      isGameover = true;
      return "draw";
    }
  }
};

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      if (!isGameover) {
        boxtext.innerText = turn;
        turn = changeTurn();
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + turn;
        checkWin();
        if (isGameover) {
          if (checkWin() == "draw") {
            draw.play();
          } else {
            gameOver.play();
          }
        } else {
          audioTurn.play();
        }
      }
    }
  });
});
