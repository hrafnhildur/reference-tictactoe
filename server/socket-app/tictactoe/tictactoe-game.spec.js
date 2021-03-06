var should = require('should');
var _ = require('lodash');

var TictactoeState = require('./tictactoe-state')(inject({}));

var tictactoe = require('./tictactoe-handler')(inject({
    TictactoeState
}));

var createEvent = {
    type: "GameCreated",
    user: {
        userName: "TheGuy"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};

var joinEvent = {
    type: "GameJoined",
    user: {
        userName: "Gummi"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};


describe('create game command', function() {


    var given, when, then;

    beforeEach(function(){
        given=undefined;
        when=undefined;
        then=undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function(actualEvents){
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit game created event', function(){

        given = [];
        when =
        {
            id:"123987",
            type: "CreateGame",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        };
        then = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            }
        ];

    })
});


describe('join game command', function () {


    var given, when, then;

    beforeEach(function () {
        given = undefined;
        when = undefined;
        then = undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function (actualEvents) {
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit game joined event...', function () {

        given = [{
            type: "GameCreated",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }
        ];
        when =
        {
            type: "JoinGame",
            user: {
                userName: "Gummi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        };
        then = [
            {
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'O'
            }
        ];

    });

    it('should emit FullGameJoinAttempted event when game full', function (){
        given = [{
            type: "GameCreated",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        },
        {
            type: "GameJoined",
            user: {
                userName: "Gummi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }];
        when = 
            {
                type: "JoinGame",
                user: {
                    userName: "Kalli"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side:'O'
            };
        then = [
            {
                type: "FullGameJoinAttempted",
                user: {
                    userName: "Kalli"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29"
            }];
    });
});

/**************** Unit Tests For Placing moves *********************************/

describe('place a move command', function () {
    var given, when, then;

    beforeEach(function () {
        given = undefined;
        when = undefined;
        then = undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function (actualEvents) {
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });

    it('should mark grid[0,0] with X, MovePlaced', function () {
        given = [{
            type: "GameCreated",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        },
        {
            type: "GameJoined",
            user: {
                userName: "Gummi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }];
        when = 
            {
                type: "PlaceMove",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                pos: 0,
                side:'X'
            };
        then = [
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                pos: 0,
                side: 'X'
            }];
    });

    it('should mark grid[1,1] with X, MovePlaced', function () {
            given = [{
            type: "GameCreated",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        },
        {
            type: "GameJoined",
            user: {
                userName: "Gummi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }];
        when = 
            {
                type: "PlaceMove",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                pos: 4,
                side:'X'
            };
        then = [
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                pos: 4,
                side: 'X'
            }];
    });

    it('should mark grid[2,2] with O, MovePlaced', function () {
            given = [{
            type: "GameCreated",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        },
        {
            type: "GameJoined",
            user: {
                userName: "OtherGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        },
        {
            type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                pos: "0",
                side: "X"
        }];
        when = 
            {
                type: "PlaceMove",
                user: {
                    userName: "OtherGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                pos: "8",
                side: "O"
            };
        then = [
            {
                type: "MovePlaced",
                user: {
                    userName: "OtherGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                pos: "8",
                side: "O"
            }];
    });

    it('should emit IllegalMove when square occupied', function () {
        given = [
      {
          type: "GameCreated",
          user: {
              userName: "TheGuy"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:29:29"
      },
      {
          type: "GameJoined",
          user: {
              userName: "OtherGuy"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:29:29",
          side:"O"
      },
      {
          type: "MovePlaced",
          user: {
              userName: "TheGuy"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:30:29",
          pos: "0",
          side:"X"
      }
      ];
      when =
      {
          type: "PlaceMove",
          user: {
              userName: "OtherGuy"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:31:29",
          pos: "0",
          side:"O"
      };
      then = [
      {
          type: "IllegalMove",
          user: {
              userName: "OtherGuy"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:31:29",
          pos: "0"
      }
];
    });

    it('should emit NotYourMove if player tries 2 moves in a row', function () {
        given = [
        {
            type: "GameCreated",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        },
        {
            type: "GameJoined",
            user: {
                userName: "OtherGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            side:"O"
        },
        {
            type: "MovePlaced",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "0",
            side:"X"
        }
        ];
        when =
        {
            type: "PlaceMove",
            user: {
                userName: "OtherGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:31:29",
            pos: "4",
            side:"X"
        };
        then = [
        {
            type: "OutOfTurnMoveAttempted",
            user: {
                userName: "OtherGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:31:29",
            side:"X"
        }];
    });

    it('should emit gameWon on ***', function () {
        given = [
        {
            type: "GameCreated",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        },
        {
            type: "GameJoined",
            user: {
                userName: "OtherGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            side:"O"
        },
        {
            type: "MovePlaced",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "0",
            side:"X"
        },
        {
            type: "MovePlaced",
            user: {
                userName: "OtherGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "3",
            side:"O"
        },
        {
            type: "MovePlaced",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "1",
            side:"X"
        },
        {
            type: "MovePlaced",
            user: {
                userName: "OtherGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "4",
            side:"O"
        }];
        when = 
            {
            type: "PlaceMove",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "2",
            side:"X"
        };
        then = [
        {
            type: "GameWon",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:31:29",
            side:"X"
        }];
    });

    it('should NOT emit gameDraw if last move was win', function () {
        given = [
        {
            type: "GameCreated",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        },
        {
            type: "GameJoined",
            user: {
                userName: "OtherGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            side:"O"
        },
        {
            type: "MovePlaced",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "0",
            side:"X"
        },
        {
            type: "MovePlaced",
            user: {
                userName: "OtherGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "1",
            side:"O"
        },
        {
            type: "MovePlaced",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "2",
            side:"X"
        },
        {
            type: "MovePlaced",
            user: {
                userName: "OtherGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "3",
            side:"O"
        },
        {
            type: "MovePlaced",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "4",
            side:"X"
        },
        {
            type: "MovePlaced",
            user: {
                userName: "OtherGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "5",
            side:"O"
        },
        {
            type: "MovePlaced",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "6",
            side:"X"
        },
        {
            type: "MovePlaced",
            user: {
                userName: "OtherGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "7",
            side:"O"
        }];
        when =
        {
            type: "PlaceMove",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:31:29",
            pos: "8",
            side:"X"
        };
        then = [
        {
            type: "GameWon",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:31:29",
            side:"X"
        }];
    });

    it('should emit gameDraw if neither wins', function () {
        given = [
        {
            type: "GameCreated",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        },
        {
            type: "GameJoined",
            user: {
                userName: "OtherGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            side:"O"
        },
        {
            type: "MovePlaced",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "0",
            side:"X"
        },
        {
            type: "MovePlaced",
            user: {
                userName: "OtherGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "1",
            side:"O"
        },
        {
            type: "MovePlaced",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "2",
            side:"X"
        },
        {
            type: "MovePlaced",
            user: {
                userName: "OtherGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "3",
            side:"O"
        },
        {
            type: "MovePlaced",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "4",
            side:"X"
        },
        {
            type: "MovePlaced",
            user: {
                userName: "OtherGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "5",
            side:"O"
        },
        {
            type: "MovePlaced",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "6",
            side:"X"
        },
        {
            type: "MovePlaced",
            user: {
                userName: "OtherGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            pos: "8",
            side:"O"
        }];
        when =
        {
            type: "PlaceMove",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:31:29",
            pos: "7",
            side:"X"
        };
        then = [
        {
            type: "GameDraw",           
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:31:29",
        }];
    });
});