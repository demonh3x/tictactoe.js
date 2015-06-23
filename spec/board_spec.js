describe('Board', function() {
  it('exposes the marks', function() {
    var board = new Tictactoe.Board([
      '',  '',  '',
      'x', 'x', '',
      '',  '',  'o'
    ]);
    expect(board.marks()).toEqual([
      '',  '',  '',
      'x', 'x', '',
      '',  '',  'o'
    ]);
  });

  it('can place a mark at a location', function() {
    var board = new Tictactoe.Board([
      '', '', '',
      '', '', '',
      '', '', ''
    ]);
    var updatedBoard = board.placeMarkAt('x', 0);
    expect(updatedBoard.marks()).toEqual([
      'x', '', '',
      '',  '', '',
      '',  '', ''
    ]);
  });
});


