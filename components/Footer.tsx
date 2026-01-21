import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

const QUOTE_URL = "https://secure.consumerratequotes.com/ConsumerV2?id=64437&lob=auto+home";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-50 pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        <div className="space-y-8">
          <Link to="/" className="flex flex-col group transition-transform hover:scale-105 origin-left">
            <span className="text-2xl font-bold text-[#006838] serif tracking-tight">Entrust Insurance</span>
            <span className="text-[10px] font-bold text-black uppercase tracking-[0.2em] leading-tight">
              and Financial Services
            </span>
          </Link>
          <p className="text-gray-500 text-sm font-light leading-relaxed">
            Providing comprehensive personal and commercial insurance solutions since 2014. We are dedicated to professional service and protecting what matters most to our clients.
          </p>
          <div className="flex space-x-4">
            <SocialLink 
              icon={<Facebook />} 
              href="https://www.facebook.com/share/1BoHSjyyFs/?mibextid=wwXIfr" 
            />
            <SocialLink icon={<Instagram />} href="#" />
          </div>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-8 uppercase tracking-widest text-[10px]">Personal</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-light">
            <li><Link to="/personal/auto" className="hover:text-[#006838] transition-colors">Auto Insurance</Link></li>
            <li><Link to="/personal/homeowners" className="hover:text-[#006838] transition-colors">Home Insurance</Link></li>
            <li><Link to="/personal/life" className="hover:text-[#006838] transition-colors">Life Insurance</Link></li>
            <li><Link to="/personal/health" className="hover:text-[#006838] transition-colors">Health Insurance</Link></li>
            <li><Link to="/personal" className="hover:text-[#006838] transition-colors">Renters Insurance</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-8 uppercase tracking-widest text-[10px] text-blue-800">Commercial</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-light">
            <li><Link to="/commercial/general-liability" className="hover:text-blue-700 transition-colors">General Liability</Link></li>
            <li><Link to="/commercial/property" className="hover:text-blue-700 transition-colors">Commercial Property</Link></li>
            <li><Link to="/commercial/workers-comp" className="hover:text-blue-700 transition-colors">Workers' Comp</Link></li>
            <li><Link to="/commercial/bop" className="hover:text-blue-700 transition-colors">Business Owners Policy</Link></li>
            <li><Link to="/bookkeeping-payroll" className="hover:text-blue-700 transition-colors font-semibold">Bookkeeping & Payroll</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-8 uppercase tracking-widest text-[10px]">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-light">
            <li><a href={QUOTE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors font-semibold">Get a Quote</a></li>
            <li><Link to="/tax-services" className="hover:text-blue-700 transition-colors">Tax Services</Link></li>
            <li><Link to="/travel" className="hover:text-blue-700 transition-colors">Travel Services</Link></li>
            <li><Link to="/claims" className="hover:text-[#006838] transition-colors">File a Claim</Link></li>
            <li><Link to="/contact" className="hover:text-[#006838] transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-32 pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
        <p>© 2025 Entrust Insurance and Financial Services. All Rights Reserved.</p>
        <div className="flex space-x-8">
          <Link to="/privacy" className="hover:text-blue-700">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-blue-700">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon, href }: { icon: any, href: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white transition-all"
  >
    {React.cloneElement(icon, { size: 18 })}
  </a>
);

export default Footer;