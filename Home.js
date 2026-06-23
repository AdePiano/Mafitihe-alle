import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListingCard from '../components/ListingCard';
import { API } from '../context/AuthContext';

const CATEGORIES = [
  { key: 'car_rent', label: 'Car Rent', am: 'መኪና ኪራይ', icon: '🚗', sub: 'Daily hire' },
  { key: 'car_sale', label: 'Car Sales', am: 'መኪና ሽያጭ', icon: '🚘', sub: 'Buy & sell' },
  { key: 'house_rent', label: 'House Rent', am: 'ቤት ኪራይ', icon: '🏠', sub: 'Rooms & flats' },
  { key: 'house_sale', label: 'House Sales', am: 'ቤት ሽያጭ', icon: '🏡', sub: 'For sale' },
  { key: 'wedding_suit', label: 'Wedding Suit', am: 'የሰርግ ልብስ', icon: '👗', sub: 'Rent attire' },
  { key: 'sound_rent', label: 'Sound Rent', am: 'ሳውንድ ኪራይ', icon: '🔊', sub: 'PA & speakers' },
  { key: 'decoration', label: 'Decoration', am: 'ዲኮሬሽን', icon: '🎉', sub: 'Event decor' },
  { key: 'makeup', label: 'Makeup', am: 'ሜካፕ', icon: '💄', sub: 'Beauty artists' },
];

export default function Home() {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/listings?limit=8`).then(r => setListings(r.data)).catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/category/all?search=${encodeURIComponent(search)}`);
  };

  return (
    <div>
      <div style={{ background: '#085041', padding: '48px 16px 40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: '#fff', marginBottom: 4 }}>ማፍጠሄ አለ ሆሳዕና</h1>
        <p style={{ color: '#9FE1CB', fontSize: 15, marginBottom: 24 }}>Find cars, houses, events and more in Hossana, Central Ethiopia</p>
        <form onSubmit={handleSearch} style={{ display: 'flex', maxWidth: 480, margin: '0 auto' }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search listings..."
            style={{ flex: 1, padding: '12px 16px', border: 'none', borderRadius: '10px 0 0 10px', fontSize: 15, outline: 'none' }} />
          <button type="submit" className="btn btn-primary" style={{ borderRadius: '0 10px 10px 0', padding: '12px 20px' }}>Search</button>
        </form>
      </div>
      <div className="container" style={{ paddingTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Browse categories</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 12 }}>
          {CATEGORIES.map(cat => (
            <Link key={cat.key} to={`/category/${cat.key}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: '16px 8px', textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{cat.icon}</div>
                <div style={{ fontWeight: 500, fontSize: 13, color: '#1a1a1a' }}>{cat.label}</div>
                <div style={{ fontSize: 11, color: '#1D9E75' }}>{cat.am}</div>
                <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{cat.sub}</div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 36, marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600 }}>Recent listings</h2>
          <Link to="/category/all" style={{ color: '#1D9E75', fontSize: 14 }}>View all</Link>
        </div>
        {listings.length > 0 ? (
          <div className="grid-2">{listings.map(l => <ListingCard key={l.id} listing={l} />)}</div>
        ) : (
          <div className="empty-state"><div className="icon">🏪</div><p>No listings yet. Be the first to post!</p></div>
        )}
        <div style={{ background: '#E1F5EE', borderRadius: 14, padding: 28, textAlign: 'center', margin: '36px 0' }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: '#085041', marginBottom: 8 }}>Have something to sell or rent?</h3>
          <p style={{ color: '#0F6E56', marginBottom: 16, fontSize: 14 }}>Post your listing for free and reach thousands of people in Hossana</p>
          <Link to="/post" className="btn btn-primary">Post a free listing</Link>
        </div>
      </div>
    </div>
  );
}
