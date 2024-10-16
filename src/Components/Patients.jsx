import React, { useState } from 'react';
import './Patients.css';

// Mock Data for Patients
const initialPatients = [
    { id: 1, name: 'Sathya', age: 30, condition: 'Diabetes', phone: '1234567890' },
    { id: 2, name: 'Gowri', age: 31, condition: 'Hypertension', phone: '9876543210' },
    { id: 3, name: 'Prabha', age: 30, condition: 'Healthy', phone: '5555555555' },
    { id: 4, name: 'Mohan', age: 30, condition: 'Asthma', phone: '6666666666' },
];

const Patients = () => {
    // State to manage the patients list and modal visibility
    const [patients, setPatients] = useState(initialPatients);
    const [showModal, setShowModal] = useState(false);
    const [currentPatient, setCurrentPatient] = useState({
        id: '',
        name: '',
        age: '',
        condition: '',
        phone: '',

    });
    const [isEditMode, setIsEditMode] = useState(false);  // To differentiate edit and create modes

    // Handle Create or Edit Button
    const handleCreateOrEdit = (event) => {
        event.preventDefault();

        if (isEditMode) {
            // If in edit mode, update the patient details
            setPatients(patients.map((patient) =>
                patient.id === currentPatient.id ? currentPatient : patient
            ));
        } else {
            // If in create mode, add new patient
            setPatients([...patients, { ...currentPatient, id: patients.length + 1 }]);
        }

        // Reset the form and close modal
        setCurrentPatient({
            id: '',
            name: '',
            age: '',
            condition: '',
            phone: '',
        });
        setShowModal(false);
        setIsEditMode(false);  // Reset mode to Create
    };

    // Handle Edit Button
    const handleEditClick = (patient) => {
        setIsEditMode(true);
        setCurrentPatient(patient);
        setShowModal(true);
    };

    // Handle Delete Button
    const handleDeleteClick = (id) => {
        setPatients(patients.filter((patient) => patient.id !== id));
    };

    // Handle modal close
    const handleModalClose = () => {
        setShowModal(false);
        setCurrentPatient({
            id: '',
            name: '',
            age: '',
            condition: '',
            phone: '',
        });
        setIsEditMode(false);
    };

    return (
        <div className="patients-page">
            <h2>Patients List</h2>


            {/* Patients Table */}
            <table className="patients-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Condition</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.id}</td>
                            <td>{patient.name}</td>
                            <td>{patient.age}</td>
                            <td>{patient.condition}</td>
                            <td>{patient.phone}</td>
                            <td>
                                {/* Edit and Delete Buttons */}
                                <button className="create-btn" onClick={() => setShowModal(true)}>Create</button>
                                <button className="edit-btn" onClick={() => handleEditClick(patient)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDeleteClick(patient.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal to Create or Edit a Patient */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{isEditMode ? 'Edit Patient' : 'Create New Patient'}</h3>
                        <form onSubmit={handleCreateOrEdit} className="patient-form">
                            <label>Patient Name:</label>
                            <input
                                type="text"
                                value={currentPatient.name}
                                onChange={(e) => setCurrentPatient({ ...currentPatient, name: e.target.value })}
                                required
                            />
                            <label>Age:</label>
                            <input
                                type="number"
                                value={currentPatient.age}
                                onChange={(e) => setCurrentPatient({ ...currentPatient, age: e.target.value })}
                                required
                            />
                            <label>Condition:</label>
                            <input
                                type="text"
                                value={currentPatient.condition}
                                onChange={(e) => setCurrentPatient({ ...currentPatient, condition: e.target.value })}
                                required
                            />
                            <label>Phone:</label>
                            <input
                                type="tel"
                                value={currentPatient.phone}
                                onChange={(e) => setCurrentPatient({ ...currentPatient, phone: e.target.value })}
                                required
                            />
                            <button type="submit">{isEditMode ? 'Save Changes' : 'Create Patient'}</button>
                            <button type="button" onClick={handleModalClose}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Patients;