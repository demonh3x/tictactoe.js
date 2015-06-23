describe('Game', function() {
  var boardUi;
  var playerX;
  var playerO;
  var game;

  beforeEach(function () {
    boardUi = createDisplaySpy();
    playerX = createPlayerStub('x');
    playerO = createPlayerStub('o');
  });

  it('displays an empty board after starting', function() {
    var game = gameStartingWith(boardWithMarks([
      '', '', '',
      '', '', '',
      '', '', ''
    ]));

    game.start();

    expect(boardUi.receivedBoard.marks()).toEqual([
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
    game.doTurn();

    expect(boardUi.receivedBoard.marks()).toEqual([
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

    game.doTurn();
    game.doTurn();

    expect(boardUi.receivedBoard.marks()).toEqual([
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

    game.doTurn();
    game.doTurn();
    game.doTurn();

    expect(boardUi.receivedBoard.marks()).toEqual([
      '', 'x', 'o',
      '', 'x', '',
      '', '',  ''
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

  function createDisplaySpy() {
    return {
      update: function(board) {
        this.receivedBoard = board;
      }
    };
  }

  function createPlayerStub(mark) {
    return {
      spacesToPlaceMarks: [],
      willPlaceMarkAt: function(space) {
        this.spacesToPlaceMarks.push(space);
      },
      placeMark: function(board) {
        var space = this.spacesToPlaceMarks.shift();
        return board.placeMarkAt(mark, space);
      }
    };
  }

  function boardWithMarks(marks) {
    return new Tictactoe.Board(marks);
  }

  function gameStartingWith(board) {
    var rules = new Tictactoe.Rules();
    return new Tictactoe.Game(boardUi, rules, [playerX, playerO], board);
  }
});
