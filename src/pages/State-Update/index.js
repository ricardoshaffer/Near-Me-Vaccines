import React, { useState, useEffect } from 'react';
import './style.css';
import '../../App.css';
import { API } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import { getStateInfo } from '../../graphql/queries';
import { Row } from "../../components/Grid";
import { updateStateInfo as updateStateInfoMutation } from '../../graphql/mutations';


import { Formik, Field } from 'formik';
import * as yup from 'yup';


const initialFormState = {
    id: '',
    stateID: '',
    currentPhase: '',
    history: '',
    websiteState: '',
    }
    var pathArray = window.location.pathname.split('/');
    const state_id = pathArray[2];
function StateUpdate() {
    console.log("State ID: " + state_id);
    const [states, setStates] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const schema = yup.object({
        stateID: yup.string().max(2, "please use 2 letter code, such as 'UT' for Utah").required(),
        currentPhase: yup.string().required(),
        history: yup.string().required(),
        websiteState: yup.string().required(),
    });
  useEffect(() => {
    fetchState();
  }, []);

  async function fetchState() {
    const apiData = await API.graphql({ query: getStateInfo, variables: { id: state_id} });
    setStates(apiData.data.getStateInfo);
    setFormData([initialFormState, apiData.data.getStateInfo]);
    console.log(apiData.data.getStateInfo);
    updateFields();
  }
  function updateFields(){
    setFormData({
        stateID: states.stateID,
        currentPhase: states.currentPhase,
        history: states.history,
        websiteState: states.websiteState,
    })
}
  async function updateState() {
        formData.id = states.id;
         API.graphql({ query: updateStateInfoMutation, variables: { input: formData } })
}
  return (
<div className="App">
      <h1>Update Business Location</h1>
<Row>
<Col md={6} xs={12}>
<Formik
    validationSchema={schema}
    initialValues={{
      stateID: states.stateID,
      currentPhase: states.currentPhase,
      history: states.history,
      websiteState: states.websiteState,
  }}
  onClick={async (formData) => {
    await new Promise((r) => setTimeout(r, 500));
    alert(JSON.stringify(formData, null, 2));
  }}
  >
  {({
    values:formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  }) => (
<Form className="business-form" onSubmit={handleSubmit}>
  <Form.Row>
    <Form.Group as={Col} md="6" controlId="validationFormik01">
      <Form.Label>State ID</Form.Label>
        <Form.Control
          name="stateID"
          placeholder="first name"
          value={formData.stateID || states.stateID}
          onChange={e => {handleChange(e); setFormData({ ...formData, 'stateID': e.target.value})}}
          isInvalid={!!errors.stateID}
          isValid={formData.stateID && !errors.stateID}
        />
        <Form.Control.Feedback type="invalid">
          {errors.stateID}
        </Form.Control.Feedback>
    </Form.Group>
    <Form.Group as={Col} md="6" controlId="validationFormik02">
-----
<Form.Label>Current State Phase:</Form.Label>
    <Col xs={6} md={3}>
    <Field
        component="select"
        id="currentPhase"
        name="currentPhase"
        onBlur={handleBlur}
        value={formData.currentPhase || states.currentPhase}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'currentPhase': e.target.value})}}
        multiple={false}
      >
          <option
            as="select"
            value={1}
            tabIndex="0"
            label="Healthcare Workers"
            name="1AA Healthcare"
          >Healthcare Workers</option>
          <option
            as="select"
            value={2}
            tabIndex="0"
            label="Long-Term Residents"
            name="Long-term Residents"
          >Long-term Residents</option>
          <option
          as="select"
            value={3}
            tabIndex="0"
            label="Frontline Essential"
            name="Frontline Essential"
            >Frontline Essential</option>
          <option
          as="select"
            value={4}
            tabIndex="0"
            label="75 Years & Older"
            name="75 Years & older"
            >75 Years & older</option>
          <option
          as="select"
          tabIndex="0"
            value={5}
            label="Ages 65-75 Years"
            name="Ages 65-75 Years"
            >Ages 65-75 Years</option>
          <option
          as="select"
            value={6}
            tabIndex="0"
            label="Ages 16-64 Years With High Risk"
            name="Ages 16-64 Years With High Risk"
            >Ages 16-64 Years With High Risk</option>
          <option
          as="select"
          tabIndex="0"
            value={7}
            label="Other Essential Workers"
            name="Other Essential Workers"
            >Other Essential Workers</option>
          <option
          as="select"
          tabIndex="0"
            value={8}
            label="16 Years +"
            name="16 Years +"
            >16 Years +</option>
      </Field>
    </Col>
    </Form.Group>
  </Form.Row>
  <Form.Row>
    <Form.Group as={Col} md="12" controlId="validationFormik05">
      <Form.Label>State URL:</Form.Label>
      <InputGroup>
        <Form.Control
          placeholder="https://url.com"
          name="websiteState"
          value={formData.websiteState || states.websiteState}
          onChange={e => {handleChange(e); setFormData({ ...formData, 'websiteState': e.target.value})}}
          isInvalid={!!errors.websiteState}
          isValid={formData.websiteState && !errors.websiteState}
        />
        <Form.Control.Feedback type="invalid">
          {errors.websiteState}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  </Form.Row>

  <Form.Row>
    <Form.Group as={Col} md="12" controlId="validationFormik05">
      <Form.Label>Recent Changes:</Form.Label>
      <InputGroup>
        <Form.Control
          placeholder="current & future phases"
          name="history"
          value={formData.history || states.history}
          onChange={e => {handleChange(e); setFormData({ ...formData, 'history': e.target.value})}}
          isInvalid={!!errors.history}
          isValid={formData.history && !errors.history}
        />
        <Form.Control.Feedback type="invalid">
          {errors.history}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  </Form.Row>

  
          <Button className="form-btn"
             type="button"
             onClick={e => {updateState(e)}}
           >Submit form</Button>
        </Form>
      )}
    </Formik>
  </Col>
  <Col xs={12} md={6}>
        <div>
            <img src={formData.image} style={{width: 400}} alt={formData.businessName} />
        </div>
    </Col>
</Row>
    </div>
  );
}

export default withAuthenticator(StateUpdate);

