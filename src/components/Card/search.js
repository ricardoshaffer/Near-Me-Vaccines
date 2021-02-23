import React from 'react';
import './style.css';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

function SearchCard(props) {
  return (
    
    <div className="project">
      <Card className="search-card">
  <Card.Body>
  <Card.Img variant="top" src={props.image} />
    <Card.Title>{props.title}</Card.Title>
    <Card.Text className="card-text-no-shadow">
      {props.street}
      <span>{props.city}, {props.state}</span>
    </Card.Text>
  </Card.Body>
</Card>
    </div>
  )
}
 
export default SearchCard;