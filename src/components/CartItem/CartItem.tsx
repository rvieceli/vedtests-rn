import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const cardWidth = width / 5;

export const CartItem = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
          }}
          style={[styles.image, { width: cardWidth, height: cardWidth }]}
        />
      </View>
      <View style={styles.details}>
        <Text
          style={styles.title}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.7}>
          WATCH VERY
        </Text>
        <View style={styles.footer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity>
              <Icon name="add-circle-outline" size={18} color="#718096" />
            </TouchableOpacity>
            <Text style={styles.quantity}>1</Text>
            <TouchableOpacity>
              <Icon name="remove-circle-outline" size={18} color="#718096" />
            </TouchableOpacity>
          </View>
          <Text style={styles.price}>$123</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    borderRadius: 4,
  },
  details: {
    flex: 1,
    padding: 10,
  },
  title: {
    color: '#4A5568',
    fontSize: 16,
  },
  footer: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    color: '#2D3748',
    fontSize: 18,
    fontWeight: '500',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    paddingHorizontal: 5,
    color: '#718096',
    fontWeight: '500',
  },
});
