import React from 'react';
import './user-pin.css';

const UserComponent = ({lat, lng}) => (
      <div lat={lat} lng={lng} className="userPin throb"
    />
  );
    
  export default UserComponent;