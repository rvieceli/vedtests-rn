import { StyleSheet } from 'react-native';
import { DEFAULT_SPACE } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: DEFAULT_SPACE,
  },
  list: {
    paddingHorizontal: DEFAULT_SPACE,
    paddingVertical: DEFAULT_SPACE / 2,
  },
  column: {
    justifyContent: 'space-between',
  },

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
