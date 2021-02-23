import React from 'react';

const statePhases = ({lat, lng}) => (

  // Monday = (mOpen + mClose),
    <div lat={lat} lng={lng} style={{
      color: 'white', 
      backgroundColor: '#ff3333',
      padding: '5px 5px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)',
      boxShadow: '0px 0px 0px 3px rgba(255,51,51,0.5)'
    }} >
    </div>
  );
  export default statePhases;