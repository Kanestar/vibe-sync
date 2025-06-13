import React, { useState, useCallback } from 'react';
import { Waves, Github, Heart } from 'lucide-react';
import { MoodForm } from './components/MoodForm';
import { MoodResult } from './components/MoodResult';
import { WellnessRecommendationsComponent } from './components/WellnessRecommendations';
import { UserProfileComponent } from './components/UserProfile';
import { Notification } from './components/Notification';
import { analyzeMood } from './utils/moodAnalyzer';
import { getRecommendations } from './utils/recommendationEngine';
import { MoodData, MoodCategory, WellnessRecommendations as WellnessRecommendationsType, Playlist, UserProfile } from './types';

function App() {
  const [currentMood, setCurrentMood] = useState<MoodCategory | null>(null);
  const [recommendations, setRecommendations] = useState<WellnessRecommendationsType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false
  });
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    vibePoints: 150,
    totalSubmissions: 12,
    currentStreak: 5
  });

  const showNotification = useCallback((message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    setNotification({
      message,
      type,
      isVisible: true
    });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  }, []);

  const handleMoodSubmit = useCallback(async (moodData: MoodData) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const moodResult = analyzeMood(moodData);
    const wellnessRecs = getRecommendations(moodResult);
    
    setCurrentMood(moodResult);
    setRecommendations(wellnessRecs);
    setIsLoading(false);
    
    // Update user profile
    setUserProfile(prev => ({
      ...prev,
      vibePoints: prev.vibePoints + 25,
      totalSubmissions: prev.totalSubmissions + 1,
      currentStreak: prev.currentStreak + 1
    }));
    
    showNotification('🎉 Mood analyzed! +25 Vibe Points earned!', 'success');
  }, [showNotification]);

  const handlePlaylistPlay = useCallback((playlist: Playlist) => {
    showNotification(`🎵 Now playing: ${playlist.name}`, 'info');
    // Here you would integrate with actual Spotify API
  }, [showNotification]);

  const handleOrderKit = useCallback(() => {
    showNotification('🎁 Your wellness kit has been ordered! Delivery in 2-3 business days.', 'success');
    setUserProfile(prev => ({
      ...prev,
      vibePoints: prev.vibePoints + 50
    }));
  }, [showNotification]);

  const handleCloseMoodResult = useCallback(() => {
    // Scroll to recommendations section
    const recommendationsSection = document.getElementById('recommendations');
    if (recommendationsSection) {
      recommendationsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const resetApp = useCallback(() => {
    setCurrentMood(null);
    setRecommendations(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <Waves className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">VibeSync</h1>
                <p className="text-gray-600 text-sm">Wellness Weaver</p>
              </div>
            </div>
            
            <div className="hidden md:block">
              <UserProfileComponent profile={userProfile} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Section */}
            {!currentMood && (
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                  Discover Your Perfect Wellness Vibe
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Let AI analyze your mood and create a personalized wellness experience with music, scents, and movements tailored just for you.
                </p>
              </div>
            )}

            {/* Mobile Profile */}
            <div className="md:hidden mb-8">
              <UserProfileComponent profile={userProfile} />
            </div>

            {/* Mood Form */}
            {!currentMood && (
              <MoodForm onSubmit={handleMoodSubmit} isLoading={isLoading} />
            )}

            {/* Mood Result */}
            {currentMood && (
              <MoodResult
                moodCategory={currentMood}
                onClose={handleCloseMoodResult}
              />
            )}

            {/* Recommendations */}
            {recommendations && (
              <div id="recommendations">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-800">Your Personalized Recommendations</h2>
                  <button
                    onClick={resetApp}
                    className="px-6 py-2 bg-white/80 hover:bg-white text-gray-700 rounded-full transition-colors duration-200 backdrop-blur-sm border border-white/30"
                  >
                    New Analysis
                  </button>
                </div>
                <WellnessRecommendationsComponent
                  recommendations={recommendations}
                  onOrderKit={handleOrderKit}
                  onPlaylistPlay={handlePlaylistPlay}
                />
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white/50 backdrop-blur-sm border-t border-white/30 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-gray-600">Built with love for your wellness journey</span>
              </div>
              <p className="text-gray-500 text-sm">
                VibeSync Wellness Weaver - Your AI-powered wellness companion
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
      
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
          border: 2px solid white;
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
}

export default App;