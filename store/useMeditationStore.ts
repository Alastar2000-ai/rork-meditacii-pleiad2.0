import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { meditations, Meditation } from '@/mocks/meditations';

interface MeditationState {
  favorites: string[];
  history: { id: string; lastPlayed: number }[];
  progress: { [key: string]: number }; // meditationId: progress (0-100)
  
  // Actions
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  
  addToHistory: (id: string) => void;
  getLastPlayed: (id: string) => Date | null;
  
  updateProgress: (id: string, progress: number) => void;
  getProgress: (id: string) => number;
  
  // Admin actions (in a real app these would be API calls)
  addMeditation: (meditation: Meditation) => void;
  updateMeditation: (id: string, data: Partial<Meditation>) => void;
  deleteMeditation: (id: string) => void;
  
  // Data
  allMeditations: Meditation[];
  getMeditation: (id: string) => Meditation | undefined;
}

export const useMeditationStore = create<MeditationState>()(
  persist(
    (set, get) => ({
      favorites: [],
      history: [],
      progress: {},
      allMeditations: [...meditations],
      
      addToFavorites: (id) => {
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites
            : [...state.favorites, id],
        }));
      },
      
      removeFromFavorites: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((favId) => favId !== id),
        }));
      },
      
      isFavorite: (id) => {
        return get().favorites.includes(id);
      },
      
      addToHistory: (id) => {
        set((state) => {
          const newHistory = state.history.filter((item) => item.id !== id);
          return {
            history: [{ id, lastPlayed: Date.now() }, ...newHistory],
          };
        });
      },
      
      getLastPlayed: (id) => {
        const item = get().history.find((item) => item.id === id);
        return item ? new Date(item.lastPlayed) : null;
      },
      
      updateProgress: (id, progress) => {
        set((state) => ({
          progress: {
            ...state.progress,
            [id]: progress,
          },
        }));
      },
      
      getProgress: (id) => {
        return get().progress[id] || 0;
      },
      
      // Admin actions
      addMeditation: (meditation) => {
        set((state) => ({
          allMeditations: [...state.allMeditations, meditation],
        }));
      },
      
      updateMeditation: (id, data) => {
        set((state) => ({
          allMeditations: state.allMeditations.map((med) =>
            med.id === id ? { ...med, ...data } : med
          ),
        }));
      },
      
      deleteMeditation: (id) => {
        set((state) => ({
          allMeditations: state.allMeditations.filter((med) => med.id !== id),
        }));
      },
      
      getMeditation: (id) => {
        return get().allMeditations.find((med) => med.id === id);
      },
    }),
    {
      name: 'meditation-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);