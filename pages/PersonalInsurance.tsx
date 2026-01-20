
import React from 'react';
import { Home, Car, Heart, Shield, CheckCircle, ArrowRight, Star, Gem, Lock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const PersonalInsurance: React.FC = () => {
  const solutions = [
    {
      title: "North Texas Estates",
      icon: <Home className="w-8 h-8 text-indigo-600" />,
      desc: "Elite coverage for primary estates in Highland Park, Preston Hollow, and secondary properties globally.",
      details: ["Guaranteed Replacement Cost", "Hail & Wind Mitigation", "Worldwide Liability Exposure"]
    },
    {
      title: "Luxury Auto Fleet",
      icon: <Car className="w-8 h-8 text-blue-600" />,
      desc: "Specialized protection for high-performance exotics, classic Texas muscle, and family fleets.",
      details: ["Agreed Value Valuation", "OEM Parts Replacement", "Enclosed Transportation Support"]
    },
    {
      title: "Valuables & Art",
      icon: <Gem className="w-8 h-8 text-amber-600" />,
      desc: "Bespoke scheduled coverage for fine art collections in Dallas, jewelry, and watch portfolios.",
      details: ["Worldwide Transit Cover", "Newly Acquired Item Grace", "Appraisal Support Network"]
    },
    {
      title: "Family Office Cyber",
      icon: <Lock className="w-8 h-8 text-purple-600" />,
      desc: "Protecting Dallas family members from digital extortion, identity theft, and online financial fraud.",
      details: ["Ransomware Protection", "Privacy Breach Response", "Identity Restoration Concierge"]
    }
  ];

  return (
    <div className="pt-32 pb-24 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-6">
        <header className="max-w-3xl mb-24">
          <p className="text-indigo-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Elite Personal Lines</p>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 serif leading-[1.1] mb-8">Protecting your <br /><span className="text-gray-400 italic">Private World.</span></h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed">
            Standard policies leave dangerous gaps for high-value Texas lifestyles. We specialize in the complex needs of affluent DFW families, providing integrated protection across all personal assets.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {solutions.map((sol, idx) => (
            <div key={idx} className="p-10 rounded-[3rem] bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-2xl transition-all duration-500 group">
              <div className="mb-8 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform">
                {sol.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4 serif">{sol.title}</h3>
              <p className="text-gray-500 font-light leading-relaxed mb-8">{sol.desc}</p>
              <div className="space-y-3">
                {sol.details.map((d, i) => (
                  <div key={i} className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
           <div className="lg:col-span-2 bg-gray-900 rounded-[3.5rem] p-12 lg:p-20 text-white flex flex-col justify-center">
              <h2 className="text-4xl font-bold serif mb-6">Lifestyle Excess Liability</h2>
              <p className="text-indigo-100/60 font-light mb-8 max-w-lg">Protect your net worth with excess liability limits up to $100M. We evaluate the risks inherent in Dallas-area charitable boards, social media influence, and domestic staff employment.</p>
              <Link to="/contact" className="w-fit bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all">
                 Request Liability Review
              </Link>
           </div>
           <div className="bg-indigo-50 rounded-[3.5rem] p-12 flex flex-col justify-center border border-indigo-100">
              <Star className="w-12 h-12 text-indigo-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 serif mb-4">DFW Concierge</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">Should an incident occur, you gain immediate access to our local DFW adjusters who handle every detail, from appraisals to restoration.</p>
           </div>
        </div>

        <section className="text-center py-20 border-t border-gray-100">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">Expertise Across Texas Sectors</p>
          <div className="flex flex-wrap justify-center gap-12 items-center opacity-40 grayscale font-bold text-gray-900">
             <span>RESIDENTIAL</span>
             <span>TEXAS RANCHES</span>
             <span>AVIATION</span>
             <span>MARINE</span>
             <span>PRIVATE COLLECTIONS</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PersonalInsurance;
