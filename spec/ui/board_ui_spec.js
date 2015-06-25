describe('The board interface', function() {
  var ui;
  var spacesToMove;

  beforeEach(function() {
    $('body').append('<div id="board"></div>');
    rules = new Tictactoe.Rules();
    spacesToMove = [];
    ui = new Tictactoe.BoardUi('board', rules, spacesToMove);
  });

  afterEach(function() {
    $('#board').remove();
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

  it('updates the board in place', function() {
    var emptyBoard = board([
      '', '', '',
      '', '', '',
      '', '', ''
    ]);
    ui.update(emptyBoard);

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

  it('does not display the result when is not finished', function() {
    var ongoingBoard = board([
      'x', 'o', 'x',
      'x', 'x', 'o',
      'o', '',  'o'
    ]);
    ui.update(ongoingBoard);

    expectNoResult();
  });

  it('displays the draw result', function() {
    var drawBoard = board([
      'x', 'o', 'x',
      'x', 'x', 'o',
      'o', 'x', 'o'
    ]);
    ui.update(drawBoard);

    expectDraw();
  });

  it('displays player x as the winner', function() {
    var boardWonByX = board([
      'x', 'o', '',
      'x', 'o', '',
      'x', '',  ''
    ]);
    ui.update(boardWonByX);

    expectWinner('x');
  });

  it('displays player o as the winner', function() {
    var boardWonByO = board([
      'x', 'o', 'x',
      'x', 'o', '',
      '',  'o', ''
    ]);
    ui.update(boardWonByO);

    expectWinner('o');
  });

  it('updates the result in place', function() {
    var boardWonByO = board([
      'x', 'o', 'x',
      'x', 'o', '',
      '',  'o', ''
    ]);
    ui.update(boardWonByO);
    ui.update(boardWonByO);

    expectOnlyOneResult();
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
    return $.map($('#board [data-board] [data-mark]'), function(space) {
      return $(space).attr('data-mark');
    });
  }

  function nthSpace(spaceIndex) {
    return $('#board [data-board] [data-mark]:nth-child(' + (spaceIndex +1) + ')');
  }

  function expectNoResult() {
    expect($('#board [data-result=""]').size()).toEqual(1)
  }

  function expectWinner(mark) {
    expect($('#board [data-result="' + mark + '"]').size()).toEqual(1)
  }

  function expectDraw() {
    expect($('#board [data-result="draw"]').size()).toEqual(1)
  }

  function expectOnlyOneResult() {
    expect($('#board [data-result]').size()).toEqual(1)
  }
});
