// ==== UI variables ====

const msgDiv = document.querySelector('.message');

const gameBoardDiv = document.querySelector('.gameboard');
const cells = document.querySelectorAll('.cell');
const cellsArr = Array.from(cells);

const btnStart = document.querySelector('.btn--start');
const btnReset = document.querySelector('.btn--reset');

// ==== factory functions =====
const gameBoard = (() => {
  const display = [ "", "", "",
                    "", "", "",
                   "", "", "" ];
  
  // display markers on the board
  const init = function(){
    
        
    for (let i = 0; i < cellsArr.length; i++){
      cellsArr[i].innerText = "";
     }

    msgDiv.innerText = "X's turn";
  };
  
  return {display, init};
  
})();

// object for creating players
const player = ( name, marker) => {
  
  return { name, marker};
}

// players 
const playerOne = player("Aga","X");
const playerTwo = player("Rad","O");

// object to control flow of the game itself
const gameController = (() => {
 
  // start with X marker => playerOne
  let currentPlayer = playerOne;
  

  // add new marker on the board
  const nextMove = ((e) => {
    
    let board = gameBoard.display;
    let gameWon;
      if (e.target.innerText === ""){
        e.target.innerText = currentPlayer.marker;
        // update gameBoard array
        const cellNb = e.target.dataset.cell;
        board[cellNb-1] = currentPlayer.marker;
        
        gameWon = checkForWin(board);
        // check for win
        if (gameWon === true){
          
          msgDiv.innerText = `${currentPlayer.name} won!`;

          // remove event listener from gameboard
          cellsArr.forEach(cell => cell.removeEventListener("click", gameController.nextMove));

        } // check for draw
        else if (gameWon === false &&  board.includes("") ===false ) {
          msgDiv.innerText = "It's a tie!";
           
          cellsArr.forEach(cell => cell.removeEventListener("click", gameController.nextMove));
        } 
        // keep playing
        else{
          currentPlayer = changePlayer(currentPlayer);
          msgDiv.innerText= `${currentPlayer.marker}'s turn.`;
        }
        
      } else {
        msgDiv.innerText = "Clicked already. Choose another tile"
      }
        
    
  })
  
   // change player
  function changePlayer(currentPlayer){
    if (currentPlayer === playerOne){
      currentPlayer = playerTwo
    } else{
      currentPlayer = playerOne
    }
    
    return currentPlayer;
  }

  // winnig conditions
  function checkRow(a,b,c, board){
    let winnigRow = false;
    if (board[a] === board[b] && 
        board[a] === board[c] &&
        board[a] !== ""){
          winnigRow = true;
      }
   
    return winnigRow;

  }

  function checkForWin(board){
   
    // check rows
    if (checkRow(0,1,2,board) === true){
      return true
    }
    else if (checkRow(3,4,5,board)){
      return true
    }
    else if (checkRow(6,7,8,board)){
      return true
    }
    // check columns
    else if (checkRow(0,3,6,board)){
      return true
    }
    else if (checkRow(1,4,7,board)){
      return true
    }
    else if (checkRow(2,5,8,board)){
      return true
    }
    // check diagonals
    else if (checkRow(0,4,8,board)){
      return true
    }
    else if (checkRow(2,4,6,board)){
      return true
    } // keep playing
    else {
      return false
    }

  }
  
   return {nextMove}
})();


// ==== event listeners =====

cellsArr.forEach(cell => cell.addEventListener("click", gameController.nextMove));
btnReset.addEventListener("click", gameBoard.init);

btnStart.addEventListener("click", function(){
  gameBoardDiv.style.display = "grid";
  gameBoard.init();
})









