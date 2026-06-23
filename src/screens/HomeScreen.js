import React, {
useCallback,
useContext,
useEffect,
useState,
} from 'react';

import {
ActivityIndicator,
Pressable,
ScrollView,
StyleSheet,
Text,
View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../context/AuthContext';
import BannerSlider from '../components/BannerSlider.js';
import CategoryCard from '../components/CategoryCard.js';
import ProductCard from '../components/ProductCard.js';
import SearchBar from '../components/SearchBar.js';
import api from '../services/api';

const HomeScreen = ({
navigation,
}) => {
const { logout } =
useContext(AuthContext);

const [user, setUser] =
useState(null);

const [loading, setLoading] =
useState(true);

const [search, setSearch] =
useState('');

const [products, setProducts] =
useState([]);

const filteredProducts =
products.filter(product =>
product.title
?.toLowerCase()
.includes(
search.toLowerCase()
)
);

const getProfile =
useCallback(async () => {
try {
const response =
await api.get(
'/auth/profile'
);


    setUser(
      response.data.user
    );
  } catch (error) {
    console.log(error);

    await AsyncStorage.removeItem(
      'token'
    );

    navigation.replace(
      'Login'
    );
  } finally {
    setLoading(false);
  }
}, [navigation]);


const fetchProducts =
async () => {
try {
const response =
await api.get(
'/products'
);


    setProducts(
      response.data
    );
  } catch (error) {
    console.log(error);
  }
};


useEffect(() => {
getProfile();
fetchProducts();
}, [getProfile]);




if (loading) {
return (
<View style={styles.loadingContainer}> 
  <ActivityIndicator size="large"/> 
  </View>
);
}

return (
<ScrollView
style={styles.container}
showsVerticalScrollIndicator={
false
}> <Text style={styles.heading}>
Hello 👋 {user?.name} </Text>


  <Text style={styles.email}>
    {user?.email}
  </Text>

  <SearchBar
    value={search}
    onChangeText={setSearch}
  />

  <BannerSlider />

  <View>
    <Text
      style={
        styles.sectionTitle
      }>
      Categories
    </Text>
  </View>

  <View
    style={
      styles.categoryContainer
    }>
    <CategoryCard
      emoji="📱"
      title="Mobiles"
    />

    <CategoryCard
      emoji="💻"
      title="Laptops"
    />

    <CategoryCard
      emoji="👕"
      title="Fashion"
    />

    <CategoryCard
      emoji="🎧"
      title="Accessories"
    />
  </View>

  <Text
    style={
      styles.sectionTitle
    }>
    Featured Products
  </Text>

  <Text
    style={
      styles.productCount
    }>
    {
      filteredProducts.length
    }{' '}
    Products Found
  </Text>

  <View
    style={
      styles.productsContainer
    }>
    {filteredProducts
      .slice(0, 4)
      .map(product => (
        <ProductCard
          key={
            product._id
          }
          item={product}
          onPress={() =>
            navigation.navigate(
              'ProductDetails',
              {
                product,
              }
            )
          }
        />
      ))}
  </View>

  
  

</ScrollView>


);
};

const styles =
StyleSheet.create({
container: {
flex: 1,
backgroundColor:
'#F8FAFC',
paddingHorizontal: 20,
paddingBottom: 30,
marginTop: 50,
},


loadingContainer: {
  flex: 1,
  justifyContent:
    'center',
  alignItems:
    'center',
},

heading: {
  fontSize: 30,
  fontWeight: 'bold',
  color: '#0F172A',
  marginTop: 10,
},

email: {
  fontSize: 16,
  color: '#64748B',
  marginBottom: 20,
},

sectionTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#0F172A',
  marginTop: 20,
  marginBottom: 15,
},

productCount: {
  color: '#64748B',
  marginBottom: 10,
},

categoryContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent:
    'space-between',
},

productsContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent:
    'space-between',
},

productButton: {
  backgroundColor:
    '#2563EB',
  padding: 15,
  borderRadius: 12,
  alignItems:
    'center',
  marginTop: 20,
},

profileButton: {
  backgroundColor:
    '#0EA5E9',
  padding: 15,
  borderRadius: 12,
  alignItems:
    'center',
  marginTop: 15,
},



buttonText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: '600',
},


});

export default HomeScreen;
