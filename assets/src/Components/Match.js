import React from 'react';
import Board from './Board';

class Match extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sequence: this.props.sequence,
            error: false,
            step: this.props.step,
            squares: this.props.squares
        };
    }

    handleClick(i) {
        let squares = this.state.squares;
        let step = this.state.step;

        if (calculateWinner(squares, Math.sqrt(squares.length)) || squares[i]) {
            return;
        }

        squares[i] = this.state.sequence[step % this.state.sequence.length];
        step ++;

        let data = {
          squares,
          step
        };

        fetch(`http://localhost:33333/game/${this.props.id}`,  {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(
            (result) => {
              this.setState(data)
            },
            (error) => this.setState({
              error
            })
          )
  }

  render() {
    const winner = calculateWinner(this.state.squares, Math.sqrt(this.state.squares.length));

    if(this.state.error) {
      return (
          <div className="centered">
              <h1>Error during sync</h1>
          </div>
      );
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
            {winner ? <div>Winner: {winner}</div> : [
                <div key="current">Current {this.state.sequence[this.state.step % this.state.sequence.length]}</div>,
                <div key="next">Next {this.state.sequence[(this.state.step + 1)% this.state.sequence.length]}</div>
            ]}
        </div>
      </div>
    );
  }
}

export default Match;

function calculateWinner(squares, dimension) {
 
  const rows = Array(dimension).fill(null).map((item, indexR) => {
    return  Array(dimension).fill(null).map((item, indexC) => {
      return indexC + indexR * dimension
    })
  });

  const columns = Array(dimension).fill(null).map((item, indexR) => {
    return rows[0].map(item => {
      return rows[item][indexR]
    })
  });

  const diagonals1 = Array(dimension).fill(null).map((itemR, indexR) => {
    return rows[indexR][indexR];
  });

  const diagonals2 = Array(dimension).fill(null).map((itemR, indexR) => {
    return indexR;
  }).reverse().map(itemRev => {
    return rows[itemRev][dimension - itemRev - 1];
  });

  const lines = [
    ...rows,
    ...columns,
    diagonals1,
    diagonals2
  ];

  for (let i = 0; i < lines.length; i++) {
    if(squares[lines[i][0]] && Array(dimension).fill(null).map((item, index) => {
      return squares[lines[i][index]];
    }).every(val => val === squares[lines[i][0]]))
      return squares[lines[i][0]];
  }
  return null;
}