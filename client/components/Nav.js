import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ props }) => {
  const { location } = props;
  return (
    <div id="header">
      <div id="titleBar">
        <div id="title">Fullstack School Management Tool</div>
        <div id="login">Login</div>
      </div>
      <div id="nav">
        <Link className={location.pathname === "/" ? "navTab selected" : "navTab"} to="/"><div>Dashboard</div></Link>
        <Link className={location.pathname.indexOf("/schools") >= 0 ? "navTab selected" : "navTab"} to="/schools"><div>Schools</div></Link>
        <Link className={location.pathname.indexOf("/students") >= 0 ? "navTab selected" : "navTab"} to="/students"><div>Students</div></Link>
      </div>
    </div>
  )
}

export default Nav;
