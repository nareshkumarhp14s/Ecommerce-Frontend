import React, { useContext } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

const ProductCard = ({ item, onPress }) => {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Pressable
        style={styles.heartButton}
        onPress={() => addToWishlist(item)}
      >
        <Text style={styles.heart}>❤️</Text>
      </Pressable>

      <Image
        source={{
          uri: item?.image || 'https://via.placeholder.com/150',
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {item?.title || 'Product'}
        </Text>

        <Text style={styles.rating}>
          ⭐ {item?.averageRating?.toFixed(1) || '4.5'}
        </Text>

        <Text style={styles.price}>₹ {item?.price || 0}</Text>
        <Text style={styles.stock}>Stock: {item?.stock || 0}</Text>

        <Pressable
          style={styles.cartButton}
          onPress={() => addToCart(item)}
        >
          <Text style={styles.cartText}>Add To Cart</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  heart: {
    fontSize: 22,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 10,
  },
  content: {
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  rating: {
    color: '#F59E0B',
    marginTop: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
    marginTop: 5,
  },
  stock: {
    color: '#16A34A',
    marginTop: 5,
    fontWeight: '500',
  },
  cartButton: {
    backgroundColor: '#2563EB',
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  cartText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default ProductCard;
