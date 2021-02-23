
import React from 'react';
import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library} from '@fortawesome/fontawesome-svg-core';
import { fas, faTooth,faUserMd, faPaw, faCut, faWineBottle, faPrescription } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import MomentTime from '../Time/12Hr/index';
library.add(faTooth,faUserMd, faPaw, faCut,faWineBottle, faPrescription)
library.add(faWineBottle, faUserCircle);
library.add(fas);

function MapModal(props) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
        
      <Modal show={modalShow} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header className={'title-'+`${props.statePhase}`} closeButton onClick={() => setModalShow(false)}>
        <div itemScope >
          <Modal.Title id="contained-modal-title-vcenter">
          
          <div className="appt-reminder">*appt Required</div>
          </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
          <Row>
            <Col  xs={12} md={6}>
            <h3>Location</h3>
              <div itemProp="address" className="address" itemScope itemType="http://schema.org/PostalAddress">
                <span itemType="http://schema.org/Organization" itemProp="name" className="businessName">{props.businessName}</span>
                <span itemProp="streetAddress">{props.businessStreet}</span>
                <span itemProp="addressLocality">{props.businessCity}</span>
                <span itemProp="addressRegion">{props.businessState}, {props.businessZip}</span>
              </div>
            </Col>
              <Col xs={12} md={6}>
              <h3>Hours</h3>
                <div className="hours"itemprop="openingHours" content={"Mo " + `${props.monOpen}`+"-"+`${props.monClose}`}>Mon: <MomentTime hours={props.monOpen}/> - <MomentTime hours={props.monClose}/></div>
                <div className="hours"itemprop="openingHours" content={"Tu " + `${props.tueOpen}`+"-"+`${props.tueClose}`}>Tue: <MomentTime hours={props.tueOpen}/> - <MomentTime hours={props.tueClose}/></div>
                <div className="hours"itemprop="openingHours" content={"We " + `${props.wedOpen}`+"-"+`${props.wedClose}`}>Wed: <MomentTime hours={props.wedOpen}/> - <MomentTime hours={props.wedClose}/></div>
                <div className="hours"itemprop="openingHours" content={"Th " + `${props.thuOpen}`+"-"+`${props.thuClose}`}>Thu: <MomentTime hours={props.thuOpen}/> - <MomentTime hours={props.thuClose}/></div>
                <div className="hours"itemprop="openingHours" content={"Fr " + `${props.friOpen}`+"-"+`${props.friClose}`}>Fri: <MomentTime hours={props.friOpen}/> - <MomentTime hours={props.friClose}/></div>
                <div className="hours"itemprop="openingHours" content={"Sa " +`${props.satOpen}`+"-"+`${props.satClose}`}>Sat: <MomentTime hours={props.satOpen}/> - <MomentTime hours={props.satClose}/></div>
                <div className="hours"itemprop="openingHours" content={"Su " +`${props.sunOpen}`+"-"+`${props.sunClose}`}>Sun: <MomentTime hours={props.sunOpen}/> - <MomentTime hours={props.sunClose}/></div>
              </Col>
              </Row>
            <Row>
            <Button variant="info" className="modal-button" href={"/Location/" + props.locationID}>View Location</Button>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-custom" variant="custom" onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <div onClick={() => setModalShow(true)}><FontAwesomeIcon icon={['fas', `${props.buttonIcon}`]} className="icon" title="This is You!"/><div className="dot" style={{visibility: props.walkInAvailable === true ? 'visible' : 'hidden'}}/>{props.walkInAvailable}</div>
        {/* <Button className={props.buttonIcon} variant="custom" onClick={() => setModalShow(true)}>
        </Button> */}
    </>);
  }
  
  export default MapModal;

