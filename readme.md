# Sales Management System

**Author:** mArtavia.dev | Mauricio Artavia Monge  
**Year:** 2026  
**License:** UNLICENSED — All rights reserved

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technologies](#technologies)
3. [Architecture](#architecture)
4. [Installation](#installation)
5. [Backend](#backend)
6. [Frontend](#frontend)
7. [Usage](#usage)
8. [Future Improvements](#future-improvements)
9. [License & Copyright](#license--copyright)

---

## Project Overview

This project is a **Sales Management System** designed for small businesses such as restaurants, shops, or PYMES.  
It allows users to:

- Register sales quickly.
- Filter daily sales by date.
- View sales summary by payment method.
- Visualize data with interactive charts.
- Maintain a sales history.

The project is divided into **backend (API)** and **frontend (React SPA)** for modularity.

---

## Technologies

**Backend:**

- Node.js >= 22
- Express.js
- CORS
- Nodemon (dev)

**Frontend:**

- React 19
- Recharts
- Axios
- Vite
- ESLint

---

## Architecture

```bash

sales-system/
│
├─ backend/
│  ├─ src/
│  │  ├─ index.js          # Entry point (Express server)
│  │  ├─ routes/
│  │  │   └─ sales.routes.js
│  │  └─ controllers/
│  │      └─ sales.controller.js
│  ├─ package.json
│  └─ .gitignore
│
├─ frontend/
│  ├─ src/
│  │  ├─ main.jsx          # React entry point
│  │  ├─ App.jsx
│  │  ├─ pages/
│  │  │   └─ SalesPage.jsx
│  │  └─ services/
│  │      └─ api.js       # Axios API client
│  ├─ package.json
│  └─ .gitignore
│
└─ README.md

````

---

## Installation

### Backend

1. Navigate to backend folder:

```bash
cd backend
````

2. Install dependencies:

```bash
npm install
```

3. Start the server (development mode):

```bash
npm run dev
```

Server will run at `http://127.0.0.1:3000`.

---

### Frontend

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

Frontend will run at `http://127.0.0.1:5173` *(Vite default)*.

---

## Backend

**Features:**

- `POST /sales` → Register a new sale
- `GET /sales` → Retrieve all sales

**Implementation Notes:**

- Uses in-memory storage (data is lost on server restart)
- Logging for incoming requests and created sales
- Future plan: database integration, validation, authentication

---

## Frontend

**Features:**

- Register sales with amount and payment method
- Filter sales by date
- View totals (cash, card, SINPE)
- Interactive pie chart for payment methods
- Scrollable sales history

**Components:**

- `SalesPage.jsx` → Main interface
- `api.js` → Axios API client
- `App.jsx` → Root component
- `main.jsx` → React DOM render

---

## Usage

1. Run backend (`npm run dev`)
2. Run frontend (`npm run dev`)
3. Open the frontend URL, register some sales, and explore summaries and charts.

---

## Future Improvements

- Persist data in a database (MongoDB / PostgreSQL)
- User authentication & roles
- Validation middleware for API
- Multi-day / monthly reports
- Export sales data to CSV / Excel
- Deploy to cloud (Vercel / Render / Heroku)

---

## License & Copyright

<p>© 2026 mArtavia.dev — All rights reserved.<br>
Author: Mauricio Artavia Monge<br>
Do not copy, distribute, or sell without permission.</p>