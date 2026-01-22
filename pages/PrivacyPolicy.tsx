import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-32 pb-24 animate-fade-in-up">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black serif mb-6">Privacy Policy</h1>
          <p className="text-black/60 font-light">Last Updated: February 2025</p>
        </header>

        <div className="prose prose-slate max-w-none space-y-10 text-black font-light leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black serif">1. Introduction</h2>
            <p>
              Entrust Insurance and Financial Services ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black serif">2. Information Collection</h2>
            <p>
              We collect information that you provide directly to us through our contact forms, quote requests, and other communications. This may include your name, email address, phone number, and details related to your insurance or financial needs.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black serif">3. Use of Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-black">
              <li>Provide and manage insurance quotes and policies.</li>
              <li>Respond to your inquiries and provide customer support.</li>
              <li>Communicate with you about our services and updates.</li>
              <li>Comply with legal and regulatory requirements.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black serif">4. Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your information with insurance carriers and third-party partners solely to obtain quotes and provide the services you requested.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black serif">5. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black serif">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@entrustfin.com" className="text-[#006838] font-medium underline">info@entrustfin.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;