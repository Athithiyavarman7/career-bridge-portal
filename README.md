# Job Portal Application

A full-stack job portal web application featuring separate backend and frontend architectures.

## Architecture Overview

```
jobportal/
│
├── backend/                   # Django REST Framework backend
│   ├── manage.py              # Backend entrypoint
│   ├── db.sqlite3             # SQLite database
│   ├── resumes/               # Uploaded resumes
│   ├── requirements.txt       # Python dependencies
│   ├── jobportal/             # Application code, models, views, serializers, urls
│   └── README.md              # Backend documentation
│
├── frontend/                  # React + Vite frontend
│   ├── package.json           # Node dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── src/                   # React components and pages
│   └── README.md              # Frontend documentation
│
├── .gitignore                 # Root gitignore for both Python and Node
└── README.md                  # Root documentation
```

---

## Quick Start Guide

To run the full stack locally, open two terminal windows (one for the backend, one for the frontend):

### Terminal 1: Run Backend (Django)

```bash
# 1. Navigate to backend directory
cd backend

# 2. Activate virtual environment (if not already active)
# On Windows:
..\.venv\Scripts\Activate.ps1
# On Linux/macOS:
source ../.venv/bin/activate

# 3. Install dependencies (first time only)
pip install -r requirements.txt

# 4. Run the server
python manage.py runserver
```

Backend will be running at `http://127.0.0.1:8000/`.

---

### Terminal 2: Run Frontend (React / Vite)

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies (first time only)
npm install

# 3. Start development server
npm run dev
```

Frontend will be running at `http://localhost:5173/`.
