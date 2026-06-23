import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext,useState,} from 'react';

import {View,Text,Pressable,StyleSheet,Alert,} from 'react-native';



import {launchImageLibrary,} from 'react-native-image-picker';

import api from '../services/api';
import {AuthContext,} from '../context/AuthContext';

const ProfileScreen = ({
navigation,
}) => {
const { user, logout, } =
useContext(AuthContext);

const [image, setImage] =
useState(null);

const pickImage = async () => {
const result =await launchImageLibrary({mediaType: 'photo',});

  if (
    !result.didCancel &&
    result.assets
  ) {
    setImage(
      result.assets[0]
    );
  }
};
const handleLogout =
async () => {

try {

await AsyncStorage.removeItem(
'token'
);

await AsyncStorage.removeItem(
'user'
);

logout();

navigation.replace(
'Login'
);

} catch (error) {

console.log(error);

}

};

const uploadImage =
async () => {
if (!image) {
return Alert.alert(
'Please select an image first'
);
}


  try {
    const formData =
      new FormData();

    formData.append(
      'image',
      {
        uri: image.uri,
        type:
          image.type ||
          'image/jpeg',
        name:
          image.fileName ||
          'profile.jpg',
      }
    );

    const response =
      await api.post(
        '/auth/upload-profile',
        formData,
        {
          headers: {
            'Content-Type':
              'multipart/form-data',
          },
        }
      );

    console.log(
      response.data
    );

    Alert.alert(
      'Success',
      'Image Uploaded Successfully'
    );
  } catch (error) {
    console.log(
      error.response?.data
    );

    Alert.alert(
      'Error',
      error.response?.data
        ?.message ||
        'Upload Failed'
    );
  }
};


return ( <View style={styles.container}> <Text style={styles.heading}>
Profile </Text>


  <Text style={styles.info}>
    Name: {user?.name}
  </Text>

  <Text style={styles.info}>
    Email: {user?.email}
  </Text>

  <Pressable
    style={styles.button}
    onPress={() =>
      navigation.navigate(
        'EditProfile'
      )
    }
  >
    <Text
      style={
        styles.buttonText
      }
    >
      Edit Profile
    </Text>
  </Pressable>

  <Pressable
    style={styles.button}
    onPress={pickImage}
  >
    <Text
      style={
        styles.buttonText
      }
    >
      Select Image
    </Text>
  </Pressable>

  <Pressable
    style={styles.button}
    onPress={uploadImage}
  >
    <Text
      style={
        styles.buttonText
      }
    >
      Upload Image
    </Text>
  </Pressable>

  <Pressable
style={styles.button}
onPress={() =>
navigation.navigate(
'ChangePassword'
)
}>
<Text
style={
styles.buttonText
}>
Change Password </Text> </Pressable>

<Pressable
style={styles.button}
onPress={() =>
navigation.navigate(
'Address'
)
}>
<Text
style={
styles.buttonText
}>
Address </Text> </Pressable>

{user?.isAdmin && (
<Pressable
style={styles.button}
onPress={() =>
navigation.navigate(
'AdminProducts'
)
}>
<Text
style={
styles.buttonText
}>
Admin Panel </Text> </Pressable>
)}
<Pressable
      style={
        styles.logoutButton
      }
      onPress={
        handleLogout
      }>
      <Text
        style={
          styles.buttonText
        }>
        Logout
      </Text>
    </Pressable>

</View>


);
};

const styles =
StyleSheet.create({
container: {
flex: 1,
padding: 20,
justifyContent:
'center',
},


heading: {
  fontSize: 30,
  fontWeight: 'bold',
  marginBottom: 20,
},

info: {
  fontSize: 18,
  marginBottom: 10,
},
logoutButton: {
  backgroundColor:
    '#EF4444',
  padding: 15,
  borderRadius: 12,
  alignItems:
    'center',
  marginTop: 15,
  marginBottom: 30,
},

button: {
  backgroundColor:
    '#2563EB',
  padding: 15,
  borderRadius: 10,
  marginTop: 15,
},

buttonText: {
  color: '#fff',
  textAlign: 'center',
  fontWeight: '600',
},


});

export default ProfileScreen;
