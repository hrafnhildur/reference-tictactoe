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

        function thisPlayersTurn(side) {
            return(side == playersTurn);
        }

        //Checks if any of possible wins are true
        function gameWin(event) {
            if (horizontalWin(event) || diagonalWin(event) || verticalWin(event)) {
                return true;
            }
        }
        //Checks if all boxes are full, must be returned after gameWon
        function gameDraw(event) {
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
                if (grid[i] == event.side && grid[i+1] == event.side && grid[i+2] == event.side){
                    return true;
                }
            }
            return false;
        } 

        function diagonalWin(event) {
            if (grid[0] == event.side && grid[4] == event.side && grid[8] == event.side){
                return true;
            }
            if (grid[2] == event.side && grid[4] == event.side && grid[6] == event.side){
                return true;
            }
            return false;
        } 

        function verticalWin(event) {
            for (var i = 0; i < grid.length-6; i++){
                if (grid[i] == event.side && grid[i+3] == event.side && grid[i+6] == event.side){
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
            thisPlayersTurn:thisPlayersTurn,
            gameWin:gameWin,
            gameDraw:gameDraw
        }
    };
};