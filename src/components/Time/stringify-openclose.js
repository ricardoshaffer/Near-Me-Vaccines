import React  from 'react';
 
export default class BoolTime extends React.Component {

    render() {
        const CurrentHour = this.props.hours;
        // var parsedHour = CurrentHour.split(':');
        var stringified= Number(CurrentHour);
        if(CurrentHour > 0){
            return (
                "Open"
        )
        }else {return(
            stringified
        )
        }

    }
}