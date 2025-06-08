import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { ArrowLeft, Star, BookOpen, Check, Lock, Play } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useCourseStore } from '@/store/useCourseStore';
import Button from '@/components/Button';
import CosmicBackground from '@/components/CosmicBackground';
import colors from '@/constants/colors';
import { Platform } from 'react-native';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getCourse, isEnrolled, enrollInCourse, unenrollFromCourse, isLessonCompleted, getCourseProgress } = useCourseStore();
  
  const course = getCourse(id);
  const [enrolled, setEnrolled] = useState(false);
  
  useEffect(() => {
    if (course) {
      setEnrolled(isEnrolled(course.id));
    }
  }, [course, isEnrolled]);
  
  const handleEnrollToggle = () => {
    if (!course) return;
    
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    if (enrolled) {
      unenrollFromCourse(course.id);
    } else {
      enrollInCourse(course.id);
    }
    
    setEnrolled(!enrolled);
  };
  
  const handleLessonPress = (lessonId: string) => {
    if (!course) return;
    
    const lesson = course.lessonsList.find(l => l.id === lessonId);
    
    if (!lesson) return;
    
    if (lesson.isLocked && !enrolled) {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      }
      return;
    }
    
    router.push(`/lesson/${course.id}/${lessonId}`);
  };
  
  if (!course) {
    return (
      <View style={styles.container}>
        <CosmicBackground />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Курс не найден</Text>
          <Button title="Вернуться" onPress={() => router.back()} />
        </View>
      </View>
    );
  }
  
  const progress = getCourseProgress(course.id);
  
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
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: course.imageUrl }}
            style={styles.image}
            contentFit="cover"
          />
          <LinearGradient
            colors={['transparent', colors.background]}
            style={styles.imageGradient}
          />
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>{course.title}</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <BookOpen size={16} color={colors.textSecondary} />
              <Text style={styles.infoText}>{course.lessons} уроков</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.infoText}>{course.rating.toFixed(1)}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.categoryTag}>{course.category}</Text>
            </View>
          </View>
          
          <Text style={styles.description}>{course.description}</Text>
          
          {enrolled && (
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>Ваш прогресс</Text>
                <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${progress}%` }
                  ]} 
                />
              </View>
            </View>
          )}
          
          <View style={styles.divider} />
          
          <Text style={styles.lessonsTitle}>Содержание курса</Text>
          
          <FlatList
            data={course.lessonsList}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item, index }) => {
              const isCompleted = isLessonCompleted(course.id, item.id);
              const isLocked = item.isLocked && !enrolled;
              
              return (
                <TouchableOpacity
                  style={[
                    styles.lessonItem,
                    isCompleted && styles.completedLessonItem,
                    isLocked && styles.lockedLessonItem,
                  ]}
                  onPress={() => handleLessonPress(item.id)}
                  disabled={isLocked}
                >
                  <View style={styles.lessonNumber}>
                    {isCompleted ? (
                      <View style={styles.completedCircle}>
                        <Check size={14} color={colors.text} />
                      </View>
                    ) : (
                      <Text style={styles.lessonNumberText}>{index + 1}</Text>
                    )}
                  </View>
                  
                  <View style={styles.lessonInfo}>
                    <Text style={styles.lessonTitle}>{item.title}</Text>
                    <Text style={styles.lessonDuration}>{item.duration}</Text>
                  </View>
                  
                  {isLocked ? (
                    <Lock size={20} color={colors.textSecondary} />
                  ) : (
                    <Play size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              );
            }}
          />
          
          <Button
            title={enrolled ? "Отписаться от курса" : "Записаться на курс"}
            onPress={handleEnrollToggle}
            variant={enrolled ? "outline" : "primary"}
            style={styles.enrollButton}
          />
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
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 250,
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
    fontSize: 24,
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
  progressContainer: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  progressPercentage: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 24,
  },
  lessonsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  completedLessonItem: {
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  lockedLessonItem: {
    opacity: 0.6,
  },
  lessonNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lessonNumberText: {
    color: colors.text,
    fontWeight: 'bold',
  },
  completedCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  lessonDuration: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  enrollButton: {
    marginTop: 24,
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