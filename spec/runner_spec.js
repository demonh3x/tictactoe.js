describe('Runner', function() {
  var clock;

  beforeEach(function () {
    clock = fakeClock();
    $('body').append('<div id="tictactoe"/>');
    Tictactoe.run('tictactoe', clock);
  });

  afterEach(function () {
    $('#tictactoe').remove();
  });

  it('A full game between two humans ending with x as the winner', function() {
    startGame('human', 'human');

    // x x x
    //
    // o o
    clickOnSpace(0); //x
    clickOnSpace(6); //o
    clickOnSpace(1); //x
    clickOnSpace(7); //o
    clickOnSpace(2); //x

    expectWinner('x');
  });

  function fakeClock() {
    return {
      onTick: function(callback) {
        this._callback = callback;
      },
      tick: function() {
        this._callback();
      }
    };
  }

  function startGame(playerXType, playerOType) {
    $('#tictactoe [name="x"][value="' + playerXType + '"]').click();
    $('#tictactoe [name="o"][value="' + playerOType + '"]').click();
    $('#tictactoe [type="submit"]').click();
  }

  function clickOnSpace(spaceIndex) {
    $('#tictactoe [data-mark]:nth-child(' + (spaceIndex + 1) + ')').click();
    clock.tick();
  }

  function expectWinner(mark) {
    expect($('#tictactoe [data-result="' + mark + '"]').size()).toEqual(1)
  }
});
