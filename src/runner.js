(function() {
  function run(containerId, clock) {
    clock = clock || {
      onTick: function(callback){
        setInterval(callback, 10);
      }
    };

    var optionsUi = new Tictactoe.OptionsUi(containerId);

    optionsUi.selectPlayers(function(playerTypes) {
      var game = createGame(containerId, playerTypes);

      game.start();
      clock.onTick(function(){
        game.doTurn();
      });
    });
  }

  function createGame(containerId, playerTypes) {
    var rules = new Tictactoe.Rules();
    var spacesToMove = [];
    var boardUi = new Tictactoe.BoardUi(containerId, rules, spacesToMove);
    var factory = new Tictactoe.PlayerFactory(Tictactoe, spacesToMove);
    var players = [
      factory.create(playerTypes.x, 'x'),
      factory.create(playerTypes.o, 'o')
    ];
    var board = new Tictactoe.Board([
        '', '', '',
        '', '', '',
        '', '', ''
    ]);

    return new Tictactoe.Game(boardUi, rules, players, board);
  }

  if (typeof Tictactoe === 'undefined') {
    Tictactoe = {};
  }
  Tictactoe.run = run;
})();
