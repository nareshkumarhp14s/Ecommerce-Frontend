import React from 'react';
import AppNavigator from './src/navigation/AppNavigator.js';
import {AuthProvider} from './src/context/AuthContext.js'
import {
  CartProvider,
} from './src/context/CartContext';
import {WishlistProvider} from './src/context/WishlistContext.js'

function App() {
  return (
    <WishlistProvider>
    <CartProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider> 
   </CartProvider> 
   </WishlistProvider>
   )    
  
  // <LoginScreen />;
}

export default App;