var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var gameFull = false; //in beginning game not full
        var grid = new Array(9); //Gameboard exists as 3x3 array
        var playersTurn = 'X';

        function processEvent(event) {
            if(event.type == "GameJoined") { //if one joins game, change stateto fullGame
                gameFull = true;
            }

            if(event.type == "MovePlaced") {
                grid[event.pos] = event.side //make mark
            }
            swapPlayers();
        }

        function processEvents(history) {
             _.each(history, processEvent);
        }
 
         function gameFull() {
            return gameFull;
        }

        function occupiedPos(pos) {
            return grid[pos] != null;
        }

        function swapPlayers() {
            if (playersTurn == 'X'){
                playersTurn = 'O';
            }
            else {
                playersTurn = 'X';
            }
        }
        //Checks if any of possible wins are true
        function gameWon(event) {
            if (horizontalWin(event) == true || diagonalWin(event) == true || verticalWin(event) == true) {
                return true;
            }
        }
        //Checks if all boxes are full, must be returned after gameWon
        function gameDraw(event){
            grid[event.pos] = event.side;

            for (var i = 0; i < grid.length; i++){
                if (grid[i] == null){
                    return false;
                }
            }
            return true;
        }

        function horizontalWin(event) {
            for (var i = 0; i < board.length; i+=3){
                if (board[i] == playerTurn && board[i+1] == playerTurn && board[i+2] == playerTurn){
                    return true;
                }
            }
            return false;
        } 

        function diagonalWin(event) {
            if (board[0] == playerTurn && board[4] == playerTurn && board[8] == playerTurn){
                return true;
            }
            if (board[2] == playerTurn && board[4] == playerTurn && board[6] == playerTurn){
                return true;
            }
            return false;
        } 

        function verticalWin(event) {
            for (var i = 0; i < board.length-6; i++){
                if (board[i] == playerTurn && board[i+3] == playerTurn && board[i+6] == playerTurn){
                    return true;
                }
            }
            return false;
        }


        processEvents(history);

        return {
            gameFull:gameFull,
            processEvents:processEvents,
            occupiedPos:occupiedPos,
            gameWon:gameWon,
            gameDraw:gameDraw
        }
    };
};