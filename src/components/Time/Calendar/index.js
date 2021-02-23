import React  from 'react';
import Moment from 'react-moment';
 
export default class Calendar extends React.Component {

    render() {

                    let updatedAt = (this.props.updatedAt)
                    return (
                        <Moment parse="YYYY-MM-DD HH:mm Z" format="MM/DD/YYYY hh:mm A">{updatedAt}</Moment>
                )
            }
            
    }
