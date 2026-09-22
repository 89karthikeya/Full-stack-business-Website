import React from 'react';

interface HeroProps {
  heroRef?: React.Ref<HTMLElement>;
}

export const Hero: React.FC<HeroProps> = ({ heroRef }) => {
  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen bg-white flex flex-col items-center justify-center pt-20 pb-12 overflow-hidden w-full"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-apple-lightBg border border-apple-border text-xs font-semibold text-apple-darkBg mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Next-Gen Operations Architecture</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-apple-darkBg leading-[1.08] mb-4">
          AI Automation Systems for <span className="text-apple-accent">Service Businesses</span>
        </h1>

        <p className="text-base sm:text-lg text-apple-gray max-w-2xl mx-auto mb-6 leading-relaxed">
          We help businesses respond to customers, recover missed calls and book more appointments with AI.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#contact"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-apple-accent hover:bg-apple-accentHover text-white font-medium text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            <span>Book a Free Consultation</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#demo"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-apple-lightBg hover:bg-apple-border/50 text-apple-darkBg font-medium text-sm transition-all border border-apple-border flex items-center justify-center gap-2"
          >
            <span>View Interactive Demo</span>
          </a>
        </div>
      </div>
    </section>
  );
};
