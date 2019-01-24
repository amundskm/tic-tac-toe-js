
const gameBoard = (() => {
  const display = [ "", "", "",
                    "", "", "",
                   "", "", "" ];
  
  
  return {display};
  
  
})();

// object for creating players
const playerFactory = ( name, symbol) => {
  
  
  return { name, symbol};
}


// object to control flow of the game itself
const gameController = (() => {
  const winner = null;
  // start with player one
  //const currentPlayer = playerOne;

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
            render()
            // check if win/draw
            if (winningMove(board)===true){
              
              console.log(`the winner is ${player.name}`)
              // remove eventListner

              
            } 
            // check if draw
            if (board.includes("") === false){
              alert("tie!")
            }
            
            // change player 
            else {
              
              player = changePlayer(player);
            }
          
            
            //e.target.innerText = player.symbol;
            console.log(board)
            
          }
      
    });
  })
  
  
 // check for winning conditions
  function winningMove(board){
           
    // check rows
    if ((board[0] === board[1] && board[0]=== board[2] && board[0] !== "") ||
        (board[3] === board[4] && board[3] === board[5] && board[3] !== "") || 
        (board[6] === board[7] && board[6]=== board[8] && board[6] !== "")
        ){
          console.log("rows")
          
          return true;
    } 
    // check columns
    else if ((board[0] === board[3] && board[0]=== board[6] && board[0] !== "") ||
      (board[1] === board[4] && board[1] === board[7] && board[1] !== "") || 
      (board[2] === board[5] && board[2] === board[8] && board[2] !== "")
      ){
        
        console.log("columns")
        return true;
    }
    // check diagonals
    else if ((board[0] === board[4] && board[0] === board[8] && board[0] !== "") ||
      (board[2] === board[4] && board[2]=== board[6] && board[2] !== "")

      ){
        console.log("diagonals")
        return true; 
    }

    return false;
  }


  // change player
  function changePlayer(currentPlayer){
    if (currentPlayer === playerOne){
      currentPlayer = playerTwo
    } else{
      currentPlayer = playerOne
    }
    return currentPlayer;
  }
  
  
  return {render, makeMove}
})();




// main game flow
const playerOne = playerFactory("Aga","X");
const playerTwo = playerFactory("Rad","O");

// first move for playerOne
gameController.makeMove(playerOne, gameBoard.display);


