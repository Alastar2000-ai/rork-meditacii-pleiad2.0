import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Star } from 'lucide-react-native';
import { useMeditationStore } from '@/store/useMeditationStore';
import { categories } from '@/mocks/meditations';
import MeditationCard from '@/components/MeditationCard';
import TextInput from '@/components/TextInput';
import AppHeader from '@/components/AppHeader';
import CosmicBackground from '@/components/CosmicBackground';
import colors from '@/constants/colors';
import { textStyles } from '@/styles/textStyles';

export default function MeditationsScreen() {
  const router = useRouter();
  const allMeditations = useMeditationStore((state) => state.allMeditations);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const filteredMeditations = allMeditations.filter((meditation) => {
    const matchesCategory = selectedCategory === 'all' || meditation.category === selectedCategory;
    const matchesSearch = meditation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          meditation.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredMeditations = allMeditations.filter((meditation) => meditation.isFeatured);

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleMeditationPress = (id: string) => {
    router.push(`/meditation/${id}`);
  };

  return (
    <View style={styles.container}>
      <CosmicBackground />
      <AppHeader title="Медитации Плеяд" />
      
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Поиск медитаций..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon={<Search size={20} color={colors.text} />}
            style={styles.searchInput}
          />
        </View>
        
        {searchQuery.length === 0 && (
          <View style={styles.featuredSection}>
            <Text style={[styles.sectionTitle, textStyles.text3DLarge]}>Рекомендуемые медитации</Text>
            <FlatList
              data={featuredMeditations}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}
              renderItem={({ item }) => (
                <View style={styles.featuredItem}>
                  <MeditationCard
                    id={item.id}
                    title={item.title}
                    duration={item.duration}
                    imageUrl={item.imageUrl}
                    description={item.description}
                    onPress={handleMeditationPress}
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
            {categories.map((category) => (
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
        
        <View style={styles.meditationsSection}>
          <Text style={[styles.sectionTitle, textStyles.text3DLarge]}>
            {searchQuery ? 'Результаты поиска' : 'Все медитации'}
          </Text>
          
          {filteredMeditations.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Star size={40} color={colors.textSecondary} />
              <Text style={[styles.emptyText, textStyles.textSecondary3D]}>
                {searchQuery
                  ? 'Медитации не найдены. Попробуйте изменить запрос.'
                  : 'В этой категории пока нет медитаций.'}
              </Text>
            </View>
          ) : (
            <View style={styles.meditationsList}>
              {filteredMeditations.map((meditation) => (
                <MeditationCard
                  key={meditation.id}
                  id={meditation.id}
                  title={meditation.title}
                  duration={meditation.duration}
                  imageUrl={meditation.imageUrl}
                  description={meditation.description}
                  onPress={handleMeditationPress}
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
  meditationsSection: {
    flex: 1,
  },
  meditationsList: {
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