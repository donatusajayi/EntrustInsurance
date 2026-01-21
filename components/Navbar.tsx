import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ShieldCheck } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sync state with location changes
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleLinkClick = () => {
    setActiveDropdown(null);
    setIsOpen(false);
  };

  const personalLinks = [
    { to: '/personal/auto', label: 'Auto Insurance' },
    { to: '/personal/homeowners', label: 'Homeowners' },
    { to: '/personal/life', label: 'Life Insurance' },
    { to: '/personal/health', label: 'Health Insurance' },
    { to: '/personal', label: 'All Personal' },
  ];

  const commercialLinks = [
    { to: '/commercial/general-liability', label: 'General Liability' },
    { to: '/commercial/property', label: 'Property Insurance' },
    { to: '/commercial/bop', label: 'Business Owners' },
    { to: '/commercial/workers-comp', label: 'Workers Comp' },
    { to: '/commercial', label: 'All Commercial' },
  ];

  return (
    <nav 
      ref={navRef} 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? 'py-2 glass shadow-lg' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex justify-between items-center">
        <Link to="/" onClick={handleLinkClick} className="flex items-center space-x-4 group origin-left">
          <div className="relative">
             <img 
              src="https://i.ibb.co/nNtJYCXL/Entrust-Logo-removebg-preview.png" 
              alt="Entrust Logo" 
              className="h-10 md:h-12 lg:h-14 w-auto object-contain transition-transform group-hover:scale-110 duration-500"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold text-gray-900 serif leading-none tracking-tight">
              Entrust
            </span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-0.5">
              Insurance
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center space-x-8">
          <NavLink to="/" label="Home" active={location.pathname === '/'} onClick={handleLinkClick} />
          
          <Dropdown 
            label="Personal" 
            links={personalLinks} 
            active={location.pathname.startsWith('/personal')}
            isOpen={activeDropdown === 'personal'}
            onToggle={() => setActiveDropdown(activeDropdown === 'personal' ? null : 'personal')}
            onLinkClick={handleLinkClick}
            brandColor="green"
          />

          <Dropdown 
            label="Commercial" 
            links={commercialLinks} 
            active={location.pathname.startsWith('/commercial')}
            isOpen={activeDropdown === 'commercial'}
            onToggle={() => setActiveDropdown(activeDropdown === 'commercial' ? null : 'commercial')}
            onLinkClick={handleLinkClick}
            brandColor="blue"
          />

          <NavLink to="/claims" label="Claims" active={location.pathname === '/claims'} onClick={handleLinkClick} />
          <NavLink to="/tax-services" label="Tax Services" active={location.pathname === '/tax-services'} onClick={handleLinkClick} />
          <NavLink to="/bookkeeping-payroll" label="Bookkeeping & Payroll" active={location.pathname === '/bookkeeping-payroll'} onClick={handleLinkClick} />
          <NavLink to="/contact" label="Contact" active={location.pathname === '/contact'} onClick={handleLinkClick} />

          <div className="h-6 w-[1px] bg-gray-200 mx-2"></div>

          <Link 
            to="/quote" 
            onClick={handleLinkClick}
            className="group relative flex items-center space-x-2 px-6 py-3 bg-blue-700 text-white rounded-full text-[11px] font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-blue-800 hover:shadow-xl hover:shadow-blue-200 active:scale-95"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Get a Quote</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="xl:hidden text-gray-900 p-2 hover:bg-gray-100 rounded-full transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`xl:hidden fixed inset-0 top-[72px] bg-white transition-all duration-500 transform ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} overflow-y-auto z-[90]`}>
        <div className="p-8 space-y-8 pb-32">
          <Link to="/" onClick={handleLinkClick} className="block text-3xl font-bold text-gray-900 serif">Home</Link>
          <MobileSection title="Personal" links={personalLinks} brandColor="green" onSelect={handleLinkClick} />
          <MobileSection title="Commercial" links={commercialLinks} brandColor="blue" onSelect={handleLinkClick} />
          <Link to="/claims" onClick={handleLinkClick} className="block text-3xl font-bold text-gray-900 serif">Claims</Link>
          <Link to="/tax-services" onClick={handleLinkClick} className="block text-3xl font-bold text-gray-900 serif">Tax Services</Link>
          <Link to="/bookkeeping-payroll" onClick={handleLinkClick} className="block text-3xl font-bold text-gray-900 serif">Bookkeeping & Payroll</Link>
          <Link to="/contact" onClick={handleLinkClick} className="block text-3xl font-bold text-gray-900 serif">Contact</Link>
          <Link 
            to="/quote" 
            onClick={handleLinkClick}
            className="block w-full text-center bg-blue-700 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl shadow-blue-100"
          >
            Start Your Quote
          </Link>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, label, active, onClick }: any) => (
  <Link 
    to={to} 
    onClick={onClick}
    className={`relative py-2 text-[11px] font-bold uppercase tracking-widest transition-all group ${
      active ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
    }`}
  >
    {label}
    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 transition-transform duration-300 origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left ${active ? 'scale-x-100' : ''}`}></span>
  </Link>
);

const Dropdown = ({ label, links, active, isOpen, onToggle, onLinkClick, brandColor }: any) => (
  <div className="relative">
    <button 
      onClick={onToggle}
      className={`flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors ${
        active ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
      }`}
    >
      <span>{label}</span>
      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <div className={`absolute top-full left-0 mt-6 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 transform ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'}`}>
      <div className="p-3 grid gap-1">
        {links.map((link: any) => (
          <Link 
            key={link.to} 
            to={link.to} 
            onClick={onLinkClick}
            className={`px-5 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-gray-500 transition-all hover:translate-x-1 ${
              brandColor === 'green' ? 'hover:bg-green-50 hover:text-green-700' : 'hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

const MobileSection = ({ title, links, brandColor, onSelect }: any) => (
  <div className="space-y-4">
    <p className={`text-[11px] font-black uppercase tracking-widest ${brandColor === 'green' ? 'text-green-600' : 'text-blue-600'}`}>
      {title}
    </p>
    <div className="pl-4 grid gap-4">
      {links.map((l: any) => (
        <Link key={l.to} to={l.to} onClick={onSelect} className="text-xl font-medium text-gray-600 hover:text-gray-900 transition-colors">
          {l.label}
        </Link>
      ))}
    </div>
  </div>
);

export default Navbar;