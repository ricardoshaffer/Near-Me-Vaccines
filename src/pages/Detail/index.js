import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { getTodo } from '../../graphql/queries';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Row, Col } from "react-bootstrap";
import MomentTime from '../../components/Time/12Hr/index';
import './style.css';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import MetaTags from '../../components/Meta';
library.add(faEdit);

var pathArray = window.location.pathname.split('/');
const location_id = pathArray[2];
const initialFormState = {
  id: '',
  firstName: '',
  lastName: '',
  businessName: '',
  businessPhone: '',
  businessAddress: '',
  city: '',
  state: '',
  zip: '',
  lat: '',
  lng: '',
  monO: '',
  monC: '',
  tueO: '',
  tueC: '',
  wedO: '',
  wedC: '',
  thuO: '',
  thuC: '',
  friO: '',
  friC: '',
  satO: '',
  satC: '',
  sunO: '',
  sunC: '',
  itemsIncluded: '',
  walkInAvailable: Boolean,
  website: '',
  }

function SpecificLocation() {
  
  const [locationData, setLocationData] = useState(initialFormState);
  const [locationInfo, setLocationInfo] = useState([]);
  console.log(location_id);

    useEffect(() => {
      fetchNotes();
      }, []);



  async function fetchNotes() {

      const apiData = await API.graphql({ query: getTodo, variables: {id: location_id }});
      
      setLocationData([initialFormState, apiData.data.getTodo]);
      setLocationInfo(apiData.data.getTodo);
      
  }    
  console.log(locationInfo);

    return ( 
      <><MetaTags
metadescription={`${locationInfo.businessName}` + ' Vaccination Information'}
metatitle={"Sars-Cov-2 Vaccine Site Info in " +`${locationInfo.city}` + `${locationInfo.state}`}
title={`${locationInfo.businessName}` + ' Vaccination Information'}
/>
<main>
      <Row>
          <Col xs={12} md={6}>
          <h3>{locationInfo.businessName}</h3>

        <h3>Phone hours:</h3>
        <Row>
        
        <Col xs='6' md={6}>
          {/* <Currenttime/> */}
            <span className="hoursDay">Monday:</span>
            <span className="hoursDay">Tuesday:</span>
            <span className="hoursDay">Wednesday:</span>
            <span className="hoursDay">Thursday:</span>
            <span className="hoursDay">Friday:</span>
            <span className="hoursDay">Saturday:</span>
            <span className="hoursDay">Sunday:</span>
        </Col>
        <Col xs='6' md={6}>
            <span className="hoursTime"><MomentTime hours={locationInfo.monO}/> - <MomentTime hours={locationInfo.monC}/></span>
            <span className="hoursTime"><MomentTime hours={locationInfo.tueO}/> - <MomentTime hours={locationInfo.tueC}/> </span>
            <span className="hoursTime"><MomentTime hours={locationInfo.wedO}/> - <MomentTime hours={locationInfo.wedC}/></span>
            <span className="hoursTime"><MomentTime hours={locationInfo.thuO}/> - <MomentTime hours={locationInfo.thuC}/></span>
            <span className="hoursTime"><MomentTime hours={locationInfo.friO}/> - <MomentTime hours={locationInfo.friC}/></span>
            <span className="hoursTime"><MomentTime hours={locationInfo.satO}/> - <MomentTime hours={locationInfo.satC}/> </span>
            <span className="hoursTime"><MomentTime hours={locationInfo.sunO}/> - <MomentTime hours={locationInfo.sunC}/></span>
        </Col>
        </Row>
          </Col>
      <Col xs={12} md={6}>
        <Row className="mt-5">
          <div className="text-center">
            <h2 className="text-center">{locationInfo.businessName}</h2>
              <ul>
                <li>{locationInfo.businessAddress}</li>
                <li>{locationInfo.city}, {locationInfo.state}, {locationInfo.zip}</li>
                <li>{locationInfo.businessPhone}</li>
                <strong>do not visit sites without a confirmed appointment</strong>
              </ul>
            <hr></hr>
            <button className="external-btn"><a href={locationInfo.website} data-domain-ext="org">view registration info</a></button>
            </div>
        </Row>
      </Col>
      </Row>
</main>
</>
    )

 
        };
            
export default SpecificLocation;