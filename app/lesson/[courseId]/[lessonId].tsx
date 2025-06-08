import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useCourseStore } from '@/store/useCourseStore';
import Button from '@/components/Button';
import CosmicBackground from '@/components/CosmicBackground';
import colors from '@/constants/colors';
import { Platform } from 'react-native';

export default function LessonScreen() {
  const { courseId, lessonId } = useLocalSearchParams<{ courseId: string; lessonId: string }>();
  const router = useRouter();
  const { getCourse, completeLesson, isLessonCompleted } = useCourseStore();
  
  const course = getCourse(courseId);
  const lesson = course?.lessonsList.find(l => l.id === lessonId);
  
  const [completed, setCompleted] = useState(false);
  
  useEffect(() => {
    if (course && lesson) {
      setCompleted(isLessonCompleted(course.id, lesson.id));
    }
  }, [course, lesson, isLessonCompleted]);
  
  const handleComplete = () => {
    if (!course || !lesson) return;
    
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    completeLesson(course.id, lesson.id);
    setCompleted(true);
  };
  
  const handleNext = () => {
    if (!course || !lesson) return;
    
    const currentIndex = course.lessonsList.findIndex(l => l.id === lesson.id);
    if (currentIndex < course.lessonsList.length - 1) {
      const nextLesson = course.lessonsList[currentIndex + 1];
      router.replace(`/lesson/${course.id}/${nextLesson.id}`);
    } else {
      router.replace(`/course/${course.id}`);
    }
  };
  
  if (!course || !lesson) {
    return (
      <View style={styles.container}>
        <CosmicBackground />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Урок не найден</Text>
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
          onPress={() => router.push(`/course/${course.id}`)}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle} numberOfLines={1}>
          {course.title}
        </Text>
        
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.lessonTitle}>{lesson.title}</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.duration}>{lesson.duration}</Text>
        </View>
        
        <View style={styles.videoPlaceholder}>
          <Text style={styles.videoPlaceholderText}>Видео урока</Text>
        </View>
        
        <Text style={styles.description}>{lesson.description}</Text>
        
        <Text style={styles.contentText}>
          Это демонстрационный контент урока. В реальном приложении здесь будет размещен полный текст урока, изображения, аудио и другие материалы.
          {'\n\n'}
          Урок включает в себя теоретическую часть, практические упражнения и рекомендации для самостоятельной работы.
          {'\n\n'}
          После изучения материала и выполнения практических заданий вы можете отметить урок как завершенный и перейти к следующему.
        </Text>
        
        <View style={styles.buttonContainer}>
          {!completed ? (
            <Button
              title="Отметить как пройденный"
              onPress={handleComplete}
              icon={<CheckCircle size={20} color={colors.text} />}
            />
          ) : (
            <>
              <View style={styles.completedBadge}>
                <CheckCircle size={20} color={colors.text} />
                <Text style={styles.completedText}>Урок пройден</Text>
              </View>
              
              <Button
                title="Следующий урок"
                onPress={handleNext}
                style={styles.nextButton}
              />
            </>
          )}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  duration: {
    color: colors.textSecondary,
    fontSize: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  videoPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  videoPlaceholderText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    lineHeight: 24,
  },
  contentText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 32,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  completedText: {
    color: colors.text,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  nextButton: {
    width: '100%',
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