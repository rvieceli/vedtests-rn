import React from 'react';
import { TouchableOpacity } from 'react-native';
import { styles } from './AddToCartButton.styles';
import Icon from 'react-native-vector-icons/Ionicons';

export const AddToCartButton = () => {
  return (
    <TouchableOpacity style={[styles.button, styles.shadow]} onPress={() => {}}>
      <Icon name="cart-outline" size={14} color="#fff" />
    </TouchableOpacity>
  );
};
