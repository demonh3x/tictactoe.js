(function() {
  function Rules() {}

  Rules.prototype.outcomeOf = function(board) {
    return {
      isFinished: isFinished(board),
      winner: winner(board)
    };
  }

  function isFinished(board) {
    return isFull(board) || thereIsAWinnerIn(board);
  }

  function isFull(board) {
    return board.marks().every(isOccupied);
  }

  function isOccupied(mark) {
    return mark;
  }

  function thereIsAWinnerIn(board) {
    return board.lines().some(containsSameMark);
  }

  function containsSameMark(line) {
    return line.every(function(mark) {
      return isOccupied(mark) && mark == line[0];
    });
  }

  function winner(board) {
    return board.lines()
      .filter(containsSameMark)
      .reduce(firstMarkOfFirstLine, null)
  }

  function firstMarkOfFirstLine(mark, line) {
    return mark ? mark : line[0];
  }

  if (typeof Tictactoe === 'undefined') {
    Tictactoe = {};
  }
  Tictactoe.Rules = Rules;
})();
