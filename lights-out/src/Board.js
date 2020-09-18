import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25,
  };

  state = {
    hasWon: false,
    board: this.createBoard(),
  };

  createBoard() {
    let board = [];

    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];

      for (let x = 0; x < this.props.ncols; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }

      board.push(row);
    }
    return board;
  }

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split('-').map(Number);

    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x); // Flip initial cell
    flipCell(y, x - 1); // flip left
    flipCell(y, x + 1); // flip right
    flipCell(y - 1, x); // flip below
    flipCell(y + 1, x); // flip above

    let hasWon = board.every((row) => row.every((cell) => !cell));

    this.setState({ board, hasWon });
  }

  makeBoard = () => {
    let tblBoard = [];

    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];

      for (let x = 0; x < this.props.ncols; x++) {
        let coord = `${y}-${x}`;

        row.push(
          <Cell
            key={coord}
            isLit={this.state.board[y][x]}
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />
        );
      }

      tblBoard.push(<tr key={y}>{row}</tr>);
    }

    return (
      <table className="Board">
        <tbody>{tblBoard}</tbody>
      </table>
    );
  };

  render() {
    return (
      <div>
        {this.state.hasWon ? (
          <div className="winner">
            <div className="neon-orange">YOU</div>
            <div className="neon-blue">WIN</div>
          </div>
        ) : (
          <div>
            <div className="Board-title">
              <div className="neon-orange">Lights</div>
              <div className="neon-blue">Out</div>
            </div>
            {this.makeBoard()}
          </div>
        )}
      </div>
    );
  }
}

export default Board;