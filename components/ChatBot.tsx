import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { MessageSquare, X, Send, ShieldCheck, User, Sparkles, Phone, Mail, AlertCircle, RefreshCcw, Info, Terminal, Shield } from 'lucide-react';

const STORAGE_KEY = 'entrust_concierge_v6_stable';

const SYSTEM_INSTRUCTION = `You are the Entrust Concierge, a premier AI advisor for Entrust Insurance and Financial Services. 

AGENCY CONTEXT:
- Locations: Richardson, TX (Main Hub).
- Expertise: Auto, Home, Commercial, Life/Health, Tax Preparation, and Payroll.
- Tone: Sophisticated, helpful, and concise (Texas Professional).

INTERACTION RULES:
- Response Length: 1-2 short paragraphs max.
- Formatting: Use **bold** for key terms.
- Call to Action: Direct users to "Start Your Quote" if they need specific pricing.
- Contact: (214) 792-9658 | info@entrustfin.com.`;

const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <div className="whitespace-pre-wrap leading-relaxed text-[13.5px]">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-bold text-black">{part.slice(2, -2)}</strong>;
        }
        return part;
      })}
    </div>
  );
};

const EmergencyCard: React.FC = () => (
  <div className="mt-4 p-5 bg-[#006838] text-white rounded-[2rem] shadow-xl space-y-4 animate-fade-in-up border border-green-400/20">
    <div className="flex items-center space-x-3 border-b border-white/10 pb-3">
      <Shield className="w-4 h-4 text-green-300" />
      <p className="text-[10px] font-bold uppercase tracking-widest">Direct Advisor Access</p>
    </div>
    <div className="space-y-3">
      <a href="tel:2147929658" className="flex items-center space-x-3 group bg-white/5 p-2 rounded-xl hover:bg-white/10 transition-all">
        <Phone className="w-3.5 h-3.5 text-green-300" />
        <span className="text-sm font-bold">(214) 792-9658</span>
      </a>
      <a href="mailto:info@entrustfin.com" className="flex items-center space-x-3 group bg-white/5 p-2 rounded-xl hover:bg-white/10 transition-all">
        <Mail className="w-3.5 h-3.5 text-green-300" />
        <span className="text-sm font-bold">info@entrustfin.com</span>
      </a>
    </div>
  </div>
);

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string; isError?: boolean }[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Robust key detection
  const getApiKey = () => {
    return process.env.API_KEY || (window as any).process?.env?.API_KEY || null;
  };

  useEffect(() => {
    const inviteTimer = setTimeout(() => {
      if (!isOpen && messages.length === 0) setShowInvite(true);
    }, 5000);
    return () => clearTimeout(inviteTimer);
  }, [isOpen, messages.length]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const apiKey = getApiKey();
    setMessages(prev => [...prev, { role: 'user', text: messageText }]);
    setInput('');

    if (!apiKey) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "**MAINTENANCE MODE:** Advisory services are currently transitioning. Please use the direct contact methods below for immediate assistance while we update our secure connection.",
        isError: true
      }]);
      return;
    }

    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const chatHistory = messages
        .filter(m => !m.isError)
        .filter((m, i, arr) => i === 0 || m.role !== arr[i-1].role)
        .map(m => ({ parts: [{ text: m.text }], role: m.role }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...chatHistory, { role: 'user', parts: [{ text: messageText }] }],
        config: { 
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.3
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || "I am processing your inquiry." }]);
    } catch (error: any) {
      console.error("Advisory Error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "I am having trouble reaching our secure servers. Please contact our Richardson office directly.",
        isError: true 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const apiDetected = !!getApiKey();

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      {showInvite && !isOpen && (
        <div className="absolute bottom-20 right-0 w-[280px] animate-fade-in-up">
           <div className="relative bg-white p-6 rounded-[2.5rem] shadow-2xl border border-green-50">
              <button onClick={() => setShowInvite(false)} className="absolute top-4 right-4 text-black/20 hover:text-black/40"><X className="w-3 h-3" /></button>
              <div className="cursor-pointer space-y-2" onClick={() => { setIsOpen(true); setShowInvite(false); }}>
                <p className="text-sm font-bold text-black serif italic leading-relaxed">"How can I assist with your protection strategy today?"</p>
                <div className="flex items-center text-[10px] font-bold text-[#006838] uppercase tracking-widest mt-2">Open Concierge <Sparkles className="ml-1.5 w-3 h-3" /></div>
              </div>
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-green-50 rotate-45"></div>
           </div>
        </div>
      )}

      {!isOpen && (
        <button 
          onClick={() => { setIsOpen(true); setShowInvite(false); }} 
          className="group w-16 h-16 bg-[#006838] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
        >
          <MessageSquare className="w-7 h-7" />
        </button>
      )}

      {isOpen && (
        <div className="w-[360px] md:w-[420px] h-[680px] bg-white rounded-[3.5rem] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-scale-in origin-bottom-right">
          {/* Header */}
          <div className="p-6 bg-white border-b border-gray-50 flex justify-between items-center shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-50 rounded-2xl flex items-center justify-center text-[#006838] border border-green-100 shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm serif text-black leading-none mb-1.5">Entrust Concierge</h3>
                <button 
                  onClick={() => setShowDiagnostics(!showDiagnostics)}
                  className="flex items-center space-x-2"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${apiDetected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40 hover:text-[#006838] transition-colors">
                    {apiDetected ? 'System Active' : 'Offline Mode'}
                  </span>
                </button>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-50 rounded-full text-black/30 transition-colors"><X className="w-5 h-5" /></button>
          </div>

          {/* Diagnostics */}
          {showDiagnostics && (
            <div className="absolute top-20 left-6 right-6 p-6 bg-gray-900 rounded-3xl z-50 text-white shadow-2xl border border-white/10 animate-fade-in-up">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-green-400 flex items-center"><Terminal className="w-3 h-3 mr-2" /> Advisor Diagnostics</h4>
                <button onClick={() => setShowDiagnostics(false)}><X className="w-3 h-3 opacity-40" /></button>
              </div>
              <div className="space-y-3 font-mono text-[10px]">
                <div className="flex justify-between"><span>ENV_KEY:</span> <span className={apiDetected ? 'text-green-400' : 'text-red-400'}>{apiDetected ? 'READY' : 'MISSING'}</span></div>
                <div className="pt-2 border-t border-white/10 text-white/40 italic">
                  Note: If 'MISSING' and you just moved teams, re-add API_KEY in Vercel and Redeploy.
                </div>
              </div>
            </div>
          )}

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/20">
            {messages.length === 0 && (
              <div className="h-full flex flex-col justify-center text-center space-y-8 py-10">
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-green-50 rounded-[2rem] flex items-center justify-center text-[#006838] mx-auto mb-4 border border-green-100 shadow-sm"><Sparkles className="w-8 h-8" /></div>
                  <h4 className="text-2xl font-bold serif text-black px-10">Premier Texas Advisory.</h4>
                  <p className="text-[10px] text-black/30 font-bold uppercase tracking-[0.2em]">Select an area of interest</p>
                </div>
                <div className="grid grid-cols-1 gap-3 px-10">
                  {['Personal Insurance Quote', 'Business Liability Audit', 'Financial Strategy'].map((label) => (
                    <button key={label} onClick={() => handleSend(label)} className="p-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-black/60 hover:border-[#006838] hover:text-[#006838] transition-all">
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                <div className={`flex items-start space-x-3 max-w-[88%] ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-sm border ${m.role === 'user' ? 'bg-black text-white border-black' : 'bg-white text-[#006838] border-green-50'}`}>
                    {m.role === 'user' ? <User className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                  </div>
                  <div className="flex flex-col">
                    <div className={`p-4 rounded-2xl shadow-sm ${m.role === 'user' ? 'bg-black text-white rounded-tr-none' : 'bg-white text-black border border-gray-100 rounded-tl-none'}`}>
                      <FormattedText text={m.text} />
                    </div>
                    {m.isError && <EmergencyCard />}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2 px-11">
                <div className="flex space-x-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce"></span></div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 bg-white border-t border-gray-50 shrink-0">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="How may I assist you?" className="w-full pl-6 pr-14 py-4 bg-slate-50 rounded-2xl outline-none focus:bg-white transition-all text-sm font-medium" />
              <button type="submit" className="absolute right-2 top-2 w-10 h-10 bg-[#006838] text-white rounded-xl flex items-center justify-center shadow-lg disabled:opacity-30" disabled={!input.trim() || isTyping}>
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[9px] text-center text-black/20 font-bold uppercase tracking-[0.2em] mt-4">Secured by Entrust Intelligence</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;