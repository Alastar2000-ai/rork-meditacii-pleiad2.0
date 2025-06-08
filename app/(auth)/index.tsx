import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '@/store/useAuthStore';
import Button from '@/components/Button';
import colors from '@/constants/colors';
import { textStyles } from '@/styles/textStyles';

export default function WelcomeScreen() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000' }}
            style={styles.logoBackground}
          />
          <LinearGradient
            colors={['transparent', colors.background]}
            style={styles.logoGradient}
          />
          <Text style={[styles.logoText, textStyles.text3DStrong]}>Медитации Плеяд</Text>
        </View>
        
        <View style={styles.welcomeTextContainer}>
          <Text style={[styles.welcomeTitle, textStyles.text3DLarge]}>Добро пожаловать</Text>
          <Text style={[styles.welcomeDescription, textStyles.textSecondary3D]}>
            Откройте для себя мир медитаций и эзотерических знаний, связанных с энергией звездного скопления Плеяд
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Войти"
            onPress={() => router.push('/(auth)/login')}
            variant="primary"
            size="large"
            style={styles.button}
          />
          
          <Button
            title="Регистрация"
            onPress={() => router.push('/(auth)/register')}
            variant="outline"
            size="large"
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    padding: 24,
    alignItems: 'center',
  },
  logoContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logoGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  welcomeTextContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  welcomeDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    marginBottom: 16,
  },
});