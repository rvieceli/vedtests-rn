import { StyleSheet } from 'react-native';
import { DEFAULT_SPACE } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
