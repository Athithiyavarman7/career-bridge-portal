import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function JobDetails() {

  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {

    fetch(`http://127.0.0.1:8000/jobs/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setJob(data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [id]);


  if (!job) {
    return (
      <div className="container text-center py-5">
        <h3>Loading job...</h3>
      </div>
    );
  }


  return (
    <div className="bg-light min-vh-100 py-5">

      <div className="container">

        <div className="card border-0 shadow-sm rounded-4">

          <div className="card-body p-5">

            <span className="badge bg-primary-subtle text-primary mb-3">
              {job.jobtype}
            </span>

            <h1 className="fw-bold">
              {job.title}
            </h1>

            <h5 className="text-muted">
              {job.company_name}
            </h5>

            <hr />

            <p>
              <strong>Location:</strong> {job.location}
            </p>

            <p>
              <strong>Salary:</strong> ₹ {job.salary}
            </p>

            <p>
              <strong>Job Type:</strong> {job.jobtype}
            </p>

            <h4 className="fw-bold mt-4">
              About this job
            </h4>

            <p className="text-muted">
              We are looking for talented candidates to join
              our team and work on real-world projects.
            </p>

            <Link
              to={`/jobs/${job.id}/apply`}
              className="btn btn-primary btn-lg w-100 mt-4"
            >
              Apply Now
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default JobDetails;