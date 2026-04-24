📊 AI-Powered Finance Tracker
A Full-Stack Anomaly Detection System for Personal Finance

🚀 Project Overview
The AI Finance Tracker is a professional-grade web application designed to help users track expenses while leveraging Machine Learning to identify unusual spending patterns. Unlike traditional trackers, this system uses an Isolation Forest model to flag "anomalies"—transactions that deviate significantly from the user's historical data or typical spending behavior (e.g., a ₹5,000 dinner when the average is ₹500).

🛠️ Technical Architecture
The Stack
Frontend: React.js (Vite), Tailwind CSS, Lucide Icons, Axios.

Backend: FastAPI (Python), Uvicorn, SQLAlchemy.

Database: SQLite (Relational storage for users and expenses).

Machine Learning: Scikit-Learn (Isolation Forest), Pandas (Data preprocessing).

Security: JWT (JSON Web Tokens) for stateless authentication, Passlib (Bcrypt) for password hashing.

The Workflow
Data Ingestion: The user enters an expense (Amount, Category, Description).

ML Analysis: The backend sends the transaction features to a pre-trained Isolation Forest model.

Anomaly Tagging: The model returns a prediction. If it's an outlier, it's flagged as is_anomaly = True.

Secure Storage: The transaction is saved to the SQLite database linked to the specific User ID.

UI Feedback: The React frontend fetches the data and uses Conditional Rendering to highlight suspicious transactions in red.

🗺️ Development Roadmap (The Sprints)
Sprint 1: Core API & Database (The Foundation)
Initialize FastAPI and SQLite.
Implement CRUD operations for expenses.
Deliverable: Functional API documentation via Swagger UI (/docs).

Sprint 2: Machine Learning Integration (The Brain)
Preprocess Kaggle financial datasets (Currency conversion: USD ⮕ INR).
Train the Isolation Forest model on spending patterns.
Integrate the model into the POST /expenses route to provide real-time flagging.
Deliverable: A "Smart" backend that predicts anomalies.

Sprint 3: Security & User Management (The Vault)
Implement User Registration and Login.
Set up JWT-based authentication.Protect routes so users can only access their own financial data.Deliverable: A secure, multi-user system.

Sprint 4: Frontend Development (The Face)

Build a responsive Dashboard using React and Tailwind.
Implement data visualization (Expense lists and anomaly alerts).
Connect the UI to the API using Axios interceptors (for JWT handling).
Deliverable: A polished, "Internship-Ready" Full-Stack application.

📊 Database Schema Table Columns Usersid, username, email, hashed_passwordExpensesid, user_id, amount, category, description, timestamp, is_anomaly


💡 Key Portfolio HighlightsUnsupervised Learning: Using Isolation Forest for real-world outlier detection.Security Best Practices: Implementing industry-standard JWT and password hashing.Scalable Code: Organized directory structure separating ML logic, API routes, and Database models.

Dependencies installed:

backend:pip install fastapi uvicorn sqlalchemy passlib[bcrypt] pyjwt scikit-learn pandas
