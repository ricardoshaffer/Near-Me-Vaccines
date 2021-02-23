import React, { useState, useEffect } from 'react';
import './style.css';
import '../../App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import Col from 'react-bootstrap/Col';
import DeleteBtn from "../../components/DeleteBtn/index";
import { Row } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import TimePickers from '../../components/Time/Clock/index';
import Results from '../../components/Search/index';



import { Formik, Field, useField, ErrorMessage, isEmptyArray } from 'formik';
import * as yup from 'yup';
import { listTodos, getTodo } from '../../graphql/queries';
import { createTodo as createNoteMutation, deleteTodo as deleteNoteMutation, updateTodo as updateNoteMutation } from '../../graphql/mutations';
import form from '../Update/form';
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
    itemsIncluded: '',
    walkInAvailable: Boolean,
    website: '',
    // itemsIncluded: [''],
    }

    
function Register() {
  const [checked, setChecked] = useState(false);
    const [notes, setNotes] = useState([]);
    const [avail, setAvail] = useState([]);
    const [updateData, setUpdateData] = useState(initialFormState);
    const [formData, setFormData] = useState(initialFormState);
    const schema = yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        businessName: yup.string().required(),
        businessPhone: yup.string().required(),
        businessAddress: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().max(2,"please use 2 letter code, such as 'CA' for California").required(),
        website: yup.string(),
        zip: yup.number()
        .min(5, "hey, this is just the 5 digits in the U.S. only").required()
    });
    

  useEffect(() => {
    fetchNotes();
  }, []);
 
  async function fetchNotes() {

    const apiData = await API.graphql({ query: listTodos });
    const notesFromAPI = apiData.data.listTodos.items;
    await Promise.all(notesFromAPI.map(async note => {
      setUpdateData(
        [initialFormState, apiData.data.listTodos.items]);
      
      console.log("line 119 fetch: " + (note.id) + (note.walkInAvailable))
      // checkedLoad(note);
      if (note.image) {
        const image = await Storage.get(note.image);
        note.image = image;
      }
      
      return note;
      
    }))
    setNotes(apiData.data.listTodos.items);
    console.log(apiData.data.listTodos.items);
  }
 
  async function createNote() {
    if (!formData.firstName || !formData.lastName || !formData.businessName || !formData.businessPhone || !formData.businessAddress || !formData.city || !formData.state || !formData.zip) return;
    let addressSearch = formData.businessAddress +"+"+ formData.city +"+"+ formData.state +"+"+ formData.zip;
    setFormData({ ...formData, 'walkInAvailable': false});
    
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
              formData.walkInAvailable= false;
            }
          )
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
  }

  async function mark() {
    await API.graphql({ query: updateNoteMutation, variables: { input: formData }});
  }
  
  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchNotes();
  }

  return (
    !notes ?(
      <div>
      hang tight! we're pulling your data
      </div>
    ):(
<div className="App">
      <h1>Add Vaccine Clinics:</h1>

<Row>
<Col md={6} xs={12}>
  <Formik
    validationSchema={schema}
    initialValues={{
      firstName: '',
      lastName: '',
      businessName: '',
      businessPhone: '',
      businessAddress: '',
      city: '',
      state: '',
      zip: '',
      website: '',
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
      itemsIncluded: '',
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
      <Form.Label>First name (won't be displayed)</Form.Label>
        <Form.Control
          name="firstName"
          placeholder="first name"
          value={formData.firstName}
          onChange={e => {handleChange(e); setFormData({ ...formData, 'firstName': e.target.value})}}
          isInvalid={!!errors.firstName}
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
          placeholder="last name"
          value={formData.lastName}
          onChange={e => {handleChange(e); setFormData({ ...formData, 'lastName': e.target.value})}}
          isInvalid={!!errors.lastName}
          isValid={formData.lastName && !errors.lastName}
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
            placeholder="Business Name"
            name="businessName"
            value={formData.businessName}
            onChange={e => {handleChange(e); setFormData({ ...formData, 'businessName': e.target.value})}}
            isInvalid={!!errors.businessName}
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
            placeholder="Business Phone"
            name="businessPhone"
            value={formData.businessPhone}
            onChange={e => {handleChange(e); setFormData({ ...formData, 'businessPhone': e.target.value})}}
            isInvalid={!!errors.businessPhone}
            isValid={formData.businessPhone && !errors.businessPhone}
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
          isValid={formData.businessAddress && !errors.businessAddress}
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

            placeholder="State"
            name="state"
            value={formData.state}
            onChange={e => {handleChange(e); setFormData({ ...formData, 'state': e.target.value})}}
            isInvalid={!!errors.state}
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
            placeholder="Zip"
            name="zip"
            value={formData.zip}
            onChange={e => {handleChange(e); setFormData({ ...formData, 'zip': e.target.value})}}
            isInvalid={!!errors.zip}
            isValid={formData.zip && !errors.zip}
          />
          <Form.Control.Feedback type="invalid">
            {errors.zip}
          </Form.Control.Feedback>
        </InputGroup>
    </Form.Group>
  </Form.Row>
  <Form.Row>
    <Form.Group as={Col} md="12" controlId="validationFormik05">
      <Form.Label>Website:</Form.Label>
      <InputGroup>
        <Form.Control
          placeholder="Website"
          name="website"
          value={formData.website}
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
        id="walkInAvailable"
        name="itemsIncluded"
        onBlur={handleBlur}
        value={formData.itemsIncluded}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'itemsIncluded': e.target.value})}}
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
      />
    </Col>
    <Col>
      <TimePickers
        name="tueC"
        label="Tuesday Close"
        value={formData.tueC}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'tueC': e.target.value})}}
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
      />
    </Col>
    <Col>
      <TimePickers
        name="wedC"
        label="Wednesday Close"
        value={formData.wedC}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'wedC': e.target.value})}}
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
      />
    </Col>
    <Col>
      <TimePickers
        name="thuC"
        label="Thursday Close"
        value={formData.thuC}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'thuC': e.target.value})}}
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
      />
    </Col>
    <Col>
      <TimePickers
        name="friC"
        label="Friday Close"
        value={formData.friC}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'friC': e.target.value})}}
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
      />
    </Col>
    <Col>
      <TimePickers
        name="satC"
        label="Saturday Close"
        value={formData.satC}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'satC': e.target.value})}}
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
      />
    </Col>
    <Col>
      <TimePickers
        name="sunC"
        label="Sunday Close"
        value={formData.sunC}
        onChange={e => {handleChange(e); setFormData({ ...formData, 'sunC': e.target.value})}}
      />
    </Col>
  </Form.Row>
{/* ///// */}
        <input
            type="file"
            onChange={onChange}
        />
          <Button className="form-btn"
             type="submit"
             onClick={e => {createNote(e)}}
           >Submit form</Button>
        </Form>
      )}
    </Formik>
  </Col>
  <Col md={6} xs={12}>
    <Results/>
    <div style={{marginBottom: 30}}>
              <List>
                {notes.map(note => (
                      note.walkInAvailable === null && note.checked === undefined  ?(
                        <div>
                        hang tight! we're pulling your data
                        </div>
                      ):(
                  <ListItem key={note.id}>
                      <span className="listing-text">
                      <a href={"/Location/" + note.id}>
                        {note.businessName} at {note.businessAddress}
                      </a>
                      </span>
                      {
        note.image && <img className="registration-list-img" src={note.image}/>
      }
  {/* <Form.Check type='checkbox' defaultChecked={note.walkInAvailable} onChange={(e)=>{mark(note, !note.walkInAvailable)}}/> {/*onChange={(e) => setChecked(checked =>!checked)} */}
                   
                  
  <Formik
      validationSchema={schema}
      initialValues={{
        walkInAvailable: ''
      }}>
  {({
    values:formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  }) => (
<Form>
<Field
        component="select"
        id="walkInAvailable"
        onBlur={handleBlur}
        value={formData.walkInAvailable || note.walkInAvailable}

        // onChange={e => {handleChange(e); setFormData({ ...formData, 'currentPhase': e.target.value})}}
        onChange={e =>{handleChange(e); setFormData({ ...formData, 'walkInAvailable': e.target.value})}}
        // onChange={e => {handleChange(e); setFormData({ ...formData, 'currentPhase': e.target.value})}}
        multiple={false}
      >
          <option
            as="select"
            value={true}
            label="walk-Ins Welcome"
            name="walk-Ins Welcome"
          >walk-Ins Welcome</option>
          <option
            as="select"
            value={false}
            label="No Walk-Ins"
            name="No Walk-Ins"
          >No Walk-Ins</option>
          </Field>
                    <Button className="form-btn small"
             type="submit"
             onClick={e => {mark(e)}}
           >update</Button>
</Form>
)}
</Formik>
                  
                  
                  
                  <a href={"/Update/" + note.id}><DeleteBtn text="update"/></a>
                    <div>
                    <DeleteBtn onClick={() => deleteNote(note)} text="delete"/>
                    </div>
                  </ListItem>
                )))}
              </List>
    </div> 
    <AmplifySignOut /> 
  </Col>
</Row>
    </div>
    )  
     );
}

export default withAuthenticator(Register);