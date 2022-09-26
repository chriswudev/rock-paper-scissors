import React from 'react';
import Player from './Player';

const Challenge = ({ player1, player2 }) => (
  <div className="Challenge">
    <Player {...player1} />
    <span className="vs">vs</span>
    <Player {...player2} />
  </div>
);

export default Challenge;
