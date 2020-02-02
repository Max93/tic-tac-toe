import React from 'react';
import Board from './Board';
import Loading from './Loading';

class GameConfig extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: false,
            id: 0,
            dimension: 3,
            sequence: ['X', '0', '', '']
        };
    }

    sendData() {
        this.setState({
            loading: true
        });
    
        fetch("http://localhost:33333/game", {method: 'POST', mode: 'cors'})
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        id: result,
                        loading: false
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
        if(this.state.error) {
            return (
                <div className="centered">
                    <h1>Error during sync</h1>
                </div>
            );
        }

        if(this.state.loading) {
            return (
                <Loading />
            );
        }
    
        if(!this.state.loading && !this.state.error && this.state.id) {
            this.props.history.push(`/${this.state.id}`);
        }

        return (
            <div>
                <div className="centered">
                    <select value={this.state.value} onChange={(event) => this.setState({dimension: event.target.value})}>>
                        <option value={3}>3</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                    </select>
                    <div>
                        PLAYERS N. {this.state.sequence.length}<br></br>
                        {Array(4).fill(null).map((item, index) => {
                            return [
                                <label key={`player-${index}`}>
                                    PLAYER {index + 1}
                                    <input type="text" value={this.state.sequence[index]} onChange={(event) => {
                                        if(event.target.value.length > 1)
                                            return;
                                
                                        if(this.state.sequence.includes(event.target.value) && event.target.value !== '')
                                            return;

                                        if(this.state.sequence.indexOf(index - 1) && this.state.sequence[index - 1] === '' )
                                            return;
                                        
                                        if(index < 2 && event.target.value === '')
                                            return;

                                        let sequence = [...this.state.sequence];
                                        sequence[index] = event.target.value;

                                        this.setState({sequence})
                                    }} />
                                </label>,
                                <br key={`br-${index}`}></br>
                                ]
                        })}
                    </div>
                </div>
                PREVIEW
                <Board
                    squares={Array(Math.pow(this.state.dimension, 2)).fill(null)}
                    onClick={() => {}}
                />
                <div>
                PLAYERS N. {this.state.sequence.length}<br></br>
                {this.state.sequence.map((s, sIndex) => {
                    return s.length > 0 ? <div key={`player-preview-${sIndex}`}>
                       PLAYER  {sIndex + 1} : {s}
                    </div> : ''
                })}
                </div>
                <div className="centered">
                    <button onClick={() => this.sendData()}>
                        GENERATE GAME
                    </button>
                </div>
            </div>
        );
  }
}
export default GameConfig