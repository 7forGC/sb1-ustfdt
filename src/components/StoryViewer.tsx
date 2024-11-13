import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Story, User } from '../types';
import { userService } from '../services/userService';

interface StoryViewerProps {
  stories: Story[];
  currentUser: User;
  onClose: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({ stories, currentUser, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const story = stories[currentIndex];
    if (!story) return;

    // Mark story as viewed
    if (!story.views.includes(currentUser.id)) {
      userService.markStoryAsViewed(story.id, currentUser.id);
    }

    // Progress bar
    const duration = story.duration || 60;
    const interval = 100;
    const step = (interval / (duration * 1000)) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentIndex < stories.length - 1) {
            setCurrentIndex(prev => prev + 1);
            return 0;
          } else {
            clearInterval(timer);
            onClose();
            return prev;
          }
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, stories, currentUser.id, onClose]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const currentStory = stories[currentIndex];
  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-full max-w-lg mx-auto aspect-[9/16]">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
          <div 
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Story content */}
        {currentStory.mediaType === 'video' ? (
          <video
            src={currentStory.mediaUrl}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={currentStory.mediaUrl}
            alt="Story"
            className="w-full h-full object-cover"
          />
        )}

        {/* Navigation */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white hover:bg-black/30 transition-colors"
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white hover:bg-black/30 transition-colors"
        >
          <ChevronRight size={24} />
        </button>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/30 transition-colors"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};