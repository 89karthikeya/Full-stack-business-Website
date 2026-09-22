/**
 * Visual icons and graphic markers for AI Automation Systems
 */
import React from 'react';

export const CheckmarkBadge: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <span className={`rounded-full bg-emerald-500 text-apple-darkBg flex items-center justify-center font-bold text-xs ${className}`}>
    ✓
  </span>
);

export const ActiveDot: React.FC<{ color?: string; pulse?: boolean }> = ({ color = 'bg-emerald-400', pulse = true }) => (
  <span className={`w-2 h-2 rounded-full ${color} ${pulse ? 'animate-pulse' : ''}`}></span>
);
