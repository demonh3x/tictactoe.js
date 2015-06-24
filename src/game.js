(function() {
  function Game(display, rules, players, board) {
    this._display = display;
    this._rules = rules;
    this._players = players;
    this._currentPlayerIndex = 0;
    this._board = board;
  }

  Game.prototype.start = function() {
    this._broadcastBoard();
  }

  Game.prototype._broadcastBoard = function() {
    var board = this._board;

    this._display.update(board);
    this._players.forEach(function(player){
      player.update(board);
    });
  }

  Game.prototype.isOngoing = function() {
    return !this._isFinished();
  }

  Game.prototype._isFinished = function() {
    return this._rules.outcomeOf(this._board).isFinished;
  }

  Game.prototype.doTurn = function() {
    if (this._isFinished()) {
      return;
    }

    var currentPlayer = this._currentPlayer();
    if (currentPlayer.isReady()) {
      var move = this._currentPlayer().getMove();
      if (this._isLegit(move)) {
        this._updateBoard(move);
        this._advanceTurn();
        this._broadcastBoard();
      }
    }
  }

  Game.prototype._currentPlayer = function() {
    return this._players[this._currentPlayerIndex];
  }

  Game.prototype._isLegit = function(move) {
    return this._board.availableSpaces().indexOf(move.space) != -1;
  }

  Game.prototype._updateBoard = function(move) {
    this._board = this._board.placeMarkAt(move.mark, move.space);
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
