import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Star, Users, Briefcase, Shield, Globe, Zap, Gift } from 'lucide-react';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      url: "https://i.ibb.co/t0cV9QS/krakenimages-Y5bv-Rlc-Cx8k-unsplash.jpg",
      alt: "Professional Consultation"
    },
    {
      url: "https://i.ibb.co/F4JJmfGX/vivek-kumar-a-1-PPjnb-Ug-unsplash.jpg",
      alt: "Modern Business Environment"
    },
    {
      url: "https://i.ibb.co/Pz12ZYJ4/juliane-liebermann-O-RKu3-Aqnsw-unsplash.jpg",
      alt: "Family Security"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="bg-white min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -z-10 skew-x-[-12deg] translate-x-1/4"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-50 rounded-full blur-[120px] opacity-40 -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center space-x-3 px-5 py-2 rounded-full bg-white shadow-lg border border-blue-50 text-blue-700 text-[10px] font-bold tracking-[0.15em] uppercase animate-fade-in-up">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>Texas Premier Agency Since 2014</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] serif animate-reveal">
              Protection You Can <span className="text-gradient-blue italic font-medium">Trust.</span> <br />
              Guidance You Can <span className="text-gradient-blue italic font-medium">Rely On.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-light max-w-xl animate-fade-in-up delay-100">
              We help individuals, families, and businesses in Texas find the right insurance and financial solutions—without confusion or pressure.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4 animate-fade-in-up delay-200">
              <Link 
                to="/quote" 
                className="group relative px-8 py-5 bg-gray-900 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] overflow-hidden transition-all hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-200"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Start Your Quote
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link to="/contact" className="group px-8 py-5 border border-gray-200 text-gray-700 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-gray-50 transition-all text-center">
                Speak with an Expert
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="pt-8 flex items-center space-x-8 animate-fade-in-up delay-300">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Client" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-amber-400 mb-0.5">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">5.0 Rating</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative animate-scale-in delay-200">
            <div className="relative z-20">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl group aspect-[4/5] bg-gray-100">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                      index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                  >
                    <img 
                      src={slide.url} 
                      alt={slide.alt} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent"></div>
                  </div>
                ))}

                <div className="absolute bottom-8 left-8 text-white space-y-1">
                  <h3 className="text-2xl font-bold serif">Expertly Crafted.</h3>
                  <p className="text-xs text-white/80 font-light italic">Texas Gold Standard Protection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Distinction Section */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="w-12 h-0.5 bg-blue-700"></div>
              <h2 className="text-4xl font-bold text-gray-900 serif leading-tight">A Standard of Service <br /><span className="italic text-gray-400">Unmatched in DFW.</span></h2>
              <p className="text-gray-500 font-light leading-relaxed max-w-xl">
                We believe that insurance should be more than a transaction. It's a promise of protection, an insurance policy for your peace of mind.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <h4 className="font-bold text-gray-900 serif">Total Shield</h4>
                  <p className="text-xs text-gray-400">Multi-carrier strategy.</p>
                </div>
                <div className="space-y-2">
                  <Globe className="w-6 h-6 text-green-600" />
                  <h4 className="font-bold text-gray-900 serif">Local Reach</h4>
                  <p className="text-xs text-gray-400">Richardson rooted.</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Link to="/personal" className="group p-8 bg-white rounded-[2.5rem] border border-gray-100 card-hover aspect-square flex flex-col justify-between">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-700 group-hover:bg-green-600 group-hover:text-white transition-all">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold serif">Personal</h3>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Home & Auto</p>
                </div>
              </Link>
              <Link to="/commercial" className="group p-8 bg-white rounded-[2.5rem] border border-gray-100 card-hover aspect-square flex flex-col justify-between mt-8">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold serif">Business</h3>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Commercial Risk</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured CTA */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold serif leading-tight">Join the Texas Gold Standard.</h2>
          <p className="text-lg text-blue-100/60 font-light max-w-2xl mx-auto">
            Experience the professional distinction of Entrust Insurance. Our advisors are ready to audit your risks and design your safety net.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
            <Link 
              to="/quote" 
              className="group relative px-10 py-5 bg-white text-gray-900 rounded-2xl font-bold uppercase tracking-widest text-[11px] overflow-hidden transition-all hover:bg-blue-600 hover:text-white"
            >
              Get a Quote Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;