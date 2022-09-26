import React from 'react';
import Loading from './Loading';

const Hand = ({ icon, loading }) => (
  <span
    className={!loading && icon ? `Hand fa fa-hand-${icon}-o` : 'Hand empty'}
  >
    {!loading && !icon && '?'}
    {loading && <Loading />}
  </span>
);

export default Hand;
