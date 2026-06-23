import React, { useContext, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import api from '../services/api';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

const ProductDetailsScreen = ({ route }) => {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    const trimmedComment = comment.trim();
    const numericRating = Number(rating);

    if (!Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
      Alert.alert('Error', 'Please enter a rating between 1 and 5.');
      return;
    }

    if (!trimmedComment) {
      Alert.alert('Error', 'Please enter a comment.');
      return;
    }

    try {
      setLoading(true);
      await api.post(`/products/${product._id}/review`, {
        rating: numericRating,
        comment: trimmedComment,
      });

      Alert.alert('Success', 'Review added successfully.');
      setRating('');
      setComment('');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Unable to add review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: product.image || 'https://via.placeholder.com/300',
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.rating}>⭐ {product.averageRating?.toFixed(1) || 0}</Text>
            <Text style={styles.stock}>In stock: {product.stock}</Text>
          </View>
          <Text style={styles.price}>₹ {product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Add Review</Text>
          <TextInput
            placeholder="Rating (1-5)"
            value={rating}
            onChangeText={setRating}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Comment"
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
            style={[styles.input, styles.commentInput]}
          />
          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={submitReview}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Submitting...' : 'Submit Review'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {product.reviews?.length ? (
            product.reviews.map((review, index) => (
              <View key={`${review.user || index}-${index}`} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewName}>{review.name || 'Anonymous'}</Text>
                  <Text style={styles.reviewRating}>⭐ {review.rating}</Text>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No reviews yet.</Text>
          )}
        </View>

        <View style={styles.actionRow}>
          <Pressable style={styles.cartButton} onPress={() => addToCart(product)}>
            <Text style={styles.buttonText}>Add To Cart</Text>
          </Pressable>

          <Pressable style={styles.wishlistButton} onPress={() => addToWishlist(product)}>
            <Text style={styles.buttonText}>❤️ Wishlist</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  image: {
    width: '100%',
    height: 320,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    fontSize: 16,
    color: '#F59E0B',
    fontWeight: '600',
  },
  price: {
    fontSize: 28,
    color: '#2563EB',
    fontWeight: '800',
    marginTop: 12,
  },
  description: {
    fontSize: 16,
    color: '#475569',
    marginTop: 16,
    lineHeight: 24,
  },
  stock: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  sectionCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  commentInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  reviewItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewName: {
    fontWeight: '600',
    color: '#0F172A',
  },
  reviewRating: {
    color: '#F59E0B',
    fontWeight: '600',
  },
  reviewComment: {
    marginTop: 6,
    color: '#475569',
    lineHeight: 20,
  },
  emptyText: {
    color: '#64748B',
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  cartButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  wishlistButton: {
    flex: 1,
    backgroundColor: '#EC4899',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
});

export default ProductDetailsScreen;
