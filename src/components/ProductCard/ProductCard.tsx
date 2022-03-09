import React from 'react';

import { Image, Text, View } from 'react-native';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';
import { styles } from './ProductCard.styles';

interface ProductCartProps {
  width: number;
}

export const ProductCard = ({ width }: ProductCartProps) => {
  return (
    <View style={styles.shadow}>
      <View style={styles.container}>
        <View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
            }}
            style={[styles.image, { width, height: width * 0.7 }]}
          />
        </View>
        <View style={[styles.details, { width }]}>
          <Text
            style={styles.title}
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.7}>
            WATCH VERY
          </Text>
          <View style={styles.footer}>
            <Text style={styles.price}>$123</Text>

            <AddToCartButton />
          </View>
        </View>
      </View>
    </View>
  );
};
