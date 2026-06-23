import React, {
  useState,
} from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

import api from '../services/api';

const EditProfileScreen = ({
  navigation,
}) => {
  const [name, setName] =
    useState('');

  const [phone, setPhone] =
    useState('');

  const [address, setAddress] =
    useState('');

  const handleUpdate =
    async () => {
      try {
        await api.put(
          '/auth/profile',
          {
            name,
            phone,
            address,
          }
        );

        Alert.alert(
          'Success',
          'Profile Updated'
        );

        navigation.goBack();

      } catch (error) {
        Alert.alert(
          'Error',
          'Update Failed'
        );
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Edit Profile
      </Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <Pressable
        style={styles.button}
        onPress={handleUpdate}
      >
        <Text style={styles.buttonText}>
          Save
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    marginTop: 50,
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default EditProfileScreen;