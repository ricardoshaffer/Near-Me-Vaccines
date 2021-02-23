import React from 'react';
import MapModal from './modal';
import { library} from '@fortawesome/fontawesome-svg-core';
import { faTooth,faUserMd, faPaw, faCut, faWineBottle, faPrescription } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import './style.css'
library.add(faTooth,faUserMd, faPaw, faCut,faWineBottle, faPrescription)
library.add(faWineBottle, faUserCircle);

const PopUpComponent = ({lat, lng, bName, bStreet, bAddZip, bAddCit, bAddSt, mOpen, mClose, tOpen, tClose, wOpen, wClose, thOpen, thClose, fOpen, fClose, saOpen, saClose,suOpen,suClose, itemsIncluded, walkInAvailable, statePhase, key, locationID}) => (
  // Monday = (mOpen + mClose),
    <div lat={lat} lng={lng} style={{
      color: 'white', 
      backgroundColor: '#ff3333',
      padding: '5px 5px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '20%',
      transform: 'translate(-50%, -50%)',
      boxShadow: '0px 0px 0px 3px rgba(255,51,51,0.5)'
    }} >
      {/* <BoolTime hours={<OpenClosed openingHour={mOpen} closingHour={mClose}></OpenClosed>}/> */}
    {/* <OpenClosed openingHour={mOpen} closingHour={mClose}></OpenClosed> */}
      <MapModal
      businessName={bName}
      businessStreet={bStreet}
      businessCity={bAddCit}
      businessZip={bAddZip}
      businessState={bAddSt}
      monOpen={mOpen}
      monClose={mClose}
      tueOpen={tOpen}
      tueClose={tClose}
      wedOpen={wOpen}
      wedClose={wClose}
      thuOpen={thOpen}
      thuClose={thClose}
      friOpen={fOpen}
      friClose={fClose}
      satOpen={saOpen}
      satClose={saClose}
      sunOpen={suOpen}
      sunClose={suClose}
      buttonIcon={itemsIncluded} 
      walkInAvailable={walkInAvailable}
      statePhase={statePhase}
      locationID={locationID}
      listingID={key}
      />
    </div>
  );
  export default PopUpComponent;