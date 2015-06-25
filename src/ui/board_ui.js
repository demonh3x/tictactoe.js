(function() {
  function BoardUi(containerId, rules, spacesToMove) {
    this._containerId = containerId;
    this._rules = rules;
    this._spacesToMove = spacesToMove;
  };

  BoardUi.prototype.update = function(board) {
    this._updateBoard(board);
    this._updateResult(board);
  };

  BoardUi.prototype._updateBoard = function(board) {
    this._domBoard && this._domBoard.remove();
    this._domBoard = this._createDomBoardWith(board.marks());
    this._addToDom(this._domBoard);
  }

  BoardUi.prototype._updateResult = function(board) {
    this._domResult && this._domResult.remove();
    this._domResult = this._createDomResult(board);
    this._addToDom(this._domResult);
  }

  BoardUi.prototype._createDomBoardWith = function(marks) {
    var that = this;

    var domMarks = marks.map(function(mark, space) {
      var domMark = $('<div data-mark="' + valueFor(mark) + '"/>');
      domMark.click(function() {
        that._spacesToMove.push(space);
      });

      return domMark;
    });

    var domBoard = $('<div data-board>');
    domBoard.append(domMarks);

    return domBoard;
  };

  BoardUi.prototype._createDomResult = function(board) {
    return $('<div data-result="' + this._getResultFor(board) + '"/>');
  }

  BoardUi.prototype._getResultFor = function(board) {
    var outcome = this._rules.outcomeOf(board);

    if (!outcome.isFinished) {
      return '';
    }

    if (outcome.winner === null) {
      return 'draw';
    }

    return outcome.winner;
  }

  BoardUi.prototype._addToDom = function(content) {
    $('#' + this._containerId).append(content);
  }

  function valueFor(mark) {
    return mark === null? '' : mark;
  };

  if (typeof Tictactoe === 'undefined') {
    Tictactoe = {};
  }
  Tictactoe.BoardUi = BoardUi;
})();
