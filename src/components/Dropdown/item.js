import Dropdown from 'react-bootstrap/Dropdown'
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';


function DropdownList (props) {
    return (
        <Dropdown.Item href={props.menuLink} data-message={props.datamsg} tabIndex="0">{props.menuTitle}</Dropdown.Item>
    )
}
export default DropdownList;