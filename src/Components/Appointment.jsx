import React from 'react';
import "./Appointment.css"

const Appointment = ({ patients }) => {
  return (
    <div className="appointments-container">
      <h4 className="appointments-heading">Appointments</h4>
      {Object.keys(patients).length === 0 ? (
        <p className="no-appointments">No appointments scheduled yet.</p>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Token No.</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Blood Group</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(patients).map((dateKey) => (
              patients[dateKey].map((appointment, index) => (
                <tr key={index} className="appointment-row">
                  <td>{dateKey}</td>
                  <td>{appointment.token}</td>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.age}</td>
                  <td>{appointment.phone}</td>
                  <td>{appointment.email}</td>
                  <td>{appointment.bloodGroup}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Appointment;
