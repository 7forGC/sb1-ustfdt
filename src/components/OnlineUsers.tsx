import React from 'react';

const DEMO_USERS = [
  { id: '1', name: 'Guest User 1', status: 'online' },
  { id: '2', name: 'Guest User 2', status: 'online' },
  { id: '3', name: 'Guest User 3', status: 'away' },
];

export const OnlineUsers = () => {
  return (
    <div className="hidden md:block w-64 xl:w-80 border-l bg-white shrink-0">
      <div className="p-4 border-b bg-gradient-custom text-white">
        <h2 className="text-lg font-semibold">Online Users</h2>
        <p className="text-sm opacity-80">{DEMO_USERS.length} active now</p>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-4rem)]">
        {DEMO_USERS.map(user => (
          <div key={user.id} className="p-4 border-b hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 font-medium">{user.name[0]}</span>
                </div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  user.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{user.name}</h3>
                <p className="text-sm text-gray-500 truncate">{user.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};