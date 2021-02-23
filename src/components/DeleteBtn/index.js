import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn(props) {
  return (
    <span className="delete-btn" {...props} action={props.target} method="get"  role="button" tabIndex="0">
      {props.text}
    </span>
  );
}

export default DeleteBtn;
