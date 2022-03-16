import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  details: {
    padding: 10,
  },
  title: {
    color: '#4A5568',
    fontSize: 14,
    fontWeight: '500',
    height: 34,
    lineHeight: 16,
  },
  price: {
    color: '#2D3748',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
  },
});
