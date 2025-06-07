import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/Homepage.jsx';
import ProductDemo from './pages/ProductDemo.jsx';
import ProdDemo from './pages/ProdDemo.jsx';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<ProductDemo />} />
        <Route path="/search-now" element={<ProdDemo />} />
      </Routes>
    </Router>
  );
}

export default App;
