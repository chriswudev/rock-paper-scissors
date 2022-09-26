import React from 'react';
import Button from './Button';
import Hand from './Hand';

const HandList = ({ hands, onClickHand }) => (
  <div className="HandList">
    <ul>
      {hands.map((hand) => (
        <li key={hand}>
          <Button onClick={() => onClickHand(hand)}>
            <Hand icon={hand} />
          </Button>
        </li>
      ))}
    </ul>
    <span className="label">CHOOSE A HAND</span>
  </div>
);

export default HandList;
