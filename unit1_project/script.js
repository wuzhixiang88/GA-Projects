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
    "0": "Black Rook", "1": "Black Knight", "2": "Black Bishop", "3": "Black Queen", "4": "Black King", "5": "Black Bishop", "6": "Black Knight", "7": "Black Rook",
    "8": "Black Pawn", "9": "Black Pawn", "10": "Black Pawn", "11": "Black Pawn", "12": "Black Pawn", "13": "Black Pawn", "14": "Black Pawn", "15": "Black Pawn",
    "16": null, "17": null, "18": null, "19": null, "20": null, "21": null, "22": null, "23": null,
    "24": null, "25": null, "26": null, "27": null, "28": null, "29": null, "30": null, "31": null,
    "32": null, "33": null, "34": null, "35": null, "36": null, "37": null, "38": null, "39": "Black Pawn",
    "40": null, "41": null, "42": null, "43": null, "44": null, "45": null, "46": null, "47": null,
    "48": "White Pawn", "49": "White Pawn", "50": "White Pawn", "51": "White Pawn", "52": "White Pawn", "53": "White Pawn", "54": "White Pawn", "55": "White Pawn",
    "56": "White Rook", "57": "White Knight", "58": "White Bishop", "59": "White Queen", "60": "White King", "61": "White Bishop", "62": "White Knight", "63": "White Rook"
};

// position arrays to help determine chess piece's possible move space
const leftCornerPos = [
    0, 8, 16, 24, 32, 40, 48, 56
];
const rightCornerPos = [
    7, 15, 23, 31, 39, 47, 55, 63
];
const whitePawnDefaultPos = [
    48, 49, 50, 51, 52, 53, 54 ,55
];
const blackPawnDefaultPos = [
    8, 9, 10, 11, 12, 13, 14, 15
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

    if (positionPiece === "White Pawn") {
        possibleMoveSpace = whitePawnMoves(positionIdString);
    } else if (positionPiece === "Black Pawn") {
        possibleMoveSpace = blackPawnMoves(positionIdString);
    }    

    for (let i = 0; i < possibleMoveSpace.length; i++) {
        document.querySelector(`[id='${possibleMoveSpace[i]}']`).addEventListener("click", placePiece);
    };

    // for (let i = 0; i < allCells.length; i++) {
    //     allCells[i].addEventListener("click", placePiece)
    // };
};

const whitePawnMoves = (positionIdString) => {
    const currentPos = parseInt(positionIdString);
    const possibleMoves = [currentPos];

    if (whitePawnDefaultPos.includes(currentPos)) { // check whether white pawn is in default starting position
        if (boardStateObj[(currentPos - 16).toString()] === null) { //pawn can move forward 2 space if at default starting position
            possibleMoves.push(currentPos - 16);
        };
    }; 
    // white pawn default moveset
    if (boardStateObj[(currentPos - 8).toString()] === null) {
        possibleMoves.push(currentPos - 8);
    };

    if (leftCornerPos.includes(currentPos)) { // check whether chess piece is at leftmost column
        if (boardStateObj[(currentPos - 7).toString()] !== null) {
            possibleMoves.push(currentPos - 7);
        };
    } else if (rightCornerPos.includes(currentPos)) { // check whether chess piece is at rightmost column
        if (boardStateObj[(currentPos - 9).toString()] !== null) {
            possibleMoves.push(currentPos - 9);
        };
    } else {
        if (boardStateObj[(currentPos - 7).toString()] !== null) {
            possibleMoves.push(currentPos - 7);
        };
        if (boardStateObj[(currentPos - 9).toString()] !== null) {
            possibleMoves.push(currentPos - 9);
        };
    };
    return possibleMoves;
};

const blackPawnMoves = (positionIdString) => {
    const currentPos = parseInt(positionIdString);
    const possibleMoves = [currentPos];

    if (blackPawnDefaultPos.includes(currentPos)) { // check whether black pawn is in default starting position
        if (boardStateObj[(currentPos + 16).toString()] === null) { //pawn can move forward 2 space if at default starting position
            possibleMoves.push(currentPos + 16);
        };
    }; 
    // black pawn default moveset
    if (boardStateObj[(currentPos + 8).toString()] === null) {
        possibleMoves.push(currentPos + 8);
    };

    if (leftCornerPos.includes(currentPos)) { // check whether chess piece is at leftmost column
        if (boardStateObj[(currentPos + 9).toString()] !== null) {
            possibleMoves.push(currentPos + 9);
        };
    } else if (rightCornerPos.includes(currentPos)) { // check whether chess piece is at rightmost column
        if (boardStateObj[(currentPos + 7).toString()] !== null) {
            possibleMoves.push(currentPos + 7);
        };
    } else {
        if (boardStateObj[(currentPos + 9).toString()] !== null) {
            possibleMoves.push(currentPos + 9);
        };
        if (boardStateObj[(currentPos + 7).toString()] !== null) {
            possibleMoves.push(currentPos + 7);
        };
    };
    return possibleMoves;
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
        // retrieve target cell's board value
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
    if (!e.target.classList.contains("selectedCell")) {
        // change target cell's board value to be selected piece value
        e.target.innerText = selectedPieceValue;

        // remove selected piece initial position's board value
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

    // chess piece placed at target cell, go to (2) SELECT PIECE STATE
    resetBoardEventListeners();
    assignPlayerPiece()
};

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ (3) PLACE PIECE STATE -------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////