import React from 'react';
import { ExternalLink, Phone, AlertTriangle, Info } from 'lucide-react';

const Claims: React.FC = () => {
  const carriers = [
    {
      name: "Alinsco Ins",
      logo: "https://i.ibb.co/gZCJNYQH/alinsco.png",
      color: "bg-white",
      url: "https://www.alinsco.com/file-a-claim"
    },
    {
      name: "Acacia Ins",
      logo: "https://i.ibb.co/271CjpMR/acacia.png",
      color: "bg-white",
      url: "https://www.acaciainsurance.com/"
    },
    {
      name: "Lamar Gen Ins",
      logo: "https://i.ibb.co/0yZKWx1C/lamar.png",
      color: "bg-white",
      url: "https://lamargenagency.com/"
    },
    {
      name: "Assurance America",
      logo: "https://i.ibb.co/Q3nq8s48/assurance-america.png",
      color: "bg-white",
      url: "https://www.assuranceamerica.com/Contact"
    },
    {
      name: "Bluefire Ins",
      logo: "https://i.ibb.co/SXFkZkf0/bluefire.jpg",
      color: "bg-white",
      url: "https://claims.bluefireinsurance.com/Login?correlationid=GA3456428d-e542-4f6b-af45-9b1ff2c6f2f0"
    },
    {
      name: "Bristol West Ins",
      logo: "https://i.ibb.co/G4rNgxj7/bristow.png",
      color: "bg-white",
      url: "https://www.bristolwest.com/home/claims/"
    },
    {
      name: "Progressive Ins",
      logo: "https://i.ibb.co/bgJmTF7g/progressive.png",
      color: "bg-white",
      url: "https://www.progressive.com/claims/"
    },
    {
      name: "Commonwealth Ins",
      logo: "https://i.ibb.co/hxHZp9sQ/commonwealth.jpg",
      color: "bg-white",
      url: "https://www.commonwealthcasualty.com/claims/"
    },
    {
      name: "Falcon Ins",
      logo: "https://i.ibb.co/Kxj7s8zL/falcon.png",
      color: "bg-white",
      url: "https://www.alamocityins.com/contact"
    },
    {
      name: "Geico Ins",
      logo: "https://i.ibb.co/5gj2Y69z/geico.jpg",
      color: "bg-white",
      url: "https://www.geico.com/claims/"
    },
    {
      name: "Trexis Ins",
      logo: "https://i.ibb.co/rGGX6HtH/trexis.png",
      color: "bg-white",
      url: "https://www.trexis.com/#LoginReportClaim"
    },
    {
      name: "Safeco Ins",
      logo: "https://i.ibb.co/bjYP5s7d/safeco.png",
      color: "bg-white",
      url: "https://www.safeco.com/claims"
    }
  ];

  return (
    <div className="pt-32 pb-24 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-6">
        <header className="max-w-3xl mb-16 md:mb-24 space-y-6 text-center mx-auto">
          <p className="text-[#006838] font-bold uppercase tracking-[0.2em] text-[10px]">Claims Support</p>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 serif leading-[1.1]">
            Claim Filing.
          </h1>
          <p className="text-lg text-gray-500 font-light leading-relaxed">
            For fastest service, we recommend filing your claim directly with your carrier. Select your provider below to visit their official portal.
          </p>
        </header>

        {/* Carrier Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mb-24 md:mb-32">
          {carriers.map((carrier, idx) => (
            <a 
              key={idx} 
              href={carrier.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-6 md:p-8 bg-white border border-gray-100 rounded-3xl md:rounded-[3.5rem] hover:shadow-2xl hover:border-green-100 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden h-full shadow-sm"
            >
              <div className={`w-24 h-24 md:w-32 md:h-32 ${carrier.color} rounded-2xl md:rounded-[2.5rem] flex items-center justify-center mb-6 md:mb-8 group-hover:scale-105 transition-transform shadow-md overflow-hidden bg-white`}>
                {carrier.logo.startsWith('http') ? (
                  <img 
                    src={carrier.logo} 
                    alt={carrier.name} 
                    className="w-full h-full object-contain p-2 md:p-4" 
                  />
                ) : (
                  <span className="text-gray-900 font-bold">{carrier.name}</span>
                )}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 serif leading-tight">{carrier.name}</h3>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mb-6">Auto Insurance</p>
              
              <div className="mt-auto flex items-center text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#006838] group-hover:text-[#004e2a]">
                File Online <ExternalLink className="ml-1.5 w-3 h-3 md:w-3.5 md:h-3.5" />
              </div>
            </a>
          ))}
        </div>

        {/* Support Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 bg-[#006838] text-white rounded-3xl lg:rounded-[2.5rem] shadow-xl shadow-green-100">
              <h3 className="text-xl font-bold serif mb-4">Entrust Support</h3>
              <p className="text-green-50 text-sm font-light leading-relaxed mb-8">
                Not seeing your carrier? Our local team is here to advocate for you during the claims process.
              </p>
              <a href="tel:4692649199" className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all border border-white/10">
                <Phone className="w-5 h-5 text-green-300" />
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-green-200">Main Office</p>
                  <p className="text-lg font-bold">(469) 264-9199</p>
                </div>
              </a>
            </div>

            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 flex items-start space-x-4">
              <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Emergency?</h4>
                <p className="text-xs text-gray-500 font-light mt-1">If this is a life-threatening emergency, please dial 911 immediately.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl lg:rounded-[3rem] p-8 md:p-12 lg:p-16 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 serif mb-10 flex items-center">
              <Info className="w-8 h-8 text-[#006838] mr-4" />
              Pro-Tips for Claims
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#006838] rounded-full"></div>
                  <h4 className="font-bold text-gray-900 text-sm">Document Everything</h4>
                </div>
                <p className="text-xs text-gray-500 font-light leading-relaxed pl-5">
                  Take clear photos of all damage and obtain copies of police reports immediately.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#006838] rounded-full"></div>
                  <h4 className="font-bold text-gray-900 text-sm">Act Promptly</h4>
                </div>
                <p className="text-xs text-gray-500 font-light leading-relaxed pl-5">
                  Texas policy requirements often necessitate immediate notification of a loss.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#006838] rounded-full"></div>
                  <h4 className="font-bold text-gray-900 text-sm">Keep Receipts</h4>
                </div>
                <p className="text-xs text-gray-500 font-light leading-relaxed pl-5">
                  Save receipts for emergency repairs or temporary housing as a direct result of the loss.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#006838] rounded-full"></div>
                  <h4 className="font-bold text-gray-900 text-sm">Expert Guidance</h4>
                </div>
                <p className="text-xs text-gray-500 font-light leading-relaxed pl-5">
                  Our DFW team is available to help interpret complex policy language during your claim.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Claims;