import React, { Component } from 'react';
import '../css/header.css';

const Header = (props) => {
    return ( <>
        <div className="header">
            <a href="#" className="logo">{props.headerName}</a>
        </div>
    </> );
}
 
export default Header;