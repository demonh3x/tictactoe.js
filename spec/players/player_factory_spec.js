describe('Player factory', function() {
  function HumanPlayerSpy(mark, spacesToMove) {
    this.receivedMark = mark;
    this.receivedSpacesToMove = spacesToMove;
  }

  function ComputerPlayerSpy(mark) {
    this.receivedMark = mark;
  }

  var TestNamespace = {};
  TestNamespace.HumanPlayer = HumanPlayerSpy;
  TestNamespace.ComputerPlayer = ComputerPlayerSpy;

  var spacesToMove;
  var factory;

  beforeEach(function () {
    spacesToMove = [1, 5, 3];
    factory = new Tictactoe.PlayerFactory(TestNamespace, spacesToMove);
  });

  it('creates a computer player', function() {
    var createdPlayer = factory.create('computer', 'x');
    expect(createdPlayer instanceof ComputerPlayerSpy).toBeTruthy();
  });

  it('passes the mark to the computer player constructor', function() {
    var createdPlayer = factory.create('computer', 'o');
    expect(createdPlayer.receivedMark).toEqual('o');
  });

  it('creates a human player', function() {
    var createdPlayer = factory.create('human', 'o');
    expect(createdPlayer instanceof HumanPlayerSpy).toBeTruthy();
  });

  it('passes the mark to the human player constructor', function() {
    var createdPlayer = factory.create('human', 'x');
    expect(createdPlayer.receivedMark).toEqual('x');
  });

  it('passes the spacesToMove to the human player constructor', function() {
    var createdPlayer = factory.create('human', 'x');
    expect(createdPlayer.receivedSpacesToMove).toEqual(spacesToMove);
  });

  it('throws an error message when the type is not supported', function() {
    expect(function(){ factory.create('not-supported-type', 'x') }).toThrow('The player type "not-supported-type" is not supported');
  });
});
