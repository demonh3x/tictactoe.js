(function() {
  function OptionsUi(containerId) {
    this._containerId = containerId;
  };

  OptionsUi.prototype.selectPlayers = function(onSelectedListener) {
    var xHuman = $('<input type="radio" name="x" value="human" checked/>');
    var xComputer = $('<input type="radio" name="x" value="computer"/>');
    var oHuman = $('<input type="radio" name="o" value="human" checked/>');
    var oComputer = $('<input type="radio" name="o" value="computer"/>');
    var submit = $('<input type="submit"/>');

    var form = $('<form/>');
    form.append(xHuman);
    form.append(xComputer);
    form.append(oHuman);
    form.append(oComputer);
    form.append(submit);

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
