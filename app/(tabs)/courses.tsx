import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, BookOpen } from 'lucide-react-native';
import { useCourseStore } from '@/store/useCourseStore';
import { courseCategories } from '@/mocks/courses';
import CourseCard from '@/components/CourseCard';
import TextInput from '@/components/TextInput';
import AppHeader from '@/components/AppHeader';
import CosmicBackground from '@/components/CosmicBackground';
import colors from '@/constants/colors';
import { textStyles } from '@/styles/textStyles';

export default function CoursesScreen() {
  const router = useRouter();
  const allCourses = useCourseStore((state) => state.allCourses);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const filteredCourses = allCourses.filter((course) => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredCourses = allCourses.filter((course) => course.isFeatured);

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleCoursePress = (id: string) => {
    router.push(`/course/${id}`);
  };

  return (
    <View style={styles.container}>
      <CosmicBackground />
      <AppHeader title="Курсы по эзотерике" />
      
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Поиск курсов..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon={<Search size={20} color={colors.text} />}
            style={styles.searchInput}
          />
        </View>
        
        {searchQuery.length === 0 && (
          <View style={styles.featuredSection}>
            <Text style={[styles.sectionTitle, textStyles.text3DLarge]}>Популярные курсы</Text>
            <FlatList
              data={featuredCourses}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}
              renderItem={({ item }) => (
                <View style={styles.featuredItem}>
                  <CourseCard
                    id={item.id}
                    title={item.title}
                    lessons={item.lessons}
                    rating={item.rating}
                    imageUrl={item.imageUrl}
                    description={item.description}
                    onPress={handleCoursePress}
                  />
                </View>
              )}
            />
          </View>
        )}
        
        <View style={styles.categoriesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          >
            {courseCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.selectedCategoryButton,
                ]}
                onPress={() => handleCategoryPress(category.id)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    textStyles.text3DSubtle,
                    selectedCategory === category.id && styles.selectedCategoryText,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.coursesSection}>
          <Text style={[styles.sectionTitle, textStyles.text3DLarge]}>
            {searchQuery ? 'Результаты поиска' : 'Все курсы'}
          </Text>
          
          {filteredCourses.length === 0 ? (
            <View style={styles.emptyContainer}>
              <BookOpen size={40} color={colors.textSecondary} />
              <Text style={[styles.emptyText, textStyles.textSecondary3D]}>
                {searchQuery
                  ? 'Курсы не найдены. Попробуйте изменить запрос.'
                  : 'В этой категории пока нет курсов.'}
              </Text>
            </View>
          ) : (
            <View style={styles.coursesList}>
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  lessons={course.lessons}
                  rating={course.rating}
                  imageUrl={course.imageUrl}
                  description={course.description}
                  onPress={handleCoursePress}
                />
              ))}
            </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  featuredSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  featuredList: {
    paddingLeft: 16,
  },
  featuredItem: {
    marginRight: 16,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
  },
  selectedCategoryText: {
    fontWeight: 'bold',
  },
  coursesSection: {
    flex: 1,
  },
  coursesList: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
  },
});