import React, { Component, useEffect, useState } from 'react';
import Axios from 'axios'
const Customers = () => {
    const [name,setname]=useState('')
    const Submit =()=>{
        Axios.post('http://localhost:3001/api/postCustomername',{
            vname:name,
        }).then((response)=>{
            setname('');
        })
    }
    const onChangevendorName =(e)=>{
        setname(e.target.value);
    }
    return ( <>
    <div>
        <label>Enter Name: </label>
        <input type="text" id="customername" value={name}  onChange={onChangevendorName}></input>
        <button type='button' onClick={Submit}>Save</button>
    </div>
    </> );
}
 
export default Customers;