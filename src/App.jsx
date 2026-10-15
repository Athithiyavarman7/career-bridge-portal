import Navbar from "./components/navibar";
import CreateCompany from "./pages/CreateCompany";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateJob from "./pages/createjob";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";

import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Jobs */}
        <Route path="/jobs" element={<Jobs />} />

        {/* Job Details */}
        <Route path="/jobs/:id" element={<JobDetails />} />

        {/* Apply Job */}
        <Route path="/jobs/:id/apply" element={<ApplyJob />} />

        {/* User Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Recruiter Dashboard */}
        <Route
          path="/recruiter-dashboard"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/create-company" element={<CreateCompany />} />

        {/* Create Job */}
        <Route
          path="/create-job"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <CreateJob />
            </ProtectedRoute>
          }
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;