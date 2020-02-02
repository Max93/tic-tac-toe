import React from 'react';
import Board from './Board';

class Match extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [
                {
                    squares: this.props.squares
                }
            ],
            stepNumber: this.props.stepNumber,
            sequences: this.props.sequences,
            error: false
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares, this.props.dimension) || squares[i]) {
            return;
        }

        squares[i] = this.state.sequences[this.state.stepNumber % this.state.sequences.length]

        fetch(`http://localhost:33333/game/${this.props.id}`, {method: 'PUT', mode: 'cors', body: JSON.stringify(squares)})
            .then(res => res.json())
            .then(
            (result) => {
              this.setState({
                history: history.concat([
                    {
                        squares: squares
                    }
                ]),
                stepNumber: history.length
            });
            },
            (error) => {
                this.setState({
                    error: error
                });
            }
        )
  }

  render() {
    
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares, this.props.dimension);

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
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
            {winner ? <div>Winner: {winner}</div> : [
                <div key="current">Current {this.state.sequences[this.state.stepNumber % this.state.sequences.length]}</div>,
                <div key="next">Next {this.state.sequences[(this.state.stepNumber + 1)% this.state.sequences.length]}</div>
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