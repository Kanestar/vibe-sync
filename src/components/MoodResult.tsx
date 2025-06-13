import React from 'react';
import { Brain, TrendingUp, Calendar } from 'lucide-react';
import { MoodCategory } from '../types';

interface MoodResultProps {
  moodCategory: MoodCategory;
  onClose: () => void;
}

export const MoodResult: React.FC<MoodResultProps> = ({ moodCategory, onClose }) => {
  const getMoodColor = (category: string) => {
    switch (category) {
      case 'stressed':
        return 'from-red-500 to-orange-500';
      case 'calm':
        return 'from-green-500 to-blue-500';
      case 'energetic':
        return 'from-yellow-500 to-orange-500';
      case 'focused':
        return 'from-blue-500 to-indigo-500';
      case 'creative':
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-purple-500 to-pink-500';
    }
  };

  const getMoodEmoji = (category: string) => {
    switch (category) {
      case 'stressed':
        return '😓';
      case 'calm':
        return '😌';
      case 'energetic':
        return '⚡';
      case 'focused':
        return '🎯';
      case 'creative':
        return '🎨';
      default:
        return '🤔';
    }
  };

  const getMoodDescription = (category: string) => {
    switch (category) {
      case 'stressed':
        return 'You\'re experiencing some tension. Let\'s help you find your center with calming activities.';
      case 'calm':
        return 'You\'re in a peaceful state. Perfect time for mindful activities and gentle wellness practices.';
      case 'energetic':
        return 'You\'re feeling vibrant and ready to take on the world! Let\'s channel that energy positively.';
      case 'focused':
        return 'You\'re in a concentrated mindset. Great time for deep work and productive activities.';
      case 'creative':
        return 'Your creative energy is flowing! Perfect time for artistic expression and innovative thinking.';
      default:
        return 'We\'ve analyzed your mood to provide the best recommendations.';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-8">
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${getMoodColor(moodCategory.category)} rounded-full mb-6`}>
          <span className="text-4xl">{getMoodEmoji(moodCategory.category)}</span>
        </div>
        
        <h3 className="text-3xl font-bold text-gray-800 mb-2 capitalize">
          You're feeling {moodCategory.category}
        </h3>
        
        <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
          {getMoodDescription(moodCategory.category)}
        </p>

        <div className="flex items-center justify-center space-x-6 mb-6">
          <div className="flex items-center space-x-2 text-gray-500">
            <Brain className="w-5 h-5" />
            <span className="text-sm">AI Analysis</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm">{moodCategory.confidence}% Confidence</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <Calendar className="w-5 h-5" />
            <span className="text-sm">{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200"
        >
          View Recommendations Below
        </button>
      </div>
    </div>
  );
};