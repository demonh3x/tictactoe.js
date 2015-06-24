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

  it('can place a mark at a space', function() {
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

  it('exposes the available spaces', function() {
    var board = new Tictactoe.Board([
      '',  'x', 'o',
      'o', '',  '',
      'x', '',  'x'
    ]);

    expect(board.availableSpaces()).toEqual([0, 4, 5, 7]);
  });

  it('the past board is not altered when placing a mark in an updated board', function() {
    var pastBoard = new Tictactoe.Board([
      '', '', '',
      '', '', '',
      '', '', ''
    ]);
    var updatedBoard = pastBoard.placeMarkAt('x', 0);
    expect(pastBoard.marks()).toEqual([
      '', '', '',
      '', '', '',
      '', '', ''
    ]);
  });

  it('cannot be altered accessing to the marks', function() {
    var board = new Tictactoe.Board([
      '', '', '',
      '', '', '',
      '', '', ''
    ]);
    board.marks()[0] = 'x';
    expect(board.marks()).toEqual([
      '', '', '',
      '', '', '',
      '', '', ''
    ]);
  });
});
