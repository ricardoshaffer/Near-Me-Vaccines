import React  from 'react';
import Moment from 'react-moment';
import Currenttime from './currentHour'
export default class OpenClosed extends React.Component {
    state = {
        currenttest: "",
      };
    componentDidMount(){
        var openingHour = this.props.openingHour;
        var closingHour = this.props.closingHour;
    this.setState({currenttest: (<Moment parse="HH:mm" date={openingHour} fromNow local interval={600000} unit="minute" defaultCalendar="sameDay" />)})
    
    }

    render() {
            return this.state.currenttest

      
  }
}
