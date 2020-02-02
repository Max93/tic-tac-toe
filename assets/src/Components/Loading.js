import React from 'react';
import logo from '../logo.svg';

class Loading extends React.Component {
    render() {
        return (
            <div className="centered">
                <img src={logo} className="loading-logo" alt="logo" />
            </div>
        );
    }
}
export default Loading