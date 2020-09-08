// document.querySelector("#inner-board-1").addEventListener("click",()=> {
//   document.getElementById("para").style.display = "block"
// })

const players = () => {
  const firstPlayerName = prompt("Please Enter First Player Name?");
  const secondPlayerName = prompt("Please Enter Second Player Name?");
  const firstPlayerSymbol = "X";
  const secondPlayerSymbol = "O";
  let playerTurn = 0;
  const turn = () => {
    if (playerTurn == 0) {
      playerTurn += 1;
      return [firstPlayerName, firstPlayerSymbol];
    } else {
      playerTurn -= 1;
      return [secondPlayerName, secondPlayerSymbol];
    }
  };
  return {
    firstPlayerName,
    secondPlayerName,
    turn,
  };
};

let newGame = players();

const board = (() => {
  let board_array = ["", "", "", "", "", "", "", "", ""];
  let display_board = () => {
    board_array.forEach(function (items, index) {
      document.getElementById(`inner-board-${index}`).textContent = `${items}`;
    });
  };
  let updateBoard = (index, symbol) => {
    if (board_array[index] == "") {
      board_array[index] = symbol;
      return true;
    } else {
      return false;
    }
  };
  return { display_board, updateBoard, board_array };
})();

let myBoard = board;
console.log(myBoard);
let checked = true;
const onPress = (id) => {
  let index = parseInt(id[id.length - 1]);
  if (myBoard.board_array[index] === "") {
    let playersTurn = newGame.turn();
    checked = myBoard.updateBoard(index, playersTurn[1]);
    myBoard.display_board();
  } else {
    console.log("Already filled");
  }
};

// let game = true;
// while (game == true) {
//   myBoard.display_board();
// }
