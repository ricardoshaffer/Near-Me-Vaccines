import React, { useState, useEffect } from 'react';
import './style.css';
import '../../App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import {getTodo} from '../../graphql/queries';
import { Row } from "../../components/Grid";
import TimePickers from '../../components/Time/Clock/index'
import Toast from 'react-bootstrap/Toast'



import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { updateTodo as updateNoteMutation } from '../../graphql/mutations';

const initialFormState = {
    id: '',
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
    website: ''
    }
    var pathArray = window.location.pathname.split('/');
    const location_id = pathArray[2];
function Update() {
    const [show, setShow] = useState(false);
    console.log("business ID: " + location_id);
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
        website: yup.string(),
        zip: yup.number()
        .min(5, "hey, this is just the 5 digits in the U.S. only").required()
    });
  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: getTodo, variables: { id: location_id} });
    setNotes(apiData.data.getTodo);
    setFormData([initialFormState, apiData.data.getTodo])
    await Storage.get(apiData.data.getTodo.image).then((response) => {
        console.log(response);
        setFormData({
            image: response,
        })
             }
         )
         updateFields();
  }
  function updateFields(){
    setFormData({
      id: notes.id,
    firstName: notes.firstName,
    lastName: notes.lastName,
    businessName: notes.businessName,
    businessPhone: notes.businessPhone,
    businessAddress: notes.businessAddress,
    city: notes.city,
    state: notes.state,
    zip: notes.zip,
    lat: notes.lat,
    lng: notes.lng,
    monO: notes.monO,
    monC: notes.monC,
    tueO: notes.tueO,
    tueC: notes.tueC,
    wedO: notes.wedO,
    wedC: notes.wedC,
    thuO: notes.thuO,
    thuC: notes.thuC,
    friO: notes.friO,
    friC: notes.friC,
    satO: notes.satO,
    satC: notes.satC,
    sunO: notes.sunO,
    sunC: notes.sunC,
    itemsIncluded: notes.itemsIncluded[0],
    website: notes.website,
})
  }
  async function imageChange(e) {
    const file = e.target.files[0];
    if (!e.target.files[0] && formData.image){
      return
    }else{
       await Storage.put(file.name, file)
    formData.image = file.name;
    }}

  async function updateNote() {
    if (notes.lat === ''){
    let addressSearch = notes.businessAddress +"+"+ notes.city +"+"+ notes.state +"+"+ notes.zip;
    console.log(addressSearch);
    let myApiKey = API_KEY_GOOGLE;
    await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + addressSearch + '&key=' + myApiKey)
        .then((response) => response.json().catch(() => {
            return Promise.reject(new Error("Address does not exist or is not structured properly"));
          })).then(
            response => {
              const respCheck = response.results;
              console.log(respCheck);
              const { lat, lng } = response.results[0].geometry.location;
              console.log(lat, lng);
              formData.lat = lat;
              formData.lng = lng;
            }
          )
        }
        formData.id = notes.id;
         API.graphql({ query: updateNoteMutation, variables: { input: formData } })
//    // setFormData([ ...notes, formData ]);
//     setFormData(initialFormState)

}


  return (
<div className="App">
      <h1>Update Business Location</h1>
<Row>
<Col md={6} xs={12}>
  <Formik
    validationSchema={schema}
    initialValues={{
        id: notes.id,
      firstName: notes.firstName,
      lastName: notes.lastName,
      businessName: notes.businessName,
      businessPhone: notes.businessPhone,
      businessAddress: notes.businessAddress,
      city: notes.city,
      state: notes.state,
      zip: notes.zip,
      lat: notes.lat,
      lng: notes.lng,
      monO: notes.monO,
      monC: notes.monC,
      tueO: notes.tueO,
      tueC: notes.tueC,
      wedO: notes.wedO,
      wedC: notes.wedC,
      thuO: notes.thuO,
      thuC: notes.thuC,
      friO: notes.friO,
      friC: notes.friC,
      satO: notes.satO,
      satC: notes.satC,
      sunO: notes.sunO,
      sunC: notes.sunC,
      itemsIncluded: notes.itemsIncluded,
      website: notes.website,
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
  <Row>
    <Form.Group as={Col} md="6" controlId="validationFormik01">
      <Form.Label>First name (won't be displayed)</Form.Label>
        <Form.Control
          name="firstName"
          value={formData.firstName || notes.firstName}
          onChange={e => {handleChange(e); setFormData({ ...formData, 'firstName': e.target.value})}}
          isValid={formData.firstName && !errors.firstName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.firstName}
        </Form.Control.Feedback>
    </Form.Group>
    <Form.Group as={Col} md="6" controlId="validationFormik02">
      <Form.Label>Last name (won't be displayed)</Form.Label>
        <Form.Control
          name="lastName"
          value={formData.lastName || notes.lastName}
          onChange={e => {handleChange(e); setFormData({ ...formData, 'lastName': e.target.value})}}
          isValid={formData.lastName && !errors.lastName}
        />
      <Form.Control.Feedback type="invalid">
        {errors.lastName}
      </Form.Control.Feedback>
    </Form.Group>
  </Row>
  <Row>
    <Form.Group as={Col} md="6" controlId="validationFormik03">
      <Form.Label>Business Name</Form.Label>
        <InputGroup>
          <Form.Control
            placeholder={notes.businessName}
            name="businessName"
            value={formData.businessName || notes.businessName}
            onChange={e => {handleChange(e); setFormData({ ...formData, 'businessName': e.target.value})}}
            isValid={formData.businessName && !errors.businessName}
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
            placeholder={notes.businessPhone}
            name="businessPhone"
            value={formData.businessPhone || notes.businessPhone}
            onChange={e => {handleChange(e); setFormData({ ...formData, 'businessPhone': e.target.value})}}
            isValid={formData.businessPhone && !errors.businessPhone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.businessPhone}
          </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  </Row>
  <Row>
    <Form.Group as={Col} md="12" controlId="validationFormik05">
      <Form.Label>Business Address</Form.Label>
      <InputGroup>
        <Form.Control
          placeholder={notes.businessAddress}
          name="businessAddress"
          value={formData.businessAddress || notes.businessAddress}
          onChange={e => {handleChange(e); setFormData({ ...formData, 'businessAddress': e.target.value})}}
          isValid={formData.businessAddress && !errors.businessAddress}
        />
        <Form.Control.Feedback type="invalid">
          {errors.businessAddress}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  </Row>
  <Row>
    <Form.Group as={Col} md="6" controlId="validationFormik05">
      <Form.Label>City</Form.Label>
      <InputGroup>
        <Form.Control
          placeholder={notes.city}
          name="city"
          value={formData.city || notes.city}
          onChange={e => {handleChange(e); setFormData({ ...formData, 'city': e.target.value})}}
          isValid={formData.city && !errors.city}
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
            placeholder={notes.state}
            name="state"
            value={formData.state || notes.state}
            onChange={e => {handleChange(e); setFormData({ ...formData, 'state': e.target.value})}}
            isValid={formData.state && !errors.state}
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
            placeholder={notes.zip}
            name="zip"
            value={formData.zip || notes.zip}
            onChange={e => {handleChange(e); setFormData({ ...formData, 'zip': e.target.value})}}
            isValid={formData.zip && !errors.zip}
          />
          <Form.Control.Feedback type="invalid">
            {errors.zip}
          </Form.Control.Feedback>
        </InputGroup>
    </Form.Group>
  </Row>
  <Form.Row>
    <Form.Group as={Col} md="12" controlId="validationFormik05">
      <Form.Label>Website:</Form.Label>
      <InputGroup>
        <Form.Control
          placeholder="Website"
          name="website"
          value={formData.website || notes.website}
          onChange={e => {handleChange(e); setFormData({ ...formData, 'website': e.target.value})}}
          isInvalid={!!errors.website}
          isValid={formData.website && !errors.website}
        />
        <Form.Control.Feedback type="invalid">
          {errors.website}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  </Form.Row>
{/* ////// */}
<Form.Row>
    <Col xs={6} md={3}>
    <Field
        component="select"
        id="currentPhase"
        name="currentPhase"
        onBlur={handleBlur}
        value={formData.currentPhase || notes.currentPhase}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'currentPhase': e.target.value})}}
        multiple={false}
      >
          <option
            as="select"
            value="1AA"
            tabIndex="0"
            label="Healthcare Workers"
            name="1AA Healthcare"
          >Healthcare Workers</option>
          <option
            as="select"
            value="1AB"
            tabIndex="0"
            label="Long-Term Residents"
            name="Long-term Residents"
          >Long-term Residents</option>
          <option
          as="select"
            value="1BA"
            tabIndex="0"
            label="Frontline Essential"
            name="Frontline Essential"
            >Frontline Essential</option>
          <option
          as="select"
            value="1BB"
            tabIndex="0"
            label="75 Years & Older"
            name="75 Years & older"
            >75 Years & older</option>
          <option
          as="select"
          tabIndex="0"
            value="1CA"
            label="Ages 65-75 Years"
            name="Ages 65-75 Years"
            >Ages 65-75 Years</option>
          <option
          as="select"
            value="1CB"
            tabIndex="0"
            label="Ages 16-64 Years With High Risk"
            name="Ages 16-64 Years With High Risk"
            >Ages 16-64 Years With High Risk</option>
          <option
          as="select"
          tabIndex="0"
            value="1CC"
            label="Other Essential Workers"
            name="Other Essential Workers"
            >Other Essential Workers</option>
          <option
          as="select"
          tabIndex="0"
            value="2A"
            label="16 Years +"
            name="16 Years +"
            >16 Years +</option>
      </Field>
    </Col>
  </Form.Row>
  <Row>
    <Col xs={12} md={6}>
      <TimePickers
        name="monO"
        label="Monday Open" 
        value={formData.monO || notes.monO}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'monO': e.target.value})}}
      />
    </Col>
    <Col>
      <TimePickers
        name="monC"
        label="Monday Close"
        value={formData.monC || notes.monC}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'monC': e.target.value})}}
      />
    </Col>
  </Row>
  <Row>
    <Col xs={12} md={6}>
      <TimePickers
        name="tueO"
        label="Tuesday Open"
        value={formData.tueO || notes.tueO}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'tueO': e.target.value})}}
      />
    </Col>
    <Col>
      <TimePickers
        name="tueC"
        label="Tuesday Close"
        value={formData.tueC || notes.tueC}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'tueC': e.target.value})}}
      />
    </Col>
  </Row>
  <Row>
    <Col xs={12} md={6}>
      <TimePickers
        name="wedO"
        label="Wednesday Open"
        value={formData.wedO || notes.wedO}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'wedO': e.target.value})}}
      />
    </Col>
    <Col>
      <TimePickers
        name="wedC"
        label="Wednesday Close"
        value={formData.wedC || notes.wedC}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'wedC': e.target.value})}}
      />
    </Col>
  </Row>
  <Row>
    <Col xs={12} md={6}>
      <TimePickers
        name="thuO"
        label="Thursday Open"
        value={formData.thuO || notes.thuO}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'thuO': e.target.value})}}
      />
    </Col>
    <Col>
      <TimePickers
        name="thuC"
        label="Thursday Close"
        value={formData.thuC || notes.thuC}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'thuC': e.target.value})}}
      />
    </Col>
  </Row>
  <Row>
    <Col xs={12} md={6}>
      <TimePickers
        name="friO"
        label="Friday Open"
        value={formData.friO || notes.friO}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'friO': e.target.value})}}
      />
    </Col>
    <Col>
      <TimePickers
        name="friC"
        label="Friday Close"
        value={formData.friC || notes.friC}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'friC': e.target.value})}}
      />
    </Col>
  </Row>
  <Row>
    <Col xs={12} md={6}>
      <TimePickers
        name="satO"
        label="Saturday Open"
        value={formData.satO || notes.satO}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'satO': e.target.value})}}
      />
    </Col>
    <Col>
      <TimePickers
        name="satC"
        label="Saturday Close"
        value={formData.satC || notes.satC}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'satC': e.target.value})}}
      />
    </Col>
  </Row>
  <Row>
    <Col xs={12} md={6}>
      <TimePickers
        name="sunO"
        label="Sunday Open"
        value={formData.sunO || notes.sunO}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'sunO': e.target.value})}}
      />
    </Col>
    <Col>
      <TimePickers
        name="sunC"
        label="Sunday Close"
        value={formData.sunC || notes.sunC}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'sunC': e.target.value})}}
      />
    </Col>
  </Row>
        <input
            type="file"
            onChange={imageChange}
        />
          <Button className="form-btn"
             type="button"
             onClick={e => {updateNote(e); setShow(true)}}
           >Submit form
            <Toast
                onClose={() => setShow(false)} show={show} delay={3000}
                style={{
                    position: 'absolute',
                    top: 'auto',
                    right: 'auto',
                    left: 'auto',
                    bottom: 'auto',
                    backgroundColor: '#34ebab',
                }}
                autohide>
                    <Toast.Header>
                    <img
                        src="holder.js/300x20?text=%20"
                        className="rounded mr-2"
                        alt=""
                    />
                    <strong className="mr-auto">Success!</strong>
                    </Toast.Header>
                    <Toast.Body>Woohoo, your location has been updated!</Toast.Body>
              </Toast>
          </Button>
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

export default withAuthenticator(Update);