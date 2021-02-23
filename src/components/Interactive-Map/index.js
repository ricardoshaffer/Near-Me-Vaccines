import React, { Component } from 'react';
import {Redirect, withRouter } from "react-router-dom";
import './style.css'; /* optional for styling like the :hover pseudo-class */
import USAMap from "react-usa-map";


class InteractiveMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navigate: false,
            referrer: null,
        };
    }

    mapHandler = (event) => {
        console.log('Button is cliked!');
        this.setState({referrer: '/State-Locations/'+ event.target.dataset.name});
    }




  render() {

    const {referrer} = this.state;
    if (referrer) return <Redirect to={referrer}/>;

    return (
      <div className="App">
        <USAMap onClick={this.mapHandler} />
  
      </div>
    );
  }
}

export default withRouter(InteractiveMap);