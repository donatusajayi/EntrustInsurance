import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, Check, ArrowLeft, ShieldCheck, Zap, Globe, AlertCircle, Building, Users, Truck, Calculator, Compass, Umbrella, Heart, Activity, ShieldAlert, Award } from 'lucide-react';

interface ServiceContent {
  headline: string;
  mainBody: string;
  whyMatters: string;
  solutions: { title: string; desc: string }[];
  icon: React.ReactNode;
}

const ServiceDetail: React.FC<{ category: 'personal' | 'commercial' | 'financial' }> = ({ category }) => {
  const { type } = useParams<{ type: string }>();

  const isBlueCategory = category === 'commercial' || category === 'financial';

  const styles = {
    text: isBlueCategory ? 'text-blue-700' : 'text-[#006838]',
    bg: isBlueCategory ? 'bg-blue-50' : 'bg-green-50',
    border: isBlueCategory ? 'border-blue-100' : 'border-green-100',
    hover: isBlueCategory ? 'hover:bg-blue-700' : 'hover:bg-[#006838]'
  };

  const data: Record<string, ServiceContent> = {
    'auto': {
      headline: "Auto Insurance Built for Texas Roads",
      mainBody: "Your commute across North Texas deserves more than just a standard policy. We provide high-limit liability and specialized coverage for modern mobility.",
      whyMatters: "Texas law requires liability, but that's just the baseline. True protection covers you against uninsured drivers and severe weather damage.",
      solutions: [
        { title: "Standard Liability", desc: "Covers bodily injury and property damage you cause to others." },
        { title: "Collision & Comprehensive", desc: "Protects your vehicle from accidents, hail, and theft." },
        { title: "Uninsured Motorist", desc: "Essential for North Texas, covering you if someone else is underinsured." }
      ],
      icon: <Truck className="w-12 h-12" />
    },
    'homeowners': {
      headline: "Safeguarding Your North Texas Estate",
      mainBody: "Your home is your sanctuary. From Richardson to Plano, we help protect local property values against unique regional risks.",
      whyMatters: "Hail and wind damage are frequent in DFW. We ensure your policy has appropriate deductibles and full replacement cost for roofs.",
      solutions: [
        { title: "Dwelling Coverage", desc: "Rebuild your home at today's construction costs." },
        { title: "Personal Property", desc: "Scheduled coverage for jewelry, fine art, and electronics." },
        { title: "Liability Protection", desc: "Shields your global assets if someone is injured on your land." }
      ],
      icon: <Building className="w-12 h-12" />
    },
    'life': {
      headline: "Securing the Legacy of Your Family",
      mainBody: "Insurance is not for you—it's for the people who matter most. We design term and permanent structures for lifelong peace of mind.",
      whyMatters: "Life insurance provides the immediate capital your family needs to maintain their lifestyle after a loss.",
      solutions: [
        { title: "Term Life", desc: "Pure protection for 10, 20, or 30 years at very affordable rates." },
        { title: "Whole Life", desc: "Permanent protection that builds guaranteed cash value." },
        { title: "Universal Life", desc: "Flexible coverage that adapts as your financial goals evolve." }
      ],
      icon: <Heart className="w-12 h-12" />
    },
    'health': {
      headline: "Strategic Health Coverage & Medicare",
      mainBody: "Navigating the modern healthcare landscape requires expert guidance. We help you find plans that match your doctors and your budget.",
      whyMatters: "Medical debt is the leading cause of financial distress. Proper planning ensures access to the best Texas medical networks.",
      solutions: [
        { title: "Individual & Family", desc: "Off-marketplace and private plans tailored for your household." },
        { title: "Medicare Advantage", desc: "Optimizing your benefits when you reach age 65." },
        { title: "Dental & Vision", desc: "Essential supplemental care for your overall wellness." }
      ],
      icon: <Activity className="w-12 h-12" />
    },
    'umbrella': {
      headline: "The Ultimate Layer of Asset Protection",
      mainBody: "In a litigious world, your standard auto and home limits might not be enough. Umbrella insurance extends your protection by millions.",
      whyMatters: "A single major accident can exceed your primary policy. Umbrella protection ensures your savings and future earnings stay yours.",
      solutions: [
        { title: "Extended Liability", desc: "Limits starting at $1M extending up to $50M+." },
        { title: "Worldwide Coverage", desc: "Protection that travels with you anywhere in the world." },
        { title: "Defense Cost Coverage", desc: "Legal fees are covered outside of your limit." }
      ],
      icon: <Umbrella className="w-12 h-12" />
    },
    'general-liability': {
      headline: "Institutional Business Protection",
      mainBody: "Protect your commercial enterprise from common legal threats. Our General Liability plans are built for the Texas business environment.",
      whyMatters: "A single customer slip or property damage claim can disrupt your operations. We ensure you stay resilient.",
      solutions: [
        { title: "Bodily Injury", desc: "Medical expenses for guests injured on your premises." },
        { title: "Property Damage", desc: "Damage caused by your business to third-party assets." },
        { title: "Personal Injury", desc: "Protection against libel, slander, and copyright claims." }
      ],
      icon: <Building className="w-12 h-12" />
    },
    'property': {
      headline: "Commercial Property Safeguards",
      mainBody: "Your physical assets are the engine of your business. We protect your buildings, inventory, and equipment against Texas-scale risks.",
      whyMatters: "Replacement costs are rising. We audit your valuations to ensure you aren't underinsured.",
      solutions: [
        { title: "Replacement Cost", desc: "Ensures you can rebuild at today's market prices." },
        { title: "Equipment Breakdown", desc: "Covers mechanical and electrical failure costs." },
        { title: "Business Income", desc: "Replaces revenue lost while your property is being restored." }
      ],
      icon: <Building className="w-12 h-12" />
    },
    'workers-comp': {
      headline: "Texas Workers' Compensation Expertise",
      mainBody: "Protect your employees and your balance sheet. We manage the complexities of work-related injury coverage for DFW employers.",
      whyMatters: "Providing medical care and wage replacement is essential for maintaining a loyal, productive workforce.",
      solutions: [
        { title: "Medical Benefits", desc: "Full coverage for workplace-related treatments." },
        { title: "Wage Replacement", desc: "Financial support for staff during their recovery." },
        { title: "Safety Program Audit", desc: "Helping you reduce premiums through better safety protocols." }
      ],
      icon: <Users className="w-12 h-12" />
    },
    'bop': {
      headline: "Business Owners Policy (BOP)",
      mainBody: "Ideal for small to mid-sized businesses, combining critical coverages into one streamlined package.",
      whyMatters: "Combining Liability and Property coverage is more cost-effective and ensures there are no gaps in your basic business protection.",
      solutions: [
        { title: "Combined Liability", desc: "Covers common risks like slips, falls, and advertising injury." },
        { title: "Content Coverage", desc: "Protects your office equipment, inventory, and furniture." },
        { title: "Business Income", desc: "Provides cash flow if your operations are halted by a covered loss." }
      ],
      icon: <ShieldAlert className="w-12 h-12" />
    },
    'professional-liability': {
      headline: "Professional Liability (E&O)",
      mainBody: "Protect your expertise. Errors and Omissions coverage is vital for anyone providing professional advice or services.",
      whyMatters: "Even if you did nothing wrong, defending against a claim of professional negligence can be financially draining.",
      solutions: [
        { title: "Negligence Defense", desc: "Covers legal fees and settlements resulting from service errors." },
        { title: "Copyright Infringement", desc: "Protection against claims of unintentional intellectual property use." },
        { title: "Cyber Extension", desc: "Optional coverage for data breaches related to professional services." }
      ],
      icon: <Award className="w-12 h-12" />
    }
  };

  const content = data[type || ''] || {
    headline: "Professional Insurance Solutions",
    mainBody: "Our team provides tailored risk management strategies for individuals and business leaders throughout Texas.",
    whyMatters: "Every client faces a unique set of risks. We audit your existing coverage to find gaps and optimize your protection.",
    solutions: [
      { title: "Expert Consultation", desc: "Speak with a licensed advisor today to review your requirements." },
      { title: "Carrier Comparison", desc: "We compare multiple top-rated carriers to ensure you get optimal value." }
    ],
    icon: <ShieldCheck className="w-12 h-12" />
  };

  return (
    <div className="pt-32 pb-24 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-6">
        <Link to={`/${category}`} className={`inline-flex items-center text-[10px] font-bold uppercase tracking-widest ${styles.text} mb-12 hover:translate-x-[-4px] transition-transform`}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to {category}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-black serif leading-tight">{content.headline}</h1>
            <p className="text-xl text-black/70 font-light leading-relaxed">{content.mainBody}</p>
            <div className={`p-8 ${styles.bg} bg-opacity-30 rounded-[2.5rem] border ${styles.border}`}>
               <h3 className="font-bold text-black mb-2 flex items-center">
                 <AlertCircle className={`w-5 h-5 mr-2 ${styles.text}`} /> The Distinction
               </h3>
               <p className="text-sm text-black/60 font-light leading-relaxed">{content.whyMatters}</p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className={`w-full max-w-md aspect-square ${styles.bg} bg-opacity-20 rounded-[4rem] flex items-center justify-center p-20`}>
              {React.cloneElement(content.icon as React.ReactElement, { className: `w-full h-full ${styles.text}` })}
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold serif text-black mb-12 text-center">Core Protection Strategies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {content.solutions.map((s, idx) => (
            <div key={idx} className="p-10 bg-white border border-gray-100 rounded-[3rem] hover:shadow-xl transition-all group flex flex-col h-full">
              <div className={`w-10 h-10 ${styles.bg} rounded-xl flex items-center justify-center ${styles.text} mb-6 group-hover:bg-blue-700 group-hover:text-white transition-all`}>
                <Check className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-black mb-4">{s.title}</h3>
              <p className="text-black/60 text-sm font-light leading-relaxed flex-grow">{s.desc}</p>
            </div>
          ))}
        </div>

        <section className="bg-black rounded-[4rem] p-16 lg:p-24 text-white text-center">
          <div className="max-w-2xl mx-auto space-y-10">
            <h2 className="text-4xl font-bold serif text-white">Protecting Your World.</h2>
            <p className="text-blue-100/70 font-light text-lg">Speak with an independent Entrust advisor to audit your existing coverage.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Link to="/contact" className={`px-10 py-5 bg-white text-gray-900 rounded-2xl font-bold uppercase tracking-widest text-[10px] ${styles.hover} hover:text-white transition-all`}>
                Contact Our Team
              </Link>
              <Link to="/claims" className="px-10 py-5 border border-white/20 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">
                Claims Support
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServiceDetail;