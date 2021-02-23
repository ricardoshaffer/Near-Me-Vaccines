import DropdownButton from 'react-bootstrap/DropdownButton';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';


function Dropdown (props) {
    return (
    <DropdownButton id="dropdown-basic-button" data-message="select which vaccine priority group you are in" tabindex="-1" variant="btn-custom-index" title="level of risk" {...props} />
    )
}
export default Dropdown;