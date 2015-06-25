(function() {
  const TEMPLATE =
    '<form class="options">' +
      '<div>' +
        '<p>Player x</p>' +
        '<input type="radio" name="x" value="human" checked/>Human' +
        '<input type="radio" name="x" value="computer"/>Computer' +
      '</div>' +
      '<div>' +
        '<p>Player o</p>' +
        '<input type="radio" name="o" value="human" checked/>Human' +
        '<input type="radio" name="o" value="computer"/>Computer' +
      '</div>' +
      '<div>' +
        '<input type="submit" value="Start game"/>' +
      '</div>' +
    '</form>';

  function OptionsUi(containerId) {
    this._containerId = containerId;
  };

  OptionsUi.prototype.selectPlayers = function(onSelectedListener) {
    var form = $(TEMPLATE);

    $('#' + this._containerId).append(form);

    form.submit(function(event) {
      form.remove();
      onSelectedListener(getSelectionIn(form));
      event.preventDefault();
    });
  }

  function getSelectionIn(form) {
    return form.serializeArray().reduce(
        function(resultingObject, currentInput) {
          resultingObject[currentInput.name] = currentInput.value;
          return resultingObject;
        },
        {}
    );
  }

  if (typeof Tictactoe === 'undefined') {
    Tictactoe = {};
  }
  Tictactoe.OptionsUi = OptionsUi;
})();
