////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ CASTLING FUNCTIONS ----------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

// checking if castle king side is legal
const checkCastlingReqKingSide = (playerTurn) => {
    playerTurnLower = playerTurn.toLowerCase();
    if (
        !castlingReqTracker[`${playerTurnLower}RookKingSideMoved`] && 
        !castlingReqTracker[`${playerTurnLower}KingFirstMove`] &&
        !currentCellsUnderAtk.includes(castlingReqTracker[`${playerTurnLower}CastlingCells`][0]) &&
        !currentCellsUnderAtk.includes(castlingReqTracker[`${playerTurnLower}CastlingCells`][1]) &&
        !currentCellsUnderAtk.includes(castlingReqTracker[`${playerTurnLower}CastlingCells`][2]) &&
        boardStateObj[castlingReqTracker[`${playerTurnLower}CastlingCells`][1]] === null &&
        boardStateObj[castlingReqTracker[`${playerTurnLower}CastlingCells`][2]] === null
    ) {
        return true;
    } else {
        return false;
    }
};

// checking if castle queen side is legal
const checkCastlingReqQueenSide = (playerTurn) => {
    playerTurnLower = playerTurn.toLowerCase();
    if (
        !castlingReqTracker[`${playerTurnLower}RookQueenSideMoved`] && 
        !castlingReqTracker[`${playerTurnLower}KingFirstMove`] &&
        !currentCellsUnderAtk.includes(castlingReqTracker[`${playerTurnLower}CastlingCells`][0]) &&
        !currentCellsUnderAtk.includes(castlingReqTracker[`${playerTurnLower}CastlingCells`][4]) &&
        !currentCellsUnderAtk.includes(castlingReqTracker[`${playerTurnLower}CastlingCells`][5]) &&
        boardStateObj[castlingReqTracker[`${playerTurnLower}CastlingCells`][3]] === null &&
        boardStateObj[castlingReqTracker[`${playerTurnLower}CastlingCells`][4]] === null &&
        boardStateObj[castlingReqTracker[`${playerTurnLower}CastlingCells`][5]] === null
    ) {
        return true;
    } else {
        return false;
    }
};

// perform castle king side
const castleKingSide = () => {
    if (playerTurn["current"] === "White") {
        document.querySelector(`[id='806']`).innerHTML = "&#9814";
        document.querySelector(`[id='808']`).innerHTML = "";
        boardStateObj["806"] = "White Rook";
        boardStateObj["808"] = null;

        castlingReqTracker["whiteRookFirstMove"] = true
        castlingReqTracker["whiteKingFirstMove"] = true
    } else {
        document.querySelector(`[id='106']`).innerHTML = "&#9820";
        document.querySelector(`[id='108']`).innerHTML = "";
        boardStateObj["106"] = "Black Rook";
        boardStateObj["108"] = null;
    
        castlingReqTracker["blackRookFirstMove"] = true
        castlingReqTracker["blackKingFirstMove"] = true
    }

};

// perform castle queen side
const castleQueenSide = () => {
    if (playerTurn["current"] === "White") {
        document.querySelector(`[id='804']`).innerHTML = "&#9814";
        document.querySelector(`[id='801']`).innerHTML = "";
        boardStateObj["804"] = "White Rook";
        boardStateObj["801"] = null;

        castlingReqTracker["whiteRookFirstMove"] = true
        castlingReqTracker["whiteKingFirstMove"] = true
    } else {
        document.querySelector(`[id='104']`).innerHTML = "&#9820";
        document.querySelector(`[id='101']`).innerHTML = "";
        boardStateObj["104"] = "Black Rook";
        boardStateObj["101"] = null;
    
        castlingReqTracker["blackRookFirstMove"] = true
        castlingReqTracker["blackKingFirstMove"] = true
    }

};

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ CASTLING FUNCTIONS ----------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////