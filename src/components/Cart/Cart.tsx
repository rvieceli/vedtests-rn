import { FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useCartStore } from '../../store/cart';
import { CartItem } from '../CartItem/CartItem';
import { styles } from './Cart.styles';
import { CheckoutButton } from '../CheckoutButton/CheckoutButton';
import { IconButton } from '../IconButton/IconButton';

export const Cart = () => {
  const { bottom } = useSafeAreaInsets();
  const items = useCartStore((store) => store.state.items);
  const { toggle, removeAll } = useCartStore((store) => store.actions);
  const hasProducts = items.length > 0;

  return (
    <View testID="cart" style={[styles.container, { paddingBottom: bottom }]}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <IconButton
          testID="cart-clear-button"
          onPress={() => removeAll()}
          name="trash"
          color="#A0AEC0">
          <Text style={styles.clearButtonText}>Clear cart</Text>
        </IconButton>
        <IconButton
          testID="cart-close-button"
          onPress={() => toggle()}
          name="close"
          color="#4A5568"
        />
      </View>

      <View style={styles.divider} />

      <FlatList
        data={items}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItem product={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View testID="cart-empty">
            <Text>There are no items in the cart</Text>
          </View>
        }
        contentContainerStyle={styles.list}
      />

      <View style={styles.divider} />

      {hasProducts && <CheckoutButton />}
    </View>
  );
};
