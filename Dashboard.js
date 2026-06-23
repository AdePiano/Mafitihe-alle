import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API, useAuth } from '../context/AuthContext';

const STATUS_BADGE = { pending:'badge-pending', active:'badge-active', rejected:'badge-rejected', sold:'badge-active' };

export default function Dashboard() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE = process.env.REACT_APP_API_URL?.replace('/api','') || '';

  useEffect(() => {
    axios.get(`${API}/listings/user/my`).then(r => { setListings(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const deleteListing = async (id) => {
    if (!window.confirm('Delete this listing?')) return;
    await axios.delete(`${API}/listings/${id}`);
    setListings(ls => ls.filter(l => l.id !== id));
  };

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 48 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <h1 className="page-title">My Listings</h1>
          <p className="page-sub">Welcome back, {user?.name}</p>
        </div>
        <Link to="/post" className="btn btn-primary">+ Post new</Link>
      </div>

      {loading ? <div style={{ textAlign:'center', padding:40 }}>Loading...</div> :
        listings.length === 0 ? (
          <div className="empty-state">
            <div className="icon">📋</div>
            <p>You haven't posted any listings yet.</p>
            <Link to="/post" className="btn btn-primary" style={{ marginTop:16 }}>Post your first listing</Link>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {listings.map(l => (
              <div key={l.id} className="card" style={{ display:'flex', gap:16, padding:16, alignItems:'center' }}>
                <div style={{ width:72, height:54, background:'#f3f4f6', borderRadius:8, overflow:'hidden', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28 }}>
                  {l.primary_image ? <img src={`${BASE}${l.primary_image}`} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : '🏷️'}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:600, fontSize:15, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{l.title}</div>
                  <div style={{ fontSize:13, color:'#6b7280' }}>ETB {l.price ? Number(l.price).toLocaleString() : 'N/A'} · {l.views} views</div>
                </div>
                <span className={`badge ${STATUS_BADGE[l.status]}`}>{l.status}</span>
                <div style={{ display:'flex', gap:8, flexShrink:0 }}>
                  <Link to={`/listing/${l.id}`} className="btn btn-outline btn-sm">View</Link>
                  <button onClick={() => deleteListing(l.id)} className="btn btn-danger btn-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
