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
3. EXPERT HANDOFF: Only provide direct phone, email, or address if:
   - The user explicitly asks for an agent or a human.
   - The question is too complex for you to answer.
4. CONCLUDING CONVERSATIONS: End with a polite closing if the user is satisfied. Do NOT ask follow-up questions if the conversation is clearly finished.

Contact Details (Only use when handoff is necessary):
- Phone: (214) 792-9658
- Email: info@entrustfin.com
- Address: 1651 N Collins Blvd Ste 122, Richardson, TX 75080.

GEOGRAPHIC SCOPE:
- Entrust serves all of Texas and manages travel/risk globally. 

Formatting:
- Use **bold** for key terms.`;

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

      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <MapPin className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-tighter opacity-60">Richardson Office</span>
          <span className="text-[11px] font-medium leading-tight">1651 N Collins Blvd Ste 122</span>
        </div>
      </div>
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
    } catch {
      return [];
    }
  });
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inactivityTimerRef = useRef<number | null>(null);
  const hasGreetedSessionRef = useRef(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // Handle Invitation Bubble Delay
  useEffect(() => {
    const inviteTimer = setTimeout(() => {
      if (!isOpen && messages.length === 0) {
        setShowInvite(true);
      }
    }, 3500); // 3.5s delay for natural feel

    return () => clearTimeout(inviteTimer);
  }, [isOpen, messages.length]);

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) window.clearTimeout(inactivityTimerRef.current);
    if (isOpen) {
      inactivityTimerRef.current = window.setTimeout(() => setIsOpen(false), INACTIVITY_LIMIT);
    }
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setShowInvite(false);
    };
    window.addEventListener('open-chat', handleOpenChat);
    return () => window.removeEventListener('open-chat', handleOpenChat);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length > 0 && !hasGreetedSessionRef.current) {
      hasGreetedSessionRef.current = true;
      handleProactiveGreeting();
    }
    resetInactivityTimer();
  }, [isOpen]);

  const deliverResponseWithCadence = async (fullText: string, isInitialThinking: boolean = false) => {
    const chunks = fullText.split(/\n\n+/).filter(c => c.trim().length > 0);
    if (isInitialThinking) {
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));
    }
    
    const mentionsContactDetails = /214-792-9658|info@entrustfin\.com|1651 N Collins/i.test(fullText);

    for (let i = 0; i < chunks.length; i++) {
      setIsTyping(true);
      const typingTime = Math.min(Math.max(chunks[i].length * 10, 400), 1500);
      await new Promise(resolve => setTimeout(resolve, typingTime));
      
      const isLastChunk = i === chunks.length - 1;
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: chunks[i],
        showContactCard: (isLastChunk && mentionsContactDetails)
      }]);
      
      setIsTyping(false);
      if (i < chunks.length - 1) await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const handleProactiveGreeting = async () => {
    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...messages.map(m => ({ parts: [{ text: m.text }], role: m.role })),
          { role: 'user', parts: [{ text: "[System: User returned. Short welcome back referencing last topic. Do NOT ask a question if the last turn was a goodbye.]" }] }
        ],
        config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.7 }
      });
      await deliverResponseWithCadence(response.text || "Welcome back!", false);
    } catch (error) {
      setIsTyping(false);
    }
  };

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    setShowInvite(false);
    resetInactivityTimer();
    hasGreetedSessionRef.current = true;
    setMessages(prev => [...prev, { role: 'user', text: messageText }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, { role: 'user', text: messageText }].map(m => ({
          parts: [{ text: m.text }],
          role: m.role
        })),
        config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.5 }
      });

      await deliverResponseWithCadence(response.text || "I'm having trouble connecting. Please try again.", true);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm offline right now. Please try calling us at (214) 792-9658." }]);
      setIsTyping(false);
    }
  };

  const quickActions = [
    { label: 'Insurance, Taxes, or Payroll?', icon: <Sparkles className="w-3 h-3" />, primary: true },
    { label: 'Bookkeeping Support', icon: <Coins className="w-3 h-3" /> },
    { label: 'Tax Services', icon: <Calculator className="w-3 h-3" /> },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      {/* Invitation Bubble */}
      {showInvite && !isOpen && (
        <div className="absolute bottom-20 right-0 w-[240px] animate-fade-in-up">
           <div className="relative bg-white p-5 rounded-[2rem] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] border border-blue-50">
              <button 
                onClick={(e) => { e.stopPropagation(); setShowInvite(false); }}
                className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full transition-colors text-black/20 hover:text-black/40"
              >
                <X className="w-3 h-3" />
              </button>
              <div 
                className="cursor-pointer space-y-2 group"
                onClick={() => { setIsOpen(true); setShowInvite(false); }}
              >
                <div className="flex items-center space-x-2 text-blue-700 font-bold uppercase tracking-widest text-[9px]">
                  <Sparkles className="w-3 h-3" />
                </div>
                <p className="text-sm font-bold text-black leading-tight group-hover:text-blue-700 transition-colors serif italic">
                  "Hello! Need help with insurance, tax services, or payroll?"
                </p>
                <div className="flex items-center text-[10px] font-bold text-blue-600">
                  Chat Now <Sparkles className="ml-1 w-3 h-3 animate-pulse" />
                </div>
              </div>
              {/* Tooltip Arrow */}
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-blue-50 rotate-45"></div>
           </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => { setIsOpen(true); setShowInvite(false); }}
          className="group w-16 h-16 bg-blue-700 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all relative overflow-hidden"
        >
          <MessageSquare className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
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
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Services Advisor</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button onClick={() => { setMessages([]); localStorage.removeItem(STORAGE_KEY); }} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-black/40 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-black/40"><X className="w-5 h-5" /></button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/30" onScroll={resetInactivityTimer}>
            {messages.length === 0 && (
              <div className="text-center space-y-8 py-8">
                <div className="space-y-3">
                  <h4 className="text-2xl font-bold serif text-black leading-tight">Elite Protection & Concierge.</h4>
                  <p className="text-sm text-black/60 font-light max-w-[280px] mx-auto">I'm here to help with your insurance, tax services, or payroll management.</p>
                </div>
                <div className="grid grid-cols-1 gap-3 px-4">
                  {quickActions.map((action) => (
                    <button key={action.label} onClick={() => handleSend(action.label)} className={`p-4 border rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-3 shadow-sm ${action.primary ? 'bg-blue-700 border-blue-700 text-white hover:bg-blue-800' : 'bg-white border-gray-100 text-black/70 hover:border-blue-700 hover:text-blue-700'}`}>
                      {action.icon}<span>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                <div className={`flex items-start space-x-3 max-w-[88%] ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-sm ${m.role === 'user' ? 'bg-black text-white' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
                    {m.role === 'user' ? <User className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                  </div>
                  <div className="flex flex-col">
                    <div className={`p-4 rounded-2xl text-[13px] shadow-sm ${m.role === 'user' ? 'bg-black text-white rounded-tr-none' : 'bg-white text-black border border-gray-100 rounded-tl-none font-light leading-relaxed'}`}>
                      <FormattedText text={m.text} />
                    </div>
                    {m.showContactCard && <ContactCard />}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start items-center space-x-2 px-2 animate-fade-in">
                 <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                 </div>
                 <span className="text-[10px] text-black/40 font-bold uppercase tracking-widest italic">Concierge is responding...</span>
              </div>
            )}
          </div>

          <div className="p-6 bg-white border-t border-gray-50">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={resetInactivityTimer}
                placeholder="Message concierge..."
                className="w-full pl-6 pr-14 py-4 bg-slate-50 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all border border-transparent focus:border-blue-100 text-sm font-light text-black"
              />
              <button type="submit" className="absolute right-2 top-2 w-10 h-10 bg-blue-700 text-white rounded-xl flex items-center justify-center hover:bg-blue-800 transition-all active:scale-90 shadow-lg shadow-blue-100" disabled={!input.trim()}>
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