import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { ArrowLeft, Heart, Play, Pause, Clock, Share2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useMeditationStore } from '@/store/useMeditationStore';
import Button from '@/components/Button';
import CosmicBackground from '@/components/CosmicBackground';
import colors from '@/constants/colors';

export default function MeditationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getMeditation, addToFavorites, removeFromFavorites, isFavorite, addToHistory, updateProgress } = useMeditationStore();
  
  const meditation = getMeditation(id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [favorite, setFavorite] = useState(false);
  
  useEffect(() => {
    if (meditation) {
      setFavorite(isFavorite(meditation.id));
    }
  }, [meditation, isFavorite]);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      // Simulate meditation playback
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1;
          const newProgress = (newTime / (meditation?.durationInMinutes || 1) / 60) * 100;
          setProgress(newProgress > 100 ? 100 : newProgress);
          
          // Update progress in store
          if (meditation) {
            updateProgress(meditation.id, newProgress > 100 ? 100 : newProgress);
          }
          
          // Stop when complete
          if (newProgress >= 100) {
            setIsPlaying(false);
            clearInterval(interval);
          }
          
          return newTime;
        });
      }, 1000);
      
      // Add to history when started
      if (meditation) {
        addToHistory(meditation.id);
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, meditation]);
  
  const togglePlayPause = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setIsPlaying(!isPlaying);
  };
  
  const toggleFavorite = () => {
    if (!meditation) return;
    
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    if (favorite) {
      removeFromFavorites(meditation.id);
    } else {
      addToFavorites(meditation.id);
    }
    
    setFavorite(!favorite);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  if (!meditation) {
    return (
      <View style={styles.container}>
        <CosmicBackground />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Медитация не найдена</Text>
          <Button title="Вернуться" onPress={() => router.back()} />
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <CosmicBackground />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={toggleFavorite}
        >
          <Heart 
            size={24} 
            color={colors.text} 
            fill={favorite ? colors.primary : 'transparent'} 
          />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: meditation.imageUrl }}
            style={styles.image}
            contentFit="cover"
          />
          <LinearGradient
            colors={['transparent', colors.background]}
            style={styles.imageGradient}
          />
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>{meditation.title}</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Clock size={16} color={colors.textSecondary} />
              <Text style={styles.infoText}>{meditation.duration}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.categoryTag}>{meditation.category}</Text>
            </View>
          </View>
          
          <Text style={styles.description}>{meditation.description}</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.playerContainer}>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${progress}%` }
                  ]} 
                />
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <Text style={styles.timeText}>{meditation.duration}</Text>
              </View>
            </View>
            
            <View style={styles.controlsContainer}>
              <TouchableOpacity style={styles.shareButton}>
                <Share2 size={24} color={colors.text} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.playButton}
                onPress={togglePlayPause}
              >
                {isPlaying ? (
                  <Pause size={32} color={colors.text} fill={colors.text} />
                ) : (
                  <Play size={32} color={colors.text} fill={colors.text} />
                )}
              </TouchableOpacity>
              
              <View style={styles.placeholder} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 300,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    color: colors.textSecondary,
    marginLeft: 6,
    fontSize: 14,
  },
  categoryTag: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    color: colors.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 24,
  },
  playerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shareButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 48,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 20,
  },
});