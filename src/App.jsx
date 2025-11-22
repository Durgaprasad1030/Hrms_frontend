import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmployeesPage from './pages/EmployeesPage';
import TeamsPage from './pages/TeamsPage';
import LogsPage from './pages/LogsPage';

// --- Route Guards ---

// 1. Protected Route: For pages that require login (Employees, Teams, Logs)
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="loading-spinner">Loading system...</div>;
  }

  // If not logged in, kick them out to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// 2. Public Route: For pages that should NOT be seen if logged in (Login, Register)
const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="loading-spinner">Loading system...</div>;
  }

  // If already logged in, send them to the dashboard
  if (user) {
    return <Navigate to="/employees" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            } 
          />

          {/* Protected Routes */}
          <Route 
            path="/employees" 
            element={
              <ProtectedRoute>
                <EmployeesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teams" 
            element={
              <ProtectedRoute>
                <TeamsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/logs" 
            element={
              <ProtectedRoute>
                <LogsPage />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all: Redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;