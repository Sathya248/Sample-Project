import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendar } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Home</h3>
      <ul>
        <li>
          <NavLink to="/" activeClassName="active-link">
            <FontAwesomeIcon icon={faCalendar} /> Calendar
          </NavLink>
        </li>

        <li>
          <NavLink to="/patients" activeClassName="active-link">
            <FontAwesomeIcon icon={faUsers} /> Patients
          </NavLink>
        </li>


        <li>
          <NavLink to="/appointments" activeClassName="active-link">
            <FontAwesomeIcon icon={faCalendar} />  Appointments
          </NavLink>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;