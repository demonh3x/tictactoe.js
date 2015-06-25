(function() {
  function BoardUi(containerId, spacesToMove) {
    this._containerId = containerId;
    this._spacesToMove = spacesToMove;
  };

  BoardUi.prototype.update = function(board) {
    this._board && this._board.remove();
    this._board = this._createBoardWith(board.marks());
    this._addToDom(this._board);
  };

  BoardUi.prototype._createBoardWith = function(marks) {
    var that = this;

    var domMarks = marks.map(function(mark, space) {
      var domMark = $('<div data-mark="' + valueFor(mark) + '"/>');
      domMark.click(function() {
        that._spacesToMove.push(space);
      });

      return domMark;
    });

    var domBoard = $('<div data-board>');
    domBoard.append(domMarks);

    return domBoard;
  };

  BoardUi.prototype._addToDom = function(content) {
    $('#' + this._containerId).append(content);
  }

  function valueFor(mark) {
    return mark === null? '' : mark;
  };

  if (typeof Tictactoe === 'undefined') {
    Tictactoe = {};
  }
  Tictactoe.BoardUi = BoardUi;
})();
