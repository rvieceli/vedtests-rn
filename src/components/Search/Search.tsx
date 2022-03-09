import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const Search = () => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={16} color="#A0AEC0" />
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#A0AEC0"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 33,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    // flex: 1,
    marginLeft: 5,
  },
});
