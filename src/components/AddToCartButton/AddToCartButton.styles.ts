import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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

  button: {
    backgroundColor: '#3182CE',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
