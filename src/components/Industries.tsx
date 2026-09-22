import React from 'react';

const industryList = [
  {
    icon: '🏠',
    title: 'HVAC & Plumbing',
    desc: 'Emergency dispatch & instant quote follow-up.',
  },
  {
    icon: '⚡',
    title: 'Electrical Services',
    desc: 'Missed call recovery & booking confirmation.',
  },
  {
    icon: '🏗️',
    title: 'General Contractors',
    desc: 'Lead qualification & consultation scheduling.',
  },
  {
    icon: '🛡️',
    title: 'Restoration & Cleanup',
    desc: '24/7 intake & emergency triage routing.',
  },
  {
    icon: '🧹',
    title: 'Commercial Cleaning',
    desc: 'Recurring booking & estimate follow-ups.',
  },
  {
    icon: '🌳',
    title: 'Landscaping & Tree',
    desc: 'Seasonal estimate intake & scheduling.',
  },
  {
    icon: '🚗',
    title: 'Mobile Auto Services',
    desc: 'Instant dispatch & availability checks.',
  },
  {
    icon: '🔧',
    title: 'Specialty Trades',
    desc: 'Customized communication pipelines.',
  },
];

export const Industries: React.FC = () => {
  return (
    <section id="industries" className="py-24 bg-white border-t border-apple-border/40 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-apple-gray block mb-3">Industries Served</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Built for Field & Service Businesses</h2>
          <p className="text-apple-gray text-base sm:text-lg">Designed specifically for local and regional businesses where response speed directly drives booked jobs.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industryList.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-apple-lightBg border border-apple-border text-center shadow-sm"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-xs text-apple-gray leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
