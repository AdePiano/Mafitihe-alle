import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ListingCard from '../components/ListingCard';
import { API } from '../context/AuthContext';

const CAT_LABELS = {
  car_rent:'Car Rent', car_sale:'Car Sales', house_rent:'House Rent', house_sale:'House Sales',
  land_sale:'Land Sales', wedding_suit:'Wedding Suit', sound_rent:'Sound Rent',
  decoration:'Decoration', makeup:'Makeup', all:'All Listings'
};

export default function Category() {
  const { cat } = useParams();
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit: 12 });
    if (cat !== 'all') params.set('category', cat);
    const s = searchParams.get('search');
    if (s) params.set('search', s);
    axios.get(`${API}/listings?${params}`).then(r => { setListings(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, [cat, page, searchParams]);

  return (
    <div className="container" style={{ paddingTop: 28, paddingBottom: 40 }}>
      <h1 className="page-title">{CAT_LABELS[cat] || 'Listings'}</h1>
      <p className="page-sub">{listings.length} listings found in Hossana</p>
      {loading ? <div style={{ textAlign: 'center', padding: 40 }}>Loading...</div> :
        listings.length > 0 ? <div className="grid-2">{listings.map(l => <ListingCard key={l.id} listing={l} />)}</div> :
        <div className="empty-state"><div className="icon">🔍</div><p>No listings found.</p></div>}
      {listings.length === 12 && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button className="btn btn-outline" onClick={() => setPage(p => p + 1)}>Load more</button>
        </div>
      )}
    </div>
  );
}
