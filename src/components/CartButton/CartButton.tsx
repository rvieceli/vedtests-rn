import { Text, View } from 'react-native';
import { useCartStore } from '../../store/cart';
import { IconButton } from '../IconButton/IconButton';
import { styles } from './CartButton.styles';

export const CartButton = () => {
  const toggle = useCartStore((store) => store.actions.toggle);
  const badge = useCartStore((store) => store.state.items.length);

  const renderBadge = () => {
    if (badge <= 0) {
      return null;
    }

    return (
      <View style={styles.badge}>
        <Text
          testID="cart-button-badge"
          style={styles.badgeText}
          numberOfLines={1}
          adjustsFontSizeToFit>
          {badge}
        </Text>
      </View>
    );
  };

  return (
    <IconButton
      testID="cart-button-open"
      style={styles.container}
      onPress={toggle}
      hitSlop={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
      name="cart-outline"
      size={20}
      color="#4A5568">
      {renderBadge()}
    </IconButton>
  );
};
