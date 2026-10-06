import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RecruiterDashboard() {
  const [dashboardData, setDashboardData] = useState({
    stats: { totalJobs: 0, applications: 0, activeJobs: 0 },
    company: { name: "Loading..." },
    recentJobs: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to decode the JWT token to find the logged-in user's ID
  const getUserIdFromToken = (token) => {
    try {
      const payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.user_id; // SimpleJWT stores the user ID here
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("access"); // Assuming token is saved here after login
        if (!token) throw new Error("No authentication token found. Please log in.");

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const userId = getUserIdFromToken(token);

        // 1. Fetch Companies
        const companyRes = await fetch("http://127.0.0.1:8000/companies/", { headers });
        if (!companyRes.ok) throw new Error("Failed to fetch companies");
        const companies = await companyRes.json();
        
        // Find the company owned by the current user
        const myCompany = companies.find(c => c.owner === userId) || companies[0];
        
        if (!myCompany) {
            setDashboardData(prev => ({ ...prev, company: { name: "No Company Profile" } }));
            setIsLoading(false);
            return;
        }

        // 2. Fetch Jobs filtered by this company
        // The backend JobsViewSet has filterset_fields = ["company"]
        const jobsRes = await fetch(`http://127.0.0.1:8000/jobs/?company=${myCompany.id}`, { headers });
        let jobs = [];
        if (jobsRes.ok) {
            jobs = await jobsRes.json();
        }

        // 3. Fetch Applications (Will likely fail due to IsJobseeker permission)
        let applicationsCount = 0;
        try {
            const appsRes = await fetch("http://127.0.0.1:8000/applications/", { headers });
            if (appsRes.ok) {
                const applications = await appsRes.json();
                // Filter applications to only count those belonging to this recruiter's jobs
                const myJobIds = jobs.map(j => j.id);
                const myApplications = applications.filter(app => myJobIds.includes(app.job));
                applicationsCount = myApplications.length;
            } else {
                console.warn("Backend permissions restrict recruiters from viewing applications.");
            }
        } catch (err) {
            console.warn("Error fetching applications:", err);
        }

        // 4. Aggregate data for the UI
        setDashboardData({
          stats: {
            totalJobs: jobs.length,
            applications: applicationsCount,
            activeJobs: jobs.length, // All jobs are assumed active since there is no status field in the backend
          },
          company: { name: myCompany.name },
          // Grab the 5 most recently created jobs by reversing the array
          recentJobs: jobs.slice(-5).reverse().map(job => ({
            id: job.id,
            title: job.title,
            location: job.location,
            type: job.jobtype,
            status: "Active" 
          }))
        });

        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <h4 className="text-danger">Failed to load dashboard</h4>
        <p className="text-muted">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="fw-bold mb-1">Recruiter Dashboard</h1>
            <p className="text-muted mb-0">Manage your company, jobs and applications.</p>
          </div>
          <Link to="/create-job" className="btn btn-primary px-4">
            Post a Job
          </Link>
        </div>

        {/* Statistics */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <p className="text-muted mb-2">Total Jobs</p>
                <h2 className="fw-bold mb-0">{dashboardData.stats.totalJobs}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <p className="text-muted mb-2">Applications</p>
                <h2 className="fw-bold mb-0">{dashboardData.stats.applications}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <p className="text-muted mb-2">Active Jobs</p>
                <h2 className="fw-bold mb-0">{dashboardData.stats.activeJobs}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Company */}
        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="fw-bold mb-1">Your Company</h4>
                <p className="text-muted mb-0">{dashboardData.company.name}</p>
              </div>
              <button className="btn btn-outline-primary">Manage Company</button>
            </div>
          </div>
        </div>

        {/* Recent Jobs */}
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0">Recent Jobs</h4>
              <Link to="/my-jobs" className="text-decoration-none">
                View All
              </Link>
            </div>

            {dashboardData.recentJobs.length === 0 ? (
              <p className="text-muted">No recent jobs found.</p>
            ) : (
              dashboardData.recentJobs.map((job, index) => (
                <div
                  key={job.id}
                  className={`py-3 ${
                    index !== dashboardData.recentJobs.length - 1 ? "border-bottom" : ""
                  }`}
                >
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="fw-semibold mb-1">{job.title}</h5>
                      <p className="text-muted mb-0">
                        {job.location} · {job.type}
                      </p>
                    </div>
                    <span className="badge align-self-start bg-success-subtle text-success">
                      {job.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default RecruiterDashboard;