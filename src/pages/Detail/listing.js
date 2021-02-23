import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { geolocated } from "react-geolocated";
import { API, Storage } from 'aws-amplify';
import {getTodo} from '../../graphql/queries';
import { Row, Col } from "react-bootstrap";
import GoogleMapDesign from '../../components/Map/design';
import UserComponent from '../../components/Map/user-pin';
import BusinessPin from '../../components/Map/business-pin';
import MomentTime from '../../components/Time/12Hr/index';
import './style.css';


class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    itemsIncluded: [''],
    website: ''
    };
  }

 
 componentDidMount() {
    API.graphql({ query: getTodo, variables: { id: this.props.location_id }})
.then((results) => {
            this.setState(results.data.getTodo);
    }).then(async() => {
     Storage.get(this.state.image).then((response) => {
        console.log(response);
        this.setState({
          image: response,
        })
     }
      )
      
    })
}

  render() { 

    const  lat = Number(this.state.lat)
    const lng =Number(this.state.lng)
    console.log("lat & long: " + this.state.lat + this.state.lng)
    return !this.props.isGeolocationAvailable ? (
      <div>
      Your browser does not support Geolocation
      </div>
      ) : !this.props.isGeolocationEnabled && this.state.lat && this.state.lng ? (
<>
        <Row>
          <Col xs={12} md={6}>
          <h3>hey, {this.state.firstName}. Now, set the hours for {this.state.businessName}</h3>

        <h3>Current hours</h3>
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
            <span className="hoursTime"><MomentTime hours={this.state.monO}/> - <MomentTime hours={this.state.monC}/></span>
            <span className="hoursTime"><MomentTime hours={this.state.tueO}/> - <MomentTime hours={this.state.tueC}/> </span>
            <span className="hoursTime"><MomentTime hours={this.state.wedO}/> - <MomentTime hours={this.state.wedC}/></span>
            <span className="hoursTime"><MomentTime hours={this.state.thuO}/> - <MomentTime hours={this.state.thuC}/></span>
            <span className="hoursTime"><MomentTime hours={this.state.friO}/> - <MomentTime hours={this.state.friC}/></span>
            <span className="hoursTime"><MomentTime hours={this.state.satO}/> - <MomentTime hours={this.state.satC}/> </span>
            <span className="hoursTime"><MomentTime hours={this.state.sunO}/> - <MomentTime hours={this.state.sunC}/></span>
        </Col>
        </Row>
          </Col>
      <Col xs={12} md={6}>
        <Row className="mt-5">
          <div className="text-center">
            <h2 className="text-center">{this.state.businessName}</h2>
              <ul>
                <li>{this.state.businessAddress}</li>
                <li>{this.state.city}, {this.state.state}, {this.state.zip}</li>
                <li>{this.state.businessPhone}</li>
              </ul>
            <hr></hr>
            <div><img src={this.state.image} style={{width: 400}} /></div>
            </div>
        </Row>
      </Col>
      </Row>
        <Row className="mt-5">
        <div style={{ height: '500px', width: '100%', geometry: '#220942' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyAiQ9gp33RkQcJCO7iqgOyxKenNpcLQJcQ' }}
            defaultCenter={{
              lat: lat,
              lng: lng
            }}
            defaultZoom= {11} 
            options={GoogleMapDesign}
          >
            <BusinessPin
                lat= {this.state.lat}
                lng= {this.state.lng}
            />
          </GoogleMapReact>
        </div>
        </Row>
      </>
 ) : this.props.coords && this.state.lat && this.state.lng? (
      <>
        <Row>
          <Col xs={12} md={6}>
          <h3>The details: {this.state.businessName}</h3>

        <h3>Current hours</h3>
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
            <span className="hoursTime"><MomentTime hours={this.state.monO}/> - <MomentTime hours={this.state.monC}/></span>
            <span className="hoursTime"><MomentTime hours={this.state.tueO}/> - <MomentTime hours={this.state.tueC}/> </span>
            <span className="hoursTime"><MomentTime hours={this.state.wedO}/> - <MomentTime hours={this.state.wedC}/></span>
            <span className="hoursTime"><MomentTime hours={this.state.thuO}/> - <MomentTime hours={this.state.thuC}/></span>
            <span className="hoursTime"><MomentTime hours={this.state.friO}/> - <MomentTime hours={this.state.friC}/></span>
            <span className="hoursTime"><MomentTime hours={this.state.satO}/> - <MomentTime hours={this.state.satC}/> </span>
            <span className="hoursTime"><MomentTime hours={this.state.sunO}/> - <MomentTime hours={this.state.sunC}/></span>
        </Col>
        </Row>
          </Col>
      <Col xs={12} md={6}>
        <Row className="mt-5">
          <div className="text-center">
            <h2 className="text-center">{this.state.businessName}</h2>
              <ul>
                <li>{this.state.businessAddress}</li>
                <li>{this.state.city}, {this.state.state}, {this.state.zip}</li>
                <li>{this.state.businessPhone}</li>
              </ul>
            <hr></hr>
            <div><img src={this.state.image} style={{width: 400}} /></div>
            </div>
        </Row>
      </Col>
      </Row>
        <Row className="mt-5">
        <div style={{ height: '500px', width: '100%', geometry: '#220942' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyAlqfBFDaTaFhiRW1Eqh48Wzd2gw98ezxM' }}
            defaultCenter={{
              lat: lat,
              lng: lng
            }}
            defaultZoom= {14} 
            options={GoogleMapDesign}
          >
            <UserComponent 
                lat={this.props.coords.latitude} 
                lng={this.props.coords.longitude} 
                text={'you'}
            />
            <BusinessPin
                lat= {this.state.lat}
                lng= {this.state.lng}
            />
          </GoogleMapReact>
        </div>
        </Row>
      </>
        ) : (
            <div>Getting the location data&hellip; </div>
        );
    }
}
export default geolocated ({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 10000,
    watchPosition: false,
    userDecisionTimeout: null,
    suppressLocationOnMount: false,
    geolocationProvider: navigator.geolocation,
    isOptimisticGeolocationEnabled: true
    })(Listing);