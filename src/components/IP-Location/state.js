import React, { useState, useEffect } from 'react';
import IPTracer from '../../components/IP-Location';
import {listStateInfos} from '../../graphql/queries';
import { API } from 'aws-amplify';
import './style.css';

var location_id = '';
var state_name = '';
function StateIP({stateID, stateName}) {
    location_id = stateID;
    state_name = stateName;
    const [currentLoc, setCurrentLoc] = useState('');
    const [stateData, setStateData] = useState([]);
    const [stateHistory, setStateHistory] = useState('');
    // setCurrentLoc(<IPTracer/>);
    useEffect(() => {
        fetchLocation()
        // fetchLocation().then(fetchStateData());
      }, []);
      
      async function fetchLocation(){
        setCurrentLoc(location_id);
        console.log("location ID: " + location_id  + state_name +", CurrentLocation: " + currentLoc)

        
        let filter = {
            stateID: {
                contains: location_id // filter priority = 1
            }
        };
        const apiData = await API.graphql({ query: listStateInfos, variables: {filter: filter, limit: 52 } })
        setStateData(apiData.data.listStateInfos.items);
        setStateHistory(apiData.data.listStateInfos.items[0].history);
        console.log("with brackets: " + {currentLoc}, "without brackets: " + currentLoc + ", Location ID: " + `${location_id}`);
    }
    return (
        state_name? (
        <><span className="stateLabel">{state_name}</span> : {stateHistory}</>
        ):(<span className="ignored-data"></span>)
    )}
export default StateIP;