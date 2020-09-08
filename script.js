// document.querySelector("#inner-board-1").addEventListener("click",()=> {
//   document.getElementById("para").style.display = "block"
// })


const players =()=> {
  const firstPlayerName = prompt("Please Enter First Player Name?");
  const secondPlayerName = prompt("Please Enter Second Player Name?");
  const firstPlayerSymbol = "X";
  const secondPlayerSymbol = "O";
  let playerTurn = 0;
  return {
    firstPlayerName, secondPlayerName, firstPlayerSymbol, secondPlayerSymbol
  }
};

let newGame = players();

const board = ((index, symbol) => {
  let board_array = ["X", "", "", "X", "X", "O", "X", "X", "X"];
  let display_board = () => {
    board_array.forEach(function (items, index){
      document.getElementById(`inner-board-${index}`).textContent = `${items}`;
    });
  };
  return { display_board };

})();


let myBoard = board;
let game = true;
while (game == true){
  myBoard.display_board();
};


