import React, { Component } from 'react';
import IPTrack from 'ipapi.co';
import StateIP from './state'

const LocationInfo = '';
export default class IPTracer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateLocation: "",
            stateName: ""
        }
    };
  
    componentDidMount() {
        let currentComponent = this;
        IPTrack.location(function(loc, err){
            console.log(loc);
            if (err) {console.log("location Error: " + err); return;}
        currentComponent.setState({
                stateLocation: loc.region_code,
                stateName: loc.region,
              })
        })
        
    }

    render() {
        
        return (
            
            this.state.stateLocation && this.state.stateName ?(
                
          <><StateIP stateName={this.state.stateName} stateID={this.state.stateLocation}/></>
          
        ):(<></>))
      
    }
}
