import React, { useState, useRef, useEffect } from 'react';
import { ScenarioType, ScenarioData, ChatMessage } from '../types';

const scenarios: Record<ScenarioType, ScenarioData> = {
  missed_call: {
    banner: 'APPOINTMENT BOOKED · Today at 2:00 PM',
    script: [
      { sender: 'AI ASSISTANT', text: 'Hi! We missed your call. How can we help?' },
      { sender: 'CUSTOMER', text: 'Hi, my AC stopped cooling. Can someone help?' },
      { sender: 'AI ASSISTANT', text: "Yes, we can help. What's your address?" },
      { sender: 'CUSTOMER', text: '124 Main Street.' },
      { sender: 'AI ASSISTANT', text: 'Thanks. Is the AC running but not cooling?' },
      { sender: 'CUSTOMER', text: "Yes, it's running but not cooling." },
      { sender: 'AI ASSISTANT', text: 'Got it. We can send a technician today. We have 2:00 PM or 4:30 PM available.' },
      { sender: 'CUSTOMER', text: '2:00 PM works.' },
      { sender: 'AI ASSISTANT', text: 'Perfect. Your appointment is booked for 2:00 PM today.' },
    ],
  },
  customer_message: {
    banner: 'ESTIMATE SCHEDULED · Tomorrow at 10:00 AM',
    script: [
      { sender: 'AI ASSISTANT', text: 'Hi! Thanks for messaging us. How can we help you today?' },
      { sender: 'CUSTOMER', text: 'Do you offer free estimates for plumbing repairs?' },
      { sender: 'AI ASSISTANT', text: 'Yes, we offer free on-site estimates! Where are you located?' },
      { sender: 'CUSTOMER', text: '742 Evergreen Terrace.' },
      { sender: 'AI ASSISTANT', text: 'Great. We have an estimator in your area tomorrow morning at 10:00 AM.' },
      { sender: 'CUSTOMER', text: '10:00 AM is perfect.' },
      { sender: 'AI ASSISTANT', text: 'Awesome! Your free estimate is scheduled for tomorrow at 10:00 AM.' },
    ],
  },
  quote_request: {
    banner: 'QUOTE CONSULTATION BOOKED · Friday at 1:00 PM',
    script: [
      { sender: 'AI ASSISTANT', text: 'Hi! We received your quote request. What service do you need?' },
      { sender: 'CUSTOMER', text: 'I need a quote to replace my electrical panel.' },
      { sender: 'AI ASSISTANT', text: 'Got it! How many amps is your current panel?' },
      { sender: 'CUSTOMER', text: "It's 100 amps, looking to upgrade to 200 amps." },
      { sender: 'AI ASSISTANT', text: 'Thanks. I can schedule a specialist to inspect and provide an exact quote. How is Friday at 1:00 PM?' },
      { sender: 'CUSTOMER', text: 'Friday at 1:00 PM works great.' },
      { sender: 'AI ASSISTANT', text: 'All set! Specialist scheduled for Friday at 1:00 PM.' },
    ],
  },
  appointment_request: {
    banner: 'APPOINTMENT BOOKED · Thursday at 9:00 AM',
    script: [
      { sender: 'AI ASSISTANT', text: 'Hi! We received your booking request. What day works best for you?' },
      { sender: 'CUSTOMER', text: "I'd like to book a routine furnace tune-up this Thursday." },
      { sender: 'AI ASSISTANT', text: 'We have openings this Thursday at 9:00 AM or 3:00 PM. Which do you prefer?' },
      { sender: 'CUSTOMER', text: '9:00 AM please.' },
      { sender: 'AI ASSISTANT', text: 'Done! Your furnace tune-up is booked for Thursday at 9:00 AM.' },
    ],
  },
  after_hours: {
    banner: 'SERVICE BOOKED · Tomorrow at 8:00 AM',
    script: [
      { sender: 'AI ASSISTANT', text: 'Hi! Our office is closed, but I can still help.' },
      { sender: 'CUSTOMER', text: 'My heater is making a loud noise.' },
      { sender: 'AI ASSISTANT', text: 'Sorry about that! We can have a technician check it first thing in the morning at 8:00 AM.' },
      { sender: 'CUSTOMER', text: 'That would be great, thanks.' },
      { sender: 'AI ASSISTANT', text: "You're all set! A technician will arrive tomorrow at 8:00 AM." },
    ],
  },
  emergency_request: {
    banner: 'EMERGENCY REQUEST RECEIVED · Team notified',
    script: [
      { sender: 'AI ASSISTANT', text: 'Hi! Our office is closed, but I can still help.' },
      { sender: 'CUSTOMER', text: 'Water is leaking from my ceiling.' },
      { sender: 'AI ASSISTANT', text: "I'm sorry. Is the water still leaking?" },
      { sender: 'CUSTOMER', text: 'Yes.' },
      { sender: 'AI ASSISTANT', text: 'Okay. Please stay away from the water and any electrical items.' },
      { sender: 'CUSTOMER', text: 'Okay.' },
      { sender: 'AI ASSISTANT', text: "Thanks. I've sent your emergency request to the team." },
    ],
  },
};

const scenarioButtons: { key: ScenarioType; label: string }[] = [
  { key: 'missed_call', label: '📞 Missed Call' },
  { key: 'customer_message', label: '💬 Customer Message' },
  { key: 'quote_request', label: '📋 Quote Request' },
  { key: 'appointment_request', label: '📅 Appointment Request' },
  { key: 'after_hours', label: '🌙 After-Hours Request' },
  { key: 'emergency_request', label: '🚨 Emergency Request' },
];

export const InteractiveDemo: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<ScenarioType | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerText, setBannerText] = useState('');

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSelectScenario = (type: ScenarioType) => {
    clearAllTimeouts();
    setActiveScenario(type);
    setMessages([]);
    setIsTyping(false);
    setShowBanner(false);

    const scenario = scenarios[type];
    if (!scenario) return;

    let currentDelay = 300;

    scenario.script.forEach((msg) => {
      const isAI = msg.sender === 'AI ASSISTANT';

      if (isAI) {
        const typingTimeout = setTimeout(() => {
          setIsTyping(true);
        }, currentDelay);
        timeoutsRef.current.push(typingTimeout);
        currentDelay += 2000;
      }

      const msgTimeout = setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, msg]);
      }, currentDelay);
      timeoutsRef.current.push(msgTimeout);
      currentDelay += 2500;
    });

    const finalTimeout = setTimeout(() => {
      setBannerText(scenario.banner);
      setShowBanner(true);
    }, currentDelay + 200);
    timeoutsRef.current.push(finalTimeout);
  };

  return (
    <section id="demo" className="py-24 bg-apple-lightBg border-t border-apple-border/40 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-apple-gray block mb-3">Live Demonstration</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Experience the Automation Flow</h2>
          <p className="text-apple-gray text-base sm:text-lg">Test how an inbound customer enquiry is handled and turned into a booked appointment.</p>
        </div>

        {/* Demo Card */}
        <div className="bg-white rounded-3xl border border-apple-border p-6 sm:p-10 shadow-lg w-full">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Control Panel */}
            <div className="w-full lg:w-5/12 space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Test a Customer Request</h3>
                <p className="text-apple-gray text-sm">Choose a situation to see how the AI responds.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scenarioButtons.map((btn) => {
                  const isActive = activeScenario === btn.key;
                  return (
                    <button
                      key={btn.key}
                      onClick={() => handleSelectScenario(btn.key)}
                      id={`btn-${btn.key}`}
                      className={
                        isActive
                          ? 'w-full text-left p-3.5 rounded-2xl bg-white border-2 border-apple-accent text-sm font-medium transition-all flex items-center justify-between cursor-pointer shadow-sm'
                          : 'w-full text-left p-3.5 rounded-2xl bg-apple-lightBg border border-apple-border text-sm font-medium hover:border-apple-accent transition-all flex items-center justify-between cursor-pointer'
                      }
                    >
                      <span className="flex items-center gap-2">{btn.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Chat Interactive Simulation */}
            <div className="w-full lg:w-7/12 bg-apple-darkBg text-white p-6 sm:p-8 rounded-2xl border border-apple-darkBorder flex flex-col justify-between min-h-[480px]">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-apple-darkBorder mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-mono uppercase tracking-wider text-apple-gray">Conversation Simulation</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-apple-cardBg border border-apple-darkBorder text-emerald-400">DEMO SIMULATION</span>
                </div>

                {/* Chat Messages Window */}
                <div
                  id="demo-chat-container"
                  ref={chatContainerRef}
                  className={`space-y-3 min-h-[280px] max-h-[340px] overflow-y-auto pr-1 ${
                    !activeScenario ? 'flex flex-col justify-center items-center' : ''
                  }`}
                >
                  {!activeScenario && (
                    <p id="demo-placeholder-text" className="text-apple-gray text-sm text-center py-12 italic">
                      Choose a scenario above to start the demo.
                    </p>
                  )}

                  {messages.map((msg, idx) => {
                    const isAI = msg.sender === 'AI ASSISTANT';
                    return (
                      <div
                        key={idx}
                        className={isAI ? 'flex flex-col items-start space-y-1' : 'flex flex-col items-end space-y-1'}
                      >
                        {isAI ? (
                          <span className="text-[10px] font-mono text-apple-accent font-bold uppercase tracking-wider">
                            AI ASSISTANT
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-apple-gray font-bold uppercase tracking-wider">
                            CUSTOMER
                          </span>
                        )}
                        <div
                          className={
                            isAI
                              ? 'bg-apple-cardBg border border-apple-darkBorder text-white rounded-2xl rounded-tl-none p-3 max-w-[85%] text-xs leading-relaxed shadow-sm'
                              : 'bg-apple-accent text-white rounded-2xl rounded-tr-none p-3 max-w-[85%] text-xs leading-relaxed shadow-sm'
                          }
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div id="typing-indicator" className="mt-3 text-xs font-mono text-apple-gray flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-apple-accent animate-ping"></span>
                      <span>AI Assistant is typing</span>
                      <span className="inline-flex gap-0.5">
                        <span className="animate-bounce font-bold">.</span>
                        <span className="animate-bounce font-bold" style={{ animationDelay: '0.2s' }}>.</span>
                        <span className="animate-bounce font-bold" style={{ animationDelay: '0.4s' }}>.</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Result Banner */}
              <div
                id="demo-success-banner"
                className={`${
                  showBanner ? 'flex' : 'hidden'
                } mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono items-center justify-between`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-apple-darkBg flex items-center justify-center font-bold text-xs">✓</span>
                  <span id="demo-banner-text" className="font-medium">{bannerText}</span>
                </div>
                <span className="text-[10px] text-emerald-400/80">Synced</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
