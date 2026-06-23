import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

const SearchBar = ({
  value,
  onChangeText,
}) => {
  return (

    <View>
      <TextInput
      placeholder="Search Products..."
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
      placeholderTextColor="#64748B"
    />
    </View>
    
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginHorizontal: 20,
    marginTop: 20,
  },
});

export default SearchBar;