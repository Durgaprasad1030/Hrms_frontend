import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ organisationName: '', adminName: '', adminEmail: '', password: '' });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // State to handle errors and loading
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors

    try {
      await register(formData);
      // If successful:
      alert('Registration successful! You can now login.');
      navigate('/login');
    } catch (err) {
      // CAPTURE THE REAL ERROR HERE
      // The backend sends { msg: "..." }, so we try to grab that.
      const msg = err.response?.data?.msg || 'Registration Failed. Please try again.';
      setError(msg);
    }
    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Create Organisation</h2>
        <p>Get started with your HRMS workspace</p>
        
        {/* Error Alert Box */}
        {error && (
          <div style={{
            color: '#ef4444', 
            background: '#fee2e2', 
            padding: '10px', 
            borderRadius: '8px', 
            marginBottom: '20px', 
            textAlign: 'center',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Organisation Name</label>
            <input 
              placeholder="e.g. Acme Corp" 
              onChange={e => setFormData({...formData, organisationName: e.target.value})} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Admin Name</label>
            <input 
              placeholder="Your Full Name" 
              onChange={e => setFormData({...formData, adminName: e.target.value})} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Admin Email</label>
            <input 
              type="email" 
              placeholder="admin@company.com" 
              onChange={e => setFormData({...formData, adminEmail: e.target.value})} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              onChange={e => setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{width: '100%', marginTop: '10px'}}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>
        
        <p style={{marginTop: '24px', fontSize: '0.9rem', marginBottom: 0}}>
           Already have an account? <Link to="/login" style={{color: '#4f46e5', fontWeight: 'bold', textDecoration: 'none'}}>Login</Link>
        </p>
      </div>
    </div>
  );
}