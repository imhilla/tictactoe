let newGame;

document.getElementById('playgame').addEventListener('click', () => {
  document.getElementById('outer-board').style.display = 'grid';
  document.getElementById('playgame').style.display = 'none';
  newGame = players();
});

const players = () => {
  let playerValidate = true;
  let firstPlayerName;
  let secondPlayerName;
  while (playerValidate === true) {
    firstPlayerName = prompt('Please Enter First Player Name?');
    secondPlayerName = prompt('Please Enter Second Player Name?');
    if (
      firstPlayerName !== ''
      && secondPlayerName !== ''
      && firstPlayerName !== secondPlayerName
    ) {
      playerValidate = false;
    } else {
      alert('Please enter a valid name');
    }
  }
  document.getElementById('playersturn').textContent = `${firstPlayerName}'s turn`;
  const firstPlayerSymbol = 'X';
  const secondPlayerSymbol = 'O';
  let playerTurn = 0;
  const turn = () => {
    if (playerTurn === 0) {
      playerTurn += 1;
      document.getElementById('playersturn').textContent = `${secondPlayerName}'s turn`;
      return [firstPlayerName, firstPlayerSymbol];
    }
    playerTurn -= 1;
    document.getElementById('playersturn').textContent = `${firstPlayerName}'s turn`;
    return [secondPlayerName, secondPlayerSymbol];
  };
  return {
    firstPlayerName,
    secondPlayerName,
    turn,
  };
};

const board = (() => {
  const boardArray = ['', '', '', '', '', '', '', '', ''];
  const winArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [1, 5, 9],
  ];
  const display_board = () => {
    boardArray.forEach((items, index) => {
      document.getElementById(`inner-board-${index}`).textContent = `${items}`;
    });
  };

  const updateBoard = (index, symbol) => {
    if (boardArray[index] === '') {
      boardArray[index] = symbol;
    }
  };
  const winStatus = (moves) => {
    winArray.forEach((item) => {
      let count = 0;
      item.forEach((char) => {
        if (boardArray[char - 1] === moves[1]) {
          count += 1;
        }
        if (count === 3) {
          setTimeout(() => {
            document.querySelector('#outer-board').style.display = 'none';
            document.querySelector('#playersturn').style.display = 'none';
            document.querySelector('#winstatus').style.display = 'block';
            document.getElementById('winstatus').textContent = `Congratulations ${moves[0]}! You Win `;
            document.getElementById('reloadbutton').style.display = 'block';
          }, 100);
        }
      });
    });
  };

  const drawStatus = () => {
    let count = 0;
    function checkString(boardArray) {
      for (let i = 0; i < boardArray.length; i += 1) {
        if (boardArray[i].length > 0) {
          count += 1;
          if (count === 9) {
            return true;
          }
        }
      }
    }

    if (checkString(boardArray) === true) {
      setTimeout(() => {
        document.querySelector('#outer-board').style.display = 'none';
        document.querySelector('#playersturn').style.display = 'none';
        document.querySelector('#winstatus').style.display = 'block';
        document.querySelector('#winstatus').textContent = 'OHH NOO! Game Draw ';
        document.getElementById('reloadbutton').style.display = 'block';
      }, 100);
    }
  };

  return {
    display_board, updateBoard, boardArray, winStatus, drawStatus,
  };
})();

const myBoard = board;
const onPress = (id) => {
  const index = parseInt(id[id.length - 1], 10);
  if (myBoard.boardArray[index] === '') {
    const playersTurn = newGame.turn();
    myBoard.updateBoard(index, playersTurn[1]);
    myBoard.display_board();
    myBoard.drawStatus();
    myBoard.winStatus(playersTurn);
  } else {
    alert('Already filled');
  }
};

function playAgain() {
  window.location.reload();
}
