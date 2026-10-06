import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // Retrieve user data from localStorage
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        
        {/* Welcome Section */}
        <div className="mb-5">
          <h1 className="fw-bold">
            Welcome, {username || "User"} 👋
          </h1>
          <p className="text-muted">
            Manage your job search and applications.
          </p>
        </div>

        <div className="row g-4">

          {/* Profile */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <h4 className="fw-bold">My Profile</h4>
                <p className="text-muted">
                  Manage your personal information.
                </p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => navigate("/profile")}
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>

          {/* Applications */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <h4 className="fw-bold">My Applications</h4>
                <p className="text-muted">
                  Track the jobs you have applied for.
                </p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => navigate("/applications")}
                >
                  View Applications
                </button>
              </div>
            </div>
          </div>

          {/* Jobs */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <h4 className="fw-bold">Find Jobs</h4>
                <p className="text-muted">
                  Explore new job opportunities.
                </p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => navigate("/jobs")}
                >
                  Browse Jobs
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Recruiter section */}
        {role === "recruiter" && (
          <div className="card border-0 shadow-sm rounded-4 mt-5">
            <div className="card-body p-4">
              <h3 className="fw-bold">Recruiter Tools</h3>
              <p className="text-muted">
                Manage your company and job postings.
              </p>
              <button 
                className="btn btn-dark" 
                onClick={() => navigate("/recruiter/dashboard")}
              >
                Recruiter Dashboard
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;