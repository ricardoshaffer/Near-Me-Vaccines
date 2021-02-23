import React, {Component} from "react";
import './style.css'
export default class Banner extends Component {
    render() {
        if (this.props.geoError) {
            return <p className="banner-warn">we can't load what's nearby without your location.
            <br/>(don't worry, it's never saved.)</p>
        } else {
            return <div className="loading">
            hang tight! we're building your map
            </div>
        }
    }
}
    