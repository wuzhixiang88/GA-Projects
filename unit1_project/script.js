////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ VARIABLES HOLDING AREA ------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

// variables for the chess board table and players' div
const chessBoard = document.querySelector(".chess-board");
const whitePlayer = document.querySelector(".white-player");
const blackPlayer = document.querySelector(".black-player");

// variables to hold selected piece info
let selectedPieceValue;
let selectedPieceId;
let selectedPieceElement;

const playerTurn = {
    whitePlayer: false,
    blackPlayer: false
};

// starting board state - will change according to how the chess pieces move when the game is being played
const boardStateObj = {
    "0": "Black Rook", "1": "Black Knight", "2": "Black Bishop", "3": "Black Queen", "4": "Black King", "5": "Black Bishop", "6": "Black Knight", "7": "Black Rook",
    "8": "Black Pawn", "9": "Black Pawn", "10": "Black Pawn", "11": "Black Pawn", "12": "Black Pawn", "13": "Black Pawn", "14": "Black Pawn", "15": "Black Pawn",
    "16": null, "17": null, "18": null, "19": null, "20": null, "21": null, "22": null, "23": null,
    "24": null, "25": null, "26": null, "27": null, "28": null, "29": null, "30": null, "31": null,
    "32": null, "33": null, "34": null, "35": null, "36": null, "37": null, "38": null, "39": null,
    "40": null, "41": null, "42": null, "43": null, "44": null, "45": null, "46": null, "47": null,
    "48": "White Pawn", "49": "White Pawn", "50": "White Pawn", "51": "White Pawn", "52": "White Pawn", "53": "White Pawn", "54": "White Pawn", "55": "White Pawn",
    "56": "White Rook", "57": "White Knight", "58": "White Bishop", "59": "White Queen", "60": "White King", "61": "White Bishop", "62": "White Knight", "63": "White Rook"
};

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ VARIABLES HOLDING AREA ------------------------------*/
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
        chessBoard.removeEventListener("click", selectPiece);
        chessBoard.addEventListener("click", placePiece);
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
    }; 
    // reset all selected piece info 
    selectedPieceValue = null;
    selectedPieceId = null;
    selectedPieceElement.classList.remove("selectedCell");
    selectedPieceElement.classList.add("hover");
    selectedPieceElement = null;

    // chess piece placed at target cell, go to (2) SELECT PIECE STATE
    chessBoard.removeEventListener("click", placePiece);
    chessBoard.addEventListener("click", selectPiece);
    
    playerTurnChange();
};

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ (3) PLACE PIECE STATE -------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ (1) STARTING STATE ----------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

window.onload = () => {
    // white player goes first
    playerTurn.whitePlayer = true;
    whitePlayer.classList.add("player-turn");

    // waiting for chess piece to be selected, go to (2) SELECT PIECE STATE
    chessBoard.addEventListener("click", selectPiece);
};

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ (1) STARTING STATE ----------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ HELPER FUNCTIONS ------------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

const playerTurnChange = () => {
    if (playerTurn.whitePlayer) {

        playerTurn.whitePlayer = false;
        playerTurn.blackPlayer = true;

        whitePlayer.classList.remove("player-turn");
        blackPlayer.classList.add("player-turn");

    } else {

        playerTurn.whitePlayer = true;
        playerTurn.blackPlayer = false;

        blackPlayer.classList.remove("player-turn");
        whitePlayer.classList.add("player-turn");
    }
};

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ HELPER FUNCTIONS ------------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////