import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name:'', phone:'', email:'', password:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="container" style={{ maxWidth: 420, paddingTop: 60, paddingBottom: 60 }}>
      <div className="card" style={{ padding: 32 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Create account</h1>
        <p style={{ color: '#6b7280', marginBottom: 24, fontSize: 14 }}>Join Mafitihe Alle Hossana marketplace</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Full name</label><input value={form.name} onChange={set('name')} placeholder="Abebe Kebede" required /></div>
          <div className="form-group"><label>Phone number *</label><input type="tel" value={form.phone} onChange={set('phone')} placeholder="+251911234567" required /></div>
          <div className="form-group"><label>Email (optional)</label><input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" /></div>
          <div className="form-group"><label>Password</label><input type="password" value={form.password} onChange={set('password')} minLength={6} required /></div>
          <button type="submit" className="btn btn-primary" style={{ width:'100%', justifyContent:'center', padding:12 }} disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        <p style={{ textAlign:'center', marginTop:20, fontSize:14, color:'#6b7280' }}>
          Already have an account? <Link to="/login" style={{ color:'#1D9E75', fontWeight:500 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
