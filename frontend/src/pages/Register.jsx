// FILE: src/pages/Register.jsx
import axios from 'axios'; // ✅ Corrected import
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log("Sending data:", formData);

        try {
            // ✅ Replaced fetch with axios and used the proxy-friendly relative URL
            // Note: The trailing slash is included to prevent the 301/405 redirect error
            const response = await axios.post("/register/", formData);

            console.log("Response:", response.data);
            alert("Registration successful! Redirecting to login...");
            navigate("/login");
            
        } catch (error) {
            console.error("Error:", error);
            
            // ✅ Axios specific error handling to extract Django's exact error messages
            const errorMessage = 
                error.response?.data?.username?.[0] || // E.g., "A user with that username already exists."
                error.response?.data?.detail ||
                error.message ||
                "Network error! Check console for details.";
                
            alert("Registration failed: " + errorMessage);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card border-0 shadow-lg rounded-4 p-4">
                        <div className="text-center mb-4">
                            <h2 className="fw-bold">Create your account</h2>
                            <p className="text-muted">Join our career bridge</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control form-control-lg"
                                    placeholder="Enter username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control form-control-lg"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control form-control-lg"
                                    placeholder="Create password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Role</label>
                                <select
                                    name="role"
                                    className="form-select form-select-lg"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select your role</option>
                                    <option value="jobseeker">Job Seeker</option>
                                    <option value="recruiter">Recruiter</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg w-100 mt-2">
                                Create account
                            </button>
                        </form>

                        <p className="text-center text-muted mt-4 mb-0">
                            Already have an account?
                            <a href="/login" className="text-primary ms-1">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;