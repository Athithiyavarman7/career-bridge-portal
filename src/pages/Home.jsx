function Home() {
  return (
    <div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center min-vh-75">

            {/* Left Content */}
            <div className="col-lg-7">

              <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
                Find your next opportunity
              </span>

              <h1 className="display-3 fw-bold">
                Find a job that
                <span className="text-primary"> fits your future.</span>
              </h1>

              <p className="lead text-muted mt-4">
                Discover thousands of opportunities from trusted companies
                and take the next step in your career.
              </p>

              {/* Search Box */}
              <div className="search-box shadow-sm mt-4 p-2 bg-white rounded-4">

                <div className="row g-2">

                  <div className="col-md-5">
                    <input
                      type="text"
                      className="form-control border-0"
                      placeholder="Job title or keyword"
                    />
                  </div>

                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control border-0"
                      placeholder="Location"
                    />
                  </div>

                  <div className="col-md-3">
                    <button className="btn btn-primary w-100">
                      Search Jobs
                    </button>
                  </div>

                </div>

              </div>

            </div>

            {/* Right Side */}
            <div className="col-lg-5 mt-5 mt-lg-0">

              <div className="hero-card shadow-lg rounded-4 p-4 bg-white">

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <small className="text-muted">
                      Featured opportunity
                    </small>

                    <h4 className="fw-bold mb-0">
                      Software Engineer
                    </h4>
                  </div>

                  <span className="badge bg-success-subtle text-success">
                    Full Time
                  </span>
                </div>

                <p className="text-muted">
                  Build scalable applications and work with
                  talented engineering teams.
                </p>

                <hr />

                <div className="d-flex justify-content-between">
                  <span className="text-muted">
                    Technology
                  </span>

                  <strong>
                    Remote
                  </strong>
                </div>

                <div className="d-flex justify-content-between mt-3">
                  <span className="text-muted">
                    Experience
                  </span>

                  <strong>
                    1 - 3 Years
                  </strong>
                </div>

                <button className="btn btn-dark w-100 mt-4">
                  View Opportunity
                </button>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* Categories */}
      <section className="py-5 bg-light">

        <div className="container">

          <div className="text-center mb-5">
            <h2 className="fw-bold">
              Explore popular categories
            </h2>

            <p className="text-muted">
              Find opportunities across different industries
            </p>
          </div>

          <div className="row g-4">

            <div className="col-md-3">
              <div className="category-card bg-white p-4 rounded-4 shadow-sm">
                <h5 className="fw-bold">Software Development</h5>
                <p className="text-muted mb-0">
                  1,240+ jobs
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="category-card bg-white p-4 rounded-4 shadow-sm">
                <h5 className="fw-bold">Data Science</h5>
                <p className="text-muted mb-0">
                  680+ jobs
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="category-card bg-white p-4 rounded-4 shadow-sm">
                <h5 className="fw-bold">UI/UX Design</h5>
                <p className="text-muted mb-0">
                  420+ jobs
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="category-card bg-white p-4 rounded-4 shadow-sm">
                <h5 className="fw-bold">Marketing</h5>
                <p className="text-muted mb-0">
                  530+ jobs
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* Statistics */}
      <section className="py-5">

        <div className="container">

          <div className="row text-center">

            <div className="col-md-4">
              <h2 className="fw-bold text-primary">
                10K+
              </h2>

              <p className="text-muted">
                Active Jobs
              </p>
            </div>

            <div className="col-md-4">
              <h2 className="fw-bold text-primary">
                2K+
              </h2>

              <p className="text-muted">
                Companies
              </p>
            </div>

            <div className="col-md-4">
              <h2 className="fw-bold text-primary">
                50K+
              </h2>

              <p className="text-muted">
                Job Seekers
              </p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;