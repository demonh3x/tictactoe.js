describe('The board interface', function() {
  var ui;
  var spacesToMove;

  beforeEach(function() {
    spacesToMove = [];
    ui = new Tictactoe.BoardUi(spacesToMove);
  });

  afterEach(function() {
    ui._clear();
  });

  it('displays an empty board', function() {
    var emptyBoard = board([
      '', '', '',
      '', '', '',
      '', '', ''
    ]);
    ui.update(emptyBoard);

    expect(displayedMarks()).toEqual([
        '', '', '',
        '', '', '',
        '', '', ''
    ]);
  });

  it('displays a board with some marks', function() {
    var boardWithSomeMarks = board([
      'x', 'o', '',
      '',  'x', '',
      '',  'x', 'o'
    ]);
    ui.update(boardWithSomeMarks);

    expect(displayedMarks()).toEqual([
        'x', 'o', '',
        '',  'x', '',
        '',  'x', 'o'
    ]);
  });

  it('stores the move when clicking the first space', function() {
    var emptyBoard = board([
      '', '', '',
      '', '', '',
      '', '', ''
    ]);
    ui.update(emptyBoard);
    nthSpace(0).click();

    expect(spacesToMove).toEqual([0]);
  });

  it('stores the move when clicking the fifth space', function() {
    var emptyBoard = board([
      '', '', '',
      '', '', '',
      '', '', ''
    ]);
    ui.update(emptyBoard);
    nthSpace(4).click();

    expect(spacesToMove).toEqual([4]);
  });

  it('queues the moves when clicking several times', function() {
    var emptyBoard = board([
      '', '', '',
      '', '', '',
      '', '', ''
    ]);
    ui.update(emptyBoard);
    nthSpace(1).click();
    nthSpace(2).click();
    nthSpace(5).click();

    expect(spacesToMove).toEqual([1, 2, 5]);
  });

  function board(marks) {
    return new Tictactoe.Board(marks);
  }

  function displayedMarks() {
    return $.map($('[data-board] [data-mark]'), function(space) {
      return $(space).attr('data-mark');
    });
  }

  function nthSpace(spaceIndex) {
    return $('[data-board] [data-mark]:nth-child(' + (spaceIndex +1) + ')');
  }
});
