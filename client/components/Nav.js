import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div id="header">
      <div id="titleBar">
        <div id="title">Senior Enrichment Project</div>
        <div id="login">Login</div>
      </div>
      <div id="nav">
        <div className="navTab"><Link to="/">Home</Link></div>
        <div className="navTab"><Link to="/schools">Schools</Link></div>
        <div className="navTab"><Link to="/students">Students</Link></div>
      </div>
    </div>
  )
}

export default Nav;
