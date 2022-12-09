import React from 'react';
import { NavLink } from 'react-router-dom';

const CustomLink = ({ to, children }) => {
  const activeStyle = {
    backgroundColor: '#92a3bb45',
    color: 'white'
  };
  const notActiveStyle = {
    backgroundColor: ''
  };
  return (
    <NavLink
      to={to}
      className='btn btn-ghost'
      style={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}
    >
      {children}
    </NavLink>
  );
};

export default CustomLink;
