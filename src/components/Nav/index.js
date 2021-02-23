import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MetaTags from '../../components/Meta'
import 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav';
import { library } from '@fortawesome/fontawesome-svg-core';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../images/near-me-vaccines-logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import './style.css';
library.add(faUserCircle);



function NavBar(props) {
    return (
<header className="navigation">
<Navbar collapseOnSelect expand="lg" bg="custom-nav" >
  <Navbar.Brand href="/">
    <img src={Logo}
        width="125"
        className="d-inline-block align-top"
        alt="Covid-19 Vaccines Near Me."
    />
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav ">
    <Nav className="mr-auto navbar-custom">
    <Nav.Link href="/about">about</Nav.Link>
    <Nav.Link href="/States">states</Nav.Link>
    <Nav.Link href="/Locations">near you</Nav.Link>
  </Nav>
  <Nav>
    <Nav.Link className="nav-tools" href="/Vaccine-Clinic" title="Vaccine Clinic login">
      <FontAwesomeIcon icon={faUserCircle} alt="Vaccine Clinic login" />login
    </Nav.Link>
  </Nav>
  </Navbar.Collapse>
</Navbar>
<MetaTags />
<aside className="disclaimer" >beta site. offered as a resource to end the pandemic.</aside>
</header>
    )
}
 
export default NavBar;