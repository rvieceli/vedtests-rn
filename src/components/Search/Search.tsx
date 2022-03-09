import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './Search.styles';

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
