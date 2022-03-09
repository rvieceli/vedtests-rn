import { StyleSheet } from 'react-native';
import { DEFAULT_SPACE } from '../../constants';

export const styles = StyleSheet.create({
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
