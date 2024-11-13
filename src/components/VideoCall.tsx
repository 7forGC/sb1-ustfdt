import React, { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users, Plus, X } from 'lucide-react';
import { useStore } from '../store/useStore';

export const VideoCall = () => {
  const { users, currentUser } = useStore();
  const [participants, setParticipants] = useState([
    users[0], // Ana Marković
    users[1], // Marko Petrović
  ]);
  const [showAddParticipants, setShowAddParticipants] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const addParticipant = (user: typeof users[0]) => {
    if (participants.length < 6) {
      setParticipants([...participants, user]);
    }
  };

  const removeParticipant = (userId: string) => {
    setParticipants(participants.filter(p => p.id !== userId));
  };

  return (
    <div className="flex-1 bg-gray-900 flex flex-col">
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
          {participants.map((participant) => (
            <div key={participant.id} className="relative rounded-xl overflow-hidden aspect-video bg-gray-800">
              <img
                src={participant.avatar}
                alt={participant.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-white bg-black/50 px-3 py-1 rounded-full text-sm">
                  {participant.name}
                  {participant.id === currentUser?.id && ' (You)'}
                </span>
                {participant.id !== currentUser?.id && (
                  <button
                    onClick={() => removeParticipant(participant.id)}
                    className="p-1.5 rounded-full bg-red-500/80 text-white hover:bg-red-600/80 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              {participant.id === currentUser?.id && (
                <div className="absolute top-4 right-4 space-x-2">
                  {isMuted && (
                    <span className="bg-red-500/80 p-1.5 rounded-full">
                      <MicOff size={16} className="text-white" />
                    </span>
                  )}
                  {isVideoOff && (
                    <span className="bg-red-500/80 p-1.5 rounded-full">
                      <VideoOff size={16} className="text-white" />
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
          {participants.length < 6 && (
            <button
              onClick={() => setShowAddParticipants(true)}
              className="aspect-video rounded-xl border-2 border-dashed border-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-300 hover:border-gray-600 transition-colors"
            >
              <div className="flex flex-col items-center">
                <Plus size={24} />
                <span className="mt-2 text-sm">Add Participant</span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Add Participants Modal */}
      {showAddParticipants && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Add Participants</h3>
              <button
                onClick={() => setShowAddParticipants(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              {users
                .filter(user => !participants.find(p => p.id === user.id))
                .map(user => (
                  <button
                    key={user.id}
                    onClick={() => {
                      addParticipant(user);
                      setShowAddParticipants(false);
                    }}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 text-left">
                      <h4 className="font-medium">{user.name}</h4>
                      <p className="text-sm text-gray-500">{user.status}</p>
                    </div>
                    <Plus size={20} className="text-gray-400" />
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Control Bar */}
      <div className="h-20 bg-gray-800 flex items-center justify-center space-x-4">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-4 rounded-full ${
            isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
          } text-white transition-colors`}
        >
          {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
        </button>
        <button
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`p-4 rounded-full ${
            isVideoOff ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
          } text-white transition-colors`}
        >
          {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
        </button>
        <button className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors">
          <PhoneOff size={24} />
        </button>
        <button
          onClick={() => setShowAddParticipants(true)}
          className="p-4 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
        >
          <Users size={24} />
        </button>
      </div>
    </div>
  );
};