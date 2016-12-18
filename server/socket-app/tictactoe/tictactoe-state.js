var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var fullGame = false; //in beginning game not full
        var grid = new Array(9); //Gameboard exists as 3x3 array
        var playersTurn = 'X';

        function processEvent(event) {
            if(event.type == "GameJoined") { //if one joins game, change stateto fullGame
                fullGame = true;
            }

            if(event.type == "MovePlaced") {
                grid[event.pos] = event.side //make mark
            }
            swapPlayers();
        }

        function processEvents(history) {
             _.each(history, processEvent);
        }
 
         function fullGame() {
            return fullGame;
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
            return false;
        } 

        function diagonalWin(event) {
            return false;
        } 

        function verticalWin(event) {
            return false;
        }


        processEvents(history);

        return {
            fullGame:fullGame,
            processEvents:processEvents,
            occupiedPos:occupiedPos,
            gameWon:gameWon,
            gameDraw:gameDraw
        }
    };
};