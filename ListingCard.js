import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORY_LABELS = {
  car_rent: 'Car Rent', car_sale: 'Car Sale', house_rent: 'House Rent',
  house_sale: 'House Sale', land_sale: 'Land Sale', wedding_suit: 'Wedding Suit',
  sound_rent: 'Sound Rent', decoration: 'Decoration', makeup: 'Makeup'
};
const BADGE_CLASS = {
  car_rent: 'badge-car', car_sale: 'badge-car', house_rent: 'badge-house',
  house_sale: 'badge-house', land_sale: 'badge-land', wedding_suit: 'badge-wed',
  sound_rent: 'badge-sound', decoration: 'badge-deco', makeup: 'badge-makeup'
};
const PRICE_TYPE_LABEL = { fixed: '', per_day: '/day', per_month: '/mo', per_event: '/event', negotiable: '(negotiable)' };
const CAT_ICONS = {
  car_rent: '🚗', car_sale: '🚘', house_rent: '🏠', house_sale: '🏡',
  land_sale: '🌍', wedding_suit: '👗', sound_rent: '🔊', decoration: '🎉', makeup: '💄'
};

export default function ListingCard({ listing }) {
  const API = process.env.REACT_APP_API_URL?.replace('/api', '') || '';
  return (
    <Link to={`/listing/${listing.id}`} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ transition: 'transform .15s, box-shadow .15s', cursor: 'pointer' }}
        onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>
        <div style={{ height: 160, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
          {listing.primary_image
            ? <img src={`${API}${listing.primary_image}`} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : CAT_ICONS[listing.category]}
        </div>
        <div style={{ padding: '12px 14px' }}>
          <span className={`badge ${BADGE_CLASS[listing.category] || 'badge-land'}`} style={{ marginBottom: 6 }}>
            {CATEGORY_LABELS[listing.category]}
          </span>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, color: '#1a1a1a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {listing.title}
          </div>
          {listing.price && (
            <div style={{ color: '#1D9E75', fontWeight: 600, fontSize: 15 }}>
              ETB {Number(listing.price).toLocaleString()}{PRICE_TYPE_LABEL[listing.price_type]}
            </div>
          )}
          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>📍 {listing.location}</div>
        </div>
      </div>
    </Link>
  );
}
