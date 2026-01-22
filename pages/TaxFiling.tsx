import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, CheckCircle, FileText, PieChart, ShieldCheck, ArrowRight, UserCheck, Landmark } from 'lucide-react';

const TaxServices: React.FC = () => {
  const services = [
    {
      title: "Individual Tax Planning",
      icon: <FileText className="w-6 h-6" />,
      desc: "Tailored preparation for individuals and high-net-worth families, focusing on maximum deductions and long-term wealth preservation.",
      points: ["W-2 & 1099 Filing", "Investment Income", "Real Estate Deductions", "Generational Planning"]
    },
    {
      title: "Business Compliance",
      icon: <Landmark className="w-6 h-6" />,
      desc: "Comprehensive tax solutions for Texas enterprises, from small businesses to complex corporate structures.",
      points: ["Corporate Returns", "K-1 Preparation", "Sales Tax Compliance", "Payroll Tax Strategy"]
    }
  ];

  const steps = [
    { number: "01", title: "Review", desc: "We analyze your previous year's filings and current financial landscape." },
    { number: "02", title: "Strategize", desc: "Our advisors identify opportunities for tax efficiency and future savings." },
    { number: "03", title: "Finalize", desc: "Electronic filing with the IRS and State of Texas with absolute precision." }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-6">
        <header className="max-w-4xl mb-24 md:mb-32 space-y-6">
          <div className="inline-flex items-center space-x-2 text-blue-700 font-bold uppercase tracking-[0.2em] text-[10px]">
            <Calculator className="w-4 h-4" />
            <span>Fiduciary Standards</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black serif leading-tight">
            Strategic <br />
            <span className="text-gradient-blue italic font-medium">Tax Services.</span>
          </h1>
          <p className="text-lg md:text-xl text-black/70 font-light leading-relaxed max-w-2xl">
            Beyond insurance, we provide the fiscal clarity needed to navigate the complexities of tax season. Precision services for modern Texas lifestyles and growing enterprises.
          </p>
        </header>

        {/* Core Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          {services.map((service, idx) => (
            <div key={idx} className="p-10 md:p-16 bg-slate-50/50 rounded-[3.5rem] border border-gray-100 group hover:bg-white hover:shadow-2xl transition-all duration-700 flex flex-col h-full">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-700 mb-8 group-hover:bg-blue-700 group-hover:text-white transition-all">
                {service.icon}
              </div>
              <h3 className="text-3xl font-bold text-black serif mb-6">{service.title}</h3>
              <p className="text-black/60 font-light leading-relaxed mb-10 flex-grow">{service.desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.points.map((point, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-black/40">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <section className="mb-32 bg-black rounded-[4rem] p-12 md:p-24 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold serif leading-tight">A Seamless <br />Experience.</h2>
              <p className="text-blue-100/60 font-light text-lg">
                We've redesigned the tax process to be as professional and stress-free as our premier insurance products.
              </p>
              <Link to="/contact" className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-gray-900 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-400 hover:text-white transition-all">
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, idx) => (
                <div key={idx} className="space-y-4">
                  <p className="text-4xl font-bold text-blue-400/30 serif">{step.number}</p>
                  <h4 className="text-xl font-bold serif">{step.title}</h4>
                  <p className="text-sm text-blue-100/60 font-light leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Entrust Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-700 mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-black serif">Audit Ready</h4>
            <p className="text-xs text-black/40 font-light leading-relaxed px-4">Our documentation standards are built to withstand federal and state level scrutiny.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-700 mx-auto">
              <UserCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-black serif">Expert Review</h4>
            <p className="text-xs text-black/40 font-light leading-relaxed px-4">Every return is reviewed by a senior tax advisor to ensure no opportunity is missed.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-700 mx-auto">
              <PieChart className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-black serif">Tax Efficient</h4>
            <p className="text-xs text-black/40 font-light leading-relaxed px-4">We structure your finances to minimize future liability through legal tax-advantaged strategies.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxServices;