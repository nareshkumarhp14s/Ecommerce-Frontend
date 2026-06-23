import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const ProductScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Mobile', 'Laptop', 'Fashion', 'Accessories'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter(product => {
    const title = product?.title || '';
    const matchesSearch = title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All'
        ? true
        : product?.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search products..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
        placeholderTextColor="#64748B"
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map(category => (
          <Pressable
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.activeCategory,
            ]}
          >
            <Text style={selectedCategory === category && styles.categoryTextActive}>
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item?._id || Math.random().toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() =>
              navigation.navigate('ProductDetails', { product: item })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 100,
  },
  activeCategory: {
    backgroundColor: '#2563EB',
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default ProductScreen;
