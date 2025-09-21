import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './components/Landing';
import { Marketplace } from './components/Marketplace';
import { CreatorProfile } from './components/CreatorProfile';
import { MintBond } from './components/MintBond';
import { Dashboard } from './components/Dashboard';
import { PredictionMarket } from './components/PredictionMarket';
import { InvestmentPortfolio } from './components/InvestmentPortfolio';
import { Navigation } from './components/Navigation';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/creator/:id" element={<CreatorProfile />} />
          <Route path="/mint" element={<MintBond />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio" element={<InvestmentPortfolio />} />
          <Route path="/predictions" element={<PredictionMarket />} />
          <Route path="/preview_page.html" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}