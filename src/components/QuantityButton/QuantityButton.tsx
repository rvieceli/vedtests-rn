import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { styles } from './QuantityButton.styles';

export interface QuantityButtonProps {
  value: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export const QuantityButton = ({
  onChange,
  value,
  min,
  max,
}: QuantityButtonProps) => {
  const handleIncrease = () => {
    const newValue = value + 1;

    if (typeof max === 'number' && newValue > max) {
      return;
    }
    onChange(newValue);
  };

  const handleDecrease = () => {
    const newValue = value - 1;

    if (typeof min === 'number' && newValue < min) {
      return;
    }

    onChange(newValue);
  };

  return (
    <View style={styles.container} testID="quantity-button">
      <TouchableOpacity
        testID="quantity-button-increase"
        onPress={handleIncrease}>
        <Icon name="add-circle-outline" size={18} color="#718096" />
      </TouchableOpacity>
      <Text testID="quantity-button-quantity" style={styles.quantity}>
        {value}
      </Text>
      <TouchableOpacity
        testID="quantity-button-decrease"
        onPress={handleDecrease}>
        <Icon name="remove-circle-outline" size={18} color="#718096" />
      </TouchableOpacity>
    </View>
  );
};
