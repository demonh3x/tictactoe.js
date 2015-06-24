describe('Computer player', function() {
  it('chooses the first available space when there are several options', function() {
    var player = new Tictactoe.ComputerPlayer('x');
    player.update({
      availableSpaces: function(){
        return [0, 1, 2, 3];
      }
    });
    expect(player.getMove()).toEqual({
      mark: 'x',
      space: 0
    })
  });

  it('chooses the only available space when there is only one option', function() {
    var player = new Tictactoe.ComputerPlayer('o');
    player.update({
      availableSpaces: function(){
        return [3];
      }
    });
    expect(player.getMove()).toEqual({
      mark: 'o',
      space: 3
    })
  });

  it('is not ready before receiving the board', function() {
    var player = new Tictactoe.ComputerPlayer('o');
    expect(player.isReady()).toEqual(false)
  });

  it('is ready after receiving the board', function() {
    var player = new Tictactoe.ComputerPlayer('o');
    player.update({
      availableSpaces: function(){
        return [3];
      }
    });
    expect(player.isReady()).toEqual(true)
  });
});
