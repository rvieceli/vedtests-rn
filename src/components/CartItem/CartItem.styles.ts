import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    borderRadius: 4,
  },
  details: {
    flex: 1,
    padding: 10,
  },
  title: {
    color: '#4A5568',
    fontSize: 16,
  },
  footer: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    color: '#2D3748',
    fontSize: 18,
    fontWeight: '500',
  },
});
