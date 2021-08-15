////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ MAIN FUNCTIONS --------------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

// change turn between players
const changePlayerTurn = () => {
    if (
        playerTurn["current"] === "White"
    ) {
        playerTurn["last"] = playerTurn["current"];
        playerTurn["current"] = "Black";
        playerBlack.classList.add("player-turn");
        playerWhite.classList.remove("player-turn");
    } else {        
        playerTurn["last"] = playerTurn["current"];
        playerTurn["current"] = "White";
        playerWhite.classList.add("player-turn");
        playerBlack.classList.remove("player-turn");
    };
};

// make player's piece selectable on their turn
const assignPlayerPiece = () => {
    for (const [key, value] of Object.entries(boardStateObj)) {
        if (value !== null && value.includes(playerTurn["current"])) {
            document.querySelector(`[id='${key}']`).addEventListener("click", selectPiece);
        };
    };
};

// assign possible move space once a piece is selected
const calculateMoveSpace = (selectedPiece, selectedPieceId, forCellsUnderAtk = false, boardObject = boardStateObj) => {
    // reset CSS class for movable cells
    const allMovableCell = document.querySelectorAll(".movable-cell");
    for (let i = 0; i < allMovableCell.length; i++) {
        allMovableCell[i].classList.remove("movable-cell");
    };

    let possibleMoveSpace = [];
    
    switch (selectedPiece) {
        case "White Pawn":
            possibleMoveSpace = whitePawnMoveset(selectedPieceId);
            break;
        case "Black Pawn":
            possibleMoveSpace = blackPawnMoveset(selectedPieceId);
            break;
        case "White Rook":
        case "Black Rook":
            possibleMoveSpace = rookMoveset(selectedPiece, selectedPieceId, forCellsUnderAtk, boardObject);
            break;
        case "White Knight":
        case "Black Knight":
            possibleMoveSpace = knightMoveset(selectedPiece, selectedPieceId, forCellsUnderAtk, boardObject);
            break;
        case "White Bishop":
        case "Black Bishop":
            possibleMoveSpace = bishopMoveset(selectedPiece, selectedPieceId, forCellsUnderAtk, boardObject);
            break;
        case "White Queen":
        case "Black Queen":
            possibleMoveSpace = queenMoveset(selectedPiece, selectedPieceId, forCellsUnderAtk, boardObject);
            break;
        case "White King":
        case "Black King":
            possibleMoveSpace = kingMoveset(selectedPiece, selectedPieceId, forCellsUnderAtk, boardObject);
            break;
    };

    if (!forCellsUnderAtk) {
        // for user to unselect chess piece by clicking on selected chess piece again
        document.querySelector(`[id='${selectedPieceId}']`).addEventListener("click", placePiece);
        // attach event listeners to movable cells for placing chess piece
        for (let i = 0; i < possibleMoveSpace.length; i++) {
            document.querySelector(`[id='${possibleMoveSpace[i]}']`).addEventListener("click", placePiece);
            document.querySelector(`[id='${possibleMoveSpace[i]}']`).classList.add("movable-cell");
        };
    };
    return possibleMoveSpace;
};

// calculate cells under attack by opposing pieces to test if king is in check / to use for COM movement as well
const computeCellsUnderAtk = (boardObject = boardStateObj) => {
    // reset cells under attack and its CSS class
    const cellsUnderAtk = [];

    const allCellsUnderAtk = document.querySelectorAll(".under-attack");    
    for (let i = 0; i < allCellsUnderAtk.length; i++) {
        allCellsUnderAtk[i].classList.remove("under-attack");
    };
    
    // compute cells under attack based on player's turn
    if (playerTurn["current"] === "White") {
        for (const [key, value] of Object.entries(boardObject)) {
            if (value !== null && value.includes("Black Pawn")) {
                if (checkValidCell(parseInt(key) + 101)) {
                    cellsUnderAtk.push(parseInt(key) + 101);
                    document.querySelector(`[id='${(parseInt(key) + 101)}']`).classList.add("under-attack")
                };
                if (checkValidCell(parseInt(key) + 99)) {
                    cellsUnderAtk.push(parseInt(key) + 99);
                    document.querySelector(`[id='${(parseInt(key) + 99)}']`).classList.add("under-attack")
                };  
            } else if (value !== null && value.includes("Black")) {
                const possibleMoves = calculateMoveSpace(value, key, true, boardObject);
        
                for (let i = 0; i < possibleMoves.length; i++) {
                    if (checkValidCell(possibleMoves[i])) {
                        cellsUnderAtk.push(possibleMoves[i]);                    
                        document.querySelector(`[id='${possibleMoves[i]}']`).classList.add("under-attack")
                    }
                };
            };
        };
    } else {
        for (const [key, value] of Object.entries(boardObject)) {
            if (value !== null && value.includes("White Pawn")) {
                if (checkValidCell(parseInt(key) - 101)) {
                    cellsUnderAtk.push(parseInt(key) - 101);
                    document.querySelector(`[id='${(parseInt(key) - 101)}']`).classList.add("under-attack")
                };
                if (checkValidCell(parseInt(key) - 99)) {
                    cellsUnderAtk.push(parseInt(key) - 99);
                    document.querySelector(`[id='${(parseInt(key) - 99)}']`).classList.add("under-attack")
                };             
            } else if (value !== null && value.includes("White")) {
                const possibleMoves = calculateMoveSpace(value, key, true, boardObject);
        
                for (let i = 0; i < possibleMoves.length; i++) {
                    if (checkValidCell(possibleMoves[i])) {
                        cellsUnderAtk.push(possibleMoves[i]);                    
                        document.querySelector(`[id='${possibleMoves[i]}']`).classList.add("under-attack")
                    }
                };
            };
        };
    };
    return cellsUnderAtk;
};

// test whether king is in check during respective player's turn
const kingInCheck = (cellsUnderAtk) => {
    return (
        (playerTurn["current"] === "White" && cellsUnderAtk.includes(kingPos["White King"])) || 
        (playerTurn["current"] === "Black" && cellsUnderAtk.includes(kingPos["Black King"]))
    );
};

// simulate a move to get out of check
const getOutOfCheck = (targetCellId) => {
    // clone board state object for move simulation
    const cloneBoardStateObj = {...boardStateObj};

    // simulate move based on user target cell
    cloneBoardStateObj[targetCellId] = selectedPiece;
    cloneBoardStateObj[selectedPieceId] = null;

    // update king position if king is selected to move out of check
    if (selectedPiece.includes("King")) {
        kingPos[selectedPiece] = parseInt(targetCellId);
    };

    // compute cells under attack to check if king is still in check
    const cellsUnderAtk = computeCellsUnderAtk(cloneBoardStateObj);

    // if king is still in check, return false, otherwise return true
    if (kingInCheck(cellsUnderAtk)) {
        return false;
    } else {
        return true;
    }
};

// test end game condition, checkmate
const testCheckmate = () => {
    let kingPossibleMove = [];

    // iterate over all current player turn's chess pieces
    for (const [key, value] of Object.entries(boardStateObj)) {
        // calculate possible moves for king
        if (
            value === `${playerTurn["current"]} King`
        ) {
            kingPossibleMove = calculateMoveSpace(value, key);
        } else if (
            value !== null && 
            value.includes(playerTurn["current"])
        ) {
            // calculate and simulate all possible moves for rest of the chess pieces
            const possibleMoves = calculateMoveSpace(value, key);
            for (let i = 0; i < possibleMoves.length; i++) {
                const cloneBoardStateObj = {...boardStateObj};
                cloneBoardStateObj[possibleMoves[i]] = value;
                cloneBoardStateObj[key] = null;

                const cellsUnderAtk = computeCellsUnderAtk(cloneBoardStateObj);

                // if a move results in king not in check, no checkmate, return false
                if (!cellsUnderAtk.includes(kingPos[`${playerTurn["current"]} King`])) {
                    return false;
                };
            };
        };
    };
    // no moves to get king out of check and no possible moves for king, checkmate, return true
    if (kingPossibleMove.length === 0) {
        return true;
    };
};

// check if cell is valid key in board state object
const checkValidCell = (key) => key in boardStateObj;

// determine enemy piece colour
const checkEnemyColour = (selectedPiece) => {
    if (selectedPiece.includes("White")) {
        return "Black";
    } else {
        return "White";
    };
};

// clear event listeners for selecting chess pieces
const removeSelectPieceEventListener = () => {
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].removeEventListener("click", selectPiece);
    };
};

// clear event listeners for placing chess pieces
const removePlacePieceEventListener = () => {
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].removeEventListener("click", placePiece);
    };
};

// trigger draw game/stalemate
const drawGame = () => {
    if (confirm("Confirm to Draw Game?")) {
        document.querySelector(".container").classList.add("hide");
    };
};

// for checking if rook has moved, for castling requirements
const checkRookFirstMove = () => {
    if (selectedPieceId === "808") {
        castlingReqTracker["whiteRookKingSideMoved"] = true;
    }
    if (selectedPieceId === "801") {
        castlingReqTracker["whiteRookQueenSideMoved"] = true;
    }
    if (selectedPieceId === "108") {
        castlingReqTracker["blackRookKingSideMoved"] = true;
    }
    if (selectedPieceId === "101") {
        castlingReqTracker["blackRookQueenSideMoved"] = true;
    }
};

// function for normal game flow when user place chess piece on targeted cell
const normalPlayMove = (targetCell) => {
    // populating/updating eliminated chess piece info if a chess piece is eliminated
    eliminatedPiece(targetCell);

    // change target cell's board value to be previously selected chess piece value
    targetCell.innerHTML = selectedCell.innerHTML;
    selectedCell.innerHTML = "";

    // update board state after placing piece
    boardStateObj[targetCell.id] = selectedPiece;
    boardStateObj[selectedPieceId] = null;

    // change pawn into queen if it reaches the last row
    if (
        selectedPiece === "White Pawn" && 
        whitePawnFinalRow.includes(parseInt(targetCell.id))
    ) {
        boardStateObj[targetCell.id] = "White Queen";
        document.querySelector(`[id='${targetCell.id}']`).innerHTML = "&#9813";
    } else if (
        selectedPiece === "Black Pawn" && 
        blackPawnFinalRow.includes(parseInt(targetCell.id))
    ) {
        boardStateObj[targetCell.id] = "Black Queen";
        document.querySelector(`[id='${targetCell.id}']`).innerHTML = "&#9819";
    };
    
    // check if rook moved, for castling
    checkRookFirstMove()

    // for castling king and queen side
    if (
        (selectedPiece === "White King" && targetCell.id === "807" && !castlingReqTracker["whiteKingFirstMove"]) ||
        (selectedPiece === "Black King" && targetCell.id === "107" && !castlingReqTracker["blackKingFirstMove"])
    ) {
        castleKingSide();
    };
    if (
        (selectedPiece === "White King" && targetCell.id === "803" && !castlingReqTracker["whiteKingFirstMove"]) ||
        (selectedPiece === "Black King" && targetCell.id === "103" && !castlingReqTracker["blackKingFirstMove"])
    ) {
        castleQueenSide();
    };

    // update king position if king is moved
    if (selectedPiece === "White King") {
        kingPos[selectedPiece] = parseInt(targetCell.id);
        castlingReqTracker["whiteKingFirstMove"] = true;
    };
    if (selectedPiece === "Black King") {
        kingPos[selectedPiece] = parseInt(targetCell.id);
        castlingReqTracker["blackKingFirstMove"] = true;
    };

    // change player turn after player makes a move
    changePlayerTurn();

    // calculate cells under attack by opposing pieces to test if king is in check
    currentCellsUnderAtk = [];
    currentCellsUnderAtk = computeCellsUnderAtk();
};

// function for COM movements
const comMove = () => {
    const allBlackPiece = [];
    let comPossibleMove = [];
    let randomMove = "";
    let moveCell = "";

    for (const [key, value] of Object.entries(boardStateObj)) {
        if (value !== null && value.includes("Black")) {
            allBlackPiece.push([key, value]);
        }
    };        

    if (kingInCheck(currentCellsUnderAtk)) {
        const getOutOfCheckMoves = comGetOutOfCheckMoves();
        const randomGetOutOfCheckMoves = getOutOfCheckMoves[Math.floor(Math.random() * getOutOfCheckMoves.length)];

        selectedPiece = randomGetOutOfCheckMoves[1];
        selectedPieceId = randomGetOutOfCheckMoves[0];
        selectedCell = document.querySelector(`[id='${selectedPieceId}']`);

        randomMove = randomGetOutOfCheckMoves[2];
        moveCell = document.querySelector(`[id='${randomMove}']`);        
    } else {
        do {
            const randomSelectPiece = allBlackPiece[Math.floor(Math.random() * allBlackPiece.length)];
            selectedPiece = randomSelectPiece[1];
            selectedPieceId = randomSelectPiece[0];
            selectedCell = document.querySelector(`[id='${selectedPieceId}']`);
    
            comPossibleMove = calculateMoveSpace(selectedPiece, selectedPieceId);
            randomMove = comPossibleMove[Math.floor(Math.random() * comPossibleMove.length)];
            moveCell = document.querySelector(`[id='${randomMove}']`);
        } while (comPossibleMove.length === 0 || !checkValidCell(randomMove) || !getOutOfCheck(randomMove));
    }    

    normalPlayMove(moveCell);

    // game ends when checkmate occurs, when test returns true
    if (testCheckmate()) {
        document.querySelector(".draw-button").removeEventListener("click", drawGame);

        alert(`Checkmate! Player ${playerTurn["last"]} Wins!`);
    } else {
        // reset all selected piece info
        selectedPiece = null; 
        selectedPieceId = null;
        selectedCell = null;

        currentCellsUnderAtk = [];
        currentCellsUnderAtk = computeCellsUnderAtk();
    };
};

// function for computing COM's get out of check moves
const comGetOutOfCheckMoves = () => {
    const getOutOfCheckMoves = [];

    // iterate over all COM's chess piece
    for (const [key, value] of Object.entries(boardStateObj)) {
       if (
            value !== null && 
            value.includes("Black")
        ) {
            // calculate and simulate all possible moves for each chess piece
            const possibleMoves = calculateMoveSpace(value, key);
            for (let i = 0; i < possibleMoves.length; i++) {
                const cloneBoardStateObj = {...boardStateObj};
                cloneBoardStateObj[possibleMoves[i]] = value;
                cloneBoardStateObj[key] = null;

                const cloneKingPos = {...kingPos};
                if (value === "Black King") {
                    cloneKingPos[value] = possibleMoves[i];
                };

                const cellsUnderAtk = computeCellsUnderAtk(cloneBoardStateObj);

                // if a move results in king not in check, push the move into the array
                if (!cellsUnderAtk.includes(cloneKingPos["Black King"])) {
                    getOutOfCheckMoves.push([key, value, possibleMoves[i]]);
                };
            };
        };
    };
    return getOutOfCheckMoves;
};

// for populating/updating eliminated chess piece info
const eliminatedPiece = (targetCell) => {
    const elimInfoPara = document.querySelector(`.elim-${playerTurn["last"].toLowerCase()}`);

    // check eliminated piece not null
    if (boardStateObj[targetCell.id] !== null) {
        if (
            targetCell.innerHTML in eliminatedPieceTracker[playerTurn["last"]]
        ) {
            eliminatedPieceTracker[playerTurn["last"]][targetCell.innerHTML ] += 1;
        } else {
            eliminatedPieceTracker[playerTurn["last"]][targetCell.innerHTML ] = 1;
        };

        // clear and update eliminated info paragraph
        elimInfoPara.innerHTML = ""
        for (const [key, value] of Object.entries(eliminatedPieceTracker[playerTurn["last"]])) {
            elimInfoPara.innerHTML += `${value}x ${key} <br>`
        };
    };
};

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ MAIN FUNCTIONS --------------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////