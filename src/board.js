(function() {
  function Board(marks) {
    this._placedMarks = marks;
  }

  Board.prototype.marks = function() {
    return this._placedMarks;
  }

  Board.prototype.placeMarkAt = function(mark, space) {
    this._placedMarks[space] = mark;
    return this;
  }

  if (typeof Tictactoe === 'undefined') {
    Tictactoe = {};
  }
  Tictactoe.Board = Board;
})();
