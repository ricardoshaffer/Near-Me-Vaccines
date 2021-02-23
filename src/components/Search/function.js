import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'

import "./style.css";

function SearchForm(props) {
  return (
    <div>
      <Col>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                name="search"
                id={props.id}
                value={props.value}
                onChange={props.handleInputChange}
              />
              
            </Form.Group>
            </Form.Row>
    </Col>
    </div>
      );
    }
export default SearchForm;


