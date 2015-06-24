(function() {
  function ComputerPlayer(mark) {
    this._mark = mark;
  }

  ComputerPlayer.prototype.update = function(board) {
    this._board = board;
  }

  ComputerPlayer.prototype.isReady = function() {
    return typeof this._board !== 'undefined';
  }

  ComputerPlayer.prototype.getMove = function() {
    return {
      mark: this._mark,
      space: this._board.availableSpaces()[0]
    }
  }

  if (typeof Tictactoe === 'undefined') {
    Tictactoe = {};
  }
  Tictactoe.ComputerPlayer = ComputerPlayer;
})();
