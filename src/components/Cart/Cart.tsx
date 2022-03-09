import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { DEFAULT_SPACE } from '../../constants';
import { CartItem } from '../CartItem/CartItem';

export const Cart = () => {
  const { bottom } = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(true);
  const badge = 10;

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
          <View style={styles.header}>
            <Text style={styles.title}>Your Cart</Text>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Icon name="close" size={20} color="#4A5568" />
            </TouchableOpacity>
          </View>
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

          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>CHECKOUT</Text>
            <Icon name="arrow-forward" style={styles.checkoutArrow} />
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setModalVisible(true)}
        hitSlop={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}>
        <Icon name="cart-outline" size={20} color="#4A5568" />
        {!!badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    marginLeft: 15,
  },
  badge: {
    position: 'absolute',
    backgroundColor: '#2B6CB0',
    top: -10,
    right: -10,
    padding: 3,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    color: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: DEFAULT_SPACE,
    paddingVertical: DEFAULT_SPACE,
  },
  title: {
    color: '#4A5568',
    fontSize: 24,
    fontWeight: '600',
    marginRight: 15,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#A0AEC0',
    marginHorizontal: DEFAULT_SPACE,
  },
  separator: {
    height: DEFAULT_SPACE,
  },
  list: {
    paddingHorizontal: DEFAULT_SPACE,
    paddingVertical: DEFAULT_SPACE,
  },
  checkoutButton: {
    marginTop: DEFAULT_SPACE / 2,
    marginHorizontal: DEFAULT_SPACE,
    backgroundColor: '#3182CE',
    padding: 5,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 33,
  },
  checkoutText: {
    color: '#fff',
  },
  checkoutArrow: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
});
