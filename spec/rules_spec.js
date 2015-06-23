describe('Rules', function() {
  it('finishes when the board is full', function() {
    var board = {
      marks: function() {
        return [
          'x', 'o', 'x',
          'o', 'o', 'x',
          'x', 'x', 'o'
        ];
      },
      lines: function() {
        return [
          ['x', 'o', 'x'],
          ['o', 'o', 'x'],
          ['x', 'x', 'o']
        ];
      }
    };
    expect(outcomeOf(board).isFinished).toEqual(true);
  });

  it('finishes when the board contains a line with the same mark', function() {
    var board = {
      marks: function() {
        return [
          'x', 'x', 'x',
          'o', 'o', '',
          '',  '',  ''
        ];
      },
      lines: function() {
        return [
          ['x', 'x', 'x'],
          ['o', 'o', ''],
          ['', '', '']
        ];
      }
    };
    expect(outcomeOf(board).isFinished).toEqual(true);
  });

  it('is not finished when the board has available spaces and there is no winner', function() {
    var board = {
      marks: function() {
        return [
          'x', 'x', '',
          'o', 'o', '',
          '',  '',  ''
        ];
      },
      lines: function() {
        return [
          ['x', 'x', ''],
          ['o', 'o', ''],
          ['', '', '']
        ];
      }
    };
    expect(outcomeOf(board).isFinished).toEqual(false);
  });

  it('the winner is the mark that is occupying a full line', function() {
    var board = {
      marks: function() {
        return [
          'x', 'x', '',
          'o', 'o', 'o',
          '',  '',  ''
        ];
      },
      lines: function() {
        return [
          ['x', 'x', ''],
          ['o', 'o', 'o'],
          ['', '', '']
        ];
      }
    };
    expect(outcomeOf(board).winner).toEqual('o');
  });

  it('there is no winner if there is no mark occupying a full line', function() {
    var board = {
      marks: function() {
        return [
          'x', 'x', 'o',
          'o', 'o', 'x',
          'x', 'x', 'o'
        ];
      },
      lines: function() {
        return [
          ['x', 'x', 'o'],
          ['o', 'o', 'x'],
          ['x', 'x', 'o']
        ];
      }
    };
    expect(outcomeOf(board).winner).toEqual(null);
  });

  function outcomeOf(board) {
    var rules = new Tictactoe.Rules();
    return rules.outcomeOf(board);
  }
});
