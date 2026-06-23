import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../context/AuthContext';

export default function AdminPanel() {
  const [tab, setTab] = useState('pending');
  const [listings, setListings] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE = process.env.REACT_APP_API_URL?.replace('/api','') || '';

  useEffect(() => {
    axios.get(`${API}/admin/stats`).then(r => setStats(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/admin/listings?status=${tab}`).then(r => { setListings(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, [tab]);

  const updateStatus = async (id, status) => {
    await axios.patch(`${API}/admin/listings/${id}/status`, { status });
    setListings(ls => ls.filter(l => l.id !== id));
  };

  const tabs = ['pending','active','rejected'];

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 48 }}>
      <h1 className="page-title">Admin Panel</h1>
      <p className="page-sub">Mafitihe Alle Hossana — Manage listings</p>

      {stats && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr))', gap:12, marginBottom:28 }}>
          {[['Total listings', stats.total, '#1D9E75'], ['Pending review', stats.pending, '#f59e0b'], ['Active', stats.active, '#10b981'], ['Users', stats.users, '#6366f1']].map(([label, val, color]) => (
            <div key={label} style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:10, padding:'16px 20px' }}>
              <div style={{ fontSize:13, color:'#6b7280', marginBottom:4 }}>{label}</div>
              <div style={{ fontSize:28, fontWeight:700, color }}>{val}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display:'flex', gap:4, marginBottom:20, borderBottom:'1px solid #e5e7eb', paddingBottom:0 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding:'10px 20px', border:'none', background: tab===t ? '#1D9E75' : 'transparent', color: tab===t ? '#fff' : '#6b7280', borderRadius:'8px 8px 0 0', fontWeight:500, fontSize:14, cursor:'pointer' }}>
            {t.charAt(0).toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>

      {loading ? <div style={{ textAlign:'center', padding:40 }}>Loading...</div> :
        listings.length === 0 ? <div className="empty-state"><div className="icon">✅</div><p>No {tab} listings.</p></div> :
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {listings.map(l => (
            <div key={l.id} className="card" style={{ display:'flex', gap:14, padding:14, alignItems:'center' }}>
              <div style={{ width:64, height:48, background:'#f3f4f6', borderRadius:6, overflow:'hidden', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>
                {l.primary_image ? <img src={`${BASE}${l.primary_image}`} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : '🏷️'}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontWeight:600, fontSize:14, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{l.title}</div>
                <div style={{ fontSize:12, color:'#6b7280' }}>{l.owner_name} · {l.owner_phone} · {l.category}</div>
                <div style={{ fontSize:12, color:'#6b7280' }}>ETB {l.price ? Number(l.price).toLocaleString() : 'N/A'}</div>
              </div>
              <div style={{ display:'flex', gap:6, flexShrink:0, flexWrap:'wrap', justifyContent:'flex-end' }}>
                {tab !== 'active' && <button className="btn btn-primary btn-sm" onClick={() => updateStatus(l.id, 'active')}>Approve</button>}
                {tab !== 'rejected' && <button className="btn btn-danger btn-sm" onClick={() => updateStatus(l.id, 'rejected')}>Reject</button>}
                {tab === 'active' && <button className="btn btn-outline btn-sm" onClick={() => updateStatus(l.id, 'sold')}>Mark sold</button>}
              </div>
            </div>
          ))}
        </div>}
    </div>
  );
}
