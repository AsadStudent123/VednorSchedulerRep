import React, { Component, useEffect, useState } from 'react';
import Axios from 'axios'
const Days = (props) => {
    const [days,setdays]=useState([]);
    useEffect(()=>{
    Axios.get('http://localhost:3001/api/getdays').then((response)=>{
        setdays(response.data);
    })

},[]);

const onchangeDay=(e)=>{e.stopPropagation();
    props.getDayData(e.target.value);
}
return ( <>
    <div>
    {days.filter((e, index) => index === 0).map((val,index)=>{
                return <b key={val.daycode} > <input onChange={onchangeDay} defaultChecked  type="radio" value={val.daycode} name="days"/>{val.dayname}</b>
        })} 
            {days.filter((e, index) => index !== 0).map((val,index)=>{
                return <b key={val.daycode} > <input onChange={onchangeDay} type="radio" value={val.daycode} name="days"/>{val.dayname}</b>
        })}
    </div>
</> );
}
 
export default Days;