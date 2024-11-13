import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Image, 
  Video, 
  Send, 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  X,
  Loader2
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTranslation } from 'react-i18next';
import { StoryViewer } from './StoryViewer';
import { userService } from '../services/userService';
import { DonationHeart } from './DonationHeart';
import type { Post, Story } from '../types';

export const Profile = () => {
  const { t } = useTranslation();
  const { currentUser, updateUserLanguage } = useStore();
  const [showLanguages, setShowLanguages] = useState(false);
  const [selectedStories, setSelectedStories] = useState<Story[] | null>(null);
  const [postContent, setPostContent] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMediaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedMedia(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const createPost = async () => {
    if (!currentUser || (!postContent.trim() && !selectedMedia)) return;

    setIsSubmitting(true);
    try {
      let mediaUrl;
      let mediaType;

      if (selectedMedia) {
        mediaType = selectedMedia.type.startsWith('image/') ? 'image' : 'video';
        mediaUrl = await userService.uploadMedia(selectedMedia);
      }

      await userService.createPost({
        userId: currentUser.id,
        content: postContent,
        mediaUrl,
        mediaType,
        likes: [],
        comments: [],
        createdAt: Date.now()
      });

      setPostContent('');
      setSelectedMedia(null);
      setMediaPreview(null);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="relative h-48 bg-gradient-custom">
            <div className="absolute top-4 right-4">
              <DonationHeart />
            </div>
            <div className="absolute -bottom-12 left-8 flex items-end space-x-4">
              <div className="relative">
                <img
                  src={currentUser?.photoURL || 'https://via.placeholder.com/200'}
                  alt={currentUser?.displayName || 'Profile'}
                  className="w-24 h-24 rounded-full border-4 border-white object-cover"
                />
                <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors">
                  <Camera size={16} />
                </button>
              </div>
              <div className="mb-12">
                <h1 className="text-2xl font-bold text-white">{currentUser?.displayName || 'Anonymous'}</h1>
                <p className="text-white/80">{currentUser?.email || 'Guest User'}</p>
              </div>
            </div>
          </div>
          
          {/* Rest of the profile content remains the same */}
          {/* ... */}
        </div>
      </div>

      {selectedStories && (
        <StoryViewer
          stories={selectedStories}
          currentUser={currentUser!}
          onClose={() => setSelectedStories(null)}
        />
      )}
    </div>
  );
};