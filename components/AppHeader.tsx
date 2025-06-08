import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Moon, Menu } from 'lucide-react-native';
import colors from '@/constants/colors';
import { textStyles } from '@/styles/textStyles';

interface AppHeaderProps {
  title: string;
  showMenu?: boolean;
  onMenuPress?: () => void;
}

export default function AppHeader({ title, showMenu = true, onMenuPress }: AppHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Moon size={24} color={colors.text} />
        <Text style={[styles.title, textStyles.text3D]}>{title}</Text>
      </View>
      
      {showMenu && (
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <Menu size={24} color={colors.text} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  menuButton: {
    padding: 4,
  },
});