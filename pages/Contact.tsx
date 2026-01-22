import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, ShieldCheck, Globe } from 'lucide-react';
import ChatBot from '../components/ChatBot.tsx';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pt-40 pb-24 animate-fade-in-up bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <header className="max-w-4xl mb-24 md:mb-32 space-y-8">
           <div className="inline-flex items-center space-x-2 text-blue-700 font-bold uppercase tracking-[0.2em] text-[11px]">
             <Globe className="w-4 h-4" />
             <span>Get In Touch</span>
           </div>
          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold text-black serif leading-[1.05]">Let's Design <br /><span className="text-gradient-blue italic font-medium">Your Safety Net.</span></h1>
          <p className="text-xl md:text-2xl text-black/70 font-light leading-relaxed max-w-2xl">
            Professional guidance is just a conversation away. Reach out to our Richardson office for a comprehensive review.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-40">
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-12">
              <ContactInfo 
                icon={<MapPin />} 
                title="Texas Headquarters" 
                detail="1651 N Collins Blvd Ste 122, Richardson, TX 75080" 
              />
              <ContactInfo 
                icon={<Phone />} 
                title="Direct Phone Support" 
                detail="(214) 792-9658" 
                link="tel:2147929658"
              />
              <ContactInfo 
                icon={<Mail />} 
                title="Email Correspondence" 
                detail="info@entrustfin.com" 
                link="mailto:info@entrustfin.com"
              />
              <ContactInfo 
                icon={<Clock />} 
                title="Executive Hours" 
                detail="M-F: 9:00 AM – 6:00 PM | SAT: 12:00 PM – 4:00 PM (By Appointment Only)" 
              />
            </div>

            <div className="p-10 bg-slate-50 rounded-[3rem] border border-gray-100">
               <ShieldCheck className="w-10 h-10 text-blue-700 mb-6" />
               <h3 className="text-xl font-bold serif mb-3 text-black">Our Promise</h3>
               <p className="text-sm text-black/70 font-light leading-relaxed">We respond to all professional inquiries within 24 business hours. Your data is protected by industry-standard encryption.</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-12 lg:p-20 rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-gray-50">
              {submitted ? (
                <div className="text-center py-20 md:py-32 space-y-8">
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-700">
                    <Send className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold text-black serif">Message Delivered.</h3>
                  <p className="text-black/60 font-light">An advisor will review your inquiry and contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-2">Full Name</label>
                      <input required type="text" className="w-full px-8 py-5 bg-slate-50 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all border border-transparent focus:border-blue-200 text-sm font-medium text-black" placeholder="Johnathan Doe" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-2">Professional Email</label>
                      <input required type="email" className="w-full px-8 py-5 bg-slate-50 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all border border-transparent focus:border-blue-200 text-sm font-medium text-black" placeholder="j.doe@company.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-2">Nature of Inquiry</label>
                    <div className="relative">
                      <select required className="w-full px-8 py-5 bg-slate-50 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all border border-transparent focus:border-blue-200 text-sm font-medium appearance-none cursor-pointer text-black">
                        <option value="" disabled selected>Select an inquiry type</option>
                        <option>Personal Insurance Quote</option>
                        <option>Commercial Risk Assessment</option>
                        <option>Financial Advisory</option>
                        <option>Claims Support</option>
                        <option>General Inquiry</option>
                      </select>
                      <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-2">Message</label>
                    <textarea rows={5} className="w-full px-8 py-5 bg-slate-50 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all border border-transparent focus:border-blue-200 text-sm font-medium resize-none text-black" placeholder="Tell us about your requirements..."></textarea>
                  </div>

                  <button type="submit" className="w-full group bg-black text-white py-6 rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-blue-700 transition-all shadow-2xl hover:shadow-blue-200 active:scale-[0.98]">
                    <span className="flex items-center justify-center">
                      Send Inquiry
                      <Send className="ml-3 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <ChatBot />
    </div>
  );
};

const ContactInfo = ({ icon, title, detail, link }: { icon: any, title: string, detail: string, link?: string }) => {
  const content = (
    <div className="flex items-start space-x-8 group">
      <div className="w-14 h-14 bg-slate-50 rounded-2xl border border-gray-100 flex items-center justify-center text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-all shrink-0">
        {icon}
      </div>
      <div className="pt-1">
        <h4 className="font-bold text-black text-sm serif mb-1">{title}</h4>
        <p className="text-black/60 text-sm font-light leading-relaxed">{detail}</p>
      </div>
    </div>
  );

  if (link) {
    return <a href={link} className="block transition-transform hover:translate-x-1">{content}</a>;
  }
  return content;
};

export default Contact;