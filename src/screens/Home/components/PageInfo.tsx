import { Text, View } from 'react-native';
import { styles } from './PageInfo.styles';

interface PageInfoProps {
  quantity: number;
}

export const PageInfo = ({ quantity }: PageInfoProps) => {
  if (quantity <= 0) {
    return null;
  }

  return (
    <View testID="page-info" style={styles.container}>
      <Text style={styles.title}>Wrist Watch</Text>
      <Text style={styles.total}>
        {quantity} Product{quantity > 1 && 's'}
      </Text>
    </View>
  );
};
