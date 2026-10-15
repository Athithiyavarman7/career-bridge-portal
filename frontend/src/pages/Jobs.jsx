import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fixed the URL here (changed .8000 to :8000)
    fetch("http://127.0.0.1:8000/jobs/")
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
      })
      .catch((error) => {
        console.log("Fetch error:", error);
      });
  }, []);

  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        {/* Page Heading */}
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5">
            Find Your Next <span className="text-primary">Opportunity</span>
          </h1>
          <p className="text-muted">
            Explore jobs and take the next step in your career.
          </p>
        </div>

        {/* Search Section */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <div className="card border-0 shadow-sm rounded-4 p-3">
              <div className="row g-2">
                {/* Keyword */}
                <div className="col-md-5">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-0">
                      Search
                    </span>
                    <input
                      type="text"
                      className="form-control border-0"
                      placeholder="Job title, skills or keyword"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="col-md-4">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-0">
                      Location
                    </span>
                    <input
                      type="text"
                      className="form-control border-0"
                      placeholder="City or location"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className="col-md-3">
                  <button className="btn btn-primary w-100 h-100 rounded-3">
                    Search Jobs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs */}
        <div className="row g-4">
          {jobs.map((job) => (
            <div className="col-md-6 col-lg-4" key={job.id}>
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4">
                  <span className="badge bg-primary-subtle text-primary mb-3">
                    {job.jobtype}
                  </span>
                  <h4 className="fw-bold">{job.title}</h4>
                  <p className="text-muted">{job.company_name}</p>

                  <p className="text-muted">Location: {job.location}</p>
                  <p className="text-muted">Salary: {job.salary}</p>

                 
  <Link
    to={`/jobs/${job.id}`}
    className="btn btn-primary"
  >
    View Details
  </Link>
                </div>
              </div>
            </div>
          ))}
          
          {/* Fallback if no jobs load */}
          {jobs.length === 0 && (
            <div className="col-12 text-center text-muted mt-4">
              No jobs found or loading...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Jobs;