import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Game from './Components/Game';
import GameConfig from './Components/GameConfig';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/:id" component={Game} />
                    <Route path="/" component={GameConfig} />
                </Switch>
            </Router>
        );  
    }
}

export default App;