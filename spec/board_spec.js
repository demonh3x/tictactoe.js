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

  it('exposes the line distribution', function() {
    var board = new Tictactoe.Board([
      'x', 'x', 'o',
      'o', 'o', 'x',
      'x', 'o', 'x'
    ]);

    expect(board.lines()).toEqual([
      //horizontal
      ['x', 'x', 'o'],
      ['o', 'o', 'x'],
      ['x', 'o', 'x'],

      //vertical
      ['x', 'o', 'x'],
      ['x', 'o', 'o'],
      ['o', 'x', 'x'],

      //diagonal
      ['x', 'o', 'x'],
      ['o', 'o', 'x']
    ]);
  });
});
