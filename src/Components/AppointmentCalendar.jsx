import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AppointmentCalendar.css';

const AppointmentCalendar = ({ setAppointments, appointments }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    token: '',
    patientName: '',
    age: '',
    phone: '',
    email: '',
    bloodGroup: '',
  });

  // Function to handle the date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const handleAddAppointment = (event) => {
    event.preventDefault();

    const { token, patientName, age, phone, email, bloodGroup } = appointmentDetails;
    if (!token || !patientName || !age || !phone || !email || !bloodGroup) {
      alert("All fields are required!");
      return;
    }

    const dateKey = selectedDate.toDateString();


    const updatedAppointments = {
      ...appointments,
      [dateKey]: appointments[dateKey] ? [
        ...appointments[dateKey],
        appointmentDetails
      ] : [appointmentDetails],
    };

    setAppointments(updatedAppointments);
    setShowModal(false);
    setAppointmentDetails({
      token: '',
      patientName: '',
      age: '',
      phone: '',
      email: '',
      bloodGroup: '',
    });
  };

  const tileDisabled = ({ date }) => {
    // Get the current date with no time component
    const today = new Date();
    today.setHours(0, 0, 0, 0);  // Set time to 00:00 to compare only the date

    // Disable dates before today
    return date < today;
  };


  // Modal form to handle appointment details
  const handleModalClose = () => {
    setShowModal(false);
    setAppointmentDetails({
      token: '',
      patientName: '',
      age: '',
      phone: '',
      email: '',
      bloodGroup: '',
    });
  };

  return (
    <div className="appointment-calendar">
      <h2>Appointment Calendar</h2>

      {/* Calendar UI */}
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={({ date, view }) => {
          const dateKey = date.toDateString();
          if (appointments[dateKey]) {
            return 'has-appointments';  // Mark dates with appointments
          }
          return '';
        }}
        tileDisabled={tileDisabled}
      />

      {/* Button to trigger popup */}
      <button
        className="add-appointment-btn"
        onClick={() => setShowModal(true)}
      >
        Add Appointment for {selectedDate.toDateString()}
      </button>

      {/* Appointment Modal for adding appointment details */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Enter Appointment Details</h3>
            <form onSubmit={handleAddAppointment} className="appointment-form">
              <label>Token Number:</label>
              <input
                type="text"
                value={appointmentDetails.token}
                onChange={(e) => setAppointmentDetails({ ...appointmentDetails, token: e.target.value })}
                required
              />
              <label>Patient Name:</label>
              <input
                type="text"
                value={appointmentDetails.patientName}
                onChange={(e) => setAppointmentDetails({ ...appointmentDetails, patientName: e.target.value })}
                required
              />
              <label>Age:</label>
              <input
                type="number"
                value={appointmentDetails.age}
                onChange={(e) => setAppointmentDetails({ ...appointmentDetails, age: e.target.value })}
                required
              />
              <label>Phone:</label>
              <input
                type="tel"
                value={appointmentDetails.phone}
                onChange={(e) => setAppointmentDetails({ ...appointmentDetails, phone: e.target.value })}
                required
              />
              <label>Email:</label>
              <input
                type="email"
                value={appointmentDetails.email}
                onChange={(e) => setAppointmentDetails({ ...appointmentDetails, email: e.target.value })}
                required
              />
              <label>Blood Group:</label>
              <input
                type="text"
                value={appointmentDetails.bloodGroup}
                onChange={(e) => setAppointmentDetails({ ...appointmentDetails, bloodGroup: e.target.value })}
                required
              />
              <button type="submit">Save </button>
              <button type="button" onClick={handleModalClose}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;