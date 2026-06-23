import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API, useAuth } from '../context/AuthContext';

const CATEGORIES = [
  { value:'car_rent', label:'Car Rent' }, { value:'car_sale', label:'Car Sale' },
  { value:'house_rent', label:'House Rent' }, { value:'house_sale', label:'House Sale' },
  { value:'land_sale', label:'Land Sale' }, { value:'wedding_suit', label:'Wedding Suit' },
  { value:'sound_rent', label:'Sound Rent' }, { value:'decoration', label:'Decoration' },
  { value:'makeup', label:'Makeup' },
];
const PRICE_TYPES = [
  { value:'fixed', label:'Fixed price' }, { value:'per_day', label:'Per day' },
  { value:'per_month', label:'Per month' }, { value:'per_event', label:'Per event' },
  { value:'negotiable', label:'Negotiable' },
];

export default function PostListing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title:'', title_am:'', description:'', description_am:'', category:'car_rent',
    price:'', price_type:'fixed', payment_method:'both', phone: user?.phone || '', location:'Hossana'
  });
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleImages = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    const fd = new FormData();
    files.forEach(f => fd.append('images', f));
    try {
      const r = await axios.post(`${API}/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setImages(prev => [...prev, ...r.data.urls]);
    } catch { setError('Image upload failed'); }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const r = await axios.post(`${API}/listings`, { ...form, images });
      navigate(`/listing/${r.data.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to post listing');
    } finally { setLoading(false); }
  };

  return (
    <div className="container" style={{ maxWidth: 600, paddingTop: 32, paddingBottom: 48 }}>
      <h1 className="page-title">Post a listing</h1>
      <p className="page-sub">Fill in the details below. Your listing will be reviewed before going live.</p>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="card" style={{ padding: 28 }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Category *</label>
            <select value={form.category} onChange={set('category')}>
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div className="form-group"><label>Title (English) *</label><input value={form.title} onChange={set('title')} placeholder="e.g. Toyota Corolla 2019 for rent" required /></div>
          <div className="form-group"><label>Title (Amharic)</label><input value={form.title_am} onChange={set('title_am')} placeholder="ለምሳሌ፡ ቶዮታ ኮሮላ 2019 ለኪራይ" /></div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div className="form-group">
              <label>Price (ETB)</label>
              <input type="number" value={form.price} onChange={set('price')} placeholder="0" min="0" />
            </div>
            <div className="form-group">
              <label>Price type</label>
              <select value={form.price_type} onChange={set('price_type')}>
                {PRICE_TYPES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Payment method</label>
            <select value={form.payment_method} onChange={set('payment_method')}>
              <option value="both">Cash, Telebirr & CBE</option>
              <option value="cash">Cash only</option>
              <option value="telebirr">Telebirr</option>
              <option value="cbe">CBE</option>
            </select>
          </div>
          <div className="form-group"><label>Description (English)</label><textarea value={form.description} onChange={set('description')} placeholder="Describe your listing..." /></div>
          <div className="form-group"><label>Description (Amharic)</label><textarea value={form.description_am} onChange={set('description_am')} placeholder="ዝርዝሩን ይግለጹ..." /></div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div className="form-group"><label>Phone *</label><input type="tel" value={form.phone} onChange={set('phone')} placeholder="+251911234567" required /></div>
            <div className="form-group"><label>Location</label><input value={form.location} onChange={set('location')} placeholder="Hossana" /></div>
          </div>
          <div className="form-group">
            <label>Photos (up to 5)</label>
            <input type="file" multiple accept="image/*" onChange={handleImages} disabled={uploading} />
            {uploading && <p style={{ fontSize:13, color:'#6b7280', marginTop:6 }}>Uploading...</p>}
            {images.length > 0 && (
              <div style={{ display:'flex', gap:8, marginTop:10, flexWrap:'wrap' }}>
                {images.map((img, i) => (
                  <div key={i} style={{ position:'relative' }}>
                    <img src={`${process.env.REACT_APP_API_URL?.replace('/api','')}${img}`} alt="" style={{ width:64, height:48, objectFit:'cover', borderRadius:6 }} />
                    <button type="button" onClick={() => setImages(imgs => imgs.filter((_,j) => j!==i))}
                      style={{ position:'absolute', top:-6, right:-6, background:'#ef4444', color:'#fff', border:'none', borderRadius:'50%', width:18, height:18, fontSize:12, cursor:'pointer', lineHeight:'18px' }}>x</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary" style={{ width:'100%', justifyContent:'center', padding:14, fontSize:15, marginTop:8 }} disabled={loading || uploading}>
            {loading ? 'Posting...' : 'Submit listing for review'}
          </button>
        </form>
      </div>
    </div>
  );
}
