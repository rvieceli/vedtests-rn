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
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
  title: {
    color: '#4A5568',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  options: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    flex: 3,
    color: '#2D3748',
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 5,
  },
});
