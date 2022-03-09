import React from 'react';
import { Text, View } from 'react-native';
import { Cart } from '../../../components/Cart/Cart';
import { Search } from '../../../components/Search/Search';
import { styles } from './Header.styles';

export const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.brand}>Brand</Text>
      <Search />
      <Cart />
    </View>
  );
};
