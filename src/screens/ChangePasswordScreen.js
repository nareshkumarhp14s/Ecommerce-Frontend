import React, {useState,} from 'react';

import {
  View,Text,TextInput,Pressable,StyleSheet,Alert,
} from 'react-native';

import api from '../services/api';

const ChangePasswordScreen = ({navigation}) =>{
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleChangePassword = async () =>{
        try {
            if(!oldPassword || !newPassword || !confirmPassword){
                return Alert.alert('Error','Please fill all fields')
            }

            if(newPassword !== confirmPassword){
                return Alert.alert('Error','Password do not match')
            }

            await api.put('/auth/change-password',{oldPassword,newPassword})

            Alert.alert('Error','Password successfully changed')

            navigation.goBack();

        } catch (error) {
            Alert.alert('Error',error.response?.data?.message ||'Password change failed');
            
        }
    }

    return(
       <View style={styles.container}>
      <Text style={styles.heading}>
        Change Password
      </Text>

      <TextInput
        placeholder="Old Password"
        secureTextEntry
        value={oldPassword}
        onChangeText={
          setOldPassword
        }
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={
          setNewPassword
        }
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={
          setConfirmPassword
        }
        style={styles.input}
        placeholderTextColor="#666"
      />

      <Pressable
        style={styles.button}
        onPress={
          handleChangePassword
        }
      >
        <Text
          style={styles.buttonText}
        >
          Update Password
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent:
      'center',
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
    backgroundColor:
      '#2563EB',
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default ChangePasswordScreen;