import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>HRMS</h2>
        <nav>
          <Link to="/employees" className={location.pathname === '/employees' ? 'active' : ''}>
            Employees
          </Link>
          <Link to="/teams" className={location.pathname === '/teams' ? 'active' : ''}>
            Teams
          </Link>
          <Link to="/logs" className={location.pathname === '/logs' ? 'active' : ''}>
            Audit Logs
          </Link>
        </nav>
        
        <button onClick={handleLogout} className="logout-btn">
          Logout ({user?.name?.split(' ')[0]})
        </button>
      </aside>

      <main className="main-content">
        <div className="fade-in-wrapper">
            {children}
        </div>
      </main>
    </div>
  );
}