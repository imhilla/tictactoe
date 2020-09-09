// document.querySelector("#inner-board-1").addEventListener("click",()=> {
//   document.getElementById("para").style.display = "block"
// })
let newGame;

document.getElementById("playgame").addEventListener("click", () => {
  document.getElementById("outer-board").style.display = "grid";
  document.getElementById("playgame").style.display = "none";
  newGame = players();
});

function reload() {
  location.reload();
}
const players = () => {
  let playerValidate = true;
  let firstPlayerName;
  let secondPlayerName;
  while (playerValidate == true) {
    firstPlayerName = prompt("Please Enter First Player Name?");
    secondPlayerName = prompt("Please Enter Second Player Name?");
    if (
      firstPlayerName != "" &&
      secondPlayerName != "" &&
      firstPlayerName != secondPlayerName
    ) {
      playerValidate = false;
    } else {
      alert("Please enter a valid name");
    }
  }
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

const board = (() => {
  let board_array = ["", "", "", "", "", "", "", "", ""];
  let win_array = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [1, 5, 9],
  ];
  let display_board = () => {
    board_array.forEach(function (items, index) {
      document.getElementById(`inner-board-${index}`).textContent = `${items}`;
    });
  };
  let updateBoard = (index, symbol) => {
    if (board_array[index] == "") {
      board_array[index] = symbol;
    }
  };
  let win_status = (symbol) => {
    win_array.forEach(function (item) {
      let count = 0;
      item.forEach(function (char) {
        if (board_array[char - 1] === symbol) {
          count += 1;
          // console.log(`${count}, ${item} , ${symbol} `);
        }
        if (count == 3) {
          setTimeout(function () {
            document.querySelector("#outer-board").style.display = "none";
            document.querySelector("#winstatus").style.display = "block";
            document.getElementById("winstatus").textContent =
              "Congratulations! You Win ";
            document.getElementById("reloadbutton").style.display = "block";
          }, 100);
        }
      });
    });
  };

  let draw_status = () => {
    win_status();
    let count = 0;
    function checkString(board_array) {
      for (i = 0; i < board_array.length; i++) {
        if (board_array[i].length > 0) {
          count += 1;
          if (count == 9) {
            return true;
          }
        }
      }
    }

    if (checkString(board_array) == true) {
      setTimeout(function () {
        document.querySelector("#outer-board").style.display = "none";
        document.querySelector("#winstatus").style.display = "block";
        document.querySelector("#winstatus").textContent =
          "OHH NOO! Game Draw ";
        document.getElementById("reloadbutton").style.display = "block";
      }, 100);
    }
  };
  return { display_board, updateBoard, board_array, win_status, draw_status };
})();

let myBoard = board;
const onPress = (id) => {
  let index = parseInt(id[id.length - 1]);
  if (myBoard.board_array[index] === "") {
    let playersTurn = newGame.turn();
    myBoard.updateBoard(index, playersTurn[1]);
    myBoard.display_board();
    myBoard.draw_status();
    myBoard.win_status(playersTurn[1]);
  } else {
    alert("Already filled");
  }
};
// let game = true;
// while (game == true) {
//
// }
