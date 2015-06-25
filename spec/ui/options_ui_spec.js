describe('The options interface', function() {
  var optionsUi;
  var onSelectedListener;

  var listenerCalled;
  var sentOptions;

  beforeEach(function() {
    $('body').append('<div id="options"/>');
    optionsUi = new Tictactoe.OptionsUi('options');

    listenerCalled = false;
    onSelectedListener = function(selectedOptions) {
      listenerCalled = true;
      sentOptions = selectedOptions;
    }

    optionsUi.selectPlayers(onSelectedListener);
  });

  afterEach(function() {
    $('#options').remove();
  });

  it('sends the selected options to the listener when it is human vs computer', function() {
    selectPlayerType('x', 'human');
    selectPlayerType('o', 'computer');
    acceptSelection();

    expectOptionsSent({
      x: 'human',
      o: 'computer'
    });
  });

  it('sends the selected options to the listener when it is computer vs human', function() {
    selectPlayerType('x', 'computer');
    selectPlayerType('o', 'human');
    acceptSelection();

    expectOptionsSent({
      x: 'computer',
      o: 'human'
    });
  });

  it('does not send the options before accepting the selection', function() {
    selectPlayerType('x', 'human');
    selectPlayerType('o', 'human');

    expectOptionsNotSent();
  });

  it('human vs human is selected by default', function() {
    acceptSelection();

    expectOptionsSent({
      x: 'human',
      o: 'human'
    });
  });

  it('is removed after accepting the selection', function() {
    acceptSelection();
    expectOptionsAreNotInTheDom();
  });

  function selectPlayerType(player, type) {
    $('#options [name="' + player + '"][value="' + type + '"]').click();
  }

  function acceptSelection() {
    $('#options [type="submit"]').click();
  }

  function expectOptionsSent(expectedOptions) {
    expect(listenerCalled).toEqual(true);
    expect(sentOptions).toEqual(expectedOptions);
  }

  function expectOptionsNotSent() {
    expect(listenerCalled).toEqual(false);
  }

  function expectOptionsAreNotInTheDom() {
    expect($('#options').children().length).toEqual(0);
  }
});


