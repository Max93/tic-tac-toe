import React from 'react';
import Match from './Match';
import Loading from './Loading';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
        };
    }

    componentDidMount () {
        const { id } = this.props.match.params

        this.setState({
            loading: true
        });

        fetch(`http://localhost:33333/game/${id}`, {method: 'GET', mode: 'cors', cache: 'no-cache'})
            .then(res => res.json())
            .then(
            (result) => {
                this.setState({
                    loading: false,
                    id,
                    step: result.step,
                    sequence: result.sequence,
                    squares: result.squares.map((square) => {
                        return square === "null" ? null : square
                    })
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
                sequence={this.state.sequence}
                step={this.state.step}
                squares={this.state.squares}
                id={this.state.id}
            />
        );
    }
}
export default Game
