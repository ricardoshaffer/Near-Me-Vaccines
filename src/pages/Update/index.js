import React, { Component } from "react";
import "../../App.css";
import BusinessListing from './listing';
import Update from '../Update/listing'

export default class UpdateLocation extends Component {
  state = {}

  render() {
    return (<Update location_id={this.props.location_id}>{this.props.children}</Update>);
  }
}