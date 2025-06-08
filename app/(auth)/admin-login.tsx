import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, ArrowLeft, Shield } from 'lucide-react-native';
import { useAuthStore } from '@/store/useAuthStore';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';
import colors from '@/constants/colors';

export default function AdminLoginScreen() {
  const router = useRouter();
  const adminLogin = useAuthStore((state) => state.adminLogin);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Введите email администратора';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Введите пароль';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const success = await adminLogin(email, password);
      if (success) {
        router.replace('/admin');
      } else {
        Alert.alert('Ошибка входа', 'Неверные учетные данные администратора');
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Произошла ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color={colors.text} />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Shield size={40} color={colors.primary} />
          <Text style={styles.title}>Вход для администратора</Text>
        </View>
        <Text style={styles.subtitle}>Доступ только для авторизованных пользователей</Text>
        
        <View style={styles.form}>
          <TextInput
            label="Email администратора"
            placeholder="Введите email администратора"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Mail size={20} color={colors.text} />}
            error={errors.email}
          />
          
          <TextInput
            label="Пароль"
            placeholder="Введите пароль администратора"
            value={password}
            onChangeText={setPassword}
            isPassword
            leftIcon={<Lock size={20} color={colors.text} />}
            error={errors.password}
          />
          
          <Text style={styles.hint}>
            Для демо: используйте email с "admin" и пароль "admin123"
          </Text>
          
          <Button
            title="Войти как администратор"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
          />
          
          <TouchableOpacity 
            style={styles.backToLoginContainer}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.backToLoginText}>Вернуться к обычному входу</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  hint: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 24,
    fontStyle: 'italic',
  },
  loginButton: {
    marginBottom: 24,
    backgroundColor: colors.secondary,
  },
  backToLoginContainer: {
    alignItems: 'center',
  },
  backToLoginText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});