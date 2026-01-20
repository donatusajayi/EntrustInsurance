
import React from 'react';
import { Landmark, TrendingUp, PieChart, Briefcase, Award, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Financial: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-50/30 via-white to-white animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-6">
        <header className="max-w-3xl mb-24">
          <p className="text-indigo-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Wealth Management</p>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 serif leading-[1.1] mb-8">Strategic <br /><span className="text-gray-400 italic font-medium">Capital Growth.</span></h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed">
            We offer fiduciary-standard financial planning that prioritizes tax efficiency, market resilience, and long-term accumulation.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-12 rounded-[3.5rem] shadow-xl shadow-gray-200/50 border border-gray-50 space-y-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-50 rounded-xl">
                <PieChart className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Portfolio Design</h3>
            </div>
            <p className="text-gray-500 font-light leading-relaxed">
              Custom-built investment portfolios that align with your risk tolerance while maximizing exposure to emerging growth sectors.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {['Diversification', 'Tax Loss Harvesting', 'Rebalancing', 'Sector Analysis'].map((t) => (
                <div key={t} className="flex items-center space-x-2 text-xs text-gray-400 font-bold uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 text-white p-12 rounded-[3.5rem] shadow-2xl shadow-indigo-200/20 space-y-8 relative overflow-hidden">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <Landmark className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Retirement & Estate</h3>
            </div>
            <p className="text-indigo-100/60 font-light leading-relaxed">
              Navigating the complexities of wealth preservation and generational transfer through sophisticated trust and annuity structures.
            </p>
            <Link to="/contact" className="inline-flex items-center space-x-2 text-white font-bold text-xs uppercase tracking-widest border-b border-white/20 pb-1 hover:border-white transition-all">
              <span>View Planning Options</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: <TrendingUp />, label: "Fiduciary Duty", value: "100%" },
            { icon: <Award />, label: "Avg Advisor Exp", value: "18yrs" },
            { icon: <Briefcase />, label: "AUM", value: "$4.2B" },
            { icon: <Landmark />, label: "Active Trusts", value: "3.5k" }
          ].map((item, i) => (
            <div key={i} className="text-center p-8 border border-gray-50 rounded-3xl">
              <div className="text-gray-300 mb-4 flex justify-center">{item.icon}</div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{item.value}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Financial;
