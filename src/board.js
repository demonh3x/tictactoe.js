(function() {
  function Board(marks) {
    this._placedMarks = marks;
  }

  Board.prototype.marks = function() {
    return this._placedMarks.slice();
  }

  Board.prototype.availableSpaces = function() {
    var availableSpaces = [];
    this._placedMarks.forEach(function(mark, space){
      if (!mark){
        availableSpaces.push(space);
      }
    });
    return availableSpaces;
  }

  Board.prototype.placeMarkAt = function(mark, space) {
    var updatedMarks = this._placedMarks.slice();
    updatedMarks[space] = mark;
    return new Board(updatedMarks);
  }

  Board.prototype.lines = function() {
    return this._horizontalLines()
      .concat(this._verticalLines())
      .concat(this._diagonalLines());
  }

  Board.prototype._horizontalLines = function() {
    return [
      this._lineAtSpaces(0, 1, 2),
      this._lineAtSpaces(3, 4, 5),
      this._lineAtSpaces(6, 7, 8)
    ];
  }

  Board.prototype._verticalLines = function() {
    return [
      this._lineAtSpaces(0, 3, 6),
      this._lineAtSpaces(1, 4, 7),
      this._lineAtSpaces(2, 5, 8)
    ];
  }

  Board.prototype._diagonalLines = function() {
    return [
      this._lineAtSpaces(0, 4, 8),
      this._lineAtSpaces(2, 4, 6)
    ];
  }

  Board.prototype._lineAtSpaces = function(space1, space2, space3) {
    var that = this;
    return [space1, space2, space3].map(function(space) {
      return that._placedMarks[space];
    });
  }

  if (typeof Tictactoe === 'undefined') {
    Tictactoe = {};
  }
  Tictactoe.Board = Board;
})();
