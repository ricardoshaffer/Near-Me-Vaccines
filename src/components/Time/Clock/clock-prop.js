import React  from 'react';
import Moment from 'react-moment';
 
export default class MomentTime extends React.Component {

    render() {
        
        const currentHour = (this.props.hours);
        var visible="";
        if (currentHour !== "invalid date") {
            visible= "visible"
        }else {
          visible= "hidden"
        }
            return (
                <Moment parse="hh:mm" format="hh:mm A" style={{visibility: {visible}}}>{this.props.hours}</Moment>
        )
    }
}