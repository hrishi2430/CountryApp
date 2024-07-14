import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchInput = ({ value, onChangeText, placeholder, style }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={'#4A789C'}
      clearButtonMode='always'
    />
  );
};

const styles = StyleSheet.create({
  input: {
    minHeight: 40,
    overflow: 'hidden',
    borderRadius: 6,
    color: '#0d151c',
    backgroundColor: '#e7eef4',
    paddingHorizontal: 16,
    paddingLeft: 8,
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24,
    marginVertical: 8,
  },
});

export default React.memo(SearchInput);
