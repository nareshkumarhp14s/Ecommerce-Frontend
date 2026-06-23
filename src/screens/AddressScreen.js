import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';

import api from '../services/api';

const AddressScreen = () => {
  const [address, setAddress] =
    useState('');

  const getProfile =
    async () => {
      try {
        const response =
          await api.get(
            '/auth/profile'
          );

        setAddress(
          response.data.user
            .address || ''
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    getProfile();
  }, []);

  const saveAddress =
    async () => {
      try {
        await api.put(
          '/auth/profile',
          {
            address,
          }
        );

        Alert.alert(
          'Success',
          'Address Saved'
        );
      } catch (error) {
        Alert.alert(
          'Error',
          'Failed'
        );
      }
    };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
        }}>
        Delivery Address
      </Text>

      <TextInput
        value={address}
        onChangeText={
          setAddress
        }
        multiline
        placeholder="Enter Address"
        style={{
          borderWidth: 1,
          padding: 15,
          borderRadius: 10,
          minHeight: 120,
        }}
      />

      <Pressable
        style={{
          backgroundColor:
            '#2563EB',
          padding: 15,
          borderRadius: 10,
          marginTop: 20,
        }}
        onPress={
          saveAddress
        }>
        <Text
          style={{
            color: '#fff',
            textAlign:
              'center',
          }}>
          Save Address
        </Text>
      </Pressable>
    </View>
  );
};

export default AddressScreen;