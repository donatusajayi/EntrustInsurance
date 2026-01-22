import React from 'react';
import { Target, Users, Zap, ShieldCheck, MapPin, Globe, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-6">
        <header className="max-w-4xl mb-32 space-y-6">
          <p className="text-[#006838] font-bold uppercase tracking-[0.3em] text-[10px]">Serving Texas Since 2014</p>
          <h1 className="text-5xl md:text-7xl font-bold text-black serif leading-[1.1]">Built on Trust, <br /><span className="text-black/40 italic">Driven by Service.</span></h1>
          <p className="text-xl text-black/70 font-light leading-relaxed">
            Entrust Insurance and Financial Services was founded with a simple mission: to provide Texas families and businesses with honest, reliable insurance guidance they can count on.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold serif text-black">Our Texas Story</h2>
            <p className="text-lg text-black/70 font-light leading-relaxed">
              Over the years, we've grown from a small local agency to a trusted name in the Richardson-Dallas area, but our values have remained the same. We understand that Texas insurance can feel overwhelming—complicated jargon, unique weather-related options, and uncertainty about what you actually need.
            </p>
            <p className="text-lg text-black/70 font-light leading-relaxed">
              That's where we come in. Our team cuts through the complexity to deliver clear, straightforward advice that empowers you to make informed decisions for your family and your business.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1521791136064-7986c2923216?auto=format&fit=crop&q=80&w=1000" 
              className="rounded-[3rem] shadow-2xl h-[500px] w-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              alt="Honest Guidance"
            />
          </div>
        </section>

        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold serif text-black mb-4">Why Choose Entrust?</h2>
          <div className="w-20 h-1 bg-[#006838] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-40">
          <FeatureCard 
            icon={<MapPin className="w-6 h-6" />}
            title="Local Expertise"
            desc="As a Texas-based agency, we understand the unique insurance needs of our community—from severe weather protection to state-specific coverage requirements. We're here when you need us, serving your neighborhood."
          />
          <FeatureCard 
            icon={<Users className="w-6 h-6" />}
            title="Personalized Approach"
            desc="No two clients are alike, and neither are our solutions. We take the time to listen to your concerns, assess your DFW risks, and craft coverage that truly protects what matters most to you."
          />
          <FeatureCard 
            icon={<Globe className="w-6 h-6" />}
            title="Independent Advantage"
            desc="We work with multiple top-rated insurance carriers, which means we can shop the market on your behalf to find the best coverage at competitive rates. Your interests always come first."
          />
          <FeatureCard 
            icon={<Award className="w-6 h-6" />}
            title="Proven Track Record"
            desc="With over a decade of experience, we've helped thousands of Texas families and businesses secure the protection they need. Our reputation is built on trust, transparency, and results."
          />
        </div>

        <section className="bg-black rounded-[4rem] p-12 md:p-24 text-white text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold serif text-white">Our Commitment</h2>
            <p className="text-green-100/60 text-lg font-light leading-relaxed">
              We're committed to being more than just your insurance provider—we're your lifelong partner in protection here in North Texas. From your first quote to filing a claim decades later, we'll be by your side.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="p-10 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-gray-200 transition-all">
    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#006838] mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-black mb-4">{title}</h3>
    <p className="text-black/60 text-sm font-light leading-relaxed">{desc}</p>
  </div>
);

export default About;