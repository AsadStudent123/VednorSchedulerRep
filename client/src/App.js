import './App.css';
import Dropdown from './Components/DropDown';
import Grid from './Components/Grid';
import Header from './Components/Header';
import React, { Component, useEffect, useState } from 'react';
import Axios from 'axios';
import Days from './Components/Days';
function App() {
  const title= "Vendor Scheduler";
   const [vendorid,setvendorid]=useState('');//we need this name for fecthing data day wise
  const [daydata,setdaydata]=useState('mon');
  const [timegrid,settimegrid]=useState([]);
  const getDayData =(daycode)=>{
    setdaydata(daycode);
  }
  const getVendor =(id)=>{
    setvendorid(id);
  }
  const submitTime =(startTime,endTime)=>{
    if(startTime !='' && endTime !='' && vendorid != ''){
        Axios.post('http://localhost:3001/api/postTime',{
            customerid:vendorid,
            day:daydata,
            startTime:startTime,
            endTime:endTime,
        }).then((response)=>{
          getJobScheduleData();
        })
    }
    else{
      alert("Please select valid time, day and vendor name")
    }
  }
  const getJobScheduleData =()=>{
        Axios.get(`http://localhost:3001/api/getjobschedule/${vendorid}/${daydata}`,{
          customerid:vendorid,
          day:daydata,
        }).then((response)=>{
          if(response.data.length > 0 && (response.data[0].starttime=='*' || response.data[0].starttime=='all'))
          settimegrid(response.data[0]);
          else
          settimegrid(response.data);
      });
  }
  useEffect(() => {
      if((vendorid!='')){
      getJobScheduleData();
    }
  }, [vendorid,daydata]);
  return (
    <div className="App">
      <Header headerName={title}></Header>
      <Dropdown getVendor={getVendor}></Dropdown>
      <div className="container col-lg-12">
            <Days getDayData={getDayData}></Days>
      </div>
      <Grid vendorid={vendorid}  getDayData={getDayData} submitTime={submitTime} timegrid={timegrid}></Grid>
    </div>
  );
}

export default App;
