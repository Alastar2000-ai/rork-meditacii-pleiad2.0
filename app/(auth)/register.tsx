import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react-native';
import { useAuthStore } from '@/store/useAuthStore';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';
import colors from '@/constants/colors';

export default function RegisterScreen() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!name) {
      newErrors.name = 'Введите имя';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'Введите email';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Введите корректный email';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Введите пароль';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Подтвердите пароль';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // In a real app, this would be a registration API call
      // For demo purposes, we'll just log in the user
      const success = await login(email, password);
      if (success) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Ошибка регистрации', 'Не удалось зарегистрировать пользователя');
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Произошла ошибка при регистрации');
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
        <Text style={styles.title}>Регистрация</Text>
        <Text style={styles.subtitle}>Создайте новый аккаунт</Text>
        
        <View style={styles.form}>
          <TextInput
            label="Имя"
            placeholder="Введите ваше имя"
            value={name}
            onChangeText={setName}
            leftIcon={<User size={20} color={colors.text} />}
            error={errors.name}
          />
          
          <TextInput
            label="Email"
            placeholder="Введите ваш email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Mail size={20} color={colors.text} />}
            error={errors.email}
          />
          
          <TextInput
            label="Пароль"
            placeholder="Введите пароль"
            value={password}
            onChangeText={setPassword}
            isPassword
            leftIcon={<Lock size={20} color={colors.text} />}
            error={errors.password}
          />
          
          <TextInput
            label="Подтверждение пароля"
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            isPassword
            leftIcon={<Lock size={20} color={colors.text} />}
            error={errors.confirmPassword}
          />
          
          <Button
            title="Зарегистрироваться"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerButton}
          />
          
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Уже есть аккаунт? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text style={styles.loginLink}>Войти</Text>
            </TouchableOpacity>
          </View>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  registerButton: {
    marginTop: 16,
    marginBottom: 24,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  loginLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});