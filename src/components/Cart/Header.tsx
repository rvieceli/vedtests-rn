import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './Header.styles';

interface HeaderProps {
  onPress: () => void;
}

export const Header = ({ onPress }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <TouchableOpacity onPress={onPress}>
        <Icon name="close" size={20} color="#4A5568" />
      </TouchableOpacity>
    </View>
  );
};
