import React from 'react';

export const Dashboard: React.FC = () => {
  return (
    <section id="dashboard" className="py-24 bg-apple-lightBg border-t border-apple-border/40 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-apple-gray block mb-3">Control Center</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Complete Visibility & Control</h2>
          <p className="text-apple-gray text-base sm:text-lg">Monitor every enquiry, missed call recovery, and booked appointment in real time.</p>
        </div>

        {/* Premium SaaS Dashboard Container */}
        <div className="w-full rounded-3xl bg-apple-darkBg border border-apple-darkBorder p-6 sm:p-10 shadow-2xl text-white overflow-hidden">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-apple-darkBorder gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-apple-accent">System Overview</span>
              <h3 className="text-xl font-bold mt-1">Live Operations Dashboard</h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-apple-cardBg border border-apple-darkBorder text-xs text-apple-gray font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-white font-medium">DEMO DATA</span>
            </div>
          </div>

          {/* KPI Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {/* KPI Card 1 */}
            <div className="p-6 rounded-2xl bg-apple-cardBg border border-apple-darkBorder flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono text-apple-gray uppercase tracking-wider">Recovered Missed Calls</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">142</div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span>↑ +28%</span>
                  <span className="text-apple-gray font-normal">vs average this month</span>
                </div>
              </div>
            </div>

            {/* KPI Card 2 */}
            <div className="p-6 rounded-2xl bg-apple-cardBg border border-apple-darkBorder flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono text-apple-gray uppercase tracking-wider">Avg. Response Time</span>
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">18 sec</div>
                <div className="text-xs text-apple-gray font-medium">Automated response</div>
              </div>
            </div>

            {/* KPI Card 3 */}
            <div className="p-6 rounded-2xl bg-apple-cardBg border border-apple-darkBorder flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono text-apple-gray uppercase tracking-wider">Appointments Booked</span>
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">89</div>
                <div className="text-xs text-apple-gray font-medium">Synced to calendar</div>
              </div>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="p-6 rounded-2xl bg-apple-cardBg/60 border border-apple-darkBorder mb-8">
            <div className="flex items-center justify-between pb-4 border-b border-apple-darkBorder/60 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-apple-gray">Recent Activity</span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-apple-darkBorder text-apple-gray">DEMO ACTIVITY</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-apple-darkBg/50 border border-apple-darkBorder/40">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-white font-medium">Missed call recovered</span>
                </div>
                <span className="text-apple-gray font-mono text-[11px]">2 min ago</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-apple-darkBg/50 border border-apple-darkBorder/40">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  <span className="text-white font-medium">New service enquiry received</span>
                </div>
                <span className="text-apple-gray font-mono text-[11px]">8 min ago</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-apple-darkBg/50 border border-apple-darkBorder/40">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  <span className="text-white font-medium">Appointment booked</span>
                </div>
                <span className="text-apple-gray font-mono text-[11px]">14 min ago</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-apple-darkBg/50 border border-apple-darkBorder/40">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span className="text-white font-medium">Follow-up message sent</span>
                </div>
                <span className="text-apple-gray font-mono text-[11px]">21 min ago</span>
              </div>
            </div>
          </div>

          {/* System Status Row */}
          <div className="p-4 rounded-2xl bg-apple-cardBg/40 border border-apple-darkBorder/60 mb-6 flex flex-wrap items-center justify-between gap-4 text-xs text-apple-gray">
            <span className="font-mono text-[11px] uppercase tracking-wider text-white/80">System Status</span>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-white text-xs font-medium">Automation Active</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-white text-xs font-medium">Calendar Connected</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-white text-xs font-medium">Notifications Active</span>
              </div>
            </div>
          </div>

          {/* Security Message */}
          <div className="pt-4 border-t border-apple-darkBorder/60 text-xs text-apple-gray flex items-center justify-center sm:justify-start gap-2">
            <span>🔒</span>
            <span>Secure cloud infrastructure · Your customer data is protected with secure access controls.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
