import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { LogOut, Settings, Heart, Clock, Shield, Moon } from 'lucide-react-native';
import { useAuthStore } from '@/store/useAuthStore';
import { useMeditationStore } from '@/store/useMeditationStore';
import { useCourseStore } from '@/store/useCourseStore';
import Button from '@/components/Button';
import AppHeader from '@/components/AppHeader';
import CosmicBackground from '@/components/CosmicBackground';
import colors from '@/constants/colors';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout, isAdmin } = useAuthStore();
  const { favorites, allMeditations } = useMeditationStore();
  const { enrolledCourses, allCourses } = useCourseStore();
  
  const favoriteMeditations = allMeditations.filter(med => favorites.includes(med.id));
  const userCourses = allCourses.filter(course => enrolledCourses.includes(course.id));

  const handleLogout = () => {
    Alert.alert(
      'Выход из аккаунта',
      'Вы уверены, что хотите выйти?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Выйти',
          onPress: () => {
            logout();
            router.replace('/(auth)');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleAdminPanel = () => {
    router.push('/admin');
  };

  return (
    <View style={styles.container}>
      <CosmicBackground />
      <AppHeader title="Профиль" showMenu={false} />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1000' }}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.userName}>{user?.name || 'Пользователь'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
          
          {isAdmin && (
            <View style={styles.adminBadge}>
              <Shield size={14} color={colors.text} />
              <Text style={styles.adminBadgeText}>Администратор</Text>
            </View>
          )}
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Heart size={24} color={colors.primary} />
            <Text style={styles.statValue}>{favorites.length}</Text>
            <Text style={styles.statLabel}>Избранное</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Clock size={24} color={colors.primary} />
            <Text style={styles.statValue}>{enrolledCourses.length}</Text>
            <Text style={styles.statLabel}>Курсы</Text>
          </View>
        </View>
        
        {isAdmin && (
          <TouchableOpacity 
            style={styles.adminButton}
            onPress={handleAdminPanel}
          >
            <Shield size={20} color={colors.text} />
            <Text style={styles.adminButtonText}>Панель администратора</Text>
          </TouchableOpacity>
        )}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Избранные медитации</Text>
          {favoriteMeditations.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Moon size={32} color={colors.textSecondary} />
              <Text style={styles.emptyText}>У вас пока нет избранных медитаций</Text>
            </View>
          ) : (
            <View style={styles.favoritesList}>
              {favoriteMeditations.slice(0, 3).map((meditation) => (
                <TouchableOpacity
                  key={meditation.id}
                  style={styles.favoriteItem}
                  onPress={() => router.push(`/meditation/${meditation.id}`)}
                >
                  <Image
                    source={{ uri: meditation.imageUrl }}
                    style={styles.favoriteImage}
                  />
                  <View style={styles.favoriteInfo}>
                    <Text style={styles.favoriteTitle} numberOfLines={1}>{meditation.title}</Text>
                    <Text style={styles.favoriteDuration}>{meditation.duration}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              
              {favoriteMeditations.length > 3 && (
                <TouchableOpacity style={styles.viewAllButton}>
                  <Text style={styles.viewAllText}>Смотреть все ({favoriteMeditations.length})</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Мои курсы</Text>
          {userCourses.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Moon size={32} color={colors.textSecondary} />
              <Text style={styles.emptyText}>Вы пока не записаны ни на один курс</Text>
            </View>
          ) : (
            <View style={styles.coursesList}>
              {userCourses.slice(0, 2).map((course) => (
                <TouchableOpacity
                  key={course.id}
                  style={styles.courseItem}
                  onPress={() => router.push(`/course/${course.id}`)}
                >
                  <Image
                    source={{ uri: course.imageUrl }}
                    style={styles.courseImage}
                  />
                  <View style={styles.courseOverlay} />
                  <View style={styles.courseInfo}>
                    <Text style={styles.courseTitle}>{course.title}</Text>
                    <View style={styles.courseStats}>
                      <Text style={styles.courseLessons}>{course.lessons} уроков</Text>
                      <View style={styles.courseProgress}>
                        <View 
                          style={[
                            styles.courseProgressBar, 
                            { width: `${useCourseStore.getState().getCourseProgress(course.id)}%` }
                          ]} 
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
              
              {userCourses.length > 2 && (
                <TouchableOpacity style={styles.viewAllButton}>
                  <Text style={styles.viewAllText}>Смотреть все ({userCourses.length})</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
        
        <View style={styles.settingsSection}>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={20} color={colors.text} />
            <Text style={styles.settingsButtonText}>Настройки</Text>
          </TouchableOpacity>
          
          <Button
            title="Выйти из аккаунта"
            onPress={handleLogout}
            variant="outline"
            style={styles.logoutButton}
            icon={<LogOut size={20} color={colors.primary} />}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: colors.primary,
    marginBottom: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  adminBadgeText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  adminButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  adminButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    marginHorizontal: 16,
  },
  emptyText: {
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  favoritesList: {
    paddingHorizontal: 16,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  favoriteImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  favoriteInfo: {
    flex: 1,
    marginLeft: 12,
  },
  favoriteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  favoriteDuration: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  viewAllButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  viewAllText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  coursesList: {
    paddingHorizontal: 16,
  },
  courseItem: {
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  courseImage: {
    width: '100%',
    height: '100%',
  },
  courseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  courseInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  courseStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  courseLessons: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  courseProgress: {
    width: 100,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
  },
  courseProgressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  settingsSection: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  settingsButtonText: {
    color: colors.text,
    fontSize: 16,
    marginLeft: 12,
  },
  logoutButton: {
    marginTop: 8,
  },
});