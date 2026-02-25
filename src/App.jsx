import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';

const pathToPageName = {
  '/': 'Home',
  '/my-business': 'MyBusiness',
  '/wishlist': 'Wishlist',
  '/cart': 'Cart',
  '/add-business': 'AddBusiness',
  '/orders': 'Orders',
  '/business-profile': 'BusinessProfile',
};

function Page({ title }) {
  return (
    <div className="demo-card">
      <h1>{title}</h1>
      <p>This is a runnable demo page for the Layout component.</p>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const currentPageName = pathToPageName[location.pathname] || 'Home';

  return (
    <Layout currentPageName={currentPageName}>
      <Routes>
        <Route path="/" element={<Page title="Discover" />} />
        <Route path="/my-business" element={<Page title="My Dashboard" />} />
        <Route path="/wishlist" element={<Page title="Wishlist" />} />
        <Route path="/cart" element={<Page title="Cart" />} />
        <Route path="/add-business" element={<Page title="Add Business" />} />
        <Route path="/orders" element={<Page title="My Orders" />} />
        <Route path="/business-profile" element={<Page title="Business Profile" />} />
      </Routes>
    </Layout>
  );
}
