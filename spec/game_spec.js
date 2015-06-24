describe('Game', function() {
  var display;
  var playerX;
  var playerO;
  var game;

  beforeEach(function () {
    display = createDisplaySpy();
    playerX = createPlayerFake('x');
    playerO = createPlayerFake('o');
  });

  it('displays an empty board after starting', function() {
    var game = gameStartingWith(boardWithMarks([
      '', '', '',
      '', '', '',
      '', '', ''
    ]));

    game.start();

    expect(display.receivedBoard.marks()).toEqual([
      '', '', '',
      '', '', '',
      '', '', ''
    ]);
  });

  it('displays the board with player x mark after first turn', function() {
    var game = gameStartingWith(boardWithMarks([
      '', '', '',
      '', '', '',
      '', '', ''
    ]));

    playerX.willPlaceMarkAt(0);

    game.start();
    game.doTurn();

    expect(display.receivedBoard.marks()).toEqual([
      'x', '', '',
      '',  '', '',
      '',  '', ''
    ]);
  });

  it('displays the board with player o mark after second turn', function() {
    var game = gameStartingWith(boardWithMarks([
      '', '', '',
      '', '', '',
      '', '', ''
    ]));
    playerX.willPlaceMarkAt(1);
    playerO.willPlaceMarkAt(2);

    game.start();
    game.doTurn();
    game.doTurn();

    expect(display.receivedBoard.marks()).toEqual([
      '', 'x', 'o',
      '', '',  '',
      '', '',  ''
    ]);
  });

  it('displays the board with second player x mark after third turn', function() {
    var game = gameStartingWith(boardWithMarks([
      '', '', '',
      '', '', '',
      '', '', ''
    ]));
    playerX.willPlaceMarkAt(1);
    playerO.willPlaceMarkAt(2);
    playerX.willPlaceMarkAt(4);

    game.start();
    game.doTurn();
    game.doTurn();
    game.doTurn();

    expect(display.receivedBoard.marks()).toEqual([
      '', 'x', 'o',
      '', 'x', '',
      '', '',  ''
    ]);
  });

  it('does not allow the players to overwrite previously placed marks', function() {
    var game = gameStartingWith(boardWithMarks([
      '', '', '',
      '', '', '',
      '', '', ''
    ]));
    playerX.willPlaceMarkAt(0);
    playerO.willPlaceMarkAt(0);
    playerO.willPlaceMarkAt(1);

    game.start();
    game.doTurn();
    game.doTurn();
    game.doTurn();

    expect(display.receivedBoard.marks()).toEqual([
      'x', 'o', '',
      '', '', '',
      '', '', ''
    ]);
  });

  it('updates the player x with the board after starting', function() {
    var game = gameStartingWith(boardWithMarks([
      '', '', '',
      '', '', '',
      '', '', ''
    ]));

    game.start();

    expect(playerX.receivedBoard.marks()).toEqual([
      '', '', '',
      '', '', '',
      '', '', ''
    ]);
  });

  it('updates the player o with the board that x has played after first turn', function() {
    var game = gameStartingWith(boardWithMarks([
      '', '', '',
      '', '', '',
      '', '', ''
    ]));

    playerX.willPlaceMarkAt(0);

    game.start();
    game.doTurn();

    expect(playerO.receivedBoard.marks()).toEqual([
      'x', '', '',
      '', '', '',
      '', '', ''
    ]);
  });

  it('updates the player x with the board that o has played after second turn', function() {
    var game = gameStartingWith(boardWithMarks([
      '', '', '',
      '', '', '',
      '', '', ''
    ]));

    playerX.willPlaceMarkAt(0);
    playerO.willPlaceMarkAt(1);

    game.start();
    game.doTurn();
    game.doTurn();

    expect(playerX.receivedBoard.marks()).toEqual([
      'x', 'o', '',
      '', '', '',
      '', '', ''
    ]);
  });

  it('will not advance turns if the player x is not ready', function() {
    var game = gameStartingWith(boardWithMarks([
      '', '', '',
      '', '', '',
      '', '', ''
    ]));

    playerO.willPlaceMarkAt(0);

    game.start();
    game.doTurn();
    game.doTurn();

    expect(display.receivedBoard.marks()).toEqual([
      '', '', '',
      '', '', '',
      '', '', ''
    ]);
  });

  it('is no longer ongoing when a line is made', function() {
    var game = gameStartingWith(boardWithMarks([
      '', 'x', 'o',
      '', 'x', 'o',
      '', 'x', ''
    ]));

    expect(game.isOngoing()).toEqual(false);
  });

  it('is no longer ongoing when the board is full', function() {
    var game = gameStartingWith(boardWithMarks([
      'o', 'x', 'o',
      'x', 'x', 'o',
      'x', 'o', 'x'
    ]));

    expect(game.isOngoing()).toEqual(false);
  });

  it('is ongoing before a line is made and not full', function() {
    var game = gameStartingWith(boardWithMarks([
      '', 'x', 'o',
      '', 'x', 'o',
      '', '',  ''
    ]));

    expect(game.isOngoing()).toEqual(true);
  });

  it('will not place more marks when is no longer ongoing', function() {
    var game = gameStartingWith(boardWithMarks([
      '', 'x', 'o',
      '', 'x', 'o',
      '', 'x', ''
    ]));

    playerX.willPlaceMarkAt(0);

    game.start();
    game.doTurn();

    expect(display.receivedBoard.marks()).toEqual([
      '', 'x', 'o',
      '', 'x', 'o',
      '', 'x', ''
    ]);
  });

  function createDisplaySpy() {
    return {
      update: function(board) {
        this.receivedBoard = board;
      }
    };
  }

  function createPlayerFake(mark) {
    return {
      spacesToPlaceMarks: [],
      willPlaceMarkAt: function(space) {
        this.spacesToPlaceMarks.push(space);
      },
      update: function(board) {
        this.receivedBoard = board;
      },
      isReady: function() {
        return this.spacesToPlaceMarks.length > 0;
      },
      getMove: function() {
        var space = this.spacesToPlaceMarks.shift();
        return {
          mark: mark,
          space: space
        };
      }
    };
  }

  function boardWithMarks(marks) {
    return new Tictactoe.Board(marks);
  }

  function gameStartingWith(board) {
    var rules = new Tictactoe.Rules();
    return new Tictactoe.Game(display, rules, [playerX, playerO], board);
  }
});
