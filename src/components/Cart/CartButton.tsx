import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './CartButton.styles';

interface CartButtonProps {
  onPress: () => void;
}

export const CartButton = ({ onPress }: CartButtonProps) => {
  const badge = 10;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      hitSlop={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}>
      <Icon name="cart-outline" size={20} color="#4A5568" />
      {!!badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
