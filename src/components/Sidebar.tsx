import React from 'react';
import { MessageSquare, Video, Users, User } from 'lucide-react';
import { Logo } from './Logo';

export const Sidebar = () => {
  return (
    <div className="w-16 md:w-20 h-screen bg-gradient-sidebar flex flex-col items-center py-4 md:py-8 shrink-0">
      <div className="mb-8 text-center">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mx-auto shadow-lg overflow-hidden">
          <Logo white />
        </div>
        <span className="hidden md:block text-white text-xs mt-2 font-medium">7 for all GC</span>
      </div>

      <div className="space-y-4 md:space-y-8">
        {[
          { icon: MessageSquare, label: 'Chat' },
          { icon: Video, label: 'Calls' },
          { icon: Users, label: 'Contacts' },
          { icon: User, label: 'Profile' }
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="p-2 md:p-3 rounded-xl transition-all transform hover:scale-110 group relative text-white/70 hover:text-white hover:bg-white/10"
          >
            <Icon size={20} className="md:w-6 md:h-6" />
            <span className="absolute left-full ml-2 px-2 py-1 bg-white rounded-md text-primary text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};