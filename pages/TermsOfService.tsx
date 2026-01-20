import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="pt-32 pb-24 animate-fade-in-up">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 serif mb-6">Terms of Service</h1>
          <p className="text-gray-500 font-light">Last Updated: February 2025</p>
        </header>

        <div className="prose prose-slate max-w-none space-y-10 text-gray-600 font-light leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 serif">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 serif">2. Use of Website</h2>
            <p>
              The content provided on this website is for informational purposes only. It does not constitute legal, financial, or insurance advice. Your use of the website is at your own risk.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 serif">3. Insurance Quotes</h2>
            <p>
              Any insurance quotes or financial estimates provided through this website are preliminary and subject to change. Final coverage and rates are determined by the insurance carriers based on underwriting guidelines.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 serif">4. Intellectual Property</h2>
            <p>
              All content on this website, including logos, text, and graphics, is the property of Entrust Insurance and Financial Services and is protected by copyright laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 serif">5. Limitation of Liability</h2>
            <p>
              Entrust Insurance and Financial Services shall not be liable for any direct, indirect, or consequential damages arising out of your use or inability to use this website or our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 serif">6. Governing Law</h2>
            <p>
              These Terms of Service are governed by the laws of the State of Texas. Any disputes shall be resolved in the courts of Richardson, TX.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;