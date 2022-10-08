import React, { Component, useEffect, useState } from 'react';
import '../css/dropdown.css';
import Axios from 'axios'

const Dropdown = (props) => {
 const [name,setname]=useState([]);
 const vendorName =(e)=>{
    props.getVendor(e.target.value)
  }

useEffect(()=>{
    Axios.get('http://localhost:3001/api/getVendors').then((response)=>{
        setname(response.data);
    })
},[]);
  
  return ( <>
  <div>
   <label>Select Vendor:</label>
    <select className='selectDropdown' onChange={vendorName}>
            <option value="0">Please Select</option>
        {name.map((val)=>{
                return <option key={val.customerid}  value={val.customerid}>{val.name}</option>
        })} 
        </select>
    </div>
    </> );
}
 
export default Dropdown;