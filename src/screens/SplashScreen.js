import React, {
useCallback,
useContext,
useEffect,
} from 'react';

import {
View,
Text,
StyleSheet,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
AuthContext,
} from '../context/AuthContext';

const SplashScreen = ({
navigation,
}) => {

const { login } =
useContext(AuthContext);

const checkLogin =
useCallback(async () => {

try {

const token =
await AsyncStorage.getItem(
'token'
);

const user =
await AsyncStorage.getItem(
'user'
);

setTimeout(() => {

if (
token &&
user
) {

login(
JSON.parse(user),
token
);

navigation.replace(
'Main'
);

} else {

navigation.replace(
'Login'
);

}

}, 1500);

} catch (error) {

navigation.replace(
'Login'
);

}

}, [
navigation,
login,
]);

useEffect(() => {
checkLogin();
}, [checkLogin]);

return (
<View style={styles.container}>
<Text style={styles.logo}>
Auth App
</Text>
</View>
);

};

const styles =
StyleSheet.create({

container: {
flex: 1,
justifyContent:
'center',
alignItems:
'center',
backgroundColor:
'#2563EB',
},

logo: {
fontSize: 32,
color: '#fff',
fontWeight: 'bold',
},

});

export default SplashScreen;