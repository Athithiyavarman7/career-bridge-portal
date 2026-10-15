import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function CreateJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    jobtype: "Full Time",
    companyId: "",
  });

  const [myCompanies, setMyCompanies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getUserIdFromToken = (token) => {
    try {
      const payload = token.split(".")[1];
      const decodedPayload = JSON.parse(
        decodeURIComponent(
          atob(payload)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        )
      );
      return decodedPayload.user_id || decodedPayload.id || decodedPayload.sub;
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const fetchMyCompanies = async () => {
      const token = localStorage.getItem("access");
      if (!token) {
        setError("You are not logged in.");
        return;
      }

      try {
        const userId = getUserIdFromToken(token);
        const response = await axios.get("http://127.0.0.1:8000/companies/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const allCompanies = Array.isArray(response.data) ? response.data : [];
        
        // Coerce both IDs to strings to prevent string vs number comparison mismatches
        const userCompanies = allCompanies.filter(
          (c) => String(c.owner) === String(userId) || c.owner?.id === userId
        );

        setMyCompanies(userCompanies);

        if (userCompanies.length > 0) {
          setFormData((prev) => ({ ...prev, companyId: userCompanies[0].id }));
        }
      } catch (err) {
        console.error("Failed to fetch companies:", err);
        setError("Unable to load companies. Check backend connection.");
      }
    };

    fetchMyCompanies();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const token = localStorage.getItem("access");

    try {
      await axios.post(
        "http://127.0.0.1:8000/jobs/",
        {
          title: formData.title,
          description: formData.description,
          location: formData.location,
          salary: parseFloat(formData.salary),
          jobtype: formData.jobtype,
          company: parseInt(formData.companyId, 10),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job posted successfully!");
      navigate("/jobs");
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail ||
        (typeof err.response?.data === "object"
          ? JSON.stringify(err.response.data)
          : "Failed to post job.");
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <h2 className="fw-bold mb-4">Post a Job</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm border-0 rounded-4">
        <div className="mb-3">
          <label className="form-label fw-semibold">Job Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Job Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Location</label>
            <input
              type="text"
              name="location"
              className="form-control"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Salary (₹)</label>
            <input
              type="number"
              name="salary"
              className="form-control"
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Job Type</label>
          <select
            name="jobtype"
            className="form-select"
            value={formData.jobtype}
            onChange={handleChange}
            required
          >
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Select Company</label>
          {myCompanies.length === 0 ? (
            <div className="alert alert-warning d-flex justify-content-between align-items-center mb-0">
              <span className="small me-2">No companies found. You must create one first!</span>
              <Link to="/create-company" className="btn btn-sm btn-dark text-nowrap">
                Create Profile
              </Link>
            </div>
          ) : (
            <select
              name="companyId"
              className="form-select"
              value={formData.companyId}
              onChange={handleChange}
              required
            >
              {myCompanies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 py-2"
          disabled={isLoading || myCompanies.length === 0}
        >
          {isLoading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}

export default CreateJob;