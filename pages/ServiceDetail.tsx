import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, Check, ArrowLeft, ShieldCheck, Zap, Globe, AlertCircle, Building, Users, Truck, FileText, Calculator, Map, Compass } from 'lucide-react';

interface ServiceContent {
  headline: string;
  mainBody: string;
  whyMatters: string;
  solutions: { title: string; desc: string }[];
  cta?: string;
  icon?: any;
}

const ServiceDetail: React.FC<{ category: 'personal' | 'commercial' | 'financial' }> = ({ category }) => {
  const { type } = useParams<{ type: string }>();

  const isBlueCategory = category === 'commercial' || category === 'financial';
  const brandColor = isBlueCategory ? 'blue-700' : '[#006838]';
  const brandBg = isBlueCategory ? 'blue-50' : 'green-50';
  const brandBorder = isBlueCategory ? 'blue-100' : 'green-100';

  const data: Record<string, ServiceContent> = {
    'auto': {
      headline: "Auto Insurance That Keeps You Moving Forward",
      mainBody: "Your vehicle is more than transportation—it's your connection to work, family, and the things you love.",
      whyMatters: "The right policy goes beyond legal requirements. It protects you from financial devastation after an unexpected accident.",
      solutions: [
        { title: "Liability Coverage", desc: "Covers bodily injury and property damage you cause to others." },
        { title: "Collision Coverage", desc: "Pays for damage to your vehicle after an accident." },
        { title: "Comprehensive Coverage", desc: "Protects against theft, fire, and weather damage." },
        { title: "Uninsured Motorist", desc: "Protects you if hit by someone without adequate coverage." }
      ],
      icon: <Truck className="w-12 h-12" />
    },
    'homeowners': {
      headline: "Protecting Your Home Sweet Home",
      mainBody: "Your home is likely your most valuable asset and the center of your family's life.",
      whyMatters: "Weather can be severe and unpredictable. We'll ensure your policy is built to withstand modern challenges.",
      solutions: [
        { title: "Dwelling Coverage", desc: "Protects the structure from fire, wind, and storm damage." },
        { title: "Personal Property", desc: "Covers your furniture, electronics, and clothing." },
        { title: "Liability Protection", desc: "Shields you if someone is injured on your property." },
        { title: "Flood Insurance", desc: "Standard policies don't cover floods—we strongly recommend separate coverage." }
      ],
      icon: <Building className="w-12 h-12" />
    },
    'life': {
      headline: "Securing Your Family's Future, No Matter What",
      mainBody: "Life insurance isn't about you—it's about the people you love.",
      whyMatters: "If others depend on your income, you need life insurance. It replaces income, pays off debts, and funds education.",
      solutions: [
        { title: "Term Life", desc: "Affordable coverage for a specific period (10, 20, or 30 years)." },
        { title: "Whole Life", desc: "Permanent coverage that builds cash value over time." },
        { title: "Universal Life", desc: "Flexible permanent coverage that adjusts as needs change." },
        { title: "Final Expense", desc: "Designed to cover funeral costs and end-of-life expenses." }
      ],
      icon: <ShieldCheck className="w-12 h-12" />
    },
    'health': {
      headline: "Your Health Is Your Wealth—Protect Both",
      mainBody: "Quality health insurance ensures you and your family can access care without facing financial ruin.",
      whyMatters: "Medical expenses are one of the leading causes of financial hardship. We help you navigate complex plans and Medicare.",
      solutions: [
        { title: "Individual & Family Plans", desc: "Marketplace and private carrier options tailored for your household." },
        { title: "Medicare Solutions", desc: "Understanding Advantage, Supplements, and Part D." },
        { title: "Dental & Vision", desc: "Affordable plans for routine preventive care." }
      ],
      icon: <Zap className="w-12 h-12" />
    },
    'general-liability': {
      headline: "Foundation of Business Protection",
      mainBody: "General Liability Insurance is the cornerstone of every business insurance program.",
      whyMatters: "Protects your company from the most common risks: customer injuries, property damage, and advertising claims.",
      solutions: [
        { title: "Bodily Injury", desc: "Covers medical expenses and legal fees for on-premise injuries." },
        { title: "Property Damage", desc: "Covers damage your business causes to someone else's property." },
        { title: "Advertising Injury", desc: "Protection against libel, slander, or copyright infringement." }
      ],
      icon: <Building className="w-12 h-12" />
    },
    'property': {
      headline: "Protect Your Business Assets from the Unexpected",
      mainBody: "Your business property represents a significant investment of time and capital.",
      whyMatters: "Ensures building, equipment, inventory, and furnishings are protected from damage or loss.",
      solutions: [
        { title: "Building Coverage", desc: "Structure protection from fire, storms, and vandalism." },
        { title: "Personal Property", desc: "Protects equipment, furniture, and inventory." },
        { title: "Business Interruption", desc: "Replaces lost revenue during temporary closures." }
      ],
      icon: <Building className="w-12 h-12" />
    },
    'workers-comp': {
      headline: "Protect Your Employees and Your Business",
      mainBody: "Provides essential protection for both your employees and your company.",
      whyMatters: "Required for most businesses, it covers medical care and wage replacement for work-related injuries.",
      solutions: [
        { title: "Medical Expenses", desc: "Necessary treatment for work-related injuries." },
        { title: "Lost Wages", desc: "Partial wage replacement while an employee cannot work." },
        { title: "Legal Protection", desc: "Immunity from most employee lawsuits related to injuries." }
      ],
      icon: <Users className="w-12 h-12" />
    },
    'tax-filing': {
      headline: "Strategic Tax Preparation & Planning",
      mainBody: "Our financial experts provide comprehensive tax services for individuals and businesses.",
      whyMatters: "Strategic planning ensures compliance while identifying opportunities for significant savings and tax efficiency.",
      solutions: [
        { title: "Individual Returns", desc: "Precise filing for personal income tax with an emphasis on deductions." },
        { title: "Business Tax Compliance", desc: "Corporate filing, K-1s, and complex partnership structures." },
        { title: "Strategic Planning", desc: "Year-round advice to minimize future tax liabilities legally." },
        { title: "Audit Support", desc: "Professional representation and documentation for tax inquiries." }
      ],
      icon: <Calculator className="w-12 h-12" />
    },
    'travel-services': {
      headline: "Bespoke Travel Management & Services",
      mainBody: "Our travel agency arm provides world-class management for your leisure and corporate journeys.",
      whyMatters: "Exceptional travel requires expert coordination. We handle every detail, ensuring seamless experiences across the globe.",
      solutions: [
        { title: "Luxury Vacation Planning", desc: "Customized leisure travel itineraries with exclusive perks and access." },
        { title: "Corporate Travel Solutions", desc: "Efficient business travel management focused on cost and comfort." },
        { title: "International Coordination", desc: "Handling complex visa requirements, private transfers, and stays." },
        { title: "Concierge Support", desc: "24/7 assistance for travelers, ensuring peace of mind on the road." }
      ],
      icon: <Compass className="w-12 h-12" />
    }
  };

  const content = data[type || ''] || {
    headline: "Comprehensive Protection",
    mainBody: "Tailored coverage for your unique needs.",
    whyMatters: "Understanding your risks is the first step toward true security.",
    solutions: [{ title: "Custom Quote", desc: "Contact our team to speak with an agent." }]
  };

  return (
    <div className="pt-32 pb-24 animate-fade-in-up">
      <div className="max-w-7_xl mx-auto px-6">
        <Link to={`/${category}`} className={`inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-${brandColor} mb-8 md:mb-12 hover:translate-x-[-4px] transition-transform`}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to {category === 'financial' ? 'Financial Services' : category}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 md:mb-32">
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-3xl md:text-5_xl lg:text-6xl font-bold text-gray-900 serif leading-tight">{content.headline}</h1>
            <p className="text-base md:text-xl text-gray-500 font-light leading-relaxed">{content.mainBody}</p>
            <div className={`p-6 md:p-8 bg-${brandBg}/30 rounded-2_xl md:rounded-[2.5rem] border border-${brandBorder}`}>
               <h3 className="font-bold text-gray-900 mb-2 flex items-center text-sm md:text-base">
                 <AlertCircle className={`w-5 h-5 mr-2 text-${brandColor} shrink-0`} /> Why it matters
               </h3>
               <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">{content.whyMatters}</p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className={`w-full max-w-xs md:max-w-md aspect-square bg-${brandBg}/20 rounded-3_xl lg:rounded-[4rem] flex items-center justify-center p-12 md:p-20`}>
              {React.cloneElement(content.icon || <ShieldCheck />, { className: `w-full h-full text-${brandColor}` })}
            </div>
          </div>
        </div>

        <h2 className="text-2_xl md:text-3_xl font-bold serif text-gray-900 mb-8 md:mb-12 text-center">Complete Protection Strategy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-24 md:mb-32">
          {content.solutions.map((s, idx) => (
            <div key={idx} className="p-8 md:p-10 bg-white border border-gray-100 rounded-3_xl lg:rounded-[3rem] hover:shadow-xl transition-all group flex flex-col">
              <div className={`w-10 h-10 bg-${brandBg} rounded-xl flex items-center justify-center text-${brandColor} mb-6 group-hover:bg-blue-700 group-hover:text-white transition-all shrink-0`}>
                <Check className="w-5 h-5" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">{s.title}</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed flex-grow">{s.desc}</p>
            </div>
          ))}
        </div>

        <section className="bg-gray-900 rounded-3_xl lg:rounded-[4rem] p-8 md:p-16 lg:p-24 text-white text-center">
          <div className="max-w-2_xl mx-auto space-y-8 md:space-y-10">
            <h2 className="text-2_xl md:text-4_xl font-bold serif">Ready for a {category === 'financial' ? 'Consultation?' : (category === 'personal' ? 'Free Quote?' : 'Consultation?') }</h2>
            <p className={`${isBlueCategory ? 'text-blue-100/70' : 'text-green-100/70'} font-light text-base md:text-lg`}>Speak with an expert advisor who understands your unique needs.</p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center pt-4">
              <Link 
                to={category === 'personal' ? "/quote" : "/contact"} 
                className={`px-8 md:px-10 py-4 md:py-5 bg-white text-gray-900 rounded-xl md:rounded-2_xl font-bold uppercase tracking-widest text-[10px] hover:bg-${isBlueCategory ? 'blue-700' : '[#006838]'} hover:text-white transition-all`}
              >
                {category === 'personal' ? 'Get a Quote' : 'Inquire Online'}
              </Link>
              <Link to="/contact" className="px-8 md:px-10 py-4 md:py-5 border border-white/20 text-white rounded-xl md:rounded-2_xl font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServiceDetail;