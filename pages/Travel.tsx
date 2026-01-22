import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Map, Compass, Globe, Luggage, Star, Calendar, ArrowRight, ShieldCheck, Camera } from 'lucide-react';

const Travel: React.FC = () => {
  const travelServices = [
    {
      title: "Luxury Leisure Travel",
      icon: <Luggage className="w-6 h-6" />,
      desc: "Curated vacation experiences that go beyond the ordinary. From private island retreats to cultural expeditions.",
      features: ["Five-Star Resorts", "Private Transfers", "Exclusive Access", "Personal Itineraries"]
    },
    {
      title: "Corporate Mobility",
      icon: <Globe className="w-6 h-6" />,
      desc: "Efficient, end-to-end travel management for Texas professionals and global executives.",
      features: ["VIP Airport Service", "Expense Management", "24/7 Support", "Logistics Coordination"]
    }
  ];

  const benefits = [
    { icon: <Compass />, label: "Global Network", text: "Direct connections with elite hospitality partners worldwide." },
    { icon: <ShieldCheck />, label: "Full Protection", text: "Integrated travel insurance and medical emergency coverage." },
    { icon: <Star />, label: "VIP Perks", text: "Room upgrades, early check-ins, and complimentary amenities." }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-6">
        <header className="max-w-4xl mb-24 md:mb-32 space-y-8">
          <div className="inline-flex items-center space-x-2 text-indigo-700 font-bold uppercase tracking-[0.2em] text-[10px]">
            <Plane className="w-4 h-4" />
            <span>Entrust Travel Concierge</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black serif leading-tight">
            Journeys Designed <br />
            <span className="text-gradient-blue italic font-medium">Without Limits.</span>
          </h1>
          <p className="text-lg md:text-xl text-black/70 font-light leading-relaxed max-w-2xl">
            Entrust extends its commitment to protection into the world of travel. We don't just book trips; we architect seamless global experiences.
          </p>
        </header>

        {/* Hero Image Section */}
        <section className="mb-32 relative rounded-[3rem] md:rounded-[4rem] overflow-hidden aspect-[16/7] group shadow-2xl">
           <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=2000" 
            alt="Seamless Travel" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-12 left-12 text-white max-w-lg">
            <h3 className="text-3xl font-bold serif mb-2">Elevated Exploration.</h3>
            <p className="text-sm font-light text-white/80">From DFW to any destination on the globe, we handle the complexity while you enjoy the journey.</p>
          </div>
        </section>

        {/* Core Offerings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          {travelServices.map((service, idx) => (
            <div key={idx} className="p-10 md:p-16 bg-slate-50/50 rounded-[3.5rem] border border-gray-100 flex flex-col group hover:bg-white hover:shadow-2xl transition-all duration-700">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-700 mb-8 group-hover:bg-indigo-700 group-hover:text-white transition-all">
                {service.icon}
              </div>
              <h3 className="text-3xl font-bold text-black serif mb-6">{service.title}</h3>
              <p className="text-black/60 font-light leading-relaxed mb-10">{service.desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Value Propositions */}
        <section className="py-24 bg-black rounded-[4rem] px-12 md:px-24 text-white relative overflow-hidden mb-32">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16">
              {benefits.map((benefit, i) => (
                <div key={i} className="space-y-6 text-center md:text-left">
                  <div className="text-indigo-400 w-10 h-10 mx-auto md:mx-0">
                    {React.cloneElement(benefit.icon as React.ReactElement, { className: "w-full h-full" })}
                  </div>
                  <h4 className="text-xl font-bold serif">{benefit.label}</h4>
                  <p className="text-sm text-indigo-100/60 font-light leading-relaxed">{benefit.text}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Final CTA */}
        <div className="text-center max-w-2xl mx-auto space-y-8">
           <Camera className="w-12 h-12 text-black/10 mx-auto" />
           <h2 className="text-4xl font-bold text-black serif">Your Next Chapter Awaits.</h2>
           <p className="text-black/70 font-light leading-relaxed">
             Whether planning a corporate retreat or a family milestone, our travel advisors are ready to translate your vision into a reality.
           </p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link 
              to="/contact" 
              className="px-10 py-5 bg-indigo-700 text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-indigo-800 transition-all shadow-xl shadow-indigo-100"
            >
              Consult with an Advisor
            </Link>
            <Link to="/personal/umbrella" className="px-10 py-5 border border-gray-100 text-black/60 rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-gray-50 transition-all">
              Travel Insurance
            </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Travel;