import { StyleSheet } from 'react-native';
import { DEFAULT_SPACE } from '../../constants';

export const styles = StyleSheet.create({
  container: {
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
});
