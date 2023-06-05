const tiles = Array.from($(".tile"));
// console.log(tiles);
const playerDislay = $(".display-player");
const resetButton = $(".reset");
const announcer = $(".announcer");


let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const PLAYERX_WON="PLAYERX_WON";
const PLAYERO_WON="PLAYERO_WON";
const TIE="TIE";

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winningCondition = winningConditions[i];
        const a = board[winningCondition[0]];
        const b = board[winningCondition[1]];
        const c = board[winningCondition[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return;
    }
    if (!board.includes("")) {
        announce(TIE);
    }
}

const announce = (type) => {
    switch (type) {
        case PLAYERO_WON:
            announcer.html(`Player <span class="playerO">O</span> won`);
            break;
        case PLAYERX_WON:
            announcer.html(`Player <span class="playerX">X</span> won`);
            break;
        case TIE:
            announcer.text("Tie");
    }
    announcer.removeClass("hide");
}

const isValidAction = (tile) => {
    if ($(tile).text() === 'X' || $(tile).text() === 'O') {
        return false;
    }
    return true;
};

const updateBoard=(index)=>{
    board[index]=currentPlayer;
}

const changePlayer = () => {
    playerDislay.removeClass(`player${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerDislay.text(currentPlayer);
    playerDislay.addClass(`player${currentPlayer}`);
}


const userAction = (tile, index) => {
    if (isValidAction(tile) && isGameActive) {
        $(tile).text(currentPlayer);
        $(tile).addClass(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
}

const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;

    announcer.addClass("hide");

    if(currentPlayer==="O"){
        changePlayer();
    }

    tiles.forEach((tile)=>{
        $(tile).text("");
        $(tile).removeClass("playerX");
        $(tile).removeClass("playerO");
    });
}

tiles.forEach((tile, index) => {
    $(tile).on("click", () => {
        userAction(tile, index);
    });
});


resetButton.on("click", resetBoard);