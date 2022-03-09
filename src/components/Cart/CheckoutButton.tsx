import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { styles } from './CheckoutButton.styles';

export const CheckoutButton = () => {
  return (
    <TouchableOpacity style={styles.checkoutButton}>
      <Text style={styles.checkoutText}>CHECKOUT</Text>
      <Icon name="arrow-forward" style={styles.checkoutArrow} />
    </TouchableOpacity>
  );
};
