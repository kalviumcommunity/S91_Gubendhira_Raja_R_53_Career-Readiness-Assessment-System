# S91_Gubendhira_Raja_R_53_Career-Readiness-Assessment-System

# 🎯 Career Readiness Assessment System (CRAS)

### A Placement-Readiness Platform for Educational Institutions

CRAS is a **continuous, role-aware career readiness assessment platform** designed to help educational institutions identify students' employability skill gaps **well before placement season**.

Instead of relying only on last-minute mock interviews and generic aptitude tests, CRAS continuously evaluates students across multiple employability dimensions, compares their performance with **role-specific benchmarks**, and provides personalized improvement roadmaps.

---

## 📌 Problem Statement

Most colleges evaluate placement readiness through mock interviews and generic aptitude tests only a few weeks before placement season.

This makes it difficult for faculty and placement officers to identify:

* Which students are actually job-ready
* Which specific skills each student needs to improve
* Whether an entire department or batch has systematic skill gaps
* Whether students' improvement efforts are actually working
* What skills should be prioritized before placement drives

Students also lack a continuous feedback loop that clearly tells them:

> **Where am I now? What skills am I missing? What should I learn next?**

CRAS addresses this problem by providing continuous assessment, skill-gap analysis, personalized learning roadmaps, and institution-level analytics.

---

# 💡 Proposed Solution

CRAS provides a complete career-readiness assessment workflow:

1. **Assess** students across 11 employability dimensions.
2. **Analyze** performance using skill-specific scoring.
3. **Compare** scores against benchmarks for target roles.
4. **Identify** individual and institutional skill gaps.
5. **Generate** personalized improvement roadmaps using AI.
6. **Track** student progress through repeated assessments.
7. **Help placement officers** identify students who need intervention.
8. **Provide analytics** at student, department, batch, and institution levels.

The platform supports roles such as:

* SDE-1
* Business Analyst
* SOC Analyst
* Data Analyst
* Other configurable job roles

---

# 🚀 Key Features

## 👨‍🎓 Student Features

* Student profile and onboarding
* Target job-role selection
* Resume, project, and certification management
* Skill-based assessments
* MCQ assessments
* Coding assessments
* Aptitude assessments
* Situational judgment assessments
* Communication assessments
* Skill-wise scores
* Beginner / Intermediate / Advanced / Job Ready bands
* Role-specific skill-gap analysis
* Career Readiness Score
* AI-generated explanations
* Personalized learning roadmap
* Practice tasks and resources
* Assessment reattempts
* Progress tracking
* Score-over-time trends

---

## 👨‍🏫 Faculty & Placement Officer Features

* Institution-wide readiness dashboard
* Department and batch analytics
* Skill-wise heatmaps
* Student filtering and sorting
* Identify students at risk
* Track specific skill gaps
* Assign interventions
* Assign mentors and learning resources
* Monitor student improvement
* Semester and batch trend analysis
* CSV/PDF report generation

---

## 🛠️ Admin Features

* Manage users
* Manage institutions
* Manage departments and batches
* Manage question banks
* Create and manage skill areas
* Configure job roles
* Define role-specific skill benchmarks
* Manage assessment difficulty
* Configure system access roles

---

# 🤖 AI-Powered Features

CRAS uses **Google Gemini** as its AI layer.

AI is used for:

### Communication & Situational Assessment

Open-ended responses can be evaluated using a defined rubric to generate:

* Structured scores
* Feedback
* Improvement suggestions

### Resume Parsing

Gemini can extract:

* Skills
* Projects
* Certifications
* Relevant experience

from uploaded resume content.

### Skill-Gap Explanation

Instead of showing only:

> Communication: 54/100

the system can explain:

> Your communication score is below the benchmark for your selected role. Focus first on structured speaking, technical explanation, and interview communication.

### Personalized Roadmap

The system converts identified skill gaps into:

* Topics
* Learning resources
* Practice tasks
* Priorities
* Deadlines

### Role Recommendation

The system can identify roles where a student's current skill profile is closest to the required benchmark.

### Readiness Estimation

Initially, readiness is calculated using a **transparent weighted-score approach**.

A true placement prediction model can be introduced later when sufficient historical placement outcome data becomes available.

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────────────┐
                    │          CLIENT              │
                    │ React + TypeScript + Vite    │
                    │ Tailwind CSS                 │
                    │                              │
                    │ Student App                  │
                    │ Faculty/TPO Dashboard        │
                    │ Admin Console                │
                    └──────────────┬───────────────┘
                                   │
                              HTTPS / REST
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │        FASTAPI BACKEND       │
                    │                              │
                    │ Authentication               │
                    │ Profiles                     │
                    │ Assessments                  │
                    │ Skill Scoring                │
                    │ Gap Analysis                 │
                    │ Roadmaps                     │
                    │ AI Services                  │
                    │ Dashboards                   │
                    │ Reports                      │
                    └──────────────┬───────────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
              ▼                    ▼                    ▼
      ┌───────────────┐    ┌───────────────┐    ┌────────────────┐
      │   Supabase    │    │  Gemini API   │    │ Background Jobs│
      │               │    │               │    │                │
      │ PostgreSQL    │    │ AI Feedback   │    │ Score Compute  │
      │ Authentication│    │ Roadmaps      │    │ Roadmap Gen    │
      │ Storage       │    │ NLP Scoring   │    │ Predictions    │
      │ Row-Level     │    │ Recommendations│   │                │
      │ Security      │    │               │    │                │
      └───────────────┘    └───────────────┘    └────────────────┘
```

The frontend is designed for deployment on **Vercel**, while the FastAPI backend can be deployed on **Render**.

---

# 🧩 Core Modules

| Module                   | Description                                                |
| ------------------------ | ---------------------------------------------------------- |
| Profile & Onboarding     | Student information, skills, projects and certifications   |
| Assessment Engine        | Assessment delivery, timers and grading                    |
| Skill Scoring            | Converts assessment results into standardized skill scores |
| Gap Analysis             | Compares student skills with role benchmarks               |
| AI Recommendation Engine | Generates explanations and recommendations                 |
| Roadmap                  | Personalized learning and practice plan                    |
| Institution Dashboard    | Batch, department and institution analytics                |
| Progress Tracking        | Tracks improvement across assessments                      |
| Reports & Analytics      | Generates reports for placement teams                      |

---

# 📊 Employability Assessment

The platform evaluates students across multiple employability dimensions using different question types.

### Assessment Types

* MCQ
* Coding
* Aptitude
* Situational Judgment
* Communication

Scores are normalized to a **0–100 scale** and mapped to readiness bands:

| Score/Level          | Readiness Band |
| -------------------- | -------------- |
| Low                  | Beginner       |
| Developing           | Intermediate   |
| Strong               | Advanced       |
| Target Benchmark Met | Job Ready      |

The exact scoring thresholds can be configured according to the institution's assessment strategy.

---

# 🎯 Role-Based Skill Gap Analysis

A major feature of CRAS is comparing student performance against the requirements of a target role.

```text
Student Performance
        │
        ▼
Skill Scores
        │
        ▼
Target Role Selected
        │
        ▼
Role Skill Benchmarks
        │
        ▼
Gap Analysis
        │
        ├── Skills Meeting Benchmark
        │
        ├── Skills Near Benchmark
        │
        └── Critical Skill Gaps
                    │
                    ▼
             AI Roadmap
```

For example:

```text
Target Role: SDE-1

Coding              82/100  ✅
Problem Solving     71/100  ⚠️
Communication       54/100  ❌
DBMS                76/100  ⚠️
Computer Networks   68/100  ❌
```

The system prioritizes the largest and most important gaps instead of giving students generic advice.

---

# 🗄️ Database Design

CRAS uses **PostgreSQL through Supabase**.

Major entities include:

```text
Institutions
    │
    ├── Departments
    │       │
    │       └── Batches
    │
    └── Users
            │
            └── Student Profiles
                    │
                    ├── Skills
                    ├── Projects
                    ├── Certifications
                    ├── Assessments
                    ├── Attempts
                    ├── Skill Scores
                    ├── Gap Analysis
                    ├── Roadmap Items
                    └── Interventions
```

The database also contains:

* Skill areas
* Job roles
* Role skill benchmarks
* Question bank
* Assessment attempts
* Answer records
* Skill score history
* Faculty interventions

Row-Level Security is used to support institution-level and student-level data isolation.

---

# 🔄 User Flow

## Student

```text
Sign Up
   ↓
Complete Profile
   ↓
Select Target Role
   ↓
Take Baseline Assessments
   ↓
View Skill Scores
   ↓
View Role-Based Skill Gaps
   ↓
Receive AI Roadmap
   ↓
Complete Learning Tasks
   ↓
Retake Assessments
   ↓
Track Improvement
   ↓
Become Job Ready
```

## Placement Officer

```text
Login
  ↓
Institution Dashboard
  ↓
View Batch / Department
  ↓
Analyze Skill Heatmap
  ↓
Identify At-Risk Students
  ↓
Filter by Target Role
  ↓
Assign Intervention / Mentor
  ↓
Track Improvement
  ↓
Generate Placement Report
```

---

# 🛠️ Technology Stack

| Layer            | Technology                            |
| ---------------- | ------------------------------------- |
| Frontend         | React + TypeScript + Vite             |
| UI               | Tailwind CSS                          |
| Backend          | FastAPI                               |
| Database         | Supabase / PostgreSQL                 |
| Authentication   | Supabase Auth                         |
| Storage          | Supabase Storage                      |
| AI               | Google Gemini                         |
| AI SDK           | `google-genai`                        |
| Coding Execution | Judge0 / Sandboxed Executor           |
| Background Jobs  | FastAPI BackgroundTasks / Celery / RQ |
| Charts           | Recharts                              |
| Frontend Hosting | Vercel                                |
| Backend Hosting  | Render                                |
| CI/CD            | GitHub Actions                        |

---

# ⚙️ Getting Started

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* Python 3.10+
* Git
* Supabase account
* Gemini API key

---

## 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/<your-repository>.git

cd <your-repository>
```

---

## 2. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

The frontend will start using the Vite development server.

---

## 3. Backend Setup

Open another terminal:

```bash
cd backend

python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start FastAPI:

```bash
uvicorn main:app --reload
```

---

# 🔐 Environment Variables

Create a `.env` file in the backend:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

GEMINI_API_KEY=your_gemini_api_key

DATABASE_URL=your_database_url
```

Create the required frontend environment variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:8000
```

> ⚠️ Never commit `.env` files or API keys to GitHub.

Add them to `.gitignore`:

```gitignore
.env
.env.*
venv/
__pycache__/
node_modules/
```

---

# 🔒 Security

CRAS is designed with security and privacy in mind.

Key security considerations include:

* Role-Based Access Control
* Supabase Row-Level Security
* HTTPS/TLS
* Encrypted data storage
* Institution-level data isolation
* Protected question banks
* Timestamped assessment records
* Auditability of score changes
* Secure authentication

The system is designed to support multi-tenant institutions while preventing unauthorized access to student data.

---

# 📈 Expected Impact

CRAS aims to shift career preparation from **last-minute placement training to continuous readiness development**.

### For Students

* Identify weaknesses early
* Understand role requirements
* Get personalized learning plans
* Track improvement
* Become placement-ready earlier

### For Faculty

* Identify struggling students
* Assign targeted interventions
* Monitor mentee progress
* Understand department-level weaknesses

### For Placement Officers

* Get institution-wide readiness visibility
* Identify students who need intervention
* Compare readiness across batches and departments
* Generate evidence-based placement reports

### For Institutions

* Identify curriculum gaps
* Plan targeted training programs
* Track employability trends
* Reduce last-minute placement preparation

The intended impact is to surface skill gaps **months before placement season** rather than discovering them during final mock interviews.

---

# 🔮 Future Enhancements

Planned future improvements include:

* Company-specific skill benchmarks
* Anonymous peer benchmarking
* AI mock interviews
* Voice/video interview analysis
* LMS integration
* Gamification
* Alumni outcome tracking
* Real placement prediction models
* Multi-institution benchmarking

A real machine-learning placement prediction model should only be introduced after sufficient historical assessment and placement-outcome data has been collected.

---

# 📁 Suggested Project Structure

```text
CRAS/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── dashboards/
│   │   ├── assessments/
│   │   ├── services/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── ai/
│   │   └── main.py
│   ├── requirements.txt
│   └── .env.example
│
├── database/
│   ├── migrations/
│   └── seed/
│
├── docs/
│   ├── architecture/
│   └── api/
│
├── .gitignore
└── README.md
```

---

# 📜 License

This project is currently developed as an educational/capstone project.

Add your preferred license here, for example:

```text
MIT License
```

---

# 👥 Contributors

**CRAS Development Team**

Built to help educational institutions move from **reactive placement preparation** to **continuous, data-driven career readiness**.

---

## ⭐ Vision

> **Identify the gap early. Build the skills continuously. Enter placement season job-ready.**
#