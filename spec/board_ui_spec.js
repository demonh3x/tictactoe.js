describe('The board interface', function() {
  var movesHandler;
  var ui;

  beforeEach(function() {
    movesHandler = {
      onMove: function(space) {
        this.receivedSpaceToMove = space;
      }
    };
    ui = new Tictactoe.BoardUi;
    ui.setOnMoveListener(function(space){
      movesHandler.onMove(space);
    });
  });

  afterEach(function() {
    ui._clear();
  });

  it('displays an empty board', function() {
    var emptyBoard = [
      null, null, null,
      null, null, null,
      null, null, null
    ];
    ui.update(emptyBoard);

    expect(displayedMarks()).toEqual([
        '', '', '',
        '', '', '',
        '', '', ''
    ]);
  });

  it('displays a board with some marks', function() {
    var board = [
      'x',  'o',  null,
      null, 'x',  null,
      null, 'x',  'o'
    ];
    ui.update(board);

    expect(displayedMarks()).toEqual([
        'x', 'o', '',
        '',  'x', '',
        '',  'x', 'o'
    ]);
  });

  it('sends the move to the handler when clicking the first space', function() {
    var emptyBoard = [
      null, null, null,
      null, null, null,
      null, null, null
    ];
    ui.update(emptyBoard);
    nthSpace(0).click();

    expect(movesHandler.receivedSpaceToMove).toEqual(0);
  });

  it('sends the move to the handler when clicking the fifth space', function() {
    var emptyBoard = [
      null, null, null,
      null, null, null,
      null, null, null
    ];
    ui.update(emptyBoard);
    nthSpace(4).click();

    expect(movesHandler.receivedSpaceToMove).toEqual(4);
  });

  function displayedMarks() {
    return $.map($('[data-board] [data-mark]'), function(space) {
      return $(space).attr('data-mark');
    });
  }

  function nthSpace(spaceIndex) {
    return $('[data-board] [data-mark]:nth-child(' + (spaceIndex +1) + ')');
  }
});
