import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



class Game extends React.Component {
  render() {
    return (
      <div className="game">
      <h1>Ping server</h1>
        <div className="game-board">
          
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>

      </div>
      
    );
  }
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
