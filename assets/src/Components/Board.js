import React from 'react';

class Board extends React.Component {
    render() {
        return Array(Math.sqrt(this.props.squares.length)).fill(null).map((item, indexR) => {
            return (
                <div className="board-row" key={`row-${indexR}`}>
                {
                    Array(Math.sqrt(this.props.squares.length)).fill(null).map((item, indexC) => {
                        return (
                            <button className="square" key={`col-${indexC}`} onClick={() => this.props.onClick(indexC + indexR * Math.sqrt(this.props.squares.length))}>
                                {this.props.squares[indexC + indexR * Math.sqrt(this.props.squares.length)]}
                            </button>
                        )
                    })
                }
                </div>
        )
    });
  }
}
export default Board