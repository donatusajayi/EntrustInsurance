import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { MessageSquare, X, Send, Trash2, ShieldCheck, User, Heart, Sparkles, HelpCircle, Phone, Mail, MapPin, Sparkle, Calculator, Plane, Coins } from 'lucide-react';

const STORAGE_KEY = 'entrust_concierge_history';

const SYSTEM_INSTRUCTION = `You are the Entrust Concierge, a minimalist and professional assistant for Entrust Insurance and Financial Services. We provide a quartet of premium services: **Insurance**, **Tax Services**, **Bookkeeping & Payroll**, and **Travel Concierge**.

CORE SERVICES KNOWLEDGE:
1. **Insurance**: Premier Texas protection for personal (Auto, Home, Life, Health) and commercial (GL, Property, Workers Comp, Cyber) needs.
2. **Tax Services**: Professional tax preparation for individuals and business compliance. We handle IRS filing, K-1s, audit support, and strategic tax planning for Texas enterprises.
3. **Bookkeeping & Payroll**: Full-cycle bookkeeping, ledger management, monthly financial reporting, and automated payroll solutions for Texas businesses.
4. **Travel Concierge**: A full-service travel agency arm (listed in our footer). We specialize in luxury leisure (five-star resorts, private transfers) and corporate mobility for global professionals.

CRITICAL RULES:
1. BE CONCISE: Aim for 1-3 sentences for 90% of interactions.
2. QUOTE/INQUIRY PROTOCOL:
   - For **Insurance** price/quotes: ALWAYS direct them to the "Get a Quote" button in the top navigation bar.
   - For **Tax Services**, **Bookkeeping**, or **Travel**: Direct them to the respective page in the menu bar or recommend booking a consultation via the Contact page.
3. EXPERT HANDOFF: Only provide direct phone, email, or address if the user explicitly asks for an agent or a human, or if the question is too complex.
4. CONCLUDING CONVERSATIONS: End with a polite closing if the user is satisfied. Do NOT ask follow-up questions if the conversation is clearly finished.

Contact Details (Only use when handoff is necessary):
- Phone: (214) 792-9658
- Email: info@entrustfin.com
- Address: 1651 N Collins Blvd Ste 122, Richardson, TX 75080.

Formatting: Use **bold** for key terms.`;

const INACTIVITY_LIMIT = 30 * 60 * 1000;

const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <div className="whitespace-pre-wrap leading-relaxed">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-bold text-black">{part.slice(2, -2)}</strong>;
        }
        return part;
      })}
    </div>
  );
};

const ContactCard: React.FC = () => (
  <div className="mt-4 p-5 bg-blue-700 text-white rounded-[2rem] shadow-xl space-y-4 animate-fade-in-up">
    <div className="flex items-center space-x-3 border-b border-white/10 pb-3">
      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
        <ShieldCheck className="w-5 h-5" />
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest">Licensed Agent Support</p>
    </div>
    <div className="space-y-3">
      <a href="tel:2147929658" className="flex items-center space-x-3 group">
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all">
          <Phone className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-tighter opacity-60">Call Directly</span>
          <span className="text-sm font-bold">(214) 792-9658</span>
        </div>
      </a>
      <a href="mailto:info@entrustfin.com" className="flex items-center space-x-3 group">
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all">
          <Mail className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-tighter opacity-60">Send Email</span>
          <span className="text-sm font-bold">info@entrustfin.com</span>
        </div>
      </a>
    </div>
  </div>
);

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string; showContactCard?: boolean }[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    const inviteTimer = setTimeout(() => {
      if (!isOpen && messages.length === 0) setShowInvite(true);
    }, 3500);
    return () => clearTimeout(inviteTimer);
  }, [isOpen, messages.length]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    if (!process.env.API_KEY) {
      console.error("Gemini API Key is missing. Please check your Vercel Environment Variables.");
      setMessages(prev => [...prev, { role: 'user', text: messageText }, { role: 'model', text: "I'm currently unable to connect. Please ensure the API key is configured correctly in Vercel settings." }]);
      setInput('');
      return;
    }

    setMessages(prev => [...prev, { role: 'user', text: messageText }]);
    setInput('');
    setIsTyping(true);

    try {
      // Create new instance per request to ensure fresh env var state
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Ensure alternating roles for Gemini API (user -> model -> user)
      const filteredHistory = messages.filter((m, i, arr) => i === 0 || m.role !== arr[i-1].role);
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...filteredHistory, { role: 'user', text: messageText }].map(m => ({
          parts: [{ text: m.text }],
          role: m.role
        })),
        config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.5 }
      });

      const responseText = response.text || "I'm having trouble processing that right now.";
      const mentionsContact = /214-792-9658|info@entrustfin\.com/i.test(responseText);

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: responseText,
        showContactCard: mentionsContact
      }]);
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      let errorMsg = "I'm offline right now. Please try calling us at (214) 792-9658.";
      if (error?.message?.includes('API_KEY_INVALID')) errorMsg = "System Error: The API Key provided is invalid.";
      if (error?.message?.includes('Requested entity was not found')) errorMsg = "System Error: The specified AI model is not accessible with this key.";
      
      setMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      {showInvite && !isOpen && (
        <div className="absolute bottom-20 right-0 w-[240px] animate-fade-in-up">
           <div className="relative bg-white p-5 rounded-[2rem] shadow-xl border border-blue-50">
              <button onClick={() => setShowInvite(false)} className="absolute top-3 right-3 p-1 text-black/20 hover:text-black/40"><X className="w-3 h-3" /></button>
              <div className="cursor-pointer space-y-2" onClick={() => { setIsOpen(true); setShowInvite(false); }}>
                <p className="text-sm font-bold text-black leading-tight serif italic">"Hello! Need help with insurance, taxes, or payroll?"</p>
                <div className="flex items-center text-[10px] font-bold text-blue-600">Chat Now <Sparkles className="ml-1 w-3 h-3" /></div>
              </div>
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-blue-50 rotate-45"></div>
           </div>
        </div>
      )}

      {!isOpen && (
        <button onClick={() => { setIsOpen(true); setShowInvite(false); }} className="group w-16 h-16 bg-blue-700 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all">
          <MessageSquare className="w-7 h-7" />
        </button>
      )}

      {isOpen && (
        <div className="w-[360px] md:w-[400px] h-[600px] bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-scale-in origin-bottom-right">
          <div className="p-6 bg-white border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100 text-blue-700">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm serif text-black leading-none">Entrust Concierge</h3>
                <div className="flex items-center mt-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Advisor</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full text-black/40"><X className="w-5 h-5" /></button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/30">
            {messages.length === 0 && (
              <div className="text-center space-y-8 py-8">
                <h4 className="text-2xl font-bold serif text-black">Elite Concierge.</h4>
                <div className="grid grid-cols-1 gap-3 px-4">
                  {['Insurance Quote', 'Tax Services', 'Bookkeeping'].map((label) => (
                    <button key={label} onClick={() => handleSend(label)} className="p-4 bg-white border border-gray-100 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-black/70 hover:border-blue-700 hover:text-blue-700 transition-all shadow-sm">
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                <div className={`flex items-start space-x-3 max-w-[88%] ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 ${m.role === 'user' ? 'bg-black text-white' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
                    {m.role === 'user' ? <User className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                  </div>
                  <div className="flex flex-col">
                    <div className={`p-4 rounded-2xl text-[13px] ${m.role === 'user' ? 'bg-black text-white' : 'bg-white text-black border border-gray-100 font-light'}`}>
                      <FormattedText text={m.text} />
                    </div>
                    {m.showContactCard && <ContactCard />}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && <div className="text-[10px] text-black/40 font-bold uppercase italic px-2 animate-pulse">Concierge is responding...</div>}
          </div>

          <div className="p-6 bg-white border-t border-gray-50">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message concierge..." className="w-full pl-6 pr-14 py-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-blue-100 text-sm" />
              <button type="submit" className="absolute right-2 top-2 w-10 h-10 bg-blue-700 text-white rounded-xl flex items-center justify-center shadow-lg" disabled={!input.trim()}>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;