import React, { useState } from "react";
import "../css/dashboard.css";
import Navbar from "./navbar";

const Dashboard = () => {
  const [dashboardData] = useState({
    totalPets: 18,
    activeAdopters: 10,
    pendingApplications: 4,
    eventStats: 6,
  });

  const [pets, setPets] = useState([
    {
      id: "1",
      name: "Buddy",
      breed: "Golden Retriever",
      age: "2",
      medicalStatus: "Healthy",
      shelter: "Shelter A",
    },
    {
      id: "2",
      name: "Whiskers",
      breed: "Tabby Cat",
      age: "3",
      medicalStatus: "Vaccinated",
      shelter: "Shelter B",
    },
  ]);

  const [view, setView] = useState("dashboard");

  const handleDelete = (id) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
  };

  return (
    <div>
      <Navbar />

      <div className="hero-section">
        <div className="hero-content">
          <h1> PetPal Admin Dashboard</h1>
          <p>Manage pets, view statistics, and track adoption progress.</p>
        </div>
      </div>

      <div className="tabs">
        <button
          onClick={() => setView("dashboard")}
          className={view === "dashboard" ? "active" : ""}
        >
          Dashboard
        </button>
        <button
          onClick={() => setView("pets")}
          className={view === "pets" ? "active" : ""}
        >
          Manage Pets
        </button>
      </div>

      {view === "dashboard" && (
        <>
          <div className="stats-cards">
            <div className="card">
              <h3>{dashboardData.totalPets}</h3>
              <p>Total Pets Listed</p>
            </div>
            <div className="card">
              <h3>{dashboardData.activeAdopters}</h3>
              <p>Active Adopters</p>
            </div>
            <div className="card">
              <h3>{dashboardData.pendingApplications}</h3>
              <p>Pending Applications</p>
            </div>
            <div className="card">
              <h3>{dashboardData.eventStats}</h3>
              <p>Events Held</p>
            </div>
          </div>

          <div className="about-section">
            <div className="about-text">
              <h2>About PetPal</h2>
              <p>
                PetPal connects loving adopters with pets in need. Our platform
                makes it easier to manage pet data, track adoption processes,
                and organize events to support animal welfare.
              </p>
            </div>
            <div className="about-image">
            
            </div>
          </div>
        </>
      )}

      {view === "pets" && (
        <div className="pet-management">
          <h2>Pet Listings</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Breed</th>
                <th>Age</th>
                <th>Status</th>
                <th>Shelter</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet) => (
                <tr key={pet.id}>
                  <td>{pet.name}</td>
                  <td>{pet.breed}</td>
                  <td>{pet.age}</td>
                  <td>{pet.medicalStatus}</td>
                  <td>{pet.shelter}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(pet.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
