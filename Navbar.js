import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LANG = {
  en: { brand: 'Mafitihe Alle', sub: 'Hossana Marketplace', post: 'Post Ad', login: 'Sign in', dashboard: 'My Listings', admin: 'Admin', logout: 'Logout' },
  am: { brand: 'ማፍጠሄ አለ', sub: 'ሆሳዕና ማርኬትፕሌስ', post: 'ማስታወቂያ ለጥፍ', login: 'ግባ', dashboard: 'ዝርዝሮቼ', admin: 'አስተዳዳሪ', logout: 'ውጣ' }
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [lang, setLang] = useState('en');
  const [open, setOpen] = useState(false);
  const t = LANG[lang];

  return (
    <nav style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontWeight: 600, fontSize: 16, color: '#1D9E75', lineHeight: 1.2 }}>
            {t.brand}
            <div style={{ fontSize: 11, color: '#6b7280', fontWeight: 400 }}>{t.sub}</div>
          </div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setLang(l => l === 'en' ? 'am' : 'en')}
            style={{ fontSize: 12, padding: '4px 10px', border: '1px solid #e5e7eb', borderRadius: 8, background: 'transparent', cursor: 'pointer', color: '#6b7280' }}>
            {lang === 'en' ? 'አማ' : 'EN'}
          </button>

          {user ? (
            <>
              <Link to="/post" className="btn btn-primary btn-sm">{t.post}</Link>
              <div style={{ position: 'relative' }}>
                <button onClick={() => setOpen(o => !o)}
                  style={{ background: '#E1F5EE', border: 'none', borderRadius: 99, width: 36, height: 36, fontWeight: 600, color: '#0F6E56', fontSize: 14 }}>
                  {user.name.charAt(0).toUpperCase()}
                </button>
                {open && (
                  <div style={{ position: 'absolute', right: 0, top: 44, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, minWidth: 150, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 200 }}>
                    <Link to="/dashboard" onClick={() => setOpen(false)} style={{ display: 'block', padding: '10px 16px', fontSize: 14, borderBottom: '1px solid #f3f4f6' }}>{t.dashboard}</Link>
                    {user.role === 'admin' && <Link to="/admin" onClick={() => setOpen(false)} style={{ display: 'block', padding: '10px 16px', fontSize: 14, borderBottom: '1px solid #f3f4f6' }}>{t.admin}</Link>}
                    <button onClick={() => { logout(); setOpen(false); navigate('/'); }}
                      style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', fontSize: 14, border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer' }}>
                      {t.logout}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">{t.login}</Link>
              <Link to="/post" className="btn btn-primary btn-sm">{t.post}</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
