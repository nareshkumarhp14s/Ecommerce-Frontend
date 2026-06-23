import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const CategoryCard = ({
  emoji,
  title,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>
        {emoji}
      </Text>

      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },

  icon: {
    fontSize: 30,
    marginBottom: 10,
  },
});

export default CategoryCard;