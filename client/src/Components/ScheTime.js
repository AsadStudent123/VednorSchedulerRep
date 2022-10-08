import React, { Component } from 'react';
import '../css/grid.css';

const ScheTime = (props) => {
    return (<>
        <table>
          <tbody>
          {props.showtime.map((val,index)=>{
            return <tr key={val.time}>
                  <th className='gridtimeWidth'>{val.time}</th>
                {val.row!=0 ? <td colSpan="4"   rowSpan={val.row} className="stage-green gridWidth">Available</td>: <td  className='gridWidth' colSpan="4"></td>}
              </tr> 
            })} 
            </tbody>
        </table>
   </>);
}
 
export default ScheTime;