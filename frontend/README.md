#  Frontend system

The user interface layer for the AI-Powered Finance Tracker (FiscalGuard). Built using React and compiled via Vite, this dashboard presents users with clean financial metrics, interactive charts, real-time transaction logging, and explicit visual alerts whenever the backend ML model catches an anomalous expense.

---

## ✨ Key Design & Tech Stack Features

- **Glassmorphism Visual Styling** — A sleek modern UI utilizing translucent backgrounds, rich blurs, and crisp accent borders built natively through utility classes.
- **Tailwind CSS Engine** — Fully responsive components that scale cleanly for tablet or mobile viewports.
- **Axios Communications** — Asynchronous REST calls to your local or cloud-hosted FastAPI backend.

---

## ⚙️ Core Environment Configuration

The frontend maps its backend destination using an environment boundary file (`.env`), dynamically shifting between local testing and live production deployment.

```
# /frontend/.env
VITE_API_URL=http://localhost:8000
```

> ⚠️ Ensure `.env` is listed in `.gitignore` so environment-specific ports don't overwrite server configs.

---

## 🛠️ Local Setup & Scripts

Navigate to the frontend folder and run the standard Node commands:

**1. Install dependencies**
```bash
npm install
```

**2. Launch dev server**
```bash
npm run dev
```

Once booted, the app will be available at `http://localhost:5173/` where you can log transactions, monitor spending, and track real-time anomaly scores.