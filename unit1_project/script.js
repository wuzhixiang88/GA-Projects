// variable to hold all 64 cells of the chess board
const allCells = document.querySelectorAll("td");

/*------------------------------ Basic Movement ------------------------------*/
let selectedPieceValue;
let selectedPieceId;
let selectedPieceElement;

const selectPiece = (e) => {
    // retrieve target cell's board value
    selectedPieceValue = e.target.innerText;

    // retrieve target cell's id
    selectedPieceId = e.target.id;

    // retrieve target cell's element and add CSS class to indicate selected cell
    selectedPieceElement = document.querySelector(`[id='${e.target.id}']`);
    selectedPieceElement.classList.add("selectedCell");

    // remove event listener for selecting pieces
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].removeEventListener("click", selectPiece);
    };
    
    // attach event listener for placing pieces
    for (let i = 0; i < allCells.length; i++) {
        allCells[[i]].addEventListener("click", placePiece)
    };
};

const placePiece = (e) => {
    // change target cell's board value to be selectedPieceValue
    e.target.innerText = selectedPieceValue;

    // remove selectedPiece's initial position's board value and CSS class for selected cell
    selectedPieceElement.innerText = "";
    selectedPieceElement.classList.remove("selectedCell");

    // reset all selectedPiece info 
    selectedPieceValue;
    selectedPieceId;
    selectedPieceElement;

    // remove event listener for placing pieces
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].removeEventListener("click", placePiece);
    };

    // attach event listener for selecting pieces
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].addEventListener("click", selectPiece)
    };
};

// waiting for pieces to be selected
for (let i = 0; i < allCells.length; i++) {
    allCells[i].addEventListener("click", selectPiece)
};
/*------------------------------ Basic Movement ------------------------------*/