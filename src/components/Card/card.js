import React from 'react';
import '../../App.css';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

function NeoCard(props) {
  return (
    
    <div className="project">
      <Card className="neomorph-card">
  <Card.Body>
  <Card.Img variant="top" src={props.image} />
    <Card.Title>{props.title}</Card.Title>
    <Card.Text className="card-text-no-shadow">
      {props.text}
    </Card.Text>
  </Card.Body>
</Card>
    </div>
  )
}
 
export default NeoCard;