import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import AppointmentCalendar from './Components/AppointmentCalendar';
import Patients from './Components/Patients';
import Appointment from './Components/Appointment'; 

import './App.css';

const App = () => {
  const [appointments, setAppointments] = useState({});

  return (
    <Router>
      <div className="app">
        <Sidebar />

        <div className="content">
          <Routes>
            <Route path="/" element={<AppointmentCalendar setAppointments={setAppointments} appointments={appointments} />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/appointments" element={<Appointment patients={appointments} />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;