import React, {Component} from "react";
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import './style.css'
export default class VaccineStatus extends Component {
    render() {
        if (this.props.reopeningPhase) {
            return 
            <p></p>
        } else {
            return <div className="loading">
            hang tight! we're building your map
            </div>
        }
    }
}
    