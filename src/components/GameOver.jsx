import React from 'react';

function GameOver(props) {
    const { highScore, onRestart } = props;

    return (
        <div>
            <h1>Game Over</h1>
            <p>Highscore: {highScore}</p>
            <button onClick={onRestart}>Restart</button>
        </div>
    );
}

export default GameOver;
