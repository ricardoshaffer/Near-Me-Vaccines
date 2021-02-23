import React from "react";
import Register from "./pages/Register";
import Nav from "./components/Nav";
import Index from './pages/Index/index';
import AboutPage from './pages/About/index';
import MapDelivery from './pages/States/map';
import Results from './pages/Results/index';
import SpecificLocation from './pages/Detail/index';
import Terms from './pages/Terms/index';
import Update from './pages/Update/form';
import StateUpdate from './pages/State-Update/index';
import States from './pages/States/index'
import {createBrowserHistory} from 'history';
import { BrowserRouter, Route } from 'react-router-dom'; 
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import Footer from './components/Footer/footer';
import './App.css';
import BusinessType from './pages/Results-Specific/Results-Router'
import SpecificState from './pages/States/specific'
import StateLocations from './pages/State-Map';
import IPTracer from './components/IP-Location';
library.add(fab, far);
const history = createBrowserHistory();


function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Nav />
    
<aside className="stateData"><IPTracer/></aside>
  <main className="Global">
      <Route exact path="/" component={Index} />
      <Route path="/Vaccine-Clinic" component={Register} history={history}/>
      <Route path="/Location/:location_id" render={(props) => <SpecificLocation location_id={props.match.params.location_id} />} />
      <Route path="/Update/:location_id" render={(props) => <Update location_id={props.match.params.location_id}/>}/>
      <Route path="/State-Locations/:state_id" render={(props) => <StateLocations state_id={props.match.params.location_id}/>}/>
      <Route path="/State-Update/:state_id" render={(props) => <StateUpdate location_id={props.match.params.location_id}/>}/>  {/* <BusinessListing location_id={props.match.params.location_id} /> */}
      <Route path="/Type/:business_type" render={(props) => <BusinessType business_type={props.match.params.business_type}/>}/>
      <Route path="/State/:state_id" render={(props) => <SpecificState business_type={props.match.params.state_id}/>}/>
      <Route path="/About" component={AboutPage} history={history}/>
      <Route path="/States" component={MapDelivery} history={history}/>
      <Route path="/Add-State" component={States} history={history}/>
      <Route path="/Index" component={Index} history={history} />
      <Route path="/Locations" component={Results} history={history}/>
      <Route path="/Terms" component={Terms} history={history}/>
      <Route path="/Privacy" component={Index} history={history}/>
      <Route path="/Login" component={Index} history={history}/>
      <Route path="/signup" component={Index} history={history}/>
  </main>

 </div>
 <Footer/>
 </BrowserRouter>
  );
}

export default App;
