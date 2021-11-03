# English Chess
An English Chess game meant for 2 human players (hotseat) or 1 human player vs COM.

![image](https://user-images.githubusercontent.com/78526590/127293604-d395b4ae-7438-4a89-b471-dcb67f358380.png)

## Program Flow
The general program flow is shown below, consisting of 3 main program states.

#### Starting State
- On window load, the game will be initialized and based on current player's turn, the program will assign the player's chess pieces for selection. White player always goes first.

#### Select Piece State
- Player are only allowed to select own chess pieces and is able to unselect the chess piece by clicking on it again.

#### Place Piece State
- Players are allowed to make a move by clicking on a movable cell based on the selected chess piece.

#### Test Checkmate
- After each player makes a move, the program will test for checkmate. 

- If it returns true, the game ends and the player making the check move will be declared the winner via an alert prompt window, else, the program changes the player turn and goes back to Select Piece State.

![image](https://user-images.githubusercontent.com/78526590/127288462-01400209-689f-4b47-a195-630d895b357e.png)

## Features Implemented

#### Basic Features
- When King is in check, player must resolve the check on current move, otherwise an alert prompt will be triggered to inform that the King is in check.
- Player may not make a move that result in own King in check, otherwise an alert prompt will be triggered to inform that the move is an illegal move.
- Game ends when either king is checkmated, the king can never be captured.

#### Special Moves
- Pawn promotion to Queen when it reaches the furthest rank.
- Castling (Kingside and Queenside).

#### COM Player
- The game is playable with 1 human player vs a COM player. The current COM player randomly selects a chess piece and randomly picks a movable cell to move.

#### Miscellaneous
- Show movable cells for selected chess piece.
<p align="left">
<img src="https://i.imgur.com/giDWWrl.png" />
</p>

- Show captured chess pieces.
<p align="left">
<img src="https://i.imgur.com/MqrgPtE.png" />
</p>

## Features (Work In Progress)
- Stalemate (Currently Stalemate is being treated as Checkmate when a player runs out of legal moves)
- En Passant (Pawn Special Move)
- Remote Play for 2 Players
- Higher Level COM Player
