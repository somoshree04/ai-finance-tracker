# 🛡️ FiscalGuard — AI-Powered Finance Tracker

An intelligent, full-stack financial tracking application that processes, classifies, and audits user transactions in real time. FiscalGuard pairs an unsupervised anomaly detection model with an async relational database and a modern dashboard to instantly flag erratic spending behavior.

---

## 🏛️ Architecture

```
                     ┌────────────────────────────────────────┐
                     │          React Dashboard UI            │
                     │  (Vite, Tailwind CSS, Glassmorphism)   │
                     └───────────────────┬────────────────────┘
                                         │
                                         ▼ (Async JSON REST API)
                     ┌────────────────────────────────────────┐
                     │           FastAPI Application          │
                     │     (Uvicorn ASGI, Pydantic Schema)    │
                     └───────────────────┬────────────────────┘
                                         │
               ┌─────────────────────────┴─────────────────────────┐
               ▼ (Real-time Inference)                             ▼ (ORM Mapping)
 ┌────────────────────────────────────────┐          ┌────────────────────────────────────────┐
 │           ML Inference Engine          │          │             SQLAlchemy Core            │
 │     (Isolation Forest Model (.pkl))    │          │     (Session Pooling, SQLite Engine)   │
 └────────────────────────────────────────┘          └───────────────────┬────────────────────┘
                                                                         │
                                                                         ▼
                                                     ┌────────────────────────────────────────┐
                                                     │               finance.db               │
                                                     │            (SQLite Storage)            │
                                                     └────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technologies | Function |
|---|---|---|
| **Frontend** | React.js, Vite, Tailwind CSS, Axios | Real-time financial tracking dashboard with Glassmorphism styling |
| **Backend** | FastAPI, Uvicorn, Pydantic, SQLAlchemy | Routes requests, validates payloads, and manages database sessions |
| **Database** | SQLite3, SQLAlchemy ORM | Serverless relational storage for user and expense records |
| **ML Engine** | Scikit-Learn, Pandas, NumPy, Joblib | Transforms dataset into transactional models and runs Isolation Forest inference |

---

## 📁 Repository Structure

```
ai-finance-tracker/
├── README.md                 # You are here
├── docker-compose.yml        # Multi-container build config
├── data/
│   └── data.csv              # Indian Personal Finance dataset (Kaggle)
│
├── ml_logic/                 # ML package
│   ├── __init__.py
│   ├── data_conv.py          # Wide-to-long data pipeline & label encoding
│   └── model.py              # Isolation Forest inference
│
├── backend/                  # API server
│   ├── main.py               # Router, CORS config, and ML gateway
│   ├── models.py             # Database table definitions
│   ├── schemas.py            # Pydantic validation schemas
│   ├── database.py           # DB connection factory
│   └── requirements.txt      # Python dependencies
│
└── frontend/                 # React client
    ├── src/                  # Components, hooks, and views
    ├── .env                  # API base URL config
    ├── package.json          # Node dependencies
    └── vite.config.js        # Vite build config
```

---

## 🔄 Transaction Pipeline

1. **Ingest** — The user submits a transaction via the React dashboard (e.g., $5,000 on Groceries).
2. **Validate** — Axios sends the payload to `/users/{user_id}/expenses/`. FastAPI verifies it against the `ExpenseCreate` Pydantic schema.
3. **ML Inference** — `main.py` maps the category string to its numeric index via `CATEGORY_MAP` (e.g., `Groceries → 3`) and forwards the amount and index to `ml_logic.model.predict_anomaly()`. The Isolation Forest evaluates the input against its trained baseline — outliers return `-1`, setting `is_anomaly=True`.
4. **Write** — The full record, including the anomaly flag, is committed to `finance.db` via SQLAlchemy.
5. **Update** — The response is returned to the dashboard, which immediately surfaces a visual alert if an anomaly was detected.

---

## 🚀 Running Locally

Spin up two terminal sessions from the project root:

**Terminal 1 — Backend**
```bash
uvicorn backend.main:app --reload --port 8000
```
Swagger UI available at [http://localhost:8000/docs](http://localhost:8000/docs)

**Terminal 2 — Frontend**
```bash
cd frontend
npm install
npm run dev
```
App available at [http://localhost:5173](http://localhost:5173)