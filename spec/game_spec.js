describe('Game', function() {
  var boardUi;
  var game;
  var playerX;
  var playerO;

  beforeEach(function () {
    boardUi = createDisplaySpy();
    playerX = createPlayerStub('x');
    playerO = createPlayerStub('o');
    var board = new Tictactoe.Board([
      '', '', '',
      '', '', '',
      '', '', ''
    ]);
    game = new Tictactoe.Game(boardUi, [playerX, playerO], board);
  });

  it('displays an empty board after starting', function() {
    game.start();
    expect(boardUi.receivedBoard.marks()).toEqual([
      '', '', '',
      '', '', '',
      '', '', ''
    ]);
  });

  it('displays the board with player x mark after first turn', function() {
    playerX.willPlaceMarkAt(0);

    game.doTurn();

    expect(boardUi.receivedBoard.marks()).toEqual([
      'x', '', '',
      '',  '', '',
      '',  '', ''
    ]);
  });

  it('displays the board with player o mark after second turn', function() {
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
});
