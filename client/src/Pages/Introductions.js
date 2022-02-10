import React from 'react';

function Introductions(props) {
  return (
    <div style={{textAlign: 'center'}}>
        <h1>CS480X A3 Experiment</h1>
        {props.numPage === 0 ? <p>The idea of this Experiment is to study people's percetions regarding charts</p>: null}
    </div>
  );
}

export default Introductions;
