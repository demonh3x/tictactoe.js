(function() {
  function HumanPlayer(mark) {
    this._mark = mark;
    this._spaceToMove = null;
  }

  HumanPlayer.prototype.willMoveAt = function(space) {
    this._spaceToMove = space;
  }

  HumanPlayer.prototype.update = function(board) {
  }

  HumanPlayer.prototype.isReady = function() {
    return this._spaceToMove != null;
  }

  HumanPlayer.prototype.getMove = function() {
    var spaceToMove = this._spaceToMove;
    this._spaceToMove = null;
    return {
      mark: this._mark,
      space: spaceToMove
    };
  }

  if (typeof Tictactoe === 'undefined') {
    Tictactoe = {};
  }
  Tictactoe.HumanPlayer = HumanPlayer;
})();
