import { styles } from './AddToCartButton.styles';
import { IconButton } from '../IconButton/IconButton';

interface AddToCartButtonProps {
  onPress: () => void;
}

export const AddToCartButton = ({ onPress }: AddToCartButtonProps) => {
  return (
    <IconButton
      testID="add-to-cart-button"
      style={[styles.button, styles.shadow]}
      onPress={onPress}
      name="cart-outline"
      size={14}
      color="#fff"
    />
  );
};
