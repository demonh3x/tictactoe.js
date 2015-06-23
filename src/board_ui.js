(function() {
  function BoardUi() {
    this.onMoveListener = function(){};
  };

  BoardUi.prototype.setOnMoveListener = function(listener) {
    this.onMoveListener = listener;
  };

  BoardUi.prototype.update = function(marks) {
    this.clear();
    this.createBoardWith(marks);
  };

  BoardUi.prototype.clear = function() {
    this.board && this.board.remove();
  };

  BoardUi.prototype.createBoardWith = function(marks) {
    var that = this;

    var domBoard = $('<div data-board>');
    var domMarks = marks.map(function(mark, index) {
      var domMark = $('<div data-mark="' + valueFor(mark) + '"/>');
      domMark.click(function() {
        that.onMoveListener(index);
      });

      return domMark;
    });
    domBoard.append(domMarks);

    this.board = domBoard;
    $('body').append(domBoard);
  };

  function valueFor(mark) {
    return mark === null? '' : mark;
  };

  if (typeof Tictactoe === 'undefined') {
    Tictactoe = {};
  }
  Tictactoe.BoardUi = BoardUi;
})();
