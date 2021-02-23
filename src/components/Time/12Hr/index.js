import React  from 'react';
import Moment from 'react-moment';
import './style.css'
 
export default class MomentTime extends React.Component {

    render() {
            if(this.props.hours !== ''){

                    let currentHour = (this.props.hours)
                    return (
                        <Moment parse="hh:mm" format="hh:mm A">{currentHour}</Moment>
                )
            }else {
                let currentHour = "closed"
                 return (
                    <span>{currentHour}</span>
            )
            }

    }
}