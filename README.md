# Financial Data Anomaly Detection

This project implements a financial transaction anomaly detection system using a Flask backend for simulating a data stream and anomaly detection, and a React frontend for visualizing the data stream and highlighting the anomalies.

Backend: Flask API that simulates a financial transactional data stream and detects anomalies using Z-Score and Isolation Forest methods.
Frontend: React app that visualizes the data stream with anomalies highlighted on a graph.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

## Prerequisites

Before you begin, ensure you have the following installed:

- Python 3.8+
- Node.js 14+
- npm 6+

## Installation

Clone the repository and navigate to root directory:

```bash
git clone https://github.com/edwinmvk/anomaly-detection.git
cd anomaly-detection
```

### Backend Setup

1. Navigate to the backend directory from root:

   ```bash
   cd backend
   ```

2. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

### Frontend Setup

1. Navigate to the frontend directory from root:

   ```bash
   cd frontend
   ```

2. Install the required npm packages:
   ```bash
   npm install
   ```

## Running the Application

1. Start the Flask backend:

   - In a new terminal, navigate to the backend directory:
     ```bash
     cd backend
     python server.py
     ```
     The backend will start running on `http://localhost:5000`.

2. Start the React frontend:

   - In a new terminal, navigate to the frontend directory:
     ```bash
     cd frontend
     npm start
     ```
     The frontend will start running on `http://localhost:3000`.

3. Open your web browser and go to `http://localhost:3000` to view the application.

## Project Structure

```
anomaly-detection/
│
├── backend/
│   ├── server.py         # Flask backend
│   └── requirements.txt  # Python dependencies
│
└── frontend/
    ├── package.json      # npm dependencies and scripts
    ├── public/
    └── src/
        ├── App.js        # Main React component
        └── ...           # Other React components and assets

```

## Technologies Used

- Backend:
  - Flask
  - NumPy
  - SciPy
  - scikit-learn
- Frontend:
  - React
  - Chart.js
  - react-chartjs-2

For more details, please refer to the `requirements.txt` and `package.json` files.
