import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/pet_managment.css";
import Navbar from "./navbar";

const PetManagementDashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    breed: "",
    description: "",
    available: true,
    shelter: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const backendURL = "http://localhost:5000/api/pets";

  // ✅ Fetch Pets (you can remove this if not needed for display)
  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      await axios.get(backendURL);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // ✅ Handle image upload as base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Handle submit (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.age || !formData.breed || !formData.description || !formData.shelter) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${backendURL}/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post(backendURL, formData);
      }

      // Reset form
      setFormData({
        name: "",
        age: "",
        breed: "",
        description: "",
        available: true,
        shelter: "",
        image: "",
      });
    } catch (err) {
      console.error("Submit error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Pet Management Dashboard</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded shadow mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Pet Name"
              className="p-2 border rounded"
              required
            />
            <input
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="p-2 border rounded"
              required
            />
            <input
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              placeholder="Breed"
              className="p-2 border rounded"
              required
            />
            <input
              name="shelter"
              value={formData.shelter}
              onChange={handleChange}
              placeholder="Shelter Name"
              className="p-2 border rounded"
              required
            />
          </div>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded mt-2"
            required
          ></textarea>

          <div className="mt-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2"
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            <label>Available for Adoption</label>
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
          >
            {editingId ? "Update Pet" : "Add Pet"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PetManagementDashboard;
