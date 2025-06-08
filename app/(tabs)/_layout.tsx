import React from 'react';
import { Tabs } from 'expo-router';
import { Home, BookOpen, User } from 'lucide-react-native';
import colors from '@/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.backgroundLight,
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          color: colors.text,
        },
        headerTintColor: colors.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Медитации',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Курсы',
          tabBarIcon: ({ color }) => <BookOpen size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}