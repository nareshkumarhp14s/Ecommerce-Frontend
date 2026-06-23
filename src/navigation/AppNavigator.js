import React,{useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from '../screens/LoginScreen.js';
import SignUpScreen from '../screens/SignUpScreen.js';
import HomeScreen from '../screens/HomeScreen.js';
import SplashScreen from '../screens/SplashScreen.js';
import EditProfileScreen from '../screens/EditProfileScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import ChangePasswordScreen from '../screens/ChangePasswordScreen.js';
import ProductScreen from '../screens/ProductScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
// import BottomTabs from '../navigation/BottomTabs.js'
import BottomTabs from './BottomTabs.js';
import AddressScreen from '../screens/AddressScreen';
import AdminProductScreen from '../screens/AdminProductScreen';
import {AuthContext,} from '../context/AuthContext';
import AdminNavigator from './AdminNavigator';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {

  const {user} = useContext(AuthContext)

  const MainNavigator = user?.isAdmin? AdminNavigator:BottomTabs;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}/>
        <Stack.Screen name="Products" component={ProductScreen}/>
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen}/>
        <Stack.Screen name="Main" component={MainNavigator}/>
        <Stack.Screen name="Address" component={AddressScreen}/>
        <Stack.Screen name="AdminProducts" component={AdminProductScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
