import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("access");
  const role = localStorage.getItem("role");

  const handleLogout = () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm">

      <div className="container">

        {/* Logo */}

        <Link
          className="navbar-brand fw-bold fs-4"
          to="/"
        >
          Job<span className="text-primary">Portal</span>
        </Link>


        {/* Navigation */}

        <div className="navbar-nav ms-auto d-flex flex-row align-items-center gap-3">

          {/* Home */}

          <Link
            className="nav-link text-white"
            to="/"
          >
            Home
          </Link>


          {/* Jobs */}

          <Link
            className="nav-link text-white"
            to="/jobs"
          >
            Jobs
          </Link>


          {/* If NOT logged in */}

          {!token && (
            <>
              <Link
                className="nav-link text-white"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="btn btn-primary px-4 rounded-pill"
                to="/register"
              >
                Register
              </Link>
            </>
          )}


          {/* If logged in */}

          {token && (
            <>

              {/* Recruiter Dashboard */}

              {role === "recruiter" && (
                <Link
                  className="nav-link text-white"
                  to="/recruiter-dashboard"
                >
                  Dashboard
                </Link>
              )}


              {/* Job Seeker Dashboard */}

              {role === "jobseeker" && (
                <Link
                  className="nav-link text-white"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              )}


              {/* Logout */}

              <button
                className="btn btn-danger px-4 rounded-pill"
                onClick={handleLogout}
              >
                Logout
              </button>

            </>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;