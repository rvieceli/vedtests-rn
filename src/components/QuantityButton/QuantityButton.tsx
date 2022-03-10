import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { styles } from './QuantityButton.styles';

interface QuantityButtonProps {
  initialQuantity: number;
  onChange: (quantity: number) => void;
}

export const QuantityButton = ({
  onChange,
  initialQuantity,
}: QuantityButtonProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const handleDecrease = () => {
    if (quantity < 1) {
      return;
    }
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  return (
    <View style={styles.container} testID="quantity-button">
      <TouchableOpacity
        testID="quantity-button-increase"
        onPress={handleIncrease}>
        <Icon name="add-circle-outline" size={18} color="#718096" />
      </TouchableOpacity>
      <Text testID="quantity-button-quantity" style={styles.quantity}>
        {quantity}
      </Text>
      <TouchableOpacity
        testID="quantity-button-decrease"
        onPress={handleDecrease}>
        <Icon name="remove-circle-outline" size={18} color="#718096" />
      </TouchableOpacity>
    </View>
  );
};
