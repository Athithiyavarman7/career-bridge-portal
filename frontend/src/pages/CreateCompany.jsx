import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateCompany() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const token = localStorage.getItem("access");

    try {
      // Axios automatically handles the JSON body and headers nicely
      await axios.post("http://127.0.0.1:8000/companies/", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Company Created Successfully!");
      navigate("/create-job"); // Send them back to post the job!
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create company.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <h2 className="fw-bold mb-4">Register Your Company</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm border-0 rounded-4">
        <div className="mb-3">
          <label className="form-label fw-semibold">Company Name</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Location</label>
          <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="form-label fw-semibold">Description</label>
          <textarea name="description" className="form-control" rows="4" value={formData.description} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100 py-2" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Company"}
        </button>
      </form>
    </div>
  );
}

export default CreateCompany;