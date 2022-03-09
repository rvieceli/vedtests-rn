import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { QuantityButton } from '../QuantityButton/QuantityButton';
import { styles } from './CartItem.styles';

const { width } = Dimensions.get('window');

const cardWidth = width / 5;

export const CartItem = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
        }}
        style={[styles.image, { width: cardWidth, height: cardWidth }]}
      />
      <View style={styles.details}>
        <Text
          style={styles.title}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.7}>
          WATCH VERY
        </Text>
        <View style={styles.footer}>
          <QuantityButton />
          <Text style={styles.price}>$123</Text>
        </View>
      </View>
    </View>
  );
};
