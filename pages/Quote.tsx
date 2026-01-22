import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Lock, RefreshCw } from 'lucide-react';

const Quote: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleResize = (event: MessageEvent) => {
      // The provided script logic for dynamic resizing
      if (iframeRef.current && 
          iframeRef.current.src.indexOf(event.origin) !== -1 && 
          event.data.topic === 'crqResize') {
        iframeRef.current.style.height = `${event.data.height}px`;
      }
    };

    window.addEventListener('message', handleResize, false);
    return () => {
      window.removeEventListener('message', handleResize);
    };
  }, []);

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6">
        <header className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 text-blue-700 font-bold uppercase tracking-[0.2em] text-[10px] animate-fade-in-up">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Digital Portal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black serif animate-reveal">
            Texas Coverage <br />
            <span className="text-gradient-blue italic font-medium">Comparison Engine.</span>
          </h1>
          <p className="text-black/70 font-light max-w-xl animate-fade-in-up delay-100">
            Compare rates from 15+ top-rated Texas carriers instantly. Your information is encrypted and sent directly to our licensed advisory team.
          </p>
        </header>

        <div className="relative bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden animate-scale-in delay-200">
          {/* Secure Header for Iframe */}
          <div className="bg-gray-50 border-b border-gray-100 px-8 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lock className="w-3.5 h-3.5 text-green-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">256-bit SSL Secure Connection</span>
            </div>
            <div className="hidden sm:flex items-center space-x-4 opacity-40">
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            </div>
          </div>

          {loading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white min-h-[600px]">
              <RefreshCw className="w-10 h-10 text-blue-600 animate-spin mb-4" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">Loading Texas Rating Engine...</p>
            </div>
          )}

          <iframe 
            ref={iframeRef}
            id="crqFrame" 
            name="crqFrame" 
            src="https://secure.consumerratequotes.com/ConsumerV2?id=64437" 
            scrolling="no" 
            style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '800px' }}
            onLoad={() => setLoading(false)}
            title="Entrust Insurance Quote Engine"
          />
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12 text-[10px] font-bold uppercase tracking-widest text-black/40">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Licensed Agency #64437</span>
          </div>
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4" />
            <span>Encrypted Data Transmission</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Real-time Carrier Integration</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;