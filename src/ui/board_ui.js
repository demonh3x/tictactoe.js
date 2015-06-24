(function() {
  function BoardUi(spacesToMove) {
    this._spacesToMove = spacesToMove;
  };

  BoardUi.prototype.update = function(board) {
    this._clear();
    this._createBoardWith(board.marks());
  };

  BoardUi.prototype._clear = function() {
    this._board && this._board.remove();
  };

  BoardUi.prototype._createBoardWith = function(marks) {
    var that = this;

    var domBoard = $('<div data-board>');
    var domMarks = marks.map(function(mark, space) {
      var domMark = $('<div data-mark="' + valueFor(mark) + '"/>');
      domMark.click(function() {
        that._spacesToMove.push(space);
      });

      return domMark;
    });
    domBoard.append(domMarks);

    this._board = domBoard;
    $('body').append(domBoard);
  };

  function valueFor(mark) {
    return mark === null? '' : mark;
  };

  if (typeof Tictactoe === 'undefined') {
    Tictactoe = {};
  }
  Tictactoe.BoardUi = BoardUi;
})();
