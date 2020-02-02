import React from 'react';
import Match from './Match';
import Loading from './Loading';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            loading: true,
            error: false,
            dimension: 3,
            stepNumber: 0,
            sequences: ['X', '0'],
            squares: Array(Math.pow(3, 2)).fill(null)
        };
    }

    componentDidMount () {
        const { id } = this.props.match.params

        this.setState({
            loading: true
        });
    
        fetch(`http://localhost:33333/game/${id}`, {method: 'GET', mode: 'cors'})
            .then(res => res.json())
            .then(
            (result) => {
                this.setState({
                    id,
                    loading: false,
                    squares: result.squares,
                    sequences: result.sequences,
                    dimension: Math.sqrt(result.squares.length),
                });
            },
            (error) => {
                this.setState({
                    loading: false,
                    error: error
                });
            }
        )
    }

    render() {
        if(this.state.loading) {
            return (
                <Loading/>
            );
        }

        if(!this.state.loading && this.state.error) {
            return (
                <div className="centered">
                    MATCH NOT FOUND                    
                </div>
            );
        }

        return (
            <Match
                id={this.state.id}
                dimension={this.state.dimension}
                stepNumber={this.state.stepNumber}
                sequences={this.state.sequences}
                squares={this.state.squares} />
        );
    }
}
export default Game
