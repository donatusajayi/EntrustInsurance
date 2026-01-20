
import React from 'react';
import { ShieldCheck, PhoneCall, FileText, Send, Clock, UserCheck, AlertTriangle, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Claim: React.FC = () => {
  const steps = [
    { icon: <Clock />, title: "Rapid Intake", desc: "Our 24/7 priority response team initiates documentation within minutes." },
    { icon: <FileText />, title: "Evidence Preservation", desc: "Expert guidance on securing the scene and documenting assets immediately." },
    { icon: <UserCheck />, title: "Broker Advocacy", desc: "We manage the carrier relationship to ensure policy wording is strictly followed." },
    { icon: <ShieldCheck />, title: "Expedited Payout", desc: "Tracking every milestone to ensure capital is returned to you faster." }
  ];

  return (
    <div className="pt-32 pb-24 bg-white animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-6">
        <header className="max-w-3xl mb-32">
          <p className="text-indigo-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Concierge Advocacy</p>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 serif leading-[1.1] mb-8">Resolution is our <br /><span className="text-gray-400 italic font-medium">Top Priority.</span></h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed">
            The true value of an insurance broker is revealed at the time of a loss. Our dedicated claims concierge acts as your shield, ensuring the insurance industry fulfills its promises to you.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="mb-8 w-16 h-16 bg-gray-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 serif">{step.title}</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">{step.desc}</p>
              {idx < 3 && <div className="hidden lg:block absolute top-8 -right-4 w-8 h-[1px] bg-gray-100"></div>}
            </div>
          ))}
        </div>

        <section className="mb-40 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[9px] font-bold uppercase tracking-widest">
                 <AlertTriangle className="w-3 h-3" />
                 <span>Emergency Protocols</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold serif text-gray-900">Why the Entrust Advocate matters.</h2>
              <p className="text-lg text-gray-500 font-light leading-relaxed">Insurance companies employ adjusters to protect their interests. We employ advocates to protect yours. We ensure your claim is categorized correctly, appraised accurately, and paid out without unnecessary delays.</p>
              <ul className="space-y-4">
                 {[
                   "Dispute resolution & policy interpretation",
                   "Appraisal network coordination",
                   "Business interruption loss calculations",
                   "Temporary housing & operational relocation"
                 ].map((point, pidx) => (
                   <li key={pidx} className="flex items-start space-x-3 text-gray-600 text-sm">
                      <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                      <span>{point}</span>
                   </li>
                 ))}
              </ul>
           </div>
           <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1000" 
                className="rounded-[3.5rem] grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl h-[500px] w-full object-cover"
                alt="Advocacy"
              />
              <div className="absolute inset-0 bg-indigo-600/10 rounded-[3.5rem]"></div>
           </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-gray-50 rounded-[4rem] p-12 lg:p-24 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold serif leading-tight text-gray-900">Critical Incident <br />Support.</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <PhoneCall className="w-8 h-8 text-indigo-600" />
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Emergency Line</p>
                  <p className="text-xl font-bold text-gray-900">+1 (800) 555-TRUST</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <Send className="w-8 h-8 text-indigo-600" />
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Digital Claim Intake</p>
                  <p className="text-xl font-bold text-gray-900">claims@entrust.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-white rounded-[3rem] p-12 flex flex-col justify-center space-y-6 shadow-2xl">
              <h3 className="text-2xl font-bold serif text-gray-900">Track a Claim</h3>
              <p className="text-sm text-gray-500 font-light">Enter your reference number for real-time status updates.</p>
              <input 
                type="text" 
                placeholder="Reference # (e.g. TR-2024-001)"
                className="w-full px-6 py-4 bg-gray-50 rounded-xl outline-none border border-transparent focus:border-indigo-600 transition-all text-sm"
              />
              <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all">
                Check Progress
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Claim;
