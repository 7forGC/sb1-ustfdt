import React from 'react';
import { Heart } from 'lucide-react';

interface DonationHeartProps {
  className?: string;
}

export const DonationHeart: React.FC<DonationHeartProps> = ({ className = "" }) => {
  const handleDonation = () => {
    window.open('https://donate.stripe.com/test_donation', '_blank');
  };

  return (
    <button
      onClick={handleDonation}
      className={`group relative ${className}`}
      aria-label="Support our project"
    >
      <Heart 
        className="w-6 h-6 text-white/80 hover:text-pink-400 transition-colors duration-300 hover:fill-pink-400"
        fill="transparent"
      />
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg pointer-events-none">
        Support our project
      </span>
    </button>
  );
};