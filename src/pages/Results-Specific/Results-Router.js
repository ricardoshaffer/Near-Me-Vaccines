import React, { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import { List, ListItem } from "../../components/List";
import {listStateInfos} from '../../graphql/queries';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import './style.css';



function BusinessType() {
  var pathArray = window.location.pathname.split('/');
  const business_type = pathArray[2];
  //const parsedRisk =business_type.split('+');
  var risk_type = Number(business_type); 
  const [currentPhase, setCurrentPhase] =useState([]);
  const [notes, setNotes] = useState([]);
  const [riskType, setRiskType] = useState([]);
  console.log(risk_type);
    useEffect(() => {
        fetchNotes();
      }, []);

      var stateFilter = {
        currentPhase: {
            eq: risk_type // filter priority = 1
        }
      };
      var testing= {};
  
     
      function mergeStateData(){
        let itemized = {};
        for(let i=0; i< risk_type.length; i++) {
          itemized += 
          {currentItem: {
            eq: risk_type[i] // filter priority = 1
           }};
           console.log(itemized);
        } 
          setCurrentPhase(itemized);
        ;
      }
 
      async function fetchNotes() {
        mergeStateData();
        console.log(mergeStateData());
        console.log("current phase: " + currentPhase)
        console.log("testing: " + testing);
        setRiskType(risk_type)
        console.log(riskType)
        console.log(risk_type)
        console.log(stateFilter);



        const testData = await API.graphql({query: listStateInfos});
        const filteredData = testData.data.listStateInfos.items;
        console.log(testData.data.listStateInfos.items);
        // await Promise.all(testData.data.listStateInfos.items);
        await Promise.all(filteredData.map(async item => {
          console.log("Parsed State: "+item.currentPhase + "Parsed Search"+risk_type)
          var currentItem = Number(item.currentPhase);
      if (currentItem >= risk_type) {
         item.image = true;
         return item
      }
      return !item.id;
      
    })).then(()=>{setNotes(filteredData);  })
         
      }

    return (

        <div>
          
          
          <List>
          {notes.map(note => {
                 return note.image === true ?
                  
                  <ListItem key={note.id}>
                   <Row>
                    <Col xs={12} md={5} className="vertical-align">
                      <a href={"/State-Locations/" + note.stateID}>
                        <ul>
                          <li><h2 className="business-title">{note.currentPhase}</h2></li>
                          <li>{note.stateID}</li>
                          <li>{note.history}</li>
                        </ul>
                      </a>
                    </Col>
                    <Col xs={12} md={2} className="vertical-align">
                        <Button className="external-link-button" href={"/State-Locations/" + note.stateID}>View {note.stateID} State</Button>
                    </Col>
                   </Row>
                  </ListItem>
                :  
                    <></>})}
              </List>
        </div>
    
    )
            };
            
export default BusinessType;