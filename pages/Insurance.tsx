
import React from 'react';
import { Shield, Home, Car, Heart, ShieldAlert, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Insurance: React.FC = () => {
  const categories = [
    {
      title: "Property & Asset",
      icon: <Home className="w-8 h-8 text-indigo-600" />,
      desc: "Elite coverage for luxury estates, primary residences, and valuable private collections.",
      features: ["Fine Art Riders", "Flood & Liability", "Secondary Home Coverage"]
    },
    {
      title: "Life & Health",
      icon: <Heart className="w-8 h-8 text-rose-600" />,
      desc: "Sophisticated health networks and generational life protection tailored to your family's needs.",
      features: ["Term & Whole Life", "Concierge Health", "Disability Income"]
    },
    {
      title: "Auto & Marine",
      icon: <Car className="w-8 h-8 text-blue-600" />,
      desc: "Comprehensive protection for collector fleets, luxury vehicles, and maritime assets.",
      features: ["Agreed Value", "Nationwide Concierge", "Elite Marine Liability"]
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-6">
        <header className="max-w-3xl mb-24">
          <p className="text-indigo-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Core Protection</p>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 serif leading-[1.1] mb-8">Insurance for <br /><span className="text-gray-400 italic font-medium">Modern Risks.</span></h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed">
            In an era of unpredictability, our insurance solutions provide the bedrock of security your lifestyle demands.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {categories.map((cat, idx) => (
            <div key={idx} className="p-10 rounded-[3rem] bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-2xl transition-all duration-500 group">
              <div className="mb-8 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{cat.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light mb-8">{cat.desc}</p>
              <ul className="space-y-4">
                {cat.features.map((f, i) => (
                  <li key={i} className="flex items-center text-xs text-gray-400 font-medium">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <section className="mt-32 p-12 bg-gray-900 rounded-[4rem] text-white flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold serif">Unsure what coverage you need?</h2>
            <p className="text-gray-400 font-light">Schedule a 15-minute consultation with a senior protection advisor to audit your existing policies.</p>
          </div>
          <Link to="/contact" className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-indigo-400 hover:text-white transition-all whitespace-nowrap">
            Schedule Audit
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Insurance;
