import React from 'react';

import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';

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
            style={[styles.image, { width, height: width - 30 }]}
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

            <TouchableOpacity
              style={[styles.button, styles.shadow]}
              onPress={() => {}}>
              <Text style={styles.buttonLabel}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  details: {
    padding: 10,
  },
  title: {
    color: '#4A5568',
    fontSize: 14,
    fontWeight: '500',
  },
  price: {
    color: '#2D3748',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3182CE',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  image: {
    resizeMode: 'cover',
  },
});
