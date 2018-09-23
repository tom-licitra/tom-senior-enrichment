import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div id="Nav">
      <div className="navTab"><Link to="/">Home</Link></div>
      <div className="navTab"><Link to="/schools">Schools</Link></div>
      <div className="navTab"><Link to="/students">Students</Link></div>
    </div>
  )
}

export default Nav;
