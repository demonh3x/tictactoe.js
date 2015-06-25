(function() {
  function PlayerFactory(namespace, spacesToMove) {
    this._namespace = namespace;
    this._spacesToMove = spacesToMove;
  }

  PlayerFactory.prototype.create = function(type, mark) {
    switch(type) {
      case 'computer':
        return new this._namespace.ComputerPlayer(mark);
      case 'human':
        return new this._namespace.HumanPlayer(mark, this._spacesToMove);
      default:
        throw 'The player type "' + type + '" is not supported';
    }
  }

  if (typeof Tictactoe === 'undefined') {
    Tictactoe = {};
  }
  Tictactoe.PlayerFactory = PlayerFactory;
})();

