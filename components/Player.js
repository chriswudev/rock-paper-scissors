import React from 'react';
import Hand from './Hand';

const Player = ({ label, hand, loading, score }) => (
  <div className="Player">
    <div>
      <span className="label">{label}</span>
    </div>
    <Hand icon={hand} loading={loading} />
    <div>
      <span className="score">
        {score} WIN{score > 1 && 'S'}
      </span>
    </div>
  </div>
);

export default Player;
