import React from 'react';
import '../../App.css';
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import ListGroup from 'react-bootstrap/ListGroup'
function Footer(props) {
    return (
<footer className="footer-nav">

    <ListGroup sticky="bottom" horizontal="sm" className="footer navbar" key="sm">
        <ListGroup.Item><a href="/">home</a></ListGroup.Item>
        <ListGroup.Item className="footer"><a href="/Locations">search</a></ListGroup.Item>
        <ListGroup.Item className="footer"><a href="/Vaccine-Clinic">for clinics</a></ListGroup.Item>
        <ListGroup.Item className="footer"><a href="/Terms">terms & privacy</a></ListGroup.Item>
        {/* <ListGroup.Item className="footer"><a href="/Privacy">privacy</a></ListGroup.Item> */}
        <ListGroup.Item className="footer">copyright, 2020. All rights reserved</ListGroup.Item>
    </ListGroup>

</footer>

    )
}
 
export default Footer;