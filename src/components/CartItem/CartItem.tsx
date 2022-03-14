import { Dimensions, Image, Text, View } from 'react-native';

import { useCartStore } from '../../store/cart';
import { IconButton } from '../IconButton/IconButton';
import { QuantityButton } from '../QuantityButton/QuantityButton';
import { styles } from './CartItem.styles';

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
};
interface CartItemProps {
  product: Product;
  quantity: number;
}

const { width } = Dimensions.get('window');

const cardWidth = width / 5;

export const CartItem = ({ product, quantity }: CartItemProps) => {
  const { remove, increase, decrease } = useCartStore((store) => store.actions);

  return (
    <View testID="cart-item" style={styles.container}>
      <Image
        testID="cart-item-image"
        source={{
          uri: product.image,
        }}
        accessibilityLabel={product.title}
        style={[styles.image, { width: cardWidth, height: cardWidth }]}
      />
      <View style={styles.details}>
        <Text
          style={styles.title}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.7}>
          {product.title}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>${product.price}</Text>
          <View style={styles.options}>
            <IconButton
              testID="cart-item-remove"
              onPress={() => remove(product)}
              name="trash"
              color="#FEB2B2"
            />
            <QuantityButton
              value={quantity}
              increase={() => increase(product)}
              decrease={() => decrease(product)}
              min={0}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
