(function() {
  function BoardUi() {
    this._onMoveListener = function(){};
  };

  BoardUi.prototype.setOnMoveListener = function(listener) {
    this._onMoveListener = listener;
  };

  BoardUi.prototype.update = function(marks) {
    this._clear();
    this._createBoardWith(marks);
  };

  BoardUi.prototype._clear = function() {
    this._board && this._board.remove();
  };

  BoardUi.prototype._createBoardWith = function(marks) {
    var that = this;

    var domBoard = $('<div data-board>');
    var domMarks = marks.map(function(mark, index) {
      var domMark = $('<div data-mark="' + valueFor(mark) + '"/>');
      domMark.click(function() {
        that._onMoveListener(index);
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
