import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import {listTodos, listStateInfos} from '../../graphql/queries';
import GoogleMapReact from 'google-map-react';
import GoogleMapDesign from '../../components/Map/design';
import UserComponent from '../../components/Map/user-pin';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Banner from '../../components/Map/geolocation-check';
import './style.css';
import PopUpComponent from '../../components/Modal/index';
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
  listingID: '',
  }
  const geoLocationData = {
    geoError: null
  }

function Results() {
    const [notes, setNotes] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [locationData, setLocationData] = useState(initialFormState);
    const [merged, setMerged] = useState([]);
    const [geoLocation, setGeoLocation] = useState(geoLocationData);
    const [coordsLat, setCoordsLat] = useState(Number());
    const [coordsLng, setCoordsLng] = useState(Number());
    
    
    useEffect(() => {
        fetchNotes();
      }, []);
    
      async function fetchNotes() {
        const apiData = await API.graphql({ query: listTodos });
        const apiState = await API.graphql({ query: listStateInfos });
        const notesFromAPI = apiData.data.listTodos.items;
        await Promise.all(notesFromAPI.map(async item => {
            if (item.id) {
              item.image = item.id;
            }
            return item
            
          }))
          
          
          setStateData(apiState.data.listStateInfos.items);
          setNotes(apiData.data.listTodos.items)
          console.log(apiData.data.listTodos.items);
            console.log(apiState.data.listStateInfos.items)
            console.log(locationData)
            return mergeStateData({notes: apiData.data.listTodos.items},{stateData: apiState.data.listStateInfos.items});

    }
    
    function mergeStateData({notes},{stateData}){
      for(let i=0; i< notes.length; i++) {
        merged.push({
      ...notes[i],
      ...(stateData.find((note) => note.stateID === notes[i].state))},
      );
    ;};fetchCoords();
    console.log(merged);
    var meters_per_pixel = Math.log(156543.03392 * Math.cos(38.8053777 * Math.PI / 180) / Math.pow(2, 3));
    console.log(meters_per_pixel);
    return mergeStateData;

  }
  
      function fetchCoords() {
        navigator.geolocation.getCurrentPosition(function(position) {
          setCoordsLat(position.coords.latitude);
          setCoordsLng(position.coords.longitude);
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
        },
        async (err) => {
          setGeoLocation({
            geoError: err.message
          });
          console.log(err.message);
      })
      console.log(geoLocation.geoError);
    }

      

    return (
       !coordsLng ?(

        <Banner geoError={geoLocation.geoError}/>

      ):(
        <Container className="responsive-container">
        <Row className="mt-5">
          <div style={{ height: '500px', width: '100%', geometry: '#220942' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: API_KEY_GOOGLE }}
              defaultCenter={{
                lat: coordsLat,
                lng: coordsLng
              }}
              defaultZoom= {12} 
              options={GoogleMapDesign}
            >
            <UserComponent
              lat= {coordsLat} 
              lng={coordsLng}
              text={'you'}
            />
            {merged.map(merged => (
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
    )
    )
            };
            
export default Results;