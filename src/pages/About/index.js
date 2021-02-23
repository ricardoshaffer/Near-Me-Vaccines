import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MetaTags from '../../components/Meta';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import './style.css';


function AboutPage() {
return (
<div>
<Jumbotron fluid className="jumbotron-about">
    <MetaTags
        metadescription="Learn about Near Me Vaccines, a free project to help individuals find vaccination information within the United States."
        metatitle="About COVID-19 Vaccines Near You"
        title="Learn About Near Me Vaccines project"
    />
    <Container className="about-container">
        <h1 className="about">who we are</h1>
            <Row>
                <Col xs={12} className="about-info">
                    <h2 className="about">our goal</h2>
                    <span >help people quickly and easily find COVID-19 vaccination information for their town, city, county, or state.</span>
                </Col>
            </Row>
    </Container>
</Jumbotron>
    <Container>
        <Row>
            <Col xs={12} md={6} className="about-float">
            <div className="about-icon"><FontAwesomeIcon  icon={faQuestionCircle} alt="Are you vaccine eligble" /></div>
                <h2 className="about-subtitle">are you eligible for a vaccine? </h2>
                <p>each state is quickly moving to vaccinate their residents.
                    due to supply limitations, some states are moving faster than others.
                    we're working to help you find the information without the hassle.
                </p>
            </Col>
            <Col xs={12} md={6} className="about-float">
            <div className="about-icon"><FontAwesomeIcon  icon={faMapPin} alt="Vaccination Sites" /></div>
                <h2 className="about-subtitle">nearby vaccination sites.</h2>
                <p>we're working to quickly add as many vaccination sites that we
                    can access. each state has varying pieces of information in several areas.
                    we've taken what's relevant to your vaccination window to help you.

                </p>
            </Col>
        </Row>
    </Container>
</div>
)
}
export default AboutPage;
