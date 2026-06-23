import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import ListingDetail from './pages/ListingDetail';
import PostListing from './pages/PostListing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{textAlign:'center',padding:'60px'}}>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{textAlign:'center',padding:'60px'}}>Loading...</div>;
  return user?.role === 'admin' ? children : <Navigate to="/" />;
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 120px)' }}>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/category/:cat" element={<Layout><Category /></Layout>} />
          <Route path="/listing/:id" element={<Layout><ListingDetail /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/post" element={<PrivateRoute><Layout><PostListing /></Layout></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
          <Route path="/admin" element={<AdminRoute><Layout><AdminPanel /></Layout></AdminRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
