import { Dimensions, Image, Text, View } from 'react-native';
import { DEFAULT_SPACE } from '../../constants';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';
import { styles } from './ProductCard.styles';

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
};

interface ProductCartProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const { width } = Dimensions.get('window');

const cardWidth = (width - DEFAULT_SPACE * 2) / 2 - 10;

export const ProductCard = ({ product, addToCart }: ProductCartProps) => {
  return (
    <View testID="product-card" style={styles.shadow}>
      <View style={styles.container}>
        <View>
          <Image
            testID="product-card-image"
            source={{
              uri: product.image,
            }}
            style={[
              styles.image,
              { width: cardWidth, height: cardWidth * 0.7 },
            ]}
          />
        </View>
        <View style={[styles.details, { width: cardWidth }]}>
          <Text
            style={styles.title}
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.8}>
            {product.title}
          </Text>
          <View style={styles.footer}>
            <Text style={styles.price}>${product.price}</Text>

            <AddToCartButton onPress={() => addToCart(product)} />
          </View>
        </View>
      </View>
    </View>
  );
};
