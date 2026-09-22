import React, { useState } from 'react';

const faqs = [
  {
    q: 'How does missed-call recovery work?',
    a: 'When an incoming call is unanswered or drops, our system instantly detects the event and dispatches a personalized SMS within seconds to keep the customer engaged.',
  },
  {
    q: 'Will this replace our office staff?',
    a: 'No. The system acts as an automated assistant that handles repetitive after-hours enquiries and missed calls, freeing up your team to focus on high-value dispatch and customer care.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most systems are audited, built, tested, and launched within 7 to 10 days depending on custom calendar and CRM integrations.',
  },
  {
    q: 'Can it integrate with our existing calendar?',
    a: 'Yes. We integrate directly with major field service software, Google Calendar, Outlook, and popular CRM platforms.',
  },
];

export const Faq: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggle = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="faq" className="py-24 bg-apple-lightBg border-t border-apple-border/40 w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-apple-gray block mb-3">Common Questions</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="text-apple-gray text-base sm:text-lg">Everything you need to know about our AI automation systems.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div key={idx} className="bg-white rounded-2xl border border-apple-border overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="faq-toggle w-full p-6 text-left font-semibold text-base sm:text-lg flex items-center justify-between cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-apple-gray transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-apple-gray text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
