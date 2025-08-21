// src/pages/anam/AdoptionApplications.js
import React, { useState } from 'react';
import "../../css/anam/adoptionApplications.css";
import Footer from '../footer';

const dummyApplications = [
  {
    id: 1,
    adopterName: 'Ali Raza',
    petName: 'Max',
    home_environment: 'Spacious home with backyard',
    experience_with_pets: 'Owned 2 dogs in past 5 years',
    reason_for_adoption: 'Looking for companionship',
    status: 'pending',
    description: 'Ali has a loving family and is very committed to caring for pets.',
  },
  {
    id: 2,
    adopterName: 'Fatima Khan',
    petName: 'Bella',
    home_environment: 'Apartment living with regular park visits',
    experience_with_pets: 'No experience',
    reason_for_adoption: 'Child wants a pet',
    status: 'pending',
    description: 'Fatima is excited to give her child the responsibility of pet care.',
  },
];

const AdoptionApplications = () => {
  const [applications, setApplications] = useState(dummyApplications);

  const updateStatus = (id, newStatus) => {
    const updated = applications.map(app =>
      app.id === id ? { ...app, status: newStatus } : app
    );
    setApplications(updated);
  };

  return (
    <div className="applications-container">
      <h2 className="applications-title">Adoption Applications</h2>
      <p className="applications-desc">
        Below are the pet adoption applications received so far. You can review each application
        for details and decide whether to approve or reject.
      </p>
      <div className="applications-grid">
        {applications.map((app) => (
          <div className="application-card" key={app.id}>
            <div className="card-header">
              <h3>{app.adopterName}</h3>
              <p className="pet-name">wants to adopt <strong>{app.petName}</strong></p>
              <span className={`status ${app.status}`}>{app.status}</span>
            </div>
            <div className="card-body">
              <p><strong>Home Environment:</strong> {app.home_environment}</p>
              <p><strong>Experience with Pets:</strong> {app.experience_with_pets}</p>
              <p><strong>Reason for Adoption:</strong> {app.reason_for_adoption}</p>
              <p className="app-description">{app.description}</p>
            </div>
            {app.status === 'pending' && (
              <div className="action-buttons">
                <button 
                  onClick={() => updateStatus(app.id, 'approved')} 
                  className="approve-btn"
                >
                  Approve
                </button>
                <button 
                  onClick={() => updateStatus(app.id, 'rejected')} 
                  className="reject-btn"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default AdoptionApplications;
