import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { styles } from './QuantityButton.styles';

export const QuantityButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon name="add-circle-outline" size={18} color="#718096" />
      </TouchableOpacity>
      <Text style={styles.quantity}>1</Text>
      <TouchableOpacity>
        <Icon name="remove-circle-outline" size={18} color="#718096" />
      </TouchableOpacity>
    </View>
  );
};
