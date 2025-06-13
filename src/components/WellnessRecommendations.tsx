import React, { useState } from 'react';
import { Music, Sparkles, Zap, Package, ChevronDown, ChevronUp, Clock, Users } from 'lucide-react';
import { WellnessRecommendations as WellnessRecommendationsType, Playlist } from '../types';
import { PlaylistCard } from './PlaylistCard';

interface WellnessRecommendationsProps {
  recommendations: WellnessRecommendationsType;
  onOrderKit: () => void;
  onPlaylistPlay: (playlist: Playlist) => void;
}

export const WellnessRecommendationsComponent: React.FC<WellnessRecommendationsProps> = ({
  recommendations,
  onOrderKit,
  onPlaylistPlay
}) => {
  const [expandedScents, setExpandedScents] = useState<number[]>([]);

  const toggleScentExpansion = (index: number) => {
    setExpandedScents(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="space-y-8">
      {/* Music Playlists */}
      <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Curated Playlists</h3>
            <p className="text-gray-600">Perfect music for your current vibe - click to play on YouTube</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onPlay={onPlaylistPlay}
            />
          ))}
        </div>
      </section>

      {/* Scent Recommendations with DIY Recipes */}
      <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">DIY Aromatherapy</h3>
            <p className="text-gray-600">Natural scents to enhance your mood with easy DIY recipes</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.scents.map((scent, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:shadow-lg transition-all duration-200"
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{scent.icon}</div>
                <h4 className="font-bold text-gray-800 mb-2">{scent.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{scent.benefits}</p>
              </div>

              {scent.diyRecipe && (
                <div>
                  <button
                    onClick={() => toggleScentExpansion(index)}
                    className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-200 text-sm font-medium"
                  >
                    <span>DIY Recipe</span>
                    {expandedScents.includes(index) ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                    }
                  </button>

                  {expandedScents.includes(index) && (
                    <div className="mt-4 p-4 bg-white/80 rounded-xl border border-green-200">
                      <div className="flex items-center space-x-2 mb-3">
                        <Clock className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">{scent.diyRecipe.duration}</span>
                      </div>
                      
                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-800 mb-2">Ingredients:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {scent.diyRecipe.ingredients.map((ingredient, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <span className="text-green-500 mt-1">•</span>
                              <span>{ingredient}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-gray-800 mb-2">Instructions:</h5>
                        <ol className="text-sm text-gray-600 space-y-2">
                          {scent.diyRecipe.instructions.map((instruction, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                                {i + 1}
                              </span>
                              <span>{instruction}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Movement Recommendations */}
      <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Micro-Movements</h3>
            <p className="text-gray-600">Quick activities to boost your wellbeing</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.movements.map((movement, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:shadow-lg transition-all duration-200"
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{movement.icon}</div>
                <h4 className="font-bold text-gray-800 mb-2">{movement.name}</h4>
                <p className="text-purple-600 font-semibold text-sm mb-2">{movement.duration}</p>
                <p className="text-gray-600 text-sm">{movement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wellness Kit Order */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Complete Wellness Kit</h3>
          <p className="text-purple-100 mb-6 max-w-md mx-auto">
            Get a curated wellness kit with aromatherapy items, relaxation tools, and wellness guides delivered to your door.
          </p>
          <button
            onClick={onOrderKit}
            className="bg-white text-purple-600 font-bold py-4 px-8 rounded-2xl hover:bg-purple-50 transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <Package className="w-5 h-5" />
            <span>Order Your Wellness Kit</span>
          </button>
        </div>
      </section>
    </div>
  );
};