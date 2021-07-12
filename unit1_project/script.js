////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ VARIABLES HOLDING AREA ------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

// variables for the chess board table, all table cells and players' div
const chessBoard = document.querySelector(".chess-board");
const allCells = document.querySelectorAll("td");
const playerWhite = document.querySelector(".player-white-div");
const playerBlack = document.querySelector(".player-black-div");

// variables to hold selected piece info
let selectedPieceValue;
let selectedPieceId;
let selectedPieceElement;

// player turn object to keep track of player's turn
const playerTurn = {
    playerWhite: false,
    playerBlack: false
};

// starting chess board state - to keep track of board state according to how the chess pieces move when the game is being played
const boardStateObj = {
    // "0": "Black Rook", "1": "Black Knight", "2": "Black Bishop", "3": "Black Queen", "4": "Black King", "5": "Black Bishop", "6": "Black Knight", "7": "Black Rook",
    // "8": "Black Pawn", "9": "Black Pawn", "10": "Black Pawn", "11": "Black Pawn", "12": "Black Pawn", "13": "Black Pawn", "14": "Black Pawn", "15": "Black Pawn",
    // "16": null, "17": null, "18": null, "19": null, "20": null, "21": null, "22": null, "23": null,
    // "24": null, "25": null, "26": null, "27": null, "28": null, "29": null, "30": null, "31": null,
    // "32": null, "33": null, "34": null, "35": null, "36": null, "37": null, "38": null, "39": null,
    // "40": null, "41": null, "42": null, "43": null, "44": null, "45": null, "46": null, "47": null,
    // "48": "White Pawn", "49": "White Pawn", "50": "White Pawn", "51": "White Pawn", "52": "White Pawn", "53": "White Pawn", "54": "White Pawn", "55": "White Pawn",
    // "56": "White Rook", "57": "White Knight", "58": "White Bishop", "59": "White Queen", "60": "White King", "61": "White Bishop", "62": "White Knight", "63": "White Rook"
    "101": "Black Rook", "102": "Black Knight", "103": "Black Bishop", "104": "Black Queen", "105": "Black King", "106": "Black Bishop", "107": "Black Knight", "108": "Black Rook",
    "201": "Black Pawn", "202": "Black Pawn", "203": "Black Pawn", "204": "Black Pawn", "205": "Black Pawn", "206": "Black Pawn", "207": "Black Pawn", "208": "Black Pawn",
    "301": null, "302": null, "303": null, "304": null, "305": null, "306": null, "307": null, "308": null,
    "401": null, "402": null, "403": null, "404": null, "405": null, "406": null, "407": null, "408": null,
    "501": null, "502": null, "503": null, "504": null, "505": null, "506": null, "507": null, "508": null,
    "601": null, "602": null, "603": null, "604": null, "605": null, "606": null, "607": null, "608": null,
    "701": "White Pawn", "702": "White Pawn", "703": "White Pawn", "704": "White Pawn", "705": "White Pawn", "706": "White Pawn", "707": "White Pawn", "708": "White Pawn",
    "801": "White Rook", "802": "White Knight", "803": "White Bishop", "804": "White Queen", "805": "White King", "806": "White Bishop", "807": "White Knight", "808": "White Rook"
};

// position arrays to help determine chess piece's possible move space
const leftCornerPos = [
    101, 201, 301, 401, 501, 601, 701, 801
];
const rightCornerPos = [
    108, 208, 308, 408, 508, 608, 708, 808
];
const whitePawnDefaultPos = [
    701, 702, 703, 704, 705, 706, 707, 708
];
const blackPawnDefaultPos = [
    201, 202, 203, 204, 205, 206, 207, 208
];

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ VARIABLES HOLDING AREA ------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ HELPER FUNCTIONS ------------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

// change turn between players
const changePlayerTurn = () => {
    if (playerTurn.playerWhite) {

        playerTurn.playerWhite = false;
        playerWhite.classList.remove("player-turn");

        playerTurn.playerBlack = true;
        playerBlack.classList.add("player-turn");
    } else {

        playerTurn.playerWhite = true;
        playerWhite.classList.add("player-turn");

        playerTurn.playerBlack = false;
        playerBlack.classList.remove("player-turn");
    };
};

// make player's piece selectable on their turn
const assignPlayerPiece = () => {
    if (playerTurn.playerWhite) {
        for (const [key, value] of Object.entries(boardStateObj)) {
            if (value !== null && value.includes("White")) {
                document.querySelector(`[id='${key}']`).addEventListener("click", selectPiece);
            };
        };
    } else {
        for (const [key, value] of Object.entries(boardStateObj)) {
            if (value !== null && value.includes("Black")) {
                document.querySelector(`[id='${key}']`).addEventListener("click", selectPiece);
            };
        };        
    };
};

// assign possible move space once a piece is selected
const assignMoveSpace = (positionPiece, positionIdString) => {
    let possibleMoveSpace = [];
    
    switch (positionPiece) {
        case "White Pawn":
            possibleMoveSpace = whitePawnMoveset(positionIdString);
            break;
        case "Black Pawn":
            possibleMoveSpace = blackPawnMoveset(positionIdString);
            break;
        case "White Rook":
        case "Black Rook":
            possibleMoveSpace = rookMoveset(positionPiece, positionIdString);
            break;
        case "White Knight":
        case "Black Knight":
            possibleMoveSpace = knightMoveset(positionPiece, positionIdString);
            break;
        case "White Bishop":
        case "Black Bishop":
            possibleMoveSpace = bishopMoveset(positionPiece, positionIdString);
            break;
        case "White Queen":
        case "Black Queen":
            possibleMoveSpace = queenMoveset(positionPiece, positionIdString);
            break;
        case "White King":
        case "Black King":
            possibleMoveSpace = kingMoveset(positionPiece, positionIdString);
            break;
    };

    for (let i = 0; i < possibleMoveSpace.length; i++) {
        document.querySelector(`[id='${possibleMoveSpace[i]}']`).addEventListener("click", placePiece);
    };
};

// calculate white pawn moves based on current position
const whitePawnMoveset = (positionIdString) => {
    const currentPosInt = parseInt(positionIdString);
    const possibleMoves = [currentPosInt];

    // check whether white pawn is in default starting position
    if (
        whitePawnDefaultPos.includes(currentPosInt) &&
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
    if (leftCornerPos.includes(currentPosInt)) { // check whether chess piece is at leftmost column
        if (
            checkValidCell(currentPosInt - 99) && 
            boardStateObj[currentPosInt - 99] !== null && 
            boardStateObj[currentPosInt - 99].includes("Black")
        ) {
            possibleMoves.push(currentPosInt - 99);
        };
    } else if (rightCornerPos.includes(currentPosInt)) { // check whether chess piece is at rightmost column
        if (
            checkValidCell(currentPosInt - 101) && 
            boardStateObj[currentPosInt - 101] !== null && 
            boardStateObj[currentPosInt - 101].includes("Black")
        ) {
            possibleMoves.push(currentPosInt - 101);
        };
    } else {
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
    };
    return possibleMoves;
};

// calculate black pawn moves based on current position
const blackPawnMoveset = (positionIdString) => {
    const currentPosInt = parseInt(positionIdString);
    const possibleMoves = [currentPosInt];

    // check whether black pawn is in default starting position
    if (
        blackPawnDefaultPos.includes(currentPosInt) &&
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
    if (leftCornerPos.includes(currentPosInt)) { // check whether chess piece is at leftmost column
        if (
            checkValidCell(currentPosInt + 101) && 
            boardStateObj[currentPosInt + 101] !== null && 
            boardStateObj[currentPosInt + 101].includes("White")
        ) {
            possibleMoves.push(currentPosInt + 101);
        };
    } else if (rightCornerPos.includes(currentPosInt)) { // check whether chess piece is at rightmost column
        if (
            checkValidCell(currentPosInt + 99) && 
            boardStateObj[currentPosInt + 99] !== null && 
            boardStateObj[currentPosInt + 99].includes("White")
        ) {
            possibleMoves.push(currentPosInt + 99);
        };
    } else {
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
    };
    return possibleMoves;
};

// calculate rook moves based on current position
const rookMoveset = (positionPiece, positionIdString) => {
    const currentPosInt = parseInt(positionIdString);
    const possibleMoves = [currentPosInt];

    // array for all possible movable scenarios
    const rookVerticalMoveset = [
        100, 200, 300, 400, 500, 600, 700
    ];
    const rookHorizontalMoveset = [
        1, 2, 3, 4, 5, 6, 7
    ];

    // determine enemy piece colour
    const enemyColour = checkEnemyColour(positionPiece);

    // check vertical up and down for movable space based on current position
    // + to move down, - to move up
    for (let i = 0; i < rookVerticalMoveset.length; i++) {
        if (checkValidCell(currentPosInt + rookVerticalMoveset[i])) {
            if (boardStateObj[currentPosInt + rookVerticalMoveset[i]] === null) {
                possibleMoves.push(currentPosInt + rookVerticalMoveset[i]);
            } else if (boardStateObj[currentPosInt + rookVerticalMoveset[i]].includes(enemyColour)) {
                possibleMoves.push(currentPosInt + rookVerticalMoveset[i]);
                break;
            } else {
                break;
            };
        };
    };
    for (let i = 0; i < rookVerticalMoveset.length; i++) {
        if (checkValidCell(currentPosInt - rookVerticalMoveset[i])) {
            if (boardStateObj[currentPosInt - rookVerticalMoveset[i]] === null) {
                possibleMoves.push(currentPosInt - rookVerticalMoveset[i]);
            } else if (boardStateObj[currentPosInt - rookVerticalMoveset[i]].includes(enemyColour)) {
                possibleMoves.push(currentPosInt - rookVerticalMoveset[i]);
                break;
            } else {
                break;
            };
        };
    };

    // check horizontal left and right for movable space based on current position
    // + to move right, - to move left
    for (let i = 0; i < rookHorizontalMoveset.length; i++) {
        if (checkValidCell(currentPosInt + rookHorizontalMoveset[i])) {
            if (boardStateObj[currentPosInt + rookHorizontalMoveset[i]] === null) {
                possibleMoves.push(currentPosInt + rookHorizontalMoveset[i]);
            } else if (boardStateObj[currentPosInt + rookHorizontalMoveset[i]].includes(enemyColour)) {
                possibleMoves.push(currentPosInt + rookHorizontalMoveset[i]);
                break;
            } else {
                break;
            };
        };
    };
    for (let i = 0; i < rookHorizontalMoveset.length; i++) {
        if (checkValidCell(currentPosInt - rookHorizontalMoveset[i])) {
            if (boardStateObj[currentPosInt - rookHorizontalMoveset[i]] === null) {
                possibleMoves.push(currentPosInt - rookHorizontalMoveset[i]);
            } else if (boardStateObj[currentPosInt - rookHorizontalMoveset[i]].includes(enemyColour)) {
                possibleMoves.push(currentPosInt - rookHorizontalMoveset[i]);
                break;
            } else {
                break;
            };
        };
    };
    return possibleMoves;
};

// calculate knight moves based on current position
const knightMoveset = (positionPiece, positionIdString) => {
    const currentPosInt = parseInt(positionIdString);
    const possibleMoves = [currentPosInt];

    // array for all possible movable scenarios
    const knightMoveset = [
        -201, -199, -102, -98, 98, 102, 199, 201
    ];

    // determine enemy piece colour
    const enemyColour = checkEnemyColour(positionPiece);

    // check for movable space based on current position
    for (let i = 0; i < knightMoveset.length; i++) {
        if (checkValidCell(currentPosInt + knightMoveset[i])) {
            if (
                boardStateObj[currentPosInt + knightMoveset[i]] === null ||
                boardStateObj[currentPosInt + knightMoveset[i]].includes(enemyColour)
            ) {
                possibleMoves.push(currentPosInt + knightMoveset[i]);
            };
        };
    };
    return possibleMoves;
};

// calculate bishop moves based on current position
const bishopMoveset = (positionPiece, positionIdString) => {
    const currentPosInt = parseInt(positionIdString);
    const possibleMoves = [currentPosInt];

    // array for all possible movable scenarios
    const bishopDiagonalLeftDownMoveset = [
        99, 198, 297, 396, 495, 594, 693,
    ];
    const bishopDiagonalRightDownMoveset = [
        101, 202, 303, 404, 505, 606, 707
    ];

    // determine enemy piece colour
    const enemyColour = checkEnemyColour(positionPiece);

    // check diagonal left down and right up for movable space based on current position
    // + to move diagonal left down, - to move diagonal right up
    for (let i = 0; i < bishopDiagonalLeftDownMoveset.length; i++) {
        if (checkValidCell(currentPosInt + bishopDiagonalLeftDownMoveset[i])) {
            if (boardStateObj[currentPosInt + bishopDiagonalLeftDownMoveset[i]] === null) {
                possibleMoves.push(currentPosInt + bishopDiagonalLeftDownMoveset[i]);
            } else if (boardStateObj[currentPosInt + bishopDiagonalLeftDownMoveset[i]].includes(enemyColour)) {
                possibleMoves.push(currentPosInt + bishopDiagonalLeftDownMoveset[i]);
                break;
            } else {
                break;
            };
        };
    };
    for (let i = 0; i < bishopDiagonalLeftDownMoveset.length; i++) {
        if (checkValidCell(currentPosInt - bishopDiagonalLeftDownMoveset[i])) {
            if (boardStateObj[currentPosInt - bishopDiagonalLeftDownMoveset[i]] === null) {
                possibleMoves.push(currentPosInt - bishopDiagonalLeftDownMoveset[i]);
            } else if (boardStateObj[currentPosInt - bishopDiagonalLeftDownMoveset[i]].includes(enemyColour)) {
                possibleMoves.push(currentPosInt - bishopDiagonalLeftDownMoveset[i]);
                break;
            } else {
                break;
            };
        };
    };

    // check diagonal right down and left up for movable space based on current position
    // + to move diagonal right down, - to move diagonal left up
    for (let i = 0; i < bishopDiagonalRightDownMoveset.length; i++) {
        if (checkValidCell(currentPosInt + bishopDiagonalRightDownMoveset[i])) {
            if (boardStateObj[currentPosInt + bishopDiagonalRightDownMoveset[i]] === null) {
                possibleMoves.push(currentPosInt + bishopDiagonalRightDownMoveset[i]);
            } else if (boardStateObj[currentPosInt + bishopDiagonalRightDownMoveset[i]].includes(enemyColour)) {
                possibleMoves.push(currentPosInt + bishopDiagonalRightDownMoveset[i]);
                break;
            } else {
                break;
            };
        };
    };
    for (let i = 0; i < bishopDiagonalRightDownMoveset.length; i++) {
        if (checkValidCell(currentPosInt - bishopDiagonalRightDownMoveset[i])) {
            if (boardStateObj[currentPosInt - bishopDiagonalRightDownMoveset[i]] === null) {
                possibleMoves.push(currentPosInt - bishopDiagonalRightDownMoveset[i]);
            } else if (boardStateObj[currentPosInt - bishopDiagonalRightDownMoveset[i]].includes(enemyColour)) {
                possibleMoves.push(currentPosInt - bishopDiagonalRightDownMoveset[i]);
                break;
            } else {
                break;
            };
        };
    };
    return possibleMoves;
};

// calculate queen moves based on current position
const queenMoveset = (positionPiece, positionIdString) => {
    const currentPosInt = parseInt(positionIdString);
    const possibleMoves = [currentPosInt];
    
    // queen's moveset is combination of rook + bishop
    const rookPossibleMoves = rookMoveset(positionPiece, positionIdString);
    const bishopPossibleMoves = bishopMoveset(positionPiece, positionIdString);

    // push the calculated rook and bishop possible moves into queen's possible moves array
    for (let i = 0; i < rookPossibleMoves.length; i++) {
        possibleMoves.push(rookPossibleMoves[i]);
    };
    for (let i = 0; i < bishopPossibleMoves.length; i++) {
        possibleMoves.push(bishopPossibleMoves[i]);
    };
    return possibleMoves;
};

// calculate king moves based on current position
const kingMoveset = (positionPiece, positionIdString) => {
    const currentPosInt = parseInt(positionIdString);
    const possibleMoves = [currentPosInt];

    // array for all possible movable scenarios
    const kingMoveset = [
        -101, -100, -99, -1, 1, 99, 100, 101 
    ];

    // determine enemy piece colour
    const enemyColour = checkEnemyColour(positionPiece);

    // check for movable space based on current position
    for (let i = 0; i < kingMoveset.length; i++) {
        if (checkValidCell(currentPosInt + kingMoveset[i])) {
            if (
                boardStateObj[currentPosInt + kingMoveset[i]] === null ||
                boardStateObj[currentPosInt + kingMoveset[i]].includes(enemyColour)
            ) {
                possibleMoves.push(currentPosInt + kingMoveset[i]);
            };
        };
    };
    return possibleMoves;
};

// check if cell is valid key in board state object
const checkValidCell = (key) => key in boardStateObj;

// determine enemy piece colour
const checkEnemyColour = (positionPiece) => {
    if (positionPiece.includes("White")) {
        return "Black";
    } else {
        return "White";
    };
};

// clear all event listeners on all cells 
const resetBoardEventListeners = () => {
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].removeEventListener("click", selectPiece);
        allCells[i].removeEventListener("click", placePiece);
    };
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
    // white player goes first
    playerTurn.playerWhite = true;
    playerWhite.classList.add("player-turn");

    // make player's chess pieces selectable, go to (2) SELECT PIECE STATE
    assignPlayerPiece();
};

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ (1) STARTING STATE ----------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ (2) SELECT PIECE STATE ------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

const selectPiece = (e) => {
    // proceed only if user select a non-empty cell
    if (boardStateObj[e.target.id] !== null) {
        // retrieve target cell's chess piece value
        selectedPieceValue = e.target.innerText;

        // retrieve target cell's id
        selectedPieceId = e.target.id;

        // retrieve target cell's element and add CSS class to indicate selected cell
        selectedPieceElement = document.querySelector(`[id='${e.target.id}']`);
        selectedPieceElement.classList.add("selectedCell");
        selectedPieceElement.classList.remove("hover");

        // chess piece selected, go to (3) PLACE PIECE STATE
        resetBoardEventListeners();        
        assignMoveSpace(boardStateObj[e.target.id], e.target.id);
    };
};

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ (2) SELECT PIECE STATE ------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ (3) PLACE PIECE STATE -------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

const placePiece = (e) => {
    const selectedPiece = boardStateObj[selectedPieceId];
    const targetedPiece = boardStateObj[e.target.id];

    if (!e.target.classList.contains("selectedCell")) {
        // change target cell's board value to be selected chess piece value
        e.target.innerText = selectedPieceValue;

        // remove selected piece initial position's chess piece value
        selectedPieceElement.innerText = "";

        // update board state after placing piece
        boardStateObj[e.target.id] = boardStateObj[selectedPieceId];
        boardStateObj[selectedPieceId] = null;

        // change player turn after player makes a move
        changePlayerTurn();
    };
    // reset all selected piece info 
    selectedPieceValue = null;
    selectedPieceId = null;
    selectedPieceElement.classList.remove("selectedCell");
    selectedPieceElement.classList.add("hover");
    selectedPieceElement = null;

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ (4) END STATE ---------------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

    if (selectedPiece !== "White King" && targetedPiece === "White King") {
        confirm("Player Black Wins!");
        document.querySelector(".container").classList.add("hide-container");
    } else if (selectedPiece !== "Black King" && targetedPiece === "Black King") {
        confirm("Player White Wins!");
        document.querySelector(".container").classList.add("hide-container");
    };

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ (4) END STATE ---------------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

    // chess piece placed at target cell, go to (2) SELECT PIECE STATE
    resetBoardEventListeners();
    assignPlayerPiece()
};

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ (3) PLACE PIECE STATE -------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////