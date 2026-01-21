import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, CheckCircle, FileText, PieChart, ShieldCheck, ArrowRight, UserCheck, Landmark, Briefcase, Users, Coins } from 'lucide-react';

const BookkeepingPayroll: React.FC = () => {
  const services = [
    {
      title: "Comprehensive Bookkeeping",
      icon: <FileText className="w-6 h-6" />,
      desc: "Accurate financial record-keeping for businesses of all sizes. We ensure your ledgers are audit-ready and providing valuable insights.",
      points: ["Accounts Payable/Receivable", "Bank Reconciliation", "Monthly Financial Statements", "General Ledger Maintenance"]
    },
    {
      title: "Seamless Payroll Solutions",
      icon: <Users className="w-6 h-6" />,
      desc: "Automated and compliant payroll management. We handle the complexity of withholdings, taxes, and direct deposits so you don't have to.",
      points: ["Direct Deposit Setup", "Payroll Tax Filings", "W-2 & 1099 Issuance", "Employee Benefit Tracking"]
    }
  ];

  const steps = [
    { number: "01", title: "Assessment", desc: "We evaluate your current financial workflows and identify areas for optimization." },
    { number: "02", title: "Integration", desc: "Our team sets up seamless software connections for real-time tracking." },
    { number: "03", title: "Management", desc: "Ongoing monitoring and reporting to keep your business fiscally sound." }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-6">
        <header className="max-w-4xl mb-24 md:mb-32 space-y-6">
          <div className="inline-flex items-center space-x-2 text-[#006838] font-bold uppercase tracking-[0.2em] text-[10px]">
            <Coins className="w-4 h-4" />
            <span>Fiscal Management</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 serif leading-tight">
            Bookkeeping & <br />
            <span className="text-gradient-green italic font-medium">Payroll Precision.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-2xl">
            Empower your Texas business with professional financial management. We handle the numbers so you can focus on growth and strategy.
          </p>
        </header>

        {/* Core Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          {services.map((service, idx) => (
            <div key={idx} className="p-10 md:p-16 bg-slate-50/50 rounded-[3.5rem] border border-gray-100 group hover:bg-white hover:shadow-2xl transition-all duration-700 flex flex-col h-full">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#006838] mb-8 group-hover:bg-[#006838] group-hover:text-white transition-all">
                {service.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 serif mb-6">{service.title}</h3>
              <p className="text-gray-500 font-light leading-relaxed mb-10 flex-grow">{service.desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.points.map((point, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <section className="mb-32 bg-gray-900 rounded-[4rem] p-12 md:p-24 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold serif leading-tight">Streamlined <br />Operations.</h2>
              <p className="text-green-100/60 font-light text-lg">
                Our team integrates directly with your business to provide a frictionless financial experience.
              </p>
              <Link to="/contact" className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-gray-900 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-green-600 hover:text-white transition-all">
                <span>Request a Setup Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, idx) => (
                <div key={idx} className="space-y-4">
                  <p className="text-4xl font-bold text-green-400/30 serif">{step.number}</p>
                  <h4 className="text-xl font-bold serif">{step.title}</h4>
                  <p className="text-sm text-green-100/60 font-light leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Entrust Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-[#006838] mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 serif">Tax Ready</h4>
            <p className="text-xs text-gray-400 font-light leading-relaxed px-4">Our bookkeeping is built to integrate perfectly with our Tax Services, making year-end seamless.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-[#006838] mx-auto">
              <PieChart className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 serif">Insight Driven</h4>
            <p className="text-xs text-gray-400 font-light leading-relaxed px-4">Gain a clear view of your cash flow and profitability with our custom monthly reports.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-[#006838] mx-auto">
              <Landmark className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 serif">Full Compliance</h4>
            <p className="text-xs text-gray-400 font-light leading-relaxed px-4">We stay updated on all Texas and Federal payroll regulations so you stay fully compliant.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookkeepingPayroll;