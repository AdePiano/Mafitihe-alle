import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#085041', color: '#9FE1CB', padding: '32px 0 20px', marginTop: 40 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24, marginBottom: 24 }}>
          <div>
            <div style={{ color: '#fff', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>ማፍጠሄ አለ ሆሳዕና</div>
            <p style={{ fontSize: 13, lineHeight: 1.6 }}>Your local marketplace in Hossana, Central Ethiopia.</p>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 500, marginBottom: 10, fontSize: 14 }}>Categories</div>
            {['car_rent','car_sale','house_rent','house_sale','wedding_suit','sound_rent','decoration','makeup'].map(c => (
              <Link key={c} to={`/category/${c}`} style={{ display: 'block', fontSize: 13, marginBottom: 4, color: '#9FE1CB' }}>
                {c.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Link>
            ))}
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 500, marginBottom: 10, fontSize: 14 }}>Contact</div>
            <p style={{ fontSize: 13 }}>Hossana, Hadiya Zone</p>
            <p style={{ fontSize: 13 }}>Central Ethiopia</p>
            <p style={{ fontSize: 13, marginTop: 8 }}>info@mafitihe.com</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #0F6E56', paddingTop: 16, fontSize: 12, textAlign: 'center' }}>
          © {new Date().getFullYear()} Mafitihe Alle Hossana. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
