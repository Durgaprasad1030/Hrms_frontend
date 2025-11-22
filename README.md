HRMS Frontend Portal

The client-side application for the Human Resource Management System. It features a modern, clean UI built with standard CSS (no external UI libraries) and React.

🎨 Features

Modern UI: Custom CSS implementation with glassmorphism, smooth animations, and a responsive sidebar layout.

Authentication: JWT-based login with persistent sessions and protected routes.

Dashboard: Manage employees and teams with an intuitive interface.

Audit Logging: View a history of all administrative actions.

🛠️ Tech Stack

Framework: React.js (Vite)

Styling: Standard CSS (CSS Variables, Flexbox, Grid, Keyframes)

Routing: React Router DOM v6

HTTP Client: Axios

Icons: (Optional) Lucide React or Standard SVGs

🚀 Getting Started

1. Installation

Navigate to the frontend directory and install dependencies:

cd frontend
npm install


2. Configuration

Ensure the backend API is running on http://localhost:5000.
If your backend runs on a different port, update src/api/axios.js.

3. Running the App

Start the development server:

npm run dev


Open your browser at the URL provided (usually http://localhost:5173).

4. Login Credentials (if using seeded data)

Email: admin@tech.com

Password: password123

📂 Project Structure

src/
├── api/            # Axios instance and configuration
├── components/     # Reusable components (Layout, Sidebar)
├── context/        # AuthContext for global state
├── pages/          # Individual Page views (Login, Employees, Teams)
├── App.css         # (Deprecated) Old styles
├── index.css       # Main stylesheet containing the Modern UI
├── App.jsx         # Main routing logic
└── main.jsx        # Entry point


🖌️ Styling Guide

The project uses src/index.css for all styling.

Variables: Defined in :root for easy theming (colors, spacing, shadows).

Dark Mode: Currently disabled via color-scheme: light to ensure consistent clean design.

Animations: Includes @keyframes for fadeIn and slideIn effects on page load.