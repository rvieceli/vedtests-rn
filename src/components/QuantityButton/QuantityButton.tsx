import { Text, View } from 'react-native';
import { IconButton } from '../IconButton/IconButton';

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
      <IconButton
        testID="quantity-button-decrease"
        onPress={handleDecrease}
        name="remove-circle-outline"
        size={18}
        color="#718096"
      />
      <Text testID="quantity-button-quantity" style={styles.quantity}>
        {value}
      </Text>
      <IconButton
        testID="quantity-button-increase"
        onPress={handleIncrease}
        name="add-circle-outline"
        size={18}
        color="#718096"
      />
    </View>
  );
};
