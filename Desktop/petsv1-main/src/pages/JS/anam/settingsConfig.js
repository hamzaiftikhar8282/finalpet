// src/pages/anam/SettingsConfig.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../css/anam/settings.css";
import Navbar from '../navbar';

const backendURL = 'http://localhost:5000';

const SettingsConfig = () => {
  const [settings, setSettings] = useState({
    breed: '',
    region: '',
    size: '',
    minAge: '',
    notifyByEmail: false,
    notifyBySMS: false,
  });

  // ✅ Fetch existing settings from backend
  useEffect(() => {
    axios.get(`${backendURL}/api/settings`)
      .then(res => {
        setSettings(res.data);
      })
      .catch(err => {
        console.log('No settings found yet');
      });
  }, []);

  // ✅ Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // ✅ Handle form submit (Save Settings)
  const handleSubmit = async () => {
    try {
      await axios.post(`${backendURL}/api/settings`, settings);
      alert('Settings saved successfully!');
    } catch (err) {
      alert('Error saving settings');
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="settings-container">
        <h2 className="settings-title">Settings & Configuration</h2>

        <div className="settings-form">

          {/* Pet Category Settings */}
          <div className="settings-section">
            <h3>Pet Category Settings</h3>
            <input
              type="text"
              name="breed"
              placeholder="Breed (e.g., Labrador)"
              value={settings.breed}
              onChange={handleChange}
            />
            <input
              type="text"
              name="region"
              placeholder="Region (e.g., Punjab)"
              value={settings.region}
              onChange={handleChange}
            />
            <input
              type="text"
              name="size"
              placeholder="Size (e.g., Small, Medium)"
              value={settings.size}
              onChange={handleChange}
            />
          </div>

          {/* Adoption Rules */}
          <div className="settings-section">
            <h3>Adoption Rules</h3>
            <input
              type="number"
              name="minAge"
              placeholder="Minimum Age for Adoption"
              value={settings.minAge}
              onChange={handleChange}
            />
          </div>

          {/* Notification Preferences */}
          <div className="settings-section">
            <h3>Notification Preferences</h3>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="notifyByEmail"
                checked={settings.notifyByEmail}
                onChange={handleChange}
              />
              Notify by Email
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="notifyBySMS"
                checked={settings.notifyBySMS}
                onChange={handleChange}
              />
              Notify by SMS
            </label>
          </div>

          {/* Save Button */}
          <div className="button-container">
            <button className="save-btn" onClick={handleSubmit}>
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsConfig;
