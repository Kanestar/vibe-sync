export interface MoodData {
  stressLevel: number;
  energyLevel: 'low' | 'medium' | 'high';
  currentActivity: 'studying' | 'working' | 'relaxing' | 'exercising' | 'socializing' | 'creative' | 'commuting' | 'cooking' | 'cleaning' | 'reading';
  timestamp: Date;
}

export interface MoodCategory {
  category: 'stressed' | 'calm' | 'energetic' | 'focused' | 'creative';
  confidence: number;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: number;
  duration: string;
  image: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
}

export interface ScentRecommendation {
  name: string;
  benefits: string;
  icon: string;
  diyRecipe?: {
    ingredients: string[];
    instructions: string[];
    duration: string;
  };
}

export interface MovementRecommendation {
  name: string;
  duration: string;
  description: string;
  icon: string;
}

export interface WellnessRecommendations {
  playlists: Playlist[];
  scents: ScentRecommendation[];
  movements: MovementRecommendation[];
}

export interface UserProfile {
  vibePoints: number;
  totalSubmissions: number;
  currentStreak: number;
}