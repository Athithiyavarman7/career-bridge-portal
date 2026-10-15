# Job Portal - Frontend (React + Vite)

This directory contains the user interface for the Job Portal web application.

## Project Structure

```
frontend/
├── index.html                 # HTML template
├── vite.config.js             # Vite configuration with API proxy
├── package.json               # Dependencies and scripts
├── public/                    # Static assets & icons
└── src/
    ├── main.jsx               # React DOM entrypoint
    ├── App.jsx                # Router & page route definitions
    ├── assets/                # Images and SVG logos
    ├── components/            # Reusable components (Navbar, ProtectedRoute)
    └── pages/                 # Application views:
        ├── Home.jsx           # Landing page
        ├── Login.jsx          # Login screen
        ├── Register.jsx       # User registration
        ├── Jobs.jsx           # Job search & browse
        ├── JobDetails.jsx     # Job details view
        ├── ApplyJob.jsx       # Job application submission
        ├── Dashboard.jsx      # Jobseeker dashboard
        ├── RecruiterDashboard.jsx # Recruiter dashboard
        ├── CreateCompany.jsx  # Company creation
        └── createjob.jsx      # Job posting form
```

## Setup & Running

### 1. Install Dependencies

From the `frontend` folder:
```bash
cd frontend
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

The frontend application will run at: `http://localhost:5173/`

### 3. Build for Production

```bash
npm run build
```
