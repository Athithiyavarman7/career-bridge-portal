// FILE: src/pages/Login.jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // ✅ Added Axios import

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.username.trim() || !formData.password.trim()) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        setError("");

        try {
            console.log("Attempting login with:", formData.username);

            // ✅ Replaced fetch with axios.post and fixed the URL typo
            // Note: If your Django URLs require an '/api' prefix as your original comment suggested, change this to "http://127.0.0.1:8000/api/login/"
            const response = await axios.post("/login/", formData);

            // Axios automatically handles JSON parsing, so the payload is directly at response.data
            const data = response.data;
            
            console.log("Response status:", response.status);
            console.log("Response data:", data);

            // Validate that we got our tokens and role back
            if (!data.access || !data.refresh || !data.role) {
                throw new Error("Missing authentication data from server");
            }

            // Store credentials locally
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            localStorage.setItem("role", data.role);
            localStorage.setItem("username",data.username);

            // Route based on role
            if (data.role === "recruiter") {
                navigate("/recruiter-dashboard");
            } else if (data.role === "jobseeker") {
                navigate("/dashboard");
            } else {
                throw new Error(`Unknown role: ${data.role}`);
            }

        } catch (error) {
            console.error("Login error:", error);
            
            // ✅ Axios specific error handling
            // Django error responses are safely nested inside error.response.data
            const errorMessage = 
                error.response?.data?.detail || 
                error.response?.data?.message || 
                error.message || 
                "Invalid credentials or network error. Is Django running?";
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card border-0 shadow-lg rounded-4 p-4">
                        <div className="text-center mb-4">
                            <h2 className="fw-bold">Welcome</h2>
                            <p className="text-muted">Login to continue job search</p>
                        </div>

                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

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
                                    disabled={loading}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-lg w-100 mt-2"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>

                        <p className="text-center text-muted mt-4 mb-0">
                            Don't have an account?
                            <Link to="/register" className="text-primary ms-1">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;