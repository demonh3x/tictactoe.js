(function() {
  function HumanPlayer(mark, spacesToMove) {
    this._mark = mark;
    this._spacesToMove = spacesToMove;
  }

  HumanPlayer.prototype.update = function(board) {
  }

  HumanPlayer.prototype.isReady = function() {
    return this._spacesToMove.length > 0;
  }

  HumanPlayer.prototype.getMove = function() {
    return {
      mark: this._mark,
      space: this._spacesToMove.shift()
    };
  }

  if (typeof Tictactoe === 'undefined') {
    Tictactoe = {};
  }
  Tictactoe.HumanPlayer = HumanPlayer;
})();
