import React, { useEffect, useRef, useState } from 'react';

interface StatItem {
  id: string;
  target: number;
  title: string;
  desc: string;
  source: string;
  sourceUrl: string;
  className?: string;
}

const statsData: StatItem[] = [
  {
    id: 'stat-1',
    target: 76,
    title: 'Gen AI Business Adoption',
    desc: 'Enterprises and growing service firms integrating generative AI into core workflows.',
    source: 'Goldman Sachs · 2026',
    sourceUrl: 'https://www.goldmansachs.com',
  },
  {
    id: 'stat-2',
    target: 93,
    title: 'Productivity Gain',
    desc: 'Documented operational efficiency lift achieved through workflow automation agents.',
    source: 'Goldman Sachs · 2026',
    sourceUrl: 'https://www.goldmansachs.com',
  },
  {
    id: 'stat-3',
    target: 84,
    title: 'Customer Expectation',
    desc: 'Consumers expect immediate responses to service enquiries regardless of business hours.',
    source: 'Goldman Sachs · 2026',
    sourceUrl: 'https://www.goldmansachs.com',
  },
  {
    id: 'stat-4',
    target: 90,
    title: 'SMB Growth Impact',
    desc: 'Small and medium businesses accelerating customer acquisition with AI automation tools.',
    source: 'Salesforce SMB Report · 2025',
    sourceUrl: 'https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/resources/smb-trends-report-6th-edition_Salesforce.pdf',
  },
  {
    id: 'stat-5',
    target: 73,
    title: 'Operational Efficiency',
    desc: 'Chamber surveyed businesses reporting streamlined administrative tasks through AI.',
    source: 'U.S. Chamber of Commerce · 2025',
    sourceUrl: 'https://www.uschamber.com/technology/artificial-intelligence/small-businesses-are-harnessing-ai-to-innovate-and-compete',
    className: 'md:col-span-2 lg:col-span-1',
  },
];

export const WhyAi: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    'stat-1': 0,
    'stat-2': 0,
    'stat-3': 0,
    'stat-4': 0,
    'stat-5': 0,
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let hasAnimated = false;
    let animId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            animate();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    const animate = () => {
      const duration = 1500;
      const startTime = performance.now();

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        const newCounts: { [key: string]: number } = {};
        statsData.forEach((stat) => {
          newCounts[stat.id] = Math.floor(stat.target * easeProgress);
        });

        setCounts(newCounts);

        if (progress < 1) {
          animId = requestAnimationFrame(step);
        } else {
          const finalCounts: { [key: string]: number } = {};
          statsData.forEach((stat) => {
            finalCounts[stat.id] = stat.target;
          });
          setCounts(finalCounts);
        }
      };

      animId = requestAnimationFrame(step);
    };

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section id="why-ai" ref={sectionRef} className="py-24 bg-apple-lightBg border-t border-apple-border/40 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-apple-gray block mb-3">Market Intelligence</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Why Speed & AI Matter</h2>
          <p className="text-apple-gray text-base sm:text-lg">Verified benchmarks from global research institutions on modern service customer expectations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className={`p-8 rounded-3xl bg-white border border-apple-border flex flex-col justify-between shadow-sm ${
                stat.className || ''
              }`}
            >
              <div>
                <div
                  className="stat-number text-4xl sm:text-5xl font-bold text-apple-accent mb-3 tracking-tight"
                  data-target={stat.target}
                >
                  {counts[stat.id] ?? 0}%
                </div>
                <h3 className="text-base font-semibold text-apple-darkBg mb-2">{stat.title}</h3>
                <p className="text-apple-gray text-sm leading-relaxed">{stat.desc}</p>
              </div>
              <div className="mt-8 pt-4 border-t border-apple-border/60 flex items-center justify-between text-xs text-apple-gray">
                <span>{stat.source}</span>
                <a
                  href={stat.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-apple-accent hover:underline flex items-center gap-1"
                >
                  <span>Source</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
