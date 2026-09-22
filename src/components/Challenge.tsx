import React from 'react';

export const Challenge: React.FC = () => {
  return (
    <section id="challenge" className="py-24 bg-apple-darkBg text-white border-t border-apple-darkBorder w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-apple-accent block mb-3">THE CHALLENGE</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Where Do Service Businesses Lose Customers?</h2>
          <p className="text-apple-gray text-base sm:text-lg">Service businesses can lose customers when they don't respond quickly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Challenge Card 1 */}
          <div className="p-6 sm:p-8 rounded-2xl bg-apple-cardBg border border-apple-darkBorder flex flex-col justify-between transition-all">
            <div>
              <div className="text-apple-accent font-bold text-sm mb-3 font-mono">01</div>
              <h3 className="text-xl font-bold text-white mb-2">Missed Calls</h3>
              <p className="text-apple-gray text-sm leading-relaxed mb-6">Your team may be busy and unable to answer every call.</p>
            </div>
            <div className="pt-4 border-t border-apple-darkBorder/60 text-xs">
              <span className="text-apple-gray/70 font-semibold uppercase tracking-wider block mb-1 text-[10px]">Impact:</span>
              <span className="text-apple-gray font-medium">Customers may call another business.</span>
            </div>
          </div>

          {/* Challenge Card 2 */}
          <div className="p-6 sm:p-8 rounded-2xl bg-apple-cardBg border border-apple-darkBorder flex flex-col justify-between transition-all">
            <div>
              <div className="text-apple-accent font-bold text-sm mb-3 font-mono">02</div>
              <h3 className="text-xl font-bold text-white mb-2">Slow Replies</h3>
              <p className="text-apple-gray text-sm leading-relaxed mb-6">Customers may not get a quick response to their enquiry.</p>
            </div>
            <div className="pt-4 border-t border-apple-darkBorder/60 text-xs">
              <span className="text-apple-gray/70 font-semibold uppercase tracking-wider block mb-1 text-[10px]">Impact:</span>
              <span className="text-apple-gray font-medium">They may lose interest or choose another business.</span>
            </div>
          </div>

          {/* Challenge Card 3 */}
          <div className="p-6 sm:p-8 rounded-2xl bg-apple-cardBg border border-apple-darkBorder flex flex-col justify-between transition-all">
            <div>
              <div className="text-apple-accent font-bold text-sm mb-3 font-mono">03</div>
              <h3 className="text-xl font-bold text-white mb-2">Forgotten Follow-Ups</h3>
              <p className="text-apple-gray text-sm leading-relaxed mb-6">Quotes and estimates may not get followed up.</p>
            </div>
            <div className="pt-4 border-t border-apple-darkBorder/60 text-xs">
              <span className="text-apple-gray/70 font-semibold uppercase tracking-wider block mb-1 text-[10px]">Impact:</span>
              <span className="text-apple-gray font-medium">Interested customers can be lost.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
