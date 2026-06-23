import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import api from '../services/api';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      if (
        !name.trim() ||
        !email.trim() ||
        !password.trim() ||
        !confirmPassword.trim()
      ) {
        return Alert.alert(
          'Validation Error',
          'Please fill all fields'
        );
      }

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return Alert.alert(
          'Validation Error',
          'Please enter a valid email'
        );
      }

      if (password !== confirmPassword) {
        return Alert.alert(
          'Validation Error',
          'Passwords do not match'
        );
      }

      if (password.length < 6) {
        return Alert.alert(
          'Validation Error',
          'Password must be at least 6 characters'
        );
      }

      setLoading(true);

      const response = await api.post(
        '/auth/register',
        {
          name,
          email,
          password,
        }
      );

      console.log(response.data);

      Alert.alert(
        'Success',
        'Account created successfully'
      );

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      navigation.navigate('Login');
    } catch (error) {
      console.log(error.response?.data);

      Alert.alert(
        'Error',
        error.response?.data?.message ||
          'Registration Failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Sign Up
      </Text>

      <TextInput
        placeholder="Enter Name"
        placeholderTextColor="#666"
        value={name}
        onChangeText={setName}
        style={styles.input}
        autoCapitalize="words"
      />

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

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#666"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
        style={styles.input}
      />

      <Pressable
        style={[
          styles.button,
          loading && styles.disabledButton,
        ]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Creating...' : 'Sign Up'}
        </Text>
      </Pressable>

      <Pressable
        onPress={() =>
          navigation.navigate('Login')
        }
      >
        <Text style={styles.loginText}>
          Already have an account?
          <Text style={styles.loginLink}>
            {' '}
            Login
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
    marginBottom: 30,
    textAlign: 'center',
    color: '#000',
  },

  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    color: '#000',
    backgroundColor: '#fff',
  },

  button: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  disabledButton: {
    opacity: 0.7,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  loginText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#000',
  },

  loginLink: {
    color: '#2563EB',
    fontWeight: '600',
  },
});

export default SignUpScreen;