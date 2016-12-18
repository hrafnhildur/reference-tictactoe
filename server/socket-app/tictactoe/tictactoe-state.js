var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var isFull = false; //in beginning game not full
        var grid = new Array(9); //Gameboard exists as 3x3 array
        var playersTurn = 'X';

        function processEvent(event) {
            if(event.type == "GameJoined") { //if one joins game, change stateto fullGame
                isFull = true;
            }

            if(event.type == "MovePlaced") {
                grid[event.pos] = event.side //make mark
                swapPlayers();
            }
        }

        function processEvents(history) {
             _.each(history, processEvent);
        }
 
        function gameFull() {
            return isFull;
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
        function gameWin(event) {
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
            for (var i = 0; i < grid.length; i+=3){
                if (grid[i] == playersTurn && grid[i+1] == playersTurn && grid[i+2] == playersTurn){
                    return true;
                }
            }
            return false;
        } 

        function diagonalWin(event) {
            if (grid[0] == playersTurn && grid[4] == playersTurn && grid[8] == playersTurn){
                return true;
            }
            if (grid[2] == playersTurn && grid[4] == playersTurn && grid[6] == playersTurn){
                return true;
            }
            return false;
        } 

        function verticalWin(event) {
            for (var i = 0; i < grid.length-6; i++){
                if (grid[i] == playersTurn && grid[i+3] == playersTurn && grid[i+6] == playersTurn){
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
            gameWin:gameWin,
            gameDraw:gameDraw
        }
    };
};