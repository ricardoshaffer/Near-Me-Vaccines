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
                <Moment  style={{visibility: {visible} }} parse="hh:mm" format="hh:mm A">{this.props.hours}</Moment>
        )
    }
}

//========== ISSUES DAY OF WEEK WITH THREE LETTERS ========//
// const dateToFormat = Moment;
// return (
//     <Moment format="ddd" local></Moment>
// );