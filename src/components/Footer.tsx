import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-apple-darkBg text-apple-gray text-xs border-t border-apple-darkBorder text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 AI Automation Systems. All rights reserved.</p>
        <div className="flex items-center space-x-6">
          <a href="#why-ai" className="hover:text-white transition-colors">Market Intelligence</a>
          <a href="#solution" className="hover:text-white transition-colors">How It Works</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};
