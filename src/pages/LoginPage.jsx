import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/employees');
    } catch (err) {
      setError('Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Sign in to your HRMS dashboard</p>
        
        {error && <div style={{color: 'var(--danger)', background: '#fee2e2', padding: '10px', borderRadius: '8px', marginBottom: '20px', textAlign:'center'}}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="admin@company.com" 
              onChange={e => setForm({...form, email: e.target.value})} 
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              onChange={e => setForm({...form, password: e.target.value})} 
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '10px'}}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <p style={{marginTop: '24px', fontSize: '0.9rem', marginBottom: 0}}>
          New here? <Link to="/register" style={{color: 'var(--primary)', fontWeight: 'bold', textDecoration:'none'}}>Create Organisation</Link>
        </p>
      </div>
    </div>
  );
}