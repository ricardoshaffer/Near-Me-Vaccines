import InteractiveMap from '../../components/Interactive-Map';
import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

function MapDelivery(props) {
    return (
        <div>
<InteractiveMap/>
<p><a href="/Add-State">update or add states</a></p>
{/* <USAMap customize={{"CA":{fill:"#5c33ff" }}} usaMapDimensions="UT"/> */}
</div>
    )};
export default MapDelivery;       