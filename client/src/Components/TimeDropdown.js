import React, { Component, useEffect, useState } from 'react';
import '../css/dropdown.css';
import Axios from 'axios'
import $ from "jquery"
import timepicker from "timepicker"
import 'timepicker/jquery.timepicker.min.css'

const TimeDropdDown = (props) => {
  useEffect(()=>{
    const idDD=props.timeddid;
    let minTime='';
    if(idDD=='endTime'){
      minTime=props.minTime;
      minTime==''? ($('#'+idDD).prop('disabled',true)) : ($('#'+idDD).prop('disabled',false)) 
    }
    $('#'+idDD).timepicker({'timeFormat': 'H:i','minTime': minTime,'maxTime': '23:30', });
    $('#'+idDD).on('changeTime', function() {
      props.getTime(($(this).val()));
    });
    
  },[props.minTime]);

  return (<>
    <div>
      <b>{props.label}: </b>
      <input type="text" id={props.timeddid} className ="time" />
    </div>
  </>);
}
 
export default TimeDropdDown;