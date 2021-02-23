import React from 'react';
import Output from '../../animations/banner';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NeoCard from '../../components/Card/card';
import './style.css';
import Fade from 'react-reveal/Fade';
import Dropdown from '../../components/Dropdown';
import DropdownList from '../../components/Dropdown/item';
import MetaTags from '../../components/Meta';



function Index() {

return (
  <div>
    
    <MetaTags
metadescription="Find vaccine near me for Sars-CoV-2. Find state and local resources, vaccine schedules, & more."
metatitle="COVID-19 Vaccines Near You"
title="Find Covid-19 vaccines and vaccination sites near me"
/>
  <div className="index-page">
    <Container fluid>
          <Output />
          <Dropdown>
              <DropdownList
                menuLink="/Type/1"
                menuTitle="Healthcare Workers"
                datamsg="vaccine sites for Healthcare Workers"
              
                />  
        
              <DropdownList
                menuLink="/Type/2"
                menuTitle="Long-Term Residents"
                datamsg="vaccine sites for Long-Term Residents"
              />
              <DropdownList
                menuLink="/Type/3"
                menuTitle="Frontline Essential"
                datamsg="Vaccine sites for Frontline Essential"
              />
              <DropdownList
                menuLink="/Type/4"
                menuTitle="75 Years & Older"
                datamsg="Vaccine sites for 75 Years & Older"
              />
              <DropdownList
                menuLink="/Type/5"
                menuTitle="Ages 65-74 Years"
                datamsg="Vaccine Sites for Ages 65-74 Years"
              />
              <DropdownList
                menuLink="/Type/6"
                menuTitle="Ages 16-64 Years With High Risk"
                datamsg="Ages 16-64 Years With High Risk Pre-Existing Conditions"
              />
              <DropdownList
                menuLink="/Type/7"
                menuTitle="Other Essential Workers"
                datamsg="vaccine sites for Other Essential Workers"
              />
              <DropdownList
                menuLink="/Type/8"
                menuTitle="16+ Years"
                datamsg="vaccine sites for Essential Workers"
              />
          </Dropdown>
    </Container>
</div>
<Container className="container-padding">
<Fade bottom cascade>
  <Row>
    <Col sm>
      <NeoCard
        image= "''"
        text="search by state"
          title="find resources for your state COVID-19 Distribution Plan."
        />
      </Col>
    <Col sm>
      <NeoCard
        image= "''"
        text="search by risk"
        title="find potential vaccination sites for your risk level."
        />
      </Col>
    <Col sm>
      <NeoCard
        image="''"
        text="want to contribute?"
        title="contact us at hello@ricardoshaffer.com"
        />
      </Col>
  </Row>
</Fade>
</Container>
</div>
)
}
export default Index;