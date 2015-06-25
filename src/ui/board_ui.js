(function() {
  const BOARD_TEMPLATE =
    '<div class="board" data-board>' +
      '<div class="mark" data-mark/>' +
      '<div class="mark" data-mark/>' +
      '<div class="mark" data-mark/>' +
      '<div class="mark" data-mark/>' +
      '<div class="mark" data-mark/>' +
      '<div class="mark" data-mark/>' +
      '<div class="mark" data-mark/>' +
      '<div class="mark" data-mark/>' +
      '<div class="mark" data-mark/>' +
    '</div>';

  const RESULT_TEMPLATE =
    '<div>' +
      '<div data-result/>' +
      '<p class="announcement"></p>' +
      '<a class="new-game" href="">New game</a>' +
    '</div>';

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
    this._domBoard = this._createDomBoardWith(board);
    this._addToDom(this._domBoard);
  }

  BoardUi.prototype._updateResult = function(board) {
    this._domResult && this._domResult.remove();
    this._domResult = this._createDomResult(board);
    this._addToDom(this._domResult);
  }

  BoardUi.prototype._createDomBoardWith = function(board) {
    var that = this;
    var marks = board.marks();

    var template = $(BOARD_TEMPLATE);
    marks.forEach(function(mark, space) {
      var domMark = template.find('[data-mark]:nth-child(' + (space +1) + ')');
      domMark.attr('data-mark', valueFor(mark));
      if (mark) {
        domMark.addClass(mark);
      } else {
        domMark.addClass('empty');
      }
      domMark.click(function() {
        that._spacesToMove.push(space);
      });
    });

    return template;
  };

  BoardUi.prototype._createDomResult = function(board) {
    var outcome = this._rules.outcomeOf(board);

    var result = this._getResultFor(outcome);
    var announcement = this._getAnnouncementFor(outcome);

    var template = $(RESULT_TEMPLATE);
    template.find('[data-result]').attr('data-result', result);
    template.find('.announcement').text(announcement);
    return template;
  }

  BoardUi.prototype._getResultFor = function(outcome) {
    if (!outcome.isFinished) {
      return '';
    }
    if (outcome.winner === null) {
      return 'draw';
    }
    return outcome.winner;
  }

  BoardUi.prototype._getAnnouncementFor = function(outcome) {
    if (!outcome.isFinished) {
      return '';
    }
    if (outcome.winner === null) {
      return 'It is a draw!';
    }
    return 'The winner is ' + outcome.winner + '!';
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
