document.addEventListener("DOMContentLoaded", function () {
  let currentPlayer = "X"; // Start with X as the first player
  const squares = document.querySelectorAll(".square");
  const status = document.getElementById("status");

  // Create an array to represent the current state of the game board
  const boardState = ["", "", "", "", "", "", "", "", ""];

  // Define the winning combinations for Tic-Tac-Toe
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  // Function to check for a win
  function checkWin() {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        const winner = boardState[a];
        status.textContent = `Congratulations! ${winner} is the Winner! 🎉`;
        status.classList.add("you-won");
        return true;
      }
    }
    return false;
  }

  // Function to check for a tie
  function checkTie() {
    if (boardState.every((square) => square !== "")) {
      status.textContent = "It's a tie!";
      status.classList.add("you-won");
      return true;
    }
    return false;
  }

  squares.forEach((square, index) => {
    square.addEventListener("click", () => {
      if (!boardState[index] && !status.classList.contains("you-won")) {
        boardState[index] = currentPlayer; // Update the board state

        square.classList.add(currentPlayer); // Add the class X or O to the square
        square.textContent = currentPlayer; // Display X or O in the square

        if (checkWin() || checkTie()) {
          // Game is won or tied, prevent further moves
          squares.forEach((sq) => sq.classList.add("disabled"));
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch to the other player
          status.textContent = `Player ${currentPlayer}'s turn`;
        }
      }
    });
  });

  // Function to start a new game
  function newGame() {
    boardState.fill(""); // Reset the board state
    squares.forEach((square) => {
      square.classList.remove("X", "O", "disabled"); // Remove class and text content
      square.textContent = "";
    });
    status.textContent = "Move your mouse over a square and click to play an X or an O.";
    status.classList.remove("you-won");
    currentPlayer = "X"; // Start with X as the first player
  }

  const newGameButton = document.querySelector(".btn");
  newGameButton.addEventListener("click", newGame);
});