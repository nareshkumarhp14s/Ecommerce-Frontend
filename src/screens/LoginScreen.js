import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { AuthContext } from '../context/AuthContext.js';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {login} = useContext(AuthContext)
  const handleLogin = async () => {
    try {
      if (!email.trim() || !password.trim()) {
        return Alert.alert(
          'Validation Error',
          'Please fill all fields'
        );
      }

      setLoading(true);

      const response = await api.post(
        '/auth/login',
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;

      await AsyncStorage.setItem(
        'token',
        token
      );

      await AsyncStorage.setItem(
        'user',
        JSON.stringify(user)
      );
      login(user, token)

      Alert.alert(
        'Success',
        'Login Successful'
      );

      navigation.replace('Main');
    } catch (error) {
      console.log(error.response?.data);

      Alert.alert(
        'Error',
        error.response?.data?.message ||
          'Login Failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Login
      </Text>

      <TextInput
        placeholder="Enter Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Enter Password"
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Pressable
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Logging In...' : 'Login'}
        </Text>
      </Pressable>

      <Pressable
        onPress={() =>
          navigation.navigate('Signup')
        }
      >
        <Text style={styles.signupText}>
          Don't have an account?
          <Text style={styles.signupLink}>
            {' '}
            Sign Up
          </Text>
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 50,
  },

  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#000',
  },

  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    color: '#000',
  },

  button: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  signupText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#000',
  },

  signupLink: {
    color: '#2563EB',
    fontWeight: '600',
  },
});

export default LoginScreen;