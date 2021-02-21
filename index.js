// I created a game of tic-tac-toe.
// a.	The heading says whether it is X’s or O’s turn or if the game is over
// b.	When a cell in the grid is clicked, an X or O should appears in that spot depending on whose turn it is.
// c.	Clicking the Reset button clears the grid and restart the game.
// d.	When a player has won, or the board is full and the game results in a draw, a Bootstrap banner appears across the screen announcing the winner.

// When playingO is true, it is O's turn. When false, it is X's turn.
let playingO = true;

// winningPlayer is O if O won, X if X won, or null if no one has won the game.
let winningPlayer = null;

// The list of cell combinations that if captured by a player win the game.
let winning_positions =[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

// Update the header and banner
updateHeader();
updateBanner();

// For each cell in the table add a click handler.
document.querySelectorAll('table td')
.forEach(e => e.addEventListener("click", event => {
    // Get the cell that was clicked on. 
    let td = event.target;

    // If the game isn't over and the cell is empty then proceed
    if (!isGameOver() && td.innerHTML == "") {
        // If it is O's turn then set the cell to O. Otherwise, set the cell to X.
        td.innerHTML = playingO? "O": "X";

        // Toggle the player.
        playingO = !playingO;

        // Check the status of the game and update the header and banner.
        checkGameStatus();
        updateHeader();
        updateBanner();
    }
}));

// Add a click handler for the Reset button
$("#reset").click(function() {
    // Clear the text in every table cell.
    document.querySelectorAll('table td').forEach(td => { td.innerHTML = ""; });

    // Check the status of the game and update the header and banner.
    checkGameStatus();
    updateHeader();
    updateBanner();
});

// Update the header with the player and game status
function updateHeader() {
    document.getElementById("header").innerHTML = isGameOver()? "Game Over": `${playingO? "O": "X"}'s Turn`;
}

// Update the banner with the status of the game
function updateBanner() {
    // If there is a winning player then display that player
    if (winningPlayer) {
        document.getElementById("banner").innerHTML = `Game Over - Winner is ${winningPlayer}`;
    }

    // Display "No Winner" if the table is full
    else if (isTableFull()) {
        document.getElementById("banner").innerHTML = "Game Over - No Winner";
    }

    // Otherwise, clear the banner
    else {
        document.getElementById("banner").innerHTML = "";
    }

    // Display the banner if the game is over
    if (isGameOver()) {
        $("#banner").removeClass('hidden');
    } else {
        $("#banner").addClass('hidden');
    }
}

// Returns true if the game is over
function isGameOver() {
    return isTableFull() || winningPlayer != null;
}

// Checks the game status
function checkGameStatus() {
    tableFull = isTableFull();
    if (checkForWinner("O")) {
        winningPlayer = "O";
    }
    else if (checkForWinner("X")) {
        winningPlayer = "X";
    }
    else {
        winningPlayer = null;
    }
}

// Checks if the table is full
function isTableFull() {
    return [...document.querySelectorAll('table td')].filter(td => td.innerHTML == "").length == 0;
}

// Check if the specified player is a winner of the game
function checkForWinner(player) {
    let win = false;

    // Check each combination of winning cells and check to see if the player has
    // captured that combination.
    for (var winIndexArray of winning_positions) {
        win = (document.getElementById(winIndexArray[0]).innerHTML == player) &&
                (document.getElementById(winIndexArray[1]).innerHTML == player) &&
                (document.getElementById(winIndexArray[2]).innerHTML == player);
        if (win) break;
    }

    return win;
}