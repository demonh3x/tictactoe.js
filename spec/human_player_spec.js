describe('Human player', function() {
  it('is not ready when does not have the space to move', function() {
    var player = new Tictactoe.HumanPlayer('o');
    expect(player.isReady()).toEqual(false);
  });

  it('is ready when it has a space to move', function() {
    var player = new Tictactoe.HumanPlayer('o');
    player.willMoveAt(0);
    expect(player.isReady()).toEqual(true);
  });

  it('returns the move with the given space to move', function() {
    var player = new Tictactoe.HumanPlayer('x');
    player.willMoveAt(0);
    expect(player.getMove()).toEqual({
      mark: 'x',
      space: 0
    });
  });

  it('returns the move with the given space to move', function() {
    var player = new Tictactoe.HumanPlayer('o');
    player.willMoveAt(1);
    expect(player.getMove()).toEqual({
      mark: 'o',
      space: 1
    });
  });

  it('after getting the move is no longer ready until it receives another space to move', function() {
    var player = new Tictactoe.HumanPlayer('o');
    player.willMoveAt(1);
    player.getMove();
    expect(player.isReady()).toEqual(false);
    player.willMoveAt(2);
    expect(player.isReady()).toEqual(true);
  });

  it('overwrites the previous space to move if it has not been used', function() {
    var player = new Tictactoe.HumanPlayer('o');
    player.willMoveAt(1);
    player.willMoveAt(2);
    expect(player.getMove()).toEqual({
      mark: 'o',
      space: 2
    });
    expect(player.isReady()).toEqual(false);
  });

  it('can be updated with the board', function() {
    var player = new Tictactoe.HumanPlayer('o');
    var board = {};
    player.update(board);
  });
});
