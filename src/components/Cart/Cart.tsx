import React, { useState } from 'react';
import { FlatList, Modal, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CartItem } from '../CartItem/CartItem';
import { styles } from './Cart.styles';
import { CartButton } from './CartButton';
import { CheckoutButton } from './CheckoutButton';
import { Header } from './Header';

export const Cart = () => {
  const { bottom } = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View>
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={[styles.container, { paddingBottom: bottom }]}>
          <Header onPress={() => setModalVisible(!modalVisible)} />
          <View style={styles.divider} />

          <FlatList
            data={[1, 2, 3, 4, 5]}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => String(item)}
            renderItem={() => <CartItem />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.list}
          />

          <View style={styles.divider} />

          <CheckoutButton />
        </View>
      </Modal>
      <CartButton onPress={() => setModalVisible(true)} />
    </View>
  );
};
