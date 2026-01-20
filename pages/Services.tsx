
import React from 'react';
import { Shield, Home, Car, Heart, Briefcase, Landmark, Globe, Check, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const serviceList = [
    {
      title: "Life & Legacy",
      desc: "More than just coverage; we build financial bridges for the next generation through sophisticated term and universal life structures.",
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      features: ["Wealth Transfer", "Income Replacement", "Custom Trusts", "Final Expense"],
      category: "Individual"
    },
    {
      title: "Estate & Property",
      desc: "Concierge-level protection for primary residences, secondary homes, and high-value private collections worldwide.",
      icon: <Home className="w-6 h-6 text-indigo-500" />,
      features: ["Fine Art Riders", "Flood & Disaster", "Elite Liability", "Jewelry Coverage"],
      category: "Individual"
    },
    {
      title: "Business Liability",
      desc: "Robust risk mitigation for modern enterprises, from general liability to executive protection and cyber security.",
      icon: <Briefcase className="w-6 h-6 text-amber-500" />,
      features: ["E&O Protection", "Cyber Defense", "Workplace Safety", "Director Liability"],
      category: "Corporate"
    },
    {
      title: "Wealth Growth",
      desc: "Fiduciary financial planning focused on tax efficiency, market resilience, and long-term accumulation.",
      icon: <Landmark className="w-6 h-6 text-emerald-500" />,
      features: ["401(k) Rollovers", "Tax Planning", "Portfolio Risk", "Retirement Income"],
      category: "Advisory"
    },
    {
      title: "Auto & Mobility",
      desc: "Specialized coverage for luxury fleets, collector vehicles, and comprehensive liability for modern mobility.",
      icon: <Car className="w-6 h-6 text-blue-500" />,
      features: ["Collector Valuation", "Agreed Value", "Nationwide Towing", "Rental Luxury"],
      category: "Individual"
    },
    {
      title: "Cyber Security",
      desc: "In an interconnected world, we protect your digital assets and identity from evolving global threats.",
      icon: <Shield className="w-6 h-6 text-purple-500" />,
      features: ["ID Theft Restore", "Digital Assets", "Family Online", "Privacy Guard"],
      category: "Technical"
    }
  ];

  return (
    <div className="pt-32 pb-24 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-6">
        <header className="max-w-3xl mb-32 space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold tracking-widest uppercase mb-4">
            Our Expertise
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 serif leading-[1.1]">Precision <br /><span className="text-gray-400 italic">Financial Design.</span></h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl">
            At Entrust, we believe that complexity requires clarity. We dissect the finest details of your risk profile to engineer the most efficient protection possible.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {serviceList.map((service, index) => (
            <div key={index} className="group p-8 bg-white border border-gray-100 rounded-[2.5rem] hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
               <div className="absolute top-6 right-8 text-[9px] font-black uppercase tracking-widest text-gray-200 group-hover:text-indigo-200">
                {service.category}
              </div>
              
              <div className="p-4 bg-gray-50 rounded-2xl w-fit mb-8 group-hover:bg-indigo-50 transition-colors">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light mb-8 flex-grow">{service.desc}</p>
              
              <div className="space-y-3 mb-10">
                {service.features.map((f, i) => (
                  <div key={i} className="flex items-center text-xs text-gray-400 font-medium">
                    <Check className="w-3.5 h-3.5 text-indigo-500 mr-2" />
                    {f}
                  </div>
                ))}
              </div>

              <Link to="/contact" className="group/btn flex items-center justify-between w-full p-4 bg-gray-50 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-900 hover:bg-gray-900 hover:text-white transition-all">
                Learn Details
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* Global Reach Highlight */}
        <section className="mt-40 p-12 md:p-24 bg-gray-900 rounded-[4rem] text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="lg:w-1/2 space-y-8">
              <div className="flex items-center space-x-3 text-indigo-400 text-xs font-bold tracking-[0.3em] uppercase">
                <Globe className="w-4 h-4" />
                <span>Global Intelligence</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold serif leading-tight">National Reach, <br />Personalized Local Care.</h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                While our perspective is global, our service is deeply personal. We operate with a network of specialized adjusters and investigators in all 50 states to ensure your response is immediate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-indigo-400 hover:text-white transition-all">
                  Get Started
                </button>
                <button className="border border-white/20 px-8 py-4 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-white/10 transition-all">
                  Claims Portal
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-12">
              <StatItem value="99.9%" label="Claim Fulfillment" />
              <StatItem value="25k+" label="Policies Issued" />
              <StatItem value="140+" label="Global Partners" />
              <StatItem value="15m" label="Average Response" />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        </section>
      </div>
    </div>
  );
};

const StatItem = ({ value, label }: { value: string, label: string }) => (
  <div className="space-y-2">
    <p className="text-4xl md:text-5xl font-bold tracking-tighter">{value}</p>
    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{label}</p>
  </div>
);

export default Services;
