import { StyleSheet } from 'react-native';
import { DEFAULT_SPACE } from '../../../constants';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: DEFAULT_SPACE,
    paddingVertical: 10,
  },
  brand: {
    color: '#4A5568',
    fontSize: 24,
    fontWeight: '600',
    marginRight: 15,
  },
});
