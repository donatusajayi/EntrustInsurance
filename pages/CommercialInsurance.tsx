
import React from 'react';
import { Briefcase, ShieldAlert, Users, Zap, CheckCircle, ArrowRight, Building, Laptop, Truck, HeartPulse, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommercialInsurance: React.FC = () => {
  const industries = [
    { title: "Real Estate", icon: <Building className="w-6 h-6" />, desc: "Mixed-use developments, corporate office parks, and multi-family assets across Texas." },
    { title: "DFW Technology", icon: <Laptop className="w-6 h-6" />, desc: "Fintech, defense, and emerging tech liability for the Silicon Prairie corridor." },
    { title: "Texas Logistics", icon: <Truck className="w-6 h-6" />, desc: "Intermodal supply chain, marine cargo, and fleet protection for the Texas hub." },
    { title: "Healthcare", icon: <HeartPulse className="w-6 h-6" />, desc: "Clinical trials and operational risk for North Texas medical networks." }
  ];

  const solutions = [
    {
      title: "Executive Liability",
      icon: <ShieldAlert className="w-8 h-8 text-indigo-600" />,
      desc: "Comprehensive D&O, E&O, and EPLI structures for DFW corporate governance.",
      details: ["Director Protection", "Fiduciary Liability", "Side-A Difference in Conditions"]
    },
    {
      title: "Cyber Resilience",
      icon: <Zap className="w-8 h-8 text-purple-600" />,
      desc: "Advanced business interruption, ransomware response, and data privacy for digital enterprises.",
      details: ["Social Engineering", "Regulatory Defense", "Network Interruption Loss"]
    },
    {
      title: "Operational Assets",
      icon: <Briefcase className="w-8 h-8 text-amber-600" />,
      desc: "Insuring the physical engines of your business—from equipment to inventory.",
      details: ["Stock Throughput", "Business Income Cover", "Boiler & Machinery"]
    },
    {
      title: "Human Capital",
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      desc: "Workers' compensation and employer liability tailored for Texas industrial environments.",
      details: ["Experience Mod Audit", "Safety Program Review", "Managed Care Networks"]
    }
  ];

  return (
    <div className="pt-32 pb-24 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-6">
        <header className="max-w-4xl mb-24">
          <p className="text-amber-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Commercial Risk Management</p>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 serif leading-[1.1] mb-8">Enterprise <br /><span className="text-gray-400 italic">Resilience.</span></h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed">
            In the booming Texas economy, business risk is a moving target. We provide dynamic, data-driven insurance strategies that empower DFW companies to scale without fear.
          </p>
        </header>

        {/* Industry Focus Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
           {industries.map((ind, idx) => (
             <div key={idx} className="p-8 bg-white border border-gray-100 rounded-3xl hover:shadow-xl transition-all">
                <div className="text-indigo-600 mb-4">{ind.icon}</div>
                <h4 className="font-bold text-gray-900 mb-2">{ind.title}</h4>
                <p className="text-xs text-gray-500 font-light leading-relaxed">{ind.desc}</p>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {solutions.map((sol, idx) => (
            <div key={idx} className="p-10 rounded-[3rem] bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-2xl transition-all duration-500">
              <div className="mb-8 p-4 bg-white rounded-2xl w-fit shadow-sm">
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

        <div className="bg-gray-900 rounded-[4rem] p-12 lg:p-24 text-white relative overflow-hidden text-center lg:text-left">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold serif leading-tight">Institutional <br />Advocacy in Dallas.</h2>
              <p className="text-indigo-100/60 font-light text-lg">We represent our Texas-based clients as institutional-grade partners when negotiating with the global reinsurance markets.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                 <Link to="/contact" className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-amber-400 hover:text-white transition-all">
                   Request Commercial Audit
                 </Link>
                 <Link to="/claim" className="border border-white/20 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">
                   Carrier Support
                 </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { label: "Policy Benchmarking", value: "Q1 2024" },
                   { label: "Market Access", value: "GLOBAL" },
                   { label: "Loss Control", value: "TEXAS-WIDE" },
                   { label: "Claims Response", value: "< 2HRS" }
                 ].map((stat, sidx) => (
                   <div key={sidx} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-xl font-bold">{stat.value}</p>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialInsurance;
