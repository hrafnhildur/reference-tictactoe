var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var fullGame = false; //in beginning game not full
        var grid = new Array(9); //Gameboard exists as 3x3 array

        function processEvent(event) {
            if(event.type == "GameJoined") { //if one joins game, change stateto fullGame
                fullGame = true;
            }

            if(event.type == "MovePlaced") {
                grid[event.pos] = event.side //make mark
            }
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

        processEvents(history);

        return {
            occupiedPos:occupiedPos,
            fullGame:fullGame,
            processEvents:processEvents
        }
    };
};