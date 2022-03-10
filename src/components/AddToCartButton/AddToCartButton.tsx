import { TouchableOpacity } from 'react-native';
import { styles } from './AddToCartButton.styles';
import Icon from 'react-native-vector-icons/Ionicons';

interface AddToCartButtonProps {
  onPress: () => void;
}

export const AddToCartButton = ({ onPress }: AddToCartButtonProps) => {
  return (
    <TouchableOpacity
      testID="add-to-cart-button"
      style={[styles.button, styles.shadow]}
      onPress={onPress}>
      <Icon name="cart-outline" size={14} color="#fff" />
    </TouchableOpacity>
  );
};
