import React, { useState, useEffect } from 'react';
import Amplify, { API } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import {listTodos, listStateInfos} from '../../graphql/queries';
import GoogleMapReact from 'google-map-react';
import GoogleMapDesign from '../../components/Map/design';
import UserComponent from '../../components/Map/user-pin';
import PopUpComponent from '../../components/Modal/index';
import { List, ListItem } from "../../components/List";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Calendar from '../../components/Time/Calendar/index';
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import './style.css';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { string } from 'yup';
import { isString } from 'formik';
library.add(faEdit);

Amplify.configure(awsconfig);

const step1Content = <h1>Step 1 Content</h1>;
const step2Content = <h1>Step 2 Content</h1>;
const step3Content = <h1>Step 3 Content</h1>;

const initialFormState = {
    id: '',
    stateID: '',
    currentPhase: '',
    history: '',
    websiteState: '',
    }
  var pathArray = window.location.pathname.split('/');
  const state_id = pathArray[2];
function StateLocations() {
    const [notes, setNotes] = useState([]);
    const [stateInfo, setStateInfo] = useState([]);
    const [latAvg, setLatAvg] = useState(Number());
    const [lngAvg, setLngAvg] = useState(Number());
    const [reopeningPhase, setCurrentPhase] = useState(Number());
    const [averageListings, setAverageListings]= useState(false);
    var pathArray = window.location.pathname.split('/');
    const state_id = pathArray[2];
 
    
    useEffect(() => {
        fetchNotes();
      }, []);
      var filter = {
        state: {
            eq: state_id // filter priority = 1
        }
    };
    var stateFilter = {
        stateID: {
            eq: state_id // filter priority = 1
        }
    };
    console.log(filter, stateFilter);
      async function fetchNotes() {
    
        const apiData = await API.graphql({query: listTodos, variables: {filter: filter}});
        const stateAPIData = await API.graphql({query: listStateInfos, variables: {filter: stateFilter}});
        const notesFromAPI = apiData.data.listTodos.items;
        setCurrentPhase(stateAPIData.data.listStateInfos.items[0].currentPhase);
        setNotes(apiData.data.listTodos.items);
        setStateInfo(stateAPIData.data.listStateInfos.items);
        await Promise.all(notesFromAPI.map(async item => {
            if (item.id) {
              item.image = item.id;
            }
            return item
            
          })).then(()=>{
            console.log("current phase: " + reopeningPhase);
          //averageCoordinates({notes: apiData.data.listTodos.items});
          var notes = apiData.data.listTodos.items;
          var lattotal = 0;
        var lngtotal = 0;
         for(var i = 0; i < notes.length; i++) {
            // var latNum = ;
            // var lngNum = ;
            lattotal += Number(notes[i].lat);
            lngtotal += Number(notes[i].lng);
        }
        setLatAvg(lattotal/notes.length)
        setLngAvg(lngtotal/notes.length);
        pullMap(lattotal);
        console.log(latAvg,lngAvg);
          
    })}
    console.log("current phase: " + reopeningPhase);
    function pullMap(lattotal){
      if(lattotal === 0){
        setAverageListings(false);
      } else{
        setAverageListings(true);
      }
      console.log(averageListings);
    }
  

    return (
   averageListings === false ? (

<div>
{stateInfo.map(stateInfo => (

<Container>
<h2 className="stage-heading">{stateInfo.stateID} Current Vaccination Phase:</h2>
<span className="vaccine-updated">last updated: <Calendar updatedAt= {stateInfo.updatedAt}/></span>
<StepProgressBar
  buttonWrapperClass="form-button"
  progressClass="list-group list-group-horizontal-sm"
  steps={[
    {
      label: 'Critical Healthcare',
      name: 'Critical Healthcare',
      content: `${stateInfo.history}`,
    },
    {
      label: 'Long-Term Residents & Staff',
      name: 'Long-Term Residents & Staff',
      content: `${stateInfo.history}`,
    },
    {
      label: 'Frontline Critical',
      name: 'Frontline Critical',
      content: `${stateInfo.history}`,
    }
    ,
    {
      label: 'Upper Seniors*',
      name: 'Upper Senior Citizens*',
      content: `${stateInfo.history}`,
    },
    {
      label: 'Senior Citizens*',
      name: 'Senior Citizens*',
      content: `${stateInfo.history}`,
    }
    ,
    {
      label: 'Pre-Existing Cond',
      name: 'Pre-Existing Conditions',
      content: `${stateInfo.history}`,
    }
    ,
    {
      label: 'Other Essential Workers',
      name: 'Other Essential Workers',
      content: `${stateInfo.history}`,
    },
    {
    label: 'All 16+',
    name: 'All 16+',
    content: `${stateInfo.history}`,
  }
  ]}
  startingStep= {stateInfo.currentPhase}
/>

<List>
  <ListItem key={stateInfo.id}>
    <Row className="max-width">
      <Col xs={12} md={12} className="button-container">
      <Button className="external-link-button" rel="next" href={stateInfo.websiteState} size="lg" >
      Visit {stateInfo.stateID} website
      </Button>
      <span className="registration-disclaimer">* always check with city, county, or state procedures before visiting.</span>
      <a href={"/State-Update/" + stateInfo.id}>
        <FontAwesomeIcon icon={faEdit} alt="Edit State Details" />
        </a>
      </Col>
    </Row>
  </ListItem>
</List>
</Container>
))}


        </div>
      ):(
        <div>
{stateInfo.map(stateInfo => (
  
<Container>
<h2 className="stage-heading">{stateInfo.stateID} Current Vaccination Phase:</h2>
<span className="vaccine-updated">last updated: <Calendar updatedAt= {stateInfo.updatedAt}/></span>
<StepProgressBar
  buttonWrapperClass="form-button"
  progressClass="list-group list-group-horizontal-sm"
  steps={[
    {
      label: 'Critical Healthcare',
      name: 'Critical Healthcare',
      content: `${stateInfo.history}`,
    },
    {
      label: 'Long-Term Residents & Staff',
      name: 'Long-Term Residents & Staff',
      content: `${stateInfo.history}`,
    },
    {
      label: 'Frontline Critical',
      name: 'Frontline Critical',
      content: `${stateInfo.history}`,
    }
    ,
    {
      label: 'Upper Seniors*',
      name: 'Upper Senior Citizens*',
      content: `${stateInfo.history}`,
    },
    {
      label: 'Senior Citizens*',
      name: 'Senior Citizens*',
      content: `${stateInfo.history}`,
    }
    ,
    {
      label: 'Pre-Existing Cond',
      name: 'Pre-Existing Conditions',
      content: `${stateInfo.history}`,
    }
    ,
    {
      label: 'Other Essential Workers',
      name: 'Other Essential Workers',
      content: `${stateInfo.history}`,
    },
    {
    label: 'All 16+',
    name: 'All 16+',
    content: `${stateInfo.history}`,
  }
  ]}
  startingStep= {stateInfo.currentPhase}
/>
  <List>
    <ListItem key={stateInfo.id}>
      <Row className="max-width">
        <Col xs={12} md={12} className="button-container">
          <Button className="external-link-button" rel="next" href={stateInfo.websiteState} size="lg" >
          Visit {stateInfo.stateID} website
          </Button>
          <span className="registration-disclaimer">* always check with city, county, or state procedures before visiting.</span>
            <a href={"/State-Update/" + stateInfo.id}>
            <FontAwesomeIcon icon={faEdit} alt="Edit State Details" />
            </a>
        </Col>
      </Row>
    </ListItem>
  </List>
                </Container>
))}
<Container>

        <Row className="mt-5">
          <div style={{ height: '500px', width: '100%', geometry: '#220942' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: API_KEY_GOOGLE }}
              defaultCenter={{
                lat: latAvg,
                lng: lngAvg
              }}
              defaultZoom= {8} 
              options={GoogleMapDesign}
            >
            <UserComponent
              lat= {latAvg} 
              lng={lngAvg}
              text={'you'}
            />
            {notes.map(merged => (
              <PopUpComponent
                key={merged.image}
                lat={merged.lat}
                lng={merged.lng}
                bName={merged.businessName}
                bStreet={merged.businessAddress}
                bAddZip={merged.zip}
                bAddCit={merged.city}
                bAddSt={merged.state}
                bPhone={merged.businessPhone}
                mOpen={merged.monO}
                mClose={merged.monC}
                tOpen={merged.tueO}
                tClose={merged.tueC}
                wOpen={merged.wedO}
                wClose={merged.wedC}
                thOpen={merged.thuO}
                thClose={merged.thuC}
                fOpen={merged.friO}
                fClose={merged.friC}
                saOpen={merged.satO}
                saClose={merged.satC}
                suOpen={merged.sunO}
                suClose={merged.sunC}
                itemsIncluded="syringe"
                walkInAvailable={merged.walkInAvailable}
                statePhase={merged.currentPhase}
                locationID={merged.image}
              >
            </PopUpComponent>
            ))}
          </GoogleMapReact>
        </div>
      </Row>
      </Container>
        </div>
    
    ))
            };
            
export default StateLocations;

