import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../context/AuthContext';

const PRICE_LABEL = { per_day:'/day', per_month:'/month', per_event:'/event', negotiable:' (negotiable)', fixed:'' };
const PAY_ICONS = { cash:'💵 Cash', telebirr:'📱 Telebirr', cbe:'🏦 CBE', both:'💵 Cash · 📱 Telebirr · 🏦 CBE' };

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgIdx, setImgIdx] = useState(0);
  const BASE = process.env.REACT_APP_API_URL?.replace('/api','') || '';

  useEffect(() => {
    axios.get(`${API}/listings/${id}`).then(r => { setListing(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ textAlign:'center', padding:60 }}>Loading...</div>;
  if (!listing) return <div style={{ textAlign:'center', padding:60 }}><p>Listing not found.</p><Link to="/" className="btn btn-primary" style={{ marginTop:16 }}>Go home</Link></div>;

  const images = listing.images || [];
  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
      <Link to="/" style={{ color:'#1D9E75', fontSize:14, marginBottom:16, display:'inline-block' }}>← Back to listings</Link>
      <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:24 }}>
        <div className="card" style={{ overflow:'hidden' }}>
          <div style={{ height:300, background:'#f3f4f6', display:'flex', alignItems:'center', justifyContent:'center', fontSize:80 }}>
            {images.length > 0
              ? <img src={`${BASE}${images[imgIdx]}`} alt={listing.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              : '🏷️'}
          </div>
          {images.length > 1 && (
            <div style={{ display:'flex', gap:8, padding:12, overflowX:'auto' }}>
              {images.map((img, i) => (
                <img key={i} src={`${BASE}${img}`} alt="" onClick={() => setImgIdx(i)}
                  style={{ width:64, height:48, objectFit:'cover', borderRadius:6, cursor:'pointer', border: i===imgIdx ? '2px solid #1D9E75' : '2px solid transparent' }} />
              ))}
            </div>
          )}
        </div>

        <div className="card" style={{ padding:24 }}>
          <h1 style={{ fontSize:22, fontWeight:700, marginBottom:4 }}>{listing.title}</h1>
          {listing.title_am && <p style={{ color:'#6b7280', marginBottom:12, fontSize:16 }}>{listing.title_am}</p>}
          {listing.price && (
            <div style={{ fontSize:24, fontWeight:700, color:'#1D9E75', marginBottom:16 }}>
              ETB {Number(listing.price).toLocaleString()}{PRICE_LABEL[listing.price_type]}
            </div>
          )}
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:16 }}>
            <span style={{ background:'#E1F5EE', color:'#085041', padding:'4px 12px', borderRadius:99, fontSize:13 }}>📍 {listing.location}</span>
            <span style={{ background:'#f3f4f6', color:'#374151', padding:'4px 12px', borderRadius:99, fontSize:13 }}>👁 {listing.views} views</span>
            <span style={{ background:'#f3f4f6', color:'#374151', padding:'4px 12px', borderRadius:99, fontSize:13 }}>💳 {PAY_ICONS[listing.payment_method]}</span>
          </div>
          {listing.description && <p style={{ lineHeight:1.7, color:'#374151', marginBottom:16 }}>{listing.description}</p>}
          {listing.description_am && <p style={{ lineHeight:1.7, color:'#6b7280', fontSize:15, marginBottom:16 }}>{listing.description_am}</p>}
          <div style={{ borderTop:'1px solid #e5e7eb', paddingTop:20, marginTop:8 }}>
            <p style={{ fontWeight:600, marginBottom:8 }}>Contact seller</p>
            <p style={{ color:'#6b7280', fontSize:14, marginBottom:12 }}>Posted by {listing.owner_name}</p>
            <a href={`tel:${listing.owner_phone}`} className="btn btn-primary" style={{ width:'100%', justifyContent:'center', fontSize:16, padding:14 }}>
              📞 Call {listing.owner_phone}
            </a>
            <a href={`https://wa.me/${listing.owner_phone?.replace(/\D/g,'')}`} target="_blank" rel="noreferrer"
              className="btn btn-outline" style={{ width:'100%', justifyContent:'center', marginTop:10, fontSize:15 }}>
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
