import React from 'react';

const steps = [
  {
    num: '01',
    title: 'Customer Contacts',
    desc: 'Customer calls or sends a message.',
  },
  {
    num: '02',
    title: 'AI Responds',
    desc: 'AI replies instantly, 24/7.',
  },
  {
    num: '03',
    title: 'AI Qualifies',
    desc: 'AI asks questions and collects the details.',
  },
  {
    num: '04',
    title: 'AI Books',
    desc: 'AI checks availability and books the job.',
  },
  {
    num: '05',
    title: 'Team Gets Notified',
    desc: 'The business receives the booking details.',
  },
  {
    num: '06',
    title: 'AI Follows Up',
    desc: "AI follows up if the customer doesn't book.",
  },
];

export const Solution: React.FC = () => {
  return (
    <section id="solution" className="py-24 bg-white border-t border-apple-border/40 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-apple-gray block mb-3">THE SOLUTION</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">From Customer Enquiry to Booked Job</h2>
          <p className="text-apple-gray text-base sm:text-lg">AI responds to customers, qualifies enquiries, books appointments, and follows up automatically.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-8 rounded-3xl bg-apple-lightBg border border-apple-border flex flex-col justify-between shadow-sm hover:border-apple-accent/40 transition-all"
            >
              <div>
                <div className="text-apple-accent font-bold text-xl mb-3 font-mono">{step.num}</div>
                <h3 className="font-semibold text-lg text-apple-darkBg mb-2">{step.title}</h3>
                <p className="text-apple-gray text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
