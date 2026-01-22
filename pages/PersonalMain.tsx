import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Home, Shield, Umbrella, Heart, Activity, ArrowRight, ShieldCheck } from 'lucide-react';

const PersonalMain: React.FC = () => {
  const categories = [
    { 
      icon: <Car className="w-6 h-6" />, 
      title: 'Auto Insurance', 
      desc: 'Sophisticated coverage for private fleets and high-performance vehicles across Texas.',
      detail: 'Standard & Specialty Carriers',
      type: 'auto'
    },
    { 
      icon: <Home className="w-6 h-6" />, 
      title: 'Homeowners', 
      desc: 'Protecting premium North Texas estates from severe weather, hail, and structural damage.',
      detail: 'High-Value Asset Protection',
      type: 'homeowners'
    },
    { 
      icon: <Umbrella className="w-6 h-6" />, 
      title: 'Umbrella Liability', 
      desc: 'An essential layer of secondary protection for your family’s global assets and net worth.',
      detail: 'Extended Liability Limits',
      type: 'umbrella'
    },
    { 
      icon: <Heart className="w-6 h-6" />, 
      title: 'Life & Legacy', 
      desc: 'Meticulously planned life insurance structures designed to safeguard your family’s future.',
      detail: 'Generational Wealth Planning',
      type: 'life'
    },
    { 
      icon: <Activity className="w-6 h-6" />, 
      title: 'Health & Wellness', 
      desc: 'Direct access to premier medical networks and custom individual or family health strategies.',
      detail: 'Individual & Family Plans',
      type: 'health'
    },
    { 
      icon: <Shield className="w-6 h-6" />, 
      title: 'Condo & Tenant', 
      desc: 'Elegant protection for modern urban living, filling critical gaps in HOA master policies.',
      detail: 'Renters & Condo Coverage',
      type: 'condo'
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <header className="max-w-3xl mb-16 space-y-6">
           <div className="inline-flex items-center space-x-2 text-green-700 font-bold uppercase tracking-[0.2em] text-[10px] animate-fade-in-up">
             <ShieldCheck className="w-4 h-4" />
             <span>Personal Asset Protection</span>
           </div>
          <h1 className="text-4xl md:text-6xl font-bold text-black serif leading-tight animate-reveal">Texas <br /><span className="text-gradient-green italic font-medium">Lifestyles Secured.</span></h1>
          <p className="text-lg text-black/70 font-light leading-relaxed animate-fade-in-up delay-100">
            You've built a life of distinction. Our personal protection plans are designed to scale with your family’s success.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              to={`/personal/${cat.type}`}
              className="group p-8 bg-slate-50/50 rounded-[2.5rem] border border-gray-100 card-hover flex flex-col hover:bg-white animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-green-700 mb-6 group-hover:bg-green-700 group-hover:text-white transition-all">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-black serif mb-3">{cat.title}</h3>
              <p className="text-xs text-black/60 font-light leading-relaxed mb-6 flex-grow">{cat.desc}</p>
              
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
                <span className="text-[9px] font-black uppercase tracking-widest text-green-700">{cat.detail}</span>
                <ArrowRight className="w-3 h-3 text-black/20 group-hover:text-green-700 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <section className="relative py-20 rounded-[3rem] overflow-hidden bg-black text-center">
          <div className="relative z-10 max-w-2xl mx-auto px-6 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white serif">Secure your legacy today.</h2>
            <p className="text-base text-white/60 font-light">
              Our independent advisors compare elite carriers to find the perfect fit for your Texas residence and vehicles.
            </p>
            <div className="pt-4">
              <Link 
                to="/quote" 
                className="inline-block bg-white text-gray-900 px-10 py-5 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-green-700 hover:text-white transition-all shadow-xl"
              >
                Start Your Quote
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PersonalMain;