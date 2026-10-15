# Job Portal - Backend (Django & Django REST Framework)

This directory contains the complete backend REST API for the Job Portal project.

## Project Structure

```
backend/
├── manage.py                  # Django CLI entrypoint
├── db.sqlite3                 # SQLite database
├── requirements.txt           # Python package dependencies
├── resumes/                   # Uploaded candidate resume files
└── jobportal/                 # Django core package & application
    ├── settings.py            # Django & DRF settings (JWT, CORS, etc.)
    ├── urls.py                # Main URL routing (APIs, auth, router)
    ├── models.py              # Database models (User, Company, Jobs, Application, Profile)
    ├── views.py               # ViewSets & Auth API endpoints
    ├── serializers.py         # DRF Serializers
    ├── permissions.py         # Custom permission classes (IsRecruiter, IsJobseeker, etc.)
    ├── admin.py               # Django Admin registration
    ├── apps.py                # App configuration
    ├── wsgi.py / asgi.py      # WSGI / ASGI configurations
    └── migrations/            # Database schema migration files
```

## Setup & Running

### 1. Activate or Create Virtual Environment

From the project root:
```bash
# Windows
.\.venv\Scripts\Activate.ps1
# or
source .venv/bin/activate
```

If creating a new virtual environment:
```bash
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### 2. Install Dependencies

Navigate into `backend`:
```bash
cd backend
pip install -r requirements.txt
```

### 3. Run Migrations

```bash
python manage.py migrate
```

### 4. Start the Django Development Server

```bash
python manage.py runserver
```

The API will be available at: `http://127.0.0.1:8000/`
Django Admin: `http://127.0.0.1:8000/admin/`

## Key API Endpoints

- `POST /register/` - Register a new user (`jobseeker` or `recruiter`)
- `POST /login/` - Login and obtain JWT tokens
- `POST /refresh/` - Refresh JWT access token
- `GET /profile/` - View authenticated user profile
- `GET, POST /companies/` - List / create companies
- `GET, POST /jobs/` - List / create job listings
- `GET, POST /applications/` - List / apply for jobs
