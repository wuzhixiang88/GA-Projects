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

// for making player black as COM player
const playerBlackCtrl = "";

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

// object to keep track of castling requirements
const castlingReqTracker = {
    whiteRookKingSideMoved: false,
    whiteRookQueenSideMoved: false,
    whiteKingFirstMove: false,
    whiteCastlingCells: [805, 806, 807, 802, 803, 804],
    blackRookKingSideMoved: false,
    blackRookQueenSideMoved: false,
    blackKingFirstMove: false,
    blackCastlingCells: [105, 106, 107, 802, 103, 104],
};

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

// object to track eliminated chess piece
const eliminatedPieceTracker = {
    White: {},
    Black: {}
};

// to hold selected piece info
let selectedPiece;
let selectedPieceId;
let selectedCell;

// to hold the cells id that are under attack by the enemy chess piece for the current turn
let currentCellsUnderAtk = [];

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ VARIABLES HOLDING AREA ------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////