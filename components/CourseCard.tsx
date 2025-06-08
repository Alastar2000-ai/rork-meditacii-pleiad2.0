import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { BookOpen, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '@/constants/colors';
import { textStyles } from '@/styles/textStyles';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.85;

interface CourseCardProps {
  id: string;
  title: string;
  lessons: number;
  rating: number;
  imageUrl: string;
  description: string;
  onPress: (id: string) => void;
}

export default function CourseCard({ 
  id, 
  title, 
  lessons, 
  rating, 
  imageUrl, 
  description,
  onPress 
}: CourseCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onPress(id)}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      <LinearGradient
        colors={['transparent', 'rgba(30, 10, 51, 0.8)', 'rgba(30, 10, 51, 0.95)']}
        style={styles.gradient}
      />
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, textStyles.text3D]} numberOfLines={2}>{title}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={[styles.rating, textStyles.text3DSubtle]}>{rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={[styles.description, textStyles.textSecondary3D]} numberOfLines={2}>{description}</Text>
        <View style={styles.footer}>
          <View style={styles.lessonsContainer}>
            <BookOpen size={14} color={colors.text} />
            <Text style={[styles.lessons, textStyles.text3DSubtle]}>{lessons} уроков</Text>
          </View>
          <View style={styles.startButton}>
            <Text style={[styles.startButtonText, textStyles.text3DSubtle]}>Начать</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: colors.card,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    fontSize: 12,
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessons: {
    fontSize: 12,
    marginLeft: 4,
  },
  startButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});