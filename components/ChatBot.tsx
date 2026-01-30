import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { MessageSquare, X, Send, ShieldCheck, User, Sparkles, Phone, Mail, AlertCircle, RefreshCcw } from 'lucide-react';

const STORAGE_KEY = 'entrust_concierge_history_v2';

const SYSTEM_INSTRUCTION = `You are the Entrust Concierge, a minimalist and professional assistant for Entrust Insurance and Financial Services. 

CORE SERVICES:
1. **Insurance**: Auto, Home, Life, Health, and Commercial.
2. **Tax Services**: Individual and Business preparation.
3. **Bookkeeping & Payroll**: Full-cycle management.
4. **Travel Concierge**: Luxury leisure and corporate mobility.

CRITICAL RULES:
1. BE CONCISE: 1-3 sentences maximum.
2. Direct insurance quotes to the "Get a Quote" button on the site.
3. For specific agent requests, provide: (214) 792-9658 or info@entrustfin.com.
4. Maintain a formal, high-end advisory tone.`;

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
      <ShieldCheck className="w-4 h-4" />
      <p className="text-[10px] font-bold uppercase tracking-widest">Official Support</p>
    </div>
    <div className="space-y-3">
      <a href="tel:2147929658" className="flex items-center space-x-3 group">
        <Phone className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
        <span className="text-sm font-bold">(214) 792-9658</span>
      </a>
      <a href="mailto:info@entrustfin.com" className="flex items-center space-x-3 group">
        <Mail className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
        <span className="text-sm font-bold">info@entrustfin.com</span>
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
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Safe API Key Retrieval
  const getApiKey = () => {
    try {
      return typeof process !== 'undefined' ? process.env.API_KEY : undefined;
    } catch {
      return undefined;
    }
  };

  useEffect(() => {
    const key = getApiKey();
    setStatus(key ? 'online' : 'offline');
    
    const inviteTimer = setTimeout(() => {
      if (!isOpen && messages.length === 0) setShowInvite(true);
    }, 4000);
    return () => clearTimeout(inviteTimer);
  }, [isOpen, messages.length]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const clearChat = () => {
    if (window.confirm("Clear conversation history?")) {
      setMessages([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const apiKey = getApiKey();
    if (!apiKey) {
      setMessages(prev => [...prev, 
        { role: 'user', text: messageText }, 
        { role: 'model', text: "System connection unavailable. Please ensure your API key is correctly configured in your environment settings and redeploy." }
      ]);
      setInput('');
      return;
    }

    setMessages(prev => [...prev, { role: 'user', text: messageText }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      // Ensure role alternation
      const chatHistory = messages
        .filter((m, i, arr) => i === 0 || m.role !== arr[i-1].role)
        .map(m => ({ parts: [{ text: m.text }], role: m.role }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...chatHistory, { role: 'user', parts: [{ text: messageText }] }],
        config: { 
          systemInstruction: SYSTEM_INSTRUCTION, 
          temperature: 0.3,
          topK: 40,
          topP: 0.95
        }
      });

      const responseText = response.text || "I'm ready to assist you. Could you clarify your request?";
      const needsContact = /phone|call|email|agent|human|person|speak|contact/i.test(messageText + responseText);

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: responseText,
        showContactCard: needsContact
      }]);
      setStatus('online');
    } catch (error: any) {
      console.error("DIAGNOSTIC - Connection Error:", error);
      
      let errorMsg = "I'm having trouble connecting to my knowledge base. Please try again or contact us directly.";
      
      if (error?.message?.includes('401') || error?.message?.includes('API_KEY_INVALID')) {
        errorMsg = "CONCIERGE OFFLINE: The API key provided is invalid. Please check your AI Studio dashboard.";
        setStatus('offline');
      } else if (error?.message?.includes('403') || error?.message?.includes('billing')) {
        errorMsg = "CONCIERGE OFFLINE: Access denied. This typically requires linking a billing account in Google Cloud Console.";
        setStatus('offline');
      } else if (error?.message?.includes('429')) {
        errorMsg = "CONCIERGE BUSY: Too many requests. Please wait a moment before asking another question.";
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
                <p className="text-sm font-bold text-black serif italic">"How can I assist with your protection needs today?"</p>
                <div className="flex items-center text-[10px] font-bold text-blue-700 uppercase tracking-widest">Consult Concierge <Sparkles className="ml-1.5 w-3 h-3" /></div>
              </div>
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-blue-50 rotate-45"></div>
           </div>
        </div>
      )}

      {!isOpen && (
        <button onClick={() => { setIsOpen(true); setShowInvite(false); }} className="group w-16 h-16 bg-blue-700 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all active:scale-95">
          <MessageSquare className="w-7 h-7" />
        </button>
      )}

      {isOpen && (
        <div className="w-[360px] md:w-[420px] h-[680px] bg-white rounded-[3.5rem] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-scale-in origin-bottom-right">
          {/* Header */}
          <div className="p-6 bg-white border-b border-gray-50 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-700 border border-blue-100">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm serif text-black">Entrust Concierge</h3>
                <div className="flex items-center space-x-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${status === 'online' ? 'bg-green-500 animate-pulse' : status === 'offline' ? 'bg-red-500' : 'bg-gray-300'}`}></span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
                    {status === 'online' ? 'Advisor Online' : status === 'offline' ? 'System Offline' : 'Connecting...'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button onClick={clearChat} title="Reset Chat" className="p-2 hover:bg-gray-50 rounded-full text-black/20 hover:text-black/40 transition-colors"><RefreshCcw className="w-4 h-4" /></button>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-50 rounded-full text-black/30 hover:text-black/60 transition-colors"><X className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/10">
            {messages.length === 0 && (
              <div className="text-center py-12 space-y-8 h-full flex flex-col justify-center">
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-700 mx-auto mb-4">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold serif text-black px-8">Expert Guidance for Texas Success.</h4>
                  <p className="text-[10px] text-black/30 font-bold uppercase tracking-[0.2em]">Select an area of interest</p>
                </div>
                <div className="grid grid-cols-1 gap-3 px-8">
                  {['Auto Insurance Quote', 'Business Risk Audit', 'Tax Preparation', 'Travel Concierge'].map((label) => (
                    <button key={label} onClick={() => handleSend(label)} className="p-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-black/60 hover:border-blue-700 hover:text-blue-700 hover:shadow-xl hover:translate-y-[-2px] transition-all">
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                <div className={`flex items-start space-x-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-sm ${m.role === 'user' ? 'bg-black text-white' : 'bg-blue-50 text-blue-700'}`}>
                    {m.role === 'user' ? <User className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                  </div>
                  <div className="flex flex-col">
                    <div className={`p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-black text-white rounded-tr-none' : 'bg-white text-black border border-gray-50 rounded-tl-none'}`}>
                      <FormattedText text={m.text} />
                    </div>
                    {m.showContactCard && <ContactCard />}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2 px-11 animate-pulse">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full delay-75"></div>
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full delay-150"></div>
                <span className="text-[9px] text-black/20 font-bold uppercase tracking-widest ml-2">Concierge is typing</span>
              </div>
            )}
            
            {status === 'offline' && messages.length > 0 && (
              <div className="mx-6 p-4 bg-red-50 rounded-2xl border border-red-100 flex items-start space-x-3">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-red-800 leading-relaxed">
                  <strong>Configuration Required:</strong> If you are the administrator, please ensure the <code>API_KEY</code> variable is set in Vercel and the project has been redeployed.
                </p>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-gray-50">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative group">
              <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="How may I assist you?" 
                className="w-full pl-6 pr-14 py-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-blue-100 focus:bg-white transition-all text-sm font-medium" 
              />
              <button 
                type="submit" 
                className="absolute right-2 top-2 w-10 h-10 bg-blue-700 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-blue-800 transition-all active:scale-90 disabled:opacity-30" 
                disabled={!input.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[9px] text-center text-black/20 mt-4 font-bold uppercase tracking-[0.2em]">Secured by Entrust Financial Intelligence</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;