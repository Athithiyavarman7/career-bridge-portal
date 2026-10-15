import { useState } from "react";
import { useParams } from "react-router-dom";

// Decodes JWT access token payload to extract the user's ID
const getUserIdFromToken = (token) => {
    try {
        const payloadBase64 = token.split(".")[1];
        const decodedJson = atob(payloadBase64);
        const decoded = JSON.parse(decodedJson);
        return decoded.user_id || decoded.sub || decoded.id || null;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};

function ApplyJob() {
    // Supports routes defined as either :jobId or :id
    const params = useParams();
    const jobId = params.jobId || params.id;

    const [formData, setFormData] = useState({
        cover_letter: "",
        resume: null
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        if (e.target.name === "resume") {
            setFormData({
                ...formData,
                resume: e.target.files?.[0] || null
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!jobId) {
            alert("Error: No job ID found in the URL. Check your router configuration.");
            return;
        }

        const token = localStorage.getItem("access");
        if (!token) {
            alert("You are not logged in. Please log in first.");
            return;
        }

        // Extract applicant ID directly from the stored JWT access token
        const userId = getUserIdFromToken(token);
        if (!userId) {
            alert("Could not determine user ID from token. Please log in again.");
            return;
        }

        if (!formData.resume) {
            alert("Please select a resume file.");
            return;
        }

        const data = new FormData();
        data.append("job", jobId);
        data.append("applicant", userId);
        data.append("cover_letter", formData.cover_letter);
        data.append("resume", formData.resume);

        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/applications/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: data
            });

            const result = await response.json();

            if (response.ok) {
                alert("Application submitted successfully!");
                console.log("Success:", result);
            } else {
                alert(`Submission failed (${response.status}): ${JSON.stringify(result)}`);
                console.error("Backend error:", result);
            }
        } catch (error) {
            alert(`Network error: ${error.message}`);
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-light min-vh-100 py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-4 p-md-5">
                                <h2 className="fw-bold mb-2">Apply for this Job</h2>
                                <p className="text-muted mb-4">
                                    Submit your resume and application details.
                                </p>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">Resume</label>
                                        <input
                                            type="file"
                                            name="resume"
                                            className="form-control form-control-lg"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleChange}
                                            required
                                        />
                                        <small className="text-muted">
                                            Upload your latest resume (.pdf, .doc, .docx).
                                        </small>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">Cover Letter</label>
                                        <textarea
                                            name="cover_letter"
                                            className="form-control"
                                            rows="7"
                                            placeholder="Tell the recruiter why you are suitable for this job..."
                                            value={formData.cover_letter}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn btn-primary btn-lg w-100 rounded-3"
                                    >
                                        {loading ? "Submitting..." : "Submit Application"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApplyJob;