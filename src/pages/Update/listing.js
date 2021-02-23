import React, { useState, useEffect } from 'react';
import './style.css';
import '../../App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import {getTodo} from '../../graphql/queries';
import { Row } from "../../components/Grid";
import TimePickers from '../../components/Time/Clock/index'



import { Formik, Field, useField, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { updateTodo as updateNoteMutation } from '../../graphql/mutations';

const initialFormState = {
    firstName: '',
    lastName: '',
    businessName: '',
    businessPhone: '',
    businessAddress: '',
    city: '',
    state: '',
    zip: '',
    lat: '',
    lng: '',
    monO: '',
    monC: '',
    tueO: '',
    tueC: '',
    wedO: '',
    wedC: '',
    thuO: '',
    thuC: '',
    friO: '',
    friC: '',
    satO: '',
    satC: '',
    sunO: '',
    sunC: '',
    itemsIncluded: [''],
    }
function Update(props) {
  const location_id = props.location_id;
    const [notes, setNotes] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const schema = yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        businessName: yup.string().required(),
        businessPhone: yup.string().required(),
        businessAddress: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        zip: yup.number()
        .min(5, "hey, this is just the 5 digits in the U.S. only").required()
    });

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    console.log(location_id);
    const apiData = await API.graphql({ query: getTodo, variables: { id: props.location_id  } });
    const notesFromAPI = apiData.data.getTodo;
    await Promise.all(notesFromAPI.map(async note => {
      if (note.image) {
        const image = await Storage.get(note.image);
        note.image = image;
      }
      return note;
    }))
    setFormData(apiData.data.getTodo);
    console.log(apiData.data.getTodo);
  }
 
  async function updateNote() {
    if (!formData.lat || !formData.lng){
    let addressSearch = formData.businessAddress +"+"+ formData.city +"+"+ formData.state +"+"+ formData.zip;
    let myApiKey = API_KEY_GOOGLE;
    await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + addressSearch + '&key=' + myApiKey)
        .then((response) => response.json().catch(() => {
            return Promise.reject(new Error("Address does not exist or is not structured properly"));
          })).then(
            response => {
              // const respCheck = response.results;
              // console.log(respCheck);
              const { lat, lng } = response.results[0].geometry.location;
              console.log(lat, lng);
              formData.lat = lat;
              formData.lng = lng;
            }
          )
          }
    await API.graphql({ query: updateNoteMutation, variables: { input: formData } });
    setFormData([ ...notes, formData ]);
  }

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
  }

  return (
<div className="App">
      <h1>Location info</h1>

<Row>
<Col md={6} xs={12}>
  <Formik
    validationSchema={schema}
    initialValues={{
      firstName: notes.firstName,
      lastName: notes.lastName,
      businessName: notes.businessName,
      businessPhone: notes.businessPhone,
      businessAddress: notes.businessAddress,
      city: '',
      state: '',
      zip: '',
      lat: '',
      lng: '',
      monO: '',
      monC: '',
      tueO: '',
      tueC: '',
      wedO: '',
      wedC: '',
      thuO: '',
      thuC: '',
      friO: '',
      friC: '',
      satO: '',
      satC: '',
      sunO: '',
      sunC: '',
      itemsIncluded: [],
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
<Form noValidate="false" className="business-form" onSubmit={handleSubmit}>
  <Form.Row>
    <Form.Group as={Col} md="6" controlId="validationFormik01">
      <Form.Label>First name (won't be displayed)</Form.Label>
        <Form.Control
          name="firstName"
          placeholder="first name"
          value={formData.firstName}
          onChange={e => {handleChange(e); setFormData({ ...formData, 'firstName': e.target.value})}}
          isInvalid={!!errors.firstName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.firstName}
        </Form.Control.Feedback>
    </Form.Group>
    <Form.Group as={Col} md="6" controlId="validationFormik02">
      <Form.Label>Last name (won't be displayed)</Form.Label>
        <Form.Control
          name="lastName"
          placeholder="last name"
          value={formData.lastName}
          onChange={e => {handleChange(e); setFormData({ ...formData, 'lastName': e.target.value})}}
          isInvalid={!!errors.lastName}
        />
      <Form.Control.Feedback type="invalid">
        {errors.lastName}
      </Form.Control.Feedback>
    </Form.Group>
  </Form.Row>
  <Form.Row>
    <Form.Group as={Col} md="6" controlId="validationFormik03">
      <Form.Label>Business Name</Form.Label>
        <InputGroup>
          <Form.Control
            placeholder={formData.businessName}
            name="businessName"
            value={formData.businessName}
            onChange={e => {handleChange(e); setFormData({ ...formData, 'businessName': e.target.value})}}
            isInvalid={!!errors.businessName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.businessName}
          </Form.Control.Feedback>
        </InputGroup>
    </Form.Group>
    <Form.Group as={Col} md="6" controlId="validationFormik04">
      <Form.Label>Business Main Phone</Form.Label>
        <InputGroup>
          <Form.Control
            placeholder="Business Phone"
            name="businessPhone"
            value={formData.businessPhone}
            onChange={e => {handleChange(e); setFormData({ ...formData, 'businessPhone': e.target.value})}}
            isInvalid={!!errors.businessPhone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.businessPhone}
          </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  </Form.Row>
  <Form.Row>
    <Form.Group as={Col} md="12" controlId="validationFormik05">
      <Form.Label>Business Address</Form.Label>
      <InputGroup>
        <Form.Control
          placeholder="Business Address"
          name="businessAddress"
          value={formData.businessAddress}
          onChange={e => {handleChange(e); setFormData({ ...formData, 'businessAddress': e.target.value})}}
          isInvalid={!!errors.businessAddress}
        />
        <Form.Control.Feedback type="invalid">
          {errors.businessAddress}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  </Form.Row>
  <Form.Row>
    <Form.Group as={Col} md="6" controlId="validationFormik05">
      <Form.Label>City</Form.Label>
      <InputGroup>
        <Form.Control
          placeholder="City"
          name="city"
          value={formData.city}
          onChange={e => {handleChange(e); setFormData({ ...formData, 'city': e.target.value})}}
          isInvalid={!!errors.city}
        />
        <Form.Control.Feedback type="invalid">
          {errors.city}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
    <Form.Group as={Col} md="3" controlId="validationFormik06">
      <Form.Label>State</Form.Label>
        <InputGroup>
          <Form.Control
            placeholder="State"
            name="state"
            value={formData.state}
            onChange={e => {handleChange(e); setFormData({ ...formData, 'state': e.target.value})}}
            isInvalid={!!errors.state}
          />
          <Form.Control.Feedback type="invalid">
            {errors.state}
          </Form.Control.Feedback>
        </InputGroup>
    </Form.Group>
    <Form.Group as={Col} md="3" controlId="validationFormik07">
      <Form.Label>Zip</Form.Label>
        <InputGroup>
          <Form.Control
            placeholder="Zip"
            name="zip"
            value={formData.zip}
            onChange={e => {handleChange(e); setFormData({ ...formData, 'zip': e.target.value})}}
            isInvalid={!!errors.zip}
          />
          <Form.Control.Feedback type="invalid">
            {errors.zip}
          </Form.Control.Feedback>
        </InputGroup>
    </Form.Group>
  </Form.Row>
{/* ////// */}
  <Form.Row>
    <Col xs={6} md={3}>
      <Field
        component="select"
        id="itemsIncluded"
        name="itemsIncluded"
        multiple={true}
      >
          <option
            value="On-Site Parking"
            label="On-Site Parking"
            onClick={e => {handleChange(e); setFormData({ ...formData, 'itemsIncluded': e.target.value})}}
          />
          <option
            value="WiFi"
            label="WiFi"
            onClick={e => {handleChange(e); setFormData({ ...formData, 'itemsIncluded': e.target.value})}}
          />
          <option
            value="Bathroom"
            label="Bathroom"
            onClick={e => {handleChange(e); setFormData({ ...formData, 'itemsIncluded': e.target.value})}}
          />
          {/* <CheckBoxes 
            label="on-Site Parking"
            type="checkbox" 
            name="itemsIncluded" 
            value="On-Site Parking"
            onChange={e => {handleChange(e); setFormData({ ...formData, 'itemsIncluded': e.target.value})}}
          /> */}
      </Field>
    </Col>
    {/* <Col xs={6} md={3}>
      4
    </Col> */}
  </Form.Row>
{/* ////// */}
  <Form.Row>
    <Col xs={12} md={6}>
      <TimePickers
        name="monO"
        label="Monday Open"
        value={formData.monO}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'monO': e.target.value})}}
        // defaultValue="08:00"
      />
    </Col>
    <Col>
      <TimePickers
        name="monC"
        label="Monday Close"
        value={formData.monC}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'monC': e.target.value})}}
        // defaultValue="17:00"
      />
    </Col>
  </Form.Row>
  <Form.Row>
    <Col xs={12} md={6}>
      <TimePickers
        name="tueO"
        label="Tuesday Open"
        value={formData.tueO}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'tueO': e.target.value})}}
        // defaultValue="08:00"
      />
    </Col>
    <Col>
      <TimePickers
        name="tueC"
        label="Tuesday Close"
        value={formData.tueC}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'tueC': e.target.value})}}
        // defaultValue="17:00"
      />
    </Col>
  </Form.Row>
  <Form.Row>
    <Col xs={12} md={6}>
      <TimePickers
        name="wedO"
        label="Wednesday Open"
        value={formData.wedO}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'wedO': e.target.value})}}
        // defaultValue="08:00"
      />
    </Col>
    <Col>
      <TimePickers
        name="wedC"
        label="Wednesday Close"
        value={formData.wedC}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'wedC': e.target.value})}}
        // defaultValue="17:00"
      />
    </Col>
  </Form.Row>
  <Form.Row>
    <Col xs={12} md={6}>
      <TimePickers
        name="thuO"
        label="Thursday Open"
        value={formData.thuO}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'thuO': e.target.value})}}
        // defaultValue="08:00"
      />
    </Col>
    <Col>
      <TimePickers
        name="thuC"
        label="Thursday Close"
        value={formData.thuC}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'thuC': e.target.value})}}
        // defaultValue="17:00
      />
    </Col>
  </Form.Row>
  <Form.Row>
    <Col xs={12} md={6}>
      <TimePickers
        name="friO"
        label="Friday Open"
        value={formData.friO}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'friO': e.target.value})}}
        // defaultValue="08:00"
      />
    </Col>
    <Col>
      <TimePickers
        name="friC"
        label="Friday Close"
        value={formData.friC}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'friC': e.target.value})}}
        // defaultValue="17:00"
      />
    </Col>
  </Form.Row>
  <Form.Row>
    <Col xs={12} md={6}>
      <TimePickers
        name="satO"
        label="Saturday Open"
        value={formData.satO}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'satO': e.target.value})}}
        //defaultValue="00:00"
      />
    </Col>
    <Col>
      <TimePickers
        name="satC"
        label="Saturday Close"
        value={formData.satC}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'satC': e.target.value})}}
        // defaultValue="00:00"
      />
    </Col>
  </Form.Row>
  <Form.Row>
    <Col xs={12} md={6}>
      <TimePickers
        name="sunO"
        label="Sunday Open"
        value={formData.sunO}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'sunO': e.target.value})}}
        // defaultValue="00:00"
      />
    </Col>
    <Col>
      <TimePickers
        name="sunC"
        label="Sunday Close"
        value={formData.sunC}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'sunC': e.target.value})}}
        // defaultValue="00:00"
      />
    </Col>
  </Form.Row>
{/* ///// */}
        <input
            type="file"
            onChange={onChange}
        />
          <Button className="form-btn"
             type="button"
             onClick={e => {updateNote(e)}}
           >Submit form</Button>
        </Form>
      )}
    </Formik>
  </Col>
  <AmplifySignOut /> 
</Row>
    </div>
  );
}

export default withAuthenticator(Update);