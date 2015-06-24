describe('Human player', function() {
  var spacesToMove;

  beforeEach(function () {
    spacesToMove = [];
  });

  it('is not ready when does not have the space to move', function() {
    var player = createPlayer('o');
    expect(player.isReady()).toEqual(false);
  });

  it('is ready when it has a space to move', function() {
    var player = createPlayer('o');
    willMoveToSpace(0);
    expect(player.isReady()).toEqual(true);
  });

  it('returns the move with the given space to move', function() {
    var player = createPlayer('x');
    willMoveToSpace(0);
    expect(player.getMove()).toEqual({
      mark: 'x',
      space: 0
    });
  });

  it('returns the move with the given space to move', function() {
    var player = createPlayer('o');
    willMoveToSpace(1);
    expect(player.getMove()).toEqual({
      mark: 'o',
      space: 1
    });
  });

  it('after getting the move is no longer ready until it receives another space to move', function() {
    var player = createPlayer('o');
    willMoveToSpace(1);
    player.getMove();
    expect(player.isReady()).toEqual(false);
    willMoveToSpace(2);
    expect(player.isReady()).toEqual(true);
  });

  it('returns the spaces to move in order they were received', function() {
    var player = createPlayer('o');
    willMoveToSpace(1);
    willMoveToSpace(2);
    expect(player.getMove()).toEqual({
      mark: 'o',
      space: 1
    });
    expect(player.getMove()).toEqual({
      mark: 'o',
      space: 2
    });
  });

  it('can be updated with the board', function() {
    var player = createPlayer('o');
    var board = {};
    player.update(board);
  });

  function createPlayer(mark) {
    return new Tictactoe.HumanPlayer(mark, spacesToMove);
  }

  function willMoveToSpace(space) {
    spacesToMove.push(space);
  }
});
