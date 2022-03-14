import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  badge: {
    position: 'absolute',
    backgroundColor: '#2B6CB0',
    top: -10,
    right: -10,
    width: 15,
    height: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 10,
    color: '#fff',
  },
});
