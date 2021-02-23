import React  from 'react';
import Moment from 'react-moment';
import 'react-moment';
 
export default function Currenttime() {
    // export default class Currenttime extends React.Component{
        return(
            <Moment format="HH" parse="HH" interval={600000} local/>
           )
            }
