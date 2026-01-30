import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { MessageSquare, X, Send, ShieldCheck, User, Sparkles, Phone, Mail, AlertCircle, RefreshCcw, Info, Terminal } from 'lucide-react';

const STORAGE_KEY = 'entrust_concierge_cache_v4';

const SYSTEM_INSTRUCTION = `You are the Entrust Concierge, a high-end AI advisor for Entrust Insurance and Financial Services. 

CONTEXT:
Entrust is a premier Texas agency (Richardson/DFW) providing:
1. Insurance: Auto, Home (Estates), Life, Health, Commercial Risk.
2. Financial: Tax Preparation, Bookkeeping, Payroll.
3. Travel: Luxury and Corporate Concierge.

TONE: Professional, minimalist, and advisory.

RULES:
- Limit responses to 2-3 sentences.
- Use bold text for important terms.
- For claims, point them to the 'Claims' link in the footer.
- For quotes, use the 'Get a Quote' button.
- Contact: (214) 792-9658 or info@entrustfin.com.`;

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

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string; showContactCard?: boolean }[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [isTyping, setIsTyping] = useState(false);
  const [apiStatus, setApiStatus] = useState<'unknown' | 'detected' | 'missing'>('unknown');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const key = process.env.API_KEY;
    setApiStatus(key ? 'detected' : 'missing');
    
    const inviteTimer = setTimeout(() => {
      if (!isOpen && messages.length === 0) setShowInvite(true);
    }, 6000);
    return () => clearTimeout(inviteTimer);
  }, [isOpen, messages.length]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      setMessages(prev => [...prev, 
        { role: 'user', text: messageText }, 
        { role: 'model', text: "**CONNECTION ERROR:** I am currently offline. Please ensure the `API_KEY` is correctly configured in your deployment settings and that you have **Redeployed** the site." }
      ]);
      setInput('');
      return;
    }

    setMessages(prev => [...prev, { role: 'user', text: messageText }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const chatHistory = messages
        .filter((m, i, arr) => i === 0 || m.role !== arr[i-1].role)
        .map(m => ({ parts: [{ text: m.text }], role: m.role }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...chatHistory, { role: 'user', parts: [{ text: messageText }] }],
        config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.3 }
      });

      const responseText = response.text || "I am here to assist with your insurance needs.";
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error: any) {
      console.error("Entrust Concierge Error:", error);
      let errorMsg = "I encountered an issue connecting to the advisory network. Please reach out to us directly at (214) 792-9658.";
      
      if (error?.message?.includes('403')) {
        errorMsg = "**ADVISORY OFFLINE (403):** Access is restricted. This typically means billing must be enabled in your Google Cloud project.";
      } else if (error?.message?.includes('401')) {
        errorMsg = "**ADVISORY OFFLINE (401):** The provided API key is unauthorized or invalid.";
      }

      setMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      {showInvite && !isOpen && (
        <div className="absolute bottom-20 right-0 w-[280px] animate-fade-in-up">
           <div className="relative bg-white p-6 rounded-[2.5rem] shadow-2xl border border-blue-50">
              <button onClick={() => setShowInvite(false)} className="absolute top-4 right-4 text-black/20 hover:text-black/40"><X className="w-3 h-3" /></button>
              <div className="cursor-pointer space-y-2" onClick={() => { setIsOpen(true); setShowInvite(false); }}>
                <p className="text-sm font-bold text-black serif italic leading-relaxed">"How can I assist with your protection strategy today?"</p>
                <div className="flex items-center text-[10px] font-bold text-blue-700 uppercase tracking-widest mt-2">Open Concierge <Sparkles className="ml-1.5 w-3 h-3" /></div>
              </div>
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-blue-50 rotate-45"></div>
           </div>
        </div>
      )}

      {!isOpen && (
        <button 
          onClick={() => { setIsOpen(true); setShowInvite(false); }} 
          className="group w-16 h-16 bg-blue-700 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
        >
          <MessageSquare className="w-7 h-7" />
        </button>
      )}

      {isOpen && (
        <div className="w-[360px] md:w-[420px] h-[680px] bg-white rounded-[3.5rem] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-scale-in origin-bottom-right">
          {/* Header */}
          <div className="p-6 bg-white border-b border-gray-50 flex justify-between items-center shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-700 border border-blue-100">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm serif text-black leading-none mb-1.5">Entrust Concierge</h3>
                <button 
                  onClick={() => setShowDiagnostics(!showDiagnostics)}
                  className="flex items-center space-x-2 group/status"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${apiStatus === 'detected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40 group-hover/status:text-blue-600 transition-colors">
                    {apiStatus === 'detected' ? 'System Online' : 'System Offline'}
                  </span>
                </button>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-50 rounded-full text-black/30 transition-colors"><X className="w-5 h-5" /></button>
          </div>

          {/* Diagnostics Overlay */}
          {showDiagnostics && (
            <div className="absolute top-20 left-6 right-6 p-6 bg-gray-900 rounded-3xl z-50 text-white shadow-2xl border border-white/10 animate-fade-in-up">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 flex items-center">
                  <Terminal className="w-3 h-3 mr-2" /> System Diagnostics
                </h4>
                <button onClick={() => setShowDiagnostics(false)}><X className="w-3 h-3 opacity-40" /></button>
              </div>
              <div className="space-y-3 font-mono text-[10px]">
                <div className="flex justify-between"><span>ENV_KEY_FOUND:</span> <span className={apiStatus === 'detected' ? 'text-green-400' : 'text-red-400'}>{apiStatus === 'detected' ? 'TRUE' : 'FALSE'}</span></div>
                <div className="flex justify-between"><span>MODEL_TARGET:</span> <span className="text-blue-300">gemini-3-flash</span></div>
                <div className="pt-2 border-t border-white/10 text-white/40 italic">
                  Note: If FALSE, verify Vercel Env Vars and ensure you have REDEPLOYED.
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/20">
            {messages.length === 0 && (
              <div className="h-full flex flex-col justify-center text-center space-y-8 py-10">
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-700 mx-auto mb-4">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold serif text-black px-10">Professional Advisory.</h4>
                  <p className="text-[10px] text-black/30 font-bold uppercase tracking-[0.2em]">Select a specialized service</p>
                </div>
                <div className="grid grid-cols-1 gap-3 px-10">
                  {['Personal Insurance Quote', 'Business Risk Audit', 'Tax Preparation', 'Travel Concierge'].map((label) => (
                    <button 
                      key={label} 
                      onClick={() => handleSend(label)} 
                      className="p-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-black/60 hover:border-blue-700 hover:text-blue-700 hover:shadow-xl transition-all"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                <div className={`flex items-start space-x-3 max-w-[88%] ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-sm border ${m.role === 'user' ? 'bg-black text-white border-black' : 'bg-white text-blue-700 border-gray-100'}`}>
                    {m.role === 'user' ? <User className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-black text-white rounded-tr-none' : 'bg-white text-black border border-gray-100 rounded-tl-none'}`}>
                    <FormattedText text={m.text} />
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2 px-11">
                <div className="flex space-x-1"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span><span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span><span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span></div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 bg-white border-t border-gray-50 shrink-0">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative">
              <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="How may I assist you today?" 
                className="w-full pl-6 pr-14 py-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-blue-100 focus:bg-white transition-all text-sm font-medium" 
              />
              <button 
                type="submit" 
                className="absolute right-2 top-2 w-10 h-10 bg-blue-700 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-blue-800 transition-all disabled:opacity-30" 
                disabled={!input.trim() || isTyping}
              >
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