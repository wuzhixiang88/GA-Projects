////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ VARIABLES HOLDING AREA ------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

// variables for the chess board table, all table cells and players' div
const chessBoard = document.querySelector(".chess-board");
const allCells = document.querySelectorAll("td");
const playerWhite = document.querySelector(".player-white-div");
const playerBlack = document.querySelector(".player-black-div");

// player turn object to keep track of player's turn
const playerTurn = {
    current: "",
    last: ""
};

// starting chess board state - to keep track of board state according to how the chess pieces move when the game is being played
const boardStateObj = {
    "101": "Black Rook", "102": "Black Knight", "103": "Black Bishop", "104": "Black Queen", "105": "Black King", "106": "Black Bishop", "107": "Black Knight", "108": "Black Rook",
    "201": "Black Pawn", "202": "Black Pawn", "203": "Black Pawn", "204": "Black Pawn", "205": "Black Pawn", "206": "Black Pawn", "207": "Black Pawn", "208": "Black Pawn",
    "301": null, "302": null, "303": null, "304": null, "305": null, "306": null, "307": null, "308": null,
    "401": null, "402": null, "403": null, "404": null, "405": null, "406": null, "407": null, "408": null,
    "501": null, "502": null, "503": null, "504": null, "505": null, "506": null, "507": null, "508": null,
    "601": null, "602": null, "603": null, "604": null, "605": null, "606": null, "607": null, "608": null,
    "701": "White Pawn", "702": "White Pawn", "703": "White Pawn", "704": "White Pawn", "705": "White Pawn", "706": "White Pawn", "707": "White Pawn", "708": "White Pawn",
    "801": "White Rook", "802": "White Knight", "803": "White Bishop", "804": "White Queen", "805": "White King", "806": "White Bishop", "807": "White Knight", "808": "White Rook"
};

// object to keep track of the king's board position
const kingPos = {
    "White King": 805,
    "Black King": 105
};

// variables to hold selected piece info
let selectedPiece;
let selectedPieceId;
let selectedElement;

// TO RETHINK WHETHER TO USE GLOBAL OR LOCAL VARIABLE
let currentCellsUnderAtk = [];

// position arrays to help determine pawn's possible move space
const whitePawnDefaultPos = [
    701, 702, 703, 704, 705, 706, 707, 708
];
const blackPawnDefaultPos = [
    201, 202, 203, 204, 205, 206, 207, 208
];

// position arrays to help determine condition for pawn turning into queen
const whitePawnFinalRow = [
    101, 102, 103, 104, 105, 106, 107, 108
];
const blackPawnFinalRow = [
    801, 802, 803, 804, 805, 806, 807, 808
];

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ VARIABLES HOLDING AREA ------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ HELPER FUNCTIONS ------------------------------------*/
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

    // for user to unselect chess piece by clicking on selected chess piece again
    document.querySelector(`[id='${selectedPieceId}']`).addEventListener("click", placePiece);

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
        for (let i = 0; i < possibleMoveSpace.length; i++) {
            document.querySelector(`[id='${possibleMoveSpace[i]}']`).addEventListener("click", placePiece);
            document.querySelector(`[id='${possibleMoveSpace[i]}']`).classList.add("movable-cell");
        };
    };
    return possibleMoveSpace;
};

// calculate white pawn moves based on current position
const whitePawnMoveset = (selectedPieceId) => {
    const currentPosInt = parseInt(selectedPieceId);
    const possibleMoves = [];

    // check whether white pawn is in default starting position
    if (
        whitePawnDefaultPos.includes(currentPosInt) &&
        boardStateObj[currentPosInt - 100] === null &&
        boardStateObj[currentPosInt - 200] === null
    ) {
        possibleMoves.push(currentPosInt - 200); //pawn can move forward 2 space if at default starting position
    }; 

    // white pawn default moveset
    if (
        checkValidCell(currentPosInt - 100) &&
        boardStateObj[currentPosInt - 100] === null
    ) {
        possibleMoves.push(currentPosInt - 100);
    };

    // pawn moveset for eating pieces - move diagonal only if cell occupied by enemy pieces
    if (
        checkValidCell(currentPosInt - 99) && 
        boardStateObj[currentPosInt - 99] !== null && 
        boardStateObj[currentPosInt - 99].includes("Black")
    ) {
        possibleMoves.push(currentPosInt - 99);
    };
    if (
        checkValidCell(currentPosInt - 101) && 
        boardStateObj[currentPosInt - 101] !== null && 
        boardStateObj[currentPosInt - 101].includes("Black")
    ) {
        possibleMoves.push(currentPosInt - 101);
    };
    return possibleMoves;
};

// calculate black pawn moves based on current position
const blackPawnMoveset = (selectedPieceId) => {
    const currentPosInt = parseInt(selectedPieceId);
    const possibleMoves = [];

    // check whether black pawn is in default starting position
    if (
        blackPawnDefaultPos.includes(currentPosInt) &&
        boardStateObj[currentPosInt + 100] === null &&
        boardStateObj[currentPosInt + 200] === null
    ) {
        possibleMoves.push(currentPosInt + 200); //pawn can move forward 2 space if at default starting position
    }; 

    // black pawn default moveset
    if (
        checkValidCell(currentPosInt + 100) &&
        boardStateObj[currentPosInt + 100] === null
    ) {
        possibleMoves.push(currentPosInt + 100);
    };

    // pawn moveset for eating pieces - move diagonal only if cell occupied by enemy pieces
    if (
        checkValidCell(currentPosInt + 101) && 
        boardStateObj[currentPosInt + 101] !== null && 
        boardStateObj[currentPosInt + 101].includes("White")
    ) {
        possibleMoves.push(currentPosInt + 101);
    };
    if (
        checkValidCell(currentPosInt + 99) && 
        boardStateObj[currentPosInt + 99] !== null && 
        boardStateObj[currentPosInt + 99].includes("White")
    ) {
        possibleMoves.push(currentPosInt + 99);
    };
    return possibleMoves;
};

// calculate rook moves based on current position
const rookMoveset = (selectedPiece, selectedPieceId, forCellsUnderAtk, boardObject) => {
    const currentPosInt = parseInt(selectedPieceId);
    const possibleMoves = [];

    // array for all possible movable scenarios
    const rookVerticalMoveset = [
        100, 200, 300, 400, 500, 600, 700
    ];
    const rookHorizontalMoveset = [
        1, 2, 3, 4, 5, 6, 7
    ];

    // determine enemy piece colour
    const enemyColour = checkEnemyColour(selectedPiece);

    // check vertical up and down for movable space based on current position
    // + to move down, - to move up
    for (let i = 0; i < rookVerticalMoveset.length; i++) {
        if (checkValidCell(currentPosInt + rookVerticalMoveset[i])) {
            if (boardObject[currentPosInt + rookVerticalMoveset[i]] === null) {
                possibleMoves.push(currentPosInt + rookVerticalMoveset[i]);
            } else if (boardObject[currentPosInt + rookVerticalMoveset[i]].includes(enemyColour)) {
                possibleMoves.push(currentPosInt + rookVerticalMoveset[i]);
                break;
            } else {
                if (forCellsUnderAtk) {
                    possibleMoves.push(currentPosInt + rookVerticalMoveset[i]);
                    break;
                } else {
                    break;
                };
            };
        };
    };
    for (let i = 0; i < rookVerticalMoveset.length; i++) {
        if (checkValidCell(currentPosInt - rookVerticalMoveset[i])) {
            if (boardObject[currentPosInt - rookVerticalMoveset[i]] === null) {
                possibleMoves.push(currentPosInt - rookVerticalMoveset[i]);
            } else if (boardObject[currentPosInt - rookVerticalMoveset[i]].includes(enemyColour)) {
                possibleMoves.push(currentPosInt - rookVerticalMoveset[i]);
                break;
            } else {
                if (forCellsUnderAtk) {
                    possibleMoves.push(currentPosInt - rookVerticalMoveset[i]);
                    break;
                } else {
                    break;
                };
            };
        };
    };

    // check horizontal left and right for movable space based on current position
    // + to move right, - to move left
    for (let i = 0; i < rookHorizontalMoveset.length; i++) {
        if (checkValidCell(currentPosInt + rookHorizontalMoveset[i])) {
            if (boardObject[currentPosInt + rookHorizontalMoveset[i]] === null) {
                possibleMoves.push(currentPosInt + rookHorizontalMoveset[i]);
            } else if (boardObject[currentPosInt + rookHorizontalMoveset[i]].includes(enemyColour)) {
                possibleMoves.push(currentPosInt + rookHorizontalMoveset[i]);
                break;
            } else {
                if (forCellsUnderAtk) {
                    possibleMoves.push(currentPosInt + rookHorizontalMoveset[i]);
                    break;
                } else {
                    break;
                };
            };
        };
    };
    for (let i = 0; i < rookHorizontalMoveset.length; i++) {
        if (checkValidCell(currentPosInt - rookHorizontalMoveset[i])) {
            if (boardObject[currentPosInt - rookHorizontalMoveset[i]] === null) {
                possibleMoves.push(currentPosInt - rookHorizontalMoveset[i]);
            } else if (boardObject[currentPosInt - rookHorizontalMoveset[i]].includes(enemyColour)) {
                possibleMoves.push(currentPosInt - rookHorizontalMoveset[i]);
                break;
            } else {
                if (forCellsUnderAtk) {
                    possibleMoves.push(currentPosInt - rookHorizontalMoveset[i]);
                    break;
                } else {
                    break;
                };
            };
        };
    };
    return possibleMoves;
};

// calculate knight moves based on current position
const knightMoveset = (selectedPiece, selectedPieceId, forCellsUnderAtk, boardObject) => {
    const currentPosInt = parseInt(selectedPieceId);
    const possibleMoves = [];

    // array for all possible movable scenarios
    const knightMoveset = [
        -201, -199, -102, -98, 98, 102, 199, 201
    ];

    // determine enemy piece colour
    const enemyColour = checkEnemyColour(selectedPiece);

    // check for movable space based on current position
    for (let i = 0; i < knightMoveset.length; i++) {
        if (checkValidCell(currentPosInt + knightMoveset[i])) {
            if (
                boardObject[currentPosInt + knightMoveset[i]] === null ||
                boardObject[currentPosInt + knightMoveset[i]].includes(enemyColour)
            ) {
                possibleMoves.push(currentPosInt + knightMoveset[i]);
            } else if (forCellsUnderAtk) {
                possibleMoves.push(currentPosInt + knightMoveset[i]);
            };
        };
    };
    return possibleMoves;
};

// calculate bishop moves based on current position
const bishopMoveset = (selectedPiece, selectedPieceId, forCellsUnderAtk, boardObject) => {
    const currentPosInt = parseInt(selectedPieceId);
    const possibleMoves = [];

    // array for all possible movable scenarios
    const bishopDiagonalLeftDownMoveset = [
        99, 198, 297, 396, 495, 594, 693,
    ];
    const bishopDiagonalRightDownMoveset = [
        101, 202, 303, 404, 505, 606, 707
    ];

    // determine enemy piece colour
    const enemyColour = checkEnemyColour(selectedPiece);

    // check diagonal left down and right up for movable space based on current position
    // + to move diagonal left down, - to move diagonal right up
    for (let i = 0; i < bishopDiagonalLeftDownMoveset.length; i++) {
        if (checkValidCell(currentPosInt + bishopDiagonalLeftDownMoveset[i])) {
            if (boardObject[currentPosInt + bishopDiagonalLeftDownMoveset[i]] === null) {
                possibleMoves.push(currentPosInt + bishopDiagonalLeftDownMoveset[i]);
            } else if (boardObject[currentPosInt + bishopDiagonalLeftDownMoveset[i]].includes(enemyColour)) {
                possibleMoves.push(currentPosInt + bishopDiagonalLeftDownMoveset[i]);
                break;
            } else {
                if (forCellsUnderAtk) {
                    possibleMoves.push(currentPosInt + bishopDiagonalLeftDownMoveset[i]);
                    break;
                } else {
                    break;
                };
            };
        };
    };
    for (let i = 0; i < bishopDiagonalLeftDownMoveset.length; i++) {
        if (checkValidCell(currentPosInt - bishopDiagonalLeftDownMoveset[i])) {
            if (boardObject[currentPosInt - bishopDiagonalLeftDownMoveset[i]] === null) {
                possibleMoves.push(currentPosInt - bishopDiagonalLeftDownMoveset[i]);
            } else if (boardObject[currentPosInt - bishopDiagonalLeftDownMoveset[i]].includes(enemyColour)) {
                possibleMoves.push(currentPosInt - bishopDiagonalLeftDownMoveset[i]);
                break;
            } else {
                if (forCellsUnderAtk) {
                    possibleMoves.push(currentPosInt - bishopDiagonalLeftDownMoveset[i]);
                    break;
                } else {
                    break;
                };
            };
        };
    };

    // check diagonal right down and left up for movable space based on current position
    // + to move diagonal right down, - to move diagonal left up
    for (let i = 0; i < bishopDiagonalRightDownMoveset.length; i++) {
        if (checkValidCell(currentPosInt + bishopDiagonalRightDownMoveset[i])) {
            if (boardObject[currentPosInt + bishopDiagonalRightDownMoveset[i]] === null) {
                possibleMoves.push(currentPosInt + bishopDiagonalRightDownMoveset[i]);
            } else if (boardObject[currentPosInt + bishopDiagonalRightDownMoveset[i]].includes(enemyColour)) {
                possibleMoves.push(currentPosInt + bishopDiagonalRightDownMoveset[i]);
                break;
            } else {
                if (forCellsUnderAtk) {
                    possibleMoves.push(currentPosInt + bishopDiagonalRightDownMoveset[i]);
                    break;
                } else {
                    break;
                };
            };
        };
    };
    for (let i = 0; i < bishopDiagonalRightDownMoveset.length; i++) {
        if (checkValidCell(currentPosInt - bishopDiagonalRightDownMoveset[i])) {
            if (boardObject[currentPosInt - bishopDiagonalRightDownMoveset[i]] === null) {
                possibleMoves.push(currentPosInt - bishopDiagonalRightDownMoveset[i]);
            } else if (boardObject[currentPosInt - bishopDiagonalRightDownMoveset[i]].includes(enemyColour)) {
                possibleMoves.push(currentPosInt - bishopDiagonalRightDownMoveset[i]);
                break;
            } else {
                if (forCellsUnderAtk) {
                    possibleMoves.push(currentPosInt - bishopDiagonalRightDownMoveset[i]);
                    break;
                } else {
                    break;
                };
            };
        };
    };
    return possibleMoves;
};

// calculate queen moves based on current position
const queenMoveset = (selectedPiece, selectedPieceId, forCellsUnderAtk, boardObject) => {
    const possibleMoves = [];
    
    // queen's moveset is combination of rook + bishop
    const rookPossibleMoves = rookMoveset(selectedPiece, selectedPieceId, forCellsUnderAtk, boardObject);
    const bishopPossibleMoves = bishopMoveset(selectedPiece, selectedPieceId, forCellsUnderAtk, boardObject);

    // push the calculated rook and bishop possible moves into queen's possible moves array
    for (let i = 0; i < rookPossibleMoves.length; i++) {
        possibleMoves.push(rookPossibleMoves[i]);
    };
    for (let i = 0; i < bishopPossibleMoves.length; i++) {
        possibleMoves.push(bishopPossibleMoves[i]);
    };
    return possibleMoves;
};

// calculate king moves based on current position  //GOT BUGS NEED TO FIX
const kingMoveset = (selectedPiece, selectedPieceId, forCellsUnderAtk, boardObject) => {
    const currentPosInt = parseInt(selectedPieceId);
    const possibleMoves = [];

    // array for all possible movable scenarios
    const kingMoveset = [
        -101, -100, -99, -1, 1, 99, 100, 101 
    ];

    // determine enemy piece colour
    const enemyColour = checkEnemyColour(selectedPiece);

    // check for movable space based on current position
    for (let i = 0; i < kingMoveset.length; i++) {
        if (
            checkValidCell(currentPosInt + kingMoveset[i]) && 
            !currentCellsUnderAtk.includes(currentPosInt + kingMoveset[i])
        ) {
            if (
                boardObject[currentPosInt + kingMoveset[i]] === null ||
                boardObject[currentPosInt + kingMoveset[i]].includes(enemyColour)
            ) {
                possibleMoves.push(currentPosInt + kingMoveset[i]);
            } else if (forCellsUnderAtk) {
                possibleMoves.push(currentPosInt + kingMoveset[i]);
            };
        };
    };
    return possibleMoves;
};

// calculate cells under attack by opposing pieces / used to test if king is in check
const computeCellsUnderAtk = (boardObject = boardStateObj) => {
    // reset cells under attack and its CSS class
    currentCellsUnderAtk = [];

    const allUnderAtkCells = document.querySelectorAll(".under-attack");    
    for (let i = 0; i < allUnderAtkCells.length; i++) {
        allUnderAtkCells[i].classList.remove("under-attack");
    };
    
    // compute cells under attack based on player's turn
    if (playerTurn["current"] === "White") {
        for (const [key, value] of Object.entries(boardObject)) {
            if (value !== null && value.includes("Black Pawn")) {
                if (checkValidCell(parseInt(key) + 101)) {
                    currentCellsUnderAtk.push(parseInt(key) + 101);
                    document.querySelector(`[id='${(parseInt(key) + 101)}']`).classList.add("under-attack")
                };
                if (checkValidCell(parseInt(key) + 99)) {
                    currentCellsUnderAtk.push(parseInt(key) + 99);
                    document.querySelector(`[id='${(parseInt(key) + 99)}']`).classList.add("under-attack")
                };  
            } else if (value !== null && value.includes("Black")) {
                const possibleMoves = calculateMoveSpace(value, key, true, boardObject);
        
                for (let i = 0; i < possibleMoves.length; i++) {
                    currentCellsUnderAtk.push(possibleMoves[i]);
                    document.querySelector(`[id='${possibleMoves[i]}']`).classList.add("under-attack")
                };
            };
        };
    } else {
        for (const [key, value] of Object.entries(boardObject)) {
            if (value !== null && value.includes("White Pawn")) {
                if (checkValidCell(parseInt(key) - 101)) {
                    currentCellsUnderAtk.push(parseInt(key) - 101);
                    document.querySelector(`[id='${(parseInt(key) - 101)}']`).classList.add("under-attack")
                };
                if (checkValidCell(parseInt(key) - 99)) {
                    currentCellsUnderAtk.push(parseInt(key) - 99);
                    document.querySelector(`[id='${(parseInt(key) - 99)}']`).classList.add("under-attack")
                };             
            } else if (value !== null && value.includes("White")) {
                const possibleMoves = calculateMoveSpace(value, key, true, boardObject);
        
                for (let i = 0; i < possibleMoves.length; i++) {
                    currentCellsUnderAtk.push(possibleMoves[i]);
                    document.querySelector(`[id='${possibleMoves[i]}']`).classList.add("under-attack")
                };
            };
        };
    };
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
    computeCellsUnderAtk(cloneBoardStateObj);

    // if king is still in check, return false, otherwise return true
    if (kingInCheck()) {
        return false;
    } else {
        return true;
    }
}

// test whether king is in check during respective player's turn
const kingInCheck = () => {
    return (
        (playerTurn["current"] === "White" && currentCellsUnderAtk.includes(kingPos["White King"])) || 
        (playerTurn["current"] === "Black" && currentCellsUnderAtk.includes(kingPos["Black King"]))
    );
};

// test end game condition, checkmate
const testCheckmate = () => {
    let kingPossibleMove = [];   

    // simulating all possible moves to get out of check
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

                computeCellsUnderAtk(cloneBoardStateObj);

                // if a move results in king not in check, no checkmate, return false
                if (!currentCellsUnderAtk.includes(kingPos[`${playerTurn["current"]} King`])) {
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
const resetSelectPiece = () => {
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].removeEventListener("click", selectPiece);
    };
};

// clear event listeners for placing chess pieces
const resetPlacePiece = () => {
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].removeEventListener("click", placePiece);
    };
};

// trigger draw game/stalemate
const drawGame = () => {
    if (confirm("Confirm to Draw Game?")) {
        document.querySelector(".container").classList.add("hide");
    }
};

// function for normal game flow when user place chess piece on targeted cell
const normalPlayMove = (targetCell) => {
    // change target cell's board value to be previously selected chess piece value
    targetCell.innerText = selectedElement.innerText;
    selectedElement.innerText = "";

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

    // update king position if king is selected to move out of check
    if (selectedPiece.includes("King")) {
        kingPos[selectedPiece] = parseInt(targetCell.id);
    };

    // change player turn after player makes a move
    changePlayerTurn();
};

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ HELPER FUNCTIONS ------------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

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
    selectedElement = document.querySelector(`[id='${e.target.id}']`);
    selectedElement.classList.add("selected-cell");

    // chess piece selected, program goes to (3) PLACE PIECE STATE
    resetSelectPiece();        
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
        if (kingInCheck()) {
            // user must make a move to get out of check for the game to proceed
            if (getOutOfCheck(e.target.id)) {
                normalPlayMove(e.target);
            } else {
                alert("King is in check!");
            }
        } else {
            // user may not make a move that result in own king in check
            if (!getOutOfCheck(e.target.id)) {
                alert("Illegal move! King will be in check!")
            } else {
                normalPlayMove(e.target);
            };
        };
    };

    // game ends when checkmate occurs, when test returns true
    if (testCheckmate()) {
        selectedElement.classList.remove("selected-cell");
        resetPlacePiece();
        document.querySelector(".draw-button").removeEventListener("click", drawGame);

        alert(`Checkmate! Player ${playerTurn["last"]} Wins!`);
    } else {
        // reset all selected piece info
        selectedPiece = null; 
        selectedPieceId = null;
        selectedElement.classList.remove("selected-cell");
        selectedElement = null;

        computeCellsUnderAtk();

        // chess piece placed at target cell, program goes to (2) SELECT PIECE STATE
        resetPlacePiece();
        assignPlayerPiece();
    }
};

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ (3) PLACE PIECE STATE -------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////