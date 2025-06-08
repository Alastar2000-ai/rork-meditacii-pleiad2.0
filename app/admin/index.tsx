import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Plus, Edit, Trash2, Upload, Download, Shield, LogOut } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useAuthStore } from '@/store/useAuthStore';
import { useMeditationStore } from '@/store/useMeditationStore';
import { useCourseStore } from '@/store/useCourseStore';
import Button from '@/components/Button';
import CosmicBackground from '@/components/CosmicBackground';
import colors from '@/constants/colors';
import { textStyles } from '@/styles/textStyles';

export default function AdminScreen() {
  const router = useRouter();
  const { isAdmin, logout } = useAuthStore();
  const { allMeditations } = useMeditationStore();
  const { allCourses } = useCourseStore();
  
  const [activeTab, setActiveTab] = useState<'meditations' | 'courses'>('meditations');
  
  // Redirect if not admin
  if (!isAdmin) {
    router.replace('/(tabs)');
    return null;
  }
  
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
  
  const handleAddItem = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    Alert.alert(
      'Добавление контента',
      `Добавить новый ${activeTab === 'meditations' ? 'медитацию' : 'курс'}?`,
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Добавить',
          onPress: () => {
            Alert.alert('Функция в разработке', 'Эта функция будет доступна в следующей версии приложения.');
          },
        },
      ]
    );
  };
  
  const handleEditItem = (id: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    Alert.alert('Функция в разработке', 'Эта функция будет доступна в следующей версии приложения.');
  };
  
  const handleDeleteItem = (id: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    Alert.alert(
      'Удаление контента',
      `Вы уверены, что хотите удалить этот ${activeTab === 'meditations' ? 'медитацию' : 'курс'}?`,
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => {
            Alert.alert('Функция в разработке', 'Эта функция будет доступна в следующей версии приложения.');
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  const handleUpload = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    Alert.alert('Загрузка в RuStore', 'Эта функция позволит загрузить обновление приложения в RuStore. Функция будет доступна в следующей версии.');
  };
  
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
        
        <View style={styles.headerTitleContainer}>
          <Shield size={20} color={colors.primary} />
          <Text style={[styles.headerTitle, textStyles.text3D]}>Панель администратора</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'meditations' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('meditations')}
        >
          <Text
            style={[
              styles.tabButtonText,
              textStyles.text3DSubtle,
              activeTab === 'meditations' && styles.activeTabButtonText,
            ]}
          >
            Медитации
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'courses' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('courses')}
        >
          <Text
            style={[
              styles.tabButtonText,
              textStyles.text3DSubtle,
              activeTab === 'courses' && styles.activeTabButtonText,
            ]}
          >
            Курсы
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.actionBar}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddItem}
        >
          <Plus size={20} color={colors.text} />
          <Text style={[styles.addButtonText, textStyles.text3DSubtle]}>
            Добавить {activeTab === 'meditations' ? 'медитацию' : 'курс'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={handleUpload}
        >
          <Upload size={20} color={colors.text} />
          <Text style={[styles.uploadButtonText, textStyles.text3DSubtle]}>Загрузить в RuStore</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.contentContainer}>
        {activeTab === 'meditations' ? (
          allMeditations.map((meditation) => (
            <View key={meditation.id} style={styles.itemCard}>
              <View style={styles.itemInfo}>
                <Text style={[styles.itemTitle, textStyles.text3D]} numberOfLines={1}>{meditation.title}</Text>
                <Text style={[styles.itemSubtitle, textStyles.textSecondary3D]} numberOfLines={1}>{meditation.category} • {meditation.duration}</Text>
              </View>
              
              <View style={styles.itemActions}>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => handleEditItem(meditation.id)}
                >
                  <Edit size={18} color={colors.text} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => handleDeleteItem(meditation.id)}
                >
                  <Trash2 size={18} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          allCourses.map((course) => (
            <View key={course.id} style={styles.itemCard}>
              <View style={styles.itemInfo}>
                <Text style={[styles.itemTitle, textStyles.text3D]} numberOfLines={1}>{course.title}</Text>
                <Text style={[styles.itemSubtitle, textStyles.textSecondary3D]} numberOfLines={1}>{course.category} • {course.lessons} уроков</Text>
              </View>
              
              <View style={styles.itemActions}>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => handleEditItem(course.id)}
                >
                  <Edit size={18} color={colors.text} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => handleDeleteItem(course.id)}
                >
                  <Trash2 size={18} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      
      <View style={styles.footer}>
        <Text style={[styles.footerText, textStyles.textSecondary3D]}>
          Версия приложения: 1.0.0
        </Text>
      </View>
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
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: colors.primary,
  },
  tabButtonText: {
    fontSize: 16,
  },
  activeTabButtonText: {
    fontWeight: 'bold',
  },
  actionBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  addButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  addButtonText: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
  uploadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  uploadButtonText: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 12,
  },
  itemActions: {
    flexDirection: 'row',
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
  },
});