import React from 'react';
import { Link } from 'react-router-dom';
import { Building, ShieldAlert, Zap, Users, Truck, Award, ShieldCheck, Settings, Landmark, FileText, Globe, Shield, Phone } from 'lucide-react';

const CommercialMain: React.FC = () => {
  const industries = [
    "Texas Retail & Dining", "Professional Services", "DFW Contractors", "Healthcare", "Technology", "Manufacturing", "Lone Star Real Estate"
  ];

  const solutions = [
    { icon: <ShieldAlert />, title: 'General Liability', desc: 'Fundamental protection against 3rd-party claims.' },
    { icon: <Building />, title: 'Commercial Property', desc: 'Protects your building, equipment, and inventory.' },
    { icon: <ShieldCheck />, title: 'Business Owners Policy', desc: 'Cost-effective package combining GL and Property.' },
    { icon: <Truck />, title: 'Commercial Auto', desc: 'Coverage for single work trucks to entire fleets.' },
    { icon: <Users />, title: 'Workers’ Comp', desc: 'Essential protection for your employees in the Texas workforce.' },
    { icon: <Award />, title: 'Professional Liability', desc: 'E&O protection for services and advice.' },
    { icon: <Zap />, title: 'Cyber Liability', desc: 'Defense against data breaches and cyber attacks.' },
    { icon: <Shield />, title: 'Commercial Umbrella', desc: 'Extra liability extending beyond primary policies.' },
    { icon: <Settings />, title: 'Equipment Breakdown', desc: 'Covers repair costs for essential failed equipment.' },
    { icon: <Landmark />, title: 'Business Interruption', desc: 'Replaces lost income during temporary closures.' },
    { icon: <Users />, title: 'EPLI', desc: 'Protection against employment-related claims.' },
    { icon: <FileText />, title: 'Directors & Officers', desc: 'Protects leadership from decision-based liability.' },
    { icon: <Globe />, title: 'Bonds & Surety', desc: 'Contract and license bonds for specific projects.' }
  ];

  return (
    <div className="pt-32 pb-24 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-6">
        <header className="max-w-4xl mb-16 md:mb-24 space-y-6">
          <h1 className="text-4xl md:text-5_xl lg:text-7xl font-bold text-gray-900 serif leading-[1.1]">Securing the <br /><span className="text-blue-700 italic">Texas Economy.</span></h1>
          <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
            You've built your business in one of the most dynamic economies in the world. At Entrust Insurance, we provide comprehensive commercial solutions that safeguard your operations across DFW.
          </p>
        </header>

        <section className="mb-16 md:mb-32">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-8 md:mb-10">Industries We Serve Across Texas</p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {industries.map(i => (
              <span key={i} className="px-4 md:px-6 py-2 md:py-3 bg-blue-50/50 rounded-full text-[10px] md:text-xs font-bold text-blue-800 border border-blue-100 whitespace-nowrap">{i}</span>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-24 md:mb-40">
          {solutions.map((cat, idx) => (
            <div key={idx} className="p-6 md:p-8 bg-white border border-gray-100 rounded-3xl lg:rounded-[2.5rem] hover:shadow-xl transition-all duration-500 flex flex-col shadow-sm group">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-700 mb-6 group-hover:bg-blue-700 group-hover:text-white transition-all">
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{cat.title}</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed flex-grow">{cat.desc}</p>
            </div>
          ))}
        </div>

        {/* Simplified CTA Section */}
        <section className="py-16 md:py-24 text-center bg-blue-50 rounded-[3rem] border border-blue-100">
          <div className="max-w-3_xl mx-auto px-6 space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 serif">Secure your DFW business future.</h2>
            <p className="text-gray-500 font-light text-base md:text-lg">
              Tailored commercial strategies for Texas enterprises. Our independent advisors find the coverage that fits your specific regional industry risks.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                to="/quote" 
                className="w-full sm:w-auto bg-blue-700 text-white px-10 py-5 rounded-2_xl font-bold uppercase tracking-widest text-[11px] hover:bg-blue-800 transition-all shadow-xl shadow-blue-100/50"
              >
                Get a Quote
              </Link>
              <a 
                href="tel:4692649199" 
                className="w-full sm:w-auto flex items-center justify-center space-x-2 border border-blue-200 bg-white text-blue-800 px-10 py-5 rounded-2_xl font-bold uppercase tracking-widest text-[11px] hover:bg-blue-50 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call an Agent</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CommercialMain;