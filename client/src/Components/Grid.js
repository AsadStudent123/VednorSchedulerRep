import React, { Component, useEffect, useState } from 'react';
import Days from './Days';
import TimeDropdDown from './TimeDropdown';
import ScheTime from './ScheTime'


const Grid = (props) => {
      const [typeOFTime, settypeOFTime] = useState("");
      const [strttime,setstrttime]=useState('')
      const [minTime,setminTime]=useState('')
      const [etime,setetime]=useState('')
      const [showtime,setshowtime]=useState([])
      let timearr=[];
      var objarr=[];

      const startTime =(time)=>{
          setminTime(time);
          setstrttime(time)
      }
      
      const endTime =(time)=>{ 
        setetime(time);
      }
      
      const selectTime =()=>{
          if(typeOFTime==''){
            props.submitTime(strttime,etime)
          }
          else if (typeOFTime=='*'){
            props.submitTime('*','*') ;
          }
          else if (typeOFTime=='all'){
            props.submitTime('all','all') ;
          }
      }

      function onChangeValue(event) {
        settypeOFTime(event.target.value);
      }

      const timerender =()=>{
          for(var i=0;i<=24;i++){
              if(i<=9)
              {
                timearr.push(('0'+i+":00"))
                timearr.push(('0'+i+":30"))
              }
              else
              {
                timearr.push((i+":00"))
                timearr.push((i+":30"))
              }
          }
          timearr.pop();
          createScheduler()
      }

      useEffect(() => {
          timerender()
      }, [props.timegrid]);

      const createScheduler =()=>{
        var obj={}
        for(var i=0;i<timearr.length;i++){
          if(props.timegrid.starttime=="*" || props.timegrid.starttime=="all"){
            if(i==0){
              obj={
                time:timearr[i],
                row:50
              }
            }
            else{
              obj={
                time:timearr[i],
                row:0
              }
            }
          }
          else{ 
            if(props.timegrid.some(it=>it.starttime == timearr[i]))
            {
                const gettime= props.timegrid.filter(v=>v.starttime==timearr[i])
                obj={
                  time:timearr[i],
                  row:rowspan(gettime[0].starttime,gettime[0].endtime)
                }
            }
            else{
                obj={
                    time:timearr[i],
                    row:0
                }
            }
          }
          objarr.push(obj);
        }
      setshowtime(objarr);
    }

     function diff_minutes(dt1 ,dt2) 
     {
        var diff =(dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return diff/30;
     }

     function rowspan(startTime,endTime)
     {
        let dt1 = new Date("October 10, 2022 "+startTime);
        let  dt2 = new Date("October 10, 2022 "+endTime);
        return diff_minutes(dt1, dt2);
     }
     
    return (<>
    <div className='container'>
        <div className=" row d-inital col-lg-12 text-center" >
         <div className="d-flex col-12" > <input  type="radio"  name="timepicker" onChange={onChangeValue} defaultChecked value=''/> 
                 <TimeDropdDown label="Start Time" timeddid="startTime" minTime={''} getTime={startTime}></TimeDropdDown>
              <div className="pl-10">
                 <TimeDropdDown label="End Time" timeddid="endTime" minTime={minTime} getTime={endTime} ></TimeDropdDown>
              </div>
              </div>
            <b className="col-4"> <input  onChange={onChangeValue} name="timepicker" type="radio" value='all' />All day</b>
            <b className="col-4"> <input  onChange={onChangeValue} name="timepicker" type="radio" value='*' />24/7</b>
            <div className="pl-50 col-4"><button type='button' onClick={selectTime}>Save</button></div>
        </div>
        <div className="col-lg-12 row text-center">
            <ScheTime showtime={showtime} ></ScheTime>
        </div>
    </div>
   </>);
}
 
export default Grid;