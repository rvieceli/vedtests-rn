import { Text, View } from 'react-native';
import { styles } from './PageInfo.styles';

export const PageInfo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wrist Watch</Text>
      <Text style={styles.total}>200+ Products</Text>
    </View>
  );
};
