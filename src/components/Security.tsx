import React from 'react';

const securityFeatures = [
  {
    icon: '🔐',
    title: 'Encrypted Data Transport',
    desc: 'All inbound and outbound communications are encrypted in transit and at rest using modern standards.',
  },
  {
    icon: '🛡️',
    title: 'Strict Access Controls',
    desc: 'Role-based permission architecture ensures your team only accesses what they need for dispatch.',
  },
  {
    icon: '⚡',
    title: 'Reliable Infrastructure',
    desc: 'Hosted on high-availability cloud servers with automated redundancy and uptime monitoring.',
  },
];

export const Security: React.FC = () => {
  return (
    <section className="py-24 bg-white border-t border-apple-border/40 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-apple-gray block mb-3">Trust & Reliability</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Enterprise-Grade Security</h2>
          <p className="text-apple-gray text-base sm:text-lg">Your data and customer interactions are protected with rigorous security protocols.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {securityFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-apple-lightBg border border-apple-border flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-apple-accent/10 text-apple-accent flex items-center justify-center mb-6 font-bold text-2xl">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feat.title}</h3>
                <p className="text-apple-gray text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
