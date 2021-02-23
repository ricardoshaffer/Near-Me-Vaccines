import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { List, ListItem } from "../../components/List";
import { listStateInfos } from '../../graphql/queries';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './style.css';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
library.add(faEdit);

function SpecificState() {
    useEffect(() => {
        fetchNotes();
      }, []);
      const stateMatch = '';
    var pathArray = window.location.pathname.split('/');
    const state_id = pathArray[2];
      const [stateInfo, setStateInfo] = useState([]);
      console.log("State Type: " + state_id);
      async function fetchNotes() {
        const apiData = await API.graphql({ query: listStateInfos });
        const notesFromAPI = await apiData.data.listStateInfos.items;
        await Promise.all(notesFromAPI.map(async item => {
            return item;
          })).then(() => setStateInfo(apiData.data.listStateInfos.items));
          matchStates();
          
      }
    async function matchStates(){
      const stateMatch = stateInfo.some(state => {if(state.stateID.includes(state_id)) return true });
      console.log("statematch: "+ stateMatch);
    }
    return ( 
      !stateMatch && !stateInfo ?(
 <div>    
<h3 className="missing-Data">Hmmm... it looks like we don't have any updates from your state</h3>
</div> 
):(<>
</>),

          <List>
          {stateInfo.map(state => {
                 return state.stateID === state_id  && !state.id.length < 1  ?
                  <ListItem key={state.id}>
                   <Row className="max-width">
                    <Col xs={12} md={12} className="state-data">
                        <ul className="no-bullets">
                          <li><h2 className={'title-'+ `${state.currentPhase}`}>{state.stateID}</h2></li>
                          <li>{state.history}</li>
                          <li><a href={state.websiteState} rel="next">{state.websiteState}</a></li>
                          <a href={"/State-Update/" + state.id}>
                            <FontAwesomeIcon icon={faEdit} alt="Edit State Details" />
                            </a>
                        </ul>
                    </Col>
                   </Row>
                  </ListItem>
          :
                <></>
              }
              )}

          </List>
        
      )
 
        };
            
export default SpecificState;