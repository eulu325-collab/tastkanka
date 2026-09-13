import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/anasayfa" className={`flex items-center gap-2 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="16" fill="#2F6FED" />
        <path
          d="M20 40 L28 30 L34 36 L44 24"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="44" cy="24" r="3.5" fill="white" />
        <circle cx="20" cy="40" r="3.5" fill="white" />
        <rect x="16" y="16" width="32" height="32" rx="8" stroke="white" strokeWidth="2.5" fill="none" opacity="0.55" />
      </svg>
      <span className="font-display text-lg font-bold text-navy">ResimLink</span>
    </Link>
  );
}
