import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PersonalMain from './pages/PersonalMain';
import CommercialMain from './pages/CommercialMain';
import ServiceDetail from './pages/ServiceDetail';
import Claims from './pages/Claims';
import Contact from './pages/Contact';
import Quote from './pages/Quote';
import TaxFiling from './pages/TaxFiling';
import Travel from './pages/Travel';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ChatBot from './components/ChatBot';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/personal" element={<PersonalMain />} />
            <Route path="/personal/:type" element={<ServiceDetail category="personal" />} />
            <Route path="/commercial" element={<CommercialMain />} />
            <Route path="/commercial/:type" element={<ServiceDetail category="commercial" />} />
            <Route path="/financial/:type" element={<ServiceDetail category="financial" />} />
            <Route path="/tax-filing" element={<TaxFiling />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/claims" element={<Claims />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </HashRouter>
  );
};

export default App;