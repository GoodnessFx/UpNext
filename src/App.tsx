import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppProvider } from './context/AppContext';
import { Landing } from './components/Landing';
import { Marketplace } from './components/Marketplace';
import { CreatorProfile } from './components/CreatorProfile';
import { MintBond } from './components/MintBond';
import { Dashboard } from './components/Dashboard';
import { PredictionMarket } from './components/PredictionMarket';
import { InvestmentPortfolio } from './components/InvestmentPortfolio';
import { Navigation } from './components/Navigation';
import { Auth } from './components/Auth';
import { Settings } from './components/Settings';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/settings" element={<Settings />} />
            {/* New canonical routes */}
            <Route path="/discover" element={<Marketplace />} />
            <Route path="/talent/new" element={<MintBond />} />
            <Route path="/talent/:id" element={<CreatorProfile />} />
            <Route path="/dashboard/investor" element={<InvestmentPortfolio />} />
            <Route path="/dashboard/talent" element={<Dashboard />} />
            <Route path="/predictions" element={<PredictionMarket />} />

            {/* Backwards compatible routes */}
            <Route path="/marketplace" element={<Navigate to="/discover" replace />} />
            <Route path="/creator/:id" element={<CreatorProfile />} />
            <Route path="/mint" element={<Navigate to="/talent/new" replace />} />
            <Route path="/dashboard" element={<Navigate to="/dashboard/talent" replace />} />
            <Route path="/portfolio" element={<Navigate to="/dashboard/investor" replace />} />
            <Route path="/preview_page.html" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster theme="dark" position="bottom-right" />
        </div>
      </Router>
    </AppProvider>
  );
}