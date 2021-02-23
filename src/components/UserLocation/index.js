import React  from 'react';

 
export default class UserLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setCoordsLat: "",
            setCoordsLng: ""
        }
    };
    async componentDidMount(){
        if(navigator.geolocation){
              navigator.geolocation.getCurrentPosition(async function(position){
                console.log("COMP Latitude is :", position.coords.latitude);
                console.log("COMP Longitude is :", position.coords.longitude);
                 this.setState({
                    setCoordsLng: position.coords.longitude,
                    setCoordsLat: position.coords.latitude
                  })

                })

}
    }
}