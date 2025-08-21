import React, { useState } from 'react';
import axios from 'axios';
import "../../css/anam/eventScheduling.css";
import logo from '../../../images/petlogo.jpg';
import Navbar from '../navbar';

const cities = [
  "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad",
  "Peshawar", "Quetta", "Multan", "Hyderabad",
];

const EventScheduling = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    short_description: '',
    location: '',
    event_date: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.title || !formData.location || !formData.event_date) {
      setMessage('Please fill in the required fields!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/events', formData);
      setMessage(response.data.message);
      setFormData({
        title: '',
        description: '',
        short_description: '',
        location: '',
        event_date: ''
      });
    } catch (error) {
      console.error('Error submitting event:', error);
      setMessage('Failed to create event. Server error.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="event-container">
        <img src={logo} alt="Logo" className="event-logo" />
        <h2 className="title">Event Scheduling</h2>

        <div className="event-form">
          <h3>Create Event</h3>

          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Event Description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="short_description"
            placeholder="Short Description"
            value={formData.short_description}
            onChange={handleChange}
          />

          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="select-input"
          >
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option value={city} key={index}>
                {city}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="event_date"
            value={formData.event_date}
            onChange={handleChange}
          />

          <button className="publish-btn" onClick={handleSubmit}>
            Publish Event
          </button>

          {message && <p className="form-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default EventScheduling;
