var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var fullGame = false; //in beginning game not full
        var grid = new Array(9); //Gameboard exists as 3x3 array

        function processEvent(event) {
            if(event.type == 'GameJoined') {
                fullGame = true;
            }

            if(event.type == 'MovePlaced') {
                grid[event.pos] = event.side
            }
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        processEvents(history);

        return {
            processEvents: processEvents
        }
    };
};

 
+
+            if(event.type == "MovePlaced")
+            {
+                grid[event.pos] = event.side
+            }
+
         }
 
         function processEvents(history) {
@@ -19,9 +29,14 @@ module.exports = function (injected) {
             return gamefull;
         }
 
+        function occupiedPos(pos){
+            return grid[pos] != null;
+        }
+
         processEvents(history);
 
         return {
+            occupiedPos:occupiedPos,
             gameFull:gameFull,
             processEvents: processEvents
         }
