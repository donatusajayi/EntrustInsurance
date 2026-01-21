import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import PersonalMain from './pages/PersonalMain.tsx';
import CommercialMain from './pages/CommercialMain.tsx';
import ServiceDetail from './pages/ServiceDetail.tsx';
import Claims from './pages/Claims.tsx';
import Contact from './pages/Contact.tsx';
import Quote from './pages/Quote.tsx';
import TaxFiling from './pages/TaxFiling.tsx';
import BookkeepingPayroll from './pages/BookkeepingPayroll.tsx';
import Travel from './pages/Travel.tsx';
import PrivacyPolicy from './pages/PrivacyPolicy.tsx';
import TermsOfService from './pages/TermsOfService.tsx';
import About from './pages/About.tsx';
import ChatBot from './components/ChatBot.tsx';

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
            <Route path="/about" element={<About />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/personal" element={<PersonalMain />} />
            <Route path="/personal/:type" element={<ServiceDetail category="personal" />} />
            <Route path="/commercial" element={<CommercialMain />} />
            <Route path="/commercial/:type" element={<ServiceDetail category="commercial" />} />
            <Route path="/financial/:type" element={<ServiceDetail category="financial" />} />
            <Route path="/tax-services" element={<TaxFiling />} />
            <Route path="/bookkeeping-payroll" element={<BookkeepingPayroll />} />
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