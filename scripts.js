

const gameBoard = (() => {
  const display = [ ];
  
  
  return {display};
  
  
})();

const playerFactory = ( name, symbol) => {
  // here define who won, then display?
  
  return { name, symbol};
}


// object to control flow of the game itself
const game = (() => {
  // display symbols on the board
  const render = function(){
    let cells = document.querySelectorAll('.cell');
    cells = Array.from(cells);
      
    for (let i = 0; i < cells.length; i++){
      cells[i].innerText = gameBoard.display[i];
     }
  };

  // add new symbol on the board
  const makeMove = ((player, board) => {
    
    const gameBoardDiv = document.querySelector('.gameboard');
    
    gameBoardDiv.addEventListener("click", function(e){
     
          // if empty change the inner text to user symbol:
          if (e.target.innerText === ""){
            // get cell number
            const cellNb = e.target.dataset.cell;
            board[cellNb-1] = player.symbol;
            e.target.innerText = player.symbol;
            console.log(board)
          }
      
    });
  })    
   return {render, makeMove}
})();




// main game flow
const playerOne = playerFactory("Aga","X");
const playerTwo = playerFactory("Rad","O");


game.makeMove(playerTwo, gameBoard.display)

