(function() {
  function Game(display, rules, players, board) {
    this._display = display;
    this._rules = rules;
    this._players = players;
    this._currentPlayerIndex = 0;
    this._board = board;
  }

  Game.prototype.start = function() {
    this._display.update(this._board);
  }

  Game.prototype.isOngoing = function() {
    return !this._isFinished();
  }

  Game.prototype._isFinished = function() {
    return this._rules.outcomeOf(this._board).isFinished;
  }

  Game.prototype.doTurn = function() {
    this._currentPlayer().placeMark(this._board);
    this._advanceTurn();
    this._display.update(this._board);
  }

  Game.prototype._currentPlayer = function() {
    return this._players[this._currentPlayerIndex];
  }

  Game.prototype._advanceTurn = function() {
    var nextPlayerIndex = (this._currentPlayerIndex + 1) % this._players.length;
    this._currentPlayerIndex = nextPlayerIndex;
  }

  if (typeof Tictactoe === 'undefined') {
    Tictactoe = {};
  }
  Tictactoe.Game = Game;
})();
