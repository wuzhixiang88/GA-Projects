////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ MOVESET FUNCTIONS -----------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////

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
                if (
                    forCellsUnderAtk &&
                    boardObject[currentPosInt + rookVerticalMoveset[i]].includes(`${enemyColour} King`)
                ) {
                    if (
                        checkValidCell(currentPosInt + rookVerticalMoveset[i] + 100) && 
                        boardObject[currentPosInt + rookVerticalMoveset[i] + 100] === null
                    ) {
                        possibleMoves.push(currentPosInt + rookVerticalMoveset[i] + 100);
                    };
                }; 
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
                if (
                    forCellsUnderAtk &&
                    boardObject[currentPosInt - rookVerticalMoveset[i]].includes(`${enemyColour} King`)
                ) {
                    if (
                        checkValidCell(currentPosInt - rookVerticalMoveset[i] - 100) && 
                        boardObject[currentPosInt - rookVerticalMoveset[i] - 100] === null
                    ) {
                        possibleMoves.push(currentPosInt - rookVerticalMoveset[i] - 100);
                    };
                };
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
                if (
                    forCellsUnderAtk &&
                    boardObject[currentPosInt + rookHorizontalMoveset[i]].includes(`${enemyColour} King`)
                ) {
                    if (
                        checkValidCell(currentPosInt + rookHorizontalMoveset[i] + 1) && 
                        boardObject[currentPosInt + rookHorizontalMoveset[i] + 1] === null
                    ) {
                        possibleMoves.push(currentPosInt + rookHorizontalMoveset[i] + 1);
                    };
                }; 
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
                if (
                    forCellsUnderAtk &&
                    boardObject[currentPosInt - rookHorizontalMoveset[i]].includes(`${enemyColour} King`)
                ) {
                    if (
                        checkValidCell(currentPosInt - rookHorizontalMoveset[i] - 1) && 
                        boardObject[currentPosInt - rookHorizontalMoveset[i] - 1] === null
                    ) {
                        possibleMoves.push(currentPosInt - rookHorizontalMoveset[i] - 1);
                    };
                }; 
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
                if (
                    forCellsUnderAtk &&
                    boardObject[currentPosInt + bishopDiagonalLeftDownMoveset[i]].includes(`${enemyColour} King`)
                ) {
                    if (
                        checkValidCell(currentPosInt + bishopDiagonalLeftDownMoveset[i] + 99) && 
                        boardObject[currentPosInt + bishopDiagonalLeftDownMoveset[i] + 99] === null
                    ) {
                        possibleMoves.push(currentPosInt + bishopDiagonalLeftDownMoveset[i] + 99);
                    };
                }; 
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
                if (
                    forCellsUnderAtk &&
                    boardObject[currentPosInt - bishopDiagonalLeftDownMoveset[i]].includes(`${enemyColour} King`)
                ) {
                    if (
                        checkValidCell(currentPosInt - bishopDiagonalLeftDownMoveset[i] - 99) && 
                        boardObject[currentPosInt - bishopDiagonalLeftDownMoveset[i] - 99] === null
                    ) {
                        possibleMoves.push(currentPosInt - bishopDiagonalLeftDownMoveset[i] - 99);
                    };
                }; 
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
                if (
                    forCellsUnderAtk &&
                    boardObject[currentPosInt + bishopDiagonalRightDownMoveset[i]].includes(`${enemyColour} King`)
                ) {
                    if (
                        checkValidCell(currentPosInt + bishopDiagonalRightDownMoveset[i] + 101) && 
                        boardObject[currentPosInt + bishopDiagonalRightDownMoveset[i] + 101] === null
                    ) {
                        possibleMoves.push(currentPosInt + bishopDiagonalRightDownMoveset[i] + 101);
                    };
                }; 
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
                if (
                    forCellsUnderAtk &&
                    boardObject[currentPosInt - bishopDiagonalRightDownMoveset[i]].includes(`${enemyColour} King`)
                ) {
                    if (
                        checkValidCell(currentPosInt - bishopDiagonalRightDownMoveset[i] - 101) && 
                        boardObject[currentPosInt - bishopDiagonalRightDownMoveset[i] - 101] === null
                    ) {
                        possibleMoves.push(currentPosInt - bishopDiagonalRightDownMoveset[i] - 101);
                    };
                }; 
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

// calculate king moves based on current position
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

    // push castling moves into the possible moves array if castling requirements are fulfilled
    if (checkCastlingReqKingSide(playerTurn["current"])) {
        possibleMoves.push(currentPosInt + 2);
    };
    if (checkCastlingReqQueenSide(playerTurn["current"])) {
        possibleMoves.push(currentPosInt - 2);
    };
    return possibleMoves;
};

////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------ MOVESET FUNCTIONS -----------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////