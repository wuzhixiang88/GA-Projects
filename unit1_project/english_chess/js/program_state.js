////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ (1) STARTING STATE ----------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

window.onload = () => {
    // intialize draw game button
    document.querySelector(".draw-button").addEventListener("click", drawGame);

    // white player goes first
    playerTurn["current"] = "White";
    playerWhite.classList.add("player-turn");

    // make player's chess pieces selectable, program goes to (2) SELECT PIECE STATE
    assignPlayerPiece();
};

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ (1) STARTING STATE ----------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ (2) SELECT PIECE STATE ------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

const selectPiece = (e) => {
    // store selected chess piece and its cell id
    selectedPiece = boardStateObj[e.target.id];
    selectedPieceId = e.target.id;

    // store target cell's element and add CSS class to indicate selected cell
    selectedCell = document.querySelector(`[id='${e.target.id}']`);
    selectedCell.classList.add("selected-cell");

    // chess piece selected, program goes to (3) PLACE PIECE STATE
    removeSelectPieceEventListener();        
    calculateMoveSpace(selectedPiece, selectedPieceId);
};

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ (2) SELECT PIECE STATE ------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ (3) PLACE PIECE STATE -------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

const placePiece = (e) => {
    // proceed if user does not unselect selected chess piece
    if (!e.target.classList.contains("selected-cell")) {
        // check if king is in check
        if (kingInCheck(currentCellsUnderAtk)) {
            // user must make a move to get out of check for the game to proceed
            if (getOutOfCheck(e.target.id)) {
                normalPlayMove(e.target);
            } else {
                alert("King is in check!");
            }
        } else {
            // user may not make a move that result in own king in check
            if (!getOutOfCheck(e.target.id)) {
                alert("Illegal move! King will be in check!");
            } else {
                normalPlayMove(e.target);
            };
        };
    };

    // game ends when checkmate occurs, when test checkmate returns true
    if (testCheckmate()) {
        selectedCell.classList.remove("selected-cell");
        removePlacePieceEventListener();
        document.querySelector(".draw-button").removeEventListener("click", drawGame);

        alert(`Checkmate! Player ${playerTurn["last"]} Wins!`);
    } else {
        // reset all selected piece info
        selectedPiece = null; 
        selectedPieceId = null;
        selectedCell.classList.remove("selected-cell");
        selectedCell = null;

        currentCellsUnderAtk = [];
        currentCellsUnderAtk = computeCellsUnderAtk();

        // for if player black is COM
        if (
            playerTurn["current"] === "Black" && 
            playerBlackCtrl === "COM"
        ) {
            setTimeout(() => {
                comMove();
                // chess piece placed at target cell, program goes to (2) SELECT PIECE STATE
                removePlacePieceEventListener();
                assignPlayerPiece();
            }, 1000);            
        } else {
            // chess piece placed at target cell, program goes to (2) SELECT PIECE STATE
            removePlacePieceEventListener();
            assignPlayerPiece();
        };
    };
};

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ (3) PLACE PIECE STATE -------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////