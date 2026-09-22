/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyAi } from './components/WhyAi';
import { Challenge } from './components/Challenge';
import { Solution } from './components/Solution';
import { InteractiveDemo } from './components/InteractiveDemo';
import { Industries } from './components/Industries';
import { Dashboard } from './components/Dashboard';
import { Security } from './components/Security';
import { Faq } from './components/Faq';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [showNavCta, setShowNavCta] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If hero is intersecting, hide navbar CTA; otherwise show it
          setShowNavCta(!entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(heroEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-white text-apple-darkBg antialiased selection:bg-apple-accent selection:text-white min-h-screen w-full">
      <Header showCta={showNavCta} />

      <main className="w-full">
        <Hero heroRef={heroRef} />
        <WhyAi />
        <Challenge />
        <Solution />
        <InteractiveDemo />
        <Industries />
        <Dashboard />
        <Security />
        <Faq />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
