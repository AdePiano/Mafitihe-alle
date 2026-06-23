import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await login(phone, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="container" style={{ maxWidth: 420, paddingTop: 60, paddingBottom: 60 }}>
      <div className="card" style={{ padding: 32 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Sign in</h1>
        <p style={{ color: '#6b7280', marginBottom: 24, fontSize: 14 }}>Welcome back to Mafitihe Alle Hossana</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Phone number</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+251911234567" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width:'100%', justifyContent:'center', padding:12 }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p style={{ textAlign:'center', marginTop:20, fontSize:14, color:'#6b7280' }}>
          Don't have an account? <Link to="/register" style={{ color:'#1D9E75', fontWeight:500 }}>Register</Link>
        </p>
      </div>
    </div>
  );
}
